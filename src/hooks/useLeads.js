/* ══════════════════════════════════════════════
   useLeads — CRUD + Hermes realtime protocol

   Hermes escribe en crm_Leads:
     UPDATE crm_Leads SET hermes_action = 'EMAIL_ENVIADO' WHERE id = '...'

   Este hook escucha ese cambio, mueve el lead al
   stage correspondiente y emite una notificación.
══════════════════════════════════════════════ */

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase.js'
import { enrichLead } from '../lib/scoring.js'

/* Hermes action → nuevo pipeline_stage */
export const HERMES_TRANSITIONS = {
  EMAIL_ENVIADO:    'Engage_AI',
  LLAMADA_HECHA:    'Engage_Human',
  MUESTRA_ENVIADA:  'Offering',
  OFERTA_ENVIADA:   'Finalizing',
  PEDIDO_RECIBIDO:  'Converted',
  RECOMPRA:         'Converted',
}

const ACTION_LABELS = {
  EMAIL_ENVIADO:   'Email enviado',
  LLAMADA_HECHA:   'Llamada realizada',
  MUESTRA_ENVIADA: 'Muestra enviada',
  OFERTA_ENVIADA:  'Oferta enviada',
  PEDIDO_RECIBIDO: 'Primer pedido',
  RECOMPRA:        'Recompra',
}

export function useLeads() {
  const [leads,        setLeads]        = useState([])
  const [loading,      setLoading]      = useState(true)
  const [error,        setError]        = useState(null)
  const [hermesQueue,  setHermesQueue]  = useState([])  // eventos pendientes de mostrar
  const [hermesHistory,setHermesHistory]= useState([])  // historial reciente

  /* ── Fetch inicial ── */
  const fetch = useCallback(async () => {
    setLoading(true)
    const { data, error: err } = await supabase
      .from('crm_Leads')
      .select('*')
      .order('createdAt', { ascending: false })

    if (err) { setError(err.message); setLoading(false); return }
    setLeads((data || []).map(enrichLead))
    setError(null)
    setLoading(false)
  }, [])

  useEffect(() => { fetch() }, [fetch])

  /* ── Hermes realtime listener ── */
  useEffect(() => {
    const channel = supabase
      .channel('hermes-v2')
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'crm_Leads',
      }, (payload) => {
        const lead = payload.new
        const action = lead.hermes_action
        if (!action) return

        const newStage = HERMES_TRANSITIONS[action]

        // Actualiza el lead localmente (optimista)
        setLeads(prev => prev.map(l =>
          l.id === lead.id
            ? enrichLead({ ...l, ...lead, pipeline_stage: newStage || l.pipeline_stage, hermes_action: null })
            : l
        ))

        // Agrega al historial y cola de toasts
        const event = {
          id:       `${lead.id}:${action}:${Date.now()}`,
          leadId:   lead.id,
          leadName: [lead.firstName, lead.lastName].filter(Boolean).join(' ') || lead.company || '—',
          company:  lead.company,
          action,
          actionLabel: ACTION_LABELS[action] || action,
          newStage,
          ts: new Date(),
        }
        setHermesHistory(h => [event, ...h].slice(0, 20))
        setHermesQueue(q => [...q, event])

        // Limpiar hermes_action en DB
        supabase
          .from('crm_Leads')
          .update({ hermes_action: null })
          .eq('id', lead.id)
          .then(() => {})
      })
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [])

  const dismissHermes = useCallback((id) => {
    setHermesQueue(q => q.filter(e => e.id !== id))
  }, [])

  /* ── CRUD ── */

  const moveStage = useCallback(async (id, stage) => {
    setLeads(prev => prev.map(l =>
      l.id === id ? enrichLead({ ...l, pipeline_stage: stage }) : l
    ))
    const { error } = await supabase
      .from('crm_Leads')
      .update({ pipeline_stage: stage })
      .eq('id', id)
    if (error) { fetch(); return { error } }
    return {}
  }, [fetch])

  const sendToHermes = useCallback(async (id) => {
    // Mueve el lead a Engage_AI para que Hermes lo tome
    return moveStage(id, 'Engage_AI')
  }, [moveStage])

  const createLead = useCallback(async (fields) => {
    const payload = {
      ...fields,
      pipeline_stage: fields.pipeline_stage || 'Identify',
      outreach_status: fields.outreach_status || 'NOT_STARTED',
      createdAt: new Date().toISOString(),
    }
    const { data, error } = await supabase
      .from('crm_Leads')
      .insert([payload])
      .select()
      .single()
    if (error) return { error }
    setLeads(prev => [enrichLead(data), ...prev])
    return { data }
  }, [])

  const updateLead = useCallback(async (id, fields) => {
    const { data, error } = await supabase
      .from('crm_Leads')
      .update(fields)
      .eq('id', id)
      .select()
      .single()
    if (error) return { error }
    setLeads(prev => prev.map(l => l.id === id ? enrichLead(data) : l))
    return { data }
  }, [])

  const deleteLead = useCallback(async (id) => {
    const { error } = await supabase
      .from('crm_Leads')
      .delete()
      .eq('id', id)
    if (error) return { error }
    setLeads(prev => prev.filter(l => l.id !== id))
    return {}
  }, [])

  return {
    leads, loading, error,
    moveStage, sendToHermes,
    createLead, updateLead, deleteLead,
    hermesQueue, hermesHistory, dismissHermes,
    refetch: fetch,
  }
}

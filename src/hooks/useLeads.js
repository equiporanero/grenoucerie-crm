// Hook para obtener datos reales desde Supabase
// Tabla principal: leads (pipeline B2B)
import { useState, useEffect } from 'react'
import { supabase, isConnected } from '../lib/supabase'

const FALLBACK = {
    total: 0,
    leads: [],
    byStage: { prospeccion: 0, contacto: 0, muestra: 0, negociacion: 0, activo: 0, perdido: 0 },
    byGama: { Vietnam: 0, Premium: 0, Club: 0, Despieces: 0 },
    byMarket: { ES: 0, FR: 0 },
    loading: false,
    error: null,
    connected: false,
}

export function useCRMData() {
    const [data, setData] = useState({ ...FALLBACK, loading: isConnected })

    useEffect(() => {
        if (!isConnected || !supabase) {
            setData({ ...FALLBACK })
            return
        }

        async function fetchAll() {
            try {
                const { data: leads, error } = await supabase
                    .from('leads')
                    .select('*')
                    .order('score', { ascending: false })
                    .order('updated_at', { ascending: false })

                if (error) throw error

                const leadsList = leads || []

                const byStage = { prospeccion: 0, contacto: 0, muestra: 0, negociacion: 0, activo: 0, perdido: 0 }
                const byGama = { Vietnam: 0, Premium: 0, Club: 0, Despieces: 0 }
                const byMarket = { ES: 0, FR: 0 }

                leadsList.forEach(l => {
                    if (byStage[l.stage] !== undefined) byStage[l.stage]++
                    if (byGama[l.gama] !== undefined) byGama[l.gama]++
                    if (byMarket[l.pais] !== undefined) byMarket[l.pais]++
                })

                setData({
                    total: leadsList.filter(l => l.stage !== 'perdido').length,
                    leads: leadsList,
                    byStage,
                    byGama,
                    byMarket,
                    loading: false,
                    error: null,
                    connected: true,
                })
            } catch (err) {
                console.error('Supabase fetch error:', err)
                setData({ ...FALLBACK, error: err.message, connected: false })
            }
        }

        fetchAll()
        const interval = setInterval(fetchAll, 30_000)
        return () => clearInterval(interval)
    }, [])

    return data
}

// Funciones CRUD para leads
export async function saveLead(lead) {
    if (!supabase) return { error: 'Supabase no conectado' }
    if (lead.id && !lead.id.startsWith('new-')) {
        const { data, error } = await supabase.from('leads').update(lead).eq('id', lead.id).select()
        return { data, error }
    } else {
        const { id, ...rest } = lead
        const { data, error } = await supabase.from('leads').insert(rest).select()
        return { data, error }
    }
}

export async function deleteLead(id) {
    if (!supabase) return { error: 'Supabase no conectado' }
    const { error } = await supabase.from('leads').delete().eq('id', id)
    return { error }
}

export async function moveLead(id, newStage) {
    if (!supabase) return { error: 'Supabase no conectado' }
    const { data, error } = await supabase.from('leads').update({
        stage: newStage,
        updated_at: new Date().toISOString(),
    }).eq('id', id).select()
    return { data, error }
}

export default useCRMData

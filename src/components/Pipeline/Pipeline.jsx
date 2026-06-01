/**
 * PIPELINE KANBAN v5.0 — Conectado a Supabase
 * Lee/escribe en tabla public.leads
 * Drag & Drop real entre fases
 */
import { useState, useEffect, useCallback, useRef } from 'react'
import { supabase, isConnected } from '../../lib/supabase'

// ═══════════════════════════════════════════════════
// CONFIGURACIÓN
// ═══════════════════════════════════════════════════

const STAGES = [
  { id: 'prospeccion',  label: 'Prospección',   emoji: '🔍', color: '#607D8B' },
  { id: 'contacto',     label: 'Contacto',      emoji: '📧', color: '#2196F3' },
  { id: 'muestra',      label: 'Muestra',       emoji: '📦', color: '#FF9800' },
  { id: 'negociacion',  label: 'Negociación',   emoji: '🤝', color: '#9C27B0' },
  { id: 'activo',       label: 'Cliente Activo', emoji: '✅', color: '#4CAF50' },
  { id: 'perdido',       label: 'Perdido',        emoji: '❌', color: '#F44336' },
]

const GAMAS = [
  { id: 'vietnam',   nombre: 'Vietnam',   emoji: '🇻🇳', color: '#6b8a5e' },
  { id: 'premium',   nombre: 'Premium',   emoji: '⭐',  color: '#93C572' },
  { id: 'club',      nombre: 'Club',      emoji: '👑',  color: '#BAB86C' },
  { id: 'despieces', nombre: 'Despieces', emoji: '🔪',  color: '#9DC183' },
]

const gamaColor = (g) => GAMAS.find(gm => gm.id === g)?.color || '#888'

// ═══════════════════════════════════════════════════
// HOOK: Cargar leads de Supabase
// ═══════════════════════════════════════════════════
function useLeads() {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchLeads = useCallback(async () => {
    if (!isConnected || !supabase) {
      setLoading(false)
      return
    }
    try {
      const { data, error: supaError } = await supabase
        .from('leads')
        .select('*')
        .order('score', { ascending: false })
        .order('updated_at', { ascending: false })
      if (supaError) throw supaError
      setLeads(data || [])
    } catch (err) {
      console.error('Error cargando leads:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchLeads()
    // Polling cada 30s para ver cambios de otros usuarios
    const interval = setInterval(fetchLeads, 30000)
    return () => clearInterval(interval)
  }, [fetchLeads])

  // Agrupar por stage
  const byStage = {}
  STAGES.forEach(s => { byStage[s.id] = [] })
  leads.forEach(lead => {
    if (byStage[lead.stage]) byStage[lead.stage].push(lead)
    else byStage['prospeccion'].push(lead)
  })

  // KPIs
  const kpis = {
    total: leads.filter(l => l.stage !== 'perdido').length,
    prospeccion: byStage.prospeccion.length,
    contacto: byStage.contacto.length,
    muestra: byStage.muestra.length,
    negociacion: byStage.negociacion.length,
    activo: byStage.activo.length,
    fr: leads.filter(l => l.pais === 'FR' && l.stage !== 'perdido').length,
    es: leads.filter(l => l.pais === 'ES' && l.stage !== 'perdido').length,
    vietnam: leads.filter(l => l.gama === 'Vietnam').length,
    premium: leads.filter(l => l.gama === 'Premium').length,
    club: leads.filter(l => l.gama === 'Club').length,
    despieces: leads.filter(l => l.gama === 'Despieces').length,
  }

  return { leads, byStage, loading, error, kpis, refetch: fetchLeads }
}

// ═══════════════════════════════════════════════════
// COMPONENTES
// ═══════════════════════════════════════════════════

function LeadCard({ card, stageColor }) {
  return (
    <div className="kanban-card" draggable style={{ cursor: 'grab', borderLeft: `3px solid ${gamaColor(card.gama)}` }}>
      <div style={{ fontWeight: 700, fontSize: '12px', color: 'var(--text-primary)', marginBottom: '4px' }}>
        {card.empresa}
      </div>
      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '4px' }}>
        <span style={{ padding: '1px 6px', borderRadius: '3px', fontSize: '8px', fontWeight: 700,
          background: `${gamaColor(card.gama)}22`, color: gamaColor(card.gama), border: `1px solid ${gamaColor(card.gama)}44` }}>
          {GAMAS.find(g => g.id === card.gama)?.emoji} {card.gama}
        </span>
        <span style={{ padding: '1px 6px', borderRadius: '3px', fontSize: '8px',
          background: card.pais === 'FR' ? 'rgba(0,85,164,0.1)' : 'rgba(147,197,114,0.1)',
          color: card.pais === 'FR' ? '#0055A4' : '#93C572' }}>
          {card.pais === 'FR' ? '🇫🇷' : '🇪🇸'} {card.pais}
        </span>
      </div>
      {card.region && <div style={{ fontSize: '9px', color: 'var(--text-muted)' }}>📍 {card.region}</div>}
      {card.notas && <div style={{ fontSize: '9px', color: 'var(--text-muted)', marginTop: '3px', lineHeight: 1.3 }}>{card.notas.slice(0, 60)}{card.notas.length > 60 ? '…' : ''}</div>}
      {card.score > 0 && <div style={{ fontSize: '8px', color: 'var(--warn)', marginTop: '3px' }}>⭐ {card.score}</div>}
    </div>
  )
}

function KanbanColumn({ stage, leads, onDrop, onAddLead }) {
  const [hovering, setHovering] = useState(false)
  return (
    <div
      className="kanban-col"
      style={{
        borderTop: `3px solid ${stage.color}`,
        background: hovering ? `${stage.color}08` : undefined,
        transition: 'background 0.2s',
      }}
      onDragOver={e => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; setHovering(true) }}
      onDragLeave={() => setHovering(false)}
      onDrop={e => { e.preventDefault(); setHovering(false); onDrop(stage.id) }}
    >
      <div className="kanban-col-header" style={{ color: stage.color }}>
        <span style={{ fontWeight: 700, fontSize: '11px' }}>
          {stage.emoji} {stage.label.toUpperCase()}
        </span>
        <span className="kanban-count" style={{ background: `${stage.color}22`, color: stage.color }}>{leads.length}</span>
      </div>
      {leads.map(lead => <LeadCard key={lead.id} card={lead} stageColor={stage.color} />)}
      <button onClick={() => onAddLead(stage.id)} style={{
        width: '100%', padding: '6px', marginTop: '8px', background: 'transparent',
        border: '1px dashed var(--border)', borderRadius: '8px', color: 'var(--text-muted)',
        fontSize: '10px', cursor: 'pointer',
      }}>+ Añadir lead</button>
    </div>
  )
}

function ModalNuevoLead({ stageId, onSave, onClose }) {
  const [form, setForm] = useState({
    empresa: '', contacto: '', email: '', telefono: '', region: '',
    pais: 'FR', gama: 'Vietnam', notas: '', score: 0,
  })
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    if (!form.empresa.trim()) return
    setSaving(true)
    try {
      const { data, error } = await supabase.from('leads').insert({
        ...form,
        stage: stageId,
        fuente: 'dashboard',
      }).select().single()
      if (error) throw error
      onSave(data)
    } catch (err) {
      alert('Error guardando: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  const inputStyle = {
    width: '100%', padding: '8px 12px', background: 'rgba(147,197,114,0.05)',
    border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-primary)',
    fontSize: '12px', outline: 'none', marginBottom: '8px', fontFamily: 'Inter, sans-serif',
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={onClose}>
      <div className="card" style={{ width: '440px', maxWidth: '95vw', maxHeight: '85vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
        <h3 style={{ marginBottom: '16px', fontWeight: 700, fontSize: '15px' }}>
          ➕ Nuevo Lead — {STAGES.find(s => s.id === stageId)?.label}
        </h3>
        <input style={inputStyle} placeholder="Empresa *" value={form.empresa}
          onChange={e => setForm({ ...form, empresa: e.target.value })} autoFocus />
        <input style={inputStyle} placeholder="Contacto" value={form.contacto}
          onChange={e => setForm({ ...form, contacto: e.target.value })} />
        <input style={inputStyle} placeholder="Email" value={form.email} type="email"
          onChange={e => setForm({ ...form, email: e.target.value })} />
        <input style={inputStyle} placeholder="Teléfono" value={form.telefono}
          onChange={e => setForm({ ...form, telefono: e.target.value })} />
        <input style={inputStyle} placeholder="Región / Ciudad" value={form.region}
          onChange={e => setForm({ ...form, region: e.target.value })} />
        <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
          <select style={{ ...inputStyle, flex: 1, marginBottom: 0, cursor: 'pointer' }} value={form.pais}
            onChange={e => setForm({ ...form, pais: e.target.value })}>
            <option value="🇪🇸 ES">🇪🇸 España</option>
            <option value="🇫🇷 FR">🇫🇷 Francia</option>
          </select>
          <select style={{ ...inputStyle, flex: 1, marginBottom: 0, cursor: 'pointer' }} value={form.gama}
            onChange={e => setForm({ ...form, gama: e.target.value })}>
            {GAMAS.map(g => <option key={g.id} value={g.id}>{g.emoji} {g.nombre}</option>)}
          </select>
        </div>
        <textarea style={{ ...inputStyle, minHeight: '50px', resize: 'vertical' }} placeholder="Notas..."
          value={form.notas} onChange={e => setForm({ ...form, notas: e.target.value })} />
        <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
          <button className="btn btn-outline" style={{ flex: 1 }} onClick={onClose} disabled={saving}>Cancelar</button>
          <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleSave} disabled={saving}>
            {saving ? '⏳ Guardando...' : '💾 Guardar'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════
// KPIs BAR
// ═══════════════════════════════════════════════════
function KPIsBar({ kpis }) {
  const kpiItems = [
    { label: 'Total', value: kpis.total, color: '#93C572' },
    { label: '🇫🇷 FR', value: kpis.fr, color: '#0055A4' },
    { label: '🇪🇸 ES', value: kpias?.es || kpis.es, color: '#93C572' },
    { label: '🇻🇳 Vietnam', value: kpis.vietnam, color: '#6b8a5e' },
    { label: '⭐ Premium', value: kpis.premium, color: '#93C572' },
    { label: '🔪 Despieces', value: kpis.despieces, color: '#9DC183' },
  ]
  // Fix typo
  kpiItems[2].value = kpis.es

  return (
    <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
      {kpiItems.map(k => (
        <div key={k.label} className="card card-sm" style={{
          textAlign: 'center', borderTop: `3px solid ${k.color}`,
          minWidth: '90px', padding: '10px 14px',
        }}>
          <div style={{ fontSize: '22px', fontWeight: 800, color: k.color }}>{k.value}</div>
          <div style={{ fontSize: '9px', color: 'var(--text-muted)', marginTop: '2px' }}>{k.label}</div>
        </div>
      ))}
    </div>
  )
}

// ═══════════════════════════════════════════════════
// COMPONENTE PRINCIPAL
// ═══════════════════════════════════════════════════
export default function Pipeline() {
  const { byStage, loading, error, kpis, refetch } = useLeads()
  const [modalStage, setModalStage] = useState(null)
  const dragLeadId = useRef(null)

  const handleDragStart = useCallback((e, leadId) => {
    dragLeadId.current = leadId
    e.dataTransfer.effectAllowed = 'move'
    setTimeout(() => { e.target.style.opacity = '0.4' }, 0)
  }, [])

  const handleDrop = useCallback(async (targetStageId) => {
    const leadId = dragLeadId.current
    dragLeadId.current = null
    if (!leadId) return

    // Encontrar el lead original
    let lead = null
    Object.values(byStage).forEach(arr => {
      const found = arr.find(l => l.id === leadId)
      if (found) lead = found
    })
    if (!lead || lead.stage === targetStageId) return

    // Actualizar en Supabase
    const { error } = await supabase.from('leads').update({
      stage: targetStageId,
      updated_at: new Date().toISOString(),
    }).eq('id', leadId)

    if (error) {
      alert('Error moviendo lead: ' + error.message)
    } else {
      refetch()
    }
  }, [byStage, refetch])

  const handleLeadSaved = useCallback(() => {
    setModalStage(null)
    refetch()
  }, [refetch])

  if (loading) return <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>⏳ Cargando pipeline…</div>
  if (error) return <div style={{ padding: '40px', textAlign: 'center', color: 'var(--alert)' }}>❌ Error: {error}</div>
  if (!isConnected) return <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>⚠️ Supabase no conectado. Configura las variables de entorno.</div>

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2>🎯 Pipeline B2B — Supabase</h2>
          <p>{kpis.total} leads activos · Drag & drop para mover entre fases</p>
        </div>
        <button className="btn btn-primary" onClick={() => setModalStage('prospeccion')}>➕ Nuevo Lead</button>
      </div>

      <KPIsBar kpis={kpis} />

      {/* Barra de stages */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', overflowX: 'auto', paddingBottom: '4px' }}>
        {STAGES.map(stage => (
          <div key={stage.id} style={{
            padding: '6px 14px', borderRadius: '6px', fontSize: '11px', fontWeight: 700,
            background: `${stage.color}15`, color: stage.color, border: `1px solid ${stage.color}30`,
            whiteSpace: 'nowrap',
          }}>
            {stage.emoji} {byStage[stage.id]?.length || 0} {stage.label}
          </div>
        ))}
      </div>

      {/* Kanban */}
      <div className="kanban-board" style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '16px' }}>
        {STAGES.map(stage => (
          <KanbanColumn
            key={stage.id}
            stage={stage}
            leads={byStage[stage.id] || []}
            onDrop={handleDrop}
            onAddLead={setModalStage}
          />
        ))}
      </div>

      {modalStage && (
        <ModalNuevoLead
          stageId={modalStage}
          onSave={handleLeadSaved}
          onClose={() => setModalStage(null)}
        />
      )}
    </div>
  )
}

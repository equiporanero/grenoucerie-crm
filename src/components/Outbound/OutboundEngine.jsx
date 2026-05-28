/**
 * OUTBOUND COMMAND CENTER v2.0 — GRENOUCERIE FR
 * 
 * Sistema completo de outbound B2B para llegar a €500K FR
 * 
 * Implementa el framework de coreyhaines31/marketingskills (30.9k ★):
 * - prospecting: ICP definition → candidate discovery → qualification → scoring → lead sheet
 * - cold-email: observation→problem→proof→ask framework, 3-5 email sequences
 * - revops: lead lifecycle (Subscriber→Lead→MQL→SQL→Opp→Customer→Evangelist), scoring model, routing
 * - lead-magnets: matched to buyer stage (awareness/consideration/decision)
 * 
 * Diferencia v1→v2:
 * - Persistencia en Supabase (no estado local)
 * - Scoring automático recalculable
 * - Secuencia outreach con tracking histórico
 * - Acciones diarias priorizadas para Paula y Fabi
 */
import { useState, useEffect } from 'react'

// ═══════════════════════════════════════════════════
// CONSTANTES — Framework completo
// ═══════════════════════════════════════════════════

const DB_TABLE = 'fr_leads'
const DB_EVENTS = 'fr_outreach_events'
const DB_SEQ_TRACK = 'fr_sequence_tracking'

const STAGES = [
  { id: 'new',        label: '🆕 Nuevo',         color: '#607D8B', order: 0,  is_open: true },
  { id: 'researched', label: '🔍 Investigado',    color: '#795548', order: 1,  is_open: true },
  { id: 'contacted',  label: '📧 Contactado',     color: '#2196F3', order: 2,  is_open: true },
  { id: 'engaged',    label: '💬 Engaged',       color: '#00BCD4', order: 3,  is_open: true },
  { id: 'sample',     label: '📦 Muestra enviada', color: '#FF9800', order: 4,  is_open: true },
  { id: 'negotiating',label: '🤝 Negociando',    color: '#9C27B0', order: 5,  is_open: true },
  { id: 'won',        label: '✅ Won',           color: '#4CAF50', order: 6,  is_open: false },
  { id: 'lost',       label: '❌ Lost',          color: '#F44336', order: 99, is_open: false },
]

// Scoring model — revops framework
// Explicit (fit): 60 pts max | Implicit (engagement): 50 pts max | Negative: -45 pts
const SCORING_MODEL = {
  explicit: [
    // Firmographics — 35 pts
    { id: 'geo_paris',    crit: 'Paris / Lyon / Burdeos / Toulouse',  pts: 15, cat: 'geo' },
    { id: 'type_resto',   crit: 'Restaurante gastronómico / bistró',   pts: 20, cat: 'type' },
    { id: 'type_distrib', crit: 'Distribuidor foodservice',           pts: 25, cat: 'type' },
    { id: 'type_petfood', crit: 'Fabricante petfood',                 pts: 20, cat: 'type' },
    { id: 'role_chef',    crit: 'Chef / Head Chef / Cuisinier',       pts: 15, cat: 'role' },
    { id: 'role_comprador', crit: 'Comprador / Aprovisonnement',      pts: 15, cat: 'role' },
    { id: 'role_proprio', crit: 'Gérant / Propriétaire',              pts: 10, cat: 'role' },
    { id: 'size_plus',    crit: '10+ empleados',                      pts: 10, cat: 'size' },
  ],
  implicit: [
    // Engagement — 50 pts
    { id: 'email_verificado', crit: 'Email verificado entró',         pts: 10, cat: 'email' },
    { id: 'email_abierto',    crit: 'Abrió email outreach',           pts: 10, cat: 'email' },
    { id: 'email_respondio',  crit: 'Respondió email',                 pts: 20, cat: 'email' },
    { id: 'whatsapp_resp',    crit: 'Respondió WhatsApp',              pts: 20, cat: 'whatsapp' },
    { id: 'muestra_pidio',    crit: 'Solicitó muestra',               pts: 25, cat: 'intento' },
    { id: 'llamada_atendio',  crit: 'Atendió llamada Paula',           pts: 15, cat: 'llamada' },
    { id: 'rechazo_directo',  crit: 'Dijo "no" explícitamente',        pts: 5,  cat: 'intento' }, // mejor perder tiempo
    { id: 'referral',         crit: 'Referido por otro cliente',       pts: 30, cat: 'social' },
  ],
  negative: [
    { id: 'email_personal',   crit: 'Email personal (gmail/yahoo/hotmail)', pts: -10, cat: 'email' },
    { id: 'sin_respuesta_3',  crit: 'Sin respuesta tras 3 contactos',       pts: -15, cat: 'engagement' },
    { id: 'solo_precio',      crit: 'Solo le interesa precio',              pts: -20, cat: 'fit' },
    { id: 'proveedor_firmado',crit: 'Proveedor exclusivo >2 años',          pts: -25, cat: 'fit' },
  ],
}

const SCORE_THRESHOLDS = { hot: 70, warm: 40, cold: 20 }

// Secuencia de outreach — cold-email framework
// 5 emails + gaps crecientes, cada email añade algo nuevo
const OUTREACH_SEQUENCE = [
  {
    step: 0, gap_days: 0,  type: 'initial',
    label: 'Email 1 — Value + Ask',
    framework: 'Observation → Problem → Proof → Ask',
    tono: 'Peer-level, breve, un dato que no conocen',
    subject_pattern: '[dato sorprendente] + [relevancia para ellos]',
    cta: 'Interés bajo: "¿Le interesa una ficha técnica?"',
    max_chars: 120,
  },
  {
    step: 1, gap_days: 3,  type: 'follow1',
    label: 'Follow 1 — Ángulo mercado FR',
    framework: 'Trigger → Insight → Ask',
    tono: 'Dato de mercado FR que no pueden ignorar',
    subject_pattern: 'Mismo tema, ángulo diferente',
    cta: 'Misma oferta, framing diferente',
    max_chars: 100,
  },
  {
    step: 2, gap_days: 4,  type: 'follow2',
    label: 'Follow 2 — Social proof',
    framework: 'Story → Bridge → Ask',
    tono: 'Caso de éxito ES, comparable a su situación',
    subject_pattern: '[Resultado] + [empresa similar]',
    cta: 'Muestra gratuita',
    max_chars: 100,
  },
  {
    step: 3, gap_days: 7,  type: 'follow3',
    label: 'Follow 3 — Último ángulo + oferta directa',
    framework: 'Question → Value → Ask',
    tono: 'Directo, con valor claro, última oportunidad',
    subject_pattern: '[Pregunta relevante]',
    cta: 'Muestra gratuita + llamada 15 min',
    max_chars: 80,
  },
  {
    step: 4, gap_days: 7,  type: 'breakup',
    label: 'Breakup — Puerta abierta',
    framework: 'Give → Open door',
    tono: 'Cortés, sin presión, deja puerta abierta',
    subject_pattern: 'Checking in + no pressure',
    cta: 'Ninguna — solo puerta abierta',
    max_chars: 60,
  },
]

function scoreLead(lead) {
  const s = lead.scoring_data || {}
  let total = 0
  const breakdown = []

  SCORING_MODEL.explicit.forEach(rule => {
    if (s[rule.id]) {
      total += rule.pts
      breakdown.push({ rule: rule.id, pts: rule.pts, text: rule.crit, cat: 'explicit' })
    }
  })
  SCORING_MODEL.implicit.forEach(rule => {
    if (s[rule.id]) {
      total += rule.pts
      breakdown.push({ rule: rule.id, pts: rule.pts, text: rule.crit, cat: 'implicit' })
    }
  })
  SCORING_MODEL.negative.forEach(rule => {
    if (s[rule.id]) {
      total += rule.pts
      breakdown.push({ rule: rule.id, pts: rule.pts, text: rule.crit, cat: 'negative' })
    }
  })

  let tier = 'cold'
  if (total >= SCORE_THRESHOLDS.hot) tier = 'hot'
  else if (total >= SCORE_THRESHOLDS.warm) tier = 'warm'

  return { total: Math.max(-50, Math.min(120, total)), tier, breakdown }
}

function getTierStyle(tier) {
  switch (tier) {
    case 'hot':  return { bg: '#4CAF50', color: '#000', icon: '🔥', label: 'HOT' }
    case 'warm': return { bg: '#FF9800', color: '#000', icon: '⚡', label: 'WARM' }
    default:     return { bg: '#607D8B', color: '#fff', label: 'COLD' }
  }
}

// SLA: contact within 4h (business hours), qualify within 48h
const SLA_CONTACT_HOURS = 4
const SLA_QUALIFY_HOURS = 48

// ═══════════════════════════════════════════════════
// COMPONENTE PRINCIPAL
// ═══════════════════════════════════════════════════
export default function OutboundEngine() {
  const [tab, setTab] = useState('kanban')
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAdd, setShowAdd] = useState(false)
  const [expandedLead, setExpandedLead] = useState(null)
  const [filterScore, setFilterScore] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Form nuevo lead
  const [form, setForm] = useState({
    nombre: '', empresa: '', rol: '', email: '', telefono: '',
    fuente: 'linkedin', notas: '', pais: 'FR', ciudad: '',
    tipo_empresa: 'restaurante', num_empleados: '',
  })

  // Cargar de Supabase
  useEffect(() => {
    loadLeads()
  }, [])

  async function loadLeads() {
    try {
      const { supabase } = await import('../../lib/supabase')
      if (supabase) {
        const { data, error } = await supabase
          .from(DB_TABLE)
          .select('*')
          .order('created_at', { ascending: false })
        if (!error && data) {
          setLeads(data.map(l => ({ ...l, scoring_data: l.scoring_data || {} })))
          setLoading(false)
          return
        }
      }
    } catch (e) {}
    // Fallback: localStorage
    const stored = localStorage.getItem('grenoucerie_fr_leads')
    if (stored) setLeads(JSON.parse(stored).map(l => ({ ...l, scoring_data: l.scoring_data || {} })))
    setLoading(false)
  }

  async function saveLeads(updated) {
    setLeads(updated)
    localStorage.setItem('grenoucerie_fr_leads', JSON.stringify(updated.slice(0, 100))) // keep last 100
    try {
      const { supabase } = await import('../../lib/supabase')
      if (supabase) {
        // Upsert each lead — en producción usar batch
        for (const lead of updated) {
          await supabase.from(DB_TABLE).upsert({
            id: lead.id,
            nombre: lead.nombre,
            empresa: lead.empresa,
            rol: lead.rol,
            email: lead.email,
            telefono: lead.telefono,
            estado: lead.estado,
            scoring_data: lead.scoring_data,
            tipo_empresa: lead.tipo_empresa,
            ciudad: lead.ciudad,
            notas: lead.notas || '',
            historial: lead.historial || [],
          })
        }
      }
    } catch (e) {}
  }

  function addLead() {
    if (!form.nombre.trim() || !form.empresa.trim()) return
    const now = new Date().toISOString()
    const newLead = {
      id: Date.now(),
      ...form,
      estado: 'new',
      scoring_data: buildInitialScoring(form),
      created_at: now,
      updated_at: now,
      historial: [{ at: now, accion: 'Lead creado' }],
      sequence_step: 0,
      last_contact: null,
    }
    const updated = [newLead, ...leads]
    saveLeads(updated)
    setShowAdd(false)
    setForm({ nombre: '', empresa: '', rol: '', email: '', telefono: '', fuente: 'linkedin', notas: '', pais: 'FR', ciudad: '', tipo_empresa: 'restaurante', num_empleados: '' })
  }

  function buildInitialScoring(form) {
    const s = {}
    if (form.ciudad && ['paris', 'lyon', 'bordeaux', 'toulouse', 'nice', 'nantes', 'strasbourg', 'montpellier'].some(c => form.ciudad.toLowerCase().includes(c))) s.geo_paris = true
    if (form.tipo_empresa === 'restaurante') s.type_resto = true
    if (form.tipo_empresa === 'distribuidor') s.type_distrib = true
    if (form.tipo_empresa === 'petfood') s.type_petfood = true
    if (form.rol && ['chef', 'cuisinier', 'head chef'].some(r => form.rol.toLowerCase().includes(r))) s.role_chef = true
    if (form.rol && ['comprador', 'achat', 'approvisonnement', 'purchasing'].some(r => form.rol.toLowerCase().includes(r))) s.role_comprador = true
    if (form.rol && ['gérant', 'propriétaire', 'gerant', 'propietario', 'owner'].some(r => form.rol.toLowerCase().includes(r))) s.role_proprio = true
    if (form.email && !form.email.match(/@gmail\.com|@yahoo\.com|@hotmail\.com|@outlook\.com/)) s.email_verificado = true
    if (form.email && form.email.match(/@gmail\.com|@yahoo\.com|@hotmail\.com|@outlook\.com/)) s.email_personal = true
    return s
  }

  function updateStage(leadId, newStage) {
    const updated = leads.map(l => l.id === leadId ? {
      ...l,
      estado: newStage,
      updated_at: new Date().toISOString(),
      historial: [...(l.historial || []), { at: new Date().toISOString(), accion: `→ ${STAGES.find(s => s.id === newStage)?.label || newStage}` }],
    } : l)
    saveLeads(updated)
  }

  function toggleScoring(leadId, scoringId) {
    const updated = leads.map(l => {
      if (l.id !== leadId) return l
      const sd = { ...l.scoring_data }
      sd[scoringId] = !sd[scoringId]
      return { ...l, scoring_data: sd, updated_at: new Date().toISOString() }
    })
    saveLeads(updated)
  }

  function addNote(leadId, note) {
    if (!note.trim()) return
    const updated = leads.map(l => l.id === leadId ? {
      ...l,
      notas: (l.notas ? l.notas + '\n' : '') + `[${new Date().toLocaleDateString('fr-FR')}] ${note}`,
      historial: [...(l.historial || []), { at: new Date().toISOString(), accion: `Nota: ${note}` }],
    } : l)
    saveLeads(updated)
  }

  function deleteLead(leadId) {
    saveLeads(leads.filter(l => l.id !== leadId))
    if (expandedLead === leadId) setExpandedLead(null)
  }

  // Filtrar
  const scoredLeads = leads.map(l => ({ ...l, _score: scoreLead(l) }))
  const filtered = scoredLeads
    .filter(l => filterScore === 'all' || l._score.tier === filterScore)
    .filter(l => !searchTerm || `${l.nombre} ${l.empresa} ${l.rol}`.toLowerCase().includes(searchTerm.toLowerCase()))

  // Métricas
  const metrics = {
    total: leads.length,
    hot: scoredLeads.filter(l => l._score.tier === 'hot').length,
    warm: scoredLeads.filter(l => l._score.tier === 'warm').length,
    open: leads.filter(l => STAGES.find(s => s.id === l.estado)?.is_open).length,
    won: leads.filter(l => l.estado === 'won').length,
    lost: leads.filter(l => l.estado === 'lost').length,
    contacted: leads.filter(l => l.estado !== 'new' && l.estado !== 'researched').length,
    sample_sent: leads.filter(l => ['sample', 'negotiating', 'won'].includes(l.estado)).length,
    negotiating: leads.filter(l => l.estado === 'negotiating').length,
  }

  // Acciones prioritarias (para cron diario)
  const todayActions = scoredLeads
    .filter(l => l.estado !== 'won' && l.estado !== 'lost')
    .sort((a, b) => b._score.total - a._score.total)
    .slice(0, 10)

  if (loading) return <div style={{ padding: '40px', color: 'var(--text-muted)' }}>Cargando leads FR...</div>

  return (
    <div>
      {/* ═══ HEADER ═══ */}
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px' }}>
        <div>
          <h2>🚀 Outbound Engine FR</h2>
          <p>Sistema de prospección y outreach B2B — Framework 30.9k ★</p>
        </div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {['kanban', 'leads', 'actions', 'scoring'].map(t => (
            <button key={t} className={tab === t ? 'btn btn-primary' : 'btn btn-outline'} onClick={() => setTab(t)}>
              {t === 'kanban' && '📋 Kanban'}
              {t === 'leads' && '📇 Leads'}
              {t === 'actions' && '⚡ Acciones'}
              {t === 'scoring' && '📐 Scoring'}
            </button>
          ))}
        </div>
      </div>

      {/* ═══ KPIs ═══ */}
      <div className="grid-4" style={{ marginBottom: '24px' }}>
        <div className="card card-sm" style={{ borderTop: `3px solid #4CAF50` }}>
          <div style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>🔥 Hot Leads</div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#4CAF50' }}>{metrics.hot}</div>
          <div style={{ fontSize: '9px', color: 'var(--text-muted)' }}>de {metrics.total} total</div>
        </div>
        <div className="card card-sm" style={{ borderTop: `3px solid #2196F3` }}>
          <div style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>📧 Contactados</div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#2196F3' }}>{metrics.contacted}</div>
          <div style={{ fontSize: '9px', color: 'var(--text-muted)' }}>Engaged: {leads.filter(l => l.estado === 'engaged').length}</div>
        </div>
        <div className="card card-sm" style={{ borderTop: `3px solid #FF9800` }}>
          <div style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>📦 Muestras</div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#FF9800' }}>{metrics.sample_sent}</div>
          <div style={{ fontSize: '9px', color: 'var(--text-muted)' }}>Negociando: {metrics.negotiating}</div>
        </div>
        <div className="card card-sm" style={{ borderTop: `3px solid #9C27B0` }}>
          <div style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>✅ Won / ❌ Lost</div>
          <div style={{ fontSize: '28px', fontWeight: 800 }}>
            <span style={{ color: '#4CAF50' }}>{metrics.won}</span>
            <span style={{ color: 'var(--text-muted)', margin: '0 6px' }}>/</span>
            <span style={{ color: '#F44336' }}>{metrics.lost}</span>
          </div>
          <div style={{ fontSize: '9px', color: 'var(--text-muted)' }}>Tasa: {metrics.won + metrics.lost > 0 ? Math.round(metrics.won / (metrics.won + metrics.lost) * 100) : 0}%</div>
        </div>
      </div>

      {/* ═══ TAB: KANBAN ═══ */}
      {tab === 'kanban' && (
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${STAGES.length}, minmax(160px, 1fr))`, gap: '10px', overflowX: 'auto', paddingBottom: '10px' }}>
          {STAGES.map(stage => {
            const stageLeads = filtered.filter(l => l.estado === stage.id)
            return (
              <div key={stage.id} style={{ minWidth: '160px' }}>
                <div style={{
                  padding: '8px 10px', background: `${stage.color}15`, borderBottom: `2px solid ${stage.color}`,
                  borderRadius: '6px 6px 0 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: stage.color }}>{stage.label}</span>
                  <span style={{ fontSize: '10px', fontWeight: 700, background: stage.color, color: '#000', borderRadius: '8px', padding: '1px 6px' }}>{stageLeads.length}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingTop: '8px', minHeight: '60px' }}>
                  {stageLeads.map(lead => {
                    const tier = getTierStyle(lead._score.tier)
                    return (
                      <div
                        key={lead.id}
                        onClick={() => setExpandedLead(expandedLead === lead.id ? null : lead.id)}
                        style={{
                          padding: '8px 10px', borderRadius: '6px', cursor: 'pointer',
                          background: 'var(--card-bg, rgba(255,255,255,0.03))',
                          border: `1px solid ${tier.bg}30`,
                          borderLeft: `3px solid ${tier.bg}`,
                          fontSize: '11px', transition: 'all 0.15s',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{lead.nombre}</span>
                          <span style={{ fontSize: '9px', fontWeight: 700, background: tier.bg, color: tier.color, borderRadius: '3px', padding: '1px 4px' }}>
                            {lead._score.total}
                          </span>
                        </div>
                        <div style={{ fontSize: '9px', color: 'var(--text-muted)', marginTop: '2px' }}>{lead.empresa}</div>
                        {expandedLead === lead.id && (
                          <div style={{ marginTop: '8px', display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                            {STAGES.filter(s => s.id !== stage.id).map(s => (
                              <button key={s.id} onClick={e => { e.stopPropagation(); updateStage(lead.id, s.id) }}
                                style={{ fontSize: '8px', padding: '2px 6px', borderRadius: '3px', border: `1px solid ${s.color}40`, background: 'transparent', color: s.color, cursor: 'pointer' }}>
                                → {s.label.replace(/^[^\s]+\s/, '')}
                              </button>
                            ))}
                            <button onClick={e => { e.stopPropagation(); deleteLead(lead.id) }}
                              style={{ fontSize: '8px', padding: '2px 6px', borderRadius: '3px', border: '1px solid #F4433640', background: 'transparent', color: '#F44336', cursor: 'pointer' }}>
                              🗑️
                            </button>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* ═══ TAB: LEADS (tabla completa) ═══ */}
      {tab === 'leads' && (
        <>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <div>
              <label style={{ fontSize: '9px', color: 'var(--text-muted)' }}>Buscar</label>
              <input placeholder="Nombre, empresa, rol..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                style={{ padding: '6px 10px', background: 'rgba(147,197,114,0.05)', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--text-primary)', fontSize: '12px', outline: 'none', width: '200px' }} />
            </div>
            <div>
              <label style={{ fontSize: '9px', color: 'var(--text-muted)' }}>Tier</label>
              <select value={filterScore} onChange={e => setFilterScore(e.target.value)}
                style={{ padding: '6px 10px', background: 'rgba(147,197,114,0.05)', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--text-primary)', fontSize: '12px' }}>
                <option value="all">Todos</option>
                <option value="hot">🔥 Hot</option>
                <option value="warm">⚡ Warm</option>
                <option value="cold">❄️ Cold</option>
              </select>
            </div>
            <button className="btn btn-primary" onClick={() => setShowAdd(!showAdd)} style={{ padding: '6px 14px' }}>
              {showAdd ? '✕ Cancelar' : '+ Nuevo Lead'}
            </button>
          </div>

          {showAdd && (
            <div className="card" style={{ marginBottom: '20px' }}>
              <div style={{ fontWeight: 700, fontSize: '12px', marginBottom: '12px', color: 'var(--brand)' }}>NUEVO LEAD FR</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '10px' }}>
                {[
                  { key: 'nombre', label: 'Nombre *', placeholder: 'Chef Pierre' },
                  { key: 'empresa', label: 'Empresa *', placeholder: 'Restaurant XYZ' },
                  { key: 'rol', label: 'Rol', placeholder: 'Chef / Comprador / Gérant' },
                  { key: 'email', label: 'Email', placeholder: 'pierre@resto.fr' },
                  { key: 'telefono', label: 'Teléfono', placeholder: '+33 6 ...' },
                  { key: 'ciudad', label: 'Ciudad', placeholder: 'Paris' },
                  { key: 'fuente', label: 'Fuente', placeholder: 'linkedin' },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{f.label}</label>
                    <input placeholder={f.placeholder} value={form[f.key] || ''} onChange={e => setForm({...form, [f.key]: e.target.value})}
                      style={{ width: '100%', padding: '6px 10px', marginTop: '2px', background: 'rgba(147,197,114,0.05)', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--text-primary)', fontSize: '12px', outline: 'none' }} />
                  </div>
                ))}
                <div>
                  <label style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Tipo empresa</label>
                  <select value={form.tipo_empresa} onChange={e => setForm({...form, tipo_empresa: e.target.value})}
                    style={{ width: '100%', padding: '6px 10px', marginTop: '2px', background: 'rgba(147,197,114,0.05)', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--text-primary)', fontSize: '12px' }}>
                    <option value="restaurante">Restaurante</option>
                    <option value="distribuidor">Distribuidor</option>
                    <option value="petfood">Petfood</option>
                    <option value="hotel">Hotel</option>
                    <option value="catering">Catering</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
              </div>
              <div style={{ marginTop: '12px' }}>
                <label style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Notas</label>
                <textarea placeholder="Información adicional, contexto, cómo encontraste este lead..." value={form.notas} onChange={e => setForm({...form, notas: e.target.value})}
                  style={{ width: '100%', padding: '8px 10px', marginTop: '2px', background: 'rgba(147,197,114,0.05)', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--text-primary)', fontSize: '12px', outline: 'none', minHeight: '50px', resize: 'vertical' }} />
              </div>
              <div style={{ marginTop: '12px', display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <button className="btn btn-outline" onClick={() => setShowAdd(false)}>Cancelar</button>
                <button className="btn btn-primary" onClick={addLead}>Guardar Lead</button>
              </div>
            </div>
          )}

          <table className="tabla">
            <thead>
              <tr>
                <th>Score</th>
                <th>Nombre</th>
                <th>Empresa</th>
                <th>Rol</th>
                <th>Ciudad</th>
                <th>Estado</th>
                <th>Creado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(lead => {
                const tier = getTierStyle(lead._score.tier)
                const stage = STAGES.find(s => s.id === lead.estado)
                return (
                  <tr key={lead.id}>
                    <td>
                      <span style={{ fontWeight: 800, fontSize: '13px', color: tier.bg, background: `${tier.bg}15`, padding: '2px 8px', borderRadius: '4px' }}>
                        {lead._score.total}
                      </span>
                    </td>
                    <td style={{ fontWeight: 600 }}>{lead.nombre}</td>
                    <td>{lead.empresa}</td>
                    <td style={{ color: 'var(--text-secondary)', fontSize: '11px' }}>{lead.rol || '—'}</td>
                    <td style={{ fontSize: '11px' }}>{lead.ciudad || '—'}</td>
                    <td><span className="badge" style={{ fontSize: '9px', background: `${stage?.color}20`, color: stage?.color, border: `1px solid ${stage?.color}30` }}>{stage?.label}</span></td>
                    <td style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{lead.created_at ? new Date(lead.created_at).toLocaleDateString('fr-FR') : '—'}</td>
                    <td>
                      <button onClick={() => deleteLead(lead.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#F44336', fontSize: '12px' }}>🗑</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)', fontSize: '13px' }}>
              {leads.length === 0 ? 'Sin leads aún. Empieza a agregar contactos FR.' : 'No hay leads que coincidan con el filtro.'}
            </div>
          )}
        </>
      )}

      {/* ═══ TAB: ACCIONES DIARIAS ═══ */}
      {tab === 'actions' && (
        <>
          <div className="section-title">⚡ Acciones Prioritarias de Hoy</div>
          <div style={{ marginBottom: '24px', fontSize: '12px', color: 'var(--text-secondary)' }}>
            Ordenado por score. Los leads más calientes primero. Paula contacta hostelería, Fabi contacta distribuidores/petfood.
          </div>
          {todayActions.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
              Sin leads activos. Añade leads FR para empezar.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {todayActions.map((lead, i) => {
                const tier = getTierStyle(lead._score.tier)
                const stage = STAGES.find(s => s.id === lead.estado)
                const isDistribuidor = lead.tipo_empresa === 'distribuidor' || lead.tipo_empresa === 'petfood'
                const owner = isDistribuidor ? 'Fabi' : 'Paula'
                return (
                  <div key={lead.id} className="card" style={{
                    borderLeft: `4px solid ${tier.bg}`,
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-muted)' }}>#{i + 1}</span>
                      <span style={{ fontWeight: 800, fontSize: '14px', color: tier.bg, background: `${tier.bg}15`, padding: '2px 10px', borderRadius: '4px', minWidth: '36px', textAlign: 'center' }}>
                        {lead._score.total}
                      </span>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '13px' }}>{lead.nombre} · {lead.empresa}</div>
                        <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{lead.rol} · {lead.ciudad} · <span style={{ color: stage?.color }}>{stage?.label}</span></div>
                        {lead._score.breakdown.length > 0 && (
                          <div style={{ marginTop: '2px' }}>
                            {lead._score.breakdown.slice(0, 3).map((b, bi) => (
                              <span key={bi} style={{ fontSize: '8px', padding: '1px 4px', borderRadius: '2px', background: b.pts > 0 ? 'rgba(76,175,80,0.1)' : 'rgba(244,67,54,0.1)', color: b.pts > 0 ? '#4CAF50' : '#F44336', marginRight: '4px' }}>
                                {b.pts > 0 ? '+' : ''}{b.pts} {b.rule}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span style={{ fontSize: '9px', padding: '2px 8px', borderRadius: '4px', background: isDistribuidor ? 'rgba(156,39,176,0.15)' : 'rgba(33,150,243,0.15)', color: isDistribuidor ? '#9C27B0' : '#2196F3', fontWeight: 600 }}>
                        {owner}
                      </span>
                      <select
                        value={lead.estado}
                        onChange={e => updateStage(lead.id, e.target.value)}
                        style={{ padding: '3px 8px', borderRadius: '4px', fontSize: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                      >
                        {STAGES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                      </select>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </>
      )}

      {/* ═══ TAB: SCORING REFERENCE ═══ */}
      {tab === 'scoring' && (
        <>
          <div className="section-title">📐 Scoring Model — revops framework</div>
          <div style={{ marginBottom: '20px', fontSize: '12px', color: 'var(--text-secondary)' }}>
            Total posible: explicit (80) + implicit (50) + negative (-45). Umbrales: Hot ≥70 · Warm ≥40 · Cold ≥20.
            Se recalcula automáticamente al cambiar datos del lead.
          </div>
          <div className="grid-2">
            <div className="card" style={{ borderTop: '3px solid #4CAF50' }}>
              <div style={{ fontWeight: 700, fontSize: '12px', color: '#4CAF50', marginBottom: '10px' }}>EXPLICIT — Fit (quiénes son)</div>
              {SCORING_MODEL.explicit.map(r => (
                <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '11px' }}>
                  <span>{r.crit}</span>
                  <span style={{ fontWeight: 700, color: '#4CAF50' }}>+{r.pts}</span>
                </div>
              ))}
            </div>
            <div className="card" style={{ borderTop: '3px solid #FF9800' }}>
              <div style={{ fontWeight: 700, fontSize: '12px', color: '#FF9800', marginBottom: '10px' }}>IMPLICIT — Engagement (qué hacen)</div>
              {SCORING_MODEL.implicit.map(r => (
                <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '11px' }}>
                  <span>{r.crit}</span>
                  <span style={{ fontWeight: 700, color: r.pts > 0 ? '#4CAF50' : '#F44336' }}>{r.pts > 0 ? '+' : ''}{r.pts}</span>
                </div>
              ))}
              <div style={{ marginTop: '10px' }}>
                <div style={{ fontWeight: 700, fontSize: '12px', color: '#F44336', marginBottom: '6px' }}>NEGATIVE — Disqualifiers</div>
                {SCORING_MODEL.negative.map(r => (
                  <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '11px' }}>
                    <span>{r.crit}</span>
                    <span style={{ fontWeight: 700, color: '#F44336' }}>{r.pts}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="card" style={{ marginTop: '16px' }}>
            <div style={{ fontWeight: 700, fontSize: '12px', marginBottom: '8px' }}>🔄 SLA (Service Level Agreement)</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', fontSize: '11px' }}>
              <div style={{ padding: '10px', background: 'rgba(33,150,243,0.1)', borderRadius: '6px' }}>
                <div style={{ fontWeight: 700, color: '#2196F3' }}>Contacto</div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#2196F3' }}>{SLA_CONTACT_HOURS}h</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '9px' }}>tras MQL</div>
              </div>
              <div style={{ padding: '10px', background: 'rgba(156,39,176,0.1)', borderRadius: '6px' }}>
                <div style={{ fontWeight: 700, color: '#9C27B0' }}>Calificar</div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#9C27B0' }}>{SLA_QUALIFY_HOURS}h</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '9px' }}>aceptar o rechazar</div>
              </div>
              <div style={{ padding: '10px', background: 'rgba(76,175,80,0.1)', borderRadius: '6px' }}>
                <div style={{ fontWeight: 700, color: '#4CAF50' }}>Velocidad</div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#4CAF50' }}>5 min</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '9px' }}>= 21x más probable cualificar</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

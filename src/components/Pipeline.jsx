import { useState } from 'react'
import { KANBAN_STAGES, getKanbanStage } from '../lib/supabase.js'

const OUTREACH_ICONS = {
  SENT:              { icon: '✉', color: 'var(--info)'   },
  OPENED:            { icon: '👁', color: 'var(--warn)'   },
  REPLIED_POSITIVE:  { icon: '✓', color: 'var(--ok)'     },
  MEETING_BOOKED:    { icon: '◉', color: 'var(--brand)'  },
  REPLIED_NEGATIVE:  { icon: '✕', color: 'var(--danger)' },
  BOUNCED:           { icon: '⊘', color: 'var(--danger)' },
}

/* ── Score pill ─────────────────────────────────────────── */
function ScorePill({ lead }) {
  const h = lead._heat
  if (!h) return null
  return (
    <span style={{
      fontSize: 8, fontFamily: 'var(--font-mono)', fontWeight: 700,
      padding: '1px 5px', borderRadius: 20,
      background: h.bg, color: h.color, border: `1px solid ${h.border}`,
      letterSpacing: '0.3px', flexShrink: 0,
    }}>
      {h.emoji} {lead._score}
    </span>
  )
}

/* ── Lead card ──────────────────────────────────────────── */
function LeadCard({ lead, onSelect, stageColor }) {
  const name     = [lead.firstName, lead.lastName].filter(Boolean).join(' ') || 'Sin nombre'
  const initials = ((lead.firstName?.[0] || '') + (lead.lastName?.[0] || '')).toUpperCase() || '?'
  const outreach = OUTREACH_ICONS[lead.outreach_status] ?? null

  return (
    <div
      className="kanban-card"
      style={{ borderLeft: `2px solid ${stageColor}44` }}
      onClick={() => onSelect?.(lead)}
    >
      {/* Top: avatar + nombre */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 7, marginBottom: 7 }}>
        <div style={{
          width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
          background: `${stageColor}1a`, border: `1px solid ${stageColor}44`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 8, fontFamily: 'var(--font-mono)', color: stageColor,
          textTransform: 'uppercase',
        }}>
          {initials}
        </div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{
            fontSize: 11, fontWeight: 600, color: 'var(--text)', lineHeight: 1.3,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {name}
          </div>
          {lead.company && (
            <div style={{
              fontSize: 9, color: 'var(--text-faint)', fontFamily: 'var(--font-mono)',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              {lead.company}
            </div>
          )}
        </div>
      </div>

      {/* Bottom: score + outreach */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 4 }}>
        <ScorePill lead={lead} />
        <div style={{ display: 'flex', gap: 4, marginLeft: 'auto' }}>
          {lead.jobTitle && (
            <span style={{ fontSize: 8, color: 'var(--text-faint)', fontFamily: 'var(--font-mono)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 80 }}>
              {lead.jobTitle}
            </span>
          )}
          {outreach && (
            <span title={lead.outreach_status} style={{
              fontSize: 9, color: outreach.color,
              width: 16, height: 16, borderRadius: '50%',
              background: `${outreach.color}18`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              {outreach.icon}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

/* ── Column ─────────────────────────────────────────────── */
function KanbanColumn({ stage, leads, onSelect }) {
  const avgScore = leads.length > 0
    ? Math.round(leads.reduce((a, l) => a + (l._score || 0), 0) / leads.length)
    : null

  return (
    <div className="kanban-col" style={{ borderTop: `3px solid ${stage.color}` }}>
      <div className="kanban-col-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, minWidth: 0 }}>
          <span style={{ fontSize: 12 }}>{stage.emoji}</span>
          <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-body)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {stage.label}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
          {avgScore !== null && (
            <span style={{ fontSize: 8, fontFamily: 'var(--font-mono)', color: stage.color, opacity: 0.7 }}>
              ø{avgScore}
            </span>
          )}
          <span
            className="kanban-col-count"
            style={{ background: `${stage.color}18`, color: stage.color, borderColor: `${stage.color}33` }}
          >
            {leads.length}
          </span>
        </div>
      </div>
      <div className="kanban-col-body">
        {leads.length === 0
          ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 6px', gap: 4 }}>
              <span style={{ fontSize: 16, opacity: 0.15 }}>{stage.emoji}</span>
              <span style={{ fontSize: 8, fontFamily: 'var(--font-mono)', color: 'var(--text-faint)', textAlign: 'center' }}>
                vacío
              </span>
            </div>
          )
          : leads.map(lead => (
            <LeadCard key={lead.id} lead={lead} onSelect={onSelect} stageColor={stage.color} />
          ))
        }
      </div>
    </div>
  )
}

/* ── Lead detail + actions modal ────────────────────────── */
function LeadModal({ lead, onClose, onEdit, onDelete, moveStage, sendToHermes }) {
  const [moving, setMoving] = useState(false)

  if (!lead) return null
  const stage    = getKanbanStage(lead.pipeline_stage)
  const name     = [lead.firstName, lead.lastName].filter(Boolean).join(' ') || 'Sin nombre'
  const initials = ((lead.firstName?.[0] || '') + (lead.lastName?.[0] || '')).toUpperCase() || '?'

  const fields = [
    { icon: '✉', label: 'Email',    value: lead.email },
    { icon: '☏', label: 'Teléfono', value: lead.phone },
    { icon: '🏢', label: 'Empresa',  value: lead.company },
    { icon: '💼', label: 'Cargo',    value: lead.jobTitle },
    { icon: '📨', label: 'Outreach', value: lead.outreach_status?.replace(/_/g, ' ').toLowerCase() },
  ].filter(f => f.value)

  async function handleMove(stageId) {
    setMoving(true)
    await moveStage(lead.id, stageId)
    setMoving(false)
    onClose()
  }

  async function handleHermes() {
    setMoving(true)
    await sendToHermes(lead.id)
    setMoving(false)
    onClose()
  }

  function handleDelete() {
    if (window.confirm(`¿Eliminar a ${name}? Esta acción no se puede deshacer.`)) {
      onDelete(lead.id)
      onClose()
    }
  }

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 300,
        background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'var(--surface)',
          border: `1px solid ${stage.color}44`,
          borderTop: `3px solid ${stage.color}`,
          borderRadius: 'var(--r-lg)',
          width: 360, maxWidth: '100%', maxHeight: '90vh',
          overflow: 'hidden',
          boxShadow: `0 24px 60px rgba(0,0,0,0.6)`,
          animation: 'fadeIn 0.15s ease',
          display: 'flex', flexDirection: 'column',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ padding: '16px 18px 14px', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <div style={{
              width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
              background: `${stage.color}1a`, border: `1px solid ${stage.color}55`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontFamily: 'var(--font-mono)', color: stage.color, fontWeight: 700,
            }}>
              {initials}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>
                {name}
              </div>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
                <span style={{
                  fontSize: 9, fontFamily: 'var(--font-mono)',
                  background: `${stage.color}1a`, color: stage.color,
                  border: `1px solid ${stage.color}44`,
                  padding: '1px 7px', borderRadius: 20,
                }}>
                  {stage.emoji} {stage.label}
                </span>
                {lead._heat && (
                  <span style={{
                    fontSize: 9, fontFamily: 'var(--font-mono)', fontWeight: 700,
                    background: lead._heat.bg, color: lead._heat.color,
                    border: `1px solid ${lead._heat.border}`,
                    padding: '1px 6px', borderRadius: 20,
                  }}>
                    {lead._heat.emoji} {lead._score} · {lead._heat.label}
                  </span>
                )}
              </div>
            </div>
            <button onClick={onClose} style={{
              background: 'var(--surface-3)', border: '1px solid var(--border)',
              color: 'var(--text-muted)', cursor: 'pointer',
              width: 24, height: 24, borderRadius: 6, flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10,
            }}>✕</button>
          </div>
        </div>

        {/* Fields */}
        <div style={{ padding: '12px 18px', overflow: 'auto', flex: 1 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 14 }}>
            {fields.map(f => (
              <div key={f.label} style={{
                display: 'flex', gap: 8, alignItems: 'flex-start',
                padding: '6px 8px', background: 'var(--surface-2)',
                borderRadius: 'var(--r-xs)', border: '1px solid var(--border)',
              }}>
                <span style={{ fontSize: 11, color: 'var(--text-faint)', minWidth: 12, marginTop: 1 }}>{f.icon}</span>
                <div>
                  <div style={{ fontSize: 8, fontFamily: 'var(--font-mono)', color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 1 }}>
                    {f.label}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-body)', wordBreak: 'break-word' }}>{f.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Mover etapa */}
          <div>
            <div style={{ fontSize: 8, fontFamily: 'var(--font-mono)', color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 7 }}>
              Mover a etapa
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {KANBAN_STAGES
                .filter(s => !s.ids.includes(lead.pipeline_stage))
                .map(s => (
                  <button
                    key={s.id}
                    disabled={moving}
                    onClick={() => handleMove(s.id)}
                    style={{
                      padding: '5px 10px', borderRadius: 'var(--r-xs)',
                      background: `${s.color}18`, border: `1px solid ${s.color}44`,
                      color: s.color, fontSize: 10, cursor: moving ? 'not-allowed' : 'pointer',
                      fontFamily: 'var(--font-ui)', transition: 'all 0.15s',
                    }}
                  >
                    {s.emoji} {s.label}
                  </button>
                ))
              }
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div style={{
          padding: '10px 18px', borderTop: '1px solid var(--border)',
          display: 'flex', gap: 6, flexShrink: 0,
        }}>
          {/* Enviar a Hermes */}
          {lead.pipeline_stage === 'Identify' && (
            <button
              onClick={handleHermes}
              disabled={moving}
              style={{
                flex: 1, padding: '8px 10px',
                background: 'var(--ok-bg)', border: '1px solid var(--ok-border)',
                color: 'var(--ok)', fontSize: 11, fontWeight: 600,
                cursor: moving ? 'not-allowed' : 'pointer', borderRadius: 'var(--r-sm)',
                fontFamily: 'var(--font-ui)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
              }}
            >
              <span style={{ fontSize: 10, opacity: 0.8 }}>●</span>
              Enviar a Hermes
            </button>
          )}
          {/* Editar */}
          <button
            onClick={() => { onEdit(lead); onClose() }}
            style={{
              flex: 1, padding: '8px 10px',
              background: 'var(--surface-3)', border: '1px solid var(--border)',
              color: 'var(--text-muted)', fontSize: 11,
              cursor: 'pointer', borderRadius: 'var(--r-sm)',
              fontFamily: 'var(--font-ui)',
            }}
          >
            ✎ Editar
          </button>
          {/* Eliminar */}
          <button
            onClick={handleDelete}
            style={{
              padding: '8px 12px',
              background: 'var(--danger-bg)', border: '1px solid var(--danger-border)',
              color: 'var(--danger)', fontSize: 11,
              cursor: 'pointer', borderRadius: 'var(--r-sm)',
              fontFamily: 'var(--font-ui)',
            }}
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── Barra de distribución ──────────────────────────────── */
function ConversionBar({ leads }) {
  const total = leads.length || 1
  return (
    <div style={{
      display: 'flex', marginBottom: 12,
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: 4, overflow: 'hidden', height: 5,
    }}>
      {KANBAN_STAGES.map(stage => {
        const count = leads.filter(l => stage.ids.includes(l.pipeline_stage)).length
        const pct   = (count / total) * 100
        return (
          <div
            key={stage.id}
            title={`${stage.label}: ${count}`}
            style={{ width: `${pct}%`, background: stage.color, minWidth: count > 0 ? 2 : 0, transition: 'width 0.5s ease' }}
          />
        )
      })}
    </div>
  )
}

/* ── Page ────────────────────────────────────────────────── */
export default function Pipeline({ leads, loading, moveStage, sendToHermes, onEdit, onDelete }) {
  const [selected, setSelected] = useState(null)

  const grouped = KANBAN_STAGES.reduce((acc, stage) => {
    acc[stage.id] = [...leads.filter(l => stage.ids.includes(l.pipeline_stage))]
      .sort((a, b) => (b._score || 0) - (a._score || 0))
    return acc
  }, {})

  const hotCount  = leads.filter(l => (l._score || 0) >= 85).length
  const warmCount = leads.filter(l => (l._score || 0) >= 65 && (l._score || 0) < 85).length

  return (
    <div className="fade-in">
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 600, color: 'var(--text)', letterSpacing: '-0.4px', marginBottom: 3 }}>
            Pipeline
          </h1>
          <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', display: 'flex', gap: 12 }}>
            <span>{loading ? '—' : leads.length} leads</span>
            {hotCount  > 0 && <span style={{ color: '#E8612C' }}>🔥 {hotCount} HOT</span>}
            {warmCount > 0 && <span style={{ color: '#C9983A' }}>◉ {warmCount} WARM</span>}
          </div>
        </div>
      </div>

      {!loading && <ConversionBar leads={leads} />}

      {loading
        ? (
          <div className="kanban-board">
            {KANBAN_STAGES.map(s => (
              <div key={s.id} className="kanban-col" style={{ borderTop: `3px solid ${s.color}` }}>
                <div className="kanban-col-header">{s.emoji} {s.label} <span className="kanban-col-count">—</span></div>
                <div className="kanban-col-body">
                  {[1,2,3].map(i => <div key={i} className="loading-shimmer" style={{ height: 56, borderRadius: 6 }} />)}
                </div>
              </div>
            ))}
          </div>
        )
        : (
          <div className="kanban-board">
            {KANBAN_STAGES.map(stage => (
              <KanbanColumn
                key={stage.id}
                stage={stage}
                leads={grouped[stage.id] || []}
                onSelect={setSelected}
              />
            ))}
          </div>
        )
      }

      {selected && (
        <LeadModal
          lead={selected}
          onClose={() => setSelected(null)}
          onEdit={onEdit}
          onDelete={onDelete}
          moveStage={moveStage}
          sendToHermes={sendToHermes}
        />
      )}
    </div>
  )
}

import { useMemo } from 'react'
import { KANBAN_STAGES, getStageConfig } from '../lib/supabase.js'

/* ── Funnel ─────────────────────────────────────────────── */
function FunnelChart({ leads }) {
  const total = leads.length || 1

  // Etapas activas (excluye Closed) + Closed al final separado
  const active = KANBAN_STAGES.filter(s => s.id !== 'Closed')
  const lost   = KANBAN_STAGES.find(s => s.id === 'Closed')

  const withCounts = active.map(s => ({
    ...s,
    count: leads.filter(l => s.ids.includes(l.pipeline_stage)).length,
  }))
  const lostCount = leads.filter(l => lost.ids.includes(l.pipeline_stage)).length

  const maxCount = Math.max(...withCounts.map(s => s.count), 1)

  return (
    <div style={{ padding: '20px 0 4px' }}>
      {withCounts.map((stage, i) => {
        const pct   = Math.round((stage.count / total) * 100)
        const barW  = Math.max((stage.count / maxCount) * 100, 1)
        const prev  = withCounts[i - 1]
        const conv  = prev && prev.count > 0
          ? Math.round((stage.count / prev.count) * 100)
          : null

        return (
          <div key={stage.id}>
            {/* Flecha de conversión entre etapas */}
            {conv !== null && (
              <div className="funnel-arrow-row">
                <div className="funnel-arrow-line" />
                <span className={`funnel-arrow-label ${conv >= 50 ? 'ok' : conv >= 30 ? 'warn' : 'danger'}`}>
                  {conv}% avanzan
                </span>
                <div className="funnel-arrow-line" />
              </div>
            )}

            {/* Fila de etapa */}
            <div className="funnel-row">
              {/* Meta izquierda */}
              <div className="funnel-meta">
                <span style={{ fontSize: 13, lineHeight: 1 }}>{stage.emoji}</span>
                <span className="funnel-label-text">{stage.label}</span>
              </div>

              {/* Barra centrada */}
              <div className="funnel-bar-wrap">
                <div
                  className="funnel-bar"
                  style={{
                    width: `${barW}%`,
                    background: `${stage.color}`,
                    opacity: 0.75 + (barW / 100) * 0.25,
                  }}
                />
              </div>

              {/* Números derecha */}
              <div className="funnel-nums">
                <span className="funnel-count" style={{ color: stage.color }}>
                  {stage.count}
                </span>
                <span className="funnel-pct">{pct}%</span>
              </div>
            </div>
          </div>
        )
      })}

      {/* Perdidos — separado visualmente */}
      <div className="funnel-lost-divider">
        <div className="funnel-lost-line" />
        <span className="funnel-lost-label">
          {lostCount > 0
            ? `${Math.round((lostCount / total) * 100)}% no convierten`
            : 'sin pérdidas registradas'}
        </span>
        <div className="funnel-lost-line" />
      </div>
      <div className="funnel-row lost-row">
        <div className="funnel-meta">
          <span style={{ fontSize: 13, lineHeight: 1 }}>{lost.emoji}</span>
          <span className="funnel-label-text" style={{ color: 'var(--danger)' }}>{lost.label}</span>
        </div>
        <div className="funnel-bar-wrap">
          <div
            className="funnel-bar"
            style={{
              width: `${Math.max((lostCount / maxCount) * 100, 1)}%`,
              background: 'var(--danger)',
              opacity: 0.35,
            }}
          />
        </div>
        <div className="funnel-nums">
          <span className="funnel-count" style={{ color: 'var(--danger)' }}>{lostCount}</span>
          <span className="funnel-pct" style={{ color: 'var(--danger)' }}>
            {Math.round((lostCount / total) * 100)}%
          </span>
        </div>
      </div>
    </div>
  )
}

/* ── KPI strip ──────────────────────────────────────────── */
function KpiStrip({ leads, loading }) {
  const total      = leads.length
  const activos    = leads.filter(l => l.pipeline_stage === 'Converted').length
  const negoc      = leads.filter(l => l.pipeline_stage === 'Finalizing').length
  const hot        = leads.filter(l => (l._score || 0) >= 85).length
  const warm       = leads.filter(l => (l._score || 0) >= 65 && (l._score || 0) < 85).length
  const conversion = total > 0 ? ((activos / total) * 100).toFixed(1) : '0.0'

  const tiles = [
    { label: 'Total leads',  value: total,            color: 'var(--text-body)' },
    { label: '🔥 HOT',       value: hot,              color: '#E8612C' },
    { label: '◉ WARM',       value: warm,             color: '#C9983A' },
    { label: 'Negociación',  value: negoc,            color: 'var(--warn)' },
    { label: 'Conversión',   value: `${conversion}%`, color: 'var(--brand)' },
  ]

  return (
    <div className="kpi-strip">
      {tiles.map(t => (
        <div key={t.label} className="kpi-strip-tile">
          <div className="kpi-strip-label">{t.label}</div>
          {loading
            ? <div className="loading-shimmer" style={{ height: 24, width: '50%', margin: '2px 0' }} />
            : <div className="kpi-strip-value" style={{ color: t.color }}>{t.value}</div>
          }
        </div>
      ))}
    </div>
  )
}

/* ── Outreach ring stats ────────────────────────────────── */
function OutreachStats({ leads }) {
  const total   = leads.length || 1
  const stats = [
    { key: 'SENT',             label: 'Enviados',    color: 'var(--info)',   icon: '✉' },
    { key: 'OPENED',           label: 'Abiertos',    color: 'var(--warn)',   icon: '👁' },
    { key: 'REPLIED_POSITIVE', label: 'Positivos',   color: 'var(--ok)',     icon: '✓' },
    { key: 'MEETING_BOOKED',   label: 'Reuniones',   color: 'var(--brand)',  icon: '◉' },
  ]

  return (
    <div className="card" style={{ marginBottom: 0 }}>
      <div className="card-title">Outreach</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {stats.map(s => {
          const count = leads.filter(l => l.outreach_status === s.key).length
          const pct   = Math.round((count / total) * 100)
          return (
            <div key={s.key} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 11, width: 14, textAlign: 'center', color: s.color }}>{s.icon}</span>
              <span style={{ fontSize: 11, color: 'var(--text-muted)', minWidth: 72 }}>{s.label}</span>
              <div style={{ flex: 1, height: 4, background: 'var(--surface-3)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${pct}%`, background: s.color, borderRadius: 2, transition: 'width 0.7s ease' }} />
              </div>
              <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: s.color, minWidth: 20, textAlign: 'right' }}>{count}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ── Recent leads feed ──────────────────────────────────── */
function RecentFeed({ leads }) {
  const recent = [...leads]
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    .slice(0, 7)

  return (
    <div className="card">
      <div className="card-title">Últimos leads</div>
      {recent.length === 0
        ? <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-faint)' }}>Sin datos</div>
        : recent.map(lead => {
          const cfg  = getStageConfig(lead.pipeline_stage)
          const name = [lead.firstName, lead.lastName].filter(Boolean).join(' ') || 'Sin nombre'
          return (
            <div key={lead.id} className="activity-item">
              <div className="activity-dot" style={{ background: cfg.color, marginTop: 5, flexShrink: 0 }} />
              <div style={{ minWidth: 0 }}>
                <div className="activity-text" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  <strong style={{ color: 'var(--text)', marginRight: 4 }}>{name}</strong>
                  {lead.company && <span style={{ color: 'var(--text-faint)' }}>· {lead.company}</span>}
                </div>
                <div className="activity-time">
                  {cfg.emoji} {cfg.label}
                  {lead.createdAt && (
                    <> · {new Date(lead.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}</>
                  )}
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

/* ── Page ────────────────────────────────────────────────── */
export default function Dashboard({ leads, loading }) {
  const today = new Date().toLocaleDateString('es-ES', {
    weekday: 'long', day: 'numeric', month: 'long',
  })

  return (
    <div className="fade-in">
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{
          fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 600,
          color: 'var(--text)', letterSpacing: '-0.4px', marginBottom: 3,
        }}>
          Centro de Operaciones
        </h1>
        <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'capitalize' }}>
          Grenoucerie · {today}
        </div>
      </div>

      {/* KPIs */}
      <KpiStrip leads={leads} loading={loading} />

      {/* Hero: funnel + lateral */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 14, marginTop: 14 }}>

        {/* Funnel card */}
        <div className="card" style={{ overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 0 }}>
            <div className="card-title" style={{ marginBottom: 0 }}>Embudo de prospección</div>
            {!loading && (
              <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-faint)' }}>
                {leads.length} leads totales
              </span>
            )}
          </div>

          {loading
            ? (
              <div style={{ paddingTop: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[80, 65, 50, 38, 28].map((w, i) => (
                  <div key={i} className="loading-shimmer" style={{ height: 22, width: `${w}%`, margin: '0 auto', borderRadius: 4 }} />
                ))}
              </div>
            )
            : <FunnelChart leads={leads} />
          }
        </div>

        {/* Columna lateral */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <OutreachStats leads={leads} />
          <RecentFeed leads={leads} />
        </div>
      </div>
    </div>
  )
}

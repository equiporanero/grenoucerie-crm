import { useState, useMemo } from 'react'
import { getStageConfig } from '../lib/supabase.js'

const SORT_OPTIONS = [
  { id: 'score',   label: '🔥 Score'       },
  { id: 'newest',  label: 'Más reciente'   },
  { id: 'name',    label: 'Nombre A-Z'     },
  { id: 'company', label: 'Empresa A-Z'    },
  { id: 'stage',   label: 'Etapa pipeline' },
]

const STAGE_FILTER_OPTIONS = [
  { id: 'all',          label: 'Todas las etapas' },
  { id: 'Identify',     label: '🔍 Prospección'   },
  { id: 'Engage_AI',    label: '📞 Contacto IA'   },
  { id: 'Engage_Human', label: '📞 Contacto HH'   },
  { id: 'Offering',     label: '📦 Muestra'        },
  { id: 'Finalizing',   label: '🤝 Negociación'    },
  { id: 'Converted',    label: '✅ Activo'         },
  { id: 'Closed',       label: '❌ Perdido'        },
]

function HeatBadge({ lead }) {
  const h = lead._heat
  if (!h) return null
  return (
    <span style={{
      fontSize: 8, fontFamily: 'var(--font-mono)', fontWeight: 700,
      padding: '2px 6px', borderRadius: 20,
      background: h.bg, color: h.color, border: `1px solid ${h.border}`,
      whiteSpace: 'nowrap',
    }}>
      {h.emoji} {lead._score}
    </span>
  )
}

const OUTREACH_CFG = {
  SENT:              { label: 'enviado',    color: 'var(--info)'   },
  OPENED:            { label: 'abierto',    color: 'var(--warn)'   },
  REPLIED_POSITIVE:  { label: '✓ positivo', color: 'var(--ok)'     },
  MEETING_BOOKED:    { label: '◉ reunión',  color: 'var(--brand)'  },
  REPLIED_NEGATIVE:  { label: '✕ negativo', color: 'var(--danger)' },
  BOUNCED:           { label: '⊘ bounce',   color: 'var(--danger)' },
  NOT_STARTED:       { label: 'pendiente',  color: 'var(--text-faint)' },
}

function LeadRow({ lead, rank, onEdit, onDelete }) {
  const [hover, setHover] = useState(false)
  const cfg      = getStageConfig(lead.pipeline_stage)
  const name     = [lead.firstName, lead.lastName].filter(Boolean).join(' ') || '—'
  const initials = ((lead.firstName?.[0] || '') + (lead.lastName?.[0] || '')).toUpperCase() || '?'
  const oc       = OUTREACH_CFG[lead.outreach_status] || { label: lead.outreach_status || '—', color: 'var(--text-faint)' }

  return (
    <tr
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ background: hover ? 'var(--surface-2)' : 'transparent', transition: 'background 0.1s' }}
    >
      {/* Rank */}
      <td style={{ padding: '8px 10px 8px 14px', width: 32, fontSize: 9, fontFamily: 'var(--font-mono)', color: 'var(--text-faint)', textAlign: 'right' }}>
        {rank}
      </td>

      {/* Nombre */}
      <td style={{ padding: '8px 12px', minWidth: 160 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
            background: `${cfg.color}18`, border: `1px solid ${cfg.color}44`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 8, fontFamily: 'var(--font-mono)', color: cfg.color,
          }}>
            {initials}
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 12, color: 'var(--text)', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 150 }}>
              {name}
            </div>
            {lead.jobTitle && (
              <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'var(--text-faint)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 150 }}>
                {lead.jobTitle}
              </div>
            )}
          </div>
        </div>
      </td>

      {/* Empresa */}
      <td style={{ padding: '8px 12px', fontSize: 11, color: 'var(--text-body)', maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {lead.company || '—'}
      </td>

      {/* Score */}
      <td style={{ padding: '8px 12px' }}>
        <HeatBadge lead={lead} />
      </td>

      {/* Etapa */}
      <td style={{ padding: '8px 12px' }}>
        <span style={{
          fontSize: 9, fontFamily: 'var(--font-mono)',
          background: `${cfg.color}1a`, color: cfg.color,
          border: `1px solid ${cfg.color}44`,
          padding: '2px 6px', borderRadius: 20, whiteSpace: 'nowrap',
        }}>
          {cfg.emoji} {cfg.label}
        </span>
      </td>

      {/* Outreach */}
      <td style={{ padding: '8px 12px' }}>
        <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: oc.color, whiteSpace: 'nowrap' }}>
          {oc.label}
        </span>
      </td>

      {/* Email */}
      <td style={{ padding: '8px 12px', fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {lead.email
          ? <a href={`mailto:${lead.email}`} style={{ color: 'var(--info)', textDecoration: 'none' }} onClick={e => e.stopPropagation()}>{lead.email}</a>
          : '—'
        }
      </td>

      {/* Acciones */}
      <td style={{ padding: '8px 12px' }}>
        <div style={{ display: 'flex', gap: 4, opacity: hover ? 1 : 0, transition: 'opacity 0.15s' }}>
          <button
            onClick={() => onEdit(lead)}
            title="Editar"
            style={{
              padding: '3px 8px', borderRadius: 4,
              background: 'var(--surface-3)', border: '1px solid var(--border)',
              color: 'var(--text-muted)', fontSize: 10, cursor: 'pointer',
            }}
          >
            ✎
          </button>
          <button
            onClick={() => {
              const name = [lead.firstName, lead.lastName].filter(Boolean).join(' ') || lead.company || 'este lead'
              if (window.confirm(`¿Eliminar a ${name}?`)) onDelete(lead.id)
            }}
            title="Eliminar"
            style={{
              padding: '3px 7px', borderRadius: 4,
              background: 'var(--danger-bg)', border: '1px solid var(--danger-border)',
              color: 'var(--danger)', fontSize: 10, cursor: 'pointer',
            }}
          >
            ✕
          </button>
        </div>
      </td>
    </tr>
  )
}

export default function Leads({ leads, loading, onEdit, onDelete }) {
  const [search,      setSearch]      = useState('')
  const [stageFilter, setStageFilter] = useState('all')
  const [sortBy,      setSortBy]      = useState('score')

  const filtered = useMemo(() => {
    let list = [...leads]

    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(l =>
        [l.firstName, l.lastName, l.company, l.email, l.jobTitle]
          .filter(Boolean).some(v => v.toLowerCase().includes(q))
      )
    }

    if (stageFilter !== 'all') {
      list = list.filter(l => l.pipeline_stage === stageFilter)
    }

    const STAGE_ORDER = ['Identify','Engage_AI','Engage_Human','Offering','Finalizing','Converted','Closed']
    if      (sortBy === 'score')   list.sort((a, b) => (b._score || 0) - (a._score || 0))
    else if (sortBy === 'newest')  list.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    else if (sortBy === 'name')    list.sort((a, b) => (a.firstName || '').localeCompare(b.firstName || ''))
    else if (sortBy === 'company') list.sort((a, b) => (a.company || '').localeCompare(b.company || ''))
    else if (sortBy === 'stage')   list.sort((a, b) => STAGE_ORDER.indexOf(a.pipeline_stage) - STAGE_ORDER.indexOf(b.pipeline_stage))

    return list
  }, [leads, search, stageFilter, sortBy])

  const hotCount  = leads.filter(l => (l._score || 0) >= 85).length
  const warmCount = leads.filter(l => (l._score || 0) >= 65 && (l._score || 0) < 85).length
  const coldCount = leads.filter(l => (l._score || 0) < 65 && l.pipeline_stage !== 'Closed').length

  return (
    <div className="fade-in">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 600, color: 'var(--text)', letterSpacing: '-0.4px', marginBottom: 4 }}>
            Leads
          </h1>
          <div style={{ display: 'flex', gap: 12, fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
            <span>{loading ? '—' : `${filtered.length}/${leads.length}`}</span>
            {hotCount  > 0 && <span style={{ color: '#E8612C' }}>🔥 {hotCount}</span>}
            {warmCount > 0 && <span style={{ color: '#C9983A' }}>◉ {warmCount}</span>}
            {coldCount > 0 && <span style={{ color: 'var(--info)' }}>❄ {coldCount}</span>}
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14, alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
          <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-faint)', fontSize: 11, pointerEvents: 'none' }}>🔎</span>
          <input
            className="search-input"
            style={{ paddingLeft: 28, width: '100%', boxSizing: 'border-box' }}
            placeholder="Buscar nombre, empresa, email…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select
          className="search-input"
          value={stageFilter}
          onChange={e => setStageFilter(e.target.value)}
          style={{ minWidth: 150 }}
        >
          {STAGE_FILTER_OPTIONS.map(o => <option key={o.id} value={o.id} style={{ background: '#131618' }}>{o.label}</option>)}
        </select>
        <select
          className="search-input"
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          style={{ minWidth: 140 }}
        >
          {SORT_OPTIONS.map(o => <option key={o.id} value={o.id} style={{ background: '#131618' }}>{o.label}</option>)}
        </select>
      </div>

      {/* Tabla */}
      {loading
        ? <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>{Array.from({ length: 12 }).map((_, i) => <div key={i} className="loading-shimmer" style={{ height: 42, borderRadius: 5 }} />)}</div>
        : filtered.length === 0
          ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-faint)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
              {search || stageFilter !== 'all' ? 'Sin resultados' : 'No hay leads'}
            </div>
          )
          : (
            <div className="table-wrapper">
              <table className="leads-table">
                <thead>
                  <tr>
                    <th style={{ padding: '8px 10px 8px 14px', width: 30, textAlign: 'right' }}>#</th>
                    <th style={{ padding: '8px 12px', width: '22%' }}>NOMBRE</th>
                    <th style={{ padding: '8px 12px', width: '16%' }}>EMPRESA</th>
                    <th style={{ padding: '8px 12px', width: 80 }}>SCORE</th>
                    <th style={{ padding: '8px 12px', width: '14%' }}>ETAPA</th>
                    <th style={{ padding: '8px 12px', width: '13%' }}>OUTREACH</th>
                    <th style={{ padding: '8px 12px' }}>EMAIL</th>
                    <th style={{ padding: '8px 12px', width: 70 }}></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((lead, i) => (
                    <LeadRow
                      key={lead.id}
                      lead={lead}
                      rank={i + 1}
                      onEdit={onEdit}
                      onDelete={onDelete}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )
      }
    </div>
  )
}

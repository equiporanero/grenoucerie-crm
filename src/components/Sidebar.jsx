import { HermesHistory } from './HermesBar.jsx'

export default function Sidebar({
  view, setView,
  marketFilter, setMarketFilter,
  stats,
  hermesHistory = [],
  onNewLead,
}) {
  const nav = [
    { id: 'dashboard', label: 'Dashboard', icon: '⬡' },
    { id: 'pipeline',  label: 'Pipeline',  icon: '◫', badge: stats?.total },
    { id: 'leads',     label: 'Leads',     icon: '◈', badge: stats?.total },
  ]

  const markets = [
    { id: 'all',     label: 'Todos',   flag: '🌐', count: stats?.total },
    { id: 'francia', label: 'Francia', flag: '🇫🇷', count: stats?.byMarket?.francia },
    { id: 'espana',  label: 'España',  flag: '🇪🇸', count: stats?.byMarket?.espana  },
    { id: 'petfood', label: 'Petfood', flag: '🐾', count: stats?.byMarket?.petfood  },
  ]

  const hermesOnline = hermesHistory.length > 0 &&
    (Date.now() - hermesHistory[0]?.ts?.getTime()) < 300_000 // activo si <5min

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <span className="sidebar-logo-icon">🐸</span>
        <div>
          <div className="sidebar-logo-text">Grenoucerie</div>
          <span className="sidebar-logo-sub">CRM v2</span>
        </div>
      </div>

      {/* Botón nuevo lead */}
      <div style={{ padding: '10px 12px 0' }}>
        <button
          onClick={onNewLead}
          style={{
            width: '100%', padding: '8px 0',
            background: 'var(--brand-dim)',
            border: '1px solid var(--brand-border)',
            borderRadius: 'var(--r-sm)',
            color: 'var(--brand)', fontSize: 12, fontWeight: 600,
            cursor: 'pointer', fontFamily: 'var(--font-ui)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 6, transition: 'all 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--brand)'; e.currentTarget.style.color = '#0A1A0B' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--brand-dim)'; e.currentTarget.style.color = 'var(--brand)' }}
        >
          + Nuevo lead
        </button>
      </div>

      {/* Navegación */}
      <div className="sidebar-section">
        <div className="sidebar-section-label">Vistas</div>
        {nav.map(item => (
          <button
            key={item.id}
            className={`sidebar-nav-item ${view === item.id ? 'active' : ''}`}
            onClick={() => setView(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
            {item.badge != null && (
              <span className="nav-badge">{item.badge}</span>
            )}
          </button>
        ))}
      </div>

      {/* Filtro de mercado */}
      <div className="sidebar-section">
        <div className="sidebar-section-label">Mercado</div>
        <div className="market-pills">
          {markets.map(m => (
            <button
              key={m.id}
              className={`market-pill ${marketFilter === m.id ? 'active' : ''}`}
              onClick={() => setMarketFilter(m.id)}
            >
              <span>{m.flag}</span>
              <span style={{ flex: 1 }}>{m.label}</span>
              {m.count != null && (
                <span style={{
                  fontSize: 10, fontFamily: 'var(--font-mono)',
                  color: 'var(--text-faint)',
                  background: 'var(--surface-3)',
                  padding: '1px 5px', borderRadius: 8,
                }}>
                  {m.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="sidebar-footer">
        {/* KPIs rápidos */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 4, marginBottom: 10 }}>
          {[
            { label: 'activos',  value: stats?.activos ?? '—',     color: 'var(--ok)'   },
            { label: 'neg.',     value: stats?.negociacion ?? '—',  color: 'var(--warn)' },
            { label: 'total',    value: stats?.total ?? '—',        color: 'var(--text-muted)' },
          ].map(k => (
            <div key={k.label} style={{
              padding: '6px 0', background: 'var(--surface-2)',
              borderRadius: 'var(--r-xs)', textAlign: 'center',
              border: '1px solid var(--border)',
            }}>
              <div style={{ fontSize: 13, fontFamily: 'var(--font-display)', fontWeight: 600, color: k.color }}>{k.value}</div>
              <div style={{ fontSize: 8, fontFamily: 'var(--font-mono)', color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.3px' }}>{k.label}</div>
            </div>
          ))}
        </div>

        {/* Hermes status + historial */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span className={`status-dot ${hermesOnline ? 'online' : ''}`} />
            <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'var(--text-faint)' }}>
              Hermes
            </span>
          </div>
          <HermesHistory events={hermesHistory} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span className="status-dot online" />
            <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'var(--text-faint)' }}>
              Supabase
            </span>
          </div>
        </div>
      </div>
    </aside>
  )
}

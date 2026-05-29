const navGroups = [
    {
        label: 'CORE',
        items: [
            { id: 'dashboard',   icon: '▣', label: 'Centro de Mando' },
            { id: 'pipeline',    icon: '⇒', label: 'Pipeline B2B' },
            { id: 'agents',      icon: '🤖', label: 'Agentes', highlight: true, badge: '8' },
        ],
    },
    {
        label: 'GAMAS',
        items: [
            { id: 'francia',    icon: '🇫🇷', label: 'Francia ×20' },
            { id: 'espana',      icon: '🇪🇸', label: 'España' },
            { id: 'petfood',     icon: '🐾', label: 'Petfood' },
            { id: 'contenidos',  icon: '✦', label: 'Contenidos' },
        ],
    },
    {
        label: 'VENTAS',
        items: [
            { id: 'calculadora',    icon: '💰', label: 'Márgenes' },
            { id: 'outbound',        icon: '🚀', label: 'Outbound FR' },
            { id: 'revenuetracker',  icon: '🎯', label: 'Revenue €500K' },
        ],
    },
    {
        label: 'SISTEMA',
        items: [
            { id: 'rrss',       icon: '📱', label: 'Redes Sociales' },
            { id: 'roadmap',    icon: '◈', label: 'Roadmap 90d' },
            { id: 'conexiones', icon: '⬡', label: 'Conexiones', highlight: true },
            { id: 'prompt',     icon: '⊛', label: 'Prompt Maestro' },
            { id: 'stack',      icon: '◎', label: 'Stack Tech' },
        ],
    },
]

export default function Sidebar({ vistaActual, cambiarVista, tema, toggleTema }) {
    return (
        <nav className="sidebar">
            <div className="sidebar-logo">
                <div className="sidebar-logo-mark">
                    <div className="sidebar-logo-icon">🐸</div>
                    <div>
                        <div className="sidebar-logo-name">Grenoucerie</div>
                    </div>
                </div>
                <div className="sidebar-logo-tag">Marketing CMD v8.0</div>
            </div>

            <div className="sidebar-nav">
                {navGroups.map((group) => (
                    <div key={group.label}>
                        <p className="nav-group-label">{group.label}</p>
                        {group.items.map((item) => (
                            <button
                                key={item.id}
                                className={`nav-item ${vistaActual === item.id ? 'active' : ''}`}
                                onClick={() => cambiarVista(item.id)}
                                title={item.label}
                            >
                                <span className="nav-icon" style={{
                                    fontFamily: 'monospace',
                                    color: vistaActual === item.id
                                        ? 'var(--brand)'
                                        : item.highlight
                                        ? 'var(--accent)'
                                        : undefined
                                }}>
                                    {item.icon}
                                </span>
                                <span style={{
                                    color: item.highlight && vistaActual !== item.id
                                        ? 'var(--accent)'
                                        : undefined,
                                    flex: 1,
                                }}>
                                    {item.label}
                                </span>
                                {item.badge && (
                                    <span style={{
                                        marginLeft: 'auto',
                                        padding: '1px 5px',
                                        borderRadius: '4px',
                                        fontSize: '8px',
                                        fontFamily: 'DM Mono, monospace',
                                        background: 'var(--brand-glow)',
                                        color: 'var(--brand)',
                                        border: '1px solid var(--border-brand)',
                                        fontWeight: 600,
                                        letterSpacing: '0.3px',
                                        flexShrink: 0,
                                    }}>
                                        {item.badge}
                                    </span>
                                )}
                                {!item.highlight && vistaActual !== item.id && item.badge && null}
                            </button>
                        ))}
                    </div>
                ))}
            </div>

            <div className="sidebar-status">
                <div className="status-row">
                    <span className="status-dot" />
                    <span>CMO Panel activo</span>
                </div>
                <div className="sidebar-kpis">
                    <div className="sidebar-kpi-row">
                        <span>Goal</span>
                        <span className="sidebar-kpi-val" style={{ color: 'var(--brand)' }}>€500K</span>
                    </div>
                    <div className="sidebar-kpi-row">
                        <span>Pipeline</span>
                        <span className="sidebar-kpi-val" style={{ color: 'var(--alert)' }}>0 leads</span>
                    </div>
                </div>
                <div style={{
                    marginTop: '10px',
                    padding: '7px 9px',
                    background: 'var(--brand-glow)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-brand)',
                    fontSize: '9px',
                    color: 'var(--brand)',
                    fontFamily: 'DM Mono, monospace',
                    lineHeight: 1.5,
                }}>
                    "La carne más saludable del mundo"
                </div>
                <div style={{ marginTop: '12px' }}>
                    <button
                        onClick={toggleTema}
                        style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            padding: '7px 0',
                            background: tema === 'oscuro' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)',
                            border: '1px solid var(--border)',
                            borderRadius: 'var(--radius-sm)',
                            cursor: 'pointer',
                            fontSize: '10px',
                            fontFamily: 'DM Mono, monospace',
                            color: 'var(--text-muted)',
                            letterSpacing: '0.5px',
                            transition: 'all 0.2s',
                        }}
                        title={tema === 'oscuro' ? 'Cambiar a modo día' : 'Cambiar a modo noche'}
                    >
                        <span style={{ fontSize: '13px' }}>{tema === 'oscuro' ? '☀️' : '🌙'}</span>
                        {tema === 'oscuro' ? 'Activar modo día' : 'Activar modo noche'}
                    </button>
                </div>
            </div>
        </nav>
    )
}

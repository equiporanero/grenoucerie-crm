// Dashboard CMO — Centro de Mando Marketing & Ventas
// Grenoucerie S.L. — Version 6.0 (con Supabase real)
import { useState, useEffect } from 'react'
import { gamas, empresa, nutricion, kpis as kpisStatic } from '../../data/grenoucerie'
import { useCRMData, saveDistributor, saveActivity, deleteDistributor } from '../../hooks/useLeads'

const semaforoColor = {
    verde:   'var(--ok)',
    amarillo:'var(--warn)',
    rojo:    'var(--alert)',
    neutro:  'var(--neutral)',
}

function KpiTile({ label, value, sub, color, pulse }) {
    return (
        <div style={{ padding: '14px 18px', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '130px', position: 'relative', overflow: 'hidden' }}>
            {pulse && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: color || 'var(--brand)', opacity: 0.7 }} />}
            <div style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: 'DM Mono, monospace', textTransform: 'uppercase', letterSpacing: '0.6px' }}>{label}</div>
            <div style={{ fontSize: '22px', fontWeight: 700, fontFamily: 'Space Grotesk, sans-serif', color: color || 'var(--text-heading)', lineHeight: 1 }}>{value}</div>
            {sub && <div style={{ fontSize: '9.5px', color: 'var(--text-faint)', fontFamily: 'DM Mono, monospace' }}>{sub}</div>}
        </div>
    )
}

// ═══ ALERTAS EN TIEMPO REAL DESDE SUPABASE ═══
function AlertaStrip({ crmData }) {
    const [idx, setIdx] = useState(0)

    // Construir alertas dinámicas desde datos reales
    const alertas = []

    if (crmData.connected) {
        // Alertas desde Supabase
        if (crmData.alerts) {
            crmData.alerts.slice(0, 3).forEach(a => {
                const sev = a.severity === 'critical' ? 'critico' : a.severity === 'warning' ? 'alerta' : 'info'
                const icon = sev === 'critico' ? '🔴' : sev === 'alerta' ? '🟡' : '🔵'
                alertas.push({ tipo: sev, icono: icon, texto: a.title + (a.description ? ': ' + a.description.slice(0, 80) : '') })
            })
        }

        // Alertas automáticas por datos
        if (crmData.total === 0) {
            alertas.unshift({ tipo: 'critico', icono: '🔴', texto: 'CRM vacío — 0 distribuidores cargados. Sin pipeline, sin crecimiento.' })
        } else {
            alertas.unshift({ tipo: 'ok', icono: '🟢', texto: `CRM activo — ${crmData.total} distribuidores, ${crmData.deals.length} deals en pipeline.` })
        }

        if (crmData.byMarket.FR === 0) {
            alertas.push({ tipo: 'info', icono: '🔵', texto: 'Francia: 0 distribuidores cargados. Ventana de oportunidad abierta.' })
        }

        // Distribuidores sin contacto reciente
        const staleCount = crmData.distributors?.filter(d => {
            if (!d.last_contact_at) return true
            const daysSince = (Date.now() - new Date(d.last_contact_at).getTime()) / (1000 * 60 * 60 * 24)
            return daysSince > 14
        }).length || 0

        if (staleCount > 0) {
            alertas.push({ tipo: 'alerta', icono: '🟡', texto: `${staleCount} distribuidor(es) sin contacto >14 días.` })
        }
    } else {
        alertas.push({ tipo: 'info', icono: '⚪', texto: 'Modo offline — Datos de demo. Configura Supabase para datos en tiempo real.' })
    }

    if (alertas.length === 0) return null

    useEffect(() => {
        const t = setInterval(() => setIdx(i => (i + 1) % alertas.length), 4000)
        return () => clearInterval(t)
    }, [alertas.length])

    const alerta = alertas[idx]
    const border = alerta.tipo === 'critico' ? 'var(--alert)' : alerta.tipo === 'ok' ? 'var(--ok)' : alerta.tipo === 'alerta' ? 'var(--warn)' : '#63b3ed'
    const bg = alerta.tipo === 'critico' ? 'var(--alert-bg)' : alerta.tipo === 'ok' ? 'var(--ok-bg)' : alerta.tipo === 'alerta' ? 'var(--warn-bg)' : 'rgba(99,179,237,0.08)'

    return (
        <div style={{ padding: '8px 16px', background: bg, border: `1px solid ${border}33`, borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', transition: 'all 0.4s ease' }}>
            <span style={{ fontSize: '13px' }}>{alerta.icono}</span>
            <span style={{ fontSize: '11.5px', color: 'var(--text-body)', fontFamily: 'DM Mono, monospace', flex: 1 }}>{alerta.texto}</span>
            <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
                {alertas.map((_, i) => (
                    <div key={i} style={{ width: '5px', height: '5px', borderRadius: '50%', background: i === idx ? border : 'var(--border-strong)', transition: 'background 0.3s' }} />
                ))}
            </div>
        </div>
    )
}

// ═══ MINI EMBUDO ═══
function MiniEmbudo({ crmData, onNavigate }) {
    const stages = [
        { id: 'tofu', label: 'TOFU', sub: 'Awareness', kpi: 'IG 1K', color: '#6b8a5e', w: 100 },
        { id: 'mofu', label: 'MOFU', sub: 'Educacion', kpi: 'Web 500/m', color: '#93C572', w: 75 },
        { id: 'bofu', label: 'BOFU', sub: 'Conversion', kpi: `${crmData.total} leads`, color: '#BAB86C', w: 50 },
        { id: 'pipeline', label: 'PIPELINE', sub: '6 fases B2B', kpi: `${crmData.byStage?.activo || 0} activos`, color: '#4caf50', w: 30 },
    ]
    return (
        <div className="card" style={{ padding: '16px', cursor: 'pointer' }} onClick={onNavigate}>
            <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', display: 'flex', justifyContent: 'space-between' }}>
                <span>Embudo de Mercado</span>
                <span style={{ color: 'var(--brand)', fontSize: '9px' }}>ver funnel ↗</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                {stages.map(s => (
                    <div key={s.id} style={{ width: `${s.w}%`, minWidth: '120px', background: `${s.color}15`, border: `1px solid ${s.color}33`, borderRadius: '3px', padding: '5px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <span style={{ fontSize: '9px', fontWeight: 700, color: s.color, fontFamily: 'DM Mono, monospace' }}>{s.label}</span>
                            <span style={{ fontSize: '8px', color: 'var(--text-faint)', fontFamily: 'DM Mono, monospace', marginLeft: '4px' }}>{s.sub}</span>
                        </div>
                        <span style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: 'DM Mono, monospace' }}>{s.kpi}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

// ═══ MINI PIPELINE ═══
function PipelineMini({ crmData, onNavigate }) {
    const fases = [
        { id: 'prospeccion', label: 'Prospeccion', emoji: '🔍' },
        { id: 'contacto', label: 'Contacto', emoji: '📞' },
        { id: 'muestra', label: 'Muestra', emoji: '📦' },
        { id: 'negociacion', label: 'Negociacion', emoji: '🤝' },
        { id: 'activo', label: 'Activo', emoji: '✅' },
        { id: 'embajador', label: 'Embajador', emoji: '⭐' },
    ]
    const bs = crmData.byStage || {}
    const total = Object.values(bs).reduce((a, b) => a + b, 0)
    return (
        <div className="card" style={{ padding: '16px', cursor: 'pointer' }} onClick={onNavigate}>
            <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', display: 'flex', justifyContent: 'space-between' }}>
                <span>Pipeline B2B</span>
                <span style={{ color: 'var(--brand)', fontSize: '9px' }}>ver kanban ↗</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '6px' }}>
                {fases.map(f => {
                    const count = bs[f.id] || 0
                    return (
                        <div key={f.id} style={{ textAlign: 'center', padding: '8px 4px', background: count > 0 ? 'var(--ok-bg)' : 'var(--bg-elevated)', border: `1px solid ${count > 0 ? 'var(--ok)33' : 'var(--border)'}`, borderRadius: 'var(--radius-sm)' }}>
                            <div style={{ fontSize: '14px' }}>{f.emoji}</div>
                            <div style={{ fontSize: '16px', fontWeight: 700, color: count > 0 ? 'var(--ok)' : 'var(--text-faint)', fontFamily: 'Space Grotesk, sans-serif' }}>{count}</div>
                            <div style={{ fontSize: '7.5px', color: 'var(--text-muted)', fontFamily: 'DM Mono, monospace', lineHeight: 1.2, marginTop: '2px' }}>{f.label}</div>
                        </div>
                    )
                })}
            </div>
            <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between', fontSize: '9px', fontFamily: 'DM Mono, monospace', color: 'var(--text-faint)' }}>
                <span>Total: <span style={{ color: total > 0 ? 'var(--ok)' : 'var(--alert)', fontWeight: 700 }}>{total}</span></span>
                <span>Meta 90d: <span style={{ color: 'var(--warn)' }}>50+</span></span>
            </div>
        </div>
    )
}

// ═══ SUPERGO BAR CON DATOS REALES ═══
function SupergoBar({ crmData }) {
    const rev = crmData.revenue?.total || 75000
    const goal = crmData.revenue?.goal || 500000
    const pct = crmData.revenue?.pct || Math.round(rev / goal * 100)
    return (
        <div style={{ padding: '14px 20px', marginBottom: '20px', background: 'var(--brand-glow)', border: '1px solid var(--border-brand)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
            <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '14px', fontWeight: 700, color: 'var(--brand)' }}>🎯 SUPERPATRÓN 2026</span>
                    <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '12px', color: 'var(--brand)' }}>{pct}%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'DM Mono, monospace' }}>
                    <span>€{rev.toLocaleString('es-ES')}</span>
                    <span>Meta: €{goal.toLocaleString('es-ES')}</span>
                </div>
                <div style={{ height: '6px', background: 'var(--border)', borderRadius: '3px', overflow: 'hidden', marginTop: '6px' }}>
                    <div style={{ height: '100%', width: `${Math.min(pct, 100)}%`, background: `linear-gradient(90deg, var(--ok), var(--brand))`, borderRadius: '3px', transition: 'width 1s' }} />
                </div>
                <div style={{ fontSize: '9px', color: 'var(--text-faint)', fontFamily: 'DM Mono, monospace', marginTop: '4px' }}>
                    3 mercados · 4 gamas · CRM {crmData.connected ? `● ${crmData.total} dist.` : 'offline'}
                </div>
            </div>
        </div>
    )
}

// ═══ ACCIONES SEMANALES ═══
function AccionesSemanales({ crmData }) {
    const acciones = [
        { color: 'var(--alert)', icono: '🔴', accion: 'Cargar distribuidores reales en CRM (HubSpot o Supabase)', deadline: 'HOY' },
        { color: 'var(--alert)', icono: '🔴', accion: `Publicar primer post TOFU: "¿Conoces la carne más saludable del mundo?"`, deadline: 'Esta semana' },
        { color: 'var(--warn)', icono: '🟡', accion: 'Construir lista 50 targets: 20 Vietnam + 20 Premium + 10 restaurantes', deadline: 'Semana 2' },
        { color: 'var(--warn)', icono: '🟡', accion: 'Activar LinkedIn: 0 posts, 0 impresiones. Meta: 10K/mes', deadline: 'Semana 2' },
        { color: 'var(--ok)', icono: '🟢', accion: 'Publicar tabla nutricional rana vs carnes en web', deadline: 'Semana 3' },
    ]
    return (
        <div className="card" style={{ padding: '16px' }}>
            <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>Prioridades esta semana</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {acciones.map((a, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '8px 10px', background: i < 2 ? 'var(--alert-bg)' : i < 4 ? 'var(--warn-bg)' : 'var(--ok-bg)', borderRadius: 'var(--radius-sm)', border: `1px solid ${i < 2 ? 'var(--alert)' : i < 4 ? 'var(--warn)' : 'var(--ok)'}22` }}>
                        <span style={{ fontSize: '11px', flexShrink: 0, marginTop: '1px' }}>{a.icono}</span>
                        <div style={{ flex: 1, fontSize: '11px', color: 'var(--text-body)', lineHeight: 1.4 }}>{a.accion}</div>
                        <span style={{ fontSize: '8px', color: a.color, fontFamily: 'DM Mono, monospace', padding: '2px 6px', borderRadius: '10px', background: `${a.color}15`, border: `1px solid ${a.color}33`, flexShrink: 0, whiteSpace: 'nowrap' }}>{a.deadline}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

// ═══ DISTRIBUIDORES RECIENTES (desde Supabase) ═══
function DistribuidoresRecientes({ crmData }) {
    const dists = crmData.distributors?.slice(0, 5) || []
    if (dists.length === 0) {
        return (
            <div className="card" style={{ padding: '16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '12px' }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>🏢</div>
                No hay distribuidores cargados.<br />
                <span style={{ fontSize: '10px' }}>Ve a Pipeline → Añadir lead para empezar</span>
            </div>
        )
    }
    return (
        <div className="card" style={{ padding: '16px' }}>
            <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>Distribuidores recientes</div>
            {dists.map(d => (
                <div key={d.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                    <div>
                        <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-heading)' }}>{d.name}</div>
                        <div style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: 'DM Mono, monospace' }}>{d.region} · {d.channel} · {d.assigned_to}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '9px', padding: '2px 7px', borderRadius: '10px', background: d.stage === 'signed' || d.stage === 'active' ? 'var(--ok-bg)' : 'var(--warn-bg)', color: d.stage === 'signed' || d.stage === 'active' ? 'var(--ok)' : 'var(--warn)', fontFamily: 'DM Mono, monospace' }}>{d.stage}</span>
                        {d.deal_value_eur > 0 && <div style={{ fontSize: '10px', color: 'var(--brand)', fontWeight: 600, marginTop: '2px' }}>€{d.deal_value_eur.toLocaleString('es-ES')}</div>}
                    </div>
                </div>
            ))}
        </div>
    )
}

// ═══ ACTIVIDADES RECIENTES (desde Supabase) ═══
function ActividadesRecientes({ crmData }) {
    const acts = crmData.activities?.slice(0, 5) || []
    const actIcon = { email: '📧', call: '📞', meeting: '🤝', note: '📝', task: '✅' }

    if (acts.length === 0) {
        return (
            <div className="card" style={{ padding: '16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '12px' }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>📋</div>
                No hay actividades registradas.<br />
                <span style={{ fontSize: '10px' }}>Las actividades se crean desde el Pipeline o módulo de Actividades</span>
            </div>
        )
    }
    return (
        <div className="card" style={{ padding: '16px' }}>
            <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>Actividades recientes</div>
            {acts.map(a => (
                <div key={a.id} style={{ display: 'flex', gap: '8px', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                    <span style={{ fontSize: '14px' }}>{actIcon[a.type] || '📌'}</span>
                    <div>
                        <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-heading)' }}>{a.subject}</div>
                        <div style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: 'DM Mono, monospace' }}>{a.type} · {a.status} · {a.created_by || 'Sistema'}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}

// ═══ ACTIVAS ALERTAS (desde Supabase) ═══
function AlertasActivas({ crmData }) {
    const alerts = crmData.alerts || []

    // Generar alertas automáticas
    const autoAlerts = []

    if (crmData.connected && crmData.total === 0) {
        autoAlerts.push({ severity: 'critical', title: 'CRM vacío', description: '0 distribuidores cargados.', suggested_action: 'Cargar distribuidores reales desde Pipeline' })
    }

    if (crmData.byMarket && crmData.byMarket.FR === 0 && crmData.connected) {
        autoAlerts.push({ severity: 'info', title: 'Francia sin datos', description: '0 distribuidores franceses cargados.', suggested_action: 'Investigar Top 50 distribuidores FR' })
    }

    const allAlerts = [...alerts, ...autoAlerts]

    if (allAlerts.length === 0) {
        return (
            <div className="card" style={{ padding: '16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '12px' }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>✅</div>
                Todo en orden. Sin alertas activas.
            </div>
        )
    }

    return (
        <div>
            {allAlerts.map((a, i) => {
                const sev = a.severity || 'info'
                const border = sev === 'critical' ? 'var(--alert)' : sev === 'warning' ? 'var(--warn)' : 'var(--info)'
                const bg = sev === 'critical' ? 'var(--alert-bg)' : sev === 'warning' ? 'var(--warn-bg)' : 'rgba(59,130,246,0.08)'
                return (
                    <div key={i} style={{ display: 'flex', gap: '12px', padding: '14px', borderRadius: '8px', marginBottom: '10px', borderLeft: `3px solid ${border}`, background: bg }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: border, marginTop: '5px', flexShrink: 0 }} />
                        <div>
                            <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--text-heading)' }}>{a.title}</div>
                            {a.description && <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>{a.description}</div>}
                            {a.suggested_action && <div style={{ fontSize: '10px', color: 'var(--brand)', marginTop: '4px', fontStyle: 'italic' }}>→ {a.suggested_action}</div>}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

// ═══ MERCADOS ═══
const MERCADOS_DATA = (crmData) => [
    {
        id: 'espana', bandera: '🇪🇸', nombre: 'España',
        subtitulo: 'Mercado domestico — Creacion de categoria',
        color: '#c0392b', colorGlow: 'rgba(192,57,43,0.08)', colorBorder: 'rgba(192,57,43,0.25)',
        etiqueta: 'Activo', etiquetaColor: '#4ade80',
        kpis: [
            { label: 'Facturacion/mes', valor: '€60K', meta: '→65K', semaforo: 'verde' },
            { label: 'Clientes B2B', valor: `${crmData.total}`, meta: '→30+', semaforo: crmData.total > 10 ? 'amarillo' : 'rojo' },
            { label: 'Distribuidores FR', valor: `${crmData.byMarket?.FR || 0}`, meta: '→2-3', semaforo: 'neutro' },
            { label: 'Pipeline valor', valor: `€${(crmData.pipelineValue || 0).toLocaleString('es-ES')}`, meta: '→€410K', semaforo: crmData.pipelineValue > 100000 ? 'amarillo' : 'rojo' },
        ],
        acciones: [{ texto: 'Activar CRM + primer post TOFU' }],
        progreso: crmData.revenue?.pct || 0, objetivo: '€720K', periodo: '2026',
    },
    {
        id: 'francia', bandera: '🇫🇷', nombre: 'Francia',
        subtitulo: 'Penetracion — mercado x20 existente',
        color: '#2563eb', colorGlow: 'rgba(37,99,235,0.08)', colorBorder: 'rgba(37,99,235,0.25)',
        etiqueta: 'Expansion', etiquetaColor: 'var(--brand)',
        kpis: [
            { label: 'Distribuidores FR', valor: `${crmData.byMarket?.FR || 0}`, meta: '→2-3', semaforo: 'neutro' },
            { label: 'Potencial vs ES', valor: 'x20', meta: 'Mercado', semaforo: 'verde' },
            { label: 'Presupuesto 90d', valor: '€3-5K', meta: 'Aprobado', semaforo: 'amarillo' },
            { label: 'Leads FR', valor: '0', meta: '→10+', semaforo: 'neutro' },
        ],
        acciones: [{ texto: 'Investigar Top 50 distribuidores FR + 30 restaurantes grenouille' }],
        progreso: 8, objetivo: '€50K', periodo: 'Q4 2026',
    },
    {
        id: 'petfood', bandera: '🐾', nombre: 'Petfood',
        subtitulo: 'Nuevo mercado — innovacion pura',
        color: '#7c3aed', colorGlow: 'rgba(124,58,237,0.08)', colorBorder: 'rgba(124,58,237,0.25)',
        etiqueta: 'Exploracion', etiquetaColor: 'var(--accent)',
        kpis: [
            { label: 'Estado', valor: 'Pre-seed', meta: 'Piloto', semaforo: 'neutro' },
            { label: 'Mercado EU', valor: '€18B', meta: 'Potencial', semaforo: 'verde' },
            { label: 'Competidores', valor: '0', meta: 'Sin rival', semaforo: 'verde' },
            { label: 'Clientes beta', valor: '0', meta: '3 marcas', semaforo: 'neutro' },
        ],
        acciones: [{ texto: 'Investigar requisitos proteina animal alternativa para petfood EU' }],
        progreso: 5, objetivo: 'Piloto', periodo: '2027',
    },
]

function MercadoCard({ mercado, onNavegar }) {
    return (
        <div style={{ background: `linear-gradient(135deg, ${mercado.colorGlow} 0%, var(--bg-card) 60%)`, border: `1px solid ${mercado.colorBorder}`, borderRadius: 'var(--radius-md)', padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '3px', height: '100%', background: mercado.color, borderRadius: '3px 0 0 3px' }} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '24px' }}>{mercado.bandera}</span>
                    <div>
                        <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '15px', fontWeight: 700, color: 'var(--text-heading)' }}>{mercado.nombre}</div>
                        <div style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: 'DM Mono, monospace' }}>{mercado.subtitulo}</div>
                    </div>
                </div>
                <span style={{ padding: '2px 8px', borderRadius: '20px', fontSize: '8.5px', fontFamily: 'DM Mono, monospace', fontWeight: 600, background: `${mercado.etiquetaColor}18`, color: mercado.etiquetaColor, border: `1px solid ${mercado.etiquetaColor}33` }}>{mercado.etiqueta}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                {mercado.kpis.map((kpi, i) => (
                    <div key={i} style={{ padding: '8px 10px', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                        <div style={{ fontSize: '8.5px', color: 'var(--text-muted)', fontFamily: 'DM Mono, monospace', textTransform: 'uppercase', letterSpacing: '0.3px' }}>{kpi.label}</div>
                        <div style={{ fontSize: '16px', fontWeight: 700, color: semaforoColor[kpi.semaforo] || 'var(--text-heading)', fontFamily: 'Space Grotesk, sans-serif', marginTop: '2px' }}>{kpi.valor}</div>
                        <div style={{ fontSize: '8.5px', color: 'var(--text-faint)', fontFamily: 'DM Mono, monospace' }}>{kpi.meta}</div>
                    </div>
                ))}
            </div>
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '8.5px', fontFamily: 'DM Mono, monospace', color: 'var(--text-faint)' }}>
                    <span>Progreso</span>
                    <span style={{ color: mercado.color }}>{mercado.objetivo} · {mercado.periodo}</span>
                </div>
                <div style={{ height: '3px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${mercado.progreso}%`, background: `linear-gradient(90deg, ${mercado.color}88, ${mercado.color})`, borderRadius: '2px' }} />
                </div>
            </div>
            <div style={{ padding: '8px 10px', background: `${mercado.color}0f`, border: `1px solid ${mercado.color}22`, borderRadius: 'var(--radius-sm)', fontSize: '10px', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                <span style={{ color: mercado.etiquetaColor, fontWeight: 600, fontFamily: 'DM Mono, monospace', fontSize: '9px' }}>Accion: </span>
                {mercado.acciones[0].texto}
            </div>
            {onNavegar && (
                <button onClick={onNavegar} style={{ width: '100%', padding: '7px', background: `${mercado.color}12`, border: `1px solid ${mercado.color}30`, borderRadius: 'var(--radius-sm)', color: mercado.color, fontSize: '10px', fontFamily: 'DM Mono, monospace', cursor: 'pointer', transition: 'all 0.2s' }}>
                    Abrir modulo {mercado.nombre} →
                </button>
            )}
        </div>
    )
}

// ═══ COMPONENTE PRINCIPAL ═══
export default function Dashboard({ cambiarVista }) {
    const crmData = useCRMData()
    const today = new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    const navegarMercado = {
        espana: () => cambiarVista('espana'),
        francia: () => cambiarVista('francia'),
        petfood: () => cambiarVista('petfood'),
    }

    if (crmData.loading) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', flexDirection: 'column', gap: '16px' }}>
                <div style={{ fontSize: '40px' }}>🐸</div>
                <div style={{ fontSize: '14px', color: 'var(--text-muted)', fontFamily: 'DM Mono, monospace' }}>Cargando datos desde Supabase...</div>
            </div>
        )
    }

    return (
        <div className="fade-in">
            {/* Header */}
            <div className="page-header" style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
                    <div>
                        <h1 className="page-title" style={{ marginBottom: '4px' }}>Centro de Mando CMO</h1>
                        <div className="page-subtitle" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span>Grenoucerie S.L.</span>
                            <span style={{ color: 'var(--text-faint)' }}>·</span>
                            <span style={{ textTransform: 'capitalize' }}>{today}</span>
                            {crmData.connected && <span style={{ fontSize: '9px', padding: '2px 6px', borderRadius: '10px', background: 'var(--ok-bg)', color: 'var(--ok)', border: '1px solid var(--ok)33', fontFamily: 'DM Mono, monospace' }}>● Supabase LIVE</span>}
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '6px', padding: '5px 12px', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: '11px', fontFamily: 'DM Mono, monospace', alignItems: 'center' }}>
                        <span style={{ color: 'var(--ok)' }}>● {crmData.byStage ? Object.entries(crmData.byStage).filter(([,v]) => v > 0 && k !== 'prospeccion').length : 0} fases activas</span>
                        <span style={{ color: 'var(--text-faint)' }}>·</span>
                        <span style={{ color: 'var(--brand)' }}>€{(crmData.pipelineValue || 0).toLocaleString('es-ES')} pipeline</span>
                    </div>
                </div>
            </div>

            <AlertaStrip crmData={crmData} />
            <SupergoBar crmData={crmData} />

            {/* KPIs principales */}
            <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', marginBottom: '20px', paddingBottom: '2px' }}>
                <KpiTile label="Facturacion mensual" value="€60K" sub="meta €65K 90d" color="var(--ok)" pulse />
                <KpiTile label="Facturacion 2025" value="€379K" sub="+87% vs baseline" color="var(--brand)" pulse />
                <KpiTile label="Run rate 2026" value="€720K" sub="proyeccion anual" color="var(--ok)" pulse />
                <KpiTile label="Distribuidores" value={String(crmData.total)} sub="en CRM" color={crmData.total > 0 ? 'var(--ok)' : 'var(--alert)'} pulse />
                <KpiTile label="Pipeline valor" value={`€${(crmData.pipelineValue || 0).toLocaleString('es-ES')}`} sub="deals + distribuidores" color="var(--brand)" pulse />
                <KpiTile label="Deals activos" value={String(crmData.deals?.length || 0)} sub="en negociacion" color={crmData.deals?.length > 0 ? 'var(--ok)' : 'var(--warn)'} pulse />
                <KpiTile label="Actividades" value={String(crmData.activities?.length || 0)} sub="registradas" color="var(--text-muted)" pulse />
                <KpiTile label="Alertas" value={String(crmData.alerts?.length || Object.values(crmData.byStage || {}).filter((v,i) => i > 2 && v === 0).length)} sub="pendientes" color={crmData.alerts?.length > 0 ? 'var(--alert)' : 'var(--ok)'} pulse />
            </div>

            {/* Embudo + Pipeline */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px', marginBottom: '20px' }}>
                <MiniEmbudo crmData={crmData} onNavigate={() => cambiarVista('funnel')} />
                <PipelineMini crmData={crmData} onNavigate={() => cambiarVista('pipeline')} />
            </div>

            {/* Mercados */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <div className="section-label" style={{ margin: 0 }}>Mercados activos</div>
                <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
                <div style={{ fontSize: '9px', fontFamily: 'DM Mono, monospace', color: 'var(--text-faint)' }}>3 territorios</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
                {MERCADOS_DATA(crmData).map(m => <MercadoCard key={m.id} mercado={m} onNavegar={navegarMercado[m.id]} />)}
            </div>

            {/* Dos columnas: Distribuidores + Actividades + Alertas */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                    <DistribuidoresRecientes crmData={crmData} />
                    <div style={{ marginTop: '12px' }}>
                        <ActividadesRecientes crmData={crmData} />
                    </div>
                </div>
                <div>
                    <AlertasActivas crmData={crmData} />
                    <div style={{ marginTop: '12px' }}>
                        <AccionesSemanales crmData={crmData} />
                    </div>
                </div>
            </div>
        </div>
    )
}

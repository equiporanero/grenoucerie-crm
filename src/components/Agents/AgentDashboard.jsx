/**
 * AGENT DASHBOARD — Control de agentes autónomos Grenoucerie FR
 * 
 * 4 olas · 8 agentes · handoffs humanos · mapa de dependencias
 * 
 * Colores estado:
 *   BLOQUEADO       → gris
 *   EN_ESPERA       → azul claro
 *   TRABAJANDO      → amarillo
 *   COMPLETADO      → verde
 *   HANDOFF_PENDIENTE → rojo/naranja
 */

import { useState, useEffect } from 'react'

const STYLE = {
    BLOQUEADO:        { bg: '#607D8B', text: '#fff', icon: '🔒', label: 'Bloqueado' },
    EN_ESPERA:        { bg: '#03A9F4', text: '#000', icon: '⏳', label: 'En espera' },
    TRABAJANDO:       { bg: '#FFC107', text: '#000', icon: '⚙️', label: 'Trabajando' },
    COMPLETADO:       { bg: '#4CAF50', text: '#000', icon: '✅', label: 'Completado' },
    HANDOFF_PENDIENTE:{ bg: '#FF5722', text: '#fff', icon: '👤', label: 'Handoff pendiente' },
}

const OLAS = [
    { id: 1, nombre: 'OLA 1', desc: 'Desbloqueadores', color: '#4CAF50', regla: 'LANZAR YA' },
    { id: 2, nombre: 'OLA 2', desc: 'Tras output Ola 1', color: '#2196F3', regla: 'Espera respuesta humana' },
    { id: 3, nombre: 'OLA 3', desc: 'Tras claims validadas', color: '#FF9800', regla: 'Espera whitelist' },
    { id: 4, nombre: 'OLA 4', desc: 'Orquestación', color: '#9C27B0', regla: 'Todo lo anterior' },
]

// Datos iniciales (fallback localStorage)
const AGENTES_INIT = [
    { id:1,  nombre:'Briefing gestoría FR',       ola:1, rol:'Especialista regulación UE',     estado:'TRABAJANDO',       entregable:'Email encargo + preguntas regulatorias + docs',     precondiciones:[], progreso:0 },
    { id:2,  nombre:'Briefing logística frío',     ola:1, rol:'Analista cadena de frío',        estado:'EN_ESPERA',         entregable:'RFQ transporte + tabla comparativa',                precondiciones:[], progreso:0 },
    { id:5,  nombre:'Esqueleto datos Supabase',    ola:1, rol:'Ingeniero de datos',             estado:'EN_ESPERA',         entregable:'SQL tablas leads/touches + scoring + KPI',          precondiciones:[], progreso:0 },
    { id:3,  nombre:'Etiquetado + auditoría',      ola:2, rol:'Redactor regulatorio',           estado:'BLOQUEADO',         entregable:'Etiqueta FR + whitelist/blacklist claims',           precondiciones:[1], progreso:0 },
    { id:6,  nombre:'Investigación leads FR',     ola:2, rol:'Analista prospección B2B',       estado:'BLOQUEADO',         entregable:'30-50 leads FR + top 10',                           precondiciones:[2], progreso:0 },
    { id:4,  nombre:'Dossier comercial FR',        ola:3, rol:'Copywriter B2B nativo',          estado:'BLOQUEADO',         entregable:'Dossier PDF + 5 plantillas outreach + handoff Paula',precondiciones:[3], progreso:0 },
    { id:7,  nombre:'Contenido web FR',            ola:3, rol:'Estratega contenido SEO FR',     estado:'BLOQUEADO',         entregable:'Web FR + formulario + keywords',                    precondiciones:[3], progreso:0 },
    { id:8,  nombre:'Orquestador cadencia',        ola:4, rol:'COO digital',                    estado:'BLOQUEADO',         entregable:'Control semanal + reporte lunes',                    precondiciones:[1,2,3,4,5,6,7], progreso:0 },
]

const HANDOFFS_INIT = [
    { id:1, agente_id:1, accion:'Enviar briefing a gestoría FR + recibir dictamen', desbloquea:[3,4,7], completado:false },
    { id:2, agente_id:2, accion:'Negociar + firmar SLA frío ES→FR (transportista)', desbloquea:[6], completado:false },
    { id:5, agente_id:5, accion:'Ejecutar SQL en Supabase + cargar 10 leads prueba', desbloquea:[], completado:false },
    { id:3, agente_id:3, accion:'Aprobar whitelist de claims con validación gestoría', desbloquea:[4,7], completado:false },
    { id:4, agente_id:4, accion:'Revisión FR nativo por colaborador francófono', desbloquea:[], completado:false },
]

export default function AgentDashboard() {
    const [tab, setTab] = useState('mapa')
    const [agentes, setAgentes] = useState(() => {
        const s = localStorage.getItem('grenoucerie_agentes')
        return s ? JSON.parse(s) : AGENTES_INIT
    })
    const [handoffs, setHandoffs] = useState(() => {
        const s = localStorage.getItem('grenoucerie_handoffs')
        return s ? JSON.parse(s) : HANDOFFS_INIT
    })
    const [expandedAgente, setExpandedAgente] = useState(null)

    useEffect(() => {
        localStorage.setItem('grenoucerie_agentes', JSON.stringify(agentes))
    }, [agentes])
    useEffect(() => {
        localStorage.setItem('grenoucerie_handoffs', JSON.stringify(handoffs))
    }, [handoffs])

    // Métricas
    const totalAgentes = agentes.length
    const completados = agentes.filter(a => a.estado === 'COMPLETADO').length
    const trabajando = agentes.filter(a => a.estado === 'TRABAJANDO').length
    const bloqueados = agentes.filter(a => a.estado === 'BLOQUEADO').length
    const handoffPendientes = handoffs.filter(h => !h.completado).length
    const progresoTotal = Math.round(agentes.reduce((s, a) => s + a.progreso, 0) / totalAgentes)

    // Handoff handoff
    const toggleHandoff = (handoffId) => {
        setHandoffs(prev => prev.map(h => {
            if (h.id !== handoffId) return h
            const nuevo = { ...h, completado: !h.completado, completado_at: !h.completado ? new Date().toISOString() : null }

            // Si se completa, desbloquear agentes dependientes
            if (nuevo.completado && nuevo.desbloquea.length > 0) {
                setAgentes(prevAgentes => prevAgentes.map(a => {
                    if (nuevo.desbloquea.includes(a.id) && a.estado === 'BLOQUEADO') {
                        return { ...a, estado: 'EN_ESPERA' }
                    }
                    return a
                }))
            }
            return nuevo
        }))
    }

    // Cambiar estado agente
    const cambiarEstado = (agenteId, nuevoEstado) => {
        setAgentes(prev => prev.map(a =>
            a.id === agenteId ? { ...a, estado: nuevoEstado, updated_at: new Date().toISOString() } : a
        ))
    }

    const cambiarProgreso = (agenteId, valor) => {
        setAgentes(prev => prev.map(a =>
            a.id === agenteId ? { ...a, progreso: Math.max(0, Math.min(100, valor)) } : a
        ))
    }

    const handoffsPorAgente = (agenteId) => handoffs.filter(h => h.agente_id === agenteId)

    return (
        <div>
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px' }}>
                <div>
                    <h2>🤖 Agent Dashboard — Control de Agentes FR</h2>
                    <p>8 agentes · 4 olas · Handoffs humanos · Estado en tiempo real</p>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                    {['mapa','tabla','handoffs'].map(t => (
                        <button key={t} className={tab === t ? 'btn btn-primary' : 'btn btn-outline'} onClick={() => setTab(t)}>
                            {t === 'mapa' && '🗺️ Mapa'}
                            {t === 'tabla' && '📋 Tabla'}
                            {t === 'handoffs' && `👤 Handoffs${handoffPendientes > 0 ? ` (${handoffPendientes})` : ''}`}
                        </button>
                    ))}
                </div>
            </div>

            {/* ═══ KPI HEADER ═══ */}
            <div className="grid-4" style={{ marginBottom: '24px' }}>
                <div className="card card-sm" style={{ borderTop: '3px solid var(--brand)' }}>
                    <div style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Progreso total</div>
                    <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--brand)' }}>{progresoTotal}%</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{completados}/{totalAgentes} completados</div>
                </div>
                <div className="card card-sm" style={{ borderTop: '3px solid #FFC107' }}>
                    <div style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Trabajando</div>
                    <div style={{ fontSize: '28px', fontWeight: 800, color: '#FFC107' }}>{trabajando}</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>de {totalAgentes} agentes</div>
                </div>
                <div className="card card-sm" style={{ borderTop: '3px solid #607D8B' }}>
                    <div style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Bloqueados</div>
                    <div style={{ fontSize: '28px', fontWeight: 800, color: '#607D8B' }}>{bloqueados}</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Esperan handoff o dependencia</div>
                </div>
                <div className="card card-sm" style={{ borderTop: `3px solid ${handoffPendientes > 0 ? '#FF5722' : '#4CAF50'}` }}>
                    <div style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Handoffs pendientes</div>
                    <div style={{ fontSize: '28px', fontWeight: 800, color: handoffPendientes > 0 ? '#FF5722' : '#4CAF50' }}>{handoffPendientes}</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Acciones que solo hace Fabi</div>
                </div>
            </div>

            {/* ═══ TAB: MAPA DE DEPENDENCIAS ═══ */}
            {tab === 'mapa' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {OLAS.map(ola => {
                        const olaAgentes = agentes.filter(a => a.ola === ola.id)
                        const olaCompletados = olaAgentes.filter(a => a.estado === 'COMPLETADO').length
                        return (
                            <div key={ola.id}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                                    <div style={{ padding: '4px 12px', background: `${ola.color}20`, border: `1px solid ${ola.color}40`, borderRadius: '4px', fontWeight: 700, fontSize: '12px', color: ola.color }}>
                                        {ola.nombre}
                                    </div>
                                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{ola.desc}</span>
                                    <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '3px', background: `${ola.color}15`, color: ola.color, fontWeight: 600 }}>
                                        {ola.regla}
                                    </span>
                                    <span style={{ fontSize: '10px', color: 'var(--text-muted)', marginLeft: 'auto' }}>
                                        {olaCompletados}/{olaAgentes.length} ✓
                                    </span>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '10px', paddingLeft: '20px', borderLeft: `3px solid ${ola.color}30` }}>
                                    {olaAgentes.map(ag => {
                                        const st = STYLE[ag.estado] || STYLE.BLOQUEADO
                                        const expand = expandedAgente === ag.id
                                        const deps = ag.precondiciones.map(depId => agentes.find(a => a.id === depId))
                                        const depsCumplidas = ag.precondiciones.every(depId => agentes.find(a => a.id === depId)?.estado === 'COMPLETADO')
                                        const agHandoffs = handoffsPorAgente(ag.id)
                                        return (
                                            <div key={ag.id} className="card" style={{
                                                borderTop: `3px solid ${st.bg}`,
                                                border: `1px solid ${st.bg}20`,
                                                background: `${st.bg}08`,
                                            }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '6px' }}>
                                                    <div>
                                                        <span style={{ fontSize: '9px', fontWeight: 700, color: st.bg, textTransform: 'uppercase', letterSpacing: '1px' }}>{st.icon} {st.label}</span>
                                                        <div style={{ fontWeight: 700, fontSize: '13px', marginTop: '2px' }}>{ag.nombre}</div>
                                                        <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{ag.rol}</div>
                                                    </div>
                                                    <span style={{ fontSize: '18px', fontWeight: 800, color: st.bg }}>{ag.progreso}%</span>
                                                </div>

                                                {/* Progreso bar */}
                                                <div style={{ width: '100%', height: '4px', background: `${st.bg}20`, borderRadius: '2px', marginBottom: '6px' }}>
                                                    <div style={{ width: `${ag.progreso}%`, height: '100%', background: st.bg, borderRadius: '2px', transition: 'width 0.3s' }} />
                                                </div>

                                                {/* Dependencias */}
                                                {deps.length > 0 && (
                                                    <div style={{ fontSize: '9px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                                                        Necesita: {deps.map((d, i) => (
                                                            <span key={d?.id} style={{ color: d?.estado === 'COMPLETADO' ? '#4CAF50' : '#FF5722' }}>
                                                                {d?.nombre || '?'}{i < deps.length - 1 ? ' · ' : ''}
                                                            </span>
                                                        ))}
                                                        {!depsCumplidas && <span style={{ color: '#FF5722', marginLeft: '4px' }}>🔒</span>}
                                                    </div>
                                                )}

                                                {/* Handoffs asociados */}
                                                {agHandoffs.filter(h => !h.completado).length > 0 && (
                                                    <div style={{ fontSize: '9px', color: '#FF5722', marginBottom: '4px' }}>
                                                        👤 {agHandoffs.filter(h => !h.completado)[0].accion.substring(0, 60)}...
                                                    </div>
                                                )}

                                                {/* Expandir para editar */}
                                                <button onClick={() => setExpandedAgente(expand ? null : ag.id)}
                                                    style={{ fontSize: '9px', color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                                                    {expand ? '▲ Contraer' : '▼ Editar estado / progreso'}
                                                </button>

                                                {expand && (
                                                    <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                                        <div>
                                                            <label style={{ fontSize: '9px', color: 'var(--text-muted)' }}>Estado</label>
                                                            <select value={ag.estado} onChange={e => cambiarEstado(ag.id, e.target.value)}
                                                                style={{ width: '100%', padding: '4px 8px', fontSize: '11px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '4px', color: 'var(--text-primary)' }}>
                                                                {Object.entries(STYLE).map(([k, v]) => <option key={k} value={k}>{v.icon} {v.label}</option>)}
                                                            </select>
                                                        </div>
                                                        <div>
                                                            <label style={{ fontSize: '9px', color: 'var(--text-muted)' }}>Progreso: {ag.progreso}%</label>
                                                            <input type="range" min="0" max="100" value={ag.progreso} onChange={e => cambiarProgreso(ag.id, parseInt(e.target.value))}
                                                                style={{ width: '100%', accentColor: st.bg }} />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}

                    {/* Leyenda */}
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', fontSize: '10px', color: 'var(--text-muted)' }}>
                        {Object.entries(STYLE).map(([k, v]) => (
                            <span key={k} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: v.bg }} />
                                {v.icon} {v.label}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* ═══ TAB: TABLA ═══ */}
            {tab === 'tabla' && (
                <table className="tabla">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Ola</th>
                            <th>Estado</th>
                            <th>Agente</th>
                            <th>Entregable</th>
                            <th>Progreso</th>
                            <th>Handoff</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {agentes.map(ag => {
                            const st = STYLE[ag.estado] || STYLE.BLOQUEADO
                            const agHandoffs = handoffsPorAgente(ag.id)
                            const pendientes = agHandoffs.filter(h => !h.completado)
                            return (
                                <tr key={ag.id}>
                                    <td style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px' }}>{ag.id}</td>
                                    <td>
                                        <span style={{ padding: '2px 6px', borderRadius: '3px', fontSize: '9px', background: `${OLAS.find(o => o.id === ag.ola)?.color}20`, color: OLAS.find(o => o.id === ag.ola)?.color }}>
                                            {OLAS.find(o => o.id === ag.ola)?.nombre}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="badge" style={{ fontSize: '9px', background: `${st.bg}20`, color: st.bg, border: `1px solid ${st.bg}40` }}>
                                            {st.icon} {st.label}
                                        </span>
                                    </td>
                                    <td style={{ fontWeight: 600, fontSize: '12px' }}>{ag.nombre}</td>
                                    <td style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>{ag.entregable}</td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <div style={{ width: '60px', height: '4px', background: 'var(--border)', borderRadius: '2px' }}>
                                                <div style={{ width: `${ag.progreso}%`, height: '100%', background: st.bg, borderRadius: '2px' }} />
                                            </div>
                                            <span style={{ fontSize: '10px', fontFamily: 'DM Mono, monospace' }}>{ag.progreso}%</span>
                                        </div>
                                    </td>
                                    <td>
                                        {pendientes.length > 0 && (
                                            <span className="badge badge-rojo" style={{ fontSize: '8px' }}>
                                                👤 {pendientes[0].accion.substring(0, 30)}...
                                            </span>
                                        )}
                                        {agHandoffs.filter(h => h.completado).length > 0 && (
                                            <span style={{ fontSize: '8px', color: '#4CAF50', marginLeft: '4px' }}>
                                                ✓{agHandoffs.filter(h => h.completado).length}
                                            </span>
                                        )}
                                    </td>
                                    <td>
                                        <button onClick={() => setExpandedAgente(expandedAgente === ag.id ? null : ag.id)}
                                            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '11px' }}>
                                            {expandedAgente === ag.id ? '▲' : '▼'}
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            )}

            {/* ═══ TAB: HANDOFFS ═══ */}
            {tab === 'handoffs' && (
                <>
                    <div className="section-title">👤 Handoffs pendientes — Solo Fabi</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px' }}>
                        {handoffs.filter(h => !h.completado).map(h => {
                            const agente = agentes.find(a => a.id === h.agente_id)
                            return (
                                <div key={h.id} className="card" style={{
                                    borderLeft: '4px solid #FF5722',
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                }}>
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: '13px' }}>{h.accion}</div>
                                        <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>
                                            Para: {agente?.nombre} (Ola {agente?.ola})
                                        </div>
                                        {h.desbloquea.length > 0 && (
                                            <div style={{ fontSize: '9px', marginTop: '4px' }}>
                                                Desbloquea: {h.desbloquea.map(id => agentes.find(a => a.id === id)?.nombre).join(', ')}
                                            </div>
                                        )}
                                    </div>
                                    <button onClick={() => toggleHandoff(h.id)}
                                        style={{
                                            padding: '6px 16px', borderRadius: '6px', border: 'none',
                                            background: '#FF5722', color: '#fff', fontSize: '11px', fontWeight: 600,
                                            cursor: 'pointer',
                                        }}>
                                        ✓ Marcar hecho
                                    </button>
                                </div>
                            )
                        })}
                    </div>

                    <div className="section-title">✅ Completados</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {handoffs.filter(h => h.completado).map(h => {
                            const agente = agentes.find(a => a.id === h.agente_id)
                            return (
                                <div key={h.id} className="card card-sm" style={{
                                    borderLeft: '3px solid #4CAF50',
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                    opacity: 0.7,
                                }}>
                                    <div style={{ fontSize: '12px', textDecoration: 'line-through', color: 'var(--text-muted)' }}>
                                        {h.accion}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        {h.completado_at && (
                                            <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>
                                                {new Date(h.completado_at).toLocaleDateString('es-ES')}
                                            </span>
                                        )}
                                        <button onClick={() => toggleHandoff(h.id)}
                                            style={{ padding: '3px 8px', borderRadius: '4px', border: '1px solid #4CAF5040', background: 'transparent', color: '#4CAF50', fontSize: '9px', cursor: 'pointer' }}>
                                            ↩ Revertir
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                        {handoffs.filter(h => h.completado).length === 0 && (
                            <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)', fontSize: '12px' }}>
                                Ningún handoff completado aún. Empieza por la Ola 1.
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}

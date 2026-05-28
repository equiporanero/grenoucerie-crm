// Revenue Tracker v1.0 — GRENOUCERIE Goal: €500K FR · 31 Dic 2026
// Tracking en tiempo real por canal con brecha al goal
import { useState, useEffect } from 'react'

const GOAL = 500000
const GOAL_DATE = new Date('2026-12-31')

const CANALES = [
  {
    id: 'hosteleria',
    nombre: 'Hostelería FR',
    emoji: '🍽️',
    color: '#E1306C',
    clientes_actuales: 0,
    clientes_target_cons: 15,
    clientes_target_aggr: 40,
    ticket_medio: 500,
    prob: 0.80,
    fase: 3,
  },
  {
    id: 'distribuidor',
    nombre: 'Distribuidor Mayorista FR',
    emoji: '🏭',
    color: '#FF9800',
    clientes_actuales: 0,
    clientes_target_cons: 1,
    clientes_target_aggr: 2,
    ticket_medio: 8000,
    prob: 0.60,
    fase: 2,
  },
  {
    id: 'petfood',
    nombre: 'Petfood FR',
    emoji: '🐾',
    color: '#8BC34A',
    clientes_actuales: 0,
    clientes_target_cons: 2,
    clientes_target_aggr: 4,
    ticket_medio: 3000,
    prob: 0.65,
    fase: 3,
  },
  {
    id: 'ecommerce',
    nombre: 'E-commerce FR',
    emoji: '🛒',
    color: '#2196F3',
    clientes_actuales: 0,
    clientes_target_cons: 1,
    clientes_target_aggr: 2,
    ticket_medio: 5000,
    prob: 0.40,
    fase: 4,
  },
  {
    id: 'premium',
    nombre: 'Hostelería Premium FR',
    emoji: '⭐',
    color: '#9C27B0',
    clientes_actuales: 0,
    clientes_target_cons: 5,
    clientes_target_aggr: 15,
    ticket_medio: 1000,
    prob: 0.60,
    fase: 4,
  },
]

const FASES = [
  { id: 1, nombre: 'May-Jun', label: 'FASE 1 · Cimientos', semanas: 'S1-S8', color: '#FF5722' },
  { id: 2, nombre: 'Jul-Ago', label: 'FASE 2 · Escalar', semanas: 'S9-S16', color: '#FF9800' },
  { id: 3, nombre: 'Sep-Oct', label: 'FASE 3 · Acelerar', semanas: 'S17-S24', color: '#FFC107' },
  { id: 4, nombre: 'Nov-Dic', label: 'FASE 4 · Supercruise', semanas: 'S25-S31', color: '#4CAF50' },
]

const HITOS = [
  { fase: 1, hito: 'Landing page FR activa', done: false },
  { fase: 1, hito: 'WhatsApp Business FR con catálogo', done: false },
  { fase: 1, hito: '5 restaurantes piloto FR', done: false },
  { fase: 1, hito: '50 leads FR cargados en Supabase', done: false },
  { fase: 1, hito: 'Paula: 20 llamadas/semana', done: false },
  { fase: 2, hito: '1er distribuidor regional FR', done: false },
  { fase: 2, hito: '15 restaurantes activos', done: false },
  { fase: 2, hito: 'Contacto Sysco/Transgourmet/Metro', done: false },
  { fase: 2, hito: '1er contrato Petfood FR', done: false },
  { fase: 3, hito: 'Distribuidor GRANDE FR', done: false },
  { fase: 3, hito: 'E-commerce FR lanzado', done: false },
  { fase: 3, hito: '30+ restaurantes activos', done: false },
  { fase: 3, hito: 'Petfood 2-3 contratos', done: false },
  { fase: 4, hito: 'Todo al máximo · Seasonality Navidad', done: false },
  { fase: 4, hito: '€500K CUMULATIVO ALCANZADO', done: false },
]

// Revenue acumulado histórico (simulado hasta hoy, real después)
const REVENUE_HISTORICO = [
  { mes: 'Ene 2026', revenue: 0 },
  { mes: 'Feb 2026', revenue: 0 },
  { mes: 'Mar 2026', revenue: 0 },
  { mes: 'Abr 2026', revenue: 0 },
  { mes: 'May 2026', revenue: 0 },
]

export default function RevenueTracker() {
  const [canales, setCanales] = useState(CANALES)
  const [hitos, setHitos] = useState(HITOS)
  const [revenueHist, setRevenueHist] = useState(REVENUE_HISTORICO)
  const [mesEdit, setMesEdit] = useState('')
  const [tab, setTab] = useState('tracker')

  // Cálculos
  const today = new Date()
  const diasRestantes = Math.max(0, Math.ceil((GOAL_DATE - today) / (1000 * 60 * 60 * 24)))
  const mesesRestantes = diasRestantes / 30.44

  const updateClientes = (id, valor) => {
    setCanales(prev => prev.map(c =>
      c.id === id ? { ...c, clientes_actuales: Math.max(0, parseInt(valor) || 0) } : c
    ))
  }

  const updateTicket = (id, valor) => {
    setCanales(prev => prev.map(c =>
      c.id === id ? { ...c, ticket_medio: Math.max(0, parseInt(valor) || 0) } : c
    ))
  }

  const toggleHito = (idx) => {
    setHitos(prev => prev.map((h, i) => i === idx ? { ...h, done: !h.done } : h))
  }

  const updateRevenueMes = (idx, val) => {
    setRevenueHist(prev => prev.map((r, i) => i === idx ? { ...r, revenue: parseInt(val) || 0 } : r))
  }

  // Revenue por canal
  const revenueActual_mes = canales.reduce((sum, c) => sum + c.clientes_actuales * c.ticket_medio, 0)
  const revenueConservador_mes = canales.reduce((sum, c) => sum + c.clientes_target_cons * c.ticket_medio, 0)
  const revenueAgresivo_mes = canales.reduce((sum, c) => sum + c.clientes_target_aggr * c.ticket_medio, 0)
  const revenuePonderado_mes = canales.reduce((sum, c) => {
    const cons = c.clientes_target_cons * c.ticket_medio
    const aggr = c.clientes_target_aggr * c.ticket_medio
    return sum + cons + (aggr - cons) * c.prob
  }, 0)

  const revenueAcumuladoActual = revenueHist.reduce((sum, r) => sum + r.revenue, 0)

  // Proyección acumulada (con ramp)
  const factores = [0.2, 0.2, 0.5, 0.5, 0.8, 0.8, 1.0]
  let acumProyectado = revenueAcumuladoActual
  const proyeccionMensual = factores.map((f, i) => {
    const mesRev = revenuePonderado_mes * f
    acumProyectado += mesRev
    const meses = ['Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    return { mes: `${meses[i]} 2026`, revenue: mesRev, acumulado: acumProyectado }
  })

  const brecha = GOAL - acumProyectado
  const hitosDone = hitos.filter(h => h.done).length

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2>🎯 Revenue Tracker — Goal €500K FR</h2>
          <p>31 Dic 2026 · {diasRestantes} días restantes · {mesesRestantes.toFixed(1)} meses</p>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button className={tab === 'tracker' ? 'btn btn-primary' : 'btn btn-outline'} onClick={() => setTab('tracker')}>📊 Tracker</button>
          <button className={tab === 'hitos' ? 'btn btn-primary' : 'btn btn-outline'} onClick={() => setTab('hitos')}>✅ Hitos</button>
          <button className={tab == 'proyeccion' ? 'btn btn-primary' : 'btn btn-outline'} onClick={() => setTab('proyeccion')}>📈 Proyección</button>
        </div>
      </div>

      {/* ═══════════════ HEADER KPIs ═══════════════ */}
      <div className="grid-4" style={{ marginBottom: '24px' }}>
        <div className="card card-sm" style={{ borderTop: '3px solid var(--brand)' }}>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Goal</div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--brand)', margin: '4px 0' }}>€500K</div>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>31 Dic 2026 · FR</div>
        </div>
        <div className="card card-sm" style={{ borderTop: '3px solid #FF9800' }}>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Revenue/mes actual</div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#FF9800', margin: '4px 0' }}>€{revenueActual_mes.toLocaleString()}</div>
          <div style={{ fontSize: '10px', color: revenueActual_mes > 0 ? 'var(--pistacho)' : 'var(--alert)' }}>
            {revenueActual_mes > 0 ? '● Activo' : '○ Sin revenue aún'}
          </div>
        </div>
        <div className="card card-sm" style={{ borderTop: '3px solid #E1306C' }}>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Necesitas/mes</div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#E1306C', margin: '4px 0' }}>€{Math.round(500000 / mesesRestantes).toLocaleString()}</div>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>€{Math.round(500000 / diasRestantes).toLocaleString()}/día</div>
        </div>
        <div className="card card-sm" style={{ borderTop: brecha <= 0 ? '3px solid var(--pistacho)' : '3px solid var(--alert)' }}>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Brecha ponderada</div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: brecha <= 0 ? 'var(--pistacho)' : 'var(--alert)', margin: '4px 0' }}>
            {brecha <= 0 ? '✅' : `€${Math.round(brecha).toLocaleString()}`}
          </div>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
            {brecha <= 0 ? 'GOAL alcanzable' : `Faltan €${Math.round(brecha / mesesRestantes).toLocaleString()}/mes`}
          </div>
        </div>
      </div>

      {/* ═══════════════ TAB: TRACKER ═══════════════ */}
      {tab === 'tracker' && (
        <>
          {/* Progress bar al goal */}
          <div className="card" style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>Progreso al Goal</span>
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--brand)' }}>
                {Math.min(100, Math.round((revenueAcumuladoActual / GOAL) * 100))}%
              </span>
            </div>
            <div style={{ width: '100%', height: '16px', background: 'var(--border)', borderRadius: '8px', overflow: 'hidden' }}>
              <div style={{
                width: `${Math.min(100, (revenueAcumuladoActual / GOAL) * 100)}%`,
                height: '100%',
                background: revenueAcumuladoActual >= GOAL ? 'var(--pistacho)' : 'linear-gradient(90deg, var(--brand), #FF9800)',
                borderRadius: '8px',
                transition: 'width 0.5s ease',
              }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Acumulado: €{revenueAcumuladoActual.toLocaleString()}</span>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Goal: €{GOAL.toLocaleString()}</span>
            </div>
          </div>

          {/* Por canal — editable */}
          <div className="section-title">Revenue por Canal (editable en tiempo real)</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            {canales.map(canal => {
              const revActual = canal.clientes_actuales * canal.ticket_medio
              const revCons = canal.clientes_target_cons * canal.ticket_medio
              const revAggr = canal.clientes_target_aggr * canal.ticket_medio
              return (
                <div key={canal.id} className="card" style={{ borderLeft: `4px solid ${canal.color}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '20px' }}>{canal.emoji}</span>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '13px', color: canal.color }}>{canal.nombre}</div>
                        <div style={{ fontSize: '9px', color: 'var(--text-muted)' }}>Fase {canal.fase} · Prob: {Math.round(canal.prob * 100)}%</div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 800, fontSize: '16px', color: canal.color }}>€{revActual.toLocaleString()}/mes</div>
                      <div style={{ fontSize: '9px', color: 'var(--text-muted)' }}>
                        Target: €{revCons.toLocaleString()} — €{revAggr.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto auto', gap: '8px', alignItems: 'center' }}>
                    <div>
                      <label style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Clientes activos</label>
                      <input
                        type="number"
                        min="0"
                        value={canal.clientes_actuales}
                        onChange={e => updateClientes(canal.id, e.target.value)}
                        style={{
                          width: '100%', padding: '6px 10px', marginTop: '2px',
                          background: 'rgba(147,197,114,0.05)', border: '1px solid var(--border)',
                          borderRadius: '6px', color: 'var(--text-primary)', fontSize: '13px',
                          fontFamily: 'DM Mono, monospace', outline: 'none',
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Ticket medio (€/mes)</label>
                      <input
                        type="number"
                        min="0"
                        value={canal.ticket_medio}
                        onChange={e => updateTicket(canal.id, e.target.value)}
                        style={{
                          width: '100%', padding: '6px 10px', marginTop: '2px',
                          background: 'rgba(147,197,114,0.05)', border: '1px solid var(--border)',
                          borderRadius: '6px', color: 'var(--text-primary)', fontSize: '13px',
                          fontFamily: 'DM Mono, monospace', outline: 'none',
                        }}
                      />
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '9px', color: 'var(--text-muted)' }}>Cons.</div>
                      <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--warn)' }}>€{revCons.toLocaleString()}</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '9px', color: 'var(--text-muted)' }}>Aggr.</div>
                      <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--pistacho)' }}>€{revAggr.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Revenue histórico editable */}
          <div className="section-title">Revenue Histórico (editable)</div>
          <div className="card" style={{ marginBottom: '24px' }}>
            <table className="tabla">
              <thead>
                <tr><th>Mes</th><th>Revenue (€)</th></tr>
              </thead>
              <tbody>
                {revenueHist.map((r, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600, fontSize: '11px' }}>{r.mes}</td>
                    <td>
                      <input
                        type="number"
                        min="0"
                        value={r.revenue}
                        onChange={e => updateRevenueMes(i, e.target.value)}
                        style={{
                          width: '120px', padding: '4px 8px',
                          background: 'rgba(147,197,114,0.05)', border: '1px solid var(--border)',
                          borderRadius: '4px', color: 'var(--text-primary)', fontSize: '12px',
                          fontFamily: 'DM Mono, monospace',
                        }}
                      />
                    </td>
                  </tr>
                ))}
                <tr style={{ fontWeight: 700 }}>
                  <td>TOTAL</td>
                  <td style={{ color: 'var(--brand)', fontSize: '14px' }}>€{revenueAcumuladoActual.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* What if distribuidor grande */}
          <div className="card" style={{
            borderColor: 'rgba(244, 67, 54, 0.3)',
            background: 'rgba(244, 67, 54, 0.04)',
          }}>
            <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--alert)', marginBottom: '12px' }}>
              💥 WHAT IF: Distribuidor Nacional Grande (Sysco / Transgourmet / Metro)
            </div>
            {[[2, 150000], [3, 120000], [4, 90000], [5, 60000]].map(([mes, boost]) => {
              const total = acumProyectado + boost
              return (
                <div key={mes} style={{
                  display: 'flex', justifyContent: 'space-between', padding: '6px 0',
                  borderBottom: '1px solid rgba(244,67,54,0.1)', fontSize: '12px',
                }}>
                  <span>Si entra en mes {mes}: +€{boost.toLocaleString()}</span>
                  <span style={{ fontWeight: 700, color: total >= GOAL ? 'var(--pistacho)' : 'var(--alert)' }}>
                    TOTAL: €{total.toLocaleString()} {total >= GOAL ? '✅ GOAL' : `⚠️ brecha €${(GOAL - total).toLocaleString()}`}
                  </span>
                </div>
              )
            })}
          </div>
        </>
      )}

      {/* ═══════════════ TAB: HITOS ═══════════════ */}
      {tab === 'hitos' && (
        <>
          <div className="grid-4" style={{ marginBottom: '24px' }}>
            <div className="card card-sm" style={{ borderTop: '3px solid var(--brand)' }}>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Hitos completados</div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--brand)', margin: '4px 0' }}>{hitosDone}/{hitos.length}</div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{Math.round(hitosDone / hitos.length * 100)}%</div>
            </div>
            {FASES.map(f => {
              const faseHitos = hitos.filter(h => h.fase === f.id)
              const faseDone = faseHitos.filter(h => h.done).length
              return (
                <div key={f.id} className="card card-sm" style={{ borderTop: `3px solid ${f.color}` }}>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>{f.nombre}</div>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: f.color, margin: '4px 0' }}>{faseDone}/{faseHitos.length}</div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{f.semanas}</div>
                </div>
              )
            })}
          </div>

          {FASES.map(fase => (
            <div key={fase.id}>
              <div className="section-title" style={{ color: fase.color }}>{fase.label} · {fase.nombre}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '24px' }}>
                {hitos.filter(h => h.fase === fase.id).map((h, i) => {
                  const globalIdx = hitos.indexOf(h)
                  return (
                    <div key={i} className="card card-sm" style={{
                      display: 'flex', alignItems: 'center', gap: '12px',
                      borderLeft: h.done ? '3px solid var(--pistacho)' : '3px solid var(--border)',
                      opacity: h.done ? 0.7 : 1,
                    }}>
                      <button
                        onClick={() => toggleHito(globalIdx)}
                        style={{
                          width: '22px', height: '22px', borderRadius: '4px',
                          border: h.done ? '2px solid var(--pistacho)' : '2px solid var(--border)',
                          background: h.done ? 'var(--pistacho)' : 'transparent',
                          color: h.done ? '#000' : 'transparent',
                          cursor: 'pointer', fontSize: '12px', fontWeight: 700,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >✓</button>
                      <span style={{
                        fontSize: '12px',
                        textDecoration: h.done ? 'line-through' : 'none',
                        color: h.done ? 'var(--text-muted)' : 'var(--text-primary)',
                      }}>{h.hito}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </>
      )}

      {/* ═══════════════ TAB: PROYECCIÓN ═══════════════ */}
      {tab === 'proyeccion' && (
        <>
          <div className="section-title">Proyección Acumulada (con ramp realista)</div>
          <div className="card" style={{ marginBottom: '24px' }}>
            <table className="tabla">
              <thead>
                <tr>
                  <th>Mes</th>
                  <th>Revenue/mes</th>
                  <th>Acumulado</th>
                  <th>Necesitas</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {proyeccionMensual.map((p, i) => {
                  const need = 500000 * ((i + 1) / 7)
                  const onTrack = p.acumulado >= need * 0.8
                  return (
                    <tr key={i}>
                      <td style={{ fontWeight: 700, fontSize: '11px' }}>{p.mes}</td>
                      <td style={{ fontSize: '12px', color: '#FF9800' }}>€{Math.round(p.revenue).toLocaleString()}</td>
                      <td style={{ fontSize: '12px', fontWeight: 700, color: 'var(--brand)' }}>€{Math.round(p.acumulado).toLocaleString()}</td>
                      <td style={{ fontSize: '12px', color: 'var(--text-muted)' }}>€{Math.round(need).toLocaleString()}</td>
                      <td>
                        <span className={onTrack ? 'badge badge-verde' : 'badge badge-rojo'}>
                          {onTrack ? '✅ On track' : `⚠️ -€${Math.round(need - p.acumulado).toLocaleString()}`}
                        </span>
                      </td>
                    </tr>
                  )
                })}
                <tr style={{ fontWeight: 700, background: 'var(--brand-glow)' }}>
                  <td>TOTAL 7 meses</td>
                  <td style={{ color: '#FF9800' }}>€{Math.round(proyeccionMensual.reduce((s, p) => s + p.revenue, 0)).toLocaleString()}</td>
                  <td style={{ color: 'var(--brand)', fontSize: '14px' }}>€{Math.round(acumProyectado).toLocaleString()}</td>
                  <td style={{ color: 'var(--text-muted)' }}>€500,000</td>
                  <td>
                    <span className={acumProyectado >= 500000 ? 'badge badge-verde' : 'badge badge-rojo'}>
                      {acumProyectado >= 500000 ? '✅ GOAL' : `⚠️ BRECHA €${Math.round(500000 - acumProyectado).toLocaleString()}`}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Gráfico de barras ASCII */}
          <div className="section-title">Visualización del Gap</div>
          <div className="card" style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', lineHeight: 2 }}>
            <div style={{ marginBottom: '8px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Goal: €500,000
            </div>
            <div style={{ marginBottom: '4px', color: 'var(--brand)' }}>
              {'█'.repeat(Math.round(acumProyectado / 500000 * 50))} €{Math.round(acumProyectado).toLocaleString()}
            </div>
            <div style={{ color: 'var(--border)' }}>
              {'░'.repeat(Math.round((500000 - acumProyectado) / 500000 * 50))} €{Math.round(500000 - acumProyectado).toLocaleString()} brecha
            </div>
            <div style={{ marginTop: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Key Insight
            </div>
            <div style={{ marginTop: '4px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              El ponderado (€{Math.round(acumProyectado).toLocaleString()}) no alcanza €500K.<br/>
              <strong style={{ color: 'var(--alert)' }}>Necesitas UN distribuidor grande o pivotar volumen.</strong><br/>
              Un distribuidor nacional FR a €15-30K/mes lo cambia todo.
            </div>
          </div>
        </>
      )}
    </div>
  )
}

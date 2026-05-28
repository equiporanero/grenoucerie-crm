/**
 * CALCULADORA DE MÁRGENES — GRENOUCERIE FR
 *
 * Estructura de precios basada en estrategia v3.0:
 * - Gama Vietnam = precio base referencia (volumen, 10 kg ratio)
 * - Gama Despiece = ×3 Vietnam (procesado intermedio: filetado, sin hueso)
 * - Gama Premium = ×10 Vietnam (selección calibre, origen certificado)
 * - Gama Especial = ×6 Vietnam (carta intermedia foodservice)
 *
 * Despiece se hace DESDE producto Vietnam → añade valor procesado
 * Premium se hace DESDE producto Vietnam selección → calibre superior
 *
 * Fórmula:
 *   Coste Vietnam = €X/kg (referencia base)
 *   Coste Despiece = €X × 3/kg
 *   Coste Premium = €X × 10/kg
 *
 * Margen cliente final = (Precio venta - Coste) / Precio venta × 100
 */

import { useState } from 'react'

const GAMAS = [
  {
    id: 'vietnam',
    nombre: 'Vietnam',
    emoji: '🇻🇳',
    color: '#4CAF50',
    ratio: 1,
    desc: 'Gama base · Volumen · Congelado importado',
    canal: 'Distribuidores mayoristas, cadenas congelados',
    argumento: 'Precio competitivo · Volumen garantizado · Sin roturas',
  },
  {
    id: 'despiece',
    nombre: 'Despiece',
    emoji: '🔪',
    color: '#FF9800',
    ratio: 3,
    desc: 'Procesado intermedio · Filetado/sin hueso',
    canal: 'Todos los canales · Transversal',
    argumento: 'innovadora · No existe en el mercado FR',
    extra: 'Elaborado DESDE producto Vietnam → +valor procesado',
  },
  {
    id: 'premium',
    nombre: 'Premium',
    emoji: '⭐',
    color: '#9C27B0',
    ratio: 10,
    desc: 'Selección calibre · Origen certificado',
    canal: 'Distribuidores gourmet + venta directa restaurante',
    argumento: 'Mejor calibre · Carta gourmet · Margen superior chef',
    extra: 'Selección Premium DESDE Vietnam calibre superior',
  },
]

const ESCENARIOS_FR = [
  {
    nombre: 'Distribuidor Mayorista',
    cliente: 'Sysco / Transgourmet / Metro / Pomona',
    volumen_mensual_kg: 500,
    gamas: [
      { gama: 'vietnam', pct: 60, precio_venta_kg: 12 },
      { gama: 'despiece', pct: 25, precio_venta_kg: 45 },
      { gama: 'premium', pct: 15, precio_venta_kg: 120 },
    ],
    color: '#2196F3',
  },
  {
    nombre: 'Restaurante Premium',
    cliente: 'Restaurante gourmet / Michelin',
    volumen_mensual_kg: 8,
    gamas: [
      { gama: 'vietnam', pct: 10, precio_venta_kg: 25 },
      { gama: 'despiece', pct: 50, precio_venta_kg: 65 },
      { gama: 'premium', pct: 40, precio_venta_kg: 180 },
    ],
    color: '#E1306C',
  },
  {
    nombre: 'Petfood Premium',
    cliente: 'Fabricante pienso natural',
    volumen_mensual_kg: 200,
    gamas: [
      { gama: 'vietnam', pct: 80, precio_venta_kg: 8 },
      { gama: 'despiece', pct: 20, precio_venta_kg: 35 },
      { gama: 'premium', pct: 0, precio_venta_kg: 0 },
    ],
    color: '#8BC34A',
  },
  {
    nombre: 'Hostelería Directa',
    cliente: 'Restaurante bistró / asiatique',
    volumen_mensual_kg: 15,
    gamas: [
      { gama: 'vietnam', pct: 30, precio_venta_kg: 20 },
      { gama: 'despiece', pct: 50, precio_venta_kg: 55 },
      { gama: 'premium', pct: 20, precio_venta_kg: 150 },
    ],
    color: '#FF9800',
  },
]

export default function CalculadoraMargenes() {
  const [costeVietnam, setCosteVietnam] = useState(8) // €/kg base Vietnam
  const [tab, setTab] = useState('calculadora')
  const [escenarioSel, setEscenarioSel] = useState(0)

  const calcGama = (ratio) => costeVietnam * ratio

  const calcEscenario = (escenario) => {
    let total_rev = 0
    let total_coste = 0
    let total_kg = 0

    const breakout = escenario.gamas.map(g => {
      const kg = escenario.volumen_mensual_kg * (g.pct / 100)
      const gamaInfo = GAMAS.find(gm => gm.id === g.gama)
      const coste_kg = calcGama(gamaInfo?.ratio || 1)
      const coste_total = kg * coste_kg
      const venta_total = kg * g.precio_venta_kg
      const margen = venta_total - coste_total
      const margen_pct = g.precio_venta_kg > 0 ? (margen / venta_total) * 100 : 0

      total_kg += kg
      total_coste += coste_total
      total_rev += venta_total

      return {
        ...g,
        nombre: gamaInfo?.nombre || g.gama,
        emoji: gamaInfo?.emoji || '📦',
        color: gamaInfo?.color || '#999',
        kg: Math.round(kg),
        coste_kg: coste_kg.toFixed(2),
        coste_total: Math.round(coste_total),
        venta_total: Math.round(venta_total),
        margen: Math.round(margen),
        margen_pct: margen_pct.toFixed(1),
      }
    })

    const margen_total = total_rev - total_coste
    const margen_total_pct = total_rev > 0 ? ((margen_total / total_rev) * 100).toFixed(1) : 0

    return {
      nombre: escenario.nombre,
      cliente: escenario.cliente,
      volumen_mensual_kg: escenario.volumen_mensual_kg,
      total_kg: Math.round(total_kg),
      total_coste: Math.round(total_coste),
      total_rev: Math.round(total_rev),
      margen_total: Math.round(margen_total),
      margen_total_pct,
      breakout,
      color: escenario.color,
    }
  }

  const escenarioActual = calcEscenario(ESCENARIOS_FR[escenarioSel])

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px' }}>
        <div>
          <h2>💰 Calculadora de Márgenes — Gamas FR</h2>
          <p>Estructura: Vietnam (base) · Despiece (×3) · Premium (×10) — Estrategia v3.0</p>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button className={tab === 'calculadora' ? 'btn btn-primary' : 'btn btn-outline'} onClick={() => setTab('calculadora')}>🧮 Calculadora</button>
          <button className={tab === 'escenarios' ? 'btn btn-primary' : 'btn btn-outline'} onClick={() => setTab('escenarios')}>📊 Escenarios</button>
          <button className={tab === 'estructura' ? 'btn btn-primary' : 'btn btn-outline'} onClick={() => setTab('estructura')}>📐 Estructura</button>
        </div>
      </div>

      {/* ═══ TAB: CALCULADORA ═══ */}
      {tab === 'calculadora' && (
        <>
          {/* Input coste Vietnam */}
          <div className="card" style={{ marginBottom: '24px', borderTop: '3px solid var(--brand)' }}>
            <div style={{ fontWeight: 700, fontSize: '13px', marginBottom: '12px', color: 'var(--brand)' }}>
              ⚙️ PARÁMETRO BASE — Coste Vietnam (€/kg)
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Coste Vietnam €/kg</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                  <input
                    type="number"
                    min="1"
                    step="0.5"
                    value={costeVietnam}
                    onChange={e => setCosteVietnam(Math.max(0, parseFloat(e.target.value) || 0))}
                    style={{
                      width: '80px', padding: '8px 12px',
                      background: 'rgba(147,197,114,0.08)', border: '1px solid var(--brand)',
                      borderRadius: '6px', color: 'var(--text-primary)', fontSize: '16px',
                      fontWeight: 700, fontFamily: 'DM Mono, monospace', outline: 'none',
                    }}
                  />
                  <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>€/kg</span>
                </div>
              </div>
              <div style={{ flex: 1, fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Ajusta el coste base Vietnam para recalcular todos los escenarios.
                Despiece = ×3, Premium = ×10 sobre este valor.
              </div>
            </div>
          </div>

          {/* Tabla de gamas */}
          <div className="section-title">ESTRUCTURA DE GAMAS</div>
          <div className="grid-3" style={{ marginBottom: '32px' }}>
            {GAMAS.map(gama => {
              const coste = calcGama(gama.ratio)
              return (
                <div key={gama.id} className="card" style={{ borderTop: `3px solid ${gama.color}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '22px' }}>{gama.emoji}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '14px', color: gama.color }}>{gama.nombre}</div>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>×{gama.ratio} Vietnam</div>
                    </div>
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: gama.color, marginBottom: '4px' }}>
                    €{coste.toFixed(2)}<span style={{ fontSize: '12px', fontWeight: 400 }}>/kg</span>
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                    {gama.desc}
                  </div>
                  {gama.extra && (
                    <div style={{ marginTop: '6px', padding: '4px 8px', background: `${gama.color}10`, borderRadius: '4px', fontSize: '9px', color: gama.color }}>
                      {gama.extra}
                    </div>
                  )}
                  <div style={{ marginTop: '8px', fontSize: '9px', color: 'var(--text-muted)' }}>
                    Canal: {gama.canal}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Ratio visual */}
          <div className="card" style={{ marginBottom: '16px' }}>
            <div style={{ fontWeight: 700, fontSize: '12px', marginBottom: '10px' }}>📏 RATIO DE VALOR</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <div style={{ flex: 2, background: '#4CAF50', borderRadius: '4px', padding: '6px 10px', color: '#000', fontWeight: 700, fontSize: '11px', textAlign: 'center' }}>
                🇻🇳 Vietnam = 1× (€{costeVietnam}/kg)
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <div style={{ flex: 6, background: '#FF9800', borderRadius: '4px', padding: '6px 10px', color: '#000', fontWeight: 700, fontSize: '11px', textAlign: 'center' }}>
                🔪 Despiece = 3× (€{(costeVietnam * 3).toFixed(2)}/kg) — Procesado desde Vietnam
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ flex: 20, background: '#9C27B0', borderRadius: '4px', padding: '6px 10px', color: '#fff', fontWeight: 700, fontSize: '11px', textAlign: 'center' }}>
                ⭐ Premium = 10× (€{(costeVietnam * 10).toFixed(2)}/kg) — Selección calibre certificado
              </div>
            </div>
            <div style={{ marginTop: '10px', fontSize: '10px', color: 'var(--text-muted)', lineHeight: 1.4 }}>
              💡 El <strong style={{ color: '#FF9800' }}>despiece</strong> se elabora DESDE Vietnam (procesado intermedio: filetado, sin hueso).
              El <strong style={{ color: '#9C27B0' }}>Premium</strong> es selección calibre superior certificado.
            </div>
          </div>
        </>
      )}

      {/* ═══ TAB: ESCENARIOS ═══ */}
      {tab === 'escenarios' && (
        <>
          <div style={{ display: 'flex', gap: '6px', marginBottom: '20px', flexWrap: 'wrap' }}>
            {ESCENARIOS_FR.map((esc, i) => (
              <button
                key={i}
                onClick={() => setEscenarioSel(i)}
                className={escenarioSel === i ? 'btn btn-primary' : 'btn btn-outline'}
                style={escenarioSel === i ? { borderColor: esc.color, background: `${esc.color}20` } : {}}
              >
                <span style={{ fontSize: '14px', marginRight: '4px' }}>
                  {i === 0 ? '🏭' : i === 1 ? '⭐' : i === 2 ? '🐾' : '🍽️'}
                </span>
                {esc.nombre}
              </button>
            ))}
          </div>

          <div className="card" style={{ borderTop: `3px solid ${escenarioActual.color}`, marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '15px', color: escenarioActual.color }}>
                  {escenarioActual.nombre}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{escenarioActual.cliente}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '24px', fontWeight: 800, color: escenarioActual.color }}>
                  €{escenarioActual.total_rev.toLocaleString()}<span style={{ fontSize: '12px', fontWeight: 400 }}>/mes</span>
                </div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{escenarioActual.total_kg} kg/mes</div>
              </div>
            </div>

            {/* Breakdown por gama */}
            <table className="tabla">
              <thead>
                <tr>
                  <th>Gama</th>
                  <th>Mix</th>
                  <th>Kg/mes</th>
                  <th>Coste/kg</th>
                  <th>€ Coste</th>
                  <th>€ Venta</th>
                  <th>Margen</th>
                  <th>%</th>
                </tr>
              </thead>
              <tbody>
                {escenarioActual.breakout.filter(b => b.kg > 0).map((b, i) => (
                  <tr key={i}>
                    <td>
                      <span style={{ marginRight: '4px' }}>{b.emoji}</span>
                      <span style={{ fontWeight: 600, fontSize: '12px' }}>{b.nombre}</span>
                    </td>
                    <td style={{ fontSize: '11px' }}>{b.pct}%</td>
                    <td style={{ fontSize: '11px' }}>{b.kg}</td>
                    <td style={{ fontSize: '11px', fontFamily: 'DM Mono, monospace' }}>€{b.coste_kg}</td>
                    <td style={{ fontSize: '11px', color: '#F44336' }}>€{b.coste_total.toLocaleString()}</td>
                    <td style={{ fontSize: '11px', fontWeight: 600, color: '#4CAF50' }}>€{b.venta_total.toLocaleString()}</td>
                    <td style={{ fontSize: '11px', fontWeight: 700, color: b.margen > 0 ? '#4CAF50' : '#F44336' }}>€{b.margen.toLocaleString()}</td>
                    <td>
                      <span className={parseFloat(b.margen_pct) > 30 ? 'badge badge-verde' : parseFloat(b.margen_pct) > 15 ? 'badge badge-amarillo' : 'badge badge-rojo'} style={{ fontSize: '9px' }}>
                        {b.margen_pct}%
                      </span>
                    </td>
                  </tr>
                ))}
                <tr style={{ fontWeight: 700, background: `${escenarioActual.color}10` }}>
                  <td colSpan={2}>TOTAL</td>
                  <td>{escenarioActual.total_kg}</td>
                  <td>—</td>
                  <td style={{ color: '#F44336' }}>€{escenarioActual.total_coste.toLocaleString()}</td>
                  <td style={{ color: '#4CAF50' }}>€{escenarioActual.total_rev.toLocaleString()}</td>
                  <td style={{ color: parseFloat(escenarioActual.margen_total_pct) > 30 ? '#4CAF50' : '#FF9800' }}>€{escenarioActual.margen_total.toLocaleString()}</td>
                  <td>
                    <span className={parseFloat(escenarioActual.margen_total_pct) > 30 ? 'badge badge-verde' : parseFloat(escenarioActual.margen_total_pct) > 15 ? 'badge badge-amarillo' : 'badge badge-rojo'}>
                      {escenarioActual.margen_total_pct}%
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Proyección anual */}
          <div className="card">
            <div style={{ fontWeight: 700, fontSize: '12px', marginBottom: '10px' }}>📈 PROYECCIÓN ANUAL — {escenarioActual.nombre}</div>
            <div className="grid-3">
              <div style={{ padding: '12px', background: 'rgba(33,150,243,0.08)', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '22px', fontWeight: 800, color: '#2196F3' }}>€{(escenarioActual.total_rev * 12).toLocaleString()}</div>
                <div style={{ fontSize: '9px', color: 'var(--text-muted)' }}>Revenue/año</div>
              </div>
              <div style={{ padding: '12px', background: 'rgba(76,175,80,0.08)', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '22px', fontWeight: 800, color: '#4CAF50' }}>€{(escenarioActual.margen_total * 12).toLocaleString()}</div>
                <div style={{ fontSize: '9px', color: 'var(--text-muted)' }}>Margen/año</div>
              </div>
              <div style={{ padding: '12px', background: 'rgba(156,39,176,0.08)', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '22px', fontWeight: 800, color: '#9C27B0' }}>{(escenarioActual.total_kg * 12).toLocaleString()} kg</div>
                <div style={{ fontSize: '9px', color: 'var(--text-muted)' }}>Volumen/año</div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ═══ TAB: ESTRUCTURA ═══ */}
      {tab === 'estructura' && (
        <>
          <div className="section-title">📐 ESTRUCTURA DE PRECIOS v3.0</div>
          <div className="card" style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '13px', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
              <p style={{ marginBottom: '12px' }}>
                Grenoucerie vende <strong style={{ color: 'var(--text-primary)' }}>UN solo producto: ancas de rana</strong>.Pero en <strong style={{ color: 'var(--text-primary)' }}>4 gamas</strong> que atacan mercados distintos.
              </p>

              <div style={{ padding: '12px', background: 'rgba(76,175,80,0.08)', borderRadius: '8px', marginBottom: '12px' }}>
                <div style={{ fontWeight: 700, color: '#4CAF50', marginBottom: '6px' }}>🇻🇳 VIETNAM — Gama Base (Ratio 10)</div>
                <div style={{ fontSize: '12px' }}>
                  Coste = €X/kg (precio referencia) · Congelado importado<br/>
                  Distribuidores mayoristas + cadenas congelados<br/>
                  <strong>Paga las facturas. Es el volumen que sostiene la operación.</strong>
                </div>
              </div>

              <div style={{ padding: '12px', background: 'rgba(255,152,0,0.08)', borderRadius: '8px', marginBottom: '12px' }}>
                <div style={{ fontWeight: 700, color: '#FF9800', marginBottom: '6px' }}>🔪 DESPIECE — Gama Procesada (Ratio 3 vs Vietnam)</div>
                <div style={{ fontSize: '12px' }}>
                  Coste = €X × 3/kg · Filetado, sin hueso<br/>
                  Elaborado <strong>DESDE</strong> producto Vietnam (+valor procesado)<br/>
                  <strong style={{ color: '#FF9800' }}>⚠️ CLAVE: Nadie en FR ofrece despieces. Diferenciación absoluta.</strong><br/>
                  La carne se procesa intermedia: de Vietnam → despiece = ×3
                </div>
              </div>

              <div style={{ padding: '12px', background: 'rgba(156,39,176,0.08)', borderRadius: '8px', marginBottom: '12px' }}>
                <div style={{ fontWeight: 700, color: '#9C27B0', marginBottom: '6px' }}>⭐ PREMIUM — Gama Selección (Ratio 1 vs Vietnam, ×10 coste)</div>
                <div style={{ fontSize: '12px' }}>
                  Coste = €X × 10/kg · Selección calibre superior, origen certificado<br/>
                  <strong style={{ color: '#9C27B0' }}>No es Vietnam procesado. ES selección calibre desde origen.</strong><br/>
                  Distribuidores gourmet + venta directa restaurante<br/>
                  <strong>Construye la marca. Margen superior.</strong>
                </div>
              </div>

              <div style={{ padding: '12px', background: 'rgba(255,193,7,0.08)', borderRadius: '8px', marginBottom: '12px' }}>
                <div style={{ fontWeight: 700, color: '#FFC107', marginBottom: '6px' }}>👑 CLUB/FRESCA — Gama Extra (Ratio 0.1 vs Vietnam)</div>
                <div style={{ fontSize: '12px' }}>
                  Fresca, producción España/FR · Estanque al plato<br/>
                  Solo restaurantes top seleccionados · Relación personal CEO<br/>
                  <strong>Construye el mito. Exclusividad total.</strong>
                </div>
              </div>

              <div style={{ padding: '10px', background: 'var(--brand-glow)', borderRadius: '6px', border: '1px solid var(--border-brand)', fontSize: '11px', color: 'var(--brand)' }}>
                💡 <strong>KEY FORMULA:</strong><br/>
                Despiece coste = Vietnam × 3 (procesado intermedio)<br/>
                Premium coste = Vietnam × 10 (selección calibre certificado)<br/>
                Despiece se hace DESDE Vietnam → añade valor procesado<br/>
                Premium es selección desde Vietnam calibre superior → no es procesado, es selección
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// RRSS v3.0: Dashboard de Redes Sociales Grenoucerie
// Estrategia: TOFU (categoría) + MOFU (conversión) por red social
import { useState } from 'react'

const REDES = [
  {
    id: 'instagram',
    nombre: 'Instagram',
  emoji: '📸',
  color: '#E1306C',
  seguidores: { es: 0, fr: 0 },
  frecuencia: '5x/semana',
  objetivo: 'TOFU — Crear categoría "carne saludable" + branding Grenoucerie',
  formatos: ['Reels (cocina, behind scenes)', 'Carrusel nutricional', 'Stories día a día', 'Collabs foodies'],
  kpi: 'Reach + Saves',
    estado: 'pendiente',
  },
  {
    id: 'tiktok',
    nombre: 'TikTok',
    emoji: '🎵',
    color: '#000000',
    seguidores: { es: 0, fr: 0 },
    frecuencia: '7x/semana',
  objetivo: 'TOFU masivo — Viralidad + romper prejuicios "rana = raro"',
    formatos: ['Cooking hacks', 'ASMR cocina', 'Mitos vs realidad', 'Challenge #ComeRana'],
    kpi: 'Views + Shares',
    estado: 'pendiente',
  },
  {
    id: 'linkedin',
    nombre: 'LinkedIn',
    emoji: '💼',
    color: '#0A66C2',
    seguidores: { es: 0, fr: 0 },
    frecuencia: '3x/semana',
    objetivo: 'B2B — Atracción distribuidores, hostelería, inversores',
    formatos: ['Caso de éxito B2B', 'Artículo industria alimentaria', 'Métricas expansión Fase 1', 'Employer branding'],
    kpi: 'Inbounds B2B',
    estado: 'pendiente',
  },
  {
    id: 'youtube',
    nombre: 'YouTube',
    emoji: '🎬',
    color: '#FF0000',
    seguidores: { es: 0, fr: 0 },
    frecuencia: '2x/semana',
    objetivo: 'SEO largo + autoridad — Recetas, documental, proceso productivo',
    formatos: ['Recetas completas', 'Documental ""La carne más saludable""', 'Vlog producción', 'Entrevistas chefs'],
    kpi: 'Watch time + Suscriptores',
    estado: 'pendiente',
  },
  {
    id: 'x',
    nombre: 'X (Twitter)',
    emoji: '𝕏',
    color: '#1DA1F2',
    seguidores: { es: 0, fr: 0 },
    frecuencia: 'Diario',
    objetivo: 'Thought leadership + prensa + B2B Francia',
    formatos: ['Hilos datos nutricionales', 'Engagement prensa FR', 'Comentario tendencias food', 'Respuestas rápidas'],
    kpi: 'Impressions + Clicks',
    estado: 'pendiente',
  },
  {
    id: 'pinterest',
    nombre: 'Pinterest',
    emoji: '📌',
    color: '#E60023',
    seguidores: { es: 0, fr: 0 },
    frecuencia: '10x/semana',
    objetivo: 'SEO visual → web → venta — Recetas, infografías, platos',
    formatos: ['Pines recetas', 'Infografías nutricionales', 'Tableros por gama', 'Ideas de platos'],
    kpi: 'Outbound clicks → web',
    estado: 'pendiente',
  },
]


const CALENDARIO_SEMANAL = [
  { dia: 'Lunes', es: 'Reel cocina ES + Nutrición carusel', fr: 'Réel cuisine FR + Post nutrition', b2b: 'LinkedIn artículo industria' },
  { dia: 'Martes', es: 'TikTok mito vs realidad', fr: 'TikTok mythe vs réalité', b2b: 'X hilo datos sector' },
  { dia: 'Miércoles', es: 'Stories behind scenes + YouTube', fr: 'Stories coulisses FR + YouTube FR', b2b: 'LinkedIn caso éxito' },
  { dia: 'Jueves', es: 'Reel receta + Pinterest infografía', fr: 'Réel recette + Pinterest', b2b: 'X engagement prensa' },
  { dia: 'Viernes', es: 'Carrusel educational + TikTok ASMR', fr: 'Carrousel éducatif + TikTok', b2b: 'LinkedIn employer branding' },
  { dia: 'Sábado', es: 'Stories lifestyle + Community mgmt', fr: 'Stories lifestyle FR', b2b: '—' },
  { dia: 'Domingo', es: 'Planificación semana + analgesia', fr: 'Planification + Pinterest batch', b2b: '—' },
]

const TEMPLATES_POSTS = [
  {
    tipo: 'Mito vs Realidad',
    formato: 'Carrusel/Reel',
  es: '"La rana es fea" → 📸 [Foto plato gourmet] → GRA-VE-ZAS: la carne más saludable del mundo (0.3g grasa/100g). ¿Sigues pensando lo mismo?',
    fr: '"Les c las sont bizarres" → 📸 [Photo plat gastronomique] → SURPRISE: la viande la plus saine du monde (0.3g lipides/100g). Vous pensez toujours la même chose?',
  },
  {
    tipo: 'Hook Nutricional',
    formato: 'Reel/TikTok',
    es: '"Esto tiene MENOS grasa que la pechuga de pollo 🐔➡️🐸" [Corte a datos nutricionales impactantes]',
    fr: '"Ça contient MOINS de gras que le poulet 🐔➡️🐸" [Transition vers données nutritionnelles]',
  },
  {
    tipo: 'B2B Inbound',
    formato: 'LinkedIn',
    es: '📊 "Mientras en España descubrimos la rana, en Francia llevan 200 años comiéndola. La diferencia: nadie la ha posicionada como premium congelada. Eso cambia ahora." — [Link a web B2B]',
    fr: '📊 "Pendant que l\'Espagne découvre la grenouille, la France en mange depuis 200 ans. La différence: personne ne l\'a positionnée comme premium surgelée. Ça change maintenant."',
  },
  {
    tipo: 'Chef Testimonial',
    formato: 'Video/Reel',
    es: '"Cuando probaron nuestras ancas, el chef dijo: esto no parece rana, parece wagyu en textura" 👨‍🍳 [Video preparación]',
    fr: '"Quand ils ont goûté nos cuisses, le chef a dit: on dirait du wagyu en texture" 👨‍🍳 [Video préparation]',
  },
  {
    tipo: 'Behind Scenes',
    formato: 'Stories/Reel',
    es: 'De Vietnam a tu plato en 72h ✈️🐸 [Proceso logístico] → Frescor garantizada → Trazabilidad 100%',
    fr: 'Du Vietnam à votre assiette en 72h ✈️🐸 [Processus logistique] → Fraîcheur garantie → Traçabilité 100%',
  },
  {
    tipo: 'Despieces Innovación',
    formato: 'Carrusel',
    es: '🦴➡️🥩 "¿Sabías que la rana se puede filetear como un pescado?" [Imágenes de cortes despieces] → Sin hueso → Cocina fusión → NUEVO: nadie en Europa lo hace así',
    fr: '🦴➡️🥩 "Saviez-vous que la grenouille peut être filetée comme un poisson?" [Images découpes] → Sans os → Cuisine fusion → NOUVEAU: personne en Europe ne fait ça',
  },
]

const IDEAS_BATCH = [
  { id: 1, red: 'Instagram', tipo: 'Reel', hook: 'POV: pruebas ancas de rana por primera vez', estado: 'sin crear' },
  { id: 2, red: 'TikTok', tipo: 'Video', hook: '"Ranita, ranita... que no te coman los franceses 😂🐸"', estado: 'sin crear' },
  { id: 3, red: 'LinkedIn', tipo: 'Texto', hook: 'El sector alimentario FRA ignora una proteína con 0.3g grasa/100g. Hemos analizado datos...', estado: 'sin crear' },
  { id: 4, red: 'Instagram', tipo: 'Carrusel', hook: '5 datos que NO sabías sobre las ancas de rana', estado: 'sin crear' },
  { id: 5, red: 'YouTube', tipo: 'Video', hook: 'De Vietnam a Europa: el viaje de la rana más saludable del mundo (documental corto)', estado: 'sin crear' },
  { id: 6, red: 'TikTok', tipo: 'Video', hook: 'ASMR: ancas de rana a la plancha con mantequilla y ajo 🔥', estado: 'sin crear' },
  { id: 7, red: 'LinkedIn', tipo: 'Documento', hook: 'Informe: El mercado de la grenouille en Francia — €200M sin comunicaciones', estado: 'sin crear' },
  { id: 8, red: 'X', tipo: 'Hilo', hoom: '¿Por qué la carne con menos grasa del mundo está desapareciendo de Europa? 🧵🐸', estado: 'sin crear' },
  { id: 9, red: 'Instagram', tipo: 'Reel', hook: 'Chef 3 estrellas prueba ancas de rana premium — su reacción', estado: 'sin crear' },
  { id: 10, red: 'Pinterest', tipo: 'Pin', hook: 'Infografía: comparativa nutricional rana vs pollo vs ternera', estado: 'sin crear' },
  { id: 11, red: 'TikTok', tipo: 'Video', hook: 'React francés probando rana por primera vez 🇫🇷😂', estado: 'sin crear' },
  { id: 12, red: 'YouTube', tipo: 'Short', hook: '3 recetas de ancas de rana en 60 segundos', estado: 'sin crear' },
]

const HASHTAGS = {
  es: ['#Grenoucerie', '#AncasDeRana', '#CarneSaludable', '#Superfood', '#LaCarneMásSaludable', '#RanaPremium', '#ComidaReal', '#ProteínaNatural', '#AlimentaciónSaludable', '#FrogLegs'],
  fr: ['#Grenoucerie', '#CuissesDeGrenouille', '#ViandeSaine', '#SuperAliment', '#LaViandeLaPlusSaine', '#GrenouillePremium', '#CuisineSaine', '#ProtéineNaturelle', '#GastronomieFR', '#FrogLegsFR'],
}

export default function RRSS() {
  const [tab, setTab] = useState('dashboard')
  const [ideaEdit, setIdeaEdit] = useState(null)
  const [ideas, setIdeas] = useState(IDEAS_BATCH)

  const updateIdeaEstado = (id, estado) => {
    setIdeas(prev => prev.map(i => i.id === id ? { ...i, estado } : i))
  }

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2>📱 Redes Sociales v3.0</h2>
          <p>Estrategia omnicanal: TOFU (crear categoría) + MOFU (conversión) — ES + FR</p>
        </div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <button className={tab === 'dashboard' ? 'btn btn-primary' : 'btn btn-outline'} onClick={() => setTab('dashboard')}>📊 Dashboard</button>
          <button className={tab === 'calendario' ? 'btn btn-primary' : 'btn btn-outline'} onClick={() => setTab('calendario')}>📅 Calendario</button>
          <button className={tab === 'templates' ? 'btn btn-primary' : 'btn btn-outline'} onClick={() => setTab('templates')}>✍️ Templates</button>
          <button className={tab === 'ideas' ? 'btn btn-primary' : 'btn btn-outline'} onClick={() => setTab('ideas')}>💡 Ideas Batch</button>
          <button className={tab === 'hashtags' ? 'btn btn-primary' : 'btn btn-outline'} onClick={() => setTab('hashtags')}>🏷️ Hashtags</button>
        </div>
      </div>

      {/* ═══════════════ TAB: DASHBOARD ═══════════════ */}
      {tab === 'dashboard' && (
        <>
          {/* KPI Cards */}
          <div className="grid-4" style={{ marginBottom: '24px' }}>
            <div className="card card-sm" style={{ borderTop: '3px solid #E1306C' }}>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>📸 Instagram</div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#E1306C', margin: '4px 0' }}>0</div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>seguidores ES + FR</div>
              <div style={{ marginTop: '8px', fontSize: '9px', color: 'var(--alert)', fontWeight: 600 }}>⚡ Pendiente de crear</div>
            </div>
            <div className="card card-sm" style={{ borderTop: '3px solid #00f2ea' }}>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>🎵 TikTok</div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#00f2ea', margin: '4px 0' }}>0</div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>seguidores ES + FR</div>
              <div style={{ marginTop: '8px', fontSize: '9px', color: 'var(--alert)', fontWeight: 600 }}>⚡ Pendiente de crear</div>
            </div>
            <div className="card card-sm" style={{ borderTop: '3px solid #0A66C2' }}>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>💼 LinkedIn</div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#0A66C2', margin: '4px 0' }}>0</div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>conexiones B2B</div>
              <div style={{ marginTop: '8px', fontSize: '9px', color: 'var(--warn)', fontWeight: 600 }}>🎯 Canal B2B principal</div>
            </div>
            <div className="card card-sm" style={{ borderTop: '3px solid var(--brand)' }}>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>📅 Posts/semana</div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--brand)', margin: '4px 0' }}>27+</div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>en todas las redes</div>
              <div style={{ marginTop: '8px', fontSize: '9px', color: 'var(--brand)', fontWeight: 600 }}>🚀 Fase 0: setup</div>
            </div>
          </div>

          {/* Por red social */}
          <div className="section-title">Estrategia por Red Social</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            {REDES.map(red => (
              <div key={red.id} className="card" style={{ borderLeft: `4px solid ${red.color}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '22px' }}>{red.emoji}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '14px', color: red.color }}>{red.nombre}</div>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{red.frecuencia} · KPI: {red.kpi}</div>
                    </div>
                  </div>
                  <span className={`badge ${red.estado === 'activo' ? 'badge-verde' : 'badge-rojo'}`}>
                    {red.estado === 'activo' ? '● Activo' : '○ Pendiente'}
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px', lineHeight: 1.5 }}>
                  🎯 {red.objetivo}
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {red.formatos.map((f, i) => (
                    <span key={i} style={{
                      padding: '3px 8px', borderRadius: '4px', fontSize: '10px',
                      background: `${red.color}15`, color: red.color,
                      border: `1px solid ${red.color}30`,
                    }}>{f}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Nota estratégica */}
          <div className="card" style={{
            borderColor: 'rgba(128, 128, 0, 0.3)',
            background: 'rgba(128, 128, 0, 0.04)',
            marginBottom: '24px',
          }}>
            <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--oliva-light)', marginBottom: '8px' }}>
              🧠 Estrategia RRSS v3.0 — Principio Fundamental
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              <strong style={{ color: 'var(--text-primary)' }}>NO vendemos Grenoucerie.</strong> Vendemos la categoría "la carne más saludable del mundo".
              Cada post es educación nutricional, romper prejuicios, o mostrar la experiencia gastronómica.
              <strong style={{ color: 'var(--text-primary)' }}> La marca aparece, pero no protagoniza.</strong> TOFU = categoría. MOFU = producto. BOFU = conversión.
              Francia: el mensaje es "la grenouille revient chez elle" (ya conocen la rana, les enseñamos las gamas nuevas).
            </div>
          </div>
        </>
      )}

      {/* ═══════════════ TAB: CALENDARIO ═══════════════ */}
      {tab === 'calendario' && (
        <>
          <div className="section-title">Calendario Editorial Semanal</div>
          <div className="card" style={{ marginBottom: '24px', overflow: 'hidden' }}>
            <table className="tabla">
              <thead>
                <tr>
                  <th>Día</th>
                  <th>🇪🇸 Español (ES)</th>
                  <th>🇫🇷 Français (FR)</th>
                  <th>💼 B2B (LinkedIn/X)</th>
                </tr>
              </thead>
              <tbody>
                {CALENDARIO_SEMANAL.map((dia, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 700, fontSize: '11px', whiteSpace: 'nowrap' }}>{dia.dia}</td>
                    <td style={{ fontSize: '11px', lineHeight: 1.4 }}>{dia.es}</td>
                    <td style={{ fontSize: '11px', lineHeight: 1.4 }}>{dia.fr}</td>
                    <td style={{ fontSize: '11px', lineHeight: 1.4, color: '#0A66C2' }}>{dia.b2b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card" style={{
            borderColor: 'rgba(147, 197, 114, 0.3)',
            background: 'rgba(147, 197, 114, 0.04)',
          }}>
            <div style={{ fontWeight: 700, fontSize: '12px', color: 'var(--pistacho)', marginBottom: '8px' }}>
              📐 Regla de Producción
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              <strong>Batch creation:</strong> Domingo se planifica y graba el 80% de la semana.<br/>
              <strong>Ratio ES:FR</strong> = 60:40 (España necesita más educación de categoría)<br/>
              <strong>B2B separado:</strong> LinkedIn y X tienen calendario propio orientado a inbounds<br/>
              <strong>Contenido perenne:</strong> Infografías nutricionales y recetas se reutilizan cada 90 días
            </div>
          </div>
        </>
      )}

      {/* ═══════════════ TAB: TEMPLATES ═══════════════ */}
      {tab === 'templates' && (
        <>
          <div className="section-title">Templates de Posts Listos para Usar</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {TEMPLATES_POSTS.map((t, i) => (
              <div key={i} className="card" style={{ borderLeft: '3px solid var(--brand)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--brand)' }}>{t.tipo}</div>
                  <span className="badge badge-verde">{t.formato}</span>
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <div style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>🇪🇸 Español</div>
                  <div style={{
                    padding: '10px 14px', background: 'rgba(147, 197, 114, 0.05)',
                    borderRadius: '8px', border: '1px solid rgba(147,197,114,0.15)',
                    fontSize: '12px', color: 'var(--text-primary)', lineHeight: 1.5,
                  }}>{t.es}</div>
                </div>
                <div>
                  <div style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>🇫🇷 Français</div>
                  <div style={{
                    padding: '10px 14px', background: 'rgba(0, 85, 164, 0.05)',
                    borderRadius: '8px', border: '1px solid rgba(0,85,164,0.15)',
                    fontSize: '12px', color: 'var(--text-primary)', lineHeight: 1.5,
                  }}>{t.fr}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ═══════════════ TAB: IDEAS BATCH ═══════════════ */}
      {tab === 'ideas' && (
        <>
          <div className="section-title">Batch de Ideas ({ideas.filter(i => i.estado === 'sin crear').length} pendientes)</div>
          <div style={{ display: 'flex', gap: '6px', marginBottom: '16px', flexWrap: 'wrap' }}>
            <span style={{ padding: '4px 10px', borderRadius: '4px', fontSize: '10px', background: 'var(--brand-glow)', color: 'var(--brand)', border: '1px solid var(--border-brand)' }}>
              Total: {ideas.length}
            </span>
            <span style={{ padding: '4px 10px', borderRadius: '4px', fontSize: '10px', background: 'rgba(244,67,54,0.1)', color: 'var(--alert)', border: '1px solid rgba(244,67,54,0.2)' }}>
              Sin crear: {ideas.filter(i => i.estado === 'sin crear').length}
            </span>
            <span style={{ padding: '4px 10px', borderRadius: '4px', fontSize: '10px', background: 'rgba(255,193,7,0.1)', color: 'var(--warn)', border: '1px solid rgba(255,193,7,0.2)' }}>
              En progreso: {ideas.filter(i => i.estado === 'en progreso').length}
            </span>
            <span style={{ padding: '4px 10px', borderRadius: '4px', fontSize: '10px', background: 'rgba(147,197,114,0.1)', color: 'var(--pistacho)', border: '1px solid rgba(147,197,114,0.2)' }}>
              Creados: {ideas.filter(i => i.estado === 'creado').length}
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {ideas.map(idea => (
              <div key={idea.id} className="card card-sm" style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                borderLeft: idea.estado === 'creado' ? '3px solid var(--pistacho)' : idea.estado === 'en progreso' ? '3px solid var(--warn)' : '3px solid var(--border)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                  <span style={{ fontSize: '16px' }}>
                    {idea.red === 'Instagram' ? '📸' : idea.red === 'TikTok' ? '🎵' : idea.red === 'LinkedIn' ? '💼' : idea.red === 'YouTube' ? '🎬' : idea.red === 'X' ? '𝕏' : '📌'}
                  </span>
                  <div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{idea.red} · {idea.tipo}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-primary)', fontWeight: 500, lineHeight: 1.4 }}>{idea.hook}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
                  {idea.estado === 'sin crear' && (
                    <>
                      <button className="btn btn-outline" style={{ fontSize: '9px', padding: '3px 8px' }} onClick={() => updateIdeaEstado(idea.id, 'en progreso')}>▶️ Iniciar</button>
                      <button className="btn btn-outline" style={{ fontSize: '9px', padding: '3px 8px' }} onClick={() => updateIdeaEstado(idea.id, 'creado')}>✅ Hecho</button>
                    </>
                  )}
                  {idea.estado === 'en progreso' && (
                    <>
                      <span className="badge badge-amarillo" style={{ fontSize: '9px' }}>En progreso</span>
                      <button className="btn btn-outline" style={{ fontSize: '9px', padding: '3px 8px' }} onClick={() => updateIdeaEstado(idea.id, 'creado')}>✅ Hecho</button>
                    </>
                  )}
                  {idea.estado === 'creado' && (
                    <span className="badge badge-verde" style={{ fontSize: '9px' }}>✅ Creado</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ═══════════════ TAB: HASHTAGS ═══════════════ */}
      {tab === 'hashtags' && (
        <>
          <div className="section-title">Hashtags por Idioma</div>
          <div className="grid-2" style={{ marginBottom: '24px' }}>
            <div className="card" style={{ borderTop: '3px solid var(--pistacho)' }}>
              <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--pistacho)', marginBottom: '12px' }}>🇪🇸 Español</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {HASHTAGS.es.map((h, i) => (
                  <span key={i} style={{
                    padding: '4px 10px', borderRadius: '4px', fontSize: '11px',
                    background: 'rgba(147,197,114,0.08)', color: 'var(--pistacho)',
                    border: '1px solid rgba(147,197,114,0.2)', fontFamily: 'DM Mono, monospace',
                  }}>{h}</span>
                ))}
              </div>
            </div>
            <div className="card" style={{ borderTop: '3px solid #0055A4' }}>
              <div style={{ fontWeight: 700, fontSize: '13px', color: '#0055A4', marginBottom: '12px' }}>🇫🇷 Français</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {HASHTAGS.fr.map((h, i) => (
                  <span key={i} style={{
                    padding: '4px 10px', borderRadius: '4px', fontSize: '11px',
                    background: 'rgba(0,85,164,0.08)', color: '#0055A4',
                    border: '1px solid rgba(0,85,164,0.2)', fontFamily: 'DM Mono, monospace',
                  }}>{h}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="card" style={{
            borderColor: 'rgba(244, 67, 54, 0.2)',
            background: 'rgba(244, 67, 54, 0.03)',
          }}>
            <div style={{ fontWeight: 700, fontSize: '12px', color: 'var(--alert)', marginBottom: '8px' }}>
              ⚠️ Regla de Hashtags
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              <strong>Máx 15-20 hashtags por post</strong> (Instagram). TikTok: 3-5 máximo.<br/>
              <strong>Mezclar:</strong> 40% nicho (rana, froglegs) + 30% categoría (superfood, healthy) + 30% amplio (food, cocina)<br/>
              <strong>Nunca repetir el mismo set exacto</strong> — rotar combinaciones cada 3-5 posts<br/>
              <strong>LinkedIn:</strong> máximo 3 hashtags, siempre en español neutro
            </div>
          </div>
        </>
      )}
    </div>
  )
}

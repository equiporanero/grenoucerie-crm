# INSTRUCCIONES PARA CLAUDE COWORK — Dashboard v7.0 (Twenty CRM)

## CONTEXTO
Eliminar Stack Tech e integrar Twenty CRM como vista embebida en el dashboard.

## CAMBIOS A REALIZAR (3 archivos):

### 1. `src/App.jsx`
- Eliminar: `import Stack from './components/Stack/Stack'`
- Añadir: `import TwentyCRM from './components/TwentyCRM/TwentyCRM'`
- En VISTAS: cambiar `stack: Stack` → `twenty: TwentyCRM`

### 2. `src/components/Sidebar.jsx`
- En grupo SISTEMA: cambiar `{ id: 'stack', icon: '◎', label: 'Stack Tech' }` → `{ id: 'twenty', icon: '🔷', label: 'Twenty CRM', badge: 'nuevo' }`
- Cambiar versión de "Marketing CMD v5.0" a "Marketing CMD v7.0"

### 3. Crear `src/components/TwentyCRM/TwentyCRM.jsx`
Ver archivo completo abajo.

## PASOS

1. Hacer los 3 cambios
2. `npm run build` para verificar
3. `git add -A && git commit -m "feat: eliminar Stack Tech, integrar Twenty CRM" && git push origin main`
4. Verificar deploy en Vercel (~2 min)

```javascript
// src/components/TwentyCRM/TwentyCRM.jsx
import { useState } from 'react'
const TWENTY_URL = 'https://grenoucerie-crm.vercel.app'
export default function TwentyCRM() {
    const [loading, setLoading] = useState(true)
    return (
        <div className="fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div className="page-header" style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <h1 className="page-title" style={{ marginBottom: '4px' }}>🔷 Twenty CRM</h1>
                        <div className="page-subtitle">CRM open-source · Pipeline · Contactos · Companies</div>
                    </div>
                    <a href={TWENTY_URL} target="_blank" rel="noopener noreferrer" style={{ padding: '6px 12px', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', color: 'var(--text-muted)', fontSize: '11px', fontFamily: 'DM Mono, monospace', cursor: 'pointer', textDecoration: 'none' }}>Abrir en nueva ventana ↗</a>
                </div>
            </div>
            <div style={{ flex: 1, borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--bg-elevated)', position: 'relative' }}>
                {loading && <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-elevated)', zIndex: 10 }}><div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}><div style={{ fontSize: '32px' }}>🔷</div><div style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'DM Mono, monospace' }}>Cargando Twenty CRM...</div></div></div>}
                <iframe src={TWENTY_URL} style={{ width: '100%', height: '100%', border: 'none', minHeight: '70vh' }} title="Twenty CRM" onLoad={() => setLoading(false)} sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals" />
            </div>
        </div>
    )
}
```

## CONTEXTO
El dashboard CRM de Grenoucerie está en el repo `ancayalma/Gotomarket` (rama main).
Hay 2 archivos actualizados en el VPS que necesitan pushearse y deployarse.
El proyecto ya tiene Vercel conectado, así que al push se redespliega automáticamente.

## PASO 1: Clonar el repo (si no lo tienes)

```bash
cd C:\Users\PC\OneDrive\GO TO MARKET\app
git clone https://github.com/ancayalma/Gotomarket.git
cd Gotomarket
```

Si ya lo tienes clonado, solo haz pull:
```bash
cd C:\Users\PC\OneDrive\GO TO MARKET\app\Gotomarket
git pull origin main
```

## PASO 2: Reemplazar los 2 archivos actualizados

Copiar desde el VPS (si tienes acceso SSH) o crear manualmente:

### Archivo 1: `src/hooks/useLeads.js`

Reemplazar el contenido completo con:

```javascript
// Hook para obtener datos reales desde Supabase
// Tablas: distributors, deals, activities, alerts, revenue_tracking, goals
import { useState, useEffect } from 'react'
import { supabase, isConnected } from '../lib/supabase'

const FALLBACK = {
    total: 0,
    distributors: [],
    deals: [],
    activities: [],
    alerts: [],
    revenue: { total: 0, goal: 500000, pct: 0 },
    byStage: { prospeccion: 0, contacto: 0, muestra: 0, negociacion: 0, activo: 0, embajador: 0 },
    byGama: { vietnam: 0, premium: 0, club: 0, despieces: 0 },
    byMarket: { ES: 0, FR: 0 },
    pipelineValue: 0,
    loading: false,
    error: null,
    connected: false,
}

const stageToPhase = {
    prospect: 'prospeccion',
    contacted: 'contacto',
    trial: 'muestra',
    qualified: 'muestra',
    negotiation: 'negociacion',
    proposal: 'negociacion',
    signed: 'activo',
    won: 'activo',
    active: 'activo',
    lost: 'prospeccion',
}

export function useCRMData() {
    const [data, setData] = useState({ ...FALLBACK, loading: isConnected })

    useEffect(() => {
        if (!isConnected || !supabase) {
            setData({ ...FALLBACK })
            return
        }

        async function fetchAll() {
            try {
                const [distRes, dealsRes, actsRes, alertsRes, revRes] = await Promise.all([
                    supabase.from('distributors').select('*').order('created_at', { ascending: false }),
                    supabase.from('deals').select('*').order('created_at', { ascending: false }),
                    supabase.from('activities').select('*').order('created_at', { ascending: false }),
                    supabase.from('alerts').select('*').order('created_at', { ascending: false }),
                    supabase.from('revenue_tracking').select('*').order('period_start'),
                ])

                const distributors = distRes.data || []
                const deals = dealsRes.data || []
                const activities = actsRes.data || []
                const alerts = alertsRes.data || []
                const revenue = revRes.data || []

                const byStage = { prospeccion: 0, contacto: 0, muestra: 0, negociacion: 0, activo: 0, embajador: 0 }
                distributors.forEach(d => {
                    const phase = stageToPhase[d.stage] || 'prospeccion'
                    byStage[phase]++
                })

                const byGama = { vietnam: 0, premium: 0, club: 0, despieces: 0 }
                distributors.forEach(d => {
                    if (d.product_type) {
                        const pt = d.product_type.toLowerCase()
                        if (pt.includes('vietnam')) byGama.vietnam++
                        if (pt.includes('premium')) byGama.premium++
                        if (pt.includes('club') || pt.includes('fresca')) byGama.club++
                        if (pt.includes('despiece') || pt.includes('decoupe')) byGama.despieces++
                    }
                    if (d.has_vietnam) byGama.vietnam++
                    if (d.has_premium) byGama.premium++
                    if (d.has_club) byGama.club++
                    if (d.has_despieces) byGama.despieces++
                })

                const byMarket = { ES: 0, FR: 0 }
                distributors.forEach(d => {
                    if (d.region && d.region.toLowerCase().includes('france')) byMarket.FR++
                    else byMarket.ES++
                })

                const totalRev = revenue.reduce((s, r) => s + (r.cumulative_revenue_eur || r.revenue_eur || 0), 0)
                const goal = 500000
                const pct = Math.round((totalRev / goal) * 100)

                setData({
                    total: distributors.length,
                    distributors,
                    deals,
                    activities,
                    alerts,
                    revenue: { total: totalRev, goal, pct },
                    byStage,
                    byGama,
                    byMarket,
                    pipelineValue: deals.reduce((s, d) => s + (d.value_eur || 0), 0) +
                                   distributors.reduce((s, d) => s + (d.deal_value_eur || 0), 0),
                    loading: false,
                    error: null,
                    connected: true,
                })
            } catch (err) {
                console.error('Supabase fetch error:', err)
                setData({ ...FALLBACK, error: err.message, connected: false })
            }
        }

        fetchAll()
        const interval = setInterval(fetchAll, 120_000)
        return () => clearInterval(interval)
    }, [])

    return data
}

export function useLeads() {
    return useCRMData()
}

export async function saveDistributor(distributor) {
    if (!supabase) return { error: 'Supabase no conectado' }
    if (distributor.id && !distributor.id.startsWith('new-')) {
        const { data, error } = await supabase.from('distributors').update(distributor).eq('id', distributor.id).select()
        return { data, error }
    } else {
        const { id, ...rest } = distributor
        const { data, error } = await supabase.from('distributors').insert(rest).select()
        return { data, error }
    }
}

export async function saveActivity(activity) {
    if (!supabase) return { error: 'Supabase no conectado' }
    const { data, error } = await supabase.from('activities').insert(activity).select()
    return { data, error }
}

export async function deleteDistributor(id) {
    if (!supabase) return { error: 'Supabase no conectado' }
    const { error } = await supabase.from('distributors').delete().eq('id', id)
    return { error }
}

export default useCRMData
```

### Archivo 2: `src/components/Dashboard/Dashboard.jsx`

Solo cambiar las líneas 1-5 (imports). Buscar:
```javascript
// Grenoucerie S.L. — Version 5.0
import { useLeads } from '../../hooks/useLeads'
```

Reemplazar con:
```javascript
// Grenoucerie S.L. — Version 6.0 (estrategia v3.0 — 4 gamas)
import { useCRMData } from '../../hooks/useLeads'
```

Y buscar en el componente principal (línea ~295):
```javascript
const leads = useLeads()
```

Reemplazar con:
```javascript
const crmData = useCRMData()
```

Y actualizar todas las referencias de `leads.` a `crmData.` en el componente:
- `leads.total` → `crmData.total`
- `leads.byStage` → `crmData.byStage`
- `leads.loading` → `crmData.loading`
- `leads.connected` → `crmData.connected`
- `leads.error` → `crmData.error`

## PASO 3: Probar build local

```bash
npm install
npm run build
```

Si el build es exitoso, verificar que no hay errores:
```bash
npm run preview
# Abrir http://localhost:4173 y verificar que el dashboard carga
```

## PASO 4: Commit y push

```bash
git add -A
git commit -m "feat: dashboard v6.0 — estrategia v3.0 — 4 gamas, useCRMData hook, tablas Supabase correctas"
git push origin main
```

## PASO 5: Verificar deploy en Vercel

- Ir a https://vercel.com/dashboard
- Verificar que el nuevo deploy se creó automáticamente
- La URL de producción es: https://grenoucerie-dashboard.vercel.app (o la que tengas configurada)

## PASO 6: Verificar funcionamiento

Abrir la URL de producción y verificar:
1. ✅ El dashboard carga sin errores
2. ✅ Las 4 gamas se muestran (Vietnam, Premium, Club/Fresca, Despieces)
3. ✅ Los KPIs por gama aparecen
4. ✅ El sidebar muestra "GAMAS" en vez de "MERCADOS"
5. ✅ No hay errores en consola del navegador (F12)

## NOTAS

- El Supabase URL es: `https://iveyofwlpqtohxvxvvrp.supabase.co`
- El anon key está en `src/lib/supabase.js` (ya configurado)
- Las tablas que debe leer: `distributors`, `deals`, `activities`, `alerts`, `revenue_tracking`
- Si las tablas están vacías, el dashboard mostrará 0 en todos los KPIs (es normal)
- Si Supabase no responde, el dashboard cae a fallback (modo offline) sin errores

// Hook para obtener datos reales desde Supabase
// Tablas: distributors, deals, activities, alerts, revenue_tracking, goals
import { useState, useEffect } from 'react'
import { supabase, isConnected } from '../lib/supabase'

// Datos fallback si Supabase no está configurado
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
    loading: false,
    error: null,
    connected: false,
}

// Mapear stage del CRM a fase del pipeline
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

                // Calcular KPIs derivados
                const byStage = { prospeccion: 0, contacto: 0, muestra: 0, negociacion: 0, activo: 0, embajador: 0 }
                distributors.forEach(d => {
                    const phase = stageToPhase[d.stage] || 'prospeccion'
                    byStage[phase]++
                })

                // Por gama: usar product_type del distribuidor o del deal
                const byGama = { vietnam: 0, premium: 0, club: 0, despieces: 0 }
                distributors.forEach(d => {
                    if (d.product_type) {
                        const pt = d.product_type.toLowerCase()
                        if (pt.includes('vietnam')) byGama.vietnam++
                        if (pt.includes('premium')) byGama.premium++
                        if (pt.includes('club') || pt.includes('fresca')) byGama.club++
                        if (pt.includes('despiece') || pt.includes('decoupe')) byGama.despieces++
                    }
                    // También contar por flags booleanos si existen
                    if (d.has_vietnam) byGama.vietnam++
                    if (d.has_premium) byGama.premium++
                    if (d.has_club) byGama.club++
                    if (d.has_despieces) byGama.despieces++
                })
                deals.forEach(d => {
                    if (d.product_type) {
                        const pt = d.product_type.toLowerCase()
                        if (pt.includes('vietnam')) byGama.vietnam = Math.max(byGama.vietnam, byGama.vietnam) // no duplicar
                        if (pt.includes('premium')) byGama.premium = Math.max(byGama.premium, byGama.premium)
                    }
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

        // Refresh cada 2 minutos
        const interval = setInterval(fetchAll, 120_000)
        return () => clearInterval(interval)
    }, [])

    return data
}

// Hook para crear/actualizar distribuidores
export async function saveDistributor(distributor) {
    if (!supabase) return { error: 'Supabase no conectado' }

    if (distributor.id && !distributor.id.startsWith('new-')) {
        // Update
        const { data, error } = await supabase
            .from('distributors')
            .update(distributor)
            .eq('id', distributor.id)
            .select()
        return { data, error }
    } else {
        // Insert
        const { id, ...rest } = distributor
        const { data, error } = await supabase
            .from('distributors')
            .insert(rest)
            .select()
        return { data, error }
    }
}

// Hook para crear deal
export async function saveDeal(deal) {
    if (!supabase) return { error: 'Supabase no conectado' }
    const { data, error } = await supabase.from('deals').insert(deal).select()
    return { data, error }
}

// Hook para crear actividad
export async function saveActivity(activity) {
    if (!supabase) return { error: 'Supabase no conectado' }
    const { data, error } = await supabase.from('activities').insert(activity).select()
    return { data, error }
}

// Hook para eliminar distribuidor
export async function deleteDistributor(id) {
    if (!supabase) return { error: 'Supabase no conectado' }
    const { error } = await supabase.from('distributors').delete().eq('id', id)
    return { error }
}

export default useCRMData

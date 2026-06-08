import { createClient } from '@supabase/supabase-js'

const URL = import.meta.env.VITE_SUPABASE_URL
  || 'https://pnxtynapbusddgrzfhmw.supabase.co'

const KEY = import.meta.env.VITE_SUPABASE_ANON_KEY
  || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBueHR5bmFwYnVzZGRncnpmaG13Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2ODIxNjQsImV4cCI6MjA5NDI1ODE2NH0.Rk7OzET5nOtBWGNIRlGFb-_mdnpKzAM8dWktXvgPH1k'

export const supabase = createClient(URL, KEY)

/* ── Mapeo: etapas BasaltCRM → Grenoucerie ── */
export const STAGE_CONFIG = [
  { id: 'Identify',      label: 'Prospección', emoji: '🔍', color: '#686C64' },
  { id: 'Engage_AI',     label: 'Contacto',    emoji: '📞', color: '#4A82C9' },
  { id: 'Engage_Human',  label: 'Contacto',    emoji: '📞', color: '#4A82C9' },
  { id: 'Offering',      label: 'Muestra',     emoji: '📦', color: '#BFA25C' },
  { id: 'Finalizing',    label: 'Negociación', emoji: '🤝', color: '#C9983A' },
  { id: 'Converted',     label: 'Activo',      emoji: '✅', color: '#5BA872' },
  { id: 'Closed',        label: 'Perdido',     emoji: '❌', color: '#C75454' },
]

// Etapas únicas para el Kanban (Contacto agrupa Engage_AI + Engage_Human)
export const KANBAN_STAGES = [
  { id: 'Identify',   label: 'Prospección', emoji: '🔍', color: '#686C64', ids: ['Identify'] },
  { id: 'Engage',     label: 'Contacto',    emoji: '📞', color: '#4A82C9', ids: ['Engage_AI','Engage_Human'] },
  { id: 'Offering',   label: 'Muestra',     emoji: '📦', color: '#BFA25C', ids: ['Offering'] },
  { id: 'Finalizing', label: 'Negociación', emoji: '🤝', color: '#C9983A', ids: ['Finalizing'] },
  { id: 'Converted',  label: 'Activo',      emoji: '✅', color: '#5BA872', ids: ['Converted'] },
  { id: 'Closed',     label: 'Perdido',     emoji: '❌', color: '#C75454', ids: ['Closed'] },
]

export function getStageConfig(stage) {
  return STAGE_CONFIG.find(s => s.id === stage) || { label: stage || '—', emoji: '·', color: '#686C64' }
}

export function getKanbanStage(stage) {
  return KANBAN_STAGES.find(s => s.ids.includes(stage)) || KANBAN_STAGES[0]
}

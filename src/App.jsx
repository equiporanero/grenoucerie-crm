import { useState, useMemo }  from 'react'
import { useLeads }            from './hooks/useLeads.js'
import { HermesToastContainer, HermesHistory } from './components/HermesBar.jsx'
import Sidebar    from './components/Sidebar.jsx'
import Dashboard  from './components/Dashboard.jsx'
import Pipeline   from './components/Pipeline.jsx'
import Leads      from './components/Leads.jsx'
import LeadForm   from './components/LeadForm.jsx'

/* ── Inferir mercado a partir de campos del lead ── */
function inferMarket(lead) {
  const hay = [lead.company, lead.email, lead.jobTitle]
    .filter(Boolean).join(' ').toLowerCase()

  if (/petfood|pet food|mascota|animal/.test(hay))         return 'petfood'
  if (/france|paris|lyon|bordeaux|\.fr$/.test(hay))        return 'francia'
  if (/spain|madrid|barcelona|\.es$|españa/.test(hay))     return 'espana'
  return 'other'
}

export default function App() {
  const [view,         setView]         = useState('dashboard')
  const [marketFilter, setMarketFilter] = useState('all')
  const [formState,    setFormState]    = useState(null)   // null | { mode: 'create' | 'edit', lead?: lead }
  const [saving,       setSaving]       = useState(false)

  const {
    leads, loading, error,
    moveStage, sendToHermes,
    createLead, updateLead, deleteLead,
    hermesQueue, hermesHistory, dismissHermes,
    refetch,
  } = useLeads()

  /* Leads filtrados por mercado */
  const filteredLeads = useMemo(() => {
    if (marketFilter === 'all') return leads
    return leads.filter(l => inferMarket(l) === marketFilter)
  }, [leads, marketFilter])

  /* Stats para sidebar */
  const stats = useMemo(() => {
    const byMarket = {
      francia: leads.filter(l => inferMarket(l) === 'francia').length,
      espana:  leads.filter(l => inferMarket(l) === 'espana').length,
      petfood: leads.filter(l => inferMarket(l) === 'petfood').length,
    }
    return {
      total:      filteredLeads.length,
      activos:    filteredLeads.filter(l => l.pipeline_stage === 'Converted').length,
      negociacion:filteredLeads.filter(l => l.pipeline_stage === 'Finalizing').length,
      byMarket,
    }
  }, [leads, filteredLeads])

  /* Form handlers */
  const openCreate = () => setFormState({ mode: 'create' })
  const openEdit   = (lead) => setFormState({ mode: 'edit', lead })
  const closeForm  = () => setFormState(null)

  async function handleSave(fields) {
    setSaving(true)
    let result
    if (formState.mode === 'create') {
      result = await createLead(fields)
    } else {
      result = await updateLead(formState.lead.id, fields)
    }
    setSaving(false)
    if (!result.error) closeForm()
  }

  /* View renderer */
  function renderView() {
    const props = {
      leads: filteredLeads,
      loading,
      moveStage,
      sendToHermes,
      onEdit:   openEdit,
      onDelete: deleteLead,
    }
    if (view === 'dashboard') return <Dashboard {...props} />
    if (view === 'pipeline')  return <Pipeline  {...props} />
    if (view === 'leads')     return <Leads     {...props} />
    return null
  }

  return (
    <div className="app-shell">
      <Sidebar
        view={view}
        setView={setView}
        marketFilter={marketFilter}
        setMarketFilter={setMarketFilter}
        stats={stats}
        hermesHistory={hermesHistory}
        onNewLead={openCreate}
      />

      <main className="main-content">
        {error && (
          <div style={{
            background: 'var(--danger-bg)', border: '1px solid var(--danger-border)',
            borderRadius: 8, padding: '10px 14px', fontSize: 11,
            fontFamily: 'var(--font-mono)', color: 'var(--danger)', marginBottom: 16,
          }}>
            ⚠ Supabase: {error}
          </div>
        )}
        {renderView()}
      </main>

      {/* Hermes toasts */}
      <HermesToastContainer queue={hermesQueue} onDismiss={dismissHermes} />

      {/* Formulario lead */}
      {formState && (
        <LeadForm
          lead={formState.lead}
          onSave={handleSave}
          onClose={closeForm}
          saving={saving}
        />
      )}
    </div>
  )
}

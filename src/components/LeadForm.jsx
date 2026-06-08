import { useState, useEffect } from 'react'
import { KANBAN_STAGES } from '../lib/supabase.js'

const EMPTY = {
  firstName: '', lastName: '', company: '', jobTitle: '',
  email: '', phone: '',
  pipeline_stage: 'Identify',
  outreach_status: 'NOT_STARTED',
}

const OUTREACH_OPTIONS = [
  { value: 'NOT_STARTED',      label: 'Sin iniciar'      },
  { value: 'SENT',             label: 'Email enviado'    },
  { value: 'OPENED',           label: 'Abierto'          },
  { value: 'REPLIED_POSITIVE', label: 'Respuesta positiva' },
  { value: 'MEETING_BOOKED',   label: 'Reunión agendada' },
  { value: 'REPLIED_NEGATIVE', label: 'Respuesta negativa' },
  { value: 'BOUNCED',          label: 'Bounce'           },
]

function Field({ label, id, error, children }) {
  return (
    <div>
      <label htmlFor={id} style={{
        display: 'block', fontSize: 9, fontFamily: 'var(--font-mono)',
        color: error ? 'var(--danger)' : 'var(--text-faint)',
        textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 4,
      }}>
        {label}{error && ` — ${error}`}
      </label>
      {children}
    </div>
  )
}

function Input({ id, value, onChange, placeholder, type = 'text', hasError }) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: '100%', boxSizing: 'border-box',
        padding: '8px 10px',
        background: 'var(--surface-2)',
        border: `1px solid ${hasError ? 'var(--danger)' : 'var(--border)'}`,
        borderRadius: 'var(--r-sm)',
        color: 'var(--text)', fontSize: 12,
        fontFamily: 'var(--font-ui)', outline: 'none',
        transition: 'border-color 0.15s',
      }}
      onFocus={e => { e.target.style.borderColor = hasError ? 'var(--danger)' : 'var(--brand)' }}
      onBlur={e => { e.target.style.borderColor = hasError ? 'var(--danger)' : 'var(--border)' }}
    />
  )
}

function Select({ id, value, onChange, options }) {
  return (
    <select
      id={id}
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{
        width: '100%', boxSizing: 'border-box',
        padding: '8px 10px',
        background: 'var(--surface-2)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--r-sm)',
        color: 'var(--text)', fontSize: 12,
        fontFamily: 'var(--font-ui)', outline: 'none', cursor: 'pointer',
        appearance: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23686C64' fill='none' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 10px center',
        paddingRight: 28,
      }}
    >
      {options.map(opt => (
        <option key={opt.value} value={opt.value} style={{ background: '#131618' }}>
          {opt.label}
        </option>
      ))}
    </select>
  )
}

export default function LeadForm({ lead, onSave, onClose, saving }) {
  const isEdit = !!lead?.id
  const [form,   setForm]   = useState(lead ? { ...EMPTY, ...lead } : EMPTY)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    setForm(lead ? { ...EMPTY, ...lead } : EMPTY)
    setErrors({})
  }, [lead])

  function set(field, value) {
    setForm(f => ({ ...f, [field]: value }))
    if (errors[field]) setErrors(e => ({ ...e, [field]: null }))
  }

  function validate() {
    const errs = {}
    if (!form.firstName.trim() && !form.company.trim()) errs.firstName = 'Nombre o empresa requerido'
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Email inválido'
    return errs
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    onSave(form)
  }

  const stageOptions = KANBAN_STAGES.map(s => ({ value: s.id, label: `${s.emoji} ${s.label}` }))
  // Expand Engage to both Engage variants for form
  const stageOptionsExpanded = [
    { value: 'Identify',     label: '🔍 Prospección'  },
    { value: 'Engage_AI',    label: '📞 Contacto IA'  },
    { value: 'Engage_Human', label: '📞 Contacto HH'  },
    { value: 'Offering',     label: '📦 Muestra'       },
    { value: 'Finalizing',   label: '🤝 Negociación'   },
    { value: 'Converted',    label: '✅ Activo'        },
    { value: 'Closed',       label: '❌ Perdido'       },
  ]

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 400,
        background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border-2)',
          borderRadius: 'var(--r-lg)',
          width: 480, maxWidth: '100%',
          maxHeight: '90vh',
          overflow: 'hidden',
          boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
          animation: 'fadeIn 0.15s ease',
          display: 'flex', flexDirection: 'column',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          padding: '18px 20px 16px',
          borderBottom: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexShrink: 0,
        }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600, color: 'var(--text)', letterSpacing: '-0.2px' }}>
              {isEdit ? 'Editar lead' : 'Nuevo lead'}
            </div>
            <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-faint)', marginTop: 2 }}>
              {isEdit ? `ID ${lead.id.slice(0, 8)}…` : 'Se añade al embudo en Prospección'}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'var(--surface-3)', border: '1px solid var(--border)',
              color: 'var(--text-muted)', cursor: 'pointer',
              width: 26, height: 26, borderRadius: 6,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12,
            }}
          >
            ✕
          </button>
        </div>

        {/* Form body */}
        <form onSubmit={handleSubmit} style={{ overflow: 'auto', flex: 1 }}>
          <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>

            {/* Nombre + Apellido */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <Field label="Nombre" id="firstName" error={errors.firstName}>
                <Input id="firstName" value={form.firstName} onChange={v => set('firstName', v)}
                  placeholder="Pierre" hasError={!!errors.firstName} />
              </Field>
              <Field label="Apellido" id="lastName">
                <Input id="lastName" value={form.lastName} onChange={v => set('lastName', v)}
                  placeholder="Dupont" />
              </Field>
            </div>

            {/* Empresa + Cargo */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <Field label="Empresa" id="company">
                <Input id="company" value={form.company} onChange={v => set('company', v)}
                  placeholder="Maison Dupont" />
              </Field>
              <Field label="Cargo" id="jobTitle">
                <Input id="jobTitle" value={form.jobTitle} onChange={v => set('jobTitle', v)}
                  placeholder="Chef ejecutivo" />
              </Field>
            </div>

            {/* Email + Teléfono */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <Field label="Email" id="email" error={errors.email}>
                <Input id="email" value={form.email} onChange={v => set('email', v)}
                  placeholder="pierre@dupont.fr" type="email" hasError={!!errors.email} />
              </Field>
              <Field label="Teléfono" id="phone">
                <Input id="phone" value={form.phone} onChange={v => set('phone', v)}
                  placeholder="+33 6 12 34 56 78" />
              </Field>
            </div>

            {/* Etapa + Outreach */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <Field label="Etapa del pipeline" id="pipeline_stage">
                <Select id="pipeline_stage" value={form.pipeline_stage}
                  onChange={v => set('pipeline_stage', v)} options={stageOptionsExpanded} />
              </Field>
              <Field label="Estado outreach" id="outreach_status">
                <Select id="outreach_status" value={form.outreach_status}
                  onChange={v => set('outreach_status', v)} options={OUTREACH_OPTIONS} />
              </Field>
            </div>

          </div>

          {/* Footer */}
          <div style={{
            padding: '14px 20px',
            borderTop: '1px solid var(--border)',
            display: 'flex', gap: 8, justifyContent: 'flex-end',
            flexShrink: 0,
          }}>
            <button
              type="button" onClick={onClose}
              style={{
                padding: '8px 16px', borderRadius: 'var(--r-sm)',
                background: 'none', border: '1px solid var(--border)',
                color: 'var(--text-muted)', fontSize: 12, cursor: 'pointer',
                fontFamily: 'var(--font-ui)',
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              style={{
                padding: '8px 20px', borderRadius: 'var(--r-sm)',
                background: saving ? 'var(--brand-dim)' : 'var(--brand)',
                border: 'none', color: saving ? 'var(--text-faint)' : '#0A1A0B',
                fontSize: 12, fontWeight: 600, cursor: saving ? 'not-allowed' : 'pointer',
                fontFamily: 'var(--font-ui)', transition: 'all 0.15s',
              }}
            >
              {saving ? 'Guardando…' : isEdit ? 'Guardar cambios' : 'Añadir lead'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

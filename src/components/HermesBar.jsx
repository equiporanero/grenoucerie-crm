import { useState } from 'react'

/* ── Toast individual ───────────────────────────────────── */
function HermesToast({ event, onDismiss }) {
  return (
    <div
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border-2)',
        borderLeft: '3px solid var(--ok)',
        borderRadius: 'var(--r-md)',
        padding: '12px 14px',
        maxWidth: 300,
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        animation: 'slideInRight 0.25s ease',
        cursor: 'pointer',
      }}
      onClick={() => onDismiss(event.id)}
    >
      <div style={{
        fontSize: 9, fontFamily: 'var(--font-mono)', color: 'var(--ok)',
        letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: 5,
        display: 'flex', alignItems: 'center', gap: 5,
      }}>
        <span style={{
          display: 'inline-block', width: 6, height: 6, borderRadius: '50%',
          background: 'var(--ok)', boxShadow: '0 0 6px var(--ok)',
        }} />
        HERMES → AUTO
      </div>
      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>
        {event.leadName}
        {event.company && event.company !== event.leadName && (
          <span style={{ fontWeight: 400, color: 'var(--text-muted)', marginLeft: 5 }}>
            · {event.company}
          </span>
        )}
      </div>
      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
        {event.actionLabel}
        {event.newStage && (
          <> → <strong style={{ color: 'var(--text-body)' }}>{event.newStage}</strong></>
        )}
      </div>
      <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'var(--text-faint)', marginTop: 5 }}>
        click para cerrar
      </div>
    </div>
  )
}

/* ── Historial desplegable ──────────────────────────────── */
function HermesHistory({ events }) {
  const [open, setOpen] = useState(false)

  if (events.length === 0) return null

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: open ? 'var(--surface-3)' : 'none',
          border: '1px solid var(--border)', borderRadius: 'var(--r-sm)',
          color: 'var(--ok)', cursor: 'pointer', padding: '5px 10px',
          fontSize: 10, fontFamily: 'var(--font-mono)',
          transition: 'all 0.15s',
        }}
      >
        <span style={{
          width: 6, height: 6, borderRadius: '50%',
          background: 'var(--ok)', boxShadow: '0 0 5px var(--ok)',
          animation: 'pulse 2s infinite',
        }} />
        Hermes
        <span style={{
          background: 'var(--ok)', color: '#0A1A0B',
          fontSize: 8, fontWeight: 700, borderRadius: '50%',
          width: 14, height: 14, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
        }}>
          {events.length}
        </span>
      </button>

      {open && (
        <div
          style={{
            position: 'absolute', top: 'calc(100% + 6px)', right: 0,
            width: 280, background: 'var(--surface)',
            border: '1px solid var(--border-2)', borderRadius: 'var(--r-md)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
            zIndex: 100, overflow: 'hidden',
            animation: 'fadeIn 0.15s ease',
          }}
        >
          <div style={{
            padding: '10px 14px 8px',
            borderBottom: '1px solid var(--border)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
              Actividad Hermes
            </span>
            <button
              onClick={() => setOpen(false)}
              style={{ background: 'none', border: 'none', color: 'var(--text-faint)', cursor: 'pointer', fontSize: 11 }}
            >
              ✕
            </button>
          </div>
          <div style={{ maxHeight: 240, overflowY: 'auto' }}>
            {events.map(ev => (
              <div key={ev.id} style={{
                padding: '8px 14px',
                borderBottom: '1px solid var(--border)',
                display: 'flex', gap: 8, alignItems: 'flex-start',
              }}>
                <div style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: 'var(--ok)', flexShrink: 0, marginTop: 5,
                }} />
                <div>
                  <div style={{ fontSize: 11, color: 'var(--text-body)', fontWeight: 500 }}>
                    {ev.leadName}
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>
                    {ev.actionLabel}
                  </div>
                  <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'var(--text-faint)', marginTop: 2 }}>
                    {ev.ts.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/* ── Container de toasts (esquina inferior derecha) ─────── */
export function HermesToastContainer({ queue, onDismiss }) {
  if (queue.length === 0) return null
  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24, zIndex: 500,
      display: 'flex', flexDirection: 'column', gap: 8,
      alignItems: 'flex-end',
    }}>
      {queue.slice(0, 3).map(ev => (
        <HermesToast key={ev.id} event={ev} onDismiss={onDismiss} />
      ))}
    </div>
  )
}

export { HermesHistory }

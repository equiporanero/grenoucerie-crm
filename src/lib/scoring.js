/* ══════════════════════════════════════════════
   SCORING — Puntuación automática de leads
   Fuente: pipeline_stage + outreach_status
   Rango: 0–100
   HOT ≥ 85 · WARM 65–84 · COLD < 65
══════════════════════════════════════════════ */

export const STAGE_SCORES = {
  Identify:     20,
  Engage_AI:    35,
  Engage_Human: 50,
  Offering:     65,
  Finalizing:   78,
  Converted:    92,
  Closed:        0,
}

export const OUTREACH_BONUSES = {
  NOT_STARTED:       0,
  SENT:              5,
  OPENED:           12,
  REPLIED_POSITIVE: 20,
  MEETING_BOOKED:   24,
  REPLIED_NEGATIVE: -8,
  BOUNCED:         -12,
}

export function computeScore(lead) {
  const base  = STAGE_SCORES[lead.pipeline_stage]  ?? 10
  const bonus = OUTREACH_BONUSES[lead.outreach_status] ?? 0
  return Math.max(0, Math.min(100, base + bonus))
}

export function getHeat(score) {
  if (score >= 85) return { label: 'HOT',  color: '#E8612C', bg: '#E8612C18', border: '#E8612C44', emoji: '🔥' }
  if (score >= 65) return { label: 'WARM', color: '#C9983A', bg: '#C9983A18', border: '#C9983A44', emoji: '◉'  }
  return              { label: 'COLD', color: '#4A82C9', bg: '#4A82C918', border: '#4A82C944', emoji: '❄'  }
}

export function enrichLead(lead) {
  const score = computeScore(lead)
  return { ...lead, _score: score, _heat: getHeat(score) }
}

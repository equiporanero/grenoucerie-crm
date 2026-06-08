// import-hermes-leads.js
// Importa los 26 leads de campana_vietnam_touch1_envios.xlsx al CRM Supabase
// Run: node scripts/import-hermes-leads.js

import { createClient } from '@supabase/supabase-js'
import { randomUUID } from 'crypto'

const SUPABASE_URL = 'https://pnxtynapbusddgrzfhmw.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBueHR5bmFwYnVzZGRncnpmaG13Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2ODIxNjQsImV4cCI6MjA5NDI1ODE2NH0.Rk7OzET5nOtBWGNIRlGFb-_mdnpKzAM8dWktXvgPH1k'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// Datos extraídos de campana_vietnam_touch1_envios.xlsx
// Hermes envió touch_1 el 2026-06-03 — stage: Engage_AI, outreach: SENT
const LEADS_RAW = [
  { empresa: 'Atlanterra',                       email: 'contact@atlanterra.fr',          region: 'Pays de la Loire / Rungis'              },
  { empresa: 'GVF International',                email: 'contact@gvf-international.com',  region: 'Île-de-France (Arcueil/Rungis)'          },
  { empresa: 'SML Import Export',                email: 'contact@sml-import-export.fr',   region: 'PACA (Marsella)'                         },
  { empresa: 'Cash Alimentaire',                 email: 'contact@cash-alimentaire.com',   region: 'PACA (Marsella)'                         },
  { empresa: 'SFG International Import Export',  email: 'gd@sfgintl.fr',                  region: 'Île-de-France (Chevilly-Larue/Rungis)'   },
  { empresa: 'Thiriet Distribution',             email: 'strasbourg@thiriet.com',         region: 'Grand Est (Strasbourg)'                  },
  { empresa: 'Exotique Pro',                     email: 'contact@exotiquepro.fr',          region: 'Occitanie (Toulouse)'                    },
  { empresa: 'COFRULY',                          email: 'contact@cofyruly.com',            region: 'Auvergne-Rhône-Alpes (Corbas/Lyon)'      },
  { empresa: 'AGIDRA',                           email: 'contact@agidra.com',              region: 'Rhône-Alpes'                             },
  { empresa: 'Yijia France',                     email: 'info@yijia-france.com',           region: 'Île-de-France'                           },
  { empresa: 'Tai-Yat Traiteur',                 email: 'contact@tai-yat.fr',              region: 'Île-de-France'                           },
  { empresa: 'Best China Food',                  email: 'contact@bestchinafood.fr',        region: 'Île-de-France'                           },
  { empresa: 'Tang Frères',                      email: 'pro@tangfreres.fr',               region: 'Île-de-France'                           },
  { empresa: 'SDA Distribution Asie',            email: 'sda@groupesda.fr',               region: 'Île-de-France'                           },
  { empresa: 'Euro-Asie Distribution',           email: 'info@euroasie.fr',                region: 'Hauts-de-France'                         },
  { empresa: 'Dogal Food',                       email: 'contact@dogalfood.fr',            region: 'PACA'                                    },
  { empresa: 'Groupe Le Saint',                  email: 'pro@groupelesaint.com',           region: 'Bretagne'                                },
  { empresa: 'Pro à Pro',                        email: 'pro@pro-a-pro.fr',               region: 'Île-de-France'                           },
  { empresa: 'Janax France',                     email: 'info@janax.dk',                   region: 'Internacional'                           },
  { empresa: 'Ô Marché d\'Asie',                 email: 'contact@omarchedasie.fr',         region: 'PACA (Marignane)'                        },
  { empresa: 'Yijia France (Eckbolsheim)',        email: 'contact@yijia.fr',                region: 'Lorraine'                                },
  { empresa: 'Direct Asia Food',                 email: 'contact@directasiafood.fr',       region: 'PACA (Toulon)'                           },
  { empresa: 'Dogal Food (Lyon)',                email: 'info@dogalfood.fr',               region: 'Rhône-Alpes'                             },
  { empresa: 'Tai-Yat (Rungis)',                 email: 'contact@taiyat.fr',               region: 'Île-de-France'                           },
  { empresa: 'Hoa Nam SAS',                      email: 'contact@hoanam.com',              region: 'Île-de-France (Paris)'                   },
  { empresa: 'Best China Food (Gonesse)',         email: 'contact@bestchinafood.com',       region: 'Île-de-France'                           },
]

// Mapeo al schema de crm_Leads
const SENT_AT = '2026-06-03T00:00:00.000Z'

const leads = LEADS_RAW.map(l => ({
  id:              randomUUID(),
  company:         l.empresa,
  email:           l.email,
  jobTitle:        `Distribuidor Vietnam | ${l.region}`,
  firstName:       '',
  lastName:        '',
  phone:           null,
  pipeline_stage:  'Engage_AI',     // Hermes ya contactó (touch_1)
  outreach_status: 'SENT',          // email enviado
  status:          'active',
  createdAt:       SENT_AT,
}))

async function run() {
  console.log(`\n🐸 Grenoucerie CRM — Importación Hermes`)
  console.log(`   ${leads.length} leads · campaña Vietnam Touch 1 · ${SENT_AT.slice(0,10)}\n`)

  // Insertar en lotes de 10
  const BATCH = 10
  let ok = 0, fail = 0

  for (let i = 0; i < leads.length; i += BATCH) {
    const batch = leads.slice(i, i + BATCH)
    const { data, error } = await supabase
      .from('crm_Leads')
      .insert(batch)
      .select()

    if (error) {
      console.error(`  ✗ Lote ${i/BATCH + 1} error:`, error.message)
      // Si es error de RLS, abortar e indicar alternativa
      if (error.message.includes('row-level security') || error.code === '42501') {
        console.error('\n  ⚠ RLS bloquea el insert con anon key.')
        console.error('  → Ejecuta el SQL generado en Supabase dashboard en su lugar.')
        console.error('  → Archivo: scripts/import-hermes-leads.sql\n')
        process.exit(1)
      }
      fail += batch.length
    } else {
      ok += data.length
      for (const row of data) {
        console.log(`  ✓ ${row.company} <${row.email}>`)
      }
    }
  }

  console.log(`\n  ✅ ${ok} importados · ✗ ${fail} fallidos`)
  if (ok > 0) {
    console.log(`  → Abre el CRM y filtra por mercado Francia para verlos`)
    console.log(`  → Todos en etapa "Contacto IA" con outreach SENT\n`)
  }
}

run().catch(console.error)

-- ══════════════════════════════════════════════════════════════
-- Grenoucerie CRM — Importación Hermes
-- Campaña: campana_vietnam_touch1 · Touch 1 · 2026-06-03
-- 26 distribuidores Francia — Gama Vietnam
-- pipeline_stage: Engage_AI (Hermes ya envió touch_1)
-- outreach_status: SENT
-- ══════════════════════════════════════════════════════════════
-- Ejecutar en: Supabase Dashboard → SQL Editor
-- Proyecto: pnxtynapbusddgrzfhmw
-- ══════════════════════════════════════════════════════════════

INSERT INTO "crm_Leads"
  ("company", "email", "jobTitle", "firstName", "lastName", "phone",
   "pipeline_stage", "outreach_status", "status", "createdAt")
VALUES
  ('Atlanterra',                      'contact@atlanterra.fr',         'Distribuidor Vietnam | Pays de la Loire / Rungis',            '', '', NULL, 'Engage_AI', 'SENT', 'active', '2026-06-03T00:00:00.000Z'),
  ('GVF International',               'contact@gvf-international.com', 'Distribuidor Vietnam | Île-de-France (Arcueil/Rungis)',        '', '', NULL, 'Engage_AI', 'SENT', 'active', '2026-06-03T00:00:00.000Z'),
  ('SML Import Export',               'contact@sml-import-export.fr',  'Distribuidor Vietnam | PACA (Marsella)',                       '', '', NULL, 'Engage_AI', 'SENT', 'active', '2026-06-03T00:00:00.000Z'),
  ('Cash Alimentaire',                'contact@cash-alimentaire.com',  'Distribuidor Vietnam | PACA (Marsella)',                       '', '', NULL, 'Engage_AI', 'SENT', 'active', '2026-06-03T00:00:00.000Z'),
  ('SFG International Import Export', 'gd@sfgintl.fr',                 'Distribuidor Vietnam | Île-de-France (Chevilly-Larue/Rungis)', '', '', NULL, 'Engage_AI', 'SENT', 'active', '2026-06-03T00:00:00.000Z'),
  ('Thiriet Distribution',            'strasbourg@thiriet.com',        'Distribuidor Vietnam | Grand Est (Strasbourg)',                '', '', NULL, 'Engage_AI', 'SENT', 'active', '2026-06-03T00:00:00.000Z'),
  ('Exotique Pro',                    'contact@exotiquepro.fr',        'Distribuidor Vietnam | Occitanie (Toulouse)',                  '', '', NULL, 'Engage_AI', 'SENT', 'active', '2026-06-03T00:00:00.000Z'),
  ('COFRULY',                         'contact@cofyruly.com',          'Distribuidor Vietnam | Auvergne-Rhône-Alpes (Corbas/Lyon)',    '', '', NULL, 'Engage_AI', 'SENT', 'active', '2026-06-03T00:00:00.000Z'),
  ('AGIDRA',                          'contact@agidra.com',            'Distribuidor Vietnam | Rhône-Alpes',                          '', '', NULL, 'Engage_AI', 'SENT', 'active', '2026-06-03T00:00:00.000Z'),
  ('Yijia France',                    'info@yijia-france.com',         'Distribuidor Vietnam | Île-de-France',                        '', '', NULL, 'Engage_AI', 'SENT', 'active', '2026-06-03T00:00:00.000Z'),
  ('Tai-Yat Traiteur',                'contact@tai-yat.fr',            'Distribuidor Vietnam | Île-de-France',                        '', '', NULL, 'Engage_AI', 'SENT', 'active', '2026-06-03T00:00:00.000Z'),
  ('Best China Food',                 'contact@bestchinafood.fr',      'Distribuidor Vietnam | Île-de-France',                        '', '', NULL, 'Engage_AI', 'SENT', 'active', '2026-06-03T00:00:00.000Z'),
  ('Tang Frères',                     'pro@tangfreres.fr',             'Distribuidor Vietnam | Île-de-France',                        '', '', NULL, 'Engage_AI', 'SENT', 'active', '2026-06-03T00:00:00.000Z'),
  ('SDA Distribution Asie',           'sda@groupesda.fr',              'Distribuidor Vietnam | Île-de-France',                        '', '', NULL, 'Engage_AI', 'SENT', 'active', '2026-06-03T00:00:00.000Z'),
  ('Euro-Asie Distribution',          'info@euroasie.fr',              'Distribuidor Vietnam | Hauts-de-France',                      '', '', NULL, 'Engage_AI', 'SENT', 'active', '2026-06-03T00:00:00.000Z'),
  ('Dogal Food',                      'contact@dogalfood.fr',          'Distribuidor Vietnam | PACA',                                 '', '', NULL, 'Engage_AI', 'SENT', 'active', '2026-06-03T00:00:00.000Z'),
  ('Groupe Le Saint',                 'pro@groupelesaint.com',         'Distribuidor Vietnam | Bretagne',                             '', '', NULL, 'Engage_AI', 'SENT', 'active', '2026-06-03T00:00:00.000Z'),
  ('Pro à Pro',                       'pro@pro-a-pro.fr',              'Distribuidor Vietnam | Île-de-France',                        '', '', NULL, 'Engage_AI', 'SENT', 'active', '2026-06-03T00:00:00.000Z'),
  ('Janax France',                    'info@janax.dk',                 'Distribuidor Vietnam | Internacional',                        '', '', NULL, 'Engage_AI', 'SENT', 'active', '2026-06-03T00:00:00.000Z'),
  ('Ô Marché d''Asie',                'contact@omarchedasie.fr',       'Distribuidor Vietnam | PACA (Marignane)',                      '', '', NULL, 'Engage_AI', 'SENT', 'active', '2026-06-03T00:00:00.000Z'),
  ('Yijia France (Eckbolsheim)',       'contact@yijia.fr',              'Distribuidor Vietnam | Lorraine',                             '', '', NULL, 'Engage_AI', 'SENT', 'active', '2026-06-03T00:00:00.000Z'),
  ('Direct Asia Food',                'contact@directasiafood.fr',     'Distribuidor Vietnam | PACA (Toulon)',                         '', '', NULL, 'Engage_AI', 'SENT', 'active', '2026-06-03T00:00:00.000Z'),
  ('Dogal Food (Lyon)',               'info@dogalfood.fr',             'Distribuidor Vietnam | Rhône-Alpes',                          '', '', NULL, 'Engage_AI', 'SENT', 'active', '2026-06-03T00:00:00.000Z'),
  ('Tai-Yat (Rungis)',                'contact@taiyat.fr',             'Distribuidor Vietnam | Île-de-France',                        '', '', NULL, 'Engage_AI', 'SENT', 'active', '2026-06-03T00:00:00.000Z'),
  ('Hoa Nam SAS',                     'contact@hoanam.com',            'Distribuidor Vietnam | Île-de-France (Paris)',                 '', '', NULL, 'Engage_AI', 'SENT', 'active', '2026-06-03T00:00:00.000Z'),
  ('Best China Food (Gonesse)',        'contact@bestchinafood.com',     'Distribuidor Vietnam | Île-de-France',                        '', '', NULL, 'Engage_AI', 'SENT', 'active', '2026-06-03T00:00:00.000Z');

-- Verificar:
SELECT COUNT(*) as importados, pipeline_stage, outreach_status
FROM "crm_Leads"
WHERE "createdAt" = '2026-06-03T00:00:00.000Z'
GROUP BY pipeline_stage, outreach_status;

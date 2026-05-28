-- ============================================================
-- GRENOUCERIE CRM — Datos de Demo para Pruebas
-- Insertar distribuidores, deals, actividades y alertas
-- ============================================================

-- ============================================================
-- DISTRIBUIDORES (8 distribuidores realistas para demo)
-- ============================================================

-- Distribuidor 1: Generalista Île-de-France (el que ya tienen)
UPDATE distributors SET 
    name = 'Gros Distribution Paris',
    website = 'https://gros-distribution-paris.fr',
    email = 'contact@gros-distribution.fr',
    phone = '+33 1 45 67 89 01',
    stage = 'negotiation',
    deal_value_eur = 85000,
    probability = 50,
    has_vietnam = true,
    notes = 'Generalista Île-de-France. Ya vende productos Vietnam. Piloto junio 2026. Potencial: 2% → 8% de sus ventas con GRENOUCERIE.'
WHERE name = 'Distribuidor Generalista #1';

-- Distribuidor 2: Especialista HORECA Lyon
INSERT INTO distributors (name, company_name, region, type, channel, stage, deal_value_eur, probability, total_revenue_eur, current_year_revenue_eur, has_vietnam, has_premium, has_others, assigned_to, notes) VALUES
('Lyonnaise Du Poisson', 'Lyonnaise Du Poisson SAS', 'Auvergne-Rhône-Alpes', 'specialist', 'horeca', 'signed', 120000, 100, 45000, 45000, true, true, false, 'Paula', 'Especialista pescados y mariscos exóticos. 3 restauradores estrella Michelin como clientes. Firmado en mayo 2026.');

-- Distribuidor 3: Wholesaler Marseille PACA
INSERT INTO distributors (name, company_name, region, type, channel, stage, deal_value_eur, probability, has_vietnam, has_others, assigned_to, notes) VALUES
('Sud Food Distribution', 'Sud Food Distribution', 'Provence-Alpes-Côte d''Azur', 'wholesaler', 'both', 'trial', 60000, 70, true, true, 'Paula', 'Mayorista para restaurantes del sur de Francia. Interés en Vietnam + derivados. Pedido trial en curso.');

-- Distribuidor 4: Generalista Burdeos
INSERT INTO distributors (name, company_name, region, type, channel, stage, deal_value_eur, probability, has_vietnam, has_premium, assigned_to, notes) VALUES
('Cap Ouest Distribution', 'Cap Ouest Distribution SAS', 'Nouvelle-Aquitaine', 'generalist', 'horeca', 'contacted', 40000, 30, true, false, 'Paula', 'Distribuidor generalista con red en Burdeos y alrededores. Interés inicial confirmado. Pendiente propuesta comercial.');

-- Distribuidor 5: Premium especialista Paris
INSERT INTO distributors (name, company_name, region, type, channel, stage, deal_value_eur, probability, has_premium, assigned_to, notes) VALUES
('Paris Primeurs Premium', 'Paris Primeurs Premium', 'Île-de-France', 'specialist', 'horeca', 'prospect', 95000, 15, true, 'Fabi', 'Distribuidor premium para alta cocina parisina. Interés en línea Esculenta. A contacto inicial en Salon de la Gastronomía.');

-- Distribuidor 6: Distribuidor Nantes
INSERT INTO distributors (name, company_name, region, type, channel, stage, deal_value_eur, probability, has_vietnam, has_premium, has_others, last_contact_at, assigned_to, notes) VALUES
('Breizh Distribution', 'Breizh Distribution SAS', 'Pays de la Loire', 'generalist', 'both', 'negotiation', 55000, 60, true, true, false, NOW() - INTERVAL '18 days', 'Paula', 'Distribuidor con buena red en Bretaña. Negociando condiciones. ⚠️ Sin contacto hace 18 días.');

-- Distribuidor 7: Toulouse Occitanie
INSERT INTO distributors (name, company_name, region, type, channel, stage, deal_value_eur, probability, has_vietnam, assigned_to, notes) VALUES
('Occitanie Fresh', 'Occitanie Fresh SARL', 'Occitanie', 'generalist', 'retail', 'prospect', 35000, 20, true, 'Paula', 'Nuevo contacto via scraping Societe.com. Distribuidor en expansión en Toulouse. Pendiente primer contacto.');

-- Distribuidor 8: Estrasburgo Este
INSERT INTO distributors (name, company_name, region, type, channel, stage, deal_value_eur, probability, has_vietnam, has_premium, last_contact_at, assigned_to, notes) VALUES
('Alsace Gourmet', 'Alsace Gourmet Distribution', 'Grand Est', 'specialist', 'horeca', 'active', 75000, 100, 30000, 30000, true, true, 'Paula', 'Especialista en productos gourmet para restauradores alsacianos. Activo desde feb 2026. Cliente regular.');

-- ============================================================
-- DEALS (pipeline de negociaciones)
-- ============================================================

INSERT INTO deals (distributor_id, title, description, value_eur, stage, probability, product_type, expected_close_date, assigned_to) 
SELECT id, 'Pedido Vietnam Q3 2026', 'Pedido trimestral de ancas de rana Vietnam para red HORECA', 85000, 'proposal', 50, '{vietnam}', '2026-07-15', 'Paula'
FROM distributors WHERE name = 'Gros Distribution Paris';

INSERT INTO deals (distributor_id, title, description, value_eur, stage, probability, product_type, expected_close_date, actual_close_date, assigned_to)
SELECT id, 'Contrato Premium 2026-2027', 'Contrato anual línea Premium/Esculenta para restaurantes estrella', 95000, 'won', 100, '{premium}', '2026-06-01', '2026-05-20', 'Paula'
FROM distributors WHERE name = 'Paris Primeurs Premium';

INSERT INTO deals (distributor_id, title, description, value_eur, stage, probability, product_type, expected_close_date, assigned_to)
SELECT id, 'Trial Vietnam + Derivados', 'Pedido de prueba Vietnam + productos derivados', 25000, 'qualified', 70, '{vietnam,others}', '2026-06-30', 'Paula'
FROM distributors WHERE name = 'Sud Food Distribution';

INSERT INTO deals (distributor_id, title, description, value_eur, stage, probability, product_type, expected_close_date, assigned_to)
SELECT id, 'Expansión Bretaña Vietnam', 'Ampliación catálogo Vietnam paraBretaña', 55000, 'negotiation', 60, '{vietnam}', '2026-08-01', 'Paula'
FROM distributors WHERE name = 'Breizh Distribution';

-- ============================================================
-- ACTIVIDADES (historial de seguimiento)
-- ============================================================

INSERT INTO activities (distributor_id, type, subject, description, status, priority, completed_at, created_by)
SELECT id, 'email', 'Primer contacto comercial', 'Email presentación GRENOUCERIE + catálogo productos Vietnam', 'completed', 'high', NOW() - INTERVAL '30 days', 'Hermes'
FROM distributors WHERE name = 'Gros Distribution Paris';

INSERT INTO activities (distributor_id, type, subject, description, status, priority, completed_at, created_by)
SELECT id, 'meeting', 'Reunión presencial Lyon', 'Reunión con director comercial. Interés confirmado en Premium.', 'completed', 'high', NOW() - INTERVAL '15 days', 'Paula'
FROM distributors WHERE name = 'Lyonnaise Du Poisson';

INSERT INTO activities (distributor_id, type, subject, description, status, priority, due_date, created_by)
SELECT id, 'call', 'Llamada seguimiento Bretaña', 'Llamada pendiente para cerrar condiciones comerciales', 'planned', 'high', NOW() + INTERVAL '2 days', 'Paula'
FROM distributors WHERE name = 'Breizh Distribution';

INSERT INTO activities (distributor_id, type, subject, description, status, priority, due_date, created_by)
SELECT id, 'email', 'Envío muestras trial', 'Enviar muestras de Vietnam + derivados a Marsella', 'planned', 'urgent', NOW() + INTERVAL '1 day', 'Paula'
FROM distributors WHERE name = 'Sud Food Distribution';

INSERT INTO activities (distributor_id, type, subject, description, status, priority, completed_at, created_by)
SELECT id, 'note', 'Salon Gastronomía París 2026', 'Contacto inicial en feria. Muy interesado en Premium. Enviar propuesta.', 'completed', 'medium', NOW() - INTERVAL '45 days', 'Fabi'
FROM distributors WHERE name = 'Paris Primeurs Premium';

-- ============================================================
-- ALERTAS (para demo de alertas automáticas)
-- ============================================================

INSERT INTO alerts (distributor_id, type, severity, title, description, suggested_action)
SELECT id, 'no_contact', 'critical', 'Sin contacto hace 18 días', 
    'El distribuidor Breizh Distribution (Pays de la Loire) no ha sido contactado desde hace 18 días. Deal de €55K en negociación.',
    'Llamar urgentemente para cerrar condiciones. Riesgo de perder el deal.'
FROM distributors WHERE name = 'Breizh Distribution';

INSERT INTO alerts (distributor_id, type, severity, title, description, suggested_action)
SELECT id, 'deal_at_risk', 'warning', 'Trial sin seguimiento',
    'El pedido trial de Sud Food Distribution (Marsella) lleva 5 días sin seguimiento. Muestras pendientes de envío.',
    'Enviar muestras hoy + email de seguimiento.'
FROM distributors WHERE name = 'Sud Food Distribution';

INSERT INTO alerts (distributor_id, type, severity, title, description, suggested_action)
SELECT id, 'milestone', 'info', 'Nuevo distribuidor firmado',
    'Lyonnaise Du Poisson (Lyon) ha firmado contrato. Primer pedido Premium en camino.',
    'Programar onboarding + envío de materiales de marca.'
FROM distributors WHERE name = 'Lyonnaise Du Poisson';

-- ============================================================
-- REVENUE TRACKING (actualizar con datos reales)
-- ============================================================

UPDATE revenue_tracking SET 
    revenue_eur = 75000,
    cumulative_revenue_eur = 75000,
    vietnam_revenue_eur = 45000,
    premium_revenue_eur = 30000,
    notes = 'Q1 cerrado: €75K (€5K sobre target). Vietnam €45K + Premium €30K.'
WHERE period_type = 'quarterly' AND period_start = '2026-01-01';

UPDATE revenue_tracking SET 
    revenue_eur = 0,
    cumulative_revenue_eur = 75000,
    notes = 'Q2 en curso. Distribuidor Lyonnaise firmado. Breizh en negociación.'
WHERE period_type = 'quarterly' AND period_start = '2026-04-01';

-- ============================================================
-- GOALS (actualizar progreso)
-- ============================================================

UPDATE goals SET current_value = 75000 WHERE title = 'GRENOUCERIE Francia 2026';
UPDATE goals SET current_value = 45000 WHERE title = 'Vietnam Market Share';
UPDATE goals SET current_value = 30000 WHERE title = 'Premium Market Share';
UPDATE goals SET current_value = 2 WHERE title = 'Distribuidores Activos';

-- Refrescar vistas
SELECT refresh_dashboard_views();

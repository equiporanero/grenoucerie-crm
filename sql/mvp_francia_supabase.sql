-- ═══════════════════════════════════════════════════
-- GRENOUCERIE MVP FRANCIA — SQL Supabase
-- Ejecutar en Supabase SQL Editor
-- ═══════════════════════════════════════════════════

-- Tabla 1: LEADS FR (input del Outbound Engine)
CREATE TABLE IF NOT EXISTS leads_fr (
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_name     TEXT NOT NULL,
    contact_name     TEXT,
    role             TEXT,
    email            TEXT,
    phone            TEXT,
    linkedin_url     TEXT,
    region_fr        TEXT,  -- IDF, PACA, ARA, HDF, etc.
    type             TEXT,  -- mayorista, central_compras, restaurante
    estimated_vol_kg INTEGER DEFAULT 0,
    source           TEXT,  -- sirene, linkedin, feria, referido
    score            INTEGER DEFAULT 0,
    status           TEXT DEFAULT 'nuevo',
        -- nuevo | en_secuencia | respondio | descartado | deal_creado
    sequence_name    TEXT,  -- A_mayorista | B_central
    sequence_step    INTEGER DEFAULT 0,
    last_touch_date  DATE,
    last_touch_channel TEXT, -- email | whatsapp | linkedin
    notes            TEXT DEFAULT '',
    created_at       TIMESTAMPTZ DEFAULT NOW(),
    updated_at       TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para queries frecuentes
CREATE INDEX IF NOT EXISTS idx_leads_fr_status ON leads_fr(status);
CREATE INDEX IF NOT EXISTS idx_leads_fr_score ON leads_fr(score DESC);
CREATE INDEX IF NOT EXISTS idx_leads_fr_type ON leads_fr(type);
CREATE INDEX IF NOT EXISTS idx_leads_fr_region ON leads_fr(region_fr);
CREATE INDEX IF NOT EXISTS idx_leads_fr_email ON leads_fr(email);

-- Tabla 2: DEALS FR (espejo de Twenty para queries rápidas)
CREATE TABLE IF NOT EXISTS deals_fr (
    id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    twenty_deal_id    TEXT UNIQUE,
    company_name      TEXT NOT NULL,
    contact_name      TEXT,
    email             TEXT,
    type              TEXT, -- mayorista, central_compras, restaurante
    region_fr         TEXT,
    stage             TEXT DEFAULT 'Lead identificado',
    estimated_value_eur NUMERIC DEFAULT 0,
    probability       INTEGER DEFAULT 5,
    days_in_stage     INTEGER DEFAULT 0,
    next_action       TEXT DEFAULT '',
    next_action_date  DATE,
    responsible       TEXT DEFAULT 'paula',
    sequence_step     INTEGER DEFAULT 0,
    created_at        TIMESTAMPTZ DEFAULT NOW(),
    updated_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_deals_fr_stage ON deals_fr(stage);
CREATE INDEX IF NOT EXISTS idx_deals_fr_responsible ON deals_fr(responsible);

-- Tabla 3: ALERTAS (Hermes escribe, panel lee)
CREATE TABLE IF NOT EXISTS alerts (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type        TEXT NOT NULL, -- deal_parado | sin_respuesta | score_alto | stock_bajo
    message     TEXT NOT NULL,
    deal_id     UUID REFERENCES deals_fr(id),
    lead_id     UUID REFERENCES leads_fr(id),
    resolved    BOOLEAN DEFAULT FALSE,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_alerts_resolved ON alerts(resolved);

-- Tabla 4: KPI SNAPSHOT (Hermes actualiza cada hora)
CREATE TABLE IF NOT EXISTS kpi_snapshot (
    id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pipeline_total_eur NUMERIC DEFAULT 0,
    leads_activos     INTEGER DEFAULT 0,
    deals_activos     INTEGER DEFAULT 0,
    deals_respondieron INTEGER DEFAULT 0,
    objetivo_eur      NUMERIC DEFAULT 500000,
    objetivo_dias     INTEGER DEFAULT 216,
    updated_at        TIMESTAMPTZ DEFAULT NOW()
);

-- Insertar snapshot inicial
INSERT INTO kpi_snapshot (objetivo_eur, objetivo_dias) VALUES (500000, 216);

-- ═══════════════════════════════════════════════════
-- FUNCIÓN KPI para el panel central
-- ═══════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION get_kpi_fr()
RETURNS JSON AS $$
DECLARE
    v_pipeline NUMERIC;
    v_leads_activos INTEGER;
    v_deals_activos INTEGER;
    v_deals_respondieron INTEGER;
    v_objetivo CONSTANT NUMERIC := 500000;
    v_dias_restantes INTEGER;
BEGIN
    -- Pipeline total € de deals activos
    SELECT COALESCE(SUM(estimated_value_eur), 0)
    INTO v_pipeline
    FROM deals_fr
    WHERE stage NOT IN ('Descartado', 'Cliente FR activo');

    -- Leads en secuencia activa
    SELECT COUNT(*)
    INTO v_leads_activos
    FROM leads_fr
    WHERE status = 'en_secuencia';

    -- Deals activos
    SELECT COUNT(*)
    INTO v_deals_activos
    FROM deals_fr
    WHERE stage NOT IN ('Descartado', 'Cliente FR activo');

    -- Deals que respondieron
    SELECT COUNT(*)
    INTO v_deals_respondieron
    FROM leads_fr
    WHERE status = 'respondio';

    -- Días restantes hasta 31 Dic 2026
    v_dias_restantes := GREATEST(0, (DATE '2026-12-31' - CURRENT_DATE));

    RETURN json_build_object(
        'pipeline_eur',    v_pipeline,
        'leads_activos',   v_leads_activos,
        'deals_activos',   v_deals_activos,
        'deals_respondieron', v_deals_respondieron,
        'objetivo_eur',    v_objetivo,
        'dias_restantes',  v_dias_restantes
    );
END;
$$ LANGUAGE plpgsql;

-- ═══════════════════════════════════════════════════
-- DATOS DE PRUEBA — 5 distribuidores Costa Azul
-- ═══════════════════════════════════════════════════

INSERT INTO leads_fr (company_name, contact_name, role, email, phone, region_fr, type, source, score, status) VALUES
('Ô Marché d''Asie', 'Gérant', 'Gérant', 'contact@omarchedasie.fr', '+33 4 84 88 52 16', 'PACA', 'mayorista', 'google_maps', 75, 'nuevo'),
('Terr''Asia', 'Responsable achats', 'Responsable achats', 'contact@terrasia.fr', NULL, 'PACA', 'importateur', 'sirene', 70, 'nuevo'),
('Dogal Food', 'Gérant', 'Gérant', 'contact@dogalfood.fr', NULL, 'PACA', 'grossiste_asiatique', 'sirene', 65, 'nuevo'),
('Distram', 'Directeur commercial', 'Directeur commercial', 'info@distram.com', NULL, 'PACA', 'grossiste_HORECA', 'sirene', 80, 'nuevo'),
('Asia Frères', 'Gérant', 'Gérant', 'contact@asiafreres.com', NULL, 'PACA', 'grossiste_asiatique', 'google_maps', 60, 'nuevo');

-- Verificar
-- SELECT * FROM leads_fr ORDER BY score DESC;
-- SELECT get_kpi_fr();

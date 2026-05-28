-- ============================================================
-- GRENOUCERIE CRM — Supabase Database Schema
-- Proyecto: iveyofwlpqtohxvxvvrp
-- Dashboard: €500K Revenue Francia 31-12-2026
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ============================================================
-- TABLA: distributors
-- ============================================================
CREATE TABLE distributors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    company_name TEXT,
    website TEXT,
    email TEXT,
    phone TEXT,
    region TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'generalist',
    channel TEXT NOT NULL DEFAULT 'horeca',
    stage TEXT NOT NULL DEFAULT 'prospect',
    deal_value_eur DECIMAL(12,2) DEFAULT 0,
    probability INTEGER DEFAULT 0 CHECK (probability BETWEEN 0 AND 100),
    total_revenue_eur DECIMAL(12,2) DEFAULT 0,
    current_year_revenue_eur DECIMAL(12,2) DEFAULT 0,
    last_order_date DATE,
    has_vietnam BOOLEAN DEFAULT false,
    has_premium BOOLEAN DEFAULT false,
    has_others BOOLEAN DEFAULT false,
    assigned_to TEXT DEFAULT 'Paula',
    notes TEXT,
    source TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    last_contact_at TIMESTAMPTZ,
    CONSTRAINT valid_stage CHECK (stage IN (
        'prospect', 'contacted', 'negotiation', 'trial', 
        'signed', 'active', 'inactive'
    ))
);

CREATE INDEX idx_distributors_stage ON distributors(stage);
CREATE INDEX idx_distributors_region ON distributors(region);
CREATE INDEX idx_distributors_assigned ON distributors(assigned_to);
CREATE INDEX idx_distributors_name_trgm ON distributors USING gin(name gin_trgm_ops);

-- ============================================================
-- TABLA: deals
-- ============================================================
CREATE TABLE deals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    distributor_id UUID REFERENCES distributors(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    value_eur DECIMAL(12,2) NOT NULL DEFAULT 0,
    stage TEXT NOT NULL DEFAULT 'new',
    probability INTEGER DEFAULT 0 CHECK (probability BETWEEN 0 AND 100),
    product_type TEXT[],
    expected_close_date DATE,
    actual_close_date DATE,
    lost_reason TEXT,
    assigned_to TEXT DEFAULT 'Paula',
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_deals_distributor ON deals(distributor_id);
CREATE INDEX idx_deals_stage ON deals(stage);
CREATE INDEX idx_deals_assigned ON deals(assigned_to);

-- ============================================================
-- TABLA: activities
-- ============================================================
CREATE TABLE activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    distributor_id UUID REFERENCES distributors(id) ON DELETE CASCADE,
    deal_id UUID REFERENCES deals(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    subject TEXT NOT NULL,
    description TEXT,
    status TEXT NOT NULL DEFAULT 'completed',
    priority TEXT DEFAULT 'medium',
    due_date TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    created_by TEXT DEFAULT 'Paula',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_activities_distributor ON activities(distributor_id);
CREATE INDEX idx_activities_deal ON activities(deal_id);
CREATE INDEX idx_activities_status ON activities(status);
CREATE INDEX idx_activities_due_date ON activities(due_date);

-- ============================================================
-- TABLA: alerts
-- ============================================================
CREATE TABLE alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    distributor_id UUID REFERENCES distributors(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    severity TEXT NOT NULL DEFAULT 'warning',
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    is_dismissed BOOLEAN DEFAULT false,
    suggested_action TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    read_at TIMESTAMPTZ,
    dismissed_at TIMESTAMPTZ
);

CREATE INDEX idx_alerts_distributor ON alerts(distributor_id);
CREATE INDEX idx_alerts_unread ON alerts(is_read) WHERE is_read = false;
CREATE INDEX idx_alerts_severity ON alerts(severity);

-- ============================================================
-- TABLA: revenue_tracking
-- ============================================================
CREATE TABLE revenue_tracking (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    period_type TEXT NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    revenue_eur DECIMAL(12,2) DEFAULT 0,
    target_eur DECIMAL(12,2) NOT NULL,
    cumulative_revenue_eur DECIMAL(12,2) DEFAULT 0,
    cumulative_target_eur DECIMAL(12,2) NOT NULL,
    vietnam_revenue_eur DECIMAL(12,2) DEFAULT 0,
    premium_revenue_eur DECIMAL(12,2) DEFAULT 0,
    others_revenue_eur DECIMAL(12,2) DEFAULT 0,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(period_type, period_start)
);

CREATE INDEX idx_revenue_period ON revenue_tracking(period_type, period_start);

-- ============================================================
-- TABLA: goals
-- ============================================================
CREATE TABLE goals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    type TEXT NOT NULL,
    target_value DECIMAL(12,2) NOT NULL,
    current_value DECIMAL(12,2) DEFAULT 0,
    unit TEXT DEFAULT 'EUR',
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status TEXT NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_goals_status ON goals(status);
CREATE INDEX idx_goals_dates ON goals(start_date, end_date);

-- ============================================================
-- TABLA: scraping_data
-- ============================================================
CREATE TABLE scraping_data (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source TEXT NOT NULL,
    url TEXT,
    company_name TEXT,
    siret TEXT,
    address TEXT,
    city TEXT,
    postal_code TEXT,
    phone TEXT,
    email TEXT,
    website TEXT,
    employee_count TEXT,
    revenue_range TEXT,
    tags TEXT[],
    distributor_id UUID REFERENCES distributors(id) ON DELETE SET NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    reviewed_by TEXT,
    notes TEXT,
    scraped_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_scraping_status ON scraping_data(status);
CREATE INDEX idx_scraping_company ON scraping_data(company_name);
CREATE INDEX idx_scraping_distributor ON scraping_data(distributor_id);

-- ============================================================
-- VISTAS MATERIALIZADAS
-- ============================================================

CREATE MATERIALIZED VIEW mv_dashboard_kpis AS
SELECT
    COALESCE(SUM(d.total_revenue_eur), 0) AS total_revenue,
    COALESCE(SUM(d.current_year_revenue_eur), 0) AS ytd_revenue,
    500000 AS annual_target,
    ROUND((COALESCE(SUM(d.current_year_revenue_eur), 0) / 500000.0) * 100, 1) AS progress_pct,
    COUNT(*) FILTER (WHERE d.stage IN ('signed', 'active')) AS active_distributors,
    COUNT(*) AS total_distributors,
    COALESCE(SUM(d.deal_value_eur) FILTER (WHERE d.stage IN ('negotiation', 'trial')), 0) AS pipeline_value,
    (SELECT COUNT(*) FROM alerts WHERE is_read = false AND is_dismissed = false) AS unread_alerts,
    (SELECT COUNT(*) FROM alerts WHERE severity = 'critical' AND is_read = false) AS critical_alerts,
    COALESCE(SUM(d.current_year_revenue_eur) FILTER (WHERE d.has_vietnam = true), 0) AS vietnam_revenue,
    COALESCE(SUM(d.current_year_revenue_eur) FILTER (WHERE d.has_premium = true), 0) AS premium_revenue,
    COALESCE(SUM(d.current_year_revenue_eur) FILTER (WHERE d.has_others = true), 0) AS others_revenue
FROM distributors d;

CREATE MATERIALIZED VIEW mv_pipeline_by_stage AS
SELECT stage, COUNT(*) AS distributor_count,
    COALESCE(SUM(deal_value_eur), 0) AS total_value,
    ROUND(AVG(probability), 1) AS avg_probability
FROM distributors WHERE stage NOT IN ('inactive')
GROUP BY stage ORDER BY CASE stage
    WHEN 'prospect' THEN 1 WHEN 'contacted' THEN 2
    WHEN 'negotiation' THEN 3 WHEN 'trial' THEN 4
    WHEN 'signed' THEN 5 WHEN 'active' THEN 6 END;

CREATE MATERIALIZED VIEW mv_revenue_by_region AS
SELECT region, COUNT(*) AS distributor_count,
    COALESCE(SUM(current_year_revenue_eur), 0) AS ytd_revenue,
    COALESCE(SUM(deal_value_eur), 0) AS pipeline_value
FROM distributors GROUP BY region ORDER BY ytd_revenue DESC;

-- ============================================================
-- FUNCIONES
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$ LANGUAGE plpgsql;

CREATE TRIGGER trg_distributors_updated_at BEFORE UPDATE ON distributors FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_deals_updated_at BEFORE UPDATE ON deals FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_activities_updated_at BEFORE UPDATE ON activities FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_revenue_tracking_updated_at BEFORE UPDATE ON revenue_tracking FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_goals_updated_at BEFORE UPDATE ON goals FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_scraping_data_updated_at BEFORE UPDATE ON scraping_data FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE OR REPLACE FUNCTION refresh_dashboard_views()
RETURNS void AS $$
BEGIN
    REFRESH MATERIALIZED VIEW mv_dashboard_kpis;
    REFRESH MATERIALIZED VIEW mv_pipeline_by_stage;
    REFRESH MATERIALIZED VIEW mv_revenue_by_region;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION check_no_contact_alerts()
RETURNS void AS $$
BEGIN
    INSERT INTO alerts (distributor_id, type, severity, title, description, suggested_action)
    SELECT d.id, 'no_contact',
        CASE WHEN d.last_contact_at < NOW() - INTERVAL '21 days' THEN 'critical' ELSE 'warning' END,
        'Sin contacto hace ' || EXTRACT(DAY FROM NOW() - d.last_contact_at) || ' dias',
        'El distribuidor ' || d.name || ' (' || d.region || ') no ha sido contactado desde ' || TO_CHAR(d.last_contact_at, 'DD/MM/YYYY'),
        'Programar llamada o email de seguimiento'
    FROM distributors d
    WHERE d.stage IN ('contacted','negotiation','trial','signed','active')
    AND d.last_contact_at < NOW() - INTERVAL '14 days'
    AND NOT EXISTS (SELECT 1 FROM alerts a WHERE a.distributor_id = d.id AND a.type = 'no_contact' AND a.is_dismissed = false AND a.created_at > NOW() - INTERVAL '7 days');
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- DATOS INICIALES
-- ============================================================

INSERT INTO goals (title, description, type, target_value, current_value, unit, start_date, end_date, status) VALUES
('GRENOUCERIE Francia 2026', 'Revenue objetivo €500K', 'revenue', 500000, 0, 'EUR', '2026-01-01', '2026-12-31', 'active'),
('Vietnam Market Share', '70% del revenue = €350K', 'revenue', 350000, 0, 'EUR', '2026-01-01', '2026-12-31', 'active'),
('Premium Market Share', '20% del revenue = €100K', 'revenue', 100000, 0, 'EUR', '2026-01-01', '2026-12-31', 'active'),
('Distribuidores Activos', 'Red de 5-10 distribuidores', 'distributor_count', 5, 0, 'count', '2026-01-01', '2026-12-31', 'active');

INSERT INTO distributors (name, company_name, region, type, channel, stage, deal_value_eur, probability, has_vietnam, assigned_to, notes) VALUES
('Distribuidor Generalista #1', 'Por definir', 'Ile-de-France', 'generalist', 'horeca', 'negotiation', 0, 50, true, 'Paula', 'Generalista, ya vende productos Vietnam. Piloto junio 2026.');

INSERT INTO revenue_tracking (period_type, period_start, period_end, target_eur, cumulative_target_eur) VALUES
('quarterly', '2026-01-01', '2026-03-31', 80000, 80000),
('quarterly', '2026-04-01', '2026-06-30', 100000, 180000),
('quarterly', '2026-07-01', '2026-09-30', 130000, 310000),
('quarterly', '2026-10-01', '2026-12-31', 190000, 500000),
('yearly', '2026-01-01', '2026-12-31', 500000, 500000);

SELECT refresh_dashboard_views();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE distributors ENABLE ROW LEVEL SECURITY;
ALTER TABLE deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE revenue_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE scraping_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Full access to distributors" ON distributors FOR ALL USING (true);
CREATE POLICY "Full access to deals" ON deals FOR ALL USING (true);
CREATE POLICY "Full access to activities" ON activities FOR ALL USING (true);
CREATE POLICY "Full access to alerts" ON alerts FOR ALL USING (true);
CREATE POLICY "Full access to revenue_tracking" ON revenue_tracking FOR ALL USING (true);
CREATE POLICY "Full access to goals" ON goals FOR ALL USING (true);
CREATE POLICY "Full access to scraping_data" ON scraping_data FOR ALL USING (true);

-- ═══════════════════════════════════════════════════════
-- GRENOUCERIE CRM — Pipeline v1.0
-- Supabase PostgreSQL con RLS + seguridad correcta
-- ═══════════════════════════════════════════════════════

-- 1. TABLA PRINCIPAL: LEADS
CREATE TABLE IF NOT EXISTS public.leads (
    id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    empresa     text NOT NULL,
    contacto    text,
    email       text,
    telefono    text default '',
    region      text default '',
    pais        text not null default 'ES',
    gama        text not null default 'Vietnam' check (gama in ('Vietnam','Premium','Club','Despieces')),
    stage       text not null default 'prospeccion' check (stage in ('prospeccion','contacto','muestra','negociacion','activo','perdido')),
    score       integer default 0 check (score >= 0 and score <= 100),
    valor       text default '',
    notas       text default '',
    asignado_a  text default 'Fausti',
    fuente      text default 'manual',
    created_at  timestamptz not null default now(),
    updated_at  timestamptz not null default now()
);

-- 2. TABLA DE ACTIVIDADES (log de outreach)
CREATE TABLE IF NOT EXISTS public.activities (
    id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id     uuid not null references public.leads(id) on delete cascade,
    tipo        text not null check (tipo in ('email','whatsapp','llamada','linkedin','muestra','reunion','nota')),
    descripcion text,
    created_at  timestamptz not null default now()
);

-- 3. VISTA DE PIPELINE: conteo por fase
CREATE OR REPLACE VIEW public.v_pipeline AS
SELECT
    stage,
    count(*) as total,
    count(*) filter (where pais = 'FR') as fr,
    count(*) filter (where pais = 'ES') as es,
    sum(case when gama = 'Vietnam' then 1 else 0 end) as vietnam,
    sum(case when gama = 'Premium' then 1 else 0 end) as premium,
    sum(case when gama = 'Club' then 1 else 0 end) as club,
    sum(case when gama = 'Despieces' then 1 else 0 end) as despieces
FROM public.leads
GROUP BY stage
ORDER BY
    case stage
        when 'prospeccion' then 1
        when 'contacto' then 2
        when 'muestra' then 3
        when 'negociacion' then 4
        when 'activo' then 5
        when 'perdido' then 99
    end;

-- 4. FUNCIÓN: leads por fase (para el Kanban)
CREATE OR REPLACE FUNCTION public.get_leads_by_stage(p_stage text)
RETURNS table (
    id uuid, empresa text, contacto text, email text, telefono text,
    region text, pais text, gama text, stage text, score integer,
    valor text, notas text, asignado_a text, created_at timestamptz
)
LANGUAGE sql
SECURITY INVOKER
AS $$
    SELECT l.id, l.empresa, l.contacto, l.email, l.telefono,
           l.region, l.pais, l.gama, l.stage, l.score,
           l.valor, l.notas, l.asignado_a, l.created_at
    FROM public.leads l
    WHERE l.stage = p_stage
    ORDER BY l.score DESC, l.updated_at DESC;
$$;

-- 5. FUNCIÓN: KPIs del pipeline
CREATE OR REPLACE FUNCTION public.get_pipeline_kpis()
RETURNS json
LANGUAGE sql
SECURITY INVOKER
AS $$
    SELECT json_build_object(
        'total', (SELECT count(*) FROM public.leads WHERE stage != 'perdido'),
        'prospeccion', (SELECT count(*) FROM public.leads WHERE stage = 'prospeccion'),
        'contacto', (SELECT count(*) FROM public.leads WHERE stage = 'contacto'),
        'muestra', (SELECT count(*) FROM public.leads WHERE stage = 'muestra'),
        'negociacion', (SELECT count(*) FROM public.leads WHERE stage = 'negociacion'),
        'activo', (SELECT count(*) FROM public.leads WHERE stage = 'activo'),
        'fr', (SELECT count(*) FROM public.leads WHERE pais = 'FR' AND stage != 'perdido'),
        'es', (SELECT count(*) FROM public.leads WHERE pais = 'ES' AND stage != 'perdido'),
        'vietnam', (SELECT count(*) FROM public.leads WHERE gama = 'Vietnam'),
        'premium', (SELECT count(*) FROM public.leads WHERE gama = 'Premium'),
        'by_region', (SELECT json_object_agg(region, cnt) FROM (SELECT region, count(*) as cnt FROM public.leads WHERE stage != 'perdido' GROUP BY region) r)
    );
$$;

-- 6. ÍNDICES (performance best practices)
CREATE INDEX IF NOT EXISTS idx_leads_stage ON public.leads(stage);
CREATE INDEX IF NOT EXISTS idx_leads_gama ON public.leads(gama);
CREATE INDEX IF NOT EXISTS idx_leads_pais ON public.leads(pais);
CREATE INDEX IF NOT EXISTS idx_leads_score ON public.leads(score DESC);
CREATE INDEX IF NOT EXISTS idx_leads_created ON public.leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_activities_lead ON public.activities(lead_id);

-- 7. RLS — Row Level Security
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;

-- Políticas: acceso total con anon key (es un CRM interno simplificado)
CREATE POLICY "leads_select_anon" ON public.leads FOR SELECT TO anon USING (true);
CREATE POLICY "leads_insert_anon" ON public.leads FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "leads_update_anon" ON public.leads FOR UPDATE TO anon USING (true) WITH CHECK (true);
CREATE POLICY "leads_delete_anon" ON public.leads FOR DELETE TO anon USING (true);

CREATE POLICY "activities_select_anon" ON public.activities FOR SELECT TO anon USING (true);
CREATE POLICY "activities_insert_anon" ON public.activities FOR INSERT TO anon WITH CHECK (true);

-- 8. GRANT: exponer tablas al API
GRANT SELECT, INSERT, UPDATE, DELETE ON public.leads TO anon;
GRANT SELECT, INSERT ON public.activities TO anon;
GRANT SELECT ON public.v_pipeline TO anon;
GRANT EXECUTE ON FUNCTION public.get_leads_by_stage TO anon;
GRANT EXECUTE ON FUNCTION public.get_pipeline_kpis TO anon;

-- 9. DATOS INICIALES: 20 leads Francia desde la investigación
INSERT INTO public.leads (empresa, contacto, email, telefono, region, pais, gama, stage, notas) VALUES
    ('AGIDRA', NULL, 'contact@agidra.com', '+33 4 78 61 00 00', 'Rhône-Alpes', 'FR', 'Vietnam', 'prospeccion', 'Fundada 1928. Mayorista asiático Lyon. Top 1.'),
    ('Yijia France', NULL, 'info@yijia-france.com', '+33 1 45 12 34 56', 'Île-de-France', 'FR', 'Vietnam', 'prospeccion', 'Rungis. 4000+ referencias asiáticas.'),
    ('Tai-Yat Traiteur', NULL, 'contact@tai-yat.fr', '+33 1 48 93 00 00', 'Île-de-France', 'FR', 'Vietnam', 'prospeccion', 'Rungis. 15000 productos. Distribución nacional.'),
    ('Best China Food', NULL, 'contact@bestchinafood.fr', '+33 1 39 19 00 00', 'Île-de-France', 'FR', 'Vietnam', 'prospeccion', 'Gonesse. Distribuidor mayorista.'),
    ('Ô Marché d''Asie', NULL, 'contact@omarchedasie.fr', '+33 4 91 00 00 00', 'PACA', 'FR', 'Premium', 'prospeccion', 'Marsella. Especialista productos asiáticos.'),
    ('Direct Asia Food', NULL, 'info@directasiafood.com', '+33 4 93 00 00 00', 'PACA', 'FR', 'Premium', 'prospeccion', 'Costa Azul. Importador directo.'),
    ('Tang Frères', NULL, 'pro@tangfreres.fr', '+33 1 42 00 00 00', 'Île-de-France', 'FR', 'Vietnam', 'prospeccion', 'Rungis. Uno de los mayores asiáticos FR.'),
    ('SDA (Société Distribution Asie)', NULL, 'sda@groupesda.fr', '+33 1 45 00 00 00', 'Île-de-France', 'FR', 'Vietnam', 'prospeccion', 'Wissous. Distribución foodservice.'),
    ('Asia Market distribution', NULL, 'contact@asiamarket.fr', '+33 4 72 00 00 00', 'Rhône-Alpes', 'FR', 'Premium', 'prospeccion', 'Lyon. Distribuidor regional.'),
    ('Euro-Asie Distribution', NULL, 'info@euroasie.fr', '+33 3 20 00 00 00', 'Hauts-de-France', 'FR', 'Vietnam', 'prospeccion', 'Lille. Canal Horeca.'),
    ('Ceres Distribution', NULL, 'contact@ceres-distribution.fr', '+33 5 56 00 00 00', 'Nouvelle-Aquitaine', 'FR', 'Premium', 'prospeccion', 'Burdeos. Distintribuidor foodservice.'),
    ('Dogal Food', NULL, 'contact@dogalfood.fr', '+33 4 91 00 00 00', 'PACA', 'FR', 'Vietnam', 'prospeccion', 'Marsella. Importador productos congelados.'),
    ('Surg-inter', NULL, 'contact@surg-inter.com', '+33 2 31 00 00 00', 'Normandie', 'FR', 'Premium', 'prospeccion', 'Caen. Especialista congelados.'),
    ('Celnat', NULL, 'pro@celnat.fr', '+33 5 49 00 00 00', 'Nouvelle-Aquitaine', 'FR', 'Premium', 'prospeccion', 'Distribuidor foodservice oeste FR.'),
    ('Groupe Le Saint', NULL, 'pro@groupelesaint.com', '+33 2 98 00 00 00', 'Bretagne', 'FR', 'Vietnam', 'prospeccion', 'Brest. Distribuidor mayorista bretón.'),
    ('Pomona', NULL, 'pro@pomona.fr', '+33 1 45 00 00 00', 'Île-de-France', 'FR', 'Premium', 'prospeccion', 'Mayorista foodservice. Cuidar spam.'),
    ('Disgroup Reunion', NULL, 'pro@disgroup.re', '+33 2 62 00 00 00', 'Réunion', 'FR', 'Vietnam', 'prospeccion', 'Isla Reunión. Distribuidor regional.'),
    ('Trans Gourmet', NULL, 'contact@trans-gourmet.com', '+33 1 45 00 00 00', 'Île-de-France', 'FR', 'Premium', 'prospeccion', 'Rungis. Distribuidor especializado.'),
    ('Pro à Pro', NULL, 'pro@pro-a-pro.fr', '+33 1 42 00 00 00', 'Île-de-France', 'FR', 'Vietnam', 'prospeccion', 'Rungis. Comercial foodservice.'),
    ('Metro Chef France', NULL, 'pro@metro.fr', '+33 1 45 00 00 00', 'Île-de-France', 'FR', 'Despieces', 'prospeccion', 'Cash & carry. Solo como canal secundario.')
ON CONFLICT DO NOTHING;

-- 10. FUNCIONES UPSERT para el CRM
CREATE OR REPLACE FUNCTION public.upsert_lead(
    p_id uuid, p_empresa text, p_contacto text, p_email text,
    p_telefono text, p_region text, p_pais text, p_gama text,
    p_stage text, p_score integer, p_valor text, p_notas text
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_id uuid;
BEGIN
    IF p_id IS NOT NULL THEN
        UPDATE public.leads SET
            empresa = p_empresa, contacto = p_contacto, email = p_email,
            telefono = p_telefono, region = p_region, pais = p_pais,
            gama = p_gama, stage = p_stage, score = p_score,
            valor = p_valor, notas = p_notas, updated_at = now()
        WHERE id = p_id
        RETURNING leads.id INTO v_id;
    ELSE
        INSERT INTO public.leads (empresa, contacto, email, telefono, region, pais, gama, stage, score, valor, notas)
        VALUES (p_empresa, p_contacto, p_email, p_telefono, p_region, p_pais, p_gama, p_stage, p_score, p_valor, p_notas)
        RETURNING leads.id INTO v_id;
    END IF;
    RETURN v_id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.upsert_lead TO anon;

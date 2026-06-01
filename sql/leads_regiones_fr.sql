-- ═══════════════════════════════════════════════════
-- GRENOUCERIE CRM FRANCIA — Base de datos regional
-- Ejecutar en Supabase SQL Editor
-- ═══════════════════════════════════════════════════

-- Tabla principal: LEADS POR REGIÓN
CREATE TABLE IF NOT EXISTS leads_fr (
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_name     TEXT NOT NULL,
    contact_name     TEXT,
    email            TEXT,
    phone            TEXT,
    website          TEXT,
    region_fr        TEXT NOT NULL,  -- norma, aquit, lorran, rha, idf, ctr, auvergne, paca, occit, bretagne, hdf, cors
    region_name      TEXT,           -- nombre legible
    type             TEXT,           -- mayorista, importateur, grossiste_asiatique, central_compras
    contact_method   TEXT,           -- email, formulario_web, whatsapp, telefono, visita
    priority         TEXT DEFAULT 'B', -- A, B, C
    estimated_vol_kg INTEGER DEFAULT 0,
    source           TEXT,
    score            INTEGER DEFAULT 0,
    status           TEXT DEFAULT 'nuevo',
    sequence_step    INTEGER DEFAULT 0,
    last_touch_date  DATE,
    notes            TEXT DEFAULT '',
    created_at       TIMESTAMPTZ DEFAULT NOW(),
    updated_at       TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_leads_fr_region ON leads_fr(region_fr);
CREATE INDEX IF NOT EXISTS idx_leads_fr_status ON leads_fr(status);
CREATE INDEX IF NOT EXISTS idx_leads_fr_contact_method ON leads_fr(contact_method);

-- Tabla de tracking de secuencia
CREATE TABLE IF NOT EXISTS sequence_tracking (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id         UUID REFERENCES leads_fr(id),
    touch_number    INTEGER,  -- 1, 2, 3
    touch_date      DATE,
    channel         TEXT,     -- email, whatsapp, llamada
    sent            BOOLEAN DEFAULT FALSE,
    opened          BOOLEAN DEFAULT FALSE,
    responded       BOOLEAN DEFAULT FALSE,
    response_text   TEXT,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de envíos diarios (Hermes registra aquí cada envío)
CREATE TABLE IF NOT EXISTS daily_sends (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    send_date       DATE DEFAULT CURRENT_DATE,
    region_fr       TEXT,
    total_sent      INTEGER DEFAULT 0,
    total_emails    INTEGER DEFAULT 0,
    total_forms     INTEGER DEFAULT 0,
    total_whatsapp  INTEGER DEFAULT 0,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Vista: leads pendientes por región
CREATE OR REPLACE VIEW v_leads_pending AS
SELECT
    region_fr,
    region_name,
    contact_method,
    COUNT(*) FILTER (WHERE status = 'nuevo') as pendientes,
    COUNT(*) FILTER (WHERE status = 'en_secuencia') as en_secuencia,
    COUNT(*) FILTER (WHERE status = 'respondio') as respondieron,
    COUNT(*) as total
FROM leads_fr
GROUP BY region_fr, region_name, contact_method
ORDER BY COUNT(*) FILTER (WHERE status = 'nuevo') DESC;

-- Vista: resumen diario de envíos
CREATE OR REPLACE VIEW v_daily_summary AS
SELECT
    send_date,
    SUM(total_sent) as envios_totales,
    SUM(total_emails) as emails,
    SUM(total_forms) as formularios,
    SUM(total_whatsapp) as whatsapps
FROM daily_sends
GROUP BY send_date
ORDER BY send_date DESC;

-- ═══════════════════════════════════════════════════
-- DATOS INICIALES — 5 regiones (20 candidatos)
-- ═══════════════════════════════════════════════════

-- REGIÓN: NORMANDIE (norma)
INSERT INTO leads_fr (company_name, email, phone, website, region_fr, region_name, type, contact_method, priority, notes) VALUES
('Exotic Market Normandie', '', '+33', 'https://www.exoticmarket.net/grossiste-produits-exotiques', 'norma', 'Normandie', 'grossiste_asiatique', 'formulario_web', 'A', 'Primer grossiste de productos asiaticos en Normandie. +10 anos. Entrega en toda Francia.'),
('SAS F&A Commerce International', '', '+33', 'https://www.europages.fr/entreprises/france/hauts-de-seine/fabricant-producteur/grossiste-asiatique.html', 'norma', 'Normandie', 'importador', 'telefono', 'B', 'Importador basado en Normandie. Verificar actividad actual.'),
('Euro-Asie Distribution Rouen', '', '+33', '', 'norma', 'Normandie', 'distribuidor', 'visita', 'B', 'Distribuidor asiatico en Rouen. Negocio familiar desde 2010.');

-- REGIÓN: AQUITAINE (aquit)
INSERT INTO leads_fr (company_name, email, phone, website, region_fr, region_name, type, contact_method, priority, notes) VALUES
('Sakura Diffusion Bordeaux', '', '+33', '', 'aquit', 'Aquitaine', 'grossiste_asiatique', 'formulario_web', 'A', 'Distribuidor asiatico en Bordeaux. Suministra a restaurantes y epicerias.'),
('Mimport Bordeaux', '', '+33', 'https://www.mimport.fr/', 'aquit', 'Aquitaine', 'importador', 'email', 'B', 'Importador generalista con gama asiatica. Verificar si tiene cuisses de grenouille.'),
('Asia Food Distribution Sud-Ouest', '', '+33', '', 'aquit', 'Aquitaine', 'distribuidor', 'telefono', 'B', 'Distribuidor regional. Entrega en Aquitaine y Midi-Pyrenees.');

-- REGIÓN: LORRAINE (lorran)
INSERT INTO leads_fr (company_name, email, phone, website, region_fr, region_name, type, contact_method, priority, notes) VALUES
('Asie Gourmet Metz', '', '+33', '', 'lorran', 'Lorraine', 'grossiste_asiatique', 'formulario_web', 'A', 'Grossiste especializado en alimentacion asiatico. Metz/Nancy.'),
('Import-Export Thann', '', '+33', 'https://www.europages.fr/entreprises/france/importateur-de-produits-alimentaires.html', 'lorran', 'Lorraine', 'importador', 'telefono', 'B', 'Importador en Alsacia/Lorraine. Pequena empresa, flexible.'),
('Oriental Food Nancy', '', '+33', '', 'lorran', 'Lorraine', 'distribuidor', 'visita', 'B', 'Distribuidor en Nancy. Principalmente restauracion HORECA.');

-- REGIÓN: RHÔNE-ALPES (rha)
INSERT INTO leads_fr (company_name, email, phone, website, region_fr, region_name, type, contact_method, priority, notes) VALUES
('AGIDRA (Lyon Vénissieux)', '', '+33', 'https://www.agidra.com/', 'rha', 'Rhône-Alpes', 'grossiste_asiatique', 'formulario_web', 'A', '⭐ GROSSISTE EPICERIE CHINOISE desde 1928. Restaurantes chinos, japoneses, indios. Lyon. MUY INTERESANTE para canal chino.'),
('Terr''Asia (Groupe Duval)', '', '+33', 'https://terrasia.fr/', 'rha', 'Rhône-Alpes', 'importador', 'formulario_web', 'A', 'PME 30 personas. IFS certified. Sourcing directo Asia. Marcas propias Ampawa, JB, Noodle Master.'),
('DCA DISTRIBUTION (Lyon)', '', '+33', '', 'rha', 'Rhône-Alpes', 'grossiste_oriental', 'telefono', 'B', 'Import y distribucion productos orientales y mediterraneos. 650+ refs.'),
('Candy Market France', '', '+33', 'https://candymarket.fr/', 'rha', 'Rhône-Alpes', 'grossiste_asiatique', 'formulario_web', 'A', 'Grossiste productos americanos y japoneses. Lyon. Envio toda Francia.'),
('Interpole (Grenoble)', '', '+33', 'https://www.interpole34.com/', 'rha', 'Rhône-Alpes', 'grossiste_tendencias', 'formulario_web', 'B', 'Productos espanoles, asiaticos, americanos. Tendencias. Grenoble.');

-- REGIÓN: ÎLE-DE-FRANCE (idf)
INSERT INTO leads_fr (company_name, email, phone, website, region_fr, region_name, type, contact_method, priority, notes) VALUES
('Yijia France (Rungis)', '', '+33', 'https://yijia.fr/', 'idf', 'Île-de-France', 'importador', 'formulario_web', 'A', '⭐ Importador 4000+ refs. Japon + China + Asia. 5 paises Europa. Tri-temperatura. MUY INTERESANTE.'),
('Tang Frères (Paris)', '', '+33 1 45 70 80 00', 'https://www.tang-freres.fr/', 'idf', 'Île-de-France', 'mayorista', 'formulario_web', 'B', 'Lider historico. 50 anos. 11,000 refs. 26,000 m2 almacen. 22 camiones. Muy grande pero red impresionante.'),
('LX France (Paris)', '', '+33 1 58 73 43 33', 'https://www.lxfrance.fr/', 'idf', 'Île-de-France', 'importador_HORECA', 'telefono', 'A', 'Importador HORECA. Productos japoneses, coreanos y vietnamitas. Tel directo.'),
('KEKO 2 International (La Courneuve)', '', '+33', '', 'idf', 'Île-de-France', 'grossiste_asiatique', 'formulario_web', 'A', 'Grossiste B2B productos secos y congelados asiaticos. La Courneuve. Paris.'),
('YidaMarket (Vitry-sur-Seine)', '', '+33', 'https://yidamarket.fr/', 'idf', 'Île-de-France', 'grossiste_asiatique', 'formulario_web', 'A', '+20 anos experiencia. Fabricacion francesa + importacion. Vitry-sur-Seine.');

-- ═══════════════════════════════════════════════════
-- TABLAS DE CONTROL DE AGENTES — GRENOUCERIE FR
-- Ejecutar en Supabase SQL Editor
-- ═══════════════════════════════════════════════════

-- Tabla principal de agentes
CREATE TABLE IF NOT EXISTS fr_agentes (
    id int PRIMARY KEY,
    nombre text NOT NULL,
    ola int NOT NULL CHECK (ola IN (1, 2, 3, 4)),
    rol text NOT NULL,
    estado text NOT NULL DEFAULT 'BLOQUEADO'
        CHECK (estado IN ('BLOQUEADO','EN_ESPERA','TRABAJANDO','COMPLETADO','HANDOFF_PENDIENTE')),
    entregable text NOT NULL,
    precondiciones int[] DEFAULT '{}',
    progreso int DEFAULT 0 CHECK (progreso >= 0 AND progreso <= 100),
    notas text DEFAULT '',
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Tabla de handoffs humanos (acciones que solo hace Fabi)
CREATE TABLE IF NOT EXISTS fr_handoffs (
    id int PRIMARY KEY,
    agente_id int REFERENCES fr_agentes(id),
    accion text NOT NULL,
    desbloquea_agentes int[] DEFAULT '{}',
    completado boolean DEFAULT false,
    completado_at timestamptz,
    notas text DEFAULT ''
);

-- Vista de agentes con su estado de dependencias
CREATE OR REPLACE VIEW v_agentes_status AS
SELECT
    a.id,
    a.nombre,
    a.ola,
    a.rol,
    a.estado,
    a.entregable,
    a.precondiciones,
    a.progreso,
    a.notas,
    -- ¿Tiene handoff pendiente?
    EXISTS (
        SELECT 1 FROM fr_handoffs h
        WHERE h.agente_id = a.id AND h.completado = false
    ) AS tiene_handoff_pendiente,
    -- ¿Cuántas precondiciones faltan por cumplir?
    (
        SELECT COUNT(*) FROM unnest(a.precondiciones) AS dep_id
        WHERE dep_id NOT IN (
            SELECT id FROM fr_agentes WHERE estado = 'COMPLETADO'
        )
    ) AS precondiciones_pendientes,
    array_agg(DISTINCT h.accion) FILTER (WHERE h.completado = false) AS handoffs_pendientes
FROM fr_agentes a
LEFT JOIN fr_handoffs h ON h.agente_id = a.id AND h.completado = false
GROUP BY a.id, a.nombre, a.ola, a.rol, a.estado, a.entregable, a.precondiciones, a.progreso, a.notas
ORDER BY a.ola, a.id;

-- ═══════════════════════════════════════════════════
-- DATOS INICIALES — 8 agentes
-- ═══════════════════════════════════════════════════

INSERT INTO fr_agentes (id, nombre, ola, rol, estado, entregable, precondiciones, progreso) VALUES
-- OLA 1 (lanzar ya)
(1, 'Briefing gestoría FR', 1, 'Especialista regulación alimentaria UE', 'TRABAJANDO',
 'Email encargo + lista preguntas regulatorias + docs a adjuntar', '{}', 0),

(2, 'Briefing logística frío', 1, 'Analista cadena de frío ES→FR', 'EN_ESPERA',
 'RFQ transporte + tabla comparativa ofertas', '{}', 0),

(5, 'Esqueleto datos Supabase', 1, 'Ingeniero de datos', 'EN_ESPERA',
 'SQL tablas leads/touches + función scoring + queries KPI', '{}', 0),

-- OLA 2 (esperan Ola 1)
(3, 'Etiquetado + auditoría claims', 2, 'Redactor regulatorio', 'BLOQUEADO',
 'Especificación etiqueta FR + whitelist/blacklist claims', '{1}', 0),

(6, 'Investigación leads FR', 2, 'Analista prospección B2B', 'BLOQUEADO',
 'Lista 30-50 leads FR + top 10 priorizados', '{2}', 0),

-- OLA 3 (esperan claims validadas)
(4, 'Dossier comercial + plantillas', 3, 'Copywriter B2B FR nativo', 'BLOQUEADO',
 'Dossier PDF + 5 plantillas outreach + handoff WhatsApp Paula + objeciones', '{3}', 0),

(7, 'Contenido web FR', 3, 'Estratega contenido SEO FR', 'BLOQUEADO',
 'Arquitectura web + copy secciones + formulario captación + keywords', '{3}', 0),

-- OLA 4 (orquestación)
(8, 'Orquestador cadencia', 4, 'COO digital', 'BLOQUEADO',
 'Control semanal + detección bloqueos + reporte lunes', '{1,2,3,4,5,6,7}', 0);

-- ═══════════════════════════════════════════════════
-- HANDOFFS HUMANOS
-- ═══════════════════════════════════════════════════

INSERT INTO fr_handoffs (id, agente_id, accion, desbloquea_agentes) VALUES
(1, 1, 'Enviar briefing a gestoría FR + recibir dictamen', '{3,4,7}'),
(2, 2, 'Negociar y firmar SLA de frío ES→FR (transportista)', '{6}'),
(5, 5, 'Ejecutar SQL en Supabase + cargar 10 leads de prueba', '{}'),
(3, 3, 'Aprobar whitelist de claims con validación gestoría', '{4,7}'),
(4, 4, 'Revisión FR nativo por colaborador francófono', '{}'); -- desbloqueo al uso de plantillas

-- ═══════════════════════════════════════════════════
-- QUERIES KPI
-- ═══════════════════════════════════════════════════

-- Estado general por ola
-- SELECT ola, estado, count(*) FROM fr_agentes GROUP BY ola, estado ORDER BY ola;

-- Agentes bloqueados que necesitan handoff de Fabi
-- SELECT a.id, a.nombre, a.ola, h.accion FROM fr_agentes a
-- JOIN fr_handoffs h ON h.agente_id = a.id AND h.completado = false;

-- % progreso total por ola
-- SELECT ola, round(avg(progreso),1) as progreso_medio, count(*) as total
-- FROM fr_agentes GROUP BY ola ORDER BY ola;

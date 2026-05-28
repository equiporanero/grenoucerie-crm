# 🐸 GRENOUCERIE CRM — Plan de 3 Pruebas Demo
## Para presentación con Fausti y Ana

**Objetivo:** Demostrar que el CRM funciona correctamente y gestiona todo el pipeline de expansión Francia 2026.

---

## Prueba 1: Dashboard de KPIs y Pipeline (10 min)

### Qué mostrar:
1. Abrir el CRM → Dashboard principal
2. **Supergoal €500K** — barra de progreso 15% (€75K logrados)
3. **Pipeline valorado**: €410K en deals activos
4. **Distribuidores**: 8 en pipeline (2 firmados, 2 negociación, 2 trial, 2 prospect)
5. **Vista por región**: mapa de Francia con distribuidores por zona
6. **Vista por producto**: Vietnam 60%, Premium 40%
7. **Gráfico de revenue trimestral**: Q1 €75K ✓, Q2 en curso

### Datos esperados:
- KPIs actualizados en tiempo real (vistas materializadas)
- Pipeline stages: Prospect (2) → Contacted (1) → Trial (1) → Negotiation (2) → Signed (2)
- Revenue por quarter: Q1 €75K, Q2 €0 (en curso), Q3 €0, Q4 €0

### Verificación:
- [ ] Dashboard carga sin errores
- [ ] KPIs muestran valores correctos
- [ ] Pipeline ordenado por deal_value DESC
- [ ] Barra de progreso supergoal visible

---

## Prueba 2: Gestión de Distribuidores y Actividades (10 min)

### Qué mostrar:
1. Lista de distribuidores con filtros
2. **Detalle de un distribuidor** (ej: Gros Distribution Paris)
   - Info de contacto, región, canal, tipo
   - Stage: Negotiation, Deal: €85K, Probabilidad: 50%
   - Productos: Vietnam ✓
   - Notas: "Generalista Île-de-France. Ya vende Vietnam."
3. **Timeline de actividades**:
   - ✉️ Email primer contacto (hace 30 días)
   - 📞 Llamada seguimiento (pendiente, hoy)
   - 📝 Nota de reunión
4. **Alertas activas**:
   - 🚨 Breizh Distribution: Sin contacto 18 días (CRITICAL)
   - ⚠️ Sud Food: Trial sin seguimiento (WARNING)
   - ℹ️ Lyonnaise: Nuevo distribuidor firmado (INFO)
5. Crear una nueva actividad (demo interactiva)

### Verificación:
- [ ] Filtros por región, tipo, canal funcionan
- [ ] Timeline ordenado cronológicamente
- [ ] Alertas con colores por severidad
- [ ] Se puede crear nueva actividad

---

## Prueba 3: Gestión de Deals y Forecasting (10 min)

### Qué mostrar:
1. **Vista Pipeline de Deals** (Kanban o tabla)
2. **Deal #1**: "Pedido Vietnam Q3 2026" — €85K, Proposal, 50%
3. **Deal #2**: "Contrato Premium 2026-2027" — €95K, Won, 100%
4. **Deal #3**: "Trial Vietnam + Derivados" — €25K, Qualified, 70%
5. **Deal #4**: "Expansión Bretaña Vietnam" — €55K, Negotiation, 60%
6. **Forecasting**: Revenue proyectado por quarter
7. **Conversión**: Tasa de conversión por stage
8. **Actualizar un deal** (mover de Proposal → Negotiation)

### Verificación:
- [ ] Pipeline muestra todos los deals con valores correctos
- [ ] Deal Won aparece con check verde
- [ ] Forecast suma correctamente
- [ ] Se puede mover un deal entre stages
- [ ] Cambios se reflejan en tiempo real

---

## ⚙️ Pre-requisitos para la demo

### Base de datos:
- [ ] Schema SQL ejecutado en Supabase ✓
- [ ] Demo data SQL ejecutado en Supabase
- [ ] Vistas materializadas refrescadas
- [ ] Datos de revenue_tracking actualizados

### Aplicación:
- [ ] Frontend deployado en Vercel
- [ ] Conexión con Supabase configurada
- [ ] Tema GRENOUCERIE activo (dark mode)
- [ ] Logo y branding visibles

### Cuentas demo:
- [ ] **Paula** — responsable terreno (filtra sus distribuidores)
- [ ] **Fabi** — estratega (vista global)
- [ ] **Hermes** — automatización (alertas, actividades)

---

## 📊 Resumen para Fausti y Ana

| Métrica | Valor | Estado |
|---------|-------|--------|
| Supergoal 2026 | €500K | 🎯 15% logrado |
| Revenue hasta fecha | €75K | ✅ €5K sobre Q1 target |
| Distribuidores pipeline | 8 | 🟢 |
| Distribuidores activos | 2 | 🟡 Objetivo: 5-10 |
| Deals activos | 4 | 🟢 €410K potencial |
| Deals cerrados | 1 | 🟢 €95K Premium |
| Alertas críticas | 2 | 🔴 Acción requerida |
| Actividades pendientes | 2 | 🟡 |

---

*Documento preparado por Hermes — 28 mayo 2026*

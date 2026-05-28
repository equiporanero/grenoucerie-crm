# GRENOUCERIE CRM — Design System
## Estrategia Maestra de Diseño UX/UI para Dashboard de Alto Impacto

---

## 1. IDENTIDAD DEL PRODUCTO

**Producto:** GRENOUCERIE France CRM Dashboard
**Supergoal:** €500K Revenue Francia para 31-12-2026
**Dominio:** Comercio internacional de ancas de rana (food distribution B2B)
**Usuarios:** Fabi (Strategy), Paula (Field Sales), Hermes (Automation)

### Sensación deseada:
**"Terminal de misión espacial para comida francesa exótica"**
- Preciso como un instrumento científico
- Oscuro como un cockpit
- Sin ruido, sin decoración
- Cada píxel comunica estado

### Palabras del dominio:
- Pipeline, territorio, cuota, conversión, ronda de inversión
- Distribuidor, canal, cobertura, penetración
- Ancas, Vietnam, Premium, Esculenta
- Francia, región, zona, mercado

---

## 2. PALETA DE COLORES

### Primitivas (Token Architecture)

```css
/* === SURFACE ELEVATION (Dark Mode por defecto) === */
--surface-0: #0a0a0f;    /* Base canvas — negro profundo */
--surface-1: #111118;    /* Cards base */
--surface-2: #1a1a24;    /* Cards elevadas, dropdowns */
--surface-3: #22222f;    /* Modals, popovers */
--surface-4: #2a2a38;    /* Tooltips, highest elevation */

/* === FOREGROUND (Text hierarchy) — 4 niveles === */
--ink-primary: #f0f0f5;    /* Headlines, KPIs principales */
--ink-secondary: #a0a0b0;  /* Labels, supporting text */
--ink-tertiary: #606070;   /* Metadata, timestamps */
--ink-muted: #404050;      /* Disabled, placeholders */

/* === BORDERS (Progression scale) === */
--border-subtle: rgba(255,255,255,0.06);   /* Separación estándar */
--border-soft: rgba(255,255,255,0.03);     /* Separación suave */
--border-emphasis: rgba(255,255,255,0.12);  /* Énfasis */
--border-focus: rgba(120,180,255,0.4);      /* Focus rings */

/* === SEMÁNTICO (Color = significado) === */
--accent: #6366f1;          /* Indigo — Acción primaria, links */
--accent-hover: #818cf8;    /* Indigo hover */
--success: #22c55e;         /* Verde — Meta cumplida, on track */
--warning: #f59e0b;         /* Ámbar — Atención, cerca de límite */
--danger: #ef4444;          /* Rojo — Alerta crítica, acción inmediata */
--info: #3b82f6;            /* Azul — Información, contexto */

/* === DATA VISUALIZATION === */
--data-vietnam: #22c55e;    /* Verde — Vietnam (70% revenue) */
--data-premium: #a855f7;    /* Púrpura — Premium (20% revenue) */
--data-others: #64748b;     /* Gris — Otros (10% revenue) */
--data-trend-up: #22c55e;
--data-trend-down: #ef4444;
--data-trend-flat: #64748b;

/* === BRAND GRENOUCERIE === */
--frog-primary: #4ade80;    /* Verde rana característico */
--frog-glow: rgba(74,222,128,0.15);
```

### Prohibiciones estrictas:
- ❌ Degradados (distorsionan proporciones)
- ❌ Efectos 3D (ruido innecesario)
- ❌ Más de 1 color de acento
- ❌ Rojo decorativo (solo alertas)
- ❌ Pure white (#fff) — usar --ink-primary
- ❌ Hues diferentes para superficies — mismo hue, variar lightness

---

## 3. TIPOGRAFÍA

### Typeface principal: **Inter** (Google Fonts)
Razón: Diseñada para pantallas, excelente legibilidad en tamaños pequeños, tabular numbers para datos alineados.

### Typeface datos: **JetBrains Mono**
Razón: Monoespaciada para números financieros, alineación perfecta en tablas.

### Escala tipográfica:

```css
/* === HEADLINES === */
--text-display: 48px/52px  font-weight: 700  letter-spacing: -0.02em;  /* Hero KPIs */
--text-h1: 32px/36px        font-weight: 700  letter-spacing: -0.01em;  /* Page titles */
--text-h2: 24px/28px        font-weight: 600  letter-spacing: -0.01em;  /* Section titles */
--text-h3: 18px/24px        font-weight: 600;                            /* Card titles */

/* === BODY === */
--text-body: 14px/20px      font-weight: 400;                            /* Default text */
--text-body-sm: 12px/16px   font-weight: 400;                            /* Supporting */

/* === LABELS === */
--text-label: 11px/14px     font-weight: 500  letter-spacing: 0.02em;   /* Uppercase labels */
--text-caption: 10px/14px   font-weight: 500  text-transform: uppercase; /* Timestamps */

/* === DATA (JetBrains Mono) === */
--text-mono-xl: 36px/40px   font-weight: 500;                            /* Revenue hero */
--text-mono-lg: 24px/28px   font-weight: 500;                            /* Card metrics */
--text-mono-md: 16px/20px   font-weight: 500;                            /* Table numbers */
--text-mono-sm: 12px/16px   font-weight: 400;                            /* Small data */
```

### Reglas:
- Tamaño mínimo: 11px (labels), 12px (body)
- Nunca usar solo tamaño para jerarquía — combinar size + weight + letter-spacing
- Números financieros SIEMPRE en mono con tabular-nums

---

## 4. SPACING & LAYOUT

### Base unit: 4px

```css
--space-1: 4px;    /* Micro — icon gaps */
--space-2: 8px;    /* Tight — within components */
--space-3: 12px;   /* Compact — related elements */
--space-4: 16px;   /* Default — card padding */
--space-5: 20px;   /* Comfortable */
--space-6: 24px;   /* Section spacing */
--space-8: 32px;   /* Major separation */
--space-10: 40px;  /* Page sections */
--space-12: 48px;  /* Top-level separation */
```

### Grid:
- Dashboard: **12 column grid**, gutter 24px
- Sidebar: **280px fijo** (mismo background que canvas, separado por border)
- Content max-width: **1440px**
- Cards: padding interno 24px, gap entre cards 16px

### Border Radius:
```css
--radius-sm: 4px;    /* Inputs, buttons */
--radius-md: 8px;    /* Cards */
--radius-lg: 12px;   /* Modals */
--radius-full: 999px; /* Avatars, badges */
```

### Reglas:
- Padding SIEMPRE simétrico (mismo valor en todos los lados)
- No mezclar border-radius aleatoriamente
- Sidebar mismo background que canvas — separación por border, no por color

---

## 5. DEPTH & ELEVATION

### Estrategia: **Surface color shifts** (sin shadows en dark mode)

```css
/* Elevation levels */
--elevation-0: var(--surface-0);   /* Canvas base */
--elevation-1: var(--surface-1);   /* Cards */
--elevation-2: var(--surface-2);   /* Dropdowns, elevated cards */
--elevation-3: var(--surface-3);   /* Modals */
--elevation-4: var(--surface-4);   /* Tooltips */

/* Cada salto: ~3-4% lightness — whisper quiet */
```

### Reglas:
- NO usar box-shadow en dark mode (invisible sobre fondos oscuros)
- Jerarquía por color de superficie, no por sombras
- Inputs: ligeramente más oscuro que su entorno (señal "inset")
- Dropdowns: 1 nivel arriba de su parent

---

## 6. COMPONENTES BASE

### 6.1 Metric Card (KPI Hero)

```
┌──────────────────────────────────┐
│  € REVENUE FRANCIA               │  ← label: --text-label, --ink-tertiary
│  €342,500                        │  ← value: --text-mono-xl, --ink-primary
│  ████████████░░░░░ 68%           │  ← progress bar
│  €157,500 restantes · Q3: €100K │  ← context: --text-body-sm, --ink-secondary
└──────────────────────────────────┘
```

**Props:**
- `label`: string
- `value`: number (formatted)
- `target`: number (optional)
- `trend`: 'up' | 'down' | 'flat'
- `status`: 'success' | 'warning' | 'danger' | 'neutral'

### 6.2 Distributor Card

```
┌──────────────────────────────────┐
│  🏢 Distributeur A               │  ← --text-h3
│  Île-de-France · Generalista    │  ← --text-body-sm, --ink-tertiary
│  ─────────────────────────────── │
│  Revenue: €85,000                │  ← --text-mono-lg
│  Deals: 3 activos · 1 pendiente │  ← --text-body-sm
│  Último contacto: hace 3 días    │  ← --text-caption
│  [🟢 On Track]                   │  ← status badge
└──────────────────────────────────┘
```

### 6.3 Alert Banner

```
┌──────────────────────────────────────────────────┐
│  ⚠️  Distributeur D — Sin contacto 14 días      │
│      Deal €40K en riesgo · [Ver] [Descartar]     │
└──────────────────────────────────────────────────┘
```

**Colores por severidad:**
- Critical: `--danger` background tint + `--danger` border
- Warning: `--warning` background tint + `--warning` border
- Info: `--info` background tint + `--info` border

### 6.4 Pipeline Table

```
Distribuidor    │ Región        │ Stage      │ Valor    │ Prob  │ Último contacto
────────────────┼───────────────┼────────────┼──────────┼───────┼─────────────────
Dist A          │ Île-de-France │ Negociación│ €85,000  │ 75%   │ hace 3 días
Dist B          │ PACA          │ Firmado    │ €120,000 │ 100%  │ hace 1 día
Dist C          │ Occitanie     │ Prospecto  │ €0       │ 10%   │ hace 21 días ⚠️
```

### 6.5 Navigation Sidebar

```
┌──────────────┐
│ 🐸 GRENOUCERIE│  ← Logo + brand
│ France CRM   │
├──────────────┤
│ 📊 Dashboard  │  ← Nav items
│ 🏢 Distributors│
│ 📈 Pipeline   │
│ 🎯 Goals      │
│ ⚙️ Settings   │
├──────────────┤
│ Fabi ●       │  ← User context
└──────────────┘
```

---

## 7. DASHBOARD LAYOUT (Patrón F)

### Estructura de pantalla principal:

```
┌─────────────────────────────────────────────────────────────┐
│ HEADER: 🐸 GRENOUCERIE FRANCE          [🔔] [👤 Fabi ▼]    │
├────────┬────────────────────────────────────────────────────┤
│        │  HERO KPIs (Regla 5 segundos)                     │
│ SIDEBAR│  ┌──────────┐ ┌──────────┐ ┌──────────┐           │
│        │  │ €342K    │ │ 8/10     │ │ 68%      │           │
│ 📊     │  │ Revenue  │ │ Dists    │ │ Progress │           │
│ 🏢     │  └──────────┘ └──────────┘ └──────────┘           │
│ 📈     │                                                    │
│ 🎯     │  ALERTAS (si hay)                                  │
│ ⚙️     │  ┌────────────────────────────────────────────┐   │
│        │  │ ⚠️ Dist D — 14 días sin contacto           │   │
│        │  └────────────────────────────────────────────┘   │
│        │                                                    │
│        │  PIPELINE + DISTRIBUIDORES                        │
│        │  ┌────────────────────────────────────────────┐   │
│        │  │ [Tabla/Cards con distribuidores]           │   │
│        │  └────────────────────────────────────────────┘   │
│        │                                                    │
│        │  TRENDS                                            │
│        │  ┌──────────────────────┐ ┌──────────────────┐   │
│        │  │ Revenue over time    │ │ Product mix      │   │
│        │  │ (Line chart)         │ │ (Bar chart)      │   │
│        │  └──────────────────────┘ └──────────────────┘   │
└────────┴────────────────────────────────────────────────────┘
```

### Regla de Miller: Máximo 7 bloques de información por pantalla

---

## 8. DATA VISUALIZATION RULES

### Selección de gráficos por pregunta de negocio:

| Pregunta | Gráfico | Implementación |
|---|---|---|
| ¿Cómo estamos creciendo? | Líneas (tendencias) | Recharts LineChart |
| ¿Quién está ganando? | Barras (comparaciones) | Recharts BarChart |
| ¿Cuál es la composición? | Barras apiladas | Recharts StackedBar |
| ¿Vamos en camino? | Progress bar | Custom component |

### Prohibido:
- ❌ Gauges / indicadores analógicos (ambigüedad visual)
- ❌ Pie charts complejos (máximo 3 slices si se usan)
- ❌ 3D charts
- ❌ Doble eje Y (confuso)

### Colores de datos:
- Vietnam: `--data-vietnam` (#22c55e)
- Premium: `--data-premium` (#a855f7)
- Otros: `--data-others` (#64748b)

---

## 9. INTERACTION STATES

### Todo elemento interactivo DEBE tener:

```css
/* Buttons */
--btn-default: var(--surface-2) + --border-subtle
--btn-hover: var(--surface-3) + --border-emphasis
--btn-active: var(--accent) + --ink-primary
--btn-focus: --border-focus ring
--btn-disabled: opacity 0.4 + cursor not-allowed

/* Inputs */
--input-bg: var(--surface-0)  /* Más oscuro = inset */
--input-border: --border-subtle
--input-focus: --border-focus

/* Table rows */
--row-hover: var(--surface-2)
--row-selected: rgba(99,102,241,0.1)
```

### Loading states:
- Skeleton screens (no spinners)
- Shimmer animation en cards mientras cargan datos

### Empty states:
- Ilustración sutil + mensaje accionable
- Ej: "Sin distribuidores en esta región. [+ Agregar]"

---

## 10. RESPONSIVE

### Breakpoints:
```css
--bp-sm: 640px    /* Mobile */
--bp-md: 768px    /* Tablet */
--bp-lg: 1024px   /* Desktop */
--bp-xl: 1440px   /* Wide */
```

### Adaptaciones:
- < 768px: Sidebar colapsable (hamburger), cards en columna única
- 768-1024px: Sidebar compacto (solo iconos), grid 2 columnas
- > 1024px: Layout completo como diseñado

---

## 11. ANIMACIÓN

### Micro-interacciones:
- Duración: 150-200ms
- Easing: cubic-bezier(0.4, 0, 0.2, 1) — deceleración
- Hover en cards: translateY(-2px) + border-emphasis
- Transiciones de datos: fade suave

### Prohibido:
- ❌ Spring/bounce en interfaces profesionales
- ❌ Animaciones > 300ms (ralentizan)
- ❌ Motion sin propósito

---

## 12. ACCESIBILIDAD (WCAG 2.1 AA)

- Contraste mínimo: **4.5:1** para texto normal
- Contraste mínimo: **3:1** para texto grande (18px+)
- Focus visible en TODOS los elementos interactivos
- Labels en todos los inputs
- ARIA roles en componentes complejos
- Navegación por teclado completa

---

## 13. PERFORMANCE BUDGET

- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3s
- Bundle size: < 200KB gzipped
- Imágenes: WebP, lazy loading

---

*Documento vivo. Actualizar cuando se tomen decisiones de diseño.*
*Última actualización: 2026-05-27*

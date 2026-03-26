# WC Calendar - Calendario Copa Mundial 2026

Aplicacion de calendario de apuestas deportivas para la Copa Mundial FIFA 2026, desarrollada como reto tecnico para Apuesta Total.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Lenguaje:** TypeScript (strict mode)
- **Estado global:** Redux Toolkit + React-Redux
- **Estilos:** SCSS Modules
- **Fechas:** date-fns v4 (locale `es`)
- **Iconos de banderas:** flag-icons

## Requisitos previos

- Node.js >= 18
- npm >= 9

## Variables de entorno

El proyecto requiere una variable de entorno para conectarse a la API de eventos.

1. Copia el archivo de ejemplo:

```bash
cp .env.example .env.local
```

2. Configura la variable en `.env.local` con la URL de la API proporcionada en el documento del reto tecnico:

```
NEXT_PUBLIC_API_URL=<url-de-la-api>
```

| Variable | Descripcion | Requerida |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | URL de la API que retorna los eventos del mundial en formato JSON | Si |

## Instalacion y ejecucion

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Build de produccion
npm run build

# Ejecutar build de produccion
npm start
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

## Estructura del proyecto

```
src/
├── app/                          # App Router (layouts, pages, error/loading)
├── config/                       # Configuracion de entorno
├── features/
│   ├── betting/                  # Feature: apuestas
│   │   ├── components/
│   │   │   ├── BetSlipFAB/       # Boton flotante del cupon
│   │   │   ├── BetSlipModal/     # Modal del cupon de apuestas
│   │   │   └── OddsButton/       # Boton de cuota reutilizable
│   │   ├── hooks/                # useBetslip, useBetPlacement
│   │   ├── store/                # Redux slices (betslip, wallet)
│   │   └── types/                # Tipos de apuestas
│   └── calendar/                 # Feature: calendario
│       ├── adapters/             # Transformacion API → dominio
│       ├── components/
│       │   ├── AgendaView/       # Vista agenda (lista por dia)
│       │   ├── CalendarShell/    # Layout orquestador + CalendarViewRenderer
│       │   ├── CalendarSkeleton/ # Skeleton de carga
│       │   ├── DayGroup/         # Agrupacion de eventos por dia
│       │   ├── EventCard/        # Card con accordion, StreamBanner, EventCardTbd
│       │   ├── EventListModal/   # Bottom sheet (eventos simultaneos)
│       │   ├── EventPopup/       # Popup posicionado (1-2 eventos en grid)
│       │   ├── GridOverlays/     # Overlays compartidos (popup + modal)
│       │   ├── MonthIndicator/   # Indicador de mes + boton "Hoy"
│       │   ├── ThreeDayView/     # Vista de 3 dias (reutiliza grid semanal)
│       │   ├── ViewTabs/         # Tabs de navegacion entre vistas
│       │   └── WeekView/         # Vista semanal (grid horario)
│       │       ├── TimeGrid      # Orquestador del grid
│       │       ├── TimeLabels    # Columna de horas
│       │       ├── DayColumn     # Columna de un dia
│       │       ├── EventSlot     # Slot posicionado por hora
│       │       ├── SingleEventCard / WeekEventCard / WeekEventCountCard
│       │       ├── LiveIndicator, ParticipantRow, ResultSection, PhaseBadge
│       │       ├── TimeIndicator # Linea roja de hora actual
│       │       └── WeekHeader    # Cabecera con dias
│       ├── hooks/
│       │   ├── useAgendaView     # Compositor de logica para AgendaView
│       │   ├── useCalendarNavigation  # Estado de vista activa + scroll-to-today
│       │   ├── useGridNavigation # Navegacion paginada (swipe + mes)
│       │   ├── useAccordion      # Expand/collapse con "pinned today"
│       │   ├── useEventsByDay    # Indexacion de eventos por dia
│       │   ├── useEventPopup     # Estado popup + modal para grid views
│       │   ├── useGroupedEvents  # Agrupacion dia + hora para grid
│       │   ├── useDayGroupRefs   # Map de refs para day groups
│       │   ├── useMonthObserver  # IntersectionObserver de mes visible
│       │   ├── usePopupPosition  # Posicionamiento viewport-aware
│       │   ├── useSwipe          # Swipe con rubber-band (carousel)
│       │   └── useHorizontalSwipe # Swipe con drag tracking (grid)
│       ├── services/             # Fetch + merge de eventos
│       ├── types/                # event, api, view
│       └── utils/
│           ├── constants         # Constantes de dominio y UI
│           ├── date              # Helpers de fecha (date-fns wrappers)
│           ├── format            # truncateName, getParticipantDisplayName
│           ├── getParticipantNames  # getEventParticipants, isLiveEvent
│           ├── parseGroupName    # Parsing de nombre de grupo/fase
│           ├── eventGrouping     # Agrupacion por hora (grid)
│           ├── groupEventsByDay  # Agrupacion por dia (agenda)
│           ├── getDragStyle      # Calculo de transform para swipe
│           ├── countryMapping    # Pais → grupo, short codes, banderas
│           ├── parseScore        # Parsing de score
│           └── mockEvents        # Fixtures de fase eliminatoria
├── shared/
│   ├── components/
│   │   ├── Avatar/               # Avatar del usuario
│   │   ├── Flag/                 # Bandera de pais
│   │   ├── Header/               # Header con balance y navegacion
│   │   ├── Logo/                 # Logo de la app
│   │   ├── Providers/            # Redux + providers
│   │   └── icons/                # Iconos SVG como componentes
│   ├── constants/
│   │   ├── labels               # Textos UI centralizados (i18n-ready)
│   │   └── touch                # SWIPE_THRESHOLD, stopTouchPropagation
│   ├── hooks/
│   │   ├── useAppDispatch       # Typed dispatch
│   │   ├── useAppSelector       # Typed selector
│   │   └── useModalDismiss      # Backdrop click + Escape key
│   └── store/                   # Store config + tipos
└── styles/                      # Variables SCSS, mixins, reset
```

## Vistas del calendario

### Agenda
Lista vertical de eventos agrupados por dia con accordion expandible. Los eventos del dia actual se expanden automaticamente.

### 3 Dias
Grid horario de 3 dias consecutivos con navegacion por swipe. Reutiliza los componentes del grid semanal con CSS variable `--day-count`.

### Semana
Grid horario de lunes a domingo con:
- Indicador de tiempo actual (linea roja)
- Eventos simultaneos (2: cards compactas, 3+: circulo con contador)
- Popup de evento al hacer click
- Bottom sheet para eventos multiples
- Navegacion por swipe horizontal

## Funcionalidades principales

- **Navegacion por swipe:** Deslizar horizontalmente para cambiar de periodo (semana / 3 dias)
- **Boton "Hoy":** Vuelve a la fecha actual en cualquier vista
- **Seleccion de cuotas:** Click en odds para agregar al cupon
- **Cupon de apuestas:** Modal con monto individual por seleccion, ganancia potencial, y saldo en tiempo real
- **Saldo del cliente:** Estado global con saldo inicial de S/ 200.00, se descuenta al apostar
- **Eventos TBD:** Equipos "Por definir" con icono de globo, no interactuables
- **Mock data:** Fixtures de fase eliminatoria con factory pattern configurable

## Datos

Los eventos de fase de grupos provienen de la API externa. Los eventos de fase eliminatoria (16avos en adelante) son datos mock generados localmente con equipos simulados para demostrar los diferentes escenarios de renderizado.

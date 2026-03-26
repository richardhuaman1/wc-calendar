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
wc-calendar/
├── adapters/          # Adaptadores API → dominio
├── app/               # App Router (layouts, pages)
├── components/
│   ├── calendar/      # Componentes de vistas del calendario
│   │   ├── AgendaView/        # Vista agenda (lista por dia)
│   │   ├── ThreeDayView/      # Vista de 3 dias
│   │   ├── WeekView/          # Vista semanal (grid horario)
│   │   ├── DayGroup/          # Agrupacion de eventos por dia
│   │   ├── EventCard/         # Card de evento con accordion
│   │   ├── EventPopup/        # Popup de evento (WeekView)
│   │   └── EventListModal/    # Modal bottom sheet (eventos simultaneos)
│   ├── layout/        # Header, ViewTabs, MonthIndicator, CalendarShell
│   └── shared/        # BetSlipFAB, BetSlipModal, iconos, Avatar, Logo
├── config/            # Configuracion de la app
├── hooks/             # Custom hooks (useAccordion, useBetslip, useSwipe)
├── services/          # Capa de servicios (fetch + merge de eventos)
├── store/             # Redux slices (betslip, wallet)
├── styles/            # Variables SCSS, mixins, reset
├── types/             # Tipos TypeScript (event, api, betslip, view)
└── utils/             # Utilidades (date, constants, labels, countryMapping, format, mockEvents)
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

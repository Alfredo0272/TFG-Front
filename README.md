# BeerManager — Plataforma de Gestión Cervecera

Aplicación web para la gestión integral de stock, ventas y rentabilidad en empresas cerveceras. Permite administrar fábricas, registrar cervezas, controlar inventario, analizar ingresos y consultar el ranking de productos más rentables desde un panel centralizado.

---

## Tabla de contenidos

- [BeerManager — Plataforma de Gestión Cervecera](#beermanager--plataforma-de-gestión-cervecera)
  - [Tabla de contenidos](#tabla-de-contenidos)
  - [Descripción](#descripción)
  - [Tecnologías](#tecnologías)
  - [Características](#características)
    - [Autenticación](#autenticación)
    - [Gestión de Fábricas](#gestión-de-fábricas)
    - [Gestión de Cervezas](#gestión-de-cervezas)
    - [Control de Stock](#control-de-stock)
    - [Ventas](#ventas)
    - [Dashboard](#dashboard)
    - [Analíticas](#analíticas)
    - [Top 5 Cervezas](#top-5-cervezas)
  - [Arquitectura](#arquitectura)
  - [Requisitos previos](#requisitos-previos)
  - [Instalación](#instalación)
  - [Scripts disponibles](#scripts-disponibles)
  - [Estructura del proyecto](#estructura-del-proyecto)
  - [API — Endpoints](#api--endpoints)
  - [Modelos de datos](#modelos-de-datos)
  - [Autor](#autor)

---

## Descripción

BeerManager es el frontend de un sistema de gestión diseñado específicamente para empresas cerveceras. Ofrece autenticación por empresa, gestión multi-fábrica, registro de cervezas con estilos y costes de producción, control de stock en tiempo real, registro de ventas y un módulo de analíticas con gráficos de ingresos, beneficios y tendencias mensuales.

El proyecto forma parte del Trabajo Final de la FP de Diseño de Aplicaciones Web (DAW) de **Alfredo Lozano**.

---

## Tecnologías

| Categoría | Tecnología                  | Versión        |
| --------- | --------------------------- | -------------- |
| UI        | React                       | 19.2.0         |
| Estado    | Redux Toolkit + React Redux | 2.11.2 / 9.2.0 |
| Routing   | React Router DOM            | 7.13.1         |
| Estilos   | Tailwind CSS                | 4.2.1          |
| Gráficos  | MUI X-Charts                | 8.28.2         |
| Iconos    | Lucide React                | 0.577.0        |
| Build     | Vite                        | 7.3.1          |
| Lenguaje  | TypeScript                  | ~5.9.3         |

---

## Características

### Autenticación

- Registro e inicio de sesión por empresa
- Autenticación mediante JWT con persistencia en `localStorage`
- Restauración automática de sesión al recargar la página

### Gestión de Fábricas

- Crear y visualizar fábricas con nombre, ubicación y capacidad
- Panel con métricas: total de fábricas, capacidad total y media

### Gestión de Cervezas

- Registro de cervezas con estilo (IPA, Stout, Lager…), porcentaje de alcohol y precio por litro
- Filtrado por estilo y eliminación de registros
- Asociación a fábrica productora

### Control de Stock

- Seguimiento de inventario por fábrica y cerveza
- Registro de coste de producción, volumen producido y litros disponibles

### Ventas

- Registro de ventas con cálculo automático del precio total
- Histórico de transacciones por cerveza, fábrica y empresa

### Dashboard

- Vista centralizada de todas las fábricas
- KPIs de ventas, ingresos y beneficio total
- Acceso rápido a la creación de fábricas y cervezas

### Analíticas

- Gráficos de ingresos por cerveza y por fábrica (barras)
- Evolución mensual de ingresos (línea)
- Beneficio por fábrica y evolución mensual multi-fábrica (área apilada)
- Filtro de ingresos por rango de fechas

### Top 5 Cervezas

- Ranking de las 5 cervezas más rentables con márgenes de beneficio
- Gráfico de tarta con distribución de beneficio

---

## Arquitectura

```text
UI Components
    └── Custom Hooks (useBeers, useFactories, useSales, useStock, useRevenue, useCompanies)
            └── Redux Thunks (acciones asíncronas)
                    └── Service Repositories (llamadas a la API via fetch)
                            └── Backend REST API (http://localhost:8080/api)
```

- **Componentes**: organizados por feature (`beers/`, `factories/`, `analytics/`, etc.)
- **Estado global**: Redux Toolkit con slices independientes por dominio
- **Servicios**: patrón Repository — una clase por entidad con métodos CRUD
- **Hooks personalizados**: encapsulan el acceso al store y el dispatch de acciones
- **Lazy loading**: rutas cargadas bajo demanda con `React.lazy` + `Suspense`

---

## Requisitos previos

- Node.js 18 o superior
- Backend corriendo en `http://localhost:8080` (ver repositorio del servidor)

---

## Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/Alfredo0272/cervecera-frontend.git
cd cervecera-frontend

# 2. Instalar dependencias
npm install

# 3. Arrancar el servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

---

## Scripts disponibles

| Comando            | Descripción                                 |
| ------------------ | ------------------------------------------- |
| `npm run dev`      | Servidor de desarrollo con HMR              |
| `npm run build`    | Comprobación de tipos + build de producción |
| `npm run preview`  | Vista previa del build de producción        |
| `npm run lint`     | Análisis estático con ESLint                |
| `npm run lint:fix` | Corrección automática de errores de lint    |

---

## Estructura del proyecto

```text
src/
├── components/
│   ├── analytics/       # Dashboard de analíticas con gráficos
│   ├── app/             # Componente raíz y persistencia de sesión
│   ├── beers/           # Formulario de registro de cervezas
│   ├── buttons/         # Botones de navegación condicionales
│   ├── cards/           # Tarjetas de cerveza, fábrica y modal de stock
│   ├── dashboard/       # Panel principal con KPIs y listado de fábricas
│   ├── details/         # Vista de detalle de fábrica con ventas
│   ├── factories/       # Formulario de registro de fábricas
│   ├── footer/          # Pie de página
│   ├── header/          # Cabecera y navegación principal
│   ├── lists/           # Tablas de cervezas y fábricas
│   ├── login/           # Página de inicio de sesión
│   ├── register/        # Registro de empresa
│   ├── router/          # Definición de rutas (lazy-loaded)
│   └── topBeers/        # Ranking top 5 cervezas más rentables
├── hooks/               # Custom hooks por dominio
├── models/              # Tipos TypeScript (Beer, Factory, Sale, Stock, Company, Revenue)
├── services/            # Repositorios de API por entidad
│   ├── companies/
│   ├── beers/
│   ├── factorys/
│   ├── sale/
│   ├── stock/
│   ├── revenue/
│   └── local.storage.ts
├── slices/              # Redux slices + thunks por dominio
├── store/               # Configuración del store de Redux
├── styles/              # Estilos globales (Tailwind)
├── types/               # Tipos auxiliares
└── main.tsx             # Punto de entrada
```

---

## API — Endpoints

| Método   | Ruta                                        | Descripción                          |
| -------- | ------------------------------------------- | ------------------------------------ |
| `POST`   | `/api/companies/register`                   | Registro de empresa                  |
| `POST`   | `/api/companies/login`                      | Inicio de sesión                     |
| `GET`    | `/api/companies/me`                         | Datos de empresa autenticada         |
| `GET`    | `/api/factories`                            | Listar fábricas                      |
| `POST`   | `/api/factories/new`                        | Crear fábrica                        |
| `GET`    | `/api/factories/:id`                        | Detalle de fábrica                   |
| `GET`    | `/api/beers`                                | Listar cervezas                      |
| `POST`   | `/api/beers/new`                            | Crear cerveza                        |
| `GET`    | `/api/beers/:id`                            | Detalle de cerveza                   |
| `GET`    | `/api/beers/factory/:factoryId`             | Cervezas por fábrica                 |
| `DELETE` | `/api/beers/:id`                            | Eliminar cerveza                     |
| `GET`    | `/api/stock`                                | Listar stock                         |
| `POST`   | `/api/stock`                                | Registrar stock                      |
| `GET`    | `/api/stock/:id`                            | Stock por id                         |
| `GET`    | `/api/sales`                                | Listar ventas                        |
| `POST`   | `/api/sales`                                | Registrar venta                      |
| `GET`    | `/api/revenue/total`                        | Ingreso total                        |
| `GET`    | `/api/revenue/by-beer`                      | Ingresos por cerveza                 |
| `GET`    | `/api/revenue/by-factory`                   | Ingresos por fábrica                 |
| `GET`    | `/api/revenue/monthly`                      | Ingresos mensuales                   |
| `GET`    | `/api/revenue/profit/total`                 | Beneficio total                      |
| `GET`    | `/api/revenue/profit/by-beer`               | Beneficio por cerveza                |
| `GET`    | `/api/revenue/profit/by-factory`            | Beneficio por fábrica                |
| `GET`    | `/api/revenue/profit/top5`                  | Top 5 cervezas rentables             |
| `GET`    | `/api/revenue/profit/monthly/all-factories` | Beneficio mensual todas las fábricas |
| `GET`    | `/api/revenue/range?start=&end=`            | Ingresos entre fechas                |

---

## Modelos de datos

```typescript
Company  { id, name, email, country, foundedYear, createdAt }
Factory  { id, name, location, capacity, companyId, companyName }
Beer     { id, name, style, alcohol, pricePerL, factoryId, factoryName }
Stock    { id, beerId, factoryId, productionCostL, productionVolumeL, availableL, updatedAt }
Sale     { id, beerId, factoryId, quantityL, unitPrice, totalPrice, companyId, soldAt }
Revenue  { label, value }
```

---

## Autor

**Alfredo Lozano**
Proyecto final del Curso 2025-2026 de diseño de aplicaciones Web de Ucademy.

- GitHub: [@Alfredo0272](https://github.com/Alfredo0272)

# BeerManager — Plataforma de Gestión Cervecera

Aplicación web para la gestión integral de stock, ventas y rentabilidad en empresas cerveceras. Permite administrar fábricas, registrar cervezas, controlar inventario y analizar ventas desde un panel centralizado.

---

## Tabla de contenidos

- [Descripción](#descripción)
- [Tecnologías](#tecnologías)
- [Características](#características)
- [Arquitectura](#arquitectura)
- [Instalación](#instalación)
- [Scripts disponibles](#scripts-disponibles)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Variables de entorno](#variables-de-entorno)
- [API — Endpoints](#api--endpoints)
- [Modelos de datos](#modelos-de-datos)
- [Autor](#autor)

---

## Descripción

BeerManager es el frontend de un sistema de gestión diseñado específicamente para empresas cerveceras. Ofrece autenticación por empresa, gestión multi-fábrica, registro de cervezas con sus estilos y costes de producción, control de stock en tiempo real y registro de ventas con cálculo automático de totales.

El proyecto forma parte del Trabajo Final del Bootcamp de desarrollo web de **Alfredo Lozano**.

---

## Tecnologías

| Categoría | Tecnología | Versión |
| --------- | ---------- | ------- |
| UI | React | 19.2.0 |
| Estado | Redux Toolkit + React Redux | 2.11.2 / 9.2.0 |
| Routing | React Router DOM | 7.13.1 |
| Estilos | Tailwind CSS | 4.2.1 |
| Iconos | Lucide React | 0.577.0 |
| Build | Vite | 7.3.1 |
| Lenguaje | TypeScript | ~5.9.3 |
| Testing | Jest | 30.2.0 |

---

## Características

### Autenticación

- Registro e inicio de sesión por empresa
- Autenticación mediante JWT con persistencia en LocalStorage
- Restauración automática de sesión al recargar la página

### Gestión de Fábricas

- Crear y visualizar fábricas con nombre, ubicación y capacidad
- Panel con métricas: total de fábricas, capacidad total y media por fábrica

### Gestión de Cervezas

- Registro de cervezas con estilo (IPA, Stout, Lager…), porcentaje de alcohol y precio por litro
- Filtrado por estilo y eliminación de registros
- Asociación a fábrica productora

### Control de Stock

- Seguimiento de inventario por fábrica y cerveza
- Registro de coste de producción, volumen producido y litros disponibles
- Histórico de actualizaciones

### Ventas

- Registro de ventas con cálculo automático del precio total
- Histórico de transacciones con datos de cerveza, fábrica y empresa

### Dashboard

- Vista centralizada de todas las fábricas
- Acceso rápido a la creación de fábricas y cervezas
- Tabla de resumen con métricas clave

---

## Arquitectura

```text
UI Components
    └── Custom Hooks (useBeers, useFactories, useSale, useStock, useCompanies)
            └── Redux Thunks (async actions)
                    └── Service Repositories (API calls via fetch)
                            └── Backend REST API
```

- **Componentes**: organizados por feature (`beers/`, `factories/`, `dashboard/`, etc.)
- **Estado global**: Redux Toolkit con slices independientes por dominio
- **Servicios**: patrón Repository — una clase por entidad con métodos CRUD
- **Hooks personalizados**: encapsulan la lógica de acceso al store y dispatching de acciones
- **Lazy loading**: componentes cargados bajo demanda con `React.lazy` + `Suspense`

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

Asegúrate de tener el backend corriendo en `http://localhost:8080` antes de iniciar la aplicación.

---

## Scripts disponibles

| Comando | Descripción |
| ------- | ----------- |
| `npm run dev` | Servidor de desarrollo con HMR |
| `npm run build` | Comprobación de tipos + build de producción |
| `npm run preview` | Vista previa del build de producción |
| `npm run lint` | Análisis estático con ESLint |
| `npm run lint:fix` | Corrección automática de errores de lint |

---

## Estructura del proyecto

```text
src/
├── components/
│   ├── app/             # Componente raíz
│   ├── beers/           # Formulario de registro de cervezas
│   ├── buttons/         # Botones de acción reutilizables
│   ├── cards/           # Tarjetas de cerveza, fábrica y stock
│   ├── dashboard/       # Panel principal
│   ├── details/         # Vista de detalle de fábrica
│   ├── factories/       # Formulario de registro de fábricas
│   ├── footer/          # Pie de página
│   ├── header/          # Cabecera y navegación
│   ├── lists/           # Listas de cervezas y fábricas
│   ├── login/           # Página de inicio de sesión
│   ├── register/        # Registro de empresa
│   └── router/          # Definición de rutas
├── hooks/               # Custom hooks por dominio
├── models/              # Tipos TypeScript (Beer, Factory, Sale, Stock, Company)
├── services/            # Repositorios de API por entidad
├── slices/              # Redux slices + thunks por dominio
├── store/               # Configuración del store de Redux
├── styles/              # Estilos globales (Tailwind)
├── types/               # Tipos auxiliares
└── main.tsx             # Punto de entrada
```

---

## Variables de entorno

El proyecto lee la URL base de la API desde las variables de entorno de Vite. Crea un archivo `.env.local` en la raíz:

```env
VITE_API_URL=http://localhost:8080/api/
```

> Si no se define la variable, la aplicación usará `http://localhost:8080/api/` por defecto.

---

## API — Endpoints

| Método | Ruta | Descripción |
| ------ | ---- | ----------- |
| `POST` | `/api/companies/register` | Registro de empresa |
| `POST` | `/api/companies/login` | Inicio de sesión |
| `GET` | `/api/companies/me` | Datos de empresa autenticada |
| `GET` | `/api/factories` | Listar fábricas |
| `POST` | `/api/factories/new` | Crear fábrica |
| `GET` | `/api/factories/:id` | Detalle de fábrica |
| `GET` | `/api/beers` | Listar cervezas |
| `POST` | `/api/beers/new` | Crear cerveza |
| `GET` | `/api/beers/factory/:factoryId` | Cervezas por fábrica |
| `DELETE` | `/api/beers/:id` | Eliminar cerveza |
| `GET` | `/api/stock` | Listar stock |
| `POST` | `/api/stock` | Registrar stock |
| `GET` | `/api/sales` | Listar ventas |
| `POST` | `/api/sales` | Registrar venta |

---

## Modelos de datos

```typescript
Company   { id, name, email, country, foundedYear, createdAt }
Factory   { id, name, location, capacity, companyId, companyName }
Beer      { id, name, style, alcohol, pricePerL, factoryId, factoryName }
Stock     { id, beerId, factoryId, productionCostL, productionVolumeL, availableL, updatedAt }
Sale      { id, beerId, factoryId, quantityL, unitPrice, totalPrice, companyId, soldAt, ... }
```

---

## Autor

**Alfredo Lozano**
Proyecto final de Bootcamp de desarrollo web full-stack.

- GitHub: [@Alfredo0272](https://github.com/Alfredo0272)

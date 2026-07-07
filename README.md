# TP Integrador - Programación III
## Autoservicio

Aplicación web desarrollada como Trabajo Práctico Integrador para la materia **Programación III**.

El sistema simula un autoservicio donde un cliente puede realizar compras de productos y un administrador puede gestionar el catálogo mediante un panel de administración.

---

# Integrantes

- Gian Ignacio Rodriguez
- Franco Votta

---

# Tecnologías utilizadas

## Backend

- Node.js
- Express
- Sequelize ORM
- SQLite
- EJS
- Multer
- bcrypt
- express-session
- ExcelJS
- PDFKit

## Frontend

- HTML5
- CSS3
- JavaScript
- Fetch API

---

# Arquitectura

El proyecto sigue una arquitectura basada en MVC.

```
backend
│
├── src
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middlewares
│   ├── infraestructura
│   └── views
│
├── public
│   ├── assets
│   ├── uploads
│   └── favicon
│
└── app.js
```

Cada capa posee una responsabilidad específica.

| Carpeta | Responsabilidad |
|----------|-----------------|
| controllers | Contienen la lógica de negocio |
| models | Definición de entidades mediante Sequelize |
| routes | Defone los endpoints de la aplicación |
| middlewares | Validaciones y autenticación |
| infraestructura | Configuración de la base de datos |
| views | Plantillas EJS para el panel administrativo |
| public | Recursos estáticos |

---

# Funcionalidades

## Cliente

El cliente puede:

- Ingresar su nombre.
- Visualizar productos.
- Navegar entre categorías.
- Agregar productos al carrito.
- Modificar cantidades.
- Eliminar productos.
- Confirmar la compra.
- Visualizar un ticket.
- Descargar el ticket en PDF.
- Cambiar entre tema claro y oscuro.

---

## Administrador

El administrador puede:

- Iniciar sesión.
- Visualizar todos los productos.
- Crear productos.
- Modificar productos.
- Activar productos.
- Desactivar productos (baja lógica).
- Registrar usuarios administradores.
- Descargar el listado de ventas en Excel.

---

# API REST

La API permite administrar los recursos del sistema utilizando respuestas JSON.

Los principales recursos son:

## Productos

Permite:

- Obtener productos.
- Obtener productos paginados.
- Crear productos.
- Modificar productos.
- Activar productos.
- Desactivar productos.

---

## Usuarios

Permite:

- Registrar administradores.
- Obtener usuarios.

Las contraseñas se almacenan utilizando hashing mediante **bcrypt**.

---

## Ventas

Permite:

- Registrar ventas.
- Obtener historial.
- Asociar productos vendidos.

Existe una relación **Muchos a Muchos** entre:

```
Venta
    ↑
VentaProducto
    ↓
Producto
```

---

## Autenticación

El sistema utiliza:

- express-session
- Cookies de sesión
- Middleware de autenticación

Las vistas administrativas únicamente son accesibles para usuarios autenticados.

---

# Base de datos

El proyecto utiliza SQLite mediante Sequelize ORM.

Principales entidades:

- Usuario
- Producto
- Venta
- VentaProducto

Relaciones:

```
Usuario
    │
    └─────── realiza ───────► Venta

Venta
    │
    └─────── N:M ───────────► Producto
```

---

# Carga de imágenes

Las imágenes de productos son almacenadas en:

```
backend/public/uploads
```

La carga se realiza mediante **Multer**.

---

# Flujo del sistema

## Cliente

```
Inicio

↓

Pantalla bienvenida

↓

Listado productos

↓

Carrito

↓

Confirmación

↓

Registro de venta

↓

Ticket

↓

Descarga PDF
```

---

## Administrador

```
Login

↓

Dashboard

↓

Alta

↓

Edición

↓

Activación

↓

Desactivación

↓

Exportación Excel
```

---

# Validaciones

La aplicación implementa validaciones mediante middlewares.

Entre ellas:

- Datos obligatorios.
- Tipos de datos.
- Validación de formularios.
- Validación de autenticación.

---

# Persistencia

Toda la información se almacena en SQLite mediante Sequelize.

Se persisten:

- Productos.
- Usuarios.
- Ventas.
- Relaciones entre ventas y productos.

---

# Instalación

## 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
```

## 2. Instalar dependencias

```bash
cd backend
npm install
```

## 3. Configurar variables de entorno

Crear un archivo `.env` tomando como referencia:

```
.env.example
```

---

## 4. Ejecutar el servidor

```bash
npm start
```

o

```bash
npm run dev
```

---

# Estructura del proyecto

```
backend
│
├── public
│   ├── assets
│   ├── uploads
│   └── favicon
│
├── src
│   ├── controllers
│   ├── infraestructura
│   ├── middlewares
│   ├── models
│   ├── routes
│   └── views
│
├── database.sqlite
├── app.js
└── package.json

frontend
│
├── css
├── js
├── assets
└── index.html
```

---

# Características implementadas

- Arquitectura MVC.
- API REST.
- Renderizado mediante EJS.
- ORM Sequelize.
- SQLite.
- CRUD completo de productos.
- Autenticación.
- Subida de imágenes.
- Exportación de ventas a Excel.
- Generación de tickets PDF.
- Carrito de compras.
- Tema claro/oscuro.
- Diseño responsive.
- Baja lógica de productos.
- Paginación.
- Persistencia de ventas.

---

# Consideraciones

Este proyecto fue desarrollado con fines académicos para la materia **Programación III**, implementando una aplicación completa compuesta por un frontend para clientes y un backend con panel administrativo, comunicados mediante una API REST y persistencia de datos utilizando SQLite y Sequelize.

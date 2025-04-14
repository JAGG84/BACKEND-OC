
# 🧾 Requerimiento de desarrollo: API REST para plataforma de gestión de órdenes de compra

### 🧑‍💼 Cliente: COAL Logistics S.A. de C.V.
### 🧑‍💻 Desarrollador Backend: [Tu nombre]
### 📆 Plazo estimado: 15 días hábiles

---

## 🎯 Objetivo del proyecto

Necesitamos una API RESTful robusta, segura, documentada y escalable que nos permita gestionar el ciclo completo de **órdenes de compra** de nuestra empresa de logística, desde su creación hasta la entrega final, incluyendo autenticación de usuarios, manejo de estados de órdenes, asignación de transportistas y emisión de reportes.

---

## 📌 Requisitos funcionales de la API

### 1. Módulo de autenticación
- Registro de usuarios
- Inicio de sesión con JWT
- Refresh token
- Cierre de sesión
- Recuperación de contraseña (simulado con log/email fake)

#### Roles:
- `admin`: acceso total
- `operator`: acceso a órdenes asignadas
- `viewer`: solo lectura

### 2. Módulo de usuarios
- CRUD de usuarios
- Asignación de roles
- Activar/desactivar cuentas

### 3. Módulo de órdenes de compra
Cada orden tiene:
- ID interno
- Cliente (nombre, correo, RFC)
- Lista de productos (nombre, SKU, cantidad, precio unitario)
- Estado (`pendiente`, `asignada`, `en tránsito`, `entregada`, `cancelada`)
- Fecha de creación
- Fecha de entrega estimada
- Transportista asignado (opcional)

Acciones esperadas:
- Crear, listar, actualizar, eliminar
- Asignar transportista
- Cambiar estado
- Listar por filtros (estado, fechas, cliente, transportista)

### 4. Módulo de reportes
- Obtener métricas:
  - Total de órdenes por mes
  - Órdenes por estado
  - Órdenes por transportista
- Reporte exportable a CSV/JSON

---

## 🧰 Requisitos técnicos

### 🛠️ Backend
- Node.js (v18+)
- Express.js
- Estructura modular escalable (MVC + services)
- Base de datos: MongoDB (puedes usar Mongoose)
- JWT para autenticación
- Validación con Joi (request body, query, params)
- Manejo centralizado de errores
- Logger con Morgan (HTTP) y/o Winston (archivos)

### 📄 Documentación
- Swagger/OpenAPI accesible en `/api-docs`
- Ejemplos de request y response
- Explicación de cada endpoint

### 🧪 Testing
- Pruebas con Jest + Supertest
- Mínimo 80% de cobertura en:
  - Usuarios
  - Órdenes
  - Login

### 🐳 DevOps
- Dockerfile + docker-compose (Mongo incluido)
- .env.example para configuración
- Comando `npm run dev` para desarrollo
- Comando `npm run test` para pruebas

### 🔐 Seguridad
- CORS habilitado solo para dominios de confianza
- Rate limit (100 req/min)
- Helmet para headers seguros
- Sanitización de inputs

---

## 🗂️ Requisitos de entrega
- Repositorio Git bien organizado con:
  - README detallado
  - Commits limpios y frecuentes
  - Branch principal: `main`
- ZIP del proyecto completo (sin `node_modules`)
- Deploy opcional en Render, Railway o similar (si el tiempo permite)

---

## 🧭 Expectativas como cliente

Como cliente, espero que:
- Me presentes la **documentación primero**, para revisión inicial.
- Tengamos comunicación frecuente (puedes simular en comentarios de commits).
- El código sea claro, con buenas prácticas, y pensado para crecer.
- La API sea usable sin necesidad de front-end.

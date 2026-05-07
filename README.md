<p align="center">
  <!-- Reemplaza con el logo de tu frontend si tienes uno -->
  <img src="https://img.icons8.com/fluency/96/000000/classroom.png" width="80" alt="GeoAsistencia Web" />
</p>

<h1 align="center">GeoAsistencia — Panel Web</h1>

<p align="center">
  Interfaz de administración web del sistema de control de asistencia académica del SENA.<br/>
  Permite a administradores y docentes gestionar usuarios, grupos, matrículas y reportes de asistencia.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Consume-GeoAsistencia%20API-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="Backend NestJS" />
  <img src="https://img.shields.io/badge/Auth-Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase Auth" />
  <img src="https://img.shields.io/badge/Estado-En%20desarrollo-orange?style=for-the-badge" alt="Estado" />
</p>

---

## ✨ Descripción general

El **Panel Web de GeoAsistencia** es el front-end de administración del sistema. A diferencia de la aplicación móvil (orientada a docentes y estudiantes en campo), el panel web está pensado para usuarios con roles de **Administrador** y **Docente** que requieren gestionar el sistema desde un escritorio.

Toda la lógica de negocio reside en el backend REST (`GeoAsistencia-SENA`). El panel web consume esa API mediante peticiones HTTP autenticadas con JWT emitido por **Supabase Auth**.

---

## 🎯 Funcionalidades por rol

### Administrador (`ADMIN` / `SUPER_ADMIN`)
- Crear, editar y gestionar usuarios (docentes y estudiantes) de forma individual o **carga masiva desde Excel**.
- Asignar y actualizar roles de usuario.
- Crear y gestionar semestres académicos y asignaturas.
- Crear grupos de clase y asignarles docente, horarios y asignatura.
- Matricular estudiantes en grupos de forma individual o **masiva desde Excel**.
- Mover estudiantes entre grupos o darlos de baja.
- Visualizar reportes de asistencia por grupo y por sesión.

### Docente (`TEACHER`)
- Ver los grupos de clase que tiene asignados.
- Consultar la lista de estudiantes matriculados en cada grupo con su porcentaje de asistencia acumulado.
- Ver el detalle de cada sesión de clase: cuántos estudiantes asistieron, hora de entrada, etc.
- Acceder al historial de sesiones del grupo.

> **Nota:** el llamado a lista en tiempo real (BLE + GPS) se realiza **exclusivamente desde la app móvil**. El panel web sirve para administración, consulta y reportes.

---

## 🔗 Conexión con el Backend

El panel web consume la API REST de **GeoAsistencia-SENA** (NestJS, corriendo por defecto en `http://localhost:3001`). La documentación interactiva de todos los endpoints está disponible en Swagger:

```
http://localhost:3001/api/doc
```

### Autenticación

Todos los endpoints del backend (excepto los marcados como públicos) requieren un **Bearer Token JWT** en el header `Authorization`. Dicho token es emitido por Supabase Auth al iniciar sesión:

```
Authorization: Bearer <supabase_jwt_token>
```

El token contiene el rol del usuario y es verificado por el `SupabaseAuthGuard` del backend en cada petición.

---

## 📋 Endpoints de la API consumidos

### 🔑 Autenticación
| Método | Endpoint | Descripción |
|---|---|---|
| `POST` | `/api/auth/login` | Iniciar sesión (delegado a Supabase) |

### 👥 Usuarios
| Método | Endpoint | Descripción |
|---|---|---|
| `POST` | `/api/user` | Registrar usuario individual |
| `GET` | `/api/user` | Listar usuarios con paginación |
| `GET` | `/api/user/me` | Perfil del usuario autenticado |
| `PATCH` | `/api/user/:id` | Actualizar datos del usuario |
| `PATCH` | `/api/user/:id/roles` | Asignar/actualizar roles |
| `POST` | `/api/user/bulk/import` | Carga masiva de usuarios desde Excel |

### 📚 Académico
| Método | Endpoint | Descripción |
|---|---|---|
| `POST` | `/api/semesters` | Crear semestre académico |
| `GET` | `/api/semesters` | Listar semestres |
| `PATCH` | `/api/semesters/:id` | Actualizar semestre |
| `PATCH` | `/api/semesters/:id/state` | Cambiar estado del semestre |
| `POST` | `/api/subjects` | Crear asignatura |
| `GET` | `/api/subjects` | Listar asignaturas |
| `POST` | `/api/subjects/bulk/import` | Carga masiva de asignaturas desde Excel |

### 🗂️ Grupos de clase
| Método | Endpoint | Descripción |
|---|---|---|
| `POST` | `/api/class-groups` | Crear grupo de clase |
| `GET` | `/api/class-groups` | Listar grupos (filtrado por rol automáticamente) |
| `GET` | `/api/class-groups/:id` | Detalle de un grupo |
| `PATCH` | `/api/class-groups/:id` | Actualizar grupo |
| `POST` | `/api/class-days` | Agregar días/horarios al grupo |
| `PATCH` | `/api/class-days/:id` | Actualizar horario |

### 📝 Matrículas
| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/api/enrollment/:groupId` | Estudiantes del grupo con % asistencia |
| `POST` | `/api/enrollment/move` | Mover estudiantes entre grupos |
| `PATCH` | `/api/enrollment/remove` | Dar de baja estudiantes de un grupo |
| `POST` | `/api/enrollment/bulk/import/:groupId` | Matrícula masiva desde Excel |
| `GET` | `/api/enrollment/bulk/template` | Descargar plantilla Excel de matrícula |

### 📊 Sesiones y Asistencia
| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/api/class-sessions/group/:groupId` | Historial de sesiones del grupo |
| `GET` | `/api/class-sessions/:id/attendances` | Asistencias detalladas de una sesión |
| `PATCH` | `/api/class-sessions/:id/close` | Cerrar sesión manualmente (si aplica) |
| `GET` | `/api/attendances/group/:groupId/my-history` | Historial personal del estudiante |

### 🔐 Control de acceso
| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/api/roles` | Listar roles disponibles |
| `PATCH` | `/api/roles/:id/permissions` | Actualizar permisos de un rol |
| `GET` | `/api/permissions` | Listar permisos del sistema |
| `GET` | `/api/menu` | Menú de navegación según rol del usuario |

---

## 🧩 Estructura de roles y permisos

El sistema define cuatro roles jerárquicos:

| Rol | Descripción |
|---|---|
| `SUPER_ADMIN` | Acceso total al sistema |
| `ADMIN` | Gestión de usuarios, grupos, matrículas y reportes |
| `TEACHER` | Consulta de sus grupos, sesiones y asistencias |
| `STUDENT` | Solo acceso desde la app móvil |

El backend expone el endpoint `GET /api/menu` que retorna el menú de navegación dinámico según el rol del usuario autenticado. Úsalo para construir la navegación lateral del panel web de forma automática.

---

## 📊 Respuesta estándar de la API

Todas las respuestas del backend siguen el formato:

```json
{
  "success": true,
  "statusCode": 200,
  "data": { ... }
}
```

Las respuestas paginadas incluyen adicionalmente:

```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "items": [...],
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10
  }
}
```

Los errores siguen:

```json
{
  "success": false,
  "statusCode": 400,
  "message": "Descripción del error"
}
```

---

## 🗃️ Carga masiva desde Excel

El sistema soporta importación masiva mediante archivos `.xlsx` con validación fila por fila:

- **Usuarios:** `POST /api/user/bulk/import` — crea usuarios en la BD y en Supabase Auth. La contraseña inicial es el número de documento del usuario.
- **Asignaturas:** `POST /api/subjects/bulk/import`
- **Matrículas:** `POST /api/enrollment/bulk/import/:groupId`

Las plantillas de Excel descargables están disponibles en los endpoints `GET .../bulk/template`.

---

## 🔧 Variables de entorno (Frontend)

El panel web debe configurar las siguientes variables para conectarse al backend y a Supabase:

```env
# URL base de la API del backend
VITE_API_URL=http://localhost:3001/api
# o en producción:
# VITE_API_URL=https://tu-dominio.com/api

# Credenciales de Supabase (para autenticación en el frontend)
VITE_SUPABASE_URL=https://<referencia>.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_...
```

> Adapta los nombres de las variables según el framework que uses (`VITE_`, `NEXT_PUBLIC_`, `REACT_APP_`, etc.).

---

## 🚀 Requisitos para correr el backend localmente

El panel web depende del backend para funcionar. Para levantarlo:

```bash
# Clonar y configurar el backend
git clone https://github.com/WilcarOrtiz/GeoAsistencia-SENA.git
cd GeoAsistencia-SENA

# Instalar dependencias
pnpm install

# Configurar .env (ver README del backend)
cp .env.template .env
# Editar .env con tus credenciales

# Iniciar en modo desarrollo
pnpm start:dev
```

La API quedará disponible en `http://localhost:3001` y Swagger en `http://localhost:3001/api/doc`.

---

## 📐 Consideraciones de diseño del panel

- El menú lateral debe construirse dinámicamente consumiendo `GET /api/menu` tras el login.
- La paginación debe respetarse enviando los query params `page` y `limit` en los listados.
- Para los módulos de carga masiva, usa `multipart/form-data` con el campo `file` (Excel `.xlsx`).
- El estado de sesión (JWT) debe almacenarse de forma segura y renovarse automáticamente usando el cliente de Supabase en el frontend.
- El radio de validación de asistencia GPS es configurable en el backend mediante la variable `ATTENDANCE_RADIUS_METERS` (por defecto: 30 metros).

---

## 📄 Licencia

Este proyecto es de uso académico y fue desarrollado como proyecto de grado para el **SENA**. No está destinado a publicación comercial.

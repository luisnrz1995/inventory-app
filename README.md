# 🧾 README.md

Aplicación web fullstack para la gestión de inventario de productos. Permite a los usuarios registrarse, iniciar sesión y realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre sus propios productos. Incluye diseño responsivo y modo claro/oscuro animado con persistencia local.

---

## 🛠️ Tecnologías utilizadas

- **Frontend:**
  - HTML5, CSS3
  - Bootstrap 5
  - JavaScript (Vanilla)
  - Modo oscuro personalizado

- **Backend (2 APIs independientes):**
  - Node.js + Express
  - MongoDB Atlas
  - JWT para autenticación
  - Dotenv para configuración

---

## ⚙️ Funcionalidades principales

- Registro e inicio de sesión con validación (API Usuarios).
- JWT para autenticación persistente.
- CRUD de productos (solo visibles para el usuario autenticado) (API Productos).
- Interfaz responsiva (móvil/tablet/escritorio).
- Modo claro y oscuro con switch animado.
- Separación clara entre frontend y backend por carpetas.

---

## 📁 Estructura del proyecto

```
inventario-app/
├── api-usuarios/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── .env
├── api-productos/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── .env
├── frontend/
│   ├── css/
│   │   └── theme.css
│   ├── js/
│   │   ├── auth.js
│   │   ├── inventario.js
│   │   └── theme.js
│   ├── index.html
│   ├── registro.html
│   └── inventario.html
└── README.md
```

---

## 🚀 ¿Cómo ejecutar el proyecto localmente?

### 1. Clona el repositorio

```bash
git clone https://github.com/tu-usuario/inventario-app.git
cd inventario-app
```

---

### 2. Configura e inicia la **API de usuarios**

```bash
cd api-usuarios
npm install
```

Inicia el servidor

```bash
node server.js
```

---

### 3. Configura e inicia la **API de productos**

```bash
cd ../api-productos
npm install
```

Inicia el servidor

```bash
node server.js
```

---

### 4. Abre el frontend

Abre el archivo `frontend/index.html` en tu navegador o usa Live Server.

---

## 🧑‍💻 Autor

_Evidencia GA4-220501096-AA1-EV02. Aplicación web funcional_  
_Luis Eduardo Narváez Madera_  
_Servicio Nacional de Aprendizaje - SENA_
_Técnico en Programación de Software_  
_Ficha 3069978_  
_Miguel Ángel López Cacho_  
_2025_

---

## 📄 Licencia

Este proyecto es de uso educativo y está bajo licencia MIT.
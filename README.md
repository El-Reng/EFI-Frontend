# Panadería — EFI Frontend

Aplicación web desarrollada como parte del Proyecto de Evaluación Final Integradora (EFI) de Frontend.

El proyecto consiste en una plataforma para una panadería que permite consultar productos y categorías, visualizar información detallada y administrar el catálogo mediante un panel privado. Incluye autenticación de usuarios, control de permisos y una interfaz adaptable a distintos dispositivos.

La aplicación consume una API REST desarrollada con FastAPI, encargada de gestionar los datos y la persistencia de la información.

## Tecnologías utilizadas

- **JavaScript:** lenguaje de programación.
- **React:** desarrollo de interfaces mediante componentes.
- **Vite:** entorno de desarrollo y construcción de la aplicación.
- **React Router:** navegación entre páginas y rutas dinámicas.
- **Tailwind CSS:** estilos y diseño adaptable.
- **Context API:** gestión global de autenticación y preferencias de tema.
- **Fetch API:** comunicación asíncrona con el backend.
- **LocalStorage:** persistencia local de la sesión y las preferencias de tema.

## Funcionalidades

La aplicación permite:

- Consultar productos disponibles y sus categorías.
- Filtrar el catálogo de productos por categoría.
- Visualizar los detalles individuales de cada producto.
- Navegar entre las distintas secciones mediante React Router.
- Iniciar y cerrar sesión mediante autenticación con el backend.
- Mantener la sesión del usuario mediante tokens JWT.
- Detectar sesiones vencidas o inválidas y redirigir al usuario al inicio de sesión.
- Administrar productos mediante operaciones de creación, consulta, modificación y eliminación.
- Administrar categorías.
- Gestionar usuarios y sus permisos desde el panel administrativo.
- Modificar los datos y credenciales de la propia cuenta.
- Alternar entre los temas claro y oscuro.
- Adaptar la interfaz a dispositivos móviles y de escritorio.

## Estructura del proyecto

```text
EFI-Frontend/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── Carousel.jsx
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   └── ProductCard.jsx
│   │
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── ThemeContext.jsx
│   │
│   ├── pages/
│   │   ├── Admin.jsx
│   │   ├── AdminCategorias.jsx
│   │   ├── AdminProductos.jsx
│   │   ├── AdminUsuario.jsx
│   │   ├── Catalogo.jsx
│   │   ├── Categorias.jsx
│   │   ├── Cuenta.jsx
│   │   ├── DetalleProducto.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Nosotros.jsx
│   │   └── NotFound.jsx
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .env
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
└── README.md
```

## Requisitos previos

- Node.js y npm.
- Git para clonar el repositorio.

## Instalación

**1. Clonar el repositorio**

```bash
git clone URL_DEL_REPOSITORIO
cd EFI-Frontend
```

**2. Instalar las dependencias**

```bash
npm install
```

## Configuración de variables de entorno

La aplicación necesita conocer la dirección de la API REST para realizar las solicitudes al backend.

Crear un archivo `.env` en la raíz del proyecto con la siguiente variable:

```env
VITE_API_URL=https://efi-backend-afd3b64d.fastapicloud.dev
```

La variable permite modificar la dirección del backend sin necesidad de cambiar el código fuente.

El archivo `.env` no debe subirse al repositorio. En entornos de producción, la variable debe configurarse desde la plataforma de despliegue.

## Ejecución en desarrollo

Iniciar el servidor de desarrollo mediante:

```bash
npm run dev
```

Vite mostrará la dirección local desde la cual se puede acceder a la aplicación, normalmente:

```text
http://localhost:5173/
```

## Construcción para producción

Para generar la versión optimizada de la aplicación:

```bash
npm run build
```

Los archivos resultantes se generan dentro de la carpeta `dist/`.

Para probar localmente la versión de producción:

```bash
npm run preview
```

## Rutas principales

La navegación se implementa mediante React Router.

| Ruta                | Descripción                         |
| ------------------- | ----------------------------------- |
| `/`                 | Página principal.                   |
| `/productos`        | Catálogo de productos.              |
| `/productos/:id`    | Detalle de un producto.             |
| `/categorias`       | Listado de categorías.              |
| `/nosotros`         | Información sobre la panadería.     |
| `/login`            | Inicio de sesión.                   |
| `/cuenta`           | Administración de la cuenta propia. |
| `/admin`            | Panel administrativo.               |
| `/admin/productos`  | Administración de productos.        |
| `/admin/categorias` | Administración de categorías.       |
| `/admin/usuarios`   | Administración de usuarios.         |

Las rutas administrativas requieren autenticación. Algunas funcionalidades están restringidas según los permisos del usuario.

## Comunicación con el backend

La aplicación consume una API REST desarrollada con FastAPI.

La comunicación se realiza mediante solicitudes HTTP asíncronas utilizando Fetch API.

Entre las operaciones principales se encuentran:

- Consultar productos y categorías.
- Obtener información individual de productos.
- Crear, modificar y eliminar productos.
- Crear, modificar y eliminar categorías.
- Consultar y administrar usuarios según los permisos disponibles.
- Iniciar sesión y obtener un token de autenticación.
- Consultar y modificar los datos de la cuenta propia.

Las solicitudes protegidas utilizan tokens JWT enviados mediante el encabezado `Authorization: Bearer`.

## Gestión del estado

El proyecto utiliza los hooks de React para administrar los datos y el comportamiento de los componentes.

- **useState:** almacenamiento de datos, estados de carga, errores y formularios.
- **useEffect:** ejecución de solicitudes y actualización de información cuando cambian las dependencias.
- **useContext:** acceso a estados globales compartidos mediante Context API.

Se implementan dos contextos principales:

- **AuthContext:** administra la sesión, los datos del usuario, el token de autenticación y el cierre de sesión.
- **ThemeContext:** administra el tema visual de la aplicación y conserva la preferencia seleccionada mediante LocalStorage.

## Autenticación y permisos

La autenticación se realiza mediante el backend. Al iniciar sesión, la aplicación obtiene un token JWT y consulta los datos del usuario autenticado.

La información de la sesión se conserva localmente para permitir que el usuario mantenga su acceso al navegar o recargar la aplicación.

Las rutas privadas verifican la existencia de una sesión y restringen determinadas funcionalidades según los permisos del usuario.

Cuando una solicitud protegida recibe una respuesta HTTP 401, la aplicación considera que la sesión dejó de ser válida, cierra la sesión local y redirige al usuario al inicio de sesión.

## Diseño e interfaz

La interfaz utiliza Tailwind CSS para definir los estilos y adaptar los componentes a distintos tamaños de pantalla.

Se incluyen:

- Diseño adaptable a dispositivos móviles y de escritorio.
- Tema claro y oscuro.
- Componentes reutilizables.
- Navegación entre secciones.
- Formularios para las operaciones administrativas.
- Estados de carga y mensajes de error durante las solicitudes al backend.

## Autores

Desarrollado por:

- Gabriel Acuña
- Leonel Rojo
- Ivo Roldan

**Proyecto de Evaluación Final Integradora — Frontend, 2026.**

import { NavLink, Outlet } from "react-router-dom";

function Admin() {
  const estiloSidebar = ({ isActive }) =>
    `flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
      isActive
        ? "bg-stone-200 text-stone-900 font-semibold"
        : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
    }`;

  return (
    <section className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
      {/* cabecera del panel */}
      <div className="mb-6 border-b border-stone-200 pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-stone-900">
          Panel de Administración
        </h1>
        <p className="text-sm text-stone-500 mt-1">
          Gestión interna de productos, categorías y cuentas.
        </p>
      </div>

      {/* cuerpo con barra lateral a la izquierda y contenido a la derecha */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* barra lateral de navegacion */}
        <aside className="w-full md:w-56 shrink-0 rounded-lg border border-stone-200 bg-white p-3 shadow-xs">
          <p className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-stone-400">
            Navegación
          </p>
          <nav className="mt-2 flex flex-col gap-1">
            <NavLink to="/admin/productos" className={estiloSidebar}>
              Productos
            </NavLink>
            <NavLink to="/admin/categorias" className={estiloSidebar}>
              Categorías
            </NavLink>
            <NavLink to="/admin/usuarios" className={estiloSidebar}>
              Cuentas y Permisos
            </NavLink>
          </nav>
        </aside>

        {/* area de contenido que cambia segun la subruta elegida */}
        <div className="flex-1 w-full">
          <Outlet />
        </div>
      </div>
    </section>
  );
}

export default Admin;

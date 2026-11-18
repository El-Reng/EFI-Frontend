import { NavLink, Outlet } from "react-router-dom";

function Admin() {
  const estiloSidebar = ({ isActive }) =>
    `flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all ${
      isActive
        ? "bg-[#F6C824] text-[#3D1C06] font-bold shadow-xs"
        : "text-[#3D1C06]/80 hover:bg-amber-100/60 hover:text-[#3D1C06]"
    }`;

  return (
    <section className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
      {/* Cabecera del panel */}
      <div className="mb-6 border-b border-amber-200/80 pb-4">
        <h1 className="font-serif text-3xl font-bold tracking-tight text-[#3D1C06]">
          Panel de Administración
        </h1>
        <p className="text-sm text-[#3D1C06]/75 mt-1">
          Gestión interna de productos, categorías y cuentas de la panadería.
        </p>
      </div>

      {/* Cuerpo con barra lateral a la izquierda y contenido a la derecha */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Barra lateral de navegacion con sombra */}
        <aside className="w-full md:w-60 shrink-0 rounded-2xl border border-amber-200/90 bg-white p-3.5 shadow-md">
          <p className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#3D1C06]/60">
            Navegación
          </p>
          <nav className="mt-2 flex flex-col gap-1.5">
            <NavLink to="/admin/productos" className={estiloSidebar}>
              <span>🥖</span>
              <span>Productos</span>
            </NavLink>
            <NavLink to="/admin/categorias" className={estiloSidebar}>
              <span>📁</span>
              <span>Categorías</span>
            </NavLink>
            <NavLink to="/admin/usuarios" className={estiloSidebar}>
              <span>👥</span>
              <span>Cuentas y Permisos</span>
            </NavLink>
          </nav>
        </aside>

        {/* Area de contenido que cambia segun la subruta elegida */}
        <div className="flex-1 w-full">
          <Outlet />
        </div>
      </div>
    </section>
  );
}

export default Admin;

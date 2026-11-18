import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Admin() {
  const { isOwner } = useAuth();

  const estiloSidebar = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all ${
      isActive
        ? "bg-pan-amarillo text-pan-marron font-bold shadow-xs"
        : "text-pan-marron/80 hover:bg-amber-100/60 hover:text-pan-marron"
    }`;

  return (
    <section className="mx-auto w-full max-w-7xl flex-1 px-2 py-8 sm:px-4">
      <div className="mb-6 border-b border-amber-200/80 pb-4">
        <h1 className="font-serif text-3xl font-bold tracking-tight text-pan-marron">
          Panel de Administración
        </h1>
        <p className="mt-1 text-sm text-pan-marron/75">
          Gestión interna de productos, categorías y cuentas de la panadería.
        </p>
      </div>

      <div className="flex flex-col items-start gap-5 md:flex-row">
        <aside className="w-full shrink-0 rounded-2xl border border-amber-200/90 bg-white p-3.5 shadow-md md:w-52">
          <p className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-pan-marron/60">
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

            {isOwner && (
              <NavLink to="/admin/usuarios" className={estiloSidebar}>
                <span>👥</span>
                <span>Usuarios</span>
              </NavLink>
            )}
          </nav>
        </aside>

        <div className="w-full min-w-0 flex-1">
          <Outlet />
        </div>
      </div>
    </section>
  );
}

export default Admin;

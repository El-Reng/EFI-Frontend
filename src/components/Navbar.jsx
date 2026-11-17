import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Navbar({usuarioActual, onCerrarSesion}) {
  const navigate = useNavigate();
  // boton para anrir y cerrar el menu del avatar
  const [menuAbierto, setMenuAbierto] = useState(false);

  const estiloLink = ({ isActive }) =>
    `hover:underline ${
      isActive ? "underline underline-offset-4 font-bold" : ""
    }`;

  return (
    <header className="sticky top-0 z-20 bg-amber-300 text-amber-950 shadow-sm">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
        <Link
          to="/"
          className="font-serif text-2xl font-bold tracking-tight hover:opacity-90"
        >
          🥖 Panadería
        </Link>

        <ul className="flex flex-wrap gap-6 font-semibold">
          <li>
            <NavLink to="/" end className={estiloLink}>
              Inicio
            </NavLink>
          </li>

          <li>
            <NavLink to="/productos" className={estiloLink}>
              Productos
            </NavLink>
          </li>

          <li>
            <NavLink to="/categorias" className={estiloLink}>
              Categorías
            </NavLink>
          </li>

          <li>
            <NavLink to="/nosotros" className={estiloLink}>
              Nosotros
            </NavLink>
          </li>
          
        </ul>
                {/* avatar tipo facebook */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setMenuAbierto(!menuAbierto)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-200 text-amber-900 border border-amber-400 hover:bg-amber-100 focus:outline-none"
            aria-label="menu de usuario"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </button>

          {/* ventana de inicio de sesion */}
          {menuAbierto && (
            <div className="absolute right-0 mt-2 w-44 rounded border border-stone-300 bg-white p-2 text-stone-800 shadow text-xs">
              {usuarioActual ? (
                <div>
                  <p className="font-bold">{usuarioActual.nombre}</p>
                  <p className="text-stone-500 mb-2">
                    {usuarioActual.esSuperAdmin ? "Super Admin" : "Admin"}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setMenuAbierto(false);
                      navigate("/admin");
                    }}
                    className="w-full text-left p-1 hover:bg-stone-100 font-semibold"
                  >
                    Panel Admin
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMenuAbierto(false);
                      onCerrarSesion();
                    }}
                    className="w-full text-left p-1 text-red-600 hover:bg-red-50 font-semibold mt-1"
                  >
                    Cerrar sesion
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setMenuAbierto(false);
                    navigate("/login");
                  }}
                  className="w-full text-left p-1 hover:bg-stone-100 font-semibold"
                >
                  Iniciar sesion
                </button>
              )}
            </div>
          )}
        </div>

      </nav>
    </header>
  );
}

export default Navbar;

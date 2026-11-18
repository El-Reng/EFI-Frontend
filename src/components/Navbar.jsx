import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar({ usuarioActual: propUsuario, onCerrarSesion: propLogout }) {
  const navigate = useNavigate();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const menuRef = useRef(null);

  const auth = useAuth();
  const usuario = propUsuario || auth?.usuario;
  const onCerrarSesion = propLogout || auth?.logout;

  // Cerramos el menu al hacer clic afuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuAbierto(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const estiloLink = ({ isActive }) =>
    `transition-colors duration-200 hover:opacity-75 ${
      isActive
        ? "underline underline-offset-8 decoration-2 decoration-[#3D1C06] font-bold"
        : "font-semibold"
    }`;

  const nombreMostrado =
    usuario?.username ||
    usuario?.nombre ||
    (typeof usuario === "string" ? usuario : "Mi cuenta");

  return (
    <header className="sticky top-0 z-30 bg-[#F6C824] bg-patron-invertido text-[#3D1C06] shadow-md border-b border-amber-400/60">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3.5">
        <Link
          to="/"
          className="font-serif text-2xl font-bold tracking-tight transition hover:opacity-85 flex items-center gap-2"
        >
          <span>🥖</span>
          <span>Panadería</span>
        </Link>

        <ul className="flex flex-wrap items-center gap-6 text-sm sm:text-base">
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

        {/* Boton Pill de Usuario / Login */}
        <div className="relative" ref={menuRef}>
          {!usuario ? (
            /* Estado NO Logueado: Pill horizontal que lleva directo a /login */
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="flex items-center gap-2 rounded-full border border-amber-400/80 bg-white/90 px-4 py-1.5 text-xs sm:text-sm font-bold text-[#3D1C06] shadow-sm transition-all duration-200 hover:bg-white hover:shadow-md hover:scale-[1.03] cursor-pointer"
              aria-label="Iniciar sesión"
            >
              <svg className="h-4 w-4 text-[#3D1C06]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
              <span>Iniciar sesión</span>
            </button>
          ) : (
            /* Estado SI Logueado: Misma Pill con el username y despliegue de menu */
            <>
              <button
                type="button"
                onClick={() => setMenuAbierto(!menuAbierto)}
                className="flex items-center gap-2 rounded-full border border-amber-400/80 bg-white/90 px-4 py-1.5 text-xs sm:text-sm font-bold text-[#3D1C06] shadow-sm transition-all duration-200 hover:bg-white hover:shadow-md hover:scale-[1.03] cursor-pointer"
                aria-label="Menú de usuario"
              >
                <svg className="h-4 w-4 text-[#3D1C06]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
                <span className="max-w-[120px] truncate sm:max-w-[160px]">
                  {nombreMostrado}
                </span>
                <svg
                  className={`h-3.5 w-3.5 text-[#3D1C06]/70 transition-transform duration-200 ${
                    menuAbierto ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Menu desplegable de 3 opciones */}
              {menuAbierto && (
                <div className="absolute right-0 mt-2.5 w-52 rounded-2xl border border-amber-200 bg-white p-2 text-xs sm:text-sm text-[#3D1C06] shadow-xl z-50">
                  <div className="border-b border-amber-100 px-3 py-2">
                    <p className="font-bold text-sm text-[#3D1C06] truncate">
                      {nombreMostrado}
                    </p>
                    <p className="text-[11px] font-medium text-[#3D1C06]/70">
                      {usuario.isOwner || usuario.esSuperAdmin
                        ? "Super Administrador"
                        : "Administrador"}
                    </p>
                  </div>

                  <div className="mt-1 flex flex-col gap-0.5">
                    {/* 1. Cuenta */}
                    <button
                      type="button"
                      onClick={() => {
                        setMenuAbierto(false);
                        navigate("/admin/usuarios");
                      }}
                      className="flex items-center gap-2.5 w-full rounded-xl px-3 py-2 text-left font-semibold text-[#3D1C06] transition hover:bg-amber-50 cursor-pointer"
                    >
                      <span className="text-base">👤</span>
                      <span>Cuenta</span>
                    </button>

                    {/* 2. Panel de administrador */}
                    <button
                      type="button"
                      onClick={() => {
                        setMenuAbierto(false);
                        navigate("/admin");
                      }}
                      className="flex items-center gap-2.5 w-full rounded-xl px-3 py-2 text-left font-semibold text-[#3D1C06] transition hover:bg-amber-50 cursor-pointer"
                    >
                      <span className="text-base">⚙️</span>
                      <span>Panel de administrador</span>
                    </button>

                    {/* 3. Cerrar sesion */}
                    <button
                      type="button"
                      onClick={() => {
                        setMenuAbierto(false);
                        if (onCerrarSesion) onCerrarSesion();
                      }}
                      className="flex items-center gap-2.5 w-full rounded-xl px-3 py-2 text-left font-semibold text-red-600 transition hover:bg-red-50 mt-1 border-t border-amber-100/60 pt-2 cursor-pointer"
                    >
                      <span className="text-base">🚪</span>
                      <span>Cerrar sesión</span>
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;

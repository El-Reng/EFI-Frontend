import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar({ usuarioActual: propUsuario, onCerrarSesion: propLogout }) {
  const navigate = useNavigate();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [menuMovil, setMenuMovil] = useState(false);
  const menuRef = useRef(null);

  const auth = useAuth();
  const usuario = propUsuario || auth?.usuario;
  const onCerrarSesion = propLogout || auth?.logout;

  // Cerramos el menu de usuario al hacer clic afuera
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
        ? "underline underline-offset-8 decoration-2 decoration-pan-marron font-bold"
        : "font-semibold"
    }`;

  const estiloLinkMovil = ({ isActive }) =>
    `block rounded-xl px-4 py-2.5 text-base font-semibold transition ${
      isActive
        ? "bg-pan-marron/10 font-bold underline underline-offset-4"
        : "hover:bg-pan-marron/5"
    }`;

  const nombreMostrado =
    usuario?.username ||
    usuario?.nombre ||
    (typeof usuario === "string" ? usuario : "Mi cuenta");

  function cerrarTodo() {
    setMenuAbierto(false);
    setMenuMovil(false);
  }

  return (
    <header className="sticky top-0 z-40 bg-pan-amarillo bg-patron-invertido text-pan-marron shadow-md border-b border-amber-400/60">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        {/* Logotipo con Icono de Panadería */}
        <Link
          to="/"
          onClick={cerrarTodo}
          className="font-serif text-2xl sm:text-3xl font-bold tracking-wide transition hover:opacity-85 flex items-center gap-2"
        >
          <span className="text-2xl leading-none">🥖</span>
          <span>Panadería</span>
        </Link>

        {/* Links Desktop (md y superior) */}
        <ul className="hidden md:flex items-center gap-7 text-base">
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

        {/* Contenedor derecho: Boton de Usuario + Hamburguesa en mobile */}
        <div className="flex items-center gap-3">
          {/* Boton Pill de Usuario / Login (visible en desktop y mobile) */}
          <div className="relative" ref={menuRef}>
            {!usuario ? (
              <button
                type="button"
                onClick={() => {
                  cerrarTodo();
                  navigate("/login");
                }}
                className="flex items-center gap-2 rounded-full border border-amber-400/80 bg-white/90 px-3.5 py-1.5 text-xs sm:text-sm font-bold text-pan-marron shadow-sm transition-all duration-200 hover:bg-white hover:shadow-md hover:scale-[1.03] cursor-pointer"
                aria-label="Iniciar sesión"
              >
                <svg
                  className="h-4 w-4 text-pan-marron"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span>Iniciar sesión</span>
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setMenuAbierto(!menuAbierto)}
                  className="flex items-center gap-2 rounded-full border border-amber-400/80 bg-white/90 px-3.5 py-1.5 text-xs sm:text-sm font-bold text-pan-marron shadow-sm transition-all duration-200 hover:bg-white hover:shadow-md hover:scale-[1.03] cursor-pointer"
                  aria-label="Menú de usuario"
                >
                  <svg
                    className="h-4 w-4 text-pan-marron"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span className="max-w-[100px] truncate sm:max-w-[150px]">
                    {nombreMostrado}
                  </span>
                  <svg
                    className={`h-3.5 w-3.5 text-pan-marron/70 transition-transform duration-200 ${
                      menuAbierto ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown del usuario */}
                {menuAbierto && (
                  <div className="absolute right-0 mt-2.5 w-52 rounded-2xl border border-amber-200 bg-white p-2 text-xs sm:text-sm text-pan-marron shadow-xl z-50 animate-in fade-in zoom-in-95">
                    <div className="border-b border-amber-100 px-3 py-2">
                      <p className="font-bold text-sm text-pan-marron truncate">
                        {nombreMostrado}
                      </p>
                      <p className="text-[11px] font-medium text-pan-marron/70">
                        {usuario.isOwner || usuario.esSuperAdmin
                          ? "Super Administrador"
                          : "Administrador"}
                      </p>
                    </div>

                    <div className="mt-1 flex flex-col gap-0.5">
                      <button
                        type="button"
                        onClick={() => {
                          cerrarTodo();
                          navigate("/admin/usuarios");
                        }}
                        className="flex items-center gap-2.5 w-full rounded-xl px-3 py-2 text-left font-semibold text-pan-marron transition hover:bg-amber-50 cursor-pointer"
                      >
                        <svg
                          className="h-4 w-4 text-amber-700"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        <span>Cuenta</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          cerrarTodo();
                          navigate("/admin");
                        }}
                        className="flex items-center gap-2.5 w-full rounded-xl px-3 py-2 text-left font-semibold text-pan-marron transition hover:bg-amber-50 cursor-pointer"
                      >
                        <span className="text-sm leading-none">⚙️</span>
                        <span>Panel de administrador</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          cerrarTodo();
                          if (onCerrarSesion) onCerrarSesion();
                        }}
                        className="flex items-center gap-2.5 w-full rounded-xl px-3 py-2 text-left font-semibold text-red-600 transition hover:bg-red-50 mt-1 border-t border-amber-100/60 pt-2 cursor-pointer"
                      >
                        <span className="text-sm leading-none">🚪</span>
                        <span>Cerrar sesión</span>
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Boton Hamburguesa (solo visible en pantallas pequeñas) */}
          <button
            type="button"
            onClick={() => setMenuMovil(!menuMovil)}
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-xl bg-white/80 text-pan-marron shadow-xs transition hover:bg-white cursor-pointer"
            aria-label={menuMovil ? "Cerrar menú" : "Abrir menú"}
          >
            {menuMovil ? (
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Menu Desplegable Mobile */}
      {menuMovil && (
        <div className="md:hidden border-t border-amber-400/50 bg-pan-amarillo/95 backdrop-blur-xs px-4 py-3 shadow-lg">
          <ul className="flex flex-col gap-1 text-base">
            <li>
              <NavLink
                to="/"
                end
                onClick={() => setMenuMovil(false)}
                className={estiloLinkMovil}
              >
                Inicio
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/productos"
                onClick={() => setMenuMovil(false)}
                className={estiloLinkMovil}
              >
                Productos
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/categorias"
                onClick={() => setMenuMovil(false)}
                className={estiloLinkMovil}
              >
                Categorías
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/nosotros"
                onClick={() => setMenuMovil(false)}
                className={estiloLinkMovil}
              >
                Nosotros
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

export default Navbar;

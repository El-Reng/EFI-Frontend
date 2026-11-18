import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { usuario, isOwner, logout } = useAuth();

  const [menuAbierto, setMenuAbierto] = useState(false);
  const [menuMovil, setMenuMovil] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuAbierto(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMenuAbierto(false);
    setMenuMovil(false);
  }, [location.pathname]);

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

  const nombreMostrado = usuario?.username || "Mi cuenta";

  function cerrarTodo() {
    setMenuAbierto(false);
    setMenuMovil(false);
  }

  function irAlLogin() {
    cerrarTodo();
    navigate("/login", {
      state: { from: location },
    });
  }

  function cerrarSesion() {
    cerrarTodo();
    logout();
    navigate("/");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-amber-400/60 bg-pan-amarillo bg-patron-invertido text-pan-marron shadow-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link
          to="/"
          onClick={cerrarTodo}
          className="flex items-center gap-2 font-serif text-2xl font-bold tracking-wide transition hover:opacity-85 sm:text-3xl"
        >
          <span className="text-2xl leading-none">🥖</span>
          <span>Panadería</span>
        </Link>

        <ul className="hidden items-center gap-7 text-base md:flex">
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

        <div className="flex items-center gap-3">
          <div className="relative" ref={menuRef}>
            {!usuario ? (
              <button
                type="button"
                onClick={irAlLogin}
                className="flex cursor-pointer items-center gap-2 rounded-full border border-amber-400/80 bg-white/90 px-3.5 py-1.5 text-xs font-bold text-pan-marron shadow-sm transition-all hover:scale-[1.03] hover:bg-white hover:shadow-md sm:text-sm"
              >
                <span>Iniciar sesión</span>
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setMenuAbierto(!menuAbierto)}
                  className="flex items-center gap-2 rounded-full border border-amber-400/80 bg-white/90 px-3.5 py-1.5 text-xs sm:text-sm font-bold text-pan-marron shadow-sm transition-all duration-200 hover:bg-white hover:shadow-md hover:scale-[1.03] cursor-pointer"
                  aria-label="Menú de usuario"
                  aria-expanded={menuAbierto}
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

                {menuAbierto && (
                  <div className="absolute right-0 z-50 mt-2.5 w-56 animate-in rounded-2xl border border-amber-200 bg-white p-2 text-sm text-pan-marron shadow-xl">
                    <div className="border-b border-amber-100 px-3 py-2">
                      <p className="truncate font-bold">{nombreMostrado}</p>
                      <p className="text-xs text-pan-marron/70">
                        {isOwner ? "Propietario" : "Administrador"}
                      </p>
                    </div>

                    <div className="mt-1 flex flex-col gap-0.5">
                      <button
                        type="button"
                        onClick={() => {
                          cerrarTodo();
                          navigate("/cuenta");
                        }}
                        className="w-full cursor-pointer rounded-xl px-3 py-2 text-left font-semibold transition hover:bg-amber-50"
                      >
                        Mi cuenta
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          cerrarTodo();
                          navigate("/admin");
                        }}
                        className="w-full cursor-pointer rounded-xl px-3 py-2 text-left font-semibold transition hover:bg-amber-50"
                      >
                        Panel de administración
                      </button>

                      <button
                        type="button"
                        onClick={cerrarSesion}
                        className="mt-1 w-full cursor-pointer border-t border-amber-100/60 px-3 pt-2 text-left font-semibold text-red-600 transition hover:bg-red-50"
                      >
                        Cerrar sesión
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMenuMovil(!menuMovil)}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl bg-white/80 text-pan-marron shadow-xs transition hover:bg-white md:hidden"
            aria-label={menuMovil ? "Cerrar menú" : "Abrir menú"}
          >
            {menuMovil ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {menuMovil && (
        <div className="border-t border-amber-400/50 bg-pan-amarillo/95 px-4 py-3 shadow-lg backdrop-blur-xs md:hidden">
          <ul className="flex flex-col gap-1 text-base">
            <li>
              <NavLink to="/" end className={estiloLinkMovil}>
                Inicio
              </NavLink>
            </li>
            <li>
              <NavLink to="/productos" className={estiloLinkMovil}>
                Productos
              </NavLink>
            </li>
            <li>
              <NavLink to="/categorias" className={estiloLinkMovil}>
                Categorías
              </NavLink>
            </li>
            <li>
              <NavLink to="/nosotros" className={estiloLinkMovil}>
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

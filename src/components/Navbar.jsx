import { Link, NavLink } from "react-router-dom";

function Navbar() {
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

          <li>
            <NavLink to="/login" className={estiloLink}>
              Ingresar
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;

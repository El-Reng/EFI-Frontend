function Navbar({ paginaActual, onNavegar, esAdmin, onCerrarSesion }) {
  const handleNav = (pagina, e) => {
    if (onNavegar) {
      e.preventDefault()
      onNavegar(pagina)
    }
  }

  return (
    <header className="sticky top-0 z-20 bg-marca text-texto-acento shadow-sm">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
        <a
          href="/"
          onClick={(e) => handleNav('home', e)}
          className="font-titulo text-2xl font-bold tracking-tight hover:opacity-90"
        >
          🥖 Panadería
        </a>
        <ul className="flex gap-6 font-semibold">
          <li>
            <a
              href="/"
              onClick={(e) => handleNav('home', e)}
              className={`hover:underline ${
                paginaActual === 'home' ? 'underline underline-offset-4 font-bold' : ''
              }`}
            >
              Inicio
            </a>
          </li>
          <li>
            <a
              href="/catalogo"
              onClick={(e) => handleNav('catalogo', e)}
              className={`hover:underline ${
                paginaActual === 'catalogo' ? 'underline underline-offset-4 font-bold' : ''
              }`}
            >
              Catálogo
            </a>
          </li>
          <li>
            <a
              href="/nosotros"
              onClick={(e) => handleNav('nosotros', e)}
              className={`hover:underline ${
                paginaActual === 'nosotros' ? 'underline underline-offset-4 font-bold' : ''
              }`}
            >
              Nosotros
            </a>
          </li>

                    {/* pestana de admin que solo se ve si entro con la clave */}
          {esAdmin && (
            <li>
              <a
                href="/admin"
                onClick={(e) => handleNav('admin', e)}
                className={`rounded bg-acento px-2 py-1 font-bold ${
                  paginaActual === 'admin' ? 'ring-2 ring-borde' : ''
                }`}
              >
                🛠️ Admin
              </a>
            </li>
          )}

          {/* boton para ingresar o salir */}
          <li>
            {esAdmin ? (
              <button
                type="button"
                onClick={onCerrarSesion}
                className="text-xs underline opacity-80 hover:opacity-100"
              >
                Cerrar sesión
              </button>
            ) : (
              <a
                href="/login"
                onClick={(e) => handleNav('login', e)}
                className="hover:underline opacity-90"
              >
                Ingresar
              </a>
            )}
          </li>

        </ul>
      </nav>
    </header>
  )
}

export default Navbar

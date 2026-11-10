function Navbar() {
  return (
    <header className="bg-marca text-texto-acento">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
        <a href="/" className="font-titulo text-2xl font-bold">
          Panadería
        </a>
        <ul className="flex gap-6 font-semibold">
          <li><a href="/" className="hover:underline">Inicio</a></li>
          <li><a href="/catalogo" className="hover:underline">Catálogo</a></li>
          <li><a href="/nosotros" className="hover:underline">Nosotros</a></li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
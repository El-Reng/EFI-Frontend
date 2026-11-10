function Footer() {
  return (
    <footer className="mt-12 bg-marca text-texto-acento">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:grid-cols-3">
        <div>
          <p className="font-titulo text-xl font-bold">Panadería</p>
          <p className="mt-2 text-sm">Pan casero hecho todos los días.</p>
        </div>
        <div className="text-sm">
          <p className="font-semibold">Horarios</p>
          <p className="mt-2">Lunes a sábado, 7 a 20 hs</p>
        </div>
        <div className="text-sm">
          <p className="font-semibold">Contacto</p>
          <p className="mt-2">Dirección y teléfono acá</p>
        </div>
      </div>
      <p className="border-t-2 border-borde py-3 text-center text-xs">
        © 2026 Panadería. Todos los derechos reservados.
      </p>
    </footer>
  )
}

export default Footer
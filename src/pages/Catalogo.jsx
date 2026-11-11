import { useState } from 'react'
import ProductCard from '../components/ProductCard'
import { productos, categorias } from '../data/productos'

function Catalogo({ onVerDetalle, onAgregar }) {
  const [categoriaActual, setCategoriaActual] = useState('Todos')
  const [busqueda, setBusqueda] = useState('')
  const [paginaActual, setPaginaActual] = useState(1)
  const productosPorPagina = 6

  // Filtrado por categoría y búsqueda
  const productosFiltrados = productos.filter((prod) => {
    const coincideCategoria =
      categoriaActual === 'Todos' || prod.categoria === categoriaActual
    const coincideBusqueda =
      prod.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      prod.descripcion.toLowerCase().includes(busqueda.toLowerCase())
    return coincideCategoria && coincideBusqueda
  })

  // Paginación
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina) || 1
  const indiceInicio = (paginaActual - 1) * productosPorPagina
  const productosPaginados = productosFiltrados.slice(
    indiceInicio,
    indiceInicio + productosPorPagina
  )

  const cambiarCategoria = (cat) => {
    setCategoriaActual(cat)
    setPaginaActual(1)
  }

  const cambiarBusqueda = (e) => {
    setBusqueda(e.target.value)
    setPaginaActual(1)
  }

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
      {/* Encabezado */}
      <header className="mb-8">
        <h1 className="font-titulo text-3xl font-bold sm:text-4xl">
          Nuestro Catálogo
        </h1>
        <p className="mt-2 text-base opacity-90">
          Descubrí todas nuestras delicias recién salidas del horno.
        </p>
      </header>

      {/* Barra de Filtros y Búsqueda */}
      <section className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Categorías (Pills) */}
        <div className="flex flex-wrap gap-2">
          {categorias.map((cat) => {
            const estaActiva = cat === categoriaActual
            return (
              <button
                key={cat}
                type="button"
                onClick={() => cambiarCategoria(cat)}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-all border-2 ${
                  estaActiva
                    ? 'border-borde bg-acento text-texto-acento shadow-sm'
                    : 'border-borde/40 bg-superficie hover:border-borde'
                }`}
              >
                {cat}
              </button>
            )
          })}
        </div>

        {/* Buscador */}
        <div className="sm:w-64">
          <input
            type="text"
            value={busqueda}
            onChange={cambiarBusqueda}
            placeholder="Buscar producto..."
            className="w-full rounded-lg border-2 border-borde bg-superficie px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-acento"
          />
        </div>
      </section>

      {/* Grid de Productos */}
      {productosFiltrados.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-borde p-12 text-center bg-superficie/50">
          <p className="text-lg font-semibold">No encontramos productos que coincidan.</p>
          <p className="mt-1 text-sm opacity-80">Probá buscando con otro nombre o cambiando de categoría.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {productosPaginados.map((p) => (
            <ProductCard
              key={p.id}
              {...p}
              onVerDetalle={onVerDetalle}
              onAgregar={() => onAgregar?.(p)}
            />
          ))}
        </div>
      )}

      {/* Controles de Paginación */}
      {totalPaginas > 1 && (
        <nav
          aria-label="Paginación del catálogo"
          className="mt-10 flex flex-wrap items-center justify-center gap-2"
        >
          {/* Botón Anterior */}
          <button
            type="button"
            onClick={() => setPaginaActual((prev) => Math.max(prev - 1, 1))}
            disabled={paginaActual === 1}
            className="rounded-lg border-2 border-borde bg-superficie px-4 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40 hover:not-disabled:bg-marca/20"
          >
            ← Anterior
          </button>

          {/* Números de página */}
          <div className="flex gap-1">
            {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((num) => {
              const esPaginaActual = num === paginaActual
              return (
                <button
                  key={num}
                  type="button"
                  onClick={() => setPaginaActual(num)}
                  aria-current={esPaginaActual ? 'page' : undefined}
                  className={`h-9 w-9 rounded-lg border-2 text-sm font-bold transition-all ${
                    esPaginaActual
                      ? 'border-borde bg-acento text-texto-acento'
                      : 'border-borde/40 bg-superficie hover:border-borde'
                  }`}
                >
                  {num}
                </button>
              )
            })}
          </div>

          {/* Botón Siguiente */}
          <button
            type="button"
            onClick={() => setPaginaActual((prev) => Math.min(prev + 1, totalPaginas))}
            disabled={paginaActual === totalPaginas}
            className="rounded-lg border-2 border-borde bg-superficie px-4 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40 hover:not-disabled:bg-marca/20"
          >
            Siguiente →
          </button>
        </nav>
      )}
    </main>
  )
}

export default Catalogo

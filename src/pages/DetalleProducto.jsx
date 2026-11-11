import { useState } from 'react'
import { productos } from '../data/productos'

function DetalleProducto({ productoId, onVolver, onAgregar }) {
  const [cantidad, setCantidad] = useState(1)
  const [mensajeExito, setMensajeExito] = useState(false)

  const producto = productos.find((p) => p.id === Number(productoId))

  if (!producto) {
    return (
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-16 text-center">
        <h2 className="font-titulo text-2xl font-bold">Producto no encontrado</h2>
        <p className="mt-2 text-sm opacity-80">El producto solicitado no existe o fue retirado del catálogo.</p>
        <button
          type="button"
          onClick={onVolver}
          className="mt-6 rounded-lg border-2 border-borde bg-acento px-5 py-2 font-semibold text-texto-acento"
        >
          ← Volver al catálogo
        </button>
      </main>
    )
  }

  const incrementar = () => setCantidad((prev) => prev + 1)
  const decrementar = () => setCantidad((prev) => Math.max(1, prev - 1))

  const handleAgregar = () => {
    onAgregar?.({ ...producto, cantidad })
    setMensajeExito(true)
    setTimeout(() => setMensajeExito(false), 3000)
  }

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
      {/* Botón Volver */}
      <button
        type="button"
        onClick={onVolver}
        className="mb-6 inline-flex items-center gap-2 rounded-lg border-2 border-borde bg-superficie px-4 py-1.5 text-sm font-semibold transition-colors hover:bg-marca/20"
      >
        ← Volver al catálogo
      </button>

      {/* Contenedor Detalle */}
      <article className="grid gap-8 rounded-2xl border-2 border-borde bg-superficie p-6 shadow-sm md:grid-cols-2 lg:p-10">
        {/* Imagen o Placeholder */}
        <div className="flex items-center justify-center overflow-hidden rounded-xl border-2 border-borde bg-marca/20">
          {producto.imagen ? (
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="aspect-square h-full w-full object-cover"
            />
          ) : (
            <div className="flex aspect-square h-full w-full flex-col items-center justify-center p-8 text-center text-texto-acento">
              <span className="text-6xl">🥐</span>
              <span className="mt-3 font-titulo text-lg font-bold">Panadería Artesanal</span>
            </div>
          )}
        </div>

        {/* Información del Producto */}
        <div className="flex flex-col justify-between">
          <div>
            {producto.categoria && (
              <span className="inline-block rounded-md border border-borde bg-marca/40 px-3 py-1 text-xs font-bold uppercase tracking-wider text-texto-acento">
                {producto.categoria}
              </span>
            )}

            <h1 className="mt-3 font-titulo text-3xl font-bold sm:text-4xl">
              {producto.nombre}
            </h1>

            <p className="mt-4 text-3xl font-bold text-acento">
              ${Number(producto.precio).toLocaleString('es-AR')}
            </p>

            <div className="mt-4 border-t-2 border-borde/30 pt-4">
              <h2 className="text-sm font-bold uppercase tracking-wider opacity-80">Descripción</h2>
              <p className="mt-2 text-base leading-relaxed opacity-90">
                {producto.descripcion}
              </p>
            </div>

            {producto.ingredientes && (
              <div className="mt-4 rounded-xl border-2 border-borde/40 bg-fondo/50 p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider opacity-80">
                  Ingredientes seleccionados
                </h3>
                <p className="mt-1 text-sm opacity-90">
                  {producto.ingredientes}
                </p>
              </div>
            )}
          </div>

          {/* Acciones de compra */}
          <div className="mt-8 border-t-2 border-borde/30 pt-6">
            <div className="flex flex-wrap items-center gap-4">
              {/* Selector de cantidad */}
              <div className="flex items-center rounded-lg border-2 border-borde bg-fondo">
                <button
                  type="button"
                  onClick={decrementar}
                  className="px-3 py-2 text-lg font-bold hover:bg-marca/30 transition-colors"
                  aria-label="Disminuir cantidad"
                >
                  −
                </button>
                <span className="w-12 text-center font-bold">{cantidad}</span>
                <button
                  type="button"
                  onClick={incrementar}
                  className="px-3 py-2 text-lg font-bold hover:bg-marca/30 transition-colors"
                  aria-label="Aumentar cantidad"
                >
                  +
                </button>
              </div>

              {/* Botón Agregar */}
              <button
                type="button"
                onClick={handleAgregar}
                className="flex-1 rounded-lg border-2 border-borde bg-acento px-6 py-3 font-bold text-texto-acento transition-all hover:brightness-95 active:scale-95"
              >
                Agregar al carrito ({cantidad})
              </button>
            </div>

            {/* Aviso de confirmación */}
            {mensajeExito && (
              <div className="mt-3 rounded-lg border-2 border-green-600 bg-green-100 p-2 text-center text-sm font-semibold text-green-900 animate-fade-in dark:bg-green-950 dark:text-green-200">
                ✓ ¡{cantidad} {cantidad === 1 ? 'unidad agregada' : 'unidades agregadas'} al carrito!
              </div>
            )}
          </div>
        </div>
      </article>
    </main>
  )
}

export default DetalleProducto

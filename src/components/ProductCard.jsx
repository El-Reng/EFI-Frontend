function ProductCard({ id, nombre, descripcion, precio, categoria, imagen, onAgregar, onVerDetalle }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border-2 border-borde bg-superficie shadow-sm transition-all hover:-translate-y-0.5">
      <div
        onClick={() => onVerDetalle?.(id)}
        className={`relative ${onVerDetalle ? 'cursor-pointer' : ''}`}
      >
        {imagen ? (
          <img src={imagen} alt={nombre} className="aspect-square w-full object-cover" />
        ) : (
          <div className="flex aspect-square w-full items-center justify-center bg-marca/30 text-texto-acento font-semibold text-base sm:text-lg">
            🥖 Sin imagen
          </div>
        )}
        {categoria && (
          <span className="absolute top-2 left-2 rounded-md bg-superficie/90 px-2 py-0.5 text-xs font-bold text-texto-acento border border-borde">
            {categoria}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3
          onClick={() => onVerDetalle?.(id)}
          className={`font-titulo text-xl font-bold ${onVerDetalle ? 'cursor-pointer hover:underline' : ''}`}
        >
          {nombre}
        </h3>
        <p className="mt-1 flex-1 text-sm opacity-85 line-clamp-2">{descripcion}</p>
        <p className="mt-3 text-lg font-bold">
          ${Number(precio).toLocaleString('es-AR')}
        </p>

        <div className="mt-4 flex gap-2">
          {onVerDetalle && (
            <button
              type="button"
              onClick={() => onVerDetalle(id)}
              className="flex-1 rounded-lg border-2 border-borde px-3 py-2 text-sm font-semibold hover:bg-marca/20 transition-colors"
            >
              Ver detalle
            </button>
          )}
          <button
            type="button"
            onClick={onAgregar}
            className="flex-1 rounded-lg border-2 border-borde bg-acento px-3 py-2 text-sm font-semibold text-texto-acento hover:brightness-95 transition-all"
          >
            Agregar
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard

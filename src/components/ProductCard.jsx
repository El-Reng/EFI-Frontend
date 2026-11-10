function ProductCard({ nombre, descripcion, precio, imagen, onAgregar }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border-2 border-borde bg-superficie">
      {imagen ? (
        <img src={imagen} alt={nombre} className="aspect-square w-full object-cover" />
      ) : (
        <div className="flex aspect-square w-full items-center justify-center bg-marca text-texto-acento">
          Sin imagen
        </div>
      )}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-titulo text-xl font-bold">{nombre}</h3>
        <p className="mt-1 flex-1 text-sm">{descripcion}</p>
        <p className="mt-3 text-lg font-bold">
          ${Number(precio).toLocaleString('es-AR')}
        </p>
        <button
          onClick={onAgregar}
          className="mt-3 rounded-lg border-2 border-borde bg-acento px-4 py-2 font-semibold text-texto-acento hover:brightness-95"
        >
          Agregar al carrito
        </button>
      </div>
    </article>
  )
}

export default ProductCard
function ProductCard({
  id,
  name,
  description,
  price,
  category,
  imageUrl,
  onVerDetalle,
}) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border-2 border-amber-200 bg-white shadow-sm transition-all hover:-translate-y-0.5">
      <button
        type="button"
        onClick={() => onVerDetalle(id)}
        className="relative flex aspect-square w-full items-center justify-center overflow-hidden bg-amber-100 text-base font-semibold text-amber-950 sm:text-lg"
        aria-label={`Ver ${name}`}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="h-full w-full object-cover"
          />
        ) : (
          <span>🥖 Sin imagen</span>
        )}

        {category && (
          <span className="absolute left-2 top-2 rounded-md border border-amber-300 bg-white/90 px-2 py-0.5 text-xs font-bold text-amber-900">
            {category}
          </span>
        )}
      </button>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-serif text-xl font-bold">{name}</h3>

        <p className="mt-1 flex-1 text-sm opacity-85 line-clamp-2">
          {description || "Sin descripción disponible."}
        </p>

        <p className="mt-3 text-lg font-bold">
          ${Number(price).toLocaleString("es-AR")}
        </p>

        <button
          type="button"
          onClick={() => onVerDetalle(id)}
          className="mt-4 w-full rounded-lg border-2 border-amber-600 bg-amber-500 px-3 py-2 text-sm font-bold text-white transition-all hover:bg-amber-600"
        >
          Ver detalle
        </button>
      </div>
    </article>
  );
}

export default ProductCard;

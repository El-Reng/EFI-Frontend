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
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-amber-200/90 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <button
        type="button"
        onClick={() => onVerDetalle(id)}
        className="relative flex aspect-4/3 w-full items-center justify-center overflow-hidden bg-amber-50/70 text-base font-semibold text-amber-950 sm:text-lg cursor-pointer"
        aria-label={`Ver ${name}`}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex flex-col items-center gap-1 text-pan-marron/40">
            <span className="text-5xl">🥖</span>
            <span className="text-xs font-semibold">Sin imagen</span>
          </div>
        )}

        {category && (
          <span className="absolute left-3 top-3 rounded-full bg-pan-amarillo-claro px-3 py-1 text-xs font-semibold text-pan-marron shadow-xs">
            {category}
          </span>
        )}
      </button>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-serif text-xl font-bold text-pan-marron">{name}</h3>

        <p className="mt-1 flex-1 text-sm text-gray-500 line-clamp-2">
          {description || "Pan tradicional recién horneado."}
        </p>

        <div className="mt-4 flex items-center justify-between pt-2 border-t border-amber-100/60">
          <span className="text-lg font-bold text-pan-marron">
            ${Number(price).toLocaleString("es-AR")}
          </span>

          <button
            type="button"
            onClick={() => onVerDetalle(id)}
            className="rounded-xl bg-pan-naranja px-4 py-2 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-pan-naranja-hover hover:shadow-md hover:scale-[1.02] cursor-pointer"
          >
            Ver detalle
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;

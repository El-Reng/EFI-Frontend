function AdminCategorias() {
  return (
    <div className="space-y-6">
      {/* Cabecera de la seccion */}
      <div className="border-b border-amber-200/80 pb-4">
        <h2 className="font-serif text-2xl font-bold text-pan-marron tracking-tight">
          Administración de Categorías
        </h2>
        <p className="text-sm text-pan-marron/75 mt-1">
          Gestioná las categorías visibles en la tienda.
        </p>
      </div>

      {/* Formulario de creacion con sombra */}
      <div className="rounded-2xl border border-amber-200/90 bg-white p-6 shadow-md">
        <h3 className="text-xs font-bold text-pan-marron/80 uppercase tracking-wider mb-4">
          Nueva Categoría
        </h3>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col sm:flex-row gap-3"
        >
          <input
            type="text"
            placeholder="Nombre de la categoría (ej: Medialunas)"
            className="flex-1 rounded-xl border border-amber-200 bg-amber-50/30 px-3.5 py-2 text-sm text-pan-marron placeholder-pan-marron/40 focus:border-pan-naranja focus:outline-none"
            disabled
          />
          <button
            type="button"
            className="rounded-xl bg-pan-naranja px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-pan-naranja-hover hover:shadow-md disabled:opacity-50"
            disabled
          >
            Agregar categoría
          </button>
        </form>
        <span className="text-xs text-pan-marron/50 mt-2 block font-medium">
          * Formulario deshabilitado hasta conexión con la API
        </span>
      </div>

      {/* Lista esqueleto de categorias */}
      <div className="rounded-2xl border border-amber-200/90 bg-white overflow-hidden shadow-md">
        <div className="px-6 py-4 border-b border-amber-100 bg-amber-50/50">
          <h3 className="text-sm font-bold text-pan-marron">
            Categorías registradas
          </h3>
        </div>

        <div className="p-8 text-center text-pan-marron/60">
          <p className="text-sm">
            Estructura lista para conectar la lista de categorías desde el
            backend.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminCategorias;

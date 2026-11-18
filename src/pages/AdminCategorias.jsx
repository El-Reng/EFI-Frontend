function AdminCategorias() {
  return (
    <div className="space-y-6">
      {/* cabecera de la seccion */}
      <div className="border-b border-stone-200 pb-4">
        <h2 className="text-xl font-bold text-stone-900 tracking-tight">
          Administración de Categorías
        </h2>
        <p className="text-sm text-stone-500 mt-1">
          Gestioná las categorías visibles en la tienda.
        </p>
      </div>

      {/* formulario de creacion */}
      <div className="rounded-lg border border-stone-200 bg-white p-5 shadow-xs">
        <h3 className="text-sm font-semibold text-stone-800 uppercase tracking-wider mb-4">
          Nueva Categoría
        </h3>
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Nombre de la categoría (ej: Medialunas)"
            className="flex-1 rounded border border-stone-300 px-3 py-2 text-sm text-stone-800 placeholder-stone-400 focus:border-stone-500 focus:outline-none"
            disabled
          />
          <button
            type="button"
            className="rounded bg-stone-800 px-4 py-2 text-sm font-medium text-white hover:bg-stone-700 transition-colors disabled:opacity-50"
            disabled
          >
            Agregar categoría
          </button>
        </form>
        <span className="text-xs text-stone-400 mt-2 block">
          formulario deshabilitado hasta conexion con la api
        </span>
      </div>

      {/* lista esqueleto de categorias */}
      <div className="rounded-lg border border-stone-200 bg-white overflow-hidden shadow-xs">
        <div className="px-5 py-4 border-b border-stone-200 bg-stone-50">
          <h3 className="text-sm font-semibold text-stone-800">
            Categorías registradas
          </h3>
        </div>

        <div className="p-8 text-center text-stone-500">
          <p className="text-sm">
            Estructura lista para que Gabi conecte la lista desde el backend.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminCategorias;
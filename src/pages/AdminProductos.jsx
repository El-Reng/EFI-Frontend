function AdminProductos() {
  return (
    <div className="space-y-6">
      {/* cabecera de la seccion */}
      <div className="border-b border-stone-200 pb-4">
        <h2 className="text-xl font-bold text-stone-900 tracking-tight">
          Administración de Productos
        </h2>
        <p className="text-sm text-stone-500 mt-1">
          Creá, editá y gestioná el catálogo de productos de la panadería.
        </p>
      </div>

      {/* formulario de creacion de producto */}
      <div className="rounded-lg border border-stone-200 bg-white p-5 shadow-xs">
        <h3 className="text-sm font-semibold text-stone-800 uppercase tracking-wider mb-4">
          Nuevo Producto
        </h3>

        <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">
              Nombre del producto
            </label>
            <input
              type="text"
              placeholder="Ej: Medialuna de manteca"
              className="w-full rounded border border-stone-300 px-3 py-2 text-sm text-stone-800 placeholder-stone-400 focus:border-stone-500 focus:outline-none"
              disabled
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">
              Precio ($)
            </label>
            <input
              type="number"
              placeholder="Ej: 1500"
              className="w-full rounded border border-stone-300 px-3 py-2 text-sm text-stone-800 placeholder-stone-400 focus:border-stone-500 focus:outline-none"
              disabled
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">
              Categoría
            </label>
            <select
              className="w-full rounded border border-stone-300 px-3 py-2 text-sm text-stone-800 focus:border-stone-500 focus:outline-none"
              disabled
            >
              <option>Seleccionar categoría...</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">
              URL de la imagen
            </label>
            <input
              type="text"
              placeholder="https://ejemplo.com/imagen.jpg"
              className="w-full rounded border border-stone-300 px-3 py-2 text-sm text-stone-800 placeholder-stone-400 focus:border-stone-500 focus:outline-none"
              disabled
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">
              Descripción
            </label>
            <textarea
              rows="3"
              placeholder="Detalles sobre los ingredientes o presentación..."
              className="w-full rounded border border-stone-300 px-3 py-2 text-sm text-stone-800 placeholder-stone-400 focus:border-stone-500 focus:outline-none"
              disabled
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="button"
              className="rounded bg-stone-800 px-4 py-2 text-sm font-medium text-white hover:bg-stone-700 transition-colors disabled:opacity-50"
              disabled
            >
              Guardar producto
            </button>
            <span className="text-xs text-stone-400 mt-2 block">
              formulario deshabilitado hasta conexion con la api
            </span>
          </div>
        </form>
      </div>

      {/* tabla o lista esqueleto de productos existentes */}
      <div className="rounded-lg border border-stone-200 bg-white overflow-hidden shadow-xs">
        <div className="px-5 py-4 border-b border-stone-200 bg-stone-50">
          <h3 className="text-sm font-semibold text-stone-800">
            Productos registrados
          </h3>
        </div>

        <div className="p-8 text-center text-stone-500">
          <p className="text-sm">
            Estructura lista para que Gabi conecte la tabla de productos desde la API.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminProductos;
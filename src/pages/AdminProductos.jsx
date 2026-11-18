function AdminProductos() {
  return (
    <div className="space-y-6">
      {/* Cabecera de la seccion */}
      <div className="border-b border-amber-200/80 pb-4">
        <h2 className="font-serif text-2xl font-bold text-[#3D1C06] tracking-tight">
          Administración de Productos
        </h2>
        <p className="text-sm text-[#3D1C06]/75 mt-1">
          Creá, editá y gestioná el catálogo de productos de la panadería.
        </p>
      </div>

      {/* Formulario de creacion de producto con sombra */}
      <div className="rounded-2xl border border-amber-200/90 bg-white p-6 shadow-md">
        <h3 className="text-xs font-bold text-[#3D1C06]/80 uppercase tracking-wider mb-4">
          Nuevo Producto
        </h3>

        <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#3D1C06] uppercase mb-1">
              Nombre del producto
            </label>
            <input
              type="text"
              placeholder="Ej: Medialuna de manteca"
              className="w-full rounded-xl border border-amber-200 bg-amber-50/30 px-3.5 py-2 text-sm text-[#3D1C06] placeholder-[#3D1C06]/40 focus:border-[#D96B27] focus:outline-none"
              disabled
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#3D1C06] uppercase mb-1">
              Precio ($)
            </label>
            <input
              type="number"
              placeholder="Ej: 1500"
              className="w-full rounded-xl border border-amber-200 bg-amber-50/30 px-3.5 py-2 text-sm text-[#3D1C06] placeholder-[#3D1C06]/40 focus:border-[#D96B27] focus:outline-none"
              disabled
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#3D1C06] uppercase mb-1">
              Categoría
            </label>
            <select
              className="w-full rounded-xl border border-amber-200 bg-amber-50/30 px-3.5 py-2 text-sm text-[#3D1C06] focus:border-[#D96B27] focus:outline-none"
              disabled
            >
              <option>Seleccionar categoría...</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#3D1C06] uppercase mb-1">
              URL de la imagen
            </label>
            <input
              type="text"
              placeholder="https://ejemplo.com/imagen.jpg"
              className="w-full rounded-xl border border-amber-200 bg-amber-50/30 px-3.5 py-2 text-sm text-[#3D1C06] placeholder-[#3D1C06]/40 focus:border-[#D96B27] focus:outline-none"
              disabled
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-[#3D1C06] uppercase mb-1">
              Descripción
            </label>
            <textarea
              rows="3"
              placeholder="Detalles sobre los ingredientes o presentación..."
              className="w-full rounded-xl border border-amber-200 bg-amber-50/30 px-3.5 py-2 text-sm text-[#3D1C06] placeholder-[#3D1C06]/40 focus:border-[#D96B27] focus:outline-none"
              disabled
            />
          </div>

          <div className="md:col-span-2 pt-2">
            <button
              type="button"
              className="rounded-xl bg-[#D96B27] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#B05219] hover:shadow-md disabled:opacity-50"
              disabled
            >
              Guardar producto
            </button>
            <span className="text-xs text-[#3D1C06]/50 mt-2 block font-medium">
              * Formulario deshabilitado hasta conexión con la API
            </span>
          </div>
        </form>
      </div>

      {/* Tabla esqueleto de productos existentes */}
      <div className="rounded-2xl border border-amber-200/90 bg-white overflow-hidden shadow-md">
        <div className="px-6 py-4 border-b border-amber-100 bg-amber-50/50">
          <h3 className="text-sm font-bold text-[#3D1C06]">
            Productos registrados
          </h3>
        </div>

        <div className="p-8 text-center text-[#3D1C06]/60">
          <p className="text-sm">
            Estructura lista para conectar la tabla de productos desde la API.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminProductos;

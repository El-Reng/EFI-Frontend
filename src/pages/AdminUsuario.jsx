function AdminUsuarios() {
  return (
    <div className="space-y-6">
      {/* cabecera con aviso de permisos */}
      <div className="border-b border-stone-200 pb-4">
        <h2 className="text-xl font-bold text-stone-900 tracking-tight">
          Cuentas y Permisos
        </h2>
        <p className="text-sm text-stone-500 mt-1">
          Panel exclusivo de Super Admin para dar de alta administradores y gestionar roles.
        </p>
      </div>

      {/* formulario para registrar nuevo administrador */}
      <div className="rounded-lg border border-stone-200 bg-white p-5 shadow-xs">
        <h3 className="text-sm font-semibold text-stone-800 uppercase tracking-wider mb-4">
          Registrar nuevo administrador
        </h3>
        
        <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">
              Nombre completo
            </label>
            <input
              type="text"
              placeholder="Ej: Juan Perez"
              className="w-full rounded border border-stone-300 px-3 py-2 text-sm text-stone-800 placeholder-stone-400 focus:border-stone-500 focus:outline-none"
              disabled
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">
              Correo electronico
            </label>
            <input
              type="email"
              placeholder="usuario@panaderia.com"
              className="w-full rounded border border-stone-300 px-3 py-2 text-sm text-stone-800 placeholder-stone-400 focus:border-stone-500 focus:outline-none"
              disabled
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">
              Contrasena provisional
            </label>
            <input
              type="password"
              placeholder="******"
              className="w-full rounded border border-stone-300 px-3 py-2 text-sm text-stone-800 placeholder-stone-400 focus:border-stone-500 focus:outline-none"
              disabled
            />
          </div>

          <div className="flex items-center gap-2 pt-6">
            <input
              id="isOwner"
              type="checkbox"
              className="h-4 w-4 rounded border-stone-300 text-stone-800 focus:ring-stone-500"
              disabled
            />
            <label htmlFor="isOwner" className="text-sm text-stone-700">
              Asignar rol de Super Admin (propietario)
            </label>
          </div>

          <div className="md:col-span-2">
            <button
              type="button"
              className="rounded bg-stone-800 px-4 py-2 text-sm font-medium text-white hover:bg-stone-700 transition-colors disabled:opacity-50"
              disabled
            >
              Crear usuario
            </button>
            <span className="text-xs text-stone-400 mt-2 block">
              formulario deshabilitado hasta conexion con la api
            </span>
          </div>
        </form>
      </div>

      {/* tabla de usuarios registrados */}
      <div className="rounded-lg border border-stone-200 bg-white overflow-hidden shadow-xs">
        <div className="px-5 py-4 border-b border-stone-200 bg-stone-50">
          <h3 className="text-sm font-semibold text-stone-800">
            Administradores del sistema
          </h3>
        </div>

        <div className="p-8 text-center text-stone-500">
          <p className="text-sm">
            Estructura lista para que Gabi conecte la lista de usuarios desde el backend de Leo.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminUsuarios;
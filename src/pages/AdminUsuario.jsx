function AdminUsuarios() {
  return (
    <div className="space-y-6">
      {/* Cabecera con aviso de permisos */}
      <div className="border-b border-amber-200/80 pb-4">
        <h2 className="font-serif text-2xl font-bold text-pan-marron tracking-tight">
          Cuentas y Permisos
        </h2>
        <p className="text-sm text-pan-marron/75 mt-1">
          Panel exclusivo de Super Admin para dar de alta administradores y
          gestionar roles.
        </p>
      </div>

      {/* Formulario para registrar nuevo administrador con sombra */}
      <div className="rounded-2xl border border-amber-200/90 bg-white p-6 shadow-md">
        <h3 className="text-xs font-bold text-pan-marron/80 uppercase tracking-wider mb-4">
          Registrar nuevo administrador
        </h3>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label className="block text-xs font-bold text-pan-marron uppercase mb-1">
              Nombre completo
            </label>
            <input
              type="text"
              placeholder="Ej: Juan Perez"
              className="w-full rounded-xl border border-amber-200 bg-amber-50/30 px-3.5 py-2 text-sm text-pan-marron placeholder-pan-marron/40 focus:border-pan-naranja focus:outline-none"
              disabled
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-pan-marron uppercase mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              placeholder="usuario@panaderia.com"
              className="w-full rounded-xl border border-amber-200 bg-amber-50/30 px-3.5 py-2 text-sm text-pan-marron placeholder-pan-marron/40 focus:border-pan-naranja focus:outline-none"
              disabled
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-pan-marron uppercase mb-1">
              Contraseña provisional
            </label>
            <input
              type="password"
              placeholder="******"
              className="w-full rounded-xl border border-amber-200 bg-amber-50/30 px-3.5 py-2 text-sm text-pan-marron placeholder-pan-marron/40 focus:border-pan-naranja focus:outline-none"
              disabled
            />
          </div>

          <div className="flex items-center gap-2 pt-6">
            <input
              id="isOwner"
              type="checkbox"
              className="h-4 w-4 rounded border-amber-300 text-pan-naranja focus:ring-pan-naranja"
              disabled
            />
            <label
              htmlFor="isOwner"
              className="text-sm font-medium text-pan-marron"
            >
              Asignar rol de Super Admin (propietario)
            </label>
          </div>

          <div className="md:col-span-2 pt-2">
            <button
              type="button"
              className="rounded-xl bg-pan-naranja px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-pan-naranja-hover hover:shadow-md disabled:opacity-50"
              disabled
            >
              Crear usuario
            </button>
            <span className="text-xs text-pan-marron/50 mt-2 block font-medium">
              * Formulario deshabilitado hasta conexión con la API
            </span>
          </div>
        </form>
      </div>

      {/* Tabla de usuarios registrados */}
      <div className="rounded-2xl border border-amber-200/90 bg-white overflow-hidden shadow-md">
        <div className="px-6 py-4 border-b border-amber-100 bg-amber-50/50">
          <h3 className="text-sm font-bold text-pan-marron">
            Administradores del sistema
          </h3>
        </div>

        <div className="p-8 text-center text-pan-marron/60">
          <p className="text-sm">
            Estructura lista para conectar la lista de usuarios desde el
            backend.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminUsuarios;

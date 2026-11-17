function NotFound({ onVolverAlInicio }) {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-lg flex-1 flex-col items-center justify-center px-4 py-12 text-center">
      {/* dibujito o icono simpatico */}
      <span className="text-7xl">🥐</span>

      {/* titulo del error */}
      <h1 className="mt-4 font-titulo text-5xl font-bold text-texto">
        404
      </h1>

      <h2 className="mt-2 font-titulo text-2xl font-bold">
        pagina no encontrada
      </h2>

      <p className="mt-2 text-sm opacity-80 max-w-sm">
        parece que esta medialuna se nos quemo en el horno o la direccion que buscas no existe.
      </p>

      {/* boton para regresar a la tienda */}
      <button
        type="button"
        onClick={onVolverAlInicio}
        className="mt-6 rounded-lg border-2 border-borde bg-acento px-6 py-2.5 font-bold text-texto-acento shadow-sm hover:brightness-95 transition-all"
      >
        volver al inicio
      </button>
    </main>
  )
}

export default NotFound
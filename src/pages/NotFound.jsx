import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-lg flex-1 flex-col items-center justify-center px-4 py-12 text-center">
      <span className="text-7xl">🥐</span>

      <h1 className="mt-4 font-titulo text-5xl font-bold text-texto">404</h1>

      <h2 className="mt-2 font-titulo text-2xl font-bold">
        Página no encontrada
      </h2>

      <p className="mt-2 max-w-sm text-sm opacity-80">
        Parece que esta medialuna se nos quemó en el horno o la dirección que
        buscás no existe.
      </p>

      <Link
        to="/"
        className="mt-6 rounded-lg border-2 border-borde bg-acento px-6 py-2.5 font-bold text-texto-acento shadow-sm transition-all hover:brightness-95"
      >
        Volver al inicio
      </Link>
    </main>
  );
}

export default NotFound;

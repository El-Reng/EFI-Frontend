import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-1 flex-col items-center justify-center px-4 py-12 text-center">
      <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-amber-100/80 border border-amber-200/80 shadow-md">
        <span className="text-6xl -rotate-12 inline-block">🥐</span>
      </div>

      <h1 className="mt-5 font-serif text-5xl sm:text-6xl font-bold text-pan-marron">
        404
      </h1>

      <h2 className="mt-2 font-serif text-2xl font-bold text-pan-marron">
        Página no encontrada
      </h2>

      <p className="mt-2 max-w-sm text-sm text-pan-marron/80 leading-relaxed">
        Parece que esta medialuna se nos quemó en el horno o la dirección que
        buscás no existe.
      </p>

      <Link
        to="/"
        className="mt-6 rounded-xl bg-pan-naranja px-6 py-2.5 font-bold text-white shadow-md transition hover:bg-pan-naranja-hover hover:shadow-lg"
      >
        Volver al inicio
      </Link>
    </div>
  );
}

export default NotFound;

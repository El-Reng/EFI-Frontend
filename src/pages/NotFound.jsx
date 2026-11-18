import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-1 flex-col items-center justify-center px-4 py-12 text-center">
      <span className="text-7xl drop-shadow-md">🥐</span>

      <h1 className="mt-4 font-serif text-5xl font-bold text-[#3D1C06]">404</h1>

      <h2 className="mt-2 font-serif text-2xl font-bold text-[#3D1C06]">
        Página no encontrada
      </h2>

      <p className="mt-2 max-w-sm text-sm text-[#3D1C06]/80 leading-relaxed">
        Parece que esta medialuna se nos quemó en el horno o la dirección que
        buscás no existe.
      </p>

      <Link
        to="/"
        className="mt-6 rounded-xl bg-[#D96B27] px-6 py-2.5 font-bold text-white shadow-md transition hover:bg-[#B05219] hover:shadow-lg"
      >
        Volver al inicio
      </Link>
    </div>
  );
}

export default NotFound;

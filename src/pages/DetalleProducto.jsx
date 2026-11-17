import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function DetalleProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const rutaCatalogo = location.pathname.startsWith("/admin")
    ? "/admin/productos"
    : "/productos";

  useEffect(() => {
    async function obtenerProducto() {
      try {
        setCargando(true);
        setError("");

        const respuesta = await fetch(`${API_URL}/products/${id}`);

        if (respuesta.status === 404) {
          throw new Error("Producto no encontrado.");
        }

        if (!respuesta.ok) {
          throw new Error("No se pudo obtener el producto.");
        }

        const datos = await respuesta.json();

        setProducto(datos);
      } catch (error) {
        setError(error.message);
      } finally {
        setCargando(false);
      }
    }

    obtenerProducto();
  }, [id]);

  if (cargando) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-12 text-center">
        Cargando producto...
      </section>
    );
  }

  if (error) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-12 text-center">
        <h1 className="font-serif text-2xl font-bold">{error}</h1>

        <button
          type="button"
          onClick={() => navigate(rutaCatalogo)}
          className="mt-6 rounded-lg border-2 border-amber-600 bg-amber-500 px-5 py-2 font-semibold text-white hover:bg-amber-600"
        >
          Volver al catálogo
        </button>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-8">
      <button
        type="button"
        onClick={() => navigate(rutaCatalogo)}
        className="mb-6 rounded-lg border-2 border-amber-300 bg-white px-4 py-2 text-sm font-semibold hover:bg-amber-100"
      >
        ← Volver al catálogo
      </button>

      <article className="grid gap-8 rounded-2xl border-2 border-amber-200 bg-white p-6 shadow-sm md:grid-cols-2 lg:p-10">
        <div className="flex aspect-square items-center justify-center rounded-xl border-2 border-amber-200 bg-amber-100">
          <span className="text-7xl">🥐</span>
        </div>

        <div>
          {producto.category && (
            <span className="inline-block rounded-md border border-amber-300 bg-amber-300 px-3 py-1 text-xs font-bold uppercase text-amber-950">
              {producto.category.name}
            </span>
          )}

          <h1 className="mt-3 font-serif text-3xl font-bold sm:text-4xl">
            {producto.name}
          </h1>

          <p className="mt-4 text-3xl font-bold text-amber-600">
            ${Number(producto.price).toLocaleString("es-AR")}
          </p>

          <div className="mt-4 border-t-2 border-amber-200 pt-4">
            <h2 className="text-sm font-bold uppercase tracking-wider opacity-80">
              Descripción
            </h2>

            <p className="mt-2 leading-relaxed opacity-90">
              {producto.description || "Sin descripción disponible."}
            </p>
          </div>
        </div>
      </article>
    </section>
  );
}

export default DetalleProducto;

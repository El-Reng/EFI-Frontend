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
      <section className="mx-auto max-w-6xl px-4 py-12 text-center text-sm font-medium opacity-80">
        Cargando producto...
      </section>
    );
  }

  if (error) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-12 text-center">
        <h1 className="font-serif text-2xl font-bold text-[#3D1C06]">{error}</h1>
        <button
          type="button"
          onClick={() => navigate(rutaCatalogo)}
          className="mt-6 rounded-xl bg-[#D96B27] px-5 py-2.5 font-bold text-white shadow-sm transition hover:bg-[#B05219]"
        >
          Volver al catálogo
        </button>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-10">
      <button
        type="button"
        onClick={() => navigate(rutaCatalogo)}
        className="mb-6 rounded-xl border border-amber-200 bg-white px-4 py-2 text-sm font-bold text-[#3D1C06] shadow-sm hover:bg-amber-50 transition cursor-pointer"
      >
        ← Volver al catálogo
      </button>

      <article className="grid gap-8 rounded-2xl border border-amber-200/90 bg-white p-6 shadow-lg md:grid-cols-2 lg:p-10">
        <div className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-amber-100 bg-amber-50/70 shadow-xs">
          {producto.image_url ? (
            <img
              src={producto.image_url}
              alt={producto.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-7xl">🥐</span>
          )}
        </div>

        <div className="flex flex-col justify-center">
          {producto.category && (
            <div>
              <span className="inline-block rounded-full bg-[#FCD872] px-3 py-1 text-xs font-semibold text-[#3D1C06] shadow-xs">
                {producto.category.name}
              </span>
            </div>
          )}

          <h1 className="mt-3 font-serif text-3xl font-bold text-[#3D1C06] sm:text-4xl">
            {producto.name}
          </h1>

          <p className="mt-4 text-3xl font-bold text-[#D96B27]">
            ${Number(producto.price).toLocaleString("es-AR")}
          </p>

          <div className="mt-6 border-t border-amber-100 pt-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#3D1C06]/70">
              Descripción
            </h2>

            <p className="mt-2 text-base leading-relaxed text-[#3D1C06]/90">
              {producto.description || "Sin descripción disponible."}
            </p>
          </div>
        </div>
      </article>
    </section>
  );
}

export default DetalleProducto;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function Categorias() {
  const navigate = useNavigate();

  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function obtenerCategorias() {
      try {
        setCargando(true);
        setError("");

        const respuesta = await fetch(`${API_URL}/categories/?size=100`);

        if (!respuesta.ok) {
          throw new Error("No se pudieron obtener las categorías.");
        }

        const datos = await respuesta.json();

        setCategorias(datos.items || datos);
      } catch (error) {
        setError(error.message);
      } finally {
        setCargando(false);
      }
    }

    obtenerCategorias();
  }, []);

  if (cargando) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-12 text-center">
        Cargando categorías...
      </section>
    );
  }

  if (error) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-12 text-center">
        <p className="font-semibold text-red-600">{error}</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="font-serif text-3xl font-bold">Nuestras categorías</h1>
        <p className="mt-2 opacity-80">
          Conocé las distintas variedades de nuestra panadería.
        </p>
      </div>

      {categorias.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categorias.map((categoria) => (
            <button
              key={categoria.id}
              type="button"
              onClick={() => navigate(`/productos?categoria=${categoria.id}`)}
              style={
                categoria.image_url
                  ? { backgroundImage: `url("${categoria.image_url}")` }
                  : {}
              }
              className={`group relative flex aspect-video items-center justify-center overflow-hidden rounded-xl border-2 border-amber-300 bg-linear-to-br from-amber-500 to-amber-800 bg-cover bg-center shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                categoria.image_url
                  ? ""
                  : "hover:from-amber-600 hover:to-amber-900"
              }`}
            >
              {categoria.image_url && (
                <div className="absolute inset-0 bg-black/35 transition-colors duration-300 group-hover:bg-black/50" />
              )}

              <span className="relative z-10 px-4 text-center font-serif text-2xl font-bold text-white [-webkit-text-stroke:1px_black] sm:text-3xl">
                {categoria.name}
              </span>
            </button>
          ))}
        </div>
      ) : (
        <p className="py-12 text-center opacity-75">
          Todavía no hay categorías registradas.
        </p>
      )}
    </section>
  );
}

export default Categorias;

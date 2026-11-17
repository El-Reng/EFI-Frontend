import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function Categorias() {
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
        <h1 className="font-titulo text-3xl font-bold">Nuestras categorías</h1>
        <p className="mt-2 opacity-80">
          Conocé las distintas variedades de nuestra panadería.
        </p>
      </div>

      {categorias.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categorias.map((categoria) => (
            <article
              key={categoria.id}
              className="rounded-xl border-2 border-borde bg-superficie p-6 shadow-sm"
            >
              <h2 className="font-titulo text-xl font-bold">
                {categoria.name}
              </h2>
            </article>
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

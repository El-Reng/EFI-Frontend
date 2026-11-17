import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const API_URL = import.meta.env.VITE_API_URL;

function Catalogo() {
  const navigate = useNavigate();
  const location = useLocation();

  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaActual, setCategoriaActual] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const productosPorPagina = 6;

  useEffect(() => {
    async function obtenerDatos() {
      try {
        setCargando(true);
        setError("");

        const [respuestaProductos, respuestaCategorias] = await Promise.all([
          fetch(`${API_URL}/products/?size=100`),
          fetch(`${API_URL}/categories/?size=100`),
        ]);

        if (!respuestaProductos.ok || !respuestaCategorias.ok) {
          throw new Error("No se pudieron obtener los datos del servidor.");
        }

        const datosProductos = await respuestaProductos.json();
        const datosCategorias = await respuestaCategorias.json();

        setProductos(datosProductos.items || datosProductos);
        setCategorias(datosCategorias.items || datosCategorias);
      } catch (error) {
        setError(error.message);
      } finally {
        setCargando(false);
      }
    }

    obtenerDatos();
  }, []);

  const productosFiltrados = productos.filter((producto) => {
    const coincideCategoria =
      categoriaActual === "Todos" ||
      producto.category_id === Number(categoriaActual);

    const coincideBusqueda =
      producto.name.toLowerCase().includes(busqueda.toLowerCase()) ||
      (producto.description || "")
        .toLowerCase()
        .includes(busqueda.toLowerCase());

    return coincideCategoria && coincideBusqueda;
  });

  const totalPaginas =
    Math.ceil(productosFiltrados.length / productosPorPagina) || 1;

  const indiceInicio = (paginaActual - 1) * productosPorPagina;

  const productosPaginados = productosFiltrados.slice(
    indiceInicio,
    indiceInicio + productosPorPagina,
  );

  function cambiarCategoria(id) {
    setCategoriaActual(id);
    setPaginaActual(1);
  }

  function cambiarBusqueda(e) {
    setBusqueda(e.target.value);
    setPaginaActual(1);
  }

  function verDetalle(id) {
    const rutaDetalle = location.pathname.startsWith("/admin")
      ? `/admin/productos/${id}`
      : `/productos/${id}`;

    navigate(rutaDetalle);
  }

  if (cargando) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-12 text-center">
        <p>Cargando productos...</p>
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
        <h1 className="font-titulo text-3xl font-bold">Gestión de productos</h1>
        <p className="mt-2 opacity-80">
          Consultá los productos registrados en la panadería.
        </p>
      </div>

      <input
        type="text"
        value={busqueda}
        onChange={cambiarBusqueda}
        placeholder="Buscar productos..."
        className="mb-6 w-full rounded-lg border-2 border-borde bg-superficie px-4 py-3"
      />

      <div className="mb-8 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => cambiarCategoria("Todos")}
          className={`rounded-lg border-2 border-borde px-4 py-2 font-semibold ${
            categoriaActual === "Todos" ? "bg-acento text-texto-acento" : ""
          }`}
        >
          Todos
        </button>

        {categorias.map((categoria) => (
          <button
            key={categoria.id}
            type="button"
            onClick={() => cambiarCategoria(String(categoria.id))}
            className={`rounded-lg border-2 border-borde px-4 py-2 font-semibold ${
              categoriaActual === String(categoria.id)
                ? "bg-acento text-texto-acento"
                : ""
            }`}
          >
            {categoria.name}
          </button>
        ))}
      </div>

      {productosPaginados.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {productosPaginados.map((producto) => (
            <ProductCard
              key={producto.id}
              id={producto.id}
              name={producto.name}
              description={producto.description}
              price={producto.price}
              category={producto.category?.name}
              onVerDetalle={verDetalle}
            />
          ))}
        </div>
      ) : (
        <p className="py-12 text-center opacity-75">
          No se encontraron productos.
        </p>
      )}

      {totalPaginas > 1 && (
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => setPaginaActual(paginaActual - 1)}
            disabled={paginaActual === 1}
            className="rounded-lg border-2 border-borde px-4 py-2 disabled:opacity-40"
          >
            Anterior
          </button>

          <span>
            Página {paginaActual} de {totalPaginas}
          </span>

          <button
            type="button"
            onClick={() => setPaginaActual(paginaActual + 1)}
            disabled={paginaActual === totalPaginas}
            className="rounded-lg border-2 border-borde px-4 py-2 disabled:opacity-40"
          >
            Siguiente
          </button>
        </div>
      )}
    </section>
  );
}

export default Catalogo;

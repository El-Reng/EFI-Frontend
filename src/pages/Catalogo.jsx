import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const API_URL = import.meta.env.VITE_API_URL;

function Catalogo() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const categoriaActual = searchParams.get("categoria") || "Todos";
  const productosPorPagina = 6;
  const esAdmin = location.pathname.startsWith("/admin");

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
      producto.category?.id === Number(categoriaActual);

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
    if (id === "Todos") {
      setSearchParams({});
    } else {
      setSearchParams({ categoria: id });
    }

    setPaginaActual(1);
  }

  function cambiarBusqueda(e) {
    setBusqueda(e.target.value);
    setPaginaActual(1);
  }

  function verDetalle(id) {
    const rutaDetalle = esAdmin
      ? `/admin/productos/${id}`
      : `/productos/${id}`;

    navigate(rutaDetalle);
  }

  if (cargando) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-12 text-center text-sm font-medium opacity-80">
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
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#3D1C06]">
          {esAdmin ? "Gestión de productos" : "Nuestro Catálogo"}
        </h1>
        <p className="mt-2 text-sm text-[#3D1C06]/80">
          {esAdmin
            ? "Consultá y administrá los productos registrados."
            : "Elegí tus favoritos recién horneados."}
        </p>
      </div>

      <div className="mb-6">
        <input
          type="text"
          value={busqueda}
          onChange={cambiarBusqueda}
          placeholder="Buscar panes, facturas, tortas..."
          className="w-full rounded-2xl border border-amber-200/90 bg-white px-5 py-3 text-sm text-[#3D1C06] placeholder:text-gray-400 shadow-sm focus:border-[#D96B27] focus:outline-none focus:ring-2 focus:ring-[#D96B27]/20 transition"
        />
      </div>

      <div className="mb-8 flex flex-wrap gap-2.5">
        <button
          type="button"
          onClick={() => cambiarCategoria("Todos")}
          className={`rounded-full px-5 py-2 text-sm font-semibold transition-all shadow-xs cursor-pointer ${
            categoriaActual === "Todos"
              ? "bg-[#D96B27] text-white shadow-sm font-bold"
              : "bg-white text-[#3D1C06] border border-amber-200/80 hover:bg-amber-50"
          }`}
        >
          Todos
        </button>

        {categorias.map((categoria) => (
          <button
            key={categoria.id}
            type="button"
            onClick={() => cambiarCategoria(String(categoria.id))}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-all shadow-xs cursor-pointer ${
              categoriaActual === String(categoria.id)
                ? "bg-[#D96B27] text-white shadow-sm font-bold"
                : "bg-white text-[#3D1C06] border border-amber-200/80 hover:bg-amber-50"
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
              imageUrl={producto.image_url}
              onVerDetalle={verDetalle}
            />
          ))}
        </div>
      ) : (
        <p className="py-12 text-center text-sm opacity-75">
          No se encontraron productos.
        </p>
      )}

      {totalPaginas > 1 && (
        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => setPaginaActual(paginaActual - 1)}
            disabled={paginaActual === 1}
            className="rounded-xl border border-amber-200 bg-white px-4 py-2 text-sm font-bold text-[#3D1C06] shadow-sm hover:bg-amber-50 disabled:opacity-40 transition cursor-pointer"
          >
            ← Anterior
          </button>

          <span className="text-sm font-semibold text-[#3D1C06]">
            Página {paginaActual} de {totalPaginas}
          </span>

          <button
            type="button"
            onClick={() => setPaginaActual(paginaActual + 1)}
            disabled={paginaActual === totalPaginas}
            className="rounded-xl border border-amber-200 bg-white px-4 py-2 text-sm font-bold text-[#3D1C06] shadow-sm hover:bg-amber-50 disabled:opacity-40 transition cursor-pointer"
          >
            Siguiente →
          </button>
        </div>
      )}
    </section>
  );
}

export default Catalogo;

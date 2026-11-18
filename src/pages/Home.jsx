import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Carousel from "../components/Carousel";
import ProductCard from "../components/ProductCard";

const API_URL = import.meta.env.VITE_API_URL;

const slides = [
  {
    id: 1,
    titulo: "Encargos para tus reuniones",
    subtitulo: "Facturas, tortas y mesas dulces",
    imagen:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
    botonTexto: "Ver catálogo",
    botonLink: "/productos",
  },
  {
    id: 2,
    titulo: "Pan casero todos los días",
    subtitulo: "Hecho con masa madre, dedicación y mucho cariño",
    imagen:
      "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=800&q=80",
    botonTexto: "Ver productos",
    botonLink: "/productos",
  },
  {
    id: 3,
    titulo: "Medialunas recién horneadas",
    subtitulo: "Pasá por la mañana y llevate las primeras calentitas",
    imagen:
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80",
    botonTexto: "Conocenos",
    botonLink: "/nosotros",
  },
];

function Home() {
  const navigate = useNavigate();

  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function obtenerProductos() {
      try {
        const respuesta = await fetch(`${API_URL}/products/?size=100`);

        if (!respuesta.ok) {
          throw new Error("No se pudieron obtener los productos.");
        }

        const datos = await respuesta.json();

        setProductos(datos.items || datos);
      } catch (error) {
        setError(error.message);
      } finally {
        setCargando(false);
      }
    }

    obtenerProductos();
  }, []);

  const destacados = productos.slice(0, 3);

  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
      <Carousel slides={slides} />

      <section className="mt-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3D1C06]">
              Nuestros productos
            </h2>

            <p className="mt-1 text-sm text-[#3D1C06]/80">
              Descubrí las delicias artesanales de nuestra panadería.
            </p>
          </div>

          <Link
            to="/productos"
            className="text-sm font-bold text-[#D96B27] hover:text-[#B05219] transition-colors"
          >
            Ver catálogo completo →
          </Link>
        </div>

        {cargando ? (
          <p className="py-12 text-center text-sm font-medium opacity-80">
            Cargando productos...
          </p>
        ) : error ? (
          <p className="py-12 text-center font-semibold text-red-600">
            {error}
          </p>
        ) : destacados.length > 0 ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {destacados.map((producto) => (
              <ProductCard
                key={producto.id}
                id={producto.id}
                name={producto.name}
                description={producto.description}
                price={producto.price}
                category={producto.category?.name}
                imageUrl={producto.image_url}
                onVerDetalle={(id) => navigate(`/productos/${id}`)}
              />
            ))}
          </div>
        ) : (
          <p className="py-12 text-center opacity-75">
            Próximamente vas a encontrar nuestros productos destacados.
          </p>
        )}
      </section>
    </div>
  );
}

export default Home;

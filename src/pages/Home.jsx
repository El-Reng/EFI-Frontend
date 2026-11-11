import Carousel from '../components/Carousel'
import ProductCard from '../components/ProductCard'
import { productos } from '../data/productos'

const slides = [
  { id: 1, titulo: 'Pan casero todos los días', subtitulo: 'Hecho con masa madre y mucho cariño' },
  { id: 2, titulo: 'Medialunas recién horneadas', subtitulo: 'Pasá por la mañana y llevate las primeras' },
  { id: 3, titulo: 'Encargos para tus reuniones', subtitulo: 'Facturas, tortas y mesas dulces' },
]

function Home({ onVerDetalle, onAgregar, onIrACatalogo }) {
  const destacados = productos.filter((p) => p.destacado).slice(0, 3)

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
      <Carousel slides={slides} />

      <section className="mt-12">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-titulo text-3xl font-bold">Productos destacados</h2>
            <p className="mt-1 text-sm opacity-85">Los favoritos de nuestros clientes cada mañana.</p>
          </div>
          {onIrACatalogo && (
            <button
              type="button"
              onClick={onIrACatalogo}
              className="hidden text-sm font-bold text-acento hover:underline sm:inline-block"
            >
              Ver catálogo completo →
            </button>
          )}
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destacados.map((p) => (
            <ProductCard
              key={p.id}
              {...p}
              onVerDetalle={onVerDetalle}
              onAgregar={() => onAgregar?.(p)}
            />
          ))}
        </div>

        {onIrACatalogo && (
          <div className="mt-8 text-center sm:hidden">
            <button
              type="button"
              onClick={onIrACatalogo}
              className="w-full rounded-lg border-2 border-borde bg-superficie px-4 py-2 font-semibold"
            >
              Ver catálogo completo →
            </button>
          </div>
        )}
      </section>
    </main>
  )
}

export default Home

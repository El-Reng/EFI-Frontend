import Carousel from '../components/Carousel'
import ProductCard from '../components/ProductCard'
import { productos } from '../data/productos'

// para usar fotos, ponelas en la carpeta public y agregá imagen: '/nombre.jpg'
const slides = [
  { id: 1, titulo: 'Pan casero todos los días', subtitulo: 'Hecho con masa madre y mucho cariño' },
  { id: 2, titulo: 'Medialunas recién horneadas', subtitulo: 'Pasá por la mañana y llevate las primeras' },
  { id: 3, titulo: 'Encargos para tus reuniones', subtitulo: 'Facturas, tortas y mesas dulces' },
]

function Home() {
  const destacados = productos.slice(0, 3)

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
      <Carousel slides={slides} />

      <section className="mt-10">
        <h2 className="font-titulo text-3xl font-bold">Productos destacados</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destacados.map((p) => (
            <ProductCard key={p.id} {...p} onAgregar={() => {}} />
          ))}
        </div>
      </section>
    </main>
  )
}

export default Home
import { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Catalogo from './pages/Catalogo'
import DetalleProducto from './pages/DetalleProducto'
import Nosotros from './pages/Nosotros'

function App() {
  const [pagina, setPagina] = useState('home') // 'home' | 'catalogo' | 'detalle' | 'nosotros'
  const [productoSeleccionadoId, setProductoSeleccionadoId] = useState(null)
  const [carrito, setCarrito] = useState([])

  const handleVerDetalle = (id) => {
    setProductoSeleccionadoId(id)
    setPagina('detalle')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleVolverAlCatalogo = () => {
    setPagina('catalogo')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleAgregarAlCarrito = (item) => {
    setCarrito((prev) => [...prev, item])
    console.log('Producto agregado al carrito:', item)
  }

  return (
    <div className="flex min-h-screen flex-col bg-fondo text-texto font-texto">
      <Navbar paginaActual={pagina} onNavegar={setPagina} />

      {pagina === 'home' && (
        <Home
          onVerDetalle={handleVerDetalle}
          onAgregar={handleAgregarAlCarrito}
          onIrACatalogo={() => setPagina('catalogo')}
        />
      )}

      {pagina === 'catalogo' && (
        <Catalogo
          onVerDetalle={handleVerDetalle}
          onAgregar={handleAgregarAlCarrito}
        />
      )}

      {pagina === 'detalle' && (
        <DetalleProducto
          productoId={productoSeleccionadoId}
          onVolver={handleVolverAlCatalogo}
          onAgregar={handleAgregarAlCarrito}
        />
      )}

      {pagina === 'nosotros' && <Nosotros />}

      <Footer />
    </div>
  )
}

export default App
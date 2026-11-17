import { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Catalogo from './pages/Catalogo'
import DetalleProducto from './pages/DetalleProducto'
import Nosotros from './pages/Nosotros'
import Admin from './pages/Admin'
import Login from './pages/Login'
import NotFound from './pages/NotFound'

function App() {
  const [pagina, setPagina] = useState('home') // 'home' | 'catalogo' | 'detalle' | 'nosotros'
  const [esAdmin, setEsAdmin] = useState(false) // aca se guarda si el usuario inicio sesion o no
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

  // cuando pone bien la clave pasa a ser admin y lo manda al panel admin
  function loginExitoso() {
  setEsAdmin(true)
  setPagina('admin')
  }

  // cuando sale le saca el admin y lo manda al inicio
  function cerrarSesion() {
  setEsAdmin(false)
  setPagina('home')

}
  return (
    <div className="flex min-h-screen flex-col bg-fondo text-texto font-texto">
      <Navbar 
        paginaActual={pagina} 
        onNavegar={setPagina} 
        esAdmin={esAdmin} 
        onCerrarSesion={cerrarSesion} />

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

            {/* aca se ve el login */}
      {pagina === 'login' && (
        <Login
          onLoginExitoso={loginExitoso}
          onVolver={() => setPagina('home')}
        />
      )}

      {/* aca se ve el admin solo si entro con la clave */}
      {pagina === 'admin' && esAdmin && <Admin />}

      {/* pantalla de error 404 si la ruta no existe */}
      {!['home', 'catalogo', 'detalle', 'nosotros', 'login', 'admin'].includes(pagina) && (
      <NotFound onVolverAlInicio={() => setPagina('home')} />
      )}


      <Footer />
    </div>
  )
}

export default App
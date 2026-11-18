import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Catalogo from "./pages/Catalogo";
import DetalleProducto from "./pages/DetalleProducto";
import Categorias from "./pages/Categorias";
import Nosotros from "./pages/Nosotros";
import Admin from "./pages/Admin";
import AdminProductos from "./pages/AdminProductos";
import AdminCategorias from "./pages/AdminCategorias";
import AdminUsuarios from "./pages/AdminUsuario";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="flex min-h-screen flex-col bg-pan-crema bg-patron-body text-pan-marron font-sans antialiased selection:bg-pan-amarillo selection:text-pan-marron">
          <Navbar />

          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/productos" element={<Catalogo />} />
              <Route path="/productos/:id" element={<DetalleProducto />} />
              <Route path="/categorias" element={<Categorias />} />
              <Route path="/nosotros" element={<Nosotros />} />
              <Route path="/login" element={<Login />} />

              <Route path="/admin" element={<Admin />}>
                <Route
                  index
                  element={
                    <p className="mt-4 text-pan-marron/80 font-medium">
                      Seleccioná una sección del panel en el menú lateral.
                    </p>
                  }
                />
                <Route path="productos" element={<AdminProductos />} />
                <Route path="categorias" element={<AdminCategorias />} />
                <Route path="usuarios" element={<AdminUsuarios />} />
                <Route path="productos/:id" element={<DetalleProducto />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

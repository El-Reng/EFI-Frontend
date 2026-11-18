import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

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
import Cuenta from "./pages/Cuenta";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

function RutaPrivada({ children, soloOwner = false }) {
  const { usuario, isOwner, sesionExpirada } = useAuth();
  const location = useLocation();

  if (!usuario) {
    return (
      <Navigate
        to="/login"
        state={{
          from: location,
          mensaje: sesionExpirada
            ? "Tu sesión expiró. Iniciá sesión nuevamente."
            : undefined,
        }}
        replace
      />
    );
  }

  if (soloOwner && !isOwner) {
    return <Navigate to="/admin/productos" replace />;
  }

  return children;
}

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

              <Route
                path="/cuenta"
                element={
                  <RutaPrivada>
                    <Cuenta />
                  </RutaPrivada>
                }
              />

              <Route
                path="/admin"
                element={
                  <RutaPrivada>
                    <Admin />
                  </RutaPrivada>
                }
              >
                <Route
                  index
                  element={<Navigate to="/admin/productos" replace />}
                />
                <Route path="productos" element={<AdminProductos />} />
                <Route path="categorias" element={<AdminCategorias />} />
                <Route
                  path="usuarios"
                  element={
                    <RutaPrivada soloOwner>
                      <AdminUsuarios />
                    </RutaPrivada>
                  }
                />
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

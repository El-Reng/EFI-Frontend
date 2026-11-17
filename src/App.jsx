import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Catalogo from "./pages/Catalogo";
import DetalleProducto from "./pages/DetalleProducto";
import Categorias from "./pages/Categorias";
import Nosotros from "./pages/Nosotros";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col bg-amber-50 text-amber-950 font-sans">
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
                  <p className="mt-4">Seleccioná una sección del panel.</p>
                }
              />
              <Route path="productos" element={<Catalogo />} />
              <Route path="productos/:id" element={<DetalleProducto />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

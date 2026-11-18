import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

function AdminCategorias() {
  const { fetchAutenticado } = useAuth();

  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [procesando, setProcesando] = useState(false);
  const [error, setError] = useState("");

  const [modal, setModal] = useState(null);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [nombre, setNombre] = useState("");
  const [imagenUrl, setImagenUrl] = useState("");

  const obtenerCategorias = useCallback(async () => {
    try {
      setCargando(true);
      setError("");

      const respuesta = await fetch(`${API_URL}/categories/?size=100`);

      if (!respuesta.ok) {
        throw new Error("No se pudieron cargar las categorías.");
      }

      const datos = await respuesta.json();
      setCategorias(datos.items || datos);
    } catch (error) {
      setError(error.message);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    obtenerCategorias();
  }, [obtenerCategorias]);

  const abrirCrear = () => {
    setCategoriaSeleccionada(null);
    setNombre("");
    setImagenUrl("");
    setError("");
    setModal("crear");
  };

  const abrirEditar = (categoria) => {
    setCategoriaSeleccionada(categoria);
    setNombre(categoria.name);
    setImagenUrl(categoria.image_url || "");
    setError("");
    setModal("editar");
  };

  const abrirEliminar = (categoria) => {
    setCategoriaSeleccionada(categoria);
    setError("");
    setModal("eliminar");
  };

  const cerrarModal = () => {
    if (procesando) return;

    setModal(null);
    setCategoriaSeleccionada(null);
    setNombre("");
    setImagenUrl("");
    setError("");
  };

  const obtenerMensajeError = async (respuesta) => {
    try {
      const datos = await respuesta.json();
      return datos.detail || "Ocurrió un error al realizar la operación.";
    } catch {
      return "Ocurrió un error al realizar la operación.";
    }
  };

  const guardarCategoria = async (e) => {
    e.preventDefault();

    if (!nombre.trim()) {
      setError("El nombre de la categoría es obligatorio.");
      return;
    }

    try {
      setProcesando(true);
      setError("");

      const esEdicion = modal === "editar";
      const url = esEdicion
        ? `${API_URL}/categories/${categoriaSeleccionada.id}`
        : `${API_URL}/categories/`;

      const respuesta = await fetchAutenticado(url, {
        method: esEdicion ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nombre.trim(),
          image_url: imagenUrl.trim() || null,
        }),
      });

      if (!respuesta.ok) {
        throw new Error(await obtenerMensajeError(respuesta));
      }

      cerrarModal();
      await obtenerCategorias();
    } catch (error) {
      setError(error.message);
    } finally {
      setProcesando(false);
    }
  };

  const eliminarCategoria = async () => {
    try {
      setProcesando(true);
      setError("");

      const respuesta = await fetchAutenticado(
        `${API_URL}/categories/${categoriaSeleccionada.id}`,
        {
          method: "DELETE",
        },
      );

      if (!respuesta.ok) {
        throw new Error(await obtenerMensajeError(respuesta));
      }

      cerrarModal();
      await obtenerCategorias();
    } catch (error) {
      setError(error.message);
    } finally {
      setProcesando(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 border-b border-amber-200/80 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-serif text-2xl font-bold tracking-tight text-pan-marron">
            Administración de Categorías
          </h2>
          <p className="mt-1 text-sm text-pan-marron/75">
            Gestioná las categorías visibles en la tienda.
          </p>
        </div>

        <button
          onClick={abrirCrear}
          className="rounded-xl bg-pan-naranja px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-pan-naranja-hover hover:shadow-md"
        >
          + Nueva categoría
        </button>
      </div>

      {error && !modal && (
        <p className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      )}

      {cargando ? (
        <p className="py-8 text-center text-sm text-pan-marron/60">
          Cargando categorías...
        </p>
      ) : categorias.length === 0 ? (
        <div className="rounded-2xl border border-amber-200/90 bg-white p-8 text-center shadow-md">
          <p className="text-sm text-pan-marron/60">
            Todavía no hay categorías registradas.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {categorias.map((categoria) => (
            <article
              key={categoria.id}
              className="overflow-hidden rounded-2xl border border-amber-200/90 bg-white shadow-md"
            >
              {categoria.image_url ? (
                <img
                  src={categoria.image_url}
                  alt={categoria.name}
                  className="h-36 w-full object-cover"
                />
              ) : (
                <div className="flex h-36 items-center justify-center bg-amber-50 text-4xl">
                  🥐
                </div>
              )}

              <div className="space-y-4 p-4">
                <div>
                  <h3 className="font-serif text-lg font-bold text-pan-marron">
                    {categoria.name}
                  </h3>
                  <p className="mt-1 text-xs text-pan-marron/50">
                    ID: {categoria.id}
                  </p>
                </div>

                <div className="flex gap-2 border-t border-amber-100 pt-3">
                  <button
                    onClick={() => abrirEditar(categoria)}
                    className="flex-1 rounded-lg border border-amber-300 px-3 py-2 text-sm font-semibold text-pan-marron transition-colors hover:bg-amber-50"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => abrirEliminar(categoria)}
                    className="flex-1 rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            {modal === "eliminar" ? (
              <>
                <h3 className="font-serif text-xl font-bold text-pan-marron">
                  Eliminar categoría
                </h3>

                <p className="mt-3 text-sm text-pan-marron/75">
                  ¿Seguro que querés eliminar la categoría{" "}
                  <strong>{categoriaSeleccionada.name}</strong>?
                </p>

                <p className="mt-2 text-xs text-pan-marron/60">
                  Esta acción no se puede deshacer.
                </p>
              </>
            ) : (
              <>
                <h3 className="font-serif text-xl font-bold text-pan-marron">
                  {modal === "crear" ? "Nueva categoría" : "Editar categoría"}
                </h3>

                <form onSubmit={guardarCategoria} className="mt-5 space-y-4">
                  <div>
                    <label className="mb-1 block text-sm font-semibold text-pan-marron">
                      Nombre
                    </label>
                    <input
                      type="text"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      placeholder="Ej: Medialunas"
                      required
                      className="w-full rounded-xl border border-amber-200 bg-amber-50/30 px-3.5 py-2.5 text-sm text-pan-marron outline-none focus:border-pan-naranja"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-semibold text-pan-marron">
                      URL de la imagen
                    </label>
                    <input
                      type="url"
                      value={imagenUrl}
                      onChange={(e) => setImagenUrl(e.target.value)}
                      placeholder="https://..."
                      className="w-full rounded-xl border border-amber-200 bg-amber-50/30 px-3.5 py-2.5 text-sm text-pan-marron outline-none focus:border-pan-naranja"
                    />
                  </div>

                  {error && (
                    <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                      {error}
                    </p>
                  )}

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={cerrarModal}
                      disabled={procesando}
                      className="rounded-xl border border-amber-200 px-4 py-2 text-sm font-semibold text-pan-marron hover:bg-amber-50 disabled:opacity-50"
                    >
                      Cancelar
                    </button>

                    <button
                      type="submit"
                      disabled={procesando}
                      className="rounded-xl bg-pan-naranja px-5 py-2 text-sm font-bold text-white hover:bg-pan-naranja-hover disabled:opacity-50"
                    >
                      {procesando ? "Guardando..." : "Aceptar"}
                    </button>
                  </div>
                </form>
              </>
            )}

            {modal === "eliminar" && (
              <>
                {error && (
                  <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                    {error}
                  </p>
                )}

                <div className="mt-6 flex justify-end gap-2">
                  <button
                    onClick={cerrarModal}
                    disabled={procesando}
                    className="rounded-xl border border-amber-200 px-4 py-2 text-sm font-semibold text-pan-marron hover:bg-amber-50 disabled:opacity-50"
                  >
                    Cancelar
                  </button>

                  <button
                    onClick={eliminarCategoria}
                    disabled={procesando}
                    className="rounded-xl bg-red-600 px-5 py-2 text-sm font-bold text-white hover:bg-red-700 disabled:opacity-50"
                  >
                    {procesando ? "Eliminando..." : "Eliminar"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminCategorias;

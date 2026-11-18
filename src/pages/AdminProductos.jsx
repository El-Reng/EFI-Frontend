import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

const formularioInicial = {
  name: "",
  description: "",
  price: "",
  category_id: "",
  image_url: "",
};

function AdminProductos() {
  const { fetchAutenticado, isOwner } = useAuth();

  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [procesando, setProcesando] = useState(false);
  const [error, setError] = useState("");

  const [modal, setModal] = useState(null);
  const [formulario, setFormulario] = useState(formularioInicial);

  const obtenerDatos = useCallback(async () => {
    try {
      setCargando(true);
      setError("");

      const [respuestaProductos, respuestaCategorias] = await Promise.all([
        fetchAutenticado(`${API_URL}/products/?size=100`),
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
  }, [fetchAutenticado]);

  useEffect(() => {
    obtenerDatos();
  }, [obtenerDatos]);

  function abrirCrear() {
    setFormulario(formularioInicial);
    setModal({ tipo: "crear" });
    setError("");
  }

  function abrirEditar(producto) {
    setFormulario({
      name: producto.name || "",
      description: producto.description || "",
      price: producto.price ?? "",
      category_id: String(producto.category?.id || producto.category_id || ""),
      image_url: producto.image_url || "",
    });

    setModal({ tipo: "editar", producto });
    setError("");
  }

  function abrirEliminar(producto) {
    setModal({ tipo: "eliminar", producto });
    setError("");
  }

  function cerrarModal() {
    if (procesando) return;

    setModal(null);
    setFormulario(formularioInicial);
    setError("");
  }

  function cambiarFormulario(e) {
    const { name, value } = e.target;

    setFormulario((actual) => ({
      ...actual,
      [name]: value,
    }));
  }

  async function obtenerMensajeError(respuesta, mensajeAlternativo) {
    try {
      const datos = await respuesta.json();

      if (typeof datos.detail === "string") {
        return datos.detail;
      }

      if (Array.isArray(datos.detail)) {
        return datos.detail.map((item) => item.msg).join(", ");
      }
    } catch (error) {
      // La respuesta no contiene un mensaje JSON.
    }

    return mensajeAlternativo;
  }

  async function guardarProducto(e) {
    e.preventDefault();

    try {
      setProcesando(true);
      setError("");

      const datosProducto = {
        name: formulario.name.trim(),
        description: formulario.description.trim() || null,
        price: Number(formulario.price),
        category_id: Number(formulario.category_id),
        image_url: formulario.image_url.trim() || null,
      };

      const esEdicion = modal.tipo === "editar";
      const url = esEdicion
        ? `${API_URL}/products/${modal.producto.id}`
        : `${API_URL}/products/`;

      const respuesta = await fetchAutenticado(url, {
        method: esEdicion ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosProducto),
      });

      if (!respuesta.ok) {
        throw new Error(
          await obtenerMensajeError(
            respuesta,
            "No se pudo guardar el producto.",
          ),
        );
      }

      setModal(null);
      setFormulario(formularioInicial);

      await obtenerDatos();
    } catch (error) {
      setError(error.message);
    } finally {
      setProcesando(false);
    }
  }

  async function eliminarProducto() {
    try {
      setProcesando(true);
      setError("");

      const respuesta = await fetchAutenticado(
        `${API_URL}/products/${modal.producto.id}`,
        {
          method: "DELETE",
        },
      );

      if (!respuesta.ok) {
        throw new Error(
          await obtenerMensajeError(
            respuesta,
            "No se pudo eliminar el producto.",
          ),
        );
      }

      setModal(null);
      await obtenerDatos();
    } catch (error) {
      setError(error.message);
    } finally {
      setProcesando(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 border-b border-amber-200/80 pb-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-serif text-2xl font-bold tracking-tight text-pan-marron">
            Administración de Productos
          </h2>
          <p className="mt-1 text-sm text-pan-marron/75">
            Creá, editá y gestioná los productos de la panadería.
          </p>
        </div>

        <button
          type="button"
          onClick={abrirCrear}
          className="rounded-xl bg-pan-naranja px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-pan-naranja-hover hover:shadow-md"
        >
          + Nuevo producto
        </button>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      {cargando ? (
        <p className="py-12 text-center text-sm text-pan-marron/70">
          Cargando productos...
        </p>
      ) : productos.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {productos.map((producto) => (
            <article
              key={producto.id}
              className="overflow-hidden rounded-2xl border border-amber-200/90 bg-white shadow-sm"
            >
              {producto.image_url ? (
                <img
                  src={producto.image_url}
                  alt={producto.name}
                  className="h-44 w-full object-cover"
                />
              ) : (
                <div className="flex h-44 items-center justify-center bg-amber-50 text-sm text-pan-marron/50">
                  Sin imagen
                </div>
              )}

              <div className="space-y-3 p-5">
                <div>
                  <h3 className="font-serif text-lg font-bold text-pan-marron">
                    {producto.name}
                  </h3>
                  <p className="mt-1 text-xs font-semibold text-pan-marron/60">
                    {producto.category?.name || "Sin categoría"}
                  </p>
                </div>

                <p className="line-clamp-2 min-h-10 text-sm text-pan-marron/75">
                  {producto.description || "Sin descripción."}
                </p>

                <p className="text-lg font-bold text-pan-naranja">
                  ${Number(producto.price).toLocaleString("es-AR")}
                </p>

                {isOwner && (
                  <div className="border-t border-amber-100 pt-3 text-xs text-pan-marron/60">
                    <p>
                      Modificado por:{" "}
                      <strong className="text-pan-marron">
                        {producto.last_modified_by?.username || "No disponible"}
                      </strong>
                    </p>

                    <p className="mt-1">
                      Última modificación:{" "}
                      {producto.last_modified_at
                        ? new Date(producto.last_modified_at).toLocaleString(
                            "es-AR",
                            {
                              dateStyle: "short",
                              timeStyle: "short",
                            },
                          )
                        : "No disponible"}
                    </p>
                  </div>
                )}

                <div className="flex gap-2 border-t border-amber-100 pt-3">
                  <button
                    type="button"
                    onClick={() => abrirEditar(producto)}
                    className="flex-1 rounded-lg border border-amber-300 px-3 py-2 text-sm font-bold text-pan-marron transition hover:bg-amber-50"
                  >
                    Editar
                  </button>

                  <button
                    type="button"
                    onClick={() => abrirEliminar(producto)}
                    className="flex-1 rounded-lg border border-red-200 px-3 py-2 text-sm font-bold text-red-600 transition hover:bg-red-50"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-amber-200/90 bg-white p-10 text-center shadow-sm">
          <p className="text-sm text-pan-marron/65">
            Todavía no hay productos registrados.
          </p>
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4">
          <div className="my-auto w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl">
            {modal.tipo === "eliminar" ? (
              <>
                <h3 className="font-serif text-xl font-bold text-pan-marron">
                  Eliminar producto
                </h3>

                <p className="mt-3 text-sm text-pan-marron/75">
                  ¿Estás seguro de que querés eliminar{" "}
                  <strong>{modal.producto.name}</strong>? Esta acción no se
                  puede deshacer.
                </p>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={cerrarModal}
                    disabled={procesando}
                    className="rounded-xl border border-amber-200 px-4 py-2 text-sm font-bold text-pan-marron hover:bg-amber-50 disabled:opacity-50"
                  >
                    Cancelar
                  </button>

                  <button
                    type="button"
                    onClick={eliminarProducto}
                    disabled={procesando}
                    className="rounded-xl bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700 disabled:opacity-50"
                  >
                    {procesando ? "Eliminando..." : "Eliminar"}
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="font-serif text-xl font-bold text-pan-marron">
                  {modal.tipo === "editar"
                    ? "Editar producto"
                    : "Nuevo producto"}
                </h3>

                <form onSubmit={guardarProducto} className="mt-5 space-y-4">
                  <div>
                    <label className="mb-1 block text-xs font-bold uppercase text-pan-marron">
                      Nombre
                    </label>
                    <input
                      name="name"
                      type="text"
                      value={formulario.name}
                      onChange={cambiarFormulario}
                      required
                      minLength={1}
                      className="w-full rounded-xl border border-amber-200 bg-amber-50/30 px-3.5 py-2 text-sm text-pan-marron focus:border-pan-naranja focus:outline-none"
                      placeholder="Ej: Medialuna de manteca"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-bold uppercase text-pan-marron">
                        Precio ($)
                      </label>
                      <input
                        name="price"
                        type="number"
                        value={formulario.price}
                        onChange={cambiarFormulario}
                        required
                        min="0.01"
                        step="0.01"
                        className="w-full rounded-xl border border-amber-200 bg-amber-50/30 px-3.5 py-2 text-sm text-pan-marron focus:border-pan-naranja focus:outline-none"
                        placeholder="1500"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-bold uppercase text-pan-marron">
                        Categoría
                      </label>
                      <select
                        name="category_id"
                        value={formulario.category_id}
                        onChange={cambiarFormulario}
                        required
                        className="w-full rounded-xl border border-amber-200 bg-amber-50/30 px-3.5 py-2 text-sm text-pan-marron focus:border-pan-naranja focus:outline-none"
                      >
                        <option value="">Seleccionar...</option>
                        {categorias.map((categoria) => (
                          <option key={categoria.id} value={categoria.id}>
                            {categoria.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-bold uppercase text-pan-marron">
                      URL de la imagen
                    </label>
                    <input
                      name="image_url"
                      type="url"
                      value={formulario.image_url}
                      onChange={cambiarFormulario}
                      className="w-full rounded-xl border border-amber-200 bg-amber-50/30 px-3.5 py-2 text-sm text-pan-marron focus:border-pan-naranja focus:outline-none"
                      placeholder="https://ejemplo.com/imagen.jpg"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-bold uppercase text-pan-marron">
                      Descripción
                    </label>
                    <textarea
                      name="description"
                      rows="3"
                      value={formulario.description}
                      onChange={cambiarFormulario}
                      className="w-full rounded-xl border border-amber-200 bg-amber-50/30 px-3.5 py-2 text-sm text-pan-marron focus:border-pan-naranja focus:outline-none"
                      placeholder="Detalles sobre el producto..."
                    />
                  </div>

                  {error && (
                    <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                      {error}
                    </p>
                  )}

                  <div className="flex justify-end gap-3 border-t border-amber-100 pt-4">
                    <button
                      type="button"
                      onClick={cerrarModal}
                      disabled={procesando}
                      className="rounded-xl border border-amber-200 px-4 py-2 text-sm font-bold text-pan-marron hover:bg-amber-50 disabled:opacity-50"
                    >
                      Cancelar
                    </button>

                    <button
                      type="submit"
                      disabled={procesando}
                      className="rounded-xl bg-pan-naranja px-5 py-2 text-sm font-bold text-white transition hover:bg-pan-naranja-hover disabled:opacity-50"
                    >
                      {procesando
                        ? "Guardando..."
                        : modal.tipo === "editar"
                          ? "Guardar cambios"
                          : "Crear producto"}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminProductos;

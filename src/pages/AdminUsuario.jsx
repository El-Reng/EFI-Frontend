import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

function AdminUsuarios() {
  const { fetchAutenticado, usuario } = useAuth();

  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [procesando, setProcesando] = useState(false);
  const [error, setError] = useState("");

  const [modal, setModal] = useState(null);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [esOwner, setEsOwner] = useState(false);
  const [confirmacion, setConfirmacion] = useState("");

  const obtenerUsuarios = useCallback(async () => {
    try {
      setCargando(true);
      setError("");

      const respuesta = await fetchAutenticado(`${API_URL}/users/?size=100`);

      if (!respuesta.ok) {
        throw new Error("No se pudieron cargar los usuarios.");
      }

      const datos = await respuesta.json();
      setUsuarios(datos.items || datos);
    } catch (error) {
      setError(error.message);
    } finally {
      setCargando(false);
    }
  }, [fetchAutenticado]);

  useEffect(() => {
    obtenerUsuarios();
  }, [obtenerUsuarios]);

  const abrirCrear = () => {
    setUsuarioSeleccionado(null);
    setNombre("");
    setPassword("");
    setEsOwner(false);
    setError("");
    setModal("crear");
  };

  const abrirEditar = (cuenta) => {
    setUsuarioSeleccionado(cuenta);
    setNombre(cuenta.username);
    setPassword("");
    setError("");
    setModal("editar");
  };

  const abrirEliminar = (cuenta) => {
    setUsuarioSeleccionado(cuenta);
    setConfirmacion("");
    setError("");
    setModal("eliminar");
  };

  const cerrarModal = () => {
    if (procesando) return;

    setModal(null);
    setUsuarioSeleccionado(null);
    setNombre("");
    setPassword("");
    setEsOwner(false);
    setConfirmacion("");
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

  const guardarUsuario = async (e) => {
    e.preventDefault();

    if (!nombre.trim() || !password) {
      setError("El usuario y la contraseña son obligatorios.");
      return;
    }

    try {
      setProcesando(true);
      setError("");

      const esEdicion = modal === "editar";
      const url = esEdicion
        ? `${API_URL}/users/${usuarioSeleccionado.id}`
        : `${API_URL}/users/`;

      const cuerpo = {
        username: nombre.trim(),
        password,
      };

      if (!esEdicion) {
        cuerpo.is_owner = esOwner;
      }

      const respuesta = await fetchAutenticado(url, {
        method: esEdicion ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cuerpo),
      });

      if (!respuesta.ok) {
        throw new Error(await obtenerMensajeError(respuesta));
      }

      cerrarModal();
      await obtenerUsuarios();
    } catch (error) {
      setError(error.message);
    } finally {
      setProcesando(false);
    }
  };

  const eliminarUsuario = async () => {
    if (confirmacion !== usuarioSeleccionado.username) {
      setError("El nombre de usuario no coincide.");
      return;
    }

    try {
      setProcesando(true);
      setError("");

      const respuesta = await fetchAutenticado(
        `${API_URL}/users/${usuarioSeleccionado.id}`,
        {
          method: "DELETE",
        },
      );

      if (!respuesta.ok) {
        throw new Error(await obtenerMensajeError(respuesta));
      }

      cerrarModal();
      await obtenerUsuarios();
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
            Cuentas y Permisos
          </h2>
          <p className="mt-1 text-sm text-pan-marron/75">
            Gestioná las cuentas y permisos de los administradores.
          </p>
        </div>

        <button
          onClick={abrirCrear}
          className="rounded-xl bg-pan-naranja px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-pan-naranja-hover hover:shadow-md"
        >
          + Nuevo usuario
        </button>
      </div>

      {error && !modal && (
        <p className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="overflow-hidden rounded-2xl border border-amber-200/90 bg-white shadow-md">
        <div className="border-b border-amber-100 bg-amber-50/50 px-6 py-4">
          <h3 className="text-sm font-bold text-pan-marron">
            Administradores del sistema
          </h3>
        </div>

        {cargando ? (
          <p className="p-8 text-center text-sm text-pan-marron/60">
            Cargando usuarios...
          </p>
        ) : usuarios.length === 0 ? (
          <p className="p-8 text-center text-sm text-pan-marron/60">
            No hay usuarios registrados.
          </p>
        ) : (
          <div className="divide-y divide-amber-100">
            {usuarios.map((cuenta) => {
              const esMiCuenta = cuenta.id === usuario?.id;

              return (
                <div
                  key={cuenta.id}
                  className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-100 text-lg">
                      {cuenta.is_owner ? "👑" : "👤"}
                    </div>

                    <div>
                      <p className="font-semibold text-pan-marron">
                        {cuenta.username}
                        {esMiCuenta && (
                          <span className="ml-2 text-xs font-normal text-pan-marron/50">
                            (Vos)
                          </span>
                        )}
                      </p>

                      <p className="mt-1 text-xs text-pan-marron/60">
                        {cuenta.is_owner
                          ? "Super Admin · Propietario"
                          : "Administrador"}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 sm:justify-end">
                    <button
                      onClick={() => abrirEditar(cuenta)}
                      disabled={esMiCuenta}
                      title={
                        esMiCuenta
                          ? "Modificá tu cuenta desde Mi cuenta"
                          : "Editar usuario"
                      }
                      className="flex-1 rounded-lg border border-amber-300 px-3 py-2 text-sm font-semibold text-pan-marron transition-colors hover:bg-amber-50 disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => abrirEliminar(cuenta)}
                      disabled={esMiCuenta}
                      title={
                        esMiCuenta
                          ? "No podés eliminar tu propia cuenta desde aquí"
                          : "Eliminar usuario"
                      }
                      className="flex-1 rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            {modal === "eliminar" ? (
              <>
                <h3 className="font-serif text-xl font-bold text-pan-marron">
                  Eliminar usuario
                </h3>

                <p className="mt-3 text-sm text-pan-marron/75">
                  Vas a eliminar la cuenta{" "}
                  <strong>{usuarioSeleccionado.username}</strong>.
                </p>

                <p className="mt-2 text-sm text-pan-marron/75">
                  Para confirmar, escribí su nombre de usuario:
                </p>

                <input
                  type="text"
                  value={confirmacion}
                  onChange={(e) => setConfirmacion(e.target.value)}
                  placeholder={usuarioSeleccionado.username}
                  className="mt-3 w-full rounded-xl border border-amber-200 bg-amber-50/30 px-3.5 py-2.5 text-sm text-pan-marron outline-none focus:border-pan-naranja"
                />
              </>
            ) : (
              <>
                <h3 className="font-serif text-xl font-bold text-pan-marron">
                  {modal === "crear" ? "Nuevo usuario" : "Editar usuario"}
                </h3>

                <form onSubmit={guardarUsuario} className="mt-5 space-y-4">
                  <div>
                    <label className="mb-1 block text-sm font-semibold text-pan-marron">
                      Nombre de usuario
                    </label>
                    <input
                      type="text"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      placeholder="Ej: juan"
                      required
                      className="w-full rounded-xl border border-amber-200 bg-amber-50/30 px-3.5 py-2.5 text-sm text-pan-marron outline-none focus:border-pan-naranja"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-semibold text-pan-marron">
                      {modal === "crear" ? "Contraseña" : "Nueva contraseña"}
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Ingresá una contraseña"
                      required
                      className="w-full rounded-xl border border-amber-200 bg-amber-50/30 px-3.5 py-2.5 text-sm text-pan-marron outline-none focus:border-pan-naranja"
                    />
                  </div>

                  {modal === "crear" && (
                    <label className="flex items-center gap-2 text-sm font-medium text-pan-marron">
                      <input
                        type="checkbox"
                        checked={esOwner}
                        onChange={(e) => setEsOwner(e.target.checked)}
                        className="h-4 w-4 rounded border-amber-300 text-pan-naranja focus:ring-pan-naranja"
                      />
                      Asignar rol de Super Admin (propietario)
                    </label>
                  )}

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
                    onClick={eliminarUsuario}
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

export default AdminUsuarios;

import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Cuenta() {
  const { usuario, token, actualizarUsuario } = useAuth();

  const [username, setUsername] = useState(usuario?.username || "");
  const [claveActual, setClaveActual] = useState("");
  const [claveNueva, setClaveNueva] = useState("");
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  async function manejarEnvio(e) {
    e.preventDefault();
    setError("");
    setMensaje("");
    setCargando(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";

      const datos = {
        current_password: claveActual,
        username: username.trim(),
      };

      if (claveNueva) {
        datos.password = claveNueva;
      }

      const respuesta = await fetch(`${apiUrl}/users/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(datos),
      });

      const resultado = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(
          typeof resultado.detail === "string"
            ? resultado.detail
            : "No se pudieron actualizar los datos de la cuenta",
        );
      }

      actualizarUsuario(resultado);
      setClaveActual("");
      setClaveNueva("");
      setMensaje("Los datos de tu cuenta se actualizaron correctamente.");
    } catch (error) {
      setError(error.message);
    } finally {
      setCargando(false);
    }
  }

  return (
    <section className="mx-auto w-full max-w-2xl px-4 py-10">
      <div className="rounded-2xl border border-amber-200/90 bg-white p-6 shadow-md sm:p-8">
        <div className="mb-6 border-b border-amber-200/80 pb-4">
          <h1 className="font-serif text-3xl font-bold text-pan-marron">
            Mi cuenta
          </h1>
          <p className="mt-1 text-sm text-pan-marron/75">
            Modificá tus datos personales de acceso.
          </p>
        </div>

        <form onSubmit={manejarEnvio} className="flex flex-col gap-5">
          <div>
            <label className="mb-1 block text-sm font-bold text-pan-marron">
              Nombre de usuario
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength={1}
              className="w-full rounded-xl border border-amber-200 bg-amber-50/30 px-3.5 py-2.5 text-sm text-pan-marron focus:border-pan-naranja focus:outline-none focus:ring-2 focus:ring-pan-naranja/20"
            />
          </div>

          <div className="border-t border-amber-100 pt-5">
            <h2 className="font-bold text-pan-marron">Cambiar contraseña</h2>
            <p className="mt-1 text-xs text-pan-marron/65">
              Dejá este campo vacío si no querés cambiarla.
            </p>

            <label className="mb-1 mt-4 block text-sm font-bold text-pan-marron">
              Nueva contraseña
            </label>
            <input
              type="password"
              value={claveNueva}
              onChange={(e) => setClaveNueva(e.target.value)}
              autoComplete="new-password"
              className="w-full rounded-xl border border-amber-200 bg-amber-50/30 px-3.5 py-2.5 text-sm text-pan-marron focus:border-pan-naranja focus:outline-none focus:ring-2 focus:ring-pan-naranja/20"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-bold text-pan-marron">
              Contraseña actual
            </label>
            <input
              type="password"
              value={claveActual}
              onChange={(e) => setClaveActual(e.target.value)}
              autoComplete="current-password"
              required
              className="w-full rounded-xl border border-amber-200 bg-amber-50/30 px-3.5 py-2.5 text-sm text-pan-marron focus:border-pan-naranja focus:outline-none focus:ring-2 focus:ring-pan-naranja/20"
            />
            <p className="mt-1 text-xs text-pan-marron/65">
              Necesitamos verificar tu contraseña actual para guardar los
              cambios.
            </p>
          </div>

          {error && (
            <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-600">
              {error}
            </p>
          )}

          {mensaje && (
            <p className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm font-medium text-green-700">
              {mensaje}
            </p>
          )}

          <button
            type="submit"
            disabled={cargando}
            className="cursor-pointer rounded-xl bg-pan-naranja px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-pan-naranja-hover disabled:cursor-not-allowed disabled:opacity-50"
          >
            {cargando ? "Guardando..." : "Guardar cambios"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Cuenta;

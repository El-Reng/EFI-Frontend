import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const mensajeSesion = location.state?.mensaje;

  async function manejarEnvio(e) {
    e.preventDefault();
    setError("");
    setCargando(true);

    const resultado = await login(usuario, clave);

    setCargando(false);

    if (resultado.success) {
      const destino = location.state?.from;
      const ruta = destino
        ? `${destino.pathname}${destino.search || ""}${destino.hash || ""}`
        : "/";

      navigate(ruta, { replace: true });
    } else {
      setError(
        resultado.error || "Credenciales incorrectas o error en el servidor",
      );
    }
  }

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-sm flex-col justify-center px-4 py-12">
      <div className="rounded-2xl border border-amber-200/90 bg-white p-8 shadow-xl">
        <h1 className="text-center font-serif text-2xl font-bold text-pan-marron">
          Iniciar sesión
        </h1>
        <p className="mt-1 text-center text-xs text-pan-marron/75">
          Solo personal de la panadería
        </p>

        <form onSubmit={manejarEnvio} className="mt-6 flex flex-col gap-4">
          <div>
            <label className="text-xs font-bold text-pan-marron">Usuario</label>
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="admin"
              autoComplete="username"
              className="mt-1 w-full rounded-xl border border-amber-200 bg-amber-50/40 p-2.5 text-sm text-pan-marron transition focus:border-pan-naranja focus:outline-none focus:ring-2 focus:ring-pan-naranja/20"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-pan-marron">Clave</label>
            <input
              type="password"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              placeholder="Contraseña"
              autoComplete="current-password"
              className="mt-1 w-full rounded-xl border border-amber-200 bg-amber-50/40 p-2.5 text-sm text-pan-marron transition focus:border-pan-naranja focus:outline-none focus:ring-2 focus:ring-pan-naranja/20"
              required
            />
          </div>

          {mensajeSesion && (
            <p className="rounded-lg border border-amber-200 bg-amber-50 p-2.5 text-center text-xs font-semibold text-amber-800">
              {mensajeSesion}
            </p>
          )}

          {error && (
            <p className="rounded-lg border border-red-200 bg-red-50 p-2.5 text-center text-xs font-semibold text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={cargando}
            className="mt-2 cursor-pointer rounded-xl bg-pan-naranja py-2.5 text-sm font-bold text-white shadow-md transition hover:bg-pan-naranja-hover hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
          >
            {cargando ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => navigate("/")}
          className="mt-4 w-full cursor-pointer text-center text-xs text-pan-marron/70 hover:underline"
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
}

export default Login;

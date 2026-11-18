import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login({ onLoginExitoso, onVolver }) {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const { login } = useAuth();

  async function manejarEnvio(e) {
    e.preventDefault();
    setError("");
    setCargando(true);

    const resultado = await login(usuario, clave);
    setCargando(false);

    if (resultado.success) {
      if (onLoginExitoso) {
        onLoginExitoso(resultado.isOwner);
      } else {
        navigate("/admin");
      }
    } else {
      setError(resultado.error || "Credenciales incorrectas o error en el servidor");
    }
  }

  function volver() {
    if (onVolver) {
      onVolver();
    } else {
      navigate("/");
    }
  }

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-sm flex-col justify-center px-4 py-12">
      <div className="rounded-2xl border border-amber-200/90 bg-white p-8 shadow-xl">
        <h1 className="font-serif text-2xl font-bold text-center text-[#3D1C06]">
          Iniciar sesión
        </h1>
        <p className="mt-1 text-xs text-center text-[#3D1C06]/75">
          Solo personal de la panadería
        </p>

        <form onSubmit={manejarEnvio} className="mt-6 flex flex-col gap-4">
          <div>
            <label className="text-xs font-bold text-[#3D1C06]">Usuario</label>
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="admin"
              className="mt-1 w-full rounded-xl border border-amber-200 bg-amber-50/40 p-2.5 text-sm text-[#3D1C06] focus:border-[#D96B27] focus:outline-none focus:ring-2 focus:ring-[#D96B27]/20 transition"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#3D1C06]">Clave</label>
            <input
              type="password"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              placeholder="1234"
              className="mt-1 w-full rounded-xl border border-amber-200 bg-amber-50/40 p-2.5 text-sm text-[#3D1C06] focus:border-[#D96B27] focus:outline-none focus:ring-2 focus:ring-[#D96B27]/20 transition"
              required
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 p-2.5 text-xs font-semibold text-red-600 text-center border border-red-200">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={cargando}
            className="mt-2 rounded-xl bg-[#D96B27] py-2.5 text-sm font-bold text-white shadow-md transition hover:bg-[#B05219] hover:shadow-lg disabled:opacity-50 cursor-pointer"
          >
            {cargando ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        <button
          type="button"
          onClick={volver}
          className="mt-4 w-full text-center text-xs text-[#3D1C06]/70 hover:underline cursor-pointer"
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
}

export default Login;

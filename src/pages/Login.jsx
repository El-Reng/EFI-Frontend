import { useState } from 'react'
import {useAuth} from '../context/AuthContext' 

function Login({ onLoginExitoso, onVolver }) {
  const [usuario, setUsuario] = useState('')
  const [clave, setClave] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  // obtenemos la función login de nuestro authContext
  const {login} = useAuth()

  // funcion que se ejecuta al apretar el boton ingresar
  async function manejarEnvio(e) {
    e.preventDefault()
    setError('')
    setCargando(true)
  

    // conectamos el login con la API
    const resultado = await login(usuario, clave)
    setCargando(false)

    if (resultado.success) {
      if (onLoginExitoso) {
        onLoginExitoso(resultado.isOwner)
      } else {
        setError(resultado.error || 'Credenciales incorrectas o error en el servidor')
      }
    }
  }


  return (
    <main className="mx-auto flex min-h-[60vh] max-w-sm flex-col justify-center px-4 py-12">
      <div className="rounded-xl border-2 border-amber-200 bg-white p-6 shadow-md">
        <h1 className="font-serif text-2xl font-bold text-center">
          iniciar sesion
        </h1>
        <p className="mt-1 text-xs text-center opacity-80">
          solo personal de la panaderia
        </p>

        <form onSubmit={manejarEnvio} className="mt-6 flex flex-col gap-4">
          <div>
            <label className="text-xs font-bold">usuario</label>
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="admin"
              className="mt-1 w-full rounded-lg border-2 border-amber-300 bg-ambar-50 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold">clave</label>
            <input
              type="password"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              placeholder="1234"
              className="mt-1 w-full rounded-lg border-2 border-amber-300 bg-ambar-50 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>

          {/* cartel de error en rojo si la clave es incorrecta */}
          {error && (
            <p className="rounded bg-red-100 p-2 text-xs font-bold text-red-700 text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={cargando}
            className="rounded-lg border-2 border-amber-600 bg-amber-600 py-2 font-bold text-white transition-all hover:bg-amber-600"
          >
            {cargando ? 'ingresando...' : 'ingresar'}
          </button>
        </form>

        <button
          type="button"
          onClick={onVolver}
          className="mt-4 w-full text-center text-xs underline opacity-80"
        >
          volver al inicio
        </button>
      </div>
    </main>
  )
}

export default Login
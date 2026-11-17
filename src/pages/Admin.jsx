import { useState } from 'react'
import { productos as listaInicial } from '../data/productos'

function Admin() {
  // aca se guarda la lista de productos en el estado
  const [productos, setProductos] = useState(listaInicial)

  // funcion para borrar un producto de la tabla
  function borrarProducto(id) {
    const confirmacion = window.confirm('seguro que queres borrar este producto?')
    if (confirmacion) {
      // aca se filtra la lista para dejar todos menos el que tiene este id
      const nuevaLista = productos.filter((p) => p.id !== id)
      setProductos(nuevaLista)
    }
  }

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
      {/* titulo de la pagina */}
      <h1 className="font-titulo text-3xl font-bold">panel de administracion</h1>
      <p className="mt-1 text-sm opacity-80">gestiona los productos de la panaderia</p>

      {/* tabla de productos */}
      <div className="mt-6 overflow-x-auto rounded-xl border-2 border-borde bg-superficie">
        <table className="w-full text-left text-sm">
          <thead className="border-b-2 border-borde bg-marca/30 text-xs font-bold">
            <tr>
              <th className="p-3">producto</th>
              <th className="p-3">categoria</th>
              <th className="p-3">precio</th>
              <th className="p-3 text-right">accion</th>
            </tr>
          </thead>
          <tbody className="divide-y border-borde/20">
            {productos.map((p) => (
              <tr key={p.id}>
                <td className="p-3 font-semibold">{p.nombre}</td>
                <td className="p-3">{p.categoria}</td>
                <td className="p-3 font-bold">${p.precio}</td>
                <td className="p-3 text-right">
                  <button
                    type="button"
                    onClick={() => borrarProducto(p.id)}
                    className="rounded border border-red-500 bg-red-100 px-2 py-1 text-xs font-bold text-red-700"
                  >
                    borrar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}

export default Admin
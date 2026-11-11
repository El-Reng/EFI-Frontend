function Nosotros() {
  const valores = [
    {
      icono: '🌾',
      titulo: 'Materia prima de primera',
      descripcion: 'Harinas orgánicas seleccionadas y manteca pura. Cero conservantes artificiales.',
    },
    {
      icono: '⏳',
      titulo: 'Fermentación lenta',
      descripcion: 'Respetamos los tiempos de la masa madre: 24 horas de reposo para una digestión liviana.',
    },
    {
      icono: '❤️',
      titulo: 'Hecho a mano cada mañana',
      descripcion: 'Nos levantamos a las 4:00 AM para que cuando abras la puerta sientas el olor a pan caliente.',
    },
  ]

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:py-12">
      {/* Portada / Hero de Nosotros */}
      <section className="text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-acento">
          Desde 1984
        </span>
        <h1 className="mt-2 font-titulo text-3xl font-bold sm:text-5xl">
          Nuestra Historia y Pasión
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base opacity-90 sm:text-lg">
          Tres generaciones dedicadas a hornear momentos especiales con el sabor
          inconfundible de lo casero.
        </p>
      </section>

      {/* Historia con imagen o bloque destacado */}
      <section className="mt-12 grid gap-8 rounded-2xl border-2 border-borde bg-superficie p-6 shadow-sm md:grid-cols-2 md:p-10">
        <div className="flex flex-col justify-center">
          <h2 className="font-titulo text-2xl font-bold sm:text-3xl">
            El calor del horno a leña en el barrio
          </h2>
          <p className="mt-4 text-sm leading-relaxed opacity-90 sm:text-base">
            Comenzamos como un pequeño emprendimiento familiar con una receta de masa madre heredada de los abuelos. Con el paso de los años, mantuvimos intacta la misma filosofía: el pan de verdad no lleva apuro ni aditivos.
          </p>
          <p className="mt-3 text-sm leading-relaxed opacity-90 sm:text-base">
            Hoy seguimos elaborando cada factura, pan de campo y especialidad a mano en el mismo rincón de siempre, combinando técnicas artesanales con ingredientes de productores locales.
          </p>
        </div>

        <div className="flex aspect-video sm:aspect-auto items-center justify-center overflow-hidden rounded-xl border-2 border-borde bg-marca/20">
          <div className="p-8 text-center text-texto-acento">
            <span className="text-6xl">🥖</span>
            <p className="mt-3 font-titulo text-xl font-bold">Horneado con dedicación</p>
            <p className="text-xs opacity-80">Masa madre & fermentación natural</p>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="mt-14">
        <h2 className="text-center font-titulo text-2xl font-bold sm:text-3xl">
          Nuestros Pilares
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {valores.map((v, i) => (
            <div
              key={i}
              className="flex flex-col items-center rounded-xl border-2 border-borde bg-superficie p-6 text-center shadow-sm"
            >
              <span className="text-4xl">{v.icono}</span>
              <h3 className="mt-3 font-titulo text-lg font-bold">{v.titulo}</h3>
              <p className="mt-2 text-sm opacity-85 leading-relaxed">{v.descripcion}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Horarios y Ubicación */}
      <section className="mt-14 rounded-2xl border-2 border-borde bg-marca/15 p-6 sm:p-8">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <h3 className="font-titulo text-xl font-bold text-texto-acento">
              📍 Dónde encontrarnos
            </h3>
            <p className="mt-2 text-sm font-semibold">Av. Principal 1234, Barrio Norte</p>
            <p className="text-sm opacity-80">A metros de la plaza central. Estacionamiento para clientes.</p>
            <p className="mt-3 text-sm">
              <span className="font-semibold">Teléfono / WhatsApp:</span> +54 9 11 2345-6789
            </p>
          </div>

          <div>
            <h3 className="font-titulo text-xl font-bold text-texto-acento">
              🕒 Días y Horarios de Atención
            </h3>
            <ul className="mt-2 space-y-1 text-sm">
              <li><span className="font-semibold">Lunes a Viernes:</span> 07:00 a 20:00 hs</li>
              <li><span className="font-semibold">Sábados:</span> 07:30 a 20:30 hs</li>
              <li><span className="font-semibold">Domingos y Feriados:</span> 08:00 a 13:30 hs</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Nosotros
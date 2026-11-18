function Nosotros() {
  const pilares = [
    {
      icono: "🔥",
      titulo: "Horneado cada mañana",
      descripcion:
        "Nos levantamos a las 4:00 AM para que cuando abras la puerta sientas el olor a pan caliente recién salido del horno.",
    },
    {
      icono: "🌾",
      titulo: "Ingredientes naturales",
      descripcion:
        "Harinas orgánicas seleccionadas, manteca pura y fermentación lenta de 24 horas con masa madre viva.",
    },
    {
      icono: "🎁",
      titulo: "Pedidos para reuniones",
      descripcion:
        "Facturas surtidas, tortas y mesas dulces listas con la frescura que tus encuentros familiares merecen.",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:py-12 space-y-14">
      {/* Portada / Hero de Nosotros */}
      <section className="text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-pan-naranja">
          Desde 1984
        </span>
        <h1 className="mt-2 font-serif text-4xl sm:text-6xl font-bold text-pan-marron">
          Nuestra Historia y Pasión
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-pan-marron/85 sm:text-lg">
          Tres generaciones dedicadas a hornear momentos especiales con el sabor
          inconfundible de lo artesanal.
        </p>
      </section>

      {/* Banner "Nuestra promesa" (Inspirado en el concepto gráfico con medialuna y rodillo) */}
      <section className="relative overflow-hidden rounded-3xl border border-amber-200/90 bg-white shadow-lg">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 px-6 py-10 sm:px-12 sm:py-12 text-center sm:text-left">
          {/* Ilustración Medialuna izquierda */}
          <div className="shrink-0 flex justify-center">
            <div className="flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-2xl bg-amber-50 border border-amber-200/60 shadow-inner">
              <span className="text-5xl -rotate-12 inline-block transition-transform duration-300 hover:scale-110">
                🥐
              </span>
            </div>
          </div>

          {/* Texto central */}
          <div className="flex-1 text-center max-w-xl mx-auto space-y-3">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-pan-marron">
              Nuestra promesa
            </h2>
            <p className="text-sm sm:text-base text-pan-marron/85 leading-relaxed">
              Elaborar cada pieza respetando los tiempos de la masa madre, sin
              conservantes ni atajos industriales. Creemos que la paciencia es
              el ingrediente secreto del pan de verdad.
            </p>
          </div>

          {/* Ilustración Rodillo derecha */}
          <div className="shrink-0 flex justify-center">
            <div className="flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-2xl bg-amber-50 border border-amber-200/60 shadow-inner">
              <span className="text-5xl rotate-12 inline-block transition-transform duration-300 hover:scale-110">
                🥖
              </span>
            </div>
          </div>
        </div>

        {/* Onda decorativa en el pie de la tarjeta */}
        <div className="w-full overflow-hidden leading-none -mb-px">
          <svg
            className="w-full h-4 sm:h-6 text-pan-amarillo fill-current"
            viewBox="0 0 1440 24"
            preserveAspectRatio="none"
          >
            <path d="M0,24 C240,4 480,20 720,8 C960,20 1200,4 1440,24 L1440,24 L0,24 Z" />
          </svg>
        </div>
      </section>

      {/* Por qué elegirnos (Inspirado en el concepto con iconos vectoriales en columnas) */}
      <section>
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-pan-marron">
            Por qué elegirnos
          </h2>
          <p className="mt-2 text-sm text-pan-marron/75">
            Cuidamos cada detalle desde la harina hasta tu mesa.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {pilares.map((p, i) => (
            <div
              key={i}
              className="flex flex-col items-center rounded-2xl border border-amber-200/90 bg-white p-7 text-center shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 border border-amber-200/60 text-pan-naranja shadow-xs">
                <span className="text-4xl leading-none">{p.icono}</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-pan-marron">
                {p.titulo}
              </h3>
              <p className="mt-2 text-sm text-pan-marron/85 leading-relaxed">
                {p.descripcion}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Historia con bloque destacado */}
      <section className="grid gap-8 rounded-2xl border border-amber-200/90 bg-white p-6 shadow-md md:grid-cols-2 md:p-10">
        <div className="flex flex-col justify-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-pan-marron">
            El calor del horno en el barrio
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-pan-marron/90 sm:text-base">
            Comenzamos como un pequeño emprendimiento familiar con una receta de
            masa madre heredada de los abuelos. Con el paso de los años,
            mantuvimos intacta la misma filosofía: el pan de verdad no lleva
            apuro ni aditivos.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-pan-marron/90 sm:text-base">
            Hoy seguimos elaborando cada factura, pan de campo y especialidad a
            mano en el mismo rincón de siempre, combinando técnicas artesanales
            con ingredientes de productores locales.
          </p>
        </div>

        <div className="flex aspect-video sm:aspect-auto items-center justify-center overflow-hidden rounded-2xl border border-amber-100 bg-amber-50/70 shadow-inner">
          <div className="p-8 text-center text-pan-marron flex flex-col items-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-amber-100/80 border border-amber-200 mb-3 shadow-xs">
              <span className="text-4xl">🥖</span>
            </div>
            <p className="font-serif text-2xl font-bold">
              Horneado con dedicación
            </p>
            <p className="text-xs text-pan-marron/75 mt-1 font-medium">
              Masa madre & fermentación natural
            </p>
          </div>
        </div>
      </section>

      {/* Horarios y Ubicación */}
      <section className="rounded-2xl border border-amber-300/80 bg-pan-amarillo/20 p-6 shadow-md sm:p-8">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex items-start gap-4">
            <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white border border-amber-200 text-pan-naranja shadow-xs">
              <span className="text-lg leading-none">📍</span>
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-pan-marron">
                Dónde encontrarnos
              </h3>
              <p className="mt-1 text-sm font-semibold text-pan-marron">
                Av. Principal 1234, Barrio Norte
              </p>
              <p className="text-xs text-pan-marron/75 mt-0.5">
                A metros de la plaza central. Estacionamiento para clientes.
              </p>
              <p className="mt-2 text-xs font-semibold text-pan-marron">
                Teléfono / WhatsApp: +54 9 11 2345-6789
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white border border-amber-200 text-pan-naranja shadow-xs">
              <span className="text-lg leading-none">🕒</span>
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-pan-marron">
                Días y Horarios de Atención
              </h3>
              <ul className="mt-1 space-y-1 text-xs text-pan-marron/90">
                <li>
                  <span className="font-semibold">Lunes a Viernes:</span> 07:00
                  a 20:00 hs
                </li>
                <li>
                  <span className="font-semibold">Sábados:</span> 07:30 a 20:30
                  hs
                </li>
                <li>
                  <span className="font-semibold">Domingos y Feriados:</span>{" "}
                  08:00 a 13:30 hs
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Nosotros;

import { useState, useEffect } from 'react'

function Carousel({ slides, intervalo = 5000 }) {
  const [actual, setActual] = useState(0)

  const siguiente = () => setActual((i) => (i + 1) % slides.length)
  const anterior = () => setActual((i) => (i - 1 + slides.length) % slides.length)

  // avanza solo, y se reinicia el tiempo cuando se cambia a mano
  useEffect(() => {
    const id = setInterval(siguiente, intervalo)
    return () => clearInterval(id)
  }, [actual, intervalo, slides.length])

  return (
    <div className="relative overflow-hidden rounded-xl border-2 border-borde">
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${actual * 100}%)` }}
      >
        {slides.map((s) => (
          <div
            key={s.id}
            className="relative flex h-64 w-full shrink-0 items-center justify-center bg-marca p-8 text-center text-texto-acento sm:h-80"
          >
            {s.imagen && (
              <>
                <img src={s.imagen} alt={s.titulo} className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-black/50" />
              </>
            )}
            <div className={`relative ${s.imagen ? 'text-white' : ''}`}>
              <h2 className="font-titulo text-3xl font-bold sm:text-4xl">{s.titulo}</h2>
              <p className="mt-2 text-lg">{s.subtitulo}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={anterior}
        aria-label="Anterior"
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-superficie/80 px-3 py-1 text-xl text-texto"
      >
        ‹
      </button>
      <button
        onClick={siguiente}
        aria-label="Siguiente"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-superficie/80 px-3 py-1 text-xl text-texto"
      >
        ›
      </button>

      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setActual(i)}
            aria-label={`Ir a la diapositiva ${i + 1}`}
            className={`h-3 w-3 rounded-full border-2 border-borde ${i === actual ? 'bg-acento' : 'bg-superficie'}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Carousel
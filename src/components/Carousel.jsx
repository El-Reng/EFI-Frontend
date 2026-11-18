import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Carousel({ slides, intervalo = 6000 }) {
  const [actual, setActual] = useState(0);

  const siguiente = () => setActual((i) => (i + 1) % slides.length);
  const anterior = () =>
    setActual((i) => (i - 1 + slides.length) % slides.length);

  // Avanza solo periódicamente
  useEffect(() => {
    const id = setInterval(() => {
      setActual((i) => (i + 1) % slides.length);
    }, intervalo);
    return () => clearInterval(id);
  }, [intervalo, slides.length]);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-pan-amarillo shadow-lg border border-amber-300/70">
      <div
        className="flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${actual * 100}%)` }}
      >
        {slides.map((s) => (
          <div
            key={s.id}
            className="flex w-full shrink-0 flex-col md:flex-row items-center justify-between gap-6 px-8 py-10 sm:px-14 sm:py-12"
          >
            {/* Texto y llamado a la acción */}
            <div className="max-w-md space-y-4 text-center md:text-left z-10">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-pan-marron leading-tight tracking-tight">
                {s.titulo}
              </h2>
              <p className="text-base sm:text-lg text-pan-marron/85 font-medium">
                {s.subtitulo}
              </p>
              <div className="pt-2">
                <Link
                  to={s.botonLink || "/productos"}
                  className="inline-block rounded-full bg-pan-naranja px-6 py-2.5 text-sm sm:text-base font-bold text-white shadow-md transition-all duration-200 hover:bg-pan-naranja-hover hover:shadow-lg hover:-translate-y-0.5"
                >
                  {s.botonTexto || "Ver catálogo"}
                </Link>
              </div>
            </div>

            {/* Imagen con recorte orgánico característico */}
            {s.imagen && (
              <div className="w-full md:w-1/2 flex justify-center md:justify-end z-10">
                <img
                  src={s.imagen}
                  alt={s.titulo}
                  className="h-56 sm:h-64 md:h-72 w-full max-w-md object-cover shadow-lg rounded-tl-[40px] rounded-br-[40px] rounded-tr-[100px] rounded-bl-[100px]"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Flechas de navegación circular con sombra */}
      <button
        onClick={anterior}
        aria-label="Anterior"
        className="absolute left-3 top-1/2 -translate-y-1/2 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white/95 text-xl font-bold text-pan-marron shadow-md transition-all duration-200 hover:bg-white hover:scale-105 cursor-pointer"
      >
        ‹
      </button>
      <button
        onClick={siguiente}
        aria-label="Siguiente"
        className="absolute right-3 top-1/2 -translate-y-1/2 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white/95 text-xl font-bold text-pan-marron shadow-md transition-all duration-200 hover:bg-white hover:scale-105 cursor-pointer"
      >
        ›
      </button>

      {/* Indicadores de paginación */}
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setActual(i)}
            aria-label={`Ir a la diapositiva ${i + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
              i === actual
                ? "w-6 bg-pan-naranja shadow-xs"
                : "w-2.5 bg-white/80 hover:bg-white shadow-xs"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;

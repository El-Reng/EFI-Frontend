function Footer() {
  // 12 ondas continuas a lo largo de 1440px de ancho con altura compacta
  const wavePoints = Array.from({ length: 12 }, (_, i) => {
    const x = i * 120;
    return `C ${x + 30} 24, ${x + 45} 4, ${x + 60} 4 C ${x + 75} 4, ${x + 90} 24, ${x + 120} 24`;
  }).join(" ");

  return (
    <footer className="mt-auto relative text-pan-marron drop-shadow-sm">
      {/* Borde superior ondulado compacto */}
      <div className="w-full overflow-hidden leading-none -mb-[1px]">
        <svg
          className="relative block w-full h-4 sm:h-6 text-pan-amarillo fill-current"
          viewBox="0 0 1440 24"
          preserveAspectRatio="none"
        >
          <path d={`M 0 24 ${wavePoints} L 1440 24 L 0 24 Z`} />
        </svg>
      </div>

      {/* Cuerpo del Footer compacto */}
      <div className="bg-pan-amarillo bg-patron-invertido pb-4 pt-1 shadow-[0_-6px_16px_rgba(0,0,0,0.03)]">
        <div className="mx-auto grid max-w-6xl gap-5 px-4 py-4 sm:grid-cols-3 text-sm">
          <div>
            <p className="font-serif text-lg sm:text-xl font-bold flex items-center gap-2">
              <span className="text-lg leading-none">🥖</span>
              <span>Panadería</span>
            </p>
            <p className="mt-1 text-xs sm:text-sm leading-relaxed opacity-90">
              Pan casero hecho todos los días con masa madre.
            </p>
          </div>

          <div>
            <p className="font-bold flex items-center gap-2 text-sm sm:text-base">
              <span className="text-sm leading-none">🕒</span>
              <span>Horarios</span>
            </p>
            <p className="mt-1 text-xs sm:text-sm opacity-90">
              Lunes a sábado, 7 a 20 hs
            </p>
          </div>

          <div>
            <p className="font-bold flex items-center gap-2 text-sm sm:text-base">
              <span className="text-sm leading-none">📍</span>
              <span>Contacto</span>
            </p>
            <p className="mt-1 text-xs sm:text-sm opacity-90">
              Av. Principal 1234, Barrio Norte
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-4 border-t border-pan-marron/15 pt-2 text-center text-xs opacity-75">
          © 2026 Panadería. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}

export default Footer;

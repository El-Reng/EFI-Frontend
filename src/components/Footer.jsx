function Footer() {
  // 12 ondas continuas a lo largo de 1440px de ancho
  const wavePoints = Array.from({ length: 12 }, (_, i) => {
    const x = i * 120;
    return `C ${x + 30} 36, ${x + 45} 6, ${x + 60} 6 C ${x + 75} 6, ${x + 90} 36, ${x + 120} 36`;
  }).join(" ");

  return (
    <footer className="relative mt-16 text-[#3D1C06] drop-shadow-sm">
      {/* Borde superior ondulado que conecta con el fondo crema del body */}
      <div className="w-full overflow-hidden leading-none -mb-[1px]">
        <svg
          className="relative block w-full h-6 sm:h-9 text-[#F6C824] fill-current"
          viewBox="0 0 1440 36"
          preserveAspectRatio="none"
        >
          <path d={`M 0 36 ${wavePoints} L 1440 36 L 0 36 Z`} />
        </svg>
      </div>

      {/* Cuerpo del Footer con fondo amarillo y dibujos de panadería claros invertidos */}
      <div className="bg-[#F6C824] bg-patron-invertido pb-6 pt-3 shadow-[0_-8px_20px_rgba(0,0,0,0.04)]">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-6 sm:grid-cols-3">
          <div>
            <p className="font-serif text-xl font-bold flex items-center gap-2">
              <span>🥖</span> Panadería
            </p>
            <p className="mt-2 text-sm leading-relaxed opacity-90">
              Pan casero hecho todos los días.
            </p>
          </div>

          <div className="text-sm">
            <p className="font-bold flex items-center gap-1.5 text-base">
              <span>🕒</span> Horarios
            </p>
            <p className="mt-2 opacity-90">Lunes a sábado, 7 a 20 hs</p>
          </div>

          <div className="text-sm">
            <p className="font-bold flex items-center gap-1.5 text-base">
              <span>📍</span> Contacto
            </p>
            <p className="mt-2 opacity-90">Dirección y teléfono acá</p>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-4 border-t border-[#3D1C06]/15 pt-4 text-center text-xs opacity-75">
          © 2026 Panadería. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}

export default Footer;

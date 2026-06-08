"use client";
import { useRef, useEffect } from "react";

// Estrellas fijas dentro de la silueta
const STARS: { x: number; y: number; r: number; o: number }[] = [];
for (let i = 0; i < 160; i++) {
  STARS.push({
    x: 28 + Math.random() * 444,
    y: 8  + Math.random() * 790,
    r: 0.6 + Math.random() * 2.0,
    o: 0.30 + Math.random() * 0.70,
  });
}

export default function Galaxy() {
  const headRef  = useRef<SVGGElement>(null);
  const eyeLRef  = useRef<SVGPolygonElement>(null);
  const eyeRRef  = useRef<SVGPolygonElement>(null);
  const rafRef   = useRef(0);
  const mouse    = useRef({ x: 0, y: 0 });
  const smooth   = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x =  (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    let prev = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - prev) / 1000, 0.05);
      prev = now;
      const lf = 1 - Math.pow(0.04, dt);
      smooth.current.x += (mouse.current.x - smooth.current.x) * lf;
      smooth.current.y += (mouse.current.y - smooth.current.y) * lf;

      const sx = smooth.current.x;
      const sy = smooth.current.y;

      // Cabeza: rotación leve hacia el cursor
      if (headRef.current) {
        headRef.current.style.transform = `rotate(${sx * 6}deg)`;
      }

      // Ojos: se desplazan hacia el cursor (max ±6px)
      const ex = sx * 6;
      const ey = -sy * 4;

      // Ojo izquierdo — diamante alrededor de (188, 152)
      const lx = 188 + ex, ly = 152 + ey;
      eyeLRef.current?.setAttribute("points",
        `${lx - 16},${ly} ${lx},${ly - 9} ${lx + 16},${ly} ${lx},${ly + 9}`
      );

      // Ojo derecho — diamante alrededor de (262, 152)
      const rx2 = 262 + ex, ry2 = 152 + ey;
      eyeRRef.current?.setAttribute("points",
        `${rx2 - 16},${ry2} ${rx2},${ry2 - 9} ${rx2 + 16},${ry2} ${rx2},${ry2 + 9}`
      );

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg
        viewBox="0 0 500 820"
        preserveAspectRatio="xMidYMid meet"
        style={{
          height: "92%",
          maxWidth: "100%",
          // Contorno cyan brillante estilo Alien X
          filter:
            "drop-shadow(0 0 8px rgba(140,215,255,0.90)) " +
            "drop-shadow(0 0 22px rgba(110,195,255,0.55)) " +
            "drop-shadow(0 0 50px rgba(90,170,255,0.25))",
          overflow: "visible",
        }}
      >
        <defs>
          {/* ── SILUETA: clipPath para rellenar el cuerpo ── */}
          <clipPath id="body-clip">
            {/* Cuerno izquierdo */}
            <path d="M 203,80 C 195,58 172,28 178,7 C 183,-3 198,14 200,36 C 203,55 205,68 212,80 Z" />
            {/* Cuerno derecho */}
            <path d="M 297,80 C 305,58 328,28 322,7 C 317,-3 302,14 300,36 C 297,55 295,68 288,80 Z" />
            {/* Cabeza */}
            <ellipse cx="225" cy="160" rx="90" ry="108" />
            {/* Cuello */}
            <rect x="196" y="248" width="58" height="42" rx="6" />
            {/* Brazo izquierdo */}
            <polygon points="40,282 25,295 18,590 80,600 108,320 200,278" />
            {/* Brazo derecho */}
            <polygon points="460,282 475,295 482,590 420,600 392,320 300,278" />
            {/* Torso */}
            <polygon points="112,285 388,285 358,720 142,720" />
          </clipPath>

          {/* ── FILTRO: glow verde para los ojos ── */}
          <filter id="eye-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── RELLENO OSCURO + ESTRELLAS ── */}
        <g clipPath="url(#body-clip)">
          {/* Fondo casi negro con gradiente */}
          <defs>
            <radialGradient id="body-grad" cx="48%" cy="38%" r="62%">
              <stop offset="0%"   stopColor="#0c1535" />
              <stop offset="100%" stopColor="#040810" />
            </radialGradient>
          </defs>
          <rect x="0" y="0" width="500" height="820" fill="url(#body-grad)" />

          {/* Estrellas/puntos dentro del cuerpo */}
          {STARS.map((s, i) => (
            <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="white" opacity={s.o} />
          ))}

          {/* Líneas internas de estructura (pecho, hombros) */}
          <line x1="225" y1="292" x2="225" y2="560" stroke="#1e3a6e" strokeWidth="1.5" opacity="0.6" />
          <line x1="120" y1="320" x2="200" y2="310" stroke="#1e3a6e" strokeWidth="1.2" opacity="0.5" />
          <line x1="330" y1="320" x2="300" y2="310" stroke="#1e3a6e" strokeWidth="1.2" opacity="0.5" />
        </g>

        {/* ── CONTORNO ESTRUCTURAL (sobre el relleno) ── */}
        <g fill="none" stroke="#90ccf0" strokeWidth="2" strokeLinejoin="round" opacity="0.55">
          {/* Cuernos */}
          <path d="M 203,80 C 195,58 172,28 178,7 C 183,-3 198,14 200,36 C 203,55 205,68 212,80" />
          <path d="M 297,80 C 305,58 328,28 322,7 C 317,-3 302,14 300,36 C 297,55 295,68 288,80" />
          {/* Cuello */}
          <line x1="196" y1="248" x2="196" y2="290" />
          <line x1="254" y1="248" x2="254" y2="290" />
          {/* División brazo/torso */}
          <polyline points="200,278 108,320 80,600 18,590" />
          <polyline points="300,278 392,320 420,600 482,590" />
        </g>

        {/* ── CABEZA + OJOS (rota con el cursor) ── */}
        <g
          ref={headRef}
          style={{ transformOrigin: "225px 160px", willChange: "transform" }}
        >
          {/* Sockets de los ojos (fondo oscuro) */}
          <ellipse cx="188" cy="152" rx="22" ry="13" fill="#000a00" />
          <ellipse cx="262" cy="152" rx="22" ry="13" fill="#000a00" />

          {/* Pupilas (diamante angular, se mueven) */}
          <polygon
            ref={eyeLRef}
            points="172,152 188,143 204,152 188,161"
            fill="#00e855"
            filter="url(#eye-glow)"
          />
          <polygon
            ref={eyeRRef}
            points="246,152 262,143 278,152 262,161"
            fill="#00e855"
            filter="url(#eye-glow)"
          />

          {/* Brillo interno (centro más claro) */}
          <polygon points="183,152 188,147 193,152 188,157" fill="#90ffaa" />
          <polygon points="257,152 262,147 267,152 262,157" fill="#90ffaa" />
        </g>
      </svg>
    </div>
  );
}

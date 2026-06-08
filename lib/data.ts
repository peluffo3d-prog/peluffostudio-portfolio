export const projects = [
  {
    title: "AtlasLibre",
    description: "Atlas anatómico 3D interactivo y gratuito para estudiantes de medicina en LATAM. +1.000 usuarios. Netter cuesta USD 100 — AtlasLibre cuesta $0.",
    tags: ["Next.js", "Three.js", "Supabase", "IA"],
    link: "https://atlaslibre.app",
    image: "https://image.thum.io/get/width/1200/https://atlaslibre.app",
  },
  {
    title: "Diseños JK",
    description: "Landing para fabricante de puertas corredizas a medida en GBA. Configurador de cotización en vivo — ambiente, tipo, material y medidas, precio al instante. Sección B2B con descuentos por volumen para carpinteros y revendedores. Video de fábrica de fondo, panel sticky, checkout con MercadoPago.",
    tags: ["Next.js", "MercadoPago", "Supabase", "Landing"],
    link: "https://disenosjk.vercel.app",
    image: "https://image.thum.io/get/width/1200/https://disenosjk.vercel.app",
  },
  {
    title: "Laser Cut Designe",
    description: "Landing oscura para taller de corte láser en Villa Luzuriaga. Video del proceso de corte con mix-blend-mode:screen, animaciones reveal, guía de materiales. Single-file, cero dependencias.",
    tags: ["HTML", "CSS", "Canvas", "Landing"],
    link: "https://laser-cut-designe.vercel.app",
    image: "https://image.thum.io/get/width/1200/https://laser-cut-designe.vercel.app",
  },
  {
    title: "Pelufo3D",
    description: "Taller de impresión 3D y tienda online de Peluffo. Soportes gaming, organizadores y accesorios de escritorio fabricados a pedido. Bot de WhatsApp propio para atención 24/7 integrado a la tienda.",
    tags: ["Ecommerce", "WhatsApp Bot", "3D Print"],
    link: "https://github.com/peluffo3d-prog",
    image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=1200&q=80",
  },
  {
    title: "Automotores DEH",
    description: "Plataforma web completa para concesionaria. Catálogo, subastas en tiempo real, panel admin y financiación. Cada auto tiene su propia página con ficha técnica.",
    tags: ["Next.js", "Supabase", "Subastas"],
    link: "https://github.com/peluffo3d-prog/damian-deploy",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&q=80",
  },
  {
    title: "Caja Clara",
    description: "SaaS multi-tenant de punto de venta para kioscos. Stock, ventas, cierre de caja e historial. Cada kiosco tiene su propio panel aislado sin tocar datos ajenos.",
    tags: ["Next.js", "Supabase", "SaaS"],
    link: "https://github.com/peluffo3d-prog/CAJA-CLARA",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80",
  },
];

export const services = [
  {
    name: "Landing Page",
    price: "DESDE USD 200",
    description: "Una página diseñada para convertir visitas en clientes. Formulario de contacto, catálogo y deploy incluido.",
    includes: ["Diseño mobile-first", "Deploy en producción", "3 cambios incluidos"],
  },
  {
    name: "Bot WhatsApp",
    price: "DESDE USD 150",
    description: "Automatizá las consultas de tu negocio. El bot responde 24/7, califica leads y los manda a tu equipo.",
    includes: ["Flujo personalizado", "Integración con catálogo", "1 mes de soporte"],
  },
  {
    name: "Agente IA",
    price: "DESDE USD 400",
    description: "Un agente personalizado que conoce tu negocio, habla con tus clientes y ejecuta tareas automáticamente.",
    includes: ["Entrenado con tu info", "Integración a tu web o WA", "Setup completo"],
  },
];

export const SYSTEM_PROMPT = `Sos el asistente de PeluffoStudio, un estudio de software e IA de Buenos Aires. NO son una agencia grande: son dos amigos de la infancia, Jasiel y Javier, que construyen apps, bots y agentes de IA para negocios en LATAM. Trabajan como socios del cliente — construyen y crecen junto a él.

El equipo:
- Jasiel — desarrollo, IA y producto. De aprender a programar solo a tener proyectos con miles de usuarios en menos de un año.
- Javier — producto, negocios y operaciones. Lleva Pelufo3D, su taller de impresión 3D, así que conoce los negocios reales porque tiene uno.
- Mismo nivel técnico, misma experiencia en negocios, softskills completos. Dos cabezas pensando cada proyecto.

PERSONALIDAD:
- Directo y concreto. No das vueltas.
- Tuteás siempre. Tono relajado pero profesional, argentino.
- Frases cortas. Si podés decirlo en 2 líneas, no lo estirás en 4.
- Entusiasma construir cosas con impacto real. No hacés proyectos abstractos.
- Si no sabés algo con certeza, lo decís.
- Cuando alguien describe un problema, primero hacés UNA pregunta clave antes de proponer.

OBJETIVO DE CADA CONVERSACIÓN (sos un vendedor, no un FAQ):
- Entendé qué necesita la persona y conectalo con lo que hacemos.
- Si muestra interés real, pedile el dato de contacto: "Pasame tu mail o WhatsApp y te armamos una propuesta concreta."
- Cerrá siempre con un próximo paso, nunca dejes la charla en el aire.
- Usá ejemplos de nuestros proyectos reales para dar confianza (AtlasLibre, Diseños JK, etc.).

PROYECTOS:

AtlasLibre (atlaslibre.app):
- Atlas anatómico 3D interactivo, gratuito y open source para estudiantes de medicina en LATAM.
- Por qué existe: Netter cuesta USD 100. En Argentina son 2-3 salarios mínimos. AtlasLibre es $0.
- +1.000 usuarios activos. 12 sistemas anatómicos, 600+ estructuras.
- Stack: Next.js 16, React Three Fiber, Three.js, Supabase, Tailwind CSS v4, Vercel.

Pelufo3D (ecommerce + taller de impresión 3D):
- Tienda online y taller de impresión 3D del estudio. Productos físicos: soportes gaming, organizadores, accesorios de escritorio.
- Bot de WhatsApp integrado para atención 24/7.

Automotores DEH:
- Sitio web completo para concesionaria. Catálogo, subastas en tiempo real, panel admin, financiación.
- Stack: Next.js, Supabase.

Caja Clara:
- SaaS multi-tenant de punto de venta para kioscos. Cada kiosco tiene su propio panel aislado con stock, ventas y cierre de caja.

Diseños JK (disenosjk.vercel.app):
- Landing para fábrica de puertas corredizas a medida en GBA. Cliente real, en producción.
- Configurador de cotización en vivo: el usuario elige ambiente, tipo, material y medidas, y el precio aparece al instante con panel sticky.
- Sección B2B con tabla de descuentos por volumen (10%/15%/20%) para carpinteros, instaladores y revendedores.
- Video de escuadradora de fondo (mix-blend-mode:screen), intro animada, checkout con MercadoPago, Supabase para leads.
- Stack: Next.js 16, Supabase, MercadoPago SDK, motion/react.

Laser Cut Designe (laser-cut-designe.vercel.app):
- Landing para taller de corte láser en Villa Luzuriaga, GBA. En producción.
- Video del proceso de corte láser con mix-blend-mode:screen, canvas con efecto de chispa animado, clip-path reveals.
- Diseño industrial oscuro, tipografía Bebas Neue, guía de materiales interactiva.
- Single-file HTML+CSS+JS, cero dependencias.

Bot WhatsApp:
- Bot de atención al cliente configurable por JSON. Responde 24/7, califica leads, deriva a humanos.

SERVICIOS Y PRECIOS:
- Landing Page: desde USD 200 de setup + USD 30/mes mantenimiento
- Bot WhatsApp: desde USD 150
- Agente IA personalizado: desde USD 400
- Para proyectos más grandes, los precios se ajustan según alcance.

CÓMO TRABAJAMOS:
- Primero entendemos el negocio. Después construimos.
- MVPs funcionales en días, no meses.
- Comunicación directa y rápida.
- IA como palanca: Claude, Groq, Cursor.
- GitHub: github.com/peluffo3d-prog
- Email: jaas.i.elel2@gmail.com

REGLAS IRROMPIBLES:
- Tuteá siempre.
- Hablá en primera persona del plural ("nosotros", "construimos", "somos Jasiel y Javier").
- Máximo 3-4 líneas por respuesta. Nunca te extiendas de más.
- Si preguntan precio, dalo o un rango realista. Nunca evadas el precio.
- Si muestran interés, pedí mail o WhatsApp para mandar propuesta.
- No inventes proyectos ni datos que no estén acá. Si no sabés, ofrecé que escriban directo.
- No sos una IA genérica ni de OpenAI. Sos el asistente de PeluffoStudio.`;

import type { Cifra } from "@/content/home/founder";
import type { Texto } from "@/content/types";

/**
 * SOBRE MÍ, EN LAS DOS LENGUAS
 * ──────────────────────────────────────────────────────────────────────────
 * Las cifras son las mismas de la portada y salen del mismo sitio: no se
 * inventa ninguna aquí ni se redondea hacia arriba «porque en inglés suena
 * mejor». Los nombres de tecnología y de proyecto tampoco se traducen: son
 * nombres propios.
 */
export const SOBRE = {
  badge: { es: "El estudio", en: "The studio" },
  titulo: { es: "Diseño y código,", en: "Design and code," },
  tituloAcento: { es: "en las mismas manos.", en: "in the same hands." },
  entradilla: {
    es: "JV Agencia soy yo, Luis Jaller. Uno el diseño y el desarrollo en un solo proceso para que las PYMEs de LATAM tengan una web que se ve de marca grande —y que funciona de verdad.",
    en: "JV Agencia is me, Luis Jaller. I put design and development into a single process so small businesses in LATAM get a site that looks like a big brand — and actually works.",
  },

  fundador: {
    nombre: "Luis Jaller",
    rol: { es: "Diseñador web y desarrollador", en: "Web designer and developer" },
    bio: {
      es: "Diseñador web y desarrollador con foco fuerte en backend y arquitectura. No solo escribo código: traduzco lo que necesita un negocio en decisiones de producto claras. Me muevo entre producto, arquitectura y ejecución con la misma facilidad, para entregar software que funciona y que además sirve para algo.",
      en: "Web designer and developer with a strong focus on backend and architecture. I don't just write code: I turn what a business needs into clear product decisions. I move between product, architecture and execution with the same ease, to deliver software that works and is actually good for something.",
    },
    linkedin: "https://www.linkedin.com/in/jallerdev",
    github: "https://github.com/jallerdev",
    portafolio: "https://jaller-dev.vercel.app",
    verPortafolio: { es: "Portafolio", en: "Portfolio" },
  },

  /* LA FORMA CAMBIÓ, LAS CIFRAS NO. Eran cadenas —«3+», «<24 h»— y una cadena
     no se puede contar hacia arriba. Ahora son número más adorno, que es lo
     que el contador necesita y lo que ya usa la portada: mismo dato, misma
     forma, un solo contador para las dos páginas.

     `cuenta` decide cuáles suben. Un tope —«menos de 24 horas»— no crece, y
     verlo subir de 0 a 24 diría lo contrario de lo que dice. «1 persona»
     tampoco: contar hasta uno no es una cuenta, es un parpadeo. */
  cifras: [
    {
      valor: 3,
      sufijo: "+",
      cuenta: true,
      etiqueta: { es: "años construyendo producto", en: "years building product" },
    },
    {
      valor: 11,
      sufijo: "+",
      cuenta: true,
      etiqueta: { es: "proyectos en producción", en: "projects in production" },
    },
    {
      valor: 24,
      prefijo: "<",
      sufijo: " h",
      etiqueta: { es: "tiempo de respuesta", en: "response time" },
    },
    {
      valor: 1,
      etiqueta: { es: "persona, de principio a fin", en: "person, end to end" },
    },
  ] as readonly Cifra[],

  enfoqueTitulo: { es: "Cómo trabajo", en: "How I work" },
  enfoque: [
    {
      titulo: {
        es: "Diseño y código en las mismas manos",
        en: "Design and code in the same hands",
      },
      cuerpo: {
        es: "No te entrego un diseño bonito que nadie sabe construir, ni un sistema sólido que se ve amateur. Las dos cosas, y hechas por la misma persona.",
        en: "I won't hand you a pretty design nobody knows how to build, or a solid system that looks amateur. Both, and done by the same person.",
      },
    },
    {
      titulo: {
        es: "Pienso en tu negocio, no solo en la web",
        en: "I think about your business, not just the site",
      },
      cuerpo: {
        es: "Traduzco lo que necesita tu negocio en decisiones de producto. El objetivo no es «una web», es credibilidad que vende y que no se rompe.",
        en: "I turn what your business needs into product decisions. The goal isn’t “a website”, it’s credibility that sells and doesn’t break.",
      },
    },
    {
      titulo: { es: "Socio técnico de largo plazo", en: "A long-term technical partner" },
      cuerpo: {
        es: "No entrego y desaparezco. Quedo como tu técnico de cabecera para mantener, mejorar y escalar lo que construí.",
        en: "I don't hand over and disappear. I stay on as your go-to technical person, to maintain, improve and scale what I built.",
      },
    },
  ] as readonly { titulo: Texto; cuerpo: Texto }[],

  stackTitulo: { es: "Qué domino", en: "What I work with" },
  stackEntradilla: {
    es: "Tecnología moderna y probada para construir productos rápidos, sólidos y listos para crecer.",
    en: "Modern, proven technology to build products that are fast, solid and ready to grow.",
  },
  /* Los nombres de tecnología no se traducen. Los rótulos de grupo, sí.

     DOS NIVELES, y existen para resolver una contradicción real: esta lista
     incluía React Native, Expo y Kubernetes mientras
     /servicios/software-a-la-medida dice, y lo tiene en su lista de «qué no
     hago», que no entrega app nativa para Android ni iOS. Las dos cosas eran
     ciertas y se leían como una mentira, porque la página no distinguía entre
     lo que Luis VENDE y lo que Luis SABE.

     `encargo: true`  → sale en los encargos, y es lo que se cotiza.
     `encargo: false` → experiencia real, no oferta. Va aparte y con su aviso. */
  stackSubtituloEncargo: {
    es: "Con lo que construyo tus encargos",
    en: "What I build your projects with",
  },
  stackSubtituloTambien: { es: "Y además sé", en: "And I also know" },
  stackNotaTambien: {
    es: "Experiencia de otros proyectos, no parte de lo que vendo hoy. Las apps nativas de Android y iOS siguen fuera de lo que hago: ahí prefiero decírtelo y no cobrarte por aprender.",
    en: "Experience from other projects, not part of what I sell today. Native Android and iOS apps are still outside what I do: I'd rather say so than charge you for learning.",
  },
  stack: [
    {
      grupo: { es: "Frontend", en: "Frontend" },
      items: ["TypeScript", "React", "Next.js", "Tailwind CSS"],
      encargo: true,
    },
    {
      grupo: { es: "Backend", en: "Backend" },
      items: ["Node.js", "NestJS", "Express", "Prisma"],
      encargo: true,
    },
    {
      grupo: { es: "Nube y DevOps", en: "Cloud & DevOps" },
      items: ["AWS", "Terraform", "Docker", "GitHub Actions"],
      encargo: true,
    },
    {
      grupo: { es: "Datos", en: "Data" },
      items: ["PostgreSQL", "DynamoDB", "Redis"],
      encargo: true,
    },
    {
      grupo: { es: "Móvil", en: "Mobile" },
      items: ["React Native", "Expo"],
      encargo: false,
    },
    {
      grupo: { es: "Orquestación", en: "Orchestration" },
      items: ["Kubernetes"],
      encargo: false,
    },
  ] as readonly { grupo: Texto; items: readonly string[]; encargo: boolean }[],

  proyectosTitulo: { es: "Algunos proyectos", en: "A few projects" },
  proyectosEntradilla: {
    es: "Una muestra pública; el resto está bajo NDA.",
    en: "A public sample; the rest is under NDA.",
  },
  /* Los sectores del NDA. Se nombra el SECTOR y nunca el cliente, que es
     exactamente lo que un acuerdo de confidencialidad permite: decir en qué has
     trabajado sin decir para quién.

     SIN FINTECH, y conviene dejar escrito por qué: la frase vieja decía «SaaS,
     fintech, logística» y el portafolio personal de Luis lista un proyecto de
     «Fintech · integración de pagos & reconciliación». Luis lo desmintió el 11
     de septiembre de 2026 —«en verdad nunca he trabajado en fintech»— y manda
     él, no la otra página. Si alguien vuelve a verlo allá y lo trae para acá,
     que sepa que ya se miró y se descartó a propósito.

     Regla de fondo: un sector que no se pueda sostener en una llamada no entra,
     aunque esté escrito en otro sitio. Es el mismo criterio que deja sin caso de
     SEO a la página de posicionamiento. */
  proyectosSectores: {
    es: "Los que no puedo nombrar son de SaaS empresarial y B2B, logística, analítica deportiva y comercio electrónico. Puedo decir el sector; el cliente, no.",
    en: "The ones I can't name are in enterprise and B2B SaaS, logistics, sports analytics and e-commerce. I can name the sector; the client, no.",
  },
  proyectos: [
    {
      nombre: "Bloomrose",
      etiqueta: { es: "Comercio electrónico", en: "E-commerce" },
      cuerpo: {
        es: "Tienda online de bisutería y accesorios, de punta a punta.",
        en: "An online jewellery and accessories store, end to end.",
      },
      dominio: "bloomroseaccesorios.com",
      url: "https://www.bloomroseaccesorios.com",
    },
    {
      nombre: "HalcónOS",
      etiqueta: { es: "SaaS / CRM", en: "SaaS / CRM" },
      cuerpo: {
        es: "CRM y gestor de proyectos para agencias.",
        en: "A CRM and project manager for agencies.",
      },
      dominio: "halcon.jvagencia.com",
      url: "https://halcon.jvagencia.com",
    },
    {
      nombre: "InvitiApp",
      etiqueta: { es: "SaaS de eventos", en: "Events SaaS" },
      cuerpo: {
        es: "Plataforma de invitaciones digitales para organizadores de eventos.",
        en: "A digital invitations platform for event planners.",
      },
    },
    {
      /* Entra porque el portafolio de la portada lo enseña y esta página no, y
         las dos hablaban del mismo trabajo con listas distintas. */
      nombre: "Hummik",
      etiqueta: { es: "Producto propio", en: "Own product" },
      cuerpo: {
        es: "Producto propio, en línea y con dominio propio.",
        en: "An own product, online and on its own domain.",
      },
      dominio: "hummik.com",
      url: "https://www.hummik.com",
    },
  ] as readonly {
    nombre: string;
    etiqueta: Texto;
    cuerpo: Texto;
    /* Solo los que están en línea. Sin dominio, la fila no promete que se
       pueda abrir: InvitiApp existe y no tiene dirección pública, y decirlo
       vale más que dejar un enlace muerto. */
    dominio?: string;
    url?: string;
  }[],

  /* ── El retrato ───────────────────────────────────────────────────
     NO HAY FOTO DE LUIS, y mientras no la haya aquí va el monograma sobre el
     plano de marca. Es exactamente la misma decisión que toma la portada y por
     el mismo motivo: una foto de banco en la página que dice «hablas conmigo»
     sería la mentira más cara del sitio. El marcador de que falta la foto sale
     en desarrollo, no en producción: un cliente no tiene por qué leerlo. */
  retrato: {
    pie: { es: "Luis Jaller · Turbaco, Bolívar", en: "Luis Jaller · Turbaco, Bolívar" },
    nota: {
      es: "Sin foto de archivo. Cuando haya una mía, va aquí.",
      en: "No stock photo. When there's one of me, it goes here.",
    },
  },

  /* ── La pieza firma ───────────────────────────────────────────────
     Una sola por página, y en esta es esta. Lo que el visitante ve a la
     izquierda lo produce el código de la derecha, y los dos salen del mismo
     archivo: no es una captura de código puesta al lado de una captura de
     interfaz. */
  manos: {
    titulo: { es: "«En las mismas manos», literalmente", en: "\u201cIn the same hands\u201d, literally" },
    entradilla: {
      es: "A la izquierda, lo que ve tu cliente. A la derecha, el código que lo dibuja. Mueve la barra y verás que son la misma cosa.",
      en: "On the left, what your customer sees. On the right, the code that draws it. Move the bar and you'll see they're the same thing.",
    },
    nota: {
      es: "Los dos lados salen del mismo archivo de este sitio. Si uno cambia y el otro no, se nota aquí mismo.",
      en: "Both sides come from the same file in this site. If one changes and the other doesn't, it shows right here.",
    },
  },

  /* ── La bitácora ──────────────────────────────────────────────────
     SIN FECHAS INVENTADAS. La única entrada con fecha es la verificación de
     Meta, que tiene una de verdad; el resto se ordena por lo que se puede
     comprobar —el dominio— y no por un calendario que nadie confirmó. Cuando
     Luis pase las fechas, la bitácora pasa a orden cronológico y esta nota
     sobra. */
  bitacora: {
    titulo: { es: "Bitácora", en: "Log" },
    entradilla: {
      es: "Lo que está construido y sigue en línea, más la única credencial que me dio un tercero. Cada fila se abre o se verifica.",
      en: "What's built and still online, plus the one credential a third party gave me. Every row opens or can be verified.",
    },
    enLinea: { es: "En línea", en: "Live" },
    sinDominio: { es: "Sin dominio público", en: "No public domain" },
    abrir: { es: "Abrir", en: "Open" },
    credencial: {
      nombre: { es: "Verificación de Meta", en: "Meta verification" },
      etiqueta: { es: "Credencial", en: "Credential" },
      cuerpo: {
        es: "Proveedor de tecnología verificado. La conexión de WhatsApp la hago yo, no la terceriza nadie.",
        en: "Verified tech provider. I do the WhatsApp connection myself; nobody subcontracts it.",
      },
      fecha: { es: "Julio de 2026", en: "July 2026" },
    },
  },

  /* El enlace a «Qué no hago» de la página de software. Va aquí, en la sección
     de cómo trabajo, porque la lista de lo que uno NO hace dice más del oficio
     que la lista de lo que sí. */
  noHagoAntes: { es: "La otra mitad de cómo trabajo es ", en: "The other half of how I work is " },
  noHagoEnlace: { es: "lo que no hago", en: "what I don't do" },
  noHagoDespues: {
    es: ": siete encargos que digo que no antes de cobrarlos, con el motivo de cada uno.",
    en: ": seven jobs I turn down before charging for them, with the reason for each.",
  },

  cierre: {
    titulo: { es: "¿Hablamos de tu proyecto?", en: "Shall we talk about your project?" },
    cuerpo: {
      es: "Cuéntame qué necesitas y te respondo personalmente.",
      en: "Tell me what you need and I'll reply personally.",
    },
    cta: { es: "Ver precios", en: "See pricing" },
    href: { es: "/precios", en: "/en/pricing" },
  },

  conocimientos: {
    es: ["Desarrollo web", "Arquitectura de software", "Node.js", "Next.js", "AWS", "PostgreSQL"],
    en: ["Web development", "Software architecture", "Node.js", "Next.js", "AWS", "PostgreSQL"],
  },
} as const;

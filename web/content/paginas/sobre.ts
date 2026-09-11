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

  cifras: [
    { valor: "3+", etiqueta: { es: "años construyendo producto", en: "years building product" } },
    { valor: "11+", etiqueta: { es: "proyectos en producción", en: "projects in production" } },
    { valor: "<24 h", etiqueta: { es: "tiempo de respuesta", en: "response time" } },
    { valor: "1", etiqueta: { es: "persona, de principio a fin", en: "person, end to end" } },
  ] as readonly { valor: string; etiqueta: Texto }[],

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
    },
    {
      nombre: "HalcónOS",
      etiqueta: { es: "SaaS / CRM", en: "SaaS / CRM" },
      cuerpo: {
        es: "CRM y gestor de proyectos para agencias.",
        en: "A CRM and project manager for agencies.",
      },
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
    },
  ] as readonly { nombre: string; etiqueta: Texto; cuerpo: Texto }[],

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

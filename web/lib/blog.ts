// Manifest de posts del blog. Fuente única para el índice, el sitemap, el
// JSON-LD y la metadata de cada página.
//
// AUDIENCIA: dueños de PYMEs y negocios locales que evalúan tener (o rehacer)
// su presencia web. NO escribimos acá sobre prospección, CRM ni ventas B2B —
// ese clúster es de halcon.jvagencia.com, y duplicarlo haría que nuestros dos
// dominios compitan por la misma consulta y se partan la señal entre ellos.
//
// Regla de enlazado: cuando un post toque un tema de ventas o seguimiento de
// clientes, enlaza al artículo correspondiente en halcon.jvagencia.com en vez
// de desarrollarlo acá. Eso mantiene los clústeres separados y le pasa
// autoridad al subdominio, que hoy no recibe ni un enlace desde este sitio.
//
// Al agregar un post: crea su componente en `app/blog/_posts/<archivo>.tsx`,
// regístralo en `app/blog/[slug]/page.tsx` y añade su entrada acá.
//
// Reglas SEO:
//   • `slug` es la URL final. Kebab-case, sin acentos, ≤60 chars.
//   • `title` ≤ 60 chars — los resultados de búsqueda truncan.
//   • `description` ≤ 155 chars.
//   • `publishedAt` / `updatedAt` en ISO — Google los lee del schema.

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  readingMinutes: number;
  keywords: string[];
  category: "Precios" | "Decisión" | "Guías";
};

export const AUTHOR = {
  name: "Luis Jaller",
  url: "https://www.linkedin.com/in/jallerdev",
} as const;

export const POSTS: BlogPost[] = [
  {
    slug: "cuanto-cuesta-una-pagina-web-en-colombia",
    title: "¿Cuánto cuesta una página web en Colombia? (2026)",
    description:
      "Rangos reales en pesos por tipo de sitio, qué está incluido en cada uno y las cinco cosas que disparan el presupuesto sin que te las adviertan.",
    excerpt:
      "La respuesta honesta no es un número, es un rango con condiciones. Te muestro qué se cobra hoy en Colombia por cada tipo de sitio y en qué se te va la plata.",
    publishedAt: "2026-08-13",
    readingMinutes: 8,
    keywords: [
      "cuánto cuesta una página web",
      "precio página web Colombia",
      "cuánto vale hacer una página web",
      "presupuesto sitio web",
      "cotizar página web",
    ],
    category: "Precios",
  },
  {
    slug: "mi-negocio-necesita-pagina-web",
    title: "¿Mi negocio necesita página web en 2026?",
    description:
      "Cuándo una página web sí mueve la aguja y cuándo es plata botada. Cuatro casos donde conviene esperar y qué hacer en su lugar.",
    excerpt:
      "No todos los negocios necesitan una web hoy. Te doy los criterios concretos para decidir, incluidos los casos en los que te conviene NO hacerla todavía.",
    publishedAt: "2026-08-13",
    readingMinutes: 7,
    keywords: [
      "mi negocio necesita página web",
      "para qué sirve una página web",
      "beneficios de tener página web",
      "negocio sin página web",
    ],
    category: "Decisión",
  },
  {
    slug: "pagina-web-o-solo-instagram",
    title: "¿Página web o solo Instagram para tu negocio?",
    description:
      "Qué gana y qué pierde un negocio que vive solo en redes, con el criterio para decidir según cómo te compran tus clientes.",
    excerpt:
      "Instagram te da alcance; la web te da algo que Instagram no puede: ser encontrado por quien ya te está buscando. No compiten, hacen cosas distintas.",
    publishedAt: "2026-08-13",
    readingMinutes: 7,
    keywords: [
      "página web o instagram",
      "necesito web si tengo instagram",
      "redes sociales vs página web",
      "vender por instagram o web",
    ],
    category: "Decisión",
  },
  {
    slug: "que-debe-tener-la-pagina-web-de-un-restaurante",
    title: "Qué debe tener la página web de un restaurante",
    description:
      "Las seis cosas que un comensal busca en el sitio de un restaurante, en qué orden ponerlas y los errores que hacen que se vaya al de al lado.",
    excerpt:
      "El 80% de quien entra a la web de un restaurante busca tres cosas: menú, horario y cómo llegar. Casi ningún sitio las pone primero.",
    publishedAt: "2026-08-13",
    readingMinutes: 7,
    keywords: [
      "página web para restaurante",
      "qué debe tener la web de un restaurante",
      "menú digital restaurante",
      "web para restaurantes Colombia",
    ],
    category: "Guías",
  },
  {
    slug: "cuanto-se-demora-hacer-una-pagina-web",
    title: "¿Cuánto se demora hacer una página web?",
    description:
      "Plazos reales por tipo de proyecto, en qué se va el tiempo de verdad y qué depende de ti para que no se estire el doble.",
    excerpt:
      "El desarrollo casi nunca es lo que demora. Lo que estira los proyectos es el contenido, las aprobaciones y las decisiones que nadie toma.",
    publishedAt: "2026-08-13",
    readingMinutes: 6,
    keywords: [
      "cuánto se demora hacer una página web",
      "tiempo desarrollo página web",
      "cuánto tarda una web",
      "plazos diseño web",
    ],
    category: "Guías",
  },
];

export function findPost(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug);
}

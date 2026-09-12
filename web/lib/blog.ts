import type { Idioma, Traducido } from "@/content/types";
import { SLUGS } from "@/lib/blog-slugs";

// Manifest de posts del blog. Fuente única para el índice, el sitemap, el
// JSON-LD y la metadata de cada página.
//
// AUDIENCIA: dueños de PYMEs y negocios locales que evalúan tener (o rehacer)
// su presencia web. NO escribo acá sobre prospección, CRM ni ventas B2B —
// ese clúster es de halcon.jvagencia.com, y duplicarlo haría que mis dos
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

/**
 * TODO LO QUE SE LEE VA EN LOS DOS IDIOMAS, EMPEZANDO POR EL SLUG.
 *
 * El slug es lo que más importa que esté traducido: `/en/blog/cuanto-cuesta-
 * una-pagina-web-en-colombia` no posiciona en inglés por mucho que el texto
 * de dentro sí lo esté. Es la misma regla que ya siguen las doce internas.
 *
 * `readingMinutes` NO se traduce y es a propósito: el inglés y el castellano
 * miden parecido en estos textos —la diferencia queda por debajo del minuto—
 * y dos cifras separadas serían dos cifras que se desincronizan.
 */
export type BlogPost = {
  slug: Traducido<string>;
  title: Traducido<string>;
  description: Traducido<string>;
  excerpt: Traducido<string>;
  publishedAt: string;
  updatedAt?: string;
  readingMinutes: number;
  keywords: Traducido<readonly string[]>;
  category: Traducido<string>;
  /**
   * LA CIFRA DE LA PORTADA. Solo donde existe una de verdad.
   *
   * Las portadas del índice son tipográficas —sin fotos de banco— y lo que
   * ponen en grande es el dato con el que se entra al artículo: el piso de
   * precio, el plazo, la ventana de resultados. Todos salen de `lib/quote.ts`
   * o son la frase que el sitio entero sostiene («entre el mes 3 y el 6»).
   *
   * Los artículos que no tienen una cifra que dar NO SE INVENTAN UNA: su
   * portada cae al tiempo de lectura, que también es un dato real y además es
   * distinto en cada uno. Un número bonito puesto ahí para llenar el hueco es
   * exactamente lo que este blog existe para no hacer.
   */
  cifra?: Traducido<string>;
};

export const AUTHOR = {
  name: "Luis Jaller",
  url: "https://www.linkedin.com/in/jallerdev",
} as const;

export const POSTS: BlogPost[] = [
  {
    slug: SLUGS.cuestaWeb,
    title: {
      es: "¿Cuánto cuesta una página web en Colombia? (2026)",
      en: "How much does a website cost in Colombia? (2026)",
    },
    description: {
      es: "Rangos reales en pesos por tipo de sitio, qué está incluido en cada uno y las cinco cosas que disparan el presupuesto sin que te las adviertan.",
      en: "Real peso ranges by type of site, what each one includes, and the five things that blow up the budget without anyone warning you.",
    },
    excerpt: {
      es: "La respuesta honesta no es un número, es un rango con condiciones. Te muestro qué se cobra hoy en Colombia por cada tipo de sitio y en qué se te va la plata.",
      en: "The honest answer isn't a number, it's a range with conditions. Here's what each type of site is charged in Colombia today, and where the money actually goes.",
    },
    publishedAt: "2026-08-13",
    readingMinutes: 8,
    keywords: {
      es: [
        "cuánto cuesta una página web",
        "precio página web Colombia",
        "cuánto vale hacer una página web",
        "presupuesto sitio web",
        "cotizar página web",
      ],
      en: [
        "how much does a website cost",
        "website price Colombia",
        "cost of building a website in Colombia",
        "website budget",
        "website quote Colombia",
      ],
    },
    category: { es: "Precios", en: "Pricing" },
    cifra: { es: "$850.000", en: "$850,000" },
  },
  {
    slug: SLUGS.cuestaChatbot,
    title: {
      es: "¿Cuánto cuesta un chatbot de WhatsApp en Colombia? (2026)",
      en: "How much does a WhatsApp chatbot cost in Colombia? (2026)",
    },
    description: {
      es: "Precios reales de montaje y mensualidad en pesos, lo que Meta te cobra aparte por mensaje y el cambio del 1 de octubre de 2026 que casi nadie avisa.",
      en: "Real setup and monthly prices in pesos, what Meta charges you separately per message, and the 1 October 2026 change almost nobody mentions.",
    },
    excerpt: {
      es: "El montaje es la parte fácil de averiguar. Lo que casi nadie te explica es lo que Meta te cobra a ti, aparte, por cada mensaje — y eso cambia el 1 de octubre.",
      en: "The setup fee is the easy part to find out. What almost nobody explains is what Meta charges you, separately, per message — and that changes on 1 October.",
    },
    publishedAt: "2026-09-09",
    /* Repasado contra la documentación de Meta: tarifas de Colombia, el cambio
       del 1/10 y el plazo del check de cuenta oficial. Se corrigieron dos
       cosas que estaban mal —el check es azul y el plazo son 30 días, no tres
       meses—, así que la fecha se mueve en las dos lenguas a la vez. */
    updatedAt: "2026-09-10",
    readingMinutes: 9,
    keywords: {
      es: [
        "cuánto cuesta un chatbot de WhatsApp",
        "precio chatbot WhatsApp Colombia",
        "cuánto vale un bot de WhatsApp",
        "costo WhatsApp Business API Colombia",
        "chatbot WhatsApp precio",
      ],
      en: [
        "how much does a WhatsApp chatbot cost",
        "WhatsApp chatbot price Colombia",
        "WhatsApp Business API cost Colombia",
        "WhatsApp bot pricing",
        "WhatsApp automation cost",
      ],
    },
    category: { es: "Precios", en: "Pricing" },
    cifra: { es: "$700.000", en: "$700,000" },
  },
  {
    slug: SLUGS.cuestaSeo,
    title: {
      es: "¿Cuánto cuesta el SEO en Colombia? Precios reales 2026",
      en: "How much does SEO cost in Colombia? Real 2026 prices",
    },
    description: {
      es: "Rangos reales del posicionamiento mensual y de las auditorías en Colombia, por qué existe un piso de precio y cómo reconocer el humo.",
      en: "Real ranges for monthly SEO work and audits in Colombia, why a price floor exists, and how to spot the sales pitch.",
    },
    excerpt: {
      es: "El SEO técnico se paga una vez; posicionar es mensual. Con esa confusión se venden planes de $300.000 que no alcanzan ni para la herramienta.",
      en: "Technical SEO is paid once; ranking is monthly. That confusion is how $300,000-peso plans get sold that don't even cover the tooling.",
    },
    publishedAt: "2026-09-09",
    readingMinutes: 8,
    keywords: {
      es: [
        "cuánto cuesta el SEO en Colombia",
        "precio SEO mensual Colombia",
        "cuánto cuesta una auditoría SEO",
        "posicionamiento web precio Colombia",
        "tarifas agencia SEO Colombia",
      ],
      en: [
        "how much does SEO cost in Colombia",
        "monthly SEO price Colombia",
        "SEO audit cost",
        "SEO agency rates Colombia",
        "search engine optimisation pricing Colombia",
      ],
    },
    category: { es: "Precios", en: "Pricing" },
    cifra: { es: "mes 3 a 6", en: "month 3 to 6" },
  },
  {
    slug: SLUGS.necesitaWeb,
    title: {
      es: "¿Mi negocio necesita página web en 2026?",
      en: "Does my business need a website in 2026?",
    },
    description: {
      es: "Cuándo una página web sí mueve la aguja y cuándo es plata botada. Cuatro casos donde conviene esperar y qué hacer en su lugar.",
      en: "When a website actually moves the needle and when it's money thrown away. Four cases where waiting is the right call, and what to do instead.",
    },
    excerpt: {
      es: "No todos los negocios necesitan una web hoy. Te doy los criterios concretos para decidir, incluidos los casos en los que te conviene NO hacerla todavía.",
      en: "Not every business needs a website today. Here are the concrete criteria to decide, including the cases where you're better off NOT building one yet.",
    },
    publishedAt: "2026-08-13",
    readingMinutes: 7,
    keywords: {
      es: [
        "mi negocio necesita página web",
        "para qué sirve una página web",
        "beneficios de tener página web",
        "negocio sin página web",
      ],
      en: [
        "does my business need a website",
        "what is a website for",
        "benefits of having a website",
        "business without a website",
      ],
    },
    category: { es: "Decisión", en: "Deciding" },
  },
  {
    slug: SLUGS.webOInstagram,
    title: {
      es: "¿Página web o solo Instagram para tu negocio?",
      en: "A website, or just Instagram for your business?",
    },
    description: {
      es: "Qué gana y qué pierde un negocio que vive solo en redes, con el criterio para decidir según cómo te compran tus clientes.",
      en: "What a business gains and loses by living only on social, and how to decide based on the way your customers actually buy.",
    },
    excerpt: {
      es: "Instagram te da alcance; la web te da algo que Instagram no puede: ser encontrado por quien ya te está buscando. No compiten, hacen cosas distintas.",
      en: "Instagram gives you reach; a website gives you something Instagram can't: being found by someone already looking for you. They don't compete, they do different jobs.",
    },
    publishedAt: "2026-08-13",
    readingMinutes: 7,
    keywords: {
      es: [
        "página web o instagram",
        "necesito web si tengo instagram",
        "redes sociales vs página web",
        "vender por instagram o web",
      ],
      en: [
        "website or instagram",
        "do I need a website if I have instagram",
        "social media vs website",
        "selling on instagram or a website",
      ],
    },
    category: { es: "Decisión", en: "Deciding" },
  },
  {
    slug: SLUGS.restaurante,
    title: {
      es: "Qué debe tener la página web de un restaurante",
      en: "What a restaurant website needs",
    },
    description: {
      es: "Las seis cosas que un comensal busca en el sitio de un restaurante, en qué orden ponerlas y los errores que hacen que se vaya al de al lado.",
      en: "The six things a diner looks for on a restaurant site, the order to put them in, and the mistakes that send them to the place next door.",
    },
    excerpt: {
      es: "El 80% de quien entra a la web de un restaurante busca tres cosas: menú, horario y cómo llegar. Casi ningún sitio las pone primero.",
      en: "80% of people landing on a restaurant site want three things: the menu, the hours and how to get there. Almost no site puts them first.",
    },
    publishedAt: "2026-08-13",
    readingMinutes: 7,
    keywords: {
      es: [
        "página web para restaurante",
        "qué debe tener la web de un restaurante",
        "menú digital restaurante",
        "web para restaurantes Colombia",
      ],
      en: [
        "restaurant website",
        "what a restaurant website should have",
        "digital menu for restaurants",
        "restaurant web design Colombia",
      ],
    },
    category: { es: "Guías", en: "Guides" },
  },
  {
    slug: SLUGS.cuantoDemora,
    title: {
      es: "¿Cuánto se demora hacer una página web?",
      en: "How long does it take to build a website?",
    },
    description: {
      es: "Plazos reales por tipo de proyecto, en qué se va el tiempo de verdad y qué depende de ti para que no se estire el doble.",
      en: "Real timelines by project type, where the time actually goes, and what depends on you to keep it from doubling.",
    },
    excerpt: {
      es: "El desarrollo casi nunca es lo que demora. Lo que estira los proyectos es el contenido, las aprobaciones y las decisiones que nadie toma.",
      en: "Development is almost never the slow part. What stretches projects is the content, the approvals and the decisions nobody makes.",
    },
    publishedAt: "2026-08-13",
    readingMinutes: 6,
    keywords: {
      es: [
        "cuánto se demora hacer una página web",
        "tiempo desarrollo página web",
        "cuánto tarda una web",
        "plazos diseño web",
      ],
      en: [
        "how long does it take to build a website",
        "website development time",
        "web design timeline",
        "how long does a website take",
      ],
    },
    category: { es: "Guías", en: "Guides" },
    cifra: { es: "5 días", en: "5 days" },
  },
  {
    slug: SLUGS.googleMaps,
    title: {
      es: "Cómo aparecer en Google Maps con tu negocio",
      en: "How to get your business to show up on Google Maps",
    },
    description: {
      es: "La ficha de Google es gratis y para «cerca de mí» le gana a tu web. Cómo crearla, qué te suspende la cuenta y cuándo te alcanza con eso.",
      en: "The Google listing is free, and for «near me» it beats your website. How to set it up, what gets you suspended, and when it is all you need.",
    },
    excerpt: {
      es: "Empiezo por lo que menos me conviene decir: la ficha es gratis, se hace en una tarde y para las búsquedas de cercanía le gana a tu página web.",
      en: "I will start with what suits me least: the listing is free, it takes an afternoon, and for proximity searches it beats your website.",
    },
    publishedAt: "2026-09-11",
    readingMinutes: 8,
    keywords: {
      es: [
        "cómo aparecer en Google Maps",
        "poner mi negocio en Google Maps",
        "ficha de Google mi negocio",
        "Google My Business Colombia",
        "perfil de empresa en Google",
      ],
      en: [
        "how to appear on Google Maps",
        "add my business to Google Maps",
        "Google Business Profile",
        "Google My Business Colombia",
      ],
    },
    category: { es: "Guías", en: "Guides" },
  },
  {
    slug: SLUGS.noAparece,
    title: {
      es: "¿Por qué mi página web no aparece en Google?",
      en: "Why doesn't my website show up on Google?",
    },
    description: {
      es: "Las cinco causas, en orden, y cómo comprobar tres de ellas tú mismo en quince minutos sin contratar a nadie.",
      en: "The five causes, in order, and how to check three of them yourself in fifteen minutes without hiring anyone.",
    },
    excerpt: {
      es: "Antes de pelear con nadie: busca site:tudominio.com y mira cuántos resultados salen. Esa sola búsqueda separa los dos mundos posibles.",
      en: "Before arguing with anyone: search site:yourdomain.com and see how many results come back. That one search splits the two possible worlds.",
    },
    publishedAt: "2026-09-11",
    readingMinutes: 7,
    keywords: {
      es: [
        "por qué mi página no aparece en Google",
        "mi web no sale en Google",
        "no aparezco en Google",
        "indexar página en Google",
      ],
      en: [
        "why my website doesn't show up on Google",
        "site not indexed Google",
        "website not appearing in search",
      ],
    },
    category: { es: "Guías", en: "Guides" },
  },
  {
    slug: SLUGS.dominioHosting,
    title: {
      es: "¿Cuánto cuesta un dominio y un hosting en Colombia?",
      en: "How much do a domain and hosting cost in Colombia?",
    },
    description: {
      es: "Precios reales en pesos, en qué se diferencian, y la pregunta que decide todo: a nombre de quién queda el dominio.",
      en: "Real prices in pesos, how the two differ, and the question that decides everything: whose name the domain is in.",
    },
    excerpt: {
      es: "El precio es la parte fácil. Lo que decide si esto te sale caro o barato es a nombre de quién queda, y eso no aparece en ninguna tabla.",
      en: "The price is the easy part. What decides whether this ends up cheap or expensive is whose name it is in, and that is on no price list.",
    },
    publishedAt: "2026-09-11",
    readingMinutes: 6,
    keywords: {
      es: [
        "cuánto cuesta un dominio web en Colombia",
        "precio dominio y hosting Colombia",
        "diferencia entre dominio y hosting",
        "cuánto cuesta un hosting",
      ],
      en: [
        "domain cost Colombia",
        "hosting price Colombia",
        "difference between domain and hosting",
      ],
    },
    category: { es: "Precios", en: "Pricing" },
    cifra: { es: "$290.000", en: "$290,000" },
  },
  {
    slug: SLUGS.landingPage,
    title: {
      es: "Qué es una landing page y cuándo te conviene",
      en: "What a landing page is, and when it is the right call",
    },
    description: {
      es: "Una sola página, un solo objetivo y sin salidas. Qué lleva, qué cuesta frente a un sitio completo y por qué casi no posiciona sola.",
      en: "One page, one goal, no exits. What goes in it, what it costs against a full site, and why on its own it barely ranks.",
    },
    excerpt: {
      es: "Un sitio web quiere que explores; una landing quiere que decidas. Todo lo que la hace distinta sale de esa frase.",
      en: "A website wants you to browse; a landing page wants you to decide. Everything else about it follows from that.",
    },
    publishedAt: "2026-09-11",
    readingMinutes: 7,
    keywords: {
      es: [
        "qué es una landing page",
        "para qué sirve una landing page",
        "landing page o página web",
        "cuánto cuesta una landing page",
      ],
      en: [
        "what is a landing page",
        "landing page vs website",
        "landing page cost",
      ],
    },
    category: { es: "Decisión", en: "Deciding" },
  },
];

/** El post cuyo slug —en el idioma dado— coincide. */
export function findPost(slug: string, idioma: Idioma = "es"): BlogPost | undefined {
  return POSTS.find((p) => p.slug[idioma] === slug);
}

/* `slugEmparejado` vive ahora en `lib/blog-slugs.ts` y se reexporta desde
   aquí por comodidad. Quien lo necesite desde un componente de CLIENTE debe
   importarlo del módulo ligero, no de este: este arrastra el manifiesto. */
export { slugEmparejado, SLUGS } from "@/lib/blog-slugs";

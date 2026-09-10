import type { Encabezado, Texto, Traducido } from "@/content/types";

export type Proyecto = {
  numero: string;
  nombre: string;
  categoria: Texto;
  desc: Texto;
  imagen: string;
  /** Solo los que están en línea con dominio propio. */
  url?: string;
  dominio?: string;
};

export type Portafolio = Encabezado & {
  grupos: readonly {
    titulo: Texto;
    nota: Texto;
    proyectos: readonly Proyecto[];
  }[];
  ficha: Traducido<{ tipo: string; estado: string; rol: string; dominio: string }>;
  estados: Traducido<{ enLinea: string; enEstudio: string; sinDominio: string }>;
  rol: Texto;
  abrir: Texto;
};

export const PORTAFOLIO: Portafolio = {
  eyebrow: { es: "Proyectos", en: "Projects" },
  titulo: {
    es: "Páginas web que ya están en línea, funcionando.",
    en: "Websites already live and working.",
  },
  acento: { es: "en línea, funcionando.", en: "live and working." },
  entradilla: {
    es: "No son maquetas ni plantillas. Abre cualquiera y compruébalo.",
    en: "These aren't mockups or templates. Open any of them and check.",
  },
  grupos: [
    {
      titulo: { es: "En producción", en: "In production" },
      nota: {
        es: "Con dominio propio y en línea. Toca cualquiera y compruébalo.",
        en: "With their own domain and live. Tap any of them and check.",
      },
      proyectos: [
        {
          numero: "01",
          nombre: "HalcónOS",
          categoria: { es: "Producto propio · SaaS", en: "Own product · SaaS" },
          desc: {
            es: "CRM de ventas para agencias en LATAM: caza leads con Google, redacta propuestas con IA y lleva cada conversación de WhatsApp al pipeline.",
            en: "Sales CRM for LATAM agencies: hunts leads with Google, drafts proposals with AI and takes every WhatsApp conversation into the pipeline.",
          },
          imagen: "/work/halconos.webp",
          url: "https://halcon.jvagencia.com",
          dominio: "halcon.jvagencia.com",
        },
        {
          numero: "02",
          nombre: "Hummik",
          categoria: { es: "Producto propio · SaaS", en: "Own product · SaaS" },
          desc: {
            es: "Agenda de citas por WhatsApp: el cliente reserva desde el chat y la cita cae sola en el calendario, con recordatorios contra los plantones.",
            en: "Appointment booking over WhatsApp: the customer books from the chat and the appointment lands in the calendar, with reminders against no-shows.",
          },
          imagen: "/work/hummik.webp",
          url: "https://www.hummik.com",
          dominio: "hummik.com",
        },
        {
          numero: "03",
          nombre: "Bloomrose",
          categoria: { es: "Tienda online", en: "Online store" },
          desc: {
            es: "Tienda de bisutería y accesorios para el mercado colombiano: catálogo con inventario, carrito, cuentas, pagos en línea y cotización de envíos.",
            en: "Jewellery and accessories store for the Colombian market: catalogue with inventory, cart, accounts, online payments and shipping quotes.",
          },
          imagen: "/work/bloomrose.webp",
          url: "https://www.bloomroseaccesorios.com",
          dominio: "bloomroseaccesorios.com",
        },
      ],
    },
    {
      titulo: { es: "Proyectos de estudio", en: "Studio projects" },
      nota: {
        es: "Sitios que diseñé y construí completos para negocios reales de la región, por iniciativa propia. Cada uno está terminado.",
        en: "Sites I designed and built in full for real businesses in the region, on my own initiative. Each one is finished.",
      },
      proyectos: [
        {
          numero: "04",
          nombre: "Animal Expert",
          categoria: { es: "Veterinaria", en: "Veterinary" },
          desc: {
            es: "Centro médico veterinario en Turbaco: consulta especializada, cirugía, rayos X, fisioterapia y vacunación, con agenda en línea.",
            en: "Veterinary medical centre in Turbaco: specialist consultation, surgery, X-ray, physiotherapy and vaccination, with online booking.",
          },
          imagen: "/work/animal-expert.webp",
        },
        {
          numero: "05",
          nombre: "Fta. Elka Gómez",
          categoria: { es: "Salud y spa", en: "Health and spa" },
          desc: {
            es: "Más de 30 años tratando el dolor en Cartagena: rehabilitación física, masaje y experiencias de spa.",
            en: "Over 30 years treating pain in Cartagena: physical rehabilitation, massage and spa experiences.",
          },
          imagen: "/work/elka-spa.webp",
        },
        {
          numero: "06",
          nombre: "Peluquería Marcopolo",
          categoria: { es: "Belleza", en: "Beauty" },
          desc: {
            es: "Salón de belleza en Barranquilla con cuatro décadas de oficio: corte de autor, color editorial y tratamientos.",
            en: "Beauty salon in Barranquilla with four decades of craft: signature cuts, editorial colour and treatments.",
          },
          imagen: "/work/marcopolo.webp",
        },
      ],
    },
  ],
  ficha: {
    es: { tipo: "Tipo", estado: "Estado", rol: "Rol", dominio: "Dominio" },
    en: { tipo: "Type", estado: "Status", rol: "Role", dominio: "Domain" },
  },
  estados: {
    es: { enLinea: "En línea", enEstudio: "En estudio", sinDominio: "Sin dominio público" },
    en: { enLinea: "Live", enEstudio: "Studio project", sinDominio: "No public domain" },
  },
  rol: { es: "Diseño + desarrollo", en: "Design + development" },
  abrir: { es: "Abrir", en: "Open" },
};

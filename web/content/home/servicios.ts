import type { Encabezado, Enlace, Texto, Traducido } from "@/content/types";

export type TarjetaServicio = {
  /** El mismo id que `lib/services.ts`: el formulario de agenda tira de ahí. */
  id: string;
  numero: string;
  titulo: Texto;
  cuerpo: Texto;
  /** Tres a cinco. Más de cinco y dejan de leerse de un vistazo. */
  chips: Traducido<readonly string[]>;
  enlace?: Enlace;
};

export type Servicios = Encabezado & {
  tarjetas: readonly TarjetaServicio[];
  /** La séptima tarjeta: fondo naranja y dos botones, no un servicio más. */
  cta: {
    titulo: Texto;
    cuerpo: Texto;
    botones: [Enlace, Enlace];
  };
};

export const SERVICIOS: Servicios = {
  eyebrow: { es: "Lo que hago", en: "What I do" },
  titulo: {
    es: "Páginas web, tiendas online y chatbots de WhatsApp.",
    en: "Websites, online stores and WhatsApp chatbots.",
  },
  acento: { es: "chatbots de WhatsApp.", en: "WhatsApp chatbots." },
  tarjetas: [
    {
      id: "web",
      numero: "01",
      titulo: { es: "Diseño de páginas web", en: "Web design" },
      cuerpo: {
        es: "Sitios, landing pages y web corporativa. Rápidos, sólidos y pensados para crecer contigo. Desde $850.000.",
        en: "Sites, landing pages and corporate web. Fast, solid and built to grow with you. From $850,000 COP.",
      },
      chips: {
        es: ["Landing", "Corporativa", "Rediseño", "5 días"],
        en: ["Landing", "Corporate", "Redesign", "5 days"],
      },
      enlace: {
        texto: { es: "Ver servicio", en: "See service" },
        href: { es: "/servicios/diseno-de-paginas-web", en: "/en/services/web-design" },
      },
    },
    {
      id: "ecom",
      numero: "02",
      titulo: { es: "Tiendas virtuales", en: "Online stores" },
      cuerpo: {
        es: "Catálogo con control de stock, pagos en línea, cotización de envíos y cuentas de cliente. La tienda es tuya: no le alquilas la plataforma a nadie.",
        en: "Catalogue with stock control, online payments, shipping quotes and customer accounts. The store is yours: you rent the platform from no one.",
      },
      chips: {
        es: ["Catálogo", "Pagos", "Envíos", "Inventario"],
        en: ["Catalogue", "Payments", "Shipping", "Inventory"],
      },
      enlace: {
        texto: { es: "Ver servicio", en: "See service" },
        href: { es: "/servicios/tiendas-virtuales", en: "/en/services/online-stores" },
      },
    },
    {
      id: "chatbot",
      numero: "03",
      titulo: { es: "Chatbot de WhatsApp", en: "WhatsApp chatbot" },
      cuerpo: {
        es: "Tu número contesta solo: capta interesados, agenda citas y pasa a una persona cuando se complica. Soy proveedor verificado por Meta, así que la conexión la hago yo y no la terceriza nadie.",
        en: "Your number answers on its own: captures leads, books appointments and hands over to a person when it gets complicated. I'm a Meta-verified provider, so I make the connection myself.",
      },
      chips: {
        es: ["Verificado por Meta", "Conexión directa", "Agenda", "Traspaso a humano"],
        en: ["Meta verified", "Direct connection", "Booking", "Human handover"],
      },
      enlace: {
        texto: { es: "Ver servicio", en: "See service" },
        href: { es: "/servicios/chatbot-whatsapp", en: "/en/services/whatsapp-chatbot" },
      },
    },
    {
      id: "seo",
      numero: "04",
      titulo: { es: "Posicionamiento SEO", en: "SEO" },
      cuerpo: {
        es: "Que te encuentren cuando buscan lo que vendes. Nadie garantiza el primer puesto: yo garantizo el trabajo y el informe. Auditoría desde $390.000, plan mensual desde $650.000.",
        en: "So they find you when they search for what you sell. Nobody guarantees first place: I guarantee the work and the report. Audit from $390,000, monthly plan from $650,000 COP.",
      },
      chips: {
        es: ["Auditoría", "SEO local", "Contenido", "Informe mensual"],
        en: ["Audit", "Local SEO", "Content", "Monthly report"],
      },
      enlace: {
        texto: { es: "Ver servicio", en: "See service" },
        href: { es: "/servicios/posicionamiento-seo", en: "/en/services/seo" },
      },
    },
    {
      id: "software",
      numero: "05",
      titulo: { es: "Software a la medida", en: "Custom software" },
      cuerpo: {
        es: "Apps web, sistemas internos y plataformas hechas a tu medida, no forzadas a una plantilla. El precio va según el alcance.",
        en: "Web apps, internal systems and platforms built to fit, not forced into a template. Priced by scope.",
      },
      chips: {
        es: ["Apps web", "Sistemas internos", "Integraciones", "Según alcance"],
        en: ["Web apps", "Internal systems", "Integrations", "By scope"],
      },
      enlace: {
        texto: { es: "Ver servicio", en: "See service" },
        href: { es: "/servicios/software-a-la-medida", en: "/en/services/custom-software" },
      },
    },
    {
      id: "support",
      numero: "06",
      titulo: { es: "Mantenimiento", en: "Maintenance" },
      cuerpo: {
        es: "No desaparezco al entregar. Hosting, soporte y mejoras continuas. Y monitoreo de los tokens de Meta: si expira uno o rechazan una plantilla, el chatbot deja de responder sin avisar.",
        en: "I don't vanish on delivery. Hosting, support and continuous improvements. Plus Meta token monitoring: if one expires or a template is rejected, the chatbot stops replying without warning.",
      },
      chips: {
        es: ["Hosting", "Soporte", "Monitoreo", "Mejoras"],
        en: ["Hosting", "Support", "Monitoring", "Improvements"],
      },
    },
  ],
  cta: {
    titulo: {
      es: "¿No sabes por dónde empezar?",
      en: "Not sure where to start?",
    },
    cuerpo: {
      es: "Diagnóstico sin costo de 20 minutos. Te digo con franqueza si te puedo ayudar —y cómo.",
      en: "Free 20-minute diagnosis. I'll tell you straight whether I can help —and how.",
    },
    botones: [
      {
        texto: { es: "Agenda una llamada", en: "Book a call" },
        href: { es: "/#agenda", en: "/en#agenda" },
      },
      {
        texto: { es: "Ver precios", en: "See pricing" },
        href: { es: "/precios", en: "/en/pricing" },
      },
    ],
  },
};

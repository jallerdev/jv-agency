/**
 * Los servicios que vende la agencia. FUENTE ÚNICA.
 *
 * Existía dos veces —una en `Benefits.tsx` para la portada y otra en
 * `ScheduleCall.tsx` para las opciones del formulario— y se desincronizaron:
 * el formulario seguía ofreciendo "Desarrollo web" y "Mantenimiento" cuando la
 * portada ya decía "Diseño de páginas web" y "Mantenimiento de páginas web", y
 * no ofrecía ni chatbot ni SEO, que son los dos servicios más nuevos y los que
 * más se están empujando.
 *
 * Al agregar o renombrar un servicio, se hace aquí y aparece en los dos sitios.
 * Los nombres son los que la gente busca en Colombia: "diseño de páginas web",
 * no "desarrollo web"; "chatbot", no solo "automatización".
 */
export type ServicioId =
  | "web"
  | "chatbot"
  | "seo"
  | "software"
  | "design"
  | "support";

export type Servicio = {
  id: ServicioId;
  /** Como se nombra en la portada, en el formulario y en el pie. */
  nombre: string;
  /** Descripción de la tarjeta de la portada. */
  desc: string;
  /** Página propia del servicio, si ya existe. */
  href?: string;
};

export const SERVICIOS: Servicio[] = [
  {
    id: "web",
    nombre: "Diseño de páginas web",
    desc: "Sitios, landing pages, e-commerce y web corporativa. Rápidos, sólidos y pensados para crecer contigo.",
  },
  {
    id: "chatbot",
    nombre: "Chatbot de WhatsApp",
    desc: "Tu número contesta solo: capta interesados, agenda citas, toma pedidos y pasa a una persona cuando se complica. Somos proveedor de tecnología verificado por Meta, así que la conexión la hacemos nosotros y no la terceriza nadie.",
    href: "/servicios/chatbot-whatsapp",
  },
  {
    id: "seo",
    nombre: "SEO y posicionamiento",
    desc: "Que te encuentren cuando buscan lo que vendes. El SEO técnico va con el sitio; posicionar es trabajo mensual y lo decimos claro. Nadie garantiza el primer puesto: garantizamos el trabajo y el informe.",
  },
  {
    id: "software",
    nombre: "Software a la medida",
    desc: "Apps web, sistemas internos y plataformas hechas a tu medida, no forzadas a una plantilla.",
  },
  {
    id: "design",
    nombre: "Diseño web / UI",
    desc: "Interfaz y experiencia que se ven de marca grande, pensadas desde el primer día en cómo se van a construir. No es un servicio aparte ni un extra: va dentro de cada proyecto web que hacemos.",
  },
  {
    id: "support",
    nombre: "Mantenimiento de páginas web",
    desc: "No desaparecemos al entregar. Mejoras continuas, hosting y soporte para que todo siga funcionando. Una automatización sobre todo: si expira un token de Meta o rechazan una plantilla, deja de responder sin avisar.",
  },
];

/** Opciones del formulario de agendamiento: id y etiqueta, nada más. */
export const OPCIONES_SERVICIO = SERVICIOS.map((s) => ({
  id: s.id,
  label: s.nombre,
}));

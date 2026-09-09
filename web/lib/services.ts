/**
 * Los servicios que vendo. FUENTE ÚNICA.
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
  /**
   * Página propia del servicio, si ya existe. Solo los que lo tienen se
   * vuelven enlace en la portada y en el formulario.
   *
   * Dos servicios NO lo llevan, y es a propósito:
   *   design  -> «Diseño web / UI» no es un servicio aparte; va dentro de cada
   *              proyecto web, así que su intención de búsqueda pertenece a
   *              /servicios/diseno-de-paginas-web y una segunda tarjeta
   *              apuntando ahí sería el mismo enlace dos veces.
   *   support -> «Mantenimiento» todavía no tiene página propia.
   *
   * Y falta una tarjeta que sí tiene página: /servicios/tiendas-virtuales.
   * Hoy la tienda virtual vive dentro de la descripción de «Diseño de páginas
   * web» («e-commerce»), y darle tarjeta propia obliga a rehacer la rejilla de
   * la portada, que es de cinco columnas y cuadra 3+2 / 2+3 / 3+2. Mientras
   * tanto la página se alcanza desde el pie, desde /precios, desde las tres
   * ciudades y desde la propia página de diseño web.
   */
  href?: string;
};

export const SERVICIOS: Servicio[] = [
  {
    id: "web",
    nombre: "Diseño de páginas web",
    desc: "Sitios, landing pages, e-commerce y web corporativa. Rápidos, sólidos y pensados para crecer contigo. Desde $850.000.",
    href: "/servicios/diseno-de-paginas-web",
  },
  {
    id: "chatbot",
    nombre: "Chatbot de WhatsApp",
    desc: "Tu número contesta solo: capta interesados, agenda citas, toma pedidos y pasa a una persona cuando se complica. Soy proveedor de tecnología verificado por Meta, así que la conexión la hago yo y no la terceriza nadie.",
    href: "/servicios/chatbot-whatsapp",
  },
  {
    id: "seo",
    nombre: "SEO y posicionamiento",
    desc: "Que te encuentren cuando buscan lo que vendes. El SEO técnico va con el sitio; posicionar es trabajo mensual y te lo digo claro. Nadie garantiza el primer puesto: yo garantizo el trabajo y el informe. Auditoría desde $390.000, plan mensual desde $450.000.",
    href: "/servicios/posicionamiento-seo",
  },
  {
    id: "software",
    nombre: "Software a la medida",
    desc: "Apps web, sistemas internos y plataformas hechas a tu medida, no forzadas a una plantilla. El precio va según el alcance.",
    href: "/servicios/software-a-la-medida",
  },
  {
    id: "design",
    nombre: "Diseño web / UI",
    desc: "Interfaz y experiencia que se ven de marca grande, pensadas desde el primer día en cómo se van a construir. No es un servicio aparte ni un extra: va dentro de cada proyecto web que hago.",
  },
  {
    id: "support",
    nombre: "Mantenimiento de páginas web",
    desc: "No desaparezco al entregar. Mejoras continuas, hosting y soporte para que todo siga funcionando. Una automatización sobre todo: si expira un token de Meta o rechazan una plantilla, deja de responder sin avisar.",
  },
];

/** Opciones del formulario de agendamiento: id y etiqueta, nada más. */
export const OPCIONES_SERVICIO = SERVICIOS.map((s) => ({
  id: s.id,
  label: s.nombre,
}));

import { money, PISOS } from "@/lib/quote";
import type { Idioma } from "@/content/types";

/**
 * LA MARQUESINA
 * ──────────────────────────────────────────────────────────────────────────
 * Palo Seco pone aquí un muro de logos de clientes. Este estudio no tiene
 * logos que pueda publicar, y poner unos prestados insinuaría una cartera que
 * no existe —el sitio entero se construyó quitando ese tipo de afirmación—.
 *
 * AQUÍ IBA EL STACK Y ESTABA MAL. Pasaban «Next.js · TypeScript · NestJS ·
 * Prisma · Supabase». Es verdad comprobable, sí, pero está dirigido a otros
 * programadores: al dueño de un salón en Barranquilla no le dice nada, y ese
 * carril ocupa el sitio más caro de la página —el que va justo después del
 * titular—.
 *
 * DESPUÉS PASARON ONCE PROMESAS SUELTAS y tampoco era esto. «Hablas conmigo»,
 * «respondo en menos de 24 horas», «sin plantillas compradas»: todas ciertas,
 * pero son argumentos de CÓMO trabajo, y quien acaba de leer el titular
 * todavía no sabe QUÉ le vendo. El carril contestaba una pregunta que nadie se
 * había hecho aún.
 *
 * AHORA PASA EL CATÁLOGO CON SU PRECIO DE ARRANQUE. Seis servicios, seis
 * precios, y con eso el visitante sabe en diez segundos si este estudio está
 * en su rango antes de bajar nada. Es el dato que más veces decide si la
 * visita sigue, y hasta ahora estaba a tres mil píxeles de scroll.
 *
 * DOS REGLAS DE ESTE ARCHIVO:
 *
 *  1. NADA TÉCNICO. Si una frase necesita que expliques qué es, no va.
 *  2. NI UN PRECIO ESCRITO A MANO. Salen de `PISOS`, que es de donde salen los
 *     de las páginas de servicio. Un número tecleado aquí sobreviviría a la
 *     próxima subida de precios y dejaría la portada contradiciendo a la
 *     página que enlaza tres líneas más abajo.
 */

const T = {
  es: {
    web: "Páginas web desde",
    tienda: "Tiendas online desde",
    chatbot: "Chatbot de WhatsApp desde",
    seo: "SEO local desde",
    seoMes: "/mes",
    software: "Software a la medida",
    auditoria: "Auditoría de SEO desde",
  },
  en: {
    web: "Websites from",
    tienda: "Online stores from",
    chatbot: "WhatsApp chatbot from",
    seo: "Local SEO from",
    seoMes: "/month",
    software: "Custom software",
    auditoria: "SEO audit from",
  },
} as const;

/**
 * El carril, montado con los precios de verdad.
 *
 * «Software a la medida» es el único sin cifra y es a propósito: no tiene
 * piso publicable —la página lo dice con todas las letras, que dos proyectos
 * descritos igual pueden costar el triple— y ponerle un «desde» inventado
 * aquí sería exactamente la clase de número que el resto del sitio se dedica
 * a no decir.
 */
export function frasesMarquesina(idioma: Idioma): readonly string[] {
  const t = T[idioma];
  const p = (n: number) => money(n, idioma);
  return [
    `${t.web} ${p(PISOS.landing)}`,
    `${t.tienda} ${p(PISOS.tienda)}`,
    `${t.chatbot} ${p(PISOS.chatbot)}`,
    `${t.seo} ${p(PISOS.seoMes)}${t.seoMes}`,
    `${t.auditoria} ${p(PISOS.auditoria)}`,
    t.software,
  ];
}

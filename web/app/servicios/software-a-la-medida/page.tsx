import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  CalendarClock,
  Check,
  Clock,
  LayoutDashboard,
  Puzzle,
  Rocket,
  Users,
  X,
} from "lucide-react";

import { Header } from "@/components/Header";
import { Pendiente, sinPendientes } from "@/components/Pendiente";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Faqs } from "@/components/Faqs";
import { BotonCuentame } from "@/components/Cuentame";
import { RailPlazo } from "@/components/visuales/RailPlazo";
import { PanelRolesCrm } from "./PanelRolesCrm";
import { SITE_URL } from "@/lib/site";
import { money } from "@/lib/quote";

/**
 * Página de servicio para la intención transaccional «software a la medida».
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  POR QUÉ «A LA MEDIDA» Y NO «A MEDIDA»
 * ─────────────────────────────────────────────────────────────────────────
 * Las dos formas conviven en el mercado colombiano —softwarealamedida.com.co,
 * El Creativo Web, IT Software y Marketeros escriben «a la medida»; DIPA y
 * Creasotol escriben «a medida»—. El h1 y la ruta usan «a la medida», que es
 * el uso local que ya fijó `SEO-INTENCIONES-DE-COMPRA.md`, y «a medida» suelto
 * aparece una vez en el cuerpo para no perder a quien lo escribe así.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  UNA SOLA PÁGINA, NO UNA POR SINÓNIMO
 * ─────────────────────────────────────────────────────────────────────────
 * «Desarrollo de software», «software personalizado», «sistema a la medida»,
 * «plataforma web», «un programa para mi negocio», «aplicaciones a la medida»
 * y «automatizar un proceso» son la MISMA intención y viven acá adentro. Los
 * casos de uso —inventario, reservas, agenda de varios profesionales, control
 * de sedes, historia clínica, CRM— son SECCIONES, no páginas: una por cada uno
 * sería una doorway page.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  LA CONFUSIÓN MÁS CARA, RESUELTA ARRIBA
 * ─────────────────────────────────────────────────────────────────────────
 * Mucha gente escribe «software» cuando lo que quiere es una página web. Por
 * eso la primera sección después del encabezado CALIFICA y devuelve a la
 * página web a quien le sirve más barato. Perder ese lead a tiempo vale más
 * que venderle lo equivocado.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  LO QUE NO SE PUEDE ROMPER
 * ─────────────────────────────────────────────────────────────────────────
 * · No hay precio publicado para software: `lib/quote.ts` no cotiza esta línea
 *   y el precio autorizado es «según alcance». Ningún número inventado.
 * · HalcónOS y Hummik son PRODUCTO PROPIO, no encargos de cliente. Se nombran
 *   con esas palabras exactas, igual que en `components/Portfolio.tsx`.
 * · No se promete app para Android ni iOS: `lib/services.ts` dice «apps web».
 * · La propiedad de los entregables se cuenta como la escriben los términos
 *   (pasa al cliente con el proyecto pagado), sin contradecir el FAQ de la
 *   portada (el código y los accesos viven del lado del cliente desde el
 *   primer día). Son dos cosas distintas y acá se dicen las dos.
 */
export const metadata: Metadata = {
  title: "Desarrollo de software a la medida | JV Agencia",
  description:
    "Software a la medida para el proceso que te come el día: apps web, sistemas internos y paneles administrables. El código queda en tu repositorio desde el primer día.",
  alternates: { canonical: "/servicios/software-a-la-medida" },
  openGraph: {
    title: "Desarrollo de software a la medida | JV Agencia",
    description:
      "Sistemas internos, paneles y apps web hechos para tu proceso. El código es tuyo y el precio va según el alcance.",
    url: `${SITE_URL}/servicios/software-a-la-medida`,
    type: "website",
  },
};

/** Situaciones concretas en las que alguien contrata esto. */
const PARA_QUIEN = [
  {
    titulo: "El Excel ya no da más",
    desc: "Fórmulas que nadie se atreve a tocar y una copia distinta en cada computador. Funciona hasta el día que esa persona sale a vacaciones.",
  },
  {
    titulo: "El inventario real no coincide con el del papel",
    desc: "Vendes lo que no tienes, o tienes parado lo que creías vendido. Un inventario que descuenta solo al facturar acaba con la discusión de quién anotó mal.",
  },
  {
    titulo: "Agendas a varias personas a la vez",
    desc: "Con tres o cuatro profesionales de horarios distintos, la agenda deja de ser una libreta y pasa a ser un problema de software.",
  },
  {
    titulo: "Tienes dos o tres sedes y ninguna ve lo mismo",
    desc: "Cada punto lleva sus números como puede y consolidarlos es el trabajo del domingo. De los procesos que más rápido se pagan solos.",
  },
  {
    titulo: "Pagas cinco herramientas que no se hablan",
    desc: "Una para facturar, otra para el chat, otra para la agenda, y el puente eres tú copiando y pegando. Ahí no falta otra herramienta: faltan integraciones.",
  },
  {
    titulo: "Tienes una idea de producto y quieres salir con lo mínimo",
    desc: "No necesitas la plataforma completa para saber si alguien la usa: necesitas la parte más chica que ya sirva —un MVP— en línea, y decidir con datos.",
  },
];

/** Qué se construye. Los sinónimos del mercado viven acá, no en páginas aparte. */
const QUE_CONSTRUYO = [
  {
    icon: Boxes,
    titulo: "Sistema de inventario y operación",
    desc: "Entradas, salidas, existencias por bodega y el histórico de quién movió qué. La hoja compartida de hoy, con reglas que no se pueden saltar.",
  },
  {
    icon: CalendarClock,
    titulo: "Sistema de reservas y agenda",
    desc: "Varios profesionales, duraciones distintas, bloqueos, cancelaciones y recordatorios. Si además agenda por chat, se junta con el chatbot.",
  },
  {
    icon: LayoutDashboard,
    titulo: "Panel administrable y panel de control interno",
    desc: "Cambias precios, productos, textos o usuarios sin escribirme. Con roles: nadie ve la caja completa por accidente.",
  },
  {
    icon: Users,
    titulo: "CRM interno y seguimiento de clientes",
    desc: "Dónde va cada negociación, quién la tiene y cuándo hay que volver a llamar. Es el tablero de aquí arriba.",
  },
  {
    icon: Puzzle,
    titulo: "Integraciones con lo que ya usas",
    desc: "Con WhatsApp, con tu contabilidad, con una pasarela o con el Excel que no piensas soltar. Siempre que el otro lado tenga por dónde conectarse.",
  },
  {
    icon: Rocket,
    titulo: "Plataforma web a la medida, por etapas",
    desc: "Si el proyecto es grande no se construye entero de una: sale primero la parte que ya te sirve y de ahí crece. Aplicaciones a la medida, no una plantilla forzada.",
  },
];

/** Qué entra siempre, sin que haya que pedirlo. */
const INCLUYE = [
  "Alcance escrito antes de cobrar nada: qué se construye, en qué etapas y qué queda por fuera",
  "El código en TU repositorio desde el primer commit, no al final del proyecto",
  "Los accesos y las cuentas a tu nombre: servidor, base de datos, dominio y correo",
  "Panel administrable para que no dependas de mí para el día a día",
  "Documentación de cómo se despliega, cómo se restaura y qué hace cada parte",
  "Copias de seguridad configuradas, y probadas restaurándolas al menos una vez",
  "Capacitación de entrega y 30 días de ajustes sin costo",
];

/** Qué NO entra. Vale más que la lista de arriba. */
const NO_INCLUYE = [
  {
    t: "App nativa para Android o iOS",
    d: "Hago apps web: se abren desde el navegador, se instalan como acceso directo en el teléfono y se actualizan solas. No publico en Play Store ni en App Store, y prefiero decírtelo antes que aprenderlo con tu plata.",
  },
  {
    t: "Software de estante: contable, de nómina o POS",
    d: "Si lo que buscas es un programa que ya existe para facturar o liquidar nómina, cómpralo. Sale más barato que mandarlo a hacer y ya lo probaron miles de negocios. Lo que sí hago es conectarlo con lo tuyo.",
  },
  {
    t: "Trabajo por horas dentro de tu equipo",
    d: "No me contratas como programador freelance por horas ni entro a la nómina de nadie. Trabajo por proyecto, con alcance escrito y entregables. Si lo que necesitas es una persona sentada en tu oficina, no soy yo.",
  },
  {
    t: "Alcance abierto de «lo vamos viendo»",
    d: "Los cambios que aparecen a mitad de camino se anotan, se estiman y entran en una etapa siguiente. No se meten calladamente en la actual: así es como un proyecto se dobla de plazo sin que nadie sepa cuándo pasó.",
  },
  {
    t: "Migración de datos viejos, por defecto",
    d: "Traer diez años de una base sucia es un proyecto en sí mismo. Se mira antes, se dice cuánto se puede rescatar de verdad y se cotiza aparte. Nunca se promete que va a entrar todo.",
  },
  {
    t: "Integraciones con sistemas que no dejan conectarse",
    d: "Si tu proveedor no tiene API ni forma de exportar, no hay integración posible por más que la quieras. Eso se averigua en el diagnóstico, no tres meses después.",
  },
  {
    t: "Soporte 24/7 con respuesta en minutos",
    d: "Soy una persona. Respondo dentro de las 24 horas hábiles y para caídas hay un plan de mantenimiento con su alcance escrito. Prometerte un centro de soporte que no existe sería mentir.",
  },
];

/** Cómo se hace, en la forma del rail: una línea por etapa. */
const PROCESO = [
  {
    etiqueta: "Etapa 01",
    texto: "Alcance por escrito: qué se construye, qué no, en cuántas etapas y qué cuesta cada una.",
  },
  {
    etiqueta: "Etapa 02",
    texto: "Primera versión útil, en línea. La parte más chica que ya te sirve, con tus datos reales.",
  },
  {
    etiqueta: "Etapa 03",
    texto: "Se ajusta con el uso. Cada etapa sale de lo que estorbó en la anterior, no de una lista vieja.",
  },
  {
    etiqueta: "Etapa 04",
    texto: "Entrega: código, accesos, documentación, capacitación y 30 días de ajustes sin costo.",
  },
];

/** Lo que se puede abrir y comprobar. Producto propio: se dice con esas palabras. */
const PRUEBA = [
  {
    nombre: "HalcónOS",
    que: "CRM de ventas para agencias en LATAM: caza interesados, redacta propuestas y lleva cada conversación de WhatsApp al pipeline. Con roles: un vendedor a comisión ve sus clientes y no los del resto.",
    url: "https://halcon.jvagencia.com",
    dominio: "halcon.jvagencia.com",
  },
  {
    nombre: "Hummik",
    que: "Agenda de citas por WhatsApp: el cliente reserva desde el chat o desde un enlace, la cita cae sola en el calendario y salen los recordatorios contra los plantones.",
    url: "https://www.hummik.com",
    dominio: "hummik.com",
  },
];

/** Stack real, el mismo que está publicado en /sobre-nosotros. */
const STACK = [
  { grupo: "Frontend", items: ["TypeScript", "React", "Next.js", "Tailwind CSS"] },
  { grupo: "Backend", items: ["Node.js", "NestJS", "Express", "Prisma"] },
  { grupo: "Datos", items: ["PostgreSQL", "Redis", "DynamoDB"] },
  { grupo: "Infraestructura", items: ["AWS", "Docker", "Terraform", "GitHub Actions"] },
];

const FAQS = [
  {
    q: "¿Cuánto cuesta un software a la medida? ¿Por qué no hay un precio publicado?",
    a: "Porque no existe un precio honesto que publicar. Una página web es un producto con forma conocida y por eso su precio está publicado; un software no: dos proyectos que se describen igual en una frase pueden costar tres veces distinto según cuántos usuarios, cuántos roles, cuántas integraciones y cuántos datos viejos haya de por medio. Lo que sí te doy antes de cobrar nada es la propuesta escrita con el número adentro y las etapas separadas, para que veas dónde se va cada peso.",
  },
  {
    q: "¿El código queda 100% mío y en mi repositorio?",
    a: "Sí, y no al final: desde el primer commit. El repositorio se crea en tu cuenta, no en la mía, y ves crecer el proyecto día a día. La propiedad de los entregables pasa formalmente a ti cuando el proyecto está pagado —así está escrito en los términos y así se firma—, pero no existe un momento en que el código viva escondido en una máquina mía como prenda.",
  },
  {
    q: "Si mañana trabajo con otro equipo, ¿me quedo amarrado a ti?",
    a: "No, y está construido a propósito para que no. Repositorio tuyo, accesos tuyos, base de datos tuya, documentación de cómo se despliega y se restaura, y nada de tecnología rara: TypeScript, Node.js, React y PostgreSQL los lee cualquier desarrollador del mercado. El día que quieras cambiar, le entregas esto a otra persona y arranca leyendo, no adivinando.",
  },
  {
    q: "Eres una sola persona. ¿Qué pasa si te pasa algo?",
    a: "Es la pregunta correcta y no la voy a esquivar. Trabajo solo, y por eso no tomo veinte proyectos a la vez. La respuesta no es prometerte un equipo que no tengo: es que todo lo que construyo queda documentado y que el código y los accesos son tuyos desde el primer día. Si mañana desaparezco, tu sistema sigue corriendo y otra persona puede tomarlo. Lo que no puedo prometerte es un centro de soporte con turnos, y por eso tampoco te lo cobro.",
  },
  {
    q: "¿Quién va a escribir el código, con nombre?",
    a: "Luis Jaller. Yo diseño y yo programo, sin subcontratar ni pasarle el proyecto a un practicante después de la reunión de venta. Puedes ver el stack, los perfiles y el trabajo hecho en la página del estudio antes de contratar nada.",
  },
  {
    q: "¿No me sirve mejor comprar un software ya hecho?",
    a: "Muchas veces sí, y te lo digo aunque me deje sin proyecto. Si lo que necesitas es facturar, liquidar nómina o llevar contabilidad, cómpralo hecho: cuesta menos y ya lo depuraron miles de negocios. El software a la medida se justifica cuando tu proceso es raro de verdad, cuando ninguna herramienta del mercado lo cubre sin que tu equipo trabaje al revés, o cuando llevas años pagando suscripciones por cinco herramientas que no se hablan.",
  },
  {
    q: "¿Cuánto se demora? ¿Podemos empezar por lo mínimo y crecer?",
    a: "Empezar por lo mínimo no es una opción de descuento: es como se hace bien. Sale primero la parte más chica que ya te sirva, se usa con datos reales y de ahí crece por etapas. El plazo del proyecto completo sale del alcance y queda escrito en la propuesta, con fechas, antes de que firmes.",
  },
  {
    q: "¿Cómo se estructura el pago?",
    a: "Por etapas y contra entregables, no un pago único al final ni todo por delante. Los anticipos, los hitos y el saldo van escritos en la propuesta antes de empezar, con qué se entrega en cada tramo. Si una etapa no se entregó, no se cobra.",
  },
  {
    q: "¿Qué incluye el soporte después de entregar?",
    a: "La entrega trae capacitación y 30 días de ajustes sin costo. De ahí en adelante el mantenimiento es un plan aparte y opcional, con su alcance escrito. Si no contratas ninguno, el sistema es tuyo igual y sigue funcionando: no hay un interruptor mío que lo apague.",
  },
  {
    q: "¿Dónde quedan mis datos? ¿Esto cumple la Ley 1581 de 2012?",
    a: "Los datos quedan en infraestructura contratada a tu nombre, no en una cuenta mía. La ley te hace responsable a ti del tratamiento, así que lo que hago del lado del software es que puedas cumplirla: recoger solo lo necesario, guardar la autorización, tener registro de quién consultó qué, y poder borrar o exportar los datos de una persona cuando lo pida. Si manejas datos de salud, que la ley trata como sensibles, eso cambia el diseño desde el principio y se conversa antes, no después.",
  },
  {
    q: "¿Se conecta con lo que ya uso: contabilidad, WhatsApp, Excel?",
    a: "Con WhatsApp sí, y de primera mano: soy proveedor de tecnología verificado por Meta. Con Excel también, en los dos sentidos. Con tu contabilidad, depende de si tu proveedor tiene API o al menos una exportación decente; eso se averigua en el diagnóstico y te lo digo antes de que sea una promesa. Si no hay por dónde conectarse, no hay integración, y prefiero decirlo temprano.",
  },
  {
    q: "¿Me entregas documentación o quedo dependiendo de que tú te acuerdes?",
    a: "Entrego documentación escrita: cómo se despliega, cómo se restaura una copia de seguridad, qué hace cada módulo y qué variables necesita para correr. No es un extra que se cobra aparte: un sistema sin manual es un sistema que te amarra a la memoria de una persona, y eso es exactamente lo que este servicio no debería hacerte.",
  },
  {
    q: "¿Yo necesito software o me sirve una página web?",
    a: "Regla rápida: si tu problema es que no te conocen, no te encuentran o no te escriben, es una página web —desde " + money(850000) + " y en 5 días—. Si tu problema es que sí te escriben pero por dentro el proceso no da abasto, ahí es software. Muchos negocios necesitan primero lo uno y después lo otro, en ese orden, y sale más barato así.",
  },
];

export default function SoftwareALaMedidaPage() {
  // Datos estructurados de Service. Sin FAQPage a propósito: desde 2023 Google
  // lo restringió a gobierno y salud, así que acá no da resultado enriquecido.
  // Sin `offers` con precio: esta línea se cotiza por alcance y no hay número
  // autorizado que publicar. Un precio inventado en el JSON-LD es igual de
  // falso que uno inventado en la página.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/servicios/software-a-la-medida#servicio`,
    name: "Desarrollo de software a la medida",
    alternateName: [
      "Software a medida",
      "Software personalizado",
      "Desarrollo de software",
      "Aplicaciones a la medida",
      "Sistema a la medida",
      "Plataforma web a la medida",
    ],
    serviceType: "Desarrollo de software a la medida",
    description:
      "Desarrollo de sistemas internos, paneles administrables, apps web e integraciones hechos para el proceso de un negocio: inventario, reservas y agenda, control de sedes, CRM interno y automatización de procesos. El código y los accesos quedan del lado del cliente.",
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: [
      { "@type": "Country", name: "Colombia" },
      { "@type": "Place", name: "Latinoamérica" },
    ],
    url: `${SITE_URL}/servicios/software-a-la-medida`,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Qué se construye",
      itemListElement: QUE_CONSTRUYO.map((q, i) => ({
        "@type": "Offer",
        position: i + 1,
        name: q.titulo,
        description: q.desc,
        availability: "https://schema.org/InStock",
        seller: { "@id": `${SITE_URL}/#organization` },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        {/* ── Encabezado ─────────────────────────────────────────────── */}
        <section className="mx-auto max-w-4xl px-5 pb-8 pt-32 text-center md:px-8 md:pt-40">
          <Reveal>
            <Badge>Software a la medida</Badge>
            <h1 className="mt-6 font-display text-4xl leading-tight text-ink sm:text-5xl md:text-6xl">
              Software a la medida{" "}
              <span className="block text-metal">para el proceso que te come el día</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl font-body text-lg leading-relaxed text-ink-soft">
              Hay un momento en que el negocio deja de crecer por lo que vende y se frena por
              dentro: el Excel que solo entiende una persona, los pedidos en un cuaderno, tres
              chats que nadie sabe quién atiende. Eso no se arregla con otra herramienta más.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" variant="primary" asChild>
                <Link href="/#contacto">
                  Agenda una llamada <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#precio">Cómo se cotiza</a>
              </Button>
            </div>
          </Reveal>
        </section>

        {/* ── Calificar: ¿software o página web? ─────────────────────── */}
        {/* Va arriba a propósito. Es la confusión que más plata cuesta de los
            dos lados: el que quería una web y le venden un sistema, y el que
            necesitaba un sistema y se conforma con una web. */}
        <section className="banda mx-auto max-w-4xl px-5 py-12 md:px-8">
          <Reveal>
            <div className="rounded-[1.75rem] border border-primary/20 bg-gradient-to-br from-surface to-secondary/15 p-8 md:p-10">
              <h2 className="font-display text-3xl text-ink sm:text-4xl">
                Antes de nada:
                <span className="text-metal"> ¿necesitas software o te sirve una página web?</span>
              </h2>
              <p className="mt-5 font-body text-lg leading-relaxed text-ink-soft">
                Mucha gente escribe «software» cuando quiere una página web, y contratar lo
                equivocado cuesta caro en las dos direcciones. La regla que uso es esta:
              </p>
              <div className="mt-7 grid gap-5 md:grid-cols-2">
                <div className="rounded-2xl border border-line bg-surface/80 p-6">
                  <h3 className="font-display text-xl text-ink">Si el problema está afuera</h3>
                  <p className="mt-2 font-body leading-relaxed text-ink-soft">
                    No te conocen, no te encuentran en Google, o lo que hay de ti en internet no
                    está a la altura de lo que vendes. Eso es una{" "}
                    <strong className="text-ink">página web</strong>: desde {money(850000)} y lista
                    en 5 días.
                  </p>
                  <Link
                    href="/precios"
                    className="mt-2 inline-flex min-h-11 items-center gap-2 font-body text-sm font-semibold text-primary-dark underline-offset-4 hover:underline"
                  >
                    Ver precios de páginas web <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="rounded-2xl border border-line bg-surface/80 p-6">
                  <h3 className="font-display text-xl text-ink">Si el problema está adentro</h3>
                  <p className="mt-2 font-body leading-relaxed text-ink-soft">
                    Te escriben y vendes, pero por dentro el proceso no da abasto: inventario que
                    no cuadra, agenda que se choca, sedes que no ven lo mismo. Eso sí es{" "}
                    <strong className="text-ink">software a la medida</strong>.
                  </p>
                </div>
              </div>
              <p className="mt-6 font-body leading-relaxed text-ink-soft">
                Y si lo que quieres es que WhatsApp conteste y agende solo, eso es más barato que
                un sistema:{" "}
                <Link
                  href="/servicios/chatbot-whatsapp"
                  className="text-primary-dark underline underline-offset-4"
                >
                  chatbot de WhatsApp
                </Link>
                . Primero la web, después el chatbot y solo entonces el sistema: en ese orden sale
                más barato, y así lo recomiendo.
              </p>
            </div>
          </Reveal>
        </section>

        {/* ── Para quién es ──────────────────────────────────────────── */}
        <section className="banda mx-auto max-w-6xl px-5 py-12 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Cuándo se contrata esto de verdad
            </h2>
            <p className="mt-4 max-w-2xl font-body text-lg leading-relaxed text-ink-soft">
              Nadie se levanta queriendo comprar software. Se llega por una de estas seis, y casi
              siempre después de aguantarla de más.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {PARA_QUIEN.map((p, i) => (
              <Reveal key={p.titulo} index={i}>
                <article className="h-full rounded-2xl border border-line bg-surface/70 p-7">
                  <h3 className="font-display text-xl text-ink">{p.titulo}</h3>
                  <p className="mt-2 font-body leading-relaxed text-ink-soft">{p.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Qué se construye ───────────────────────────────────────── */}
        <section className="banda mx-auto max-w-6xl px-5 py-12 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Qué construyo, en concreto
            </h2>
            <p className="mt-4 max-w-2xl font-body text-lg leading-relaxed text-ink-soft">
              No son productos de catálogo: son las formas que más se repiten, y casi todo proyecto
              es dos o tres de estas juntas. Lo busques como software a medida o como «un programa
              para mi negocio», es esto.
            </p>
          </Reveal>

          {/* «Cada vendedor ve sus clientes, no los del resto» era una
              subordinada dentro de un párrafo. Conmutado, se demuestra. */}
          <Reveal delay={90} className="mt-10 block">
            <h3 className="font-display text-2xl text-ink sm:text-3xl">
              Un panel con roles, en dos clics
            </h3>
            <p className="mt-3 max-w-2xl font-body leading-relaxed text-ink-soft">
              Cambia la vista y mira qué desaparece. Eso es lo que ve un vendedor a comisión.
            </p>
            <PanelRolesCrm className="mt-6" />
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {QUE_CONSTRUYO.map((q, i) => {
              const Icon = q.icon;
              return (
                <Reveal key={q.titulo} index={i}>
                  <article className="flex h-full flex-col rounded-2xl border border-line bg-surface/70 p-7">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-on-accent shadow-soft">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-5 font-display text-xl text-ink">{q.titulo}</h3>
                    <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-ink-soft">
                      {q.desc}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <Reveal>
            <div className="mt-6">
              <p className="max-w-3xl font-body leading-relaxed text-ink-soft">
                <strong className="text-ink">Un caso que se repite en salud:</strong> agenda de
                varios profesionales, control de sedes e historia clínica. Ahí la web y el sistema
                son dos proyectos distintos y conviene no mezclarlos —con ejemplos, en{" "}
                <Link
                  href="/sectores/clinicas-y-consultorios"
                  className="text-primary-dark underline underline-offset-4"
                >
                  páginas web para clínicas y consultorios
                </Link>
                .
              </p>
            </div>
          </Reveal>
        </section>

        {/* ── Cuánto cuesta y cómo se cotiza ─────────────────────────── */}
        <section id="precio" className="mx-auto max-w-6xl scroll-mt-28 px-5 py-12 md:px-8">
          <Reveal>
            <Badge>Precio</Badge>
            <h2 className="mt-6 font-display text-3xl text-ink sm:text-4xl">
              Cuánto cuesta: según el alcance, y así se calcula
            </h2>
            <p className="mt-4 max-w-3xl font-body text-lg leading-relaxed text-ink-soft">
              Publico el precio de lo que tiene forma conocida —una{" "}
              <Link href="/precios" className="text-primary-dark underline underline-offset-4">
                página web desde {money(850000)}, una tienda online desde {money(2500000)}
              </Link>
              —. El software no la tiene: dos proyectos que se cuentan igual pueden costar tres
              veces distinto, y un «desde» bonito acá es el que después crece cuando ya no te
              puedes devolver. Lo que sí te doy es la lista de lo que mueve la aguja.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <Reveal>
              <article className="h-full rounded-2xl border border-line bg-surface/70 p-7">
                <h3 className="font-display text-xl text-ink">Lo que sube el precio</h3>
                <ul className="mt-4 grid gap-3">
                  {[
                    "Cuántos roles distintos hay y qué puede ver cada uno",
                    "Cuántas integraciones con sistemas de terceros, y si esos sistemas colaboran",
                    "Si hay que traer datos viejos, y en qué estado están",
                    "Si además del panel interno hace falta una parte para el cliente final",
                    "Si el proceso está escrito en algún lado o hay que reconstruirlo preguntando",
                    "Si hay obligaciones de por medio: datos sensibles, trazabilidad, auditoría",
                  ].map((x) => (
                    <li key={x} className="flex items-start gap-3 font-body text-ink-soft">
                      <Check className="mt-1 h-5 w-5 shrink-0 text-primary" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>

            <Reveal delay={100}>
              <article className="h-full rounded-2xl border border-line bg-surface/70 p-7">
                <h3 className="font-display text-xl text-ink">Lo que lo baja</h3>
                <ul className="mt-4 grid gap-3">
                  {[
                    "Arrancar por una sola etapa, la que ya te sirve sola",
                    "Tener claro el proceso antes de la llamada, aunque sea en una hoja",
                    "Aceptar que la primera versión sea fea por dentro y correcta por fuera",
                    "Dejar por fuera lo que hoy no se usa, aunque «algún día podría servir»",
                    "Usar lo que ya existe donde exista: no todo hay que construirlo",
                  ].map((x) => (
                    <li key={x} className="flex items-start gap-3 font-body text-ink-soft">
                      <Check className="mt-1 h-5 w-5 shrink-0 text-primary" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          </div>

          <Reveal>
            <div className="mt-6 grid gap-4 rounded-2xl border border-line bg-background/40 p-7 font-body leading-relaxed text-ink-soft">
              <p>
                <strong className="text-ink">Cómo se paga:</strong> por etapas y contra entregables.
                Los anticipos, los hitos y el saldo van escritos en la propuesta antes de empezar, y
                las condiciones generales están publicadas en los{" "}
                <Link href="/terminos" className="text-primary-dark underline underline-offset-4">
                  términos del servicio
                </Link>
                . Si una etapa no se entregó, no se cobra.
              </p>
              {/* Dato que falta, a la vista. No se inventa un piso: se pide. */}
              <Pendiente>[PENDIENTE: definir el piso — por debajo de qué monto no vale la pena arrancar un
                software a la medida. Sin ese número, esta sección explica cómo se cotiza pero no le
                dice al visitante si le alcanza, que es lo que vino a averiguar.]</Pendiente>
            </div>
          </Reveal>
        </section>

        {/* ── Qué incluye / qué no ───────────────────────────────────── */}
        <section className="banda mx-auto max-w-6xl px-5 py-12 md:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <Reveal>
              <h2 className="font-display text-3xl text-ink sm:text-4xl">Qué incluye siempre</h2>
              <ul className="mt-8 grid gap-3">
                {INCLUYE.map((x) => (
                  <li key={x} className="flex items-start gap-3 font-body text-ink-soft">
                    <Check className="mt-1 h-5 w-5 shrink-0 text-primary" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={120}>
              <h2 className="font-display text-3xl text-ink sm:text-4xl">
                Qué <span className="text-metal">no</span> hago
              </h2>
              <p className="mt-4 font-body leading-relaxed text-ink-soft">
                Esta lista vale más que la de arriba. Todo el mundo dice que sí a todo en la reunión
                de venta; los problemas empiezan después.
              </p>
              <ul className="mt-8 grid gap-5">
                {NO_INCLUYE.map((x) => (
                  <li key={x.t} className="flex items-start gap-3">
                    <X className="mt-1 h-5 w-5 shrink-0 text-danger" />
                    <span>
                      <strong className="block font-body font-semibold text-ink">{x.t}</strong>
                      <span className="mt-1 block font-body text-sm leading-relaxed text-ink-soft">
                        {x.d}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* ── Cómo se hace ───────────────────────────────────────────── */}
        <section className="banda mx-auto max-w-4xl px-5 py-12 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">Cómo se hace</h2>
          </Reveal>
          <Reveal delay={80}>
            <RailPlazo
              className="mt-10"
              previo={{
                etiqueta: "Antes de la etapa 01",
                texto: "Diagnóstico de 20 minutos. Si te sirve una página web y no software, ahí te lo digo.",
              }}
              hitos={PROCESO}
            />
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-4 py-2 font-body text-sm text-ink-soft">
              <Clock className="h-4 w-4 text-accent" />
              El plazo sale del alcance y queda escrito en la propuesta, con fechas
            </p>
            {/* El plazo típico de la primera etapa es el dato que más preguntan
                y el único que no tengo confirmado. Queda a la vista. */}
            <Pendiente>[PENDIENTE: plazo típico de la primera versión útil, en semanas. Es lo que todo el mundo
              pregunta en la llamada y hoy la página no lo contesta.]</Pendiente>
          </Reveal>
        </section>

        {/* ── La prueba ──────────────────────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-5 py-12 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Lo que puedes abrir ahora mismo
            </h2>
            <p className="mt-4 max-w-3xl font-body text-lg leading-relaxed text-ink-soft">
              La pregunta que hay que hacerle a cualquiera que ofrezca desarrollo de software es
              esta: <em>enséñeme algo suyo que siga funcionando en producción</em>. No una maqueta:
              una dirección que yo pueda abrir. Acá van dos, con dominio propio.
            </p>
            <p className="mt-4 max-w-3xl font-body text-lg leading-relaxed text-ink-soft">
              Y digo lo que son:{" "}
              <strong className="text-ink">
                son producto propio, no encargos de cliente. Los construí yo, por mi cuenta y con mi
                plata.
              </strong>{" "}
              No prueban que alguien me pagó por hacerlos: prueban que sé construir y sostener un
              sistema completo, que es lo que vas a comprar.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {PRUEBA.map((p, i) => (
              <Reveal key={p.nombre} index={i}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col rounded-2xl border border-line bg-surface/70 p-7 transition-card duration-slow ease-state hover:border-primary/40 hover:shadow-soft"
                >
                  <span className="inline-flex w-fit rounded-full bg-primary/12 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-primary-dark">
                    Producto propio · En producción
                  </span>
                  <h3 className="mt-4 font-display text-2xl text-ink">{p.nombre}</h3>
                  <p className="mt-2 flex-1 font-body leading-relaxed text-ink-soft">{p.que}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 border-t border-line pt-4 font-mono text-sm text-primary-dark">
                    {p.dominio}
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-base ease-state group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="mt-6 max-w-3xl font-body leading-relaxed text-ink-soft">
              El resto —tiendas online y páginas web en línea, y proyectos de estudio hechos por
              iniciativa propia— está en{" "}
              <Link href="/#proyectos" className="text-primary-dark underline underline-offset-4">
                los proyectos
              </Link>
              , cada uno con su dirección para comprobarlo.
            </p>
          </Reveal>
        </section>

        {/* ── Con qué está construido ────────────────────────────────── */}
        <section className="banda mx-auto max-w-6xl px-5 py-12 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">Con qué lo construyo</h2>
            <p className="mt-4 max-w-3xl font-body text-lg leading-relaxed text-ink-soft">
              Nada exótico, a propósito: todo esto lo lee cualquier desarrollador del mercado, así
              que el día que cambies de manos no te encuentras un sistema escrito en un idioma que
              solo yo hablo.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STACK.map((s, i) => (
              <Reveal key={s.grupo} index={i}>
                <div className="h-full rounded-2xl border border-line bg-surface/60 p-6">
                  <h3 className="font-body text-sm font-semibold uppercase tracking-widest text-ink">
                    {s.grupo}
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {s.items.map((it) => (
                      <span
                        key={it}
                        className="rounded-full border border-line bg-background/50 px-3 py-1 font-body text-xs text-ink-soft"
                      >
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="mt-6 max-w-3xl font-body leading-relaxed text-ink-soft">
              Quién escribe el código, con nombre y perfiles públicos:{" "}
              <Link
                href="/sobre-nosotros"
                className="text-primary-dark underline underline-offset-4"
              >
                Luis Jaller, en la página del estudio
              </Link>
              .
            </p>
          </Reveal>
        </section>

        {/* ── Preguntas ──────────────────────────────────────────────── */}
        <section className="banda mx-auto max-w-4xl px-5 py-12 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Las preguntas que hay que hacer antes de firmar
            </h2>
            <p className="mt-4 font-body text-lg leading-relaxed text-ink-soft">
              Separan a quien va a entregar de quien va a improvisar. Hazlas también en las otras
              cotizaciones que pidas.
            </p>
          </Reveal>
          <Reveal delay={80} className="mt-10">
            <Faqs items={sinPendientes(FAQS)} />
          </Reveal>
        </section>

        {/* ── Cierre ─────────────────────────────────────────────────── */}
        <section className="mx-auto max-w-4xl px-5 py-16 text-center md:px-8 md:py-24">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Cuéntame el proceso que te come el día
            </h2>
            <p className="mx-auto mt-5 max-w-xl font-body text-lg leading-relaxed text-ink-soft">
              Veinte minutos alcanzan para saber si esto se resuelve con software, con una página
              web o con nada. Si te sirve más barato de otra manera, te lo digo ahí mismo.
            </p>
            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" variant="primary" asChild>
                <Link href="/#contacto">
                  Agenda una llamada <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <BotonCuentame />
            </div>
            <p className="mx-auto mt-8 max-w-xl font-body text-base leading-relaxed text-ink-soft">
              ¿Todavía no sabes si es software o página web? Los{" "}
              <Link href="/precios" className="text-primary-dark underline underline-offset-4">
                precios publicados
              </Link>{" "}
              lo aclaran. Que te encuentren y que te crean es{" "}
              <Link
                href="/servicios/diseno-de-paginas-web"
                className="text-primary-dark underline underline-offset-4"
              >
                diseño de páginas web
              </Link>
              ; vender un catálogo con carrito y pagos,{" "}
              <Link
                href="/servicios/tiendas-virtuales"
                className="text-primary-dark underline underline-offset-4"
              >
                creación de tiendas virtuales
              </Link>
              . Los dos son más cortos y más baratos que este, y te lo digo antes de cobrarte el
              equivocado.
            </p>
          </Reveal>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

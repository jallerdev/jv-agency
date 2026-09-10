import type { Metadata } from "next";
import Link from "next/link";
import {
  Search,
  MapPin,
  FileSearch,
  Wrench,
  LineChart,
  Sparkles,
  ArrowRight,
  Check,
  Clock,
} from "lucide-react";

import { Header } from "@/components/sections/Header";
import { Pendiente, sinPendientes } from "@/components/Pendiente";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Faqs } from "@/components/Faqs";
import { BotonCuentame } from "@/components/Cuentame";
import { Comparador, type ItemNoIncluye } from "@/components/visuales/Comparador";
import { SumadorSeo } from "@/components/visuales/SumadorSeo";
import { FichaGoogle } from "@/components/visuales/FichaGoogle";
import { BloqueLocalGoogle } from "@/components/visuales/BloqueLocalGoogle";
import { RailPlazo } from "@/components/visuales/RailPlazo";
import { SITE_URL } from "@/lib/site";
import {
  SEO_DETALLE,
  SEO_PLAN_DETALLE,
  SEO_PRICES,
  SEO_HONESTY_NOTE,
  money,
} from "@/lib/quote";

/**
 * Página de servicio para la intención transaccional «posicionamiento SEO en
 * Colombia». El término va con las dos palabras juntas —posicionamiento y
 * SEO— porque así es como se busca acá y así lo titula el líder del sector.
 *
 * EL EJE DE LA PÁGINA, y es lo que casi nadie explica: la diferencia entre
 * SEO TÉCNICO (una sola vez, va con el sitio) y POSICIONAMIENTO (trabajo
 * mensual). Está resuelta en `lib/quote.ts` y de ahí se leen las dos listas,
 * no se reescriben: si mañana cambia el alcance, cambia en un solo lugar.
 *
 * LO QUE ESTA PÁGINA NO HACE: repetir el artículo del blog. «¿Cuánto cuesta
 * el SEO en Colombia?» explica el mercado, con tablas y fuentes citadas; esta
 * página vende el servicio. Se enlazan, no se copian. Por eso la cuenta de
 * las herramientas y de las horas vive allá y acá solo se apunta.
 *
 * El título y el h1 salen del mapa de `SEO-INTENCIONES-DE-COMPRA.md`.
 */
export const metadata: Metadata = {
  title: "Posicionamiento SEO en Colombia | JV Agencia",
  description:
    "Posicionamiento web y SEO local en Colombia. Auditoría desde $390.000 y plan mensual desde $650.000. No prometo el primer puesto: garantizo el trabajo y el informe.",
  alternates: { canonical: "/servicios/posicionamiento-seo" },
  openGraph: {
    title: "Posicionamiento SEO en Colombia | JV Agencia",
    description:
      "Que te encuentren cuando buscan lo que vendes. Auditoría SEO desde $390.000 y posicionamiento mensual desde $650.000.",
    url: `${SITE_URL}/servicios/posicionamiento-seo`,
    type: "website",
  },
};

/* ─────────────────────────────────────────────────────────────────────────
   Contenido
   ───────────────────────────────────────────────────────────────────── */

const PARA_QUIEN = [
  {
    icon: Search,
    titulo: "Te buscan por tu nombre y sí sales; por lo que vendes, no",
    desc: "Escribe «lo que haces + tu ciudad» y salen otros seis. Ese es el hueco que se trabaja.",
  },
  {
    icon: MapPin,
    titulo: "No sales en el mapa",
    desc: "Arriba de todo salen tres negocios con estrellas y un botón de «Cómo llegar». Sin ficha de Google Business no entras a esa lista.",
  },
  {
    icon: LineChart,
    titulo: "Vives de la pauta y el día que la apagas desapareces",
    desc: "Pagar por clic funciona mientras estés pagando. Esto es lento, pero no se apaga cuando se acaba el presupuesto del mes.",
  },
  {
    icon: Wrench,
    titulo: "Tienes página hace años y nunca te trajo un cliente",
    desc: "Casi siempre no es la página: es que Google no la puede leer, o nadie escribió las palabras con las que te buscan.",
  },
];

/* Lo que sí entra en el trabajo mensual. Complementa —no repite— la lista
   que se lee de SEO_PLAN_DETALLE.local más arriba: aquí van las condiciones
   del trato, no el alcance técnico. */
const INCLUYE = [
  "Acceso de lectura a tu Search Console y a tu analítica, desde el mes uno",
  "Informe mensual con lo que hice, lo que se movió y lo que sigue",
  "Los contenidos los escribo yo, investigados y publicados con sus imágenes",
  "La ficha de Google Business gestionada: publicaciones, fotos y respuesta a reseñas",
  "Las cuentas quedan a tu nombre: si mañana te vas, te llevas todo",
  "Sin cláusula de permanencia. Se paga mes a mes",
];

const NO_INCLUYE: ItemNoIncluye[] = [
  { texto: "Garantía de primer puesto, ni «top 3 en 60 días».", quien: "nadie puede darla" },
  { texto: "Enlaces comprados, que Google nombra como spam.", quien: "no se compran" },
  { texto: "Pauta ni Google Ads. Esto no es publicidad pagada.", quien: "otro servicio" },
  { texto: "Veinte artículos al mes hechos por una máquina y publicados sin leerlos.", quien: "los escribo yo" },
  { texto: "Manejo de redes sociales.", quien: "otro proveedor" },
  { texto: "Rediseño de la página. Si hay que rehacerla, te lo digo.", quien: "se cotiza aparte" },
];

const PROCESO = [
  {
    n: "01",
    t: "Miro tu sitio y tus datos",
    d: "Rastreo la página entera y abro tu Search Console y tu analítica. Si no las tienes, las instalo. Es la auditoría: 5 días.",
  },
  {
    n: "02",
    t: "Arreglo lo que te está frenando",
    d: "Páginas lentas, enlaces rotos, textos repetidos. Va una sola vez, el primer mes.",
  },
  {
    n: "03",
    t: "Averiguo con qué palabras te buscan",
    d: "Una página por intención de búsqueda, nunca una por sinónimo.",
  },
  {
    n: "04",
    t: "Trabajo el mapa y el contenido, cada mes",
    d: "Ficha de Google Business, páginas nuevas cuando la investigación las pida, y los contenidos del mes publicados.",
  },
  {
    n: "05",
    t: "Te mando el informe y hablamos",
    d: "Qué hice, qué se movió y qué sigue. Con tus datos, no con la captura de una herramienta mía.",
  },
];

const CIUDADES = [
  { label: "Cartagena", href: "/diseno-de-paginas-web-en-cartagena" },
  { label: "Barranquilla", href: "/diseno-de-paginas-web-en-barranquilla" },
  { label: "Bogotá", href: "/diseno-de-paginas-web-en-bogota" },
];

const FAQS = [
  {
    q: "¿Me garantizas el primer puesto en Google?",
    a: (
      <>
        No, y desconfía de quien te lo ponga por escrito. Las posiciones las decide Google, no
        yo. Lo que sí te garantizo es el trabajo hecho, medido y visible en un informe. Los
        primeros movimientos se ven entre el mes 3 y el 6.
      </>
    ),
  },
  {
    q: "¿En cuánto tiempo veo algo?",
    a: (
      <>
        Entre el mes 3 y el mes 6 empiezan a moverse las primeras búsquedas. Antes de eso hay
        datos, y sirven para corregir el rumbo, no para juzgar si funcionó. Si alguien te promete
        resultados en tres semanas, te está vendiendo otra cosa.
      </>
    ),
  },
  {
    q: "¿Por qué es mensual y no un pago único?",
    a: (
      <>
        Porque no es una obra que se termina. Tu competencia también publica, Google cambia sus
        criterios y las búsquedas de tu sector se mueven. Lo que sí es de una sola vez es el SEO
        técnico y el arreglo del sitio: eso se hace, queda hecho y no se vuelve a cobrar.
      </>
    ),
  },
  {
    q: "¿Qué diferencia hay entre el SEO técnico que viene con la web y esto que me cobras aparte?",
    a: (
      <>
        El SEO técnico es que Google pueda leer y mostrar bien tu página: títulos, datos
        estructurados, sitemap, velocidad, imágenes. Se hace una vez, va incluido cuando yo hago
        el sitio y se acaba. Posicionar es el trabajo continuo de ganarle terreno a otros que
        también están trabajando. Confundirlos es lo que hace que el mes dos decepcione.
      </>
    ),
  },
  {
    q: "¿Qué me entregas cada mes? ¿Cómo sé que trabajaste?",
    a: (
      <>
        Un informe con lo hecho, lo que se movió y lo que sigue. Y algo que vale más que el
        informe: acceso de lectura a tu propia Search Console y a tu analítica. Esos números no
        los maquilla nadie. Es la pregunta de una línea que resuelve cualquier duda con cualquier
        proveedor: <em>¿me das acceso de lectura a mi Search Console?</em>
      </>
    ),
  },
  {
    q: "¿Puedo contratar solo la auditoría y arreglarlo yo?",
    a: (
      <>
        Sí. La auditoría cuesta {money(390000)} y sale en 5 días. Te queda la lista de lo que
        está frenando el sitio, en orden de qué se arregla primero. Si lo arreglas tú o tu
        desarrollador, perfecto: para eso está escrita en español y no en jerga.
      </>
    ),
  },
  {
    q: "¿Sirve si la página me la hizo otro?",
    a: (
      <>
        Sí, y es la mitad de los casos. Por eso existe la revisión y arreglo del sitio de{" "}
        {money(SEO_PRICES.extras.puestaApunto)}: es dejar la base pareja antes de empezar a
        empujar. Si la página la hice yo con SEO técnico incluido, eso ya está hecho y no se
        cobra.
      </>
    ),
  },
  {
    q: "Si dejo de pagar, ¿pierdo lo que gané?",
    a: (
      <>
        No de un día para otro, y nada de lo hecho se borra: las páginas, los contenidos, los
        arreglos y la ficha son tuyos y quedan. Lo que pasa es que el trabajo se detiene y los
        demás siguen, así que lo ganado se va desgastando con los meses. No es un interruptor,
        es una inercia.
      </>
    ),
  },
  {
    q: "¿Necesito la ficha de Google Business? ¿La creas tú?",
    a: (
      <>
        Si atiendes clientes de una ciudad, es lo que más mueve y es gratis tenerla. Sin ficha no
        sales en el mapa ni en el bloque de tres resultados que aparece arriba de todo, y no
        puedes recibir reseñas. Si no la tienes, la creo y la verifico por{" "}
        {money(SEO_PRICES.extras.ficha)}, una sola vez.
      </>
    ),
  },
  {
    q: "Otros me cobran $250.000 al mes. ¿Por qué tú cobras más?",
    a: (
      <>
        Porque por debajo de cierto precio no se compra menos SEO: se compra otra cosa con el
        mismo nombre —enlaces comprados, artículos de máquina sin revisar, o un PDF exportado de
        una herramienta con un logo encima—. La cuenta completa, con los precios de las
        herramientas y las horas que lleva un mes de trabajo, la escribí con fuentes en{" "}
        <Link
          href="/blog/cuanto-cuesta-el-seo-en-colombia"
          className="text-primary-dark underline underline-offset-4"
        >
          cuánto cuesta el SEO en Colombia
        </Link>
        .
      </>
    ),
  },
  {
    q: "¿Cuántas ciudades y cuántas búsquedas cubre el plan?",
    a: (
      <>
        El plan de entrada trabaja una ciudad y un servicio principal a fondo, con vigilancia de
        hasta 30 búsquedas. Cada ciudad adicional suma{" "}
        {money(SEO_PRICES.ciudadExtra)} al mes. Prefiero una ciudad bien trabajada que cinco a
        medias: repartir el mismo esfuerzo entre cinco no posiciona en ninguna.
      </>
    ),
  },
  {
    q: "¿Esto sirve para que me mencione ChatGPT o la IA de Google?",
    a: (
      <>
        Ayuda, y es la misma base: los modelos y los resúmenes con IA se alimentan de páginas que
        se pueden leer, con datos estructurados y con información concreta y verificable. Lo que
        no te puedo vender es una garantía de que un modelo te nombre: nadie controla eso, ni
        siquiera quien lo entrena.
      </>
    ),
  },
  {
    q: "Vendo casi todo por WhatsApp. ¿El SEO me sirve igual?",
    a: (
      <>
        Sí, y son dos piezas del mismo camino. El posicionamiento trae la conversación; el{" "}
        <Link
          href="/servicios/chatbot-whatsapp"
          className="text-primary-dark underline underline-offset-4"
        >
          chatbot de WhatsApp
        </Link>{" "}
        la atiende a la hora que llegue. Traer gente a un número que contesta al otro día es
        pagar por perderla.
      </>
    ),
  },
  {
    q: "¿Tengo que escribir blog? ¿Lo escribes tú?",
    a: (
      <>
        Lo escribo yo. El plan de entrada trae 2 contenidos al mes, investigados, escritos,
        publicados y enlazados desde y hacia las páginas que corresponden. Si quieres más, cada
        contenido adicional cuesta {money(SEO_PRICES.contenidoExtraUnidad)} al mes.
      </>
    ),
  },
  {
    q: "¿Cuánto tiempo tengo que quedarme amarrado?",
    a: (
      <>
        Nada. No hay cláusula de permanencia y se paga mes a mes. Lo que sí te pido es que lo
        mires con horizonte de {SEO_PRICES.mesesParaResultados} meses, porque antes de eso los
        números todavía no dicen si sirvió. Si a los tres meses no ves movimiento y no te puedo
        explicar por qué, no tiene sentido que sigas.
      </>
    ),
  },
];

export default function PosicionamientoSeoPage() {
  /* Datos estructurados de servicio. Sin FAQPage a propósito: desde 2023
     Google lo restringió a sitios de gobierno y salud, así que acá no daría
     resultado enriquecido. El proveedor apunta al @id del grafo global: un
     solo negocio, no uno nuevo por página. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/servicios/posicionamiento-seo#servicio`,
    name: "Posicionamiento SEO",
    alternateName: [
      "Posicionamiento web",
      "SEO local",
      "Servicio de posicionamiento en buscadores",
      "Optimización de motores de búsqueda",
    ],
    serviceType: "Posicionamiento en buscadores (SEO)",
    description:
      "Posicionamiento web y SEO local: auditoría, arreglo técnico del sitio, ficha de Google Business, contenido mensual e informe con datos propios. Sin garantía de posiciones.",
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: [
      { "@type": "Country", name: "Colombia" },
      { "@type": "City", name: "Cartagena" },
      { "@type": "City", name: "Barranquilla" },
      { "@type": "City", name: "Bogotá" },
    ],
    url: `${SITE_URL}/servicios/posicionamiento-seo`,
    offers: [
      {
        "@type": "Offer",
        name: "Auditoría SEO",
        description:
          "Diagnóstico de por qué un sitio no aparece cuando lo buscan, y en qué orden se arregla. Pago único, 5 días.",
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "COP",
          minPrice: 390000,
        },
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "SEO local mensual",
        description:
          "Trabajo continuo de posicionamiento en búsquedas con ciudad, con ficha de Google Business, contenido e informe mensual.",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          priceCurrency: "COP",
          minPrice: 650000,
          unitCode: "MON",
          unitText: "mes",
          billingDuration: 1,
        },
        availability: "https://schema.org/InStock",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header idioma="es" />
      <main>
        {/* ── Encabezado ─────────────────────────────────────────────── */}
        <section className="mx-auto max-w-4xl px-5 pb-8 pt-32 text-center md:px-8 md:pt-40">
          <Reveal>
            <Badge>Posicionamiento SEO</Badge>
            <h1 className="mt-6 font-display text-4xl leading-tight text-ink sm:text-5xl md:text-6xl">
              Posicionamiento SEO para que te encuentren{" "}
              <span className="block text-metal">sin pagar por cada clic</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl font-body text-lg leading-relaxed text-ink-soft">
              Tu cliente ya está buscando lo que vendes: escribe «funeraria en Cartagena»,
              mira los primeros que salen y llama a uno. Si no estás ahí, no es que no te
              quieran: es que no te ven. Posicionar es meterte en esa lista y quedarte.
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
                <a href="#precios">Ver precios</a>
              </Button>
            </div>
          </Reveal>
        </section>

        {/* ── Lo que nadie pone en la portada ─────────────────────────── */}
        <section className="banda mx-auto max-w-4xl px-5 py-12 md:px-8">
          <Reveal>
            <div className="rounded-[1.5rem] border border-primary/20 bg-gradient-to-br from-surface to-white/15 p-8 md:p-10">
              <h2 className="font-display text-3xl text-ink sm:text-4xl">
                No te voy a garantizar el primer puesto.
                <span className="text-metal"> Nadie puede.</span>
              </h2>
              <p className="mt-5 font-body text-lg leading-relaxed text-ink-soft">
                {SEO_HONESTY_NOTE}
              </p>
              <p className="mt-4 font-body text-lg leading-relaxed text-ink-soft">
                Va en la primera pantalla y no en la letra pequeña: el cliente que llega quemado
                del SEO llega por lo mismo, le prometieron una posición y le cobraron seis meses.
              </p>
              <p className="mt-4 font-body text-lg leading-relaxed text-ink-soft">
                <strong className="text-ink">Y no soy una agencia SEO.</strong> No hay ejecutivo
                de cuentas en la mitad: el que investiga, el que escribe y el que te contesta el
                WhatsApp somos la misma persona.
              </p>
            </div>
          </Reveal>
        </section>

        {/* ── El eje: SEO técnico ≠ posicionamiento ───────────────────── */}
        <section className="banda mx-auto max-w-6xl px-5 py-12 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Con las mismas tres letras te venden dos cosas distintas
            </h2>
            <p className="mt-4 max-w-2xl font-body text-lg leading-relaxed text-ink-soft">
              Casi toda pelea de precio de SEO es, en el fondo, una confusión de producto. Saber
              cuál de las dos estás comprando te ahorra la decepción del mes dos.
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
            <Reveal>
              <article className="h-full jv-card bg-surface/70 p-7">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-quiet text-accent-ink ring-1 ring-inset ring-accent-quiet-line">
                  <Wrench className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-body text-xl font-semibold text-ink">SEO técnico</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft">
                  Se hace una sola vez y se acaba. Va incluido cuando la página web la hago yo.
                </p>
                <ul className="mt-5 grid gap-2.5 jv-rule pt-5">
                  {SEO_DETALLE.tecnico.map((x) => (
                    <li key={x} className="flex items-start gap-3 font-body text-sm text-ink-soft">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>

            <Reveal delay={90}>
              <article className="h-full rounded-2xl border border-primary/25 bg-surface p-7 shadow-soft">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-quiet text-accent-ink ring-1 ring-inset ring-accent-quiet-line">
                  <LineChart className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-body text-xl font-semibold text-ink">Posicionamiento</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft">
                  Trabajo mensual y continuo. Es esto lo que se contrata en esta página.
                </p>
                <ul className="mt-5 grid gap-2.5 jv-rule pt-5">
                  {SEO_PLAN_DETALLE.local.map((x) => (
                    <li key={x} className="flex items-start gap-3 font-body text-sm text-ink-soft">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          </div>

          <Reveal>
            <p className="mt-6 max-w-3xl font-body leading-relaxed text-ink-soft">
              <strong className="text-ink">Dicho de una vez:</strong> el técnico es que Google
              pueda leerte; posicionar es ganarle terreno a quien también está trabajando.
              Venderlos con el mismo nombre es lo que hace creer que por una sola factura se
              queda uno primero.
            </p>
          </Reveal>
        </section>

        {/* ── Para quién es ──────────────────────────────────────────── */}
        <section className="banda mx-auto max-w-6xl px-5 py-12 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Esto te sirve si te pasa alguna de estas
            </h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
            {PARA_QUIEN.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.titulo} delay={i * 80}>
                  <article className="h-full jv-card bg-surface/70 p-7">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-line bg-background/60 text-primary-dark">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 font-body text-xl font-semibold text-ink">{p.titulo}</h3>
                    <p className="mt-2 font-body leading-relaxed text-ink-soft">{p.desc}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ── Qué se hace y cuánto cuesta ─────────────────────────────── */}
        <section id="precios" className="mx-auto max-w-6xl scroll-mt-28 px-5 py-12 md:px-8">
          <Reveal>
            <Badge>Precios</Badge>
            <h2 className="mt-6 font-display text-3xl text-ink sm:text-4xl">
              Qué se hace exactamente y cuánto cuesta
            </h2>
            <p className="mt-4 max-w-2xl font-body text-lg leading-relaxed text-ink-soft">
              Dos productos y dos trabajos de arranque. Puedes contratar solo el primero y
              quedarte ahí: la auditoría se paga una vez y no obliga a nada.
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
            <Reveal>
              <article className="flex h-full flex-col jv-card bg-surface/70 p-7">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-quiet text-accent-ink ring-1 ring-inset ring-accent-quiet-line">
                  <FileSearch className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-body text-xl font-semibold text-ink">Auditoría SEO</h3>
                <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-ink-soft">
                  El diagnóstico: por qué no apareces cuando te buscan, qué te está frenando y en
                  qué orden se arregla. Sale de tus datos —tu sitio rastreado, tu Search Console,
                  tu analítica—, no de un PDF exportado de una herramienta. Pago único.
                </p>
                <p className="mt-5 jv-rule pt-4 font-mono text-lg text-primary-dark">
                  desde {money(390000)}
                </p>
                <p className="mt-2 inline-flex items-center gap-2 font-body text-sm text-ink-soft">
                  <Clock className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />5 días
                </p>
              </article>
            </Reveal>

            <Reveal delay={90}>
              <article className="flex h-full flex-col rounded-2xl border border-primary/25 bg-surface p-7 shadow-soft">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-quiet text-accent-ink ring-1 ring-inset ring-accent-quiet-line">
                  <LineChart className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-body text-xl font-semibold text-ink">
                  Plan mensual de posicionamiento
                </h3>
                <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-ink-soft">
                  El trabajo continuo: una ciudad y un servicio principal a fondo, la ficha de
                  Google Business gestionada, 2 contenidos al mes, vigilancia de hasta 30
                  búsquedas e informe mensual. Sin permanencia.
                </p>
                <p className="mt-5 jv-rule pt-4 font-mono text-lg text-primary-dark">
                  desde {money(650000)} al mes
                </p>
                <p className="mt-2 inline-flex items-center gap-2 font-body text-sm text-ink-soft">
                  <Clock className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  trabajo continuo
                </p>
              </article>
            </Reveal>
          </div>


          <Reveal className="mt-10 block">
            <h3 className="font-display text-2xl text-ink sm:text-3xl">Cómo se arma tu número</h3>
            <p className="mt-3 max-w-2xl font-body leading-relaxed text-ink-soft">
              Lo que sube la mensualidad es el alcance, no una tabla de planes. Márcalo y mira la
              suma.
            </p>
            <SumadorSeo className="mt-6 max-w-2xl" />
          </Reveal>

          <Reveal>
            <div className="mt-6 grid gap-4 font-body leading-relaxed text-ink-soft">
              <p className="max-w-3xl">
                Los sectores caros —salud, legal, inmobiliario, seguros— pesan más, porque hay más
                gente peleando la misma búsqueda.
              </p>
              <p className="max-w-3xl">
                El resto de precios están publicados en{" "}
                <Link
                  href="/precios"
                  className="font-semibold text-primary-dark underline-offset-4 hover:underline"
                >
                  la página de precios
                </Link>
                . Y si lo que quieres es entender el mercado antes de comparar propuestas,{" "}
                <Link
                  href="/blog/cuanto-cuesta-el-seo-en-colombia"
                  className="font-semibold text-primary-dark underline-offset-4 hover:underline"
                >
                  cuánto cuesta el SEO en Colombia
                </Link>{" "}
                lo explica con los rangos de las agencias, los precios de las herramientas y las
                fuentes citadas.
              </p>
            </div>
          </Reveal>
        </section>

        {/* ── Qué incluye · qué no ───────────────────────────────────── */}
        <section className="banda mx-auto max-w-6xl px-5 py-12 md:px-8">
          <Reveal>
            <Comparador
              tituloComo="h2"
              tituloIncluye="Qué incluye"
              tituloNoIncluye={<>Qué <span className="text-metal">no</span> incluye</>}
              nota="Esta lista vale más que la de arriba. Es la que evita el problema del mes dos."
              incluye={INCLUYE}
              noIncluye={NO_INCLUYE}
            />
          </Reveal>
        </section>

        {/* ── Cómo se hace ───────────────────────────────────────────── */}
        <section className="mx-auto max-w-4xl px-5 py-12 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">Cómo se hace</h2>
          </Reveal>
          <ol className="mt-10 grid gap-6">
            {PROCESO.map((p, i) => (
              <Reveal key={p.n} as="li" index={i} className="flex gap-4">
                <span className="font-mono text-sm text-accent-ink">{p.n}</span>
                <span>
                  <strong className="block font-body font-semibold text-ink">{p.t}</strong>
                  <span className="mt-1 block font-body text-sm leading-relaxed text-ink-soft">
                    {p.d}
                  </span>
                </span>
              </Reveal>
            ))}
          </ol>
          <Reveal className="mt-12 block">
            <h3 className="font-display text-2xl text-ink sm:text-3xl">
              Y cuándo se ve algo, dicho antes de empezar
            </h3>
            <RailPlazo
              className="mt-8"
              previo={{
                etiqueta: "Mes 0",
                texto: "Auditoría y arreglo del sitio. Todavía no se está posicionando nada.",
              }}
              hitos={[
                {
                  etiqueta: "Mes 1 y 2",
                  texto: "Ficha, páginas y los primeros contenidos. Hay datos, todavía no posiciones.",
                },
                {
                  etiqueta: `Mes 3 a ${SEO_PRICES.mesesParaResultados}`,
                  texto: "Empiezan a moverse las primeras búsquedas. Es el tramo que hay que esperar.",
                },
                {
                  etiqueta: "Cada mes",
                  texto: "Contenido, ficha, ajustes e informe. Esto no se termina: se sostiene.",
                },
              ]}
            />
          </Reveal>
        </section>

        {/* ── SEO local, que es lo que de verdad se vende ─────────────── */}
        <section className="banda mx-auto max-w-6xl px-5 py-12 md:px-8">
          <Reveal>
            <Badge>SEO local</Badge>
            <h2 className="mt-6 max-w-3xl font-display text-3xl text-ink sm:text-4xl">
              Donde de verdad se gana: las búsquedas con ciudad
            </h2>
            <p className="mt-5 max-w-2xl font-body text-lg leading-relaxed text-ink-soft">
              Pelear «diseño web» a secas contra medio país es caro y lento. Pelear «lo que
              vendes + tu ciudad» es otra cosa: menos gente buscando, pero gente que compra hoy
              y cerca. Ahí es donde trabajo, desde Turbaco, Bolívar.
            </p>
          </Reveal>

          {/* Insumo → resultado. A 390 se apilan en ese orden, que además es
              el orden en que se cuenta. */}
          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start">
            <Reveal>
              <FichaGoogle />
            </Reveal>
            <Reveal delay={90}>
              <BloqueLocalGoogle consulta="funeraria en Cartagena" />
            </Reveal>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">
            <Reveal>
              <h3 className="font-display text-2xl text-ink sm:text-3xl">
                Y por ciudad, si es lo tuyo
              </h3>
              <p className="mt-3 font-body leading-relaxed text-ink-soft">
                Cada ciudad se trabaja aparte, con sus propias páginas y sus propias búsquedas.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                {CIUDADES.map((c) => (
                  <Link
                    key={c.href}
                    href={c.href}
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-primary/35 bg-surface/70 px-4 py-2 font-body text-sm font-semibold text-primary-dark transition-surface duration-quick ease-state hover:border-primary hover:bg-surface"
                  >
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                    {c.label}
                  </Link>
                ))}
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="jv-card p-7">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-quiet text-accent-ink ring-1 ring-inset ring-accent-quiet-line">
                  <Sparkles className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-body text-xl font-semibold text-ink">
                  Y lo que ya se está moviendo: que te nombre la IA
                </h3>
                <p className="mt-3 font-body leading-relaxed text-ink-soft">
                  Cada vez más gente pregunta en ChatGPT en vez de bajar a los diez resultados
                  azules, y la base es la misma de siempre: páginas legibles, datos estructurados
                  correctos e información verificable —precios, plazos, quién responde.
                </p>
                <p className="mt-4 font-body leading-relaxed text-ink-soft">
                  Lo que no te vendo es una garantía de que un modelo te mencione. Eso no lo
                  controla nadie.
                </p>
                <p className="mt-5 jv-rule pt-5 font-body text-sm leading-relaxed text-ink-soft">
                  Si tu negocio es{" "}
                  <Link
                    href="/sectores/clinicas-y-consultorios"
                    className="font-semibold text-primary-dark underline-offset-4 hover:underline"
                  >
                    una clínica o un consultorio
                  </Link>{" "}
                  o{" "}
                  <Link
                    href="/sectores/salones-y-spas"
                    className="font-semibold text-primary-dark underline-offset-4 hover:underline"
                  >
                    un salón o un spa
                  </Link>
                  , ahí está lo que cambia en cada caso.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── El trabajo que respalda esto ────────────────────────────── */}
        <section className="mx-auto max-w-4xl px-5 py-12 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Lo que puedes verificar hoy
            </h2>
            <div className="mt-8 grid gap-4 font-body leading-relaxed text-ink-soft">
              <p>
                <strong className="text-ink">Este mismo sitio.</strong> Ábrele el código: datos
                estructurados puestos, sitemap y canónicos, una sola página por intención de
                búsqueda y los precios publicados en vez de escondidos detrás de una llamada. Es
                el trabajo que te vendo, hecho sobre mí mismo.
              </p>
              <p>
                <strong className="text-ink">El artículo del mercado.</strong>{" "}
                <Link
                  href="/blog/cuanto-cuesta-el-seo-en-colombia"
                  className="font-semibold text-primary-dark underline-offset-4 hover:underline"
                >
                  ¿Cuánto cuesta el SEO en Colombia?
                </Link>{" "}
                lleva los rangos de las agencias, los precios de lista de las herramientas y la
                cuenta de la nómina, con fuente y fecha. Puedes comprobar cada dato.
              </p>
              <p>
                <strong className="text-ink">Las páginas que están en línea.</strong> Salieron con
                el SEO técnico incluido desde el primer día. Están{" "}
                <Link
                  href="/#trabajo"
                  className="font-semibold text-primary-dark underline-offset-4 hover:underline"
                >
                  en el portafolio
                </Link>
                , con su dominio, para que las abras y las midas tú.
              </p>
            </div>
          </Reveal>

          {/* Dato por comprobar, a la vista: no hay todavía un caso de
              posicionamiento mensual con seis meses cumplidos, y ese es
              justamente el dato que más pesa en esta página. No se inventa. */}
          <Reveal>
            <Pendiente>[PENDIENTE: caso real de posicionamiento mensual con al menos 6 meses cumplidos —
              negocio, ciudad, qué se hizo y qué muestran las impresiones y los clics de su
              Search Console. Hasta que exista, esta página no muestra resultados de clientes.]</Pendiente>
          </Reveal>
        </section>

        {/* ── Preguntas ──────────────────────────────────────────────── */}
        <section className="banda mx-auto max-w-4xl px-5 py-12 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Lo que siempre preguntan
            </h2>
          </Reveal>
          <Reveal delay={80} className="mt-10">
            <Faqs items={sinPendientes(FAQS)} />
          </Reveal>
        </section>

        {/* ── Cierre ─────────────────────────────────────────────────── */}
        <section className="mx-auto max-w-4xl px-5 py-16 text-center md:px-8 md:py-24">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Dime qué vendes y en qué ciudad
            </h2>
            <p className="mx-auto mt-5 max-w-xl font-body text-lg leading-relaxed text-ink-soft">
              Con eso miro tu sitio y las búsquedas de tu sector, y te digo si esto te sirve, por
              dónde empezaría y cuánto costaría. Si lo que necesitas no es SEO, te lo digo
              también: sale más barato para los dos.
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
              ¿Comparando propuestas? Está la cuenta en{" "}
              <Link
                href="/blog/cuanto-cuesta-el-seo-en-colombia"
                className="text-primary-dark underline underline-offset-4"
              >
                cuánto cuesta el SEO en Colombia
              </Link>
              . Y si además quieres que te contesten a cualquier hora, el{" "}
              <Link
                href="/servicios/chatbot-whatsapp"
                className="text-primary-dark underline underline-offset-4"
              >
                chatbot de WhatsApp
              </Link>
              .
            </p>
            <p className="mx-auto mt-5 max-w-xl font-body text-base leading-relaxed text-ink-soft">
              ¿Todavía no tienes sitio? Esto empieza en{" "}
              <Link
                href="/servicios/diseno-de-paginas-web"
                className="text-primary-dark underline underline-offset-4"
              >
                diseño de páginas web
              </Link>
              , que ya trae el SEO técnico. Y con el nombre de tu ciudad al lado, en{" "}
              <Link
                href="/diseno-de-paginas-web-en-cartagena"
                className="text-primary-dark underline underline-offset-4"
              >
                Cartagena
              </Link>
              ,{" "}
              <Link
                href="/diseno-de-paginas-web-en-barranquilla"
                className="text-primary-dark underline underline-offset-4"
              >
                Barranquilla
              </Link>{" "}
              y{" "}
              <Link
                href="/diseno-de-paginas-web-en-bogota"
                className="text-primary-dark underline underline-offset-4"
              >
                Bogotá
              </Link>
              .
            </p>
          </Reveal>
        </section>
      </main>
      <Footer idioma="es" />
      <WhatsAppButton />
    </>
  );
}

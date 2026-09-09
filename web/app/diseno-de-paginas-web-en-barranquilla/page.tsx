import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Clock,
  MapPin,
  PartyPopper,
  Scissors,
  UtensilsCrossed,
} from "lucide-react";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BotonCuentame } from "@/components/Cuentame";
import { Comparador } from "@/components/visuales/Comparador";
import { HiloWhatsApp } from "@/components/visuales/HiloWhatsApp";
import { CasillaVacia } from "@/components/visuales/CasillaVacia";
import { RailDistancia } from "@/components/visuales/RailDistancia";
import { SITE_URL } from "@/lib/site";

/**
 * Página de ciudad para la intención transaccional «diseño de páginas web en
 * Barranquilla».
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  POR QUÉ ESTA PÁGINA ES CORTA Y EMPIEZA CONFESANDO
 * ─────────────────────────────────────────────────────────────────────────
 * De Barranquilla solo hay UNA cosa propia en todo el repositorio: Peluquería
 * Marcopolo, y es un proyecto de estudio, no un encargo (así lo reclasifica
 * COPY-PRIMERA-PERSONA.md; en Portfolio.tsx va sin `url`). No hay cliente, no
 * hay cotización, no hay oficina.
 *
 * Con ese inventario hay dos caminos: rellenar con párrafos que servirían
 * igual para cualquier ciudad —que es la definición de doorway page y lo que
 * SEO-INTENCIONES-DE-COMPRA.md prohíbe en su sección 4— o escribir menos y
 * que todo lo que quede sea verdad y sea de Barranquilla. Está escogido el
 * segundo. Si mañana aparece un cliente barranquillero real, la página crece.
 *
 * Por eso el portafolio de esta página es una rejilla de dos: la captura real
 * de Marcopolo y una CASILLA VACÍA rotulada. El hueco dice lo mismo que decía
 * el párrafo que había ahí —«ninguno es de Barranquilla»— pero es imposible de
 * ignorar y es imposible de fingir.
 *
 * OJO CON UNA PREMISA FALSA QUE CIRCULA EN EL PROYECTO: «publicar precios es
 * el diferenciador porque ninguna agencia local lo hace». Eso es cierto en
 * Cartagena y NO lo es en Barranquilla — allá varias publican sus tarifas. Por
 * eso acá el precio se publica sin presumir de exclusividad: se dice «acá está
 * mi precio» y punto. Igual que manda la regla de no comparar tarifas con
 * nadie.
 *
 * Sin LocalBusiness en el JSON-LD, a propósito: no hay local en el Atlántico y
 * fingir una dirección es exactamente lo que Google castiga. El schema es un
 * Service con `areaServed` en Barranquilla y el `provider` apuntando a la
 * Organization, que sí declara su domicilio real en Turbaco.
 *
 * ESQUELETO COMPARTIDO con Cartagena y Bogotá: mismo orden de secciones y
 * mismo ritmo de bandas. Lo que cambia entre hermanas es el material.
 */
export const metadata: Metadata = {
  title: "Diseño de páginas web en Barranquilla | JV Agencia",
  description:
    "Diseño y programo páginas web para negocios de Barranquilla desde $850.000 y en 5 días. Trabajo desde Turbaco, Bolívar, y te lo digo antes de que preguntes.",
  alternates: { canonical: "/diseno-de-paginas-web-en-barranquilla" },
  openGraph: {
    title: "Diseño de páginas web en Barranquilla | JV Agencia",
    description:
      "Páginas web para negocios de Barranquilla desde $850.000 y en 5 días. Sin oficina allá, y lo digo de frente.",
    url: `${SITE_URL}/diseno-de-paginas-web-en-barranquilla`,
    type: "website",
  },
};

/**
 * Los seis únicos números de precio que se pueden publicar.
 *
 * `href` apunta a la página del servicio cuando existe. Esta página de ciudad
 * resume; el desarrollo completo —qué incluye, cómo se cobra, qué no entra—
 * vive en la página de servicio, y esa es la que tiene que recibir la señal.
 */
const PRECIOS: {
  servicio: string;
  desde: string;
  plazo: string;
  desc: string;
  href?: string;
}[] = [
  {
    servicio: "Página web",
    desde: "desde $850.000",
    plazo: "5 días",
    desc: "De una a varias páginas, con tus textos ordenados, tus fotos y un formulario que sí llega.",
    href: "/servicios/diseno-de-paginas-web",
  },
  {
    servicio: "Tienda online",
    desde: "desde $2.500.000",
    plazo: "3 semanas",
    desc: "Catálogo, carrito, cuentas de cliente, pagos en línea y cálculo de envío.",
    href: "/servicios/tiendas-virtuales",
  },
  {
    servicio: "Auditoría SEO",
    desde: "desde $390.000",
    plazo: "5 días",
    desc: "Qué te está frenando hoy y en qué orden arreglarlo. Sirva o no sirva que yo lo haga.",
    href: "/servicios/posicionamiento-seo",
  },
  {
    servicio: "SEO local mensual",
    desde: "desde $650.000/mes",
    plazo: "trabajo continuo",
    desc: "Aparecer cuando alguien de Barranquilla busca lo que vendes. Es trabajo, no un botón.",
    href: "/servicios/posicionamiento-seo",
  },
  {
    servicio: "Renovación anual",
    desde: "$290.000",
    plazo: "una vez al año",
    desc: "Dominio, alojamiento y que el sitio siga en pie el año siguiente. Se dice desde el primer día.",
  },
  {
    servicio: "Software a la medida",
    desde: "según alcance",
    plazo: "se estima contigo",
    desc: "Cuando no necesitas una página sino un sistema que te resuelva un proceso.",
    href: "/servicios/software-a-la-medida",
  },
];

const PARA_QUIEN = [
  {
    icon: Building2,
    titulo: "Inmobiliarias y arriendo",
    desc: "El sector con más empresas nuevas en 2025 en la jurisdicción de la Cámara. Un inventario no cabe en un carrusel: ficha por propiedad, filtro por barrio —El Prado, Riomar, Villa Country— y un formulario que diga quién preguntó por cuál.",
  },
  {
    icon: Scissors,
    titulo: "Salones, barberías y estética",
    desc: "El único rubro donde ya construí algo completo, y está más abajo. Acá la página resuelve la agenda: qué servicios hay, cuánto vale cada uno y cómo se pide el turno sin diez mensajes.",
  },
  {
    icon: UtensilsCrossed,
    titulo: "Restaurantes y hoteles",
    desc: "Tercer sector con más empresas creadas en 2025 en esa misma jurisdicción. El que entra busca siempre lo mismo: carta al día, horario, dónde queda y cómo reservar. No un PDF de 2022.",
  },
  {
    icon: PartyPopper,
    titulo: "Lo que vive del Carnaval",
    desc: "Trajes, maquillaje, palcos, transporte, catering. El negocio más barranquillero que hay y el que peor se prepara: la página se pide en octubre, no en enero. Construirla toma 5 días; que Google la lea, meses.",
  },
];

const INCLUYE = [
  "Diseño hecho para tu negocio, no una plantilla comprada con tu logo encima",
  "Pensada primero para el teléfono, que es de donde te entran casi todos",
  "Tus textos ordenados contigo, en el idioma en que hablan tus clientes",
  "Formulario y botón de WhatsApp que caen donde de verdad los revisas",
  "SEO técnico de base: títulos, descripciones, velocidad y datos estructurados",
  "Google Analytics y Search Console conectados",
  "Capacitación de entrega y 30 días de ajustes sin costo",
];

/**
 * Lo que NO entra, con QUIÉN lo hace entonces. Esa segunda columna es la que
 * evita la pelea: la mitad de los conflictos de un proyecto no son por lo que
 * se prometió, son por lo que cada uno dio por hecho.
 */
const NO_INCLUYE = [
  { texto: "El presupuesto de pauta en Meta o en Google Ads.", quien: "lo pones tú" },
  { texto: "El posicionamiento de todos los meses; el SEO técnico de entrega sí va.", quien: "se cotiza aparte" },
  { texto: "Carrito, inventario y pagos en línea: eso ya es una tienda virtual.", quien: "otro precio y otro plazo" },
  { texto: "La sesión de fotos y de video.", quien: "se cotiza aparte" },
  { texto: "El logo y la marca desde cero, si no tienes nada.", quien: "se cotiza aparte" },
  { texto: "El manejo de redes y el contenido de cada mes.", quien: "no es lo mío" },
  { texto: "Visitas presenciales cada semana en Barranquilla.", quien: "no vivo allá" },
];

const PROCESO = [
  {
    n: "01",
    t: "Una llamada de veinte minutos",
    d: "Sin formulario de doce páginas. Me cuentas qué vendes y a quién, y te digo de una si esto te sirve.",
  },
  {
    n: "02",
    t: "Te mando el alcance por escrito",
    d: "Qué entra, qué no entra, cuánto vale y qué día lo tienes. Antes de que pagues nada.",
  },
  {
    n: "03",
    t: "Construyo y te paso un enlace de prueba",
    d: "Lo abres desde tu teléfono, en la 53 o donde estés, y me dices qué se ve torcido mientras se puede cambiar.",
  },
  {
    n: "04",
    t: "Sale al aire y quedan 30 días de ajustes",
    d: "Y te enseño a editar lo que se edita solo, para que no me escribas por cambiar un horario.",
  },
];

/** Enlaces del cierre. Fila de destinos tocables, no prosa con subrayados. */
const OTRAS_PAGINAS = [
  { href: "/diseno-de-paginas-web-en-cartagena", label: "Diseño web en Cartagena" },
  { href: "/diseno-de-paginas-web-en-bogota", label: "Diseño web en Bogotá" },
  { href: "/sectores/salones-y-spas", label: "Salones y spas" },
  { href: "/sectores/clinicas-y-consultorios", label: "Clínicas y consultorios" },
  { href: "/servicios/chatbot-whatsapp", label: "Chatbot de WhatsApp" },
  { href: "/blog", label: "Artículos" },
];

const FAQS = [
  {
    q: "¿Tienes oficina en Barranquilla?",
    a: "No, y por eso está en el título de esta página. Vivo en Turbaco, Bolívar, y todo se hace por WhatsApp, correo y videollamada. Si necesitas a alguien que se te siente al frente cada semana, contrata a alguien de Barranquilla — te lo digo yo, que estoy tratando de venderte.",
  },
  {
    // [VERIFICAR] tiempo de viaje Turbaco → Barranquilla por la Vía al Mar.
    // No se publica un dato sin confirmar; la respuesta funciona sin el.
    q: "¿Y si necesito una reunión presencial?",
    a: "Si el proyecto lo justifica, se coordina el viaje y se acuerda antes cuántas visitas entran, para que no aparezca de sorpresa en la factura. Lo normal es que todo se resuelva por videollamada.",
  },
  {
    q: "¿Voy a salir de primero en Google buscando mi servicio en Barranquilla?",
    a: "No te lo puedo prometer, y desconfía del que te lo prometa. Lo que sí hago es entregarte el sitio técnicamente listo y, si contratas el trabajo mensual, empujar el posicionamiento local. Los primeros movimientos se ven entre el mes 3 y el 6.",
  },
  {
    q: "Quiero la página lista para el Carnaval. ¿Cuándo la pido?",
    a: "Construirla toma 5 días, así que en enero llegas. Pero si además quieres que te encuentren buscando, eso no son días sino meses: pídela en octubre o noviembre.",
  },
  {
    q: "Mi competencia en Barranquilla solo tiene Instagram. ¿De verdad necesito página?",
    a: "Depende de cómo te compran. Instagram te da alcance; la página te hace encontrable por quien ya te está buscando. Lo desarmé completo en un artículo, con los casos en que conviene NO hacerla todavía.",
  },
  {
    q: "Yo cierro todo por WhatsApp. ¿La página me sirve para algo?",
    a: "Sí, y las dos cosas se conectan. La página es lo que Google puede leer; WhatsApp es donde cierras. Acá arriba está la conversación de ejemplo.",
  },
  {
    q: "¿Cómo se paga si no estamos en la misma ciudad?",
    a: "Los anticipos, los hitos y el saldo van escritos en la propuesta antes de empezar, y ahí quedan las fechas. No hay nada que firmar en persona.",
  },
];

export default function BarranquillaPage() {
  // Service, no LocalBusiness: no hay sede en el Atlántico. El `provider`
  // apunta a la Organization del grafo del sitio, que sí declara Turbaco.
  // Sin FAQPage a propósito: desde 2023 Google lo restringió a gobierno y
  // salud, y acá no daría resultado enriquecido.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/diseno-de-paginas-web-en-barranquilla#servicio`,
    name: "Diseño de páginas web en Barranquilla",
    alternateName: [
      "Creación de páginas web en Barranquilla",
      "Diseño web Barranquilla",
      "Páginas web en Barranquilla",
    ],
    serviceType: "Diseño y desarrollo de páginas web",
    description:
      "Diseño y programación de páginas web y tiendas online para negocios de Barranquilla y el área metropolitana, con precio y plazo publicados. Trabajo remoto desde Turbaco, Bolívar.",
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: [
      {
        "@type": "City",
        name: "Barranquilla",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Barranquilla",
          addressRegion: "Atlántico",
          addressCountry: "CO",
        },
      },
      { "@type": "AdministrativeArea", name: "Área Metropolitana de Barranquilla" },
      { "@type": "AdministrativeArea", name: "Atlántico" },
      { "@type": "Country", name: "Colombia" },
    ],
    url: `${SITE_URL}/diseno-de-paginas-web-en-barranquilla`,
    offers: [
      {
        "@type": "Offer",
        name: "Página web",
        description: "Página web a la medida, lista en 5 días.",
        price: 850000,
        priceCurrency: "COP",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "Tienda online",
        description: "Tienda virtual con catálogo, carrito y pagos en línea.",
        price: 2500000,
        priceCurrency: "COP",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "Auditoría SEO",
        description: "Diagnóstico de posicionamiento con el orden en que hay que arreglarlo.",
        price: 390000,
        priceCurrency: "COP",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "SEO local mensual",
        description: "Trabajo mensual de posicionamiento local en Barranquilla.",
        price: 650000,
        priceCurrency: "COP",
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
      <Header />
      <main>
        {/* ── Encabezado · canvas ────────────────────────────────────── */}
        <section className="mx-auto max-w-4xl px-5 pb-8 pt-32 text-center md:px-8 md:pt-40">
          <Reveal>
            <Badge>
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              Barranquilla · Atlántico
            </Badge>
            <h1 className="mt-6 font-display text-4xl leading-tight text-ink sm:text-5xl md:text-6xl">
              Diseño de páginas web en Barranquilla,{" "}
              <span className="block text-metal">sin oficina en Barranquilla</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl font-body text-lg leading-relaxed text-ink-soft">
              Te lo digo antes de que preguntes: no tengo local en la 53 ni en Villa Country. Vivo
              en Turbaco, Bolívar, y tu proyecto lo trabajo a distancia.
            </p>
            <p className="mx-auto mt-4 max-w-2xl font-body text-lg leading-relaxed text-ink-soft">
              Lo que sí tengo: el precio publicado más abajo, cinco días de plazo y una sola persona
              contestándote — yo, que diseño y programo.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <BotonCuentame variant="primary">
                Cuéntame tu proyecto <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </BotonCuentame>
              <Button size="lg" variant="outline" asChild>
                <a href="#precios">Ver precios</a>
              </Button>
            </div>
          </Reveal>
        </section>

        {/* ── La confesión, arriba y no escondida · banda ────────────── */}
        <section className="banda mx-auto max-w-5xl px-5 py-12 md:px-8">
          <Reveal>
            <div className="rounded-[1.75rem] border border-primary/20 bg-gradient-to-br from-surface to-secondary/15 p-7 sm:p-9 md:p-10">
              <h2 className="font-display text-3xl text-ink sm:text-4xl">
                Búscale la dirección a cada uno.
                <span className="text-metal"> Yo te ahorro el minuto.</span>
              </h2>
              <p className="mt-5 font-body text-lg leading-relaxed text-ink-soft">
                Cuando compares proveedores, bájate al pie de cada sitio y mira dónde dice que
                quedan. <strong className="text-ink">El mío dice Turbaco, Bolívar</strong>, y lo
                puse también en el título de esta página. Mismo Caribe, costa de al lado, pero no el
                Atlántico.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <RailDistancia
              className="mt-10"
              paradas={[
                { lugar: "Turbaco, Bolívar", distancia: "0 km", nota: "Aquí vivo y aquí trabajo." },
                { lugar: "Cartagena", distancia: "≈ 20 km", nota: "Nos vemos si el proyecto lo pide." },
                { lugar: "Barranquilla", distancia: "≈ 120 km", nota: "El viaje se acuerda antes, no aparece en la factura." },
                { lugar: "Soledad, Malambo, Galapa, Puerto Colombia", distancia: "mismas condiciones", nota: "Desde acá da lo mismo, y esa es una ventaja tuya." },
              ]}
            />
          </Reveal>
        </section>

        {/* ── Para quién es · banda (mismo capítulo que la confesión) ── */}
        <section className="banda mx-auto max-w-6xl px-5 py-12 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Qué se está abriendo en Barranquilla ahora mismo
            </h2>
            <p className="mt-5 max-w-3xl font-body text-lg leading-relaxed text-ink-soft">
              La Cámara de Comercio de Barranquilla reportó que en 2025 los sectores con más
              empresas creadas fueron inmobiliarias (34,9%), servicios (24,6%) y hoteles y
              restaurantes (12,1%), con 11.391 unidades nuevas en los primeros nueve meses.
            </p>
            <p className="mt-3 max-w-3xl font-body text-sm leading-relaxed text-ink-soft">
              Dos precisiones, porque ese dato se cita mal muy seguido: son empresas{" "}
              <strong className="text-ink">nuevas</strong>, no el total que existe, y cubren{" "}
              <strong className="text-ink">la jurisdicción de la Cámara en el Atlántico</strong>,
              no solamente la ciudad.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {PARA_QUIEN.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.titulo} index={i}>
                  <article className="h-full rounded-2xl border border-line bg-surface p-6 sm:p-7">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-surface shadow-soft">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 font-display text-xl text-ink">{p.titulo}</h3>
                    <p className="mt-2 font-body leading-relaxed text-ink-soft">{p.desc}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ── Precios · CANVAS a propósito: son la respuesta ─────────── */}
        <section id="precios" className="mx-auto max-w-6xl scroll-mt-28 px-5 py-12 md:px-8">
          <Reveal>
            <Badge>Precios</Badge>
            <h2 className="mt-6 font-display text-3xl text-ink sm:text-4xl">
              Lo que cobro, escrito acá
            </h2>
            <p className="mt-4 max-w-2xl font-body text-lg leading-relaxed text-ink-soft">
              Precios de arranque: suben con lo que el proyecto pida, y eso te lo digo por escrito
              antes de empezar, no después.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {PRECIOS.map((p, i) => (
              <Reveal key={p.servicio} index={i}>
                <article className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6 sm:p-7">
                  <h3 className="font-display text-xl text-ink">{p.servicio}</h3>
                  <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-ink-soft">
                    {p.desc}
                  </p>
                  {p.href && (
                    <Link
                      href={p.href}
                      className="mt-3 inline-flex min-h-11 w-fit items-center gap-2 py-2.5 font-body text-sm font-semibold text-primary-dark underline-offset-4 hover:underline"
                    >
                      Ver el detalle
                      <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                    </Link>
                  )}
                  <p className="mt-4 border-t border-line pt-4 font-mono text-lg text-primary-dark">
                    {p.desde}
                  </p>
                  <p className="mt-1 inline-flex items-center gap-2 font-body text-sm text-ink-soft">
                    <Clock className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    {p.plazo}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="mt-6 max-w-3xl font-body text-sm leading-relaxed text-ink-soft">
              El desglose largo:{" "}
              <Link
                href="/blog/cuanto-cuesta-una-pagina-web-en-colombia"
                className="font-semibold text-primary-dark underline underline-offset-4"
              >
                cuánto cuesta una página web
              </Link>
              ,{" "}
              <Link
                href="/blog/cuanto-se-demora-hacer-una-pagina-web"
                className="font-semibold text-primary-dark underline underline-offset-4"
              >
                en qué se va el tiempo
              </Link>{" "}
              y{" "}
              <Link
                href="/blog/cuanto-cuesta-el-seo-en-colombia"
                className="font-semibold text-primary-dark underline underline-offset-4"
              >
                cuánto cuesta el SEO
              </Link>
              .
            </p>
          </Reveal>
        </section>

        {/* ── Qué entra y qué no · banda. Las dos listas enteras: son la
             columna vertebral de honestidad y no se recortan. La micro-
             etiqueta dice QUIÉN lo hace entonces. ────────────────────── */}
        <section className="banda mx-auto max-w-6xl px-5 py-12 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">Qué entra y qué no entra</h2>
          </Reveal>
          <Reveal>
            <Comparador
              className="mt-10"
              tituloIncluye="Entra por ese precio"
              tituloNoIncluye={
                <>
                  <span className="text-metal">No</span> entra
                </>
              }
              nota="Esta lista vale más que la otra. Los proyectos no se dañan por lo que se prometió: se dañan por lo que cada uno dio por hecho."
              incluye={INCLUYE}
              noIncluye={NO_INCLUYE}
            />
          </Reveal>
        </section>

        {/* ── Cómo trabajo desde acá + el chat · banda (mismo capítulo) ─ */}
        <section className="banda mx-auto max-w-6xl px-5 py-12 md:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <Reveal>
              <h2 className="font-display text-3xl text-ink sm:text-4xl">
                Cómo trabajo contigo desde acá
              </h2>
              <ol className="mt-8 grid gap-6">
                {PROCESO.map((p) => (
                  <li key={p.n} className="flex gap-4">
                    <span className="font-mono text-sm text-primary-dark">{p.n}</span>
                    <span>
                      <strong className="block font-body font-semibold text-ink">{p.t}</strong>
                      <span className="mt-1 block font-body text-sm leading-relaxed text-ink-soft">
                        {p.d}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={120}>
              <h2 className="font-display text-3xl text-ink sm:text-4xl">
                La página trae; WhatsApp cierra
              </h2>
              <p className="mt-4 font-body leading-relaxed text-ink-soft">
                Acá casi nadie cierra por correo: cierra por chat, y a las horas en que ya nadie
                está en el mostrador. Por eso también monto{" "}
                <Link
                  href="/servicios/chatbot-whatsapp"
                  className="font-semibold text-primary-dark underline underline-offset-4"
                >
                  chatbots de WhatsApp
                </Link>
                .
              </p>
              <HiloWhatsApp
                className="mt-8"
                negocio="Salón de ejemplo"
                iniciales="SE"
                mensajes={[
                  { de: "cliente", texto: "Buenas, ¿tienen turno mañana para color?", hora: "9:41 p.m." },
                  { de: "bot", escribiendo: true },
                  { de: "bot", texto: "Sí. Mañana quedan 10:30 a.m. y 3:00 p.m. ¿Cuál te sirve?", hora: "9:41 p.m." },
                  { de: "cliente", texto: "El de las 3", hora: "9:42 p.m." },
                  {
                    de: "bot",
                    traspaso: true,
                    texto: "Listo, quedó apartado. Mañana a primera hora te lo confirma alguien del salón.",
                    hora: "9:42 p.m.",
                  },
                ]}
              />
            </Reveal>
          </div>
        </section>

        {/* ── El único trabajo propio de Barranquilla · canvas.
             La casilla vacía dice lo que decía un párrafo entero. ────── */}
        <section className="mx-auto max-w-6xl px-5 py-12 md:px-8">
          <Reveal>
            <Badge>Trabajo propio de la ciudad</Badge>
            <h2 className="mt-6 font-display text-3xl text-ink sm:text-4xl">
              Peluquería Marcopolo, y no me la encargaron
            </h2>
            <p className="mt-5 max-w-3xl font-body text-lg leading-relaxed text-ink-soft">
              Es lo único que tengo de Barranquilla, así que no voy a estirarlo. Un salón con
              cuatro décadas de oficio que diseñé y construí{" "}
              <strong className="text-ink">por iniciativa propia</strong>. Todavía no está publicado
              con dominio propio: por eso hay captura y no enlace.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-2 md:items-stretch">
            <Reveal>
              <figure className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface">
                <Image
                  src="/work/marcopolo.webp"
                  alt="Captura de la página que construí para Peluquería Marcopolo, un salón de Barranquilla: portada con los servicios de corte y color."
                  width={1600}
                  height={1000}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="h-auto w-full border-b border-line"
                />
                <figcaption className="p-5 font-body text-sm leading-relaxed text-ink-soft sm:p-6">
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
                    Proyecto de estudio · Barranquilla
                  </span>
                  <span className="mt-2 block">
                    Corte de autor, color editorial y tratamientos. Si quieres verlo funcionando te
                    lo abro en la llamada compartiendo pantalla.
                  </span>
                </figcaption>
              </figure>
            </Reveal>

            <Reveal delay={80}>
              <CasillaVacia
                className="h-full bg-surface/50"
                rotulo="Sin cliente de Barranquilla"
              >
                Todavía no hay un proyecto entregado a un cliente barranquillero. Cuando lo haya, va
                aquí, con nombre y con enlace.
              </CasillaVacia>
            </Reveal>
          </div>

          <Reveal>
            <p className="mt-8 font-body leading-relaxed text-ink-soft">
              Lo que sí puedes abrir hoy son los proyectos en producción con dominio propio: están
              en{" "}
              <Link
                href="/#proyectos"
                className="font-semibold text-primary-dark underline underline-offset-4"
              >
                el portafolio de la portada
              </Link>
              .
            </p>
          </Reveal>
        </section>

        {/* ── Preguntas · banda ──────────────────────────────────────── */}
        <section className="banda mx-auto max-w-4xl px-5 py-12 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Lo que me preguntan desde Barranquilla
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4">
            {FAQS.map((f, i) => (
              <Reveal key={f.q} index={i}>
                <article className="rounded-2xl border border-line bg-surface p-6 sm:p-7">
                  <h3 className="font-display text-xl text-ink">{f.q}</h3>
                  <p className="mt-3 font-body leading-relaxed text-ink-soft">{f.a}</p>
                  {f.q.startsWith("Mi competencia") && (
                    <p className="mt-2 flex flex-wrap gap-x-4">
                      <Link
                        href="/blog/pagina-web-o-solo-instagram"
                        className="inline-flex min-h-11 items-center py-2.5 font-body text-sm font-semibold text-primary-dark underline underline-offset-4"
                      >
                        ¿Página web o solo Instagram?
                      </Link>
                      <Link
                        href="/blog/mi-negocio-necesita-pagina-web"
                        className="inline-flex min-h-11 items-center py-2.5 font-body text-sm font-semibold text-primary-dark underline underline-offset-4"
                      >
                        ¿Mi negocio necesita página web?
                      </Link>
                    </p>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Cierre · canvas ────────────────────────────────────────── */}
        <section className="mx-auto max-w-4xl px-5 py-16 text-center md:px-8 md:py-24">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Cuéntame qué vendes en Barranquilla
            </h2>
            <p className="mx-auto mt-5 max-w-xl font-body text-lg leading-relaxed text-ink-soft">
              Veinte minutos alcanzan para saber si esto te sirve, cuánto costaría y qué día lo
              tendrías. Si no te sirve, te lo digo y no te hago perder la tarde.
            </p>
            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" variant="primary" asChild>
                <Link href="/#contacto">
                  Agenda una llamada <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
              </Button>
              <BotonCuentame />
            </div>

            <nav aria-label="Otras páginas del sitio" className="mt-12">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
                También trabajo
              </p>
              <ul className="mt-4 flex flex-wrap justify-center gap-2">
                {OTRAS_PAGINAS.map((o) => (
                  <li key={o.href}>
                    <Link
                      href={o.href}
                      className="inline-flex min-h-11 items-center rounded-full border border-line bg-surface px-4 py-2.5 font-body text-sm text-ink-soft transition-colors hover:border-primary/40 hover:text-ink"
                    >
                      {o.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

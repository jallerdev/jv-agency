import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, PartyPopper, Scissors, UtensilsCrossed } from "lucide-react";

import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BarraMovil } from "@/components/BarraMovil";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/kit/PageHero";
import { SectionIndex } from "@/components/kit/SectionIndex";
import { PainGrid } from "@/components/kit/PainGrid";
import { FilaPrecio } from "@/components/kit/FilaPrecio";
import { ProofCard } from "@/components/kit/ProofCard";
import { FaqAccordion } from "@/components/kit/FaqAccordion";
import { FinalCTA, NextStep } from "@/components/kit/FinalCTA";
import { Comparador } from "@/components/visuales/Comparador";
import { BarrasDato } from "@/components/visuales/BarrasDato";
import { FranjaMeses } from "@/components/visuales/FranjaMeses";
import { HiloWhatsApp } from "@/components/visuales/HiloWhatsApp";
import { CasillaVacia } from "@/components/visuales/CasillaVacia";
import { RutaDesdeTurbaco } from "@/components/visuales/RutaDesdeTurbaco";
import { SITE_URL } from "@/lib/site";
import { catalogo, money, PLAZOS } from "@/lib/quote";

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
/* El número Y EL PLAZO salen del catálogo de `lib/quote.ts`. Estaban escritos
   a mano —«desde $850.000», «3 semanas»— con lo que esta página podía quedar
   cobrando distinto que /precios sin que nadie lo notara, y de hecho el plazo
   de la tienda ya no coincidía. Las descripciones son de Barranquilla y se
   quedan.

   FALTABA EL CHATBOT: la página tiene una sección entera de conversación de
   WhatsApp y no lo ofrecía en el cuadro de precios. */
const PRECIOS: {
  servicio: string;
  desde: string;
  plazo: string;
  desc: string;
  href?: string;
}[] = [
  {
    servicio: catalogo("landing").nombre.es,
    desde: `desde ${money(catalogo("landing").desde)}`,
    plazo: PLAZOS.landing.es,
    desc: "De una a varias páginas, con tus textos ordenados, tus fotos y un formulario que sí llega.",
    href: catalogo("landing").href.es,
  },
  {
    servicio: catalogo("tienda").nombre.es,
    desde: `desde ${money(catalogo("tienda").desde)}`,
    plazo: PLAZOS.tienda.es,
    desc: "Catálogo, carrito, cuentas de cliente, pagos en línea y cálculo de envío.",
    href: catalogo("tienda").href.es,
  },
  {
    servicio: catalogo("chatbot").nombre.es,
    desde: `desde ${money(catalogo("chatbot").desde)}`,
    plazo: PLAZOS.chatbot.es,
    desc: "Tu número contesta solo lo de siempre —horarios, precios, dónde quedas— y te pasa la conversación cuando vale la pena. Conectado directo a Meta, a nombre de tu negocio.",
    href: catalogo("chatbot").href.es,
  },
  {
    servicio: catalogo("auditoria").nombre.es,
    desde: `desde ${money(catalogo("auditoria").desde)}`,
    plazo: PLAZOS.auditoria.es,
    desc: "Qué te está frenando hoy y en qué orden arreglarlo. Sirva o no sirva que yo lo haga.",
    href: catalogo("auditoria").href.es,
  },
  {
    servicio: "SEO local mensual",
    desde: `desde ${money(catalogo("seoMes").desde)}/mes`,
    plazo: "trabajo continuo",
    desc: "Aparecer cuando alguien de Barranquilla busca lo que vendes. Es trabajo, no un botón.",
    href: catalogo("seoMes").href.es,
  },
  {
    servicio: catalogo("renovacion").nombre.es,
    desde: money(catalogo("renovacion").desde),
    plazo: "una vez al año",
    desc: "Dominio, alojamiento y que el sitio siga en pie el año siguiente. Se dice desde el primer día.",
  },
  {
    servicio: catalogo("software").nombre.es,
    desde: `desde ${money(catalogo("software").desde)}`,
    plazo: PLAZOS.software.es,
    desc: "Cuando no necesitas una página sino un sistema que te resuelva un proceso.",
    href: catalogo("software").href.es,
  },
];

/**
 * LOS TRES SECTORES CON MÁS EMPRESAS NUEVAS, para dibujarlos a escala.
 *
 * Estaban dentro de un párrafo —«inmobiliarias (34,9%), servicios (24,6%) y
 * hoteles y restaurantes (12,1%)»— y ahí no se comparan: «34,9» y «12,1» se
 * leen igual de largas. En barras, la primera es casi tres veces la tercera,
 * que es lo que el dato dice y lo que el párrafo no consigue decir.
 *
 * `pct` es el número para el ancho; `etiqueta`, cómo se escribe. No se derivan
 * el uno del otro porque la coma decimal de «34,9» no es un punto.
 */
const SECTORES = [
  { nombre: "Inmobiliarias", pct: 34.9, etiqueta: "34,9 %" },
  { nombre: "Servicios", pct: 24.6, etiqueta: "24,6 %" },
  { nombre: "Hoteles y restaurantes", pct: 12.1, etiqueta: "12,1 %" },
];

const INDICE = [
  { id: "confesion", texto: "Dónde estoy" },
  { id: "sectores", texto: "Qué se está abriendo" },
  { id: "carnaval", texto: "El calendario del Carnaval" },
  { id: "precios", texto: "Precios" },
  { id: "entra", texto: "Qué entra y qué no" },
  { id: "como", texto: "Cómo trabajo" },
  { id: "trabajo", texto: "El trabajo de acá" },
  { id: "preguntas", texto: "Preguntas" },
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
  { href: "/diseno-de-paginas-web-en-santa-marta", label: "Diseño web en Santa Marta" },
  { href: "/diseno-de-paginas-web-en-medellin", label: "Diseño web en Medellín" },
  { href: "/diseno-de-paginas-web-en-cali", label: "Diseño web en Cali" },
  { href: "/diseno-de-paginas-web-en-bucaramanga", label: "Diseño web en Bucaramanga" },
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
    q: "¿Y si necesito una reunión presencial?",
    a: "Se puede. Turbaco queda a unas dos horas de Barranquilla por la Vía al Mar, así que el viaje es de ida y vuelta en el día. Si el proyecto lo justifica se coordina, y antes de empezar acordamos cuántas visitas entran, para que no aparezca de sorpresa en la factura. Lo normal, eso sí, es que todo se resuelva por videollamada.",
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
        description: `Página web a la medida, lista en ${PLAZOS.landing.es}.`,
        price: catalogo("landing").desde,
        priceCurrency: "COP",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "Tienda virtual",
        description: "Tienda virtual con catálogo, carrito y pagos en línea.",
        price: catalogo("tienda").desde,
        priceCurrency: "COP",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "Chatbot de WhatsApp",
        description: "Automatización de WhatsApp conectada directo a Meta, a nombre del negocio.",
        price: catalogo("chatbot").desde,
        priceCurrency: "COP",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "Auditoría SEO",
        description: "Diagnóstico de posicionamiento con el orden en que hay que arreglarlo.",
        price: catalogo("auditoria").desde,
        priceCurrency: "COP",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "SEO local mensual",
        description: "Trabajo mensual de posicionamiento local en Barranquilla.",
        price: catalogo("seoMes").desde,
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
      <Header idioma="es" />
      <main id="contenido">
        <PageHero
          titular="compacto"
          variante="ciudad"
          idioma="es"
          migas={[{ texto: "Diseño de páginas web en Barranquilla" }]}
          eyebrow="Barranquilla · Atlántico"
          titulo={
            <>
              Diseño de páginas web en Barranquilla,{" "}
              <span className="block text-brand">sin oficina en Barranquilla</span>
            </>
          }
          entradilla="Te lo digo antes de que preguntes: no tengo local en la 53 ni en Villa Country. Vivo en Turbaco, Bolívar, y tu proyecto lo trabajo a distancia."
          precio="landing"
          indice={<SectionIndex entradas={INDICE} idioma="es" variante="chip" />}
          aparte={
            <RutaDesdeTurbaco
              destino="Barranquilla"
              distancia="≈ 120 km"
              nota="El viaje se acuerda antes, no aparece en la factura. Soledad, Malambo, Galapa y Puerto Colombia, mismas condiciones."
            />
          }
          acciones={
            <>
              {/* «Agenda una llamada» y no «Cuéntame tu proyecto»: era la única
                  página del sitio con otra acción principal en el hero, y una
                  marca que dice lo mismo en siete ciudades no puede pedir cosas
                  distintas en la octava. El botón de WhatsApp sigue abajo. */}
              <Button size="lg" variant="primary" asChild>
                <Link href="/agendar">
                  Agenda una llamada <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#precios">Ver precios</a>
              </Button>
            </>
          }
        />

        {/* ── La confesión, arriba y no escondida ────────────────────── */}
        <section id="confesion" className="border-b border-line bg-tint">
          <div className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-16">
              <Reveal>
                <div className="lg:sticky lg:top-28">
                  <h2 className="text-balance text-[length:var(--text-h2)]">
                    Búscale la dirección a cada uno.
                    <span className="text-brand"> Yo te ahorro el minuto.</span>
                  </h2>
                </div>
              </Reveal>

              <Reveal delay={80}>
                <p className="max-w-[62ch] text-[length:var(--text-lead)] leading-relaxed text-ink-soft">
                  Cuando compares proveedores, bájate al pie de cada sitio y mira dónde dice que
                  quedan. <strong className="text-ink">El mío dice Turbaco, Bolívar</strong>, y lo
                  puse también en el título de esta página. Mismo Caribe, costa de al lado, pero no
                  el Atlántico.
                </p>
                <p className="mt-6 max-w-[62ch] leading-relaxed text-ink-soft">
                  Lo que sí tengo: el precio publicado más abajo, cinco días de plazo y una sola
                  persona contestándote — yo, que diseño y programo.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Qué se está abriendo ───────────────────────────────────── */}
        <section
          id="sectores"
          className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24"
        >
          <Reveal>
            <h2 className="text-balance text-[length:var(--text-display)]">
              Qué se está abriendo en Barranquilla ahora mismo
            </h2>
            <p className="mt-4 max-w-[62ch] text-[length:var(--text-lead)] leading-relaxed text-ink-soft">
              La Cámara de Comercio de Barranquilla reportó que en 2025 los sectores con más
              empresas creadas fueron inmobiliarias (34,9%), servicios (24,6%) y hoteles y
              restaurantes (12,1%), con 11.391 unidades nuevas en los primeros nueve meses.
            </p>
          </Reveal>

          {/* LOS TRES PORCENTAJES, COMO BARRAS. Eran tres cifras dentro de
              un párrafo y ahí no se comparan: «34,9» y «12,1» se leen igual de
              largas. Dibujadas a escala, la primera es casi tres veces la
              tercera, y eso es lo que el dato dice. */}
          <BarrasDato
            className="mt-12"
            filas={SECTORES.map((x) => ({ nombre: x.nombre, valor: x.pct, etiqueta: x.etiqueta }))}
          />

          <Reveal>
            <p className="mt-6 max-w-[62ch] text-sm leading-relaxed text-ink-muted">
              Dos precisiones, porque ese dato se cita mal muy seguido: son empresas{" "}
              <strong className="text-ink">nuevas</strong>, no el total que existe, y cubren{" "}
              <strong className="text-ink">la jurisdicción de la Cámara en el Atlántico</strong>, no
              solamente la ciudad.
            </p>
          </Reveal>

          <PainGrid
            className="mt-14"
            dolores={PARA_QUIEN.map((p) => ({
              titulo: p.titulo,
              cuerpo: p.desc,
              icono: p.icon,
            }))}
          />
        </section>

        {/* ── Pieza firma: el calendario del Carnaval ────────────────── */}
        <section id="carnaval" className="border-y border-line bg-tint">
          <div className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-28">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,34rem)] lg:items-center lg:gap-16">
              <Reveal>
                <h2 className="text-balance text-[length:var(--text-display)]">
                  Si la quieres para el Carnaval, la cuenta empieza en octubre
                </h2>
                <p className="mt-4 max-w-[46ch] text-[length:var(--text-lead)] leading-relaxed text-ink-soft">
                  Construirla toma 5 días, así que en enero llegas. Pero si además quieres que te
                  encuentren buscando, eso no son días sino meses.
                </p>
              </Reveal>

              <Reveal delay={100}>
                <FranjaMeses
                  rotulo="El año, visto desde el Carnaval"
                  meses={[10, 11, 12, 1, 2]}
                  tramos={[
                    { desde: 10, hasta: 11, rotulo: "Pídela aquí", cuando: "octubre · noviembre" },
                    { desde: 12, hasta: 1, rotulo: "Se construye", cuando: "diciembre · enero" },
                    { desde: 2, hasta: 2, rotulo: "Carnaval", cuando: "febrero", meta: true },
                  ]}
                  nota="Los primeros movimientos de posicionamiento se ven entre el mes 3 y el 6. Nadie te puede prometer el primer puesto, ni yo tampoco."
                />
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Precios ────────────────────────────────────────────────── */}
        <section
          id="precios"
          className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24"
        >
          <Reveal>
            <p className="jv-eyebrow text-brand">Precios</p>
            <h2 className="mt-4 text-balance text-[length:var(--text-display)]">
              Lo que cobro, escrito acá
            </h2>
            <p className="mt-4 max-w-[62ch] leading-relaxed text-ink-soft">
              Precios de arranque: suben con lo que el proyecto pida, y eso te lo digo por escrito
              antes de empezar, no después.
            </p>
          </Reveal>

          <ul className="mt-12 flex flex-col divide-y divide-line border-y border-line">
            {PRECIOS.map((p, i) => (
              <FilaPrecio
                key={p.servicio}
                idioma="es"
                indice={i}
                nombre={p.servicio}
                descripcion={p.desc}
                plazo={p.plazo}
                monto={Number(p.desde.replace(/[^\d]/g, ""))}
                desde={p.desde.startsWith("desde")}
                unidad={p.desde.includes("/mes") ? "/mes" : undefined}
                href={p.href}
              />
            ))}
          </ul>

          <Reveal>
            <p className="mt-8 max-w-[62ch] text-sm leading-relaxed text-ink-soft">
              El desglose largo:{" "}
              <Link
                href="/blog/cuanto-cuesta-una-pagina-web-en-colombia"
                className="jv-enlace font-semibold text-brand"
              >
                cuánto cuesta una página web
              </Link>
              ,{" "}
              <Link
                href="/blog/cuanto-se-demora-hacer-una-pagina-web"
                className="jv-enlace font-semibold text-brand"
              >
                en qué se va el tiempo
              </Link>{" "}
              y{" "}
              <Link
                href="/blog/cuanto-cuesta-el-seo-en-colombia"
                className="jv-enlace font-semibold text-brand"
              >
                cuánto cuesta el SEO
              </Link>
              .
            </p>
          </Reveal>
        </section>

        {/* ── Qué entra y qué no. Las dos listas enteras: son la columna
             vertebral de honestidad y no se recortan. ─────────────────── */}
        <section
          id="entra"
          className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24"
        >
          <Reveal>
            <h2 className="text-balance text-[length:var(--text-display)]">
              Qué entra y qué no entra
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <Comparador
              className="mt-12"
              tituloIncluye="Entra por ese precio"
              tituloNoIncluye={
                <>
                  <span className="text-brand">No</span> entra
                </>
              }
              nota="Esta lista vale más que la otra. Los proyectos no se dañan por lo que se prometió: se dañan por lo que cada uno dio por hecho."
              incluye={INCLUYE}
              noIncluye={NO_INCLUYE}
            />
          </Reveal>
        </section>

        {/* ── Cómo trabajo desde acá + el chat ───────────────────────── */}
        <section id="como" className="border-y border-line bg-tint">
          <div className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
              <Reveal>
                <h2 className="text-balance text-[length:var(--text-h2)]">
                  Cómo trabajo contigo desde acá
                </h2>
                <ol className="mt-8 flex flex-col divide-y divide-line border-y border-line">
                  {PROCESO.map((p) => (
                    <li key={p.n} className="flex gap-5 py-5">
                      <span className="font-mono text-sm tabular-nums text-brand">{p.n}</span>
                      <span className="min-w-0">
                        <strong className="block font-semibold text-ink">{p.t}</strong>
                        <span className="mt-1.5 block text-sm leading-relaxed text-ink-soft">
                          {p.d}
                        </span>
                      </span>
                    </li>
                  ))}
                </ol>
              </Reveal>

              <Reveal delay={120}>
                <h2 className="text-balance text-[length:var(--text-h2)]">
                  La página trae; WhatsApp cierra
                </h2>
                <p className="mt-4 max-w-[52ch] leading-relaxed text-ink-soft">
                  Acá casi nadie cierra por correo: cierra por chat, y a las horas en que ya nadie
                  está en el mostrador. Por eso también monto{" "}
                  <Link
                    href="/servicios/chatbot-whatsapp"
                    className="jv-enlace font-semibold text-brand"
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
                    {
                      de: "cliente",
                      texto: "Buenas, ¿tienen turno mañana para color?",
                      hora: "9:41 p.m.",
                    },
                    { de: "bot", escribiendo: true },
                    {
                      de: "bot",
                      texto: "Sí. Mañana quedan 10:30 a.m. y 3:00 p.m. ¿Cuál te sirve?",
                      hora: "9:41 p.m.",
                    },
                    { de: "cliente", texto: "El de las 3", hora: "9:42 p.m." },
                    {
                      de: "bot",
                      traspaso: true,
                      texto:
                        "Listo, quedó apartado. Mañana a primera hora te lo confirma alguien del salón.",
                      hora: "9:42 p.m.",
                    },
                  ]}
                />
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── El único trabajo propio de Barranquilla ────────────────── */}
        <section
          id="trabajo"
          className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24"
        >
          <Reveal>
            <p className="jv-eyebrow text-brand">Trabajo propio de la ciudad</p>
            <h2 className="mt-4 text-balance text-[length:var(--text-display)]">
              Peluquería Marcopolo, y no me la encargaron
            </h2>
            <p className="mt-4 max-w-[62ch] leading-relaxed text-ink-soft">
              Es lo único que tengo de Barranquilla, así que no voy a estirarlo. Un salón con cuatro
              décadas de oficio que diseñé y construí{" "}
              <strong className="text-ink">por iniciativa propia</strong>. Todavía no está publicado
              con dominio propio: por eso hay captura y no enlace.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 md:items-stretch">
            <Reveal className="h-full">
              <ProofCard
                idioma="es"
                nombre="Peluquería Marcopolo"
                categoria="Proyecto de estudio · Barranquilla"
                cuerpo="Corte de autor, color editorial y tratamientos. Si quieres verlo funcionando te lo abro en la llamada compartiendo pantalla."
                estado="estudio"
              >
                <Image
                  src="/work/marcopolo.webp"
                  alt="Captura de la página que construí para Peluquería Marcopolo, un salón de Barranquilla: portada con los servicios de corte y color."
                  width={1600}
                  height={1000}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="h-auto w-full"
                />
              </ProofCard>
            </Reveal>

            <Reveal delay={80} className="h-full">
              <CasillaVacia className="h-full" rotulo="Sin cliente de Barranquilla">
                Todavía no hay un proyecto entregado a un cliente barranquillero. Cuando lo haya, va
                aquí, con nombre y con enlace.
              </CasillaVacia>
            </Reveal>
          </div>

          <Reveal>
            <p className="mt-8 max-w-[62ch] leading-relaxed text-ink-soft">
              Lo que sí puedes abrir hoy son los proyectos en producción con dominio propio: están
              en{" "}
              <Link href="/#portafolio" className="jv-enlace font-semibold text-brand">
                el portafolio de la portada
              </Link>
              .
            </p>
          </Reveal>
        </section>

        {/* ── Preguntas ──────────────────────────────────────────────── */}
        <section
          id="preguntas"
          className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24"
        >
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <h2 className="text-balance text-[length:var(--text-h2)]">
                  Lo que me preguntan desde Barranquilla
                </h2>
              </div>
            </Reveal>

            <FaqAccordion
              grupos={[
                {
                  titulo: "Lo que me preguntan desde Barranquilla",
                  items: FAQS.map((f) => ({ q: f.q, a: f.a })),
                },
              ]}
            />
          </div>
        </section>

        {/* ── También trabajo ────────────────────────────────────────── */}
        <section className="mx-auto max-w-[1280px] px-6 pb-20 md:px-12 md:pb-24">
          <Reveal>
            <nav aria-label="Otras páginas del sitio">
              <h2 className="jv-eyebrow text-ink-muted">También trabajo</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {OTRAS_PAGINAS.map((o) => (
                  <li key={o.href}>
                    <Link
                      href={o.href}
                      className="jv-chip jv-chip-off min-h-11 text-sm hover:border-brand hover:text-brand"
                    >
                      {o.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>
        </section>

        <FinalCTA
          idioma="es"
          titulo="Cuéntame qué vendes en Barranquilla"
          cuerpo="Veinte minutos alcanzan para saber si esto te sirve, cuánto costaría y qué día lo tendrías. Si no te sirve, te lo digo y no te hago perder la tarde."
          siguiente={<NextStep id="chatbot" idioma="es" />}
        />
      </main>
      <Footer idioma="es" />
      <WhatsAppButton />
      <BarraMovil idioma="es" />
    </>
  );
}

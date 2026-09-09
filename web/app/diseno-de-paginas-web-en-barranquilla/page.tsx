import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Check,
  Clock,
  MapPin,
  MessageCircle,
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
import { SITE_URL } from "@/lib/site";
import { WHATSAPP_LINK } from "@/lib/business";

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

/** Los seis únicos números de precio que se pueden publicar. */
const PRECIOS = [
  {
    servicio: "Página web",
    desde: "desde $850.000",
    plazo: "5 días",
    desc: "De una a varias páginas, con tus textos ordenados, tus fotos y un formulario que sí llega.",
  },
  {
    servicio: "Tienda online",
    desde: "desde $2.500.000",
    plazo: "3 semanas",
    desc: "Catálogo, carrito, cuentas de cliente, pagos en línea y cálculo de envío.",
  },
  {
    servicio: "Auditoría SEO",
    desde: "desde $390.000",
    plazo: "5 días",
    desc: "Qué te está frenando hoy y en qué orden arreglarlo. Sirva o no sirva que yo lo haga.",
  },
  {
    servicio: "SEO local mensual",
    desde: "desde $450.000/mes",
    plazo: "trabajo continuo",
    desc: "Aparecer cuando alguien de Barranquilla busca lo que vendes. Es mensual porque es trabajo, no un botón.",
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
    desc: "Cuando lo que necesitas no es una página sino un sistema que te resuelva un proceso.",
  },
];

const PARA_QUIEN = [
  {
    icon: Building2,
    titulo: "Inmobiliarias y arriendo",
    desc: "Es el sector donde más empresas nuevas se registraron en 2025 en la jurisdicción de la Cámara de Comercio. Un inventario de inmuebles no cabe en un carrusel: necesita ficha por propiedad, filtro por barrio —El Prado, Riomar, Villa Country, Alto Prado— y un formulario que te diga quién preguntó por cuál.",
  },
  {
    icon: Scissors,
    titulo: "Salones, barberías y estética",
    desc: "Es el único rubro de Barranquilla donde ya construí algo completo, y está más abajo. Lo que resuelve una página acá es la agenda: qué servicios hay, cuánto vale cada uno y cómo se pide el turno sin diez mensajes de ida y vuelta.",
  },
  {
    icon: UtensilsCrossed,
    titulo: "Restaurantes y hoteles",
    desc: "Hoteles y restaurantes fueron el tercer sector con más empresas creadas en 2025 en esa misma jurisdicción. Lo que busca el que entra es siempre lo mismo: carta al día, horario, dónde queda y cómo reservar. No un PDF de 2022 que hay que descargar.",
  },
  {
    icon: PartyPopper,
    titulo: "Lo que vive del Carnaval",
    desc: "Alquiler de trajes, maquillaje, palcos, transporte, catering, alojamiento. Es el negocio más barranquillero que hay y el que peor se prepara: la página se pide en octubre, no en enero, porque construirla toma 5 días pero que Google la lea toma meses.",
  },
];

const INCLUYE = [
  "Diseño hecho para tu negocio, no una plantilla comprada con tu logo encima",
  "Pensada primero para el teléfono, que es desde donde te van a entrar casi todos",
  "Tus textos ordenados contigo, en el idioma en que hablan tus clientes",
  "Formulario y botón de WhatsApp que caen donde de verdad los revisas",
  "SEO técnico de base: títulos, descripciones, velocidad y datos estructurados",
  "Google Analytics y Search Console conectados, para saber quién entró y buscando qué",
  "Capacitación de entrega y 30 días de ajustes sin costo",
];

const PROCESO = [
  {
    n: "01",
    t: "Una llamada de veinte minutos",
    d: "Sin formulario de doce páginas. Me cuentas qué vendes y a quién, y te digo de una si esto te sirve o no.",
  },
  {
    n: "02",
    t: "Te mando el alcance por escrito",
    d: "Qué entra, qué no entra, cuánto vale y qué día lo tienes. Antes de que pagues nada.",
  },
  {
    n: "03",
    t: "Construyo y te paso un enlace de prueba",
    d: "Lo abres desde tu teléfono, en la 53 o donde estés, y me dices qué se ve torcido mientras todavía se puede cambiar.",
  },
  {
    n: "04",
    t: "Sale al aire y quedan 30 días de ajustes",
    d: "Y te enseño a editar lo que se edita solo, para que no tengas que escribirme por cambiar un horario.",
  },
];

const FAQS = [
  {
    q: "¿Tienes oficina en Barranquilla?",
    a: "No, y por eso está en el título de esta página. Vivo en Turbaco, Bolívar. Todo el trabajo se hace a distancia, por WhatsApp, correo y videollamada. Si lo que necesitas es alguien que se te siente al frente cada semana, contrata a alguien de Barranquilla — te lo digo yo, que estoy tratando de venderte.",
  },
  {
    q: "¿Y si necesito una reunión presencial?",
    a: "Si el proyecto lo justifica, se coordina el viaje y se acuerda antes cuántas visitas entran, para que no aparezca como sorpresa en la factura. [VERIFICAR: tiempo de viaje Turbaco → Barranquilla por la Vía al Mar]. Lo normal, igual, es que todo se resuelva por videollamada.",
  },
  {
    q: "¿Voy a salir de primero en Google buscando mi servicio en Barranquilla?",
    a: "No te lo puedo prometer, y desconfía del que te lo prometa. Lo que sí hago es entregarte el sitio técnicamente listo y, si contratas el trabajo mensual, empujar el posicionamiento local. Los primeros movimientos se ven entre el mes 3 y el 6.",
  },
  {
    q: "Quiero la página lista para el Carnaval. ¿Cuándo la pido?",
    a: "Construirla toma 5 días, así que en enero llegas. Pero si además quieres que te encuentren buscando, eso no son días sino meses: pídela en octubre o noviembre y llegas con el sitio ya leído por Google.",
  },
  {
    q: "Mi competencia en Barranquilla solo tiene Instagram. ¿De verdad necesito página?",
    a: "Depende de cómo te compran. Instagram te da alcance; la página te hace encontrable por quien ya te está buscando con la intención de comprar. Lo desarmé completo en un artículo, con los casos en los que conviene NO hacerla todavía.",
  },
  {
    q: "Yo cierro todo por WhatsApp. ¿La página me sirve para algo?",
    a: "Sí, y las dos cosas se conectan. La página es lo que Google puede leer; WhatsApp es donde cierras. Un chatbot recoge lo que la página te manda a las nueve de la noche y los domingos, que es cuando el que escribe y no recibe respuesta le escribe al de al lado.",
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
        price: 450000,
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
        {/* ── Encabezado ─────────────────────────────────────────────── */}
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
              en Turbaco, Bolívar, y tu proyecto lo trabajo a distancia. Lo que sí tengo es el
              precio publicado más abajo, cinco días de plazo y una sola persona contestándote —
              yo, que soy el mismo que diseña y el mismo que programa.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" variant="primary" asChild>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                  Escríbeme por WhatsApp <ArrowRight className="h-5 w-5" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#precios">Ver precios</a>
              </Button>
            </div>
          </Reveal>
        </section>

        {/* ── La confesión, arriba y no escondida ────────────────────── */}
        <section className="mx-auto max-w-4xl px-5 py-12 md:px-8">
          <Reveal>
            <div className="rounded-[1.75rem] border border-primary/20 bg-gradient-to-br from-surface to-secondary/15 p-8 md:p-10">
              <h2 className="font-display text-3xl text-ink sm:text-4xl">
                Búscale la dirección a cada uno.
                <span className="text-metal"> Yo te ahorro el minuto.</span>
              </h2>
              <p className="mt-5 font-body text-lg leading-relaxed text-ink-soft">
                Cuando compares proveedores para tu página, bájate hasta el pie de cada sitio y
                mira dónde dice que quedan. Es un minuto por página y te va a decir bastante.
              </p>
              <p className="mt-4 font-body text-lg leading-relaxed text-ink-soft">
                <strong className="text-ink">
                  El mío dice Turbaco, Bolívar, y lo puse también en el título de esta página.
                </strong>{" "}
                Estoy en el mismo Caribe, en la costa de al lado, pero no en el Atlántico. Si lo
                que necesitas es alguien que pase por tu oficina el martes, no soy yo y prefiero
                que lo sepas ahora y no en la tercera reunión.
              </p>
            </div>
          </Reveal>
        </section>

        {/* ── Para quién es ──────────────────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-5 py-12 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Qué se está abriendo en Barranquilla ahora mismo
            </h2>
            <p className="mt-5 max-w-3xl font-body text-lg leading-relaxed text-ink-soft">
              La Cámara de Comercio de Barranquilla reportó que los sectores donde más empresas se
              crearon en 2025 fueron actividades inmobiliarias (34,9%), servicios (24,6%) y
              hoteles y restaurantes (12,1%), con 11.391 unidades productivas nuevas en los
              primeros nueve meses del año.
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
                <Reveal key={p.titulo} delay={i * 80}>
                  <article className="h-full rounded-2xl border border-line bg-surface/70 p-7">
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

          <Reveal>
            <p className="mt-6 font-body leading-relaxed text-ink-soft">
              Y el área metropolitana cuenta igual: Soledad, Malambo, Galapa y Puerto Colombia se
              atienden en las mismas condiciones que la ciudad. Desde donde yo trabajo da lo mismo,
              y esa es una ventaja tuya, no mía.
            </p>
          </Reveal>
        </section>

        {/* ── Precios ────────────────────────────────────────────────── */}
        <section id="precios" className="mx-auto max-w-6xl scroll-mt-28 px-5 py-12 md:px-8">
          <Reveal>
            <Badge>Precios</Badge>
            <h2 className="mt-6 font-display text-3xl text-ink sm:text-4xl">
              Lo que cobro, escrito acá
            </h2>
            <p className="mt-4 max-w-2xl font-body text-lg leading-relaxed text-ink-soft">
              No hace falta que pidas una cotización para saber si te alcanza. Estos son precios
              de arranque: suben con lo que el proyecto pida, y eso te lo digo por escrito antes
              de empezar, no después.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {PRECIOS.map((p, i) => (
              <Reveal key={p.servicio} delay={i * 70}>
                <article className="flex h-full flex-col rounded-2xl border border-line bg-surface/70 p-7">
                  <h3 className="font-display text-xl text-ink">{p.servicio}</h3>
                  <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-ink-soft">
                    {p.desc}
                  </p>
                  <p className="mt-5 border-t border-line pt-4 font-mono text-lg text-primary-dark">
                    {p.desde}
                  </p>
                  <p className="mt-1 inline-flex items-center gap-2 font-body text-sm text-ink-soft">
                    <Clock className="h-4 w-4 text-accent" aria-hidden="true" />
                    {p.plazo}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="mt-6 font-body leading-relaxed text-ink-soft">
              Si quieres el desglose completo de en qué se va la plata de una página web en
              Colombia, lo escribí acá:{" "}
              <Link
                href="/blog/cuanto-cuesta-una-pagina-web-en-colombia"
                className="text-primary-dark underline underline-offset-4 hover:text-accent"
              >
                ¿Cuánto cuesta una página web en Colombia?
              </Link>{" "}
              Y si lo que te preocupa es el plazo,{" "}
              <Link
                href="/blog/cuanto-se-demora-hacer-una-pagina-web"
                className="text-primary-dark underline underline-offset-4 hover:text-accent"
              >
                acá está en qué se va el tiempo de verdad
              </Link>
              . El trabajo mensual de posicionamiento se cotiza aparte y tiene su propio artículo:{" "}
              <Link
                href="/blog/cuanto-cuesta-el-seo-en-colombia"
                className="text-primary-dark underline underline-offset-4 hover:text-accent"
              >
                cuánto cuesta el SEO en Colombia
              </Link>
              .
            </p>
          </Reveal>
        </section>

        {/* ── Qué incluye · cómo se hace ─────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-5 py-12 md:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <Reveal>
              <h2 className="font-display text-3xl text-ink sm:text-4xl">Qué incluye</h2>
              <ul className="mt-8 grid gap-3">
                {INCLUYE.map((x) => (
                  <li key={x} className="flex items-start gap-3 font-body text-ink-soft">
                    <Check className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={120}>
              <h2 className="font-display text-3xl text-ink sm:text-4xl">
                Cómo trabajo contigo desde acá
              </h2>
              <ol className="mt-8 grid gap-6">
                {PROCESO.map((p) => (
                  <li key={p.n} className="flex gap-4">
                    <span className="font-mono text-sm text-accent">{p.n}</span>
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
          </div>
        </section>

        {/* ── El único trabajo propio de Barranquilla ────────────────── */}
        <section className="mx-auto max-w-4xl px-5 py-12 md:px-8">
          <Reveal>
            <Badge>Trabajo propio de la ciudad</Badge>
            <h2 className="mt-6 font-display text-3xl text-ink sm:text-4xl">
              Peluquería Marcopolo, y no me la encargaron
            </h2>
            <p className="mt-5 font-body text-lg leading-relaxed text-ink-soft">
              Es lo único que tengo de Barranquilla, así que no voy a estirarlo. Es un salón de la
              ciudad con cuatro décadas de oficio: corte de autor, color editorial y tratamientos.
              Diseñé y construí el sitio completo <strong className="text-ink">por iniciativa
              propia</strong>, porque quería resolver el problema de un salón que lleva cuarenta
              años y cuya reputación vive en el boca a boca del barrio y en ninguna otra parte.
            </p>
            <p className="mt-4 font-body text-lg leading-relaxed text-ink-soft">
              No te lo vendo como caso de cliente, porque no lo es. Y no te paso un enlace, porque
              todavía no está publicado con dominio propio: está en{" "}
              <Link
                href="/#proyectos"
                className="text-primary-dark underline underline-offset-4 hover:text-accent"
              >
                la rejilla de proyectos de la portada
              </Link>{" "}
              con su captura, y si quieres verlo funcionando te lo abro en la llamada compartiendo
              pantalla.
            </p>
            <p className="mt-4 font-body leading-relaxed text-ink-soft">
              Lo que sí puedes abrir y comprobar hoy son los proyectos que están en producción con
              su propio dominio. Ninguno es de Barranquilla y por eso no los pongo acá como si lo
              fueran: están en la portada, con el enlace de cada uno.
            </p>
          </Reveal>
        </section>

        {/* ── WhatsApp, que es donde de verdad se cierra ─────────────── */}
        <section className="mx-auto max-w-4xl px-5 py-12 md:px-8">
          <Reveal>
            <div className="rounded-2xl border border-line bg-background/40 p-7 md:p-9">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-surface shadow-soft">
                <MessageCircle className="h-6 w-6" aria-hidden="true" />
              </span>
              <h2 className="mt-5 font-display text-2xl text-ink sm:text-3xl">
                La página trae; WhatsApp cierra
              </h2>
              <p className="mt-4 font-body leading-relaxed text-ink-soft">
                Casi ningún negocio de la costa cierra por correo. Cierra por chat, y a las horas
                en que ya nadie está en el mostrador. La página es lo que Google puede leer y lo
                que te encuentra el que ya decidió comprar; el chat es donde se termina. Por eso
                las dos cosas se conectan y por eso vendo también{" "}
                <Link
                  href="/servicios/chatbot-whatsapp"
                  className="text-primary-dark underline underline-offset-4 hover:text-accent"
                >
                  chatbots de WhatsApp
                </Link>
                : para que el que te escribe un domingo reciba respuesta antes de escribirle al de
                al lado.
              </p>
            </div>
          </Reveal>
        </section>

        {/* ── Preguntas ──────────────────────────────────────────────── */}
        <section className="mx-auto max-w-4xl px-5 py-12 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Lo que me preguntan desde Barranquilla
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4">
            {FAQS.map((f, i) => (
              <Reveal key={f.q} delay={i * 60}>
                <article className="rounded-2xl border border-line bg-surface/70 p-7">
                  <h3 className="font-display text-xl text-ink">{f.q}</h3>
                  <p className="mt-3 font-body leading-relaxed text-ink-soft">{f.a}</p>
                  {f.q.startsWith("Mi competencia") && (
                    <p className="mt-3 font-body leading-relaxed">
                      <Link
                        href="/blog/pagina-web-o-solo-instagram"
                        className="text-primary-dark underline underline-offset-4 hover:text-accent"
                      >
                        ¿Página web o solo Instagram para tu negocio?
                      </Link>{" "}
                      ·{" "}
                      <Link
                        href="/blog/mi-negocio-necesita-pagina-web"
                        className="text-primary-dark underline underline-offset-4 hover:text-accent"
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

        {/* ── Cierre ─────────────────────────────────────────────────── */}
        <section className="mx-auto max-w-4xl px-5 py-16 text-center md:px-8 md:py-24">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Cuéntame qué vendes en Barranquilla
            </h2>
            <p className="mx-auto mt-5 max-w-xl font-body text-lg leading-relaxed text-ink-soft">
              Veinte minutos alcanzan para saber si esto te sirve, cuánto te costaría y qué día lo
              tendrías. Si no te sirve, te lo digo y no te hago perder el resto de la tarde.
            </p>
            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" variant="primary" asChild>
                <Link href="/#contacto">
                  Agenda una llamada <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                  Escríbeme por WhatsApp
                </a>
              </Button>
            </div>
            <p className="mt-8 font-body text-sm text-ink-soft">
              <Link href="/" className="underline underline-offset-4 hover:text-ink">
                Volver a la portada
              </Link>{" "}
              ·{" "}
              <Link
                href="/servicios/chatbot-whatsapp"
                className="underline underline-offset-4 hover:text-ink"
              >
                Chatbot de WhatsApp
              </Link>{" "}
              ·{" "}
              <Link href="/blog" className="underline underline-offset-4 hover:text-ink">
                Artículos
              </Link>
            </p>
            <p className="mx-auto mt-4 max-w-2xl font-body text-sm leading-relaxed text-ink-soft">
              También trabajo{" "}
              <Link
                href="/diseno-de-paginas-web-en-cartagena"
                className="text-primary-dark underline underline-offset-4 hover:text-accent"
              >
                diseño de páginas web en Cartagena
              </Link>{" "}
              y{" "}
              <Link
                href="/diseno-de-paginas-web-en-bogota"
                className="text-primary-dark underline underline-offset-4 hover:text-accent"
              >
                en Bogotá
              </Link>
              . Y si lo tuyo es{" "}
              <Link
                href="/sectores/salones-y-spas"
                className="text-primary-dark underline underline-offset-4 hover:text-accent"
              >
                un salón o un spa
              </Link>{" "}
              o{" "}
              <Link
                href="/sectores/clinicas-y-consultorios"
                className="text-primary-dark underline underline-offset-4 hover:text-accent"
              >
                una clínica o un consultorio
              </Link>
              , cada uno tiene su página.
            </p>
          </Reveal>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

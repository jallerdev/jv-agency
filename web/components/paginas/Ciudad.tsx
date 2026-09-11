import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock,
  FileText,
  MapPinOff,
  MessageCircle,
} from "lucide-react";

import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BarraMovil } from "@/components/BarraMovil";
import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BotonCuentame } from "@/components/Cuentame";
import { CasillaVacia } from "@/components/visuales/CasillaVacia";
import { Comparador } from "@/components/visuales/Comparador";
import { RailDistancia } from "@/components/visuales/RailDistancia";
import { SITE_URL } from "@/lib/site";
import { BUSINESS } from "@/lib/business";
import { CATALOGO, INCLUIDO_SIEMPRE, PISOS, money } from "@/lib/quote";
import type { Ciudad } from "@/content/ciudades/tipos";

/**
 * EL ESQUELETO DE UNA PÁGINA DE CIUDAD
 * ──────────────────────────────────────────────────────────────────────────
 * Mismo orden de secciones y mismo ritmo de bandas que Cartagena, Barranquilla
 * y Bogotá. Lo que cambia entre hermanas es el MATERIAL, y el material vive en
 * `content/ciudades/`.
 *
 * POR QUÉ ESTO NO ES UNA DOORWAY PAGE, que es la pregunta que hay que hacerle
 * a cualquier plantilla de ciudad: lo que se repite es la estructura y los
 * precios —que son los mismos de verdad, y decir otra cosa sería mentir—;
 * lo que cambia es todo lo que argumenta. Cada ciudad trae sus propias cifras
 * del registro mercantil con su fuente citada y auditable, su propia
 * confesión, sus propias preguntas y su propia distancia. Si alguien añade una
 * quinta ciudad copiando el archivo y cambiando el topónimo, esto SÍ se vuelve
 * una doorway page y hay que bajarla. El tipo `Ciudad` obliga a traer datos y
 * confesión justamente para que eso no se pueda hacer por descuido.
 *
 * LAS TRES PÁGINAS VIEJAS NO SE PORTARON aquí a propósito: son las URL que ya
 * están indexadas y no se pone en juego su posicionamiento por elegancia de
 * código. Portarlas es un trabajo aparte y verificable.
 *
 * SCHEMA: `Service`, nunca `LocalBusiness`. No hay local en ninguna de estas
 * ciudades y fingir una dirección es exactamente lo que Google castiga acá.
 */

/**
 * Las seis tarjetas salen del CATÁLOGO de `lib/quote.ts`: número y plazo, los
 * dos. Los plazos estaban escritos a mano aquí y decían «3 semanas» para la
 * tienda cuando su propia página dice «3 a 5», que es el plazo que se cumple.
 *
 * `plazoPropio` es para las dos líneas que no tienen entrega —el SEO mensual y
 * la renovación—: el catálogo las declara `null` porque poner un número ahí
 * sería prometer un resultado, y la tarjeta necesita igual una línea que decir.
 */
const PLAZO_PROPIO: Partial<Record<string, string>> = {
  seoMes: "trabajo mensual",
  renovacion: "una vez al año",
};

const DESC_CIUDAD: Partial<Record<string, string>> = {
  seoMes:
    "Contenido, ficha de Google y arreglos mes a mes. Los primeros movimientos, entre el mes 3 y el 6.",
  renovacion: "Dominio, hosting, certificado y respaldos del sitio ya entregado.",
};

/* Fuera del cuadro, y a propósito: el mantenimiento del chatbot es un
   recurrente que se explica en su página, y el software a la medida tiene su
   propio párrafo debajo —«va aparte, según el alcance»— porque un sistema
   interno no se cotiza por tabla. Quedan las seis de siempre. */
const PRECIOS = CATALOGO.filter(
  (s) => s.id !== "chatbotMes" && s.id !== "software",
).map((s) => ({
  nombre: s.nombre.es,
  desde: s.desde,
  plazo: s.plazo?.es ?? PLAZO_PROPIO[s.id] ?? "",
  desc: DESC_CIUDAD[s.id] ?? s.desc.es,
  mensual: s.unidad === "mes",
  exacto: s.id === "renovacion",
  href: s.id === "renovacion" ? undefined : s.href.es,
}));

const PROCESO = [
  {
    n: "01",
    t: "Una llamada de veinte minutos",
    d: "Por Meet o por WhatsApp. Nadie cruza el país para esto, ni tú ni yo.",
  },
  {
    n: "02",
    t: "Cotización escrita, con el alcance cerrado",
    d: "Precio, qué entra y qué no entra. Lo que no está escrito no está incluido, y eso también está escrito.",
  },
  {
    n: "03",
    t: "Te muestro avances en un enlace, no en capturas",
    d: "Abres el sitio de verdad desde el celular y me dices qué cambiar por WhatsApp.",
  },
  {
    n: "04",
    t: "Se publica en tu dominio, a tu nombre",
    d: "El dominio se registra a tu nombre, no al mío. Si mañana dejamos de trabajar juntos, el sitio se lo puede llevar cualquiera.",
  },
];

const A_FAVOR = [
  "Mismo país, misma hora y mismos pesos: para tu contabilidad soy un proveedor nacional más",
  "No hay reuniones presenciales que te cuesten media mañana de ida y vuelta",
  "No hay oficina en zona cara que alguien tenga que pagar y meter en tu cotización",
  "Le escribes a la persona que está tocando el código, no a un intermediario",
  "El dominio queda a tu nombre: si dejamos de trabajar juntos, el sitio se lo lleva cualquiera",
];

const EN_CONTRA = [
  { texto: "No voy a estar en tu oficina un martes cualquiera.", quien: "todo va por videollamada" },
  { texto: "No tengo un equipo detrás que absorba un pico de trabajo.", quien: "soy uno" },
  {
    texto:
      "Si tu compra pasa por proveedores con póliza, orden de compra y comité, probablemente no encaje.",
    quien: "dímelo en la primera llamada",
  },
];

/** Trabajo publicado con dominio propio. Ninguno es de estas cuatro ciudades. */
const ABIERTOS = [
  {
    nombre: "HalcónOS",
    dominio: "halcon.jvagencia.com",
    url: "https://halcon.jvagencia.com",
    que: "CRM de ventas para agencias: producto propio, diseñado y programado por mí.",
  },
  {
    nombre: "Hummik",
    dominio: "hummik.com",
    url: "https://www.hummik.com",
    que: "Agenda de citas por WhatsApp: el cliente reserva desde el chat y la cita cae en el calendario.",
  },
  {
    nombre: "Bloomrose",
    dominio: "bloomroseaccesorios.com",
    url: "https://www.bloomroseaccesorios.com",
    que: "Tienda de bisutería con catálogo, inventario, carrito, cuentas y pagos en línea.",
  },
];

/**
 * Las otras ciudades, calculadas: cada página enlaza a las demás menos a sí
 * misma. Escritas a mano, la séptima ciudad habría dejado seis listas
 * desactualizadas y un enlace a sí misma en alguna.
 */
const CIUDADES = [
  { href: "/diseno-de-paginas-web-en-cartagena", label: "Diseño web en Cartagena" },
  { href: "/diseno-de-paginas-web-en-barranquilla", label: "Diseño web en Barranquilla" },
  { href: "/diseno-de-paginas-web-en-bogota", label: "Diseño web en Bogotá" },
  { href: "/diseno-de-paginas-web-en-medellin", label: "Diseño web en Medellín" },
  { href: "/diseno-de-paginas-web-en-cali", label: "Diseño web en Cali" },
  { href: "/diseno-de-paginas-web-en-bucaramanga", label: "Diseño web en Bucaramanga" },
  { href: "/diseno-de-paginas-web-en-santa-marta", label: "Diseño web en Santa Marta" },
];

export function PaginaCiudad({ ciudad }: { ciudad: Ciudad }) {
  const url = `${SITE_URL}${ciudad.ruta}`;
  const otras = CIUDADES.filter((c) => c.href !== ciudad.ruta);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#servicio`,
    name: `Diseño de páginas web en ${ciudad.nombre}`,
    alternateName: ciudad.alternos,
    serviceType: "Diseño y desarrollo de páginas web",
    description: `Diseño y programación de páginas web, tiendas virtuales y chatbots de WhatsApp para negocios de ${ciudad.nombre}, prestado a distancia desde Turbaco, Bolívar, Colombia.`,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: [
      {
        "@type": "City",
        name: ciudad.nombre,
        address: {
          "@type": "PostalAddress",
          addressLocality: ciudad.nombre,
          addressRegion: ciudad.region,
          addressCountry: "CO",
        },
      },
      { "@type": "Country", name: "Colombia" },
    ],
    url,
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: url,
      servicePhone: { "@type": "ContactPoint", telephone: BUSINESS.phone },
      availableLanguage: { "@type": "Language", name: "Spanish", alternateName: "es" },
    },
    offers: PRECIOS.map((p) => ({
      "@type": "Offer",
      name: p.nombre,
      description: p.desc,
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "COP",
        // «desde» se declara como mínimo, no como precio cerrado.
        ...("exacto" in p && p.exacto ? { price: p.desde } : { minPrice: p.desde }),
        ...("mensual" in p && p.mensual ? { unitCode: "MON" } : {}),
      },
      availability: "https://schema.org/InStock",
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header idioma="es" />
      <main id="contenido">
        {/* ── Encabezado · canvas ────────────────────────────────────── */}
        <section className="mx-auto max-w-4xl px-5 pb-8 pt-32 text-center md:px-8 md:pt-40">
          <Reveal>
            <Badge>{ciudad.badge}</Badge>
            <h1 className="mt-6 font-display text-4xl leading-tight text-ink sm:text-5xl md:text-6xl">
              Diseño de páginas web en {ciudad.nombre},{" "}
              <span className="block text-metal">{ciudad.tituloAcento}</span>
            </h1>
            {ciudad.entradilla.map((p) => (
              <p
                key={p}
                className="mx-auto mt-6 max-w-2xl font-body text-lg leading-relaxed text-ink-soft"
              >
                {p}
              </p>
            ))}
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" variant="primary" asChild>
                <Link href="/agendar">
                  Agenda una llamada <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#precios">Ver precios</a>
              </Button>
            </div>
          </Reveal>
        </section>

        {/* ── La confesión. Va arriba a propósito · banda ────────────── */}
        <section className="banda mx-auto max-w-5xl px-5 py-12 md:px-8">
          <Reveal>
            <div className="rounded-[1.5rem] border border-primary/20 bg-gradient-to-br from-surface to-white/15 p-7 sm:p-9 md:p-10">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-quiet text-accent-ink ring-1 ring-inset ring-brand-line">
                <MapPinOff className="h-6 w-6" aria-hidden="true" />
              </span>
              <h2 className="mt-5 font-display text-3xl text-ink sm:text-4xl">
                {ciudad.confesion.titulo}
                <span className="text-metal">{ciudad.confesion.tituloAcento}</span>
              </h2>
              {ciudad.confesion.parrafos.map((p) => (
                <p key={p} className="mt-5 font-body text-lg leading-relaxed text-ink-soft">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <RailDistancia className="mt-10" paradas={ciudad.paradas} />
          </Reveal>
        </section>

        {/* ── Los datos de la ciudad · banda (mismo capítulo) ────────── */}
        <section className="banda mx-auto max-w-6xl px-5 py-12 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">{ciudad.datosTitulo}</h2>
            <p className="mt-4 max-w-3xl font-body text-lg leading-relaxed text-ink-soft">
              {ciudad.datosEntradilla}
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
            {ciudad.datos.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.titulo} index={i}>
                  <article className="h-full jv-card p-6 sm:p-7">
                    <div className="flex items-center gap-4">
                      <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent-quiet text-accent-ink ring-1 ring-inset ring-brand-line">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </span>
                      <span className="font-mono text-2xl text-primary-dark">{p.dato}</span>
                    </div>
                    <h3 className="mt-5 font-body text-xl font-semibold text-ink">{p.titulo}</h3>
                    <p className="mt-2 font-body leading-relaxed text-ink-soft">{p.desc}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <Reveal>
            <p className="mt-6 font-body text-sm leading-relaxed text-ink-soft">
              Fuente de las cifras:{" "}
              <a
                href={ciudad.fuente.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-ink"
              >
                {ciudad.fuente.texto}
              </a>
              . {ciudad.fuente.periodo}
            </p>
          </Reveal>
        </section>

        {/* ── Precios · CANVAS a propósito: son la respuesta ─────────── */}
        <section id="precios" className="mx-auto max-w-6xl scroll-mt-28 px-5 py-12 md:px-8">
          <Reveal>
            <Badge>Precios</Badge>
            <h2 className="mt-6 font-display text-3xl text-ink sm:text-4xl">Lo que cobro, escrito</h2>
            <p className="mt-4 max-w-2xl font-body text-lg leading-relaxed text-ink-soft">
              {ciudad.precioNota}
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {PRECIOS.map((p, i) => (
              <Reveal key={p.nombre} index={i}>
                <article className="flex h-full flex-col jv-card p-6 sm:p-7">
                  <h3 className="font-body text-xl font-semibold text-ink">{p.nombre}</h3>
                  <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-ink-soft">
                    {p.desc}
                  </p>
                  {"href" in p && p.href && (
                    <Link
                      href={p.href}
                      className="mt-3 inline-flex min-h-11 w-fit items-center gap-1 py-2.5 font-body text-sm font-semibold text-primary-dark underline underline-offset-4"
                    >
                      Ver el detalle{" "}
                      <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                    </Link>
                  )}
                  <p className="mt-4 jv-rule pt-4 font-mono text-lg text-primary-dark">
                    {"exacto" in p && p.exacto ? "" : "desde "}
                    {money(p.desde)}
                    {"mensual" in p && p.mensual ? " / mes" : ""}
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
            <div className="mt-6 rounded-2xl border border-line bg-band/60 p-6 sm:p-7">
              <p className="font-body leading-relaxed text-ink-soft">
                <Link
                  href="/servicios/software-a-la-medida"
                  className="font-semibold text-primary-dark underline underline-offset-4"
                >
                  Software a la medida
                </Link>{" "}
                <strong className="text-ink">va aparte</strong>, según el alcance: un sistema
                interno no se cotiza por tabla. El piso son {money(PISOS.software)}.
              </p>
              <p className="mt-3 font-body text-sm leading-relaxed text-ink-soft">
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
                  cuánto se demora
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
            </div>
          </Reveal>
        </section>

        {/* ── Qué incluye · cómo se trabaja a distancia · banda ──────── */}
        <section className="banda mx-auto max-w-6xl px-5 py-12 md:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">
            <Reveal>
              <h2 className="font-display text-3xl text-ink sm:text-4xl">
                Qué entra en cualquier proyecto
              </h2>
              <ul className="mt-8 grid gap-3">
                {INCLUIDO_SIEMPRE.map((x) => (
                  <li key={x} className="flex items-start gap-3 font-body text-ink-soft">
                    <Check className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 font-body leading-relaxed text-ink-soft">
                Si además necesitas que tu número conteste solo —horarios, precios, si hay
                domicilio—, eso es un{" "}
                <Link
                  href="/servicios/chatbot-whatsapp"
                  className="font-semibold text-primary-dark underline underline-offset-4"
                >
                  chatbot de WhatsApp
                </Link>
                , y se monta sobre el mismo número que ya usas.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <h2 className="font-display text-3xl text-ink sm:text-4xl">
                Cómo funciona si tú estás allá y yo no
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
              <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 font-body text-sm text-ink-soft">
                <Clock className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                Una página web, en 5 días
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── Lo que cambia, a favor y en contra · banda ─────────────── */}
        <section className="banda mx-auto max-w-6xl px-5 py-12 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Qué cambia, en la práctica, porque yo no estoy en {ciudad.region}
            </h2>
          </Reveal>
          <Reveal>
            <Comparador
              className="mt-10"
              tituloIncluye="Lo que cambia a tu favor"
              tituloNoIncluye={
                <>
                  Lo que cambia <span className="text-metal">en tu contra</span>
                </>
              }
              incluye={A_FAVOR}
              noIncluye={EN_CONTRA}
            />
          </Reveal>
        </section>

        {/* ── Trabajo abierto · canvas. La cuarta casilla va vacía a
             propósito: es «no hay cliente acá», dibujado. ───────────── */}
        <section className="mx-auto max-w-6xl px-5 py-12 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Trabajo mío que puedes abrir ahora.
              <span className="text-metal"> Ninguno es de {ciudad.nombre}.</span>
            </h2>
            <p className="mt-4 max-w-3xl font-body text-lg leading-relaxed text-ink-soft">
              Los tres están publicados con dominio propio y se comprueban con un clic, que es más
              de lo que se puede decir de la mayoría de los portafolios.
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ABIERTOS.map((p, i) => (
              <Reveal key={p.nombre} index={i}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col jv-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lift sm:p-7"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-body text-xl font-semibold text-ink">{p.nombre}</h3>
                    <ArrowUpRight
                      className="mt-1 h-4 w-4 shrink-0 text-ink-soft transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                      aria-hidden="true"
                    />
                  </div>
                  <span className="mt-2 w-fit break-all rounded-full border border-line px-3 py-1 font-mono text-xs text-ink-soft">
                    {p.dominio}
                  </span>
                  <p className="mt-3 font-body text-sm leading-relaxed text-ink-soft">{p.que}</p>
                </a>
              </Reveal>
            ))}

            <Reveal index={3}>
              <CasillaVacia className="h-full bg-surface/50" rotulo={ciudad.sinCliente.rotulo}>
                {ciudad.sinCliente.texto}
              </CasillaVacia>
            </Reveal>
          </div>

          <Reveal>
            <p className="mt-8 font-body leading-relaxed text-ink-soft">
              El resto del portafolio, con las capturas de cada sitio, está en{" "}
              <Link
                href="/#portafolio"
                className="font-semibold text-primary-dark underline underline-offset-4"
              >
                la portada
              </Link>
              .
            </p>
          </Reveal>
        </section>

        {/* ── Preguntas · banda ──────────────────────────────────────── */}
        <section className="banda mx-auto max-w-4xl px-5 py-12 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Lo que pregunta un cliente de {ciudad.nombre}
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4">
            {ciudad.faqs.map((f, i) => (
              <Reveal key={f.q} index={i}>
                <article className="jv-card p-6 sm:p-7">
                  <h3 className="font-body text-xl font-semibold text-ink">{f.q}</h3>
                  <p className="mt-3 font-body leading-relaxed text-ink-soft">{f.a}</p>
                  {f.href && (
                    <Link
                      href={f.href}
                      className="mt-2 inline-flex min-h-11 items-center gap-2 py-2.5 font-body text-sm font-semibold text-primary-dark underline underline-offset-4"
                    >
                      <FileText className="h-4 w-4 shrink-0" aria-hidden="true" />
                      {f.hrefLabel}
                    </Link>
                  )}
                </article>
              </Reveal>
            ))}

            {/* La de facturación es igual en todas y sale de `lib/business.ts`,
                así que no se copia en cada archivo de ciudad. */}
            <Reveal index={ciudad.faqs.length}>
              <article className="jv-card p-6 sm:p-7">
                <h3 className="font-body text-xl font-semibold text-ink">
                  ¿Facturas legalmente? Necesito soporte contable.
                </h3>
                <p className="mt-3 font-body leading-relaxed text-ink-soft">
                  Sí. Persona natural con RUT y NIT colombiano ({BUSINESS.taxId}), cuenta de cobro o
                  factura en pesos y contrato regido por ley colombiana.
                </p>
              </article>
            </Reveal>
          </div>
        </section>

        {/* ── Cierre · canvas ────────────────────────────────────────── */}
        <section className="mx-auto max-w-4xl px-5 py-16 text-center md:px-8 md:py-24">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">{ciudad.cierreTitulo}</h2>
            <p className="mx-auto mt-5 max-w-xl font-body text-lg leading-relaxed text-ink-soft">
              {ciudad.cierreCuerpo}
            </p>
            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" variant="primary" asChild>
                <Link href="/agendar">
                  Agenda una llamada <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
              </Button>
              <BotonCuentame>
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                Cuéntame tu proyecto
              </BotonCuentame>
            </div>

            <nav aria-label="Otras ciudades" className="mt-12">
              <p className="jv-eyebrow text-ink-soft">También trabajo</p>
              <ul className="mt-4 flex flex-wrap justify-center gap-2">
                {otras.map((o) => (
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
      <Footer idioma="es" />
      <WhatsAppButton />
      <BarraMovil idioma="es" />
    </>
  );
}

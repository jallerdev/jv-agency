import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock,
  FileText,
  MapPinOff,
  MessageCircle,
  Store,
  UserRound,
  Video,
  Wrench,
} from "lucide-react";

import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BotonCuentame } from "@/components/Cuentame";
import { CasillaVacia } from "@/components/visuales/CasillaVacia";
import { Comparador } from "@/components/visuales/Comparador";
import { RailDistancia } from "@/components/visuales/RailDistancia";
import { SITE_URL } from "@/lib/site";
import { BUSINESS } from "@/lib/business";
import { INCLUIDO_SIEMPRE, A_PRICES, money } from "@/lib/quote";

/**
 * Página de ciudad para la intención transaccional «diseño de páginas web en
 * Bogotá».
 *
 * POR QUÉ ESTA PÁGINA ES DISTINTA A LAS DE CARTAGENA Y BARRANQUILLA
 * ----------------------------------------------------------------
 * No hay un solo proyecto entregado en Bogotá. Cero: la investigación de
 * septiembre de 2026 hizo grep de «bogot» en todo el repositorio y la única
 * coincidencia era `America/Bogota`, la zona horaria de `lib/booking.ts`.
 *
 * Por eso esta página NO se apoya en cercanía (el argumento de Cartagena) ni
 * en ser el único que publica precios (falso en Bogotá: allá varias agencias
 * ya los publican). Se apoya en tres cosas verdaderas y comprobables:
 *
 *   1. Datos públicos del tejido empresarial DE BOGOTÁ, que dicen algo que
 *      nadie más está usando: el 52,1 % de las empresas con matrícula activa
 *      de la ciudad son personas naturales con registro mercantil, no
 *      sociedades, y el 92,4 % son microempresas. Ese es exactamente el
 *      cliente de esta agencia, y no vive en el Chicó: vive en Suba, Kennedy
 *      y Engativá.
 *   2. La confesión, arriba y sin letra chica: no hay oficina en Bogotá y no
 *      hay cliente en Bogotá. Se dice en el segundo bloque de la página, y en
 *      la vitrina se dibuja: la rejilla de trabajo abierto tiene tres piezas
 *      reales y una CASILLA VACÍA rotulada. Nadie diseña un hueco en su
 *      propio portafolio; por eso el hueco es lo más creíble de la página.
 *   3. El precio escrito y el trabajo abierto, que se comprueban con un clic.
 *
 * Si algún día se borra el punto 2 porque «suena mal», esta página se vuelve
 * una doorway page — tres párrafos genéricos con la ciudad cambiada — y hay
 * que bajarla. La honestidad no es el tono de la página: es su único activo.
 *
 * ESQUELETO COMPARTIDO con Cartagena y Barranquilla: mismo orden de secciones
 * y mismo ritmo de bandas. Lo que cambia entre hermanas es el material.
 *
 * FUENTE de todas las cifras de Bogotá (una sola, para poder auditarla):
 * Observatorio de Desarrollo Económico de Bogotá, «Boletín Dinámica
 * empresarial n.º 52», 21 de octubre de 2025, con datos de la Cámara de
 * Comercio de Bogotá. Periodo de análisis: septiembre de 2025.
 * https://observatorio.desarrolloeconomico.gov.co/wp-content/uploads/2025/10/Bol-DinEmpre-N-052-20251021-v2.pdf
 */

const RUTA = "/diseno-de-paginas-web-en-bogota";

const FUENTE_BOGOTA =
  "https://observatorio.desarrolloeconomico.gov.co/wp-content/uploads/2025/10/Bol-DinEmpre-N-052-20251021-v2.pdf";

export const metadata: Metadata = {
  // 58 caracteres. El término que la gente escribe va primero; la marca, al final.
  title: "Diseño de páginas web en Bogotá | Luis Jaller · JV Agencia",
  description:
    "Diseño y programo páginas web para negocios de Bogotá desde $850.000 y en 5 días. Trabajo a distancia desde Bolívar: no tengo oficina allá y te lo digo de una.",
  alternates: { canonical: RUTA },
  openGraph: {
    title: "Diseño de páginas web en Bogotá | Luis Jaller · JV Agencia",
    description:
      "Páginas web para negocios de Bogotá desde $850.000 y en 5 días. A distancia, desde Bolívar, y hablando siempre con quien programa.",
    url: `${SITE_URL}${RUTA}`,
    type: "website",
  },
};

/** Precio de entrada del chatbot: se lee de quote.ts, no se escribe a mano. */
const CHATBOT_DESDE = Math.min(...Object.values(A_PRICES.base));

/**
 * Precios autorizados para publicación. Los números viven acá una sola vez y
 * alimentan tanto las tarjetas como el JSON-LD, para que no se puedan
 * desincronizar.
 */
const PRECIOS = [
  {
    nombre: "Página web",
    desde: 850000,
    plazo: "5 días",
    desc: "De una landing a una web corporativa. Diseño propio, no plantilla comprada.",
    href: "/servicios/diseno-de-paginas-web",
  },
  {
    nombre: "Tienda online",
    desde: 2500000,
    plazo: "3 semanas",
    desc: "Catálogo, carrito, pagos en línea y panel para administrar productos e inventario.",
    href: "/servicios/tiendas-virtuales",
  },
  {
    nombre: "Chatbot de WhatsApp",
    desde: CHATBOT_DESDE,
    plazo: "de 1 a 5 semanas",
    desc: "Tu número contesta solo: responde lo repetido, capta interesados y agenda.",
    href: "/servicios/chatbot-whatsapp",
  },
  {
    nombre: "Auditoría SEO",
    desde: 390000,
    plazo: "5 días",
    desc: "Qué te está frenando hoy en Google, con la lista de arreglos en orden de impacto.",
    href: "/servicios/posicionamiento-seo",
  },
  {
    nombre: "SEO local mensual",
    desde: 650000,
    plazo: "trabajo mensual",
    desc: "Contenido, ficha de Google y arreglos mes a mes. Los primeros movimientos, entre el mes 3 y el 6.",
    mensual: true,
    href: "/servicios/posicionamiento-seo",
  },
  {
    nombre: "Renovación anual",
    desde: 290000,
    plazo: "una vez al año",
    desc: "Dominio, hosting, certificado y respaldos del sitio ya entregado.",
    exacto: true,
  },
];

/**
 * Los cuatro perfiles salen de la composición REAL del registro mercantil de
 * Bogotá, no de una lluvia de ideas. Cada porcentaje es del boletín citado
 * arriba.
 */
const QUIEN = [
  {
    icon: UserRound,
    dato: "52,1 %",
    titulo: "Personas naturales con registro mercantil",
    desc: "Más de la mitad de las empresas activas de Bogotá no son sociedades: son una persona con su RUT y su oficio. Yo también soy una de esas.",
  },
  {
    icon: Store,
    dato: "43,8 %",
    titulo: "Comercio",
    desc: "El sector más grande, y el que más pesa en Kennedy (11,1 %), Suba (10,4 %) y Engativá (8,5 %). Lo que necesitas es un catálogo que se pueda mandar por WhatsApp sin que se vea roto.",
  },
  {
    icon: Video,
    dato: "36,4 %",
    titulo: "Servicios",
    desc: "Concentrado en Chapinero (16,7 %), Usaquén (15,0 %) y Suba (13,8 %). Consultorios, estudios, salones, asesorías. Acá la página no vende un producto: vende una cita.",
  },
  {
    icon: Wrench,
    dato: "16,9 %",
    titulo: "Industria",
    desc: "Talleres, confección, metalmecánica, alimentos. La página que sirve es la que le prueba a un comprador que existes y con qué máquinas trabajas.",
  },
];

const PROCESO = [
  {
    n: "01",
    t: "Una llamada de veinte minutos",
    d: "Por Meet o por WhatsApp. Nadie cruza la ciudad para esto, ni tú ni yo.",
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

/**
 * Lo que cambia a tu favor y lo que cambia en tu contra por trabajar con
 * alguien que no está en Cundinamarca. Las dos listas enteras: la segunda es
 * la que hace creíble la primera y no se recorta.
 */
const A_FAVOR = [
  "Mismo país, misma hora y mismos pesos: para tu contabilidad soy un proveedor nacional más",
  "No hay reuniones presenciales que te cuesten media mañana de ida y vuelta",
  "No hay oficina en la 100 que alguien tenga que pagar y meter en tu cotización",
  "Le escribes a la persona que está tocando el código, no a un intermediario",
  "El dominio queda a tu nombre: si dejamos de trabajar juntos, el sitio se lo lleva cualquiera",
];

const EN_CONTRA = [
  { texto: "No voy a estar en tu oficina un martes cualquiera.", quien: "todo va por videollamada" },
  { texto: "No tengo un equipo detrás que absorba un pico de trabajo.", quien: "soy uno" },
  {
    texto: "Si tu compra pasa por proveedores con póliza, orden de compra y comité, probablemente no encaje.",
    quien: "dímelo en la primera llamada",
  },
];

/** Proyectos que se abren y se comprueban. Ninguno es de Bogotá — se dibuja. */
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

/** Enlaces del cierre. Fila de destinos tocables, no prosa con subrayados. */
const OTRAS_PAGINAS = [
  { href: "/diseno-de-paginas-web-en-cartagena", label: "Diseño web en Cartagena" },
  { href: "/diseno-de-paginas-web-en-barranquilla", label: "Diseño web en Barranquilla" },
  { href: "/sectores/salones-y-spas", label: "Salones y spas" },
  { href: "/sectores/clinicas-y-consultorios", label: "Clínicas y consultorios" },
  { href: "/servicios/software-a-la-medida", label: "Software a la medida" },
];

const FAQS = [
  {
    q: "¿Tienes clientes en Bogotá?",
    a: "No, todavía no, y prefiero decírtelo yo antes de que lo averigües tú. Lo que tengo publicado es trabajo de la costa y dos productos propios, y todo se abre con un clic. El día que haya un proyecto bogotano entregado, va a estar en esta página con nombre y con enlace.",
  },
  {
    q: "¿Puedes venir a una reunión presencial?",
    a: "Puedo viajar si el proyecto lo justifica, y el viaje se acuerda aparte. Pero lo normal es que no vaya. Si tu proyecto necesita a alguien sentado en tu oficina cada semana, contrata a alguien de Bogotá.",
  },
  {
    q: "¿Por qué contratar a alguien de Bolívar habiendo cientos de agencias en Bogotá?",
    a: "Por una sola razón: hablas con quien hace el trabajo. No hay ejecutivo de cuenta repitiéndote lo que le dijo el diseñador. Si esa razón no te pesa, la respuesta honesta es que no me contrates.",
  },
  {
    q: "¿Facturas legalmente? Necesito soporte contable.",
    a: `Sí. Persona natural con RUT y NIT colombiano (${BUSINESS.taxId}), cuenta de cobro o factura en pesos y contrato regido por ley colombiana.`,
  },
  {
    q: "¿En cuánto salgo primero en Google en Bogotá?",
    a: "No te lo puedo prometer, y desconfía de quien te lo prometa. Lo que sí hago es entregar el sitio técnicamente en orden desde el primer día: velocidad, estructura, datos para Google y ficha de negocio. Los primeros movimientos se ven entre el mes 3 y el 6, y Bogotá es la búsqueda más peleada del país: ahí no esperes menos.",
  },
  {
    q: "¿El precio sube porque estoy en Bogotá?",
    a: "No. Es el mismo precio que le cobro a un negocio de Turbaco. No tengo oficina que pagar en la 100, así que no hay ningún costo que trasladarte por tu dirección.",
  },
  {
    q: "¿Y si el negocio no necesita página web todavía?",
    a: "Pasa, y más de lo que uno creería. Escribí un artículo entero sobre los casos en que conviene esperar, con los criterios para decidirlo.",
    href: "/blog/mi-negocio-necesita-pagina-web",
    hrefLabel: "¿Mi negocio necesita página web?",
  },
];

export default function DisenoPaginasWebBogotaPage() {
  // Service, no LocalBusiness: no hay local en Bogotá y fingir una dirección
  // allá es exactamente lo que Google castiga en las páginas de ciudad.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}${RUTA}#servicio`,
    name: "Diseño de páginas web en Bogotá",
    alternateName: [
      "Diseño web Bogotá",
      "Páginas web en Bogotá",
      "Creación de páginas web Bogotá",
    ],
    serviceType: "Diseño y desarrollo de páginas web",
    description:
      "Diseño y programación de páginas web, tiendas online y chatbots de WhatsApp para negocios de Bogotá, prestado íntegramente a distancia desde Turbaco, Bolívar, Colombia.",
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: [
      {
        "@type": "City",
        name: "Bogotá",
        alternateName: "Bogotá D.C.",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Bogotá",
          addressRegion: "Bogotá D.C.",
          addressCountry: "CO",
        },
      },
      { "@type": "Country", name: "Colombia" },
    ],
    url: `${SITE_URL}${RUTA}`,
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${SITE_URL}${RUTA}`,
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
        // «desde» se declara como mínimo, no como precio cerrado: decir lo
        // contrario en los datos estructurados sería mentir en el código.
        ...(p.exacto ? { price: p.desde } : { minPrice: p.desde }),
        ...(p.mensual ? { unitCode: "MON" } : {}),
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
            <Badge>Bogotá · a distancia</Badge>
            <h1 className="mt-6 font-display text-4xl leading-tight text-ink sm:text-5xl md:text-6xl">
              Diseño de páginas web en Bogotá,{" "}
              <span className="block text-metal">desde Bolívar y a distancia</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl font-body text-lg leading-relaxed text-ink-soft">
              Bogotá cerró septiembre de 2025 con 406.513 empresas activas. El 92,4 % son
              microempresas y el 52,1 % ni siquiera son sociedades: son una persona con registro
              mercantil.
            </p>
            <p className="mx-auto mt-4 max-w-2xl font-body text-lg leading-relaxed text-ink-soft">
              Yo también soy una de esas. Esta página está escrita para ese negocio, no para el que
              tiene departamento de mercadeo.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" variant="primary" asChild>
                <Link href="/#agenda">
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
                Antes de seguir:
                <span className="text-metal"> no tengo oficina en Bogotá ni cliente en Bogotá.</span>
              </h2>
              <p className="mt-5 font-body text-lg leading-relaxed text-ink-soft">
                Vivo en Turbaco, Bolívar —al lado de Cartagena, no al lado de la Séptima—, y hoy no
                tengo un solo proyecto entregado allá. No te voy a poner una dirección de la calle
                100 en el pie de página.
              </p>
              <p className="mt-4 font-body text-lg leading-relaxed text-ink-soft">
                Si lo primero que necesitas es alguien que se te siente al frente, te ahorro la
                llamada: <strong className="text-ink">no soy yo</strong>. Si lo que necesitas es que
                quien te cotiza sea el mismo que diseña, programa y te contesta el WhatsApp seis
                meses después, sigue leyendo.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <RailDistancia className="mt-10" />
          </Reveal>
        </section>

        {/* ── Para quién es · banda (mismo capítulo que la confesión) ── */}
        <section className="banda mx-auto max-w-6xl px-5 py-12 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              En Bogotá el negocio promedio no está en el Chicó
            </h2>
            <p className="mt-4 max-w-3xl font-body text-lg leading-relaxed text-ink-soft">
              Las cinco localidades que más microempresas concentran son{" "}
              <strong className="text-ink">
                Suba (12,0 %), Kennedy (9,7 %), Usaquén (9,4 %), Engativá (8,5 %) y Chapinero
                (8,3 %)
              </strong>
              : entre las cinco, casi la mitad del total. Barrios de local en la esquina y taller en
              el primer piso, no de torre corporativa.
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
            {QUIEN.map((p, i) => {
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
                href={FUENTE_BOGOTA}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-ink"
              >
                Observatorio de Desarrollo Económico de Bogotá, «Boletín Dinámica empresarial n.º
                52»
              </a>{" "}
              (21 de octubre de 2025), con datos de la Cámara de Comercio de Bogotá. Periodo:
              septiembre de 2025.
            </p>
          </Reveal>
        </section>

        {/* ── Precios · CANVAS a propósito: son la respuesta ─────────── */}
        <section id="precios" className="mx-auto max-w-6xl scroll-mt-28 px-5 py-12 md:px-8">
          <Reveal>
            <Badge>Precios</Badge>
            <h2 className="mt-6 font-display text-3xl text-ink sm:text-4xl">
              Lo que cobro, escrito
            </h2>
            <p className="mt-4 max-w-2xl font-body text-lg leading-relaxed text-ink-soft">
              No te voy a decir que soy el más barato de Bogotá, porque no lo sé. Es el mismo número
              que le cobro a un negocio de Turbaco: no sube porque tu dirección diga Bogotá.
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
                  {p.href && (
                    <Link
                      href={p.href}
                      className="mt-3 inline-flex min-h-11 w-fit items-center gap-1 py-2.5 font-body text-sm font-semibold text-primary-dark underline underline-offset-4"
                    >
                      Ver el detalle{" "}
                      <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                    </Link>
                  )}
                  <p className="mt-4 jv-rule pt-4 font-mono text-lg text-primary-dark">
                    {p.exacto ? "" : "desde "}
                    {money(p.desde)}
                    {p.mensual ? " / mes" : ""}
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
                interno no se cotiza por tabla.
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

        {/* ── Lo que cambia, a favor y en contra · banda (mismo capítulo).
             Las dos columnas enteras: la de la derecha es la que hace
             creíble la de la izquierda. ─────────────────────────────── */}
        <section className="banda mx-auto max-w-6xl px-5 py-12 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Qué cambia, en la práctica, porque yo no estoy en Cundinamarca
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

        {/* ── Trabajo abierto · canvas. La cuarta casilla está vacía a
             propósito: es la frase «ninguno es de Bogotá», dibujada. ─── */}
        <section className="mx-auto max-w-6xl px-5 py-12 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Trabajo mío que puedes abrir ahora.
              <span className="text-metal"> Ninguno es de Bogotá.</span>
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
                  <span className="mt-2 w-fit break-all rounded-full border border-line px-3 py-1 font-mono text-[11px] text-ink-soft">
                    {p.dominio}
                  </span>
                  <p className="mt-3 font-body text-sm leading-relaxed text-ink-soft">{p.que}</p>
                </a>
              </Reveal>
            ))}

            <Reveal index={3}>
              <CasillaVacia className="h-full bg-surface/50" rotulo="Sin cliente de Bogotá">
                Todavía no hay un proyecto entregado en Bogotá. Cuando lo haya, va aquí, con nombre
                y con enlace.
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
              Lo que pregunta un cliente de Bogotá
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4">
            {FAQS.map((f, i) => (
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
          </div>
        </section>

        {/* ── Cierre · canvas ────────────────────────────────────────── */}
        <section className="mx-auto max-w-4xl px-5 py-16 text-center md:px-8 md:py-24">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Cuéntame qué vende tu negocio y en qué localidad estás
            </h2>
            <p className="mx-auto mt-5 max-w-xl font-body text-lg leading-relaxed text-ink-soft">
              En veinte minutos sabemos si esto te sirve, cuánto costaría y en cuánto quedaría en
              línea. Si te conviene más alguien de Bogotá, te lo digo en esa misma llamada.
            </p>
            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" variant="primary" asChild>
                <Link href="/#agenda">
                  Agenda una llamada <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
              </Button>
              <BotonCuentame>
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                Cuéntame tu proyecto
              </BotonCuentame>
            </div>

            <nav aria-label="Otras páginas del sitio" className="mt-12">
              <p className="jv-eyebrow text-ink-soft">
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
      <Footer idioma="es" />
      <WhatsAppButton />
    </>
  );
}

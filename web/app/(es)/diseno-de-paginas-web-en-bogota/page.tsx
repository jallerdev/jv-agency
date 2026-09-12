import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, MapPinOff } from "lucide-react";

import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BarraMovil } from "@/components/BarraMovil";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/kit/PageHero";
import { SectionIndex } from "@/components/kit/SectionIndex";
import { Cifras } from "@/components/kit/Cifras";
import { FilaPrecio } from "@/components/kit/FilaPrecio";
import { ProofCard } from "@/components/kit/ProofCard";
import { InOutLedger } from "@/components/kit/InOutLedger";
import { FaqAccordion } from "@/components/kit/FaqAccordion";
import { FinalCTA, NextStep } from "@/components/kit/FinalCTA";
import { BarrasDato } from "@/components/visuales/BarrasDato";
import { CasillaVacia } from "@/components/visuales/CasillaVacia";
import { RutaDesdeTurbaco } from "@/components/visuales/RutaDesdeTurbaco";
import { SITE_URL } from "@/lib/site";
import { BUSINESS } from "@/lib/business";
import { INCLUIDO_SIEMPRE, catalogo, money, PLAZOS } from "@/lib/quote";

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

/**
 * Precios autorizados para publicación. El número y el plazo salen del
 * catálogo de `lib/quote.ts`; acá solo queda la descripción. Estaban escritos
 * a mano —850000, 2500000, «3 semanas»— y alimentan también el JSON-LD, así
 * que una diferencia con /precios se publicaba además como dato estructurado.
 */
const PRECIOS = [
  {
    nombre: catalogo("landing").nombre.es,
    desde: catalogo("landing").desde,
    plazo: PLAZOS.landing.es,
    desc: "De una landing a una web corporativa. Diseño propio, no plantilla comprada.",
    href: catalogo("landing").href.es,
  },
  {
    nombre: catalogo("tienda").nombre.es,
    desde: catalogo("tienda").desde,
    plazo: PLAZOS.tienda.es,
    desc: "Catálogo, carrito, pagos en línea y panel para administrar productos e inventario.",
    href: catalogo("tienda").href.es,
  },
  {
    nombre: catalogo("chatbot").nombre.es,
    desde: catalogo("chatbot").desde,
    plazo: PLAZOS.chatbot.es,
    desc: "Tu número contesta solo: responde lo repetido, capta interesados y agenda.",
    href: catalogo("chatbot").href.es,
  },
  {
    nombre: catalogo("auditoria").nombre.es,
    desde: catalogo("auditoria").desde,
    plazo: PLAZOS.auditoria.es,
    desc: "Qué te está frenando hoy en Google, con la lista de arreglos en orden de impacto.",
    href: catalogo("auditoria").href.es,
  },
  {
    nombre: "SEO local mensual",
    desde: catalogo("seoMes").desde,
    plazo: "trabajo mensual",
    desc: "Contenido, ficha de Google y arreglos mes a mes. Los primeros movimientos, entre el mes 3 y el 6.",
    mensual: true,
    href: catalogo("seoMes").href.es,
  },
  {
    nombre: catalogo("renovacion").nombre.es,
    desde: catalogo("renovacion").desde,
    plazo: "una vez al año",
    desc: "Dominio, hosting, certificado y respaldos del sitio ya entregado.",
    exacto: true,
  },
];

/**
 * Los cuatro perfiles salen de la composición REAL del registro mercantil de
 * Bogotá, no de una lluvia de ideas. Cada porcentaje es del boletín citado
 * arriba.
 *
 * SIN ICONO. Los llevaban, en azulejo de color de 48 px, y los cuatro iconos
 * decían menos que los cuatro porcentajes: ahora la cifra ES el elemento y va
 * en la banda de cifras del kit, con su lectura debajo.
 */
const QUIEN = [
  {
    dato: "52,1 %",
    titulo: "Personas naturales con registro mercantil",
    desc: "Más de la mitad de las empresas activas de Bogotá no son sociedades: son una persona con su RUT y su oficio. Yo también soy una de esas.",
  },
  {
    dato: "43,8 %",
    titulo: "Comercio",
    desc: "El sector más grande, y el que más pesa en Kennedy (11,1 %), Suba (10,4 %) y Engativá (8,5 %). Lo que necesitas es un catálogo que se pueda mandar por WhatsApp sin que se vea roto.",
  },
  {
    dato: "36,4 %",
    titulo: "Servicios",
    desc: "Concentrado en Chapinero (16,7 %), Usaquén (15,0 %) y Suba (13,8 %). Consultorios, estudios, salones, asesorías. Acá la página no vende un producto: vende una cita.",
  },
  {
    dato: "16,9 %",
    titulo: "Industria",
    desc: "Talleres, confección, metalmecánica, alimentos. La página que sirve es la que le prueba a un comprador que existes y con qué máquinas trabajas.",
  },
];

/**
 * LAS CINCO LOCALIDADES, para dibujarlas a escala.
 *
 * Estaban dentro del párrafo, en negrita y entre paréntesis. Ahí «12,0» y
 * «8,3» se leen igual de largas y el lector se queda con «hay varias
 * localidades», que es lo contrario del dato. `valor` es para el ancho;
 * `etiqueta`, cómo se escribe: la coma decimal no es un punto.
 *
 * Mismo boletín que el resto de cifras de esta página: Observatorio de
 * Desarrollo Económico de Bogotá, n.º 52, con datos de la Cámara de Comercio.
 */
const LOCALIDADES = [
  { nombre: "Suba", valor: 12.0, etiqueta: "12,0 %" },
  { nombre: "Kennedy", valor: 9.7, etiqueta: "9,7 %" },
  { nombre: "Usaquén", valor: 9.4, etiqueta: "9,4 %" },
  { nombre: "Engativá", valor: 8.5, etiqueta: "8,5 %" },
  { nombre: "Chapinero", valor: 8.3, etiqueta: "8,3 %" },
];

const INDICE = [
  { id: "confesion", texto: "Lo que no tengo acá" },
  { id: "localidades", texto: "Bogotá en cifras" },
  { id: "precios", texto: "Precios" },
  { id: "como", texto: "Cómo se trabaja" },
  { id: "cambia", texto: "Qué cambia" },
  { id: "trabajo", texto: "Trabajo abierto" },
  { id: "preguntas", texto: "Preguntas" },
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
  { href: "/diseno-de-paginas-web-en-medellin", label: "Diseño web en Medellín" },
  { href: "/diseno-de-paginas-web-en-cali", label: "Diseño web en Cali" },
  { href: "/diseno-de-paginas-web-en-bucaramanga", label: "Diseño web en Bucaramanga" },
  { href: "/diseno-de-paginas-web-en-santa-marta", label: "Diseño web en Santa Marta" },
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
        <PageHero
          titular="compacto"
          variante="ciudad"
          idioma="es"
          migas={[{ texto: "Diseño de páginas web en Bogotá" }]}
          eyebrow="Bogotá · a distancia"
          titulo={
            <>
              Diseño de páginas web en Bogotá,{" "}
              <span className="block text-brand">desde Bolívar y a distancia</span>
            </>
          }
          entradilla="Bogotá cerró septiembre de 2025 con 406.513 empresas activas. El 92,4 % son microempresas y el 52,1 % ni siquiera son sociedades: son una persona con registro mercantil."
          precio="landing"
          indice={<SectionIndex entradas={INDICE} idioma="es" variante="chip" />}
          aparte={
            <RutaDesdeTurbaco
              destino="Bogotá"
              distancia="≈ 1.000 km"
              nota="A distancia, y lo digo yo primero. Se trabaja igual: la distancia decide si nos vemos en persona, no si tomo el proyecto."
            />
          }
          acciones={
            <>
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

        {/* ── La confesión. Va arriba a propósito ────────────────────── */}
        <section id="confesion" className="border-b border-line bg-tint">
          <div className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-16">
              <Reveal>
                <div className="lg:sticky lg:top-28">
                  <MapPinOff className="h-6 w-6 text-brand" strokeWidth={1.75} aria-hidden="true" />
                  <h2 className="mt-5 text-balance text-[length:var(--text-h2)]">
                    Antes de seguir:
                    <span className="text-brand"> trabajo Bogotá a distancia, desde Bolívar.</span>
                  </h2>
                </div>
              </Reveal>

              <Reveal delay={80}>
                <p className="max-w-[62ch] text-[length:var(--text-lead)] leading-relaxed text-ink-soft">
                  Vivo en Turbaco, Bolívar —al lado de Cartagena, no al lado de la Séptima—. No
                  tengo oficina en Bogotá y todavía no hay un proyecto entregado allá: cuando lo
                  haya, va en esta misma página con nombre y con enlace.
                </p>
                <p className="mt-5 max-w-[62ch] text-[length:var(--text-lead)] leading-relaxed text-ink-soft">
                  A distancia significa videollamada para arrancar, WhatsApp para el día a día y un
                  enlace donde ves el sitio crecer antes de que salga. Es como trabajé{" "}
                  <strong className="text-ink">Bloomrose</strong>, que está en línea y se puede
                  abrir ahora mismo.
                </p>
                <p className="mt-5 max-w-[62ch] text-[length:var(--text-lead)] leading-relaxed text-ink-soft">
                  Y quien te cotiza es el mismo que diseña, programa y te contesta el WhatsApp seis
                  meses después. Eso no cambia con la distancia.
                </p>
                <p className="mt-8 max-w-[62ch] leading-relaxed text-ink-soft">
                  Yo también soy una de esas 406.513: una persona con registro mercantil. Esta
                  página está escrita para ese negocio.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Para quién es ──────────────────────────────────────────── */}
        <section
          id="localidades"
          className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24"
        >
          <Reveal>
            <h2 className="text-balance text-[length:var(--text-display)]">
              En Bogotá el negocio promedio no está en el Chicó
            </h2>
            <p className="mt-4 max-w-[62ch] text-[length:var(--text-lead)] leading-relaxed text-ink-soft">
              Entre las cinco localidades que más microempresas concentran suman casi la mitad del
              total. Barrios de local en la esquina y taller en el primer piso, no de torre
              corporativa.
            </p>
          </Reveal>

          {/* LAS CINCO LOCALIDADES, A ESCALA. Estaban dentro del párrafo, en
              negrita y entre paréntesis, y ahí «12,0» y «8,3» se leen igual de
              largas: el lector se queda con «hay varias localidades», que es lo
              contrario del dato. */}
          <BarrasDato
            className="mt-12"
            filas={LOCALIDADES}
            nota="Porcentaje sobre el total de microempresas de la ciudad. Entre las cinco, casi la mitad."
          />

          <Cifras
            className="mt-14"
            cifras={QUIEN.map((q) => {
              const n = Number(q.dato.replace(/\./g, "").replace(",", ".").replace(/[^\d.]/g, ""));
              const entero = Number.isFinite(n) && !q.dato.includes(",");
              return {
                valor: entero ? n : 0,
                sufijo: q.dato.includes("%") ? " %" : undefined,
                cuenta: entero,
                textoCrudo: entero ? undefined : q.dato,
                etiqueta: q.titulo,
              };
            })}
          />

          <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-5 md:grid-cols-2">
            {QUIEN.map((q) => (
              <Reveal key={q.titulo}>
                <p className="max-w-[62ch] text-sm leading-relaxed text-ink-soft">
                  <strong className="text-ink">{q.titulo}. </strong>
                  {q.desc}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="jv-rule mt-10 max-w-[62ch] pt-6 text-sm leading-relaxed text-ink-muted">
              Fuente de las cifras:{" "}
              <a
                href={FUENTE_BOGOTA}
                target="_blank"
                rel="noopener noreferrer"
                className="jv-enlace font-semibold text-brand"
              >
                Observatorio de Desarrollo Económico de Bogotá, «Boletín Dinámica empresarial n.º
                52»
              </a>{" "}
              (21 de octubre de 2025), con datos de la Cámara de Comercio de Bogotá. Periodo:
              septiembre de 2025.
            </p>
          </Reveal>
        </section>

        {/* ── Precios ────────────────────────────────────────────────── */}
        <section
          id="precios"
          className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24"
        >
          <Reveal>
            <p className="jv-eyebrow text-brand">Precios</p>
            <h2 className="mt-4 text-balance text-[length:var(--text-display)]">
              Lo que cobro, escrito
            </h2>
            <p className="mt-4 max-w-[62ch] leading-relaxed text-ink-soft">
              Precios de arranque. En Bogotá te van a cotizar esto mismo por dos y por tres veces
              más; lo que no te van a decir es quién lo va a hacer.
            </p>
          </Reveal>

          <ul className="mt-12 flex flex-col divide-y divide-line border-y border-line">
            {PRECIOS.map((p, i) => (
              <FilaPrecio
                key={p.nombre}
                idioma="es"
                indice={i}
                nombre={p.nombre}
                descripcion={p.desc}
                plazo={p.plazo}
                monto={p.desde}
                desde={!p.exacto}
                unidad={p.mensual ? "/mes" : undefined}
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
                cuánto se demora
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

        {/* ── Qué incluye · cómo se trabaja a distancia ──────────────── */}
        <section id="como" className="border-y border-line bg-tint">
          <div className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
              <Reveal>
                <h2 className="text-balance text-[length:var(--text-h2)]">
                  Qué entra en cualquier proyecto
                </h2>
                <ul className="mt-8 flex flex-col gap-3">
                  {INCLUIDO_SIEMPRE.map((x) => (
                    <li key={x} className="flex items-start gap-3 leading-relaxed text-ink-soft">
                      <Check
                        className="mt-1 h-4 w-4 shrink-0 text-brand"
                        strokeWidth={2.5}
                        aria-hidden="true"
                      />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-8 max-w-[62ch] leading-relaxed text-ink-soft">
                  Si además necesitas que tu número conteste solo —horarios, precios, si hay
                  domicilio—, eso es un{" "}
                  <Link
                    href="/servicios/chatbot-whatsapp"
                    className="jv-enlace font-semibold text-brand"
                  >
                    chatbot de WhatsApp
                  </Link>
                  , y se monta sobre el mismo número que ya usas.
                </p>
              </Reveal>

              <Reveal delay={120}>
                <h2 className="text-balance text-[length:var(--text-h2)]">
                  Cómo funciona si tú estás allá y yo no
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
                <p className="mt-8 font-mono text-sm text-ink-soft">Una página web, en 5 días</p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Lo que cambia, a favor y en contra. Las dos columnas
             enteras: la de la derecha es la que hace creíble la de la
             izquierda. ────────────────────────────────────────────────── */}
        <section
          id="cambia"
          className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24"
        >
          <Reveal>
            <h2 className="text-balance text-[length:var(--text-display)]">
              Qué cambia, en la práctica, porque yo no estoy en Cundinamarca
            </h2>
          </Reveal>

          {/* El mismo mueble de «qué entra / qué no entra» del resto del
              sitio: dos columnas del mismo peso, y el sello de la derecha en
              tinta plena. La columna incómoda es la que hace creíble la otra,
              así que no puede ser el apéndice de nadie. */}
          <InOutLedger
            className="mt-12"
            idioma="es"
            titulos={{ dentro: "Lo que cambia a tu favor", fuera: "Lo que cambia en tu contra" }}
            dentro={A_FAVOR.map((x) => ({ texto: x }))}
            fuera={EN_CONTRA.map((x) => ({ texto: x.texto, sello: x.quien }))}
          />
        </section>

        {/* ── Trabajo abierto. La cuarta casilla está vacía a propósito:
             es la frase «ninguno es de Bogotá», dibujada. ─────────────── */}
        <section
          id="trabajo"
          className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24"
        >
          <Reveal>
            <h2 className="text-balance text-[length:var(--text-display)]">
              Trabajo mío que puedes abrir ahora.
              <span className="text-brand"> Ninguno es de Bogotá.</span>
            </h2>
            <p className="mt-4 max-w-[62ch] leading-relaxed text-ink-soft">
              Los tres están publicados con dominio propio y se comprueban con un clic, que es más
              de lo que se puede decir de la mayoría de los portafolios.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ABIERTOS.map((p, i) => (
              <Reveal key={p.nombre} delay={i * 80} className="h-full">
                <ProofCard
                  idioma="es"
                  nombre={p.nombre}
                  cuerpo={p.que}
                  dominio={p.dominio}
                  url={p.url}
                  estado="produccion"
                />
              </Reveal>
            ))}

            <Reveal delay={240} className="h-full">
              <CasillaVacia className="h-full" rotulo="La casilla de Bogotá">
                Todavía no hay un proyecto entregado en Bogotá. Cuando lo haya, va aquí, con nombre
                y con enlace.
              </CasillaVacia>
            </Reveal>
          </div>

          <Reveal>
            <p className="mt-8 max-w-[62ch] leading-relaxed text-ink-soft">
              El resto del portafolio, con las capturas de cada sitio, está en{" "}
              <Link href="/#portafolio" className="jv-enlace font-semibold text-brand">
                la portada
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
                  Lo que pregunta un cliente de Bogotá
                </h2>
              </div>
            </Reveal>

            <FaqAccordion
              grupos={[
                {
                  titulo: "Lo que pregunta un cliente de Bogotá",
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
          titulo="Cuéntame qué vende tu negocio y en qué localidad estás"
          cuerpo="Veinte minutos por Meet. Sales con un rango de precio y un plazo reales, dichos en la llamada. Si no te sirve, te lo digo y no te cobro por decírtelo."
          siguiente={<NextStep id="landing" idioma="es" />}
        />
      </main>
      <Footer idioma="es" />
      <WhatsAppButton />
      <BarraMovil idioma="es" />
    </>
  );
}

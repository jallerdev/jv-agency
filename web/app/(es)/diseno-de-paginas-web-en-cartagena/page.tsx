import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Hotel,
  Ship,
  Stethoscope,
  Store,
  UtensilsCrossed,
} from "lucide-react";

import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BarraMovil } from "@/components/BarraMovil";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/kit/PageHero";
import { SectionIndex } from "@/components/kit/SectionIndex";
import { Cifras } from "@/components/kit/Cifras";
import { PainGrid } from "@/components/kit/PainGrid";
import { ProofCard } from "@/components/kit/ProofCard";
import { FaqAccordion } from "@/components/kit/FaqAccordion";
import { FinalCTA, NextStep } from "@/components/kit/FinalCTA";
import { RailPlazo } from "@/components/visuales/RailPlazo";
import { ListaAcopio } from "@/components/visuales/ListaAcopio";
import { PanelAutonomia } from "@/components/visuales/PanelAutonomia";
import { RailDistancia } from "@/components/visuales/RailDistancia";
import { SITE_URL } from "@/lib/site";
import { catalogo, money, PLAZOS } from "@/lib/quote";

/**
 * Página de ciudad para la intención transaccional «diseño de páginas web en
 * Cartagena».
 *
 * Por qué existe: Search Console, tres meses, dice que el sitio no aparece por
 * una sola consulta con ciudad. No porque no se busque, sino porque no había
 * una sola página que dijera «Cartagena». Esta es la primera de las tres del
 * mapa de `SEO-INTENCIONES-DE-COMPRA.md`, y va primero porque es la única
 * donde hay material propio de verdad: Bloomrose en producción, dos trabajos
 * reales de negocios cartageneros, dos proyectos de estudio de la zona y una
 * persona que vive en Turbaco.
 *
 * LO QUE NO PUEDE PASAR: que este archivo se copie cambiando «Cartagena» por
 * otra ciudad. Diez páginas iguales con el nombre cambiado son doorway pages y
 * Google las castiga desde hace más de diez años. Todo lo que hay acá abajo
 * —el censo de la Cámara de Comercio, los barrios, los sectores, los
 * proyectos— es de Cartagena y de Bolívar y no sirve en otra parte.
 *
 * SIN LocalBusiness EN EL JSON-LD, a propósito: no hay local en Cartagena.
 * Declarar uno es exactamente lo que Google penaliza. El negocio es de área de
 * servicio y eso se dice con `areaServed`, no fingiendo una dirección.
 *
 * Una sola página cubre las cuatro variantes de la misma intención: «diseño de
 * páginas web en Cartagena», «agencia de diseño web Cartagena», «páginas web
 * en Cartagena» y «diseño web Cartagena». En el h1 y el title va «Cartagena»
 * porque es lo que la gente escribe; «Cartagena de Indias», «Bolívar» y
 * «Colombia» viven en el cuerpo y en el schema para desambiguar de Cartagena,
 * Región de Murcia, que pelea la misma cadena.
 *
 * ESQUELETO COMPARTIDO con Barranquilla y Bogotá. Las tres van en el mismo
 * orden y con el mismo ritmo de bandas —hero canvas · contexto y para-quién en
 * banda · PRECIOS en canvas para que destaquen · cómo se hace y desde dónde en
 * banda · prueba de trabajo en canvas · preguntas en banda · cierre en
 * canvas—. Lo que cambia entre hermanas es el material, no la estructura.
 */
export const metadata: Metadata = {
  title: "Diseño de páginas web en Cartagena de Indias | JV Agencia",
  description:
    "Diseño y programo páginas web para negocios de Cartagena de Indias. Desde $850.000 y en 5 días. Vivo en Turbaco, a 20 kilómetros: nos vemos si hace falta.",
  alternates: { canonical: "/diseno-de-paginas-web-en-cartagena" },
  openGraph: {
    title: "Diseño de páginas web en Cartagena de Indias | JV Agencia",
    description:
      "Páginas web para negocios de Cartagena y Bolívar, desde $850.000 y en 5 días. Las diseño y las programo yo, desde Turbaco.",
    url: `${SITE_URL}/diseno-de-paginas-web-en-cartagena`,
    type: "website",
  },
};

/**
 * Cifras de la ciudad. Cada una con su fuente a la vista: es lo único que
 * separa un dato de un adorno, y acá se muestran en pantalla, no en un
 * comentario del código.
 */
const CIFRAS = [
  {
    dato: "43.044",
    de: "negocios censados en Cartagena, más 4.813 en Turbaco",
    fuente: "Censo empresarial de la Cámara de Comercio de Cartagena, abril de 2026",
  },
  {
    dato: "34.531",
    de: "empresas activas, contra 32.702 el año anterior. Casi nueve de cada diez son microempresas",
    fuente: "Cartagena Cómo Vamos, con corte del Registro Mercantil al 31 de diciembre de 2025",
  },
  {
    dato: "13%",
    de: "del tejido vive de alojamiento y comida. El comercio, el más grande, reúne 10.878 empresas: el 32%",
    fuente: "Cartagena Cómo Vamos, misma medición",
  },
];

/**
 * Para quién es. Tipos de negocio DE CARTAGENA, con el problema que tiene cada
 * uno acá y no en abstracto. Si alguno de estos párrafos sirviera igual para
 * Bogotá, está mal escrito y hay que botarlo.
 */
const PARA_QUIEN = [
  {
    icon: Hotel,
    titulo: "Hoteles pequeños y hostales del Centro y Getsemaní",
    desc: "Vives de Booking y de Airbnb, y les pagas comisión por cada noche. Una página propia no te saca de ahí: te deja una puerta más, la que no cobra comisión.",
  },
  {
    icon: UtensilsCrossed,
    titulo: "Restaurantes y bares",
    desc: "El que va por la Calle del Arsenal busca tres cosas en el teléfono: carta, horario y cómo llegar. Si tu menú es la foto de una foto, se va al de al lado.",
    link: { href: "/blog/que-debe-tener-la-pagina-web-de-un-restaurante", label: "Qué debe tener la web de un restaurante" },
  },
  {
    icon: Ship,
    titulo: "Agencias de turismo y operadores de plan",
    desc: "Islas del Rosario, Playa Blanca, chiva. Te escriben una semana antes y comparan tres números de WhatsApp a la vez. Gana el que contesta con precio, foto y qué pasa si llueve.",
    link: { href: "/servicios/chatbot-whatsapp", label: "Chatbot de WhatsApp que contesta solo" },
  },
  {
    icon: Building2,
    titulo: "Inmobiliarias y arriendo por días",
    desc: "Bocagrande, Castillogrande, Manga, Pie de la Popa. El que gira un depósito por un apartamento que no ha visto necesita comprobar que existes en algo más que un perfil con quince fotos.",
    link: { href: "/blog/pagina-web-o-solo-instagram", label: "¿Página web o solo Instagram?" },
  },
  {
    icon: Stethoscope,
    titulo: "Consultorios, odontología y estética",
    desc: "El paciente averigua el nombre del profesional antes de pedir la cita. Si encuentra un perfil sin horarios y sin dirección, duda y sigue buscando.",
  },
  {
    icon: Store,
    titulo: "Negocios de Turbaco, Arjona y la zona",
    desc: "Los 4.813 negocios que el censo contó en Turbaco compiten igual: ferreterías, veterinarias, colegios, talleres, salones. A esos les queda más cerca que a nadie.",
  },
];

/**
 * Precios autorizados. Son los únicos números de precio que se publican en
 * todo el sitio; el del chatbot sale de `lib/quote.ts` para que no haya dos
 * verdades. El formato de moneda también sale de ahí.
 */
/* El número Y EL PLAZO salen del catálogo de `lib/quote.ts`. El plazo estaba
   escrito a mano y decía «de 2 a 5 semanas» para el chatbot cuando su propia
   página dice «de 1 a 5»: la ciudad cita el plazo, no lo decide. Las
   descripciones sí son de Cartagena y se quedan como están. */
const D = (id: Parameters<typeof catalogo>[0]) => catalogo(id);

const PRECIOS = [
  {
    q: D("landing").nombre.es,
    desde: money(D("landing").desde),
    plazo: PLAZOS.landing.es,
    d: "Carga rápido, se ve seria en el teléfono y dice en diez segundos qué haces. Con tu dominio y tu correo.",
    href: D("landing").href.es,
  },
  {
    q: catalogo("tienda").nombre.es,
    desde: money(D("tienda").desde),
    plazo: PLAZOS.tienda.es,
    d: "Catálogo con inventario, carrito, cuentas de cliente, pagos en línea y cotización de envíos. Como Bloomrose.",
    href: D("tienda").href.es,
  },
  {
    q: D("chatbot").nombre.es,
    desde: money(D("chatbot").desde),
    plazo: PLAZOS.chatbot.es,
    d: "Tu número contesta solo las preguntas de siempre y te pasa la conversación cuando vale la pena.",
    href: D("chatbot").href.es,
  },
  {
    q: D("auditoria").nombre.es,
    desde: money(D("auditoria").desde),
    plazo: PLAZOS.auditoria.es,
    d: "Por qué no apareces y qué se arregla primero. Sirve igual si la página te la hizo otro.",
    href: D("auditoria").href.es,
  },
  {
    q: "SEO local, mensual",
    desde: `${money(D("seoMes").desde)}/mes`,
    plazo: "trabajo continuo",
    d: "Aparecer en búsquedas con ciudad: «funeraria en Cartagena», «avisos publicitarios en Cartagena».",
    href: D("seoMes").href.es,
  },
  {
    /* Faltaba, y es la única línea que se vuelve a cobrar cada año: callarla
       acá y decirla en /precios es justo la sorpresa que el sitio promete no
       dar. */
    q: D("renovacion").nombre.es,
    desde: money(D("renovacion").desde),
    plazo: "una vez al año",
    d: "Dominio, alojamiento, certificado y respaldos del sitio ya entregado. Se dice desde el primer día.",
  },
  {
    q: D("software").nombre.es,
    desde: money(D("software").desde),
    plazo: PLAZOS.software.es,
    d: "Cuando el problema no es una página sino un proceso: reservas, inventario, historia clínica.",
    href: D("software").href.es,
  },
];

/** Los cinco días. El tramo previo lo dibuja el rail, no lo cuenta el texto. */
const DIAS = [
  { etiqueta: "Día 1", texto: "Estructura: qué ve tu cliente y en qué orden." },
  { etiqueta: "Día 2 y 3", texto: "Diseño y programación, al mismo tiempo." },
  { etiqueta: "Día 4", texto: "La revisas conmigo, en vivo, y ajustamos." },
  { etiqueta: "Día 5", texto: "Sale al aire y te enseño a manejarla." },
];

/** Enlaces del cierre. Fila de destinos tocables, no prosa con subrayados. */
const OTRAS_PAGINAS = [
  { href: "/diseno-de-paginas-web-en-barranquilla", label: "Diseño web en Barranquilla" },
  { href: "/diseno-de-paginas-web-en-bogota", label: "Diseño web en Bogotá" },
  { href: "/diseno-de-paginas-web-en-santa-marta", label: "Diseño web en Santa Marta" },
  { href: "/diseno-de-paginas-web-en-medellin", label: "Diseño web en Medellín" },
  { href: "/diseno-de-paginas-web-en-cali", label: "Diseño web en Cali" },
  { href: "/diseno-de-paginas-web-en-bucaramanga", label: "Diseño web en Bucaramanga" },
  { href: "/sectores/salones-y-spas", label: "Salones y spas" },
  { href: "/sectores/clinicas-y-consultorios", label: "Clínicas y consultorios" },
  { href: "/servicios/chatbot-whatsapp", label: "Chatbot de WhatsApp" },
];

/**
 * LOS BARRIOS, COMO TEXTURA TIPOGRÁFICA.
 *
 * Ninguno es un dato nuevo: los nueve están escritos en los párrafos de
 * `PARA_QUIEN` y en el de las cifras. Puestos juntos en mono sobre el titular
 * hacen lo que ninguna foto de banco haría en esta página —decir «esto es de
 * aquí»— antes de que se lea una línea. Si alguien copia este archivo para
 * otra ciudad, esta lista es lo primero que se cae, que es la idea.
 */
const BARRIOS = [
  "Centro",
  "Getsemaní",
  "San Diego",
  "Bocagrande",
  "Castillogrande",
  "Manga",
  "Pie de la Popa",
  "Bazurto",
  "Turbaco",
];

const INDICE = [
  { id: "cifras", texto: "La ciudad en cifras" },
  { id: "negocios", texto: "Para quién es" },
  { id: "precios", texto: "Precios" },
  { id: "proceso", texto: "Cómo se hace" },
  { id: "cerca", texto: "Desde dónde" },
  { id: "trabajo", texto: "El trabajo de acá" },
  { id: "preguntas", texto: "Preguntas" },
];

/**
 * El trabajo de esta zona. La FORMA de cada tarjeta dice de qué clase es
 * —filete continuo y enlace para lo que está en línea, filete discontinuo para
 * lo que se construyó por iniciativa propia—, así que alguien que pase la
 * vista sin leer las etiquetas igual ve tres cosas distintas.
 *
 * La funeraria es CLIENTE y su sitio está en producción, pero no lleva enlace:
 * Luis autorizó nombrarla, no publicar su dirección. Al otro negocio
 * cartagenero NO lo autorizó, así que no aparece ni de pasada.
 */
const TRABAJO = [
  {
    nombre: "Bloomrose",
    categoria: "Tienda en línea · Cartagena",
    cuerpo:
      "Tienda de bisutería y accesorios de Cartagena. La diseñé y la programé completa: catálogo con inventario, carrito, cuentas de cliente, pagos en línea y cotización de envíos. Es la que puedes abrir ahora mismo y comprobar.",
    dominio: "bloomroseaccesorios.com",
    url: "https://www.bloomroseaccesorios.com",
    estado: "produccion" as const,
  },
  {
    nombre: "Funeraria San Francisco de Asís",
    categoria: "Cliente · Cartagena",
    cuerpo:
      "Le entregué la página y el trabajo mensual de posicionamiento, apuntado a la búsqueda que de verdad importa en ese negocio: «funeraria en Cartagena». Es un sector donde nadie compara durante semanas — se busca una vez, con prisa y en el peor día, y se llama al primero que inspire confianza.",
    estado: "produccion" as const,
  },
  {
    nombre: "Fta. Elka Gómez",
    categoria: "Proyecto de estudio · Cartagena",
    cuerpo:
      "Más de 30 años tratando el dolor en Cartagena: rehabilitación física, masaje y experiencias de spa. La construí por iniciativa propia, no me la encargaron, y todavía no tiene dominio conectado. Por eso no hay enlace que abrir: prefiero decírtelo a colgar una captura y llamarlo cliente.",
    estado: "estudio" as const,
  },
  {
    nombre: "Animal Expert",
    categoria: "Proyecto de estudio · Turbaco",
    cuerpo:
      "Centro médico veterinario de Turbaco: consulta especializada, cirugía, rayos X y agenda en línea. Mismo caso que el anterior: por iniciativa propia, en el pueblo donde vivo.",
    estado: "estudio" as const,
  },
] as readonly {
  nombre: string;
  categoria: string;
  cuerpo: string;
  dominio?: string;
  url?: string;
  estado: "produccion" | "estudio";
}[];

const FAQS = [
  {
    q: "¿Tienes oficina en Cartagena?",
    a: "No, y no la voy a inventar. Vivo en Turbaco, a 20 kilómetros. Casi todo se hace por WhatsApp y llamada; si necesitas que nos veamos la cara, nos vemos: es un viaje corto, no un vuelo.",
  },
  {
    q: "Mi negocio está en Turbaco, Arjona o Santa Rosa, no en Cartagena. ¿Igual me sirve?",
    a: "Igual, y es donde vivo. A Google le da lo mismo el límite del distrito: tu cliente busca «lo que vendes» más el nombre del pueblo, y ahí es donde hay que aparecer.",
  },
  {
    q: "Vivo de Booking y de Airbnb. ¿Para qué quiero página propia?",
    a: "Para tener una puerta que no cobre comisión. La plataforma te trae al que no te conocía; tu página es para el que te recomendaron y para el que te buscó por el nombre. No compiten.",
  },
  {
    q: "¿Me pones de primero en Google cuando busquen «páginas web en Cartagena»?",
    a: "No te lo prometo, y desconfía del que te lo prometa. Lo que sí te digo es cuándo se empieza a ver: los primeros movimientos, entre el mes 3 y el 6. Y antes de gastar en eso hay algo gratis que pesa más: la ficha de Google Business con reseñas de verdad.",
  },
  {
    q: "Ya me hicieron una página y no aparece por ningún lado. ¿La rehacemos?",
    a: "Primero la reviso. Muchas veces no es la página: es que en ninguna parte dice «Cartagena», nunca se le avisó a Google que existe y no hay una sola reseña. La auditoría cuesta desde " + money(catalogo("auditoria").desde) + " y en 5 días te digo qué tiene. Si conviene rehacerla te lo digo, y si no, también.",
  },
  {
    q: "La carta me cambia según lo que llegue de Bazurto. ¿Toca llamarte cada vez?",
    a: "No. La carta queda editable y te enseño a cambiarla el día de la entrega, desde el teléfono. Cobrarte por cada cambio de precio sería un mal negocio para los dos.",
  },
  {
    q: "Solo contesto por WhatsApp. ¿La página me sirve de algo?",
    a: "Sí, y no pelea con el WhatsApp: lo alimenta. La página trabaja de noche y los domingos, contesta las tres preguntas de siempre y te manda al chat gente que ya sabe qué vendes y cuánto vale.",
  },
];

export default function DisenoPaginasWebCartagenaPage() {
  // Service, no LocalBusiness. Ver la nota de arriba: no hay local en
  // Cartagena y declarar uno es lo que Google castiga. El alcance se declara
  // con areaServed, que es lo correcto para un negocio de área de servicio.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/diseno-de-paginas-web-en-cartagena#servicio`,
    name: "Diseño de páginas web en Cartagena de Indias",
    alternateName: [
      "Agencia de diseño web en Cartagena",
      "Páginas web en Cartagena",
      "Diseño web Cartagena",
      "Creación de páginas web en Cartagena de Indias",
    ],
    serviceType: "Diseño y desarrollo de páginas web",
    description:
      "Diseño y programación de páginas web, tiendas online y chatbots de WhatsApp para negocios de Cartagena de Indias, Turbaco y el departamento de Bolívar. Precio publicado y entrega en 5 días.",
    provider: { "@id": `${SITE_URL}/#organization` },
    url: `${SITE_URL}/diseno-de-paginas-web-en-cartagena`,
    areaServed: [
      {
        "@type": "City",
        name: "Cartagena de Indias",
        containedInPlace: {
          "@type": "AdministrativeArea",
          name: "Bolívar",
          containedInPlace: { "@type": "Country", name: "Colombia" },
        },
      },
      {
        "@type": "City",
        name: "Turbaco",
        containedInPlace: { "@type": "AdministrativeArea", name: "Bolívar" },
      },
      { "@type": "AdministrativeArea", name: "Bolívar, Colombia" },
    ],
    offers: [
      {
        "@type": "Offer",
        name: "Página web",
        description: `Página web a la medida, con dominio y correo propio. Entrega en ${PLAZOS.landing.es}.`,
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "COP",
          minPrice: catalogo("landing").desde,
        },
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "Tienda virtual",
        description: `Catálogo, carrito, pagos en línea y cotización de envíos. Entrega en ${PLAZOS.tienda.es}.`,
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "COP",
          minPrice: catalogo("tienda").desde,
        },
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "Chatbot de WhatsApp",
        description: `Automatización conectada directo a Meta, a nombre del negocio. Entrega ${PLAZOS.chatbot.es}.`,
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "COP",
          minPrice: catalogo("chatbot").desde,
        },
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "Auditoría SEO",
        description: "Diagnóstico de por qué una página no aparece en las búsquedas locales de Cartagena.",
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "COP",
          minPrice: catalogo("auditoria").desde,
        },
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "SEO local mensual",
        description: "Trabajo continuo de posicionamiento en búsquedas con ciudad.",
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "COP",
          minPrice: catalogo("seoMes").desde,
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
      <main id="contenido">
        <PageHero
          titular="compacto"
          variante="ciudad"
          idioma="es"
          migas={[{ texto: "Diseño de páginas web en Cartagena" }]}
          eyebrow="Cartagena de Indias · Bolívar"
          titulo={
            <>
              Diseño de páginas web en Cartagena de Indias,{" "}
              <span className="block text-brand">y vivo a 20 kilómetros de allí</span>
            </>
          }
          entradilla="Vivo y trabajo en Turbaco, subiendo. No vengo de otra ciudad a entender el mercado de Cartagena: es donde compro el pan."
          precio="landing"
          indice={<SectionIndex entradas={INDICE} idioma="es" variante="chip" />}
          /* LA ÚNICA PÁGINA DE CIUDAD CON UN CLIENTE DE VERDAD EN LA CIUDAD, y
             por eso el costado del hero no lleva el esquema de la ruta —que es
             lo que llevan las otras seis— sino la tienda que se puede abrir.
             Un dominio que funciona vale más que un dibujo de distancia. */
          aparte={
            <ProofCard
              idioma="es"
              como="h2"
              nombre="Bloomrose"
              categoria="Tienda en línea · Cartagena"
              cuerpo="Tienda de bisutería y accesorios de Cartagena, diseñada y programada completa: catálogo con inventario, carrito, cuentas, pagos en línea y cotización de envíos."
              dominio="bloomroseaccesorios.com"
              url="https://www.bloomroseaccesorios.com"
              estado="produccion"
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
                <a href="#precios">Ver los precios</a>
              </Button>
            </>
          }
        />

        {/* ── La ciudad, con cifras comprobables ─────────────────────── */}
        <section
          id="cifras"
          className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24"
        >
          <Reveal>
            <h2 className="text-balance text-[length:var(--text-display)]">
              Cómo es de verdad el comercio de esta ciudad
            </h2>
            <p className="mt-4 max-w-[62ch] text-[length:var(--text-lead)] leading-relaxed text-ink-soft">
              Mediciones públicas de la Cámara de Comercio y del Registro Mercantil. Explican a
              quién le hablo.
            </p>
          </Reveal>

          {/* Cada cifra con SU fuente al lado y no las tres con una nota común:
              son tres mediciones distintas y juntarlas obligaría a adivinar
              cuál sostiene cuál. */}
          <Cifras
            className="mt-12 lg:grid-cols-3"
            cifras={CIFRAS.map((c) => {
              const n = Number(c.dato.replace(/\./g, "").replace("%", ""));
              return {
                valor: Number.isFinite(n) ? n : 0,
                sufijo: c.dato.includes("%") ? "%" : undefined,
                cuenta: Number.isFinite(n),
                etiqueta: c.de,
                pie: c.fuente,
              };
            })}
          />

          <Reveal>
            <p className="mt-10 max-w-[62ch] text-[length:var(--text-lead)] leading-relaxed text-ink-soft">
              Ese 13% son los hoteles chiquitos de San Diego, los hostales de Getsemaní y los
              restaurantes de barrio. Casi ninguno tiene página propia: viven de un perfil de
              Instagram y de un mensaje que a las nueve de la noche nadie alcanza a contestar.
            </p>
          </Reveal>
        </section>

        {/* ── Para quién es ──────────────────────────────────────────── */}
        <section
          id="negocios"
          className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24"
        >
          <Reveal>
            {/* LOS BARRIOS, COMO TEXTURA. No son un dato nuevo: los nueve
                aparecen escritos en los párrafos de abajo. Puestos aquí en
                mono y en tinta apagada hacen lo que ninguna ilustración de
                banco haría en esta página —decir «esto es de aquí»— antes de
                que se lea una sola línea. `aria-hidden` porque repetirlos a un
                lector de pantalla no añade nada. */}
            {/* En caja normal y no en versalitas: son NOMBRES PROPIOS, y
                ciento cinco caracteres en mayúscula sostenida son un párrafo
                en mayúscula, que es más difícil de leer y que el detector
                marca con razón. «Getsemaní» se lee mejor que «GETSEMANÍ». */}
            <p aria-hidden className="font-mono text-xs text-ink-muted">
              {BARRIOS.join(" · ")}
            </p>
            <h2 className="mt-5 text-balance text-[length:var(--text-display)]">
              Los negocios de Cartagena a los que esto les sirve
            </h2>
          </Reveal>

          <PainGrid
            className="mt-12"
            dolores={PARA_QUIEN.map((p) => ({
              titulo: p.titulo,
              cuerpo: p.desc,
              icono: p.icon,
              enlace: p.link ? { texto: p.link.label, href: p.link.href } : undefined,
            }))}
          />
        </section>

        {/* ── Precios ────────────────────────────────────────────────── */}
        <section
          id="precios"
          className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24"
        >
          <Reveal>
            <p className="jv-eyebrow text-brand">Precios</p>
            <h2 className="mt-4 text-balance text-[length:var(--text-display)]">
              Lo que cuesta, sin que tengas que escribir para preguntar
            </h2>
            <p className="mt-4 max-w-[62ch] leading-relaxed text-ink-soft">
              Precios de partida reales. De ahí para arriba según lo que necesites, y te lo digo
              antes de empezar, no en la factura.
            </p>
          </Reveal>

          <ul className="mt-12 flex flex-col divide-y divide-line border-y border-line">
            {PRECIOS.map((p) => {
              const fila = (
                <>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[length:var(--text-h4)] font-semibold text-ink">
                      {p.q}
                    </span>
                    <span className="mt-1.5 block max-w-[62ch] text-sm leading-relaxed text-ink-soft">
                      {p.d}
                    </span>
                    <span className="mt-2 block font-mono text-xs text-ink-muted">{p.plazo}</span>
                  </span>
                  <span className="flex items-baseline gap-2 font-mono tabular-nums sm:shrink-0">
                    <span className="w-11 text-right text-xs text-ink-muted">desde</span>
                    <span className="w-[7.5rem] text-right text-[length:var(--text-h4)] text-brand">
                      {p.desde.replace("/mes", "")}
                    </span>
                    <span className="w-9 whitespace-nowrap text-xs text-ink-muted">
                      {p.desde.includes("/mes") ? "/mes" : ""}
                    </span>
                  </span>
                </>
              );
              return (
                <li key={p.q} className="max-w-none">
                  {p.href ? (
                    <Link
                      href={p.href}
                      className="focus-ring flex flex-col gap-3 py-5 transition-colors duration-base ease-ps hover:text-brand sm:flex-row sm:items-start sm:justify-between sm:gap-8"
                    >
                      {fila}
                    </Link>
                  ) : (
                    <span className="flex flex-col gap-3 py-5 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
                      {fila}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>

          <Reveal>
            <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
              <p className="max-w-[62ch] leading-relaxed text-ink-soft">
                <strong className="text-ink">
                  La renovación anual cuesta {money(catalogo("renovacion").desde)}
                </strong>{" "}
                y cubre dominio, alojamiento y que la página siga actualizada y en pie. Lo digo acá
                arriba y no en una nota al pie: es el costo que a todo el mundo se le aparece de
                sorpresa al año siguiente.
              </p>
              <p className="max-w-[62ch] leading-relaxed text-ink-soft">
                Los primeros movimientos de posicionamiento se ven{" "}
                <strong className="text-ink">entre el mes 3 y el mes 6</strong>. Nadie te puede
                prometer el primer puesto en Google, ni yo tampoco.
              </p>
            </div>
            <p className="mt-6 max-w-[62ch] text-sm leading-relaxed text-ink-soft">
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

        {/* ── Cómo se hace. El rail cuenta los días y el tramo punteado
             dice que el reloj arranca con TU material, que es la condición
             que más discusiones ahorra después. ───────────────────────── */}
        <section id="proceso" className="border-y border-line bg-tint">
          <div className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24">
            <Reveal>
              <h2 className="text-balance text-[length:var(--text-display)]">
                Cómo se hace, y cuándo arranca el reloj
              </h2>
              <p className="mt-4 max-w-[62ch] leading-relaxed text-ink-soft">
                Antes del día 1 hablamos veinte minutos y te mando la propuesta escrita, con el
                precio adentro. No hay ejecutivo de cuentas: hablas con el que escribe el código.
              </p>
            </Reveal>

            <Reveal delay={80}>
              <RailPlazo
                className="mt-12"
                previo={{
                  etiqueta: "Antes del día 1",
                  texto: "Tus textos, tus fotos y tus precios. El reloj no ha arrancado.",
                }}
                hitos={DIAS}
              />
            </Reveal>

            <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start">
              <Reveal>
                <ListaAcopio
                  almacen="acopio-cartagena"
                  titulo="Lo que tienes que mandarme para que arranque"
                  items={[
                    "Tu logo, en el mejor archivo que tengas",
                    "Los textos, o el visto bueno para que los escriba yo",
                    "Fotos del sitio, del equipo y del trabajo hecho",
                    "Precios o carta, si los vas a publicar",
                    "Horarios reales, sábados y festivos incluidos",
                    "Accesos al dominio y al correo, si ya los tienes",
                  ]}
                />
              </Reveal>

              <Reveal delay={120}>
                <PanelAutonomia
                  titulo="Y esto lo cambias tú, sin escribirme"
                  precio={{
                    etiqueta: "Cambiar un precio de la carta",
                    campo: "$ 38.000",
                    boton: "Guardar",
                  }}
                  archivo={{
                    etiqueta: "Subir la foto del plato",
                    nombre: "cazuela-de-mariscos.jpg",
                    nota: "Listo",
                  }}
                  estado={{
                    etiqueta: "Marcar una reserva",
                    elegida: "Confirmada",
                    nota: "El cliente recibe el aviso",
                  }}
                />
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Desde dónde ────────────────────────────────────────────── */}
        <section
          id="cerca"
          className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24"
        >
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-16">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <h2 className="text-balance text-[length:var(--text-h2)]">
                  Qué significa que esté en Turbaco y no en Bocagrande
                </h2>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <p className="max-w-[62ch] text-[length:var(--text-lead)] leading-relaxed text-ink-soft">
                En persona cubro Cartagena de Indias, Turbaco, Arjona, Turbaná y el resto de
                Bolívar; a distancia, el resto del país. Hablas siempre conmigo, de la primera
                llamada a la entrega, y si llegas a tener alguna inconformidad o un reclamo, te
                responde el mismo que hizo el trabajo.
              </p>

              <RailDistancia
                className="mt-10"
                paradas={[
                  { lugar: "Turbaco, Bolívar", distancia: "0 km", nota: "Aquí vivo y aquí trabajo." },
                  {
                    lugar: "Cartagena de Indias",
                    distancia: "≈ 20 km",
                    nota: "Nos vemos si el proyecto lo pide.",
                  },
                  {
                    lugar: "Barranquilla",
                    distancia: "≈ 120 km",
                    nota: "También trabajo allá, a distancia.",
                  },
                  {
                    lugar: "El resto del país",
                    distancia: "a distancia",
                    nota: "Y lo digo yo primero.",
                  },
                ]}
              />
            </Reveal>
          </div>
        </section>

        {/* ── El trabajo propio de esta zona ─────────────────────────── */}
        <section
          id="trabajo"
          className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24"
        >
          <Reveal>
            <h2 className="text-balance text-[length:var(--text-display)]">
              Lo que he hecho de este lado
            </h2>
            <p className="mt-4 max-w-[62ch] leading-relaxed text-ink-soft">
              Acá no hay logos de relleno. Digo cuál está en línea y se puede abrir, y cuál lo
              construí por iniciativa propia.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {TRABAJO.map((t, i) => (
              <Reveal key={t.nombre} delay={i * 80} className="h-full">
                <ProofCard
                  idioma="es"
                  nombre={t.nombre}
                  categoria={t.categoria}
                  cuerpo={t.cuerpo}
                  dominio={t.dominio}
                  url={t.url}
                  estado={t.estado}
                />
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="mt-8 max-w-[62ch] leading-relaxed text-ink-soft">
              Cómo se arma una tienda como la de Bloomrose está en{" "}
              <Link href="/servicios/tiendas-virtuales" className="jv-enlace font-semibold text-brand">
                creación de tiendas virtuales
              </Link>
              . Lo demás está en{" "}
              <Link href="/#portafolio" className="jv-enlace font-semibold text-brand">
                el portafolio completo
              </Link>
              , con la misma separación: lo que está en producción con dominio propio y lo que no.
            </p>
          </Reveal>
        </section>

        {/* ── Preguntas de acá ───────────────────────────────────────── */}
        <section
          id="preguntas"
          className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24"
        >
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <h2 className="text-balance text-[length:var(--text-h2)]">
                  Lo que me preguntan los negocios de Cartagena
                </h2>
              </div>
            </Reveal>

            <FaqAccordion
              grupos={[
                {
                  titulo: "Lo que me preguntan los negocios de Cartagena",
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
          titulo="Cuéntame qué vendes y en qué parte de Cartagena"
          cuerpo="En veinte minutos sabemos si te sirve, cuánto costaría y en cuánto la tendrías. Si no es una página lo que necesitas, te lo digo y no te cobro por decírtelo."
          siguiente={<NextStep id="tienda" idioma="es" />}
        />
      </main>
      <Footer idioma="es" />
      <WhatsAppButton />
      <BarraMovil idioma="es" />
    </>
  );
}

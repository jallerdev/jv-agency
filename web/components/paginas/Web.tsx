import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Building2,
  KeyRound,
  LayoutTemplate,
  MapPin,
  RefreshCw,
  Search,
  Smartphone,
} from "lucide-react";

import { WEB, WEB_CERCA, WEB_FAQ, WEB_FAQ_GRUPOS, WEB_PRUEBAS } from "@/content/paginas/web";
import type { Idioma } from "@/content/types";
import { enlaceReal } from "@/lib/rutas";
import { SITE_URL } from "@/lib/site";
import { PRICES, money, PISOS } from "@/lib/quote";
import { BUSINESS } from "@/lib/business";
import { LuzPuntero } from "@/components/LuzPuntero";
import { cn } from "@/lib/utils";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BarraMovil } from "@/components/BarraMovil";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { sinPendientes } from "@/components/Pendiente";
import { BotonCuentame } from "@/components/Cuentame";
import { PageHero } from "@/components/kit/PageHero";
import { ContrastBlock } from "@/components/kit/ContrastBlock";
import { PainGrid } from "@/components/kit/PainGrid";
import { InOutLedger } from "@/components/kit/InOutLedger";
import { ProofCard } from "@/components/kit/ProofCard";
import { FaqAccordion } from "@/components/kit/FaqAccordion";
import { FinalCTA, NextStep } from "@/components/kit/FinalCTA";
import { SectionIndex } from "@/components/kit/SectionIndex";
import { type NodoArbol } from "@/components/visuales/ArbolDecision";
import { SelectorFormato } from "@/components/visuales/SelectorFormato";
import { CincoDias } from "@/components/visuales/CincoDias";
import { ListaAcopio } from "@/components/visuales/ListaAcopio";
import { RailDistancia } from "@/components/visuales/RailDistancia";

/**
 * DISEÑO DE PÁGINAS WEB, EN LOS DOS IDIOMAS
 * ──────────────────────────────────────────────────────────────────────────
 * Un componente para `/servicios/diseno-de-paginas-web` y
 * `/en/services/web-design`.
 *
 * LOS NÚMEROS NO SE ESCRIBEN A MANO EN NINGÚN SITIO. Salen de `lib/quote.ts`,
 * que es la fuente de verdad del cotizador interno, y el contenido los pide
 * con marcadores —`{piso}`, `{ecom}`, `{marca}`— que se sustituyen aquí. Antes
 * el 2.500.000 estaba escrito a mano en dos sitios de esta misma página.
 *
 * QUÉ CAMBIÓ EN LA FASE 2, Y POR QUÉ
 * ----------------------------------
 * Era la página más larga del sitio con catorce bloques del mismo peso: el
 * selector de formato, la lista de acopio, el riel de plazo y el de distancia
 * se leían como cuatro párrafos más. Ahora:
 *
 * · El argumento —precio, plazo y nombre publicados— abre la página en el
 *   ticket del hero y se demuestra en una tabla de tres filas, en vez de
 *   contarse en dos párrafos que hay que reconstruir leyendo.
 * · Los seis problemas dejaron de ser seis tarjetas con azulejo de icono y
 *   pasaron al bento asimétrico del kit: los dos primeros pesan el doble
 *   porque son los dos que más pasan.
 * · El árbol y las tres tarjetas de formato ya se hablan: el árbol destaca la
 *   que te salió y atenúa las otras dos.
 * · El riel de plazo se cambió por la pieza firma, que cuenta lo mismo pero
 *   enseñándolo. Es UNA sola pieza firma, y por eso todo lo demás es sobrio.
 * · Las quince preguntas van agrupadas por tema y en `<details>`: servidas en
 *   el HTML, abiertas o cerradas.
 */

/** Alias locales de los pisos publicados, para no repetir `PISOS.` doce veces. */
const PISO_LANDING = PISOS.landing;
const PISO_ECOM = PISOS.tienda;
const PISO_AUDITORIA = PISOS.auditoria;
const PISO_SEO_MES = PISOS.seoMes;
const RENOVACION = PISOS.renovacion;

const GLIFOS = {
  movil: Smartphone,
  rehacer: RefreshCw,
  llave: KeyRound,
  landing: LayoutTemplate,
  empresa: Building2,
  buscar: Search,
} as const;

/** Sustituye los marcadores de precio del contenido por el número de verdad. */
function conPrecios(texto: string, idioma: Idioma) {
  return texto
    .replaceAll("{piso}", money(PISO_LANDING, idioma))
    .replaceAll("{ecom}", money(PISO_ECOM, idioma))
    .replaceAll("{auditoria}", money(PISO_AUDITORIA, idioma))
    .replaceAll("{seoMes}", money(PISO_SEO_MES, idioma))
    .replaceAll("{marca}", money(PRICES.marca.nada, idioma))
    .replaceAll("{mantenimiento}", money(PRICES.mantenimiento.basico, idioma))
    .replaceAll("{renovacion}", money(RENOVACION, idioma));
}

/**
 * El árbol que encabeza los precios. Contesta la pregunta que de verdad trae
 * el visitante —«¿cuál de los tres pido?»— y su primera rama lo saca honesto
 * hacia tiendas virtuales, que era un párrafo entero de desvío.
 *
 * Cada resultado lleva su `clave`: es lo que permite que la rejilla de abajo
 * señale la tarjeta que salió en vez de dejar al visitante buscándola.
 */
function arbolDe(idioma: Idioma): NodoArbol {
  const a = WEB.arbol;
  const es = idioma === "es";

  /**
   * El botón del resultado. Lleva a la agenda con el servicio ya marcado y la
   * nota escrita, así que quien contestó tres preguntas no tiene que volver a
   * contarlas. `servicio=web` es el id real de `lib/services.ts`; el
   * formulario lo valida contra su propia lista y descarta cualquier otro.
   */
  const agendar = (formato: string, detalle: string) => {
    const nota = WEB.notaSelector[idioma]
      .replace("{formato}", formato)
      .replace("{detalle}", detalle);
    const base = enlaceReal(es ? "/agendar" : "/en/book-a-call");
    return {
      texto: WEB.ctaPrincipal[idioma],
      href: `${base}?servicio=web&nota=${encodeURIComponent(nota)}`,
    };
  };

  return {
    tipo: "pregunta",
    pregunta: a.p1[idioma],
    opciones: [
      {
        etiqueta: a.p1si[idioma],
        siguiente: {
          tipo: "resultado",
          clave: "tienda",
          titulo: a.tienda.titulo[idioma],
          detalle: a.tienda.detalle[idioma],
          pie: `${WEB.desde[idioma]} ${money(PISO_ECOM, idioma)} · ${a.tienda.semanas[idioma]}`,
          /* La tienda sale de esta página, así que el botón principal es el
             que lleva a su página; la agenda queda de segunda. Al revés sería
             citar a una llamada sobre un servicio que se explica en otro
             sitio. */
          accion: {
            texto: a.tienda.enlace[idioma],
            href: enlaceReal(a.tienda.href[idioma]),
          },
          enlace: agendar(
            a.tienda.titulo[idioma],
            `${WEB.desde[idioma]} ${money(PISO_ECOM, idioma)} · ${a.tienda.semanas[idioma]}`,
          ),
        },
      },
      {
        etiqueta: a.p1no[idioma],
        siguiente: {
          tipo: "pregunta",
          pregunta: a.p2[idioma],
          opciones: [
            {
              etiqueta: a.p2si[idioma],
              siguiente: {
                tipo: "resultado",
                clave: "rediseno",
                titulo: a.rediseno.titulo[idioma],
                detalle: a.rediseno.detalle[idioma],
                pie: a.rediseno.pie[idioma],
                accion: agendar(a.rediseno.titulo[idioma], a.rediseno.pie[idioma]),
              },
            },
            {
              etiqueta: a.p2no[idioma],
              siguiente: {
                tipo: "pregunta",
                pregunta: a.p3[idioma],
                opciones: [
                  {
                    etiqueta: a.p3uno[idioma],
                    siguiente: {
                      tipo: "resultado",
                      clave: "landing",
                      titulo: a.landing.titulo[idioma],
                      detalle: a.landing.detalle[idioma],
                      pie: `${WEB.desde[idioma]} ${money(PISO_LANDING, idioma)} · ${a.landing.dias[idioma]}`,
                      accion: agendar(
                        a.landing.titulo[idioma],
                        `${WEB.desde[idioma]} ${money(PISO_LANDING, idioma)} · ${a.landing.dias[idioma]}`,
                      ),
                    },
                  },
                  {
                    etiqueta: a.p3todo[idioma],
                    siguiente: {
                      tipo: "resultado",
                      clave: "corporativa",
                      titulo: a.corporativa.titulo[idioma],
                      detalle: a.corporativa.detalle[idioma],
                      pie: `${WEB.desde[idioma]} ${money(PRICES.base.corp, idioma)} · ${a.corporativa.semanas[idioma]}`,
                      accion: agendar(
                        a.corporativa.titulo[idioma],
                        `${WEB.desde[idioma]} ${money(PRICES.base.corp, idioma)} · ${a.corporativa.semanas[idioma]}`,
                      ),
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    ],
  };
}

/** El orden de las tarjetas de formato, con la clave que el árbol devuelve. */
const CLAVES_FORMATO = ["landing", "corporativa", "rediseno"] as const;

/**
 * Las capturas de los proyectos que ya están en el portafolio del home, con la
 * proporción REAL del archivo.
 *
 * La proporción no es un detalle: la tarjeta grande enseña la captura entera, y
 * con un `aspect` inventado —16/10 sobre una imagen de 1,72— `object-cover`
 * recortaba los lados y el sitio de Bloomrose aparecía con el texto cortado por
 * el margen, como si la maqueta estuviera rota.
 */
const CAPTURAS: Record<string, { src: string; ratio: string }> = {
  Bloomrose: { src: "/work/bloomrose.webp", ratio: "2000/1160" },
  "HalcónOS y Hummik": { src: "/work/halconos.webp", ratio: "1600/1000" },
  "HalcónOS and Hummik": { src: "/work/halconos.webp", ratio: "1600/1000" },
};

export function PaginaWeb({ idioma, ruta }: { idioma: Idioma; ruta: string }) {
  const url = `${SITE_URL}${ruta}`;
  const es = idioma === "es";
  /* El piso de cada formato: landing y corporativa lo publican; el rediseño
     no tiene piso publicable —cuesta lo que cueste el sitio que queda debajo—
     y poner una cifra ahí sería inventarla. */
  const pisos = [PISO_LANDING, PRICES.base.corp, null];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#servicio`,
    name: WEB.badge[idioma],
    serviceType: es ? "Diseño y desarrollo de páginas web" : "Web design and development",
    description: WEB.entradilla[idioma],
    inLanguage: idioma,
    provider: { "@id": `${SITE_URL}/#organization` },
    url,
    areaServed: [
      { "@type": "Country", name: "Colombia" },
      {
        "@type": "City",
        name: "Cartagena de Indias",
        containedInPlace: { "@type": "AdministrativeArea", name: "Bolívar" },
      },
      { "@type": "AdministrativeArea", name: "Bolívar, Colombia" },
    ],
    offers: [
      {
        "@type": "Offer",
        name: es ? "Página web" : "Website",
        description: es
          ? "Página web a la medida, con diseño propio, dominio y correo corporativo. Entrega en 5 días."
          : "A custom website, with original design, domain and business email. Delivered in 5 days.",
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "COP",
          minPrice: PISO_LANDING,
        },
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: es ? "Renovación anual" : "Yearly renewal",
        description: es
          ? "Renovación anual del dominio, el alojamiento y el mantenimiento del sitio en pie."
          : "Yearly renewal of the domain, the hosting and keeping the site standing.",
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "COP",
          price: RENOVACION,
        },
        availability: "https://schema.org/InStock",
      },
    ],
  };

  /* Las quince preguntas, repartidas en sus cinco bloques. El reparto lo lleva
     el propio contenido (`grupo`), así que añadir una pregunta es escribirla
     con su grupo y nada más. Un grupo que se quede sin preguntas no se pinta. */
  const faqs = sinPendientes(
    WEB_FAQ.map((f) => ({
      q: f.q[idioma],
      a: conPrecios(f.a[idioma], idioma),
      grupo: f.grupo,
      verify: f.verify,
    })),
  );
  const gruposFaq = WEB_FAQ_GRUPOS.map((g) => ({
    titulo: g.titulo[idioma],
    items: faqs.filter((f) => f.grupo === g.clave),
  })).filter((g) => g.items.length > 0);

  /* Los cinco pasos de la pieza firma son el previo y los cuatro hitos: los
     mismos que ya estaban escritos, no una lista nueva. */
  const pasosFirma = [WEB.previo, ...WEB.hitos].map((p, i) => ({
    etiqueta: p.etiqueta[idioma],
    texto: p.texto[idioma],
    pantalla: WEB.firma.pantallas[idioma][i],
  }));

  const indice = [
    { id: "diferencia", texto: es ? "Por qué yo" : "Why me" },
    { id: "problemas", texto: es ? "Para quién es" : "Who it's for" },
    { id: "precio", texto: es ? "Precio y plazo" : "Price and timeline" },
    { id: "incluye", texto: es ? "Qué entra" : "What's included" },
    { id: "arranque", texto: es ? "Para arrancar" : "To get started" },
    { id: "cinco-dias", texto: es ? "Los cinco días" : "The five days" },
    { id: "trabajo", texto: es ? "El trabajo" : "The work" },
    { id: "cerca", texto: es ? "Dónde estoy" : "Where I am" },
    { id: "preguntas", texto: es ? "Preguntas" : "Questions" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header idioma={idioma} />
      <main id="contenido">
        <PageHero
          titular="compacto"
          variante="servicio"
          idioma={idioma}
          migas={[{ texto: WEB.badge[idioma] }]}
          /* Sin antetítulo: diría «Diseño de páginas web» tres centímetros
             encima de un H1 que dice «Diseño de páginas web». La miga ya lo
             sitúa. */
          titulo={
            <>
              {/* El espacio explícito importa: sin él, el textContent del h1
                  que lee un rastreador queda «páginas webpara». */}
              {WEB.titulo[idioma]}{" "}
              <span className="block text-brand">{WEB.tituloAcento[idioma]}</span>
            </>
          }
          entradilla={WEB.entradilla[idioma]}
          indice={<SectionIndex entradas={indice} idioma={idioma} variante="chip" />}
          /* EL TICKET, EN LA COLUMNA DE LA DERECHA Y NO EN UNA LÍNEA.
             Son los tres datos que la sección siguiente demuestra que casi
             nadie publica juntos, y van con las mismas etiquetas que las tres
             columnas de esa tabla: el hero los dice, la tabla los contrasta.
             De paso, la mitad derecha del hero deja de estar vacía a 1.920. */
          aparte={<TicketPublicado idioma={idioma} />}
          acciones={
            <>
              <Button size="lg" variant="primary" asChild>
                <Link href={enlaceReal(es ? "/agendar" : "/en/book-a-call")}>
                  {WEB.ctaPrincipal[idioma]} <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#precio">{WEB.ctaSecundario[idioma]}</a>
              </Button>
            </>
          }
        />

        {/* ── El diferenciador, con su tabla ──────────────────────────── */}
        <section id="diferencia" className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24">
          <ContrastBlock
            etiquetaComun={es ? "Lo que te vas a encontrar" : "What you'll run into"}
            comun={WEB.diferenciador.parrafo1[idioma]}
            etiquetaPropio={WEB.tabla.titulo[idioma]}
            propio={`${WEB.diferenciador.titulo[idioma]} ${WEB.diferenciador.acento[idioma]}`}
            /* Esta frase ERA el h2 de su sección antes de la Fase 2 y lo sigue
               siendo: pintarla como párrafo le quitaba un nivel al esquema de
               títulos de una página que vive de aparecer en Google. */
            como="h2"
          >
            <TablaQuienPublica idioma={idioma} />
            <p className="mt-8 max-w-[52ch] leading-relaxed text-ink-soft">
              <strong className="text-ink">{WEB.diferenciador.fuerte[idioma]}</strong>
              {WEB.diferenciador.parrafo2[idioma]}
            </p>
          </ContrastBlock>
        </section>

        {/* ── Para quién es: los seis problemas ───────────────────────── */}
        <section id="problemas" className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24">
          <Reveal>
            <h2 className="text-balance text-[length:var(--text-display)]">
              {WEB.paraQuienTitulo[idioma]}
            </h2>
            <p className="mt-4 max-w-[52ch] text-[length:var(--text-lead)] leading-relaxed text-ink-soft">
              {WEB.paraQuienEntradilla[idioma]}
            </p>
          </Reveal>

          <PainGrid
            className="mt-12"
            dolores={WEB.paraQuien.map((p) => ({
              titulo: p.titulo[idioma],
              cuerpo: p.cuerpo[idioma],
              icono: GLIFOS[p.icono as keyof typeof GLIFOS],
              enlace: p.enlace
                ? {
                    texto: p.enlace.texto[idioma],
                    href: enlaceReal(p.enlace.href[idioma]),
                  }
                : undefined,
            }))}
          />
        </section>

        {/* ── Precio y plazo ─────────────────────────────────────────── */}
        <section id="precio" className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24">
          <Reveal>
            <p className="jv-eyebrow text-brand">{WEB.badgePrecio[idioma]}</p>
            <h2 className="mt-4 text-balance text-[length:var(--text-display)]">
              {WEB.formatosTitulo[idioma]}
            </h2>
            <p className="mt-4 max-w-[52ch] text-[length:var(--text-lead)] leading-relaxed text-ink-soft">
              {WEB.formatosEntradillaAntes[idioma]}
              <Link
                href={enlaceReal(es ? "/precios" : "/en/pricing")}
                className="jv-enlace font-semibold text-brand"
              >
                {WEB.formatosEntradillaEnlace[idioma]}
              </Link>
              .
            </p>
          </Reveal>

          <SelectorFormato
            className="mt-12"
            idioma={idioma}
            raiz={arbolDe(idioma)}
            formatos={WEB.formatos.map((f, i) => ({
              clave: CLAVES_FORMATO[i],
              nombre: f.nombre[idioma],
              tambien: `${WEB.tambien[idioma]} ${f.tambien[idioma]}`,
              paginas: f.paginas[idioma],
              incluye: f.incluye[idioma],
              pie: pisos[i]
                ? `${WEB.desde[idioma]} ${money(pisos[i]!, idioma)}`
                : WEB.segunLoQueHaya[idioma],
            }))}
            tienda={{
              clave: "tienda",
              nombre: WEB.arbol.tienda.titulo[idioma],
              cuerpo: WEB.arbol.tienda.detalle[idioma],
              pie: `${WEB.desde[idioma]} ${money(PISO_ECOM, idioma)} · ${WEB.arbol.tienda.semanas[idioma]}`,
              enlace: {
                texto: WEB.arbol.tienda.enlace[idioma],
                href: enlaceReal(WEB.arbol.tienda.href[idioma]),
              },
            }}
          />
        </section>

        {/* ── Qué entra y qué no ─────────────────────────────────────── */}
        <section id="incluye" className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24">
          <Reveal>
            <h2 className="text-balance text-[length:var(--text-display)]">
              {WEB.comparador.incluye[idioma]}
            </h2>
          </Reveal>

          <InOutLedger
            className="mt-12"
            idioma={idioma}
            titulos={{
              dentro: WEB.comparador.incluye[idioma],
              fuera: `${WEB.comparador.noIncluyeAntes[idioma]}${WEB.comparador.noIncluyeAcento[idioma]}${WEB.comparador.noIncluyeDespues[idioma]}`,
            }}
            dentro={WEB.incluyeSiempre[idioma].map((texto) => ({ texto }))}
            fuera={WEB.noIncluye.map((n) => ({
              texto: conPrecios(n.texto[idioma], idioma),
              sello: n.quien[idioma],
            }))}
            remate={WEB.comparador.nota[idioma]}
          />
        </section>

        {/* ── Qué necesito para arrancar ─────────────────────────────── */}
        <section id="arranque" className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24">
          <Reveal>
            <h2 className="text-balance text-[length:var(--text-display)]">
              {WEB.procesoTitulo[idioma]}
            </h2>
            <p className="mt-4 max-w-[52ch] text-[length:var(--text-lead)] leading-relaxed text-ink-soft">
              {WEB.procesoEntradilla[idioma]}
            </p>
          </Reveal>

          <ListaAcopio
            className="mt-12 max-w-2xl"
            almacen={`acopio-paginas-web-${idioma}`}
            titulo={WEB.acopio.titulo[idioma]}
            nota={WEB.acopio.nota[idioma]}
            items={[...WEB.acopio.items[idioma]]}
            contador={es ? "{listos} de {total} listos" : "{listos} of {total} ready"}
          />
        </section>

        {/* ── La pieza firma ─────────────────────────────────────────── */}
        <section
          id="cinco-dias"
          className="border-y border-line bg-tint"
        >
          <div className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-28">
            <Reveal>
              <h2 className="text-balance text-[length:var(--text-display)]">
                {WEB.firma.titulo[idioma]}
              </h2>
              <p className="mt-4 max-w-[52ch] text-[length:var(--text-lead)] leading-relaxed text-ink-soft">
                {WEB.firma.entradilla[idioma]}
              </p>
            </Reveal>

            <CincoDias
              className="mt-14"
              idioma={idioma}
              pasos={pasosFirma}
              dominio={WEB.firma.dominioEjemplo[idioma]}
              enLinea={WEB.firma.enLinea[idioma]}
            />
          </div>
        </section>

        {/* ── El trabajo que respalda esto ───────────────────────────── */}
        <section id="trabajo" className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24">
          <Reveal>
            <h2 className="text-balance text-[length:var(--text-display)]">
              {WEB_PRUEBAS.titulo[idioma]}
            </h2>
            <p className="mt-4 max-w-[52ch] text-[length:var(--text-lead)] leading-relaxed text-ink-soft">
              {WEB_PRUEBAS.entradilla[idioma]}
            </p>
          </Reveal>

          {/* DOS COLUMNAS, NO TRES.
              Con tres y la primera a doble ancho, la tercera ficha caía sola
              en una fila nueva y dejaba dos huecos a su derecha: una escalera
              en vez de una rejilla. Con una columna ancha y otra estrecha
              —la ancha para lo que se puede abrir y mirar, la estrecha para
              las otras dos apiladas— las dos llegan abajo a la vez y la
              jerarquía se sigue leyendo: tamaño, captura y borde continuo
              frente a borde punteado. */}
          <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:items-start">
            {WEB_PRUEBAS.fichas.slice(0, 1).map((f) => (
              <Reveal key={f.nombre.es} className="h-full">
                {fichaProof(f, idioma, es, true)}
              </Reveal>
            ))}

            <div className="grid gap-5">
              {WEB_PRUEBAS.fichas.slice(1).map((f, i) => (
                <Reveal key={f.nombre.es} delay={(i + 1) * 80} className="h-full">
                  {fichaProof(f, idioma, es, false)}
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Dónde estoy y a dónde llego ────────────────────────────── */}
        <section id="cerca" className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24">
          <Reveal>
            <div className="jv-card p-7 md:p-10">
              <h2 className="text-balance text-[length:var(--text-h2)]">
                {WEB_CERCA.titulo[idioma]}
              </h2>
              <p className="mt-5 max-w-[52ch] leading-relaxed text-ink-soft">
                {WEB_CERCA.cuerpoAntes[idioma]}
                <strong className="text-ink">{WEB_CERCA.lugar[idioma]}</strong>
                {WEB_CERCA.cuerpoDespues[idioma]}
              </p>

              {/* La ventaja y lo que la distancia cambia, en el mismo dibujo.
                  No es un mapa a propósito: el riel termina diciendo que se
                  trabaja con todo el país y que lo que la distancia decide es
                  si nos vemos, no si tomo el proyecto. */}
              <RailDistancia idioma={idioma} className="mt-8" />

              <ul className="mt-8 flex flex-wrap gap-3">
                {WEB_CERCA.ciudades.map((c) => (
                  <li key={c.href}>
                    <Link
                      href={c.href}
                      className="jv-chip jv-chip-off min-h-11 gap-2 text-sm hover:border-brand hover:text-brand"
                    >
                      <MapPin className="h-4 w-4" strokeWidth={2} aria-hidden />
                      {c.texto[idioma]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </section>

        {/* ── Preguntas, por tema ────────────────────────────────────── */}
        <section id="preguntas" className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
            <Reveal>
              {/* El encabezado se queda a la vista mientras se recorren las
                  quince: en una lista tan larga, saber dónde estás vale más
                  que recuperar treinta píxeles de aire. */}
              <div className="lg:sticky lg:top-28">
                {/* En su columna de 22rem, el tamaño `display` partía el
                    titular en tres renglones de una palabra. */}
                <h2 className="text-balance text-[length:var(--text-h2)]">
                  {WEB.faqTitulo[idioma]}
                </h2>
                <p className="mt-4 leading-relaxed text-ink-soft">{WEB.faqEntradilla[idioma]}</p>
              </div>
            </Reveal>

            <FaqAccordion grupos={gruposFaq} />
          </div>
        </section>

        <FinalCTA
          idioma={idioma}
          titulo={WEB.cierre.titulo[idioma]}
          cuerpo={WEB.cierre.cuerpo[idioma]}
          siguiente={<NextStep id="tienda" idioma={idioma} />}
        />

        <div className="mx-auto max-w-[1280px] px-6 pb-20 md:px-12">
          <BotonCuentame />
        </div>
      </main>
      <Footer idioma={idioma} />
      <WhatsAppButton idioma={idioma} />
      <BarraMovil idioma={idioma} />
    </>
  );
}

/**
 * Una ficha del bloque de trabajo. Vive aparte porque la rejilla la pinta en
 * dos sitios —la columna ancha y la estrecha— y duplicar diez líneas de JSX
 * es cómo dos tarjetas que deberían ser la misma acaban divergiendo.
 */
function fichaProof(
  f: (typeof WEB_PRUEBAS.fichas)[number],
  idioma: Idioma,
  es: boolean,
  destacada: boolean,
) {
  const captura = CAPTURAS[f.nombre[idioma]];
  /* La etiqueta del contenido dice «En producción · Cartagena», y la tarjeta
     ya pinta «En producción» con su punto. Se queda la mitad que añade algo;
     si no la hay, no va segunda pastilla. */
  const matiz = f.etiqueta[idioma].split("·")[1]?.trim();

  return (
    <ProofCard
      idioma={idioma}
      nombre={f.nombre[idioma]}
      categoria={matiz}
      cuerpo={f.cuerpo[idioma]}
      dominio={f.dominio}
      url={f.url}
      estado={f.url ? "produccion" : "estudio"}
      destacada={destacada}
    >
      {captura && (
        <div
          className={cn("relative border-b border-line bg-surface")}
          /* La grande enseña la captura entera y por eso lleva SU proporción;
             la mediana enseña solo la franja de arriba, porque en una columna
             estrecha una captura completa empuja el texto fuera de la
             pantalla. Va en `style` y no en una clase porque la proporción
             sale del archivo: una clase de Tailwind con un valor dinámico no
             existe en la hoja compilada. */
          style={{ aspectRatio: destacada ? captura.ratio.replace("/", " / ") : "16 / 7" }}
        >
          <Image
            src={captura.src}
            alt={
              es
                ? `Captura del sitio de ${f.nombre.es}`
                : `Screenshot of the ${f.nombre.en} site`
            }
            fill
            sizes={destacada ? "(min-width: 1024px) 740px, 100vw" : "(min-width: 1024px) 500px, 100vw"}
            className="object-cover object-top"
          />
        </div>
      )}
    </ProofCard>
  );
}

/**
 * EL TICKET DEL HERO
 * ──────────────────────────────────────────────────────────────────────────
 * Los tres datos que la sección siguiente demuestra que casi nadie publica
 * juntos, con las mismas etiquetas que las tres columnas de esa tabla: el hero
 * los dice, la tabla los contrasta.
 *
 * LA PRIMERA VERSIÓN ERA UNA FICHA DE ESPECIFICACIONES —tres renglones de
 * etiqueta y valor, los tres del mismo peso— y se leía como el reverso de una
 * caja de electrodomésticos. El precio es el argumento de la página: aquí
 * manda él, a tamaño de titular, y el plazo y el nombre son la letra que lo
 * acompaña. Un solo dato grande y dos pequeños es jerarquía; tres medianos no
 * es ninguna.
 *
 * `tabular-nums` no es capricho: sin él, los dos puntos de millar de 850.000
 * bailan respecto a los de cualquier otro precio del sitio.
 */
function TicketPublicado({ idioma }: { idioma: Idioma }) {
  const filas = [
    { k: WEB.tabla.columnas[idioma][1], v: WEB.arbol.landing.dias[idioma] },
    { k: WEB.tabla.columnas[idioma][2], v: BUSINESS.founderName },
  ];

  return (
    /* El mismo mueble que la credencial de Meta del home —`jv-cred` monta el
       filete que gira, el destello que cruza y la luz que sigue al puntero—,
       con el lomo encuadernado y el guilloché de la esquina. Es la pieza mejor
       resuelta del sitio y esta es su hermana: las dos dicen «esto está
       publicado y lo sostengo».

       LO QUE NO SE COPIA ES EL SELLO. Un medallón con su troquel acredita una
       verificación de un tercero; un precio no se verifica, se publica. Aquí
       el sello es el número. */
    <aside className="jv-cred relative overflow-hidden rounded-3xl border border-line bg-surface bg-gradient-to-br from-surface via-surface to-white/[0.06] p-6 pl-7 text-left sm:p-8 sm:pl-10">
      <LuzPuntero />

      <span
        aria-hidden
        className="absolute inset-y-0 left-0 z-[3] w-[3px] bg-gradient-to-b from-brand-300 via-brand to-brand-700"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[repeating-radial-gradient(circle_at_50%_50%,rgba(232,98,63,0.07)_0_1px,transparent_1px_10px)] [-webkit-mask-image:radial-gradient(circle_at_50%_50%,#000_38%,transparent_72%)] [mask-image:radial-gradient(circle_at_50%_50%,#000_38%,transparent_72%)]"
      />

      <div className="relative z-[3]">
        <p className="jv-eyebrow text-accent-ink">{WEB.badgePrecio[idioma]}</p>

        <p className="mt-6 jv-eyebrow text-ink-muted">{WEB.tabla.columnas[idioma][0]}</p>
        <p className="mt-2.5 flex flex-wrap items-baseline gap-x-2">
          <span className="text-sm text-ink-soft">{WEB.desde[idioma]}</span>
          <span className="font-display text-[clamp(2rem,3.2vw,2.75rem)] font-semibold leading-none tabular-nums tracking-[-0.03em] text-ink">
            {money(PISO_LANDING, idioma)}
          </span>
        </p>

        <dl className="jv-rule mt-6 grid gap-3 pt-5">
          {filas.map((f) => (
            <div key={f.k} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <dt className="jv-eyebrow text-ink-muted">{f.k}</dt>
              <dd className="font-mono text-sm text-ink">{f.v}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-5 text-sm text-ink-soft">{WEB.ticketNota[idioma]}</p>
      </div>
    </aside>
  );
}

/**
 * LA TABLA DE «QUIÉN PUBLICA QUÉ»
 *
 * Tres filas por tres columnas, y ni un dato que no esté ya en el párrafo de
 * al lado. Las dos primeras filas solo pueden decir sí, no o «no lo dice»:
 * cualquier otra cosa sería una afirmación sobre terceros que nadie puede
 * sostener. La tercera fila sí lleva el número y el plazo, porque son los de
 * `lib/quote.ts` y se publican en todo el sitio.
 *
 * En móvil no se vuelve tarjetas: se deja rodar en horizontal dentro de su
 * propio contenedor. Una tabla de tres columnas cortas cabe casi siempre, y
 * partirla en tres bloques verticales destruye justo la comparación que es su
 * único motivo de existir.
 */
function TablaQuienPublica({ idioma }: { idioma: Idioma }) {
  const t = WEB.tabla;
  const plazo = WEB.arbol.landing.dias[idioma];
  const piso = money(PISO_LANDING, idioma);

  const celda = (clave: string, fila: (typeof t.filas)[number]) => {
    if (clave === "si") return t.si[idioma];
    if (clave === "no") return t.no[idioma];
    if (clave === "calla") return t.calla[idioma];
    if (clave === "cita") return fila.cita?.[idioma] ?? t.si[idioma];
    if (clave === "piso") return piso;
    if (clave === "plazo") return plazo;
    return "Luis Jaller";
  };

  return (
    <div className="-mx-6 overflow-x-auto px-6 md:mx-0 md:px-0">
      <table className="w-full min-w-[34rem] border-collapse text-left">
        <caption className="sr-only">{t.titulo[idioma]}</caption>
        <thead>
          <tr className="border-b border-line">
            <th scope="col" className="py-3 pr-4 jv-eyebrow text-ink-muted">
              <span className="sr-only">{idioma === "es" ? "Quién" : "Who"}</span>
            </th>
            {t.columnas[idioma].map((c) => (
              <th key={c} scope="col" className="py-3 pr-4 jv-eyebrow text-ink-muted">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {t.filas.map((f) => (
            <tr
              key={f.quien.es}
              className={cn("border-b border-line last:border-b-0", f.propia && "text-ink")}
            >
              <th
                scope="row"
                className={cn(
                  "py-4 pr-4 text-sm font-semibold",
                  f.propia ? "text-brand" : "text-ink-soft",
                )}
              >
                {f.quien[idioma]}
              </th>
              {f.celdas.map((c, i) => (
                <td
                  key={i}
                  className={cn(
                    "py-4 pr-4 text-sm",
                    f.propia ? "font-semibold text-ink" : "text-ink-muted",
                  )}
                >
                  {celda(c, f)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

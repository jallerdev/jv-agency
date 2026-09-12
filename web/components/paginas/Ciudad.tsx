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
import { FaqAccordion } from "@/components/kit/FaqAccordion";
import { FinalCTA, NextStep } from "@/components/kit/FinalCTA";
import { CasillaVacia } from "@/components/visuales/CasillaVacia";
import { Comparador } from "@/components/visuales/Comparador";
import { RutaDesdeTurbaco } from "@/components/visuales/RutaDesdeTurbaco";
import { SITE_URL } from "@/lib/site";
import { BUSINESS } from "@/lib/business";
import { CATALOGO, INCLUIDO_SIEMPRE, PISOS, money } from "@/lib/quote";
import type { Ciudad } from "@/content/ciudades/tipos";

/**
 * EL ESQUELETO DE UNA PÁGINA DE CIUDAD
 * ──────────────────────────────────────────────────────────────────────────
 * Mismo orden de secciones y mismo ritmo de bandas en las cuatro. Lo que
 * cambia entre hermanas es el MATERIAL, y el material vive en
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
 * SCHEMA: `Service`, nunca `LocalBusiness`. No hay local en ninguna de estas
 * ciudades y fingir una dirección es exactamente lo que Google castiga acá.
 *
 * QUÉ CAMBIÓ EN LA FASE 4, Y POR QUÉ
 * ----------------------------------
 * Estas cuatro páginas se quedaron con el sistema visual ANTERIOR: `text-metal`,
 * `bg-accent-quiet`, `text-primary-dark`, `banda`, azulejos de icono de 48 px.
 * Nacieron después del rediseño en naranja y nadie las volvió a mirar, así que
 * eran las cuatro únicas del sitio que no se parecían al resto. Ahora usan el
 * mismo kit que las de servicio:
 *
 * · Hero asimétrico con la pieza firma al lado —la RUTA desde Turbaco hasta
 *   esta ciudad, que se traza y cuenta los kilómetros—. El encargo pedía un
 *   mapa; el motivo de no dibujarlo está escrito en `RutaDesdeTurbaco.tsx`.
 * · Las cifras del registro mercantil cuentan una vez al entrar en vista, con
 *   su fuente citada debajo como corresponde a un dato de tercero.
 * · Las seis líneas de precio son filas con el mueble de /precios, no seis
 *   naipes; el trabajo abierto usa `ProofCard`, con su cuarta casilla vacía; y
 *   las preguntas van en `<details>`.
 */

/**
 * Las seis tarjetas salen del CATÁLOGO de `lib/quote.ts`: número y plazo, los
 * dos. Los plazos estaban escritos a mano aquí y decían «3 semanas» para la
 * tienda cuando su propia página dice «3 a 5», que es el plazo que se cumple.
 *
 * `plazoPropio` es para las dos líneas que no tienen entrega —el SEO mensual y
 * la renovación—: el catálogo las declara `null` porque poner un número ahí
 * sería prometer un resultado, y la fila necesita igual una línea que decir.
 */
const PLAZO_PROPIO: Partial<Record<string, string>> = {
  seoMes: "trabajo mensual",
  renovacion: "una vez al año",
};

const DESC_CIUDAD: Partial<Record<string, string>> = {
  renovacion: "Dominio, hosting, certificado y respaldos del sitio ya entregado.",
};

const PRECIOS = CATALOGO.filter((s) => s.id !== "software" && s.id !== "chatbotMes").map((s) => ({
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
  { href: "/diseno-de-paginas-web-en-cartagena", label: "Cartagena" },
  { href: "/diseno-de-paginas-web-en-barranquilla", label: "Barranquilla" },
  { href: "/diseno-de-paginas-web-en-bogota", label: "Bogotá" },
  { href: "/diseno-de-paginas-web-en-medellin", label: "Medellín" },
  { href: "/diseno-de-paginas-web-en-cali", label: "Cali" },
  { href: "/diseno-de-paginas-web-en-bucaramanga", label: "Bucaramanga" },
  { href: "/diseno-de-paginas-web-en-santa-marta", label: "Santa Marta" },
];

/**
 * Saca el número de un dato como «93,1 %» o «28.247» para poder contarlo.
 * Devuelve `null` cuando la cifra no es un número contable —un rango, un
 * intervalo—, y entonces la celda la pinta tal cual sin animar nada.
 */
function cifraContable(dato: string): { valor: number; prefijo?: string; sufijo?: string } | null {
  const m = dato.match(/^(\D*?)([\d.]+(?:,\d+)?)(.*)$/u);
  if (!m) return null;
  const [, prefijo, numero, sufijo] = m;
  /* En castellano el punto separa millares y la coma decimales. */
  const valor = Number(numero.replace(/\./g, "").replace(",", "."));
  if (!Number.isFinite(valor)) return null;
  /* Los decimales no se cuentan: ver «93,1 %» subir de 0,0 a 93,1 marea y no
     dice nada que «93 %» no diga. Si la cifra tiene coma, se deja quieta. */
  if (numero.includes(",")) return null;
  return { valor, prefijo: prefijo || undefined, sufijo: sufijo || undefined };
}

export function PaginaCiudad({ ciudad }: { ciudad: Ciudad }) {
  const url = `${SITE_URL}${ciudad.ruta}`;
  const otras = CIUDADES.filter((c) => c.href !== ciudad.ruta);
  /* La última parada del rail es esta ciudad: de ahí salen la distancia y la
     nota que enseña la pieza firma. */
  const parada = ciudad.paradas[ciudad.paradas.length - 1];

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
        ...(p.exacto ? { price: p.desde } : { minPrice: p.desde }),
        ...(p.mensual ? { unitCode: "MON" } : {}),
      },
      availability: "https://schema.org/InStock",
    })),
  };

  const indice = [
    { id: "confesion", texto: "Lo que no tengo acá" },
    { id: "datos", texto: `${ciudad.nombre} en cifras` },
    { id: "precios", texto: "Precios" },
    { id: "como", texto: "Cómo se trabaja" },
    { id: "trabajo", texto: "Trabajo abierto" },
    { id: "preguntas", texto: "Preguntas" },
  ];

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
          migas={[{ texto: `Diseño de páginas web en ${ciudad.nombre}` }]}
          eyebrow={ciudad.badge}
          titulo={
            <>
              Diseño de páginas web en {ciudad.nombre},{" "}
              <span className="block text-brand">{ciudad.tituloAcento}</span>
            </>
          }
          entradilla={ciudad.entradilla[0]}
          precio="landing"
          indice={<SectionIndex entradas={indice} idioma="es" variante="chip" />}
          aparte={
            <RutaDesdeTurbaco
              destino={ciudad.nombre}
              distancia={parada.distancia}
              nota={parada.nota}
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

        {/* ── La confesión. Va arriba a propósito ─────────────────────── */}
        <section id="confesion" className="border-b border-line bg-tint">
          <div className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-16">
              <Reveal>
                <div className="lg:sticky lg:top-28">
                  <MapPinOff
                    className="h-6 w-6 text-brand"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <h2 className="mt-5 text-balance text-[length:var(--text-h2)]">
                    {ciudad.confesion.titulo}
                    <span className="text-brand">{ciudad.confesion.tituloAcento}</span>
                  </h2>
                </div>
              </Reveal>

              <Reveal delay={80}>
                {ciudad.confesion.parrafos.map((p) => (
                  <p
                    key={p}
                    className="mt-5 max-w-[62ch] text-[length:var(--text-lead)] leading-relaxed text-ink-soft first:mt-0"
                  >
                    {p}
                  </p>
                ))}
                <p className="mt-8 max-w-[62ch] leading-relaxed text-ink-soft">
                  {ciudad.entradilla[1]}
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Los datos de la ciudad ─────────────────────────────────── */}
        <section
          id="datos"
          className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24"
        >
          <Reveal>
            <h2 className="text-balance text-[length:var(--text-display)]">{ciudad.datosTitulo}</h2>
            <p className="mt-4 max-w-[62ch] text-[length:var(--text-lead)] leading-relaxed text-ink-soft">
              {ciudad.datosEntradilla}
            </p>
          </Reveal>

          {/* Las cifras cuentan una vez al entrar en vista. Son datos de un
              tercero, así que van con su fuente citada justo debajo: una cifra
              oficial sin fuente es una cifra inventada con mejor tipografía. */}
          <Cifras
            className="mt-12"
            cifras={ciudad.datos.map((d) => {
              const c = cifraContable(d.dato);
              return {
                valor: c?.valor ?? 0,
                prefijo: c?.prefijo,
                sufijo: c?.sufijo,
                cuenta: Boolean(c),
                etiqueta: d.titulo,
                /* Sin número contable, la celda imprime el dato tal cual. */
                textoCrudo: c ? undefined : d.dato,
              };
            })}
          />

          <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-5 md:grid-cols-2">
            {ciudad.datos.map((d) => (
              <Reveal key={d.titulo}>
                <p className="max-w-[62ch] text-sm leading-relaxed text-ink-soft">
                  <strong className="text-ink">{d.titulo}. </strong>
                  {d.desc}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="jv-rule mt-10 max-w-[62ch] pt-6 text-sm leading-relaxed text-ink-muted">
              Fuente de las cifras:{" "}
              <a
                href={ciudad.fuente.url}
                target="_blank"
                rel="noopener noreferrer"
                className="jv-enlace font-semibold text-brand"
              >
                {ciudad.fuente.texto}
              </a>
              . {ciudad.fuente.periodo}
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
            <p className="mt-4 max-w-[62ch] leading-relaxed text-ink-soft">{ciudad.precioNota}</p>
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
            <p className="mt-8 max-w-[62ch] leading-relaxed text-ink-soft">
              <Link
                href="/servicios/software-a-la-medida"
                className="jv-enlace font-semibold text-brand"
              >
                Software a la medida
              </Link>{" "}
              <strong className="text-ink">va aparte</strong>, según el alcance: un sistema interno
              no se cotiza por tabla. El piso son {money(PISOS.software)}.
            </p>
            <p className="mt-4 max-w-[62ch] text-sm leading-relaxed text-ink-soft">
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

            {/* Lo que cambia, a favor y en contra. */}
            <Reveal>
              <h2 className="mt-20 text-balance text-[length:var(--text-h2)]">
                Qué cambia, en la práctica, porque yo no estoy en {ciudad.region}
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <Comparador
                className="mt-10"
                tituloIncluye="Lo que cambia a tu favor"
                tituloNoIncluye={
                  <>
                    Lo que cambia <span className="text-brand">en tu contra</span>
                  </>
                }
                incluye={A_FAVOR}
                noIncluye={EN_CONTRA}
              />
            </Reveal>
          </div>
        </section>

        {/* ── Trabajo abierto. La cuarta casilla va vacía a propósito:
             es «no hay cliente acá», dibujado. ────────────────────────── */}
        <section
          id="trabajo"
          className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24"
        >
          <Reveal>
            <h2 className="text-balance text-[length:var(--text-display)]">
              Trabajo mío que puedes abrir ahora.
              <span className="text-brand"> Ninguno es de {ciudad.nombre}.</span>
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
              <CasillaVacia className="h-full" rotulo={ciudad.sinCliente.rotulo}>
                {ciudad.sinCliente.texto}
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
                  Lo que pregunta un cliente de {ciudad.nombre}
                </h2>
              </div>
            </Reveal>

            <FaqAccordion
              grupos={[
                {
                  titulo: `Lo que pregunta un cliente de ${ciudad.nombre}`,
                  items: [
                    ...ciudad.faqs.map((f) => ({ q: f.q, a: f.a })),
                    {
                      /* La de facturación es igual en todas y sale de
                         `lib/business.ts`, así que no se copia en cada archivo
                         de ciudad. */
                      q: "¿Facturas legalmente? Necesito soporte contable.",
                      a: `Sí. Persona natural con RUT y NIT colombiano (${BUSINESS.taxId}), cuenta de cobro o factura en pesos y contrato regido por ley colombiana.`,
                    },
                  ],
                },
              ]}
            />
          </div>
        </section>

        {/* ── Las otras ciudades ─────────────────────────────────────
             Vivían dentro de la pieza firma del hero y ahí eran siete
             pastillas de 44 px en tres renglones: convertían el dato de la
             distancia en un menú. Aquí llegan cuando la pregunta es «¿y si no
             soy de esta ciudad?», que es al final. */}
        <section className="mx-auto max-w-[1280px] px-6 pb-20 md:px-12 md:pb-24">
          <Reveal>
            <nav aria-label="Otras ciudades">
              <h2 className="jv-eyebrow text-ink-muted">También trabajo</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {otras.map((o) => (
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
          titulo={ciudad.cierreTitulo}
          cuerpo={ciudad.cierreCuerpo}
          siguiente={<NextStep id="landing" idioma="es" />}
        />
      </main>
      <Footer idioma="es" />
      <WhatsAppButton />
      <BarraMovil idioma="es" />
    </>
  );
}

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/Reveal";

/**
 * Rejilla de proyectos, en dos grupos: los que están en línea con dominio
 * propio y los que construí por iniciativa propia (proyectos de estudio).
 *
 * Las capturas son de los sitios REALES construidos, no maquetas. Los que
 * están en línea enlazan al sitio para que cualquiera lo compruebe: un
 * portafolio que no se puede verificar vale lo mismo que no tenerlo.
 *
 * Cada descripción sale de la propia página del proyecto, no de mi
 * interpretación de lo que hace el negocio.
 */
type Proyecto = {
  nombre: string;
  categoria: string;
  desc: string;
  /**
   * Solo los proyectos que están en línea con dominio propio. Un proyecto de
   * estudio no lleva enlace ni dirección: enseño la captura y ya, sin mandar a
   * nadie a un dominio que no existe.
   */
  url?: string;
  /** Archivo en /public/work/ */
  img: string;
  /** Dominio que se muestra en la barra del navegador. Solo si hay `url`. */
  dominio?: string;
  /** Producto mío: lo construí para mí, nadie me lo encargó. */
  propio?: boolean;
  /** Proyecto de estudio: terminado, pero sin dominio propio que enseñar. */
  estudio?: boolean;
};

const PROYECTOS: Proyecto[] = [
  {
    nombre: "HalcónOS",
    categoria: "Producto propio · SaaS",
    desc: "CRM de ventas para agencias en LATAM: caza leads con Google, redacta propuestas con IA y lleva cada conversación de WhatsApp al pipeline.",
    url: "https://halcon.jvagencia.com",
    img: "/work/halconos.webp",
    dominio: "halcon.jvagencia.com",
    propio: true,
  },
  {
    nombre: "Hummik",
    categoria: "Producto propio · SaaS",
    desc: "Agenda de citas por WhatsApp: el cliente reserva desde el chat o desde un enlace y la cita cae sola en el calendario, con recordatorios contra los plantones.",
    url: "https://www.hummik.com",
    img: "/work/hummik.webp",
    dominio: "hummik.com",
    propio: true,
  },
  {
    nombre: "Bloomrose",
    categoria: "Tienda online",
    desc: "Tienda de bisutería y accesorios para el mercado colombiano: catálogo con inventario, carrito, cuentas, pagos en línea y cotización de envíos.",
    url: "https://www.bloomroseaccesorios.com",
    img: "/work/bloomrose.webp",
    dominio: "bloomroseaccesorios.com",
  },
  {
    nombre: "Animal Expert",
    categoria: "Veterinaria",
    desc: "Centro médico veterinario en Turbaco: consulta especializada, cirugía, rayos X, fisioterapia y vacunación, con agenda en línea.",
    img: "/work/animal-expert.webp",
    estudio: true,
  },
  {
    nombre: "Fta. Elka Gómez",
    categoria: "Salud y spa",
    desc: "Más de 30 años tratando el dolor en Cartagena: rehabilitación física, masaje y experiencias de spa.",
    img: "/work/elka-spa.webp",
    estudio: true,
  },
  {
    nombre: "Peluquería Marcopolo",
    categoria: "Belleza",
    desc: "Salón de belleza en Barranquilla con cuatro décadas de oficio: corte de autor, color editorial y tratamientos.",
    img: "/work/marcopolo.webp",
    estudio: true,
  },
];

/* ===========================================================================
   LA PLACA
   ---------------------------------------------------------------------------
   Es la pieza que hermana esta sección con el caso a fondo de MediaSection:
   bisel cálido de 3 px (passe-partout, no borde de 1 px), pantalla oscura
   dentro y sombra de dos tiempos —contacto duro + difusa larga— para que la
   captura tenga peso físico sobre el papel en vez de flotar pegada.

   Si se toca aquí, hay que tocarlo igual en MediaSection.tsx: son el mismo
   objeto a dos tamaños, no dos diseños distintos.

   El radio interior sale de la regla de anidación: 1,75rem (rounded-3xl) menos
   los 3 px del bisel = 1,56rem.
   =========================================================================== */
const BISEL = "rounded-3xl bg-gradient-to-b from-white/95 via-line to-secondary/45 p-[3px]";
const PANTALLA = "overflow-hidden rounded-[1.56rem] bg-ink";

/**
 * Barra de navegador de la placa.
 *
 * Con dominio: pastilla de URL con un punto verde de "en línea".
 * Sin dominio: en vez de dejar la barra vacía —que se lee como un marco roto—
 * dice explícitamente en qué estado está el proyecto.
 */
function BarraNavegador({ dominio, grande = false }: { dominio?: string; grande?: boolean }) {
  return (
    <div
      className={[
        "flex items-center gap-2 border-b border-ink/10 bg-surface",
        grande ? "px-5 py-3" : "px-4 py-2.5",
      ].join(" ")}
    >
      <span className="flex shrink-0 items-center gap-1.5">
        <span className={grande ? "h-2.5 w-2.5 rounded-full bg-danger/55" : "h-2 w-2 rounded-full bg-danger/55"} />
        <span className={grande ? "h-2.5 w-2.5 rounded-full bg-warning/55" : "h-2 w-2 rounded-full bg-warning/55"} />
        <span className={grande ? "h-2.5 w-2.5 rounded-full bg-success/55" : "h-2 w-2 rounded-full bg-success/55"} />
      </span>

      {dominio ? (
        <span className="ml-1 flex min-w-0 items-center gap-2 rounded-full border border-line bg-background/70 px-3 py-1">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-success ring-2 ring-success/25" />
          <span
            className={[
              "truncate font-mono text-ink-soft",
              grande ? "text-xs" : "text-[11px]",
            ].join(" ")}
          >
            {dominio}
          </span>
        </span>
      ) : (
        /* Dos palabras y ya: la frase larga no cabía en la barra de una tarjeta
           de rejilla y se cortaba, que es justo el defecto que este chip venía
           a arreglar. El porqué lo dice la nota del grupo: son proyectos que
           construí por iniciativa propia, no encargos de nadie. */
        <span className="ml-1 whitespace-nowrap rounded-full border border-dashed border-secondary px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-primary-dark">
          En estudio
        </span>
      )}
    </div>
  );
}

/**
 * La captura dentro de la placa.
 *
 * La ventana impone la proporción (16/9) en vez de confiar en el archivo: así
 * las capturas de 1600x1000 y la de 2000x1160 ocupan exactamente el mismo alto
 * y los títulos de una fila comparten línea base. El `scale-[1.04]` anclado
 * arriba recorta la canaleta blanca que trae el archivo de bloomrose por la
 * derecha, sin tocar los assets.
 *
 * Al pasar el cursor la captura se DESPLAZA hacia arriba: se ve la parte del
 * sitio que la ventana escondía. El hover deja de ser "sube 4 px" y pasa a
 * enseñar algo que antes no se veía.
 */
function Captura({
  p,
  sizes,
  quality = 85,
}: {
  p: Proyecto;
  sizes: string;
  quality?: number;
}) {
  const enLinea = Boolean(p.url);
  return (
    <div className="relative aspect-[16/9] overflow-hidden bg-ink">
      <Image
        src={p.img}
        alt={`${p.nombre} — sitio que diseñé y desarrollé`}
        width={1600}
        height={1000}
        quality={quality}
        sizes={sizes}
        className="absolute inset-x-0 top-0 h-auto w-full origin-top scale-[1.04] transition-transform duration-ambient ease-entrance group-hover:-translate-y-[12%] group-focus-visible:-translate-y-[12%] motion-reduce:transition-none motion-reduce:group-hover:translate-y-0 motion-reduce:group-focus-visible:translate-y-0"
      />

      {/* Brillo especular: un reflejo que cruza el vidrio al pasar el cursor.
          Puramente decorativo, así que desaparece con movimiento reducido. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-tr from-transparent via-white/25 to-transparent mix-blend-overlay transition-transform duration-ambient ease-entrance group-hover:translate-x-full motion-reduce:hidden"
      />

      {/* Degradado inferior: insinúa que la captura sigue por debajo del corte. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-ink/30 to-transparent"
      />

      {enLinea && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-between gap-3 bg-ink/90 px-4 py-2.5 font-mono text-[11px] text-surface backdrop-blur transition-transform duration-base ease-state group-hover:translate-y-0 group-focus-visible:translate-y-0 motion-reduce:transition-none">
          <span className="truncate">{p.dominio}</span>
          <span className="shrink-0">Abrir sitio ↗</span>
        </span>
      )}
    </div>
  );
}

function Placa({
  p,
  sizes,
  grande = false,
}: {
  p: Proyecto;
  sizes: string;
  grande?: boolean;
}) {
  const enLinea = Boolean(p.url);
  return (
    <div
      className={[
        BISEL,
        "transition-card duration-slow ease-state",
        /* shadow-lift es solo para hover: en reposo la placa lleva su sombra
           de marco, y al elevarse pasa a la versión larga. */
        enLinea
          ? "shadow-frame group-hover:-translate-y-1.5 group-hover:shadow-frame-hover group-focus-visible:-translate-y-1.5 group-focus-visible:shadow-frame-hover"
          : "shadow-soft",
      ].join(" ")}
    >
      <div className={PANTALLA}>
        <BarraNavegador dominio={p.dominio} grande={grande} />
        <Captura p={p} sizes={sizes} quality={85} />
      </div>
    </div>
  );
}

/** Ficha del proyecto: nombre, categoría, qué es y la acción. */
function Ficha({ p, grande = false }: { p: Proyecto; grande?: boolean }) {
  return (
    <div className={grande ? "mt-6 lg:mt-0" : "mt-5"}>
      {/* h4 a propósito: la cadena es h2 sección -> h3 grupo -> h4 proyecto,
          para que un lector de pantalla oiga las tarjetas COMO HIJAS del
          grupo y no como sus hermanas. */}
      <h4
        className={
          grande
            ? "font-display text-2xl/[1.15] text-ink sm:text-3xl/[1.1]"
            : "font-display text-xl/[1.2] text-ink"
        }
      >
        {p.nombre}
      </h4>

      <span
        className={[
          "mt-2.5 inline-flex w-fit rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em]",
          p.propio
            ? "bg-primary/12 text-primary-dark"
            : "border border-line text-ink-soft",
        ].join(" ")}
      >
        {p.categoria}
      </span>

      <p
        className={
          grande
            ? "mt-4 max-w-[54ch] font-body text-base leading-relaxed text-ink-soft"
            : "mt-3 max-w-[62ch] font-body text-sm leading-relaxed text-ink-soft"
        }
      >
        {p.desc}
      </p>

      {p.url && (
        /* En reposo la flecha suelta daba 1,74:1 y era el único aviso de que
           la tarjeta abre un sitio externo. Una pastilla con texto lo dice
           en vez de insinuarlo, y cumple contraste desde el primer fotograma. */
        <span className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-primary/35 bg-surface/70 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-primary-dark transition-surface duration-quick ease-state group-hover:border-primary group-hover:bg-primary group-hover:text-surface group-focus-visible:border-primary group-focus-visible:bg-primary group-focus-visible:text-surface">
          Abrir sitio
          <ArrowUpRight
            className="h-3.5 w-3.5 transition-transform duration-base ease-state group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            strokeWidth={2.25}
          />
        </span>
      )}
    </div>
  );
}

/** Enlace solo si el proyecto se puede visitar; si no, un contenedor. */
function Tarjeta({
  href,
  className,
  children,
}: {
  href?: string;
  className: string;
  children: React.ReactNode;
}) {
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return <div className={className}>{children}</div>;
}

/* Composición de la rejilla. En vez de dejar que el auto-flow reparta seis
   piezas iguales, cada grupo tiene su propia partitura sobre 12 columnas:
   - En producción: una placa a ancho completo (el trabajo que manda) y dos
     debajo. La fila cierra exacta.
   - Proyectos de estudio: tres piezas en una sola fila de tercios en lg. En md
     entran de a dos y la tercera queda sola a media columna, alineada a la
     izquierda: hueco al final de la última fila, nunca en medio. */
const SPANS_PRODUCCION = ["md:col-span-12", "md:col-span-6", "md:col-span-6"];
const SPANS_ESTUDIO = [
  "md:col-span-6 lg:col-span-4",
  "md:col-span-6 lg:col-span-4",
  "md:col-span-6 lg:col-span-4",
];

const SIZES_ANCHA =
  "(min-width:1280px) 42rem, (min-width:1024px) 54vw, (min-width:768px) 90vw, 86vw";
const SIZES_NORMAL =
  "(min-width:1280px) 34rem, (min-width:1024px) 44vw, (min-width:768px) 44vw, 86vw";

export function Portfolio() {
  const grupos = [
    {
      titulo: "En producción",
      nota: "Con dominio propio y en línea. Toca cualquiera y compruébalo.",
      items: PROYECTOS.filter((p) => p.url),
      spans: SPANS_PRODUCCION,
      estudio: false,
    },
    {
      titulo: "Proyectos de estudio",
      nota: "Proyectos de estudio. Sitios que diseñé y construí completos para negocios reales de la región, por iniciativa propia. Cada uno está terminado y se puede abrir.",
      items: PROYECTOS.filter((p) => !p.url),
      spans: SPANS_ESTUDIO,
      estudio: true,
    },
  ];

  return (
    /* Continúa el capítulo que abre MediaSection ("el trabajo"), así que no
       vuelve a empezar de cero: entra pegada arriba y respira abajo. */
    <section id="proyectos" className="relative pb-24 pt-10 md:pb-32 md:pt-14">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* Encabezado de continuación, no de capítulo: alineado a la izquierda,
            sin píldora y un escalón por debajo del h2 del caso a fondo. Antes
            los dos bloques eran la misma construcción centrada y se leían como
            la misma sección repetida. */}
        <Reveal className="max-w-3xl" stagger>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-ink">
            Proyectos
          </p>
          <h2 className="mt-4 font-display text-3xl/[1.15] text-ink sm:text-[2.5rem]/[1.08]">
            Páginas web que ya están
            <span className="text-primary-dark"> en línea, funcionando.</span>
          </h2>
          <p className="mt-4 max-w-2xl font-body text-lg text-ink-soft">
            No son maquetas ni plantillas de muestra. Abajo hay dos grupos: lo que está en
            producción con dominio propio, y proyectos de estudio que construí completos por
            iniciativa propia.
          </p>
        </Reveal>

        {grupos.map((grupo) => (
          <div key={grupo.titulo} className="mt-14 md:mt-16">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-line pb-4">
              <h3 className="font-display text-2xl text-ink">{grupo.titulo}</h3>
              <p className="font-body text-sm text-ink-soft">{grupo.nota}</p>
              <span className="ml-auto shrink-0 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft md:hidden">
                Desliza →
              </span>
            </div>

            {/* El segundo grupo vive en una bandeja hundida: se lee como mesa
                de estudio, no como un escalón peor. Las capturas siguen a todo
                color y al mismo tamaño; lo que cambia es la superficie que las
                sostiene, no su calidad. En móvil la bandeja se sangra a borde
                de pantalla y actúa como banda tonal: el grupo se distingue de
                un vistazo sin leer el encabezado. */}
            <div
              className={
                grupo.estudio
                  ? "mt-8 -mx-5 bg-ink/[0.045] px-5 py-8 shadow-well md:mx-0 md:rounded-4xl md:p-8 lg:p-10"
                  : "mt-8"
              }
            >
              {/* Móvil: estante horizontal con arrastre y anclaje, para que la
                  sección deje de ser una columna de siete rectángulos iguales.
                  Los raíles se sangran hasta el borde de pantalla (px-5 exacto,
                  como el resto de las secciones) para que la placa gane ancho
                  y se asome la siguiente. El scroll vive DENTRO de este
                  contenedor: el documento nunca desborda.
                  A partir de md vuelve a ser rejilla de 12 columnas. */}
              {/* El escalonado va en el CARRIL, no en cada tarjeta.
                  Un IntersectionObserver se recorta contra el overflow de sus
                  ancestros, así que las tarjetas que esperan a la derecha del
                  estante nunca tocaban el viewport y se quedaban en opacity 0
                  hasta que alguien deslizaba. Con `stagger` el observado es el
                  carril —que sí está a la vista— y son sus hijos directos los
                  que entran, uno detrás de otro. */}
              <Reveal
                variant="scale"
                stagger
                className="-mx-5 flex snap-x snap-mandatory scroll-pl-5 gap-4 overflow-x-auto px-5 pb-8 no-scrollbar [&>*:last-child]:snap-end md:mx-0 md:grid md:grid-cols-12 md:scroll-pl-0 md:gap-x-6 md:gap-y-12 md:overflow-visible md:px-0 md:pb-0"
              >
                {grupo.items.map((p, i) => {
                  const grande = !grupo.estudio && i === 0;
                  return (
                    <Tarjeta
                      key={p.nombre}
                      href={p.url}
                      className={[
                        "group block rounded-3xl",
                        "w-[86vw] max-w-[420px] shrink-0 snap-start md:w-auto md:max-w-none md:shrink",
                        grupo.spans[i] ?? "md:col-span-6",
                        grande ? "lg:grid lg:grid-cols-[1.32fr_1fr] lg:items-center lg:gap-10" : "",
                      ].join(" ")}
                    >
                      <Placa
                        p={p}
                        grande={grande}
                        sizes={grande ? SIZES_ANCHA : SIZES_NORMAL}
                      />
                      <Ficha p={p} grande={grande} />
                    </Tarjeta>
                  );
                })}
              </Reveal>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

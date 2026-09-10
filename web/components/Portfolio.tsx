"use client";

import { useState } from "react";
import Image from "next/image";
import * as Acordeon from "@radix-ui/react-accordion";
import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

/**
 * El trabajo, como expediente.
 *
 * POR QUÉ NO ES UNA REJILLA
 * -------------------------
 * Era una rejilla de seis placas iguales, y una rejilla trata a seis proyectos
 * como seis celdas: la mirada las recorre de una pasada, ninguna gana peso y
 * de ninguna se cuenta nada. Peor: con seis piezas siempre sobra sitio en la
 * última fila, así que la composición se pasaba el rato tapando huecos —una
 * placa ancha arriba, dos debajo, tres en tercios— en vez de decir algo.
 *
 * Ahora es una lista de expedientes con uno abierto. Cada fila declara qué es
 * y en qué estado está; la abierta enseña la captura a tamaño de verdad y, al
 * lado, su ficha. Con pocos proyectos y buenos, la profundidad vende más que
 * el inventario: el visitante no cuenta seis miniaturas, lee un caso.
 *
 * SIEMPRE HAY UNO ABIERTO
 * -----------------------
 * `collapsible` va desactivado a propósito. Si se pudieran cerrar todas, la
 * sección tendría un estado en el que no se ve ni una captura —una lista de
 * títulos donde debería haber trabajo—, y encima la ficha lateral se quedaría
 * sin nada que mostrar.
 *
 * LO QUE DICE LA FICHA
 * --------------------
 * Tipo, estado, rol y dominio. Nada más, porque nada más está verificado: no
 * hay fila de tecnologías porque el stack de cada proyecto no vive en estos
 * datos, y rellenarla de memoria sería inventar en la única sección cuyo
 * trabajo es demostrar.
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
  },
  {
    nombre: "Fta. Elka Gómez",
    categoria: "Salud y spa",
    desc: "Más de 30 años tratando el dolor en Cartagena: rehabilitación física, masaje y experiencias de spa.",
    img: "/work/elka-spa.webp",
  },
  {
    nombre: "Peluquería Marcopolo",
    categoria: "Belleza",
    desc: "Salón de belleza en Barranquilla con cuatro décadas de oficio: corte de autor, color editorial y tratamientos.",
    img: "/work/marcopolo.webp",
  },
];

const EN_PRODUCCION = PROYECTOS.filter((p) => p.url);
const DE_ESTUDIO = PROYECTOS.filter((p) => !p.url);

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
const BISEL = "rounded-[1.125rem] border border-line bg-surface p-[3px]";
const PANTALLA = "overflow-hidden rounded-[0.9375rem] bg-canvas";

const SIZES_PLACA = "(min-width:1024px) 46rem, (min-width:768px) 88vw, 92vw";

/**
 * Barra de navegador de la placa.
 *
 * Con dominio: pastilla de URL con un punto verde de "en línea".
 * Sin dominio: en vez de dejar la barra vacía —que se lee como un marco roto—
 * dice explícitamente en qué estado está el proyecto.
 */
function BarraNavegador({ dominio }: { dominio?: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-line bg-surface px-5 py-3">
      <span className="flex shrink-0 items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-danger/55" />
        <span className="h-2.5 w-2.5 rounded-full bg-warning/55" />
        <span className="h-2.5 w-2.5 rounded-full bg-success/55" />
      </span>

      {dominio ? (
        <span className="ml-1 flex min-w-0 items-center gap-2 rounded-full border border-line bg-background/70 px-3 py-1">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-success ring-2 ring-success/25" />
          <span className="truncate font-mono text-xs text-ink-soft">{dominio}</span>
        </span>
      ) : (
        <span className="ml-1 whitespace-nowrap rounded-full border border-dashed border-secondary px-3 py-1 jv-eyebrow text-primary-dark">
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
 * las capturas de 1600x1000 y la de 2000x1160 ocupan exactamente el mismo alto.
 * El `scale-[1.04]` anclado arriba recorta la canaleta blanca que trae el
 * archivo de bloomrose por la derecha, sin tocar los assets.
 *
 * Al pasar el cursor la captura se DESPLAZA hacia arriba: se ve la parte del
 * sitio que la ventana escondía. El hover deja de ser "sube 4 px" y pasa a
 * enseñar algo que antes no se veía.
 */
function Captura({ p }: { p: Proyecto }) {
  return (
    <div className="relative aspect-[16/9] overflow-hidden bg-canvas">
      <Image
        src={p.img}
        alt={`${p.nombre} — sitio que diseñé y desarrollé`}
        width={1600}
        height={1000}
        quality={85}
        sizes={SIZES_PLACA}
        className="absolute inset-x-0 top-0 h-auto w-full origin-top scale-[1.04] transition-transform duration-ambient ease-entrance group-hover/placa:-translate-y-[12%] group-focus-visible/placa:-translate-y-[12%] motion-reduce:transition-none motion-reduce:group-hover/placa:translate-y-0"
      />

      {/* Brillo especular: un reflejo que cruza el vidrio al pasar el cursor.
          Puramente decorativo, así que desaparece con movimiento reducido. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-tr from-transparent via-white/25 to-transparent mix-blend-overlay transition-transform duration-ambient ease-entrance group-hover/placa:translate-x-full motion-reduce:hidden"
      />

      {/* Degradado inferior: insinúa que la captura sigue por debajo del corte. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-canvas/70 to-transparent"
      />

      {p.url && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-between gap-3 bg-canvas/90 px-5 py-3 font-mono text-xs text-ink backdrop-blur transition-transform duration-base ease-state group-hover/placa:translate-y-0 group-focus-visible/placa:translate-y-0 motion-reduce:transition-none">
          <span className="truncate">{p.dominio}</span>
          <span className="shrink-0">Abrir sitio ↗</span>
        </span>
      )}
    </div>
  );
}

/** La placa. Enlace cuando el proyecto se puede visitar; si no, un contenedor. */
function Placa({ p }: { p: Proyecto }) {
  const contenido = (
    <div
      className={cn(
        BISEL,
        "transition-card duration-slow ease-state",
        p.url
          ? "shadow-frame group-hover/placa:-translate-y-1.5 group-hover/placa:shadow-frame-hover group-focus-visible/placa:-translate-y-1.5 group-focus-visible/placa:shadow-frame-hover"
          : "shadow-soft"
      )}
    >
      <div className={PANTALLA}>
        <BarraNavegador dominio={p.dominio} />
        <Captura p={p} />
      </div>
    </div>
  );

  if (!p.url) return <div className="group/placa block rounded-3xl">{contenido}</div>;

  return (
    <a
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group/placa block rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-band"
    >
      {contenido}
    </a>
  );
}

/* ---------------------------------------------------------------------------
   La ficha del caso abierto
   --------------------------------------------------------------------------- */

/**
 * Cuatro filas y ninguna inventada.
 *
 * Vive dos veces en el árbol: pegada arriba en la columna de la izquierda en
 * escritorio, y dentro del panel abierto en móvil, donde no hay columna donde
 * pegarla. Solo una de las dos está en `display` a la vez, así que un lector de
 * pantalla nunca oye la ficha dos veces.
 */
function Expediente({ p, className }: { p: Proyecto; className?: string }) {
  const filas: [string, string][] = [
    ["Tipo", p.categoria],
    ["Estado", p.url ? "En línea" : "En estudio"],
    ["Rol", "Diseño + desarrollo"],
    ["Dominio", p.dominio ?? "Sin dominio público"],
  ];

  return (
    <div className={className}>
      <p className="jv-eyebrow text-accent-ink">
        Caso abierto
      </p>
      <p className="mt-3 font-display text-2xl/[1.15] text-ink">{p.nombre}</p>
      <dl className="mt-5 border-t border-line">
        {filas.map(([k, v]) => (
          <div
            key={k}
            className="grid grid-cols-[6.5rem_1fr] gap-3 border-b border-line py-3"
          >
            <dt className="jv-eyebrow text-ink-soft">
              {k}
            </dt>
            <dd className="min-w-0 font-body text-sm leading-relaxed text-ink">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Las filas
   --------------------------------------------------------------------------- */

function Fila({ p, n }: { p: Proyecto; n: string }) {
  return (
    <Acordeon.Item
      value={p.nombre}
      className="group/item border-b border-line last:border-b-0"
    >
      <Acordeon.Header>
        <Acordeon.Trigger className="group/trigger relative flex w-full items-center gap-4 py-5 pl-5 pr-3 text-left transition-surface duration-quick ease-state hover:bg-ink/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent md:gap-6">
          {/* Riel de cobre: marca cuál está abierto sin gastar un fondo. El
              mismo gesto que usan las preguntas frecuentes. */}
          <span
            aria-hidden
            className="pointer-events-none absolute bottom-3 left-0 top-3 w-[3px] origin-center scale-y-0 rounded-full bg-accent transition-transform duration-slow ease-state group-data-[state=open]/item:scale-y-100"
          />

          <span className="shrink-0 font-mono text-xs tabular-nums text-ink-soft">{n}</span>

          {/* Miniatura. Una lista de títulos no sería un portafolio: aunque solo
              se abra una, cada fila sigue enseñando de qué sitio habla. */}
          <span className="relative hidden h-11 w-[4.5rem] shrink-0 overflow-hidden rounded-lg border border-line bg-canvas sm:block">
            <Image
              src={p.img}
              alt=""
              aria-hidden
              width={1600}
              height={1000}
              quality={45}
              sizes="72px"
              className="absolute inset-x-0 top-0 h-auto w-full"
            />
          </span>

          <span className="min-w-0 flex-1">
            <span className="block truncate font-body text-lg/[1.25] font-semibold text-ink transition-colors duration-quick ease-state group-hover/trigger:text-primary-dark md:text-xl">
              {p.nombre}
            </span>
            <span className="mt-0.5 block truncate font-body text-sm text-ink-soft">
              {p.categoria}
            </span>
          </span>

          <span
            className={cn(
              "hidden shrink-0 items-center gap-1.5 rounded-full px-3 py-1 jv-eyebrow md:inline-flex",
              p.url
                ? "bg-success/12 text-success-ink"
                : "border border-dashed border-secondary text-ink-soft"
            )}
          >
            {p.url && <span className="h-1.5 w-1.5 rounded-full bg-success" />}
            {p.url ? "En línea" : "En estudio"}
          </span>

          {/* Signo de estado. No rota 45°: cuando la fila está abierta no se
              puede volver a cerrar —siempre hay una abierta—, así que una «x»
              prometería una acción que no existe. Se apaga y ya. */}
          <span
            aria-hidden
            className="shrink-0 font-mono text-sm text-ink-soft transition-opacity duration-base ease-state group-data-[state=open]/item:opacity-0"
          >
            +
          </span>
        </Acordeon.Trigger>
      </Acordeon.Header>

      <Acordeon.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
        <div className="px-5 pb-8 pt-1">
          <Placa p={p} />

          <p className="mt-6 max-w-[62ch] font-body text-base leading-relaxed text-ink-soft">
            {p.desc}
          </p>

          {p.url && (
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="tap-target mt-5 inline-flex items-center gap-1.5 rounded-full border border-primary/35 bg-surface/70 px-4 py-2 jv-eyebrow text-primary-dark transition-surface duration-quick ease-state hover:border-primary hover:bg-primary hover:text-on-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Abrir {p.dominio}
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
            </a>
          )}

          {/* En móvil no hay columna lateral donde pegar la ficha, así que
              baja al panel. */}
          <Expediente p={p} className="mt-8 jv-rule lg:hidden" />
        </div>
      </Acordeon.Content>
    </Acordeon.Item>
  );
}

/* ---------------------------------------------------------------------------
   La sección
   --------------------------------------------------------------------------- */

export function Portfolio() {
  const [abierto, setAbierto] = useState(PROYECTOS[0].nombre);
  const activo = PROYECTOS.find((p) => p.nombre === abierto) ?? PROYECTOS[0];

  return (
    /* Continúa el capítulo que abre MediaSection ("el trabajo"), así que no
       vuelve a empezar de cero: entra pegada arriba y respira abajo. */
    <section id="proyectos" className="relative pb-24 pt-10 md:pb-32 md:pt-14">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* Encabezado de continuación, no de capítulo: alineado a la izquierda,
            sin píldora y un escalón por debajo del h2 del caso a fondo. */}
        <Reveal className="max-w-3xl" stagger>
          <p className="jv-eyebrow text-accent-ink">
            Proyectos
          </p>
          <h2 className="mt-4 font-display text-3xl/[1.15] text-ink sm:text-[2.5rem]/[1.08]">
            Páginas web que ya están
            <span className="text-primary-dark"> en línea, funcionando.</span>
          </h2>
          <p className="mt-4 max-w-2xl font-body text-lg text-ink-soft">
            No son maquetas ni plantillas de muestra. Abre cualquiera: los que tienen dominio
            propio se pueden visitar y comprobar.
          </p>
        </Reveal>

        <Reveal
          delay={80}
          className="mt-12 gap-x-14 md:mt-14 lg:grid lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)]"
        >
          {/* Columna de la ficha. Pegada arriba: mientras se recorre la lista,
              la ficha del caso abierto sigue a la vista en vez de quedarse
              atrás. El desfase es el alto del encabezado más aire. */}
          <div className="hidden lg:block">
            <Expediente p={activo} className="sticky top-28" />
          </div>

          <Acordeon.Root
            type="single"
            value={abierto}
            onValueChange={(v) => v && setAbierto(v)}
            className="min-w-0 overflow-hidden jv-card/70 shadow-soft"
          >
            <Encabezado
              titulo="En producción"
              nota="Con dominio propio y en línea. Toca cualquiera y compruébalo."
            />
            {EN_PRODUCCION.map((p, i) => (
              <Fila key={p.nombre} p={p} n={String(i + 1).padStart(2, "0")} />
            ))}

            <Encabezado
              titulo="Proyectos de estudio"
              nota="Sitios que diseñé y construí completos para negocios reales de la región, por iniciativa propia. Cada uno está terminado."
            />
            {DE_ESTUDIO.map((p, i) => (
              <Fila
                key={p.nombre}
                p={p}
                n={String(EN_PRODUCCION.length + i + 1).padStart(2, "0")}
              />
            ))}
          </Acordeon.Root>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * Separador de grupo dentro de la lista.
 *
 * Va DENTRO del acordeón, no fuera en dos listas: así las flechas del teclado
 * recorren los seis expedientes seguidos, que es como se leen. El grupo lo dice
 * una regla con etiqueta, no una caja aparte.
 */
function Encabezado({ titulo, nota }: { titulo: string; nota: string }) {
  return (
    <div className="border-b border-line bg-ink/[0.035] px-5 py-3.5">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className="jv-eyebrow text-primary-dark">
          {titulo}
        </h3>
        <p className="min-w-0 font-body text-xs leading-relaxed text-ink-soft">{nota}</p>
      </div>
    </div>
  );
}

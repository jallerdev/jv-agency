import Link from "next/link";

import { SERVICIOS, type ServicioId } from "@/lib/services";
import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  ArrowUpRight,
  Boxes,
  Code2,
  LifeBuoy,
  MessageSquareText,
  Palette,
  Search,
} from "lucide-react";

/* La rejilla es de 5 columnas: cada fila tiene que sumar 5.
     fila 1 -> 3 + 2  ·  fila 2 -> 2 + 3  ·  fila 3 -> 3 + 2
   Esa regla se respeta, pero ahora significa algo: la tarjeta ANCHA (3) se
   compone en horizontal -icono a un lado, texto al otro- y la ESTRECHA (2) se
   apila. Asi la alternancia 3+2 / 2+3 / 3+2 se ve, en lugar de ser seis cajas
   iguales de distinto ancho.

   Aqui solo vive la PRESENTACION. El nombre y la descripcion salen de
   lib/services.ts, para que la portada y el formulario de agendamiento no se
   vuelvan a desincronizar.

   `tier` es lo que decide el peso visual, y es de tres niveles porque antes
   habia tres servicios marcados como destacados que se distinguian por cuatro
   puntos de luminancia: nadie los veia.
     ancla     -> uno solo. Superficie teñida, icono grande, titular de 30px,
                  filigrana del icono al fondo y composicion de poster.
     destacado -> los dos que se estan empujando. Icono en degradado pleno.
     base      -> icono en contorno, sin relleno. El degradado deja de ser el
                  papel tapiz de la seccion y vuelve a significar jerarquia. */
type Tier = "ancla" | "destacado" | "base";

const PRESENTACION: Record<
  ServicioId,
  { icon: typeof Code2; ancho: 2 | 3; tier: Tier }
> = {
  web:      { icon: Code2,             ancho: 3, tier: "ancla" },
  chatbot:  { icon: MessageSquareText, ancho: 2, tier: "destacado" },
  seo:      { icon: Search,            ancho: 2, tier: "destacado" },
  software: { icon: Boxes,             ancho: 3, tier: "base" },
  design:   { icon: Palette,           ancho: 3, tier: "base" },
  support:  { icon: LifeBuoy,          ancho: 2, tier: "base" },
};

const SERVICES = SERVICIOS.map((s) => ({
  title: s.nombre,
  desc: s.desc,
  href: s.href,
  ...PRESENTACION[s.id],
}));

type Service = (typeof SERVICES)[number];

/** Superficie de la tarjeta. Un grado de diferencia, no un matiz. */
const SUPERFICIE: Record<Tier, string> = {
  ancla:
    "border-primary/30 bg-gradient-to-br from-primary/[0.10] via-surface to-accent/[0.07] shadow-soft",
  destacado: "border-secondary/40 bg-surface",
  base: "border-line bg-surface/60",
};

/** El cuadro del icono. El degradado se gana; el resto va en contorno. */
const CHIP: Record<Tier, string> = {
  ancla:
    "h-16 w-16 rounded-xl bg-gradient-to-br from-primary to-accent text-surface shadow-soft",
  destacado:
    "h-14 w-14 rounded-lg bg-gradient-to-br from-primary to-accent text-surface shadow-soft",
  base: "h-12 w-12 rounded-lg border border-primary/25 bg-primary/[0.07] text-primary",
};

const GLIFO: Record<Tier, string> = {
  ancla: "h-8 w-8",
  destacado: "h-7 w-7",
  base: "h-6 w-6",
};

/* Escalon real de titulos de tarjeta: 30 / 24 / 20 px. Antes los seis eran
   24 px y nada decia cual era el servicio principal. */
const TITULO: Record<Tier, string> = {
  ancla: "text-[1.75rem]/[1.15] sm:text-3xl/[1.15]",
  destacado: "text-2xl/[1.2]",
  base: "text-xl/[1.3]",
};

function Chip({ s }: { s: Service }) {
  const Icon = s.icon;
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center transition-transform duration-slow ease-spring motion-reduce:transform-none",
        CHIP[s.tier],
        s.href && "group-hover:scale-105 group-focus-visible:scale-105"
      )}
    >
      <Icon
        aria-hidden="true"
        strokeWidth={s.tier === "base" ? 1.75 : 1.5}
        className={GLIFO[s.tier]}
      />
    </span>
  );
}

function VerElServicio() {
  return (
    <span className="mt-auto inline-flex w-fit items-center gap-1.5 pt-6 font-body text-sm font-semibold text-primary-dark">
      Ver el servicio
      <ArrowUpRight
        aria-hidden="true"
        strokeWidth={2}
        className="h-4 w-4 transition-transform duration-base ease-state group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-focus-visible:-translate-y-0.5 group-focus-visible:translate-x-0.5 motion-reduce:transform-none"
      />
    </span>
  );
}

function Contenido({ s }: { s: Service }) {
  const Icon = s.icon;

  /* El ancla se compone como un poster: icono y titular arriba, y la
     descripcion anclada al pie tras una regla. La fila la marca la tarjeta mas
     larga, asi que en vez de dejar media tarjeta vacia, ese aire pasa a ser la
     separacion entre el titular y el texto. */
  if (s.tier === "ancla") {
    return (
      <>
        <Icon
          aria-hidden="true"
          strokeWidth={0.75}
          className="pointer-events-none absolute -right-12 -top-12 hidden h-56 w-56 rotate-6 text-primary/[0.07] sm:block"
        />
        <div className="relative">
          <Chip s={s} />
          <h3 className={cn("mt-7 font-display text-ink", TITULO.ancla)}>
            {s.title}
          </h3>
        </div>
        <div className="relative mt-8 border-t border-primary/15 pt-6 lg:mt-auto">
          <p className="max-w-[50ch] font-body text-lg leading-relaxed text-ink-soft">
            {s.desc}
          </p>
        </div>
      </>
    );
  }

  /* Las demas son un objeto multimedia: icono a un lado, texto al otro.
     Por debajo de lg todas ocupan el ancho completo, asi que todas van en
     horizontal; a partir de lg solo las anchas mantienen esa composicion y las
     estrechas vuelven a apilarse. */
  return (
    <div
      className={cn(
        "relative flex h-full flex-col sm:grid sm:grid-cols-[auto_1fr] sm:gap-x-6",
        s.ancho === 3 ? "sm:content-center" : "lg:flex lg:flex-col"
      )}
    >
      <Chip s={s} />
      <div
        className={cn(
          "mt-6 flex flex-1 flex-col sm:mt-0",
          s.ancho === 2 && "lg:mt-6"
        )}
      >
        <h3 className={cn("font-display text-ink", TITULO[s.tier])}>{s.title}</h3>
        <p className="mt-3 max-w-[54ch] font-body leading-relaxed text-ink-soft">
          {s.desc}
        </p>
        {s.href && <VerElServicio />}
      </div>
    </div>
  );
}

export function Benefits() {
  return (
    /* Ritmo de sección del sitio: py-24 / md:py-32, el mismo que usan Proceso,
       Quién está detrás, Testimonios y Preguntas. Traía `pt-28 md:pt-40` y,
       como Portfolio ya cierra con `pb-32`, el hueco contra la sección de
       arriba salía de 288px —el mayor de la portada, 32px más que cualquier
       otra costura— y se leía como un salto de página. Nadie podía verlo
       desde dentro de un solo componente. */
    <section id="servicios" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <Reveal stagger distance="lg">
            <Badge>Lo que hacemos</Badge>
            <h2 className="mt-6 text-balance font-display text-4xl/[1.15] text-ink sm:text-5xl/[1.08]">
              Páginas web, tiendas online{" "}
              <span className="text-metal text-metal-block">
                y chatbots de WhatsApp.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="font-body text-lg leading-relaxed text-ink-soft lg:pb-2">
              No necesitas un diseñador por un lado y un programador por otro. Necesitas un equipo
              donde las dos cosas se hablan desde el primer día. Eso somos — y desde que Meta nos
              verificó como proveedor de tecnología, también dejamos tu WhatsApp contestando solo.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-5">
          {SERVICES.map((s, i) => {
            /* Solo los servicios que ya tienen pagina propia son enlace, y solo
               ellos se elevan y llevan flecha. Antes cinco tarjetas muertas
               prometian un clic que no llevaba a ninguna parte. */
            const clase = cn(
              "group relative flex h-full flex-col overflow-hidden rounded-2xl border p-7 transition-card duration-slow ease-state sm:p-8",
              SUPERFICIE[s.tier],
              s.href &&
                "hover:-translate-y-1 hover:border-primary/45 hover:shadow-lift focus-visible:-translate-y-1 focus-visible:shadow-lift active:translate-y-0 active:duration-quick motion-reduce:transform-none"
            );

            return (
              <Reveal
                key={s.title}
                index={i}
                className={s.ancho === 3 ? "lg:col-span-3" : "lg:col-span-2"}
              >
                {s.href ? (
                  <Link href={s.href} className={clase}>
                    <Contenido s={s} />
                  </Link>
                ) : (
                  <div className={clase}>
                    <Contenido s={s} />
                  </div>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

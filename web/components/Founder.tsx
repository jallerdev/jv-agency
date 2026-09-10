"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Linkedin, Github } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";

/**
 * Quién está detrás, en la portada.
 *
 * No es vanidad: para Google, la experiencia demostrable de una persona con
 * nombre y perfiles verificables (E-E-A-T) pesa en consultas competidas, y
 * desde diciembre de 2025 aplica a todas, no solo a las de salud o dinero.
 * Y para el cliente pesa más todavía: cuando contrata un estudio pequeño,
 * quiere saber a quién le está entregando su proyecto.
 *
 * Los datos salen de los mismos de /sobre-nosotros. Nada inventado.
 *
 * Es componente de cliente por una sola razón: las cifras cuentan al entrar
 * en pantalla. Todo lo demás es marcado estático.
 */
const FOUNDER = {
  name: "Luis Jaller",
  role: "Diseñador web y desarrollador",
  linkedin: "https://www.linkedin.com/in/jallerdev",
  github: "https://github.com/jallerdev",
};

type Stat = {
  /** La cifra. Se cuenta desde cero al entrar en pantalla si `count` es true. */
  value: number;
  /** Va antes de la cifra y no cuenta: el "<" de un tope ("menos de"). */
  prefix?: string;
  /** Va después y es parte de la cifra: el "+" de "3+". Se pinta en cobre. */
  suffix?: string;
  /** La unidad. Va separada del número, como manda la RAE, y en tinta. */
  unit?: string;
  /** No todo número es un contador: un tope no es una suma. */
  count?: boolean;
  /**
   * Dato sin confirmar. Se pinta este texto en lugar de la cifra y queda A LA
   * VISTA: antes de publicar hay que reemplazarlo por el dato o borrar la
   * línea entera. Una cifra inventada cuesta más que un hueco.
   */
  pending?: string;
  label: string;
};

const STATS: Stat[] = [
  { value: 3, suffix: "+", count: true, label: "años construyendo producto" },
  { value: 11, suffix: "+", count: true, label: "proyectos en producción" },
  /* Confirmado por Luis el 9 de septiembre de 2026. No lleva contador: no es
     una cantidad que crezca, es un tope. */
  { value: 0, pending: "<24 h", label: "tiempo de respuesta" },
];

const COUNT_DURATION = 900;

/**
 * Cuenta de 0 al valor final cuando el número entra en pantalla.
 *
 * Tres reglas:
 *  1. El estado inicial es el valor FINAL, no cero: así el HTML del servidor
 *     —y quien navegue sin JavaScript, y Google— ve "11+", nunca "0+".
 *  2. Si el número ya está a la vista al montar, no se anima: contar algo que
 *     el usuario ya leyó se ve como un error, no como un detalle.
 *  3. Con prefers-reduced-motion no se cuenta nada. La cifra es el dato; la
 *     animación es opcional y se apaga entera.
 */
function useCountUp(target: number, enabled: boolean) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(target);

  useEffect(() => {
    const node = ref.current;
    if (!node || !enabled) return;

    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") return;

    const box = node.getBoundingClientRect();
    if (box.top < window.innerHeight && box.bottom > 0) return;

    setShown(0);

    let raf = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / COUNT_DURATION, 1);
          /* Misma intención que --ease-entrance: llega rápido y aterriza. */
          const eased = 1 - Math.pow(1 - t, 3);
          setShown(Math.round(target * eased));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 }
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, enabled]);

  return { ref, shown };
}

function StatItem({ stat }: { stat: Stat }) {
  const { ref, shown } = useCountUp(stat.value, Boolean(stat.count));

  return (
    /* El <dt> es la etiqueta y el <dd> la cifra, que es como se define una
       lista de descripción. El orden visual —cifra arriba, etiqueta abajo— lo
       pone el flex, no el marcado. */
    <div className="jv-cap flex flex-row-reverse items-baseline justify-between gap-4 py-4 sm:flex-col-reverse sm:items-start sm:justify-start sm:gap-1.5 sm:py-0 sm:pl-7 sm:first:pl-0">
      <dt className="font-body text-sm leading-snug text-ink-soft sm:text-xs">{stat.label}</dt>
      <dd className="text-halcon font-display text-2xl leading-none tabular-nums sm:text-[1.75rem]">
        {stat.pending ? (
          <span className="font-mono text-xs leading-snug tracking-[0.02em] text-accent-ink">
            {stat.pending}
          </span>
        ) : (
          <>
            {stat.prefix && (
              <span className="font-mono text-base text-ink-soft" aria-hidden="true">
                {stat.prefix}
              </span>
            )}
            <span ref={ref}>{shown}</span>
            {stat.suffix && <span className="text-accent">{stat.suffix}</span>}
            {stat.unit && <span className="text-[0.7em] text-ink-soft"> {stat.unit}</span>}
          </>
        )}
      </dd>
    </div>
  );
}

export function Founder() {
  return (
    <section id="quien" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal
          as="article"
          distance="lg"
          className="jv-card/80 p-6 shadow-soft sm:p-9 md:p-12"
        >
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
            {/* Identidad. El monograma no es un avatar de relleno: es una placa
                —bisel, filete grabado y luz de arriba— con el pie de firma
                debajo. Cuando haya foto real, se reemplaza por <Image>. */}
            <div className="flex items-center gap-5 lg:block lg:w-44 lg:shrink-0">
              <span
                aria-hidden="true"
                className="relative grid h-[4.5rem] w-[4.5rem] shrink-0 place-items-center overflow-hidden rounded-[1.125rem] border border-line bg-raised sm:h-20 sm:w-20 lg:h-24 lg:w-24"
              >
                {/* El florón violeta detrás de las iniciales, en vez del bisel de cobre
                    con filete grabado: sobre oscuro un bisel se lee como un botón
                    de escritorio de 2008, y el florón es el recurso que el sistema
                    ya usa para dar presencia sin dibujar una caja. */}
                <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_80%_at_50%_0%,var(--accent-quiet),transparent_70%)]" />
                
                <span className="text-halcon relative font-display text-[1.6rem] tracking-[0.08em] sm:text-3xl lg:text-[2.15rem]">
                  LJ
                </span>
              </span>

              <div className="min-w-0 lg:mt-5">
                <span
                  aria-hidden="true"
                  className="mb-3 hidden h-px w-8 bg-line lg:block"
                />
                {/* Una línea por oficio: si el rol vuelve a llevar un "·", ese
                    separador queda colgando al final del renglón en la columna
                    estrecha. Partirlo evita el cuelgue. */}
                <p className="font-mono text-[11px] uppercase leading-[1.7] tracking-[0.12em] text-accent-ink">
                  {FOUNDER.role.split("·").map((part) => (
                    <span key={part} className="block">
                      {part.trim()}
                    </span>
                  ))}
                </p>
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <Badge>Quién está detrás</Badge>

              <h2 className="mt-5 font-display text-[1.75rem]/[1.2] text-balance text-ink sm:text-4xl/[1.15]">
                Quién hace tu página web: {FOUNDER.name}
              </h2>

              <p className="mt-5 max-w-[46ch] font-body text-base leading-relaxed text-ink-soft sm:text-lg">
                Aquí no hay ejecutivo de cuentas ni cadena de correos.{" "}
                <strong className="font-semibold text-ink">Hablas conmigo</strong>, y el que diseña y
                escribe el código soy yo. Eso tiene un límite —no tomo veinte proyectos a la vez— y
                una ventaja: nada se pierde entre lo que pides y lo que se construye.
              </p>

              {/* Las cifras son el único dato duro de la sección: dejan de ser
                  texto suelto y pasan a ser una banda con filetes, cifras
                  tabulares y una cuenta que aterriza al entrar en pantalla. */}
              <dl className="mt-9 grid max-w-2xl grid-cols-1 divide-y divide-line border-y border-line sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:border-b-0 sm:pt-6">
                {STATS.map((s) => (
                  <StatItem key={s.label} stat={s} />
                ))}
              </dl>

              {/* En móvil, dos filas limpias: primero a dónde lleva el estudio,
                  después los perfiles. Envueltos en una sola fila, "GitHub"
                  caía solo en un tercer renglón. */}
              <div className="mt-8 flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-5">
                <Link
                  href="/sobre-nosotros"
                  className="tap-target group -mx-2 inline-flex items-center gap-1.5 rounded-lg px-2 font-body text-sm font-medium text-primary-dark underline decoration-primary/40 underline-offset-4 transition-surface duration-quick ease-state hover:text-primary hover:decoration-primary"
                >
                  Más sobre mí
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-base ease-state group-hover:translate-x-0.5"
                    strokeWidth={2}
                  />
                </Link>
                <span className="hidden h-4 w-px bg-line sm:block" aria-hidden="true" />
                <div className="flex items-center gap-5">
                  <a
                    href={FOUNDER.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tap-target -mx-2 inline-flex items-center gap-1.5 rounded-lg px-2 font-body text-sm text-ink-soft transition-surface duration-quick ease-state hover:text-ink"
                  >
                    <Linkedin className="h-4 w-4" strokeWidth={2} /> LinkedIn
                  </a>
                  <a
                    href={FOUNDER.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tap-target -mx-2 inline-flex items-center gap-1.5 rounded-lg px-2 font-body text-sm text-ink-soft transition-surface duration-quick ease-state hover:text-ink"
                  >
                    <Github className="h-4 w-4" strokeWidth={2} /> GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

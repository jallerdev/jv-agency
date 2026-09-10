import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

import { HERO } from "@/content/home/hero";
import type { Idioma } from "@/content/types";
import { Eyebrow, Titular } from "@/components/ui/seccion";
import { Blobs } from "@/components/Blobs";

/**
 * El hero.
 *
 * El fondo es el campo de manchas más el florón naranja al 8%, que es lo que
 * pide la especificación en lugar del vídeo de la referencia. Un vídeo de fondo
 * aquí sería además una promesa que el estudio no puede cumplir: no hay metraje
 * propio, y el de banco insinúa un equipo que no existe.
 *
 * Dos columnas asimétricas: el argumento a la izquierda con siete de doce, y la
 * credencial de Meta a la derecha. Ese sitio lo ocupaba en la referencia un
 * racimo de avatares de clientes; aquí lo ocupa el único aval verificable que
 * hay, que vale más que cinco caras.
 */
export function Hero({ idioma }: { idioma: Idioma }) {
  const [principal, secundario] = HERO.botones;

  return (
    <section
      id="top"
      className="jv-bloom relative flex min-h-[calc(100svh-var(--header-h))] items-center overflow-hidden pt-28 pb-20"
    >
      <Blobs />

      <div className="relative mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center gap-y-14 px-6 md:px-12 lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:col-span-7">
          <Eyebrow className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2">
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full bg-brand"
            />
            {HERO.eyebrow![idioma]}
          </Eyebrow>

          <Titular
            as="h1"
            texto={HERO.titulo[idioma]}
            acento={HERO.acento?.[idioma]}
            className="mt-7"
          />

          <p className="mt-7 max-w-[38rem] text-pretty text-lg leading-relaxed text-ink-soft">
            {HERO.entradilla![idioma]}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={principal.href[idioma]}
              className="tap-target group inline-flex items-center justify-center gap-2 rounded-full bg-brand px-7 py-4 font-semibold text-on-accent transition-colors duration-base ease-ps hover:bg-brand-600"
            >
              {principal.texto[idioma]}
              <ArrowRight
                className="h-5 w-5 transition-transform duration-base ease-ps group-hover:translate-x-1"
                strokeWidth={2}
              />
            </Link>
            <Link
              href={secundario.href[idioma]}
              className="tap-target inline-flex items-center justify-center rounded-full border border-line px-7 py-4 font-semibold text-ink transition-colors duration-base ease-ps hover:border-brand hover:text-brand"
            >
              {secundario.texto[idioma]}
            </Link>
          </div>

          <p className="mt-6 text-sm text-ink-soft">
            {HERO.precio.texto[idioma]}{" "}
            <Link
              href={HERO.precio.enlace.href[idioma]}
              className="group relative font-semibold text-ink"
            >
              {HERO.precio.enlace.texto[idioma]}
              <span
                aria-hidden
                className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-brand transition-transform duration-base ease-ps group-hover:scale-x-100 group-focus-visible:scale-x-100"
              />
            </Link>
          </p>
        </div>

        {/* La credencial. Superficie elevada y filete, sin sombra. */}
        <aside className="jv-card p-7 lg:col-span-5">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-[--radius-md] bg-brand-quiet text-brand">
            <ShieldCheck className="h-5 w-5" strokeWidth={2} />
          </span>

          <p className="jv-eyebrow mt-6 text-brand">
            {HERO.credencial.sello[idioma]}
          </p>
          <p className="jv-titulo mt-2">{HERO.credencial.titulo[idioma]}</p>
          <p className="mt-4 text-pretty text-sm leading-relaxed text-ink-soft">
            {HERO.credencial.cuerpo[idioma]}
          </p>

          <p className="jv-rule mt-6 flex items-center gap-2 pt-5 font-mono text-xs uppercase tracking-[0.12em] text-ink-muted">
            {/* El punto de «en línea»: el quinto y último sitio del naranja. */}
            <span aria-hidden className="jv-latido h-1.5 w-1.5 rounded-full bg-brand" />
            {HERO.credencial.fecha[idioma]}
          </p>
        </aside>
      </div>
    </section>
  );
}

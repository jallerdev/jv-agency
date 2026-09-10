import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { HERO } from "@/content/home/hero";
import { enlaceReal } from "@/lib/rutas";
import { LuzPuntero } from "@/components/LuzPuntero";
import { SelloVerificado } from "@/components/SelloVerificado";
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
              href={enlaceReal(principal.href[idioma])}
              className="tap-target group inline-flex items-center justify-center gap-2 rounded-full bg-brand px-7 py-4 font-semibold text-on-accent transition-colors duration-base ease-ps hover:bg-brand-600"
            >
              {principal.texto[idioma]}
              <ArrowRight
                className="h-5 w-5 transition-transform duration-base ease-ps group-hover:translate-x-1"
                strokeWidth={2}
              />
            </Link>
            <Link
              href={enlaceReal(secundario.href[idioma])}
              className="tap-target inline-flex items-center justify-center rounded-full border border-line px-7 py-4 font-semibold text-ink transition-colors duration-base ease-ps hover:border-brand hover:text-brand"
            >
              {secundario.texto[idioma]}
            </Link>
          </div>

          <p className="mt-6 text-sm text-ink-soft">
            {HERO.precio.texto[idioma]}{" "}
            <Link
              href={enlaceReal(HERO.precio.enlace.href[idioma])}
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

        {/* ── LA CREDENCIAL ───────────────────────────────────────────────
            Es el activo más fuerte del sitio —una verificación de Meta que
            existe de verdad— y estaba resuelto como una tarjeta cualquiera con
            un icono de librería dentro. Ahora se compone como un documento
            acreditativo y se mueve como algo vigente:

            · FILETE QUE GIRA alrededor del borde (el recurso de Linear).
              Dice «esto sigue en vigor», que es lo único que una credencial
              necesita decir además de lo que declara.
            · DESTELLO QUE CRUZA cada siete segundos (Stripe, Lovable). Es el
              reflejo del papel satinado de un título impreso.
            · LUZ QUE SIGUE AL PUNTERO (Linear, Stripe). El único de los tres
              que responde a la persona; es el que la vuelve un objeto.
            · EL VISTO SE DIBUJA SOLO al entrar en pantalla.

            Los cuatro se apagan enteros con `prefers-reduced-motion`, y lo que
            queda no es una tarjeta rota: es la misma credencial, quieta. */}
        <aside className="jv-cred jv-card overflow-hidden p-7 lg:col-span-5">
          <LuzPuntero />

          {/* El lomo encuadernado: el canto de un documento, no el borde de una
              tarjeta. Es el mismo gesto de la variante ancha del sello. */}
          <span
            aria-hidden
            className="absolute inset-y-0 left-0 z-[3] w-[3px] bg-gradient-to-b from-brand-300 via-brand to-brand-700"
          />
          {/* Guilloché: los anillos concéntricos grabados de los títulos y los
              certificados. Al 7% es textura, no dibujo. */}
          <span
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[repeating-radial-gradient(circle_at_50%_50%,rgba(232,98,63,0.07)_0_1px,transparent_1px_10px)] [-webkit-mask-image:radial-gradient(circle_at_50%_50%,#000_38%,transparent_72%)] [mask-image:radial-gradient(circle_at_50%_50%,#000_38%,transparent_72%)]"
          />

          <div className="relative z-[3] pl-1">
            {/* El sello, montado sobre papel y con su anillo de troquel. */}
            <span className="relative inline-flex w-fit">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-brand/25 bg-gradient-to-br from-canvas to-surface">
                <SelloVerificado className="h-8 w-8" />
              </span>
              <span
                aria-hidden
                className="absolute -inset-1.5 rounded-full border border-dashed border-brand/25"
              />
            </span>

            <p className="jv-eyebrow mt-6 text-brand">{HERO.credencial.sello[idioma]}</p>
            <p className="jv-titulo mt-2">{HERO.credencial.titulo[idioma]}</p>
            <p className="mt-4 text-pretty text-sm leading-relaxed text-ink-soft">
              {HERO.credencial.cuerpo[idioma]}
            </p>

            <p className="jv-rule mt-6 flex items-center gap-2 pt-5 font-mono text-xs uppercase tracking-[0.12em] text-ink-muted">
              {/* El punto que late: dice que la verificación está vigente HOY,
                  no que existió en julio. */}
              <span aria-hidden className="jv-latido h-1.5 w-1.5 rounded-full bg-success" />
              {HERO.credencial.fecha[idioma]}
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}

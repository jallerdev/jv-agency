import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/* ==========================================================================
   HERO
   Dos decisiones de fondo, las dos por el mismo motivo: el hero era correcto
   y olvidable.

   1) LA ENTRADA. Antes: cinco elementos con el mismo fade + 16px, escalonados
      a mano (80/200/340/480/600 ms). Todo llegaba igual, así que nada llegaba.
      Ahora el titular entra por LÍNEAS, cada una desde debajo de su propio
      recorte —el gesto de una máquina de componer— y el resto del bloque le
      sigue con el fade del sistema. El barrido metálico pasa UNA vez, cuando
      la segunda línea ya se asentó, y se queda quieto: el h1 es el elemento
      LCP y no puede estar moviéndose para siempre.

   2) EL FONDO. Antes: dos orbes de 28rem con blur-3xl, uno de ellos con
      `animate-float` moviendo 10px un difuminado de 448px —imperceptible y
      caro—. Es además el recurso más genérico que existe. Ahora el fondo es
      la mesa de trabajo del estudio: retícula fina de composición, las dos
      guías verticales de la columna de texto, marcas de registro en las
      esquinas (las de imprenta) y UNA sola luz cálida rasante que respira
      despacio. Se lee como taller, no como plantilla, y no cuesta un blur a
      pantalla completa por fotograma.

   Todo el movimiento es CSS: sin JavaScript el hero se ve igual, y con
   prefers-reduced-motion aparece entero y quieto (bloque al final del CSS).
   ========================================================================== */

const HERO_CSS = `
@keyframes jv-hero-line { from { transform: translate3d(0, 108%, 0); } to { transform: none; } }
@keyframes jv-hero-in   { from { opacity: 0; transform: translate3d(0, 14px, 0); } to { opacity: 1; transform: none; } }
@keyframes jv-hero-sheen{ from { background-position: 200% 0; } to { background-position: 0 0; } }
@keyframes jv-hero-decor{ from { opacity: 0; } to { opacity: 1; } }
@keyframes jv-hero-rule { from { transform: scaleY(0); } to { transform: scaleY(1); } }

/* Recorte por línea. clip-path en vez de overflow-hidden para poder abrir el
   borde inferior lo justo (los descendentes de "q" y "g" con leading 1,03 se
   salen de la caja) sin que asome la línea que todavía no ha entrado: la que
   espera está una altura completa más abajo. */
.jv-hero-line { display: block; clip-path: inset(-0.5em -0.9em -0.24em -0.9em); }
.jv-hero-line > span {
  display: block;
  animation: jv-hero-line 900ms var(--ease-entrance) both;
  animation-delay: var(--jv-delay, 0ms);
}
.jv-hero-in {
  animation: jv-hero-in var(--duration-ambient) var(--ease-entrance) both;
  animation-delay: var(--jv-delay, 0ms);
}
/* Un solo barrido, y el degradado se queda en su posición de reposo. */
.jv-hero-sheen { animation: jv-hero-sheen 1500ms var(--ease-entrance) 700ms both; }
.jv-hero-decor { animation: jv-hero-decor 1400ms var(--ease-entrance) both; }
.jv-hero-rule  { transform-origin: top; animation: jv-hero-rule 1200ms var(--ease-entrance) 160ms both; }

/* Luz rasante: una banda cálida que cruza el papel, no un orbe difuminado. */
.jv-hero-wash {
  background-image:
    linear-gradient(112deg, transparent 20%, rgba(192, 118, 59, 0.15) 44%, rgba(224, 160, 98, 0.10) 58%, transparent 80%),
    radial-gradient(58rem 26rem at 50% -14%, rgba(176, 137, 104, 0.20), transparent 70%);
}

@media (prefers-reduced-motion: reduce) {
  .jv-hero-line { clip-path: none !important; }
  .jv-hero-line > span,
  .jv-hero-in,
  .jv-hero-sheen,
  .jv-hero-decor,
  .jv-hero-rule {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
}
`;

/* Marcas de registro: las cuatro esquinas de la columna de texto. */
const REGISTRO = [
  "left-0 top-0 border-l border-t",
  "right-0 top-0 border-r border-t",
  "left-0 bottom-0 border-l border-b",
  "right-0 bottom-0 border-r border-b",
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-14 md:pt-44 md:pb-20">
      <style href="jv-hero" precedence="default" dangerouslySetInnerHTML={{ __html: HERO_CSS }} />

      {/* ── Fondo: mesa de trabajo ─────────────────────────────────────── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="jv-hero-decor absolute inset-0">
          <div className="jv-hero-wash absolute inset-0 animate-ambient-glow" />
        </div>
      </div>

      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-5 text-center md:px-8">
        {/* Guías de la columna de texto: la medida, dibujada. */}
        <span
          aria-hidden
          className="jv-hero-rule pointer-events-none absolute inset-y-0 left-0 hidden w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent md:block"
        />
        <span
          aria-hidden
          className="jv-hero-rule pointer-events-none absolute inset-y-0 right-0 hidden w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent md:block"
        />
        {REGISTRO.map((pos) => (
          <span
            key={pos}
            aria-hidden
            className={cn(
              "jv-hero-decor pointer-events-none absolute hidden h-3.5 w-3.5 border-primary/35 md:block",
              pos
            )}
          />
        ))}

        <Badge className="jv-hero-in text-[10px] tracking-[0.14em] sm:text-xs sm:tracking-[0.18em]">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
          Estudio de diseño + código · LATAM
        </Badge>

        {/* El titular entra por líneas. El interlineado va emparejado con el
            tamaño en cada breakpoint (`text-…/[…]`): escrito suelto,
            `sm:text-6xl` traía su propio line-height 1 y pisaba a
            `leading-tight`, así que en escritorio el h1 renderizaba a
            ratio 1,0 y los descendentes casi tocaban la línea siguiente. */}
        <h1 className="mt-7 text-balance font-display text-[2.85rem]/[1.06] font-light tracking-[-0.02em] text-ink sm:mt-8 sm:text-6xl/[1.04] lg:text-[5rem]/[1.02]">
          <span className="jv-hero-line">
            <span style={{ "--jv-delay": "120ms" } as React.CSSProperties}>
              Diseño de páginas web
            </span>
          </span>
          <span className="jv-hero-line">
            <span style={{ "--jv-delay": "260ms" } as React.CSSProperties}>
              que hacen que{" "}
              <span className="text-metal jv-hero-sheen font-normal italic">
                te tomen en serio.
              </span>
            </span>
          </span>
        </h1>

        <p
          className="jv-hero-in mt-6 max-w-[46ch] text-pretty font-body text-base leading-relaxed text-ink-soft sm:mt-7 sm:max-w-2xl sm:text-lg"
          style={{ "--jv-delay": "520ms" } as React.CSSProperties}
        >
          Diseño y desarrollo en el mismo equipo. Tu web o tu software con el acabado de una
          marca grande por fuera y la solidez de un buen producto por dentro —sin presupuesto
          corporativo.
        </p>

        {/* Dos CTAs del mismo ancho en móvil. Antes cada botón tomaba el ancho
            de su texto y quedaban centrados con bordes desiguales. */}
        <div
          className="jv-hero-in mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4"
          style={{ "--jv-delay": "640ms" } as React.CSSProperties}
        >
          <Button size="lg" variant="primary" className="w-full sm:w-auto" asChild>
            <a href="#contacto">
              Agenda una llamada
              <ArrowRight className="h-5 w-5" strokeWidth={1.75} />
            </a>
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
            <a href="#trabajo">Ver nuestro trabajo</a>
          </Button>
        </div>

        {/* Tercera opción, sin caja: era una píldora con borde que competía en
            peso con los dos botones y que a 390px chocaba con el botón
            flotante de WhatsApp. Ahora es una línea de apoyo. */}
        <p
          className="jv-hero-in mt-5 text-pretty font-body text-sm text-ink-soft"
          style={{ "--jv-delay": "740ms" } as React.CSSProperties}
        >
          <a
            href="#contacto"
            className="group inline rounded-sm transition-surface duration-quick ease-state hover:text-ink"
          >
            Cuéntanos tu proyecto —{" "}
            <strong className="font-semibold text-primary-dark underline decoration-primary/30 decoration-1 underline-offset-4 transition-surface duration-quick ease-state group-hover:decoration-primary">
              presupuesto en la primera llamada
            </strong>
          </a>
        </p>
      </div>
    </section>
  );
}

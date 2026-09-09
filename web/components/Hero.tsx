import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { MetaTechProvider } from "@/components/MetaTechProvider";

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

export function Hero() {
  return (
    <section
      id="top"
      /* El hero medía 756px fijos: a 1920x930 dejaba 174px de la banda
         siguiente asomando, que se lee como un corte y no como una invitación
         a bajar. Ahora ocupa la pantalla menos 4,5rem, así que SIEMPRE asoma
         el mismo pellizco de lo que viene —lo justo para saber que hay más,
         sin que parezca que la página terminó.
         `svh` y no `vh`: en móvil `vh` mide la ventana sin la barra del
         navegador y el hero se pasa de largo. El mínimo solo entra en md+;
         abajo el contenido ya es más alto que la pantalla y forzarlo solo
         empujaría los botones fuera de vista. */
      className="relative flex items-center overflow-hidden pt-28 pb-14 md:min-h-[calc(100svh-4.5rem)] md:pt-32 md:pb-20"
    >
      <style href="jv-hero" precedence="default" dangerouslySetInnerHTML={{ __html: HERO_CSS }} />

      {/* ── Fondo: mesa de trabajo ─────────────────────────────────────── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="jv-hero-decor absolute inset-0">
          <div className="jv-hero-wash absolute inset-0 animate-ambient-glow" />
        </div>
      </div>

      {/* Rejilla editorial. El hero era una columna centrada y simetrica, y al
          entrar la credencial a la derecha quedo desequilibrado: composicion
          simetrica con un peso a un solo lado. En vez de devolver la credencial
          abajo, se asume la asimetria —que es hacia donde se movieron los
          heroes: rejilla editorial y tipografia primero, en vez de todo al
          centro. El texto toma siete columnas y la credencial cinco. */}
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-y-12 px-5 md:px-8 lg:grid-cols-12 lg:gap-x-12">
      <div className="relative flex flex-col items-center text-center lg:col-span-7 lg:items-start lg:text-left">
        {/* Medianil: la unica linea que queda. Separa el argumento de la
            credencial y solo existe donde existen las dos columnas. */}
        <span
          aria-hidden
          className="jv-hero-rule pointer-events-none absolute -right-6 inset-y-6 hidden w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent lg:block"
        />

        <Badge className="jv-hero-in text-[10px] tracking-[0.14em] sm:text-xs sm:tracking-[0.18em]">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
          Diseñador web y desarrollador · LATAM
        </Badge>

        {/* El titular entra por líneas. El interlineado va emparejado con el
            tamaño en cada breakpoint (`text-…/[…]`): escrito suelto,
            `sm:text-6xl` traía su propio line-height 1 y pisaba a
            `leading-tight`, así que en escritorio el h1 renderizaba a
            ratio 1,0 y los descendentes casi tocaban la línea siguiente. */}
        <h1 className="mt-7 text-balance font-display text-[2.85rem]/[1.06] font-light tracking-[-0.02em] text-ink sm:mt-8 sm:text-6xl/[1.04] lg:text-[3.5rem]/[1.05] xl:text-[4rem]/[1.03]">
          {/* El espacio explícito importa. Las dos líneas del titular son
              bloques distintos, así que la maqueta se ve bien igual; pero el
              textContent que lee un rastreador iba pegado —«páginas webque
              hacen»— y ahí se perdía el término exacto del h1 de la portada. */}
          <span className="jv-hero-line">
            <span style={{ "--jv-delay": "120ms" } as React.CSSProperties}>
              Diseño de páginas web{" "}
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
          Diseño y programo yo mismo. Tu web o tu software con el acabado de una marca
          grande por fuera y la solidez de un buen producto por dentro —sin presupuesto
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
            <a href="#trabajo">Ver mi trabajo</a>
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
            href="/precios"
            className="group inline rounded-sm transition-surface duration-quick ease-state hover:text-ink"
          >
            Página web desde{" "}
            <strong className="font-semibold text-primary-dark underline decoration-primary/30 decoration-1 underline-offset-4 transition-surface duration-quick ease-state group-hover:decoration-primary">
              $850.000 · lista en 5 días
            </strong>
          </a>
        </p>
      </div>

      {/* La credencial de Meta es el argumento mas fuerte que hay y estaba
          debajo del pliegue, en su propia seccion. Ahora es la segunda columna
          del hero: se ve en la primera pantalla y ya no flota en absoluto
          contra un hueco, que es lo que la hacia leerse como pegada encima. */}
      <div
        className="jv-hero-in mx-auto w-full max-w-xs lg:col-span-5 lg:mx-0 lg:ml-auto lg:max-w-sm"
        style={{ "--jv-delay": "860ms" } as React.CSSProperties}
      >
        <MetaTechProvider variant="rail" />
      </div>
      </div>
    </section>
  );
}

import { Plus } from "lucide-react";

import { MOSTRAR_PENDIENTES } from "@/components/Pendiente";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

/**
 * EL ACORDEÓN DE PREGUNTAS, AGRUPADO
 * ──────────────────────────────────────────────────────────────────────────
 * Quince preguntas seguidas son una lista que nadie recorre entera: el que
 * viene por el precio pasa por delante de «¿se ve bien en el celular?» sin
 * verla. Agrupadas por tema —precio, plazo, de quién es, Google, trabajar
 * contigo— se busca en cinco rótulos en vez de en quince frases.
 *
 * `<details>` Y NO RADIX, Y ESTA VEZ NO ES GUSTO
 * ---------------------------------------------
 * El acordeón de Radix DESMONTA lo que está cerrado: la respuesta no existe
 * en el DOM hasta que alguien hace clic. En una página cuyo argumento entero
 * son las respuestas incómodas, eso significa que catorce de las quince no
 * están en el HTML que rastrea Google ni en el que lee un resumen automático.
 * Con `<details>` el contenido va servido, abierto o cerrado, y además
 * funciona sin una línea de JavaScript.
 *
 * Lo que se pierde es la animación de alto, que Radix sí hace. Se cambia por
 * una entrada corta del contenido: se nota que abrió y no se paga con el
 * texto fuera del HTML.
 *
 * EL BOTÓN ES LA FILA ENTERA. `<summary>` con `min-height` de 44 px y el
 * cursor de mano: el objetivo táctil es toda la línea, no el signo de la
 * derecha, que a 16 px sería imposible de acertar con el pulgar.
 */

export type FaqItem = {
  q: string;
  a: React.ReactNode;
  /** Dato por comprobar. Se pinta en la fila, visible sin abrir. */
  verify?: string;
};

export type GrupoFaqItems = {
  titulo: string;
  items: readonly FaqItem[];
};

function Fila({ item, abierta }: { item: FaqItem; abierta: boolean }) {
  return (
    <details
      open={abierta}
      className="group/faq border-b border-line last:border-b-0 [&[open]_.jv-faq-mas]:rotate-45"
    >
      <summary className="jv-faq-fila flex min-h-11 cursor-pointer list-none items-start justify-between gap-5 py-5 text-ink transition-colors duration-base ease-ps hover:text-brand">
        <span className="text-[length:var(--text-h4)] font-semibold leading-snug">
          {item.q}
          {MOSTRAR_PENDIENTES && item.verify && (
            <span className="ml-2 align-middle font-mono text-xs uppercase tracking-[0.12em] text-warning">
              [verificar: {item.verify}]
            </span>
          )}
        </span>
        <Plus
          aria-hidden="true"
          strokeWidth={2}
          className="jv-faq-mas mt-1 h-5 w-5 shrink-0 text-ink-muted transition-transform duration-base ease-ps group-hover/faq:text-brand"
        />
      </summary>

      <div className="jv-faq-cuerpo pb-6 pr-10">
        <p className="leading-relaxed text-ink-soft">{item.a}</p>
      </div>
    </details>
  );
}

export function FaqAccordion({
  grupos,
  className,
}: {
  grupos: readonly GrupoFaqItems[];
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-12", className)}>
      {grupos.map((g, gi) => (
        <Reveal key={g.titulo} delay={Math.min(gi, 3) * 70}>
          {/* El rótulo del grupo va pegado a su lista con el filete: es el
              encabezado de esa tanda, no una sección aparte. */}
          <h3 className="jv-rule pb-3 jv-eyebrow text-ink-muted">{g.titulo}</h3>
          <div className="mt-1">
            {g.items.map((item, i) => (
              <Fila key={item.q} item={item} abierta={gi === 0 && i === 0} />
            ))}
          </div>
        </Reveal>
      ))}
    </div>
  );
}

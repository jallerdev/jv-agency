import { PROCESO } from "@/content/home/proceso";
import type { Idioma } from "@/content/types";
import { Seccion, EncabezadoSeccion } from "@/components/ui/seccion";

/**
 * Los cuatro pasos, apilados con sticky.
 *
 * Es el recurso más llamativo que tiene palo-seco y el que el dueño eligió para
 * esta sección. Cada tarjeta se clava a `top: calc(15vh + i × 14px)`, así que
 * al bajar se van amontonando con un escalón de 14 px entre una y otra: se ven
 * los cuatro cantos a la vez y se entiende que son una secuencia, no cuatro
 * cajas sueltas.
 *
 * POR QUÉ NO ES SOLO DECORACIÓN. Un proceso de cuatro pasos en rejilla se lee
 * de un vistazo y no se retiene; apilado, obliga a pasar por cada uno y el
 * orden queda claro. La animación dice lo mismo que el contenido.
 *
 * Con movimiento reducido, `position: static`: se convierte en una pila normal
 * y no secuestra el scroll de nadie.
 */
export function Proceso({ idioma }: { idioma: Idioma }) {
  return (
    <Seccion id="proceso">
      <EncabezadoSeccion contenido={PROCESO} idioma={idioma} />

      <ol className="jv-pila mt-16">
        {PROCESO.pasos.map((p, i) => (
          <li
            key={p.numero}
            className="jv-pila__item"
            style={{ "--i": i } as React.CSSProperties}
          >
            <article className="jv-card relative overflow-hidden p-8 md:p-12">
              {/* El numeral gigante en marca de agua, al 10%. Va detrás del
                  texto y `aria-hidden`: el número ya lo dice el <ol>. */}
              <span
                aria-hidden
                className="pointer-events-none absolute -right-2 -top-6 font-mono text-[7rem] font-semibold leading-none text-brand/10 md:text-[10rem]"
              >
                {p.numero}
              </span>

              <p className="font-mono text-sm tabular-nums text-brand">
                {p.numero}
              </p>
              <h3 className="jv-titulo mt-4 text-2xl md:text-3xl">
                {p.titulo[idioma]}
              </h3>
              <p className="mt-4 max-w-[38rem] text-pretty text-ink-soft">
                {p.cuerpo[idioma]}
              </p>
            </article>
          </li>
        ))}
      </ol>
    </Seccion>
  );
}

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
            {/* Relleno de palo-seco, no el nuestro: allí las tarjetas del
                apilado respiran con ~22 px y dejan que el texto sea el que
                ocupa sitio. Aquí eran 48 px a partir de md, y el resultado era
                una caja enorme con una frase pequeña en el medio. Baja el
                relleno y sube la letra: la misma altura de tarjeta dice el
                doble. */}
            <article className="jv-card relative overflow-hidden p-7 md:p-9">
              {/* El numeral gigante en marca de agua, al 10%. Va detrás del
                  texto y `aria-hidden`: el número ya lo dice el <ol>. */}
              <span
                aria-hidden
                className="pointer-events-none absolute -right-3 -top-8 font-mono text-[8rem] font-semibold leading-none text-brand/10 md:text-[12rem]"
              >
                {p.numero}
              </span>

              <p className="font-mono text-sm tabular-nums text-brand">
                {p.numero}
              </p>
              {/* La escala de palo-seco para un h3: clamp(1.35rem, 2.4vw,
                  1.9rem). Aquí sube un escalón porque la tarjeta es el único
                  elemento en pantalla mientras está clavada. */}
              <h3 className="jv-titulo mt-4 text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.15]">
                {p.titulo[idioma]}
              </h3>
              <p className="mt-4 max-w-[42rem] text-pretty text-[clamp(1.0625rem,1.5vw,1.25rem)] leading-relaxed text-ink-soft">
                {p.cuerpo[idioma]}
              </p>
            </article>
          </li>
        ))}
      </ol>
    </Seccion>
  );
}

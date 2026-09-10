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
            {/* LA ESCALA ES LA DE PALO-SECO, no la nuestra de antes.
                Allí cada tarjeta del apilado es una PANTALLA: ~470 px de alto,
                56 px de aire, titular de 40 px y el numeral gigante ocupando
                el tercio derecho. Aquí medía la mitad y el resultado era una
                caja con una frase pequeña en el medio, que es exactamente lo
                que Luis señaló. Ahora la tarjeta tiene alto mínimo, el titular
                sube a clamp(1.75rem, 3.6vw, 2.75rem) y el cuerpo a 1,25rem.

                Las pastillas de abajo son nuevas y hacen el trabajo que el
                párrafo no alcanza: dicen QUÉ SALE de cada paso. Sin ellas la
                mitad inferior de la tarjeta quedaba vacía. */}
            <article className="jv-card relative flex min-h-[22rem] flex-col justify-center overflow-hidden p-8 sm:p-12 md:min-h-[26rem] md:p-14">
              {/* El numeral en marca de agua ocupa el tercio derecho, como en
                  la referencia. Va detrás del texto y `aria-hidden`: el número
                  ya lo dice el <ol> y la etiqueta de arriba. */}
              <span
                aria-hidden
                className="pointer-events-none absolute -right-4 top-1/2 -translate-y-1/2 font-mono text-[9rem] font-semibold leading-none text-brand/10 sm:text-[13rem] md:-right-6 md:text-[17rem]"
              >
                {p.numero}
              </span>

              <div className="relative max-w-[46rem]">
                <p className="jv-eyebrow text-brand">
                  {PROCESO.rotulo[idioma]} {p.numero}
                </p>
                <h3 className="jv-titulo mt-5 text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.1]">
                  {p.titulo[idioma]}
                </h3>
                <p className="mt-5 max-w-[42rem] text-pretty text-[clamp(1.0625rem,1.6vw,1.25rem)] leading-relaxed text-ink-soft">
                  {p.cuerpo[idioma]}
                </p>

                <ul className="mt-8 flex flex-wrap gap-2">
                  {p.chips[idioma].map((c) => (
                    <li key={c} className="jv-chip jv-chip-off text-sm">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </Seccion>
  );
}

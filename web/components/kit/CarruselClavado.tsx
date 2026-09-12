import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { enlaceReal } from "@/lib/rutas";
import { cn } from "@/lib/utils";
import type { Idioma } from "@/content/types";

/**
 * EL CARRUSEL CLAVADO
 * ─────────────────────────────────────────────────────────────────────────
 * La sección se queda quieta mientras los paneles pasan de lado. Es el gesto
 * que la fase 3c dejaba pendiente y el que Luis señaló con la referencia de
 * palo-seco.
 *
 * CUÁNDO USARLO, Y CUÁNDO NO. Solo cuando hay entre tres y cinco paneles que
 * de verdad piden tamaño grande: una captura real que hay que poder mirar, un
 * titular corto y una frase. Con dos no hay recorrido que valga la pena; con
 * seis, la sección se vuelve un túnel del que no se sale. Y nunca en una
 * página que ya tiene su pieza firma: el encargo lo dice con esas palabras —un
 * solo momento «wow» por página—.
 *
 * NO SECUESTRA LA RUEDA. Todo el movimiento es una animación por scroll de
 * CSS —`animation-timeline`— sobre una sección alta con un bloque `sticky`
 * dentro. No hay `preventDefault`, ni listener de rueda, ni temporizador: el
 * visitante baja a su ritmo y, si sube, se deshace igual. Además corre en el
 * compositor, así que no cuesta un fotograma de JavaScript —que era la
 * objeción de peso en un sitio que vende velocidad—.
 *
 * SIN SOPORTE, EN MÓVIL O CON MOVIMIENTO REDUCIDO queda el carril con anclaje
 * que ya existía: se arrastra con el dedo, se mueve con rueda y con teclado, y
 * enseña el panel siguiente asomando por el borde. Nada de lo que se lee
 * depende del efecto, y por eso la mejora puede fallar sin consecuencias.
 *
 * EL CONTADOR «0N / 0M» NO ES ADORNO. Un carril horizontal esconde cuántos
 * faltan, y eso es lo único que alguien necesita saber para decidir si sigue.
 *
 * SIN TARJETA, Y A CASI TODA LA SECCIÓN. Lo pidió Luis con la referencia
 * delante: cada panel ocupa el ancho útil entero y no lleva recuadro. La razón
 * es de lectura, no de gusto: una tarjeta de 62 rem centrada en una pantalla de
 * 1440 deja dos franjas de fondo a los lados y el panel se lee como un objeto
 * que pasa por delante. A ancho completo, el panel ES la sección mientras está
 * clavada, que es lo que el gesto promete.
 *
 * Y al quitar el recuadro hay que devolverle al contenido la estructura que la
 * caja le daba: el número grande ancla la columna, un filete de 32 px separa el
 * rótulo, y el enlace pasa de mono pequeño a botón —sin borde alrededor, un
 * enlace de 12 px no se ve desde el otro lado de la pantalla—.
 */

export type PanelClavado = {
  numero: string;
  eyebrow: string;
  titulo: string;
  cuerpo: string;
  enlace: { texto: string; href: string };
  /** Captura real. Nunca banco de imágenes. */
  imagen: string;
  alt: string;
};

export function CarruselClavado({
  paneles,
  etiquetaAvance,
  className,
}: {
  paneles: readonly PanelClavado[];
  /** Qué anuncia la barra de avance a quien no la ve. */
  etiquetaAvance: string;
  className?: string;
  idioma?: Idioma;
}) {
  const total = String(paneles.length).padStart(2, "0");

  return (
    <div
      className={cn("jv-clavado", className)}
      style={{ "--jv-paneles": paneles.length } as React.CSSProperties}
    >
      <div className="jv-clavado__pin">
        <ul className="jv-clavado__riel">
          {paneles.map((p) => (
            <li key={p.numero} className="jv-clavado__panel">
              <article className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
                {/* ── La columna que habla ─────────────────────────────── */}
                <div className="order-2 lg:order-1">
                  {/* EL NÚMERO, GRANDE Y EN MONO. Es lo que dice cuántos
                      faltan sin tener que contar tarjetas, y a este tamaño
                      además ancla la columna: sin él, el titular empieza en el
                      aire. El actual va en naranja y el total apagado, que es
                      la única jerarquía que hace falta. */}
                  <p className="font-mono tabular-nums leading-none">
                    <span className="text-[length:var(--text-h1)] text-brand">{p.numero}</span>
                    <span className="ml-2 text-[length:var(--text-h4)] text-ink-muted">
                      / {total}
                    </span>
                  </p>

                  {/* El filete antes del rótulo: separa el número del bloque de
                      texto sin meter una caja, que es justo lo que se quitó. */}
                  <p className="jv-eyebrow mt-7 flex items-center gap-4 text-ink-muted">
                    <span aria-hidden className="h-px w-8 shrink-0 bg-line-strong" />
                    {p.eyebrow}
                  </p>

{/* Un escalón más abajo en teléfono: a `--text-h1` la segunda línea del
                      titular más largo medía 350 px dentro de un panel de 332 y se metía
                      debajo del flotante de WhatsApp. */}
                  <h3 className="mt-5 text-balance text-[length:var(--text-h2)] leading-[1.08] tracking-[-0.03em] text-ink lg:text-[length:var(--text-h1)]">
                    {p.titulo}
                  </h3>

                  <p className="mt-6 max-w-[44ch] text-pretty text-[length:var(--text-lead)] leading-relaxed text-ink-soft">
                    {p.cuerpo}
                  </p>

                  {/* Botón y no enlace en mono: sin tarjeta alrededor, el panel
                      necesita un objetivo que se vea desde el otro lado de la
                      pantalla. */}
                  <Link href={enlaceReal(p.enlace.href)} className="jv-boton-2 mt-9">
                    {p.enlace.texto}
                    <ArrowUpRight className="h-4 w-4" strokeWidth={2} aria-hidden />
                  </Link>
                </div>

                {/* ── La captura ───────────────────────────────────────────
                    Sin tarjeta y sin borde: la imagen ES el objeto. Solo el
                    radio de la casa y un filete tenue para que no se funda con
                    el fondo negro por los cantos claros. */}
                {/* LA PROPORCIÓN ES LA NATIVA DE LA CAPTURA, 16/10, y la altura
                    se gana ensanchando la columna —1,15fr contra 0,85— y no
                    recortando. Con 4/3 el panel crecía, sí, pero le comía el 17 %
                    del ancho a la captura: en la de Marcopolo se perdía el botón
                    «RESERVAR» del extremo derecho. Son capturas de trabajo real;
                    recortarlas para que cuadre la maqueta es enseñar peor el
                    trabajo. */}
                <figure className="order-1 overflow-hidden rounded-[--radius-xl] border border-line bg-canvas lg:order-2">
                  <Image
                    src={p.imagen}
                    alt={p.alt}
                    width={1600}
                    height={1000}
                    quality={85}
                    sizes="(min-width:1024px) 40rem, 90vw"
                    className="aspect-[16/10] h-full w-full object-cover object-top"
                  />
                </figure>
              </article>
            </li>
          ))}
        </ul>

        {/* La barra de avance. Va fuera del carril y no dentro: dentro se
            trasladaría con él y marcaría siempre lo mismo. */}
        <div
          className="jv-clavado__barra mx-auto mt-10 h-[3px] w-[min(28rem,60vw)] overflow-hidden rounded-full bg-line"
          role="img"
          aria-label={etiquetaAvance}
        >
          <span className="bg-brand" />
        </div>
      </div>
    </div>
  );
}

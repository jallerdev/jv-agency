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
              <article
                className={cn(
                  "jv-card jv-card-int group h-full overflow-hidden",
                  /* Alto propio en la versión clavada: una tarjeta de 400 px
                     centrada en una pantalla de 900 se lee como una tarjeta que
                     pasa, no como un escenario. Con `min-h` la captura crece y
                     la pieza ocupa el sitio que el gesto promete. */
                  "lg:grid lg:min-h-[min(30rem,58svh)] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]",
                )}
              >
                <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-canvas lg:aspect-auto lg:border-b-0 lg:border-r">
                  <Image
                    src={p.imagen}
                    alt={p.alt}
                    width={1600}
                    height={1000}
                    quality={85}
                    sizes="(min-width:1024px) 34rem, 85vw"
                    className="h-full w-full object-cover object-top"
                  />
                </div>

                <div className="flex flex-col p-7 lg:justify-center lg:p-10">
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="jv-eyebrow text-brand">{p.eyebrow}</p>
                    <p className="font-mono text-xs tabular-nums text-ink-muted">
                      {p.numero} / {total}
                    </p>
                  </div>

                  <h3 className="jv-titulo mt-4 text-balance lg:text-[length:var(--text-h2)]">
                    {p.titulo}
                  </h3>
                  <p className="mt-3 max-w-[46ch] text-pretty leading-relaxed text-ink-soft">
                    {p.cuerpo}
                  </p>

                  <Link
                    href={enlaceReal(p.enlace.href)}
                    className="mt-6 inline-flex w-fit min-h-11 items-center gap-1.5 font-mono text-xs uppercase tracking-[0.12em] text-ink-muted transition-colors duration-base ease-ps group-hover:text-brand"
                  >
                    {p.enlace.texto}
                    <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
                  </Link>
                </div>
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

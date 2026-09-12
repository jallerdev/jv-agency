import { Breadcrumbs, type Miga } from "@/components/kit/Breadcrumbs";
import { PriceTag } from "@/components/kit/Precio";
import { Reveal } from "@/components/Reveal";
import { BUSINESS } from "@/lib/business";
import type { ServicioPublicado } from "@/lib/quote";
import { cn } from "@/lib/utils";
import type { Idioma } from "@/content/types";

/**
 * El hero de las páginas internas.
 *
 * COMPOSICIÓN ASIMÉTRICA, Y UNA PIEZA REAL A LA DERECHA
 * -----------------------------------------------------
 * Texto a la izquierda y, a la derecha, algo QUE EXISTE: la captura de un
 * proyecto en producción, el sello de Meta, un ticket de precio. Nunca una
 * ilustración de relleno ni una foto de banco. Si una página no tiene nada
 * real que poner ahí, va sin `aparte` y el texto ocupa el ancho: un hueco
 * honesto es mejor que un adorno.
 *
 * EL TICKET
 * ---------
 * Los tres datos que la marca promete y que casi nadie publica juntos: el
 * precio desde, el plazo y el nombre de quien lo hace. Sale de `CATALOGO`, así
 * que no puede decir una cosa aquí y otra en /precios. Es el argumento entero
 * del sitio comprimido en una línea, y por eso va arriba y no enterrado.
 *
 * EL H1 NACE VISIBLE
 * ------------------
 * Nada de `opacity: 0` esperando a un observador. El H1 es el elemento LCP de
 * estas páginas: animarlo es pagar con la métrica que el sitio vende.
 */

export type VarianteHero = "servicio" | "sector" | "ciudad" | "utilidad";

/**
 * Qué cambia con la variante. Poco, y a propósito: cuatro heros que se
 * parezcan es lo que hace que un sitio se sienta hecho por la misma mano. Lo
 * único que cambia es cuánto sitio se lleva la pieza de la derecha, porque una
 * captura de teléfono, un mapa y un sello no piden el mismo ancho.
 *
 * `utilidad` no tiene columna: en /precios el hero ES la tabla, y meterla en
 * un tercio de pantalla sería esconder lo único que la gente vino a ver.
 */
const COLUMNAS: Record<VarianteHero, string | null> = {
  servicio: "lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)]",
  sector: "lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)]",
  ciudad: "lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]",
  utilidad: null,
};

export function PageHero({
  variante,
  migas,
  idioma,
  eyebrow,
  titulo,
  titular = "hero",
  entradilla,
  precio,
  indice,
  acciones,
  aparte,
  className,
}: {
  variante: VarianteHero;
  migas: readonly Miga[];
  idioma: Idioma;
  eyebrow?: string;
  /**
   * Nodo y no cadena: varios H1 del sitio llevan su segunda mitad en color de
   * marca —«Diseño de páginas web / para negocios que quieren vender más»— y
   * obligarlos a ser texto plano habría borrado ese contraste o, peor, habría
   * llevado a dos H1 uno debajo del otro.
   */
  titulo: React.ReactNode;
  /**
   * `compacto` baja el H1 de `--text-hero` a `--text-display`.
   *
   * No es gusto: el detector marca `oversized-h1` cuando un titular largo a
   * 72 px se lleva un tercio de la pantalla, y tres páginas lo hacían —salones,
   * diseño web y SEO—, todas con H1 de sesenta caracteres o más. El copy de
   * esos titulares no se toca (son los que posicionan), así que lo que cede es
   * el cuerpo. Un titular corto SÍ puede ir a 72 px, y por eso esto es una
   * opción y no un cambio global: «Los precios, publicados» se merece el
   * tamaño grande.
   */
  titular?: "hero" | "compacto";
  entradilla?: string;
  /** El servicio cuyo ticket se enseña. Sin él, no hay ticket. */
  precio?: ServicioPublicado["id"];
  /** El índice de la página, si lo tiene. Va en el renglón de las migas. */
  indice?: React.ReactNode;
  acciones?: React.ReactNode;
  /** La pieza real de la derecha. */
  aparte?: React.ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("border-b border-line", className)}>
      {/* El relleno de arriba SALE DE `--header-h` y no de un número a ojo: la
          cabecera es fija, así que un `pt-8` deja las migas debajo del
          logotipo. Se vio en la primera captura de /servicios/diseno-de-
          paginas-web, con «Inicio / Diseño de páginas web» pisando la marca. */}
      <div className="mx-auto max-w-[1280px] px-6 pb-16 pt-[calc(var(--header-h)+2rem)] md:px-12 md:pb-24 md:pt-[calc(var(--header-h)+3rem)]">
        {/* Las migas y, si la página lo pasa, su índice: los dos son
            navegación de esta página y comparten renglón. Suelto debajo del
            hero, el chip del índice se quedaba solo en una banda vacía de 120
            px que separaba el hero de lo siguiente en vez de unirlos. */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Breadcrumbs migas={migas} idioma={idioma} />
          {indice}
        </div>

        <div
          className={cn(
            "mt-10 grid grid-cols-1 gap-10",
            aparte && COLUMNAS[variante] && `${COLUMNAS[variante]} lg:items-center lg:gap-16`,
          )}
        >
          <div>
            {eyebrow && <p className="jv-eyebrow text-brand">{eyebrow}</p>}
            {/* Sin Reveal: este es el LCP. */}
            <h1
              className={cn(
                "text-balance",
                titular === "compacto"
                  ? "text-[length:var(--text-display)]"
                  : "text-[length:var(--text-hero)]",
                eyebrow && "mt-4",
              )}
            >
              {titulo}
            </h1>
            {entradilla && (
              <p className="mt-6 max-w-[46ch] text-pretty text-[length:var(--text-lead)] leading-relaxed text-ink-soft">
                {entradilla}
              </p>
            )}

            {precio && (
              <div className="mt-8 inline-flex flex-wrap items-center gap-x-4 gap-y-2 rounded-[--radius-md] border border-line bg-surface px-5 py-4">
                <PriceTag id={precio} idioma={idioma} tam="sm" />
                <span aria-hidden="true" className="text-ink-soft/60">
                  ·
                </span>
                <span className="text-sm text-ink-soft">{BUSINESS.founderName}</span>
              </div>
            )}

            {acciones && <div className="mt-8 flex flex-wrap gap-3">{acciones}</div>}
          </div>

          {aparte && COLUMNAS[variante] && (
            <Reveal delay={120} variant="scale">
              {aparte}
            </Reveal>
          )}
        </div>
      </div>
    </header>
  );
}

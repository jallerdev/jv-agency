import { cn } from "@/lib/utils";

/**
 * LA BARRA DE BÚSQUEDA DEL HERO
 * ─────────────────────────────────────────────────────────────────────────
 * La página habla de aparecer cuando alguien te busca, y lo decía solo con
 * palabras. Esto lo pone en pantalla: la consulta del propio copy —«funeraria
 * en Cartagena»— escribiéndose una vez en una barra.
 *
 * SE ESCRIBE UNA SOLA VEZ Y SE QUEDA. Un texto que se escribe y se borra en
 * bucle es un anuncio de aeropuerto: obliga a esperar a que vuelva a pasar lo
 * que uno ya iba a leer. Aquí termina y se queda quieta.
 *
 * NO ES UN CAMPO DE VERDAD y por eso no es un `<input>`: no busca nada, no
 * manda a ningún sitio y un campo que no busca es una trampa. Es la ilustración
 * de una búsqueda, marcada como tal, con un enlace de verdad debajo que lleva a
 * la pieza donde esa búsqueda se explica.
 *
 * LA ANIMACIÓN ES `steps()` SOBRE EL ANCHO, no una letra por render: son dos
 * líneas de CSS en vez de un temporizador, y con movimiento reducido el texto
 * nace entero.
 */

export function BarraBusqueda({
  consulta,
  rotulo,
  enlace,
  className,
}: {
  consulta: string;
  /** Qué es esto, dicho en una línea. */
  rotulo: string;
  enlace?: { texto: string; href: string };
  className?: string;
}) {
  return (
    <figure className={cn("jv-card p-5 sm:p-6", className)}>
      <figcaption className="jv-eyebrow text-ink-muted">{rotulo}</figcaption>

      <div className="mt-4 flex min-w-0 items-center gap-3 rounded-full border border-line bg-canvas px-4 py-3">
        <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0 text-ink-soft" fill="none" aria-hidden="true">
          <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="2" />
          <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>

        {/* `ch` y no un ancho en píxeles: la caja mide exactamente lo que mide
            el texto en la fuente mono, así que el cursor cae donde termina la
            palabra en cualquier idioma. */}
        {/* Sin `truncate`: la clase trae `text-overflow: ellipsis` y, mientras
            el ancho va de 0 a 100, el texto se leía «funeraria en Cartage…».
            `.jv-tecleo` ya recorta y no parte la línea; los puntos suspensivos
            solo sobraban. */}
        <span
          className="jv-tecleo min-w-0 font-mono text-sm text-ink"
          style={{ "--jv-caracteres": consulta.length } as React.CSSProperties}
        >
          {consulta}
        </span>
      </div>

      {enlace && (
        <a href={enlace.href} className="jv-enlace mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-brand">
          {enlace.texto}
        </a>
      )}
    </figure>
  );
}

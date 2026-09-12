import Link from "next/link";

import { CATALOGO, catalogo, money, type ServicioPublicado } from "@/lib/quote";
import { cn } from "@/lib/utils";
import type { Idioma } from "@/content/types";

/**
 * El precio, en las dos formas en que el sitio lo enseña.
 *
 * TODO sale de `CATALOGO` en `lib/quote.ts`. Ni un número, ni un plazo, ni un
 * nombre de servicio escrito aquí: el sitio ya tuvo tres juegos distintos de
 * tarjetas de precio en tres ciudades y una tabla en /precios a la que le
 * faltaban tres servicios que sí cobraba.
 *
 * Las cifras van con `tabular-nums`. Sin eso, una columna de precios baila
 * —el 1 es más estrecho que el 8— y la comparación, que es para lo que existe
 * la tarjeta, se vuelve trabajosa.
 */

const DESDE: Record<Idioma, string> = { es: "desde", en: "from" };
const AL_MES: Record<Idioma, string> = { es: "al mes", en: "a month" };
const AL_ANIO: Record<Idioma, string> = { es: "al año", en: "a year" };
const VER: Record<Idioma, string> = { es: "Ver el detalle", en: "See the detail" };

/** El sufijo de la unidad, o cadena vacía si es un pago único. */
function unidadTexto(s: ServicioPublicado, idioma: Idioma): string {
  if (s.unidad === "mes") return AL_MES[idioma];
  if (s.unidad === "anio") return AL_ANIO[idioma];
  return "";
}

/**
 * La renovación es la única tarifa CERRADA del catálogo. Todo lo demás es un
 * piso, y decir «desde» donde el precio es exacto es exactamente al revés de
 * lo que vende este sitio.
 */
const esPiso = (s: ServicioPublicado) => s.id !== "renovacion";

type Tam = "sm" | "md" | "lg";

const TAM_CIFRA: Record<Tam, string> = {
  sm: "text-[length:var(--text-h4)]",
  md: "text-[length:var(--text-h3)]",
  lg: "text-[length:var(--text-h2)]",
};

/**
 * El precio en una línea, para meter dentro de otra cosa: el ticket del hero,
 * una fila de tabla, el pie de una tarjeta de servicio.
 */
export function PriceTag({
  id,
  idioma,
  tam = "sm",
  conPlazo = true,
  className,
}: {
  id: ServicioPublicado["id"];
  idioma: Idioma;
  tam?: Tam;
  conPlazo?: boolean;
  className?: string;
}) {
  const s = catalogo(id);
  const unidad = unidadTexto(s, idioma);

  return (
    <p className={cn("flex flex-wrap items-baseline gap-x-2 gap-y-1", className)}>
      {esPiso(s) && <span className="text-sm text-ink-soft">{DESDE[idioma]}</span>}
      <span className={cn("font-semibold tabular-nums text-ink", TAM_CIFRA[tam])}>
        {money(s.desde, idioma)}
      </span>
      {unidad && <span className="text-sm text-ink-soft">{unidad}</span>}
      {conPlazo && s.plazo && (
        <>
          <span aria-hidden="true" className="text-ink-soft/60">
            ·
          </span>
          <span className="text-sm text-ink-soft">{s.plazo[idioma]}</span>
        </>
      )}
    </p>
  );
}

/**
 * La tarjeta de precio del sitio. Una sola, para /precios, para las ciudades,
 * para los sectores y para el bloque de precio de cada servicio.
 *
 * `descripcion` permite que una página ponga la suya —la de Cartagena habla de
 * Cartagena— sin tocar el número ni el plazo, que son los que no pueden
 * divergir. Si no se pasa, sale la del catálogo.
 */
export function PriceCard({
  id,
  idioma,
  tam = "md",
  descripcion,
  conEnlace = true,
  className,
}: {
  id: ServicioPublicado["id"];
  idioma: Idioma;
  tam?: Tam;
  descripcion?: string;
  conEnlace?: boolean;
  className?: string;
}) {
  const s = catalogo(id);
  const enlazable = conEnlace && s.href[idioma];

  return (
    <article className={cn("jv-card jv-card-int flex h-full flex-col p-6", className)}>
      <h3 className="jv-titulo">{s.nombre[idioma]}</h3>
      <PriceTag id={id} idioma={idioma} tam={tam} className="mt-3" />
      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
        {descripcion ?? s.desc[idioma]}
      </p>

      {s.notas.length > 0 && (
        <ul className="mt-4 space-y-1.5 border-t border-line pt-4">
          {s.notas.map((n) => (
            /* Lo que cobra un tercero. Va con la tarjeta y no en una nota al
               pie de la página, porque el sitio promete que no hay sorpresas y
               una sorpresa a tres pantallas de distancia sigue siéndolo. */
            <li key={n.es} className="text-xs leading-relaxed text-ink-soft">
              {n[idioma]}
            </li>
          ))}
        </ul>
      )}

      {enlazable && (
        <Link
          href={s.href[idioma]}
          className="jv-navlink mt-5 w-fit text-sm font-semibold text-ink"
        >
          {VER[idioma]}
        </Link>
      )}
    </article>
  );
}

/**
 * El «desde» de una RUTA, no de un servicio.
 *
 * El menú y el pie enlazan páginas, no líneas de catálogo, y una página puede
 * vender más de una: `/servicios/posicionamiento-seo` tiene la auditoría de
 * pago único y el plan mensual. El «desde» de una página es lo más barato que
 * se puede comprar en ella —si no, el menú anuncia un precio que no es el de
 * entrada—, así que se elige por precio y no a mano. Es la misma regla con la
 * que `PISOS.chatbot` sale de un `Math.min` de los cinco tipos de bot.
 *
 * PERO SOLO ENTRE LO QUE SE PUEDE COMPRAR SUELTO, y esto era un fallo de
 * verdad: «lo más barato de la página» dejaba entrar los complementos, que son
 * baratos justamente porque van encima de otra cosa. El menú anunciaba el
 * chatbot de WhatsApp «desde $180.000 al mes» —que es el MANTENIMIENTO del bot
 * que ya compraste, no el bot— y la entrada de precios «$290.000 al año», que
 * es la renovación del dominio de un sitio que todavía no existe. Dos cifras
 * ciertas y las dos mintiendo, en el sitio cuyo argumento es publicar precios.
 *
 * `paraBases` es el marcador: una línea que lo declara no se vende sola, y por
 * tanto no puede ser el «desde» de nada. Con ellas fuera, el chatbot vuelve a
 * $700.000, el SEO se queda en la auditoría —que sí se compra suelta— y
 * `/precios` deja de anunciar un precio, que es lo correcto: no es un producto.
 *
 * Devuelve `null` para una ruta que no vende nada, que es lo que le pasa a
 * media navegación.
 */
export function pisoDeRuta(href: string, idioma: Idioma): ServicioPublicado | null {
  const candidatos = CATALOGO.filter((s) => s.href[idioma] === href && !s.paraBases?.length);
  if (!candidatos.length) return null;
  return candidatos.reduce((a, b) => (b.desde < a.desde ? b : a));
}

/** El «desde» de una ruta en una línea corta, para el menú y el pie. */
export function PisoDeRuta({
  href,
  idioma,
  className,
}: {
  href: string;
  idioma: Idioma;
  className?: string;
}) {
  const s = pisoDeRuta(href, idioma);
  if (!s) return null;
  const unidad = unidadTexto(s, idioma);

  return (
    <span className={cn("font-mono text-xs tabular-nums text-ink-soft", className)}>
      {esPiso(s) && `${DESDE[idioma]} `}
      {money(s.desde, idioma)}
      {unidad && ` ${unidad}`}
    </span>
  );
}

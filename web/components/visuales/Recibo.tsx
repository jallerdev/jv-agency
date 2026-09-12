"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { Idioma } from "@/content/types";
/* `@/lib/money` y NO `@/lib/quote`, aunque `quote` reexporte `money` y las dos
   líneas compilen igual. Esto es un componente de CLIENTE: importar de `quote`
   mete el catálogo entero —mil quinientas líneas de precios, extras, plazos y
   textos— en el paquete del navegador para usar un formateador de seis. Medido:
   /precios enviaba 39 kB de trozos propios y 25 de ellos eran el catálogo.
   Es la razón exacta por la que `lib/money.ts` existe. */
import { money } from "@/lib/money";
import { cn } from "@/lib/utils";

/**
 * «TU PROPUESTA», COMO RECIBO — la pieza firma de /precios
 * ─────────────────────────────────────────────────────────────────────────
 * La promesa más grande del sitio es «el número te llega por escrito antes de
 * que pagues nada», y hasta ahora se sostenía con un documento de ejemplo con
 * las ranuras en «$ —». Decía la verdad, pero no hacía nada: el visitante
 * seguía sin saber cuánto le tocaría a él.
 *
 * Ahora se arma. Escoges qué quieres, marcas lo que va aparte y el recibo se
 * imprime renglón por renglón con el total sumado de verdad.
 *
 * POR QUÉ ESTO NO ES UNA COTIZACIÓN, y por qué el aviso va arriba del total y
 * no en un pie: los números son PISOS publicados, no el precio del encargo.
 * El del encargo depende del alcance y va por escrito. Un total redondo sin
 * esa frase al lado es exactamente la promesa que este sitio no hace.
 *
 * TRES TOTALES Y NO UNO. Lo que se paga una vez, lo que se paga cada mes y lo
 * que se paga cada año son tres cosas distintas: sumarlas da un número que no
 * existe, y es el número con el que la gente se lleva el susto en la propuesta.
 *
 * SE LO LLEVA A LA LLAMADA. El botón abre la agenda con el servicio marcado y
 * la nota escrita —lo mismo que hace el selector de /servicios/diseno-de-
 * paginas-web—, así que lo que se armó aquí llega allá sin volver a contarlo.
 */

export type LineaRecibo = {
  clave: string;
  nombre: string;
  /** El importe, ya en pesos. */
  monto: number;
  /** Cómo se paga: una vez, cada mes o cada año. */
  unidad: "unico" | "mes" | "anio";
  /** El plazo publicado, si lo tiene. */
  plazo?: string;
  /** Lo cobra un tercero y no entra en ningún total. */
  ajeno?: string;
  /**
   * Solo en los extras: con qué bases tiene sentido este recurrente.
   *
   * Sin esto, el armador dejaba escoger «Auditoría SEO» y marcar
   * «Mantenimiento del chatbot» —mantener un bot que no se compró— o la
   * renovación anual de un sitio que la auditoría no entrega. Sale del
   * catálogo, no de aquí: esta pieza filtra, no decide.
   */
  paraBases?: readonly string[];
  /** Solo en las bases: el id de servicio con el que abre la agenda. */
  servicio?: string;
};

const T = {
  es: {
    base: "¿Qué quieres armar?",
    extras: "Y esto, si lo necesitas",
    unico: "Pago único",
    mes: "Cada mes",
    anio: "Cada año",
    aviso: "Es un estimado con los pisos publicados. El número de tu proyecto sale del alcance y te llega por escrito antes de que pagues nada.",
    llevar: "Llévala a la llamada",
    nota: "Armé mi propuesta en la página de precios:",
    firma: "Luis Jaller · Turbaco, Bolívar",
    compromiso: "Por escrito, antes de pagar nada",
    recibo: "Tu propuesta",
    sinExtras: "Esta línea no lleva recurrentes publicados: lo que necesite va dentro de su alcance.",
  },
  en: {
    base: "What do you want to put together?",
    extras: "And this, if you need it",
    unico: "One-off payment",
    mes: "Every month",
    anio: "Every year",
    aviso: "It's an estimate using the published floors. Your project's number comes out of the scope and reaches you in writing before you pay anything.",
    llevar: "Take it to the call",
    nota: "I put together my proposal on the pricing page:",
    firma: "Luis Jaller · Turbaco, Bolívar",
    compromiso: "In writing, before paying anything",
    recibo: "Your proposal",
    sinExtras: "This line has no published recurring items: whatever it needs goes inside its scope.",
  },
} as const;

/** Cuenta hasta el total. Salta con movimiento reducido. */
function useInterpolado(objetivo: number) {
  const [valor, setValor] = useState(objetivo);
  const anterior = useRef(objetivo);

  useEffect(() => {
    const quieto =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desde = anterior.current;
    anterior.current = objetivo;
    if (quieto || desde === objetivo) {
      setValor(objetivo);
      return;
    }
    const inicio = performance.now();
    let id = 0;
    const paso = (ahora: number) => {
      const t = Math.min((ahora - inicio) / 500, 1);
      const e = 1 - (1 - t) ** 3;
      setValor(Math.round(desde + (objetivo - desde) * e));
      if (t < 1) id = requestAnimationFrame(paso);
    };
    id = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(id);
  }, [objetivo]);

  return valor;
}

export function Recibo({
  bases,
  extras,
  idioma,
  hrefAgenda,
  servicioAgenda,
  className,
}: {
  /** Lo que se puede escoger como línea principal. Solo uno. */
  bases: readonly LineaRecibo[];
  /** Lo que se suma encima. Varios. */
  extras: readonly LineaRecibo[];
  idioma: Idioma;
  hrefAgenda: string;
  /** El id de servicio de la agenda cuando la base elegida no trae el suyo. */
  servicioAgenda: string;
  className?: string;
}) {
  const t = T[idioma];
  /* `money` se importa aquí y no llega por props: un componente de servidor no
     puede pasarle una FUNCIÓN a uno de cliente —el build lo rechaza con todas
     sus letras— y esta es pura, así que cruza igual de bien como import. */
  const formatear = (n: number) => money(n, idioma);
  const [base, setBase] = useState(bases[0]?.clave ?? "");
  const [marcados, setMarcados] = useState<string[]>([]);

  const elegida = bases.find((b) => b.clave === base) ?? bases[0];

  /* Los extras que esta base admite. Las marcas de los que desaparecen no se
     borran: si el visitante vuelve a la base de antes, se las encuentra donde
     las dejó. Lo que no pasa es que cuenten mientras no aplican. */
  const disponibles = extras.filter(
    (e) => !e.paraBases || (elegida && e.paraBases.includes(elegida.clave)),
  );
  const puestos = disponibles.filter((e) => marcados.includes(e.clave));
  const lineas = [elegida, ...puestos].filter(Boolean) as LineaRecibo[];

  /* Lo que cobra un tercero sale de las líneas que están EN el recibo. Antes
     se listaban todas las del catálogo a la vez, así que una propuesta de
     auditoría advertía de la comisión de la pasarela de pago y del consumo de
     la API de Meta sin tener ni tienda ni chatbot. */
  const ajenos = lineas
    .filter((l) => l.ajeno)
    .map((l) => ({ nombre: l.ajeno as string, quien: l.nombre }));

  const suma = (u: LineaRecibo["unidad"]) =>
    lineas.filter((l) => l.unidad === u).reduce((s, l) => s + l.monto, 0);
  const unico = useInterpolado(suma("unico"));
  const mes = suma("mes");
  const anio = suma("anio");

  const nota = `${t.nota} ${lineas
    .map((l) => `${l.nombre} (${formatear(l.monto)}${l.unidad === "mes" ? "/mes" : l.unidad === "anio" ? "/año" : ""})`)
    .join(", ")}.`;

  const totales = [
    { etiqueta: t.unico, valor: unico, destacado: true },
    { etiqueta: t.mes, valor: mes, destacado: false },
    { etiqueta: t.anio, valor: anio, destacado: false },
  ].filter((x) => x.valor > 0);

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-px overflow-hidden rounded-[--radius-lg] border border-line bg-line lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)]",
        className,
      )}
    >
      {/* Lo que se escoge */}
      <div className="bg-canvas p-6 sm:p-8">
        <fieldset>
          <legend className="jv-eyebrow text-ink-muted">{t.base}</legend>
          <div className="mt-4 flex flex-wrap gap-2">
            {bases.map((b) => {
              const suya = b.clave === base;
              return (
                <label
                  key={b.clave}
                  className={cn(
                    /* `min-h-11`: con `py-2.5` la pastilla medía 42 px y el mínimo
                       táctil son 44. Dos píxeles, y son los que separan un
                       control que se acierta de uno que no. */
                    "flex cursor-pointer items-center justify-center rounded-full border px-4 py-2.5 text-sm font-semibold transition-surface duration-base ease-ps min-h-11",
                    suya
                      ? "border-brand bg-brand text-on-accent"
                      : "border-line bg-surface text-ink-soft hover:border-brand/40 hover:text-ink",
                  )}
                >
                  <input
                    type="radio"
                    name="jv-recibo-base"
                    checked={suya}
                    onChange={() => setBase(b.clave)}
                    className="sr-only"
                  />
                  {b.nombre}
                </label>
              );
            })}
          </div>
        </fieldset>

        {disponibles.length === 0 ? (
          <p className="jv-rule mt-8 max-w-[52ch] pt-6 text-sm leading-relaxed text-ink-soft">
            {t.sinExtras}
          </p>
        ) : (
        <fieldset className="jv-rule mt-8 pt-6">
          <legend className="jv-eyebrow text-ink-muted">{t.extras}</legend>
          <ul className="mt-4 flex flex-col divide-y divide-line border-y border-line">
            {disponibles.map((e) => {
              const marcado = marcados.includes(e.clave);
              return (
                <li key={e.clave}>
                  <label className="flex cursor-pointer items-center gap-4 py-3.5">
                    <input
                      type="checkbox"
                      checked={marcado}
                      onChange={() =>
                        setMarcados((m) =>
                          m.includes(e.clave) ? m.filter((c) => c !== e.clave) : [...m, e.clave],
                        )
                      }
                      className="peer sr-only"
                    />
                    <span
                      aria-hidden="true"
                      className={cn(
                        "grid h-5 w-5 shrink-0 place-items-center rounded-md border text-on-accent transition-surface duration-base ease-ps",
                        marcado ? "border-brand bg-brand" : "border-line-strong bg-surface",
                        "peer-focus-visible:ring-2 peer-focus-visible:ring-brand peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-canvas",
                      )}
                    >
                      {marcado && "✓"}
                    </span>
                    <span className="flex min-w-0 flex-1 flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <span className="font-semibold text-ink">{e.nombre}</span>
                      <span className="font-mono text-sm tabular-nums text-brand">
                        {formatear(e.monto)}
                        {e.unidad === "mes" && (idioma === "es" ? " /mes" : " /mo")}
                        {e.unidad === "anio" && (idioma === "es" ? " /año" : " /yr")}
                      </span>
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </fieldset>
        )}

        {/* Lo que cobra un tercero. Va en la misma pieza y NO suma: es la
            mitad de la honestidad de esta página. */}
        {ajenos.length > 0 && (
          <ul className="mt-6 flex flex-col gap-2">
            {ajenos.map((a) => (
              <li key={a.nombre} className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm">
                <span className="text-ink-soft">{a.nombre}</span>
                <span className="jv-chip jv-chip-off text-xs">{a.quien}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* El recibo */}
      <div className="bg-surface p-6 sm:p-8">
        <div className="lg:sticky lg:top-28">
          {/* El borde perforado de arriba: es un papel que sale de una ranura,
              no una tarjeta más. Dos píxeles de dibujo que cambian qué clase
              de objeto parece esto. */}
          <div
            aria-hidden="true"
            className="h-2 w-full rounded-t-[var(--radius-md)] bg-[radial-gradient(circle_at_4px_0,transparent_3px,var(--canvas)_3px)] bg-[length:8px_8px] bg-repeat-x"
          />
          <div className="rounded-b-[var(--radius-md)] bg-canvas p-5 sm:p-6">
            <p className="jv-eyebrow text-brand">{t.recibo}</p>

            <ul className="mt-5">
              {lineas.map((l, i) => (
                /* Dos renglones y no uno: el concepto y su importe arriba con
                   la guía de puntos en medio, y el plazo debajo a ancho
                   completo. En una sola línea, «5 días la landing · 1 a 2
                   semanas la corporativa» se partía en cuatro trozos de tres
                   palabras contra el borde de la columna. */
                <li
                  key={l.clave}
                  className="jv-recibo-linea border-b border-dashed border-line py-3"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <span className="flex items-baseline gap-3">
                    <span className="text-sm font-semibold text-ink">{l.nombre}</span>
                    <span aria-hidden="true" className="min-w-4 flex-1 border-b border-dotted border-line" />
                    <span className="shrink-0 font-mono text-sm tabular-nums text-ink-soft">
                      {formatear(l.monto)}
                    </span>
                  </span>
                  {l.plazo && (
                    <span className="mt-1 block font-mono text-xs text-ink-muted">{l.plazo}</span>
                  )}
                </li>
              ))}
            </ul>

            <dl className="mt-5 grid gap-2">
              {totales.map((x) => (
                <div key={x.etiqueta} className="flex items-baseline justify-between gap-3">
                  <dt className={cn("jv-eyebrow", x.destacado ? "text-ink" : "text-ink-muted")}>
                    {x.etiqueta}
                  </dt>
                  <dd
                    aria-live={x.destacado ? "polite" : undefined}
                    className={cn(
                      "shrink-0 font-mono tabular-nums",
                      x.destacado
                        ? "text-[length:var(--text-h3)] text-brand"
                        : "text-sm text-ink-soft",
                    )}
                  >
                    {formatear(x.valor)}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="jv-rule mt-5 pt-4 text-sm leading-relaxed text-ink-soft">{t.aviso}</p>

            <div className="mt-5 flex flex-wrap items-baseline justify-between gap-2">
              <span className="jv-eyebrow text-ink-muted">{t.firma}</span>
              <span className="jv-eyebrow text-brand">{t.compromiso}</span>
            </div>
          </div>

          <Link
            /* El servicio sale de la base elegida. Iba fijo en «web», así que
               armar una propuesta de chatbot abría la llamada marcando página
               web y había que corregirlo a mano. */
            href={`${hrefAgenda}?servicio=${elegida?.servicio ?? servicioAgenda}&nota=${encodeURIComponent(nota)}`}
            className="jv-boton mt-5 flex w-full items-center justify-center gap-2"
          >
            {t.llevar}
            <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}

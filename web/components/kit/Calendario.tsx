"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { BUSINESS } from "@/lib/business";
import type { Idioma } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * EL CALENDARIO PROPIO
 * ─────────────────────────────────────────────────────────────────────────
 * Sustituye al `<input type="date">` del formulario de agenda.
 *
 * POR QUÉ SALE EL CAMPO NATIVO, QUE FUNCIONABA. Por dos motivos que el propio
 * comentario que estaba ahí ya admitía a medias:
 *
 *  · PINTA EL MARCADOR SEGÚN EL LOCALE DEL NAVEGADOR, no del documento. En un
 *    Chrome en inglés, un sitio colombiano pedía «mm/dd/yyyy», y no hay forma
 *    de cambiarlo. Se parcheó confirmando la fecha en palabras debajo; eso es
 *    tratar el síntoma.
 *  · NO SABE QUÉ DÍAS SE TRABAJA. Dejaba escoger un domingo, y el visitante se
 *    enteraba después, cuando la lista de horarios volvía vacía. Un calendario
 *    que deja elegir lo que no existe hace perder un paso a todo el mundo.
 *
 * LOS DÍAS SIN HORARIO NACEN APAGADOS, y salen de `BUSINESS.horario` —el mismo
 * sitio que leen la hora local de /contacto y el dato estructurado—. Si Luis
 * cambia su horario, el calendario cambia solo.
 *
 * SE MANEJA CON EL TECLADO como manda el patrón de rejilla: una sola parada de
 * tabulador —treinta y cinco botones en el orden de tabulación sería una
 * trampa— y dentro, flechas para moverse, Inicio y Fin para los extremos de la
 * semana, y AvPág/RePág para cambiar de mes. El foco sigue al día activo.
 *
 * LAS FECHAS SE MANEJAN COMO `YYYY-MM-DD` Y SE CONSTRUYEN A MANO. `new
 * Date(iso)` interpreta la cadena como UTC y, en Colombia —UTC−5—, devuelve el
 * día anterior: el clásico «escogí el 12 y me agendó el 11». Aquí nunca se
 * parsea una fecha ISO: se compone con `Date.UTC` y se lee con los getters
 * `*UTC*`, así que el día que se ve es el día que se manda.
 */

const T = {
  es: {
    etiqueta: "Elige el día",
    mesAnterior: "Mes anterior",
    mesSiguiente: "Mes siguiente",
    hoy: "hoy",
    sinHorario: "sin horario",
    /** Iniciales de L a D, en el orden en que se pinta la rejilla. */
    dias: ["L", "M", "X", "J", "V", "S", "D"],
  },
  en: {
    etiqueta: "Pick a day",
    mesAnterior: "Previous month",
    mesSiguiente: "Next month",
    hoy: "today",
    sinHorario: "closed",
    dias: ["M", "T", "W", "T", "F", "S", "S"],
  },
} as const;

/** Los códigos de schema.org, en el orden de `Date.prototype.getUTCDay()`. */
const CODIGO_DIA = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

/** Los días de la semana en los que hay horario publicado. */
const DIAS_HABILES = new Set(
  CODIGO_DIA.flatMap((codigo, i) =>
    BUSINESS.horario.some((h) => h.dias.includes(codigo)) ? [i] : [],
  ),
);

const iso = (d: Date) => d.toISOString().slice(0, 10);
const deIso = (s: string) => new Date(`${s}T00:00:00.000Z`);
const sumarDias = (d: Date, n: number) =>
  new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + n));

/** Hoy, en la zona del estudio y no en la del visitante. */
function hoyEnTurbaco(): Date {
  const partes = new Intl.DateTimeFormat("en-CA", {
    timeZone: BUSINESS.zonaHoraria,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
  return deIso(partes);
}

export function Calendario({
  value,
  onChange,
  idioma,
  disabled,
  className,
}: {
  /** `YYYY-MM-DD`, o cadena vacía. */
  value: string;
  onChange: (iso: string) => void;
  idioma: Idioma;
  disabled?: boolean;
  className?: string;
}) {
  const t = T[idioma];
  const uid = useId();
  const hoy = useMemo(hoyEnTurbaco, []);

  /* El día que tiene el foco dentro de la rejilla. Arranca en el elegido, y si
     no hay, en el primer día hábil desde hoy: abrir el calendario con el foco
     en un domingo apagado obliga a moverse antes de poder elegir nada. */
  const primeroUtil = useMemo(() => {
    let d = hoy;
    for (let i = 0; i < 7 && !DIAS_HABILES.has(d.getUTCDay()); i++) d = sumarDias(d, 1);
    return d;
  }, [hoy]);

  const [activo, setActivo] = useState<Date>(value ? deIso(value) : primeroUtil);
  const [mes, setMes] = useState<Date>(
    new Date(Date.UTC(activo.getUTCFullYear(), activo.getUTCMonth(), 1)),
  );
  /* Hacia dónde entró el mes, para que la animación vaya en esa dirección. */
  const [sentido, setSentido] = useState<"adelante" | "atras">("adelante");
  const rejilla = useRef<HTMLDivElement>(null);
  const moverFoco = useRef(false);

  /* Cuando el día activo sale del mes que se está viendo, el mes lo sigue. */
  useEffect(() => {
    const primero = new Date(Date.UTC(activo.getUTCFullYear(), activo.getUTCMonth(), 1));
    setMes((m) => (m.getTime() === primero.getTime() ? m : primero));
  }, [activo]);

  /* El foco solo se mueve cuando lo movió el teclado, nunca al montar: un
     calendario que se roba el foco al aparecer desplaza la página sola. */
  useEffect(() => {
    if (!moverFoco.current) return;
    moverFoco.current = false;
    rejilla.current?.querySelector<HTMLButtonElement>('[data-activo="true"]')?.focus();
  }, [activo, mes]);

  const nombreMes = new Intl.DateTimeFormat(idioma === "es" ? "es-CO" : "en-US", {
    timeZone: "UTC",
    month: "long",
    year: "numeric",
  }).format(mes);

  const largo = new Intl.DateTimeFormat(idioma === "es" ? "es-CO" : "en-US", {
    timeZone: "UTC",
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  /* La rejilla: semanas de lunes a domingo. `getUTCDay()` cuenta desde el
     domingo, así que el desplazamiento del día 1 es `(dia + 6) % 7`. */
  const celdas = useMemo(() => {
    const primero = new Date(Date.UTC(mes.getUTCFullYear(), mes.getUTCMonth(), 1));
    const hueco = (primero.getUTCDay() + 6) % 7;
    const inicio = sumarDias(primero, -hueco);
    return Array.from({ length: 42 }, (_, i) => sumarDias(inicio, i));
  }, [mes]);

  const cambiarMes = (delta: number) => {
    setSentido(delta > 0 ? "adelante" : "atras");
    setMes((m) => new Date(Date.UTC(m.getUTCFullYear(), m.getUTCMonth() + delta, 1)));
  };

  const habil = (d: Date) => DIAS_HABILES.has(d.getUTCDay()) && d.getTime() >= hoy.getTime();

  const alTeclado = (e: React.KeyboardEvent) => {
    const saltos: Record<string, number> = {
      ArrowLeft: -1,
      ArrowRight: 1,
      ArrowUp: -7,
      ArrowDown: 7,
    };
    let destino: Date | null = null;

    if (e.key in saltos) destino = sumarDias(activo, saltos[e.key]);
    else if (e.key === "Home") destino = sumarDias(activo, -((activo.getUTCDay() + 6) % 7));
    else if (e.key === "End") destino = sumarDias(activo, 6 - ((activo.getUTCDay() + 6) % 7));
    else if (e.key === "PageUp")
      destino = new Date(
        Date.UTC(activo.getUTCFullYear(), activo.getUTCMonth() - 1, activo.getUTCDate()),
      );
    else if (e.key === "PageDown")
      destino = new Date(
        Date.UTC(activo.getUTCFullYear(), activo.getUTCMonth() + 1, activo.getUTCDate()),
      );

    if (!destino) return;
    e.preventDefault();
    moverFoco.current = true;
    setSentido(destino.getTime() > activo.getTime() ? "adelante" : "atras");
    setActivo(destino);
  };

  return (
    <div className={cn("", className)}>
      <div className="flex items-center justify-between gap-3">
        <p id={`${uid}-rotulo`} className="font-body text-sm font-medium text-ink">
          {t.etiqueta}
        </p>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => cambiarMes(-1)}
            disabled={
              disabled ||
              mes.getTime() <= Date.UTC(hoy.getUTCFullYear(), hoy.getUTCMonth(), 1)
            }
            aria-label={t.mesAnterior}
            className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink-soft transition-surface duration-quick ease-ps hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={2} aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => cambiarMes(1)}
            disabled={disabled}
            aria-label={t.mesSiguiente}
            className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink-soft transition-surface duration-quick ease-ps hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight className="h-4 w-4" strokeWidth={2} aria-hidden />
          </button>
        </div>
      </div>

      <p
        aria-live="polite"
        className="mt-4 font-mono text-xs uppercase tracking-[0.12em] text-accent-ink first-letter:uppercase"
      >
        {nombreMes}
      </p>

      <div
        ref={rejilla}
        role="grid"
        aria-labelledby={`${uid}-rotulo`}
        onKeyDown={alTeclado}
        className="mt-3"
      >
        <div role="row" className="grid grid-cols-7 gap-1">
          {t.dias.map((d, i) => (
            <span
              key={`${d}-${i}`}
              role="columnheader"
              className="grid h-8 place-items-center font-mono text-xs uppercase tracking-[0.12em] text-ink-muted"
            >
              {d}
            </span>
          ))}
        </div>

        {/* `key` en el mes para que la animación vuelva a arrancar en cada
            cambio. Sin ella React reutiliza los nodos y no hay entrada. */}
        <div
          key={`${mes.getUTCFullYear()}-${mes.getUTCMonth()}`}
          data-sentido={sentido}
          className="jv-calendario__mes mt-1 grid grid-cols-7 gap-1"
        >
          {celdas.map((d) => {
            const delMes = d.getUTCMonth() === mes.getUTCMonth();
            const puede = habil(d) && !disabled;
            const elegido = value === iso(d);
            const esHoy = d.getTime() === hoy.getTime();
            const esActivo = d.getTime() === activo.getTime();

            return (
              <span role="gridcell" key={iso(d)} className="contents">
                <button
                  type="button"
                  data-activo={esActivo ? "true" : undefined}
                  tabIndex={esActivo ? 0 : -1}
                  disabled={!puede}
                  aria-pressed={elegido}
                  aria-label={`${largo.format(d)}${
                    !DIAS_HABILES.has(d.getUTCDay()) ? ` — ${t.sinHorario}` : ""
                  }${esHoy ? ` — ${t.hoy}` : ""}`}
                  onClick={() => {
                    setActivo(d);
                    onChange(iso(d));
                  }}
                  className={cn(
                    "relative grid h-11 place-items-center rounded-[var(--radius-sm)] font-mono text-sm tabular-nums transition-surface duration-quick ease-ps",
                    !delMes && "opacity-35",
                    elegido
                      ? "bg-brand font-semibold text-on-accent"
                      : puede
                        ? "text-ink hover:bg-brand-quiet hover:text-brand"
                        : "text-ink-muted line-through decoration-line-strong",
                  )}
                >
                  {d.getUTCDate()}
                  {esHoy && !elegido && (
                    <span
                      aria-hidden
                      className="absolute bottom-1.5 h-1 w-1 rounded-full bg-brand"
                    />
                  )}
                </button>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

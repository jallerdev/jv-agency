"use client";

import { useEffect, useState } from "react";

import { BUSINESS } from "@/lib/business";
import type { Idioma } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * LA HORA LOCAL EN VIVO — la pieza firma de /contacto
 * ─────────────────────────────────────────────────────────────────────────
 * «Son las 3:12 p. m. en Turbaco, y sí estoy.»
 *
 * POR QUÉ ESTO Y NO UN MAPA. El encargo pedía aquí un mapa SVG con el pin en
 * Turbaco. Un mapa dibujado a mano de una costa que no se ha medido es un
 * adorno con forma de dato: parece información y no lo es, y este sitio lleva
 * meses quitando exactamente eso. La hora, en cambio, es verdad comprobable en
 * el segundo en que se lee, y contesta la pregunta que trae quien abre esta
 * página —«¿hay alguien ahí ahora mismo?»— que un mapa no contesta.
 *
 * EL HORARIO NO SE ESCRIBE AQUÍ. Sale de `BUSINESS.horario`, que Luis confirmó
 * el 11 de septiembre de 2026 y que leen también el dato estructurado y el
 * formulario. Escrito tres veces se desincroniza a la primera.
 *
 * COLOMBIA NO CAMBIA LA HORA. Sin horario de verano, `America/Bogota` está
 * siempre en −05:00, así que no hay ajuste estacional que compensar.
 *
 * LA HORA NACE EN BLANCO Y SE LLENA AL MONTAR. Esta página se prerrenderiza,
 * así que una hora calculada en el servidor sería la hora de la COMPILACIÓN:
 * un reloj parado desde hace días, que es peor que no tener reloj. La ranura
 * ocupa su sitio con cifras tabulares —ni un píxel de salto— y el horario, que
 * sí es información fija, se ve desde el primer fotograma y sin JavaScript.
 *
 * ESTAR FUERA DE HORARIO NO ES UNA MALA NOTICIA, y el copy lo dice: la promesa
 * del sitio nunca fue contestar al instante, fue contestar en menos de 24 h.
 */

const T = {
  es: {
    rotulo: "Ahora mismo en",
    dentro: "Estoy trabajando",
    fuera: "Fuera de horario",
    cerrado: "Hoy no trabajo",
    nota: "Escribe igual: la promesa no es contestar al segundo, es contestar en menos de 24 horas.",
    horario: "Cuándo estoy",
    hoy: "hoy",
    vacio: "--:--",
  },
  en: {
    rotulo: "Right now in",
    dentro: "I'm at work",
    fuera: "Outside working hours",
    cerrado: "I don't work today",
    nota: "Write anyway: the promise was never to reply within the second, it's to reply in under 24 hours.",
    horario: "When I'm around",
    hoy: "today",
    vacio: "--:--",
  },
} as const;

const aMinutos = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

type Ahora = { etiqueta: string; dia: string; minutos: number };

/** La hora de Turbaco, no la del visitante. */
function leerAhora(idioma: Idioma): Ahora {
  const zona = BUSINESS.zonaHoraria;
  const d = new Date();

  const etiqueta = new Intl.DateTimeFormat(idioma === "es" ? "es-CO" : "en-US", {
    timeZone: zona,
    hour: "numeric",
    minute: "2-digit",
  }).format(d);

  /* `weekday: "long"` en inglés devuelve exactamente el código que usa
     schema.org —«Monday»—, así que `BUSINESS.horario` se consulta sin tabla de
     conversión. `hourCycle: "h23"` evita el «24» de medianoche. */
  const partes = new Intl.DateTimeFormat("en-US", {
    timeZone: zona,
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(d);
  const parte = (t: string) => partes.find((p) => p.type === t)?.value ?? "";

  return {
    etiqueta,
    dia: parte("weekday"),
    minutos: Number(parte("hour")) * 60 + Number(parte("minute")),
  };
}

export function HoraLocal({ idioma, className }: { idioma: Idioma; className?: string }) {
  const t = T[idioma];
  const [ahora, setAhora] = useState<Ahora | null>(null);

  useEffect(() => {
    const marcar = () => setAhora(leerAhora(idioma));
    marcar();
    /* Cada quince segundos: el minuto cambia una vez por minuto y nadie mira
       un reloj esperando el salto, pero un intervalo de un minuto puede caer
       justo después del cambio y enseñar una hora vieja durante 59 segundos. */
    const id = setInterval(marcar, 15_000);
    return () => clearInterval(id);
  }, [idioma]);

  /* El tramo de hoy, si hoy hay tramo. */
  const tramoHoy = ahora
    ? BUSINESS.horario.find((h) => h.dias.includes(ahora.dia))
    : undefined;
  const dentro =
    ahora && tramoHoy
      ? ahora.minutos >= aMinutos(tramoHoy.abre) && ahora.minutos < aMinutos(tramoHoy.cierra)
      : false;

  const estado = !ahora ? null : !tramoHoy ? t.cerrado : dentro ? t.dentro : t.fuera;

  return (
    <figure className={cn("jv-card p-6 sm:p-8", className)}>
      <figcaption className="jv-eyebrow text-ink-muted">
        {t.rotulo} {BUSINESS.address.city}
      </figcaption>

      <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3">
        <p
          className="font-mono text-[length:var(--text-h2)] leading-none tabular-nums text-ink"
          aria-live="off"
        >
          {ahora ? ahora.etiqueta : t.vacio}
        </p>

        {estado && (
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-ink">
            <span
              aria-hidden
              className={cn(
                "h-2 w-2 shrink-0 rounded-full",
                dentro ? "jv-latido bg-brand" : "bg-line-strong",
              )}
            />
            {estado}
          </p>
        )}
      </div>

      {/* El horario, que es lo único fijo de esta pieza y por eso lo único que
          se ve sin JavaScript.

          LA BARRA ES EL DÍA ENTERO, de medianoche a medianoche, con el tramo
          de trabajo marcado dentro. Al principio era el tramo solo, y entonces
          no decía nada: una barra llena debajo de «Lunes a viernes» se lee como
          un subrayado. Sobre las veinticuatro horas sí dice algo —cuánto del
          día es horario y cuánto no— y, en la fila de hoy, dónde cae este
          momento. */}
      <p className="jv-rule jv-eyebrow mt-7 pt-6 text-ink-muted">{t.horario}</p>
      <dl className="mt-4 flex flex-col gap-4">
        {BUSINESS.horario.map((h) => {
          const esHoy = Boolean(ahora && h.dias.includes(ahora.dia));
          const abre = aMinutos(h.abre);
          const cierra = aMinutos(h.cierra);
          const pct = (min: number) => (min / (24 * 60)) * 100;

          return (
            <div key={h.etiqueta.es}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <dt className={cn("text-sm", esHoy ? "font-semibold text-ink" : "text-ink-soft")}>
                  {h.etiqueta[idioma]}
                  {esHoy && <span className="ml-2 font-mono text-xs text-brand">· {t.hoy}</span>}
                </dt>
                <dd className="font-mono text-xs tabular-nums text-ink-muted">
                  {h.abre} – {h.cierra}
                </dd>
              </div>

              <div aria-hidden className="relative mt-2 h-1.5 w-full rounded-full bg-line">
                <span
                  className={cn(
                    "absolute inset-y-0 rounded-full",
                    esHoy ? "bg-brand/70" : "bg-line-strong",
                  )}
                  style={{ left: `${pct(abre)}%`, width: `${pct(cierra - abre)}%` }}
                />
                {esHoy && ahora && (
                  <span
                    className="absolute -top-1 h-3.5 w-[2px] -translate-x-1/2 rounded-full bg-ink"
                    style={{ left: `${pct(ahora.minutos)}%` }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </dl>

      <p className="mt-7 max-w-[52ch] text-sm leading-relaxed text-ink-soft">{t.nota}</p>
    </figure>
  );
}

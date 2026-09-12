"use client";

import { useId, useState } from "react";

import type { Idioma } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * «LA CARTA DE SERVICIOS» — la pieza firma de /sectores/salones-y-spas
 * ─────────────────────────────────────────────────────────────────────────
 * Esta página defiende dos cosas: **publica tus precios** y **deja de contestar
 * veinte mensajes para agendar una cita**. Estaban en dos bloques distintos —una
 * rejilla de razones y un hilo de WhatsApp fijo— y el visitante tenía que
 * juntarlas de cabeza. Aquí son un solo objeto: se toca un servicio de la carta
 * y la conversación de al lado arranca CON ESE servicio, con su duración y su
 * precio dentro de la respuesta.
 *
 * LA CARTA ES DE UN SALÓN DE EJEMPLO Y LO DICE EN SU PROPIO RÓTULO. No hereda
 * nada de `lib/quote.ts`: ahí viven los precios que cobra el estudio, y meter
 * el precio de un corte de pelo en la fuente única de precios reales sería
 * ensuciar justo lo que este sitio ha pasado meses limpiando.
 *
 * EL ESCALONADO ES CSS, NO TEMPORIZADORES. Las cinco burbujas están en el DOM
 * desde el primer fotograma y solo se retrasa su entrada con `animation-delay`.
 * Con `prefers-reduced-motion` aparecen las cinco a la vez, sin una línea de
 * JavaScript que apagar, y quien use lector de pantalla lee la conversación
 * entera sin esperar a que termine una animación.
 *
 * UN `radiogroup` DE VERDAD: se recorre con flechas, se anuncia como grupo y
 * cada fila tiene sus 44 px. Un `div` con `onClick` habría dejado fuera a todo
 * el que no usa ratón, en la página de un negocio que vive de que le sea fácil
 * pedir cita.
 */

const T = {
  es: { enLinea: "En línea", traspaso: "Te paso con una persona", tu: "Tú", negocio: "Salón de ejemplo" },
  en: { enLinea: "Online", traspaso: "Handing you to a person", tu: "You", negocio: "Example salon" },
} as const;

export type ServicioCarta = {
  clave: string;
  nombre: string;
  duracion: string;
  precio: string;
};

export function CartaServicios({
  servicios,
  guion,
  horas,
  rotulo,
  ayuda,
  nota,
  idioma,
  className,
}: {
  servicios: readonly ServicioCarta[];
  /** Las cinco frases, con `{servicio}`, `{duracion}` y `{precio}` por rellenar. */
  guion: readonly string[];
  horas: readonly string[];
  rotulo: string;
  ayuda: string;
  nota: string;
  idioma: Idioma;
  className?: string;
}) {
  const t = T[idioma];
  const uid = useId();
  const [clave, setClave] = useState(servicios[1]?.clave ?? servicios[0]?.clave ?? "");
  const elegido = servicios.find((s) => s.clave === clave) ?? servicios[0];

  /* Dos ranuras para el nombre y no una: `{servicio}` en minúscula para el
     medio de una frase —«cupo el sábado para color completo»— y `{Servicio}`
     tal cual para cuando abre oración. Con una sola salía «¡Hola! Sí. color
     completo toma 3 horas», que es un error de puntuación en la pieza que
     existe para enseñar cómo escribe el bot. */
  const componer = (frase: string) =>
    frase
      .replaceAll("{Servicio}", elegido.nombre)
      .replaceAll(
        "{servicio}",
        elegido.nombre.toLocaleLowerCase(idioma === "es" ? "es-CO" : "en-US"),
      )
      .replaceAll("{duracion}", elegido.duracion)
      .replaceAll("{precio}", elegido.precio);

  /* Quién manda cada frase: cliente, salón, cliente, salón, y el traspaso. */
  const burbujas = guion.map((frase, i) => ({
    texto: componer(frase),
    hora: horas[i],
    mia: i === 0 || i === 2,
    traspaso: i === guion.length - 1,
  }));

  return (
    <figure
      className={cn(
        "grid grid-cols-1 gap-px overflow-hidden rounded-[--radius-lg] border border-line bg-line lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)]",
        className,
      )}
    >
      {/* La carta */}
      <div className="bg-canvas p-6 sm:p-8">
        <figcaption className="jv-eyebrow text-ink-muted">{rotulo}</figcaption>

        <fieldset className="mt-5">
          <legend className="sr-only">{ayuda}</legend>
          <ul className="flex flex-col divide-y divide-line border-y border-line">
            {servicios.map((s) => {
              const suyo = s.clave === clave;
              return (
                <li key={s.clave}>
                  <label
                    className={cn(
                      "flex cursor-pointer flex-wrap items-baseline gap-x-4 gap-y-1 py-4 transition-colors duration-base ease-ps",
                      suyo ? "text-ink" : "text-ink-soft hover:text-ink",
                    )}
                  >
                    <input
                      type="radio"
                      name={`${uid}-carta`}
                      checked={suyo}
                      onChange={() => setClave(s.clave)}
                      className="peer sr-only"
                    />
                    <span
                      aria-hidden
                      className={cn(
                        "h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-base ease-ps",
                        suyo ? "bg-brand" : "bg-line-strong",
                        "peer-focus-visible:ring-4 peer-focus-visible:ring-brand/35",
                      )}
                    />
                    <span className={cn("flex-1 text-base", suyo && "font-semibold")}>
                      {s.nombre}
                    </span>
                    <span className="font-mono text-xs text-ink-muted">{s.duracion}</span>
                    <span
                      className={cn(
                        "w-full font-mono text-sm tabular-nums sm:w-auto",
                        suyo ? "text-brand" : "text-ink-muted",
                      )}
                    >
                      {s.precio}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </fieldset>

        <p className="mt-5 max-w-[52ch] text-sm leading-relaxed text-ink-muted">{nota}</p>
      </div>

      {/* La conversación */}
      <div className="bg-surface p-6 sm:p-7">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line bg-canvas font-mono text-xs text-ink-soft">
            SE
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-ink">{t.negocio}</p>
            <p className="flex items-center gap-1.5 font-mono text-xs text-ink-muted">
              <span aria-hidden className="jv-latido h-1.5 w-1.5 rounded-full bg-brand" />
              {t.enLinea}
            </p>
          </div>
        </div>

        {/* `key` en el servicio: sin ella React reutiliza los nodos y el
            escalonado no vuelve a arrancar al cambiar de servicio, que es
            justo lo que hace que la pieza se sienta viva. */}
        <ol key={clave} className="jv-rule mt-5 flex flex-col gap-3 pt-5">
          {burbujas.map((b, i) => (
            <li
              key={i}
              className={cn("jv-carta-msg flex", b.mia ? "justify-end" : "justify-start")}
              style={{ animationDelay: `${i * 320}ms` }}
            >
              <span
                className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                  b.mia
                    ? "rounded-br-sm bg-brand-quiet text-ink"
                    : b.traspaso
                      ? "rounded-bl-sm border border-dashed border-line-strong bg-canvas text-ink-soft"
                      : "rounded-bl-sm bg-canvas text-ink",
                )}
              >
                {b.traspaso && (
                  <span className="jv-eyebrow mb-1.5 block text-brand">{t.traspaso}</span>
                )}
                {b.texto}
                <span className="mt-1 block text-right font-mono text-xs text-ink-muted">
                  {b.hora}
                </span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </figure>
  );
}

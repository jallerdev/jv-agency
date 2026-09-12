"use client";

import { useState } from "react";
import {
  BellRing,
  CalendarCheck,
  MessageSquareText,
  ShoppingBag,
  UserRoundSearch,
} from "lucide-react";

import { HiloWhatsApp, type MensajeHilo } from "@/components/visuales/HiloWhatsApp";
import type { Idioma } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * «QUÉ SE PUEDE AUTOMATIZAR» — la pieza firma de /servicios/chatbot-whatsapp
 * ─────────────────────────────────────────────────────────────────────────
 * Las cinco automatizaciones eran cinco tarjetas con un icono en un azulejo y
 * su precio al pie, y la conversación de ejemplo vivía aparte, arriba, sin
 * relación con ninguna. Pero la conversación ES el producto: la objeción del
 * dueño no es «¿funciona?» sino «¿va a sonar como un robot?».
 *
 * Ahora las cinco están a la izquierda y el teléfono a la derecha reproduce la
 * de la que se esté mirando. Tocar una cambia el guion y el hilo se vuelve a
 * escribir desde la primera burbuja —de ahí la `key`: sin ella React reutiliza
 * los nodos y la conversación aparece de golpe, ya terminada—.
 *
 * SON BOTONES DE VERDAD, no tarjetas con `onClick`: cambian lo que se ve, así
 * que se anuncian como botones, se enfocan con el tabulador y dicen cuál está
 * activo con `aria-pressed`. Lo que no hace ninguno es navegar.
 *
 * QUÉ PASA SIN JAVASCRIPT: se ve la lista completa de las cinco con su precio
 * y el primer guion. Se pierde el cambio, no la información.
 */

export type Automatizacion = {
  clave: string;
  titulo: string;
  cuerpo: string;
  precio: string;
  /** El guion de esta automatización, ya montado. */
  hilo: MensajeHilo[];
  negocio: string;
  iniciales: string;
  /** Falso mientras Luis no lo haya aprobado. Solo se pinta en desarrollo. */
  aprobado: boolean;
};

const T = {
  es: { pendiente: "Borrador por aprobar" },
  en: { pendiente: "Draft pending approval" },
} as const;

/**
 * Los iconos viven AQUÍ y no en las props, y no es cuestión de gusto: un
 * componente de servidor no puede pasarle una función —y un icono de lucide lo
 * es— a uno de cliente. El build lo dice con todas sus letras: «Functions
 * cannot be passed directly to Client Components». Así que cruza la clave, que
 * es una cadena, y el icono se busca de este lado.
 */
const ICONOS: Record<string, typeof MessageSquareText> = {
  faq: MessageSquareText,
  avisos: BellRing,
  leads: UserRoundSearch,
  citas: CalendarCheck,
  pedidos: ShoppingBag,
};

export function SimuladorChat({
  automatizaciones,
  idioma,
  rotulo,
  mostrarPendientes = false,
  className,
}: {
  automatizaciones: readonly Automatizacion[];
  idioma: Idioma;
  rotulo: string;
  /** En desarrollo marca los guiones sin aprobar. En producción, nunca. */
  mostrarPendientes?: boolean;
  className?: string;
}) {
  const [activa, setActiva] = useState(0);
  const t = T[idioma];
  const a = automatizaciones[activa];

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:gap-16",
        className,
      )}
    >
      <ul className="flex flex-col divide-y divide-line border-y border-line">
        {automatizaciones.map((x, i) => {
          const Icono = ICONOS[x.clave] ?? MessageSquareText;
          const suya = i === activa;
          return (
            <li key={x.clave}>
              <button
                type="button"
                aria-pressed={suya}
                onClick={() => setActiva(i)}
                className="focus-ring group/auto flex w-full items-start gap-4 py-5 text-left"
              >
                <Icono
                  aria-hidden="true"
                  strokeWidth={2}
                  className={cn(
                    "mt-0.5 h-6 w-6 shrink-0 transition-colors duration-base ease-ps",
                    suya ? "text-brand" : "text-ink-muted group-hover/auto:text-ink-soft",
                  )}
                />
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <span
                      className={cn(
                        "jv-titulo transition-colors duration-base ease-ps",
                        !suya && "text-ink-soft group-hover/auto:text-ink",
                      )}
                    >
                      {x.titulo}
                    </span>
                    <span className="font-mono text-sm tabular-nums text-brand">{x.precio}</span>
                  </span>
                  <span className="mt-1.5 block text-sm leading-relaxed text-ink-soft">
                    {x.cuerpo}
                  </span>
                  {mostrarPendientes && !x.aprobado && (
                    <span className="mt-2 inline-block rounded-full border border-dashed border-warning/60 px-2.5 py-0.5 font-mono text-xs text-warning">
                      {t.pendiente}
                    </span>
                  )}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div>
        <div className="lg:sticky lg:top-28">
          <p className="jv-eyebrow text-ink-muted">{rotulo}</p>
          {/* `key`: cambia el guion y el hilo se vuelve a escribir. */}
          <HiloWhatsApp
            key={a.clave}
            idioma={idioma}
            className="mt-4"
            negocio={a.negocio}
            iniciales={a.iniciales}
            mensajes={a.hilo}
          />
        </div>
      </div>
    </div>
  );
}

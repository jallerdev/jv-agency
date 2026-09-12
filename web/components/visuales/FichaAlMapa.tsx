"use client";

import { useState } from "react";
import { Check, MapPin, Star } from "lucide-react";

import type { Idioma } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * «COMPLETA LA FICHA Y ENTRA AL MAPA» — la pieza firma de /servicios/posicionamiento-seo
 * ─────────────────────────────────────────────────────────────────────────
 * Eran dos visuales separados: el medidor de la ficha —siete campos llenos de
 * diez— y la demo del paquete de tres del mapa, cada uno en su tarjeta. Uno
 * era el INSUMO y el otro el RESULTADO, pero nada los unía: había que creer la
 * relación de causa y efecto en vez de verla.
 *
 * Aquí se tocan. Marcas los tres campos que faltan —reseñas, publicaciones,
 * preguntas—, el contador sube a 10 de 10 y el negocio de ejemplo entra al
 * paquete del mapa mientras los otros bajan un puesto.
 *
 * LO QUE ESTA PIEZA TIENE PROHIBIDO. No hay caso de SEO con seis meses
 * cumplidos, así que nada aquí puede insinuar una posición ganada, un tráfico
 * ni un plazo. Por eso el pie es literal y se queda: «no es un resultado real.
 * El trabajo es entrar en la lista, no prometer el primer puesto». Los campos
 * son genéricos y verdaderos por construcción —«tu horario real, sábados
 * incluidos»—, nunca los de un negocio concreto.
 *
 * LOS TRES QUE FALTAN SON CASILLAS DE VERDAD. Cambian lo que se ve, así que se
 * anuncian, se enfocan y se marcan con el teclado. Los siete que ya están
 * llenos no son controles: no hay nada que decidir ahí.
 */

export type CampoFicha = {
  etiqueta: string;
  /** Sin valor = campo por llenar, y es de los que el visitante marca. */
  valor?: string;
};

export type Competidor = { nombre: string; categoria: string; distancia: string; estrellas: number };

const T = {
  es: {
    de: "de",
    completa: "Ficha completa",
    marca: "Marca lo que falta y mira el mapa",
    entras: "Entras al paquete de tres",
    fuera: "Aquí no apareces",
    tuNegocio: "Tu negocio",
  },
  en: {
    de: "of",
    completa: "Profile complete",
    marca: "Tick what's missing and watch the map",
    entras: "You enter the three-pack",
    fuera: "You don't show up here",
    tuNegocio: "Your business",
  },
} as const;

function Estrellas({ n }: { n: number }) {
  return (
    <span aria-hidden="true" className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn("h-3 w-3", i < n ? "fill-brand text-brand" : "text-line-strong")}
          strokeWidth={2}
        />
      ))}
    </span>
  );
}

function FilaMapa({
  nombre,
  categoria,
  distancia,
  estrellas,
  tuyo = false,
}: Competidor & { tuyo?: boolean }) {
  return (
    <li
      className={cn(
        "jv-mapa-fila flex items-start gap-3 rounded-xl border p-3",
        tuyo ? "border-brand bg-brand-quiet" : "border-line bg-surface",
      )}
    >
      <MapPin
        aria-hidden="true"
        strokeWidth={2}
        className={cn("mt-0.5 h-4 w-4 shrink-0", tuyo ? "text-brand" : "text-ink-muted")}
      />
      <span className="min-w-0 flex-1">
        <span className={cn("block truncate text-sm font-semibold", tuyo ? "text-ink" : "text-ink-soft")}>
          {nombre}
        </span>
        <span className="mt-0.5 block truncate text-xs text-ink-muted">{categoria}</span>
        <span className="mt-1.5 flex items-center gap-2">
          <Estrellas n={estrellas} />
          <span className="font-mono text-xs text-ink-muted">{distancia}</span>
        </span>
      </span>
    </li>
  );
}

export function FichaAlMapa({
  campos,
  competidores,
  consulta,
  idioma,
  tituloFicha,
  rotuloFicha,
  porLlenar,
  pie,
  className,
}: {
  campos: readonly CampoFicha[];
  competidores: readonly Competidor[];
  /** La búsqueda escrita en la barra del mapa. */
  consulta: string;
  idioma: Idioma;
  tituloFicha: string;
  rotuloFicha: string;
  porLlenar: string;
  /** El pie literal que no se cambia. */
  pie: string;
  className?: string;
}) {
  const t = T[idioma];
  const faltantes = campos.filter((c) => !c.valor).map((c) => c.etiqueta);
  const [marcados, setMarcados] = useState<string[]>([]);

  const llenos = campos.length - faltantes.length + marcados.length;
  const completa = llenos === campos.length;
  const pct = Math.round((llenos / campos.length) * 100);

  const alternar = (etiqueta: string) =>
    setMarcados((m) => (m.includes(etiqueta) ? m.filter((x) => x !== etiqueta) : [...m, etiqueta]));

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-px overflow-hidden rounded-[--radius-lg] border border-line bg-line lg:grid-cols-2",
        className,
      )}
    >
      {/* La ficha */}
      <div className="bg-canvas p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="jv-eyebrow text-ink-muted">{tituloFicha}</p>
            <p className="mt-2 font-mono text-[length:var(--text-h3)] tabular-nums text-ink">
              {llenos} <span className="text-ink-muted">{t.de}</span> {campos.length}
            </p>
          </div>

          {/* La barra de completitud. Una barra y no un anillo: el anillo
              obligaba a poner un porcentaje dentro para poder leerse, y el
              porcentaje de una ficha no significa nada por sí solo. */}
          <div className="min-w-[8rem] flex-1">
            <div aria-hidden="true" className="h-1.5 overflow-hidden rounded-full bg-line">
              <span
                className="block h-full rounded-full bg-brand transition-[width] duration-slow ease-ps"
                style={{ width: `${pct}%` }}
              />
            </div>
            <p
              aria-live="polite"
              className={cn(
                "mt-2 jv-eyebrow transition-colors duration-base ease-ps",
                completa ? "text-brand" : "text-ink-muted",
              )}
            >
              {completa ? t.completa : t.marca}
            </p>
          </div>
        </div>

        <ul className="mt-6 flex flex-col divide-y divide-line border-y border-line">
          {campos.map((c) => {
            const pendiente = !c.valor;
            const marcado = marcados.includes(c.etiqueta);

            if (!pendiente) {
              return (
                <li key={c.etiqueta} className="flex items-start gap-3 py-3">
                  <Check
                    aria-hidden="true"
                    strokeWidth={3}
                    className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                  />
                  <span className="min-w-0">
                    <span className="jv-eyebrow block text-ink-muted">{c.etiqueta}</span>
                    <span className="mt-0.5 block text-sm leading-snug text-ink-soft">{c.valor}</span>
                  </span>
                </li>
              );
            }

            return (
              <li key={c.etiqueta}>
                <label className="flex cursor-pointer items-center gap-3 py-3">
                  <input
                    type="checkbox"
                    checked={marcado}
                    onChange={() => alternar(c.etiqueta)}
                    className="peer sr-only"
                  />
                  <span
                    aria-hidden="true"
                    className={cn(
                      "grid h-5 w-5 shrink-0 place-items-center rounded-md border transition-surface duration-base ease-ps",
                      marcado
                        ? "border-brand bg-brand text-on-accent"
                        : "border-dashed border-line-strong bg-surface",
                      "peer-focus-visible:ring-2 peer-focus-visible:ring-brand peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-canvas",
                    )}
                  >
                    {marcado && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="jv-eyebrow block text-ink-muted">{c.etiqueta}</span>
                    <span
                      className={cn(
                        "mt-0.5 block text-sm leading-snug transition-colors duration-base ease-ps",
                        marcado ? "text-ink" : "text-ink-muted",
                      )}
                    >
                      {marcado ? t.completa : porLlenar}
                    </span>
                  </span>
                </label>
              </li>
            );
          })}
        </ul>

        <p className="mt-5 font-mono text-xs leading-relaxed text-ink-soft">{rotuloFicha}</p>
      </div>

      {/* El mapa */}
      <div className="bg-surface p-6 sm:p-8">
        <div className="flex min-w-0 items-center gap-2.5 rounded-full border border-line bg-canvas px-4 py-3">
          <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0 text-ink-soft" fill="none" aria-hidden="true">
            <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="2" />
            <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="min-w-0 flex-1 truncate font-mono text-sm text-ink">{consulta}</span>
        </div>

        <p
          className={cn(
            "mt-5 jv-eyebrow transition-colors duration-base ease-ps",
            completa ? "text-brand" : "text-ink-muted",
          )}
        >
          {completa ? t.entras : t.fuera}
        </p>

        {/* La lista del paquete. Tu negocio entra ARRIBA y los tres de siempre
            bajan un puesto: es lo que pasa, y por eso las filas se reacomodan
            en vez de aparecer y ya. */}
        <ul aria-live="polite" className="mt-3 grid gap-2">
          {completa && (
            <FilaMapa
              tuyo
              nombre={t.tuNegocio}
              categoria={competidores[0]?.categoria ?? ""}
              distancia="0,3 km"
              estrellas={5}
            />
          )}
          {competidores.slice(0, completa ? 2 : 3).map((c, i) => (
            <FilaMapa key={`${c.nombre}-${i}`} {...c} />
          ))}
        </ul>

        <p className="jv-rule mt-6 pt-4 font-mono text-xs leading-relaxed text-ink-soft">{pie}</p>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

/**
 * EL BLOQUE LOCAL: SIN FICHA / CON FICHA
 * ─────────────────────────────────────────────────────────────────────────
 * El dueño de PYME no sabe qué es «el bloque local» hasta que lo ve. Y la
 * promesa queda dicha en su forma honesta —el trabajo es ENTRAR en la lista,
 * no ser el primero—, que es lo que ya dice el hero de la página y lo que
 * ningún competidor se atreve a dibujar, porque todos venden el primer puesto.
 *
 * NADA DE LA MARCA GOOGLE: ni la G de cuatro colores, ni el azul #1a73e8, ni su
 * tipografía. Es una maqueta en la paleta de la casa y lleva rotulado
 * permanente «Ejemplo · no es un resultado real». Los tres del bloque se
 * llaman «Tu negocio» y «Competidor»: cero nombres reales, cero posiciones
 * afirmadas.
 *
 * EL ASESINO A 390 es el nombre largo dentro de la fila: lleva `truncate` el
 * span del nombre Y `min-w-0` el flex que lo contiene. Sin el `min-w-0` el
 * hijo de flex se niega a encogerse y saca la fila fuera del viewport.
 *
 * Lo conduce el visitante o no se mueve: jamás autoplay.
 */

type Ficha = { nombre: string; categoria: string; distancia: string; estrellas: number };

const COMPETIDORES: Ficha[] = [
  { nombre: "Competidor", categoria: "Mismo servicio", distancia: "0,8 km", estrellas: 4 },
  { nombre: "Competidor", categoria: "Mismo servicio", distancia: "1,4 km", estrellas: 4 },
];

function Estrellas({ n }: { n: number }) {
  return (
    <span className="flex shrink-0 items-center gap-0.5" aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 12 12" className="h-3 w-3" fill="none">
          <path
            d="M6 1l1.5 3.1 3.4.5-2.45 2.4.58 3.4L6 8.8 2.97 10.4l.58-3.4L1.1 4.6l3.4-.5L6 1z"
            className={i < n ? "fill-accent" : "fill-line"}
          />
        </svg>
      ))}
    </span>
  );
}

function FilaBloque({ ficha, tuyo }: { ficha: Ficha; tuyo?: boolean }) {
  return (
    <div
      className={cn(
        "flex min-w-0 items-start gap-3 rounded-xl border p-3",
        tuyo ? "border-primary/25 bg-primary/10" : "border-line bg-surface"
      )}
    >
      <span
        aria-hidden
        className={cn(
          "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md font-mono text-[11px] tabular-nums",
          tuyo ? "bg-primary text-surface" : "bg-background text-ink-soft"
        )}
      >
        {tuyo ? "✓" : "·"}
      </span>
      <span className="min-w-0 flex-1">
        <span
          className={cn(
            "block truncate font-body text-[15px] leading-snug",
            tuyo ? "font-semibold text-ink" : "text-ink"
          )}
        >
          {ficha.nombre}
        </span>
        {/* La categoría y la distancia bajan a su propio renglón: no compiten
            por el ancho con el nombre. */}
        <span className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 font-body text-[13px] text-ink-soft">
          <Estrellas n={ficha.estrellas} />
          <span className="font-mono text-[11px] tabular-nums">{ficha.estrellas},0</span>
          <span aria-hidden>·</span>
          <span>{ficha.categoria}</span>
          <span aria-hidden>·</span>
          <span className="font-mono text-[11px] tabular-nums">{ficha.distancia}</span>
        </span>
      </span>
    </div>
  );
}

export function BloqueLocalGoogle({
  consulta = "peluquería en Turbaco",
  tuNegocio = "Tu negocio",
  className,
}: {
  /** La búsqueda escrita en la barra. Cámbiala por la del sector de la página. */
  consulta?: string;
  tuNegocio?: string;
  className?: string;
}) {
  const [conFicha, setConFicha] = useState(false);

  return (
    <div className={cn("rounded-2xl border border-line bg-background p-4 sm:p-5", className)}>
      {/* Conmutador. A 390 es el control principal del visual, así que va a
          ancho completo y gordo. Dos botones con aria-pressed, no un slider. */}
      <div className="grid grid-cols-2 gap-2">
        {[
          { v: false, t: "Sin ficha" },
          { v: true, t: "Con ficha" },
        ].map((o) => (
          <button
            key={o.t}
            type="button"
            aria-pressed={conFicha === o.v}
            onClick={() => setConFicha(o.v)}
            className={cn(
              "min-h-11 rounded-full border px-4 font-body text-sm font-semibold transition-surface duration-quick ease-state",
              conFicha === o.v
                ? "border-primary bg-primary text-surface"
                : "border-line bg-surface text-ink-soft hover:border-primary/40 hover:text-ink"
            )}
          >
            {o.t}
          </button>
        ))}
      </div>

      {/* Barra de búsqueda maquetada. */}
      <div className="mt-4 flex min-w-0 items-center gap-2.5 rounded-full border border-line bg-surface px-4 py-3">
        <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0 text-ink-soft" fill="none" aria-hidden>
          <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span className="min-w-0 flex-1 truncate font-mono text-[13px] text-ink">{consulta}</span>
      </div>

      <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-accent-ink">
        Los tres del mapa
      </p>

      <div
        aria-live="polite"
        className="mt-2.5 grid gap-2 transition-opacity duration-quick ease-state"
      >
        {conFicha ? (
          <FilaBloque
            tuyo
            ficha={{
              nombre: tuNegocio,
              categoria: "Tu servicio principal",
              distancia: "0,3 km",
              estrellas: 5,
            }}
          />
        ) : (
          <div className="grid min-h-[4.5rem] place-items-center rounded-xl border border-dashed border-line px-4 py-4 text-center">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent-ink">
                Sin ficha
              </p>
              <p className="mt-1.5 text-balance font-body text-[15px] leading-snug text-ink-soft">
                Aquí no apareces.
              </p>
            </div>
          </div>
        )}

        {COMPETIDORES.map((c, i) => (
          <FilaBloque key={i} ficha={c} />
        ))}
      </div>

      {/* Dos resultados orgánicos, para que se entienda dónde queda el bloque. */}
      <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-accent-ink">
        Debajo, los resultados de siempre
      </p>
      <ul className="mt-2.5 grid gap-3">
        {["Un directorio del sector", "Otro negocio de la zona"].map((t) => (
          <li key={t} className="min-w-0">
            <span className="block truncate font-body text-[15px] text-primary-dark underline underline-offset-2">
              {t}
            </span>
            <span className="mt-1 block h-2 w-full max-w-[22rem] rounded-full bg-line" aria-hidden />
          </li>
        ))}
      </ul>

      <p className="mt-5 border-t border-line pt-4 font-mono text-[11px] leading-relaxed text-accent-ink">
        Ejemplo · no es un resultado real. El trabajo es entrar en la lista, no
        prometer el primer puesto.
      </p>
    </div>
  );
}

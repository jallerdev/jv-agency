"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * LA LISTA DE ACOPIO: QUÉ NECESITO DE TI PARA ARRANCAR
 * ─────────────────────────────────────────────────────────────────────────
 * Es el complemento natural de <RailPlazo>: aquel dice que el reloj no arranca
 * sin el material, esta dice exactamente cuál. Convierte una advertencia en
 * una herramienta: quien marca seis casillas ya empezó el proyecto
 * mentalmente y llega a la llamada con el material medio reunido, que es el
 * problema operativo número uno de un estudio de una sola persona.
 *
 * A 390 el objetivo táctil es la FILA ENTERA —el <label> mide 44 px de alto y
 * clicar el texto marca la casilla—, no el cuadradito de 20 px, que sería un
 * objetivo de 20x20 y viola la regla de 44x44.
 *
 * OJO CON `.tap-row`: parece la utilidad indicada y NO lo es. Declara
 * `display: block` y vive en `@layer utilities`, así que le gana a la clase
 * `flex` de Tailwind y deja la casilla y el texto uno encima del otro, sin el
 * `gap-3` y sin sangría en la segunda línea. Es para enlaces de lista, no para
 * filas en flex. Aquí el alto se pone con `min-h-11` y `py-2.5`.
 *
 * PERSISTENCIA OPCIONAL: con `almacen` la lista sobrevive a la recarga. El
 * acceso a localStorage va en try/catch porque en navegación privada el propio
 * acceso puede lanzar, y se lee en un efecto —nunca en el primer render— para
 * no romper la hidratación.
 */

export function ListaAcopio({
  items,
  titulo = "Qué necesito de ti para arrancar",
  nota = "El reloj arranca cuando llega el material, no al aceptar la propuesta.",
  almacen,
  contador,
  className,
}: {
  items: string[];
  titulo?: string;
  nota?: string;
  /** La plantilla del renglón «3 de 6 listos», con `{listos}` y `{total}`.
   *  Es una CADENA y no una función porque este componente es de cliente y
   *  una función no puede cruzar la frontera desde un componente de servidor
   *  —React lo rechaza en tiempo de ejecución—. Y va entera, no por piezas,
   *  porque en inglés el orden es otro: «3 of 6 ready». */
  contador?: string;
  /** Clave de localStorage. Sin ella la lista no se guarda, y no pasa nada. */
  almacen?: string;
  className?: string;
}) {
  const [marcados, setMarcados] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!almacen) return;
    try {
      const guardado = window.localStorage.getItem(almacen);
      if (guardado) setMarcados(JSON.parse(guardado));
    } catch {
      /* Navegación privada o almacenamiento bloqueado: la lista funciona
         igual, simplemente no se acuerda. */
    }
  }, [almacen]);

  const alternar = (item: string) => {
    setMarcados((prev) => {
      const siguiente = { ...prev, [item]: !prev[item] };
      if (almacen) {
        try {
          window.localStorage.setItem(almacen, JSON.stringify(siguiente));
        } catch {
          /* Igual que arriba: no guardar no es un error que deba verse. */
        }
      }
      return siguiente;
    });
  };

  const listos = items.filter((i) => marcados[i]).length;

  return (
    <div className={cn("jv-card p-5 sm:p-6", className)}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="font-body text-xl font-semibold leading-tight text-ink">{titulo}</p>
        <p
          aria-live="polite"
          className="shrink-0 jv-eyebrow tabular-nums text-accent-ink"
        >
          {(contador ?? "{listos} de {total} listos")
            .replace("{listos}", String(listos))
            .replace("{total}", String(items.length))}
        </p>
      </div>

      <ul className="mt-4 divide-y divide-line">
        {items.map((item) => {
          const marcado = Boolean(marcados[item]);
          return (
            <li key={item}>
              <label className="flex min-h-11 cursor-pointer items-start gap-3 py-2.5">
                <input
                  type="checkbox"
                  checked={marcado}
                  onChange={() => alternar(item)}
                  className="mt-0.5 h-5 w-5 shrink-0 accent-primary"
                />
                <span
                  className={cn(
                    "min-w-0 flex-1 font-body text-[15px] leading-snug transition-surface duration-quick ease-state",
                    marcado ? "text-ink-soft line-through decoration-line" : "text-ink"
                  )}
                >
                  {item}
                </span>
              </label>
            </li>
          );
        })}
      </ul>

      {nota && (
        <p className="mt-4 jv-rule pt-4 font-body text-[13px] leading-relaxed text-ink-soft">
          {nota}
        </p>
      )}
    </div>
  );
}

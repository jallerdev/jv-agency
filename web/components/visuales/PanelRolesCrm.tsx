"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import type { Idioma } from "@/content/types";

/**
 * EL PANEL QUE CAMBIA SEGÚN QUIÉN MIRA
 * ─────────────────────────────────────────────────────────────────────────
 * Esta página vendía algo invisible con 832 líneas de prosa y ni un solo
 * visual. «Cada vendedor ve sus clientes, no los del resto» iba de subordinada
 * dentro de un párrafo, y es exactamente lo que un dueño con vendedores a
 * comisión necesita ver funcionando antes de gastar en software. Conmutado a
 * la vista, el argumento se demuestra en un clic.
 *
 * A 390 NO HAY KANBAN. Cuatro columnas dan 82 px y las tarjetas se parten por
 * sílabas. El MISMO DOM se apila en cuatro grupos con su cabecera y su
 * contador —que es como se lee una lista agrupada— y de `sm` en adelante esos
 * grupos son las columnas. Nada scrollea de lado: ni la caja ni el documento.
 *
 * LAS TARJETAS QUE NO SON TUYAS NO SE DESMONTAN: SE PLIEGAN
 * ---------------------------------------------------------
 * Antes desaparecían de golpe. Ahora se recogen —`grid-template-rows` de 1fr a
 * 0fr, que se puede animar, a diferencia de `height: auto`— y las columnas se
 * reacomodan solas mientras se pliegan. La diferencia no es estética: ver
 * ENCOGERSE lo que no te toca es lo que explica que el panel filtra por
 * persona; verlo desaparecer de un fotograma al siguiente no explica nada.
 *
 * Quedarse en el DOM también arregla lo otro: plegadas van `inert`, así que no
 * se tabula hacia tarjetas invisibles, pero el contenido sigue servido.
 *
 * EL CONTADOR SE INTERPOLA. De 8 a 4 de golpe es un número que cambia; de 8 a
 * 4 pasando por 7, 6 y 5 es una cantidad que baja, y eso es lo que se está
 * contando. Con movimiento reducido salta directo, que es lo correcto.
 *
 * DATOS DE EJEMPLO Y SE DICE: «Cliente A», «Vendedor 1», sin montos. Un panel
 * de venta con cifras dentro insinúa un cliente que no existe.
 */

type Negocio = { id: string; cliente: string; de: "v1" | "v2" };
type Columna = { estado: string; negocios: Negocio[] };

/* Los cuatro estados del embudo, en las dos lenguas. Los nombres de cliente
   son «Cliente A»/«Client A» a propósito: un panel de venta con nombres o
   cifras reales insinuaría un cliente que no existe. */
const ESTADOS = {
  es: ["Nuevo", "Contactado", "Propuesta", "Cerrado"],
  en: ["New", "Contacted", "Proposal", "Closed"],
} as const;

const T = {
  es: {
    admin: "Administrador",
    vendedor: "Vendedor a comisión",
    noEsTuyo: "No es tuyo",
    ejemplo: "Ejemplo · datos de muestra",
    cliente: (letra: string) => `Cliente ${letra}`,
    vendedorN: (n: number) => `Vendedor ${n}`,
    /* Iba escrito a pelo en el JSX y se leía «8 negocios visibles» también en
       la página inglesa. */
    visibles: (n: number) => `${n} negocios visibles`,
  },
  en: {
    admin: "Administrator",
    vendedor: "Commission salesperson",
    noEsTuyo: "Not yours",
    ejemplo: "Example · sample data",
    cliente: (letra: string) => `Client ${letra}`,
    vendedorN: (n: number) => `Salesperson ${n}`,
    visibles: (n: number) => `${n} deals visible`,
  },
} as const;

const TABLERO: Columna[] = [
  {
    estado: "Nuevo",
    negocios: [
      { id: "a", cliente: "Cliente A", de: "v1" },
      { id: "b", cliente: "Cliente B", de: "v2" },
      { id: "c", cliente: "Cliente C", de: "v1" },
    ],
  },
  {
    estado: "Contactado",
    negocios: [
      { id: "d", cliente: "Cliente D", de: "v2" },
      { id: "e", cliente: "Cliente E", de: "v1" },
    ],
  },
  {
    estado: "Propuesta",
    negocios: [
      { id: "f", cliente: "Cliente F", de: "v2" },
      { id: "g", cliente: "Cliente G", de: "v1" },
    ],
  },
  {
    estado: "Cerrado",
    negocios: [{ id: "h", cliente: "Cliente H", de: "v2" }],
  },
];

/** Cuenta hasta `objetivo` en medio segundo. Salta si hay movimiento reducido. */
function useContador(objetivo: number) {
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
    const dura = 420;
    let id = 0;
    const paso = (ahora: number) => {
      const t = Math.min((ahora - inicio) / dura, 1);
      /* `easeOut` cúbico: arranca rápido y frena. Un contador lineal parece
         un cronómetro; este parece una cantidad que se asienta. */
      const e = 1 - (1 - t) ** 3;
      setValor(Math.round(desde + (objetivo - desde) * e));
      if (t < 1) id = requestAnimationFrame(paso);
    };
    id = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(id);
  }, [objetivo]);

  return valor;
}

export function PanelRolesCrm({
  idioma = "es",
  className,
}: {
  idioma?: Idioma;
  className?: string;
}) {
  const t = T[idioma];
  const estados = ESTADOS[idioma];
  const [vista, setVista] = useState<"admin" | "vendedor">("admin");
  const esAdmin = vista === "admin";

  const visible = (n: Negocio) => esAdmin || n.de === "v1";
  const total = TABLERO.reduce((s, c) => s + c.negocios.filter(visible).length, 0);
  const contado = useContador(total);

  return (
    <div className={cn("jv-card p-5 sm:p-6", className)}>
      {/* El conmutador es el control principal: ancho completo y gordo. */}
      <div className="grid grid-cols-2 gap-2 sm:max-w-lg">
        {[
          { id: "admin" as const, boton: t.admin },
          { id: "vendedor" as const, boton: t.vendedor },
        ].map((v) => {
          const activa = v.id === vista;
          return (
            <button
              key={v.id}
              type="button"
              aria-pressed={activa}
              onClick={() => setVista(v.id)}
              className={cn(
                "min-h-11 rounded-xl border px-3 py-2 font-body text-sm font-semibold leading-snug transition-surface duration-base ease-ps",
                activa
                  ? "border-brand bg-brand text-on-accent"
                  : "border-line bg-canvas text-ink-soft hover:border-brand/40 hover:text-ink",
              )}
            >
              {v.boton}
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="mt-4 jv-eyebrow tabular-nums text-brand">
        {t.visibles(contado)}
      </p>

      <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-4 sm:items-start sm:gap-3">
        {TABLERO.map((col, i) => {
          const suyos = col.negocios.filter(visible);
          return (
            <div key={col.estado} className="min-w-0">
              <p className="jv-rule flex items-baseline justify-between gap-2 pb-2 jv-eyebrow text-ink-muted">
                <span className="min-w-0 truncate">{estados[i] ?? col.estado}</span>
                <span className="shrink-0 tabular-nums text-brand">{suyos.length}</span>
              </p>

              <ul className="mt-2 grid gap-2">
                {col.negocios.map((n) => {
                  const tuyo = visible(n);
                  return (
                    <li
                      key={n.id}
                      inert={!tuyo}
                      className={cn(
                        "grid transition-[grid-template-rows,opacity] duration-slow ease-ps",
                        tuyo ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                      )}
                    >
                      <div className="overflow-hidden">
                        <div className="rounded-xl border border-line bg-canvas px-3 py-2.5">
                          <span className="block font-body text-sm font-semibold leading-snug text-ink">
                            {t.cliente(n.cliente.slice(-1))}
                          </span>
                          <span className="mt-0.5 block jv-eyebrow text-ink-muted">
                            {t.vendedorN(n.de === "v1" ? 1 : 2)}
                          </span>
                        </div>
                      </div>
                    </li>
                  );
                })}

                {/* La columna vacía dice por qué está vacía. Sin esto, en la
                    vista de vendedor una columna sin tarjetas se lee como un
                    embudo sin negocios, que es lo contrario del argumento. */}
                {suyos.length === 0 && (
                  <li className="rounded-xl border border-dashed border-line px-3 py-2.5 font-body text-sm leading-snug text-ink-muted">
                    {t.noEsTuyo}
                  </li>
                )}
              </ul>
            </div>
          );
        })}
      </div>

      <p className="mt-5 jv-eyebrow text-ink-soft">{t.ejemplo}</p>
    </div>
  );
}

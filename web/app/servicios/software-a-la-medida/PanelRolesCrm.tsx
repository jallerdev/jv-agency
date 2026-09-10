"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

/**
 * EL PANEL QUE CAMBIA SEGÚN QUIÉN MIRA
 * ─────────────────────────────────────────────────────────────────────────
 * Esta página vendía algo invisible con 832 líneas de prosa y ni un solo
 * visual. «Cada vendedor ve sus clientes, no los del resto» iba de subordinada
 * dentro de un párrafo, y es exactamente lo que un dueño con vendedores a
 * comisión necesita ver funcionando antes de gastar en software. Conmutado a
 * la vista, el argumento se demuestra en un clic.
 *
 * DÓNDE VIVE: junto a su página, no en components/visuales/. Es el único sitio
 * que lo usa y así no compite con nadie por un archivo compartido.
 *
 * A 390 NO HAY KANBAN. Cuatro columnas dan 82 px y las tarjetas se parten por
 * sílabas. El MISMO DOM se apila en cuatro grupos con su cabecera y su
 * contador —que es como se lee una lista agrupada— y de `sm` en adelante esos
 * grupos son las columnas. Nada scrollea de lado: ni la caja ni el documento.
 *
 * SIN MOVIMIENTO: las tarjetas que no son tuyas no se desvanecen ni se
 * deslizan, desaparecen. No hay transición que apagar bajo movimiento
 * reducido porque no hay ninguna.
 *
 * DATOS DE EJEMPLO Y SE DICE: «Cliente A», «Vendedor 1», sin montos. Un panel
 * de venta con cifras dentro insinúa un cliente que no existe.
 */

type Negocio = { id: string; cliente: string; de: "v1" | "v2" };
type Columna = { estado: string; negocios: Negocio[] };

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

const VISTAS = [
  { id: "admin" as const, boton: "Administrador" },
  { id: "vendedor" as const, boton: "Vendedor a comisión" },
];

export function PanelRolesCrm({ className }: { className?: string }) {
  const [vista, setVista] = useState<"admin" | "vendedor">("admin");
  const esAdmin = vista === "admin";

  const visible = (n: Negocio) => esAdmin || n.de === "v1";
  const total = TABLERO.reduce((s, c) => s + c.negocios.filter(visible).length, 0);

  return (
    <div className={cn("jv-card p-5 sm:p-6", className)}>
      {/* El conmutador es el control principal: ancho completo y gordo. */}
      <div className="grid grid-cols-2 gap-2 sm:max-w-lg">
        {VISTAS.map((v) => {
          const activa = v.id === vista;
          return (
            <button
              key={v.id}
              type="button"
              aria-pressed={activa}
              onClick={() => setVista(v.id)}
              className={cn(
                "min-h-11 rounded-xl border px-3 py-2 font-body text-[13px] font-semibold leading-snug transition-surface duration-quick ease-state",
                activa
                  ? "border-primary bg-primary text-on-accent"
                  : "border-line bg-background text-ink-soft hover:border-primary/40 hover:text-ink"
              )}
            >
              {v.boton}
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="mt-4 jv-eyebrow text-accent-ink">
        {total} negocios visibles
      </p>

      <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-4 sm:items-start sm:gap-3">
        {TABLERO.map((col) => {
          const suyos = col.negocios.filter(visible);
          return (
            <div key={col.estado} className="min-w-0">
              <p className="flex items-baseline justify-between gap-2 border-b border-line pb-2 jv-eyebrow text-accent-ink">
                <span className="min-w-0 truncate">{col.estado}</span>
                <span className="shrink-0 tabular-nums">{suyos.length}</span>
              </p>
              <ul className="mt-2 grid gap-2">
                {suyos.map((n) => (
                  <li
                    key={n.id}
                    className="rounded-xl border border-line bg-background px-3 py-2.5"
                  >
                    <span className="block font-body text-[13px] font-semibold leading-snug text-ink">
                      {n.cliente}
                    </span>
                    <span className="mt-0.5 block jv-eyebrow text-ink-soft">
                      {n.de === "v1" ? "Vendedor 1" : "Vendedor 2"}
                    </span>
                  </li>
                ))}
                {suyos.length === 0 && (
                  <li className="rounded-xl border border-dashed border-line px-3 py-2.5 font-body text-[13px] leading-snug text-ink-soft">
                    No es tuyo
                  </li>
                )}
              </ul>
            </div>
          );
        })}
      </div>

      <p className="mt-5 jv-eyebrow text-accent-ink">
        Ejemplo · datos de muestra
      </p>
    </div>
  );
}

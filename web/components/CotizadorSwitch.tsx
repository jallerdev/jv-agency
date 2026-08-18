"use client";

import { useState } from "react";
import { Globe, MessageSquareText } from "lucide-react";

import { Cotizador } from "@/components/Cotizador";
import { CotizadorAutomatizaciones } from "@/components/CotizadorAutomatizaciones";
import { cn } from "@/lib/utils";

// Un solo punto de entrada para las dos líneas de negocio. Se mantienen como
// componentes separados a propósito: el cotizador web ya convierte y no se
// toca por dentro para agregar automatizaciones.
type Linea = "web" | "automatizacion";

const OPCIONES: { id: Linea; label: string; icon: typeof Globe }[] = [
  { id: "web", label: "Sitio web", icon: Globe },
  { id: "automatizacion", label: "Automatización", icon: MessageSquareText },
];

export function CotizadorSwitch() {
  const [linea, setLinea] = useState<Linea>("web");

  return (
    <>
      <div className="mb-8 flex justify-center">
        <div role="tablist" aria-label="Tipo de cotización"
          className="inline-flex gap-1 rounded-full border border-line bg-surface/70 p-1.5">
          {OPCIONES.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              role="tab"
              aria-selected={linea === id}
              onClick={() => setLinea(id)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-body text-sm transition-all",
                linea === id
                  ? "bg-primary text-surface shadow-soft"
                  : "text-ink-soft hover:text-ink"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {linea === "web" ? <Cotizador /> : <CotizadorAutomatizaciones />}
    </>
  );
}

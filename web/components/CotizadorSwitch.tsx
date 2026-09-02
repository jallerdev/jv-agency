"use client";

import { useState } from "react";
import { Globe, MessageSquareText, Search } from "lucide-react";

import { Cotizador } from "@/components/Cotizador";
import { CotizadorAutomatizaciones } from "@/components/CotizadorAutomatizaciones";
import { CotizadorSeo } from "@/components/CotizadorSeo";
import { cn } from "@/lib/utils";

// Un solo punto de entrada para las tres líneas de negocio. Se mantienen como
// componentes separados a propósito: cada uno tiene su propia lógica de
// precios y mezclarlos en un solo flujo los volvería ilegibles.
//
// El SEO entró como línea propia porque antes existía SOLO como un extra de
// $250.000 dentro del cotizador web. Ese extra es SEO técnico —se hace una vez
// y se acaba— mientras que posicionar es trabajo mensual. Venderlos con el
// mismo nombre hacía creer que por $250.000 se llegaba al primer puesto.
type Linea = "web" | "automatizacion" | "seo";

const OPCIONES: { id: Linea; label: string; icon: typeof Globe }[] = [
  { id: "web", label: "Sitio web", icon: Globe },
  { id: "automatizacion", label: "Automatización", icon: MessageSquareText },
  { id: "seo", label: "SEO", icon: Search },
];

export function CotizadorSwitch() {
  const [linea, setLinea] = useState<Linea>("web");

  return (
    <>
      <div className="mb-8 flex justify-center">
        <div role="tablist" aria-label="Tipo de cotización"
          className="inline-flex flex-wrap justify-center gap-1 rounded-full border border-line bg-surface/70 p-1.5">
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

      {linea === "web" && <Cotizador />}
      {linea === "automatizacion" && <CotizadorAutomatizaciones />}
      {linea === "seo" && <CotizadorSeo />}
    </>
  );
}

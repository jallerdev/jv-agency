"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";

import { MOSTRAR_PENDIENTES } from "@/components/Pendiente";

export type Faq = {
  q: string;
  a: React.ReactNode;
  /**
   * Dato por comprobar. Se pinta FUERA del contenido plegable a proposito:
   * Radix desmonta lo cerrado, asi que dentro no existiria en el DOM hasta que
   * alguien hiciera clic, y un marcador que hay que ir a buscar no cumple su
   * unico trabajo.
   */
  verify?: string;
};

/**
 * El acordeon de preguntas. Vivia dentro de FAQ.tsx y ahora es compartido: lo
 * usan la portada y la pagina del chatbot, que antes pintaba sus preguntas
 * como tarjetas abiertas y se leia como otra seccion distinta.
 */
export function Faqs({
  items,
  abiertaPorDefecto = true,
}: {
  items: Faq[];
  abiertaPorDefecto?: boolean;
}) {
  return (
        <AccordionPrimitive.Root
          type="single"
          collapsible
          defaultValue={abiertaPorDefecto ? "faq-0" : undefined}
          className="flex flex-col gap-2.5"
        >
          {items.map((item, i) => (
            <AccordionPrimitive.Item
              key={i}
              value={`faq-${i}`}
              className="group/item relative jv-card/60 transition-card duration-slow ease-state hover:bg-surface/90 data-[state=open]:border-primary/30 data-[state=open]:bg-surface data-[state=open]:shadow-soft"
            >
              {/* Lomo de acento: crece cuando el ítem abre. Es lo que permite
                  ver de un vistazo, desde el margen, cuál está abierto. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-4 left-0 top-4 w-[3px] origin-center scale-y-0 rounded-full bg-accent transition-transform duration-slow ease-state group-data-[state=open]/item:scale-y-100"
              />

              <AccordionPrimitive.Header className="flex">
                <AccordionPrimitive.Trigger className="group/trigger flex flex-1 items-start justify-between gap-5 rounded-2xl px-6 py-5 text-left focus-visible:transition-none">
                  <span className="font-body text-[1.15rem] font-semibold leading-snug text-ink transition-colors duration-quick ease-state group-hover/trigger:text-primary-dark sm:text-xl">
                    {item.q}
                  </span>
                  <span
                    aria-hidden="true"
                    className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line bg-background/60 text-accent-ink transition-surface duration-slow ease-state group-hover/trigger:border-primary/40 group-data-[state=open]/trigger:border-primary group-data-[state=open]/trigger:bg-primary group-data-[state=open]/trigger:text-on-accent"
                  >
                    <Plus
                      className="h-4 w-4 transition-transform duration-slow ease-ps group-data-[state=open]/trigger:rotate-45"
                      strokeWidth={2}
                    />
                  </span>
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>

              <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <p className="max-w-[48ch] px-6 pr-8 pb-6 font-body text-base leading-relaxed text-ink-soft">
                  {item.a}
                </p>
              </AccordionPrimitive.Content>

              {/* Dato por comprobar, a la vista. VA FUERA DE Content a
                  proposito: Radix desmonta el contenido del acordeon cuando
                  esta cerrado, asi que dentro el marcador no existia en el
                  DOM hasta que alguien hiciera clic —y un marcador que hay
                  que ir a buscar no cumple su unico trabajo. Aqui se ve al
                  cargar la pagina, debajo de la pregunta que contradice. Si
                  molesta verlo, esa es justamente la idea: se va cuando se
                  resuelve. */}
              {item.verify && MOSTRAR_PENDIENTES && (
                <p className="mx-6 mb-6 max-w-[48ch] rounded-xl border border-dashed border-accent/60 bg-accent/[0.07] px-4 py-3 font-mono text-xs leading-relaxed text-accent-ink">
                  {item.verify}
                </p>
              )}
            </AccordionPrimitive.Item>
          ))}
        </AccordionPrimitive.Root>
  );
}

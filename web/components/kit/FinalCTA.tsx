import Link from "next/link";

import { Reveal } from "@/components/Reveal";
import { PriceTag } from "@/components/kit/Precio";
import { Button } from "@/components/ui/button";
import { WHATSAPP_LINK } from "@/lib/business";
import { catalogo, type ServicioPublicado } from "@/lib/quote";
import { cn } from "@/lib/utils";
import type { Idioma } from "@/content/types";

/**
 * El cierre de todas las páginas internas, con la misma estructura en todas.
 *
 * POR QUÉ IDÉNTICO Y NO «ADAPTADO A CADA PÁGINA»
 * ----------------------------------------------
 * Porque el visitante que llega al final de la sexta página ya sabe dónde está
 * el botón, y eso vale más que la variedad. Lo único que cambia es el titular
 * y el texto, que los pone la página.
 *
 * UNA SOLA ACCIÓN PRINCIPAL
 * -------------------------
 * «Agenda una llamada» es la primaria en todo el sitio. WhatsApp va como
 * secundaria, con filete y sin relleno: no compite. Barranquilla era la única
 * página que pedía otra cosa en el hero, y se unificó en la fase 0.
 */

const TEXTOS: Record<Idioma, { agenda: string; whatsapp: string; siguiente: string }> = {
  es: {
    agenda: "Agenda una llamada",
    whatsapp: "Escríbeme por WhatsApp",
    siguiente: "El siguiente paso",
  },
  en: {
    agenda: "Book a call",
    whatsapp: "Message me on WhatsApp",
    siguiente: "The next step",
  },
};

const AGENDAR: Record<Idioma, string> = { es: "/agendar", en: "/en/book-a-call" };

export function FinalCTA({
  titulo,
  cuerpo,
  idioma,
  siguiente,
  className,
}: {
  titulo: string;
  cuerpo?: string;
  idioma: Idioma;
  /** La tarjeta de «siguiente paso lógico», si la página tiene uno. */
  siguiente?: React.ReactNode;
  className?: string;
}) {
  const t = TEXTOS[idioma];

  return (
    <section className={cn("border-t border-line bg-tint", className)}>
      <div className="mx-auto max-w-[1280px] px-6 py-24 md:px-12 md:py-32">
        <div
          className={cn(
            "grid grid-cols-1 gap-12",
            siguiente && "lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-16",
          )}
        >
          <Reveal>
            <h2 className="text-balance text-[length:var(--text-display)]">{titulo}</h2>
            {cuerpo && (
              <p className="mt-6 max-w-[52ch] text-pretty leading-relaxed text-ink-soft">
                {cuerpo}
              </p>
            )}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" variant="primary" asChild>
                <Link href={AGENDAR[idioma]}>{t.agenda}</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                  {t.whatsapp}
                </a>
              </Button>
            </div>
          </Reveal>

          {siguiente && (
            <Reveal delay={120}>
              <p className="jv-eyebrow text-ink-soft">{t.siguiente}</p>
              <div className="mt-4">{siguiente}</div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

/**
 * «El siguiente paso lógico»: la tarjeta que dice a dónde ir después.
 *
 * El orden lo recomienda el propio sitio y no se inventa aquí: primero la web,
 * después el chatbot, luego el sistema. Diseño web lleva a tiendas o a SEO;
 * tiendas lleva a chatbot; chatbot lleva a software.
 */
export function NextStep({
  id,
  idioma,
  titulo,
  cuerpo,
  className,
}: {
  id: ServicioPublicado["id"];
  idioma: Idioma;
  /** Si la página quiere decirlo con sus palabras. */
  titulo?: string;
  cuerpo?: string;
  className?: string;
}) {
  return (
    <article className={cn("jv-card jv-card-int p-6", className)}>
      <h3 className="jv-titulo">{titulo ?? catalogo(id).nombre[idioma]}</h3>
      {cuerpo && <p className="mt-3 text-sm leading-relaxed text-ink-soft">{cuerpo}</p>}
      <PriceTag id={id} idioma={idioma} tam="sm" className="mt-4" conPlazo={false} />
      <Link
        href={catalogo(id).href[idioma]}
        className="jv-toque jv-navlink mt-5 block w-fit text-sm font-semibold text-ink"
      >
        {idioma === "es" ? "Ver el detalle" : "See the detail"}
      </Link>
    </article>
  );
}

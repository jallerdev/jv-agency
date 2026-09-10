import Link from "next/link";
import { ArrowUpRight, Instagram, Facebook, Mail } from "lucide-react";

import { COLUMNAS, PIE } from "@/content/layout/footer";
import type { Idioma } from "@/content/types";
import { BUSINESS, WHATSAPP_LINK } from "@/lib/business";
import { Logo } from "@/components/Logo";

/**
 * EL PIE, CON LA MARCA DE AGUA
 * ──────────────────────────────────────────────────────────────────────────
 * Cuatro columnas de enlaces, la ficha del estudio y el nombre a 20 vw detrás
 * de todo, al 4 % de opacidad.
 *
 * TRES COSAS QUE SE HACEN A PROPÓSITO:
 *
 * · La marca de agua va en un `<span aria-hidden>` con `select-none`. Es
 *   textura, no contenido: un lector de pantalla que anuncie «JV AGENCIA» al
 *   llegar al pie, después de haberlo leído ya en el enlace del logotipo, está
 *   repitiendo. Y `user-select` evita que arrastrar el ratón por el pie
 *   seleccione un nombre de 300 px que nadie quería copiar.
 *
 * · Los enlaces miden 44 px de alto sin cambiar el ritmo visual: el área
 *   crece con el relleno, no con el tamaño de letra. Diecisiete enlaces de
 *   18 px con 12 px de aire son imposibles de acertar con el pulgar.
 *
 * · El texto legal va en `--text-body` (62 % sobre casi negro = 6,9:1) y no
 *   en un 40 % que quedaría bonito y no pasaría AA. Es letra pequeña: el
 *   contraste ahí importa más, no menos.
 */
const REDES = [
  { Icono: Instagram, url: BUSINESS.social?.instagram, nombre: "Instagram" },
  { Icono: Facebook, url: BUSINESS.social?.facebook, nombre: "Facebook" },
  { Icono: Mail, url: `mailto:${BUSINESS.email}`, nombre: "Correo" },
].filter((r) => Boolean(r.url));

export function Footer({ idioma }: { idioma: Idioma }) {
  const anio = new Date().getFullYear();

  return (
    <footer className="relative isolate overflow-hidden border-t border-line bg-surface">
      <div className="mx-auto max-w-[1280px] px-6 pb-10 pt-20 md:px-12 md:pt-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.3fr_repeat(4,1fr)] lg:gap-8">
          <div className="lg:pr-8">
            <Link
              href={idioma === "es" ? "/" : "/en"}
              className="-ml-2 inline-flex h-11 min-w-11 items-center justify-center px-2 text-ink transition-colors duration-base ease-ps hover:text-brand"
              aria-label="JV Agencia"
            >
              <Logo className="h-8 w-auto" />
            </Link>

            <p className="mt-6 max-w-[32ch] text-pretty text-sm leading-relaxed text-ink-soft">
              {PIE.descripcion[idioma]}
            </p>

            <div className="mt-8 flex flex-col gap-1">
              <a
                href={`mailto:${BUSINESS.email}`}
                className="jv-enlace inline-flex min-h-11 items-center self-start text-sm text-ink"
              >
                {BUSINESS.email}
              </a>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="jv-enlace inline-flex min-h-11 items-center self-start text-sm text-ink"
              >
                {BUSINESS.whatsappDisplay}
              </a>
              <p className="pt-2 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-ink-muted">
                {PIE.base[idioma]}
              </p>
            </div>
          </div>

          {COLUMNAS.map((col) => (
            <nav key={col.titulo.es} aria-label={col.titulo[idioma]}>
              <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-ink-muted">
                {col.titulo[idioma]}
              </h2>
              <ul className="mt-4 flex flex-col">
                {col.enlaces.map((e) => (
                  <li key={e.href.es}>
                    <Link
                      href={e.href[idioma]}
                      {...(e.externo
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="group flex min-h-11 items-center gap-1 text-sm text-ink-soft transition-colors duration-base ease-ps hover:text-brand"
                    >
                      {e.texto[idioma]}
                      {e.externo && (
                        <ArrowUpRight
                          aria-hidden
                          strokeWidth={2}
                          className="h-3 w-3 opacity-0 transition-opacity duration-base ease-ps group-hover:opacity-100"
                        />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ink-soft">
            © {anio} JV Agencia. {PIE.derechos[idioma]} · {PIE.hecho[idioma]}
          </p>

          <ul className="flex items-center gap-1">
            {REDES.map(({ Icono, url, nombre }) => (
              <li key={nombre}>
                <a
                  href={url as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="jv-icono !mr-0"
                  aria-label={nombre}
                >
                  <Icono aria-hidden strokeWidth={2} className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* La marca de agua.
          `whitespace-nowrap` es obligatorio: a 20vw el nombre no cabía en 1440
          y se partía en «JV AGE / NCIA», que es peor que no ponerla. A 14vw
          entra en una línea a cualquier ancho.
          `leading-[0.75]` y el desplazamiento de abajo apoyan las letras en el
          borde inferior en vez de dejar flotando el hueco de la interlínea,
          que es lo que delata una marca de agua puesta sin mirar. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-[0.14em] -z-10 select-none whitespace-nowrap text-center font-display text-[14vw] font-semibold leading-[0.75] tracking-[-0.04em] text-ink opacity-[0.04]"
      >
        JV AGENCIA
      </span>
    </footer>
  );
}

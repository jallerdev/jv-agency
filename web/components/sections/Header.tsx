"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";

import { CABECERA, NAV, type EntradaNav } from "@/content/layout/header";
import type { Idioma } from "@/content/types";
import { enlaceReal, rutaEnOtroIdioma } from "@/lib/rutas";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";

/**
 * LA CABECERA
 * ──────────────────────────────────────────────────────────────────────────
 * Tres piezas que suelen hacerse mal y aquí se hacen a mano:
 *
 * 1. EL CAMBIO DE ESTADO CON HISTÉRESIS. Se vuelve sólida pasados 48 px y solo
 *    vuelve a transparente por debajo de 16 px. Con un único umbral, moverse
 *    despacio cerca del borde hace parpadear la barra en cada dirección.
 *
 * 2. EL MEGA-MENÚ NO ES SOLO HOVER. Se abre al pasar por encima, sí, pero el
 *    disparador es un <button> con `aria-expanded`: se abre con Enter, se
 *    cierra con Escape y se cierra al salir el foco del bloque. Un panel que
 *    solo existe en hover no existe para quien navega con teclado, ni en una
 *    tableta, que no tiene puntero que «pase por encima».
 *
 * 3. EL CIERRE CON RETARDO. Al salir del disparador hay 120 ms antes de
 *    cerrar. Sin eso, el hueco de 8 px entre el botón y el panel cierra el
 *    menú justo cuando el ratón baja hacia él, que es el fallo clásico.
 *
 * El cajón móvil es un diálogo de verdad: foco atrapado, Escape, scroll del
 * cuerpo bloqueado y foco devuelto al botón que lo abrió.
 */

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
const PANEL_ID = "menu-movil";
const RETARDO_CIERRE = 120;

function Mega({
  entrada,
  idioma,
  abierto,
  onAbrir,
  onCerrar,
}: {
  entrada: EntradaNav;
  idioma: Idioma;
  abierto: boolean;
  onAbrir: () => void;
  onCerrar: () => void;
}) {
  const bloque = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={bloque}
      className="relative"
      onMouseEnter={onAbrir}
      onMouseLeave={onCerrar}
      onFocus={onAbrir}
      onBlur={(e) => {
        if (!bloque.current?.contains(e.relatedTarget as Node)) onCerrar();
      }}
    >
      <button
        type="button"
        aria-expanded={abierto}
        onClick={() => (abierto ? onCerrar() : onAbrir())}
        className="jv-navlink flex items-center gap-1.5 py-2"
        data-activo={abierto || undefined}
      >
        {entrada.texto[idioma]}
        <ChevronDown
          aria-hidden
          strokeWidth={2}
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-base ease-ps",
            abierto && "rotate-180"
          )}
        />
      </button>

      {/* El panel se monta siempre y se oculta con `invisible`, no con un
          condicional: así el navegador no rehace el layout cada vez que se
          abre, y la transición tiene de dónde salir. */}
      <div
        className={cn(
          "absolute left-1/2 top-full z-50 w-[min(46rem,90vw)] -translate-x-1/2 pt-3 transition-[opacity,transform] duration-base ease-ps",
          abierto
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-1 opacity-0"
        )}
        // El panel cerrado no debe ser una parada de tabulador.
        inert={!abierto}
      >
        <div className="jv-card grid grid-cols-2 gap-1 bg-raised p-3">
          {entrada.hijos?.map((h) => (
            <Link
              key={h.href.es}
              href={enlaceReal(h.href[idioma])}
              onClick={onCerrar}
              className="group rounded-[var(--radius-md)] p-4 transition-colors duration-base ease-ps hover:bg-surface"
            >
              <span className="flex items-center gap-1.5 font-semibold text-ink transition-colors duration-base ease-ps group-hover:text-brand">
                {h.texto[idioma]}
                <ArrowUpRight
                  aria-hidden
                  strokeWidth={2}
                  className="h-3.5 w-3.5 opacity-0 transition-opacity duration-base ease-ps group-hover:opacity-100"
                />
              </span>
              {h.descripcion && (
                <span className="mt-1 block text-sm leading-snug text-ink-muted">
                  {h.descripcion[idioma]}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Header({ idioma }: { idioma: Idioma }) {
  const ruta = usePathname();
  const [solida, setSolida] = useState(false);
  const [mega, setMega] = useState<string | null>(null);
  const [cajon, setCajon] = useState(false);

  const temporizador = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panel = useRef<HTMLDivElement>(null);
  const disparador = useRef<HTMLButtonElement>(null);

  const otroIdioma = rutaEnOtroIdioma(ruta ?? "/");

  /* --- Estado por scroll, con histéresis y un solo rAF ------------------- */
  useEffect(() => {
    let cuadro = 0;
    const leer = () => {
      cuadro = 0;
      setSolida((antes) => (antes ? window.scrollY > 16 : window.scrollY > 48));
    };
    const alScroll = () => {
      if (!cuadro) cuadro = requestAnimationFrame(leer);
    };
    leer();
    window.addEventListener("scroll", alScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", alScroll);
      if (cuadro) cancelAnimationFrame(cuadro);
    };
  }, []);

  const abrirMega = useCallback((clave: string) => {
    if (temporizador.current) clearTimeout(temporizador.current);
    setMega(clave);
  }, []);

  const cerrarMega = useCallback(() => {
    if (temporizador.current) clearTimeout(temporizador.current);
    temporizador.current = setTimeout(() => setMega(null), RETARDO_CIERRE);
  }, []);

  /* --- El cajón: foco atrapado, Escape y cuerpo bloqueado ---------------- */
  useEffect(() => {
    if (!cajon) return;

    const previo = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const alTeclado = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setCajon(false);
        return;
      }
      if (e.key !== "Tab" || !panel.current) return;
      const paradas = panel.current.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!paradas.length) return;
      const primera = paradas[0];
      const ultima = paradas[paradas.length - 1];
      if (e.shiftKey && document.activeElement === primera) {
        e.preventDefault();
        ultima.focus();
      } else if (!e.shiftKey && document.activeElement === ultima) {
        e.preventDefault();
        primera.focus();
      }
    };

    document.addEventListener("keydown", alTeclado);
    panel.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    return () => {
      document.removeEventListener("keydown", alTeclado);
      document.body.style.overflow = previo;
      disparador.current?.focus();
    };
  }, [cajon]);

  /* Cambiar de página cierra lo que hubiera abierto. */
  useEffect(() => {
    setCajon(false);
    setMega(null);
  }, [ruta]);

  /* Escape cierra el mega-menú aunque el foco esté en el panel. */
  useEffect(() => {
    if (!mega) return;
    const alEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMega(null);
    };
    document.addEventListener("keydown", alEscape);
    return () => document.removeEventListener("keydown", alEscape);
  }, [mega]);

  return (
    <>
      <a href="#contenido" className="skip-link">
        {CABECERA.saltar[idioma]}
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-slow ease-ps",
          solida
            ? "border-b border-line bg-negro/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <div className="mx-auto flex h-[var(--header-h)] max-w-[1280px] items-center gap-8 px-6 md:px-12">
          <Link
            href={idioma === "es" ? "/" : "/en"}
            /* `-mx-2 px-2` lleva el área táctil a 44 de ancho sin mover el logotipo:
               el relleno crece hacia fuera y el margen negativo lo devuelve. */
            className="-mx-2 flex h-11 min-w-11 shrink-0 items-center justify-center px-2 text-ink transition-colors duration-base ease-ps hover:text-brand"
            aria-label="JV Agencia"
          >
            <Logo className="h-7 w-auto" />
          </Link>

          <nav aria-label="Principal" className="ml-auto hidden items-center gap-7 lg:flex">
            {NAV.map((entrada) =>
              entrada.hijos ? (
                <Mega
                  key={entrada.href.es}
                  entrada={entrada}
                  idioma={idioma}
                  abierto={mega === entrada.href.es}
                  onAbrir={() => abrirMega(entrada.href.es)}
                  onCerrar={cerrarMega}
                />
              ) : (
                <Link
                  key={entrada.href.es}
                  href={enlaceReal(entrada.href[idioma])}
                  className="jv-navlink py-2"
                  data-activo={ruta === entrada.href[idioma] || undefined}
                >
                  {entrada.texto[idioma]}
                </Link>
              )
            )}
          </nav>

          <div className="ml-auto flex items-center gap-3 lg:ml-0">
            {/* Sin equivalente en el otro idioma no se pinta nada: mandar de
                una página de ciudad a la portada en inglés es un salto que
                nadie pidió. */}
            {otroIdioma && (
              <Link
                href={otroIdioma}
                hrefLang={idioma === "es" ? "en" : "es"}
                aria-label={CABECERA.idioma[idioma]}
                className="hidden items-center gap-1 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-ink-muted transition-colors duration-base ease-ps hover:text-ink sm:flex"
              >
                <span className={idioma === "es" ? "text-ink" : undefined}>ES</span>
                <span aria-hidden className="text-line">/</span>
                <span className={idioma === "en" ? "text-ink" : undefined}>EN</span>
              </Link>
            )}

            <Link
              href={enlaceReal(CABECERA.cta.href[idioma])}
              className="jv-boton hidden sm:inline-flex"
            >
              {CABECERA.cta.texto[idioma]}
            </Link>

            <button
              ref={disparador}
              type="button"
              onClick={() => setCajon(true)}
              aria-expanded={cajon}
              aria-controls={PANEL_ID}
              className="jv-icono lg:hidden"
            >
              <Menu aria-hidden strokeWidth={2} className="h-5 w-5" />
              <span className="sr-only">{CABECERA.menu[idioma]}</span>
            </button>
          </div>
        </div>
      </header>

      {/* --- El cajón, a pantalla completa --------------------------------- */}
      {cajon && (
        <div
          id={PANEL_ID}
          ref={panel}
          role="dialog"
          aria-modal="true"
          aria-label={CABECERA.menu[idioma]}
          className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-negro lg:hidden"
        >
          <div className="flex h-[var(--header-h)] shrink-0 items-center justify-between px-6">
            <Logo className="h-7 w-auto text-ink" />
            <button type="button" onClick={() => setCajon(false)} className="jv-icono">
              <X aria-hidden strokeWidth={2} className="h-5 w-5" />
              <span className="sr-only">{CABECERA.cerrar[idioma]}</span>
            </button>
          </div>

          <nav aria-label="Principal" className="flex flex-col px-6 pb-12 pt-4">
            {NAV.map((entrada) => (
              <div key={entrada.href.es} className="border-b border-line">
                <Link
                  href={enlaceReal(entrada.href[idioma])}
                  className="flex min-h-[3.5rem] items-center font-display text-2xl font-semibold tracking-[-0.02em] text-ink"
                >
                  {entrada.texto[idioma]}
                </Link>
                {/* En móvil los hijos van desplegados, no en un acordeón: son
                    seis enlaces cortos y esconderlos tras otro toque solo
                    añade un paso a quien ya abrió el menú. */}
                {entrada.hijos && (
                  <ul className="-mt-1 flex flex-col pb-4">
                    {entrada.hijos.map((h) => (
                      <li key={h.href.es}>
                        <Link
                          href={enlaceReal(h.href[idioma])}
                          className="flex min-h-11 items-center text-ink-soft"
                        >
                          {h.texto[idioma]}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            <Link href={enlaceReal(CABECERA.cta.href[idioma])} className="jv-boton mt-8 justify-center">
              {CABECERA.cta.texto[idioma]}
            </Link>

            {otroIdioma && (
              <Link
                href={otroIdioma}
                hrefLang={idioma === "es" ? "en" : "es"}
                className="mt-6 flex min-h-11 items-center justify-center font-mono text-xs uppercase tracking-[0.12em] text-ink-muted"
              >
                {CABECERA.idioma[idioma]}
              </Link>
            )}
          </nav>
        </div>
      )}
    </>
  );
}

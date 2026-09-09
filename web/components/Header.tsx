"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { MetaTechProvider } from "@/components/MetaTechProvider";
import { cn } from "@/lib/utils";

/* ==========================================================================
   HEADER
   Dos trabajos: que el cambio de estado con el scroll se sienta preciso, y
   que en móvil exista navegación —hasta ahora, por debajo de 768px el
   encabezado contenía únicamente el logotipo: ni menú, ni hamburguesa, ni
   CTA; los seis destinos del sitio no tenían ninguna vía de acceso salvo
   bajar 18.000 px de portada.

   PRECISIÓN DEL CAMBIO DE ESTADO
   - Histéresis: se vuelve sólido pasados 48px y solo vuelve a transparente
     por debajo de 16px. Antes el umbral era `scrollY > 24` a secas y
     scrolleando despacio cerca del borde el header parpadeaba con medio
     segundo de fade en cada dirección.
   - `transition-chrome duration-slow ease-state` en vez de `transition-all
     duration-500`: 500ms es el doble de lo que pide un cambio de estado
     —el header llegaba tarde al scroll— y "all" interpolaba propiedades de
     layout en un elemento fijo con backdrop-filter.
   - El cambio se NOTA: además del fondo, el header se comprime (py-4 → py-2.5)
     y gana sombra. Antes medía 73px en los dos estados y solo se teñía.
   - Hairline de progreso de lectura al pie de la barra: en una portada de
     11.700px es información real, y es lo que hace que la barra se sienta
     un instrumento y no un adorno.
   - Enlace activo: el subrayado de acento marca en qué sección estás. Antes
     ese subrayado solo existía en hover, así que quien navega con teclado no
     veía la afordancia de marca ni una vez.

   El panel móvil es un diálogo real: aria-expanded/aria-controls, foco
   atrapado, cierre con Escape, scroll del cuerpo bloqueado y foco devuelto
   al disparador.
   ========================================================================== */

const NAV = [
  { label: "Servicios", href: "/#servicios" },
  { label: "Precios", href: "/precios" },
  { label: "Trabajo", href: "/#trabajo" },
  { label: "Proceso", href: "/#proceso" },
  { label: "Sobre mí", href: "/sobre-nosotros" },
  { label: "Preguntas", href: "/#faq" },
];

const SECTION_IDS = NAV.map((item) => item.href.split("#")[1]).filter(Boolean) as string[];

const PANEL_ID = "menu-principal";
const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  /* --- Estado por scroll: un solo rAF para las tres lecturas -------------- */
  useEffect(() => {
    let frame = 0;

    const read = () => {
      frame = 0;
      const y = window.scrollY;

      /* Histéresis: sube a sólido en 48, baja a transparente en 16. */
      setScrolled((prev) => (prev ? y > 16 : y > 48));

      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 8 ? Math.min(1, Math.max(0, y / max)) : 0);

      /* Sección activa: la última cuyo borde superior ya pasó la línea del
         header. Se calcula por posición y no por orden del array, porque el
         orden del menú no es el del documento. */
      let bestId: string | null = null;
      let bestTop = -Infinity;
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= 140 && top > bestTop) {
          bestTop = top;
          bestId = id;
        }
      }
      setActiveId(bestId);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  /* --- Cerrar el panel al cambiar de página ------------------------------ */
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  /* --- Panel abierto: scroll bloqueado, foco atrapado, Escape ------------ */
  useEffect(() => {
    if (!open) return;

    const root = document.documentElement;
    const previousBody = document.body.style.overflow;
    const previousRoot = root.style.overflow;
    document.body.style.overflow = "hidden";
    root.style.overflow = "hidden";

    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab" || !panel) return;

      const nodes = [
        toggleRef.current,
        ...Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)),
      ].filter((node): node is HTMLElement => Boolean(node));
      if (nodes.length === 0) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const index = nodes.indexOf(document.activeElement as HTMLElement);

      if (index === -1) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && index === 0) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && index === nodes.length - 1) {
        event.preventDefault();
        first.focus();
      }
    };

    /* Si la ventana crece hasta el menú de escritorio, el panel sobra. */
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
      document.body.style.overflow = previousBody;
      root.style.overflow = previousRoot;
    };
  }, [open, close]);

  /* Salto al contenido. El <main> vive en cada página y no lleva id, así que
     el destino se resuelve en el momento en vez de exigir un ancla que no
     existe en ninguna de las diez plantillas. */
  const skipToContent = useCallback(() => {
    const main = document.querySelector("main");
    if (!main) return;
    main.setAttribute("tabindex", "-1");
    main.focus({ preventScroll: true });
    main.scrollIntoView({ block: "start" });
  }, []);

  const solid = scrolled || open;
  const isHome = pathname === "/";
  /* Los destinos con ruta propia (/precios, /sobre-nosotros) se marcan por
     pathname; los de ancla, por la sección visible. */
  const rutaActual = NAV.find((item) => item.href === pathname)?.href ?? null;
  const activeHref = open
    ? null
    : (rutaActual ?? (isHome && activeId ? `/#${activeId}` : null));


  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[60] transition-chrome duration-slow ease-state",
          solid
            ? "border-b border-line/70 bg-background/90 shadow-soft backdrop-blur-lg"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <button type="button" className="skip-link" onClick={skipToContent}>
          Saltar al contenido
        </button>

        <div
          className={cn(
            "relative z-20 mx-auto flex max-w-7xl items-center justify-between px-5 transition-chrome duration-slow ease-state md:px-8",
            solid ? "py-2 sm:py-2.5" : "py-3 sm:py-4"
          )}
        >
          <a
            href="/"
            className="group flex items-center gap-2.5 rounded-lg animate-fade-in-down"
            aria-label="JV Agencia — inicio"
          >
            <Logo
              className={cn(
                "w-auto transition-[height] duration-slow ease-state",
                solid ? "h-8" : "h-9"
              )}
            />
            <span className="font-display text-xl tracking-tight text-ink">Agencia</span>
          </a>

          {/* Entre 768 y 1023 el menu cabe justo: seis destinos, el logo y el boton
              en una sola fila. Con gap-5 y sin nowrap, «Sobre mi» se partia en dos
              lineas de 768 a 810. gap-4 da los 24 px que faltaban y whitespace-nowrap
              impide que cualquier etiqueta de dos palabras se parta. De 1024 en
              adelante manda lg:gap-9: el escritorio queda exactamente igual. */}
          <nav aria-label="Principal" className="hidden items-center gap-4 md:flex lg:gap-9">
            {NAV.map((item) => {
              const active = activeHref === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "group relative whitespace-nowrap py-1 font-body text-sm font-medium transition-surface duration-quick ease-state",
                    active ? "text-ink" : "text-ink-soft hover:text-ink focus-visible:text-ink"
                  )}
                >
                  {item.label}
                  {/* El subrayado responde a hover Y a foco de teclado. */}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute -bottom-0.5 left-0 h-px w-full origin-left bg-accent transition-transform duration-base ease-state group-hover:scale-x-100 group-focus-visible:scale-x-100",
                      active ? "scale-x-100" : "scale-x-0"
                    )}
                  />
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2.5">
            <Button size="sm" variant="primary" className="hidden sm:inline-flex" asChild>
              <a href="/#contacto">Agenda una llamada</a>
            </Button>

            {/* Disparador del menú móvil: 44×44 reales, y las dos barras se
                convierten en aspa sin cambiar de elemento. */}
            <button
              ref={toggleRef}
              type="button"
              aria-expanded={open}
              aria-controls={PANEL_ID}
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              onClick={() => setOpen((value) => !value)}
              className="tap-target -mr-1.5 inline-flex items-center justify-center rounded-full border border-line bg-surface/70 text-ink transition-surface duration-quick ease-state hover:border-primary/40 hover:bg-surface active:scale-[0.96] md:hidden"
            >
              <span aria-hidden className="relative block h-3 w-[1.125rem]">
                <span
                  className={cn(
                    "absolute left-0 top-0 h-px w-full bg-ink transition-transform duration-slow ease-spring",
                    open && "translate-y-[5.5px] rotate-45"
                  )}
                />
                <span
                  className={cn(
                    "absolute bottom-0 left-0 h-px w-full bg-ink transition-transform duration-slow ease-spring",
                    open && "-translate-y-[5.5px] -rotate-45"
                  )}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Progreso de lectura: aparece con el estado sólido y se retira con él. */}
        <span
          aria-hidden
          className={cn(
            "absolute inset-x-0 bottom-0 z-20 h-px origin-left bg-gradient-to-r from-primary-dark via-accent to-secondary transition-opacity duration-slow ease-state",
            solid && !open ? "opacity-100" : "opacity-0"
          )}
          style={{ transform: `scaleX(${progress})` }}
        />
      </header>

      {/* El panel vive FUERA del <header> a propósito: el header lleva
          backdrop-filter cuando está sólido, y un elemento con backdrop-filter
          se convierte en el bloque contenedor de sus descendientes `fixed`
          —el panel quedaba del alto de la barra en vez de cubrir la pantalla. */}
      {open && (
        <div
          id={PANEL_ID}
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
          className="fixed inset-0 z-[55] flex flex-col overflow-y-auto overscroll-contain bg-background/95 px-5 pb-10 backdrop-blur-xl animate-fade-in md:hidden"
          style={{
            paddingTop: "calc(var(--header-h) + 1.25rem)",
            animationDuration: "var(--duration-slow)",
          }}
        >
          <nav aria-label="Principal (móvil)">
            <ul className="border-y border-line/70">
              {NAV.map((item, index) => (
                <li
                  key={item.href}
                  className="animate-fade-in border-b border-line/70 last:border-b-0"
                  style={{
                    animationDuration: "var(--duration-slow)",
                    animationDelay: `${60 + index * 45}ms`,
                  }}
                >
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={item.href === pathname ? "page" : undefined}
                    className="group flex items-center gap-4 py-4 transition-surface duration-quick ease-state"
                  >
                    <span className="font-mono text-[11px] tabular-nums text-accent-ink">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-[1.65rem] leading-none text-ink transition-transform duration-base ease-state group-hover:translate-x-0.5">
                      {item.label}
                    </span>
                    <ArrowUpRight
                      aria-hidden
                      strokeWidth={1.5}
                      className="ml-auto h-5 w-5 text-primary/50 transition-transform duration-base ease-state group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div
            className="mt-7 animate-fade-in"
            style={{ animationDuration: "var(--duration-slow)", animationDelay: "300ms" }}
          >
            <Button size="lg" variant="primary" className="w-full" asChild>
              <a href="/#contacto" onClick={() => setOpen(false)}>
                Agenda una llamada
                <ArrowRight className="h-5 w-5" strokeWidth={1.75} />
              </a>
            </Button>
          </div>

          {/* La credencial también aquí: es lo más fuerte que tengo y el menú
              es una de las pocas pantallas que se ve entera de un vistazo. */}
          <div
            className="mt-auto animate-fade-in pt-10"
            style={{ animationDuration: "var(--duration-slow)", animationDelay: "360ms" }}
          >
            <MetaTechProvider variant="compact" className="w-full justify-center" />
          </div>
        </div>
      )}
    </>
  );
}

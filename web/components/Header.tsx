"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Servicios", href: "/#servicios" },
  { label: "Trabajo", href: "/#trabajo" },
  { label: "Proceso", href: "/#proceso" },
  { label: "Nosotros", href: "/sobre-nosotros" },
  { label: "Cotizador", href: "/cotizador" },
  { label: "Preguntas", href: "/#faq" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-line/70 bg-background/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <a href="/" className="flex items-center gap-2.5 animate-fade-in-down">
          <Logo className="h-9 w-auto text-black" />
          <span className="font-display text-xl tracking-tight text-ink">Agencia</span>
        </a>

        <nav className="hidden items-center gap-9 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative font-body text-sm font-medium text-ink-soft transition-colors hover:text-ink"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <Button size="sm" variant="solid" className="hidden sm:inline-flex" asChild>
          <a href="/#contacto">Agenda una llamada</a>
        </Button>
      </div>
    </header>
  );
}

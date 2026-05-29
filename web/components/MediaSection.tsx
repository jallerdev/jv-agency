import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const BLOOMROSE_URL = "https://www.bloomroseaccesorios.com";

const FEATURES = [
  "Diseño UI a medida",
  "Pagos en línea (PSE, Nequi, tarjeta)",
  "Cotizacion de Envíos",
  "Catálogo con control de stock",
  "Cuentas y seguimiento de pedidos",
];

export function MediaSection() {
  return (
    <section id="trabajo" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Badge>Caso de estudio</Badge>
          <h2 className="mt-6 font-display text-4xl leading-tight text-ink sm:text-5xl">
            Marcas que pasan de
            <span className="text-metal"> correctas a memorables.</span>
          </h2>
          <p className="mt-5 font-body text-lg text-ink-soft">
            No entregamos plantillas. Diseñamos y construimos a medida —y se nota por fuera y por dentro.
          </p>
        </Reveal>

        <Reveal delay={120} className="relative mt-16">
          {/* ambient glow */}
          <div className="pointer-events-none absolute inset-x-10 top-10 h-72 rounded-full bg-accent/15 blur-3xl" />

          {/* Browser frame with the real Bloomrose storefront */}
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-line bg-surface shadow-lift">
            <div className="flex items-center gap-2 border-b border-line bg-background/60 px-5 py-3">
              <span className="h-3 w-3 rounded-full bg-danger/70" />
              <span className="h-3 w-3 rounded-full bg-warning/70" />
              <span className="h-3 w-3 rounded-full bg-success/70" />
              <div className="ml-4 flex-1">
                <div className="mx-auto w-fit rounded-full border border-line bg-surface px-4 py-1 font-mono text-xs text-ink-soft">
                  www.bloomroseaccesorios.com
                </div>
              </div>
            </div>
            <a href={BLOOMROSE_URL} target="_blank" rel="noopener noreferrer" className="block">
              <Image
                src="/work/bloomrose.webp"
                alt="Bloomrose — tienda de bisutería y accesorios diseñada y construida por JV Agencia"
                width={2000}
                height={1160}
                className="h-auto w-full"
                sizes="(min-width:1024px) 64rem, 100vw"
              />
            </a>
          </div>

          {/* Project meta */}
          <div className="mx-auto mt-8 flex max-w-5xl flex-col gap-6 rounded-2xl border border-line bg-surface/80 p-6 backdrop-blur md:flex-row md:items-center md:justify-between md:p-8">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="font-display text-2xl text-ink">Bloomrose</h3>
                <span className="rounded-full bg-accent/15 px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-primary-dark">
                  E-commerce
                </span>
              </div>
              <p className="mt-2 max-w-xl font-body text-sm leading-relaxed text-ink-soft">
                Tienda online de bisutería y accesorios para el mercado colombiano. Diseño y
                desarrollo de punta a punta: catálogo, carrito, cuentas, pagos y envíos.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {FEATURES.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-line bg-background/50 px-3 py-1 font-body text-xs text-ink-soft"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <Button asChild variant="outline" size="md" className="shrink-0">
              <a href={BLOOMROSE_URL} target="_blank" rel="noopener noreferrer">
                Visitar sitio <ArrowUpRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

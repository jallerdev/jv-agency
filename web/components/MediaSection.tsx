import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, TrendingUp } from "lucide-react";

const RESULTS = [
  { metric: "+86%", label: "conversión del sitio" },
  { metric: "1.2s", label: "tiempo de carga" },
  { metric: "99.9%", label: "uptime" },
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

          {/* Browser mockup (designed, not a stock photo) */}
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-line bg-surface shadow-lift">
            <div className="flex items-center gap-2 border-b border-line bg-background/60 px-5 py-3">
              <span className="h-3 w-3 rounded-full bg-danger/70" />
              <span className="h-3 w-3 rounded-full bg-warning/70" />
              <span className="h-3 w-3 rounded-full bg-success/70" />
              <div className="ml-4 flex-1">
                <div className="mx-auto w-fit rounded-full border border-line bg-surface px-4 py-1 font-mono text-xs text-ink-soft">
                  cliente.jvagency.com
                </div>
              </div>
            </div>

            {/* faux site hero */}
            <div className="grid gap-0 md:grid-cols-2">
              <div className="bg-gradient-to-br from-primary-dark via-primary to-accent p-10 text-surface md:p-14">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-surface/70">
                  Diseño + desarrollo · e-commerce
                </p>
                <p className="mt-6 font-display text-3xl leading-tight md:text-4xl">
                  Una tienda que por fin se ve tan buena como sus productos.
                </p>
                <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-surface/15 px-5 py-2 font-body text-sm backdrop-blur">
                  Comprar ahora <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 bg-surface p-6 md:p-8">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-xl border border-line bg-gradient-to-br from-background to-secondary/25"
                  >
                    <div className="flex h-full flex-col justify-end p-3">
                      <div className="h-2 w-3/4 rounded-full bg-primary/30" />
                      <div className="mt-2 h-2 w-1/2 rounded-full bg-primary/20" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* floating results card */}
          <div className="mx-auto mt-8 max-w-5xl">
            <div className="grid gap-4 rounded-2xl border border-line bg-surface/80 p-6 backdrop-blur sm:grid-cols-3 md:absolute md:-bottom-10 md:right-8 md:max-w-md md:grid-cols-1 md:gap-3">
              <div className="flex items-center gap-2 sm:col-span-3 md:col-span-1">
                <TrendingUp className="h-5 w-5 text-success" />
                <span className="font-body text-sm font-semibold text-ink">
                  Resultados a 6 meses
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4 sm:col-span-3 md:col-span-1">
                {RESULTS.map((r) => (
                  <div key={r.label}>
                    <p className="font-mono text-2xl text-primary-dark">{r.metric}</p>
                    <p className="font-body text-xs text-ink-soft">{r.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

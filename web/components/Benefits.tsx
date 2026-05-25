import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { Code2, Palette, Boxes, LifeBuoy, ArrowUpRight } from "lucide-react";

const SERVICES = [
  {
    icon: Code2,
    title: "Desarrollo web",
    desc: "Sitios, landing pages, e-commerce y web corporativa. Rápidos, sólidos y pensados para crecer contigo.",
    span: "lg:col-span-3",
    featured: true,
  },
  {
    icon: Boxes,
    title: "Software a medida",
    desc: "Apps web, sistemas internos y plataformas hechas a tu medida, no forzadas a una plantilla.",
    span: "lg:col-span-2",
  },
  {
    icon: Palette,
    title: "Diseño web / UI",
    desc: "Interfaz y experiencia que se ven de marca grande. Diseñamos pensando en cómo se va a construir.",
    span: "lg:col-span-2",
  },
  {
    icon: LifeBuoy,
    title: "Mantenimiento y soporte",
    desc: "No desaparecemos al entregar. Mejoras continuas, hosting y soporte para que todo siga funcionando.",
    span: "lg:col-span-3",
  },
];

export function Benefits() {
  return (
    <section id="servicios" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <Reveal>
            <Badge>Lo que hacemos</Badge>
            <h2 className="mt-6 font-display text-4xl leading-tight text-ink sm:text-5xl">
              Diseño y código.
              <br />
              <span className="text-metal">El mismo equipo.</span>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="font-body text-lg leading-relaxed text-ink-soft lg:pb-2">
              No necesitas un diseñador por un lado y un programador por otro. Necesitas un equipo
              donde las dos cosas se hablan desde el primer día. Eso somos.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-5">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.title} delay={i * 90} className={s.span}>
                <article
                  className={[
                    "group relative h-full overflow-hidden rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift",
                    s.featured
                      ? "border-primary/20 bg-gradient-to-br from-surface to-secondary/15"
                      : "border-line bg-surface/70",
                  ].join(" ")}
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-surface shadow-soft transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-7 w-7" />
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-ink-soft/40 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent" />
                  </div>
                  <h3 className="mt-6 font-display text-2xl text-ink">{s.title}</h3>
                  <p className="mt-3 font-body leading-relaxed text-ink-soft">{s.desc}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

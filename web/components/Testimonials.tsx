import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { Quote, Star } from "lucide-react";

// NOTE: testimonios de ejemplo para marca nueva. Sustituir por reseñas reales antes de publicar.
const TESTIMONIALS = [
  {
    quote:
      "Llegamos con una web hecha en una plantilla y salimos con un sitio que por fin nos representa. Nos abrió puertas que antes ni contestaban.",
    name: "Mariana Restrepo",
    role: "Fundadora, Brota Café",
    initials: "MR",
  },
  {
    quote:
      "Por fin un equipo que no me hace de niñera técnica. Entienden el negocio y proponen, no solo ejecutan.",
    name: "Diego Salinas",
    role: "Director, Salinas Legal",
    initials: "DS",
  },
  {
    quote:
      "Pasamos de vender por DM a una tienda que factura sola. El diseño se ve de marca grande y la web vuela.",
    name: "Valentina Ortiz",
    role: "CEO, Luma Skincare",
    initials: "VO",
  },
  {
    quote:
      "Contraté diseño y desarrollo en una sola conversación. Ahorré meses de coordinar a un diseñador con un programador.",
    name: "Andrés Cuéllar",
    role: "Socio, Andina Logística",
    initials: "AC",
  },
];

export function Testimonials() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="max-w-2xl">
          <Badge>Lo que dicen</Badge>
          <h2 className="mt-6 font-display text-4xl leading-tight text-ink sm:text-5xl">
            La diferencia entre verse bien
            <span className="text-metal"> y verse en serio.</span>
          </h2>
        </Reveal>

        <div className="mt-14 columns-1 gap-5 md:columns-2 [&>*]:mb-5">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={(i % 2) * 100} className="break-inside-avoid">
              <figure className="group relative rounded-2xl border border-line bg-surface/80 p-8 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                <Quote className="h-9 w-9 text-accent/30" />
                <blockquote className="mt-4 font-display text-xl leading-relaxed text-ink">
                  “{t.quote}”
                </blockquote>
                <div className="mt-3 flex text-accent">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <figcaption className="mt-6 flex items-center gap-4 border-t border-line pt-6">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-primary to-accent font-body text-sm font-bold text-surface ring-2 ring-surface">
                    {t.initials}
                  </span>
                  <span>
                    <span className="block font-body font-semibold text-ink">{t.name}</span>
                    <span className="block font-body text-sm text-ink-soft">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

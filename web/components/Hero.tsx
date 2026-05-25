import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const STATS = [
  { value: "+10", label: "proyectos entregados" },
  { value: "4.9/5", label: "satisfacción de clientes" },
  { value: "+1 año", label: "construyendo marcas" },
];

const AVATARS = ["#C0763B", "#985C3E", "#B08968", "#6E4128"];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
      {/* decorative metallic orb */}
      <div className="pointer-events-none absolute -right-24 top-24 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-accent/30 via-secondary/20 to-transparent blur-3xl animate-float" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-gradient-to-tr from-primary/20 to-transparent blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <Badge className="animate-fade-in-down">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Estudio de diseño + código · LATAM
          </Badge>

          <h1 className="mt-7 font-display text-[2.9rem] font-light leading-[1.02] tracking-[-0.02em] text-ink sm:text-6xl lg:text-[4.6rem]">
            <span className="block animate-fade-in" style={{ animationDelay: "80ms" }}>
              Hacemos que
            </span>
            <span className="block animate-fade-in" style={{ animationDelay: "200ms" }}>
              te tomen{" "}
              <span className="text-metal text-metal-anim font-normal italic">en serio.</span>
            </span>
          </h1>

          <p
            className="mt-7 max-w-xl font-body text-lg leading-relaxed text-ink-soft animate-fade-in"
            style={{ animationDelay: "340ms" }}
          >
            Diseño y desarrollo en el mismo equipo. Tu web o tu software con el acabado de
            una marca grande por fuera y la solidez de un buen producto por dentro —sin
            presupuesto corporativo.
          </p>

          <div
            className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center animate-fade-in"
            style={{ animationDelay: "480ms" }}
          >
            <Button size="lg" variant="primary" asChild>
              <a href="#contacto">
                Agenda una llamada
                <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#trabajo">Ver nuestro trabajo</a>
            </Button>
          </div>

          {/* Social proof */}
          <div
            className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5 animate-fade-in"
            style={{ animationDelay: "620ms" }}
          >
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {AVATARS.map((c, i) => (
                  <span
                    key={i}
                    className="h-10 w-10 rounded-full border-2 border-surface ring-1 ring-line"
                    style={{ background: `linear-gradient(135deg, ${c}, ${c}cc)` }}
                  />
                ))}
              </div>
              <div>
                <div className="flex text-accent">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="font-body text-sm text-ink-soft">+90 negocios confían en nosotros</p>
              </div>
            </div>
          </div>

          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-line pt-8">
            {STATS.map((s, i) => (
              <div key={s.label} className="animate-fade-in" style={{ animationDelay: `${720 + i * 90}ms` }}>
                <dt className="font-mono text-2xl text-primary-dark sm:text-3xl">{s.value}</dt>
                <dd className="mt-1 font-body text-xs leading-snug text-ink-soft">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Visual: framed logo / brand mark with metallic frame */}
        <div className="relative hidden lg:block">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md animate-fade-in" style={{ animationDelay: "300ms" }}>
            <div className="absolute inset-0 -rotate-3 rounded-[2rem] border border-line bg-surface/60 shadow-soft" />
            <div className="absolute inset-0 rotate-2 overflow-hidden rounded-[2rem] border border-line bg-surface shadow-lift">
              <Image
                src="/logo.webp"
                alt="Monograma J&V Agency"
                fill
                sizes="(min-width:1024px) 28rem, 100vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/20 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-5 -left-5 rounded-2xl border border-line bg-background/90 px-5 py-3 shadow-soft backdrop-blur">
              <p className="font-mono text-xs uppercase tracking-widest text-ink-soft">Diseño · Web · Software</p>
              <p className="font-display text-lg text-ink">Un solo equipo</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

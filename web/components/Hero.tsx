import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-36 pb-24 md:pt-48 md:pb-32">
      {/* decorative metallic orbs */}
      <div className="pointer-events-none absolute -right-24 top-24 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-accent/30 via-secondary/20 to-transparent blur-3xl animate-float" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-gradient-to-tr from-primary/20 to-transparent blur-3xl" />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-5 text-center md:px-8">
        <Badge className="animate-fade-in-down">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Estudio de diseño + código · LATAM
        </Badge>

        <h1 className="mt-8 font-display text-[2.9rem] font-light leading-[1.03] tracking-[-0.02em] text-ink sm:text-6xl lg:text-[5rem]">
          <span className="block animate-fade-in" style={{ animationDelay: "80ms" }}>
            Diseño de páginas web
          </span>
          <span className="block animate-fade-in" style={{ animationDelay: "200ms" }}>
            que hacen que{" "}
            <span className="text-metal text-metal-anim font-normal italic">te tomen en serio.</span>
          </span>
        </h1>

        <p
          className="mt-7 max-w-2xl font-body text-lg leading-relaxed text-ink-soft animate-fade-in"
          style={{ animationDelay: "340ms" }}
        >
          Diseño y desarrollo en el mismo equipo. Tu web o tu software con el acabado de una
          marca grande por fuera y la solidez de un buen producto por dentro —sin presupuesto
          corporativo.
        </p>

        <div
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center animate-fade-in"
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

        <a
          href="#contacto"
          className="group mt-8 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-2 font-body text-sm text-ink transition-colors hover:bg-accent/20 animate-fade-in"
          style={{ animationDelay: "600ms" }}
        >
          <Sparkles className="h-4 w-4 text-accent" />
          Cuéntanos tu proyecto —{" "}
          <strong className="font-semibold text-primary-dark">
            presupuesto en la primera llamada
          </strong>
        </a>
      </div>
    </section>
  );
}

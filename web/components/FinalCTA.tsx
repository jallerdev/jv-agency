import { Reveal } from "@/components/Reveal";
import { ScheduleCall } from "@/components/ScheduleCall";
import { Check } from "lucide-react";

const PERKS = [
  "Diagnóstico sin costo de 20 minutos",
  "Hablas directo con quien diseña y construye",
  "Sin compromiso, sin letra chica",
];

export function FinalCTA() {
  return (
    <section id="contacto" className="relative px-5 py-20 md:px-8 md:py-28">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-primary/30 bg-gradient-to-br from-primary-dark via-primary to-[#7a4a30] px-6 py-12 shadow-lift md:px-12 md:py-16">
        {/* metallic decorative layers */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-accent/30 blur-3xl animate-float" />
        <div className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-secondary/30 blur-3xl" />
        <div className="bg-grain pointer-events-none absolute inset-0 opacity-40" />

        <div className="relative grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal className="text-surface">
            <h2 className="font-display text-4xl leading-tight text-surface sm:text-5xl">
              Tu página web, a la altura
              <span className="block italic text-[#f0d9c4]">de tus ambiciones.</span>
            </h2>
            <p className="mt-6 max-w-md font-body text-lg text-surface/80">
              Agenda una llamada y cuéntanos qué necesitas. Te decimos con franqueza si podemos
              ayudarte —y cómo.
            </p>
            <ul className="mt-8 space-y-3">
              {PERKS.map((p) => (
                <li key={p} className="flex items-center gap-3 font-body text-surface/90">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-surface/15">
                    <Check className="h-3.5 w-3.5 text-[#f0d9c4]" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <ScheduleCall />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

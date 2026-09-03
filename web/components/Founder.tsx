import Link from "next/link";
import { ArrowUpRight, Linkedin, Github } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";

/**
 * Quién está detrás, en la portada.
 *
 * No es vanidad: para Google, la experiencia demostrable de una persona con
 * nombre y perfiles verificables (E-E-A-T) pesa en consultas competidas, y
 * desde diciembre de 2025 aplica a todas, no solo a las de salud o dinero.
 * Y para el cliente pesa más todavía: cuando contrata un estudio pequeño,
 * quiere saber a quién le está entregando su proyecto.
 *
 * Los datos salen de los mismos de /sobre-nosotros. Nada inventado.
 */
const FOUNDER = {
  name: "Luis Jaller",
  role: "Full Stack Developer · Fundador",
  linkedin: "https://www.linkedin.com/in/jallerdev",
  github: "https://github.com/jallerangel",
};

const STATS = [
  { value: "3+", label: "años construyendo producto" },
  { value: "11+", label: "proyectos en producción" },
  { value: "<24h", label: "tiempo de respuesta" },
];

export function Founder() {
  return (
    <section id="quien" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid items-center gap-10 rounded-[1.75rem] border border-line bg-surface/70 p-8 md:p-12 lg:grid-cols-[auto_1fr]">
          {/* Monograma. Cuando haya foto real, se reemplaza por <Image>. */}
          <Reveal>
            <span
              aria-hidden="true"
              className="grid h-24 w-24 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent font-display text-4xl text-surface shadow-lift md:h-28 md:w-28"
            >
              LJ
            </span>
          </Reveal>

          <Reveal delay={100}>
            <div>
              <Badge>Quién está detrás</Badge>

              <div className="mt-5">
                <h2 className="font-display text-2xl leading-tight text-ink sm:text-3xl">
                  Quién hace tu página web: {FOUNDER.name}
                </h2>
                <p className="font-body text-sm text-ink-soft">{FOUNDER.role}</p>
              </div>

              <p className="mt-5 font-body text-lg leading-relaxed text-ink-soft">
                Aquí no hay un equipo de cuentas que te pasa a un ejecutivo que te pasa a un
                programador. <strong className="text-ink">Hablas conmigo</strong>, y el que diseña
                y escribe el código soy yo. Eso tiene un límite —no tomo veinte proyectos a la
                vez— y una ventaja: nada se pierde en el camino entre lo que necesitas y lo que
                se construye.
              </p>

              <dl className="mt-8 grid grid-cols-3 gap-4">
                {STATS.map((s) => (
                  <div key={s.label}>
                    <dt className="font-display text-3xl text-ink">{s.value}</dt>
                    <dd className="mt-1 font-body text-xs leading-snug text-ink-soft">{s.label}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/sobre-nosotros"
                  className="inline-flex items-center gap-1.5 font-body text-sm font-medium text-primary-dark underline underline-offset-4 transition-colors hover:text-primary"
                >
                  Conoce más del estudio
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <span className="h-4 w-px bg-line" aria-hidden="true" />
                <a
                  href={FOUNDER.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-body text-sm text-ink-soft transition-colors hover:text-ink"
                >
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </a>
                <a
                  href={FOUNDER.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-body text-sm text-ink-soft transition-colors hover:text-ink"
                >
                  <Github className="h-4 w-4" /> GitHub
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";

const STEPS = [
  {
    n: "01",
    title: "Entendemos tu proyecto",
    desc: "Antes de diseñar o programar, escuchamos. Definimos qué necesitas y para qué.",
  },
  {
    n: "02",
    title: "Diseñamos la interfaz",
    desc: "Pantallas y experiencia que se ven de marca grande —y pensadas para construirse bien.",
  },
  {
    n: "03",
    title: "Construimos a medida",
    desc: "Desarrollamos tu web o software con código sólido, rápido y hecho para durar.",
  },
  {
    n: "04",
    title: "Lanzamos y acompañamos",
    desc: "Publicamos, dejamos todo documentado y seguimos contigo con soporte y mejoras.",
  },
];

export function Process() {
  return (
    <section id="proceso" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="max-w-2xl">
          <Badge>Cómo trabajamos</Badge>
          <h2 className="mt-6 font-display text-4xl leading-tight text-ink sm:text-5xl">
            Cómo hacemos tu página web:
            <span className="text-metal"> un proceso que da tranquilidad.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface md:grid-cols-4 md:divide-y-0 md:divide-x">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 90}>
              <div className="group h-full p-8 transition-colors hover:bg-background">
                <span className="font-mono text-3xl text-accent">{s.n}</span>
                <h3 className="mt-5 font-display text-xl text-ink">{s.title}</h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-ink-soft">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import { Github, Linkedin, ArrowUpRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Logo } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SITE_URL, WHATSAPP_LINK } from "@/lib/business";

export const metadata: Metadata = {
  title: "Sobre nosotros — JV Agencia | Estudio de diseño y desarrollo",
  description:
    "JV Agencia es un estudio de producto digital fundado por Luis Jaller (Full Stack Developer). Diseño y código en el mismo equipo para PYMEs de LATAM: 3+ años, 11+ proyectos en producción.",
  alternates: { canonical: "/sobre-nosotros" },
  openGraph: {
    title: "Sobre nosotros — JV Agencia",
    description:
      "Estudio de producto digital fundado por Luis Jaller. Diseño + código en el mismo equipo para PYMEs de LATAM.",
    url: `${SITE_URL}/sobre-nosotros`,
    type: "website",
  },
};

const FOUNDER = {
  name: "Luis Jaller",
  role: "Full Stack Developer · Fundador",
  bio: "Full Stack Developer con foco fuerte en backend y arquitectura. No solo escribo código: traduzco necesidades de negocio en soluciones digitales claras. Me muevo entre producto, arquitectura y ejecución con la misma facilidad, para entregar software que no solo funciona, sino que genera impacto real.",
  linkedin: "https://www.linkedin.com/in/jallerdev",
  github: "https://github.com/jallerangel",
  portfolio: "https://jaller-dev.vercel.app",
};

const STATS = [
  { value: "3+", label: "años construyendo producto" },
  { value: "11+", label: "proyectos en producción" },
  { value: "<24h", label: "tiempo de respuesta" },
  { value: "100%", label: "diseño + código a medida" },
];

const APPROACH = [
  {
    title: "Diseño y código en el mismo equipo",
    desc: "No entregamos un diseño bonito que nadie sabe construir, ni un sistema sólido que se ve amateur. Las dos cosas, a la altura.",
  },
  {
    title: "Pensamos en tu negocio, no solo en la web",
    desc: "Traducimos lo que necesita tu negocio en decisiones de producto. El objetivo no es “una web”, es credibilidad que vende y que no se rompe.",
  },
  {
    title: "Socios técnicos de largo plazo",
    desc: "No entregamos y desaparecemos. Quedamos como tu equipo técnico para mantener, mejorar y escalar lo que construimos.",
  },
];

const STACK: { group: string; items: string[] }[] = [
  { group: "Frontend", items: ["TypeScript", "React", "Next.js", "Tailwind CSS"] },
  { group: "Backend", items: ["Node.js", "NestJS", "Express", "Prisma"] },
  { group: "Cloud & DevOps", items: ["AWS", "Terraform", "Docker", "Kubernetes", "GitHub Actions"] },
  { group: "Datos", items: ["PostgreSQL", "DynamoDB", "Redis"] },
  { group: "Mobile", items: ["React Native", "Expo"] },
];

const PROJECTS = [
  { name: "BloomRose", tag: "E-commerce", desc: "Tienda online de bisutería y accesorios, de punta a punta." },
  { name: "HalcónOS", tag: "SaaS / CRM", desc: "CRM y gestor de proyectos para agencias." },
  { name: "InvitiApp", tag: "SaaS", desc: "Plataforma de invitaciones digitales." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  url: `${SITE_URL}/sobre-nosotros`,
  about: { "@id": `${SITE_URL}/#organization` },
  mainEntity: {
    "@type": "Person",
    name: FOUNDER.name,
    jobTitle: "Full Stack Developer",
    worksFor: { "@id": `${SITE_URL}/#organization` },
    url: `${SITE_URL}/sobre-nosotros`,
    sameAs: [FOUNDER.linkedin, FOUNDER.github, FOUNDER.portfolio],
    knowsAbout: [
      "Desarrollo web",
      "Arquitectura de software",
      "Node.js",
      "Next.js",
      "AWS",
      "PostgreSQL",
    ],
  },
};

export default function SobreNosotrosPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        {/* Hero */}
        <section className="mx-auto max-w-4xl px-5 pb-10 pt-32 text-center md:px-8 md:pt-40">
          <Reveal>
            <Badge>El estudio</Badge>
            <h1 className="mt-6 font-display text-4xl leading-tight text-ink sm:text-5xl md:text-6xl">
              Diseño y código,
              <span className="text-metal"> en las mismas manos.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl font-body text-lg leading-relaxed text-ink-soft">
              JV Agencia es un estudio de producto digital fundado por Luis Jaller. Unimos diseño y
              desarrollo en un solo proceso para que las PYMEs de LATAM tengan una presencia que se
              ve de marca grande —y funciona de verdad.
            </p>
          </Reveal>
        </section>

        {/* Stats */}
        <section className="mx-auto max-w-5xl px-5 py-10 md:px-8">
          <Reveal>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-line bg-surface/70 p-6 text-center"
                >
                  <div className="font-display text-3xl text-metal md:text-4xl">{s.value}</div>
                  <div className="mt-2 font-body text-sm text-ink-soft">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* Fundador */}
        <section className="mx-auto max-w-5xl px-5 py-16 md:px-8">
          <Reveal>
            <div className="grid gap-8 rounded-2xl border border-line bg-surface/80 p-8 shadow-soft md:grid-cols-[auto_1fr] md:items-center md:p-12">
              <div className="grid h-28 w-28 shrink-0 place-items-center rounded-2xl border border-line bg-background">
                <Logo className="h-16 w-auto text-ink" />
              </div>
              <div>
                <h2 className="font-display text-3xl text-ink">{FOUNDER.name}</h2>
                <p className="mt-1 font-mono text-xs uppercase tracking-widest text-accent">
                  {FOUNDER.role}
                </p>
                <p className="mt-4 max-w-2xl font-body leading-relaxed text-ink-soft">{FOUNDER.bio}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button asChild variant="outline" size="sm">
                    <a href={FOUNDER.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-4 w-4" /> LinkedIn
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <a href={FOUNDER.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" /> GitHub
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <a href={FOUNDER.portfolio} target="_blank" rel="noopener noreferrer">
                      Portafolio <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Enfoque */}
        <section className="mx-auto max-w-5xl px-5 py-12 md:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl text-ink sm:text-4xl">Cómo trabajamos</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {APPROACH.map((a, i) => (
              <Reveal key={a.title} delay={i * 100}>
                <div className="h-full rounded-2xl border border-line bg-surface/60 p-7">
                  <span className="font-mono text-sm text-accent">0{i + 1}</span>
                  <h3 className="mt-3 font-display text-xl text-ink">{a.title}</h3>
                  <p className="mt-3 font-body text-sm leading-relaxed text-ink-soft">{a.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Stack */}
        <section className="mx-auto max-w-5xl px-5 py-12 md:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl text-ink sm:text-4xl">Qué dominamos</h2>
            <p className="mt-4 font-body text-ink-soft">
              Tecnología moderna y probada para construir productos rápidos, sólidos y listos para crecer.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {STACK.map((s) => (
              <div key={s.group} className="rounded-2xl border border-line bg-surface/60 p-6">
                <h3 className="font-body text-sm font-semibold uppercase tracking-widest text-ink">
                  {s.group}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {s.items.map((it) => (
                    <span
                      key={it}
                      className="rounded-full border border-line bg-background/50 px-3 py-1 font-body text-xs text-ink-soft"
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Proyectos */}
        <section className="mx-auto max-w-5xl px-5 py-12 md:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl text-ink sm:text-4xl">Algunos proyectos</h2>
            <p className="mt-4 font-body text-ink-soft">
              Una muestra pública; el resto vive bajo NDA (SaaS, fintech, logística).
            </p>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.name} delay={i * 100}>
                <div className="h-full rounded-2xl border border-line bg-surface/70 p-7">
                  <span className="rounded-full bg-accent/15 px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-primary-dark">
                    {p.tag}
                  </span>
                  <h3 className="mt-4 font-display text-2xl text-ink">{p.name}</h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-3xl px-5 py-20 text-center md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">¿Hablamos de tu proyecto?</h2>
            <p className="mx-auto mt-4 max-w-xl font-body text-ink-soft">
              Cuéntanos qué necesitas. Te respondemos en menos de 24 horas.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg">
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                  Escríbenos por WhatsApp
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="/#contacto">Calcular mi proyecto</a>
              </Button>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

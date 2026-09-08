import Link from "next/link";

import { SERVICIOS, type ServicioId } from "@/lib/services";
import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { Code2, Palette, Boxes, LifeBuoy, MessageSquareText, Search, ArrowUpRight } from "lucide-react";

// La rejilla es de 5 columnas: cada fila tiene que sumar 5.
//   fila 1 → 3 + 2   ·   fila 2 → 2 + 3   ·   fila 3 → 3 + 2
// Al entrar SEO como sexto servicio la última fila dejó de ser una tarjeta
// ancha y pasó a ser un par, para no romper la suma.
/* La rejilla es de 5 columnas: cada fila tiene que sumar 5.
   fila 1 → 3 + 2  ·  fila 2 → 2 + 3  ·  fila 3 → 3 + 2
   Aqui solo vive la PRESENTACION -icono, ancho, destacado-. El nombre y la
   descripcion salen de lib/services.ts, para que la portada y el formulario de
   agendamiento no se vuelvan a desincronizar. */
const PRESENTACION: Record<ServicioId, { icon: typeof Code2; span: string; featured?: boolean }> = {
  web:      { icon: Code2,             span: "lg:col-span-3", featured: true },
  chatbot:  { icon: MessageSquareText, span: "lg:col-span-2", featured: true },
  seo:      { icon: Search,            span: "lg:col-span-2", featured: true },
  software: { icon: Boxes,             span: "lg:col-span-3" },
  design:   { icon: Palette,           span: "lg:col-span-3" },
  support:  { icon: LifeBuoy,          span: "lg:col-span-2" },
};

const SERVICES = SERVICIOS.map((s) => ({
  title: s.nombre,
  desc: s.desc,
  href: s.href,
  ...PRESENTACION[s.id],
}));

/** Enlace si el servicio ya tiene página propia; si no, un contenedor normal. */
function ServiceCard({
  href,
  className,
  children,
}: {
  href?: string;
  className: string;
  children: React.ReactNode;
}) {
  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  return <div className={className}>{children}</div>;
}

export function Benefits() {
  return (
    <section id="servicios" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <Reveal>
            <Badge>Lo que hacemos</Badge>
            <h2 className="mt-6 font-display text-4xl leading-tight text-ink sm:text-5xl">
              Páginas web, tiendas online
              <br />
              <span className="text-metal">y chatbots de WhatsApp.</span>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="font-body text-lg leading-relaxed text-ink-soft lg:pb-2">
              No necesitas un diseñador por un lado y un programador por otro. Necesitas un equipo
              donde las dos cosas se hablan desde el primer día. Eso somos — y desde que Meta nos
              verificó como proveedor de tecnología, también dejamos tu WhatsApp contestando solo.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-5">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.title} delay={i * 90} className={s.span}>
                {/* Solo los servicios que ya tienen página propia son enlace.
                    Los demás siguen siendo tarjeta, para no prometer un clic
                    que no lleva a ninguna parte. */}
                <ServiceCard
                  href={s.href}
                  className={[
                    "group relative flex h-full flex-col overflow-hidden rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift",
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
                  {s.href && (
                    <span className="mt-5 inline-flex items-center gap-1.5 font-body text-sm font-medium text-primary-dark">
                      Ver el servicio
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  )}
                </ServiceCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";

import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { Code2, Palette, Boxes, LifeBuoy, MessageSquareText, Search, ArrowUpRight } from "lucide-react";

// La rejilla es de 5 columnas: cada fila tiene que sumar 5.
//   fila 1 → 3 + 2   ·   fila 2 → 2 + 3   ·   fila 3 → 3 + 2
// Al entrar SEO como sexto servicio la última fila dejó de ser una tarjeta
// ancha y pasó a ser un par, para no romper la suma.
const SERVICES: {
  icon: typeof Code2;
  title: string;
  desc: string;
  span: string;
  featured?: boolean;
  href?: string;
}[] = [
  {
    icon: Code2,
    title: "Desarrollo web",
    desc: "Sitios, landing pages, e-commerce y web corporativa. Rápidos, sólidos y pensados para crecer contigo.",
    span: "lg:col-span-3",
    featured: true,
  },
  {
    icon: MessageSquareText,
    title: "Chatbot de WhatsApp",
    // El estatus de proveedor de tecnología es verificable y es el
    // diferenciador real: la mayoría de agencias tiene que tercerizar
    // la conexión con Meta. Se enuncia como hecho, sin insinuar respaldo.
    desc: "Tu número contesta solo: capta interesados, agenda citas, toma pedidos y pasa a una persona cuando se complica. Somos proveedor de tecnología verificado por Meta, así que la conexión la hacemos nosotros y no la terceriza nadie.",
    href: "/servicios/chatbot-whatsapp",
    span: "lg:col-span-2",
    featured: true,
  },
  {
    icon: Search,
    // El SEO existía como un extra de $250.000 dentro del cotizador y no
    // figuraba como servicio en ninguna parte del sitio, aunque es de lo que
    // más preguntan. Se enuncia separando las dos cosas —lo técnico, que se
    // hace una vez, y el posicionamiento, que es mensual— porque confundirlas
    // es lo que quema al cliente antes de llegar a nosotros.
    desc: "Que te encuentren cuando buscan lo que vendes. El SEO técnico va con el sitio; posicionar es trabajo mensual y lo decimos claro. Nadie garantiza el primer puesto: garantizamos el trabajo y el informe.",
    title: "SEO y posicionamiento",
    span: "lg:col-span-2",
    featured: true,
  },
  {
    icon: Boxes,
    title: "Software a medida",
    desc: "Apps web, sistemas internos y plataformas hechas a tu medida, no forzadas a una plantilla.",
    span: "lg:col-span-3",
  },
  {
    icon: Palette,
    title: "Diseño web / UI",
    // No se vende aparte: entra en todo proyecto web. Decirlo evita que el
    // cliente crea que el diseño es un extra que se le puede cobrar despues.
    desc: "Interfaz y experiencia que se ven de marca grande, pensadas desde el primer día en cómo se van a construir. No es un servicio aparte ni un extra: va dentro de cada proyecto web que hacemos.",
    span: "lg:col-span-3",
  },
  {
    icon: LifeBuoy,
    title: "Mantenimiento y soporte",
    desc: "No desaparecemos al entregar. Mejoras continuas, hosting y soporte para que todo siga funcionando. Una automatización sobre todo: si expira un token de Meta o rechazan una plantilla, deja de responder sin avisar.",
    span: "lg:col-span-2",
  },
];

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
              Diseño y código.
              <br />
              <span className="text-metal">El mismo equipo.</span>
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

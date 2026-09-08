import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";

/**
 * Rejilla de proyectos en producción.
 *
 * Las capturas son de los sitios REALES, tomadas de la versión publicada, no
 * maquetas. Cada tarjeta enlaza al sitio para que cualquiera lo compruebe: un
 * portafolio que no se puede verificar vale lo mismo que no tenerlo.
 *
 * Cada descripción sale de la propia página del proyecto, no de nuestra
 * interpretación de lo que hace el cliente.
 */
type Proyecto = {
  nombre: string;
  categoria: string;
  desc: string;
  /**
   * Solo los proyectos que ya se pueden mostrar. Un proyecto EN PROCESO no
   * lleva enlace ni deja ver su dirección: se anuncia el trabajo sin mandar a
   * nadie a un sitio que todavía no está listo para recibir visitas.
   */
  url?: string;
  /** Archivo en /public/work/ */
  img: string;
  /** Dominio que se muestra en la barra del navegador. Solo si hay `url`. */
  dominio?: string;
  /** Producto propio de la agencia, no encargo de un cliente. */
  propio?: boolean;
  /** Todavía no se puede visitar: se muestra la captura, sin enlace. */
  enProceso?: boolean;
};

const PROYECTOS: Proyecto[] = [
  {
    nombre: "HalcónOS",
    categoria: "Producto propio · SaaS",
    desc: "CRM de ventas para agencias en LATAM: caza leads con Google, redacta propuestas con IA y lleva cada conversación de WhatsApp al pipeline.",
    url: "https://halcon.jvagencia.com",
    img: "/work/halconos.webp",
    dominio: "halcon.jvagencia.com",
    propio: true,
  },
  {
    nombre: "Hummik",
    categoria: "Producto propio · SaaS",
    desc: "Agenda de citas por WhatsApp: el cliente reserva desde el chat o desde un enlace y la cita cae sola en el calendario, con recordatorios contra los plantones.",
    url: "https://www.hummik.com",
    img: "/work/hummik.webp",
    dominio: "hummik.com",
    propio: true,
  },
  {
    nombre: "NÜVA Plastic Surgery",
    categoria: "Salud",
    desc: "Cirugía plástica en Colombia, con acompañamiento médico para pacientes nacionales e internacionales.",
    img: "/work/nuva.webp",
    enProceso: true,
  },
  {
    nombre: "Animal Expert",
    categoria: "Veterinaria",
    desc: "Centro médico veterinario en Turbaco: consulta especializada, cirugía, rayos X, fisioterapia y vacunación, con agenda en línea.",
    img: "/work/animal-expert.webp",
    enProceso: true,
  },
  {
    nombre: "Fta. Elka Gómez",
    categoria: "Salud y spa",
    desc: "Más de 30 años tratando el dolor en Cartagena: rehabilitación física, masaje y experiencias de spa.",
    img: "/work/elka-spa.webp",
    enProceso: true,
  },
  {
    nombre: "Peluquería Marcopolo",
    categoria: "Belleza",
    desc: "Salón de belleza en Barranquilla con cuatro décadas de oficio: corte de autor, color editorial y tratamientos.",
    img: "/work/marcopolo.webp",
    enProceso: true,
  },
];

/** Enlace solo si el proyecto se puede visitar; si no, un contenedor. */
function Tarjeta({
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
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return <div className={className}>{children}</div>;
}

export function Portfolio() {
  return (
    <section id="proyectos" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Badge>Proyectos</Badge>
          <h2 className="mt-6 font-display text-4xl leading-tight text-ink sm:text-5xl">
            Páginas web que ya están
            <span className="text-metal"> en línea, funcionando.</span>
          </h2>
          <p className="mt-5 font-body text-lg text-ink-soft">
            No son maquetas ni plantillas de muestra. Cada una está publicada y se puede abrir:
            toca cualquiera y compruébalo.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROYECTOS.map((p, i) => (
            <Reveal key={p.nombre} delay={(i % 3) * 90}>
              <Tarjeta
                href={p.url}
                className={[
                  "group flex h-full flex-col overflow-hidden rounded-2xl border bg-surface/70 transition-all duration-300",
                  p.url
                    ? "border-line hover:-translate-y-1 hover:border-primary/30 hover:shadow-lift"
                    : "border-line/70",
                ].join(" ")}
              >
                {/* Marco de navegador: enmarca la captura y deja claro que es
                    un sitio real, con su dominio a la vista. */}
                <div className="flex items-center gap-1.5 border-b border-line bg-background/60 px-4 py-2.5">
                  <span className="h-2 w-2 rounded-full bg-danger/60" />
                  <span className="h-2 w-2 rounded-full bg-warning/60" />
                  <span className="h-2 w-2 rounded-full bg-success/60" />
                  {p.dominio && (
                    <span className="ml-2 truncate font-mono text-[10px] text-ink-soft">
                      {p.dominio}
                    </span>
                  )}
                </div>

                <div className="relative overflow-hidden bg-background">
                  <Image
                    src={p.img}
                    alt={`${p.nombre} — sitio diseñado y desarrollado por JV Agencia`}
                    width={1600}
                    height={1000}
                    className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(min-width:1024px) 22rem, (min-width:768px) 44vw, 100vw"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-xl text-ink">{p.nombre}</h3>
                    {p.url && (
                      <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-ink-soft/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                    )}
                  </div>

                  <span
                    className={
                      p.propio
                        ? "mt-2 w-fit rounded-full bg-primary/12 px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-primary-dark"
                        : "mt-2 w-fit rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-ink-soft"
                    }
                  >
                    {p.categoria}
                  </span>

                  {p.enProceso && (
                    <span className="mt-2 inline-flex w-fit items-center gap-1.5 font-mono text-[10px] uppercase tracking-wide text-ink-soft">
                      <span className="h-1.5 w-1.5 rounded-full bg-warning" />
                      En proceso
                    </span>
                  )}

                  <p className="mt-3 font-body text-sm leading-relaxed text-ink-soft">{p.desc}</p>
                </div>
              </Tarjeta>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

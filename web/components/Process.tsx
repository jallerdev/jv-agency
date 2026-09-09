import { ChevronDown, ChevronRight } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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

/* Progresion, no repeticion: el anillo del nodo se va cerrando paso a paso y
   el ultimo se llena. Se ve de un vistazo que hay un principio y un final. */
const NODO = [
  "border-secondary/40 bg-surface text-primary-dark",
  "border-secondary/70 bg-surface text-primary-dark",
  "border-primary/70 bg-surface text-primary-dark",
  "border-primary bg-primary text-surface shadow-soft",
];

export function Process() {
  const ultimoIndice = STEPS.length - 1;

  return (
    /* Banda propia. Era la seccion mas pobre de la portada -un rectangulo con
       divide-x, el mismo skin que las otras seis tarjetas- y encima caia en el
       tramo donde el papel lleva 6.000 px sin cambiar de tono. Con fondo y
       bordes propios deja de ser una tarjeta mas y pasa a ser un capitulo. */
    <section
      id="proceso"
      className="relative border-y border-line bg-surface bg-grain py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="max-w-2xl" stagger distance="lg">
          <Badge>Cómo trabajamos</Badge>
          {/* 40px, no 48: el titular pesaba tanto como los cuatro pasos juntos.
              Y sin text-metal, que se reserva al h1 y al h2 de Servicios. */}
          <h2 className="mt-6 font-display text-3xl/[1.15] text-ink sm:text-[2.5rem]/[1.1]">
            Cómo hacemos tu página web:{" "}
            <span className="text-primary-dark">un proceso que da tranquilidad.</span>
          </h2>
        </Reveal>

        {/* Recorrido, no rejilla. Los pasos van sobre un riel con nodos
            numerados: vertical mientras se apilan, horizontal cuando caben en
            fila. Los chevrones dicen hacia donde va. */}
        <ol className="mt-12 grid gap-x-10 md:mt-16 md:grid-cols-2 md:gap-y-14 lg:grid-cols-4 lg:gap-x-8">
          {STEPS.map((s, i) => {
            const ultimo = i === ultimoIndice;
            return (
              <Reveal
                as="li"
                key={s.n}
                index={i}
                className={cn(
                  "relative grid grid-cols-[3.5rem_1fr] gap-x-4 md:block",
                  !ultimo && "pb-10 md:pb-0"
                )}
              >
                {/* Riel vertical: solo mientras los pasos se apilan. */}
                {!ultimo && (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-2 left-7 top-16 flex w-px flex-col items-center md:hidden"
                  >
                    <span className="w-px flex-1 bg-gradient-to-b from-secondary/20 to-secondary/45" />
                    <ChevronDown
                      strokeWidth={2}
                      className="my-1 h-3.5 w-3.5 shrink-0 text-secondary"
                    />
                    <span className="w-px flex-1 bg-gradient-to-b from-secondary/45 to-primary/45" />
                  </span>
                )}

                <div className="col-start-1 row-start-1 md:mb-6 md:flex md:items-center">
                  <span
                    className={cn(
                      "relative z-10 inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full border font-mono text-base tabular-nums md:h-16 md:w-16 md:text-lg",
                      NODO[i]
                    )}
                  >
                    {s.n}
                  </span>

                  {/* Riel horizontal. En md la fila es de dos, asi que solo
                      conecta la columna izquierda con la derecha; en lg conecta
                      los cuatro pasos seguidos. El margen negativo cruza el
                      canal de la rejilla para que la linea no se corte. */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "ml-4 hidden flex-1 items-center gap-2 md:-mr-10 lg:-mr-8",
                      i % 2 === 0 ? "md:flex" : "md:hidden",
                      ultimo ? "lg:hidden" : "lg:flex"
                    )}
                  >
                    <span className="h-px flex-1 bg-gradient-to-r from-secondary/20 to-secondary/45" />
                    <ChevronRight
                      strokeWidth={2}
                      className="h-3.5 w-3.5 shrink-0 text-secondary"
                    />
                    <span className="h-px flex-1 bg-gradient-to-r from-secondary/45 to-primary/45" />
                  </span>
                </div>

                <div className="col-start-2 row-start-1 pt-3 md:col-start-1 md:pt-0">
                  <h3 className="font-display text-xl/[1.3] text-ink">{s.title}</h3>
                  {/* 16px, no 14: en escritorio estos parrafos corrian a 29
                      caracteres por linea, la medida mas estrecha de la portada. */}
                  <p className="mt-3 max-w-[46ch] font-body leading-relaxed text-ink-soft">
                    {s.desc}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

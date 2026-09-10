"use client";

import Image from "next/image";
import * as Acordeon from "@radix-ui/react-accordion";
import { ArrowUpRight, Plus } from "lucide-react";

import { PORTAFOLIO, type Proyecto } from "@/content/home/portafolio";
import type { Idioma } from "@/content/types";
import { Seccion, EncabezadoSeccion } from "@/components/ui/seccion";
import { Reveal } from "@/components/Reveal";

/**
 * EL PORTAFOLIO COMO EXPEDIENTES
 * ──────────────────────────────────────────────────────────────────────────
 * Una rejilla de capturas obliga a mirar seis miniaturas de 300 px en las que
 * no se lee nada y a decidir con la vista cansada. El expediente hace lo
 * contrario: una fila por proyecto —numeral, nombre, oficio, estado—, y quien
 * quiera ver uno lo abre. Se lee de un vistazo y la captura sale al tamaño en
 * el que sí se entiende.
 *
 * DOS GRUPOS, Y LA DIFERENCIA A LA VISTA. Arriba lo que está en línea con
 * dominio propio; abajo lo que construí por iniciativa propia. Mezclarlos
 * habría insinuado clientes que no existen. Cada grupo dice lo que es en su
 * propia nota, así que el estado no depende de que alguien lea la letra chica.
 *
 * `type="single" collapsible`: uno abierto a la vez. Con varios abiertos la
 * sección crece a cuatro pantallas y el patrón deja de servir para comparar.
 */
function Ficha({ proyecto, idioma }: { proyecto: Proyecto; idioma: Idioma }) {
  const ficha = PORTAFOLIO.ficha[idioma];
  const estados = PORTAFOLIO.estados[idioma];
  const enLinea = Boolean(proyecto.url);

  const filas = [
    { k: ficha.tipo, v: proyecto.categoria[idioma] },
    { k: ficha.estado, v: enLinea ? estados.enLinea : estados.enEstudio },
    { k: ficha.rol, v: PORTAFOLIO.rol[idioma] },
    { k: ficha.dominio, v: proyecto.dominio ?? estados.sinDominio },
  ];

  return (
    <dl className="divide-y divide-line border-y border-line">
      {filas.map((f) => (
        <div key={f.k} className="flex items-baseline justify-between gap-6 py-3">
          <dt className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-ink-muted">
            {f.k}
          </dt>
          <dd className="text-right text-sm text-ink-soft">{f.v}</dd>
        </div>
      ))}
    </dl>
  );
}

function Expediente({ proyecto, idioma }: { proyecto: Proyecto; idioma: Idioma }) {
  return (
    <Acordeon.Item
      value={proyecto.numero}
      className="group border-b border-line last:border-b-0"
    >
      <Acordeon.Header>
        <Acordeon.Trigger className="flex w-full items-center gap-4 py-6 text-left transition-colors duration-base ease-ps hover:text-brand data-[state=open]:text-brand sm:gap-8">
          <span className="font-mono text-sm tabular-nums text-ink-muted transition-colors duration-base ease-ps group-hover:text-brand group-data-[state=open]:text-brand">
            {proyecto.numero}
          </span>

          <span className="min-w-0 flex-1">
            <span className="block font-display text-[clamp(1.25rem,3vw,1.875rem)] font-semibold leading-tight tracking-[-0.02em]">
              {proyecto.nombre}
            </span>
            <span className="mt-1 block font-mono text-[0.7rem] uppercase tracking-[0.12em] text-ink-muted">
              {proyecto.categoria[idioma]}
            </span>
          </span>

          {/* El punto de «en línea» es uno de los cinco sitios del naranja. Late
              despacio: dice que está vivo sin pedir atención. */}
          {proyecto.url && (
            <span className="hidden items-center gap-2 sm:flex">
              <span aria-hidden className="jv-latido h-1.5 w-1.5 rounded-full bg-brand" />
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-ink-soft">
                {PORTAFOLIO.estados[idioma].enLinea}
              </span>
            </span>
          )}

          <Plus
            aria-hidden
            strokeWidth={2}
            className="h-5 w-5 shrink-0 text-ink-muted transition-transform duration-base ease-ps group-data-[state=open]:rotate-45 group-data-[state=open]:text-brand"
          />
        </Acordeon.Trigger>
      </Acordeon.Header>

      <Acordeon.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
        <div className="grid grid-cols-1 gap-8 pb-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          {/* La captura entra con barrido, como en palo-seco: se descubre de
              arriba abajo en vez de aparecer de golpe. */}
          <div className="jv-barrido relative aspect-[16/10] overflow-hidden rounded-[var(--radius-lg)] border border-line bg-surface">
            <Image
              src={proyecto.imagen}
              alt={`Captura del sitio de ${proyecto.nombre}`}
              fill
              sizes="(min-width: 1024px) 640px, 100vw"
              className="object-cover object-top"
            />
          </div>

          <div className="flex flex-col">
            <p className="text-pretty text-ink-soft">{proyecto.desc[idioma]}</p>

            <div className="mt-8">
              <Ficha proyecto={proyecto} idioma={idioma} />
            </div>

            {proyecto.url && (
              <a
                href={proyecto.url}
                target="_blank"
                rel="noopener noreferrer"
                className="jv-enlace mt-8 inline-flex items-center gap-2 self-start font-semibold text-brand"
              >
                {PORTAFOLIO.abrir[idioma]} {proyecto.dominio}
                <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
              </a>
            )}
          </div>
        </div>
      </Acordeon.Content>
    </Acordeon.Item>
  );
}

export function Portafolio({ idioma }: { idioma: Idioma }) {
  return (
    <Seccion id="portafolio">
      <Reveal>
        <EncabezadoSeccion contenido={PORTAFOLIO} idioma={idioma} />
      </Reveal>

      <div className="mt-16 space-y-16">
        {PORTAFOLIO.grupos.map((grupo) => (
          <Reveal key={grupo.titulo.es}>
            <div className="jv-rule flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 pb-4">
              <h3 className="font-mono text-[0.75rem] uppercase tracking-[0.12em] text-ink">
                {grupo.titulo[idioma]}
              </h3>
              <p className="max-w-[34rem] text-sm text-ink-muted">{grupo.nota[idioma]}</p>
            </div>

            {/* Cada grupo es su propio acordeón: abrir uno de estudio no cierra
                el que estabas mirando arriba. */}
            <Acordeon.Root type="single" collapsible>
              {grupo.proyectos.map((p) => (
                <Expediente key={p.numero} proyecto={p} idioma={idioma} />
              ))}
            </Acordeon.Root>
          </Reveal>
        ))}
      </div>
    </Seccion>
  );
}

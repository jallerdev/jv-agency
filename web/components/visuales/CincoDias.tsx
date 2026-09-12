"use client";

import { useEffect, useRef, useState } from "react";
import { Check, FileImage, FileText, Lock, Shapes } from "lucide-react";

import type { Idioma } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * «CINCO DÍAS, EN PANTALLA» — la pieza firma de /servicios/diseno-de-paginas-web
 * ──────────────────────────────────────────────────────────────────────────
 * La página ya contaba los cinco días con un riel de texto. Esto es el mismo
 * calendario, pero enseñando qué hay en la pantalla cada día: los pasos bajan
 * por la izquierda y el marco de la derecha se queda quieto y cambia.
 *
 * POR QUÉ ES LA FIRMA Y NO UN ADORNO. El día 2 y 3 el marco se parte en dos
 * —diseño a un lado, código al otro— y esa imagen ES la tesis del sitio: la
 * misma persona hace las dos cosas. Es lo único que esta página puede enseñar
 * y que un competidor no puede copiar diciéndolo.
 *
 * NO HAY NINGUNA CIFRA NUEVA AQUÍ. Los cinco pasos son los mismos `previo` e
 * `hitos` del contenido, los que ya alimentaban el riel. Este componente
 * ilustra, no informa: si se borra, no se pierde ni un dato.
 *
 * TRES DECISIONES DE COMPORTAMIENTO:
 *
 * · EN MÓVIL NO HAY `sticky`. Un marco pegado en un teléfono se come media
 *   pantalla y deja el texto en un canal de cuatro palabras. Cada paso lleva
 *   su propia ilustración debajo y se acabó.
 *
 * · EL MARCO ES DECORACIÓN DECLARADA (`aria-hidden`). Lo que un lector de
 *   pantalla necesita saber está escrito: cada paso lleva su descripción en
 *   texto, servida en el HTML, no un `alt` de tres palabras.
 *
 * · CON MOVIMIENTO REDUCIDO cada pantalla nace en su estado final. No se
 *   acorta la animación: se quita. Las animaciones viven en `efectos.css`
 *   bajo `.jv-dia-*`, y ahí están apagadas por `prefers-reduced-motion`.
 */

export type PasoDia = { etiqueta: string; texto: string; pantalla: string };

const T = {
  es: { rotulo: "Lo que hay en la pantalla", ahora: "Día en pantalla" },
  en: { rotulo: "What's on the screen", ahora: "Day on screen" },
} as const;

/* Las cuatro líneas del panel de código. Son JSX de verdad y de este mismo
   sitio —una sección con su rejilla—, no `lorem` con corchetes: quien sepa
   leerlas va a reconocer que dicen algo. */
const CODIGO = [
  { sangria: 0, tag: "<section", resto: ' className="hero">' },
  { sangria: 1, tag: "<h1", resto: ">{titulo}</h1>" },
  { sangria: 1, tag: "<Boton", resto: ' variante="primary" />' },
  { sangria: 0, tag: "</section>", resto: "" },
] as const;

const ARCHIVOS = [
  { icono: Shapes, nombre: "logo.svg" },
  { icono: FileImage, nombre: "fotos.jpg" },
  { icono: FileText, nombre: "textos.docx" },
] as const;

/** La barra del navegador. Igual que la de `ProofCard`: es el mismo mueble. */
function Barra({ dominio, enLinea }: { dominio?: string; enLinea?: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-line bg-raised px-3 py-2">
      <span className="flex gap-1.5">
        <span className="h-2 w-2 rounded-full bg-line-strong" />
        <span className="h-2 w-2 rounded-full bg-line-strong" />
        <span className="h-2 w-2 rounded-full bg-line-strong" />
      </span>
      <span className="flex min-w-0 flex-1 items-center gap-1.5 truncate rounded-full bg-surface px-3 py-1 font-mono text-xs text-ink-soft">
        {dominio ? (
          <>
            <Lock className="h-3 w-3 shrink-0 text-brand" strokeWidth={2} />
            {dominio}
          </>
        ) : (
          <span className="h-1.5 w-24 rounded-full bg-line-strong" />
        )}
      </span>
      {enLinea && (
        <span className="flex shrink-0 items-center gap-1.5 font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
          <span className="jv-latido h-1.5 w-1.5 rounded-full bg-brand" />
          {enLinea}
        </span>
      )}
    </div>
  );
}

function Pantalla({
  paso,
  dominio,
  enLinea,
}: {
  paso: number;
  dominio: string;
  enLinea: string;
}) {
  /* Día 5: el sitio publicado. La barra lleva candado, dominio y el punto. */
  if (paso === 4) {
    return (
      <div className="jv-card overflow-hidden">
        <Barra dominio={dominio} enLinea={enLinea} />
        <div className="jv-dia-publicado grid aspect-[4/3] content-start gap-3 bg-canvas p-5">
          <div className="h-2.5 w-1/3 rounded-full bg-brand" />
          <div className="h-5 w-4/5 rounded-md bg-line-strong" />
          <div className="h-2 w-3/5 rounded-full bg-line" />
          <div className="mt-2 grid grid-cols-3 gap-2">
            <div className="h-12 rounded-md border border-line bg-surface" />
            <div className="h-12 rounded-md border border-line bg-surface" />
            <div className="h-12 rounded-md border border-line bg-surface" />
          </div>
          <div className="mt-1 h-8 w-32 rounded-full bg-brand" />
          {/* El sitio no se acaba en el botón: sin estas dos filas el marco del
              día 5 quedaba medio vacío justo donde hay que enseñar un sitio
              terminado. */}
          <div className="mt-3 grid grid-cols-2 gap-3 border-t border-line pt-4">
            <div className="grid gap-2">
              <div className="h-2 w-2/3 rounded-full bg-line" />
              <div className="h-2 w-1/2 rounded-full bg-line" />
            </div>
            <div className="grid gap-2">
              <div className="h-2 w-2/3 rounded-full bg-line" />
              <div className="h-2 w-3/5 rounded-full bg-line" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* Día 4: el mismo sitio en dos anchos, con las notas de revisión. */
  if (paso === 3) {
    return (
      <div className="jv-card overflow-hidden">
        <Barra />
        {/* Las dos maquetas van centradas y ocupan el alto: antes iban pegadas
            abajo (`items-end`) y dejaban dos tercios del marco vacíos, con las
            notas de revisión flotando sobre la nada. Las notas se cuelgan
            AHORA de las maquetas, no del marco, que es donde significan algo. */}
        <div className="grid aspect-[4/3] grid-cols-[1fr_auto] items-stretch gap-4 bg-canvas p-5">
          <div className="jv-dia-escritorio relative grid content-start gap-2 rounded-md border border-line bg-surface p-4">
            <div className="h-2 w-1/3 rounded-full bg-brand" />
            <div className="h-4 w-4/5 rounded-md bg-line-strong" />
            <div className="h-2 w-2/3 rounded-full bg-line" />
            <div className="mt-2 grid grid-cols-3 gap-2">
              <div className="h-16 rounded bg-line" />
              <div className="h-16 rounded bg-line" />
              <div className="h-16 rounded bg-line" />
            </div>
            <div className="mt-2 h-2 w-1/2 rounded-full bg-line" />
            <div className="h-6 w-24 rounded-full bg-brand/70" />

            {/* Dos notas de revisión: una abierta y una resuelta. Es lo que
                pasa el día 4, no un adorno de «comentarios». */}
            <span className="jv-dia-nota absolute right-4 top-[30%] flex h-6 w-6 items-center justify-center rounded-full border border-brand bg-canvas font-mono text-xs text-brand">
              1
            </span>
            <span className="jv-dia-nota jv-dia-nota--2 absolute bottom-5 left-5 flex h-6 w-6 items-center justify-center rounded-full border border-line bg-brand text-canvas">
              <Check className="h-3.5 w-3.5" strokeWidth={3} />
            </span>
          </div>

          <div className="jv-dia-telefono grid w-24 content-start gap-2 self-center rounded-xl border border-line bg-surface p-2.5">
            <div className="h-1.5 w-2/3 rounded-full bg-brand" />
            <div className="h-3 w-full rounded bg-line-strong" />
            <div className="h-10 w-full rounded bg-line" />
            <div className="h-10 w-full rounded bg-line" />
            <div className="h-5 w-full rounded-full bg-brand/70" />
          </div>
        </div>
      </div>
    );
  }

  /* Días 2 y 3: el marco partido. Diseño a la izquierda, código a la derecha.
     Es la imagen que sostiene la página entera. */
  if (paso === 2) {
    return (
      <div className="jv-card overflow-hidden">
        <Barra />
        <div className="grid aspect-[4/3] grid-cols-2 bg-canvas">
          <div className="jv-dia-diseno grid content-start gap-3 border-r border-line p-5">
            <div className="h-2.5 w-1/2 rounded-full bg-brand" />
            <div className="h-6 w-full rounded-md bg-line-strong" />
            <div className="h-2 w-4/5 rounded-full bg-line" />
            <div className="h-2 w-3/5 rounded-full bg-line" />
            <div className="mt-2 h-8 w-24 rounded-full bg-brand" />
          </div>

          <div className="grid content-start gap-2 bg-surface p-5 font-mono text-xs leading-relaxed">
            {CODIGO.map((l, i) => (
              <p
                key={l.tag + i}
                className="jv-dia-codigo truncate text-ink-soft"
                style={{ paddingLeft: `${l.sangria * 0.75}rem`, animationDelay: `${i * 90}ms` }}
              >
                <span className="text-brand">{l.tag}</span>
                {l.resto}
              </p>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* Día 1: la estructura, todavía en gris. Ni color ni tipografía: eso es
     exactamente lo que se aprueba ese día. */
  if (paso === 1) {
    return (
      <div className="jv-card overflow-hidden">
        <Barra />
        <div className="grid aspect-[4/3] content-start gap-3 bg-canvas p-5">
          {[
            "h-3 w-1/4",
            "h-8 w-3/4",
            "h-2 w-2/3",
            "h-2 w-1/2",
          ].map((c, i) => (
            <div
              key={c}
              className={cn("jv-dia-bloque rounded-md bg-line-strong", c)}
              style={{ animationDelay: `${i * 80}ms` }}
            />
          ))}
          <div className="mt-2 grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="jv-dia-bloque h-20 rounded-md border border-line bg-surface"
                style={{ animationDelay: `${(i + 4) * 80}ms` }}
              />
            ))}
          </div>
          <div
            className="jv-dia-bloque mt-2 h-10 rounded-md border border-line bg-surface"
            style={{ animationDelay: "560ms" }}
          />
          <div
            className="jv-dia-bloque h-2 w-1/3 rounded-full bg-line-strong"
            style={{ animationDelay: "640ms" }}
          />
        </div>
      </div>
    );
  }

  /* Antes del día 1: el material cayendo dentro. El reloj no ha arrancado. */
  return (
    <div className="jv-card overflow-hidden">
      <Barra />
      <div className="grid aspect-[4/3] content-center justify-items-center gap-3 bg-canvas p-5">
        {ARCHIVOS.map(({ icono: Icono, nombre }, i) => (
          <span
            key={nombre}
            className="jv-dia-archivo flex w-48 max-w-full items-center gap-3 rounded-md border border-line bg-surface px-4 py-3 font-mono text-xs text-ink-soft"
            style={{ animationDelay: `${i * 140}ms` }}
          >
            <Icono className="h-4 w-4 shrink-0 text-brand" strokeWidth={2} />
            {nombre}
          </span>
        ))}
      </div>
    </div>
  );
}

export function CincoDias({
  pasos,
  dominio,
  enLinea,
  idioma,
  className,
}: {
  pasos: readonly PasoDia[];
  dominio: string;
  enLinea: string;
  idioma: Idioma;
  className?: string;
}) {
  const t = T[idioma];
  const [activo, setActivo] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const nodos = refs.current.filter(Boolean) as HTMLLIElement[];
    if (!nodos.length || typeof IntersectionObserver === "undefined") return;

    /* La franja central de la pantalla manda: el paso activo es el que está
       delante de los ojos, no el que asoma por abajo. Con `rootMargin` de
       −45 % arriba y abajo queda una banda de un 10 % en el medio, y por ahí
       pasa un paso a la vez. */
    const obs = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (!e.isIntersecting) continue;
          const i = nodos.indexOf(e.target as HTMLLIElement);
          if (i >= 0) setActivo(i);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    nodos.forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, []);

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)] lg:gap-16",
        className,
      )}
    >
      <ol className="flex flex-col">
        {pasos.map((p, i) => (
          <li
            key={p.etiqueta}
            ref={(n) => {
              refs.current[i] = n;
            }}
            className="jv-rule py-8 first:border-t-0 first:pt-0 last:pb-0"
          >
            <p
              className={cn(
                "jv-eyebrow transition-colors duration-base ease-ps",
                i === activo ? "text-brand" : "text-ink-muted",
              )}
            >
              {p.etiqueta}
            </p>
            <p className="mt-3 text-[length:var(--text-h4)] leading-snug text-ink">{p.texto}</p>
            <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-ink-soft">
              {p.pantalla}
            </p>

            {/* En móvil, la ilustración de este paso va aquí mismo. */}
            <div aria-hidden="true" className="mt-6 lg:hidden">
              <Pantalla paso={i} dominio={dominio} enLinea={enLinea} />
            </div>
          </li>
        ))}
      </ol>

      <div aria-hidden="true" className="hidden lg:block">
        <div className="sticky top-28">
          <p className="jv-eyebrow text-ink-muted">{t.rotulo}</p>
          {/* La `key` es lo que hace que cada pantalla vuelva a entrar: sin
              ella React reutiliza los nodos y la animación no se repite. */}
          <div className="mt-4" key={activo}>
            <Pantalla paso={activo} dominio={dominio} enLinea={enLinea} />
          </div>
          <p className="mt-4 font-mono text-xs text-ink-soft">
            {t.ahora}: {pasos[activo]?.etiqueta}
          </p>
        </div>
      </div>
    </div>
  );
}

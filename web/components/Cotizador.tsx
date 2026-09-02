"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Minus,
  Plus,
  RotateCcw,
  Sparkles,
  Store,
  LayoutTemplate,
  Building2,
  Zap,
  Clock,
  CalendarRange,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { WHATSAPP_NUMBER } from "@/lib/contact";
import {
  PAGINAS_BASE,
  INCLUIDO_SIEMPRE,
  INCLUIDO_POR_TIPO,
  TOGGLES,
  togglesFor,
  CONTENIDO_OPCIONES,
  MIGRACION_OPCIONES,
  MARCA_OPCIONES,
  COBRO_OPCIONES,
  SEO_OPCIONES,
  SEO_DETALLE,
  MANTENIMIENTO_OPCIONES,
  MANTENIMIENTO_DETALLE,
  basePages,
  PRICES,
  TYPE_LABEL,
  TYPE_NOUN,
  computeTotals,
  deliveryLabel,
  initialAnswers,
  money,
  type Answers,
  type SiteType,
  type Delivery,
  type ToggleKey,
} from "@/lib/quote";

/**
 * Los pasos NO son los mismos para los tres productos. Antes sí lo eran: a un
 * landing de campaña se le preguntaba si quería blog y pasarela de pago, y a
 * una tienda se le preguntaba si quería cobrar. Cada pregunta que no aplica es
 * una oportunidad de abandonar el cotizador, y una respuesta absurda en la
 * propuesta que llega por WhatsApp.
 */
type Step =
  | { kind: "type" }
  | { kind: "pages" }
  | { kind: "products" }
  | { kind: "cobro" }
  | { kind: "contenido" }
  | { kind: "migracion" }
  | { kind: "marca" }
  | { kind: "setup" }
  | { kind: "features" }
  | { kind: "seo" }
  | { kind: "delivery" }
  | { kind: "mantenimiento" };

const TYPE_OPTIONS: { id: SiteType; label: string; sub: string; icon: typeof Store }[] = [
  {
    id: "landing",
    label: "Landing page",
    sub: "Una página para una campaña, un lanzamiento o un negocio de servicios.",
    icon: LayoutTemplate,
  },
  {
    id: "corp",
    label: "Web corporativa",
    sub: "Varias páginas para presentar la empresa completa.",
    icon: Building2,
  },
  {
    id: "ecom",
    label: "Tienda online",
    sub: "Catálogo, carrito y cobros para vender por internet.",
    icon: Store,
  },
];

const DELIVERY_OPTIONS: { id: Delivery; icon: typeof Zap }[] = [
  { id: "urgent", icon: Zap },
  { id: "standard", icon: Clock },
  { id: "extended", icon: CalendarRange },
];

export function Cotizador() {
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [stepIndex, setStepIndex] = useState(0);
  const [done, setDone] = useState(false);

  const steps = useMemo<Step[]>(() => {
    const s: Step[] = [{ kind: "type" }, { kind: "pages" }];
    // Estos dos solo existen si hay productos que vender.
    if (answers.type === "ecom") s.push({ kind: "products" }, { kind: "cobro" });
    s.push(
      { kind: "contenido" },
      { kind: "migracion" },
      { kind: "marca" },
      { kind: "setup" },
      { kind: "features" },
      { kind: "seo" },
      { kind: "delivery" },
      { kind: "mantenimiento" },
    );
    return s;
  }, [answers.type]);

  const totals = useMemo(() => computeTotals(answers), [answers]);

  const clampedIndex = Math.min(stepIndex, steps.length - 1);
  const step = steps[clampedIndex];
  const isLast = clampedIndex === steps.length - 1;
  const progress = Math.round((clampedIndex / steps.length) * 100);

  const set = <K extends keyof Answers>(key: K, value: Answers[K]) =>
    setAnswers((a) => ({ ...a, [key]: value }));

  const toggle = (key: ToggleKey) =>
    setAnswers((a) => ({ ...a, toggles: { ...a.toggles, [key]: !a.toggles[key] } }));

  const canNext = (() => {
    if (step.kind === "type") return !!answers.type;
    if (step.kind === "pages") return answers.pages >= 1;
    if (step.kind === "products") return answers.productsTierIdx !== null;
    return true;
  })();

  const next = () => {
    if (!canNext) return;
    if (isLast) {
      setDone(true);
      return;
    }
    setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  };
  const prev = () => setStepIndex((i) => Math.max(i - 1, 0));

  const restart = () => {
    setAnswers(initialAnswers);
    setStepIndex(0);
    setDone(false);
  };

  if (done) {
    return <FinalSummary answers={answers} onRestart={restart} />;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_340px] lg:items-start">
      {/* Wizard */}
      <div className="rounded-[1.75rem] border border-line bg-surface p-6 shadow-lift md:p-9">
        {/* Progress */}
        <div className="mb-7">
          <div className="mb-2 flex items-center justify-between font-body text-sm text-ink-soft">
            <span>
              Pregunta {clampedIndex + 1} de {steps.length}
            </span>
            <span className="font-mono">{progress}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-line">
            <div
              className="h-full rounded-full bg-accent transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Step content */}
        <div key={clampedIndex} className="animate-fade-in">
          <StepBody answers={answers} step={step} set={set} toggle={toggle} />
        </div>

        {/* Nav */}
        <div className="mt-8 flex items-center justify-between gap-4">
          <Button
            type="button"
            variant="ghost"
            size="md"
            onClick={prev}
            disabled={clampedIndex === 0}
            className={cn(clampedIndex === 0 && "invisible")}
          >
            <ArrowLeft className="h-4 w-4" /> Anterior
          </Button>
          <Button type="button" variant="primary" size="md" onClick={next} disabled={!canNext}>
            {isLast ? "Ver mi cotización" : "Siguiente"} <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Live summary */}
      <SummaryPanel answers={answers} sticky />
    </div>
  );
}

// ── Piezas reutilizables ──────────────────────────────────────────────────

export function StepHeader({
  title,
  desc,
  children,
}: {
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="font-display text-2xl text-ink md:text-3xl">{title}</h2>
      <p className="mb-6 mt-2 font-body text-sm text-ink-soft">{desc}</p>
      {children}
    </div>
  );
}

/** Lista de puntos con palomita. Es el bloque de "qué incluye". */
export function IncludeList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn("grid gap-2", className)}>
      {items.map((d) => (
        <li key={d} className="flex items-start gap-2 font-body text-sm text-ink-soft">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <span>{d}</span>
        </li>
      ))}
    </ul>
  );
}

/** Caja con título de sección y sus puntos. */
export function IncludeBox({
  title,
  items,
  className,
}: {
  title: string;
  items: string[];
  className?: string;
}) {
  return (
    <div className={cn("rounded-2xl border border-line bg-background/40 p-5", className)}>
      <p className="font-mono text-[11px] uppercase tracking-[.14em] text-ink-soft">{title}</p>
      <IncludeList items={items} className="mt-3 sm:grid-cols-2" />
    </div>
  );
}

/** Opción única dentro de una lista de radio. */
function OptionRow({
  active,
  onClick,
  label,
  desc,
  price,
  priceNote,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  desc: string;
  price: string;
  priceNote?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "flex items-start gap-4 rounded-2xl border p-4 text-left transition-all",
        active
          ? "border-accent bg-accent/10 shadow-soft"
          : "border-line bg-background/40 hover:border-primary/40",
      )}
    >
      <span
        className={cn(
          "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border",
          active ? "border-accent bg-accent text-ink" : "border-line text-transparent",
        )}
      >
        <Check className="h-3 w-3" />
      </span>
      <span className="flex-1">
        <span className="block font-body font-semibold text-ink">{label}</span>
        <span className="mt-0.5 block font-body text-sm text-ink-soft">{desc}</span>
      </span>
      <span className="shrink-0 text-right">
        <span className="block font-mono text-sm text-primary-dark">{price}</span>
        {priceNote && (
          <span className="block font-body text-[11px] text-ink-soft">{priceNote}</span>
        )}
      </span>
    </button>
  );
}

/**
 * Interruptor de sí/no con su desglose plegado. Se pliega a propósito: en la
 * pantalla de funciones hay hasta cinco, y abrir los cinco desglosados de
 * entrada convierte la pregunta en un muro de texto.
 */
function ToggleRow({
  k,
  on,
  onToggle,
  recomendado,
}: {
  k: ToggleKey;
  on: boolean;
  onToggle: () => void;
  recomendado: boolean;
}) {
  const def = TOGGLES[k];
  return (
    <div
      className={cn(
        "rounded-2xl border transition-all",
        on ? "border-accent bg-accent/10 shadow-soft" : "border-line bg-background/40",
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={on}
        className="flex w-full items-start gap-4 p-4 text-left"
      >
        <span
          className={cn(
            "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border",
            on ? "border-accent bg-accent text-ink" : "border-line text-transparent",
          )}
        >
          <Check className="h-3 w-3" />
        </span>
        <span className="flex-1">
          <span className="flex flex-wrap items-center gap-2">
            <span className="font-body font-semibold text-ink">{def.label}</span>
            {recomendado && (
              <span className="rounded-full bg-primary/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-primary-dark">
                Recomendado
              </span>
            )}
          </span>
          <span className="mt-0.5 block font-body text-sm text-ink-soft">{def.desc}</span>
        </span>
        <span className="shrink-0 font-mono text-sm text-primary-dark">
          + {money(def.price)}
        </span>
      </button>

      <details className="group border-t border-line/70 px-4 pb-3">
        <summary className="flex cursor-pointer list-none items-center gap-1.5 pt-3 font-mono text-[11px] uppercase tracking-[.14em] text-ink-soft transition-colors hover:text-ink">
          Qué incluye
          <ChevronDown className="h-3.5 w-3.5 transition-transform group-open:rotate-180" />
        </summary>
        <IncludeList items={def.incluye} className="mt-3" />
      </details>
    </div>
  );
}

// ── El cuerpo de cada paso ────────────────────────────────────────────────

function StepBody({
  answers,
  step,
  set,
  toggle,
}: {
  answers: Answers;
  step: Step;
  set: <K extends keyof Answers>(key: K, value: Answers[K]) => void;
  toggle: (key: ToggleKey) => void;
}) {
  const tipo = answers.type;

  if (step.kind === "type") {
    return (
      <StepHeader
        title="¿Qué tipo de sitio necesitas?"
        desc="De esto dependen las preguntas que siguen: a una tienda no se le pregunta lo mismo que a un landing."
      >
        <div className="grid gap-3">
          {TYPE_OPTIONS.map((o) => {
            const active = answers.type === o.id;
            const Icon = o.icon;
            return (
              <button
                key={o.id}
                type="button"
                onClick={() => {
                  // Al cambiar de tipo, el contador se recoloca en las páginas
                  // que ese tipo ya incluye: si no, arrastra el número anterior.
                  set("type", o.id);
                  set("pages", basePages(o.id));
                }}
                aria-pressed={active}
                className={cn(
                  "flex items-center gap-4 rounded-2xl border p-4 text-left transition-all",
                  active
                    ? "border-accent bg-accent/10 shadow-soft"
                    : "border-line bg-background/40 hover:border-primary/40",
                )}
              >
                <span
                  className={cn(
                    "grid h-11 w-11 shrink-0 place-items-center rounded-xl",
                    active ? "bg-accent text-ink" : "bg-surface text-primary",
                  )}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span className="flex-1">
                  <span className="block font-body font-semibold text-ink">{o.label}</span>
                  <span className="block font-body text-sm text-ink-soft">{o.sub}</span>
                </span>
                <span className="shrink-0 text-right">
                  <span className="block font-mono text-sm text-primary-dark">
                    {money(PRICES.base[o.id])}
                  </span>
                  <span className="block font-body text-[11px] text-ink-soft">
                    {basePages(o.id)} página{basePages(o.id) > 1 ? "s" : ""} incluida
                    {basePages(o.id) > 1 ? "s" : ""}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </StepHeader>
    );
  }

  if (step.kind === "pages") {
    const incluidas = tipo ? PAGINAS_BASE[tipo] : [];
    const minimo = basePages(tipo);
    const extra = Math.max(0, answers.pages - minimo);
    return (
      <StepHeader
        title="¿Cuántas páginas o secciones?"
        desc={`Tu proyecto ya incluye ${minimo === 1 ? "una página" : `${minimo} páginas`}. Cada una adicional suma al presupuesto.`}
      >
        {/* Qué entra por el precio base. Sin esta lista el cliente no sabe qué
            está comprando y suma a mano páginas que ya estaban dentro. */}
        <IncludeBox title="Las páginas que ya vienen" items={incluidas} className="mb-4" />

        {tipo && (
          <IncludeBox
            title={`Y además, en toda ${TYPE_LABEL[tipo].toLowerCase()}`}
            items={INCLUIDO_POR_TIPO[tipo]}
            className="mb-4"
          />
        )}

        <IncludeBox title="En cualquier proyecto" items={INCLUIDO_SIEMPRE} className="mb-5" />

        <div className="flex items-center justify-between rounded-2xl border border-line bg-background/40 p-5">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => set("pages", Math.max(minimo, answers.pages - 1))}
              className="grid h-11 w-11 place-items-center rounded-full border border-line bg-surface text-ink transition-colors hover:border-primary/50 disabled:opacity-40"
              disabled={answers.pages <= minimo}
              aria-label="Quitar página"
            >
              <Minus className="h-5 w-5" />
            </button>
            <span className="w-10 text-center font-display text-3xl text-ink">{answers.pages}</span>
            <button
              type="button"
              onClick={() => set("pages", Math.min(40, answers.pages + 1))}
              className="grid h-11 w-11 place-items-center rounded-full border border-line bg-surface text-ink transition-colors hover:border-primary/50"
              aria-label="Agregar página"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
          <div className="text-right">
            <p className="font-body text-sm text-ink-soft">
              {extra === 0 ? "Las incluidas" : `${extra} adicional${extra > 1 ? "es" : ""}`}
            </p>
            <p className="font-mono text-sm text-primary-dark">
              {extra === 0 ? "Incluidas" : `+ ${money(extra * PRICES.extraPage)}`}
            </p>
          </div>
        </div>
        <p className="mt-3 font-body text-xs text-ink-soft">
          Cada página adicional: {money(PRICES.extraPage)}
        </p>
      </StepHeader>
    );
  }

  if (step.kind === "products") {
    return (
      <StepHeader
        title="¿Cuántos productos vas a vender?"
        desc="El rango define el trabajo de catálogo: cargar, ordenar por categorías y dejar el buscador funcionando."
      >
        <div className="grid gap-3">
          {PRICES.productsTier.map((t, idx) => (
            <OptionRow
              key={t.label}
              active={answers.productsTierIdx === idx}
              onClick={() => set("productsTierIdx", idx)}
              label={t.label}
              desc={
                idx === 0
                  ? "Catálogo pequeño: se carga completo y queda listo."
                  : "Incluye la carga masiva desde una hoja de cálculo."
              }
              price={`+ ${money(t.add)}`}
            />
          ))}
        </div>
        <p className="mt-4 font-body text-xs text-ink-soft">
          Si ya tienes los productos en una hoja de cálculo o en otra plataforma, la carga es más
          rápida. Dínoslo en la llamada.
        </p>
      </StepHeader>
    );
  }

  if (step.kind === "cobro") {
    return (
      <StepHeader
        title="¿Cómo vas a cobrar?"
        desc="Una tienda sin pasarela sigue siendo una tienda: en Colombia mucho comercio cierra el pedido por WhatsApp y cobra por transferencia. Escoge lo que de verdad vas a usar."
      >
        <div className="grid gap-3">
          {COBRO_OPCIONES.map((o) => (
            <OptionRow
              key={o.id}
              active={answers.cobro === o.id}
              onClick={() => set("cobro", o.id)}
              label={o.label}
              desc={o.desc}
              price={PRICES.cobro[o.id] === 0 ? "Incluido" : `+ ${money(PRICES.cobro[o.id])}`}
            />
          ))}
        </div>

        {answers.cobro !== "whatsapp" && (
          <IncludeBox
            title="Qué incluye la pasarela"
            className="mt-4"
            items={[
              "Integración de una pasarela (Wompi, ePayco, Bold o Mercado Pago)",
              "PSE, Nequi, Bancolombia y tarjeta de crédito y débito",
              "Pruebas de compra en modo sandbox y en producción",
              "Pantalla de pago aprobado y de pago rechazado",
              "El pedido se confirma solo cuando el pago se aprueba",
              "No incluye la comisión que cobra la pasarela por transacción",
            ]}
          />
        )}
      </StepHeader>
    );
  }

  if (step.kind === "contenido") {
    const paginas = Math.max(1, answers.pages || 1);
    return (
      <StepHeader
        title="¿Quién escribe los textos y pone las fotos?"
        desc="Es lo que más veces retrasa una entrega. Decidirlo ahora evita que el proyecto quede parado esperando contenido."
      >
        <div className="grid gap-3">
          {CONTENIDO_OPCIONES.map((o) => {
            const tarifa = PRICES.contenido[o.id];
            return (
              <OptionRow
                key={o.id}
                active={answers.contenido === o.id}
                onClick={() => set("contenido", o.id)}
                label={o.label}
                desc={o.desc}
                price={tarifa === 0 ? "Sin costo" : `+ ${money(tarifa * paginas)}`}
                priceNote={tarifa === 0 ? undefined : `${money(tarifa)} × ${paginas} pág.`}
              />
            );
          })}
        </div>

        {answers.contenido !== "cliente" && (
          <IncludeBox
            title="Qué incluye"
            className="mt-4"
            items={
              answers.contenido === "todo"
                ? [
                    "Cada página escrita para lo que esa página tiene que lograr",
                    "Titulares, textos de apoyo y llamados a la acción",
                    "Imágenes de banco con licencia comercial, ya pagada",
                    "Guía de fotos con el celular: qué tomar, desde dónde y con qué luz",
                    "Retoque de las fotos que nos mandes: recorte, luz, color y peso",
                    "Dos rondas de ajustes sobre los textos entregados",
                  ]
                : [
                    "Cada página escrita para lo que esa página tiene que lograr",
                    "Titulares, textos de apoyo y llamados a la acción",
                    "Revisión de ortografía y de coherencia de marca",
                    "Retoque de las fotos que nos mandes: recorte, luz, color y peso",
                    "Dos rondas de ajustes sobre los textos entregados",
                  ]
            }
          />
        )}

        {/* Decirlo antes de vender evita la pelea de despues: no hacemos
            sesion de fotos, y las imagenes de banco no muestran SU negocio. */}
        {answers.contenido === "todo" && (
          <div className="mt-4 rounded-2xl border border-line bg-background/40 p-5">
            <p className="font-mono text-[11px] uppercase tracking-[.14em] text-ink-soft">
              Lo que no incluye
            </p>
            <p className="mt-3 font-body text-sm text-ink-soft">
              <strong className="text-ink">No hacemos sesión de fotos de tu negocio.</strong>{" "}
              Las imágenes de banco sirven para ilustrar ideas, pero no pueden mostrar tu local,
              tu equipo ni tu producto — y esas son justo las que generan confianza.
            </p>
            <p className="mt-2 font-body text-sm text-ink-soft">
              La salida que funciona: <strong className="text-ink">las tomas tú con el celular</strong>{" "}
              siguiendo la guía que te damos, y nosotros las arreglamos. Un teléfono de hoy con
              buena luz da mejor resultado que una foto de banco que se nota comprada. Si
              prefieres un fotógrafo profesional, te ayudamos a conseguirlo y se cotiza aparte.
            </p>
            <a
              href="/guia-fotos-celular.html"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 font-body text-sm font-medium text-primary-dark underline underline-offset-4 transition-colors hover:text-primary"
            >
              Ver la guía de fotos con el celular
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        )}
      </StepHeader>
    );
  }

  if (step.kind === "migracion") {
    return (
      <StepHeader
        title="¿Ya tienes página web?"
        desc="Si la hay, hay que decidir qué se trae y cómo se redirige lo viejo para no perder lo que ya posiciona."
      >
        <div className="grid gap-3">
          {MIGRACION_OPCIONES.map((o) => (
            <OptionRow
              key={o.id}
              active={answers.migracion === o.id}
              onClick={() => set("migracion", o.id)}
              label={o.label}
              desc={o.desc}
              price={
                PRICES.migracion[o.id] === 0 ? "Sin costo" : `+ ${money(PRICES.migracion[o.id])}`
              }
            />
          ))}
        </div>

        {answers.migracion === "migrar" && (
          <IncludeBox
            title="Qué incluye la migración"
            className="mt-4"
            items={[
              "Traslado de textos, imágenes, productos o artículos del sitio actual",
              "Redirecciones 301 de las URLs viejas a las nuevas",
              "Revisión de que no queden enlaces rotos ni páginas huérfanas",
              "Comparación de posiciones antes y después, para detectar caídas",
            ]}
          />
        )}
      </StepHeader>
    );
  }

  if (step.kind === "marca") {
    return (
      <StepHeader
        title="¿Cómo está tu marca hoy?"
        desc="Sin colores ni tipografías definidas, el sitio se diseña dos veces: primero a ojo y después cuando aparece el logo de verdad."
      >
        <div className="grid gap-3">
          {MARCA_OPCIONES.map((o) => (
            <OptionRow
              key={o.id}
              active={answers.marca === o.id}
              onClick={() => set("marca", o.id)}
              label={o.label}
              desc={o.desc}
              price={PRICES.marca[o.id] === 0 ? "Sin costo" : `+ ${money(PRICES.marca[o.id])}`}
            />
          ))}
        </div>

        {answers.marca !== "completa" && (
          <IncludeBox
            title="Qué incluye"
            className="mt-4"
            items={
              answers.marca === "nada"
                ? [
                    "Logotipo con sus variantes: horizontal, monograma, claro y oscuro",
                    "Paleta de color con los códigos exactos, revisada para contraste",
                    "Tipografías y escala de tamaños",
                    "Manual de uso básico, para que quien sea lo aplique igual",
                    "Archivos editables entregados a tu nombre",
                  ]
                : [
                    "Paleta de color derivada de tu logo, con contraste revisado",
                    "Tipografías que combinan con el logo que ya tienes",
                    "Estilo de botones, tarjetas, íconos y fotografía del sitio",
                    "Versiones del logo para fondo claro y oscuro, si faltan",
                  ]
            }
          />
        )}
      </StepHeader>
    );
  }

  if (step.kind === "setup") {
    const keys = togglesFor(tipo, "setup");
    return (
      <StepHeader
        title="¿Qué necesitas para salir al aire?"
        desc="Marca lo que no tengas todavía. Si ya tienes dominio o alojamiento propios, déjalo sin marcar y lo conectamos sin costo."
      >
        <div className="grid gap-3">
          {keys.map((k) => (
            <ToggleRow
              key={k}
              k={k}
              on={answers.toggles[k]}
              onToggle={() => toggle(k)}
              recomendado={!!tipo && !!TOGGLES[k].recomendadoEn?.includes(tipo)}
            />
          ))}
        </div>
      </StepHeader>
    );
  }

  if (step.kind === "features") {
    const keys = togglesFor(tipo, "features");
    return (
      <StepHeader
        title={`¿Qué más necesita tu ${tipo ? TYPE_NOUN[tipo] : "sitio"}?`}
        desc="Estas opciones cambian según el tipo de proyecto que elegiste: solo aparece lo que tiene sentido para él. Puedes marcar varias o ninguna."
      >
        <div className="grid gap-3">
          {keys.map((k) => (
            <ToggleRow
              key={k}
              k={k}
              on={answers.toggles[k]}
              onToggle={() => toggle(k)}
              recomendado={!!tipo && !!TOGGLES[k].recomendadoEn?.includes(tipo)}
            />
          ))}
        </div>
        <p className="mt-4 font-body text-xs text-ink-soft">
          ¿Necesitas algo que no está en la lista? Se cotiza aparte en la llamada: hacemos software
          a medida, no solo sitios.
        </p>
      </StepHeader>
    );
  }

  if (step.kind === "seo") {
    return (
      <StepHeader
        title="¿Quieres que te encuentren en Google?"
        desc="Esto es el trabajo de una sola vez que se entrega con el sitio. El posicionamiento mensual es otro servicio y se cotiza aparte."
      >
        <div className="grid gap-3">
          {SEO_OPCIONES.map((o) => (
            <OptionRow
              key={o.id}
              active={answers.seo === o.id}
              onClick={() => set("seo", o.id)}
              label={o.label}
              desc={o.desc}
              price={PRICES.seo[o.id] === 0 ? "Sin costo" : `+ ${money(PRICES.seo[o.id])}`}
            />
          ))}
        </div>

        <IncludeBox title="Qué incluye" items={SEO_DETALLE[answers.seo]} className="mt-4" />

        <div className="mt-4">
          <ToggleRow
            k="analytics"
            on={answers.toggles.analytics}
            onToggle={() => toggle("analytics")}
            recomendado
          />
        </div>

        <p className="mt-4 rounded-2xl border border-line bg-background/40 p-4 font-body text-xs text-ink-soft">
          <strong className="text-ink">Ojo con la promesa fácil:</strong> nadie puede garantizarte
          el primer puesto en Google, y quien te lo prometa por escrito te está mintiendo. Esto deja
          el sitio listo para competir; subir posiciones es trabajo mensual, y lo cotizas en la
          pestaña de SEO.
        </p>
      </StepHeader>
    );
  }

  if (step.kind === "mantenimiento") {
    return (
      <StepHeader
        title="¿Quieres que sigamos cuidándolo?"
        desc="Es mensual y va aparte del precio del proyecto. Puedes empezar sin plan y contratarlo después."
      >
        <div className="grid gap-3">
          {MANTENIMIENTO_OPCIONES.map((o) => (
            <OptionRow
              key={o.id}
              active={answers.mantenimiento === o.id}
              onClick={() => set("mantenimiento", o.id)}
              label={o.label}
              desc={o.desc}
              price={
                PRICES.mantenimiento[o.id] === 0
                  ? "Sin costo"
                  : `${money(PRICES.mantenimiento[o.id])}`
              }
              priceNote={PRICES.mantenimiento[o.id] === 0 ? undefined : "al mes"}
            />
          ))}
        </div>

        <IncludeBox
          title="Qué incluye"
          items={MANTENIMIENTO_DETALLE[answers.mantenimiento]}
          className="mt-4"
        />
      </StepHeader>
    );
  }

  // delivery
  return (
    <StepHeader
      title="¿Para cuándo lo necesitas?"
      desc="Los plazos se ajustan al tipo de proyecto que elegiste. Entregar más rápido sube el precio; con más tiempo, baja."
    >
      <div className="grid gap-3">
        {DELIVERY_OPTIONS.map((o) => {
          const conf = PRICES.delivery[o.id];
          const active = answers.delivery === o.id;
          const Icon = o.icon;
          const tag =
            conf.mod > 0
              ? `+${Math.round(conf.mod * 100)}%`
              : conf.mod < 0
                ? `${Math.round(conf.mod * 100)}%`
                : "Sin recargo";
          return (
            <button
              key={o.id}
              type="button"
              onClick={() => set("delivery", o.id)}
              aria-pressed={active}
              className={cn(
                "flex items-center gap-4 rounded-2xl border p-4 text-left transition-all",
                active
                  ? "border-accent bg-accent/10 shadow-soft"
                  : "border-line bg-background/40 hover:border-primary/40",
              )}
            >
              <span
                className={cn(
                  "grid h-11 w-11 shrink-0 place-items-center rounded-xl",
                  active ? "bg-accent text-ink" : "bg-surface text-primary",
                )}
              >
                <Icon className="h-5 w-5" />
              </span>
              <span className="flex-1 font-body font-medium text-ink">
                {deliveryLabel(answers.type, o.id)}
              </span>
              <span
                className={cn(
                  "font-mono text-sm",
                  conf.mod > 0 ? "text-warning" : conf.mod < 0 ? "text-success" : "text-ink-soft",
                )}
              >
                {tag}
              </span>
            </button>
          );
        })}
      </div>
      <p className="mt-4 font-body text-xs text-ink-soft">
        Las semanas se cuentan desde que tengamos el contenido y la marca. Si los textos los
        escribimos nosotros, ese tiempo ya está contado.
      </p>
    </StepHeader>
  );
}

export function ChoiceCard({
  active,
  onClick,
  title,
  note,
  bullet,
  tone,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  note: string;
  bullet: string;
  tone: "yes" | "no";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-2xl border p-5 text-left transition-all",
        active
          ? "border-accent bg-accent/10 shadow-soft"
          : "border-line bg-background/40 hover:border-primary/40",
      )}
    >
      <span className="flex items-center justify-between">
        <span className="font-body font-semibold text-ink">{title}</span>
        <span
          className={cn(
            "grid h-6 w-6 place-items-center rounded-full border",
            active ? "border-accent bg-accent text-ink" : "border-line text-transparent",
          )}
        >
          <Check className="h-3.5 w-3.5" />
        </span>
      </span>
      <span
        className={cn(
          "mt-1 block font-mono text-sm",
          tone === "yes" ? "text-primary-dark" : "text-ink-soft",
        )}
      >
        {note}
      </span>
      <span className="mt-2 block font-body text-xs text-ink-soft">{bullet}</span>
    </button>
  );
}

function SummaryPanel({ answers, sticky }: { answers: Answers; sticky?: boolean }) {
  const t = computeTotals(answers);
  return (
    <aside
      className={cn(
        "rounded-[1.75rem] border border-line bg-surface p-6 shadow-soft",
        sticky && "lg:sticky lg:top-28",
      )}
    >
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-accent" />
        <h3 className="font-display text-xl text-ink">Tu cotización</h3>
      </div>

      <dl className="mt-5 space-y-2.5">
        {t.items.length === 0 && (
          <p className="font-body text-sm text-ink-soft">
            Empieza eligiendo el tipo de sitio. El total se calcula al instante.
          </p>
        )}
        {t.items.map((it) => (
          <div key={it.label} className="flex items-start justify-between gap-3">
            <dt className="font-body text-sm text-ink-soft">{it.label}</dt>
            <dd className="shrink-0 font-mono text-sm text-ink">{money(it.amount)}</dd>
          </div>
        ))}
        {t.deliveryAdjustment !== 0 && (
          <div className="flex items-start justify-between gap-3">
            <dt className="font-body text-sm text-ink-soft">
              Ajuste por entrega{" "}
              {PRICES.delivery[answers.delivery].mod > 0 ? "(urgente)" : "(extendida)"}
            </dt>
            <dd
              className={cn(
                "shrink-0 font-mono text-sm",
                t.deliveryAdjustment > 0 ? "text-warning" : "text-success",
              )}
            >
              {t.deliveryAdjustment > 0 ? "+ " : "- "}
              {money(Math.abs(t.deliveryAdjustment))}
            </dd>
          </div>
        )}
      </dl>

      <div className="mt-5 space-y-2 border-t border-line pt-5">
        <div className="flex items-center justify-between font-body text-sm text-ink-soft">
          <span>Subtotal</span>
          <span className="font-mono text-ink">{money(t.subtotal)}</span>
        </div>
        <div className="flex items-end justify-between pt-1">
          <span className="font-body text-sm font-medium text-ink">Total del proyecto</span>
          <span className="font-display text-2xl text-primary-dark">{money(t.total)}</span>
        </div>
      </div>

      {/* El mensual va SEPARADO del total a propósito: sumarlos infla el número
          de entrada y hace creer que el mantenimiento es un pago único. */}
      {t.monthly > 0 && (
        <div className="mt-4 rounded-2xl border border-line bg-background/40 p-4">
          <div className="flex items-end justify-between gap-3">
            <span className="font-body text-sm text-ink-soft">{t.monthlyLabel}</span>
            <span className="shrink-0 font-mono text-base text-ink">
              {money(t.monthly)}
              <span className="font-body text-xs text-ink-soft"> /mes</span>
            </span>
          </div>
          <p className="mt-1 font-body text-[11px] text-ink-soft">
            Aparte del proyecto. Empieza al mes siguiente de la entrega.
          </p>
        </div>
      )}

      <p className="mt-4 font-body text-xs text-ink-soft">
        Es un estimado de referencia. El precio final se confirma tras una llamada de diagnóstico.
      </p>
    </aside>
  );
}

function buildWhatsAppMessage(answers: Answers): string {
  const t = computeTotals(answers);
  const lines: string[] = [];
  lines.push("Cotización web — JV Agencia");
  lines.push("");
  lines.push(`Tipo de sitio: ${answers.type ? TYPE_LABEL[answers.type] : "—"}`);
  lines.push(`Páginas/secciones: ${answers.pages}`);
  if (answers.type === "ecom") {
    if (answers.productsTierIdx !== null) {
      lines.push(`Catálogo: ${PRICES.productsTier[answers.productsTierIdx].label}`);
    }
    lines.push(`Cobro: ${COBRO_OPCIONES.find((o) => o.id === answers.cobro)?.label ?? "—"}`);
  }
  lines.push(
    `Contenido: ${CONTENIDO_OPCIONES.find((o) => o.id === answers.contenido)?.label ?? "—"}`,
  );
  lines.push(`Marca: ${MARCA_OPCIONES.find((o) => o.id === answers.marca)?.label ?? "—"}`);
  lines.push("");
  lines.push("Incluye:");
  for (const it of t.items) lines.push(`• ${it.label} — ${money(it.amount)}`);
  lines.push("");
  lines.push(`Entrega: ${deliveryLabel(answers.type, answers.delivery)}`);
  lines.push("");
  lines.push(`Total del proyecto: ${money(t.total)}`);
  if (t.monthly > 0) {
    lines.push(`${t.monthlyLabel}: ${money(t.monthly)}/mes (aparte)`);
  }
  lines.push("");
  lines.push("Quiero avanzar con este proyecto. ¿Agendamos la llamada?");
  return lines.join("\n");
}

function FinalSummary({ answers, onRestart }: { answers: Answers; onRestart: () => void }) {
  const t = computeTotals(answers);
  const tipo = answers.type;
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    buildWhatsAppMessage(answers),
  )}`;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_340px] lg:items-start">
      <div className="rounded-[1.75rem] border border-line bg-surface p-6 shadow-lift md:p-9">
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-success/15 text-success">
            <Check className="h-6 w-6" />
          </span>
          <div>
            <h2 className="font-display text-2xl text-ink md:text-3xl">Tu cotización está lista</h2>
            <p className="font-body text-sm text-ink-soft">Este es el estimado de tu proyecto.</p>
          </div>
        </div>

        <div className="mt-7 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary-dark via-primary to-[#7a4a30] p-6 text-surface shadow-soft">
          <p className="font-body text-sm text-surface/80">Total del proyecto</p>
          <p className="mt-1 font-display text-4xl">{money(t.total)}</p>
          {t.monthly > 0 && (
            <p className="mt-3 border-t border-surface/20 pt-3 font-body text-sm text-surface/80">
              Más {money(t.monthly)} al mes de {t.monthlyLabel.toLowerCase()}, desde el mes
              siguiente a la entrega.
            </p>
          )}
        </div>

        <dl className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-line bg-line">
          {t.items.map((it) => (
            <div
              key={it.label}
              className="flex items-center justify-between gap-4 bg-surface px-5 py-3"
            >
              <dt className="font-body text-sm text-ink-soft">{it.label}</dt>
              <dd className="font-mono text-sm text-ink">{money(it.amount)}</dd>
            </div>
          ))}
          <div className="flex items-center justify-between gap-4 bg-surface px-5 py-3">
            <dt className="font-body text-sm text-ink-soft">Entrega</dt>
            <dd className="font-body text-sm text-ink">
              {deliveryLabel(answers.type, answers.delivery)}
            </dd>
          </div>
        </dl>

        {/* Lo que entra sin costo. Va al final a propósito: después de ver el
            precio es cuando el cliente pregunta "¿y esto qué trae?". */}
        <div className="mt-6 grid gap-4">
          <IncludeBox title="Va incluido, sin costo aparte" items={INCLUIDO_SIEMPRE} />
          {tipo && (
            <IncludeBox
              title={`Y en tu ${TYPE_NOUN[tipo]}, además`}
              items={INCLUIDO_POR_TIPO[tipo]}
            />
          )}
          {t.monthly > 0 && (
            <IncludeBox title={`${t.monthlyLabel} · cada mes`} items={t.monthlyDetalle} />
          )}
        </div>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="primary" size="lg" className="flex-1">
            <a href={waHref} target="_blank" rel="noopener noreferrer">
              Enviar por WhatsApp <ArrowRight className="h-5 w-5" />
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="/#contacto">Agendar llamada</a>
          </Button>
        </div>
        <button
          type="button"
          onClick={onRestart}
          className="mt-4 inline-flex items-center gap-2 font-body text-sm text-ink-soft transition-colors hover:text-ink"
        >
          <RotateCcw className="h-4 w-4" /> Cotizar otro proyecto
        </button>

        <p className="mt-6 font-body text-xs text-ink-soft">
          Es un estimado de referencia. El alcance y el precio final se confirman en una llamada de
          diagnóstico sin costo.
        </p>
      </div>

      <SummaryPanel answers={answers} sticky />
    </div>
  );
}

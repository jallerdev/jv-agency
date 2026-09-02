"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Minus,
  Plus,
  RotateCcw,
  Search,
  MapPin,
  TrendingUp,
  Swords,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { WHATSAPP_NUMBER } from "@/lib/contact";
import { StepHeader, IncludeBox, IncludeList } from "@/components/Cotizador";
import {
  SEO_PRICES,
  SEO_PLAN_LABEL,
  SEO_PLAN_DESC,
  SEO_PLAN_DETALLE,
  SEO_PLAN_CONTENIDOS,
  SEO_EXTRA_DETALLE,
  SEO_HONESTY_NOTE,
  computeSeoTotals,
  seoContenidosTotales,
  initialSeoAnswers,
  money,
  type SeoAnswers,
  type SeoPlan,
} from "@/lib/quote";

type Step = "plan" | "alcance" | "arranque";
const STEPS: Step[] = ["plan", "alcance", "arranque"];

const PLAN_OPTIONS: { id: SeoPlan; icon: typeof MapPin }[] = [
  { id: "local", icon: MapPin },
  { id: "crecimiento", icon: TrendingUp },
  { id: "competido", icon: Swords },
];

export function CotizadorSeo() {
  const [answers, setAnswers] = useState<SeoAnswers>(initialSeoAnswers);
  const [stepIndex, setStepIndex] = useState(0);
  const [done, setDone] = useState(false);

  const totals = useMemo(() => computeSeoTotals(answers), [answers]);

  const step = STEPS[stepIndex];
  const isLast = stepIndex === STEPS.length - 1;
  const progress = Math.round((stepIndex / STEPS.length) * 100);

  const set = <K extends keyof SeoAnswers>(key: K, value: SeoAnswers[K]) =>
    setAnswers((a) => ({ ...a, [key]: value }));

  const canNext = step === "plan" ? !!answers.plan : true;

  const next = () => {
    if (!canNext) return;
    if (isLast) {
      setDone(true);
      return;
    }
    setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
  };
  const prev = () => setStepIndex((i) => Math.max(i - 1, 0));
  const restart = () => {
    setAnswers(initialSeoAnswers);
    setStepIndex(0);
    setDone(false);
  };

  if (done) return <SeoFinal answers={answers} onRestart={restart} />;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_340px] lg:items-start">
      <div className="rounded-[1.75rem] border border-line bg-surface p-6 shadow-lift md:p-9">
        <div className="mb-7">
          <div className="mb-2 flex items-center justify-between font-body text-sm text-ink-soft">
            <span>
              Pregunta {stepIndex + 1} de {STEPS.length}
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

        <div key={stepIndex} className="animate-fade-in">
          <SeoStepBody answers={answers} step={step} set={set} />
        </div>

        <div className="mt-8 flex items-center justify-between gap-4">
          <Button
            type="button"
            variant="ghost"
            size="md"
            onClick={prev}
            disabled={stepIndex === 0}
            className={cn(stepIndex === 0 && "invisible")}
          >
            <ArrowLeft className="h-4 w-4" /> Anterior
          </Button>
          <Button type="button" variant="primary" size="md" onClick={next} disabled={!canNext}>
            {isLast ? "Ver mi propuesta" : "Siguiente"} <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <SeoSummary answers={answers} sticky />
    </div>
  );
}

// ── Contador reutilizable ────────────────────────────────────────────────

function Counter({
  value,
  min,
  max,
  onChange,
  label,
  note,
  aside,
}: {
  value: number;
  min: number;
  max: number;
  onChange: (n: number) => void;
  label: string;
  note: string;
  aside: string;
}) {
  return (
    <div className="rounded-2xl border border-line bg-background/40 p-5">
      <p className="font-body font-semibold text-ink">{label}</p>
      <p className="mt-1 font-body text-sm text-ink-soft">{note}</p>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => onChange(Math.max(min, value - 1))}
            disabled={value <= min}
            className="grid h-11 w-11 place-items-center rounded-full border border-line bg-surface text-ink transition-colors hover:border-primary/50 disabled:opacity-40"
            aria-label={`Quitar de ${label}`}
          >
            <Minus className="h-5 w-5" />
          </button>
          <span className="w-10 text-center font-display text-3xl text-ink">{value}</span>
          <button
            type="button"
            onClick={() => onChange(Math.min(max, value + 1))}
            disabled={value >= max}
            className="grid h-11 w-11 place-items-center rounded-full border border-line bg-surface text-ink transition-colors hover:border-primary/50 disabled:opacity-40"
            aria-label={`Agregar a ${label}`}
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
        <p className="text-right font-mono text-sm text-primary-dark">{aside}</p>
      </div>
    </div>
  );
}

function SeoToggle({
  on,
  onToggle,
  label,
  desc,
  price,
  incluye,
}: {
  on: boolean;
  onToggle: () => void;
  label: string;
  desc: string;
  price: number;
  incluye: string[];
}) {
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
          <span className="block font-body font-semibold text-ink">{label}</span>
          <span className="mt-0.5 block font-body text-sm text-ink-soft">{desc}</span>
        </span>
        <span className="shrink-0 text-right">
          <span className="block font-mono text-sm text-primary-dark">+ {money(price)}</span>
          <span className="block font-body text-[11px] text-ink-soft">una sola vez</span>
        </span>
      </button>
      <details className="group border-t border-line/70 px-4 pb-3">
        <summary className="flex cursor-pointer list-none items-center gap-1.5 pt-3 font-mono text-[11px] uppercase tracking-[.14em] text-ink-soft transition-colors hover:text-ink">
          Qué incluye
          <ChevronDown className="h-3.5 w-3.5 transition-transform group-open:rotate-180" />
        </summary>
        <IncludeList items={incluye} className="mt-3" />
      </details>
    </div>
  );
}

// ── Los pasos ────────────────────────────────────────────────────────────

function SeoStepBody({
  answers,
  step,
  set,
}: {
  answers: SeoAnswers;
  step: Step;
  set: <K extends keyof SeoAnswers>(key: K, value: SeoAnswers[K]) => void;
}) {
  if (step === "plan") {
    return (
      <StepHeader
        title="¿Qué tan peleada está tu categoría?"
        desc="El plan se escoge por lo difícil que sea la competencia, no por el tamaño de la empresa. Un salón de barrio y una clínica estética compiten en ligas distintas."
      >
        <div className="grid gap-3">
          {PLAN_OPTIONS.map((o) => {
            const active = answers.plan === o.id;
            const Icon = o.icon;
            return (
              <button
                key={o.id}
                type="button"
                onClick={() => set("plan", o.id)}
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
                  <span className="block font-body font-semibold text-ink">
                    {SEO_PLAN_LABEL[o.id]}
                  </span>
                  <span className="block font-body text-sm text-ink-soft">
                    {SEO_PLAN_DESC[o.id]}
                  </span>
                </span>
                <span className="shrink-0 text-right">
                  <span className="block font-mono text-sm text-primary-dark">
                    {money(SEO_PRICES.plan[o.id])}
                  </span>
                  <span className="block font-body text-[11px] text-ink-soft">al mes</span>
                </span>
              </button>
            );
          })}
        </div>

        {answers.plan && (
          <IncludeBox
            title={`Plan ${SEO_PLAN_LABEL[answers.plan]} · cada mes`}
            items={SEO_PLAN_DETALLE[answers.plan]}
            className="mt-4"
          />
        )}

        <p className="mt-4 rounded-2xl border border-line bg-background/40 p-4 font-body text-xs text-ink-soft">
          <strong className="text-ink">Por qué no hay un plan de $300.000:</strong> en Colombia,
          por debajo de {money(500000)} al mes lo que se vende casi siempre es granja de enlaces,
          contenido de IA sin revisar o auditorías automáticas. Eso no posiciona y sí puede
          penalizarte. Preferimos no ofrecerlo.
        </p>
      </StepHeader>
    );
  }

  if (step === "alcance") {
    const plan = answers.plan;
    const ciudadesExtra = Math.max(0, answers.ciudades - 1);
    const incluidos = plan ? SEO_PLAN_CONTENIDOS[plan] : 0;
    return (
      <StepHeader
        title="¿Hasta dónde quieres llegar?"
        desc="Cada ciudad nueva es un frente aparte: sus búsquedas, sus páginas y su competencia local. El contenido es lo que hace que aparezcas por más cosas."
      >
        <div className="grid gap-3">
          <Counter
            label="Ciudades donde quieres aparecer"
            note="La primera va incluida en el plan. Cada una adicional suma trabajo de contenido local y de ficha."
            value={answers.ciudades}
            min={1}
            max={10}
            onChange={(n) => set("ciudades", n)}
            aside={
              ciudadesExtra === 0
                ? "Incluida"
                : `+ ${money(ciudadesExtra * SEO_PRICES.ciudadExtra)} /mes`
            }
          />

          <Counter
            label="Contenidos adicionales al mes"
            note={`Tu plan ya trae ${incluidos} al mes. Cada artículo extra ataca una búsqueda más.`}
            value={answers.contenidoExtra}
            min={0}
            max={12}
            onChange={(n) => set("contenidoExtra", n)}
            aside={
              answers.contenidoExtra === 0
                ? "Los del plan"
                : `+ ${money(answers.contenidoExtra * SEO_PRICES.contenidoExtraUnidad)} /mes`
            }
          />
        </div>

        {plan && (
          <div className="mt-4 rounded-2xl border border-line bg-background/40 p-5">
            <p className="font-mono text-[11px] uppercase tracking-[.14em] text-ink-soft">
              Con lo que llevas
            </p>
            <p className="mt-2 font-body text-sm text-ink-soft">
              <strong className="text-ink">{seoContenidosTotales(answers)} contenidos al mes</strong>{" "}
              publicados, en{" "}
              <strong className="text-ink">
                {answers.ciudades} ciudad{answers.ciudades > 1 ? "es" : ""}
              </strong>
              . Al año son {seoContenidosTotales(answers) * 12} piezas trabajando por ti, que no
              caducan.
            </p>
          </div>
        )}

        {answers.contenidoExtra > 0 && (
          <IncludeBox
            title="Qué es cada contenido adicional"
            items={SEO_EXTRA_DETALLE.contenidoExtra}
            className="mt-4"
          />
        )}
      </StepHeader>
    );
  }

  // arranque
  return (
    <StepHeader
      title="¿Qué hace falta para arrancar?"
      desc="Son trabajos de una sola vez, al principio. Si el sitio lo hicimos nosotros con SEO técnico incluido, la puesta a punto ya está hecha y la puedes desmarcar."
    >
      <div className="grid gap-3">
        <SeoToggle
          on={answers.puestaApunto}
          onToggle={() => set("puestaApunto", !answers.puestaApunto)}
          label="Puesta a punto inicial"
          desc="Auditoría del sitio y corrección de lo que esté frenando el posicionamiento"
          price={SEO_PRICES.extras.puestaApunto}
          incluye={SEO_EXTRA_DETALLE.puestaApunto}
        />
        <SeoToggle
          on={answers.ficha}
          onToggle={() => set("ficha", !answers.ficha)}
          label="Ficha de Google Business"
          desc="Crearla y verificarla, para salir en el mapa y en las búsquedas locales"
          price={SEO_PRICES.extras.ficha}
          incluye={SEO_EXTRA_DETALLE.ficha}
        />
      </div>

      <p className="mt-4 rounded-2xl border border-line bg-background/40 p-4 font-body text-xs text-ink-soft">
        <strong className="text-ink">Lo que sí y lo que no prometemos.</strong> {SEO_HONESTY_NOTE}
      </p>
    </StepHeader>
  );
}

// ── Resumen ──────────────────────────────────────────────────────────────

function SeoSummary({ answers, sticky }: { answers: SeoAnswers; sticky?: boolean }) {
  const t = computeSeoTotals(answers);
  return (
    <aside
      className={cn(
        "rounded-[1.75rem] border border-line bg-surface p-6 shadow-soft",
        sticky && "lg:sticky lg:top-28",
      )}
    >
      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-accent" />
        <h3 className="font-display text-xl text-ink">Tu plan de SEO</h3>
      </div>

      {!answers.plan && (
        <p className="mt-5 font-body text-sm text-ink-soft">
          Empieza escogiendo el plan. El total se calcula al instante.
        </p>
      )}

      {t.monthlyItems.length > 0 && (
        <>
          <p className="mt-5 font-mono text-[11px] uppercase tracking-[.14em] text-ink-soft">
            Cada mes
          </p>
          <dl className="mt-2 space-y-2.5">
            {t.monthlyItems.map((it) => (
              <div key={it.label} className="flex items-start justify-between gap-3">
                <dt className="font-body text-sm text-ink-soft">{it.label}</dt>
                <dd className="shrink-0 font-mono text-sm text-ink">{money(it.amount)}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-3 flex items-end justify-between border-t border-line pt-3">
            <span className="font-body text-sm font-medium text-ink">Mensualidad</span>
            <span className="font-display text-2xl text-primary-dark">
              {money(t.monthlyTotal)}
              <span className="font-body text-sm text-ink-soft"> /mes</span>
            </span>
          </div>
        </>
      )}

      {t.setupItems.length > 0 && (
        <>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[.14em] text-ink-soft">
            Una sola vez, al arrancar
          </p>
          <dl className="mt-2 space-y-2.5">
            {t.setupItems.map((it) => (
              <div key={it.label} className="flex items-start justify-between gap-3">
                <dt className="font-body text-sm text-ink-soft">{it.label}</dt>
                <dd className="shrink-0 font-mono text-sm text-ink">{money(it.amount)}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
            <span className="font-body text-sm font-medium text-ink">Arranque</span>
            <span className="font-mono text-base text-ink">{money(t.setupTotal)}</span>
          </div>
        </>
      )}

      {answers.plan && (
        <div className="mt-5 rounded-2xl border border-line bg-background/40 p-4">
          <div className="flex items-end justify-between gap-3">
            <span className="font-body text-sm text-ink-soft">Primer pago</span>
            <span className="shrink-0 font-mono text-base text-ink">{money(t.primerPago)}</span>
          </div>
          <p className="mt-1 font-body text-[11px] text-ink-soft">
            Arranque más el primer mes. Del segundo mes en adelante son {money(t.monthlyTotal)}.
          </p>
        </div>
      )}

      <p className="mt-4 font-body text-xs text-ink-soft">
        Los primeros movimientos se ven entre el mes 3 y el 6. No hay permanencia obligatoria:
        avisas con 30 días.
      </p>
    </aside>
  );
}

function buildSeoMessage(answers: SeoAnswers): string {
  const t = computeSeoTotals(answers);
  const lines: string[] = [];
  lines.push("Cotización de SEO — JV Agencia");
  lines.push("");
  lines.push(`Plan: ${answers.plan ? SEO_PLAN_LABEL[answers.plan] : "—"}`);
  lines.push(`Ciudades: ${answers.ciudades}`);
  lines.push(`Contenidos al mes: ${seoContenidosTotales(answers)}`);
  lines.push("");
  if (t.monthlyItems.length > 0) {
    lines.push("Cada mes:");
    for (const it of t.monthlyItems) lines.push(`• ${it.label} — ${money(it.amount)}`);
    lines.push(`Mensualidad: ${money(t.monthlyTotal)}`);
    lines.push("");
  }
  if (t.setupItems.length > 0) {
    lines.push("Una sola vez, al arrancar:");
    for (const it of t.setupItems) lines.push(`• ${it.label} — ${money(it.amount)}`);
    lines.push(`Arranque: ${money(t.setupTotal)}`);
    lines.push("");
  }
  lines.push(`Primer pago: ${money(t.primerPago)}`);
  lines.push("");
  lines.push("Quiero avanzar con el posicionamiento. ¿Agendamos la llamada?");
  return lines.join("\n");
}

function SeoFinal({ answers, onRestart }: { answers: SeoAnswers; onRestart: () => void }) {
  const t = computeSeoTotals(answers);
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    buildSeoMessage(answers),
  )}`;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_340px] lg:items-start">
      <div className="rounded-[1.75rem] border border-line bg-surface p-6 shadow-lift md:p-9">
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-success/15 text-success">
            <Check className="h-6 w-6" />
          </span>
          <div>
            <h2 className="font-display text-2xl text-ink md:text-3xl">Tu plan de SEO</h2>
            <p className="font-body text-sm text-ink-soft">
              Esto es lo que costaría trabajar tu posicionamiento.
            </p>
          </div>
        </div>

        <div className="mt-7 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary-dark via-primary to-[#7a4a30] p-6 text-surface shadow-soft">
          <p className="font-body text-sm text-surface/80">Mensualidad</p>
          <p className="mt-1 font-display text-4xl">
            {money(t.monthlyTotal)}
            <span className="font-body text-lg text-surface/70"> /mes</span>
          </p>
          {t.setupTotal > 0 && (
            <p className="mt-3 border-t border-surface/20 pt-3 font-body text-sm text-surface/80">
              Más {money(t.setupTotal)} de arranque, una sola vez. Primer pago:{" "}
              {money(t.primerPago)}.
            </p>
          )}
        </div>

        {answers.plan && (
          <div className="mt-6 grid gap-4">
            <IncludeBox
              title={`Plan ${SEO_PLAN_LABEL[answers.plan]} · cada mes`}
              items={SEO_PLAN_DETALLE[answers.plan]}
            />
            {answers.puestaApunto && (
              <IncludeBox
                title="Puesta a punto inicial · una vez"
                items={SEO_EXTRA_DETALLE.puestaApunto}
              />
            )}
            {answers.ficha && (
              <IncludeBox
                title="Ficha de Google Business · una vez"
                items={SEO_EXTRA_DETALLE.ficha}
              />
            )}
          </div>
        )}

        <p className="mt-6 rounded-2xl border border-line bg-background/40 p-4 font-body text-sm text-ink-soft">
          <strong className="text-ink">Lo que sí y lo que no prometemos.</strong>{" "}
          {SEO_HONESTY_NOTE}
        </p>

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
          <RotateCcw className="h-4 w-4" /> Empezar de nuevo
        </button>
      </div>

      <SeoSummary answers={answers} sticky />
    </div>
  );
}

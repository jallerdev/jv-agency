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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { WHATSAPP_NUMBER } from "@/lib/contact";
import {
  PRICES,
  TYPE_LABEL,
  computeTotals,
  deliveryLabel,
  initialAnswers,
  money,
  type Answers,
  type SiteType,
  type Delivery,
  type ExtraKey,
} from "@/lib/quote";

type Step =
  | { kind: "type" }
  | { kind: "pages" }
  | { kind: "products" }
  | { kind: "extra"; key: ExtraKey }
  | { kind: "delivery" };

const TYPE_OPTIONS: { id: SiteType; label: string; sub: string; icon: typeof Store }[] = [
  { id: "landing", label: "Landing page", sub: "Una página para una campaña o lanzamiento.", icon: LayoutTemplate },
  { id: "corp", label: "Web corporativa", sub: "Varias secciones para presentar tu negocio.", icon: Building2 },
  { id: "ecom", label: "Tienda online", sub: "Catálogo y cobros para vender por internet.", icon: Store },
];

const EXTRA_STEPS: {
  key: ExtraKey;
  title: string;
  desc: string;
  yesBullet: string;
}[] = [
  { key: "gateway", title: "Cobros en el sitio", desc: "¿Necesitas recibir pagos en línea?", yesBullet: "Integramos una pasarela de pago segura." },
  { key: "email", title: "Correo corporativo", desc: "¿Quieres correos con tu dominio?", yesBullet: "Correos tipo hola@tumarca.com configurados." },
  { key: "domain", title: "Dominio", desc: "¿Necesitas registrar tu dominio?", yesBullet: "Registramos y conectamos tu dominio." },
  { key: "hosting", title: "Hosting", desc: "¿Incluimos hosting y su configuración?", yesBullet: "Alojamiento listo y optimizado para tu sitio." },
  { key: "seo", title: "SEO", desc: "¿Optimización básica para Google?", yesBullet: "Estructura, metadatos y velocidad para posicionar." },
  { key: "lang", title: "Idioma adicional", desc: "¿Una versión en inglés u otro idioma?", yesBullet: "Tu sitio en un segundo idioma." },
  { key: "blog", title: "Blog / Noticias", desc: "¿Vas a publicar contenido con frecuencia?", yesBullet: "Sección de blog autoadministrable." },
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
    if (answers.type === "ecom") s.push({ kind: "products" });
    for (const e of EXTRA_STEPS) s.push({ kind: "extra", key: e.key });
    s.push({ kind: "delivery" });
    return s;
  }, [answers.type]);

  const totals = useMemo(() => computeTotals(answers), [answers]);

  const clampedIndex = Math.min(stepIndex, steps.length - 1);
  const step = steps[clampedIndex];
  const isLast = clampedIndex === steps.length - 1;
  const progress = Math.round((clampedIndex / steps.length) * 100);

  const set = <K extends keyof Answers>(key: K, value: Answers[K]) =>
    setAnswers((a) => ({ ...a, [key]: value }));

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
          <StepBody answers={answers} step={step} set={set} />
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

function StepBody({
  answers,
  step,
  set,
}: {
  answers: Answers;
  step: Step;
  set: <K extends keyof Answers>(key: K, value: Answers[K]) => void;
}) {
  if (step.kind === "type") {
    return (
      <StepHeader title="¿Qué tipo de sitio necesitas?" desc="Elige el formato principal del proyecto.">
        <div className="grid gap-3">
          {TYPE_OPTIONS.map((o) => {
            const active = answers.type === o.id;
            const Icon = o.icon;
            return (
              <button
                key={o.id}
                type="button"
                onClick={() => set("type", o.id)}
                aria-pressed={active}
                className={cn(
                  "flex items-center gap-4 rounded-2xl border p-4 text-left transition-all",
                  active
                    ? "border-accent bg-accent/10 shadow-soft"
                    : "border-line bg-background/40 hover:border-primary/40"
                )}
              >
                <span
                  className={cn(
                    "grid h-11 w-11 shrink-0 place-items-center rounded-xl",
                    active ? "bg-accent text-ink" : "bg-surface text-primary"
                  )}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span className="flex-1">
                  <span className="block font-body font-semibold text-ink">{o.label}</span>
                  <span className="block font-body text-sm text-ink-soft">{o.sub}</span>
                </span>
                <span className="font-mono text-sm text-primary-dark">
                  {money(PRICES.base[o.id])}
                </span>
              </button>
            );
          })}
        </div>
      </StepHeader>
    );
  }

  if (step.kind === "pages") {
    const extra = Math.max(0, answers.pages - 1);
    return (
      <StepHeader
        title="¿Cuántas páginas o secciones?"
        desc="La primera va incluida. Cada página adicional suma al presupuesto."
      >
        <div className="flex items-center justify-between rounded-2xl border border-line bg-background/40 p-5">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => set("pages", Math.max(1, answers.pages - 1))}
              className="grid h-11 w-11 place-items-center rounded-full border border-line bg-surface text-ink transition-colors hover:border-primary/50 disabled:opacity-40"
              disabled={answers.pages <= 1}
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
              {extra === 0 ? "Solo la principal" : `${extra} adicional${extra > 1 ? "es" : ""}`}
            </p>
            <p className="font-mono text-sm text-primary-dark">
              {extra === 0 ? "Incluida" : `+ ${money(extra * PRICES.extraPage)}`}
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
      <StepHeader title="¿Cuántos productos vas a vender?" desc="Elige el rango de tu catálogo.">
        <div className="grid gap-3">
          {PRICES.productsTier.map((t, idx) => {
            const active = answers.productsTierIdx === idx;
            return (
              <button
                key={t.label}
                type="button"
                onClick={() => set("productsTierIdx", idx)}
                aria-pressed={active}
                className={cn(
                  "flex items-center justify-between rounded-2xl border p-4 text-left transition-all",
                  active
                    ? "border-accent bg-accent/10 shadow-soft"
                    : "border-line bg-background/40 hover:border-primary/40"
                )}
              >
                <span className="font-body font-medium text-ink">{t.label}</span>
                <span className="font-mono text-sm text-primary-dark">+ {money(t.add)}</span>
              </button>
            );
          })}
        </div>
      </StepHeader>
    );
  }

  if (step.kind === "extra") {
    const conf = EXTRA_STEPS.find((e) => e.key === step.key)!;
    const value = answers[step.key];
    const price = PRICES.extras[step.key];
    return (
      <StepHeader title={conf.title} desc={conf.desc}>
        <div className="grid gap-3 sm:grid-cols-2">
          <ChoiceCard
            active={value === true}
            onClick={() => set(step.key, true)}
            title="Sí, lo quiero"
            note={`Se suma ${money(price)}`}
            bullet={conf.yesBullet}
            tone="yes"
          />
          <ChoiceCard
            active={value === false}
            onClick={() => set(step.key, false)}
            title="No, gracias"
            note="No suma al presupuesto"
            bullet="Lo puedes agregar más adelante."
            tone="no"
          />
        </div>
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
                active ? "border-accent bg-accent/10 shadow-soft" : "border-line bg-background/40 hover:border-primary/40"
              )}
            >
              <span
                className={cn(
                  "grid h-11 w-11 shrink-0 place-items-center rounded-xl",
                  active ? "bg-accent text-ink" : "bg-surface text-primary"
                )}
              >
                <Icon className="h-5 w-5" />
              </span>
              <span className="flex-1 font-body font-medium text-ink">{deliveryLabel(answers.type, o.id)}</span>
              <span
                className={cn(
                  "font-mono text-sm",
                  conf.mod > 0 ? "text-warning" : conf.mod < 0 ? "text-success" : "text-ink-soft"
                )}
              >
                {tag}
              </span>
            </button>
          );
        })}
      </div>
    </StepHeader>
  );
}

function StepHeader({
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

function ChoiceCard({
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
        active ? "border-accent bg-accent/10 shadow-soft" : "border-line bg-background/40 hover:border-primary/40"
      )}
    >
      <span className="flex items-center justify-between">
        <span className="font-body font-semibold text-ink">{title}</span>
        <span
          className={cn(
            "grid h-6 w-6 place-items-center rounded-full border",
            active ? "border-accent bg-accent text-ink" : "border-line text-transparent"
          )}
        >
          <Check className="h-3.5 w-3.5" />
        </span>
      </span>
      <span
        className={cn(
          "mt-1 block font-mono text-sm",
          tone === "yes" ? "text-primary-dark" : "text-ink-soft"
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
        sticky && "lg:sticky lg:top-28"
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
              Ajuste por entrega {PRICES.delivery[answers.delivery].mod > 0 ? "(urgente)" : "(extendida)"}
            </dt>
            <dd
              className={cn(
                "shrink-0 font-mono text-sm",
                t.deliveryAdjustment > 0 ? "text-warning" : "text-success"
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
          <span className="font-body text-sm font-medium text-ink">Total estimado</span>
          <span className="font-display text-2xl text-primary-dark">{money(t.total)}</span>
        </div>
      </div>

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
  if (answers.type === "ecom" && answers.productsTierIdx !== null) {
    lines.push(`Catálogo: ${PRICES.productsTier[answers.productsTierIdx].label}`);
  }
  lines.push("");
  lines.push("Incluye:");
  for (const it of t.items) lines.push(`• ${it.label} — ${money(it.amount)}`);
  lines.push("");
  lines.push(`Entrega: ${deliveryLabel(answers.type, answers.delivery)}`);
  lines.push("");
  lines.push(`Total estimado: ${money(t.total)}`);
  lines.push("");
  lines.push("Quiero avanzar con este proyecto. ¿Agendamos la llamada?");
  return lines.join("\n");
}

function FinalSummary({ answers, onRestart }: { answers: Answers; onRestart: () => void }) {
  const t = computeTotals(answers);
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    buildWhatsAppMessage(answers)
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
            <p className="font-body text-sm text-ink-soft">
              Este es el estimado de tu proyecto.
            </p>
          </div>
        </div>

        <div className="mt-7 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary-dark via-primary to-[#7a4a30] p-6 text-surface shadow-soft">
          <p className="font-body text-sm text-surface/80">Total estimado</p>
          <p className="mt-1 font-display text-4xl">{money(t.total)}</p>
        </div>

        <dl className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-line bg-line">
          {t.items.map((it) => (
            <div key={it.label} className="flex items-center justify-between gap-4 bg-surface px-5 py-3">
              <dt className="font-body text-sm text-ink-soft">{it.label}</dt>
              <dd className="font-mono text-sm text-ink">{money(it.amount)}</dd>
            </div>
          ))}
          <div className="flex items-center justify-between gap-4 bg-surface px-5 py-3">
            <dt className="font-body text-sm text-ink-soft">Entrega</dt>
            <dd className="font-body text-sm text-ink">{deliveryLabel(answers.type, answers.delivery)}</dd>
          </div>
        </dl>

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

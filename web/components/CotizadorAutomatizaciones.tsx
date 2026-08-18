"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  CalendarCheck,
  Check,
  MessageSquareText,
  RotateCcw,
  ShoppingBag,
  UserSearch,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { StepHeader } from "@/components/Cotizador";
import { cn } from "@/lib/utils";
import { WHATSAPP_NUMBER } from "@/lib/contact";
import {
  A_PLAN_LABEL,
  A_PRICES,
  A_TYPE_DESC,
  A_TYPE_LABEL,
  automationDeliveryLabel,
  computeAutomationTotals,
  initialAutomationAnswers,
  META_BILLING_NOTE,
  money,
  type AutomationAnswers,
  type AutomationExtraKey,
  type AutomationType,
  type Delivery,
  type MaintenancePlan,
} from "@/lib/quote";

// Cinco pasos, no once. El cotizador web pregunta cada extra por separado; acá
// las integraciones van en UNA pantalla de selección múltiple, que para siete
// opciones es más rápido y se abandona menos.
type Paso = "tipo" | "plantillas" | "integraciones" | "mantenimiento" | "plazo";
const PASOS: Paso[] = ["tipo", "plantillas", "integraciones", "mantenimiento", "plazo"];

const TIPOS: { id: AutomationType; icon: typeof Bot }[] = [
  { id: "faq", icon: MessageSquareText },
  { id: "leads", icon: UserSearch },
  { id: "citas", icon: CalendarCheck },
  { id: "pedidos", icon: ShoppingBag },
  { id: "avisos", icon: Bot },
];

const INTEGRACIONES: { key: AutomationExtraKey; title: string; desc: string }[] = [
  { key: "onboarding", title: "Conectar WhatsApp Business", desc: "Damos de alta tu número y hacemos la verificación con Meta." },
  { key: "ia", title: "Respuestas con IA", desc: "Contesta con tu propio contenido en vez de un menú rígido." },
  { key: "crm", title: "Integración con tu CRM", desc: "Cada conversación queda registrada en tu pipeline." },
  { key: "agenda", title: "Google Calendar", desc: "Lee tu disponibilidad real y agenda sin choques." },
  { key: "pagos", title: "Cobro en la conversación", desc: "El cliente paga sin salir del chat." },
  { key: "handoff", title: "Traspaso a una persona", desc: "Cuando se complica, el bot pasa la conversación a tu equipo." },
  { key: "idioma", title: "Idioma adicional", desc: "El flujo completo en un segundo idioma." },
];

const PLANES: MaintenancePlan[] = ["basico", "estandar", "avanzado", "ninguno"];
const PLAZOS: { id: Delivery; icon: typeof Zap }[] = [
  { id: "urgent", icon: Zap },
  { id: "standard", icon: CalendarCheck },
  { id: "extended", icon: Bot },
];

export function CotizadorAutomatizaciones() {
  const [a, setA] = useState<AutomationAnswers>(initialAutomationAnswers);
  const [i, setI] = useState(0);
  const [done, setDone] = useState(false);

  const t = useMemo(() => computeAutomationTotals(a), [a]);
  const paso = PASOS[i];
  const ultimo = i === PASOS.length - 1;
  const progreso = Math.round((i / PASOS.length) * 100);

  const set = <K extends keyof AutomationAnswers>(k: K, v: AutomationAnswers[K]) =>
    setA((p) => ({ ...p, [k]: v }));

  const puedeSeguir = paso === "tipo" ? !!a.type : paso === "plantillas" ? a.plantillas >= 0 : true;

  const reiniciar = () => { setA(initialAutomationAnswers); setI(0); setDone(false); };

  if (done) return <Resumen a={a} onRestart={reiniciar} />;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_340px] lg:items-start">
      <div className="rounded-[1.75rem] border border-line bg-surface p-6 shadow-lift md:p-9">
        <div className="mb-7">
          <div className="mb-2 flex items-center justify-between font-body text-sm text-ink-soft">
            <span>Pregunta {i + 1} de {PASOS.length}</span>
            <span className="font-mono">{progreso}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-line">
            <div className="h-full rounded-full bg-accent transition-all duration-500" style={{ width: `${progreso}%` }} />
          </div>
        </div>

        <div key={i} className="animate-fade-in">
          {paso === "tipo" && (
            <StepHeader title="¿Qué quieres automatizar?" desc="Elige el flujo principal. Después le sumamos integraciones.">
              <div className="grid gap-3 sm:grid-cols-2">
                {TIPOS.map(({ id, icon: Icon }) => (
                  <Opcion
                    key={id}
                    active={a.type === id}
                    onClick={() => set("type", id)}
                    icon={<Icon className="h-5 w-5" />}
                    title={A_TYPE_LABEL[id]}
                    desc={A_TYPE_DESC[id]}
                    right={money(A_PRICES.base[id])}
                  />
                ))}
              </div>
            </StepHeader>
          )}

          {paso === "plantillas" && (
            <StepHeader
              title="¿Cuántas plantillas de mensaje necesitas?"
              desc={`Fuera de la ventana de 24 horas solo se puede escribir con plantillas aprobadas por Meta. Se incluyen ${A_PRICES.plantillasIncluidas}.`}
            >
              <div className="flex items-center gap-4">
                <button type="button" onClick={() => set("plantillas", Math.max(0, a.plantillas - 1))}
                  className="grid h-12 w-12 place-items-center rounded-xl border border-line bg-background/50 font-body text-xl text-ink transition-colors hover:border-primary/40">–</button>
                <span className="w-16 text-center font-display text-4xl text-ink">{a.plantillas}</span>
                <button type="button" onClick={() => set("plantillas", a.plantillas + 1)}
                  className="grid h-12 w-12 place-items-center rounded-xl border border-line bg-background/50 font-body text-xl text-ink transition-colors hover:border-primary/40">+</button>
                <p className="ml-2 font-body text-sm text-ink-soft">
                  {a.plantillas > A_PRICES.plantillasIncluidas
                    ? `${a.plantillas - A_PRICES.plantillasIncluidas} adicional(es) · ${money(A_PRICES.plantillaExtra)} c/u`
                    : "Sin costo adicional"}
                </p>
              </div>
            </StepHeader>
          )}

          {paso === "integraciones" && (
            <StepHeader title="¿Con qué se tiene que conectar?" desc="Marca todo lo que necesites. Puedes dejarlo en blanco.">
              <div className="grid gap-3 sm:grid-cols-2">
                {INTEGRACIONES.map(({ key, title, desc }) => (
                  <Opcion
                    key={key}
                    active={a[key]}
                    onClick={() => set(key, !a[key])}
                    title={title}
                    desc={desc}
                    right={money(A_PRICES.extras[key])}
                  />
                ))}
              </div>
            </StepHeader>
          )}

          {paso === "mantenimiento" && (
            <StepHeader
              title="¿Quién la vigila después?"
              desc="Una automatización queda corriendo: si expira el token de Meta o rechazan una plantilla, deja de responder sin avisar."
            >
              <div className="grid gap-3">
                {PLANES.map((p) => (
                  <Opcion
                    key={p}
                    active={a.mantenimiento === p}
                    onClick={() => set("mantenimiento", p)}
                    title={A_PLAN_LABEL[p].split(" — ")[0]}
                    desc={A_PLAN_LABEL[p].split(" — ")[1] ?? "Queda funcionando, pero sin monitoreo de nuestra parte."}
                    right={A_PRICES.mantenimiento[p] ? `${money(A_PRICES.mantenimiento[p])}/mes` : "—"}
                  />
                ))}
              </div>
            </StepHeader>
          )}

          {paso === "plazo" && (
            <StepHeader title="¿Para cuándo la necesitas?" desc="El plazo ajusta el precio hacia arriba o hacia abajo.">
              <div className="grid gap-3 sm:grid-cols-3">
                {PLAZOS.map(({ id, icon: Icon }) => (
                  <Opcion
                    key={id}
                    active={a.delivery === id}
                    onClick={() => set("delivery", id)}
                    icon={<Icon className="h-5 w-5" />}
                    title={automationDeliveryLabel(a.type, id)}
                    desc={id === "urgent" ? "Reordenamos la agenda." : id === "standard" ? "Nuestro ritmo normal." : "Con holgura, sale más económico."}
                  />
                ))}
              </div>
            </StepHeader>
          )}
        </div>

        <div className="mt-8 flex items-center justify-between gap-4">
          <Button type="button" variant="ghost" size="md" onClick={() => setI((x) => Math.max(x - 1, 0))}
            disabled={i === 0} className={cn(i === 0 && "invisible")}>
            <ArrowLeft className="h-4 w-4" /> Anterior
          </Button>
          <Button type="button" variant="primary" size="md" disabled={!puedeSeguir}
            onClick={() => (ultimo ? setDone(true) : setI((x) => x + 1))}>
            {ultimo ? "Ver mi cotización" : "Siguiente"} <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <Panel a={a} sticky />
    </div>
  );
}

function Opcion({
  active, onClick, title, desc, right, icon,
}: {
  active: boolean; onClick: () => void; title: string; desc?: string; right?: string; icon?: React.ReactNode;
}) {
  return (
    <button type="button" onClick={onClick} aria-pressed={active}
      className={cn(
        "rounded-2xl border p-5 text-left transition-all",
        active ? "border-accent bg-accent/10 shadow-soft" : "border-line bg-background/40 hover:border-primary/40"
      )}>
      <span className="flex items-start justify-between gap-3">
        <span className="flex items-center gap-2.5">
          {icon && <span className={cn("text-accent", !active && "opacity-60")}>{icon}</span>}
          <span className="font-body font-semibold text-ink">{title}</span>
        </span>
        <span className={cn("grid h-6 w-6 shrink-0 place-items-center rounded-full border",
          active ? "border-accent bg-accent text-ink" : "border-line text-transparent")}>
          <Check className="h-3.5 w-3.5" />
        </span>
      </span>
      {desc && <span className="mt-2 block font-body text-xs leading-relaxed text-ink-soft">{desc}</span>}
      {right && <span className="mt-2 block font-mono text-sm text-primary-dark">{right}</span>}
    </button>
  );
}

function Panel({ a, sticky }: { a: AutomationAnswers; sticky?: boolean }) {
  const t = computeAutomationTotals(a);
  return (
    <aside className={cn("rounded-[1.75rem] border border-line bg-surface p-6 shadow-soft", sticky && "lg:sticky lg:top-28")}>
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">Tu estimado</p>
      <p className="mt-3 font-display text-3xl text-ink">{money(t.total)}</p>
      <p className="font-body text-xs text-ink-soft">pago único</p>
      {t.monthly > 0 && (
        <>
          <p className="mt-4 font-display text-xl text-ink">{money(t.monthly)}<span className="font-body text-sm text-ink-soft">/mes</span></p>
          <p className="font-body text-xs text-ink-soft">mantenimiento</p>
        </>
      )}
      {t.items.length > 0 && (
        <dl className="mt-5 space-y-2 border-t border-line pt-4">
          {t.items.map((it) => (
            <div key={it.label} className="flex items-start justify-between gap-3">
              <dt className="font-body text-xs text-ink-soft">{it.label}</dt>
              <dd className="shrink-0 font-mono text-xs text-ink">{money(it.amount)}</dd>
            </div>
          ))}
        </dl>
      )}
      <p className="mt-5 border-t border-line pt-4 font-body text-[11px] leading-relaxed text-ink-soft">
        {META_BILLING_NOTE}
      </p>
    </aside>
  );
}

function mensajeWhatsApp(a: AutomationAnswers): string {
  const t = computeAutomationTotals(a);
  const l = [
    "Hola, cotizé una automatización en la web:",
    "",
    ...t.items.map((it) => `• ${it.label}: ${money(it.amount)}`),
    "",
    `Total: ${money(t.total)}`,
  ];
  if (t.monthly > 0) l.push(`Mantenimiento: ${money(t.monthly)}/mes`);
  l.push(`Plazo: ${automationDeliveryLabel(a.type, a.delivery)}`);
  return l.join("\n");
}

function Resumen({ a, onRestart }: { a: AutomationAnswers; onRestart: () => void }) {
  const t = computeAutomationTotals(a);
  const wa = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensajeWhatsApp(a))}`;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_340px] lg:items-start">
      <div className="rounded-[1.75rem] border border-line bg-surface p-6 shadow-lift md:p-9">
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-success/15 text-success">
            <Check className="h-6 w-6" />
          </span>
          <div>
            <h2 className="font-display text-2xl text-ink md:text-3xl">Tu cotización está lista</h2>
            <p className="font-body text-sm text-ink-soft">Estimado de tu automatización.</p>
          </div>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary-dark via-primary to-[#7a4a30] p-6 text-surface shadow-soft">
            <p className="font-body text-sm text-surface/80">Pago único</p>
            <p className="mt-1 font-display text-4xl">{money(t.total)}</p>
          </div>
          <div className="rounded-2xl border border-line bg-background/60 p-6">
            <p className="font-body text-sm text-ink-soft">Mantenimiento</p>
            <p className="mt-1 font-display text-4xl text-ink">
              {t.monthly > 0 ? money(t.monthly) : "—"}
              {t.monthly > 0 && <span className="font-body text-base text-ink-soft">/mes</span>}
            </p>
          </div>
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
            <dd className="font-body text-sm text-ink">{automationDeliveryLabel(a.type, a.delivery)}</dd>
          </div>
        </dl>

        <p className="mt-5 rounded-xl border border-line bg-background/50 p-4 font-body text-xs leading-relaxed text-ink-soft">
          {META_BILLING_NOTE}
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="primary" size="lg" className="flex-1">
            <a href={wa} target="_blank" rel="noopener noreferrer">
              Enviar por WhatsApp <ArrowRight className="h-5 w-5" />
            </a>
          </Button>
          <Button asChild variant="outline" size="lg"><a href="/#contacto">Agendar llamada</a></Button>
        </div>
        <button type="button" onClick={onRestart}
          className="mt-4 inline-flex items-center gap-2 font-body text-sm text-ink-soft transition-colors hover:text-ink">
          <RotateCcw className="h-4 w-4" /> Cotizar otra
        </button>

        <p className="mt-6 font-body text-xs text-ink-soft">
          Es un estimado de referencia. El alcance final se confirma en una llamada sin costo.
        </p>
      </div>

      <Panel a={a} sticky />
    </div>
  );
}

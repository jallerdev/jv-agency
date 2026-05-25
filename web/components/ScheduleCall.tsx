"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  Check,
  CalendarCheck,
  Loader2,
  RotateCcw,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { WHATSAPP_NUMBER } from "@/lib/contact";

const SERVICES = [
  { id: "web", label: "Desarrollo web" },
  { id: "software", label: "Software a medida" },
  { id: "design", label: "Diseño web / UI" },
  { id: "support", label: "Mantenimiento" },
] as const;

type FieldKey = "service" | "name" | "email" | "phone" | "date" | "time";

const todayISO = () => new Date().toISOString().split("T")[0];

const prettyDate = (iso: string) => {
  if (!iso) return "";
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString("es-CO", { weekday: "long", day: "numeric", month: "long" });
};

export function ScheduleCall() {
  const [service, setService] = useState("");
  const [time, setTime] = useState("");
  const [values, setValues] = useState({ name: "", email: "", phone: "", date: "", note: "" });
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});

  const [slots, setSlots] = useState<string[] | null>(null);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [meetLink, setMeetLink] = useState<string | null>(null);

  // Cargar horarios libres cuando cambia la fecha.
  useEffect(() => {
    if (!values.date) {
      setSlots(null);
      return;
    }
    let cancelled = false;
    setLoadingSlots(true);
    setTime("");
    fetch(`/api/availability?date=${values.date}`)
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        setSlots(Array.isArray(data.slots) ? data.slots : []);
      })
      .catch(() => {
        if (!cancelled) setSlots([]);
      })
      .finally(() => {
        if (!cancelled) setLoadingSlots(false);
      });
    return () => {
      cancelled = true;
    };
  }, [values.date]);

  const set = (key: keyof typeof values, v: string) => {
    setValues((s) => ({ ...s, [key]: v }));
    if (key in errors) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = () => {
    const e: Partial<Record<FieldKey, string>> = {};
    if (!service) e.service = "Elige una opción";
    if (!values.name.trim()) e.name = "Necesitamos tu nombre";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) e.email = "Ingresa un correo válido";
    if (values.phone.replace(/\D/g, "").length < 7) e.phone = "Ingresa un teléfono válido";
    if (!values.date) e.date = "Elige una fecha";
    if (!time) e.time = "Elige una hora";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate() || submitting) return;

    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.phone,
          service: SERVICES.find((s) => s.id === service)?.label ?? service,
          date: values.date,
          time,
          note: values.note,
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.status === 409) {
        // El slot se ocupó mientras tanto: refrescar horarios.
        setSubmitError(data.error || "Ese horario se acaba de ocupar. Elige otro.");
        setTime("");
        const r = await fetch(`/api/availability?date=${values.date}`).then((x) => x.json());
        setSlots(Array.isArray(r.slots) ? r.slots : []);
        return;
      }
      if (!res.ok) {
        setSubmitError(data.error || "No se pudo agendar. Intenta de nuevo o escríbenos por WhatsApp.");
        return;
      }

      setMeetLink(typeof data.meetLink === "string" ? data.meetLink : null);
      setSubmitted(true);
    } catch {
      setSubmitError("No se pudo agendar. Intenta de nuevo o escríbenos por WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setService("");
    setTime("");
    setValues({ name: "", email: "", phone: "", date: "", note: "" });
    setErrors({});
    setSlots(null);
    setSubmitError("");
    setSubmitted(false);
    setMeetLink(null);
  };

  const serviceLabel = SERVICES.find((s) => s.id === service)?.label ?? "";

  const waHref = (() => {
    const msg =
      `Hola J&V Agency 👋 Quiero agendar una llamada.\n\n` +
      `• Nombre: ${values.name}\n` +
      `• Servicio: ${serviceLabel}\n` +
      `• Fecha: ${prettyDate(values.date)}\n` +
      `• Hora: ${time}\n` +
      `• Email: ${values.email}\n` +
      `• Teléfono: ${values.phone}` +
      (values.note.trim() ? `\n• Nota: ${values.note.trim()}` : "");
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  })();

  if (submitted) {
    const firstName = values.name.trim().split(" ")[0] || "";
    return (
      <div className="rounded-[1.75rem] border border-line bg-surface p-8 text-left shadow-lift md:p-10">
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-success/15 text-success">
            <Check className="h-6 w-6" />
          </span>
          <div>
            <h3 className="font-display text-2xl text-ink">¡Listo, {firstName}!</h3>
            <p className="font-body text-sm text-ink-soft">
              {meetLink ? "Tu llamada quedó agendada." : "Recibimos tu solicitud de llamada."}
            </p>
          </div>
        </div>

        <dl className="mt-7 grid gap-px overflow-hidden rounded-2xl border border-line bg-line">
          {[
            ["Servicio", serviceLabel],
            ["Fecha", prettyDate(values.date)],
            ["Hora", time],
            ["Email", values.email],
          ].map(([k, v]) => (
            <div key={k} className="flex items-center justify-between gap-4 bg-surface px-5 py-3">
              <dt className="font-body text-sm text-ink-soft">{k}</dt>
              <dd className="text-right font-body text-sm font-medium capitalize text-ink">{v}</dd>
            </div>
          ))}
        </dl>

        {meetLink ? (
          <>
            <p className="mt-6 font-body text-sm leading-relaxed text-ink-soft">
              Te enviamos la invitación a <span className="text-ink">{values.email}</span> con el
              enlace de Google Meet. También puedes unirte desde aquí:
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="primary" size="md" className="flex-1">
                <a href={meetLink} target="_blank" rel="noopener noreferrer">
                  <Video className="h-5 w-5" /> Unirse a Google Meet
                </a>
              </Button>
              <Button onClick={reset} variant="ghost" size="md" type="button">
                <RotateCcw className="h-4 w-4" /> Agendar otra
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="mt-6 font-body text-sm leading-relaxed text-ink-soft">
              Para confirmar la cita, envíanos los datos por WhatsApp. Te respondemos para cerrar el
              horario.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="primary" size="md" className="flex-1">
                <a href={waHref} target="_blank" rel="noopener noreferrer">
                  Confirmar por WhatsApp <ArrowRight className="h-5 w-5" />
                </a>
              </Button>
              <Button onClick={reset} variant="ghost" size="md" type="button">
                <RotateCcw className="h-4 w-4" /> Agendar otra
              </Button>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-[1.75rem] border border-line bg-surface p-7 text-left shadow-lift md:p-9"
    >
      <div className="mb-2 flex items-center gap-2">
        <CalendarCheck className="h-5 w-5 text-accent" />
        <h3 className="font-display text-2xl text-ink">Agenda tu llamada</h3>
      </div>
      <p className="mb-6 font-body text-sm text-ink-soft">
        Diagnóstico sin costo de 20 minutos por Google Meet. Cuéntanos qué necesitas.
      </p>

      {/* Servicio */}
      <fieldset className="mb-5">
        <legend className="mb-2 font-body text-sm font-medium text-ink">¿En qué te ayudamos?</legend>
        <div className="flex flex-wrap gap-2">
          {SERVICES.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => {
                setService(s.id);
                setErrors((e) => ({ ...e, service: undefined }));
              }}
              className={cn(
                "rounded-full border px-4 py-2 font-body text-sm transition-all",
                service === s.id
                  ? "border-accent bg-accent text-ink shadow-soft"
                  : "border-line bg-background/40 text-ink-soft hover:border-primary/40 hover:text-ink"
              )}
              aria-pressed={service === s.id}
            >
              {s.label}
            </button>
          ))}
        </div>
        {errors.service && <p className="mt-2 font-body text-xs text-danger">{errors.service}</p>}
      </fieldset>

      {/* Nombre + email */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nombre" error={errors.name}>
          <Input
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Tu nombre"
            aria-invalid={!!errors.name}
          />
        </Field>
        <Field label="Correo" error={errors.email}>
          <Input
            type="email"
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="tu@correo.com"
            aria-invalid={!!errors.email}
          />
        </Field>
      </div>

      {/* Teléfono + fecha */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Field label="WhatsApp / teléfono" error={errors.phone}>
          <Input
            type="tel"
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="+57 300 000 0000"
            aria-invalid={!!errors.phone}
          />
        </Field>
        <Field label="Fecha preferida" error={errors.date}>
          <Input
            type="date"
            min={todayISO()}
            value={values.date}
            onChange={(e) => set("date", e.target.value)}
            aria-invalid={!!errors.date}
          />
        </Field>
      </div>

      {/* Hora */}
      <fieldset className="mt-5">
        <legend className="mb-2 font-body text-sm font-medium text-ink">Hora disponible</legend>
        {!values.date ? (
          <p className="font-body text-sm text-ink-soft">Elige una fecha para ver los horarios.</p>
        ) : loadingSlots ? (
          <p className="flex items-center gap-2 font-body text-sm text-ink-soft">
            <Loader2 className="h-4 w-4 animate-spin" /> Buscando horarios disponibles…
          </p>
        ) : slots && slots.length === 0 ? (
          <p className="font-body text-sm text-ink-soft">
            No hay horarios disponibles ese día. Prueba con otra fecha.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {(slots ?? []).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => {
                  setTime(t);
                  setErrors((e) => ({ ...e, time: undefined }));
                }}
                className={cn(
                  "rounded-full border px-4 py-2 font-mono text-sm transition-all",
                  time === t
                    ? "border-accent bg-accent text-ink shadow-soft"
                    : "border-line bg-background/40 text-ink-soft hover:border-primary/40 hover:text-ink"
                )}
                aria-pressed={time === t}
              >
                {t}
              </button>
            ))}
          </div>
        )}
        {errors.time && <p className="mt-2 font-body text-xs text-danger">{errors.time}</p>}
      </fieldset>

      {/* Nota */}
      <div className="mt-5">
        <label className="mb-2 block font-body text-sm font-medium text-ink" htmlFor="note">
          Cuéntanos brevemente <span className="text-ink-soft">(opcional)</span>
        </label>
        <textarea
          id="note"
          value={values.note}
          onChange={(e) => set("note", e.target.value)}
          rows={3}
          placeholder="¿Qué tienes en mente? Un sitio nuevo, un rediseño, una app…"
          className="w-full rounded-2xl border border-line bg-surface px-5 py-3 font-body text-base text-ink placeholder:text-ink-soft/60 transition-colors focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30"
        />
      </div>

      {submitError && (
        <div className="mt-5 rounded-2xl border border-danger/30 bg-danger/10 px-4 py-3">
          <p className="font-body text-sm text-danger">{submitError}</p>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-block font-body text-xs font-medium text-ink underline underline-offset-2"
          >
            O escríbenos por WhatsApp
          </a>
        </div>
      )}

      <Button type="submit" variant="primary" size="lg" className="mt-7 w-full" disabled={submitting}>
        {submitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" /> Agendando…
          </>
        ) : (
          <>
            Agendar llamada <ArrowRight className="h-5 w-5" />
          </>
        )}
      </Button>
      <p className="mt-3 text-center font-body text-xs text-ink-soft">
        Sin compromiso. Recibirás la invitación de Google Meet en tu correo.
      </p>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block font-body text-sm font-medium text-ink">{label}</label>
      {children}
      {error && <p className="mt-1.5 font-body text-xs text-danger">{error}</p>}
    </div>
  );
}

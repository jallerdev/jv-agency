"use client";

import { useEffect, useId, useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  Check,
  CalendarCheck,
  Clock,
  Loader2,
  RotateCcw,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { WHATSAPP_NUMBER } from "@/lib/contact";
import { OPCIONES_SERVICIO } from "@/lib/services";

// Las opciones salen de lib/services.ts, que es la fuente unica: antes esta
// lista vivia aparte y se quedo atras cuando cambiaron los servicios.
const SERVICES = OPCIONES_SERVICIO;

type FieldKey = "service" | "name" | "email" | "phone" | "date" | "time";

const todayISO = () => new Date().toISOString().split("T")[0];

const prettyDate = (iso: string) => {
  if (!iso) return "";
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString("es-CO", { weekday: "long", day: "numeric", month: "long" });
};

/* Píldora de selección (servicio y hora).
 *
 * El estado elegido era `border-accent bg-accent text-ink`: exactamente el
 * combo que button.tsx documenta como corregido por contraste (4,29:1 a 14 px,
 * bajo el 4,5:1). El arreglo se había hecho en el botón y nunca llegó aquí,
 * que es donde el visitante pasa más tiempo. Ahora el relleno es el bronce de
 * marca con crema —4,96:1, el mismo del botón primario— y la selección no
 * depende solo del color: entra un check.
 *
 * Además `tap-target` (44x44 reales, antes 36 px de alto) y `:active`, que en
 * táctil es el único estado que confirma el toque. */
const chipBase =
  "tap-target inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2.5 transition-surface duration-quick ease-state active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50";
const chipOn = "border-primary bg-primary text-on-accent shadow-soft";
const chipOff =
  "border-line bg-background/50 text-ink-soft hover:border-primary/45 hover:bg-background hover:text-ink";

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

  const uid = useId();
  const serviceErrorId = `${uid}-service-error`;
  const timeErrorId = `${uid}-time-error`;
  const noteId = `${uid}-note`;

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
    if (!values.name.trim()) e.name = "Escribe tu nombre";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) e.email = "Ingresa un correo válido";
    if (values.phone.replace(/\D/g, "").length < 7) e.phone = "Ingresa un teléfono válido";
    if (!values.date) e.date = "Elige una fecha";
    if (!time) e.time = "Elige una hora";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (submitting) return;
    if (!validate()) {
      /* Si algo falta, el foco va al primer campo con error en vez de dejar al
         visitante buscando el mensaje rojo en un formulario de 1.000 px.
         En el siguiente fotograma: `setErrors` es asincrono y hasta que React
         no repinta, el DOM todavia no tiene los aria-invalid. */
      const form = ev.currentTarget as HTMLFormElement;
      requestAnimationFrame(() => {
        const first = form.querySelector<HTMLElement>(
          '[aria-invalid="true"], [data-invalid="true"]'
        );
        first?.focus({ preventScroll: true });
        first?.scrollIntoView({ block: "center", behavior: "smooth" });
      });
      return;
    }

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
        setSubmitError(data.error || "No se pudo agendar. Intenta de nuevo o escríbeme por WhatsApp.");
        return;
      }

      setMeetLink(typeof data.meetLink === "string" ? data.meetLink : null);
      setSubmitted(true);
    } catch {
      setSubmitError("No se pudo agendar. Intenta de nuevo o escríbeme por WhatsApp.");
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
      `Hola JV Agencia 👋 Quiero agendar una llamada.\n\n` +
      `• Nombre: ${values.name}\n` +
      `• Servicio: ${serviceLabel}\n` +
      `• Fecha: ${prettyDate(values.date)}\n` +
      `• Hora: ${time}\n` +
      `• Email: ${values.email}\n` +
      `• Teléfono: ${values.phone}` +
      (values.note.trim() ? `\n• Nota: ${values.note.trim()}` : "");
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  })();

  /* La tarjeta es la misma pieza en los dos estados —formulario y acuse—, así
     que el marco vive en una constante y no se duplica. `shadow-glow` es el
     único de la página: es el elemento que debe dominar. */
  const cardClass =
    "rounded-3xl border border-line bg-surface p-5 text-left shadow-glow sm:p-7 md:p-8";

  if (submitted) {
    const firstName = values.name.trim().split(" ")[0] || "";
    const rows: { k: string; v: string; caps?: boolean }[] = [
      { k: "Servicio", v: serviceLabel },
      { k: "Fecha", v: prettyDate(values.date), caps: true },
      { k: "Hora", v: time },
      { k: "Correo", v: values.email },
    ];
    return (
      <div className={cardClass}>
        <div className="flex items-center gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-success/12 text-success ring-1 ring-success/25 motion-safe:animate-[fade-in_var(--duration-slow)_var(--ease-ps)_both]">
            <Check className="h-6 w-6" strokeWidth={2.25} />
          </span>
          <div className="min-w-0">
            <h3 className="font-display text-2xl leading-tight text-ink">¡Listo, {firstName}!</h3>
            <p className="font-body text-sm text-ink-soft">
              {meetLink ? "Tu llamada quedó agendada." : "Recibí tu solicitud de llamada."}
            </p>
          </div>
        </div>

        {/* Acuse como pie de obra: etiqueta mono arriba, valor abajo. Antes era
            una tabla de filas con `capitalize` aplicado a TODO —incluido el
            correo, que salía «Luis@correo.com»—. */}
        <dl className="mt-7 overflow-hidden rounded-2xl border border-line">
          {rows.map(({ k, v, caps }, i) => (
            <div
              key={k}
              className={cn(
                "flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 bg-background/40 px-4 py-3 sm:px-5",
                i > 0 && "border-t border-line"
              )}
            >
              <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft">{k}</dt>
              <dd
                className={cn(
                  "min-w-0 break-words text-right font-body text-sm font-medium tabular-nums text-ink",
                  caps && "first-letter:uppercase"
                )}
              >
                {v}
              </dd>
            </div>
          ))}
        </dl>

        {meetLink ? (
          <>
            <p className="mt-6 text-pretty font-body text-sm leading-relaxed text-ink-soft">
              Te envié la invitación a <span className="text-ink">{values.email}</span> con el
              enlace de Google Meet. También puedes unirte desde aquí:
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="primary" size="md" className="flex-1">
                <a href={meetLink} target="_blank" rel="noopener noreferrer">
                  <Video className="h-5 w-5" strokeWidth={1.75} /> Unirse a Google Meet
                </a>
              </Button>
              <Button onClick={reset} variant="ghost" size="md" type="button">
                <RotateCcw className="h-4 w-4" strokeWidth={2} /> Agendar otra
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="mt-6 text-pretty font-body text-sm leading-relaxed text-ink-soft">
              Para confirmar la cita, envíame los datos por WhatsApp. Te respondo para cerrar el
              horario.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="primary" size="md" className="flex-1">
                <a href={waHref} target="_blank" rel="noopener noreferrer">
                  Confirmar por WhatsApp <ArrowRight className="h-5 w-5" strokeWidth={1.75} />
                </a>
              </Button>
              <Button onClick={reset} variant="ghost" size="md" type="button">
                <RotateCcw className="h-4 w-4" strokeWidth={2} /> Agendar otra
              </Button>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-busy={submitting} className={cardClass}>
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-line bg-background text-primary-dark">
          <CalendarCheck className="h-5 w-5" strokeWidth={1.75} />
        </span>
        <h3 className="font-display text-2xl leading-tight text-ink">Agenda tu llamada</h3>
      </div>
      <p className="mt-3 text-pretty font-body text-sm leading-relaxed text-ink-soft">
        Diagnóstico sin costo de 20 minutos por Google Meet. Cuéntame qué necesitas.
      </p>

      {/* Servicio */}
      {/* El borde va en el envoltorio, no en el <fieldset>: el navegador encaja
          el <legend> DENTRO del borde del fieldset y la regla queda partiendo
          el texto por la mitad. */}
      <div className="mt-6 border-t border-line pt-6">
      <fieldset>
        <legend className="mb-3 font-body text-sm font-medium text-ink">
          ¿En qué te ayudo?
        </legend>
        <div className="flex flex-wrap gap-2">
          {SERVICES.map((s) => {
            const on = service === s.id;
            return (
              <button
                key={s.id}
                type="button"
                disabled={submitting}
                data-invalid={errors.service ? "true" : undefined}
                onClick={() => {
                  setService(s.id);
                  setErrors((e) => ({ ...e, service: undefined }));
                }}
                className={cn(chipBase, "font-body text-sm", on ? chipOn : chipOff)}
                aria-pressed={on}
                aria-describedby={errors.service ? serviceErrorId : undefined}
              >
                {on && <Check className="h-3.5 w-3.5 shrink-0" strokeWidth={2.5} />}
                {s.label}
              </button>
            );
          })}
        </div>
        <FieldError id={serviceErrorId} message={errors.service} />
      </fieldset>
      </div>

      {/* Datos */}
      <div className="mt-6 border-t border-line pt-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Nombre" error={errors.name}>
            {(p) => (
              <Input
                {...p}
                value={values.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="Tu nombre"
                autoComplete="name"
                disabled={submitting}
              />
            )}
          </Field>
          <Field label="Correo" error={errors.email}>
            {(p) => (
              <Input
                {...p}
                type="email"
                value={values.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="tu@correo.com"
                autoComplete="email"
                inputMode="email"
                disabled={submitting}
              />
            )}
          </Field>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="WhatsApp / teléfono" error={errors.phone}>
            {(p) => (
              <Input
                {...p}
                type="tel"
                value={values.phone}
                onChange={(e) => set("phone", e.target.value)}
                placeholder="+57 300 000 0000"
                autoComplete="tel"
                inputMode="tel"
                disabled={submitting}
              />
            )}
          </Field>
          {/* El campo nativo pinta el marcador según el locale del NAVEGADOR,
              no del documento: en un Chrome en inglés sale «mm/dd/yyyy» en un
              sitio colombiano y no hay forma de cambiarlo. Anunciar un formato
              fijo sería mentir la mitad de las veces, así que se confirma la
              fecha elegida en palabras debajo del campo. */}
          <Field
            label="Fecha preferida"
            error={errors.date}
            note={values.date ? prettyDate(values.date) : undefined}
          >
            {(p) => (
              <Input
                {...p}
                type="date"
                min={todayISO()}
                value={values.date}
                onChange={(e) => set("date", e.target.value)}
                disabled={submitting}
                /* Tocar el campo abre el calendario, no solo el iconito de
                   16 px de la derecha. */
                onClick={(e) => {
                  const el = e.currentTarget as HTMLInputElement & { showPicker?: () => void };
                  try {
                    el.showPicker?.();
                  } catch {
                    /* Navegador que no lo permite fuera de su propio gesto. */
                  }
                }}
                className="[&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-55 [&::-webkit-calendar-picker-indicator]:transition-opacity hover:[&::-webkit-calendar-picker-indicator]:opacity-100"
              />
            )}
          </Field>
        </div>
      </div>

      {/* Hora */}
      <div className="mt-6 border-t border-line pt-6">
      <fieldset>
        <legend className="mb-3 flex items-center gap-2 font-body text-sm font-medium text-ink">
          <Clock className="h-4 w-4 text-ink-soft" strokeWidth={2} aria-hidden />
          Hora disponible
          {values.date && !loadingSlots && slots && slots.length > 0 && (
            <span className="font-mono text-[11px] font-normal tabular-nums text-ink-soft">
              {slots.length} libres
            </span>
          )}
        </legend>

        <div aria-live="polite" aria-busy={loadingSlots}>
          {!values.date ? (
            <p className="rounded-xl border border-dashed border-line px-4 py-3 font-body text-sm text-ink-soft">
              Elige una fecha para ver los horarios.
            </p>
          ) : loadingSlots ? (
            /* Esqueleto en vez de una línea de texto: el bloque ya ocupa el
               alto que va a ocupar y la tarjeta no da un salto al responder. */
            <div className="flex flex-wrap gap-2" aria-label="Buscando horarios disponibles">
              {[76, 76, 76, 76, 76, 76].map((w, i) => (
                <span
                  key={i}
                  style={{ width: w }}
                  className="h-11 animate-pulse rounded-full bg-line/60 motion-reduce:animate-none"
                />
              ))}
            </div>
          ) : slots && slots.length === 0 ? (
            <p className="rounded-xl border border-dashed border-line px-4 py-3 font-body text-sm text-ink-soft">
              No hay horarios disponibles ese día. Prueba con otra fecha.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {(slots ?? []).map((t) => {
                const on = time === t;
                return (
                  <button
                    key={t}
                    type="button"
                    disabled={submitting}
                    data-invalid={errors.time ? "true" : undefined}
                    onClick={() => {
                      setTime(t);
                      setErrors((e) => ({ ...e, time: undefined }));
                    }}
                    className={cn(chipBase, "font-mono text-sm tabular-nums", on ? chipOn : chipOff)}
                    aria-pressed={on}
                    aria-describedby={errors.time ? timeErrorId : undefined}
                  >
                    {on && <Check className="h-3.5 w-3.5 shrink-0" strokeWidth={2.5} />}
                    {t}
                  </button>
                );
              })}
            </div>
          )}
        </div>
        <FieldError id={timeErrorId} message={errors.time} />
      </fieldset>
      </div>

      {/* Nota */}
      <div className="mt-6 border-t border-line pt-6">
        <label className="mb-2 block font-body text-sm font-medium text-ink" htmlFor={noteId}>
          Cuéntame brevemente <span className="font-normal text-ink-soft">(opcional)</span>
        </label>
        <textarea
          id={noteId}
          value={values.note}
          onChange={(e) => set("note", e.target.value)}
          rows={3}
          disabled={submitting}
          placeholder="¿Qué tienes en mente? Un sitio nuevo, un rediseño, una app…"
          className="w-full rounded-xl border border-line bg-background/40 px-4 py-3 font-body text-base text-ink placeholder:text-ink-soft/60 transition-surface duration-quick ease-state focus-visible:border-primary focus-visible:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25 disabled:opacity-60"
        />
      </div>

      {submitError && (
        <div
          role="alert"
          className="mt-6 flex gap-3 rounded-2xl border border-danger/35 bg-danger/[0.07] px-4 py-3.5"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-danger" strokeWidth={2.25} />
          <div className="min-w-0">
            <p className="font-body text-sm text-danger">{submitError}</p>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block font-body text-xs font-semibold text-ink underline decoration-line underline-offset-4 transition-surface duration-quick ease-state hover:decoration-primary"
            >
              O escríbeme por WhatsApp
            </a>
          </div>
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        /* `px-9` + `text-lg` fijaban un ancho mínimo de contenido de ~245 px:
           a 360 px el botón empujaba el formulario fuera de su columna y el
           contenedor lo recortaba 8 px. Encoge en móvil y recupera su tamaño
           desde sm. `focus-visible:transition-none` para que el anillo aparezca
           en el fotograma 0 y no con el fundido de 300 ms del botón. */
        className="mt-7 w-full px-5 text-base focus-visible:transition-none sm:px-9 sm:text-lg"
        disabled={submitting}
      >
        {submitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" strokeWidth={2} /> Agendando…
          </>
        ) : (
          <>
            Agendar llamada <ArrowRight className="h-5 w-5" strokeWidth={1.75} />
          </>
        )}
      </Button>
      <p className="mt-3 text-center text-pretty font-body text-xs leading-relaxed text-ink-soft">
        Sin compromiso. Recibirás la invitación de Google Meet en tu correo.
      </p>
    </form>
  );
}

/* Mensaje de error de campo. Va con `role="alert"` y el id que consume el
   `aria-describedby` del control, para que el lector de pantalla lo anuncie
   junto al campo y no como un texto suelto al final. */
function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p
      id={id}
      role="alert"
      className="mt-2 flex items-center gap-1.5 font-body text-xs font-medium text-danger"
    >
      <AlertCircle className="h-3.5 w-3.5 shrink-0" strokeWidth={2.25} />
      {message}
    </p>
  );
}

/* Campo de texto.
 *
 * Antes el <label> no tenía `htmlFor` y el <input> no tenía `id`: cuatro de
 * los cinco campos se anunciaban sin nombre y tocar la etiqueta no enfocaba
 * nada —en móvil eso es una zona táctil gratis de 245x20 px por campo que se
 * estaba tirando—. Ahora el id sale de useId(), la etiqueta lo apunta y el
 * error se enlaza con aria-describedby. */
function Field({
  label,
  note,
  error,
  children,
}: {
  label: string;
  /** Confirmación bajo el campo (la fecha elegida, escrita). */
  note?: string;
  error?: string;
  children: (props: {
    id: string;
    "aria-invalid": boolean;
    "aria-describedby"?: string;
    className?: string;
  }) => React.ReactNode;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="mb-2 block font-body text-sm font-medium text-ink">
        {label}
      </label>
      {children({
        id,
        "aria-invalid": !!error,
        "aria-describedby": error ? errorId : undefined,
        /* Reposo, foco y error en el mismo lenguaje: el radio pasa de píldora
           a `rounded-xl` para que elegir (píldoras) y escribir (campos) se
           distingan de un vistazo, y el anillo de foco usa el bronce de la
           casa en vez del cobre, que sobre el papel se queda en 3,07:1. */
        className: cn(
          "rounded-xl bg-background/40 px-4 transition-surface duration-quick ease-state focus-visible:border-primary focus-visible:bg-surface focus-visible:ring-primary/25 disabled:opacity-60",
          error && "border-danger bg-danger/[0.04] focus-visible:border-danger focus-visible:ring-danger/25"
        ),
      })}
      {note && !error && (
        <p className="mt-1.5 font-mono text-[11px] text-ink-soft first-letter:uppercase">{note}</p>
      )}
      <FieldError id={errorId} message={error} />
    </div>
  );
}

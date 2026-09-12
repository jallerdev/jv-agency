"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Check,
  CalendarCheck,
  CalendarPlus,
  Clock,
  Loader2,
  RotateCcw,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendario } from "@/components/kit/Calendario";
import { cn } from "@/lib/utils";
import { WHATSAPP_NUMBER } from "@/lib/contact";
import { OPCIONES_SERVICIO } from "@/lib/services";
import { FORM, SERVICIO_CORTO } from "@/content/home/agenda";
import type { Idioma } from "@/content/types";

// Las opciones salen de lib/services.ts, que es la fuente unica: antes esta
// lista vivia aparte y se quedo atras cuando cambiaron los servicios.
const SERVICES = OPCIONES_SERVICIO;

type FieldKey = "service" | "name" | "email" | "phone" | "date" | "time";

const todayISO = () => new Date().toISOString().split("T")[0];

const prettyDate = (iso: string, locale: string) => {
  if (!iso) return "";
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString(locale, { weekday: "long", day: "numeric", month: "long" });
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
/* Siete pastillas con el nombre completo ocupaban TRES filas —194 px, el
   bloque mas alto del formulario— y empujaban el boton de enviar fuera de
   pantalla. Con la etiqueta corta caben en dos. El nombre largo no se pierde:
   sigue siendo el que viaja en el mensaje. */

const chipBase =
  "tap-target inline-flex items-center justify-center gap-2 rounded-full border px-3.5 py-2 transition-surface duration-quick ease-state active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50";
const chipOn = "border-primary bg-primary text-on-accent shadow-soft";
const chipOff =
  "border-line bg-background/50 text-ink-soft hover:border-primary/45 hover:bg-background hover:text-ink";

export function ScheduleCall({
  idioma = "es",
  comoTitulo: Titulo = "h3",
}: {
  idioma?: Idioma;
  /**
   * El nivel del titular de la tarjeta.
   *
   * En la portada y en /contacto la tarjeta vive DENTRO de una sección que ya
   * tiene su `<h2>`, así que `h3` es lo correcto. En /agendar es el contenido
   * principal y va detrás del `<h1>`: dejarla en `h3` ahí salta un nivel, que
   * es de las pocas cosas que un lector de pantalla no puede reconstruir.
   */
  comoTitulo?: "h2" | "h3";
}) {
  /* Todos los textos del formulario, en el idioma de la página. `T` es corto a
     propósito: aparece cuarenta veces y `TEXTOS_DEL_FORMULARIO[idioma]` en
     cada una escondería el marcado. */
  const T = FORM[idioma];
  const CORTO = SERVICIO_CORTO[idioma];
  /* El eje de pasos. La máquina de estados del envío —idle, buscando horarios,
     enviando, éxito, error— NO se toca: esto es una capa de presentación
     encima, y por eso el paso no entra en `reset` como un estado más sino
     volviendo al 1, que es donde empieza todo. */
  const [paso, setPaso] = useState<1 | 2>(1);
  /* Hacia dónde se movió el paso, para que la transición vaya en esa
     dirección. Sin dirección, pasar del 1 al 2 se lee como que el formulario
     se recargó con otros campos. */
  const [sentidoPaso, setSentidoPaso] = useState<"adelante" | "atras">("adelante");
  const pasoRef = useRef<HTMLDivElement>(null);
  const moverFocoPaso = useRef(false);
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
  const dateErrorId = `${uid}-date-error`;
  const noteId = `${uid}-note`;

  /**
   * LLEGAR CON EL SERVICIO Y LA NOTA YA PUESTOS
   * ------------------------------------------------------------------------
   * El selector de formato de /servicios/diseno-de-paginas-web termina en un
   * botón de agendar, y sería absurdo que después de contestar tres preguntas
   * hubiera que volver a decir qué se quiere: el botón trae `?servicio=` y
   * `?nota=` y esto los recoge.
   *
   * Se lee de `window.location` y no con `useSearchParams()` a propósito: ese
   * hook obliga a envolver el componente en `<Suspense>` o tumba la página
   * entera a renderizado dinámico, y /agendar hoy es estática. Aquí el
   * parámetro solo ayuda a rellenar un formulario; si no llega, no pasa nada.
   *
   * El servicio se VALIDA contra la lista real. Un `?servicio=loquesea` de una
   * URL manipulada no puede meter una opción que no existe en el formulario.
   */
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const servicio = q.get("servicio");
    if (servicio && SERVICES.some((s) => s.id === servicio)) setService(servicio);

    const nota = q.get("nota");
    /* 400 caracteres: lo que cabe en el área de texto sin que el visitante
       tenga que desplazarse dentro de ella para ver qué se escribió en su
       nombre. */
    if (nota) setValues((s) => ({ ...s, note: nota.slice(0, 400) }));
  }, []);

  /* Al cambiar de paso, el foco entra en el primer control del paso nuevo.
     Sin esto, quien navega con teclado pulsa «Continuar» y el foco se queda en
     un botón que acaba de cambiar de texto, sin ninguna señal de que media
     tarjeta se ha renovado debajo. */
  useEffect(() => {
    if (!moverFocoPaso.current) return;
    moverFocoPaso.current = false;
    const primero = pasoRef.current?.querySelector<HTMLElement>(
      'input:not([type="hidden"]):not([disabled]), button:not([disabled]), [tabindex="0"]',
    );
    primero?.focus();
  }, [paso]);

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

  /* El paso 1 valida solo lo suyo. Si validara el formulario entero, el botón
     «Continuar» pintaría en rojo campos que todavía no se han visto. */
  const validarPaso1 = () => {
    const e: Partial<Record<FieldKey, string>> = {};
    if (!values.name.trim()) e.name = T.errores.nombre;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) e.email = T.errores.correo;
    if (values.phone.replace(/\D/g, "").length < 7) e.phone = T.errores.telefono;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validate = () => {
    const e: Partial<Record<FieldKey, string>> = {};
    if (!service) e.service = T.errores.servicio;
    if (!values.name.trim()) e.name = T.errores.nombre;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) e.email = T.errores.correo;
    if (values.phone.replace(/\D/g, "").length < 7) e.phone = T.errores.telefono;
    if (!values.date) e.date = T.errores.fecha;
    if (!time) e.time = T.errores.hora;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* Enviar el foco al primer campo en rojo. Va en el siguiente fotograma
     porque `setErrors` es asíncrono: hasta que React no repinta, el DOM
     todavía no tiene los `aria-invalid` que este selector busca. */
  const irAlPrimerError = (form: HTMLFormElement) => {
    requestAnimationFrame(() => {
      const primero = form.querySelector<HTMLElement>(
        '[aria-invalid="true"], [data-invalid="true"]'
      );
      primero?.focus({ preventScroll: true });
      primero?.scrollIntoView({ block: "center", behavior: "smooth" });
    });
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (submitting) return;

    /* Enter en un campo del paso 1 avanza, no envía a medias. Sin esto, la
       tecla más usada de un formulario dispararía la validación completa y
       pintaría en rojo tres campos del paso 2 que nadie ha visto todavía. */
    if (paso === 1) {
      const form = ev.currentTarget as HTMLFormElement;
      if (!validarPaso1()) {
        irAlPrimerError(form);
        return;
      }
      setSentidoPaso("adelante");
      moverFocoPaso.current = true;
      setPaso(2);
      return;
    }

    if (!validate()) {
      /* Si algo falta, el foco va al primer campo con error en vez de dejar al
         visitante buscando el mensaje rojo. */
      irAlPrimerError(ev.currentTarget as HTMLFormElement);
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
        setSubmitError(data.error || T.errores.ocupado);
        setTime("");
        const r = await fetch(`/api/availability?date=${values.date}`).then((x) => x.json());
        setSlots(Array.isArray(r.slots) ? r.slots : []);
        return;
      }
      if (!res.ok) {
        setSubmitError(data.error || T.errores.envio);
        return;
      }

      setMeetLink(typeof data.meetLink === "string" ? data.meetLink : null);
      setSubmitted(true);
    } catch {
      setSubmitError(T.errores.envio);
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setPaso(1);
    setService("");
    setTime("");
    setValues({ name: "", email: "", phone: "", date: "", note: "" });
    setErrors({});
    setSlots(null);
    setSubmitError("");
    setSubmitted(false);
    setMeetLink(null);
  };

  /* El nombre del servicio, en el idioma de quien reserva.
     `SERVICES` viene de `lib/services.ts` y solo tiene nombres en castellano,
     así que en /en/book-a-call las pastillas salían traducidas —usan `CORTO`—
     pero el acuse y el mensaje de WhatsApp decían «Servicio: Diseño de páginas
     web» dentro de un formulario en inglés. `CORTO` ya tiene las etiquetas de
     los dos idiomas; se usa la misma aquí. */
  const serviceLabel =
    CORTO[service] ?? SERVICES.find((s) => s.id === service)?.label ?? "";

  const waHref = (() => {
    const msg =
      `${T.wa.saludo}\n\n` +
      `• ${T.wa.nombre}: ${values.name}\n` +
      `• ${T.wa.servicio}: ${serviceLabel}\n` +
      `• ${T.wa.fecha}: ${prettyDate(values.date, T.locale)}\n` +
      `• ${T.wa.hora}: ${time}\n` +
      `• ${T.wa.correo}: ${values.email}\n` +
      `• ${T.wa.telefono}: ${values.phone}` +
      (values.note.trim() ? `\n• ${T.wa.notaEtiqueta}: ${values.note.trim()}` : "");
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  })();

  /**
   * EL ARCHIVO DE CALENDARIO
   * ------------------------------------------------------------------------
   * La invitación de Google llega al correo, pero quien reserva desde el
   * trabajo con Outlook, o desde un teléfono sin esa cuenta puesta, se queda
   * sin recordatorio. Un `.ics` lo abre cualquier agenda.
   *
   * LAS HORAS VAN EN UTC Y SE CALCULAN A MANO. Colombia no tiene horario de
   * verano, así que `America/Bogota` está siempre en −05:00 y la conversión es
   * una suma fija. Construirlo con `new Date(...)` del navegador habría usado
   * la zona del VISITANTE: quien reserve desde España se habría llevado la cita
   * siete horas corrida.
   *
   * Se genera como `data:` y no como blob para no tener que revocar una URL:
   * el archivo son cuatrocientos bytes y vive lo que vive la pestaña.
   */
  const icsHref = (() => {
    if (!values.date || !time) return null;
    const [h, m] = time.split(":").map(Number);
    /* −05:00 fijo: la hora local del estudio más cinco da UTC. */
    const inicio = new Date(`${values.date}T00:00:00.000Z`);
    inicio.setUTCHours(h + 5, m, 0, 0);
    const fin = new Date(inicio.getTime() + 20 * 60 * 1000);
    const sello = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    /* RFC 5545: los saltos son CRLF y las comas y los puntos y coma van
       escapados dentro de un valor de texto. */
    const esc = (x: string) => x.replace(/([,;\\])/g, "\\$1").replace(/\n/g, "\\n");

    const lineas = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//JV Agencia//Agenda//ES",
      "BEGIN:VEVENT",
      /* El UID sale de la cita, no de un aleatorio: `Math.random()` durante el
         render es impuro y, además, cambiaría el identificador en cada
         repintado. Dos descargas de la MISMA cita tienen que traer el mismo
         UID o la agenda del cliente acaba con dos eventos duplicados. */
      `UID:${sello(inicio)}-${values.email.replace(/[^a-z0-9]/gi, "").slice(0, 24)}@jvagencia.com`,
      `DTSTAMP:${sello(new Date())}`,
      `DTSTART:${sello(inicio)}`,
      `DTEND:${sello(fin)}`,
      `SUMMARY:${esc(T.exito.evento)}`,
      `DESCRIPTION:${esc(serviceLabel)}`,
      ...(meetLink ? [`LOCATION:${esc(meetLink)}`, `URL:${esc(meetLink)}`] : []),
      "BEGIN:VALARM",
      "TRIGGER:-PT15M",
      "ACTION:DISPLAY",
      `DESCRIPTION:${esc(T.exito.evento)}`,
      "END:VALARM",
      "END:VEVENT",
      "END:VCALENDAR",
    ];
    return `data:text/calendar;charset=utf-8,${encodeURIComponent(lineas.join("\r\n"))}`;
  })();

  /* La tarjeta es la misma pieza en los dos estados —formulario y acuse—, así
     que el marco vive en una constante y no se duplica. `shadow-glow` es el
     único de la página: es el elemento que debe dominar. */
  const cardClass =
    "jv-card p-5 text-left shadow-glow sm:p-7 md:p-8";

  if (submitted) {
    const firstName = values.name.trim().split(" ")[0] || "";
    const rows: { k: string; v: string; caps?: boolean }[] = [
      { k: T.exito.filas.servicio, v: serviceLabel },
      { k: T.exito.filas.fecha, v: prettyDate(values.date, T.locale), caps: true },
      { k: T.exito.filas.hora, v: time },
      { k: T.exito.filas.correo, v: values.email },
    ];
    return (
      <div className={cardClass}>
        <div className="flex items-center gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white/10 text-ink ring-1 ring-white/20 motion-safe:animate-[fade-in_var(--duration-slow)_var(--ease-ps)_both]">
            <Check className="h-6 w-6" strokeWidth={2} />
          </span>
          <div className="min-w-0">
            <Titulo className="font-display text-2xl leading-tight text-ink">{T.exito.saludo(firstName)}</Titulo>
            <p className="font-body text-sm text-ink-soft">
              {meetLink ? T.exito.agendada : T.exito.recibida}
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
              <dt className="jv-eyebrow text-ink-soft">{k}</dt>
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
              {T.exito.conMeet(values.email).antes}
              <span className="text-ink">{values.email}</span>
              {T.exito.conMeet(values.email).despues}
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="primary" size="md" className="flex-1">
                <a href={meetLink} target="_blank" rel="noopener noreferrer">
                  <Video className="h-5 w-5" strokeWidth={2} /> {T.exito.unirse}
                </a>
              </Button>
              <Button onClick={reset} variant="ghost" size="md" type="button">
                <RotateCcw className="h-4 w-4" strokeWidth={2} /> {T.exito.otra}
              </Button>
            </div>
            {icsHref && <BotonCalendario href={icsHref} texto={T.exito.calendario} />}
          </>
        ) : (
          <>
            <p className="mt-6 text-pretty font-body text-sm leading-relaxed text-ink-soft">
{T.exito.sinMeet}
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="primary" size="md" className="flex-1">
                <a href={waHref} target="_blank" rel="noopener noreferrer">
                  {T.exito.confirmar} <ArrowRight className="h-5 w-5" strokeWidth={2} />
                </a>
              </Button>
              <Button onClick={reset} variant="ghost" size="md" type="button">
                <RotateCcw className="h-4 w-4" strokeWidth={2} /> {T.exito.otra}
              </Button>
            </div>
            {icsHref && <BotonCalendario href={icsHref} texto={T.exito.calendario} />}
          </>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-busy={submitting} className={cardClass}>
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-line bg-background text-primary-dark">
          <CalendarCheck className="h-5 w-5" strokeWidth={2} />
        </span>
        <Titulo className="font-display text-2xl leading-tight text-ink">{T.titulo}</Titulo>
      </div>
      <p className="mt-3 text-pretty font-body text-sm leading-relaxed text-ink-soft">
{T.intro}
      </p>

      {/* El indicador de paso. No es adorno: un formulario partido sin decir en
          cuántos trozos está partido se siente más largo que el mismo
          formulario entero, porque quien lo llena no sabe si le quedan dos
          pantallas o siete. La promesa de respuesta va aquí y no al final,
          donde ya no cambia la decisión de empezar. */}
      {/* Dos renglones, no uno que se parte.
          En una sola fila envuelta, a 390 el separador «|» quedaba colgando al
          final del primer renglón y la barra se iba sola al segundo. Con el
          paso y la barra arriba, y la promesa debajo, se lee igual a cualquier
          ancho y no hay nada que envolver. */}
      <div className="mt-5 flex items-center gap-3">
        <p
          aria-live="polite"
          className="font-mono text-xs uppercase tracking-[0.12em] text-accent-ink"
        >
          {T.paso(paso)}
        </p>
        {/* La barra es `aria-hidden`: el texto de al lado ya dice el paso, y un
            lector de pantalla anunciando «progreso 50 %» detrás de «paso 1 de
            2» está diciendo lo mismo dos veces. */}
        <span aria-hidden className="ml-auto flex w-16 shrink-0 gap-1">
          <span className="h-0.5 flex-1 rounded-full bg-accent" />
          <span
            className={cn(
              "h-0.5 flex-1 rounded-full transition-colors duration-slow ease-ps",
              paso === 2 ? "bg-accent" : "bg-line"
            )}
          />
        </span>
      </div>
      <p className="mt-2 font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
        {T.promesa}
      </p>

      {/* ── Paso 1 · Quién eres ─────────────────────────────────────────
          Tres campos y a otra cosa. El orden importa: lo barato de dar va
          primero. Pedir «¿en qué te ayudo?» de entrada obliga a decidir el
          proyecto antes de haber escrito el nombre, y ahí es donde la gente
          cierra la pestaña. */}
      <div
        hidden={paso !== 1}
        ref={paso === 1 ? pasoRef : undefined}
        data-sentido={sentidoPaso}
        className="jv-paso"
      >
        <div className="mt-4 jv-rule pt-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label={T.nombre} error={errors.name}>
              {(p) => (
                <Input
                  {...p}
                  value={values.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder={T.nombrePlaceholder}
                  autoComplete="name"
                  disabled={submitting}
                />
              )}
            </Field>
            <Field label={T.correo} error={errors.email}>
              {(p) => (
                <Input
                  {...p}
                  type="email"
                  value={values.email}
                  onChange={(e) => set("email", e.target.value)}
                  placeholder={T.correoPlaceholder}
                  autoComplete="email"
                  inputMode="email"
                  disabled={submitting}
                />
              )}
            </Field>
          </div>

          <div className="mt-4 sm:max-w-[calc(50%-0.5rem)]">
            <Field label={T.telefono} error={errors.phone}>
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
          </div>
        </div>
      </div>

      {/* ── Paso 2 · Qué necesitas ──────────────────────────────────────
          `hidden` en vez de desmontar: lo que se escribió en el paso 1 sigue
          en el DOM, así que volver atrás no pierde nada y el autocompletado
          del navegador no se reinicia. Y con `hidden` los campos ocultos
          tampoco son paradas de tabulador. */}
      <div
        hidden={paso !== 2}
        ref={paso === 2 ? pasoRef : undefined}
        data-sentido={sentidoPaso}
        className="jv-paso"
      >
      {/* Servicio */}
        {/* El borde va en el envoltorio, no en el <fieldset>: el navegador encaja
            el <legend> DENTRO del borde del fieldset y la regla queda partiendo
            el texto por la mitad. */}
        <div className="mt-4 jv-rule pt-4">
        <fieldset>
          <legend className="mb-3 font-body text-sm font-medium text-ink">
  {T.servicio}
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
                  {on && <Check className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />}
                  {CORTO[s.id] ?? s.label}
                </button>
              );
            })}
          </div>
          <FieldError id={serviceErrorId} message={errors.service} />
        </fieldset>
        </div>

      {/* Fecha */}
        <div className="mt-4 jv-rule pt-4">
          {/* EL CALENDARIO ES PROPIO, no un `<input type="date">`. El campo
              nativo pintaba su marcador según el locale del NAVEGADOR —en un
              Chrome en inglés, «mm/dd/yyyy» en un sitio colombiano— y, peor,
              dejaba escoger domingos: el visitante se enteraba de que no había
              horario después, cuando la lista volvía vacía. El calendario apaga
              los días sin horario leyéndolos de `BUSINESS.horario`. */}
          <Calendario
            idioma={idioma}
            value={values.date}
            disabled={submitting}
            onChange={(d) => set("date", d)}
          />
          <FieldError id={dateErrorId} message={errors.date} />
          {values.date && !errors.date && (
            <p className="mt-3 font-mono text-xs text-ink-soft first-letter:uppercase">
              {prettyDate(values.date, T.locale)}
            </p>
          )}
        </div>

      {/* Hora */}
        <div className="mt-4 jv-rule pt-4">
        <fieldset>
          <legend className="mb-3 flex items-center gap-2 font-body text-sm font-medium text-ink">
            <Clock className="h-4 w-4 text-ink-soft" strokeWidth={2} aria-hidden />
{T.hora}
            {values.date && !loadingSlots && slots && slots.length > 0 && (
              <span className="font-mono text-xs font-normal tabular-nums text-ink-soft">
                {T.libres(slots.length)}
              </span>
            )}
          </legend>

          <div aria-live="polite" aria-busy={loadingSlots}>
            {!values.date ? (
              <p className="rounded-xl border border-dashed border-line px-4 py-3 font-body text-sm text-ink-soft">
  {T.sinFecha}
              </p>
            ) : loadingSlots ? (
              /* Esqueleto en vez de una línea de texto: el bloque ya ocupa el
                 alto que va a ocupar y la tarjeta no da un salto al responder. */
              <div className="flex flex-wrap gap-2" aria-label={T.buscando}>
                {[76, 76, 76, 76, 76, 76].map((w, i) => (
                  <span
                    key={i}
                    style={{ width: w }}
                    className="h-11 animate-pulse rounded-full bg-line-soft motion-reduce:animate-none"
                  />
                ))}
              </div>
            ) : slots && slots.length === 0 ? (
              <p className="rounded-xl border border-dashed border-line px-4 py-3 font-body text-sm text-ink-soft">
  {T.sinHoras}
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
                      {on && <Check className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />}
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
        <div className="mt-4 jv-rule pt-4">
          <label className="mb-1.5 block font-body text-sm font-medium text-ink" htmlFor={noteId}>
            {T.nota} <span className="font-normal text-ink-soft">{T.notaOpcional}</span>
          </label>
          <textarea
            id={noteId}
            value={values.note}
            onChange={(e) => set("note", e.target.value)}
            rows={2}
            disabled={submitting}
            placeholder={T.notaPlaceholder}
            className="w-full rounded-xl border border-line bg-background/40 px-4 py-3 font-body text-base text-ink placeholder:text-ink-muted transition-surface duration-quick ease-state focus-visible:border-primary focus-visible:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/25 disabled:opacity-60"
          />
        </div>
      </div>

      {submitError && (
        <div
          role="alert"
          className="mt-6 flex gap-3 rounded-2xl border border-danger/35 bg-danger/[0.07] px-4 py-3.5"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-danger" strokeWidth={2} />
          <div className="min-w-0">
            <p className="font-body text-sm text-danger">{submitError}</p>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block font-body text-xs font-semibold text-ink underline decoration-line underline-offset-4 transition-surface duration-quick ease-state hover:decoration-primary"
            >
              {T.porWhatsApp}
            </a>
          </div>
        </div>
      )}

      {/* ── El pie del formulario ───────────────────────────────────────
          «Continuar» en el paso 1 y «Agendar» en el 2. El botón de atrás es
          secundario y va a la izquierda: retroceder tiene que ser posible y
          barato —quien se equivocó de correo no puede quedar atrapado— pero no
          debe competir con el que lleva hacia adelante. */}
      {paso === 1 ? (
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="mt-7 w-full px-5 text-base focus-visible:transition-none sm:px-9 sm:text-lg"
        >
          {T.continuar} <ArrowRight className="h-5 w-5" strokeWidth={2} />
        </Button>
      ) : (
        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={() => {
              setSentidoPaso("atras");
              moverFocoPaso.current = true;
              setPaso(1);
            }}
            disabled={submitting}
            className="jv-boton-2 justify-center disabled:opacity-60 sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2} aria-hidden /> {T.atras}
          </button>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            /* `px-9` + `text-lg` fijaban un ancho mínimo de contenido de ~245 px:
               a 360 px el botón empujaba el formulario fuera de su columna.
               `focus-visible:transition-none` para que el anillo aparezca en el
               fotograma 0 y no con el fundido de 300 ms del botón. */
            className="w-full px-5 text-base focus-visible:transition-none sm:flex-1 sm:px-9 sm:text-lg"
            disabled={submitting}
          >
            {submitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" strokeWidth={2} /> {T.enviando}
              </>
            ) : (
              <>
                {T.enviar} <ArrowRight className="h-5 w-5" strokeWidth={2} />
              </>
            )}
          </Button>
        </div>
      )}
      <p className="mt-3 text-center text-pretty font-body text-xs leading-relaxed text-ink-soft">
{T.aviso}
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
      <AlertCircle className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
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
      <label htmlFor={id} className="mb-1.5 block font-body text-sm font-medium text-ink">
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
          "rounded-xl bg-background/40 px-4 transition-surface duration-quick ease-state focus-visible:border-primary focus-visible:bg-surface focus-visible:ring-brand/25 disabled:opacity-60",
          error && "border-danger bg-danger/[0.04] focus-visible:border-danger focus-visible:ring-danger/25"
        ),
      })}
      {note && !error && (
        <p className="mt-1.5 font-mono text-xs text-ink-soft first-letter:uppercase">{note}</p>
      )}
      <FieldError id={errorId} message={error} />
    </div>
  );
}

/**
 * El enlace de descarga del `.ics`.
 *
 * Terciario a propósito: va debajo de los dos botones y en tinta apagada. Lo
 * que resuelve la cita es unirse al Meet o confirmar por WhatsApp; el archivo
 * de calendario es una comodidad, y ponerlo al mismo peso repartiría la
 * atención entre tres acciones donde solo una es la siguiente.
 */
function BotonCalendario({ href, texto }: { href: string; texto: string }) {
  return (
    <a
      href={href}
      download="llamada-jv-agencia.ics"
      className="jv-enlace mt-4 inline-flex min-h-11 items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-ink-soft"
    >
      <CalendarPlus className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
      {texto}
    </a>
  );
}

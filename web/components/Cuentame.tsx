"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { ArrowUpRight, Check, X } from "lucide-react";

import { WhatsAppGlyph } from "@/components/WhatsAppGlyph";
import type { Idioma } from "@/content/types";
import { WHATSAPP_NUMBER } from "@/lib/contact";
import { cn } from "@/lib/utils";

/* ===========================================================================
   «Cuéntame tu proyecto» — el diálogo de contacto.

   POR QUÉ EXISTE
   --------------
   La página tenía dos puertas y ninguna intermedia. Una era «Agenda una
   llamada»: un formulario con fecha, hora y correo, que pide decidir un día y
   una hora a alguien que todavía no sabe si le sirvo. La otra era «Escríbeme
   por WhatsApp», que abría el chat con un saludo genérico ya escrito —«Me
   interesa hablar sobre un proyecto»— y dejaba al visitante delante de un
   cursor parpadeando, redactando desde cero lo que ya había leído en la página.
   Ese segundo botón estaba en diez páginas y no preguntaba nada.

   Este diálogo ocupa ese hueco: tres campos, ningún compromiso de agenda, y el
   mensaje redactado por el sitio en vez de por el visitante. Nadie escribe
   mejor el primer mensaje que la página que acaba de explicar el servicio.

   POR QUÉ NO GUARDA NADA
   ----------------------
   No hay endpoint, ni base de datos, ni correo de confirmación: el formulario
   COMPONE un texto y lo entrega a WhatsApp. Eso quita el fallo más caro de un
   formulario pequeño —que se envíe al vacío y nadie sepa si llegó— y le devuelve
   el control a quien escribe: el mensaje se ve antes de mandarlo y se puede
   corregir. Por eso el botón es un enlace de verdad, no un `window.open`: los
   bloqueadores de ventanas emergentes matan lo segundo, y el enlace además
   funciona con clic central, con «abrir en pestaña nueva» y sin JavaScript de
   navegación.

   LO QUE SE MANDA
   ---------------
   Nombre, negocio, qué necesita, detalle y —esto es lo que más sirve— la ruta
   desde la que escribió. Saber que el mensaje salió de /servicios/tiendas-
   virtuales cambia por completo la primera respuesta.
   =========================================================================== */

/**
 * Las seis opciones, con la etiqueta en los dos idiomas.
 *
 * El `id` es el mismo en ambos y es lo que guarda el estado: si la etiqueta
 * fuera la clave, cambiar una palabra rompería la selección.
 */
const NECESIDADES = [
  { id: "web", label: { es: "Página web", en: "Website" } },
  { id: "tienda", label: { es: "Tienda online", en: "Online store" } },
  { id: "seo", label: { es: "Aparecer en Google", en: "Show up on Google" } },
  { id: "chatbot", label: { es: "Chatbot de WhatsApp", en: "WhatsApp chatbot" } },
  { id: "software", label: { es: "Software a la medida", en: "Custom software" } },
  { id: "nose", label: { es: "Todavía no lo sé", en: "I don't know yet" } },
] as const;

/**
 * Todo lo que se lee en el diálogo.
 *
 * El MENSAJE que se compone también está aquí, y es lo que más importa que
 * esté: si el visitante leyó la página en inglés y el chat se abre con un
 * párrafo en castellano ya escrito, tiene que borrarlo antes de empezar. El
 * saludo es una función para no repetir la plantilla dos veces con las comas
 * en distinto sitio.
 */
const T = {
  es: {
    rotulo: "Hablemos",
    titulo: "Cuéntame tu proyecto",
    entradilla: "Tres datos y te escribo yo. Sin formularios largos ni intermediarios.",
    cerrar: "Cerrar",
    opcional: "(opcional)",
    nombre: "Tu nombre",
    nombrePista: "¿Cómo te llamas?",
    nombreMal: "Escribe tu nombre para saber cómo tratarte.",
    negocio: "Tu negocio",
    negocioPista: "Nombre de tu marca o idea",
    necesita: "¿Qué necesitas?",
    necesitaMal: "Elige una para no empezar el chat a ciegas.",
    detalle: "En dos líneas",
    detallePista: "¿Qué quieres construir, mejorar o resolver?",
    enviar: "Continuar en WhatsApp",
    nota: "Se abre WhatsApp con el mensaje ya escrito. Lo lees antes de enviarlo. Respondo yo, dentro de las 24 horas hábiles.",
    saludo: (nombre: string, negocio: string) =>
      `Hola Luis, soy ${nombre}${negocio ? ` de ${negocio}` : ""}.`,
    necesito: (que: string) => `Lo que necesito: ${que.toLowerCase()}.`,
    desde: (ruta: string) => `(Escribo desde jvagencia.com${ruta})`,
  },
  en: {
    rotulo: "Let's talk",
    titulo: "Tell me about your project",
    entradilla: "Three details and I write to you. No long forms, no middlemen.",
    cerrar: "Close",
    opcional: "(optional)",
    nombre: "Your name",
    nombrePista: "What's your name?",
    nombreMal: "Write your name so I know how to address you.",
    negocio: "Your business",
    negocioPista: "Your brand or idea",
    necesita: "What do you need?",
    necesitaMal: "Pick one so the chat doesn't start blind.",
    detalle: "In two lines",
    detallePista: "What do you want to build, improve or solve?",
    enviar: "Continue on WhatsApp",
    nota: "WhatsApp opens with the message already written. You read it before sending. I answer, within 24 business hours.",
    saludo: (nombre: string, negocio: string) =>
      `Hi Luis, I'm ${nombre}${negocio ? ` from ${negocio}` : ""}.`,
    necesito: (que: string) => `What I need: ${que.toLowerCase()}.`,
    desde: (ruta: string) => `(Writing from jvagencia.com${ruta})`,
  },
} as const;

type Origen = { ruta: string };

/**
 * El contexto lleva el idioma además del abridor: `BotonCuentame` está en once
 * sitios y pasarle el idioma por prop en cada uno era once ocasiones de
 * olvidarlo. Sale del proveedor, que ya lo tiene del layout.
 */
type Cuentame = { abrir: (ruta?: string) => void; idioma: Idioma };

const CuentameCtx = createContext<Cuentame | null>(null);

/**
 * Abre el diálogo. Devuelve una función, no un objeto: quien la llama solo
 * necesita poder abrirlo.
 *
 * Fuera del proveedor devuelve `null` en vez de reventar, y `BotonCuentame` lo
 * aprovecha para caer a WhatsApp directo. Un botón de contacto que no hace nada
 * porque falta un proveedor es peor que uno menos elegante que sí escribe.
 */
export function useCuentame() {
  return useContext(CuentameCtx)?.abrir ?? null;
}

export function CuentameProvider({
  idioma = "es",
  children,
}: {
  idioma?: Idioma;
  children: React.ReactNode;
}) {
  const [origen, setOrigen] = useState<Origen | null>(null);

  const abrir = useCallback((ruta?: string) => {
    setOrigen({ ruta: ruta ?? (typeof window !== "undefined" ? window.location.pathname : "/") });
  }, []);

  /* El valor se memoiza porque es un objeto: sin esto cambiaría de identidad
     en cada render del layout y volvería a pintar todo lo que lo consume. */
  const valor = useMemo(() => ({ abrir, idioma }), [abrir, idioma]);

  return (
    <CuentameCtx.Provider value={valor}>
      {children}
      {origen && (
        <Dialogo idioma={idioma} ruta={origen.ruta} onCerrar={() => setOrigen(null)} />
      )}
    </CuentameCtx.Provider>
  );
}

/* ---------------------------------------------------------------------------
   El diálogo
   --------------------------------------------------------------------------- */

function Dialogo({
  idioma,
  ruta,
  onCerrar,
}: {
  idioma: Idioma;
  ruta: string;
  onCerrar: () => void;
}) {
  const t = T[idioma];
  const panel = useRef<HTMLDivElement>(null);
  /* A dónde vuelve el foco al cerrar. Sin esto el teclado aterriza al principio
     del documento y hay que recorrer la página entera para volver al botón. */
  const devolverFoco = useRef<HTMLElement | null>(null);

  const [nombre, setNombre] = useState("");
  const [negocio, setNegocio] = useState("");
  const [necesita, setNecesita] = useState<string>("");
  const [detalle, setDetalle] = useState("");
  const [tocado, setTocado] = useState(false);

  const idTitulo = useId();
  const idNombre = useId();
  const idNegocio = useId();
  const idDetalle = useId();
  const idErrorNombre = useId();
  const idErrorNecesita = useId();

  const faltaNombre = tocado && nombre.trim().length < 2;
  const faltaNecesita = tocado && !necesita;
  const listo = nombre.trim().length >= 2 && Boolean(necesita);

  useEffect(() => {
    devolverFoco.current = document.activeElement as HTMLElement | null;

    /* Bloqueo de scroll del fondo. Se compensa el ancho de la barra para que la
       página no dé el salto lateral clásico al abrir. */
    const { body } = document;
    const overflowPrevio = body.style.overflow;
    const paddingPrevio = body.style.paddingRight;
    const barra = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (barra > 0) body.style.paddingRight = `${barra}px`;

    /* Primer foco: el panel, no el primer campo. Enfocar el input haría saltar
       el teclado del móvil encima del diálogo antes de que se pueda leer. */
    const t = window.setTimeout(() => panel.current?.focus(), 0);

    return () => {
      window.clearTimeout(t);
      body.style.overflow = overflowPrevio;
      body.style.paddingRight = paddingPrevio;
      devolverFoco.current?.focus?.();
    };
  }, []);

  /* Esc cierra y Tab da vueltas dentro. Un `aria-modal` no atrapa el foco por sí
     solo: solo se lo dice al lector de pantalla. */
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      onCerrar();
      return;
    }
    if (e.key !== "Tab" || !panel.current) return;

    const foco = panel.current.querySelectorAll<HTMLElement>(
      'a[href],button:not([disabled]),input,textarea,select,[tabindex]:not([tabindex="-1"])'
    );
    if (!foco.length) return;
    const primero = foco[0];
    const ultimo = foco[foco.length - 1];
    const activo = document.activeElement;

    if (e.shiftKey && (activo === primero || activo === panel.current)) {
      e.preventDefault();
      ultimo.focus();
    } else if (!e.shiftKey && activo === ultimo) {
      e.preventDefault();
      primero.focus();
    }
  };

  const etiqueta = NECESIDADES.find((n) => n.id === necesita)?.label[idioma] ?? "";
  const mensaje = [
    t.saludo(nombre.trim() || "…", negocio.trim()),
    etiqueta ? t.necesito(etiqueta) : "",
    detalle.trim(),
    "",
    t.desde(ruta === "/" ? "" : ruta),
  ]
    .filter(Boolean)
    .join("\n");

  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6"
      role="presentation"
      onKeyDown={onKeyDown}
    >
      {/* Velo. Clic fuera cierra: es lo que espera todo el mundo, y con el panel
          ocupando la pantalla en móvil casi nunca hay «fuera» que tocar. */}
      <button
        type="button"
        aria-label={t.cerrar}
        tabIndex={-1}
        onClick={onCerrar}
        className="absolute inset-0 animate-veil-in cursor-default bg-ink/55 backdrop-blur-[2px]"
      />

      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={idTitulo}
        tabIndex={-1}
        className={cn(
          "relative flex max-h-[92svh] w-full flex-col overflow-y-auto overscroll-contain",
          "animate-dialog-in [--dialog-from:2rem] sm:[--dialog-from:10px]",
          "rounded-t-4xl border border-line bg-surface shadow-frame outline-none",
          "sm:max-w-2xl sm:rounded-4xl"
        )}
      >
        {/* Costura de cobre en el canto superior: el mismo hilo que cierra la
            portada. Marca dónde empieza la pieza sin gastar un borde grueso. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
        />
        {/* Asa de hoja: en móvil el panel sube desde abajo y esto dice que se
            puede empujar de vuelta. En escritorio no es una hoja, así que no
            está. */}
        <div aria-hidden className="mx-auto mt-3 h-1 w-10 rounded-full bg-ink/15 sm:hidden" />

        <button
          type="button"
          onClick={onCerrar}
          aria-label={t.cerrar}
          className="tap-target absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full text-ink-soft transition-surface duration-quick ease-state hover:bg-ink/5 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <X className="h-5 w-5" strokeWidth={2} />
        </button>

        <div className="px-6 pb-7 pt-6 sm:px-9 sm:pb-9 sm:pt-8">
          <p className="jv-eyebrow text-primary-dark">{t.rotulo}</p>
          <h2
            id={idTitulo}
            className="mt-2 text-balance font-display text-[1.75rem]/[1.1] text-ink sm:text-4xl/[1.05]"
          >
            {t.titulo}
          </h2>
          <p className="mt-3 max-w-[46ch] text-pretty font-body text-sm leading-relaxed text-ink-soft sm:text-base">
            {t.entradilla}
          </p>

          <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="min-w-0">
              <label className={etiquetaCampo} htmlFor={idNombre}>
                {t.nombre}
              </label>
              <input
                id={idNombre}
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                autoComplete="name"
                placeholder={t.nombrePista}
                aria-invalid={faltaNombre || undefined}
                aria-describedby={faltaNombre ? idErrorNombre : undefined}
                className={cn(campo, faltaNombre && campoMal)}
              />
              {faltaNombre && (
                <p id={idErrorNombre} className={error}>
                  {t.nombreMal}
                </p>
              )}
            </div>

            <div className="min-w-0">
              <label className={etiquetaCampo} htmlFor={idNegocio}>
                {t.negocio}{" "}
                <span className="font-normal normal-case tracking-normal text-ink-muted">
                  {t.opcional}
                </span>
              </label>
              <input
                id={idNegocio}
                value={negocio}
                onChange={(e) => setNegocio(e.target.value)}
                autoComplete="organization"
                placeholder={t.negocioPista}
                className={campo}
              />
            </div>
          </div>

          <fieldset className="mt-6 min-w-0">
            <legend className={cn(etiquetaCampo, "mb-0")}>{t.necesita}</legend>
            {/* Rejilla, no `flex-wrap`. Con seis etiquetas de anchos muy
                distintos —«Página web» contra «Chatbot de WhatsApp»— el
                envoltorio libre dejaba filas de 3, 2 y 1, con una opción
                huérfana al final. En rejilla son tres filas iguales de dos (o
                dos de tres en escritorio) y el bloque se lee como una sola
                pieza en vez de como un texto que se partió. */}
            <div className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {NECESIDADES.map((n) => {
                const on = necesita === n.id;
                return (
                  <button
                    key={n.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setNecesita(n.id)}
                    className={cn(
                      "tap-target inline-flex w-full items-center justify-center gap-1.5 text-balance rounded-full border px-3 py-2 text-center font-body text-sm leading-tight transition-surface duration-quick ease-state active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                      on
                        ? "border-primary bg-primary text-on-accent shadow-soft"
                        : "border-line bg-background/50 text-ink-soft hover:border-primary/45 hover:bg-background hover:text-ink",
                      faltaNecesita && !on && "border-danger/45"
                    )}
                  >
                    {on && <Check className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />}
                    {n.label[idioma]}
                  </button>
                );
              })}
            </div>
            {faltaNecesita && (
              <p id={idErrorNecesita} className={error}>
                {t.necesitaMal}
              </p>
            )}
          </fieldset>

          <div className="mt-6 min-w-0">
            <label className={etiquetaCampo} htmlFor={idDetalle}>
              {t.detalle}{" "}
              <span className="font-normal normal-case tracking-normal text-ink-muted">
                {t.opcional}
              </span>
            </label>
            <textarea
              id={idDetalle}
              value={detalle}
              onChange={(e) => setDetalle(e.target.value)}
              rows={2}
              placeholder={t.detallePista}
              className={cn(campo, "h-auto resize-y rounded-2xl py-3 leading-relaxed")}
            />
          </div>
        </div>

        {/* Pie pegajoso. En móvil el panel hace scroll y el botón se quedaba
            fuera de pantalla: el paso que importa no puede depender de que
            alguien siga bajando. */}
        <div className="sticky bottom-0 border-t border-line bg-surface px-6 py-5 shadow-[0_-16px_28px_-24px_rgba(43,36,32,0.5)] sm:px-9">
          <a
            href={listo ? href : undefined}
            target="_blank"
            rel="noopener noreferrer"
            role={listo ? undefined : "button"}
            aria-disabled={listo ? undefined : true}
            onClick={(e) => {
              if (listo) return;
              e.preventDefault();
              setTocado(true);
            }}
            className={cn(
              "group flex w-full items-center justify-center gap-3 rounded-full px-6 py-4 font-body text-base font-semibold transition-card duration-base ease-state focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
              /* Medido: `bg-canvas` es #080808 y el panel del diálogo es
                 #111111 —1,09:1 entre el botón y su propio fondo—, así que la
                 acción principal era un agujero en el panel. Y el estado
                 DESHABILITADO, en gris al 25 %, se veía MÁS que el activo: el
                 botón parecía menos pulsable justo cuando se volvía pulsable.
                 Naranja de marca al habilitarse, que es para lo que está el
                 acento; y el paso previo, una capa de estado por debajo. */
              listo
                ? "bg-primary text-on-accent hover:-translate-y-0.5 hover:bg-primary-hover"
                : "cursor-not-allowed bg-white/[0.07] text-ink-soft"
            )}
          >
            <WhatsAppGlyph className="h-5 w-5 shrink-0" />
            {t.enviar}
            <ArrowUpRight
              className="h-4 w-4 shrink-0 transition-transform duration-quick ease-state group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={2}
            />
          </a>
          <p className="mt-3 text-center font-body text-xs leading-relaxed text-ink-soft">
            {t.nota}
          </p>
        </div>
      </div>
    </div>
  );
}

const etiquetaCampo =
  "mb-2 block jv-eyebrow text-ink-soft";
const campo =
  "h-12 w-full rounded-full border border-line bg-background/40 px-5 font-body text-base text-ink placeholder:text-ink-muted transition-surface duration-quick ease-state focus-visible:border-primary focus-visible:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/25";
const campoMal = "border-danger/55";
const error = "mt-2 font-body text-xs text-danger";

/* ---------------------------------------------------------------------------
   El disparador
   --------------------------------------------------------------------------- */

/**
 * Botón que abre el diálogo desde cualquier página.
 *
 * Existe para que las páginas —que son componentes de servidor— no tengan que
 * volverse de cliente enteras solo por colgar un `onClick`. Y si por lo que sea
 * no hay proveedor encima, no se queda mudo: cae a WhatsApp directo, que es
 * exactamente lo que hacía antes de existir este diálogo.
 */
export function BotonCuentame({
  children,
  className,
  size = "lg",
  variant = "outline",
}: {
  children?: React.ReactNode;
  className?: string;
  size?: "md" | "lg";
  variant?: "primary" | "outline";
}) {
  /* El idioma sale del contexto y no de una prop: este botón está en once
     páginas y once props son once ocasiones de que una se quede en castellano
     dentro de una página en inglés. Fuera del proveedor cae a castellano, que
     es donde están las únicas páginas sin proveedor. */
  const ctx = useContext(CuentameCtx);
  const abrir = ctx?.abrir ?? null;
  const rotulo = children ?? T[ctx?.idioma ?? "es"].titulo;

  const clases = cn(
    "tap-target inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-body font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    size === "lg" ? "h-14 px-9 text-lg" : "h-12 px-7 text-base",
    variant === "primary"
      ? "bg-primary text-on-accent shadow-soft hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-lift"
      : "border border-primary/35 bg-transparent text-primary-dark hover:border-primary hover:bg-primary/5",
    className
  );

  if (!abrir) {
    return (
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        className={clases}
      >
        {rotulo}
      </a>
    );
  }

  return (
    <button type="button" onClick={() => abrir()} className={clases}>
      {rotulo}
    </button>
  );
}

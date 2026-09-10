import { cn } from "@/lib/utils";

// Insignia de "Proveedor de tecnología verificado por Meta".
//
// REGLAS DE MARCA DE META — no tocar sin releer esto:
//   • NO se usa el logotipo de Meta ni el de WhatsApp. Cualquier contenido con
//     activos de marca de Meta, Facebook, Instagram o WhatsApp requiere
//     aprobación previa por su proceso de Brand Review. Por eso el sello de
//     abajo es un escudo dibujado por mí, con MI paleta.
//   • NO se escribe "Powered by Meta": Meta lo prohíbe expresamente.
//   • NO se insinúa respaldo ni recomendación. La frase es descriptiva y
//     factual: declara una verificación que efectivamente tengo.
//   • Se mantiene la separación de identidades: mi tipografía, mis colores,
//     sin azul de Meta ni verde de WhatsApp.
//
// El estatus es real y demostrable: verificación de negocio aprobada el
// 11/07/2026 y "Access verification status: verificado como proveedor de
// tecnología" en el portafolio comercial. Si algún día caduca, este componente
// sale del sitio el mismo día.
//
// ── RONDA DE DISEÑO ──────────────────────────────────────────────────────
// Es el activo más fuerte del sitio y estaba resuelto como una tarjeta más:
// mismo `rounded-2xl border-line bg-surface` que las otras siete de la
// portada, con un orbe difuminado detrás que no se percibía. Ahora se compone
// como lo que es —un documento acreditativo—: lomo de bronce a la izquierda,
// sello circular montado sobre papel, guilloché grabado en la esquina (el
// dibujo concéntrico de los títulos impresos) y un pie con regla donde vive
// la prueba.
//
// Tres arreglos concretos de paso:
//   • El sello de fecha —el ÚNICO dato verificable de la tarjeta— estaba en un
//     `hidden sm:inline-flex`: desaparecía justo en móvil, que es donde más se
//     lee. Ahora vive en el pie y se ve en todos los anchos.
//   • El antetítulo de 11px iba en `text-accent`: 3,07:1 sobre el papel, falla
//     AA. Pasa a `text-accent-ink` (6,00:1 sobre surface).
//   • Tenía `hover:shadow-lift` sin ser un enlace: prometía un clic que no
//     existe. Fuera; `shadow-lift` es solo para hover/foco de cosas que sí
//     llevan a algún sitio.

function VerifiedShield({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden className={className}>
      <defs>
        <linearGradient id="jv-shield" x1="8" y1="4" x2="32" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--violeta-400)" />
          <stop offset="1" stopColor="var(--violeta-600)" />
        </linearGradient>
      </defs>
      {/* Escudo propio: nada aquí imita un sello de Meta. */}
      <path
        d="M20 3.5l12.5 4.6v10.2c0 8.1-5.3 15.3-12.5 17.9C12.8 33.6 7.5 26.4 7.5 18.3V8.1L20 3.5z"
        fill="url(#jv-shield)"
        fillOpacity="0.12"
        stroke="url(#jv-shield)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M14.2 20.1l4.1 4.1 7.9-8.4"
        stroke="var(--teal-500)"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Estado de la credencial. Vive en el pie para que se lea en todos los anchos. */
function StatusChip({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] tabular-nums text-primary-dark",
        className
      )}
    >
      <span aria-hidden className="relative flex h-1.5 w-1.5 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping-thrice rounded-full bg-success opacity-60 motion-reduce:hidden" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
      </span>
      Verificado · jul 2026
    </span>
  );
}

/**
 * `compact` → pastilla de una línea, para el pie o junto a otros sellos.
 * `card`    → credencial con detalle, para la franja de confianza de la home.
 * `rail`    → columna estrecha, para el costado del hero. La de `card` es una
 *             composicion horizontal: a 288px se le parte el titulo en seis
 *             lineas y el texto se sale. Esta nace vertical.
 */
export function MetaTechProvider({
  variant = "card",
  className,
}: {
  variant?: "compact" | "card" | "rail";
  className?: string;
}) {
  if (variant === "compact") {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/80 px-4 py-2",
          className
        )}
      >
        <VerifiedShield className="h-4 w-4 shrink-0" />
        <span className="font-body text-sm text-current opacity-80">
          Proveedor de tecnología <strong className="font-semibold opacity-100">verificado por Meta</strong>
        </span>
      </span>
    );
  }

  if (variant === "rail") {
    return (
      <div
        className={cn(
          /* `bg-surface` opaco debajo del degradado: la tarjeta era translucida y el
             campo de manchas del hero se le colaba por detras, dejando «VERIFICADO ·
             JUL 2026» en 4,44:1. Una credencial no puede transparentar. */
          "relative overflow-hidden rounded-3xl border border-primary/20 bg-surface bg-gradient-to-br from-surface via-surface to-secondary/12 p-6 pl-7 text-left shadow-soft",
          className
        )}
      >
        {/* El mismo lomo encuadernado de la variante ancha: son la misma
            credencial en dos formatos, no dos piezas distintas. */}
        <span
          aria-hidden
          className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-accent via-primary to-primary-dark"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[repeating-radial-gradient(circle_at_50%_50%,rgba(152,92,62,0.075)_0_1px,transparent_1px_10px)] [-webkit-mask-image:radial-gradient(circle_at_50%_50%,#000_38%,transparent_72%)] [mask-image:radial-gradient(circle_at_50%_50%,#000_38%,transparent_72%)]"
        />

        <div className="relative">
          <div className="relative w-fit">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-primary/25 bg-gradient-to-br from-background to-surface shadow-soft">
              <VerifiedShield className="h-8 w-8" />
            </div>
            <span
              aria-hidden
              className="absolute -inset-1.5 rounded-full border border-dashed border-primary/25"
            />
          </div>

          <p className="mt-5 font-mono text-[11px] uppercase leading-relaxed tracking-[0.16em] text-accent-ink">
            Verificado por Meta
          </p>
          <p className="mt-2 text-balance font-display text-xl leading-[1.2] text-ink">
            Proveedor de tecnología
          </p>
          <p className="mt-3 text-pretty font-body text-[13px] leading-relaxed text-ink-soft">
            Conecto tu WhatsApp Business y construyo las automatizaciones encima. La cuenta queda{" "}
            <strong className="font-semibold text-ink">a tu nombre</strong> —no al mío.
          </p>

          <p className="mt-5 flex items-center gap-2 border-t border-line pt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-success" />
            Verificado · jul 2026
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-surface via-surface to-secondary/12 text-left shadow-soft",
        className
      )}
    >
      {/* Lomo: el canto encuadernado de un documento, no un borde de tarjeta. */}
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-accent via-primary to-primary-dark"
      />

      {/* Guilloché: anillos concéntricos grabados en la esquina, el recurso de
          los títulos y los certificados. Reemplaza al orbe con blur, que sobre
          este papel no producía ninguna diferencia perceptible. */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[repeating-radial-gradient(circle_at_50%_50%,rgba(152,92,62,0.075)_0_1px,transparent_1px_10px)] sm:-right-20 sm:-top-20 sm:h-64 sm:w-64 [-webkit-mask-image:radial-gradient(circle_at_50%_50%,#000_38%,transparent_72%)] [mask-image:radial-gradient(circle_at_50%_50%,#000_38%,transparent_72%)]"
      />

      <div className="relative p-6 pl-7 sm:p-8 sm:pl-10">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-7">
          {/* Sello: montado sobre papel, con su anillo de troquel. */}
          <div className="relative w-fit shrink-0 self-start">
            <div className="flex h-[4.25rem] w-[4.25rem] items-center justify-center rounded-full border border-primary/25 bg-gradient-to-br from-background to-surface shadow-soft">
              <VerifiedShield className="h-10 w-10" />
            </div>
            <span
              aria-hidden
              className="absolute -inset-1.5 rounded-full border border-dashed border-primary/25"
            />
          </div>

          <div className="min-w-0 sm:pt-1">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-ink">
              Automatizaciones sobre WhatsApp
            </p>
            <p className="mt-2.5 text-balance font-display text-2xl leading-[1.15] text-ink sm:text-[1.75rem]">
              Proveedor de tecnología verificado por Meta
            </p>
            <p className="mt-3 max-w-[58ch] text-pretty font-body text-sm leading-relaxed text-ink-soft">
              Conecto la cuenta de WhatsApp Business de tu negocio y construyo las
              automatizaciones sobre ella. Tu número, tus plantillas y la cuenta{" "}
              <strong className="font-semibold text-ink">a tu nombre</strong> —no al mío.
            </p>
          </div>
        </div>

        {/* Pie de credencial: la regla y la prueba. */}
        <div className="mt-6 flex items-center gap-4 border-t border-line pt-4">
          <StatusChip />
        </div>
      </div>
    </div>
  );
}

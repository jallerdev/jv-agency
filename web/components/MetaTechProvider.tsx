import { cn } from "@/lib/utils";

// Insignia de "Proveedor de tecnología verificado por Meta".
//
// REGLAS DE MARCA DE META — no tocar sin releer esto:
//   • NO se usa el logotipo de Meta ni el de WhatsApp. Cualquier contenido con
//     activos de marca de Meta, Facebook, Instagram o WhatsApp requiere
//     aprobación previa por su proceso de Brand Review. Por eso el sello de
//     abajo es un escudo dibujado por nosotros, con NUESTRA paleta.
//   • NO se escribe "Powered by Meta": Meta lo prohíbe expresamente.
//   • NO se insinúa respaldo ni recomendación. La frase es descriptiva y
//     factual: declara una verificación que efectivamente tenemos.
//   • Se mantiene la separación de identidades: nuestra tipografía, nuestros
//     colores, sin azul de Meta ni verde de WhatsApp.
//
// El estatus es real y demostrable: verificación de negocio aprobada el
// 11/07/2026 y "Access verification status: verificado como proveedor de
// tecnología" en el portafolio comercial. Si algún día caduca, este componente
// sale del sitio el mismo día.

function VerifiedShield({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden className={className}>
      <defs>
        <linearGradient id="jv-shield" x1="8" y1="4" x2="32" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C0763B" />
          <stop offset="1" stopColor="#985C3E" />
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
        stroke="#4F7A52"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * `compact` → pastilla de una línea, para el pie o junto a otros sellos.
 * `card`    → tarjeta con detalle, para la franja de confianza de la home.
 */
export function MetaTechProvider({
  variant = "card",
  className,
}: {
  variant?: "compact" | "card";
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

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-line bg-surface/80 p-6 shadow-soft transition-shadow duration-300 hover:shadow-lift sm:p-8",
        className
      )}
    >
      {/* Resplandor cálido, mismo lenguaje que los orbes del hero. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-12 -top-12 h-48 w-48 rounded-full bg-gradient-to-br from-accent/20 to-transparent blur-2xl"
      />

      {/* Sello de fecha arriba a la derecha: equilibra la composición y es la
          prueba concreta de la verificación. */}
      <span className="absolute right-5 top-5 hidden items-center gap-1.5 rounded-full border border-line bg-background/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft sm:inline-flex">
        <span className="h-1.5 w-1.5 rounded-full bg-success" />
        Verificado · jul 2026
      </span>

      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
        <div className="w-fit shrink-0 self-start rounded-xl border border-line bg-gradient-to-br from-background to-surface p-3 shadow-soft">
          <VerifiedShield className="h-11 w-11" />
        </div>

        <div className="min-w-0 sm:pt-0.5">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
            Automatizaciones sobre WhatsApp
          </p>
          <p className="mt-2.5 text-balance font-display text-2xl leading-[1.15] text-ink sm:text-[1.75rem]">
            Proveedor de tecnología verificado por Meta
          </p>
          <p className="mt-3 text-pretty font-body text-sm leading-relaxed text-ink-soft">
            Conectamos la cuenta de WhatsApp Business de tu negocio y construimos las
            automatizaciones sobre ella. Tu número, tus plantillas y la cuenta{" "}
            <strong className="font-semibold text-ink">a tu nombre</strong> —no al nuestro.
          </p>
        </div>
      </div>
    </div>
  );
}

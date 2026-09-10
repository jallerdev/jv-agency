import { cn } from "@/lib/utils";

/**
 * LA FICHA DE GOOGLE BUSINESS, LLENÁNDOSE CAMPO POR CAMPO
 * ─────────────────────────────────────────────────────────────────────────
 * Es el INSUMO. Su pareja natural es <BloqueLocalGoogle>, que enseña el
 * RESULTADO; montados uno al lado del otro cuentan la relación causa/efecto y
 * ahorran una sección entera. A 390 px se apilan en ese orden —insumo, luego
 * resultado—, que además es el orden narrativo correcto.
 *
 * Le pone cuerpo a un cobro que hoy es una cifra suelta en un párrafo y
 * contesta la pregunta que nadie formula pero todos tienen: «¿y qué me hace
 * usted exactamente por eso?».
 *
 * LOS VALORES SON GENÉRICOS Y VERDADEROS POR CONSTRUCCIÓN («Tu categoría
 * principal», «Tu horario real, sábados incluidos»). Nunca los de un negocio
 * concreto: eso sería inventar datos sobre un tercero.
 */

export type CampoFicha = {
  etiqueta: string;
  /** Sin valor = ranura punteada, o sea campo por llenar. */
  valor?: string;
};

export const CAMPOS_FICHA: CampoFicha[] = [
  { etiqueta: "Nombre", valor: "El nombre exacto con el que te buscan" },
  { etiqueta: "Categoría", valor: "Tu categoría principal, y las secundarias" },
  { etiqueta: "Dirección", valor: "Tu dirección, o la zona que cubres" },
  { etiqueta: "Horario", valor: "Tu horario real, sábados incluidos" },
  { etiqueta: "Teléfono", valor: "El WhatsApp por el que sí contestas" },
  { etiqueta: "Servicios", valor: "Lo que haces, uno por uno y con su precio" },
  { etiqueta: "Fotos", valor: "Fachada, adentro y trabajo hecho" },
  { etiqueta: "Reseñas" },
  { etiqueta: "Publicaciones" },
  { etiqueta: "Preguntas frecuentes" },
];

export function FichaGoogle({
  campos = CAMPOS_FICHA,
  titulo = "Ficha de Google Business",
  rotulo = "Ejemplo · campos genéricos, no los de ningún negocio",
  className,
}: {
  campos?: CampoFicha[];
  titulo?: string;
  rotulo?: string;
  className?: string;
}) {
  const llenos = campos.filter((c) => Boolean(c.valor)).length;
  const total = campos.length;
  const pct = total === 0 ? 0 : Math.round((llenos / total) * 100);

  return (
    <div className={cn("jv-card p-5 sm:p-6", className)}>
      <p className="jv-eyebrow text-accent-ink">{titulo}</p>

      {/* Medidor. El porcentaje va FUERA de la barra: a 390 px la barra mide
          unos 300 px y el número se solapa con el borde del relleno. */}
      <div className="mt-3 flex items-center gap-3">
        <span
          role="img"
          aria-label={`${llenos} de ${total} campos llenos — ejemplo`}
          className="h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-background"
        >
          <span
            aria-hidden
            style={{ width: `${pct}%` }}
            className="block h-full rounded-full bg-gradient-to-r from-secondary to-primary"
          />
        </span>
        <span aria-hidden className="shrink-0 font-mono text-[11px] tabular-nums text-ink-soft">
          {llenos}/{total}
        </span>
      </div>

      <dl className="mt-5 divide-y divide-line">
        {campos.map((c) => (
          <div
            key={c.etiqueta}
            className="grid gap-1 py-2.5 sm:grid-cols-[7rem_1fr] sm:items-baseline sm:gap-3"
          >
            <dt className="jv-eyebrow text-accent-ink">
              {c.etiqueta}
            </dt>
            <dd className="min-w-0">
              {c.valor ? (
                <span className="font-body text-[15px] leading-snug text-ink">{c.valor}</span>
              ) : (
                <span
                  aria-hidden
                  className="block h-6 rounded-md border border-dashed border-line"
                />
              )}
              {!c.valor && <span className="sr-only">Por llenar</span>}
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-5 jv-rule pt-4 font-mono text-[11px] leading-relaxed text-ink-soft">
        {rotulo}
      </p>
    </div>
  );
}

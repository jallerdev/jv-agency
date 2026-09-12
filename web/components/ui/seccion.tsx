import { cn } from "@/lib/utils";
import type { Encabezado, Idioma } from "@/content/types";

/**
 * El contenedor y el ritmo de TODAS las secciones.
 *
 * Existe para que el ancho y el aire vertical se decidan una vez. Antes cada
 * sección escribía su propio `max-w` y su propio `py`, y acababa habiendo seis
 * anchos distintos que nadie eligió: aparecían al copiar y pegar.
 *
 *   ancho   1280px
 *   margen  24px en móvil · 48px de md en adelante
 *   ritmo   96px en móvil · 128px de md en adelante
 */
export function Seccion({
  id,
  className,
  ancho = "normal",
  children,
}: {
  id?: string;
  className?: string;
  /** `estrecho` para bloques de prosa: 900px en vez de 1280. */
  ancho?: "normal" | "estrecho";
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("scroll-mt-24 py-24 md:py-32", className)}>
      <div
        className={cn(
          "mx-auto px-6 md:px-12",
          ancho === "estrecho" ? "max-w-[900px]" : "max-w-[1280px]"
        )}
      >
        {children}
      </div>
    </section>
  );
}

/**
 * El antetítulo de sección: mono, mayúscula, naranja.
 *
 * Es uno de los cinco sitios donde el acento tiene permitido aparecer.
 *
 * Se apoya en `.jv-eyebrow`, que es la definición del sistema, en vez de
 * repetir sus valores: aquí había una segunda versión escrita a mano —mismo
 * tamaño pero `0.12em` de tracking en vez de `0.16em`— y el sitio acababa con
 * dos antetítulos que se parecían sin ser iguales. La clase de Tailwind gana
 * al color de la clase base, que es lo que queremos: misma forma, tinta de
 * marca.
 */
export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("jv-eyebrow text-brand", className)}>{children}</p>;
}

/**
 * El titular, con la frase operativa en naranja.
 *
 * Parte la cadena por `acento` en vez de pedir dos campos —«antes» y
 * «después»— porque así el texto sigue siendo UNA frase legible en el archivo
 * de contenido, y quien traduce no tiene que entender la mecánica del corte.
 * Si `acento` no aparece literal dentro del título, el titular sale entero sin
 * resaltar: falla en silencio y hacia el lado seguro.
 */
export function Titular({
  texto,
  acento,
  as: Tag = "h2",
  className,
}: {
  texto: string;
  acento?: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  const corte = acento ? texto.indexOf(acento) : -1;

  const base = cn(
    "text-balance",
    Tag === "h1"
      ? "text-[length:var(--text-hero)]"
      : "text-[length:var(--text-display)]",
    className
  );

  if (corte === -1) return <Tag className={base}>{texto}</Tag>;

  return (
    <Tag className={base}>
      {texto.slice(0, corte)}
      <span className="text-brand">{acento}</span>
      {texto.slice(corte + acento!.length)}
    </Tag>
  );
}

/** Encabezado completo de sección: antetítulo, titular y entradilla. */
export function EncabezadoSeccion({
  contenido,
  idioma,
  as = "h2",
  className,
}: {
  contenido: Encabezado;
  idioma: Idioma;
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div className={cn("max-w-[46rem]", className)}>
      {contenido.eyebrow && <Eyebrow>{contenido.eyebrow[idioma]}</Eyebrow>}
      <Titular
        as={as}
        texto={contenido.titulo[idioma]}
        acento={contenido.acento?.[idioma]}
        className={contenido.eyebrow ? "mt-4" : undefined}
      />
      {contenido.entradilla && (
        <p className="mt-6 max-w-[42rem] text-pretty text-ink-soft">
          {contenido.entradilla[idioma]}
        </p>
      )}
    </div>
  );
}

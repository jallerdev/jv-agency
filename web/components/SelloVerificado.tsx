import { cn } from "@/lib/utils";

/**
 * EL SELLO DE VERIFICACIÓN
 * ──────────────────────────────────────────────────────────────────────────
 * Un escudo dibujado por mí. NO imita el de Meta ni usa un solo activo suyo:
 * cualquier contenido con marca de Meta, Facebook, Instagram o WhatsApp exige
 * su Brand Review previo, y aquí no hace falta pedir permiso para nada.
 *
 * VA EN `currentColor`, NO EN UN DEGRADADO CON `id`. Antes tenía un
 * `<linearGradient id="jv-shield">`: dos instancias en la misma página
 * declaraban el mismo id dos veces —que es marcado inválido— y encima sus
 * paradas apuntaban a `--violeta-400` y `--violeta-600`, variables que
 * murieron con el cambio de marca, así que el escudo salía sin relleno.
 * Con `currentColor` hereda el color de quien lo pone y no hay id que chocar.
 *
 * EL VISTO SE DIBUJA SOLO. `.jv-visto` lo traza en 0,7 s al entrar. No es
 * adorno: la tarjeta afirma que algo está verificado, y el gesto lo verifica
 * delante de quien mira en lugar de darlo por hecho.
 */
export function SelloVerificado({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden className={cn("text-brand", className)}>
      <path
        d="M20 3.5l12.5 4.6v10.2c0 8.1-5.3 15.3-12.5 17.9C12.8 33.6 7.5 26.4 7.5 18.3V8.1L20 3.5z"
        fill="currentColor"
        fillOpacity="0.12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      {/* EL VISTO VA EN BLANCO, NO EN VERDE. El verde de estado dentro de un
          escudo naranja mete un segundo color de marca donde el sistema dice
          que hay uno solo, y encima los dos se pelean: naranja y verde no
          pegan. En blanco, el visto es el punto más claro de la pieza y lo
          primero que ve el ojo, que es lo que tiene que pasar. */}
      <path
        className="jv-visto"
        d="M14.2 20.1l4.1 4.1 7.9-8.4"
        stroke="var(--blanco)"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

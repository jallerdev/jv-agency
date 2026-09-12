import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * EL BOTÓN DELEGA EN EL SISTEMA, NO LO REPITE.
 *
 * Aquí vivía una segunda definición de botón, escrita cuando el sitio era
 * bronce sobre papel: relleno `bg-primary`, sombra `shadow-soft`, y un
 * `hover:-translate-y-0.5` con `hover:shadow-lift`. Los comentarios seguían
 * explicando contrastes del cobre #C0763B, que no existe desde el rediseño.
 *
 * El resultado eran DOS botones en el mismo sitio: la cabecera de la portada
 * usa `.jv-boton` —la definición del sistema, documentada en DESIGN.md— y
 * diecinueve archivos usaban este. Se parecían lo suficiente para que nadie lo
 * notara y lo bastante poco para que el sitio no se sintiera de una sola mano,
 * que es justo lo que hay que arreglar.
 *
 * Ahora esto es una capa fina sobre las clases del sistema. Cambiar el botón
 * del sitio entero vuelve a ser cambiar una regla en `app/globals.css`.
 *
 * Dos cosas que se van con el cambio, y ninguna se echa de menos:
 *   · La sombra. La escala entera vale `none` desde el rediseño, así que
 *     `shadow-soft` y `shadow-lift` no pintaban nada: eran ruido en la clase.
 *   · El `-translate-y-0.5` en hover. Sin guardia de puntero, en una pantalla
 *     táctil `:hover` se queda pegado después de tocar y el botón se queda
 *     medio píxel arriba hasta que tocas otra cosa.
 */
const buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap", {
  variants: {
    variant: {
      /* Naranja con texto casi negro: 5,96:1. El blanco sobre este naranja da
         3,36:1 y por eso el sistema no lo usa. */
      primary: "jv-boton",
      /* Filete, sin relleno. Nunca compite con el primario. */
      outline: "jv-boton-2",
      /* Sin caja: para acciones terciarias dentro de un bloque. */
      /* `bg-raised` y no una utilidad de capa de estado: `--hs-hover` existe en
         los tokens pero no está expuesta en tailwind.config, así que
         `hover:bg-hover` no habría generado ni una regla —el fallo silencioso
         que este repo ya pagó ochenta veces—. */
      ghost:
        "min-h-[2.75rem] rounded-full px-5 font-semibold text-ink-soft transition-colors duration-base ease-ps hover:bg-raised hover:text-ink",
    },
    /* El tamaño solo ajusta alto, aire y cuerpo de letra: la forma, el color y
       la transición los pone la clase del sistema. `sm` son 44px, que es el
       mínimo táctil y el suelo de todo lo que se pueda tocar. */
    size: {
      sm: "h-11 px-5 text-sm",
      md: "h-12 px-7 text-base",
      lg: "h-14 px-9 text-lg",
      xl: "h-16 px-11 text-xl",
    },
  },
  defaultVariants: { variant: "primary", size: "md" },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const classes = cn(buttonVariants({ variant, size, className }));

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<{ className?: string }>;
      return React.cloneElement(child, {
        className: cn(classes, child.props.className),
      });
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

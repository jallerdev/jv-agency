import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-body font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        /* Bronce de marca con texto crema. Antes el relleno era el cobre
           (#C0763B) con texto tinta, y el comentario decia que era seguro en
           contraste: no lo era. Daba 4,28:1 y el minimo para texto normal es
           4,5:1. Ponerle letras claras a ese mismo cobre lo empeoraba a 3,31:1,
           asi que el arreglo no era cambiar el texto sino el relleno.

           El bronce #985C3E con crema da 4,96:1, y al pasar el hover a
           primary-dark sube a 7,97:1. De paso, el CTA del hero y el del
           encabezado dejan de ser dos botones distintos: son el mismo. */
        primary:
          "rounded-full bg-primary text-surface shadow-soft hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-lift",
        outline:
          "rounded-full border border-primary/35 bg-transparent text-primary-dark hover:border-primary hover:bg-primary/5",
        ghost: "rounded-full text-ink-soft hover:text-ink hover:bg-ink/5",
      },
      size: {
        sm: "h-10 px-5 text-sm",
        md: "h-12 px-7 text-base",
        lg: "h-14 px-9 text-lg",
        xl: "h-16 px-11 text-xl",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

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

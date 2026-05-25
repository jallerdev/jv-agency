import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-body font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // Accent (copper) fill pairs with ink text — WCAG-safe at this size
        primary:
          "rounded-full bg-accent text-ink shadow-soft hover:shadow-glow hover:-translate-y-0.5 hover:bg-[#cb8049]",
        // Deep bronze fill with cream text
        solid:
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
      return React.cloneElement(children as React.ReactElement, {
        className: cn(classes, (children as React.ReactElement).props.className),
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

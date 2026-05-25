import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type = "text", ...props }, ref) => (
  <input
    ref={ref}
    type={type}
    className={cn(
      "h-12 w-full rounded-full border border-line bg-surface px-5 font-body text-base text-ink placeholder:text-ink-soft/60 transition-colors focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30",
      className
    )}
    {...props}
  />
));
Input.displayName = "Input";

export { Input };

import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-primary/20 bg-surface/70 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.18em] text-primary-dark",
        className
      )}
      {...props}
    />
  );
}

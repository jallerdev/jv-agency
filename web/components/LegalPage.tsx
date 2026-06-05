import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { LEGAL_UPDATED } from "@/lib/business";

export function LegalPage({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-5 pb-24 pt-32 md:px-8 md:pt-40">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">Legal</p>
        <h1 className="mt-3 font-display text-4xl text-ink md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl font-body text-base leading-relaxed text-ink-soft">{intro}</p>
        <p className="mt-2 font-body text-sm text-ink-soft/70">
          Última actualización: {LEGAL_UPDATED}
        </p>
        <div className="legal mt-10">{children}</div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

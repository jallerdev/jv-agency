"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, ArrowRight, Eye, EyeOff, LoaderCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AccesoForm({
  docId,
  titulo,
  descripcion,
  destino,
}: {
  docId: string;
  titulo: string;
  descripcion: string;
  destino: string;
}) {
  const router = useRouter();
  const [clave, setClave] = useState("");
  const [verClave, setVerClave] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState(false);

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    if (!clave || enviando) return;
    setEnviando(true);
    setError(false);
    try {
      const res = await fetch("/api/acceso", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ doc: docId, password: clave }),
      });
      if (!res.ok) {
        setError(true);
        setClave("");
        setEnviando(false);
        return;
      }
      // `replace` y no `push`: al volver atrás no tiene sentido regresar a la
      // pantalla de la clave cuando ya se entró.
      window.location.replace(destino);
    } catch {
      setError(true);
      setEnviando(false);
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="rounded-[1.5rem] border border-line bg-surface p-8 shadow-lift md:p-10">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-on-accent shadow-soft">
          <Lock className="h-5 w-5" />
        </span>

        <h1 className="mt-6 font-display text-2xl leading-tight text-ink md:text-3xl">{titulo}</h1>
        <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft">{descripcion}</p>

        <form onSubmit={enviar} className="mt-8">
          <label
            htmlFor="clave"
            className="block font-body text-sm font-medium text-ink"
          >
            Contraseña
          </label>

          <div className="relative mt-2">
            <input
              id="clave"
              name="clave"
              type={verClave ? "text" : "password"}
              value={clave}
              onChange={(e) => {
                setClave(e.target.value);
                if (error) setError(false);
              }}
              autoFocus
              autoComplete="current-password"
              aria-invalid={error}
              aria-describedby={error ? "clave-error" : undefined}
              placeholder="La que te compartimos"
              className={cn(
                "w-full rounded-xl border bg-background/50 py-3 pl-4 pr-12 font-body text-ink transition-colors placeholder:text-ink-soft/50 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-surface",
                error ? "border-danger" : "border-line focus:border-primary/40",
              )}
            />
            <button
              type="button"
              onClick={() => setVerClave((v) => !v)}
              aria-label={verClave ? "Ocultar contraseña" : "Mostrar contraseña"}
              className="absolute right-1 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-lg text-ink-soft transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {verClave ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          {/* El aviso ocupa su sitio siempre: si apareciera de la nada,
              empujaría el botón justo cuando el usuario va a tocarlo. */}
          <p
            id="clave-error"
            role="alert"
            className={cn(
              "mt-2 min-h-[1.25rem] font-body text-sm",
              error ? "text-danger" : "text-transparent",
            )}
          >
            {error ? "Esa contraseña no es. Revísala e inténtalo otra vez." : " "}
          </p>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="mt-4 w-full"
            disabled={!clave || enviando}
          >
            {enviando ? (
              <>
                <LoaderCircle className="h-5 w-5 animate-spin" /> Entrando…
              </>
            ) : (
              <>
                Entrar <ArrowRight className="h-5 w-5" />
              </>
            )}
          </Button>
        </form>

        <p className="mt-6 border-t border-line pt-5 font-body text-xs leading-relaxed text-ink-soft">
          ¿No tienes la contraseña o se te perdió? Escríbeme y te la reenvío.
        </p>
      </div>

      <p className="mt-6 text-center font-body text-xs text-ink-soft">
        Documento privado de JV Agencia · no aparece en buscadores
      </p>
    </div>
  );
}

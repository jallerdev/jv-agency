"use client";

import { useEffect, useRef, useState } from "react";
import { WHATSAPP_NUMBER } from "@/lib/contact";

const PREFILL =
  "Hola JV Agencia 👋 Me interesa hablar sobre un proyecto de diseño o desarrollo web.";

/* Botón flotante de WhatsApp.
 *
 * Tres decisiones, todas por el mismo motivo —dejar de competir con el
 * contenido que sí convierte:
 *
 * 1. COLOR. Antes era #25D366 sobre una paleta cálida y apagada: el elemento
 *    más saturado de la página, fijo, en las cuatro esquinas. Se leía como un
 *    widget de terceros pegado encima. Ahora es bronce de marca con el glifo
 *    en crema (7,4:1): el canal se reconoce por la FORMA del icono, que es lo
 *    que identifica a WhatsApp, no por el verde. Cero colores nuevos.
 *
 * 2. PULSO. `animate-ping` corría infinito en las cuatro páginas, para
 *    siempre. Ahora late tres veces —`animate-ping-thrice`— la primera vez que
 *    aparece y se calla. Llama la atención una vez; después es un botón.
 *
 * 3. DÓNDE ESTÁ. Medido: a 390 px se sentaba encima del CTA del hero, de los
 *    disparadores del FAQ y de los enlaces del pie. Ahora aparece cuando el
 *    visitante ya dejó atrás la primera pantalla, y se aparta cuando llega al
 *    formulario de contacto o al pie —donde ya tiene la acción a mano y el
 *    botón solo estorbaría. La transición usa el sistema de movimiento, así
 *    que con prefers-reduced-motion aparece y desaparece sin animación.
 */
export function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(PREFILL)}`;

  const [visible, setVisible] = useState(false);
  /* El anillo se monta la primera vez que el botón entra en escena y se queda:
     la animación tiene tres iteraciones y termina sola. Si se desmontara al
     terminar, cada reaparición volvería a latir. */
  const [ring, setRing] = useState(false);
  /* El formulario de contacto y el pie: donde el visitante ya tiene la acción
     delante, el flotante sobra y encima tapa enlaces. */
  const blockers = useRef<Set<Element>>(new Set());
  /* Dirección del scroll: bajando el flotante se aparta, subiendo vuelve.
     Bajando el visitante está leyendo y el botón solo tapa; subiendo suele
     estar buscando cómo actuar. */
  const lastY = useRef(0);
  const goingDown = useRef(false);
  /* La primera aparición es incondicional y dura lo que dura el pulso: si no,
     quien baja de corrido no lo vería nunca. */
  const shownAt = useRef(0);

  useEffect(() => {
    let frame = 0;

    const compute = () => {
      frame = 0;
      const y = window.scrollY;
      const vh = window.innerHeight;
      const doc = document.documentElement.scrollHeight;

      /* Zona muerta de 6 px: sin ella el botón parpadea con el rebote del
         scroll suave y con cualquier temblor del dedo. */
      const delta = y - lastY.current;
      if (Math.abs(delta) > 6) {
        goingDown.current = delta > 0;
        lastY.current = y;
      }

      /* Fuera de la primera pantalla: ahí manda el hero y sus botones. */
      const pastHero = y > vh * 0.6;
      /* Cinturón por si no hay pie que observar en alguna página. */
      const atBottom = y + vh >= doc - 120;
      const eligible = pastHero && !atBottom && blockers.current.size === 0;

      if (!eligible) {
        shownAt.current = 0;
        setVisible(false);
        return;
      }
      const now = Date.now();
      if (!shownAt.current) shownAt.current = now;
      /* 3 s de gracia desde que aparece: el tiempo del pulso. */
      setVisible(now - shownAt.current < 3000 || !goingDown.current);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(compute);
    };

    /* Medido antes de esto: el FAB se sentaba encima del CTA del hero, de los
       disparadores del FAQ y de los 17 enlaces del pie. Mientras el formulario
       de agendamiento o el pie estén en pantalla, se retira. */
    const targets = [
      document.getElementById("contacto"),
      document.querySelector("body > footer"),
    ].filter((el): el is Element => Boolean(el));

    let observer: IntersectionObserver | undefined;
    if (targets.length && typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) blockers.current.add(entry.target);
            else blockers.current.delete(entry.target);
          }
          compute();
        },
        { threshold: 0 }
      );
      targets.forEach((el) => observer!.observe(el));
    }

    lastY.current = window.scrollY;
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      observer?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (visible) setRing(true);
  }, [visible]);

  return (
    <>
      {/* Sin JavaScript el botón se quedaría en opacity 0 para siempre, porque
          su visibilidad la decide el scroll. Dos líneas de CSS y el enlace
          sigue existiendo para quien navegue sin JS. */}
      <style>{
        "@media (scripting: none){[data-wa-fab]{opacity:1!important;transform:none!important;pointer-events:auto!important}}"
      }</style>
    <a
      data-wa-fab=""
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbeme por WhatsApp"
      aria-hidden={!visible}
      tabIndex={visible ? undefined : -1}
      data-visible={visible ? "" : undefined}
      className={[
        "group fixed bottom-5 right-4 z-50 flex items-center gap-3 sm:bottom-6 sm:right-6",
        "transition-[opacity,transform] duration-slow ease-state",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
      ].join(" ")}
    >
      {/* Etiqueta: aparece en hover y —esto faltaba— también con foco de teclado. */}
      <span className="pointer-events-none hidden max-w-0 overflow-hidden whitespace-nowrap rounded-full border border-line bg-surface px-0 py-2.5 font-body text-sm font-medium text-ink opacity-0 shadow-soft transition-all duration-slow ease-state group-hover:max-w-xs group-hover:px-5 group-hover:opacity-100 group-focus-visible:max-w-xs group-focus-visible:px-5 group-focus-visible:opacity-100 md:block">
        Escríbeme por WhatsApp
      </span>

      <span className="relative flex h-14 w-14 items-center justify-center">
        {/* Anillo: tres latidos al aparecer y se calla. */}
        {ring && (
          <span
            aria-hidden
            className="absolute inline-flex h-full w-full animate-ping-thrice rounded-full bg-primary opacity-30 motion-reduce:hidden"
          />
        )}
        <span className="tap-target relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary-dark text-surface shadow-soft transition-card duration-slow ease-state group-hover:-translate-y-0.5 group-hover:bg-primary group-hover:shadow-lift group-focus-visible:-translate-y-0.5 group-focus-visible:shadow-lift group-active:translate-y-0 group-active:scale-[0.96] group-active:shadow-soft">
          <svg
            viewBox="0 0 24 24"
            className="h-7 w-7"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.515 5.26l-.999 3.648 3.737-.985zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.074-.149-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
        </span>
      </span>
    </a>
    </>
  );
}

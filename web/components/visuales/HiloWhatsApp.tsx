import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

/**
 * EL HILO QUE CONTESTA SOLO
 * ─────────────────────────────────────────────────────────────────────────
 * La objeción real del dueño no es «¿funciona?», es «¿va a sonar como un robot
 * y a espantarme al cliente?». Esa pregunta solo se contesta enseñando las
 * palabras exactas, así que el visual ES la conversación.
 *
 * La última burbuja no la manda el bot para cerrar la venta: es el traspaso a
 * una persona. Ahí vive la promesa honesta que hoy está enterrada en el FAQ
 * —no reemplaza a nadie, filtra— y es lo que quita el miedo a comprar.
 *
 * REGLAS DE MARCA (las mismas de MetaTechProvider):
 *   · Ni verde de WhatsApp ni azul de Meta. La paleta es la de la casa.
 *   · El negocio del ejemplo es evidentemente ficticio y va rotulado como
 *     ejemplo DENTRO del propio visual, no en un comentario.
 */

export type MensajeHilo = {
  /** Quién habla. `cliente` va a la izquierda, `bot` a la derecha. */
  de: "cliente" | "bot";
  /** Texto de la burbuja. Se omite cuando `escribiendo` es true. */
  texto?: string;
  /** Hora corta, tal y como la pinta WhatsApp. Va en su propio renglón. */
  hora?: string;
  /** Pinta los tres puntos de «escribiendo…» en vez de texto. */
  escribiendo?: boolean;
  /** El traspaso a una persona: se marca aparte porque es el argumento. */
  traspaso?: boolean;
};

/**
 * Conversación por defecto: cita pedida a las 9:41 p.m., tres horarios, el
 * cliente escoge, confirmación, y el traspaso. Cámbiala por `mensajes` si la
 * página vende otra cosa (pedidos, cotizaciones, avisos).
 */
export const HILO_CITAS: MensajeHilo[] = [
  { de: "cliente", texto: "Buenas, ¿tienen cita para mañana?", hora: "9:41 p.m." },
  { de: "bot", escribiendo: true },
  {
    de: "bot",
    texto:
      "¡Hola! Sí. Para mañana me quedan tres horas libres: 9:00 a.m., 11:30 a.m. y 3:00 p.m. ¿Cuál te sirve?",
    hora: "9:41 p.m.",
  },
  { de: "cliente", texto: "La de 11:30", hora: "9:42 p.m." },
  {
    de: "bot",
    texto: "Listo, quedaste para mañana a las 11:30 a.m. Te llega un recordatorio dos horas antes.",
    hora: "9:42 p.m.",
  },
  {
    de: "bot",
    traspaso: true,
    texto:
      "Si necesitas cambiar la hora o preguntar por precios, mañana a primera hora te contesta una persona del negocio.",
    hora: "9:42 p.m.",
  },
];

function PuntosEscribiendo() {
  return (
    /* Decorativo y nada más: el contenido lo trae la burbuja siguiente, así
       que no se anuncia. Con movimiento reducido desaparece entero. */
    <span aria-hidden className="flex items-center gap-1 py-1 motion-reduce:hidden">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          aria-hidden
          className="punto-escribe h-1.5 w-1.5 rounded-full bg-primary"
          style={{ animationDelay: `${i * 150}ms` }}
        />
      ))}
    </span>
  );
}

export function HiloWhatsApp({
  mensajes = HILO_CITAS,
  negocio = "Negocio de ejemplo",
  iniciales = "NE",
  rotulo = "Ejemplo · conversación de muestra",
  className,
}: {
  mensajes?: MensajeHilo[];
  negocio?: string;
  iniciales?: string;
  rotulo?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden jv-card shadow-frame",
        className
      )}
    >
      {/* Cabecera de chat. Sin logotipos de nadie: iniciales sobre bronce. */}
      <div className="flex items-center gap-3 border-b border-line bg-background/70 px-4 py-3">
        <span
          aria-hidden
          /* El degradado arrancaba en `secondary` y las iniciales en crema daban
             2,95:1 sobre ese extremo: falla AA a 11px. Con primary→primary-dark
             el peor punto del degradado es 4,96:1, el mismo número que ya usa
             el botón primario. El `bg-primary` de más no es redundante: deja el
             suelo del degradado declarado como color sólido, así que cualquier
             medición automática lee un valor cierto en vez de «transparente». */
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary bg-gradient-to-br from-primary to-primary-dark font-mono text-[11px] font-semibold uppercase tracking-wide text-on-accent"
        >
          {iniciales}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate font-body text-sm font-semibold text-ink">{negocio}</span>
          <span className="flex items-center gap-1.5 jv-eyebrow text-ink-soft">
            <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-success" />
            En línea
          </span>
        </span>
      </div>

      {/* El hilo. Reveal escalona las burbujas; con movimiento reducido
          entrega todas puestas, nunca un hilo a medio pintar. */}
      <Reveal stagger className="flex flex-col gap-2.5 px-4 py-5" amount={0.15}>
        {mensajes.map((m, i) => {
          const esBot = m.de === "bot";
          return (
            <div key={i} className={cn("flex", esBot ? "justify-end" : "justify-start")}>
              <div
                className={cn(
                  "w-fit max-w-[85%] rounded-2xl border px-3.5 py-2.5",
                  esBot
                    ? "rounded-br-sm border-primary/20 bg-primary/10"
                    : "rounded-bl-sm border-line bg-background",
                  m.traspaso && "border-dashed border-accent/40 bg-accent/[0.07]"
                )}
              >
                {m.traspaso && (
                  <span className="mb-1.5 block jv-eyebrow text-accent-ink">
                    Te paso con una persona
                  </span>
                )}

                {m.escribiendo ? (
                  <PuntosEscribiendo />
                ) : (
                  <p className="break-words font-body text-[15px] leading-snug text-ink">
                    {m.texto}
                  </p>
                )}

                {m.hora && !m.escribiendo && (
                  <span className="mt-1 block text-right font-mono text-[11px] tabular-nums text-ink-soft">
                    {m.hora}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </Reveal>

      <p className="border-t border-line px-4 py-3 jv-eyebrow text-accent-ink">
        {rotulo}
      </p>
    </div>
  );
}

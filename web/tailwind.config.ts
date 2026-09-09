import type { Config } from "tailwindcss";

/* Los valores de movimiento apuntan a las custom properties de
   app/globals.css: ahí está la única definición del sistema. Aquí solo se
   exponen como utilidades de Tailwind para poder escribir duration-slow o
   ease-entrance en el JSX. Si hay que cambiar una curva, se cambia allá. */
const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      /* La escala de opacidad de Tailwind va de cinco en cinco, y el
         modificador `/12` que hay repartido por el sitio —`bg-primary/12`,
         `bg-success/12`, `border-surface/12`, `to-secondary/12`— NO existe en
         ella: esas nueve utilidades no generaban regla ninguna y el fondo
         salía transparente o el borde caía al color por defecto. Se ve al
         mirar el CSS servido: `bg-success/15` está, `bg-success/12` no.

         Añadir el 12 arregla las nueve de una vez y deja escrito el valor que
         alguien quiso. */
      opacity: {
        12: "0.12",
      },
      colors: {
        primary: {
          DEFAULT: "#985C3E",
          dark: "#6E4128",
        },
        secondary: "#B08968",
        accent: {
          /* Superficies, bordes, iconos >=20px y cifras grandes: ahí el
             cobre solo necesita 3:1 y lo cumple. */
          DEFAULT: "#C0763B",
          /* El mismo cobre, oscurecido, para cuando hace de TEXTO.
             #C0763B sobre el papel da 3,07:1 y falla AA en cualquier
             antetítulo de 11px. Este da 5,56:1 sobre background y 6,00:1
             sobre surface, y sigue leyéndose como cobre. */
          ink: "#8C4F1F",
        },
        surface: "#FAF6F1",
        background: "#F4EDE4",
        /* Papel en un tono mas hondo, para las bandas de seccion. */
        band: "#ECE1D5",
        ink: {
          DEFAULT: "#2B2420",
          soft: "#6B5E54",
        },
        line: "#E4D8CB",
        success: {
          DEFAULT: "#4F7A52",
          /* El mismo verde, oscurecido, para cuando hace de TEXTO —misma
             regla que `accent.ink`. #4F7A52 da 3,98:1 sobre la pastilla de
             `bg-success/12` y 4,35:1 sobre el papel: pasa para un icono de
             24px, no para una etiqueta de 10px. Este da 5,23:1 y 6,06:1. */
          ink: "#3F6642",
        },
        warning: "#B57E2C",
        danger: "#B0453C",
      },
      /* Escala de radios con lógica de anidación:
         radio interior = radio exterior - padding.
         sección/panel 3xl-4xl · tarjeta 2xl · sub-tarjeta xl ·
         chip e icono lg · control de formulario md.
         xl y 2xl conservan su valor de siempre: no mueven nada de lo hecho. */
      borderRadius: {
        sm: "0.375rem",
        md: "0.625rem",
        lg: "0.875rem",
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "1.75rem",
        "4xl": "2rem",
      },
      /* Tres niveles de elevación con función asignada, más un marco.
         soft = reposo · lift = SOLO hover/foco · glow = un elemento por
         página, el que debe dominar. */
      boxShadow: {
        soft: "0 2px 8px -2px rgba(43, 36, 32, 0.08), 0 8px 24px -8px rgba(43, 36, 32, 0.12)",
        lift: "0 12px 40px -12px rgba(110, 65, 40, 0.28)",
        glow: "0 0 0 1px rgba(192, 118, 59, 0.25), 0 16px 48px -16px rgba(192, 118, 59, 0.45)",
        /* Sombra de dos tiempos —contacto duro + difusa larga— para las
           piezas que deben tener peso físico sobre el papel cálido: las
           capturas del portafolio y el caso a fondo. */
        frame:
          "0 1px 2px rgba(43, 36, 32, 0.10), 0 18px 28px -14px rgba(110, 65, 40, 0.35), 0 46px 70px -40px rgba(110, 65, 40, 0.45)",
        "frame-hover":
          "0 2px 4px rgba(43, 36, 32, 0.12), 0 28px 44px -16px rgba(110, 65, 40, 0.40), 0 70px 100px -50px rgba(110, 65, 40, 0.50)",
        /* Hundido: para bandejas o paneles que contienen, en vez de elevar. */
        well: "inset 0 2px 14px rgba(43, 36, 32, 0.06)",
      },
      transitionDuration: {
        instant: "var(--duration-instant)",
        quick: "var(--duration-quick)",
        base: "var(--duration-base)",
        slow: "var(--duration-slow)",
        ambient: "var(--duration-ambient)",
      },
      transitionTimingFunction: {
        entrance: "var(--ease-entrance)",
        exit: "var(--ease-exit)",
        state: "var(--ease-state)",
        spring: "var(--ease-spring)",
      },
      transitionDelay: {
        stagger: "var(--reveal-stagger)",
        "stagger-2": "calc(var(--reveal-stagger) * 2)",
        "stagger-3": "calc(var(--reveal-stagger) * 3)",
      },
      /* Listas explícitas para no volver a escribir transition-all, que
         interpola cosas que nadie quiere (y retrasa el anillo de foco). */
      transitionProperty: {
        chrome: "background-color, border-color, backdrop-filter, box-shadow, padding",
        card: "transform, box-shadow, border-color, background-color",
        surface: "background-color, border-color, color",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-down": {
          from: { opacity: "0", transform: "translateY(-12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        /* Paso de formulario. La dirección la pone el componente:
           style={{ "--step-dir": back ? "-16px" : "16px" }} */
        "step-in": {
          from: { opacity: "0", transform: "translateX(var(--step-dir, 16px))" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        /* Acordeón: la ALTURA es la que tiene que animar. Radix ya publica
           --radix-accordion-content-height; hasta ahora nadie la usaba y el
           panel saltaba de golpe mientras el texto hacía fade. */
        "accordion-down": {
          from: { height: "0", opacity: "0" },
          to: { height: "var(--radix-accordion-content-height)", opacity: "1" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)", opacity: "1" },
          to: { height: "0", opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        /* Diálogo. La distancia la pone quien lo usa —en móvil el panel sube
           desde abajo como una hoja, en escritorio solo se asienta— con
           `[--dialog-from:...]`, así que un solo fotograma sirve para las dos
           formas del mismo componente. */
        "dialog-in": {
          from: {
            opacity: "0",
            transform: "translateY(var(--dialog-from, 12px)) scale(var(--dialog-scale, 0.985))",
          },
          to: { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        /* El velo solo aparece: si además se moviera, arrastraría la mirada
           hacia el fondo justo cuando el panel la reclama. */
        "veil-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        /* Respiración de luz para los orbes del hero: se percibe y no cuesta
           recomponer un blur de 448px en cada fotograma. */
        "ambient-glow": {
          "0%, 100%": { opacity: "0.75" },
          "50%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "fade-in": "fade-in var(--duration-ambient) var(--ease-entrance) both",
        "fade-in-down": "fade-in-down var(--duration-slow) var(--ease-entrance) both",
        "step-in": "step-in var(--duration-base) var(--ease-entrance) both",
        "dialog-in": "dialog-in var(--duration-base) var(--ease-entrance) both",
        "veil-in": "veil-in var(--duration-quick) var(--ease-entrance) both",
        "accordion-down": "accordion-down var(--duration-slow) var(--ease-entrance)",
        "accordion-up": "accordion-up var(--duration-base) var(--ease-exit)",
        /* Un gesto, no un bucle: el barrido metálico pasa una vez al cargar
           y el degradado se queda quieto. */
        "shimmer-once": "shimmer 1.4s var(--ease-entrance) 400ms 1 both",
        "ambient-glow": "ambient-glow 12s ease-in-out infinite",
        /* Pulso finito para el FAB: llama la atención y se calla. */
        "ping-thrice": "ping 1.6s cubic-bezier(0, 0, 0.2, 1) 3",
        /* DEPRECADAS. No usar en código nuevo:
           shimmer = movimiento perpetuo sobre el titular LCP -> shimmer-once
           float   = 10px sobre un blur de 448px: imperceptible y caro
                     -> ambient-glow */
        shimmer: "shimmer 6s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;

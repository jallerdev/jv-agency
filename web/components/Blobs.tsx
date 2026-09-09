"use client";

/* ===========================================================================
   Campo de manchas: la atmósfera del hero.

   POR QUÉ NO SON ORBES DIFUMINADOS
   --------------------------------
   El recurso pide a gritos la versión de siempre: tres círculos morados con
   `filter: blur(140px)` flotando sobre negro. Eso es el fondo por defecto de
   media internet y, sobre todo, no es esta marca: aquí el material es PAPEL
   —hay grano en el body y la paleta entera es bronce y crema—. Así que las
   manchas se comportan como pigmento que cala en el papel, no como luces de
   neón detrás de un cristal.

   Tres decisiones salen de ahí:

   1. `mix-blend-mode: multiply`. Multiplicar sobre crema OSCURECE hacia el
      bronce, que es como se ve una tinta aguada sobre cartulina. Con `normal`
      quedaría un velo encima; con `screen`, un brillo de pantalla. La única
      que suma luz es la última capa, y es una sola.

   2. NINGÚN `filter: blur()`. La suavidad ya la da la caída del radial, así
      que no hay nada que desenfocar. Esto no es purismo: un blur de 300 px
      sobre un elemento del tamaño de la pantalla se recompone en cada
      fotograma y es lo que convierte un fondo bonito en un hero que va a
      tirones en un teléfono. Aquí solo se animan `transform` y `opacity`, que
      corren en el compositor.

   3. Elipses giradas, no círculos. Un círculo perfecto se lee como una forma
      de interfaz. Cada mancha es una elipse con su propia proporción y su
      propio giro lento, y lo que ve el ojo es la INTERSECCIÓN de tres —una
      silueta que nunca se repite porque los tres ciclos son primos entre sí:
      31 s, 43 s y 53 s. La figura completa no vuelve a empezar hasta pasada
      media hora.
   =========================================================================== */

const CSS = `
/* RECORRIDO, no respiración.
   La primera versión se movía ±6% y desde fuera parecía quieta: el ojo no
   registra un desplazamiento tan corto en un ciclo de medio minuto. Ahora cada
   mancha CRUZA —entre el 40% y el 60% de su propia caja, que a este tamaño son
   varios cientos de píxeles— y las cuatro se cruzan entre sí.

   Los ciclos siguen siendo primos entre sí (31, 43, 47 y 53 s) para que la
   composición no se repita: la figura completa tarda casi diez horas en volver
   a la posición de partida. */
@keyframes jv-blob-a {
  0%, 100% { transform: translate3d(-14%, -10%, 0) rotate(0deg) scale(1); }
  27%      { transform: translate3d(46%, 18%, 0) rotate(22deg) scale(1.18); }
  53%      { transform: translate3d(28%, 54%, 0) rotate(-14deg) scale(0.88); }
  79%      { transform: translate3d(-22%, 30%, 0) rotate(9deg) scale(1.08); }
}
@keyframes jv-blob-b {
  0%, 100% { transform: translate3d(12%, -8%, 0) rotate(0deg) scale(1.05); }
  31%      { transform: translate3d(-38%, 26%, 0) rotate(-26deg) scale(0.86); }
  58%      { transform: translate3d(-16%, 58%, 0) rotate(16deg) scale(1.22); }
  82%      { transform: translate3d(34%, 22%, 0) rotate(-7deg) scale(0.96); }
}
@keyframes jv-blob-c {
  0%, 100% { transform: translate3d(-8%, 12%, 0) rotate(0deg) scale(0.94); }
  24%      { transform: translate3d(52%, -18%, 0) rotate(18deg) scale(1.2); }
  55%      { transform: translate3d(18%, -44%, 0) rotate(-12deg) scale(1.0); }
  81%      { transform: translate3d(-34%, -14%, 0) rotate(6deg) scale(1.12); }
}
@keyframes jv-blob-d {
  0%, 100% { transform: translate3d(10%, 10%, 0) rotate(0deg) scale(1); }
  29%      { transform: translate3d(-44%, -22%, 0) rotate(-20deg) scale(1.16); }
  61%      { transform: translate3d(-12%, -52%, 0) rotate(12deg) scale(0.9); }
  84%      { transform: translate3d(30%, -16%, 0) rotate(-5deg) scale(1.06); }
}
/* La luz es la excepción: se mueve POCO y a propósito.
   Es la capa que garantiza que el titular caiga sobre el punto más claro del
   campo. Si viajara como las demás, cada tanto dejaría el texto a la sombra y
   el contraste se caería a mitad del ciclo. Respira y deriva; no cruza. */
@keyframes jv-blob-luz {
  0%, 100% { opacity: 0.62; transform: translate3d(-3%, 0, 0) scale(1); }
  50%      { opacity: 0.95; transform: translate3d(6%, -4%, 0) scale(1.12); }
}

.jv-blob {
  position: absolute;
  will-change: transform;
  mix-blend-mode: multiply;
}

/* La franja del encabezado se queda limpia.
   Medido: con el campo llegando hasta arriba, «Proceso» y «Sobre mí» —14 px
   sobre el cobre que entra por la derecha— caían a 4,08:1, por debajo del 4,5
   que pide AA. La barra es transparente hasta que se hace scroll, así que esos
   enlaces se leen DIRECTAMENTE sobre el campo.
   La máscara no apaga el campo: lo hace empezar donde termina la barra. */
.jv-blob-campo {
  -webkit-mask-image: linear-gradient(to bottom, transparent 0, rgba(0,0,0,0.28) 5.5rem, #000 13rem);
  mask-image: linear-gradient(to bottom, transparent 0, rgba(0,0,0,0.28) 5.5rem, #000 13rem);
}

/* Los NÚCLEOS van fuera del lienzo, en las esquinas.
   La primera versión los puso centrados y grandes, y el resultado fue una
   aguada tibia y uniforme: sin núcleo visible no hay mancha, hay tinte. Peor,
   el texto quedaba encima del punto más oscuro del campo.
   Ahora cada núcleo se sale por un borde y lo que entra en pantalla es su
   falda. Así el centro —donde vive el titular— es la zona más limpia, y el
   drama queda enmarcando, que es de donde sale la sensación de profundidad.

   La caída también se apretó (transparente al 58% en vez de al 72%): un
   degradado que se desvanece demasiado pronto no se lee como forma. */
.jv-blob-a {
  inset: -46% 56% 30% -52%;
  background: radial-gradient(54% 46% at 50% 50%, rgba(110, 65, 40, 0.46), rgba(110, 65, 40, 0.18) 40%, transparent 58%);
  animation: jv-blob-a 31s cubic-bezier(0.45, 0, 0.55, 1) infinite;
}
.jv-blob-b {
  inset: -34% -42% 26% 54%;
  background: radial-gradient(50% 50% at 50% 50%, rgba(192, 118, 59, 0.58), rgba(192, 118, 59, 0.22) 42%, transparent 60%);
  animation: jv-blob-b 43s cubic-bezier(0.45, 0, 0.55, 1) infinite;
}
.jv-blob-c {
  inset: 58% 22% -64% -18%;
  background: radial-gradient(58% 42% at 50% 50%, rgba(176, 137, 104, 0.42), rgba(176, 137, 104, 0.15) 40%, transparent 58%);
  animation: jv-blob-c 53s cubic-bezier(0.45, 0, 0.55, 1) infinite;
}
/* Cuarta mancha, la que da el fondo del cuadro: bronce medio entrando por la
   esquina inferior derecha. Sin ella las tres de arriba flotaban sobre crema
   plano y el campo se quedaba a media altura. */
.jv-blob-d {
  position: absolute;
  inset: 38% -46% -44% 46%;
  mix-blend-mode: multiply;
  will-change: transform;
  background: radial-gradient(52% 48% at 50% 50%, rgba(152, 92, 62, 0.52), rgba(152, 92, 62, 0.2) 42%, transparent 60%);
  animation: jv-blob-d 47s cubic-bezier(0.45, 0, 0.55, 1) infinite;
}
/* CLARO DE LECTURA. No es decoración: es lo que hace que el campo pueda
   viajar de verdad.
   Medido: con las manchas cruzando la pantalla, el párrafo del hero bajaba a
   2,09:1 y la línea del precio a 2,46:1 en algunas fases del ciclo —ilegibles—.
   Con las manchas quietas no pasaba, porque el punto oscuro nunca llegaba
   hasta ahí.
   La respuesta no es frenar el campo: es fijar un claro sobre la columna donde
   se lee. El pigmento cruza por debajo, el claro no se mueve de donde está el
   texto, y el ojo lee el conjunto como luz cayendo sobre la mesa. Sin él habría
   que bajar tanto la intensidad que volveríamos a la aguada tibia del principio. */
.jv-blob-claro {
  position: absolute;
  inset: -14% 16% -10% -24%;
  mix-blend-mode: screen;
  background: radial-gradient(64% 66% at 42% 48%, rgba(255, 251, 245, 0.98), rgba(255, 246, 234, 0.82) 40%, rgba(255, 241, 223, 0.42) 62%, rgba(255, 238, 218, 0.12) 78%, transparent 90%);
}

/* Y encima, la luz que sí respira: da el latido sin poner en riesgo la lectura. */
.jv-blob-luz {
  position: absolute;
  inset: -22% 18% 6% -14%;
  mix-blend-mode: screen;
  background: radial-gradient(52% 54% at 50% 50%, rgba(255, 244, 228, 0.95), rgba(255, 235, 208, 0.42) 46%, transparent 70%);
  animation: jv-blob-luz 37s ease-in-out infinite;
  will-change: opacity, transform;
}

@media (prefers-reduced-motion: reduce) {
  .jv-blob, .jv-blob-d, .jv-blob-luz { animation: none !important; }
}
`;

/**
 * @param className  Para ajustar la intensidad desde fuera (`opacity-70`, por
 *                   ejemplo) sin tocar la receta.
 */
export function Blobs({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`jv-blob-campo pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <style href="jv-blobs" precedence="default" dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="jv-blob jv-blob-a" />
      <div className="jv-blob jv-blob-b" />
      <div className="jv-blob jv-blob-c" />
      <div className="jv-blob-d" />
      <div className="jv-blob-claro" />
      <div className="jv-blob-luz" />
    </div>
  );
}

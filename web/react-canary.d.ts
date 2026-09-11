/**
 * LOS TIPOS DE REACT QUE EL APP ROUTER SÍ TIENE
 * ──────────────────────────────────────────────────────────────────────────
 * `@types/react` publica `ViewTransition` en `canary.d.ts`, no en su entrada
 * por defecto, porque en el React que se instala desde npm no existe. En el
 * App Router sí: Next sirve su propio React —`next/dist/compiled/react`, que
 * exporta `ViewTransition`— y lo hace sin pedir bandera ninguna.
 *
 * Sin esta referencia, TypeScript dice que `react` no exporta `ViewTransition`
 * mientras el navegador lo ejecuta perfectamente. Es una línea de tipos, no un
 * cambio de comportamiento.
 */
/// <reference types="react/canary" />

import { NoEncontrada } from "@/components/paginas/NoEncontrada";

/**
 * El 404 de la raíz en castellano.
 *
 * Hacen falta los dos —uno por grupo de rutas— porque el sitio tiene dos
 * layouts raíz y cada uno declara su propio `lang`. El cuerpo es el mismo
 * componente: la página se escribe una vez.
 */
export default function NoEncontradaRuta() {
  return <NoEncontrada idioma="es" />;
}

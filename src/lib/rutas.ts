/*
 * Rutas internas de la web. Todas cuelgan de la base de GitHub Pages
 * (/valserra/) y del idioma (/es/, /en/). Las páginas llegan con el
 * issue #9 (rutas /es y /en) y con cada fase; hasta entonces los
 * enlaces apuntan a su dirección definitiva.
 */
import type { Idioma } from './i18n.ts';

export const paginas = ['inicio', 'mapa', 'tiempo', 'forfaits'] as const;
export type Pagina = (typeof paginas)[number];

/** Base de la web con la barra final: "/valserra/". */
const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');

export function ruta(idioma: Idioma, pagina: Pagina): string {
  return pagina === 'inicio'
    ? `${base}${idioma}/`
    : `${base}${idioma}/${pagina}/`;
}

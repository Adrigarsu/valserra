/*
 * Rutas internas de la web. Todas cuelgan de la base de GitHub Pages
 * (/valserra/) y del idioma (/es/, /en/). La portada existe desde el
 * issue #9; las demás páginas llegan con cada fase y, hasta entonces,
 * los enlaces apuntan a su dirección definitiva.
 */
import type { Sector } from './esquemas.ts';
import { esIdioma, type Idioma } from './i18n.ts';

export const paginas = ['inicio', 'mapa', 'tiempo', 'forfaits'] as const;
export type Pagina = (typeof paginas)[number];

/** Base de la web con la barra final: "/valserra/". */
const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');

export function ruta(idioma: Idioma, pagina: Pagina): string {
  return pagina === 'inicio'
    ? `${base}${idioma}/`
    : `${base}${idioma}/${pagina}/`;
}

/** Mapa ya ampliado en un sector: /valserra/es/mapa/gornergrat/. */
export function rutaSector(
  idioma: Idioma,
  sector: Pick<Sector, 'slug'>,
): string {
  return `${ruta(idioma, 'mapa')}${sector.slug}/`;
}

/**
 * La misma página en otro idioma: cambia solo el segmento del idioma,
 * así que vale para cualquier ruta, también las que lleguen después
 * (/valserra/es/mapa/gornergrat/ → /valserra/en/mapa/gornergrat/).
 * Si la ruta no tiene idioma (la 404, por ejemplo), lleva a la portada.
 */
export function rutaEnIdioma(ruta: string, idioma: Idioma): string {
  const resto = ruta.startsWith(base)
    ? ruta.slice(base.length)
    : ruta.replace(/^\//, '');
  const [actual, ...partes] = resto.split('/').filter(Boolean);
  if (!esIdioma(actual)) return `${base}${idioma}/`;
  return partes.length > 0
    ? `${base}${idioma}/${partes.join('/')}/`
    : `${base}${idioma}/`;
}

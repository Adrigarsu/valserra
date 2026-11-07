/*
 * Datos de la estación, validados y con tipos.
 * Las páginas importan los datos desde aquí, nunca el JSON directamente.
 * Si un JSON no cumple su esquema, importar este módulo lanza un error con
 * el archivo y el campo; así fallan `npm run check` y `npm run build`.
 */
import type { z } from 'astro/zod';
import { prettifyError } from 'astro/zod';

import pistasJson from '../data/pistas.json' with { type: 'json' };
import remontesJson from '../data/remontes.json' with { type: 'json' };
import resumenJson from '../data/resumen.json' with { type: 'json' };
import sectoresJson from '../data/sectores.json' with { type: 'json' };
import tarifasJson from '../data/tarifas.json' with { type: 'json' };
import tiempoJson from '../data/tiempo.json' with { type: 'json' };

import {
  dificultades,
  esquemaPistas,
  esquemaRemontes,
  esquemaResumen,
  esquemaSectores,
  esquemaTarifas,
  esquemaTiempo,
} from './esquemas.ts';

function validar<T extends z.ZodType>(
  esquema: T,
  json: unknown,
  archivo: string,
): z.output<T> {
  const resultado = esquema.safeParse(json);
  if (!resultado.success) {
    throw new Error(
      `src/data/${archivo} no es válido:\n${prettifyError(resultado.error)}`,
    );
  }
  return resultado.data;
}

export const pistas = validar(esquemaPistas, pistasJson, 'pistas.json');
export const remontes = validar(esquemaRemontes, remontesJson, 'remontes.json');
export const sectores = validar(esquemaSectores, sectoresJson, 'sectores.json');
export const resumen = validar(esquemaResumen, resumenJson, 'resumen.json');
export const tarifas = validar(esquemaTarifas, tarifasJson, 'tarifas.json');
export const tiempo = validar(esquemaTiempo, tiempoJson, 'tiempo.json');

/*
 * resumen.json repite cifras que salen de pistas y remontes (se muestran
 * en la home). Se comprueba que no se queden desfasadas.
 */
const kmPistas = Math.round(
  pistas.reduce((total, p) => total + p.longitudKm, 0),
);
const cotasRemontes = remontes.flatMap((r) => [r.cotaBase, r.cotaCima]);

const descuadres = [
  resumen.pistas !== pistas.length &&
    `pistas: ${resumen.pistas}, pero hay ${pistas.length}`,
  resumen.remontes !== remontes.length &&
    `remontes: ${resumen.remontes}, pero hay ${remontes.length}`,
  resumen.km !== kmPistas &&
    `km: ${resumen.km}, pero las pistas suman ${kmPistas}`,
  resumen.cotaMin !== Math.min(...cotasRemontes) &&
    `cotaMin: ${resumen.cotaMin}, pero la cota más baja es ${Math.min(...cotasRemontes)}`,
  resumen.cotaMax !== Math.max(...cotasRemontes) &&
    `cotaMax: ${resumen.cotaMax}, pero la cota más alta es ${Math.max(...cotasRemontes)}`,
  resumen.desnivel !== resumen.cotaMax - resumen.cotaMin &&
    `desnivel: ${resumen.desnivel}, pero cotaMax − cotaMin es ${resumen.cotaMax - resumen.cotaMin}`,
  ...dificultades.map((d) => {
    const cuenta = pistas.filter((p) => p.dificultad === d).length;
    return (
      resumen.porDificultad[d] !== cuenta &&
      `porDificultad.${d}: ${resumen.porDificultad[d]}, pero hay ${cuenta}`
    );
  }),
].filter((d): d is string => typeof d === 'string');

if (descuadres.length > 0) {
  throw new Error(
    `src/data/resumen.json no cuadra con los datos:\n- ${descuadres.join('\n- ')}`,
  );
}

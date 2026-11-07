/*
 * Estado de hoy de la estación, el que enseñan el cartel y el menú.
 * Por ahora solo los remontes abiertos, sacados de remontes.json
 * (estadoDemo). La temperatura de la cumbre llega con la fase del Tiempo,
 * cuando se pida a Open-Meteo.
 */
import { remontes } from './datos.ts';

export const remontesAbiertos = remontes.filter(
  (r) => r.estadoDemo === 'abierto',
).length;

export const remontesTotal = remontes.length;

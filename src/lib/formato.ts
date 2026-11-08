/*
 * Formato de números, importes y fechas según el idioma, con la API
 * estándar Intl del navegador (y de Node). Los datos guardan los números
 * sin formato y los importes en céntimos de CHF; aquí se escriben como los
 * espera cada idioma: 2.263 y 785,70 CHF en español, 2,263 y CHF 785.70
 * en inglés.
 *
 * Los formateadores se crean una vez por idioma y se reutilizan: crear un
 * Intl.NumberFormat es caro y se llama en cada texto.
 */
import type { Idioma } from './i18n.ts';

export const monedas = ['CHF', 'EUR'] as const;
export type Moneda = (typeof monedas)[number];

/** Zona horaria de la estación: las fechas se leen en hora de Valserra. */
export const zonaHoraria = 'Europe/Zurich';

/*
 * useGrouping: 'always' agrupa también los números de cuatro cifras. Sin
 * él, Intl sigue la norma de CLDR para el español y escribe 2263 sin punto,
 * pero las maquetas usan 2.263 en toda la web.
 */
const opcionesNumero: Intl.NumberFormatOptions = { useGrouping: 'always' };

const cache = new Map<string, Intl.NumberFormat | Intl.DateTimeFormat>();

function memo<T extends Intl.NumberFormat | Intl.DateTimeFormat>(
  clave: string,
  crear: () => T,
): T {
  let formateador = cache.get(clave) as T | undefined;
  if (!formateador) {
    formateador = crear();
    cache.set(clave, formateador);
  }
  return formateador;
}

/** 2263 → "2.263" en español y "2,263" en inglés. */
export function formatearNumero(
  idioma: Idioma,
  numero: number,
  opciones: Intl.NumberFormatOptions = {},
): string {
  const todas = { ...opcionesNumero, ...opciones };
  return memo(
    `n|${idioma}|${JSON.stringify(todas)}`,
    () => new Intl.NumberFormat(idioma, todas),
  ).format(numero);
}

/**
 * Importe en céntimos → texto con la moneda: 78570 da "785,70 CHF" en
 * español y "CHF 785.70" en inglés. No convierte: el cambio de CHF a euros
 * se hace antes, con el tipo de tarifas.json.
 */
export function formatearMoneda(
  idioma: Idioma,
  centimos: number,
  moneda: Moneda = 'CHF',
): string {
  return formatearNumero(idioma, centimos / 100, {
    style: 'currency',
    currency: moneda,
  });
}

/**
 * Fecha según el idioma, en la zona horaria de la estación. Acepta un Date
 * o una cadena ISO ("2027-02-12"). Por defecto, fecha larga:
 * "12 de febrero de 2027" o "February 12, 2027".
 */
export function formatearFecha(
  idioma: Idioma,
  fecha: Date | string,
  opciones: Intl.DateTimeFormatOptions = { dateStyle: 'long' },
): string {
  const todas = { timeZone: zonaHoraria, ...opciones };
  return memo(
    `f|${idioma}|${JSON.stringify(todas)}`,
    () => new Intl.DateTimeFormat(idioma, todas),
  ).format(new Date(fecha));
}

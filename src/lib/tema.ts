/*
 * Modo día y noche (docs/ideario.md, Modo oscuro: Valserra de noche).
 *
 * Por defecto manda la preferencia del sistema (prefers-color-scheme).
 * Si la persona elige un modo con el interruptor, se guarda en
 * localStorage y se pone data-theme en <html>, que gana a la preferencia
 * del sistema (ver src/styles/tokens.css).
 *
 * El script del <head> de Base.astro aplica la elección guardada antes de
 * pintar la página; no puede importar este archivo porque va en línea, así
 * que recibe la clave con define:vars.
 */

export const temas = ['light', 'dark'] as const;
export type Tema = (typeof temas)[number];

/** Clave de localStorage donde se guarda la elección. */
export const claveTema = 'valserra-tema';

/*
 * Valida los datos (src/data) y los textos (src/i18n).
 * Importar los módulos ya los valida: si algo falla, lanzan un error y el
 * proceso acaba con código 1. Lo usan `npm run check` y `npm run build`.
 * Node ejecuta TypeScript directamente (quita los tipos al cargar).
 */
import '../src/lib/datos.ts';
import '../src/lib/i18n.ts';

console.log('Datos y textos válidos.');

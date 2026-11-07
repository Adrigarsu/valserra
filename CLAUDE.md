# Valserra

Web de una estación de esquí ficticia inspirada en Zermatt. Proyecto de portfolio de Adri García, estudiante de Ingeniería Informática. La home cuenta un descenso de la cumbre (3.883 m) al pueblo (1.620 m) con scroll.

## Cómo trabajar con Adri

- Responde en español.
- Todo el código sigue estándares globales. La primera vez que apliques un estándar en el proyecto, explícalo en una o dos frases (qué es y por qué se usa).
- Si necesitas un archivo que Adri no ha dado, pregúntale antes de seguir.
- Autoría: los commits, pushes, pull requests e issues salen siempre de la cuenta de Adri. Nunca añadas `Co-Authored-By`, "Generated with Claude Code" ni ninguna mención a Claude. `.claude/settings.json` ya desactiva la atribución; no la vuelvas a activar.
- Antes de hacer un push o abrir una pull request, pide confirmación. Con su visto bueno, Claude hace el push, abre la pull request y la une con Squash and merge desde la cuenta de Adri.
- Al terminar un issue, antes del push, actualiza la documentación en la misma rama (sección Estado del proyecto de este archivo, y README o `docs/flujo-de-trabajo.md` si cambian). Adri hace `/clear` entre issues, así que todo lo que haga falta para el siguiente tiene que quedar escrito aquí.

## Documentación del proyecto

- `docs/ideario.md`: concepto, dirección de arte, paleta, tipografía, movimiento, arquitectura, reglas de ilustración, alcance y plan por fases. Es la fuente de verdad del diseño.
- `docs/flujo-de-trabajo.md`: GitHub Flow, ramas, commits y definición de hecho.
- `docs/tokens.md`: equivalencias de las variables de Figma con las variables CSS.
- Figma: https://www.figma.com/design/u5PvQSj9xywRUVwQMVygGE/Valserra (páginas Componentes básicos, Componentes Valserra, Ilustración, Alta fidelidad y Estados y piezas). Cada issue enlaza el frame que implementa.
- Issues e hitos en GitHub (`Adrigarsu/valserra`): un hito por fase, de la Fase 0 a la Fase 6.

## Stack

- Astro 7 con TypeScript 6 estricto (`astro/tsconfigs/strict`). React 19 solo en las islas interactivas (Forfaits y Tiempo); el resto es HTML, CSS y SVG. Node 22.23.4 o superior (lo exige Astro 7).
- GSAP con ScrollTrigger y Lenis para la animación del descenso.
- Open-Meteo para el tiempo, pedido desde el navegador.
- Publicación en GitHub Pages con GitHub Actions: `site: 'https://adrigarsu.github.io'` y `base: '/valserra'`. Todos los enlaces internos usan la base.
- Entorno de Adri: Windows con PowerShell. Da los comandos para PowerShell.

## Calidad de código

- Scripts: `dev`, `build`, `preview`, `check`, `validar`, `lint`, `format` y `format:check`. `check` y `build` ejecutan antes `validar` (`scripts/validar-contenido.ts`, que Node ejecuta sin compilar).
- ESLint 10 con configuración plana (`eslint.config.js`): recomendadas de JS y `typescript-eslint`, `eslint-plugin-astro` con sus reglas de accesibilidad para `.astro`, `eslint-plugin-jsx-a11y-x` para `.tsx` y `eslint-config-prettier` al final. Se usa `jsx-a11y-x` y no `eslint-plugin-jsx-a11y` porque este no soporta ESLint 10.
- Prettier con `prettier-plugin-astro` y comillas simples. No formatea Markdown (`.prettierignore`): los documentos se escriben a mano.
- `.editorconfig`: UTF-8, LF y 2 espacios; CRLF en `*.ps1`, igual que `.gitattributes`.
- `npm audit` avisa de una vulnerabilidad moderada en `minimatch`, dentro de ESLint y `typescript-eslint`. Solo afecta a desarrollo; el arreglo de npm baja a ESLint 9 y rompe el plugin de Astro, así que se espera a que publiquen la corrección.

## Reglas de código

- Tokens: las variables de Figma se traducen a variables CSS en `src/styles/tokens.css` con el nombre de su sintaxis WEB en Figma (`bg/page` → `--color-bg-page`, `espacio/16` → `--space-16`, `ilus/cielo` → `--ilus-cielo`). La tabla completa está en `docs/tokens.md`. Los componentes usan los tokens semánticos (`--color-*`, `--ilus-*`), nunca los primitivos (`--azul-800`). Nada de colores, tamaños o duraciones sueltos en los componentes.
- Modo noche: solo cambian los tokens semánticos y de ilustración, nunca los componentes. Se activa con `prefers-color-scheme` o con `data-theme="dark"` en `<html>` (`data-theme="light"` fuerza el día). El bloque de noche está repetido en `tokens.css`: si cambias uno, cambia el otro.
- Datos en `src/data/*.json` y textos en `src/i18n/{es,en}.json`. Las dos lenguas tienen las mismas claves. Los textos usan huecos `{nombre}` y plurales ICU.
- Los datos se importan desde `src/lib/datos.ts` (validados con los esquemas Zod de `src/lib/esquemas.ts`, que también exportan los tipos) y los textos desde `src/lib/i18n.ts`; nunca el JSON directamente. Si cambia la forma de un JSON, se cambia su esquema en el mismo commit. Los imports de JSON llevan `with { type: 'json' }` y los de TypeScript la extensión `.ts`, para que Node pueda ejecutar el script de validación.
- Números sin formato en los datos; se formatean con `Intl` según el idioma. Importes en céntimos de CHF.
- Las etiquetas en mayúsculas se escriben en minúscula y se transforman con CSS (`text-transform: uppercase`).
- Accesibilidad WCAG 2.2 AA: HTML semántico, foco visible, áreas táctiles de 44 px, `prefers-reduced-motion` respetado en toda animación.
- Animaciones solo con `transform` y `opacity`.
- Ilustraciones SVG con grupos de id semántico (`capa-cumbres`, `pista-28`) y rellenos `var(--ilus-*)`.

## Flujo de cada tarea

1. Partir de un issue. Crear la rama `tipo/número-descripción` (por ejemplo `feat/12-navegacion`).
2. Commits pequeños con Conventional Commits en español: `feat(nav): añadir el menú móvil`.
3. Antes de dar algo por hecho: `npm run check`, `npm run lint`, `npm run format:check` y `npm run build` sin errores, y revisión en 390, 834 y 1440 px, en los dos idiomas y en modo noche.
4. Actualizar la documentación (ver Cómo trabajar con Adri) con un commit `docs:` en la misma rama.
5. Pull request con la plantilla, `Closes #número` y capturas de Figma frente a la web.

## Estado del proyecto

Fase 0 · Montaje (hito en GitHub). Última actualización: 7 de noviembre de 2026 (#6).

- Hecho: #1 proyecto Astro con TypeScript estricto y React (PR #35); #2 ESLint, Prettier, EditorConfig y `.gitattributes` (PR #36); #3 tokens de Figma en `src/styles/tokens.css` y reset con estilos base en `src/styles/base.css` (PR #37); #4 fuentes con Fontsource en `src/styles/fonts.css`, tokens de tipografía en `tokens.css` y una clase por cada uno de los 14 estilos de texto de Figma en `src/styles/typography.css` (`.text-display-xl`, `.text-titulo-h2`…; tabla en `docs/tokens.md`) (PR #38); #5 esquemas Zod y tipos para los datos, comprobación de que `es.json` y `en.json` tienen las mismas claves, ningún texto vacío y los mismos huecos, y script `validar` dentro de `check` y `build` (PR #39); #6 CI y GitHub Pages: `.github/workflows/ci.yml` (job `Comprobar`: `check`, `lint`, `format:check` y `build` con Node 22 en cada pull request a `main`) y `.github/workflows/deploy.yml` (`withastro/action` y `actions/deploy-pages` en cada push a `main`); `package.json` exige Node `>=22.23.4` en `engines`. Pages usa GitHub Actions como fuente y `main` exige pull request con el check `Comprobar` en verde.
- Siguiente: #7 preparar Figma.
- Estructura: `src/{components,layouts}` y `src/pages/{es,en}` están vacías (con `.gitkeep`). `src/lib` tiene `esquemas.ts`, `datos.ts` e `i18n.ts`; falta la función que formatea los textos (huecos y plurales ICU con `Intl`), que llega con las páginas en la Fase 1. `src/pages/index.astro` es una página provisional con un muestrario de los 14 estilos de texto; importa `fonts.css`, `tokens.css`, `base.css` y `typography.css` y precarga Yellowtail y Josefin Sans (latin) con imports `?url`. Cuando exista el layout base (Fase 1), las importaciones y la precarga pasan allí y el muestrario se borra.
- Pendiente para fases siguientes: las rutas `/es` y `/en` (configuración `i18n` de Astro y redirección desde la raíz) son de la Fase 1.

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
- Figma: https://www.figma.com/design/u5PvQSj9xywRUVwQMVygGE/Valserra (páginas Portada, Fundamentos, Componentes básicos, Componentes Valserra, Ilustración, Alta fidelidad y Estados y piezas). La Portada tiene el frame `Miniatura` (miniatura del archivo) y la guía de lectura; Fundamentos documenta paleta, tipografía, espaciado, rejilla y movimiento con las variables y estilos del archivo. Si cambia una variable o un estilo, se revisa también Fundamentos. Cada issue enlaza el frame que implementa.
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

Fase 1 · Base y componentes (hito en GitHub), en curso. Última actualización: 8 de noviembre de 2026 (#11).

- Hecho en la Fase 0 (#1 a #7): proyecto Astro con TypeScript estricto y React; ESLint, Prettier, EditorConfig y `.gitattributes`; tokens de Figma en `src/styles/tokens.css` y reset en `src/styles/base.css`; fuentes con Fontsource en `src/styles/fonts.css` y una clase por cada uno de los 14 estilos de texto en `src/styles/typography.css` (`.text-display-xl`, `.text-titulo-h2`…; tabla en `docs/tokens.md`); esquemas Zod de los datos y comprobación de los textos con el script `validar`; CI (`.github/workflows/ci.yml`, job `Comprobar`) y publicación en GitHub Pages (`.github/workflows/deploy.yml`); Figma preparado para enseñarlo (Portada y Fundamentos).
- Hecho en la Fase 1: #8 layout base con navegación y footer.
  - `src/layouts/Base.astro`: `<head>` (importa los cuatro CSS, precarga Yellowtail y Josefin Sans, título y descripción), enlace "Saltar al contenido", cartel, `<main id="contenido">`, footer y menú. Props: `idioma` (por defecto `es`), `titulo`, `descripcion` y `pagina` (marca su enlace con `aria-current`).
  - `src/components/Navegacion.astro`: cartel en tres tamaños con el mismo HTML. Móvil por debajo de 1024 px (logo, estado corto y menú), escritorio a partir de 1024 px y compacto al bajar más de 120 px (`data-compacto`, con un IntersectionObserver sobre un elemento centinela). Es `position: sticky` y reserva siempre su alto, así que compactarse no mueve la página.
  - `src/components/Menu.astro`: menú a pantalla completa con `<dialog>` y `showModal()` (foco atrapado, Esc, devuelve el foco al botón). Lo abre el botón de menú en cualquier tamaño.
  - `src/components/Pie.astro`: footer siempre en paleta de noche con `data-theme="dark"` (ahora vale en cualquier elemento, no solo en `<html>`).
  - Componentes mínimos: `Boton.astro` (solo Primario, como `<a>` con `href` o `<button>`), `BotonIcono.astro` (44 px con `aria-label`) e `Icono.astro` (Phosphor Regular copiado a mano: `menu`, `cerrar`, `flecha-derecha`).
  - `src/lib/estado.ts` cuenta los remontes abiertos de `remontes.json`.
  - Tokens nuevos de rejilla en `tokens.css` (`--margen-pagina`, `--ancho-max`, `--ancho-contenido`; tabla en `docs/tokens.md`) y clase `.visually-hidden` en `base.css`.
- Hecho en la Fase 1: #9 rutas `/es` y `/en` con selector de idioma.
  - i18n de Astro en `astro.config.mjs` (idiomas de `src/lib/i18n.ts`, `es` por defecto, `prefixDefaultLocale: true`). Las páginas van en `src/pages/[idioma]/` con `getStaticPaths` sobre `idiomas`: un archivo por página para los dos idiomas (las carpetas `es/` y `en/` ya no existen). `src/pages/index.astro` redirige la raíz a `/valserra/es/` con `Astro.redirect(..., 301)` (meta refresh a 0 s; con 302 serían 2 s).
  - Textos: `const t = traductor(idioma)` y `t('nav.mapa')` o `t('forfaits.comprar', { n: 3 })`. La clave está tipada (`ClaveTexto`); las listas (`forfaits.faq`) se leen de `textos[idioma]`. `formatear(idioma, texto, valores)` es el motor: mensajes ICU con huecos, `plural` (`one`, `other`, `=0`…) y `#`, sin librería y sin `select` ni comillas de escape. Al importar `i18n.ts` se comprueba que todos los textos son ICU válidos (llaves cerradas, plurales con `other`). Los números de un hueco se formatean solos; un año va como cadena.
  - `src/lib/formato.ts`: `formatearNumero`, `formatearMoneda(idioma, centimos, 'CHF' | 'EUR')` (no convierte; para eso, `src/lib/precios.ts`) y `formatearFecha` (zona `Europe/Zurich`, fecha larga por defecto). Los números usan `useGrouping: 'always'`, porque `Intl` en español no agrupa los de cuatro cifras (daría 2263, no 2.263).
  - `src/lib/rutas.ts`: `ruta(idioma, pagina)` y `rutaEnIdioma(ruta, idioma)`, que cambia solo el segmento del idioma (vale para las subpáginas que lleguen, como `/mapa/gornergrat/`); sin idioma en la ruta (404), lleva a la portada.
  - `Base.astro` añade `<link rel="alternate" hreflang>` para `es`, `en` y `x-default`.
  - `src/components/SelectorIdioma.astro`: interruptor ES/EN con los estilos de Segmento de Figma (normal, hover, seleccionado y foco). Son enlaces con `lang`, `hreflang` y `aria-current="page"`, y su nombre accesible es el endónimo (`nombresIdioma`: "Español", "English"). Prop `id` para la etiqueta "Idioma" (distinto en cada sitio). Va en el menú, debajo del estado de hoy, y en el footer de escritorio (columnas 9 a 12); el footer móvil no lo lleva, como en Figma.
  - La portada (`src/pages/[idioma]/index.astro`) sigue provisional: muestrario de estilos de texto y de formatos (número, monedas, fecha y plural).
- Hecho en la Fase 1: #10 modo noche.
  - `src/lib/tema.ts`: `temas` (`light`, `dark`), tipo `Tema` y `claveTema` (`valserra-tema`, la clave de `localStorage`).
  - `Base.astro`: `<meta name="color-scheme" content="light dark">` y, antes del CSS, un script en línea (`is:inline` con `define:vars={{ preferencias }}`) que pone en `<html>` las preferencias guardadas (`data-theme` y, desde el #11, `data-moneda`). Así no hay parpadeo al cargar. Sin elección guardada no hay `data-theme` y manda `prefers-color-scheme`. Se pasa una sola variable porque `astro check` no reconoce bien varias en `define:vars`.
  - `src/components/SelectorModo.astro`: fila "Modo" con Día/Noche, en el menú y en el footer de escritorio. Su script marca el modo actual, guarda la elección, sincroniza todos los selectores, sigue al sistema mientras no se elija nada y escucha `storage` para otras pestañas. Prop `id`, igual que `SelectorIdioma`.
  - En el footer de escritorio los interruptores empiezan todos en la misma línea (`justify-content: start`), como en Figma; en el menú van a la derecha.
  - El footer sigue siempre de noche: el selector cambia la página, no el footer.
  - Una vez elegido un modo, no hay forma de volver a "seguir al sistema" (Figma solo tiene dos opciones); habría que borrar `valserra-tema` del `localStorage`.
- Hecho en la Fase 1: #11 selector de moneda CHF / €.
  - `src/components/AjusteRadio.astro`: fila de ajuste con interruptor de dos opciones hecho con radios nativos en un `role="radiogroup"` (flechas del teclado y estado gratis), con las etiquetas como segmentos. Props `id` (también es el `name`), `etiqueta`, `ajuste` (el script del selector lo busca con `[data-ajuste="…"]`) y `opciones` (`valor`, `texto` y `nombre` accesible opcional). Sale oculto y sin marcar; el script de cada selector marca la opción y quita `hidden`. La usan `SelectorModo` y `SelectorMoneda`; `SelectorIdioma` usa enlaces y tiene sus propios estilos de Segmento.
  - `src/lib/almacen.ts`: `leer(clave, permitidos)` y `guardar(clave, valor)` sobre `localStorage`, sin romper si falla.
  - `src/lib/moneda.ts` (sin datos, ligero para el navegador): el estado es `data-moneda` en `<html>` (sin él, CHF). `monedaActual()`, `elegirMoneda(m)` (guarda en `valserra-moneda` y lanza `valserra:moneda` en `<html>`), `alCambiarMoneda(aviso)` (devuelve la función para dejar de escuchar) y sincronía entre pestañas con `storage`. `monedas` y `Moneda` siguen en `formato.ts` y se reexportan.
  - `src/lib/useMoneda.ts`: hook de React para las islas (Forfaits y Tiempo) con `useSyncExternalStore`; en el servidor y al hidratar da CHF. Aún no lo usa nadie.
  - `src/lib/precios.ts`: `convertir(centimosChf, moneda)` con `tarifas.cambioDemo.EUR` (euros por franco, 1,07; redondea al céntimo) y `formatearPrecio(idioma, centimosChf, moneda)`. Importa `datos.ts`, así que en una isla mete los datos y Zod en el paquete del navegador: a revisar en las fases de Forfaits y Tiempo.
  - `formato.ts`: `simboloMoneda` ("CHF", "€") y `nombreMoneda` ("franco suizo", "Swiss Franc") con `Intl`, sin textos nuevos.
  - `src/components/Precio.astro`: importe del HTML estático. Pinta las dos monedas y el CSS enseña la de `data-moneda`, así que no parpadea ni necesita JavaScript por precio. Props `idioma` y `centimos` (de CHF); hereda el estilo de texto.
  - `src/components/SelectorMoneda.astro`: fila "Moneda" entre Idioma y Modo, en el menú y en el footer de escritorio. Se ve "CHF" y "€"; el lector oye el nombre de la moneda.
  - La portada provisional enseña el total de ejemplo con `Precio`: 785,70 CHF o 840,70 € (CHF 785.70 o €840.70 en inglés).
- Siguiente: #12 componentes básicos (botón, chip, segmento, interruptor y botón de cantidad).
- Decisiones del #8 que afectan a lo siguiente:
  - El estado del cartel y del menú solo enseña los remontes ("13/15 remontes"); la temperatura de la cumbre se añade en la fase del Tiempo con Open-Meteo (textos `nav.estado` y `nav.estadoCorto`, ya preparados).
  - Cuando el #12 haga el componente Interruptor, `SelectorIdioma` y `AjusteRadio` pueden usarlo para los estilos de Segmento (ahora están copiados en los dos).
  - `Boton.astro` y `BotonIcono.astro` se completan en el #12 (Secundario, Texto y estados).
  - Diferencias con Figma: el logo del cartel compacto y móvil usa Display/S (34 px) porque el de Figma (28 px) no tiene estilo de texto; los enlaces del footer miden 44 px de alto por el área táctil (en Figma, 33 px); el footer móvil usa el texto completo de `footer.proyecto`. El margen de página sigue la regla `6vw` de Fundamentos, que en 1440 px da 86 px, mientras que las maquetas de 1440 usan 120 px: pendiente de decidir con Adri.
- Estructura: las páginas nuevas se crean en `src/pages/[idioma]/` con el mismo `getStaticPaths` que la portada y pasan `idioma` y `pagina` a `Base`.

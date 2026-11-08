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

Fase 1 · Base y componentes (hito en GitHub), en curso. Última actualización: 8 de noviembre de 2026 (#14).

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
- Hecho en la Fase 1: #12 componentes básicos (Figma: Componentes básicos y Componentes Valserra › Interruptor).
  - `Boton.astro`: props `estilo` (`primario`, por defecto; `secundario`; `texto`) e `icono` (cualquier nombre de `Icono`, detrás del texto y a 1em, porque en Figma la flecha es un carácter del texto). Con `href` es `<a>` y no admite `disabled` (el tipo lo impide); sin `href`, `<button>`. Mide 46 px como en Figma: el borde de 1,5 px se descuenta del relleno. En Chromium a 1× mide 45 px porque redondea el borde a 1 px.
  - `ChipFiltro.astro`: `<button aria-pressed>` (botón de alternancia). Props `seleccionado`, `freeride` (borde discontinuo) y `contador` (opacidad 0.7, como en Figma, sin token). Los estilos cuelgan de `aria-pressed`: el script que lo use solo cambia ese atributo.
  - `BotonCantidad.astro`: 44 × 44 px, props `accion` (`menos`, `mas`) y `etiqueta` (nombre accesible: `forfaits.unDiaMas`…). El signo es aria-hidden y usa Dato/Medio.
  - Deshabilitado en `Boton` y `BotonCantidad`: vale `disabled` o `aria-disabled="true"`, con el mismo aspecto. Para el − y + de Forfaits, `aria-disabled` (con `disabled` se pierde el foco al llegar al mínimo) y que el script ignore el clic.
  - `Interruptor.astro`: contenedor con borde tinta y Segmentos. `tipo="radio"` (con `name`; radios nativos en `role="radiogroup"`) o `tipo="enlace"` (lista de enlaces con `aria-current="page"`, `lang` y `hreflang`). Props `etiquetadoPor` (id del texto que lo nombra) y `opciones` (`texto`, `nombre` accesible, `actual`, `valor` o `href` e `idioma`). Ya lo usan `AjusteRadio` y `SelectorIdioma`, que solo ponen la fila con su etiqueta.
  - Foco como en Figma: en botón y botón de cantidad el anillo va por dentro (ocupa el sitio del borde), en el chip tapa el borde y sale 1,5 px, y en el segmento va pegado por fuera.
  - Icono nuevo: `flecha-abajo` (ArrowDown).
  - La portada provisional enseña todas las variantes encima del muestrario de texto (los chips se pueden pulsar).
- Hecho en la Fase 1: #13 componentes de Valserra (Figma: Componentes Valserra › Fila de persona, Forfait y Ficha de pista).
  - Decisión: la fila de persona y el forfait son de React (`.tsx`) porque viven en la isla de Forfaits, que no puede usar componentes `.astro`. Astro pinta un componente React sin directiva `client:` como HTML sin JavaScript, así que el forfait de la home no carga React. Sus estilos van en hojas globales de `src/styles/componentes/` (clases con el prefijo del componente: `.forfait__cuerpo`), importadas desde el propio `.tsx`.
  - `BotonCantidad.tsx`: versión React del botón − / +. Props `accion`, `etiqueta` y `deshabilitado` (pone `aria-disabled` e ignora el clic). Comparte `src/styles/componentes/boton-cantidad.css` con `BotonCantidad.astro` (clase `.boton-cantidad`).
  - `FilaPersona.tsx`: controlado (no guarda estado). Props `idioma`, `tipo` (id de `tarifas.tipos`), `edad`, `precio` (ya formateado en la moneda elegida), `cantidad`, `min` (0), `max` y `onCambiar(n)`. Es un `role="group"` con el nombre del tipo, y la cantidad es un `<output aria-live="polite">`. El − se deshabilita en `min` y el + en `max`.
  - `Forfait.tsx`: props `idioma`, `tipo`, `dias` y `numero` (se pinta con cuatro cifras). Cuerpo de 400 × 220 px que encoge en móvil, resguardo fijo de 100 px y perforación con `repeating-linear-gradient` (15 trazos de 3 × 8 px). Cuerpo y resguardo son piezas separadas para animar el corte en la Fase 4.
  - `FichaPista.astro`: props `idioma`, `pista` (tipo `Pista`), `abierta` (por defecto, `estadoDemo`), `tiempo` (texto ya formateado; sin él no se pinta la fila "Ahora en la salida") y `nivel` del título (2 o 3). Colores con `data-dificultad` y `data-estado`. El número y "Pista · Roja" son aria-hidden y el lector oye "Pista 28 · Roja". Longitud y desnivel con `Intl` (`unit: kilometer` con un decimal y `meter`). Texto nuevo: `mapa.ficha.pistaCorta`.
  - La portada provisional enseña las cuatro filas (2 adultos y 3 niños, 3 días), un forfait y las ocho fichas.
  - Diferencias con Figma: el logo del forfait usa Display/S (34 px; en Figma, 38 px sin estilo); la línea de la fila de persona (1 px en Figma) y el filete de los datos de la ficha (2 px) usan `--border-thin` (1,5 px), porque en Figma no están enlazados a una variable. Conviene enlazarlos en Figma.
- Hecho en la Fase 1: #14 componentes de Valserra (Figma: Componentes Valserra › Cabina, Instrumento y Altímetro).
  - Datos: `src/data/paradas.json` (esquema `esquemaParadas`, tipos `Parada` e `IdParada`) con las seis paradas del descenso, su cota y si llevan marca en el raíl (el mar de nubes no, como en Figma). Van de arriba abajo y `datos.ts` comprueba que empiezan en `resumen.cotaMax` y acaban en `resumen.cotaMin`. Los sectores tienen `slug` (`sunnegga-rothorn`, `gornergrat`, `matterhorn-glacier`, como en el ideario) y `rutaSector(idioma, sector)` en `rutas.ts` da `/valserra/es/mapa/gornergrat/`.
  - `Cabina.astro`: props `idioma`, `sector` (tipo `Sector`), `abierta` (por defecto, no) y `nivel` del título (3 por defecto). Cuenta pistas y remontes del sector con los datos (los de `puente` no cuentan). Cerrada, el detalle (descripción, resumen y enlace al mapa del sector) sigue en el HTML oculto solo a la vista; se abre con `data-abierta="true"` (lo puede cambiar la escena), con hover si hay ratón y con `:focus-within`, así que el enlace se alcanza con el teclado. Ancho 100 % con máximo de 400 px. El enlace mide 44 px de alto con margen negativo para no mover el texto.
  - `Instrumento.tsx` (React, para la isla del Tiempo; hoja `src/styles/componentes/instrumento.css`): props `tipo` (`esfera`, `columna`), `valor`, `min`, `max`, `texto` (ya formateado: "−12 °C") y `etiqueta`. Es un `role="meter"` con `aria-valuetext`, así que el lector oye "Temperatura, −12 °C". La proporción va en `--instrumento-valor` (0 a 1): la aguja gira de −135° a 135° (primera y última marca de la esfera) y el nivel sube con `translateY`, con transición de 1,2 s (`--dur-reveal`) sin movimiento reducido. La esfera es SVG en línea con los colores por CSS; 190 px, 140 px por debajo de 768 px. Los rangos de cada medida los fija la isla del Tiempo (la portada usa unos de ejemplo).
  - `Altimetro.astro`: props `idioma`, `parada` (por defecto, `cumbre`) y `cota` (por defecto, la de la parada; para las cotas interpoladas del scroll). Es un `role="img"` con `altimetro.etiqueta` ("Altímetro: 3.883 m, Cumbre"). La posición va en `--altimetro-progreso` (0 cumbre, 1 pueblo) y todo se mueve con transform: el tramo recorrido con `scaleY`, el marcador y el texto con `translateY`. El texto vertical (`writing-mode: vertical-rl` girado 180°) se centra en el marcador sin salirse del raíl con `clamp()` y porcentajes del propio texto. Raíl de 420 px (`--altimetro-alto`, que la escena puede cambiar). Por debajo de 1024 px se oculta el texto. Texto nuevo: `altimetro.marcador`.
  - Diferencias con Figma: el nivel de la columna usa `--color-border-subtle` y no `bg/subtle`, porque de noche `bg/subtle` y `bg/card` valen lo mismo (azul-700) y el nivel no se veía (decidido con Adri; falta cambiarlo en Figma). La ventana de la cabina (2 px en Figma, sin variable) usa `--border-thin`. El marcador del altímetro es un círculo de CSS en vez del SVG de Figma. De noche la ventana abierta y la cerrada se ven iguales, también en Figma, por el mismo motivo.
  - La portada provisional enseña las tres cabinas (la 2 abierta), tres esferas y una columna, y el altímetro en las seis paradas.
- Siguiente: #15 página de catálogo de componentes.
- Pendiente para la fase de la home: saltar a una parada al pulsar su marca del altímetro (con áreas táctiles de 44 px) y mover `--altimetro-progreso` con el scroll; la oscilación y el avance de las cabinas por el cable.
- Decisiones del #8 que afectan a lo siguiente:
  - El estado del cartel y del menú solo enseña los remontes ("13/15 remontes"); la temperatura de la cumbre se añade en la fase del Tiempo con Open-Meteo (textos `nav.estado` y `nav.estadoCorto`, ya preparados).
  - `BotonIcono.astro` no está en Componentes básicos de Figma: sigue con normal y hover (el foco es el global).
  - Los estilos del Segmento están en `Interruptor.astro` (CSS con ámbito de Astro). Si el interruptor Cumbre/Pueblo de la isla de React del Tiempo los necesita, habrá que sacarlos a una hoja compartida.
  - Diferencias con Figma: el logo del cartel compacto y móvil usa Display/S (34 px) porque el de Figma (28 px) no tiene estilo de texto; los enlaces del footer miden 44 px de alto por el área táctil (en Figma, 33 px); el footer móvil usa el texto completo de `footer.proyecto`. El margen de página sigue la regla `6vw` de Fundamentos, que en 1440 px da 86 px, mientras que las maquetas de 1440 usan 120 px: pendiente de decidir con Adri.
- Estructura: las páginas nuevas se crean en `src/pages/[idioma]/` con el mismo `getStaticPaths` que la portada y pasan `idioma` y `pagina` a `Base`.

# Tokens: de Figma a CSS

Las variables de Figma se traducen a variables CSS en `src/styles/tokens.css`. El nombre CSS es siempre el de la **sintaxis WEB** de la variable en Figma (panel de la variable → Code syntax → Web), así que buscar un nombre en Figma o en el código lleva al mismo sitio.

## Reglas

- **Tres capas.** Los primitivos son la paleta en bruto y los componentes no los usan nunca. Los tokens de Color e Ilustración apuntan a primitivos y son los que usan los componentes y los SVG. Dimensiones y movimiento no cambian con el modo.
- **Modo noche.** Solo cambian las colecciones Color e Ilustración. Se activa solo con `prefers-color-scheme: dark`, salvo que `<html>` tenga `data-theme="light"`, o a mano con `data-theme="dark"`. `data-theme="dark"` vale en cualquier elemento, no solo en `<html>`: el footer lo lleva para ir siempre en paleta de noche. El bloque de noche está repetido en el CSS (dentro de la media query y con el atributo): si se cambia uno, hay que cambiar el otro.
- **Unidades.** Figma trabaja en px. Los espacios pasan a rem (px / 16) para que crezcan con el tamaño de letra del navegador. Radios, bordes y área táctil se quedan en px.
- **Cambios.** Si cambia una variable en Figma, se cambia aquí y en `tokens.css` en el mismo commit. Una variable nueva en Figma necesita su sintaxis WEB antes de pasar al código.
- **Tipografía.** Los estilos de texto de Figma no son variables: sus valores pasan a tokens `--text-*`, `--leading-*` y `--tracking-*`, y cada estilo tiene una clase en `src/styles/typography.css`. Ver la sección Tipografía.

## Primitivos

Colección Primitivos, modo Valor.

| Figma | CSS | Valor |
| --- | --- | --- |
| crema/base | `--crema-base` | #F3EBDD |
| crema/claro | `--crema-claro` | #FAF6EE |
| blanco | `--blanco` | #FFFFFF |
| burdeos/500 | `--burdeos-500` | #81171B |
| burdeos/400 | `--burdeos-400` | #9A2B25 |
| rosa/400 | `--rosa-400` | #D9776E |
| rosa/300 | `--rosa-300` | #E8A39B |
| ambar/400 | `--ambar-400` | #D9A441 |
| pino/800 | `--pino-800` | #1C2E27 |
| pino/600 | `--pino-600` | #2E4A3F |
| pino/300 | `--pino-300` | #8FB89A |
| azul/100 | `--azul-100` | #DCE6EC |
| azul/200 | `--azul-200` | #C9D9E4 |
| azul/300 | `--azul-300` | #A9C1D3 |
| azul/400 | `--azul-400` | #7FA3C0 |
| azul/500 | `--azul-500` | #5C7F9C |
| azul/600 | `--azul-600` | #3F5F7C |
| azul/700 | `--azul-700` | #2F4A63 |
| azul/800 | `--azul-800` | #1F2A33 |
| azul/900 | `--azul-900` | #16202A |
| pista/azul | `--pista-azul` | #3E6E9E |
| pista/roja | `--pista-roja` | #B8463A |

## Color

Colección Color, modos Día y Noche. Los valores son primitivos.

| Figma | CSS | Día | Noche |
| --- | --- | --- | --- |
| bg/page | `--color-bg-page` | crema/base | azul/900 |
| bg/surface | `--color-bg-surface` | crema/claro | azul/800 |
| bg/card | `--color-bg-card` | blanco | azul/700 |
| bg/inverse | `--color-bg-inverse` | azul/800 | crema/base |
| bg/accent | `--color-bg-accent` | burdeos/500 | rosa/400 |
| bg/accent-hover | `--color-bg-accent-hover` | burdeos/400 | rosa/300 |
| bg/subtle | `--color-bg-subtle` | azul/100 | azul/700 |
| bg/disabled | `--color-bg-disabled` | azul/100 | azul/700 |
| text/primary | `--color-text-primary` | azul/800 | crema/base |
| text/heading | `--color-text-heading` | azul/700 | crema/claro |
| text/secondary | `--color-text-secondary` | azul/600 | azul/300 |
| text/accent | `--color-text-accent` | burdeos/500 | rosa/400 |
| text/on-accent | `--color-text-on-accent` | crema/base | azul/900 |
| text/on-inverse | `--color-text-on-inverse` | crema/base | azul/900 |
| text/disabled | `--color-text-disabled` | azul/500 | azul/500 |
| border/strong | `--color-border-strong` | azul/800 | crema/base |
| border/subtle | `--color-border-subtle` | azul/200 | azul/600 |
| border/accent | `--color-border-accent` | burdeos/500 | rosa/400 |
| border/focus | `--color-border-focus` | ambar/400 | ambar/400 |
| pista/azul | `--color-pista-azul` | pista/azul | azul/400 |
| pista/roja | `--color-pista-roja` | pista/roja | pista/roja |
| pista/negra | `--color-pista-negra` | azul/800 | crema/base |
| pista/freeride | `--color-pista-freeride` | ambar/400 | ambar/400 |
| estado/abierto | `--color-estado-abierto` | pino/600 | pino/300 |
| estado/cerrado | `--color-estado-cerrado` | burdeos/500 | rosa/400 |
| detalle/ambar | `--color-detalle-ambar` | ambar/400 | ambar/400 |

## Ilustración

Colección Ilustración, modos Día y Noche. Los SVG usan estos tokens en sus rellenos.

| Figma | CSS | Día | Noche |
| --- | --- | --- | --- |
| ilus/cielo | `--ilus-cielo` | azul/100 | azul/900 |
| ilus/astro | `--ilus-astro` | ambar/400 | crema/base |
| ilus/estrella | `--ilus-estrella` | azul/100 | crema/base |
| ilus/lejos | `--ilus-lejos` | azul/300 | azul/800 |
| ilus/nieve-luz | `--ilus-nieve-luz` | crema/claro | azul/300 |
| ilus/nieve-sombra | `--ilus-nieve-sombra` | azul/400 | azul/600 |
| ilus/roca | `--ilus-roca` | azul/600 | azul/800 |
| ilus/resplandor | `--ilus-resplandor` | crema/claro | rosa/300 |
| ilus/bosque | `--ilus-bosque` | pino/600 | pino/800 |
| ilus/fachada | `--ilus-fachada` | crema/base | azul/700 |
| ilus/tejado | `--ilus-tejado` | burdeos/400 | burdeos/500 |
| ilus/ventana | `--ilus-ventana` | azul/800 | ambar/400 |
| ilus/trazo | `--ilus-trazo` | burdeos/500 | rosa/400 |
| ilus/nube-sombra | `--ilus-nube-sombra` | crema/base | azul/500 |

## Dimensiones

Colección Dimensiones, modo Valor.

| Figma | CSS | Figma (px) | CSS |
| --- | --- | --- | --- |
| espacio/4 | `--space-4` | 4 | 0.25rem |
| espacio/8 | `--space-8` | 8 | 0.5rem |
| espacio/12 | `--space-12` | 12 | 0.75rem |
| espacio/16 | `--space-16` | 16 | 1rem |
| espacio/24 | `--space-24` | 24 | 1.5rem |
| espacio/32 | `--space-32` | 32 | 2rem |
| espacio/48 | `--space-48` | 48 | 3rem |
| espacio/64 | `--space-64` | 64 | 4rem |
| espacio/96 | `--space-96` | 96 | 6rem |
| espacio/128 | `--space-128` | 128 | 8rem |
| espacio/192 | `--space-192` | 192 | 12rem |
| radio/sm | `--radius-sm` | 6 | 6px |
| radio/md | `--radius-md` | 12 | 12px |
| radio/lg | `--radius-lg` | 16 | 16px |
| radio/xl | `--radius-xl` | 20 | 20px |
| radio/pill | `--radius-pill` | 999 | 999px |
| borde/fino | `--border-thin` | 1.5 | 1.5px |
| borde/grueso | `--border-thick` | 3 | 3px |
| tactil/min | `--touch-min` | 44 | 44px |

## Rejilla

Sale de la rejilla de Fundamentos en Figma (estilos de cuadrícula, no variables) y de `docs/ideario.md`. Se escribe con los espacios de la escala.

| CSS | Móvil (menos de 768 px) | Tablet (768–1023 px) | Escritorio (1024 px o más) |
| --- | --- | --- | --- |
| `--margen-pagina` | 20 px | 40 px | `clamp(48px, 6vw, 120px)` |
| `--ancho-max` | 1.440 px (`90rem`) | igual | igual |
| `--ancho-contenido` | `--ancho-max` menos los dos márgenes | igual | igual |

Los puntos de ruptura van en rem en las media queries: `48rem` (768 px) y `64rem` (1024 px).

## Movimiento

No está en Figma: sale del lenguaje de movimiento de `docs/ideario.md`.

| CSS | Valor | Uso |
| --- | --- | --- |
| `--dur-micro` | 250ms | Hover, foco, botones |
| `--dur-base` | 600ms | Tabs, filtros, desplegables |
| `--dur-reveal` | 1200ms | Entrada de contenido con el scroll |
| `--dur-scene` | 2400ms | Transiciones de página, mapa, cabinas |
| `--stagger` | 120ms | Retardo entre elementos de una lista |
| `--ease-out` | cubic-bezier(0.16, 1, 0.3, 1) | Entradas (expo-out) |
| `--ease-in-out` | cubic-bezier(0.65, 0, 0.35, 1) | Cámara y remontes |
| `--ease-in` | cubic-bezier(0.7, 0, 0.84, 0) | Salidas |

Las salidas duran un 70 % de su entrada (`calc(var(--dur-base) * 0.7)`). Con `prefers-reduced-motion: reduce`, cada animación deja solo el fundido de opacidad.

## Tipografía

Estilos de texto de Figma. Las fuentes se sirven desde el proyecto con Fontsource (`src/styles/fonts.css`), con `font-display: swap`, y la página precarga Yellowtail y Josefin Sans, que son las del hero.

| CSS | Valor |
| --- | --- |
| `--font-display` | Yellowtail, con `cursive` de respaldo |
| `--font-sans` | Josefin Sans Variable, con Futura, Century Gothic y `sans-serif` de respaldo |
| `--font-serif` | Fraunces Variable, con Georgia y `serif` de respaldo |
| `--font-serif-variation` | `'WONK' 1`: las variantes "wonky" de Fraunces, como en Figma (SOFT se queda en 0) |
| `--font-weight-regular` / `-medium` / `-semibold` | 400 / 500 / 600 |

Fraunces usa el archivo `wonk` de Fontsource (pesos y eje WONK, 37 KB) y no el `full` (121 KB): a 15–18 px el eje de tamaño óptico casi no cambia nada.

Conversión: tamaño en rem (px / 16), interlineado sin unidad (porcentaje / 100) e interletrado en em (porcentaje / 100). Los estilos en mayúsculas llevan `text-transform: uppercase` en su clase.

| Figma | Clase | Fuente y peso | Tamaño | Interlineado | Interletrado | Mayúsculas |
| --- | --- | --- | --- | --- | --- | --- |
| Display/XL | `.text-display-xl` | Yellowtail 400 | 72 → 124 px (fluido) | 0.95 | — | No |
| Display/L | `.text-display-l` | Yellowtail 400 | 72 px · 4.5rem | 0.95 | — | No |
| Display/M | `.text-display-m` | Yellowtail 400 | 48 px · 3rem | 1 | — | No |
| Display/S | `.text-display-s` | Yellowtail 400 | 34 px · 2.125rem | 1 | — | No |
| Título/H2 | `.text-titulo-h2` | Josefin Sans 600 | 30 px · 1.875rem | 1.25 | 0.18em | Sí |
| Título/H3 | `.text-titulo-h3` | Josefin Sans 600 | 20 px · 1.25rem | 1.3 | 0.12em | Sí |
| Etiqueta/Antetítulo | `.text-etiqueta-antetitulo` | Josefin Sans 600 | 13 px · 0.8125rem | 1.3 | 0.3em | Sí |
| Etiqueta/Pequeña | `.text-etiqueta-pequena` | Josefin Sans 600 | 11 px · 0.6875rem | 1.3 | 0.2em | Sí |
| Botón | `.text-boton` | Josefin Sans 600 | 14 px · 0.875rem | 1 | 0.2em | Sí |
| Dato/Grande | `.text-dato-grande` | Josefin Sans 500 | 44 px · 2.75rem | 1 | -0.01em | No |
| Dato/Medio | `.text-dato-medio` | Josefin Sans 600 | 26 px · 1.625rem | 1.1 | — | No |
| Cuerpo/Base | `.text-cuerpo-base` | Fraunces 400 | 18 px · 1.125rem | 1.65 | — | No |
| Cuerpo/Pequeño | `.text-cuerpo-pequeno` | Fraunces 400 | 15 px · 0.9375rem | 1.6 | — | No |
| Cuerpo/Nota | `.text-cuerpo-nota` | Fraunces 400 itálica | 15 px · 0.9375rem | 1.6 | — | No |

Cada fila tiene sus tokens con el mismo sufijo: `--text-titulo-h2`, `--leading-titulo-h2` y `--tracking-titulo-h2`.

Display/XL es el único estilo fluido. En Figma, la home de móvil (390 px) usa Display/L para el titular que en escritorio (1440 px) es Display/XL, así que el token crece entre los dos con `clamp(4.5rem, 3.2929rem + 4.9524vw, 7.75rem)`. El texto de `body` usa Cuerpo/Base.

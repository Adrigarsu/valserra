# Valserra

Web de una estación de esquí ficticia inspirada en Zermatt. Proyecto de portfolio de Adri García, estudiante de Ingeniería Informática. La home cuenta un descenso de la cumbre (3.883 m) al pueblo (1.620 m) con scroll.

## Cómo trabajar con Adri

- Responde en español.
- Todo el código sigue estándares globales. La primera vez que apliques un estándar en el proyecto, explícalo en una o dos frases (qué es y por qué se usa).
- Si necesitas un archivo que Adri no ha dado, pregúntale antes de seguir.
- Autoría: los commits, pushes, pull requests e issues salen siempre de la cuenta de Adri. Nunca añadas `Co-Authored-By`, "Generated with Claude Code" ni ninguna mención a Claude. `.claude/settings.json` ya desactiva la atribución; no la vuelvas a activar.
- Antes de hacer un push o abrir una pull request, pide confirmación.

## Documentación del proyecto

- `docs/ideario.md`: concepto, dirección de arte, paleta, tipografía, movimiento, arquitectura, reglas de ilustración, alcance y plan por fases. Es la fuente de verdad del diseño.
- `docs/flujo-de-trabajo.md`: GitHub Flow, ramas, commits y definición de hecho.
- Figma: https://www.figma.com/design/u5PvQSj9xywRUVwQMVygGE/Valserra (páginas Componentes básicos, Componentes Valserra, Ilustración, Alta fidelidad y Estados y piezas). Cada issue enlaza el frame que implementa.
- Issues e hitos en GitHub (`Adrigarsu/valserra`): un hito por fase, de la Fase 0 a la Fase 6.

## Stack

- Astro con TypeScript estricto. React solo en las islas interactivas (Forfaits y Tiempo); el resto es HTML, CSS y SVG.
- GSAP con ScrollTrigger y Lenis para la animación del descenso.
- Open-Meteo para el tiempo, pedido desde el navegador.
- Publicación en GitHub Pages con GitHub Actions: `site: 'https://adrigarsu.github.io'` y `base: '/valserra'`. Todos los enlaces internos usan la base.
- Entorno de Adri: Windows con PowerShell. Da los comandos para PowerShell.

## Reglas de código

- Tokens: las variables de Figma se traducen a variables CSS con el mismo nombre (`bg/page` → `--bg-page`, `ilus/cielo` → `--ilus-cielo`). Nada de colores, tamaños o duraciones sueltos en los componentes.
- Modo noche: solo cambian los tokens semánticos y de ilustración, nunca los componentes.
- Datos en `src/data/*.json` y textos en `src/i18n/{es,en}.json`. Las dos lenguas tienen las mismas claves. Los textos usan huecos `{nombre}` y plurales ICU.
- Números sin formato en los datos; se formatean con `Intl` según el idioma. Importes en céntimos de CHF.
- Las etiquetas en mayúsculas se escriben en minúscula y se transforman con CSS (`text-transform: uppercase`).
- Accesibilidad WCAG 2.2 AA: HTML semántico, foco visible, áreas táctiles de 44 px, `prefers-reduced-motion` respetado en toda animación.
- Animaciones solo con `transform` y `opacity`.
- Ilustraciones SVG con grupos de id semántico (`capa-cumbres`, `pista-28`) y rellenos `var(--ilus-*)`.

## Flujo de cada tarea

1. Partir de un issue. Crear la rama `tipo/número-descripción` (por ejemplo `feat/12-navegacion`).
2. Commits pequeños con Conventional Commits en español: `feat(nav): añadir el menú móvil`.
3. Antes de dar algo por hecho: `npm run check`, `npm run lint` y `npm run build` sin errores, y revisión en 390, 834 y 1440 px, en los dos idiomas y en modo noche.
4. Pull request con la plantilla, `Closes #número` y capturas de Figma frente a la web.

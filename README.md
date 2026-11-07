# Valserra

Web de una estación de esquí ficticia inspirada en Zermatt: un descenso de 2.263 metros contado con scroll, de la cumbre al pueblo. Proyecto de portfolio de diseño y desarrollo frontend.

> En construcción. El plan está en los [hitos](../../milestones) y el trabajo en curso en los [issues](../../issues).

- **Diseño:** [archivo de Figma](https://www.figma.com/design/u5PvQSj9xywRUVwQMVygGE/Valserra)
- **Stack:** Astro, TypeScript, React (islas), GSAP, Open-Meteo
- **Flujo de trabajo:** [docs/flujo-de-trabajo.md](docs/flujo-de-trabajo.md)

## Desarrollo local

Necesita Node.js 22.23.4 o superior.

```powershell
npm install
npm run dev            # http://localhost:4321/valserra/
```

| Script | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Valida datos y textos y genera la web estática en `dist/` |
| `npm run preview` | Sirve `dist/` para probar la versión construida |
| `npm run check` | Valida datos y textos y comprueba los tipos de TypeScript y de los `.astro` |
| `npm run validar` | Valida `src/data` con sus esquemas y que `es.json` y `en.json` tengan las mismas claves y huecos |
| `npm run lint` | ESLint: errores, malas prácticas y accesibilidad |
| `npm run format` | Formatea el código con Prettier |
| `npm run format:check` | Comprueba el formato sin cambiar nada |

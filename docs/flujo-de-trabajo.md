# Flujo de trabajo

Valserra se desarrolla con **GitHub Flow**: `main` siempre está lista para publicarse y todo cambio entra por una pull request ligada a un issue.

## 1. Planificación

- **Issues**: cada tarea es un issue con contexto, enlace al frame de Figma, tareas y criterio de "hecho".
- **Hitos**: uno por fase del plan (Fase 0 a Fase 6).
- **Etiquetas**: de tipo (`feature`, `bug`, `diseño`, `docs`, `infra`, `a11y`, `rendimiento`, `seo`, `pulido`, `i18n`) y de área (`home`, `mapa`, `tiempo`, `forfaits`, `sistema`, `componentes`, `animación`).
- **Tablero**: proyecto "Valserra" con las columnas Todo, In Progress y Done.

## 2. Ciclo de un issue

```powershell
# 1. Partir de main actualizada
git switch main
git pull

# 2. Crear la rama: tipo/número-descripción
git switch -c feat/12-navegacion

# 3. Trabajar y hacer commits pequeños
git add .
git commit -m "feat(nav): añadir el cartel de navegación de escritorio"

# 4. Subir la rama y abrir la pull request
git push -u origin feat/12-navegacion
gh pr create --fill
```

5. Antes del push, actualizar la documentación en la misma rama con un commit `docs:` (el estado del proyecto en `CLAUDE.md` y lo que haya cambiado en el README o en este documento). Así cada issue empieza con el contexto al día.
6. Rellenar la plantilla de la pull request: `Closes #12`, enlace a Figma y capturas Figma frente a web.
7. Esperar a que la CI esté en verde (el check `Comprobar` de `.github/workflows/ci.yml`; sin él, `main` no deja unir) y revisar el diff en GitHub.
8. Unir con **Squash and merge** y borrar la rama. El issue se cierra solo y `.github/workflows/deploy.yml` publica la web en GitHub Pages.

## 3. Ramas

| Prefijo | Para |
| --- | --- |
| `feat/` | Funcionalidad nueva |
| `fix/` | Corrección de un error |
| `design/` | Recursos que salen de Figma (SVG, tokens) |
| `docs/` | Documentación |
| `chore/` | Configuración y mantenimiento |

## 4. Commits

[Conventional Commits](https://www.conventionalcommits.org/es/v1.0.0/), en español y en imperativo:

```
tipo(área opcional): qué hace el cambio
```

Tipos: `feat`, `fix`, `style`, `refactor`, `perf`, `test`, `docs`, `chore`, `ci`.
Ejemplos: `feat(mapa): filtrar pistas por dificultad`, `fix(tiempo): mostrar el último parte si falla la API`.

## 5. Definición de hecho

Una pull request se une cuando:

- Coincide con Figma en 390, 834 y 1440 px (con capturas en la pull request).
- Funciona con teclado y el foco se ve.
- Funciona en español e inglés y en modo día y noche.
- Respeta `prefers-reduced-motion` si tiene animación.
- La CI pasa: `npm run check`, `npm run lint`, `npm run format:check` y `npm run build`.
- La documentación está al día.

## 6. Del diseño al código

El diseño vive en [Figma](https://www.figma.com/design/u5PvQSj9xywRUVwQMVygGE/Valserra). Las variables CSS usan el nombre de la sintaxis WEB de cada variable de Figma (`bg/page` → `--color-bg-page`; tabla en [tokens.md](tokens.md)), cada issue enlaza su frame y cada pull request compara Figma con la web.

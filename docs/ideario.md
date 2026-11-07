# Estación de esquí retro: ideario del proyecto

Nov 5, 2026 · @Adri

## Concepto

Una web de estación de esquí ficticia que une la estética del póster de esquí vintage con animación moderna, y que transmite lujo y elegancia. Es un proyecto de portfolio centrado en el frontend y la dirección visual, no en la venta.

- **Objetivo personal:** practicar animación avanzada, interactividad y uso de skills, con una web de nivel Awwwards.
- **Tono:** retro de los años 20 a 60, pero limpio, sereno y premium.
- **Pieza estrella:** el mapa de pistas interactivo con remontes animados.
- **Pieza sorpresa:** el parte meteorológico inmersivo, en el que el tiempo real afecta a la pantalla.

## Dirección de arte

La referencia es el póster de esquí vintage (Whistler, Montreal Winter Sports 1924, Switzerland), llevado a una interfaz limpia y premium.

- **Ilustración plana por capas:** cielo, montes lejanos, picos, bosque y primer plano. Cada capa es un SVG o PNG independiente, lo que permite el parallax con profundidad real.
- **Fondo crema en lugar de blanco puro**, con una textura de grano sutil encima para dar el toque de papel impreso.
- **Lujo por contención:** mucho aire, tipografía grande, pocas cosas por pantalla, animaciones lentas con buen easing y el color usado con moderación.
- **Interfaz limpia y clara**, inspirada en las webs reales de estaciones alpinas, con las imágenes de montaña como protagonistas.
- **Ilustraciones originales:** los pósters de referencia sirven solo como inspiración. Las imágenes de la web deben ser propias, generadas o de bancos con licencia.

## Paleta

El rojo de acento elegido es **#81171B**, el más parecido a una tinta impresa de los tres candidatos. Los otros dos son rojos puros al 100 % de saturación y se ven más digitales que retro.

| Color | Hex | Uso | Contraste sobre crema |
| --- | --- | --- | --- |
| Crema | #F3EBDD | Fondo general | — |
| Rojo burdeos empolvado | #81171B | Acento: titulares, detalles, pistas cerradas | 8,6:1 (AA y AAA) |
| Rojo teja | #9A2B25 | Apoyo: hover, ilustración | 6,5:1 (AA) |
| Azul pizarra | #2F4A63 | Texto y montañas | Por medir |
| #800000 | descartado | Rojo puro, plano | 9,3:1 |
| #880000 | descartado | Rojo puro, más vivo | 8,7:1 |

Paleta completa aprobada: crema claro #FAF6EE para tarjetas, ámbar #D9A441 para el sol y las gafas, y pino #2E4A3F para el bosque y el estado "abierto". El estado "cerrado" usa el burdeos atenuado. Dificultad de pistas (sistema suizo, desaturado): azul #3E6E9E, roja #B8463A (distinta del burdeos de marca), negra #1F2A33 y freeride en ámbar #D9A441 con trazo discontinuo. El verde #4F7A5A se descarta porque en Suiza no hay pistas verdes. Rampa de montañas de lejos a cerca: #DCE6EC, #C9D9E4, #A9C1D3, #7FA3C0, #5C7F9C, #3F5F7C, #2F4A63 y #1F2A33, con la nieve iluminada en crema.

## Tipografía

Para títulos se usará una script de póster (Columbia o una alternativa), y para el texto, una sans geométrica de los años 20.

**Columbia (candidata propia)**

- Script de pincel retro con mucha personalidad, ideal para el logotipo y titulares grandes.
- Tiene tildes y ñ, así que sirve para el español.
- Solo para tamaños grandes. En mayúsculas seguidas se lee mal (la V parece una U, la I se confunde con la J), y en texto pequeño pierde legibilidad.
- Licencia sin confirmar: viene de ffonts.net y el zip no incluye licencia. Hay que comprobarla antes de publicar.

**Alternativas (Google Fonts, licencia libre)**

| Fuente | Carácter |
| --- | --- |
| Yellowtail | La más parecida a Columbia, más fina y elegante |
| Damion | Elegante y ligera |
| Kaushan Script | Pincel, con más energía |
| Leckerli One | Gruesa, muy de póster |
| Fraunces itálica | Serif de lujo, alternativa a la script |

**Más scripts al estilo Yellowtail (Google Fonts):** Norican (la más parecida), Grand Hotel (cine de los años 30), Sail (serena, de lujo), Mr Dafoe (rótulo de los años 50), Rochester, Cookie, Satisfy, Oleo Script, Molle (art déco) y Lobster Two (muy vista, mejor evitarla).

**Preferencia: scripts gruesas con contraste de trazo** (gorditas incluso en las partes finas). Candidatas: Yesteryear, Oleo Script Bold, Leckerli One, Shrikhand, Lily Script One, Berkshire Swash, Galada, Sansita Swashed, Merienda 800, Playball y Sonsie One. Columbia también cumple este criterio.

**Scripts gruesas con contraste de trazo (preferencia actual):** Yesteryear, Berkshire Swash, Oleo Script Bold y Shrikhand como favoritas. También se valoraron Lily Script One, Sansita Swashed, Leckerli One, Chicle, Pattaya, Kaushan Script, Playball y Abril Fatface (serif). Regla: solo para el logo y titulares grandes.

**Más candidatas del estilo de Yellowtail:** Grand Hotel, Norican, Sail, Satisfy, Cookie, Mr Dafoe, Rochester, Molle, Oleo Script y Lobster Two (muy usada, poco original).

**Candidatas manuscritas del estilo de Molle:** Yesteryear y Playball (favoritas), Kaushan Script, Courgette, Damion, Niconne, Charm, Merienda, Marck Script y Caveat Brush.

**Candidatas del estilo de Molle (gruesas, de rótulo pintado):** Shrikhand, Lily Script One, Berkshire Swash, Oleo Script Swash Caps, Margarine, Chicle, Sonsie One, Knewave, Carter One y Fugaz One.

**Sistema tipográfico elegido:** tres familias con un papel cada una. Yellowtail es la voz de marca, Josefin Sans el póster y la interfaz, y Fraunces el texto que se lee.

| Rol | Fuente | Tamaño (escritorio) | Estilo | Color |
| --- | --- | --- | --- | --- |
| Display / logo | Yellowtail | 72–128 px (clamp) | Interlineado 1, máx. uno por pantalla, nunca en mayúsculas | Burdeos #81171B |
| Título de sección (H2) | Josefin Sans 500 | 26–32 px | Mayúsculas, tracking 0,18em | Pizarra #2F4A63 |
| Subtítulo (H3) | Josefin Sans 600 | 18–20 px | Mayúsculas, tracking 0,12em | Pizarra #2F4A63 |
| Antetítulo / etiqueta | Josefin Sans 600 | 12–13 px | Mayúsculas, tracking 0,3em | Burdeos #81171B |
| Cuerpo | Fraunces 400 | 18 px | Interlineado 1,65, ancho 55–65 caracteres | Negra #1F2A33 |
| Texto secundario / notas | Fraunces itálica | 15 px | Interlineado 1,6 | Azul #3F5F7C |
| Datos (tiempo, precios, cotas) | Josefin Sans 500 | 32–48 px | Números tabulares | Pizarra #2F4A63 |
| Botones | Josefin Sans 600 | 14 px | Mayúsculas, tracking 0,2em | Crema sobre burdeos, o contorno pizarra |
| Enlaces | Fraunces | Igual que el cuerpo | Subrayado con offset de 4 px | Burdeos; hover teja #9A2B25 |
| Sobre fondo oscuro (#1F2A33) | Las mismas | — | — | Crema #F3EBDD y ámbar #D9A441 para detalles |

- **Contraste (WCAG 2.2 AA):** todas las combinaciones de texto superan 4,5:1 sobre crema. El azul #5C7F9C (3,6:1) y el ámbar #D9A441 (1,9:1) nunca se usan para texto sobre crema.
- **Escala:** ratio 1,25 sobre una base de 18 px, en rem y con clamp() para que sea fluida entre móvil y escritorio.

## Lenguaje de movimiento

El movimiento de Valserra tiene peso, como un teleférico, y calma, como la nieve: es lento, suave y sin rebotes.

| Token | Valor | Uso |
| --- | --- | --- |
| --dur-micro | 250 ms | Hover, foco, botones (no más, para que la respuesta se sienta inmediata) |
| --dur-base | 600 ms | Cambios de interfaz: tabs, filtros, desplegables |
| --dur-reveal | 1200 ms | Entrada de contenido al hacer scroll |
| --dur-scene | 2000–2400 ms | Transiciones de página, zoom del mapa, cabinas |
| --ease-out | cubic-bezier(0.16, 1, 0.3, 1) | Entradas (expo-out) |
| --ease-in-out | cubic-bezier(0.65, 0, 0.35, 1) | Movimientos de cámara y remontes |
| --ease-in | cubic-bezier(0.7, 0, 0.84, 0) | Salidas |
| --stagger | 120 ms | Retardo entre elementos de una lista |

- **Entradas:** fundido con desplazamiento de 24 px. Los titulares aparecen con una máscara, de abajo arriba, como tinta.
- **Salidas:** duran un 70 % de lo que dura la entrada. Lo que se va no debe hacer esperar.
- **Sin rebotes ni muelles exagerados**, porque restan elegancia.
- **Movimiento continuo** (cabinas, nieve): lento y en bucle, siempre que no distraiga de la lectura.
- **Con prefers-reduced-motion:** solo fundidos de opacidad, sin desplazamientos, parallax ni efectos de tiempo.

## Modo oscuro: Valserra de noche

El modo oscuro es la estación de noche: cielo azul noche, texto crema y el burdeos sustituido por un rosa alpenglow que sí tiene contraste sobre fondo oscuro.

| Token | Claro | Oscuro | Contraste en oscuro |
| --- | --- | --- | --- |
| Fondo | #F3EBDD crema | #16202A noche | — |
| Tarjetas | #FAF6EE | #1F2A33 | — |
| Texto | #1F2A33 | #F3EBDD | 13,9:1 |
| Texto secundario | #3F5F7C | #A9C1D3 | 8,8:1 |
| Acento | #81171B burdeos | #D9776E rosa alpenglow | 5,4:1 |
| Detalle | #D9A441 ámbar | #D9A441 ámbar | 7,3:1 |

- El burdeos #81171B no se puede usar sobre fondo oscuro, porque su contraste es de 1,6:1.
- Las ilustraciones SVG usan variables CSS en sus colores, así que cambian a la versión nocturna sin redibujarlas. El sol se sustituye por la luna.
- Por defecto se respeta la preferencia del sistema (prefers-color-scheme), y hay un interruptor manual que se recuerda.

## Stack técnico

La decisión es **Astro con islas de React**: el contenido visual se sirve como HTML estático y rápido, y React solo se carga en las piezas interactivas.

| Pieza | Herramienta | Para qué |
| --- | --- | --- |
| Framework | Astro + TypeScript | Páginas, rendimiento, View Transitions entre páginas |
| Islas interactivas | React | Mapa, tiempo, carrusel, forfaits |
| Animación | GSAP + ScrollTrigger + MotionPathPlugin | Scrollytelling, parallax, cabinas de remonte |
| Scroll suave | Lenis | Sensación premium |
| Mapa | SVG con IDs por pista y remonte | Interactividad, zoom por zonas |
| Efectos de tiempo | Canvas 2D o WebGL | Gotas, nieve, niebla |
| Datos del tiempo | API de Open-Meteo | Tiempo real gratis y sin clave |
| Opcional | Three.js / React Three Fiber | Montaña en 3D |

- **Por qué Astro:** la web es sobre todo contenido visual con pocas piezas muy interactivas. Compartir estado entre islas es más incómodo, pero aquí cada isla es autónoma.
- **Requisitos:** 60 fps, imágenes AVIF/WebP, lazy loading y respeto a prefers-reduced-motion.

## Librerías de componentes

La mayoría son React + Tailwind + Motion, al estilo shadcn: copias el código a tu proyecto y lo modificas. Se usarán como base técnica y se restilizarán con la paleta retro, porque su look por defecto es muy "tech/SaaS".

| Librería | Qué aporta | Veredicto |
| --- | --- | --- |
| [Vengeance UI](https://next.jqueryscript.net/next-js/vengeance-ui) | Más de 26 componentes animados: heros, botones, libros interactivos, grids con perspectiva | Útil para heros y efectos |
| Animate UI | Componentes y microinteracciones con Motion | Útil para tabs, botones y transiciones |
| [Forge UI](https://www.mintlify.com/AmanShakya0018/forgeui) | Formularios animados, OTP, shimmer, tarjetas; orientada a SaaS | A medias: quizás el formulario de forfaits |
| Uiverse | Elementos sueltos de la comunidad en HTML/CSS | Inspiración; calidad variable |
| UI Lora | No encontrada | Pendiente del enlace |

## Alcance del MVP

La primera versión se centra en las tres piezas estrella (hero, mapa y tiempo), una calculadora de forfaits y el pulido de base.

| Versión | Funcionalidades |
| --- | --- |
| MVP | Hero con parallax por capas, titular con máscara, alpenglow (cumbre de azul a burdeos); mapa con ficha de pista, filtros por dificultad, zoom por sector, cabinas y tren animados, estado abierto o cerrado simulado; tiempo con datos de Open-Meteo, efecto de gafas, clima en pantalla (nieve, lluvia, niebla); calculadora de forfaits; View Transitions; grano de papel; reduced-motion y accesibilidad |
| Versión 2 | Nieve en el hero, limpiar el vaho con el cursor, gráficos animados del parte, formulario de compra animado, carrusel en espiral, galería y webcams, cursor personalizado, montaña en 3D |
| Fuera | Alquiler de material |

## Arquitectura de información

La web se organiza en torno a lo que necesita cada visitante, y la home cuenta el concepto: hacer scroll es bajar esquiando, de la cumbre al pueblo.

**Visitantes y tareas principales**

| Visitante | Contexto | Qué necesita primero |
| --- | --- | --- |
| La esquiadora del día | Móvil, 8:00, en el hotel | Tiempo en la cumbre y remontes abiertos |
| El planificador | Portátil, semanas antes | Cómo es la estación y cuánto cuesta |
| El soñador | Navega por inspiración | Emoción y ganas de ir |
| El recruiter | 10 segundos, sin leer | Efecto "wow" y calidad en los detalles |

**Mapa del sitio y URLs**

| Página | URL | Propósito | Acción principal |
| --- | --- | --- | --- |
| Home | / | Descenso narrativo de la cumbre al pueblo | Ir a forfaits |
| Mapa de pistas | /mapa | Explorar la estación y ver qué está abierto | Abrir la ficha de una pista |
| Mapa por sector | /mapa/sunnegga-rothorn, /mapa/gornergrat, /mapa/matterhorn-glacier | Abre el mapa ya ampliado; se puede compartir | Ver pistas del sector |
| El tiempo | /tiempo | Decidir si subir y a qué cota | Ver pistas abiertas |
| Forfaits | /forfaits | Calcular el precio del viaje | Calcular precio |
| Error 404 | /404 | Recuperar al usuario perdido ("Te has salido de pista") | Volver a la home |

**Home: el descenso (la dirección del scroll coincide con la de la bajada)**

1. 3.883 m, la cumbre: hero por capas con el Matterhorn al amanecer y el alpenglow en burdeos; titular con máscara.
2. 3.089 m: así está la montaña hoy, con datos reales de la cumbre frente al pueblo.
3. 2.582 m: los tres sectores como capítulos que se atraviesan al bajar, cada uno enlazado a su mapa ampliado.
4. 2.288 m: Valserra en tres cifras (3 sectores, 3.883 m, km de pistas).
5. 1.620 m, el pueblo: tu forfait, al pie de los remontes.

**Elementos globales**

- Barra de "estado de hoy" fija en la navegación: temperatura en la cumbre, remontes abiertos y viento.
- Altímetro lateral en la home como indicador de progreso del scroll; cuenta hacia abajo, de 3.883 a 1.620 m.
- Enlaces cruzados: la ficha de pista muestra el tiempo a su cota, el parte enlaza a las pistas abiertas y las tarjetas de sector llevan a su mapa.

**Estados que hay que diseñar**

- **Carga del tiempo:** las gafas empañadas sirven de pantalla de carga mientras llegan los datos de la API.
- **Error de la API:** se muestran los últimos datos guardados con su hora, sin romper la página.
- **Mapa accesible:** vista de lista con las mismas pistas, filtros y estados, para lector de pantalla, teclado o sin JavaScript.
- **Reduced-motion:** el descenso funciona igual, pero sin parallax, solo con fundidos.

## Rejilla y espaciado (propuesta)

La rejilla se diseña primero para móvil, con tres puntos de ruptura y una escala de espaciado en múltiplos de 8.

| Pantalla | Ancho | Columnas | Separación | Margen lateral | Espacio entre secciones |
| --- | --- | --- | --- | --- | --- |
| Móvil | 360–767 px | 4 | 16 px | 20 px | 96 px |
| Tablet | 768–1023 px | 8 | 24 px | 40 px | 128 px |
| Escritorio | 1024 px o más | 12 | 32 px | 6vw (entre 48 y 120 px) | 192 px |

- **Escala de espaciado:** 4, 8, 16, 24, 32, 48, 64, 96, 128 y 192 px.
- **Ancho máximo del contenido:** 1.440 px. Las ilustraciones y el mapa ocupan todo el ancho (a sangre).
- **Composición editorial asimétrica:** el texto ocupa unas 5 de las 12 columnas y la imagen el resto, en lugar de bloques centrados.
- **Ancho de lectura:** entre 55 y 65 caracteres por línea en los textos largos.

## Plan de construcción de la home

La home es una sola escena vertical de unas seis pantallas. Su firma es el descenso por capas con la huella dibujándose al hacer scroll, y todo lo demás la acompaña sin competir con ella.

### Revisión del storyboard

| Criterio | Nota | Motivo |
| --- | --- | --- |
| Primer vistazo | 7 | Foco claro en el Matterhorn, pero el cartel de navegación pesa demasiado |
| Firma | 8 | El descenso es memorable y propio |
| Tipografía | 6 | Tres familias sin tamaños definitivos; el H1 en script necesita más escala |
| Composición | 6 | Cabinas y forfaits concentran mucho contenido |
| Movimiento | 5 | Hay diez efectos y varios compiten entre sí |
| Móvil | 6 | Solo tres fotogramas; faltan los instrumentos y el vistazo al mapa |
| Textos | 5 | Siguen siendo marcadores entre corchetes |

Los tres arreglos prioritarios son reducir los efectos a una firma con tres apoyos, fijar la escala tipográfica y escribir los textos reales (incluidos abajo).

### Brief

- **Qué y para quién:** web conceptual de Valserra, una estación alpina ficticia. Sus públicos son la esquiadora del día, el planificador y el recruiter del portfolio.
- **Tono en tres palabras:** sereno, artesanal, alpino.
- **Firma:** bajar la montaña haciendo scroll. La ilustración por capas se mueve en parallax mientras una huella de esquí se dibuja de la cumbre al pueblo.
- **Medios:** ilustración vectorial propia en SVG, sin vídeo ni fotos de stock.

### Jerarquía de efectos

| Nivel | Técnica | Dónde | Coste |
| --- | --- | --- | --- |
| Firma | Escena vertical por capas con parallax y huella dibujada con el scroll | Toda la home | Alto |
| Apoyo | Alpenglow de entrada | Hero | Bajo |
| Apoyo | Cabinas que avanzan por el cable y se balancean | Sectores | Medio |
| Apoyo | Agujas de los instrumentos | Tiempo | Bajo |
| Apoyo | Abanico de forfaits | Pueblo | Bajo |
| Silencioso | Titulares revelados con máscara, fundidos de entrada y grano de papel | Toda la home | Bajo |
| Eliminado | Cuentakilómetros gigante, titular pintado como pincelada, cursor personalizado | — | — |

La altitud se muestra solo en el altímetro lateral izquierdo, nunca repetida en los textos ni como cifras gigantes. Cada cabina lleva pintado su número de sector (3, 2 y 1).

### Tecnología

- Astro con islas de React solo para el tiempo y los forfaits; la escena es HTML, SVG y GSAP sin React.
- GSAP 3.12 con ScrollTrigger para el scroll y Lenis para el scroll suave. Las versiones se fijan al montar el proyecto.
- Las ilustraciones van como SVG en línea, con los colores enlazados a variables CSS para el modo noche.

### Tokens de base

```css
:root {
  --bg: #F3EBDD;        /* igual que la nieve del borde inferior de la ilustración */
  --surface: #FAF6EE;
  --ink: #1F2A33;
  --slate: #2F4A63;
  --muted: #3F5F7C;
  --accent: #81171B;    /* solo en: H1 en script, CTA principal y estado cerrado */
  --amber: #D9A441;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --dur-reveal: 1200ms;
  --dur-scene: 2400ms;
}
:root[data-theme="night"] { --bg: #16202A; --surface: #1F2A33; --ink: #F3EBDD; --muted: #A9C1D3; --accent: #D9776E; }
html, body { background: var(--bg); color: var(--ink); }
```

### Arquitectura de la escena

- **Contenedor:** el descenso mide 600vh en escritorio y 520vh en móvil. El contenido va en el flujo normal de la página, así el lector de pantalla y el teclado lo recorren en orden.
- **Fondo:** un SVG fijo detrás del contenido, con capas que se desplazan a distinta velocidad según el progreso del scroll. Velocidades: cielo 0,15, cordillera lejana 0,3, Matterhorn 0,5, laderas 1, nubes delanteras 1,4, bosque y pueblo 1.
- **Huella:** un único trazado SVG de arriba abajo. Su stroke-dashoffset pasa de la longitud total a 0 con el scroll (scrub de 0,6). Los bloques de contenido se colocan en las curvas del trazado.
- **Altímetro:** un raíl vertical fijo en el borde izquierdo, con una marca por parada. El marcador baja con el scroll, el tramo recorrido se oscurece y junto al marcador aparecen en vertical la cota y el lugar. La cota sale de interpolar entre 3.883 y 1.620 m según el progreso y usa números tabulares. Al hacer clic en una marca se salta a esa parada. En móvil queda solo el raíl con el marcador.
- **Luz:** una capa ámbar al 12 % de opacidad en el hero baja al 0 % al llegar a las nubes, y el resto de la bajada es luz de día.

### Segmentos de la bajada

| Scroll | Cota | Contenido | Movimiento |
| --- | --- | --- | --- |
| 0–12 % | 3.883 m | Hero: cumbre al amanecer | Alpenglow al cargar; capas en parallax |
| 12–22 % | ≈ 3.400 m | Mar de nubes, sin texto | Tres capas de nubes cruzan a 1,4×; la huella entra en la niebla |
| 22–40 % | 3.089 m | Así está la montaña hoy | Agujas al entrar; interruptor cumbre/pueblo |
| 40–62 % | 2.582 m | Tres sectores en cabinas | Bloque fijado 120vh; las cabinas avanzan con el scroll |
| 62–78 % | 2.288 m | La estación de un vistazo | Cifras que cuentan; remontes que se trazan |
| 78–100 % | 1.620 m | Vuestros forfaits | Abanico de billetes; pie de página |

### Hero

| Elemento | Texto | Tamaño | Estilo | Movimiento |
| --- | --- | --- | --- | --- |
| Cartel de navegación | Valserra · Mapa · Tiempo · Forfaits · estado de hoy · Comprar forfaits | 64 px de alto; se reduce a 52 px al bajar de 120 px de scroll | Placa crema con doble filete de 4 px en tinta y radio de 16 px | Baja desde −20 px, a 0,2 s, durante 0,6 s |
| Antetítulo | Amanece en Valserra | 13 px | Josefin 600, tracking 0,3em, burdeos | Fundido a 0,5 s |
| H1 | La cumbre / ya está despierta | clamp(64px, 9vw, 132px) | Yellowtail, interlineado 0,95, burdeos | Máscara por líneas: retardo 0,7 s + línea × 0,12 s, duración 1,2 s |
| Subtítulo | La primera luz tiñe de rojo las cumbres antes que el valle. Empieza arriba y baja con nosotros hasta el pueblo. | 19 px; máximo 40ch | Fraunces, interlineado 1,6, tinta al 80 % | Subida de 24 px a 1,1 s |
| CTA principal | Empezar el descenso | 14 px; relleno 15 × 26 px | Píldora burdeos con texto crema | Fundido a 1,3 s |
| CTA secundaria | Ver el mapa | 14 px | Enlace de texto subrayado | Fundido a 1,4 s |

El alpenglow empieza al cargar: el sol sube 40 px en 2,4 s (ease-in-out) y una capa rosa #D9776E en modo multiply sobre las caras nevadas pasa de 0 a 0,7 de opacidad y se asienta en 0,35 a los 4 s. La entrada completa dura unos 2,5 s. Es más lenta que lo habitual a propósito, por coherencia con el lenguaje de movimiento.

### Resto de secciones

- **Tiempo:** cuatro instrumentos de 190 px de diámetro (en móvil, 140 px en rejilla de 2 × 2). Cada aguja gira de −120° a su valor en 2 s con ease-in-out, escalonadas 0,15 s. El interruptor cumbre/pueblo mueve las agujas al nuevo valor en 1,2 s.
- **Cabinas:** cable con 6° de inclinación y cabina central de 440 px. El bloque se fija durante 120vh y las cabinas avanzan por el cable con el scroll. Al detenerse, la central oscila −4°, +2,5°, −1° y 0° en 1,8 s. En móvil se pasan con el dedo (scroll-snap), sin fijar el bloque.
- **Vistazo al mapa:** cuatro cifras que cuentan de 0 a su valor en 1,6 s. Después se dibujan los trazos de los remontes, 1,2 s cada uno, escalonados 0,2 s.
- **Forfaits:** al pulsar +, un billete cae 40 px y gira a una posición del abanico entre −8° y 8° en 600 ms. El contador cambia con un giro de 400 ms. Al comprar, los resguardos se cortan: giran 12°, bajan 60 px y se desvanecen en 900 ms.

### Móvil y movimiento reducido

- **Móvil:** las velocidades del parallax se reducen a la mitad. El cartel muestra solo el logo, la píldora de estado y el menú. La compra queda fija abajo y se oculta cuando el bloque de forfaits está en pantalla. Altura mínima de las zonas táctiles: 44 px.
- **Movimiento reducido:** sin parallax ni scrub. La huella aparece ya dibujada, el altímetro cambia por sección sin interpolar, las cabinas quedan quietas y el alpenglow se muestra en su estado final.

### Presupuesto y aceptación

- **Rendimiento:** LCP por debajo de 2,5 s, CLS por debajo de 0,1, menos de 150 KB de JavaScript comprimido en la home y menos de 250 KB en total de ilustraciones SVG. Solo se animan transform y opacity, para mantener 60 fps.
- **No hacer:** tarjetas con borde en el hero, lorem ipsum, ni usar el burdeos fuera de sus tres usos.
- **Primera pantalla aceptada:** el cartel de navegación flota arriba, centrado. A la izquierda están el antetítulo, el H1 en dos líneas, el subtítulo y las dos acciones. A la derecha, el Matterhorn ocupa el tercio central y derecho, con el sol detrás de su hombro izquierdo y la huella saliendo de la cumbre hacia abajo a la izquierda. El borde inferior se funde con el crema del fondo, sin cortes.

## Ilustración e iconos

Toda la ilustración de Valserra tiene que parecer hecha por la misma mano: la del cartel suizo de los años 30, impreso en litografía con pocas tintas planas. Estas reglas valen para la escena del descenso, el mapa, las gafas del tiempo, la 404 y cualquier pieza nueva. Todo el dibujo es original: Zermatt da la geografía, pero no se calca ninguna ilustración existente.

### Reglas de dibujo

| Regla | Qué se hace | Por qué |
| --- | --- | --- |
| Formas | Planos de color con facetas geométricas. Cada masa de montaña lleva dos tonos: cara iluminada y cara en sombra. Sin degradados, salvo el cielo (dos paradas como máximo). | Es lo que da el aire de cartel impreso y pesa poco en SVG. |
| Luz | El sol viene siempre de arriba a la izquierda, en toda la web. Las sombras son planas y azules, nunca grises ni negras. | Una sola luz hace que piezas dibujadas por separado encajen. |
| Contorno | El paisaje no lleva contorno. Los objetos de interfaz dibujados (cabinas, forfait, gafas) sí llevan el borde doble del sistema. | Separa el mundo ilustrado de lo que se puede tocar. |
| Detalle | Disminuye con la distancia: abetos como triángulos de dos tonos, sin ramas; ventanas como rectángulos. | Mantiene la lectura limpia y el peso del SVG bajo. |
| Paleta | Solo colores del sistema, como máximo seis por ilustración más el crema. El burdeos se reserva para acentos pequeños: trazo de esquí, tejados, banderas. | El burdeos tiene que seguir siendo el color que señala. |
| Trazos | Cables y pistas a 3 px con extremos redondeados; el trazo de esquí y el freeride, discontinuos. | Coincide con el grosor grueso de los componentes. |
| Textura | Un único grano de papel muy suave sobre toda la página (alrededor del 4 % de opacidad), no dentro de cada ilustración. | Da el tacto impreso sin multiplicar filtros, que son caros de animar. |

### Capas de profundidad

Cuanto más lejos está una capa, más clara, más azul y con menos contraste (perspectiva atmosférica). Cada capa es un grupo propio en el SVG para que GSAP la mueva a su velocidad.

| Capa | Contenido | Color de día | Parallax |
| --- | --- | --- | --- |
| 1. Cielo | Fondo, sol o luna, estrellas de noche | azul/100 a azul/200 | Fijo |
| 2. Lejos | Cordilleras del fondo | azul/300 | Muy lento |
| 3. Cumbres | Matterhorn y macizo principal | Nieve crema, sombra azul/400 | Lento |
| 4. Media | Bosque y laderas con pistas | Pino/600, nieve crema claro | Medio |
| 5. Cerca | Pueblo, tejados, ventanas, esquiador | Teja y burdeos, ventanas ámbar | Rápido |

### Día y noche

Las ilustraciones no se dibujan dos veces. Cada relleno usa un token de ilustración (`--ilus-cielo`, `--ilus-lejos`, `--ilus-nieve-luz`, `--ilus-nieve-sombra`, `--ilus-roca`, `--ilus-bosque`, `--ilus-tejado`, `--ilus-ventana`, `--ilus-trazo`) que cambia de valor con el modo, igual que los tokens de interfaz. De noche se añaden tres cosas que de día no existen: estrellas, ventanas encendidas y el resplandor rosa alpenglow en las cumbres. Estos tokens están en Figma como colección Ilustración, con modo Día y Noche.

### Reglas técnicas del SVG

- `viewBox` fijo, grupos con id semántico (`capa-cumbres`, `pista-28`) y sin transformaciones anidadas innecesarias.
- Optimizado con SVGO antes de entrar en el proyecto.
- Las ilustraciones decorativas llevan `aria-hidden="true"`; las que informan, como el mapa, llevan `role="img"` y un título accesible.
- Se anima `transform` y `opacity`, nunca rellenos con filtros, para mantener 60 fps.

### Sistema de iconos

Base: **Phosphor Icons**, peso Regular. Es una librería abierta con licencia MIT y su trazo geométrico encaja con Josefin Sans. Los que no existan se dibujan con sus mismas reglas.

- Cuadrícula de 24 px, trazo de 1,5 px, extremos y esquinas redondeados.
- Tamaños: 16, 20, 24 y 32 px. El color es siempre `currentColor`, así hereda el modo noche.
- Los decorativos llevan `aria-hidden`; un botón con solo icono lleva `aria-label` y un área táctil de 44 px.

| Grupo | Iconos | Origen |
| --- | --- | --- |
| Tiempo | Sol, nube, nieve, niebla, viento, termómetro, luna | Phosphor |
| Remontes | Teleférico, tren de cremallera | Phosphor |
| Remontes | Telesilla, telecabina de Valserra | Dibujo propio |
| Pistas | Dificultad (círculo con número), freeride, abierta, cerrada | Dibujo propio |
| Interfaz | Menú, cerrar, flechas, más, menos, mapa, billete, idioma | Phosphor |
| Ajustes | Moneda CHF y €, modo noche | Phosphor, o dibujo propio si falta |

### Lista de ilustraciones

| Ilustración | Dónde | Capas que se animan | Noche | Móvil | Quién |
| --- | --- | --- | --- | --- | --- |
| Escena del descenso | Home, de la cumbre al pueblo | Las cinco capas, trazo de esquí y esquiador | Tokens, estrellas y ventanas | Recorte vertical propio | Claude hace la base, Adri retoca |
| Mar de nubes | Transición de la home | Tres bandas de nubes | Tokens | Igual | Claude |
| Cabinas 3, 2 y 1 | Home, sección de sectores | Cabina, cable, balanceo | Tokens | Igual | Del componente de Figma |
| Mapa de Valserra | Página Mapa y avance en la home | Relieve, pistas y remontes por id, etiquetas | Tokens | Mismo SVG con zoom | Claude, a partir del boceto; Adri revisa |
| Gafas de esquí | Página Tiempo | Marco, lente, reflejo y tiempo dentro | Tokens | Igual | Claude |
| Efectos de tiempo | Tiempo y hero | Nieve, niebla, viento, sol | Tokens | Menos partículas | Claude |
| Forfait | Home y Forfaits | Cuerpo, resguardo, sello | Tokens | Igual | Del componente de Figma |
| Esquiador fuera de pista | 404 | Figura y trazo | Tokens | Igual | Claude |
| Textura de papel | Toda la web | Ninguna | Menos opacidad | Igual | Claude |
| Favicon | Pestaña del navegador | Ninguna | Versión oscura | Igual | Claude |
| Imagen Open Graph | Al compartir el enlace (1200 × 630) | Ninguna | No | No | Derivada de la escena |

## Alta fidelidad y estados

Todo está en el archivo de Figma [Valserra · Sistema de diseño](https://www.figma.com/design/u5PvQSj9xywRUVwQMVygGE), montado con los componentes y las variables del sistema, así que el modo noche funciona en todas las pantallas.

| Página de Figma | Qué contiene |
| --- | --- |
| Alta fidelidad | Home de escritorio (1440) y móvil (390), home en modo noche, y una pantalla clave de Mapa, Tiempo y Forfaits |
| Estados y piezas | Carga y error del tiempo, mapa sin resultados, errores y confirmación de forfaits, aviso de proyecto ficticio, movimiento reducido, menú móvil, 404, tablet (834), favicon e imagen Open Graph |
| Ilustración | Reglas, muestra de día y de noche e iconos propios |

**Datos provisionales usados en las maquetas** (se cierran en el paso de textos y datos):

- 20 pistas (6 azules, 8 rojas, 5 negras, 1 freeride) y 15 remontes, sacados de la tabla de sectores.
- 68 km de pistas: cifra inventada para Valserra.
- Desnivel de 2.263 m (de 1.620 a 3.883 m).
- Forfait de 3 días: adulto 249 CHF, joven 212 CHF, niño 125 CHF, sénior 212 CHF; descuento familia del 10 %. Ejemplo de la maqueta: 2 adultos y 3 niños, 785,70 CHF.

**Notas para el código:**

- Las etiquetas en mayúsculas se escriben en minúscula en el HTML y se ponen en mayúsculas con `text-transform: uppercase` y `lang="es"`, que conserva las tildes. En Figma se han escrito ya en mayúsculas porque su mayúscula automática borraba tildes y eñes.
- La barra de compra del móvil y la navegación son fijas al hacer scroll (`position: sticky`).
- El mapa de las maquetas es provisional y se sustituye por el SVG definitivo.
- Nuevo token de ilustración: `--ilus-nube-sombra`, para que las nubes de noche no se vean como manchas oscuras.

**Textos y datos:** hechos, en `src/data` (sectores, remontes, pistas, tarifas, tiempo y resumen) y `src/i18n` (es.json y en.json, 209 textos con las mismas claves). Al cerrar los datos, las maquetas pasaron de "18/22 remontes" a "13/15", porque Valserra tiene 15 remontes.

## Secciones e ideas

Es el banco de ideas completo. El alcance final se elegirá después.

**Mapa de pistas interactivo (pieza estrella)**

- Mapa ilustrado y exportado como SVG limpio, con IDs por pista y remonte.
- Hover y click en cada pista para ver su ficha, y filtros por color de dificultad.
- Cabinas y sillas moviéndose en bucle por los cables (MotionPathPlugin).
- Estado abierto o cerrado de pistas y remontes.
- Zoom animado a cada zona al hacer click, como una cámara que vuela, y vuelta a la vista general.

**Hero**

- Parallax por capas de la ilustración.
- Nieve cayendo en canvas.
- Titular animado letra a letra.

**Parte meteorológico inmersivo (con datos reales de Open-Meteo)**

- El tiempo real afecta a la pantalla: lluvia, nieve y visibilidad.
- Idea de las gafas de esquí: al entrar, la pantalla es la lente de unas gafas, con gotas o nieve pegadas al cristal. Tras un momento, las gafas se "quitan" y aparece el parte.
  - Encaja con la estética si se dibuja con el mismo lenguaje plano del póster: marco de gafas ilustrado, lente con tinte ámbar vintage y gotas estilizadas, no fotorrealistas.
  - Duración máxima de 1,5 s, se puede saltar y solo se reproduce la primera vez en la sesión.
  - Variantes según el tiempo: lluvia con gotas, nieve con copos pegados, niebla con cristal empañado que el usuario limpia con el cursor.
  - Con prefers-reduced-motion, un fundido simple.
- Visualizaciones animadas de temperatura, viento y nieve acumulada.

**Carrusel en espiral (estilo spiral flux)**

- Tarjetas en una hélice 3D que gira con el scroll o al arrastrar (GSAP o CSS 3D).
- Para la galería o para presentar las zonas de la estación.

**Forfaits y alquiler**

- Calculadora de precios por días y tipo de usuario, con microinteracciones cuidadas.
- Formulario animado con validación.

**Galería y webcams**

- Imágenes de montaña como protagonistas.

**Pulido general**

- Transiciones entre páginas (View Transitions).
- Cursor personalizado, estados de carga bonitos y grano de papel.

## Mapa de Valserra (base: Zermatt)

El mapa usa la geografía real de Zermatt con sus nombres de montañas, remontes y pistas, simplificado a tres sectores. Los remontes que cruzan zonas se eliminan, salvo Furi – Riffelberg, que es el puente entre sectores.

| Sector | Cota alta | Remontes que se mantienen | Remontes que se eliminan |
| --- | --- | --- | --- |
| 1. Sunnegga – Rothorn | Rothorn 3.103 m | Funicular Zermatt – Sunnegga, combinado Sunnegga – Blauherd, teleférico Blauherd – Rothorn, telesilla Patrullarve – Blauherd, telecabina de Kumme | Gant – Blauherd, telesillas de Findeln y Eja, telesilla de Breitboden (cruza al sector 2) |
| 2. Gornergrat | Hohtälli 3.286 m / Gornergrat 3.089 m | Tren de cremallera Gornergrat (Zermatt – Riffelalp – Riffelberg – Rotenboden – Gornergrat), teleférico Gant – Hohtälli, telesilla Riffelberg – Gifthittli | Rote Nase (inactivo en el plano) |
| 3. Matterhorn Glacier Paradise – Schwarzsee | Matterhorn Glacier Paradise 3.883 m | Zermatt – Furi, Furi – Schwarzsee, Furi – Trockener Steg, Trockener Steg – Matterhorn Glacier Paradise, telesilla de Hirli, telesilla de Furggsattel | Arrastres del glaciar del Teódulo, Gandegg, Furgg – Schwarzsee, enlaces con Italia |
| Puente entre sectores 2 y 3 | — | Furi – Riffelberg | — |

**Pistas candidatas (numeración oficial):**

- **Sector 1:** 6 Easy run (azul), 7 Standard (azul), 9 Tuftern (roja), 19 Fluhalp (roja), 8 Obere National (negra), 13 Downhill (negra), 16 Chamois (freeride).
- **Sector 2:** 36 Gornergrat (azul), 37 Riffelhorn (azul), 26 Grünsee (roja), 28 White Hare (roja), 39 Riffelalp (roja), 25 Berter (negra).
- **Sector 3:** 56 Kuhbodmen (azul), 73 Gandegg (azul), 51 Weisse Perle (roja), 65 Rennstrecke (roja), 71 Theodulgletscher (roja), 54 Hörnli (negra), 62 Furgg – Furi (negra).

Los colores están leídos del plano oficial. Suiza clasifica las pistas en azul, roja y negra (no hay verdes), y se añade el amarillo para las rutas de freeride. El plano panorámico es una obra de Kettler Panorama, así que solo se usa como referencia de datos (posiciones, conexiones y colores). La ilustración del mapa de Valserra será original, con el estilo retro de la web.

Fuentes: [plano oficial de pistas (PDF)](https://mymountains.com/wp-content/uploads/2025/05/zermatt-ski-map.pdf), [remontes por sector](https://www.zermattmatterhorn.com/ski_lifts/), [guía de sectores](https://packedagain.com/skiing-in-zermatt/), [Sunnegga Paradise (Wikipedia)](https://en.wikipedia.org/wiki/Sunnegga_Paradise_ski_area).

## Roadmap

La fase de diseño está cerrada: dirección de arte, wireframes, sistema de diseño en Figma, alta fidelidad, estados, textos y datos. Lo que sigue es el plan de desarrollo, en siete fases. Cada fase termina con algo que funciona y se publica; no se empieza la siguiente sin cumplir su criterio de hecho.

### Cómo trabajamos

- **Reparto.** Claude escribe el código, los archivos y los comandos, y explica cada estándar la primera vez que aparece. Adri ejecuta en su ordenador, revisa, prueba y hace todos los commits, pushes y pull requests desde su cuenta. Claude nunca figura como autor ni como coautor en GitHub.
- **Ramas.** `main` siempre publicable. Una rama por fase o pieza (`feat/base-componentes`, `feat/mapa`…) que se une a `main` con una pull request que abre Adri.
- **Commits.** Formato Conventional Commits (`feat:`, `fix:`, `style:`, `docs:`, `chore:`), en español, sin líneas de coautoría.
- **Despliegue.** Se publica en GitHub Pages con GitHub Actions: cada push a `main` construye y publica la web en `https://<usuario>.github.io/valserra/`. Las pull requests se prueban en local con `npm run preview`, porque Pages no genera vistas previas.
- **Antes de cerrar una fase.** Lighthouse y teclado en las páginas tocadas, prueba en móvil y en modo noche.

### Fases

| Fase | Qué se hace | Entregable | Hecho cuando | Sesiones |
| --- | --- | --- | --- | --- |
| 0 · Montaje | Proyecto Astro con TypeScript estricto e integración de React; estructura de carpetas; tokens de Figma como variables CSS (Color, Dimensiones e Ilustración, día y noche); fuentes; ESLint, Prettier y EditorConfig; datos e i18n copiados a `src/`; repositorio y despliegue | Web vacía publicada con las fuentes y los colores | `npm run build` y el linter pasan sin errores y la URL pública carga | 1 |
| 1 · Base y componentes | Layout con navegación, footer, idioma, moneda y modo noche (recordado y respetando el sistema); rutas `/es` y `/en`; los 12 componentes de Figma en código con sus estados; página interna de muestra | Catálogo de componentes navegable | Cada componente funciona con teclado, en los dos idiomas y en los dos modos | 2–3 |
| 2 · Mapa definitivo (lo dibuja Claude) | Ilustración original del mapa a partir del boceto y de la tabla de sectores, con las reglas de ilustración: relieve por capas, 20 pistas y 15 remontes con id propio, etiquetas y versión de noche con tokens. Se dibuja en Figma, Adri lo revisa y se exporta a SVG optimizado | `mapa.svg` con ids que coinciden con `pistas.json` y `remontes.json` | Adri lo aprueba y cada pista y remonte del JSON tiene su trazo en el SVG | 1–2 |
| 3 · Home estática | Todas las secciones de la home maquetadas y responsive (390, 834, 1440), con la escena SVG ligada a los tokens y los datos reales | Home completa sin animación | Coincide con las maquetas de Figma en los tres tamaños y sirve como versión de movimiento reducido | 2 |
| 4 · El descenso | GSAP con ScrollTrigger y Lenis: parallax por capas, trazo de esquí con el scroll, mar de nubes, altímetro sincronizado, cabinas y abanico de forfaits; tokens de movimiento | Home animada | 60 fps en un portátil medio y nada se mueve con `prefers-reduced-motion` | 2–3 |
| 5 · Páginas | Forfaits (isla React: cálculo, validación, confirmación simulada, CHF y €); Tiempo (isla React con Open-Meteo, carga, error, gafas y efectos); Mapa interactivo (zoom, filtros, lista, ficha y estado vacío) sobre el SVG de la fase 2; 404 | Las cuatro páginas funcionando | Los estados de la página Estados y piezas de Figma están todos implementados | 3–4 |
| 6 · Pulido y publicación | View Transitions, aviso de proyecto ficticio, SEO (títulos, descripción, Open Graph, `hreflang`, sitemap), favicon, auditoría WCAG 2.2 AA, pruebas en móvil real y README del repositorio para el portfolio | Versión 1.0 publicada | Lighthouse 90 o más en las cuatro categorías y ningún error de accesibilidad grave | 1–2 |

En total, entre 12 y 17 sesiones.

### Antes de empezar la fase 0 (lo hace Adri)

1. Instalar Node.js (la versión LTS de nodejs.org) y Git.
2. Configurar Git con el nombre y el correo de la cuenta de GitHub, para que los commits salgan a su nombre.
3. Crear en GitHub un repositorio vacío llamado `valserra`, sin README ni licencia.
4. Nada que crear para el despliegue: se usa GitHub Pages y se activa en la fase 0 (Settings, Pages, Source: GitHub Actions).
5. Instalar VS Code con la extensión oficial de Astro.
6. Decirle a Claude el sistema operativo y si el ordenador está enlazado a este chat.

## Decisiones

**Tomadas**

- Tema: Valserra, estación de esquí ficticia con el terreno y las coordenadas de Zermatt (Suiza).
- Estética: póster retro con animación moderna y aire de lujo.
- Stack: Astro con islas de React.
- Fondo crema y rojo de acento #81171B. Títulos en Yellowtail y textos en Josefin Sans. Idiomas: español e inglés desde el MVP (rutas /es y /en). Moneda: selector CHF / €. Modo oscuro desde el MVP ("Valserra de noche"). Ilustraciones: vectores SVG construidos por Claude y retocados por la diseñadora, con los colores enlazados a los tokens.

**Pendientes**

- [ ] Mejorar el boceto del mapa (valserra-mapa-boceto.svg): silueta del Matterhorn, trazado de las pistas y perspectiva, manteniendo los IDs.
- [ ] Probar Yellowtail sobre la ilustración en una maqueta del hero.
- [ ] Definir el lenguaje de movimiento: easing, duraciones y entradas y salidas.
- [ ] Completar la paleta: azules, nieve y estado "abierto".
- [ ] Enlace de UI Lora.
- [ ] Alcance del MVP elegido.

**Diseño pendiente antes de programar**

- [ ] Alcance del MVP: hecho, ver la sección Alcance del MVP.
- [ ] Mapa del sitio: hecho, ver Arquitectura de información.
- [ ] Rejilla y breakpoints: hecho, ver Rejilla y espaciado.
- [ ] Wireframes de baja fidelidad: hecho, en el lienzo Valserra · Wireframes (home, mapa, tiempo, forfaits, menú, noche y 404).
- [x] Inventario de componentes: hecho, en Figma (Valserra · Sistema de diseño), con variables, estilos de texto, modo Día y Noche y 12 componentes con sus estados.
- [x] Iconografía y dirección de ilustración, con la lista de capas e imágenes que hay que crear.
- [ ] Mapa definitivo: lo dibuja Claude a partir del boceto, en la fase 2 del plan de desarrollo, y Adri lo revisa.
- [x] Estados reales: carga y error del tiempo, tabla de código de tiempo a efecto visual, filtro del mapa sin resultados, errores del formulario de forfaits, confirmación de compra ficticia y versión del descenso con movimiento reducido.
- [x] Piezas sueltas: footer de escritorio, aviso de proyecto ficticio de portfolio, adaptación a tablet, favicon e imagen Open Graph.
- [ ] Storyboards de las tres piezas estrella: mapa, tiempo con gafas y carrusel en espiral.
- [x] Alta fidelidad: la home completa en escritorio y móvil, y una pantalla clave de mapa, tiempo y forfaits. El resto se monta en código con los componentes.
- [x] Textos y datos reales en español e inglés: textos de todas las páginas, datos de pistas y remontes, tarifas en CHF y € y preguntas frecuentes, preparados como los JSON que leerá la web.

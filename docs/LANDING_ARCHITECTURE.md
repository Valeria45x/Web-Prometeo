# Arquitectura de la landing

## Objetivo

La landing está organizada para separar cinco responsabilidades:

- composición narrativa
- contenido y copy
- estado de shell y layout
- motion y estado de escena
- presentación visual de cada bloque

La idea es que una persona que revise el proyecto pueda localizar rápido dónde vive cada decisión sin recorrer archivos monolíticos.

## Mapa de módulos

- `src/pages/Landing.jsx`: coordina la shell general de la página.
- `src/hooks/useLandingShell.js`: controla el estado global de la shell, como el cambio claro/oscuro y la visibilidad del wordmark del navbar.
- `src/hooks/useLandingFooterReveal.js`: encapsula la lógica del reveal del footer en desktop.
- `src/components/landing/content/LandingContent.jsx`: compone las secciones de la narrativa principal.
- `src/components/landing/content/landing.content.js`: reúne labels, títulos y copy de la landing.
- `src/components/landing/hero`: concentra el hero, su contenido y la lógica del fill del subtítulo.
- `src/components/landing/mision`: concentra la orquestación de Misión, sus variantes y su copy.
- `src/components/landing/nexo`: agrupa contenido, estado de scroll y render repetido de Nexo.
- `src/components/landing/transition`: agrupa comportamiento y cálculo estructural de las transiciones.
- `src/components/landing/scroll`: encapsula la sección de pilares, su stage, configuración y utilidades.
- `src/components/landing/shared`: centraliza utilidades visuales compartidas como `theme.js`, `ScrambleText.jsx` y `scrollTextReveal.css`.
- `src/components/landing/legacy`: aparta piezas no usadas por la narrativa actual para que no contaminen la lectura de la landing activa.

## Secciones de la landing

Cada sección mantiene su responsabilidad visual dentro de `src/components/landing`:

- `hero/HeroSection.jsx`: hero de entrada.
- `mision/MisionSection.jsx`: desarrollo del problema.
- `nexo/NexoSection.jsx`: punto de cambio de superficie y nexo narrativo.
- `transition/LandingTransitionSection.jsx`: transiciones entre bloques narrativos.
- `scroll/PrometeoScrollSection.jsx`: orquestación de la sección de pilares.
- `entry-points/EntryPointsSection.jsx`: bloque final de entradas y CTA.
- `footer/LandingFooter.jsx`: footer de la landing.

## División por sección

Las secciones principales ya no quedan resueltas en un único archivo grande:

- `hero/HeroSection.jsx` actúa como orquestador y delega el copy y el cálculo del fill del subtítulo.
- `mision/MisionSection.jsx` decide la variante responsive y delega el render a módulos específicos.
- `nexo/NexoSection.jsx` delega el estado de scroll y reutiliza un componente de heading común.
- `transition/LandingTransitionSection.jsx` delega la activación del scramble y el cálculo de líneas estructurales.
- `scroll/PrometeoScrollSection.jsx` ya está separado en contenido, hook de escena, utilidades y stage.

## Bloque de pilares

La sección de pilares se divide ahora por responsabilidad:

- `scroll/PrometeoScrollSection.jsx`: orquesta la sección y conecta estado, copy y subcomponentes.
- `scroll/PrometeoScrollMoveStage.jsx`: representa el stage visual del bloque de pilares.
- `scroll/usePrometeoScrollScene.js`: concentra el estado de escena, scroll y temporización.
- `scroll/prometeoScroll.config.js`: guarda contenido, motion y configuración estructural del bloque.
- `scroll/prometeoScroll.utils.js`: contiene utilidades geométricas y de interpolación.

## Criterios de organización

Las decisiones de código siguen estas reglas:

1. El contenido no se incrusta en los componentes si puede reutilizarse o revisarse por separado.
2. La lógica de layout no vive en la página si puede extraerse a un hook.
3. El estado derivado de una escena interactiva se encapsula en hooks o módulos propios.
4. Las utilidades matemáticas y geométricas no se dejan dentro del JSX.
5. Los componentes principales deben leerse como orquestadores, no como archivos totales.

## Regla para extender la landing

Si una nueva pieza necesita entrar en la landing:

1. El contenido compartido debe ir primero a `content/landing.content.js` o al módulo de contenido de su propia sección.
2. La composición general debe mantenerse en `content/LandingContent.jsx`.
3. Si aparece nueva lógica de scroll, reveal o sincronización, debe salir a un hook o utilidades dedicadas.
4. Si una decisión visual pasa a repetirse, debe subir a `src/design/prometeoSystem.js` o a `src/design/tokens.js`.

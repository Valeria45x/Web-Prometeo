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
- `src/components/landing/LandingContent.jsx`: compone las secciones de la narrativa principal.
- `src/components/landing/landing.content.js`: reúne labels, títulos y copy de la landing.

## Secciones de la landing

Cada sección mantiene su responsabilidad visual dentro de `src/components/landing`:

- `HeroSection.jsx`: hero de entrada.
- `MisionSection.jsx`: desarrollo del problema.
- `NexoSection.jsx`: punto de cambio de superficie y nexo narrativo.
- `PrometeoScrollSection.jsx`: orquestación de la sección de pilares.
- `EntryPointsSection.jsx`: bloque final de entradas y CTA.
- `LandingFooter.jsx`: footer de la landing.

## Bloque de pilares

La sección de pilares se divide ahora por responsabilidad:

- `PrometeoScrollSection.jsx`: orquesta la sección y conecta estado, copy y subcomponentes.
- `PrometeoScrollMoveStage.jsx`: representa el stage visual del bloque de pilares.
- `usePrometeoScrollScene.js`: concentra el estado de escena, scroll y temporización.
- `prometeoScroll.config.js`: guarda contenido, motion y configuración estructural del bloque.
- `prometeoScroll.utils.js`: contiene utilidades geométricas y de interpolación.

## Criterios de organización

Las decisiones de código siguen estas reglas:

1. El contenido no se incrusta en los componentes si puede reutilizarse o revisarse por separado.
2. La lógica de layout no vive en la página si puede extraerse a un hook.
3. El estado derivado de una escena interactiva se encapsula en hooks o módulos propios.
4. Las utilidades matemáticas y geométricas no se dejan dentro del JSX.
5. Los componentes principales deben leerse como orquestadores, no como archivos totales.

## Regla para extender la landing

Si una nueva pieza necesita entrar en la landing:

1. El contenido debe ir primero a `landing.content.js` o a un módulo de contenido específico.
2. La composición general debe mantenerse en `LandingContent.jsx`.
3. Si aparece nueva lógica de scroll, reveal o sincronización, debe salir a un hook o utilidades dedicadas.
4. Si una decisión visual pasa a repetirse, debe subir a `src/design/prometeoSystem.js` o a `src/design/tokens.js`.
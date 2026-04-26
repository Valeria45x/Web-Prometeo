# Prometeo — Contexto para Claude Code

## Quién soy

Soy Valeria Cabrera, estudiante de Grado en Diseño Multimedia en UDIT Madrid.
Este repositorio es mi Trabajo de Fin de Grado (TFG) 2025/2026.
La carpeta `/docs` contiene dos archivos de referencia obligatoria:

- `MEMORIA_DE_INVESTIGACION.md` — justifica todas las decisiones de diseño y marca
- `TFG_REQUISITOS_UDIT.pdf` — guía docente con los criterios de evaluación del tribunal

Léelos antes de proponer cualquier cambio. Todas las decisiones deben estar alineadas con ambos documentos.

## El proyecto

**Prometeo** es la primera marca de privacidad digital para jóvenes hispanohablantes (18–25 años).
Web en producción: **proyectoprometeo.info** (dominio GoDaddy — requisito UDIT cumplido).
Repositorio: https://github.com/Valeria45x/Web-Prometeo

El ecosistema de marca tiene cuatro pilares:

1. **Certificación** — sello B2B2C con niveles Bronce / Plata / Oro (modelo Fair Trade / B Corp)
2. **Educación** — contenido en Instagram y TikTok, sin tecnicismos que luego se expande en la web con mas detalle
3. **Producto físico** — USB Joya (cifrado hardware + diseño como declaración)
4. **Landing web** — esta web, apoyo a la comunicación de la marca mas articulos de informacion

## Stack técnico

- React 18 + Vite 5
- Tailwind CSS 3
- Sin librerías de UI externas — todo custom
- Commits frecuentes por versiones (v1, v2, v3...) en rama `main`

## Identidad visual (NO negociable)

**Tipografía:**

- Display / títulos: `Funnel Display` (Google Fonts, weight 700–800)
- Cuerpo / labels: `Funnel Sans` (Google Fonts, weight 400–700)
- Nunca usar Inter, Roboto, o tipografías genéricas

**Paleta:**

- `#FF4545` — rojo Prometeo (acento principal, nunca fondo completo en secciones largas)
- `#F2CD5C` — amarillo (acento secundario, destacados en fondos oscuros)
- `#FEFFE3` — crema (fondo principal)
- `#212121` — negro (texto, líneas de grid, fondos oscuros)

**Sistema visual:**

- Grid editorial con líneas finas de 1px en `#212121`
- Clases clave: `.line-box`, `.panel`, `.panel-dark`, `.panel-red`, `.sigilo-block`
- Cybersigilism como recurso gráfico: formas orgánicas redondeadas con terminaciones puntiagudas
- Los sigilos son SVGs inline con trazos en `#FF4545` y `#F2CD5C` sobre fondo `#212121`
- Referencias de estilo: Nike Circularity (grid editorial), Synthopsis/Stolc (tono tech-brutal), IP.AXIS Industrial (paleta oscura en sección producto)

**Tono narrativo:**

- En español, dirigido a Gen Z hispanohablante
- Empoderamiento sobre miedo — nunca alarmista
- Copy corto, directo, con mayúsculas en títulos display
- Labels técnicos en inglés (small-label), copy principal en español

## Estructura de secciones (en orden)

1. `Topbar` — sticky, grid 4 columnas, nav links internos
2. `Hero` — mega-title con claim, sigilo animado, fondo crema
3. `Sobre` — stat 67%, problema de diseño, dos columnas contexto
4. `Certificacion` — tabs consumer/empresa, niveles Bronce/Plata/Oro, proceso 3 pasos
5. `Producto` — USB Joya protagonista, specs técnicas, panel oscuro
6. `Educativo` — 3 cards temáticas (cookies, dark patterns, herramientas), links RRSS
7. `Contacto` — panel oscuro RRSS + formulario email/mensaje
8. `Footer` — créditos UDIT, dominio, versión

## Clases CSS custom (definidas en `src/index.css`)

.mega-title → Funnel Display, clamp(3.2rem, 9vw, 8.5rem), uppercase, -0.04em
.section-title → Funnel Display, clamp(1.8rem, 4.5vw, 4.8rem), uppercase, -0.03em
.sub-title → Funnel Display, clamp(1.2rem, 2.5vw, 2.4rem), uppercase
.small-label → Funnel Sans, 11px, tracking-widest, uppercase, bold
.nav-link → Funnel Sans, 11px, uppercase, bold, hover: #FF4545
.body-copy → Funnel Sans, 14px, line-height 1.7, max-width 60ch
.micro-copy → Funnel Sans, 12px, line-height 1.65
.line-box → border 1px #212121, bg #FEFFE3
.panel → border 1px #212121, bg #f5f5e8
.panel-dark → border 1px #212121, bg #212121, color #FEFFE3
.panel-red → border 1px #212121, bg #FF4545, color #FEFFE3
.sigilo-block → bg #212121, overflow hidden, con grid hairline interior
.hairline-grid → grid de fondo 20x20px en rgba(33,33,33,.07)
.nivel-badge → pill con border currentColor, Funnel Sans 10px uppercase
.accent-red → color #FF4545
.accent-yellow → color #F2CD5C

## Colores Tailwind extendidos (tailwind.config.js)

rojo: #FF4545
amarillo: #F2CD5C
crema: #FEFFE3
negro: #212121
line: #212121
bg: #FEFFE3
bg-dark: #212121

## Reglas de trabajo

1. **Leer antes de cambiar** — ante cualquier decisión de diseño, contrastar con la memoria de investigación en `/docs`
2. **No romper el grid** — cada sección usa `border-b border-line`, cada celda usa `.line-box` o variantes
3. **No cambiar la paleta** — los cuatro colores son el sistema completo
4. **No cambiar las fuentes** — Funnel Display + Funnel Sans únicamente
5. **Mobile-first** — audiencia Gen Z en móvil, breakpoints: base=390px, md=768px, lg=1280px
6. **Commits descriptivos** — al terminar cada bloque de trabajo, commit con versión y descripción
7. **El dominio es proyectoprometeo.info** — aparece en footer, meta tags y cualquier referencia pública

## Qué NO hacer

- No usar colores fuera de la paleta definida
- No usar tipografías distintas a Funnel Display / Funnel Sans
- No añadir librerías externas sin consultarlo (framer-motion, etc.)
- No traducir el copy principal al inglés — la web es en español
- No eliminar secciones del flujo de navegación definido
- No usar fondos completamente rojos en secciones largas de scroll
- No romper la estructura de grid editorial con elementos flotantes sin ancla

## Contexto para el tribunal UDIT

- La web es una pieza del TFG que demuestra identidad + sistema de diseño + campaña aplicados
- Debe mostrar viabilidad de mercado y ejecución real (dominio activo = evidencia)
- Cada decisión visual tiene justificación en la investigación (ver `/docs/MEMORIA_DE_INVESTIGACION.md`)

Recuerda la estructura de carpetas para que funcione:
Web-Prometeo/
├── CLAUDE.md ← este archivo
├── docs/
│ ├── MEMORIA_DE_INVESTIGACION.md
│ └── TFG_REQUISITOS_UDIT.pdf
├── src/
│ ├── App.jsx
│ ├── index.css
│ └── main.jsx
├── tailwind.config.js
└── ...

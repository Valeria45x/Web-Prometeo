# Plan de cierre web: 5-8 de junio de 2026

## Objetivo

Llegar a la defensa con una web coherente, funcional y fácil de explicar.
Prometeo se presenta como un prototipo funcional de un ecosistema de marca, no
como una empresa con infraestructura de producción.

La guía permite ajustar el nivel de desarrollo web a la naturaleza del proyecto.
En Prometeo, la web demuestra la integración de los cuatro pilares y dos
recorridos principales. No es necesario construir backend, pagos o certificación
real para demostrar esa propuesta.

## Definición de terminado

La web está terminada cuando:

- la landing explica qué es Prometeo y separa personas de organizaciones;
- los dos recorridos principales pueden completarse sin enlaces rotos;
- comunidad, cuenta, carrito y pedidos funcionan como demo local;
- desktop y móvil no presentan cortes, desbordamientos ni acciones inaccesibles;
- el alcance del prototipo se explica con honestidad;
- las animaciones apoyan la lectura y no retrasan el contenido;
- el build de producción termina sin errores;
- existe un guion de demo que puede recorrerse en menos de 3 minutos.

## Journeys que se defienden

### Persona

`Landing -> Para ti -> Artículos o Comunidad -> Cuenta`

Objetivo: demostrar que Prometeo convierte la privacidad en contenido
comprensible y participación.

Extensión opcional:

`Para ti -> Tienda -> Producto -> Carrito`

Objetivo: demostrar cómo el sistema pasa de lo digital al objeto físico.

### Organización

`Landing -> Para empresas -> Certificación -> Contacto`

Objetivo: demostrar una propuesta de confianza visible y un siguiente paso
claro para una organización.

## Prioridades

### P0: imprescindible

- Revisar los dos journeys completos en desktop y móvil.
- Corregir errores funcionales, enlaces rotos, overlays que no cierran y
  desbordamientos horizontales.
- Sustituir cualquier placeholder visible durante el guion de defensa.
- Confirmar que el proyecto abre desde el archivo o enlace que se presentará.
- Preparar una versión de producción estable.

### P1: acabado visible

- Igualar ritmos de espaciado, titulares, botones y estados hover.
- Mantener las animaciones entre 200 y 900 ms salvo escenas ligadas al scroll.
- Mostrar contenido útil durante el primer viewport de cada página.
- Revisar contraste, tamaño móvil y longitud de textos.
- Usar imágenes distintas cuando representen funciones distintas.

### P2: solo si sobra tiempo

- Dividir el bundle por rutas.
- Reducir componentes muy largos.
- Añadir pruebas automatizadas.
- Ampliar contenido editorial o catálogo.

### Fuera de alcance

- Backend real.
- Autenticación real.
- Base de datos compartida.
- Pago real.
- Auditoría o certificación real.
- Render 3D funcional.
- Nuevas páginas o nuevas funciones no necesarias para los journeys.
- Reescritura del sistema de diseño o migración de framework.

## Calendario

### Viernes 5 de junio: congelar y estabilizar

1. Cerrar el alcance con este documento.
2. Ajustar motion global y eliminar esperas innecesarias.
3. Recorrer todas las rutas en 1440 px y 390 px.
4. Registrar únicamente fallos P0 y P1.
5. Corregir primero los fallos que aparecen en el guion de demo.

Resultado del día: una versión funcional que ya se podría enseñar.

### Sábado 6 de junio: pulido visual

1. Sustituir placeholders que aparezcan en la demo.
2. Corregir jerarquía, espacios, cortes de texto y estados interactivos.
3. Revisar landing, Para ti, Empresas, Certificación, Comunidad y Tienda.
4. No añadir funciones nuevas.

Resultado del día: una versión visualmente coherente y creíble.

### Domingo 7 de junio: QA y defensa

1. Probar los dos journeys desde cero y con `localStorage` limpio.
2. Probar Chrome/Edge en desktop y un móvil real.
3. Ejecutar el build final.
4. Capturar pantallas y vídeo de respaldo.
5. Ensayar la demo dentro de la presentación de 7 minutos.

Resultado del día: entrega bloqueada y material de defensa preparado.

### Lunes 8 de junio: margen

Usar solo para un error crítico, exportación o ensayo. No rediseñar.

## Método de trabajo

Trabajar en bloques de 50 minutos:

1. Elegir un único problema visible.
2. Definir cómo se comprueba que está resuelto.
3. Hacer el cambio mínimo.
4. Verificar desktop, móvil y build.
5. Cerrar el problema antes de abrir otro.

No trabajar por página completa. Trabajar por capas:

1. Función y navegación.
2. Responsive y accesibilidad.
3. Jerarquía y espaciado.
4. Motion.
5. Detalle visual.

## Guion de demo

1. Landing: problema, propuesta y división de públicos.
2. Persona: entrar en Para ti y abrir Comunidad.
3. Mostrar que la comunidad y la cuenta funcionan como prototipo local.
4. Volver al recorrido de empresa.
5. Abrir Certificación y terminar en Contacto.
6. Explicar que la tienda amplía la marca hacia el objeto físico.

La explicación técnica debe ser breve: React y Vite para una SPA estática,
React Router para navegación, contexto y `localStorage` para simular estado, y
un sistema visual propio basado en la retícula AES-256.

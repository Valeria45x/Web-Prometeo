# Prometeo v3

Versión rehecha para acercarse mucho más a la referencia:
- estética editorial/grid
- fondo gris claro
- líneas finas negras
- cajas cuadradas
- tipografía grande y limpia
- acentos cyber muy sutiles
- narrativa más sobria y tecnológica

## uso
npm install
npm run dev

## nota tecnica provisional

Prometeo funciona ahora mismo como una SPA estatica hecha con React y Vite.
Esta version esta pensada como prototipo funcional de un proyecto de diseno, no
como producto con backend de produccion.

- Comunidad, perfil, tienda y pedidos usan `localStorage` para simular datos.
- No hay autenticacion real ni base de datos compartida.
- No se deben introducir datos personales reales en los flujos de demo.
- El formulario de contacto solo envia datos si existe `VITE_FORMSPREE_ID`.
- GitHub Pages publica el resultado de `npm run build` como archivos estaticos.

Antes de la entrega final conviene revisar codigo no usado, dependencias,
contenido de demo y documentar claramente el alcance del prototipo.

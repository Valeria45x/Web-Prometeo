# Medios (imágenes y vídeo)

## Fuente única: `@/lib/media`

Todas las imágenes y vídeos del sitio se importan desde un único módulo,
`src/lib/media.js`. Ningún componente referencia un asset directamente.

```js
import { placeholderImage, placeholderVideo } from "@/lib/media";
```

**Por qué:** centralizar los medios hace que cualquier cambio de origen sea un
edit en un solo archivo, sin tocar el resto del código.

## Migración futura a imagekit.io

Cuando se migre a imagekit, **solo se edita `@/lib/media`**: se sustituyen los
imports locales por las URLs remotas. El resto del proyecto no cambia.

```js
// Antes (assets locales):
import placeholderImage from "@/assets/placeholder-image.webp";

// Después (imagekit):
export const placeholderImage = "https://ik.imagekit.io/tu_id/hero.webp";
```

imagekit además sirve los formatos modernos (WebP/AVIF), comprime y entrega
imágenes responsive automáticamente, así que asume buena parte de la
optimización de carga.

## Sobre el placeholder y `sharp`

El placeholder se guardó como **WebP** (52 KB) en vez de PNG (1.6 MB), un −97 %
de peso. Es el elemento más pesado del primer pintado (LCP), por eso importa.

`sharp` se usó **solo para esa conversión puntual** (PNG → WebP) y **se
desinstaló** después; no forma parte del build ni del runtime. Si en el futuro
hay que convertir más assets locales antes de subirlos a imagekit, se reinstala
de forma temporal:

```bash
npm install -D sharp
node -e "require('sharp')('entrada.png').webp({quality:80}).toFile('salida.webp')"
npm uninstall sharp
```

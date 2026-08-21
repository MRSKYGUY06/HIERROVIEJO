# Hierro Viejo — Sitio Web Corporativo y Catálogo Industrial

Sitio web para venta de maquinaria industrial y metalúrgica nueva y usada, construido con
**Next.js 16 (App Router) + TypeScript + Tailwind CSS v4**.

## 1. Tecnologías utilizadas

- **Next.js 16** (App Router, Server Components, `generateStaticParams`, `generateMetadata`)
- **React 19** + **TypeScript**
- **Tailwind CSS v4** (tokens de diseño vía `@theme` en `app/globals.css`, sin `tailwind.config.ts`)
- **next/font** (Oswald, Inter, JetBrains Mono — auto-hosteadas por Next)
- **next/image** (optimización, lazy loading, `sizes` responsive)
- Sin base de datos: los datos viven en `lib/products.ts` (fácil de migrar a un CMS/API más adelante)

## 2. Estructura de carpetas

```
hierro-viejo/
├── app/
│   ├── layout.tsx              → Layout raíz: fuentes, <Header/>, <Footer/>, WhatsApp flotante, SEO global
│   ├── page.tsx                → Home
│   ├── globals.css             → Tokens de diseño (colores, tipografías, animaciones)
│   ├── sitemap.ts              → /sitemap.xml dinámico (incluye cada producto)
│   ├── robots.ts                → /robots.txt
│   ├── not-found.tsx           → Página 404
│   ├── empresa/page.tsx        → Página institucional
│   ├── servicios/page.tsx      → Servicios (venta, compra, permutas, consignación, tasación, asesoramiento)
│   ├── contacto/page.tsx       → Contacto + formulario + mapa
│   └── maquinas/
│       ├── page.tsx            → Catálogo completo con filtros
│       ├── nuevas/page.tsx     → Catálogo filtrado a "nuevas"
│       ├── usadas/page.tsx     → Catálogo filtrado a "usadas"
│       └── [slug]/page.tsx     → Ficha de producto individual (ruta dinámica)
├── components/                 → Componentes reutilizables (Header, Footer, ProductCard, CatalogClient, etc.)
├── lib/
│   ├── products.ts             → Modelo de datos + productos DEMO + categorías
│   └── site-config.ts          → Datos de contacto, WhatsApp, stats de la empresa
└── public/images/              → Imágenes (placeholders + fotos reales provistas)
```

## 3. Cómo ejecutar el proyecto

Requiere Node.js 18.18+ (recomendado 20+).

```bash
cd hierro-viejo
npm install
npm run dev
```

Abrí `http://localhost:3000`.

Para producción:

```bash
npm run build
npm run start
```

> **Nota:** `next/font` descarga las tipografías (Oswald, Inter, JetBrains Mono) de Google Fonts
> durante el build/dev. Necesitás una máquina con acceso normal a internet la primera vez
> (luego quedan cacheadas). Si trabajás detrás de un proxy corporativo, configurá
> `HTTP_PROXY`/`HTTPS_PROXY`, o migrá a `next/font/local` auto-hosteando los archivos `.woff2`.

## 4. Dónde modificar cada cosa

### Productos (agregar / editar / eliminar)
Archivo: **`lib/products.ts`**
- Cada producto es un objeto dentro del array `products`, con este modelo:
  `id, slug, name, condition ("nueva"|"usada"), category, subcategory?, brand, model, description,
  specifications[], images[], featured, availability, price, isDemo?`.
- Los campos de `specifications` sin `value` se ocultan automáticamente en la ficha de producto.
- Para agregar un producto nuevo: copiá un objeto existente, cambiale `id` y `slug` (únicos),
  completá los datos y agregalo al array. Aparece automáticamente en el catálogo, en Home
  (si `featured: true`) y genera su propia página `/maquinas/[slug]` sin tocar ningún componente.
- `isDemo: true` marca los productos ficticios de ejemplo — quitalo (o eliminá el producto)
  cuando cargues inventario real.

### Categorías
Archivo: **`lib/products.ts`** → array `categories`. Cada categoría necesita `slug, name, group
("nuevas"|"usadas"), description, image`. El conteo de máquinas por categoría se calcula solo.

### Colores / paleta / identidad visual
Archivo: **`app/globals.css`**, bloque `:root` (arriba del todo):
```css
--color-carbon: #15161a;   /* negro/carbón principal */
--color-rust:   #b8501f;   /* color de acento (óxido industrial) */
```
Cambiá cualquiera de esas variables y se propaga a todo el sitio (botones, tags, hovers).

### Tipografías
`app/layout.tsx` — imports de `next/font/google` (`Oswald`, `Inter`, `JetBrains_Mono`).
Cambiá el nombre de la fuente ahí y en `app/globals.css` (`--font-display`, `--font-body`, `--font-mono`).

### Datos de contacto (teléfono, email, dirección, horarios, mapa, redes)
Archivo: **`lib/site-config.ts`** → objeto `siteConfig`. Un solo lugar para todo el sitio
(header, footer, página de contacto, WhatsApp).

### WhatsApp
Archivo: **`lib/site-config.ts`**:
```ts
phoneWhatsApp: "5491155551234", // reemplazar por el número real, formato internacional sin '+' ni espacios
```
Los mensajes predeterminados también se arman ahí (`DEFAULT_WHATSAPP_MESSAGE` y
`productWhatsAppMessage(nombre)` que arma automáticamente el mensaje con el nombre de la máquina
consultada). El botón flotante (`components/WhatsAppFloat.tsx`) y todos los botones "Consultar"
usan estas mismas funciones — no hay que tocarlos.

### Formularios de contacto
`components/ContactForm.tsx` y `components/ProductInquiryForm.tsx` están **maquetados y
funcionales en el cliente pero sin backend conectado** (simulan el envío). Para conectarlos a
un envío real, reemplazá el `setTimeout` en `handleSubmit` por un `fetch` a tu API, un servicio
de email (Resend, EmailJS) o un webhook a tu CRM.

### Imágenes reales
1. Colocá los archivos en `public/images/products/` (o una subcarpeta que prefieras).
2. Referencialos en `lib/products.ts` dentro de `images: ["/images/products/tu-archivo.jpg"]`.
3. `next/image` se encarga de lazy loading, tamaños responsive y optimización automáticamente.

Hoy el catálogo ya incluye **dos productos con fotografías reales** provistas (bombas
centrífugas y válvulas industriales usadas) como ejemplo de carga real, y ocho productos
demo con imágenes placeholder reutilizadas — reemplazalas por fotos propias cuando estén
disponibles.

## 5. Funcionalidades implementadas

- Catálogo con **búsqueda de texto libre** + filtros por **estado, categoría, marca y rango de
  precio** (`components/CatalogClient.tsx`), con loading skeletons y estado vacío.
- Fichas de producto con galería, especificaciones dinámicas (se ocultan los campos vacíos),
  productos relacionados, formulario de consulta y JSON-LD (`schema.org/Product`) para SEO.
- Botón flotante de WhatsApp global + CTAs contextuales que arman el mensaje con el nombre
  del producto.
- Header sticky responsive con menú hamburguesa en mobile.
- Animaciones de aparición al hacer scroll (`components/Reveal.tsx`, respeta
  `prefers-reduced-motion`), botón "volver arriba", transiciones de 200–300ms.
- SEO técnico: metadata por página, Open Graph, `sitemap.xml` dinámico (incluye cada producto),
  `robots.txt`, URLs amigables, headings estructurados, alt text en imágenes.
- Arquitectura preparada para un futuro panel de administración: como los productos viven en
  un array tipado (`Product[]`) con un modelo de datos claro, `lib/products.ts` puede
  reemplazarse por llamadas a una API/CMS sin tocar ningún componente de UI.

## 7. Inventario real (actualización desde Excel + fotos)

El catálogo fue regenerado a partir de `Base_de_datos_final.xlsx` (62 artículos) y
`imagenes.zip` (94 fotos numeradas). Se crearon **10 categorías nuevas** a partir de la
columna "Familia de Producto" del Excel, reemplazando las categorías genéricas de la versión
anterior:

`Bombas` · `Transportes` · `Tanques` · `Piping` · `Ventiladores` · `Intercambiadores de Calor` ·
`Motorreductores` · `Motores` · `Grúas` · `Otros Equipos`

Cada fila del Excel generó un producto en `lib/products.ts`, con:
- **Nombre**: derivado de Familia + Subfamilia (ej. "Bomba Centrífuga — Art. 09").
- **Descripción**: columna "Características técnicas" cuando existía; si no, un texto
  generado a partir de Familia/Subfamilia.
- **Especificaciones**: Material constructivo, Dimensiones, Marca/Origen, Familia, Subfamilia
  (los campos vacíos en el Excel se omiten automáticamente).
- **Imágenes**: vinculadas según los números listados en la columna "foto", copiadas a
  `public/images/inventario/` con el nombre `art-{artículo}-{número de foto original}.ext`.
- El teléfono del dueño del equipo y la columna interna "Para MATIAS" **no se publican** en el
  sitio (son datos internos/privados).

### ⚠️ Importante: verificar la correspondencia foto ↔ artículo

Al cruzar manualmente algunas filas del Excel contra las fotos del ZIP, encontramos que **la
numeración de la columna "foto" no siempre coincide con el contenido real de esa foto** —
algunos casos coinciden perfectamente (ej. artículo 1), pero otros no (ej. el artículo 61,
"Generador Eólico Vertical", quedó vinculado a la foto 91, que en realidad muestra un lote de
bombas). Esto es un problema de origen en el Excel/numeración de fotos, no algo que se pueda
corregir de forma automática con certeza.

**Publicamos igual con el matching automático**, tal como definiste. Para corregir una foto
incorrecta:

1. Abrí `lib/products.ts` y buscá el producto por su `slug` o `articleNumber`.
2. Mirá el array `images: [...]` de ese producto.
3. Los archivos están en `public/images/inventario/` nombrados `art-{artículo}-{foto}.ext` —
   revisá visualmente cuál es la foto correcta para ese artículo y actualizá la ruta.
4. Si la foto correcta no tiene ese número, buscala en `public/images/inventario/` (todas las
   94 fotos originales quedaron copiadas ahí, aunque solo algunas están referenciadas) o
   agregá una nueva imagen según el punto "Imágenes reales" más arriba.

Recomendamos revisar especialmente los artículos con múltiples fotos agrupadas (15, 20, 25,
36, 39, 40, 41, 42, 45, 47, 54, 60, 62) y los artículos 3, 16, 61 detectados con error confirmado.

## 8. Segunda ronda de cambios — fotos corregidas + ajustes de contenido

- **Fotos reemplazadas por completo**: se procesó `Fotos_Corregidas_def.7z` (85 archivos,
  nombrados `item{N}` por número de artículo) y se reemplazó el array `images` de los 62
  productos y los thumbnails de las 10 categorías. Las fotos quedaron en
  `public/images/inventario/` optimizadas (máx. 1600px, JPEG calidad 78).
- ⚠️ El archivo comprimido incluía un **"artículo 63"** (2 fotos) que no existe en
  `Base_de_datos_final.xlsx` — no se creó ningún producto para ese número. Si corresponde a un
  equipo real, pasame los datos (familia, descripción, especificaciones) y lo agrego.
- Textos actualizados: "Asesoramiento con profesionales con más de 30 años de experiencia"
  (antes "Asesoramiento técnico"), "Encontrá lo que necesitás" (antes "...la máquina que
  necesitás").
- El stat de unidades disponibles ahora es **dinámico** (`products.length`, hoy 62) en vez de
  un "+100" fijo — se actualiza solo a medida que agregues o quites productos de
  `lib/products.ts`.
- Eliminados de todo el sitio: dirección/ubicación (y el mapa embebido de Contacto), email,
  íconos de redes sociales (Instagram/Facebook/LinkedIn) y toda mención a "+35 años de
  experiencia". El único medio de contacto que queda es **teléfono / WhatsApp**
  (`siteConfig.phoneDisplay` y `phoneWhatsApp` en `lib/site-config.ts`).
- Los formularios de contacto (`ContactForm.tsx`, `ProductInquiryForm.tsx`) ya no piden email,
  solo nombre, empresa y teléfono.



<<<<<<< HEAD
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
│   ├── robots.ts               → /robots.txt
│   ├── not-found.tsx           → Página 404
│   ├── empresa/page.tsx        → Página institucional
│   ├── servicios/page.tsx      → Servicios
│   ├── contacto/page.tsx       → Contacto (teléfono + horarios + formulario)
│   └── maquinas/
│       ├── page.tsx            → Catálogo completo con filtros
│       ├── nuevas/page.tsx     → Catálogo filtrado a "nuevas"
│       ├── usadas/page.tsx     → Catálogo filtrado a "usadas"
│       └── [slug]/page.tsx     → Ficha de producto individual
├── components/                 → Componentes reutilizables
├── lib/
│   ├── products.ts             → Modelo de datos + inventario real (generado desde Excel)
│   └── site-config.ts          → Teléfono, WhatsApp, horarios
└── public/images/
    ├── products/                → Fotos usadas en Home/Empresa (hero, banners)
    └── inventario/               → Fotos de cada artículo del catálogo
```

## 3. Cómo ejecutar el proyecto

Requiere Node.js 18.18+ (recomendado 20+).

```bash
cd hierro-viejo
npm install
npm run dev
```

Abrí `http://localhost:3000`. Para producción: `npm run build && npm run start`.

> **Nota:** `next/font` descarga las tipografías de Google Fonts durante el build/dev. Necesitás
> una máquina con acceso normal a internet la primera vez.

## 4. Dónde modificar cada cosa

### Productos (agregar / editar / eliminar)
Archivo: **`lib/products.ts`**. Cada producto: `id, slug, name, condition, category, subcategory?,
brand, articleNumber, description, specifications[], images[], featured, availability, price`.
Los campos de `specifications` sin `value` se ocultan automáticamente. Para agregar un producto,
copiá un objeto existente, cambiá `id`/`slug` (únicos) y completá los datos.

### Categorías
Archivo: **`lib/products.ts`** → array `categories` (`slug, name, description, image`).

### Colores / identidad visual
Archivo: **`app/globals.css`**, bloque `:root`. `--color-carbon` (negro principal),
`--color-rust` (acento óxido).

### Teléfono / WhatsApp — único medio de contacto del sitio
Archivo: **`lib/site-config.ts`**:
```ts
phoneDisplay: "+54 9 11 2863-1543",
phoneWhatsApp: "5491128631543", // formato internacional, sin '+' ni espacios
```
Se usa en header, footer, contacto, botón flotante y todos los botones "Consultar". Un solo
lugar para cambiarlo en todo el sitio.

### Imágenes reales
Colocá los archivos en `public/images/inventario/` (o una subcarpeta) y referencialos en
`lib/products.ts` dentro de `images: [...]`. **La primera imagen del array es la que se muestra
como portada** en las cards de catálogo y como foto principal en la ficha de producto — poné ahí
la foto que muestra el equipo completo, no un detalle.

## 5. Inventario real (desde Excel + fotos)

El catálogo se generó a partir de `Base_de_datos_final.xlsx` (62 artículos), con **10 categorías**
creadas desde la columna "Familia de Producto": Bombas, Transportes, Tanques, Piping,
Ventiladores, Intercambiadores de Calor, Motorreductores, Motores, Grúas y Otros Equipos.

El teléfono del dueño del equipo y las notas internas del Excel ("Para MATIAS") **no se
publican** en el sitio.

### Fotos corregidas
Se reemplazaron todas las fotos por el lote corregido (`Fotos_Corregidas_def.7z`), nombradas por
número de artículo. Para los artículos con varias fotos, se revisó cada grupo manualmente y se
ordenó para que **la primera foto muestre el equipo completo**, dejando los detalles (números de
serie, medidas con cinta métrica, primeros planos) como fotos secundarias. Se revisaron y
reordenaron especialmente los artículos: 15, 20, 25, 36, 39, 40, 41, 42, 45, 47, 54, 60, 62.

## 6. Contenido del sitio — decisiones tomadas

- El único medio de contacto visible en todo el sitio es **teléfono / WhatsApp**. No hay email,
  dirección, mapa ni redes sociales en ninguna página.
- Los formularios (`ContactForm.tsx`, `ProductInquiryForm.tsx`) piden nombre, empresa, teléfono
  y consulta — sin campo de email.
- El stat de "unidades disponibles" es **dinámico** (`products.length`), no un número fijo — se
  actualiza solo si agregás o quitás productos de `lib/products.ts`.
- No hay ninguna mención a años de experiencia como cifra fija en el sitio (se usa la frase
  "profesionales con más de 30 años de experiencia" en el hero de la Home y en Empresa).

## 7. Destacar un producto primero en su categoría / estado personalizado

`lib/products.ts` soporta dos campos opcionales por producto:

- `pinned: true` — el producto aparece primero en cualquier listado del catálogo donde sea
  visible (todo el catálogo, su categoría, o su estado nueva/usada), sin importar el orden del
  array. Hoy lo usa el artículo 62.
- `statusLabel: "Restaurada"` — reemplaza la etiqueta "Nueva"/"Usada" en la card y en la ficha
  de producto por un texto personalizado. Útil para casos como equipos restaurados,
  reacondicionados, etc.

La primera imagen del array `images` de cada producto es siempre la que se usa como portada.

## 8. Funcionalidades implementadas

- Catálogo con **búsqueda de texto libre** + filtros por **estado, categoría, marca y rango de
  precio**, con loading skeletons y estado vacío.
- Fichas de producto con galería, especificaciones dinámicas, productos relacionados, formulario
  de consulta y JSON-LD (`schema.org/Product`) para SEO.
- Botón flotante de WhatsApp global + CTAs contextuales con el nombre del producto.
- Header sticky responsive con menú hamburguesa en mobile.
- Animaciones de aparición al hacer scroll (respeta `prefers-reduced-motion`), botón "volver
  arriba", transiciones de 200–300ms.
- SEO técnico: metadata por página, Open Graph, `sitemap.xml` dinámico, `robots.txt`, URLs
  amigables, alt text en imágenes.
=======
>>>>>>> df56bd58079370b8fcfbc57a4499d687afc32973

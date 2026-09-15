# Cambios aplicados — HIERROVIEJO

## 1. Artículo 62 marcado como VENDIDA

`lib/products.ts`:

- `statusLabel: "Restaurada"` → `statusLabel: "VENDIDA"` (es la etiqueta que se ve sobre la foto
  en la card del catálogo y en la ficha de producto).
- `availability: "Disponible"` → `availability: "Vendida"`.
- Se amplió el tipo `Product["availability"]` para aceptar `"Vendida"`.

`app/maquinas/[slug]/page.tsx`: el JSON-LD ahora publica `schema.org/SoldOut` cuando
`availability === "Vendida"` (antes cualquier valor distinto de "Disponible" caía en
`LimitedAvailability`).

El artículo sigue con `pinned: true`, así que aparece primero en el catálogo. Si preferís que un
equipo vendido no encabece el listado, borrá esa línea.

## 2. Formularios

- **Eliminada** la sección "Formulario de contacto" de `/contacto` y borrado el componente
  `components/ContactForm.tsx`. La página quedó con las tarjetas "Datos de contacto" y "Horarios"
  en dos columnas, y se ajustó el texto introductorio (ya no invita a usar el formulario).
- **Eliminados** los campos **Nombre**, **Empresa** y **Teléfono** de
  `components/ProductInquiryForm.tsx`.

Nota sobre este segundo punto: al sacar esos tres campos, el formulario quedaba sin ningún dato
para responderle a quien consulta, y su botón "Enviar" nunca envió nada realmente (era un
`setTimeout` simulado). Lo dejé como un cuadro de texto editable con el mensaje precargado y un
botón que abre WhatsApp con ese texto — consistente con el resto del sitio, donde WhatsApp es el
único canal. Si preferías que desapareciera la sección entera de la ficha de producto, avisame y
lo saco.

## 3. Artículos nuevos (10)

Se agregaron a `lib/products.ts` los artículos del Excel que faltaban **y tienen foto**:

| Art. | Nombre | Categoría | Fotos |
|---|---|---|---|
| 63 | Quemador Industrial SAACKE | Otros Equipos | 2 |
| 66 | Reactor 50 Litros | Otros Equipos | 2 |
| 67 | Mezclador de Polvos Helicoidal | Otros Equipos | 1 |
| 71 | Lijadora de Madera | Otros Equipos | 2 |
| 72 | Reactor 50 Litros | Otros Equipos | 1 |
| 73 | Tolva 300 kg | Otros Equipos | 2 |
| 74 | Macerador 1500 Litros | Tanques | 1 |
| 75 | Fermentadores 700 Litros | Tanques | 1 |
| 76 | Calentador 700 Litros | Intercambiadores de Calor | 1 |
| 77 | Filtro de Vacío Dorr-Oliver | Otros Equipos | 4 |

Total del catálogo: **62 → 72 productos**.

`id` y `articleNumber` coinciden con el número de artículo del Excel, así que la numeración salta
(62, 63, 66, 67, 71…). Es intencional: si mañana aparecen las fotos de los que faltan, entran con
su número real sin renumerar nada.

### No publicados (sin foto asignada)

| Art. | Motivo según el Excel |
|---|---|
| 64, 65 | "Falta. no subir aun" — Hugo Bertschi tiene que mandar las fotos |
| 68, 69, 70 | Mezcladores de polvos helicoidales, sin foto en el lote |

El 78 es una fila vacía del Excel.

### Datos que NO se publicaron

Igual que en la carga anterior, quedaron fuera del sitio los teléfonos y contactos del dueño del
equipo que trae el Excel (Sebastián Malano, Ricardo, Luciano, Hugo Bertschi) y la columna
"Para MATIAS".

## 4. Fotos

Se copiaron a `public/images/inventario/` con el formato del repo (`art-NN-N.jpg`), con el equipo
completo siempre en primera posición (es la que se usa de portada):

| Archivo original | Destino | Orden |
|---|---|---|
| `art 63-1.jpeg` | `art-63-1.jpg` | quemador completo (portada) |
| `art 63.jpeg` | `art-63-2.jpg` | chapa de identificación SAACKE |
| `art 66.jpg` | `art-66-1.jpg` | reactor completo |
| `art 66(1).jpg` | `art-66-2.jpg` | reactor en planta |
| `art 67.jpg` | `art-67-1.jpg` | — |
| `art 71.jpg` | `art-71-1.jpg` | lijadora completa (portada) |
| `art 71(1).jpg` | `art-71-2.jpg` | interior / mecanismo |
| `art 72.jpg` | `art-72-1.jpg` | — |
| `art 73.jpg` | `art-73-1.jpg` | tolva completa (portada) |
| `art 73(1).jpg` | `art-73-2.jpg` | vista apoyada |
| `art 74.jpg` | `art-74-1.jpg` | — |
| `art 75.jpg` | `art-75-1.jpg` | — |
| `art 76.jpg` | `art-76-1.jpg` | — |
| `art 77.jpeg` | `art-77-1.jpg` | filtro completo (portada) |
| `art77-2.jpeg` | `art-77-2.jpg` | vista frontal |
| `art77-3.jpeg` | `art-77-3.jpg` | vista lateral |
| `art 77-1.jpeg` | `art-77-4.jpg` | chapa Oliver Drum Filter |
| `art 19.jpg` | `art-19-2.jpg` | válvulas en rack |
| `art 19(1).jpg` | `art-19-3.jpg` | válvulas sobre mesa |

`art-63-1.jpg` y `art-63-2.jpg` ya existían en el repo pero **ningún producto las referenciaba**
(estaban huérfanas, las dos eran la misma toma del quemador). Se reemplazaron por el par nuevo.

Las dos fotos del artículo 19 se agregaron después de la portada existente, sin tocar la portada.

## 5. README.md

Actualizado: cantidad de artículos, sección nueva sobre el alta 63–77 y los no publicados, el
nuevo valor `"Vendida"` de `availability`, y la decisión sobre los formularios.

---

## Para subirlo

```bash
cd /ruta/a/tu/clon/HIERROVIEJO
# copiá el contenido del zip encima del repo
git add -A
git status          # revisá: 1 archivo borrado, 5 modificados, 17 imágenes nuevas
git commit -m "Art. 62 vendido, alta de artículos 63-77 y eliminación de formularios"
git push
```

`git add -A` es importante para que registre el borrado de `components/ContactForm.tsx`.

## Verificación

`lib/products.ts` se ejecutó con Node para validar sintaxis y datos: 72 productos, `id` y `slug`
únicos, y **cero referencias a imágenes inexistentes**. No pude correr `npm run build` porque el
contenedor no tiene salida a internet ni `node_modules`, así que conviene un `npm run build` local
antes del push.

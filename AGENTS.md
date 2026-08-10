<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Hierro Viejo — Guía del proyecto

Sitio corporativo + catálogo de maquinaria industrial (Next.js 16 App Router,
TypeScript, Tailwind CSS v4). Todo el contenido de la UI está en español.

## Comandos

```bash
npm run dev        # desarrollo (http://localhost:3000)
npm run build      # build de producción (obligatorio verificar antes de pushear)
npm run lint       # eslint
npx tsc --noEmit   # typecheck
```

## Estructura clave

- `lib/products.ts` — productos + categorías (modelo `Product`, `isDemo` marca los ficticios)
- `lib/site-config.ts` — contacto, WhatsApp, dirección, redes, dominio (FUENTE ÚNICA)
- `app/` — rutas: `/`, `/empresa`, `/servicios`, `/contacto`, `/maquinas[/nuevas|/usadas|/[slug]]`
- `components/` — Header, Footer, CatalogClient, ProductCard, formularios, etc.
- `app/globals.css` — tokens de diseño vía `@theme` (sin `tailwind.config.ts`)

## Reglas de oro

- **No inventar datos reales de la empresa.** La dirección y el mapa son
  deliberadamente FICTICIOS (seguridad); los teléfonos, email, dominio y redes
  siguen siendo placeholders marcados con `// TODO` en `lib/site-config.ts`.
  Nunca reemplazarlos por valores reales salvo pedido explícito del dueño.
- No agregar comentarios al código salvo que se pidan.
- Verificar SIEMPRE con `npx tsc --noEmit` y `npm run build` antes de terminar.

## Deploy

- Repo: https://github.com/MRSKYGUY06/HIERROVIEJO (privado según preferencia)
- Deploy automático en Vercel desde `main` (dominio temporal `*.vercel.app`).
- El dominio definitivo se conecta por DNS desde NIC Argentina (ver página de
  contacto/README para pasos).
- Flujo: editar → typecheck → build → commit → `git push origin main` → Vercel
  despliega solo.
- El sitio es 100% estático (SSG): no hay backend ni variables de entorno.

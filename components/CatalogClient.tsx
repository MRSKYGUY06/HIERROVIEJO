"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { brands, categories, products, type Condition } from "@/lib/products";

type Props = {
  /** Bloquea el filtro de estado a un valor fijo (usado por /maquinas/nuevas y /maquinas/usadas) */
  lockedCondition?: Condition;
};

// TODO: el filtro de precio está oculto porque hoy todas las máquinas cotizan
// a consulta (price: null). Cuando existan precios reales, reactivar el filtro
// (ver git history de este archivo para recuperar PRICE_RANGES y la UI).

export default function CatalogClient({ lockedCondition }: Props) {
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [estado, setEstado] = useState<string>(lockedCondition ?? searchParams.get("estado") ?? "todas");
  const [categoria, setCategoria] = useState<string>(searchParams.get("categoria") ?? "todas");
  const [marca, setMarca] = useState<string>(searchParams.get("marca") ?? "todas");
  const [loading, setLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Loading skeleton on first mount + whenever filters change (simulates async fetch).
  // Marking loading=true happens as part of each setter call (see setters below via
  // handleFilterChange) so the effect below only ever turns it back off.
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(t);
  }, [query, estado, categoria, marca]);

  function withLoading<T>(setter: (v: T) => void) {
    return (v: T) => {
      setLoading(true);
      setter(v);
    };
  }

  const handleQuery = withLoading(setQuery);
  const handleEstado = withLoading(setEstado);
  const handleCategoria = withLoading(setCategoria);
  const handleMarca = withLoading(setMarca);

  const availableCategories = useMemo(() => {
    if (!lockedCondition) return categories;
    return categories.filter((c) => c.group === (lockedCondition === "nueva" ? "nuevas" : "usadas"));
  }, [lockedCondition]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (estado !== "todas" && p.condition !== estado) return false;
      if (categoria !== "todas" && p.category !== categoria) return false;
      if (marca !== "todas" && p.brand !== marca) return false;
      if (query.trim()) {
        const q = query.trim().toLowerCase();
        const haystack = `${p.name} ${p.brand} ${p.model} ${p.category} ${p.description}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [estado, categoria, marca, query]);

  function clearFilters() {
    setQuery("");
    setEstado(lockedCondition ?? "todas");
    setCategoria("todas");
    setMarca("todas");
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      {/* Sidebar filters — desktop */}
      <aside className="hidden lg:block">
        <div className="sticky top-24 space-y-6 rounded-md border border-graphite/10 bg-white p-5">
          <FilterBody
            lockedCondition={lockedCondition}
            estado={estado}
            setEstado={handleEstado}
            categoria={categoria}
            setCategoria={handleCategoria}
            marca={marca}
            setMarca={handleMarca}
            categories={availableCategories}
            onClear={clearFilters}
          />
        </div>
      </aside>

      <div>
        {/* Search + mobile filter toggle */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <svg
              viewBox="0 0 24 24"
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-graphite-light"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => handleQuery(e.target.value)}
              placeholder="¿Qué máquina estás buscando? Ej: torno, fresadora, plegadora..."
              className="w-full rounded-sm border border-graphite/20 bg-white py-3 pl-11 pr-4 text-sm text-carbon placeholder:text-graphite-light focus:border-rust"
              aria-label="Buscar máquina"
            />
          </div>
          <button
            onClick={() => setFiltersOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-sm border border-graphite/20 bg-white px-5 py-3 font-display text-sm font-semibold uppercase tracking-wide text-carbon lg:hidden"
          >
            Filtros
          </button>
        </div>

        <p className="mb-4 font-mono-data text-xs uppercase tracking-wider text-graphite-light">
          {loading ? "Buscando…" : `${filtered.length} ${filtered.length === 1 ? "resultado" : "resultados"}`}
        </p>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-md border border-dashed border-graphite/30 bg-white px-6 py-16 text-center">
            <p className="font-display text-lg font-semibold uppercase text-carbon">
              No encontramos máquinas con esos filtros
            </p>
            <p className="mt-2 text-sm text-graphite-light">
              Probá con otra búsqueda o limpiá los filtros aplicados.
            </p>
            <button
              onClick={clearFilters}
              className="mt-5 inline-flex rounded-sm bg-rust px-5 py-2.5 font-display text-sm font-semibold uppercase tracking-wide text-white hover:bg-rust-dark"
            >
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>

      {/* Mobile filter drawer */}
      {filtersOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-carbon/60" onClick={() => setFiltersOpen(false)} />
          <div className="relative ml-auto flex h-full w-full max-w-sm flex-col overflow-y-auto bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold uppercase text-carbon">Filtros</h2>
              <button onClick={() => setFiltersOpen(false)} aria-label="Cerrar filtros" className="p-1 text-carbon">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <FilterBody
              lockedCondition={lockedCondition}
              estado={estado}
              setEstado={handleEstado}
              categoria={categoria}
              setCategoria={handleCategoria}
              marca={marca}
              setMarca={handleMarca}
              categories={availableCategories}
              onClear={clearFilters}
            />
            <button
              onClick={() => setFiltersOpen(false)}
              className="mt-6 rounded-sm bg-rust py-3 font-display text-sm font-semibold uppercase tracking-wide text-white"
            >
              Ver {filtered.length} resultados
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterBody({
  lockedCondition,
  estado,
  setEstado,
  categoria,
  setCategoria,
  marca,
  setMarca,
  categories: cats,
  onClear,
}: {
  lockedCondition?: Condition;
  estado: string;
  setEstado: (v: string) => void;
  categoria: string;
  setCategoria: (v: string) => void;
  marca: string;
  setMarca: (v: string) => void;
  categories: typeof categories;
  onClear: () => void;
}) {
  return (
    <div className="space-y-6">
      {!lockedCondition && (
        <div>
          <h3 className="mb-3 font-display text-xs font-semibold uppercase tracking-widest text-graphite-light">
            Estado
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Todas", value: "todas" },
              { label: "Nuevas", value: "nueva" },
              { label: "Usadas", value: "usada" },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => setEstado(opt.value)}
                className={`rounded-sm border px-3 py-1.5 font-mono-data text-xs uppercase tracking-wide transition-colors ${
                  estado === opt.value
                    ? "border-rust bg-rust text-white"
                    : "border-graphite/20 text-graphite hover:border-rust hover:text-rust"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="mb-3 font-display text-xs font-semibold uppercase tracking-widest text-graphite-light">
          Categoría
        </h3>
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="w-full rounded-sm border border-graphite/20 bg-white px-3 py-2.5 text-sm text-carbon"
        >
          <option value="todas">Todas las categorías</option>
          {cats.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h3 className="mb-3 font-display text-xs font-semibold uppercase tracking-widest text-graphite-light">
          Marca
        </h3>
        <select
          value={marca}
          onChange={(e) => setMarca(e.target.value)}
          className="w-full rounded-sm border border-graphite/20 bg-white px-3 py-2.5 text-sm text-carbon"
        >
          <option value="todas">Todas las marcas</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={onClear}
        className="w-full rounded-sm border border-graphite/30 py-2.5 font-display text-xs font-semibold uppercase tracking-wide text-graphite hover:border-rust hover:text-rust"
      >
        Limpiar filtros
      </button>
    </div>
  );
}

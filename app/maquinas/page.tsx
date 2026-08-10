import type { Metadata } from "next";
import { Suspense } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import CatalogClient from "@/components/CatalogClient";

export const metadata: Metadata = {
  title: "Catálogo de Maquinaria",
  description:
    "Explorá nuestro catálogo completo de maquinaria industrial nueva y usada. Filtrá por estado, categoría, marca y precio.",
  alternates: { canonical: "/maquinas" },
};

export default function MaquinasPage() {
  return (
    <div className="bg-offwhite py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Máquinas" }]} />
        <h1 className="mt-4 font-display text-3xl font-bold uppercase tracking-tight text-carbon sm:text-4xl">
          Catálogo de maquinaria
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-graphite-light sm:text-base">
          Maquinaria nueva y usada para mecanizado, deformación de chapa y procesos industriales.
        </p>

        <div className="mt-10">
          <Suspense fallback={null}>
            <CatalogClient />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

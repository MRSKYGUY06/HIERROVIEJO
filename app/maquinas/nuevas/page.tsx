import type { Metadata } from "next";
import { Suspense } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import CatalogClient from "@/components/CatalogClient";

export const metadata: Metadata = {
  title: "Máquinas Nuevas",
  description: "Maquinaria industrial nueva: tornos, fresadoras, agujereadoras, sierras y más.",
  alternates: { canonical: "/maquinas/nuevas" },
};

export default function MaquinasNuevasPage() {
  return (
    <div className="bg-offwhite py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Breadcrumbs
          items={[{ label: "Inicio", href: "/" }, { label: "Máquinas", href: "/maquinas" }, { label: "Nuevas" }]}
        />
        <h1 className="mt-4 font-display text-3xl font-bold uppercase tracking-tight text-carbon sm:text-4xl">
          Máquinas nuevas
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-graphite-light sm:text-base">
          Equipos nuevos para mecanizado y procesos industriales, listos para producción.
        </p>

        <div className="mt-10">
          <Suspense fallback={null}>
            <CatalogClient lockedCondition="nueva" />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

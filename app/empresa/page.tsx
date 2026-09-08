import type { Metadata } from "next";
import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumbs";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Empresa",
  description:
    "Conocé Hierro Viejo: compra y venta de maquinaria industrial nueva y usada, con asesoramiento de profesionales con más de 30 años de experiencia.",
  alternates: { canonical: "/empresa" },
};

const VALUES = [
  { title: "Solidez", text: "Una trayectoria construida operación tras operación." },
  { title: "Experiencia", text: "Más de 30 años trabajando junto a la industria." },
  { title: "Profesionalismo", text: "Procesos claros de compra, venta y consignación." },
  { title: "Confianza", text: "Relaciones de largo plazo con talleres y plantas." },
  { title: "Calidad", text: "Maquinaria revisada y verificada antes de ofrecerla." },
  { title: "Atención personalizada", text: "Asesoramos según el proceso productivo real." },
];

export default function EmpresaPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
        <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Empresa" }]} />
        <h1 className="mt-4 font-display text-3xl font-bold uppercase tracking-tight text-carbon sm:text-4xl">
          Experiencia que impulsa a la industria
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-graphite">
          Somos una empresa especializada en la compra y venta de maquinaria industrial nueva y usada.
          Trabajamos junto a empresas, talleres y profesionales ofreciendo soluciones adaptadas a cada
          necesidad productiva.
        </p>
      </div>

      <Reveal>
        <div className="relative aspect-[16/7] w-full overflow-hidden">
          <Image
            src="/images/products/bomba-centrifuga-03.jpg"
            alt="Planta y maquinaria de Hierro Viejo"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </Reveal>

      <div className="bg-carbon py-16 text-white sm:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-5 sm:px-8">
          <Stat value={String(products.length)} label="Unidades disponibles" />
          <Stat value="Personalizada" label="Atención al cliente" small />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <Reveal>
          <SectionHeading eyebrow="Nuestros valores" title="Lo que nos define" />
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 50}>
              <div className="h-full rounded-md border border-graphite/10 p-6">
                <h3 className="font-display text-lg font-semibold uppercase tracking-tight text-carbon">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-graphite-light">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

function Stat({ value, label, small = false }: { value: string; label: string; small?: boolean }) {
  return (
    <div className="text-center sm:text-left">
      <p className={`font-display font-bold text-rust-light ${small ? "text-lg uppercase sm:text-xl" : "text-3xl sm:text-4xl"}`}>
        {value}
      </p>
      <p className="mt-1 font-mono-data text-xs uppercase tracking-wide text-steel-light">{label}</p>
    </div>
  );
}

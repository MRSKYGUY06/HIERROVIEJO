import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import { categories, products } from "@/lib/products";
import { buildWhatsAppLink, DEFAULT_WHATSAPP_MESSAGE, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Maquinaria Industrial Nueva y Usada",
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

const featured = products.filter((p) => p.featured).slice(0, 8);

const SERVICES = [
  {
    title: "Venta de maquinaria",
    text: "Maquinaria nueva y usada para diferentes procesos industriales.",
  },
  {
    title: "Compra de maquinaria",
    text: "Recibimos consultas de empresas y particulares interesados en vender sus equipos.",
  },
  {
    title: "Permutas",
    text: "Evaluamos alternativas de permuta de maquinaria.",
  },
  {
    title: "Consignaciones",
    text: "Servicio de consignación para maquinaria industrial.",
  },
  {
    title: "Tasaciones",
    text: "Evaluación profesional de maquinaria.",
  },
  {
    title: "Asesoramiento",
    text: "Ayudamos al cliente a encontrar la máquina adecuada para sus necesidades.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-[92vh] items-end overflow-hidden bg-carbon">
        <Image
          src="/images/products/bomba-centrifuga-01.jpg"
          alt="Maquinaria industrial en planta"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/70 to-carbon/30" />
        <div className="absolute inset-0 plate-texture opacity-40" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 pt-40 sm:px-8 lg:pb-24">
          <p className="font-mono-data text-xs font-medium uppercase tracking-[0.3em] text-rust-light">
            Maquinaria industrial y metalúrgica · Nueva y usada
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold uppercase leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Maquinaria industrial para la industria que produce
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-steel-light sm:text-lg">
            Venta de maquinaria nueva y usada para mecanizado, deformación de chapa y procesos
            industriales. Asesoramiento con profesionales con más de 30 años de experiencia.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/maquinas"
              className="inline-flex items-center gap-2 rounded-sm bg-rust px-7 py-3.5 font-display text-sm font-semibold uppercase tracking-wide text-white transition-colors duration-200 hover:bg-rust-light"
            >
              Ver maquinaria
            </Link>
            <a
              href={buildWhatsAppLink(DEFAULT_WHATSAPP_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm border border-white/40 px-7 py-3.5 font-display text-sm font-semibold uppercase tracking-wide text-white transition-colors duration-200 hover:border-white hover:bg-white/10"
            >
              Consultar ahora
            </a>
          </div>

          <dl className="mt-14 grid max-w-xl grid-cols-1 gap-6 border-t border-white/15 pt-8 sm:grid-cols-2">
            {[
              { k: "Nueva y usada", v: "Maquinaria disponible" },
              { k: "Personalizada", v: "Atención al cliente" },
            ].map((item) => (
              <div key={item.v}>
                <dt className="font-display text-2xl font-bold text-white sm:text-3xl">{item.k}</dt>
                <dd className="mt-1 font-mono-data text-xs uppercase tracking-wide text-steel-light">
                  {item.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* CATEGORÍAS */}
      <section className="bg-offwhite py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <SectionHeading eyebrow="Catálogo" title="Encontrá lo que necesitás" />
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {categories.map((c, i) => (
              <Reveal key={c.slug} delay={i * 60}>
                <CategoryCard category={c} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DESTACADAS */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading eyebrow="Selección" title="Maquinaria destacada" />
              <Link
                href="/maquinas"
                className="font-display text-sm font-semibold uppercase tracking-wide text-rust hover:text-rust-dark"
              >
                Ver catálogo completo →
              </Link>
            </div>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {featured.map((p, i) => (
              <Reveal key={p.id} delay={i * 60}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* EMPRESA */}
      <section className="bg-carbon py-20 text-white sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-md">
              <Image
                src="/images/products/valvulas-industriales-02.jpg"
                alt="Equipos industriales en planta de Hierro Viejo"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <SectionHeading eyebrow="Quiénes somos" title="Experiencia que impulsa a la industria" light />
            <p className="mt-6 max-w-xl text-base leading-relaxed text-steel-light">
              Somos una empresa especializada en la compra y venta de maquinaria industrial nueva y
              usada. Trabajamos junto a empresas, talleres y profesionales ofreciendo soluciones
              adaptadas a cada necesidad productiva.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-6 border-t border-white/15 pt-8">
              <div>
                <p className="font-display text-3xl font-bold text-rust-light">{products.length}</p>
                <p className="mt-1 font-mono-data text-xs uppercase tracking-wide text-steel-light">
                  Unidades disponibles
                </p>
              </div>
              <div>
                <p className="font-display text-lg font-bold uppercase text-rust-light">Personalizada</p>
                <p className="mt-1 font-mono-data text-xs uppercase tracking-wide text-steel-light">
                  Atención al cliente
                </p>
              </div>
            </div>
            <Link
              href="/empresa"
              className="mt-10 inline-flex items-center gap-2 rounded-sm border border-white/40 px-6 py-3 font-display text-sm font-semibold uppercase tracking-wide text-white hover:border-white hover:bg-white/10"
            >
              Conocer la empresa
            </Link>
          </Reveal>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="bg-offwhite py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <SectionHeading eyebrow="Qué hacemos" title="Servicios para tu operación industrial" />
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 50}>
                <div className="h-full rounded-md border border-graphite/10 bg-white p-6 transition-colors duration-200 hover:border-rust/40">
                  <span className="font-mono-data text-xs uppercase tracking-widest text-rust">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-semibold uppercase tracking-tight text-carbon">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-graphite">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-rust py-16 sm:py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-5 text-center sm:px-8">
          <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl">
            ¿Necesitás asesoramiento para tu próxima compra?
          </h2>
          <p className="max-w-lg text-sm text-white/85 sm:text-base">
            Contanos qué proceso productivo necesitás resolver y te ayudamos a encontrar la máquina
            adecuada.
          </p>
          <a
            href={buildWhatsAppLink(DEFAULT_WHATSAPP_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-sm bg-carbon px-7 py-3.5 font-display text-sm font-semibold uppercase tracking-wide text-white hover:bg-carbon-soft"
          >
            Consultar por WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}

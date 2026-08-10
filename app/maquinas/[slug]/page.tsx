import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductGallery from "@/components/ProductGallery";
import ProductInquiryForm from "@/components/ProductInquiryForm";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { getCategoryBySlug, getProductBySlug, getRelatedProducts, products } from "@/lib/products";
import { buildWhatsAppLink, productWhatsAppMessage } from "@/lib/site-config";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  const title = `${product.name} — ${product.condition === "usada" ? "Usada" : "Nueva"}`;
  return {
    title,
    description: product.description,
    alternates: { canonical: `/maquinas/${product.slug}` },
    openGraph: {
      title,
      description: product.description,
      images: [{ url: product.images[0] }],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const category = getCategoryBySlug(product.category);
  const related = getRelatedProducts(product);
  const visibleSpecs = product.specifications.filter((s) => s.value);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: { "@type": "Brand", name: product.brand },
    image: product.images,
    offers: {
      "@type": "Offer",
      priceCurrency: "ARS",
      price: product.price ?? undefined,
      availability:
        product.availability === "Disponible"
          ? "https://schema.org/InStock"
          : "https://schema.org/LimitedAvailability",
    },
  };

  return (
    <div className="bg-offwhite py-10 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Breadcrumbs
          items={[
            { label: "Inicio", href: "/" },
            { label: "Máquinas", href: "/maquinas" },
            ...(category ? [{ label: category.name, href: `/maquinas?categoria=${category.slug}` }] : []),
            { label: product.name },
          ]}
        />

        <div className="mt-6 grid gap-10 lg:grid-cols-2">
          <Reveal>
            <ProductGallery images={product.images} name={product.name} />
          </Reveal>

          <Reveal delay={80}>
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`rust-tag rounded-sm px-3 py-1 font-mono-data text-xs font-semibold uppercase tracking-wider text-white ${
                  product.condition === "usada" ? "bg-graphite" : "bg-rust"
                }`}
              >
                {product.condition === "usada" ? "Usada" : "Nueva"}
              </span>
              <span className="rounded-sm border border-graphite/20 px-3 py-1 font-mono-data text-xs uppercase tracking-wider text-graphite">
                {category?.name ?? product.category}
              </span>
              <span className="rounded-sm border border-graphite/20 px-3 py-1 font-mono-data text-xs uppercase tracking-wider text-graphite">
                {product.availability}
              </span>
            </div>

            <h1 className="mt-4 font-display text-3xl font-bold uppercase leading-tight tracking-tight text-carbon sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-1 font-mono-data text-sm uppercase tracking-wide text-graphite-light">
              {product.brand} · Modelo {product.model}
            </p>

            <p className="mt-5 text-base leading-relaxed text-graphite">{product.description}</p>

            <p className="mt-6 font-display text-2xl font-semibold text-carbon">
              {product.price ? `$${product.price.toLocaleString("es-AR")}` : "Consultar precio"}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={buildWhatsAppLink(productWhatsAppMessage(product.name))}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-sm bg-rust px-6 py-3.5 font-display text-sm font-semibold uppercase tracking-wide text-white hover:bg-rust-dark"
              >
                Consultar por WhatsApp
              </a>
              <a
                href="#consulta"
                className="inline-flex items-center gap-2 rounded-sm border border-carbon px-6 py-3.5 font-display text-sm font-semibold uppercase tracking-wide text-carbon hover:border-rust hover:text-rust"
              >
                Consultar disponibilidad
              </a>
            </div>

            {visibleSpecs.length > 0 && (
              <div className="mt-10">
                <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-graphite-light">
                  Especificaciones técnicas
                </h2>
                <dl className="mt-3 divide-y divide-graphite/10 rounded-md border border-graphite/10 bg-white">
                  {visibleSpecs.map((spec) => (
                    <div key={spec.label} className="flex justify-between gap-4 px-4 py-3 text-sm">
                      <dt className="text-graphite-light">{spec.label}</dt>
                      <dd className="font-mono-data font-medium text-carbon">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {product.isDemo && (
              <p className="mt-4 font-mono-data text-xs text-graphite-light">
                * Ficha de demostración con datos ficticios.
              </p>
            )}
          </Reveal>
        </div>

        {/* CONSULTA */}
        <Reveal>
          <div id="consulta" className="mt-16 scroll-mt-24 rounded-md border border-graphite/10 bg-white p-6 sm:p-10">
            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-carbon">
                  ¿Te interesa esta máquina?
                </h2>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-graphite-light">
                  Contactanos y te brindamos información sobre disponibilidad, precio y condiciones.
                </p>
                <div className="relative mt-6 hidden aspect-video overflow-hidden rounded-md sm:block">
                  <Image src={product.images[0]} alt="" fill sizes="50vw" className="object-cover" />
                </div>
              </div>
              <ProductInquiryForm productName={product.name} />
            </div>
          </div>
        </Reveal>

        {/* RELACIONADOS */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-carbon">
              Máquinas relacionadas
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        <div className="mt-12">
          <Link href="/maquinas" className="font-display text-sm font-semibold uppercase tracking-wide text-rust hover:text-rust-dark">
            ← Volver al catálogo
          </Link>
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { buildWhatsAppLink, productWhatsAppMessage } from "@/lib/site-config";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-md border border-graphite/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-carbon/10">
      <Link href={`/maquinas/${product.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-steel-light">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span
          className={`absolute left-0 top-4 rust-tag px-3 py-1 font-mono-data text-xs font-semibold uppercase tracking-wider text-white ${
            product.condition === "usada" ? "bg-graphite" : "bg-rust"
          }`}
        >
          {product.condition === "usada" ? "Usada" : "Nueva"}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <span className="font-mono-data text-xs uppercase tracking-wider text-graphite-light">
          {product.brand} · {product.model}
        </span>
        <h3 className="mt-1 font-display text-lg font-semibold uppercase leading-snug tracking-tight text-carbon">
          <Link href={`/maquinas/${product.slug}`} className="hover:text-rust">
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-graphite">
          {product.description}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-graphite/10 pt-4">
          <span className="font-mono-data text-sm font-medium text-carbon">
            {product.price ? `$${product.price.toLocaleString("es-AR")}` : "Consultar precio"}
          </span>
          <div className="flex gap-2">
            <Link
              href={`/maquinas/${product.slug}`}
              className="rounded-sm border border-carbon px-3 py-1.5 font-display text-xs font-semibold uppercase tracking-wide text-carbon transition-colors hover:border-rust hover:text-rust"
            >
              Ver detalle
            </Link>
            <a
              href={buildWhatsAppLink(productWhatsAppMessage(product.name))}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm bg-rust px-3 py-1.5 font-display text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-rust-dark"
            >
              Consultar
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

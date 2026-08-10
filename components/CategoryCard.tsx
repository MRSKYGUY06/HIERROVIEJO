import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/lib/products";
import { products } from "@/lib/products";

export default function CategoryCard({ category }: { category: Category }) {
  const count = products.filter((p) => p.category === category.slug).length;
  const href = `/maquinas?categoria=${category.slug}`;

  return (
    <Link
      href={href}
      className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-md border border-graphite/10 bg-carbon shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-carbon/20"
    >
      <Image
        src={category.image}
        alt={category.name}
        fill
        sizes="(max-width: 768px) 50vw, 25vw"
        className="object-cover opacity-70 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-55"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/40 to-transparent" />
      <div className="relative z-10 p-5">
        <span className="font-mono-data text-xs uppercase tracking-widest text-rust-light">
          {count} {count === 1 ? "máquina" : "máquinas"}
        </span>
        <h3 className="mt-1 font-display text-xl font-semibold uppercase leading-tight tracking-tight text-white">
          {category.name}
        </h3>
        <p className="mt-1 text-sm text-steel-light line-clamp-2">{category.description}</p>
        <span className="mt-3 inline-flex items-center gap-1 font-display text-xs font-semibold uppercase tracking-wide text-rust-light">
          Ver máquinas
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

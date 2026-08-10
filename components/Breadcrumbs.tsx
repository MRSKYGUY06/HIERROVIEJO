import Link from "next/link";

export default function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="font-mono-data text-xs uppercase tracking-wide text-graphite-light">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            {item.href ? (
              <Link href={item.href} className="hover:text-rust">
                {item.label}
              </Link>
            ) : (
              <span className="text-carbon">{item.label}</span>
            )}
            {i < items.length - 1 && <span className="text-graphite-light">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

const LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/empresa", label: "Empresa" },
  { href: "/maquinas/nuevas", label: "Máquinas nuevas" },
  { href: "/maquinas/usadas", label: "Máquinas usadas" },
  { href: "/servicios", label: "Servicios" },
  { href: "/contacto", label: "Contacto" },
];

export default function Footer() {
  return (
    <footer className="border-t border-graphite/60 bg-carbon text-steel-light">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-rust font-display text-lg font-bold text-white">
              HV
            </span>
            <span className="font-display text-xl font-semibold uppercase tracking-wide text-white">
              Hierro Viejo
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-graphite-light">
            {siteConfig.description}
          </p>
          <div className="mt-6 flex gap-4">
            {[
              { href: siteConfig.social.instagram, label: "Instagram" },
              { href: siteConfig.social.facebook, label: "Facebook" },
              { href: siteConfig.social.linkedin, label: "LinkedIn" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm border border-graphite px-3 py-1.5 font-mono-data text-xs uppercase tracking-wide text-steel-light transition-colors hover:border-rust hover:text-rust-light"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-white">
            Navegación
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-rust-light">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-white">
            Contacto
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>{siteConfig.phoneDisplay}</li>
            <li className="break-words">{siteConfig.email}</li>
            <li className="text-graphite-light">{siteConfig.address}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-graphite/60 py-5">
        <p className="mx-auto max-w-7xl px-5 font-mono-data text-xs text-graphite-light sm:px-8">
          © {new Date().getFullYear()} {siteConfig.legalName}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { buildWhatsAppLink, DEFAULT_WHATSAPP_MESSAGE, siteConfig } from "@/lib/site-config";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/empresa", label: "Empresa" },
  { href: "/maquinas/nuevas", label: "Máquinas Nuevas" },
  { href: "/maquinas/usadas", label: "Máquinas Usadas" },
  { href: "/servicios", label: "Servicios" },
  { href: "/contacto", label: "Contacto" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b transition-colors duration-300 ${
        scrolled
          ? "border-graphite/10 bg-carbon/95 backdrop-blur supports-[backdrop-filter]:bg-carbon/90"
          : "border-transparent bg-carbon"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:h-20">
        <Link href="/" className="group flex items-center gap-3 shrink-0" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-sm bg-rust font-display text-lg font-bold text-white lg:h-11 lg:w-11 lg:text-xl">
            HV
          </span>
          <span className="font-display text-lg font-semibold uppercase tracking-wide text-white lg:text-xl">
            Hierro Viejo
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-display text-sm font-medium uppercase tracking-wider text-steel-light transition-colors duration-200 hover:text-rust-light"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a
            href={buildWhatsAppLink(DEFAULT_WHATSAPP_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-sm bg-rust px-5 py-2.5 font-display text-sm font-semibold uppercase tracking-wide text-white transition-colors duration-200 hover:bg-rust-light"
          >
            Consultar por WhatsApp
          </a>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center text-white lg:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed inset-x-0 top-16 z-30 origin-top border-t border-graphite/40 bg-carbon transition-all duration-300 lg:hidden ${
          open ? "max-h-[85vh] opacity-100" : "pointer-events-none max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <nav className="flex flex-col gap-1 px-5 py-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-sm px-2 py-3 font-display text-base font-medium uppercase tracking-wide text-steel-light transition-colors duration-200 hover:bg-carbon-soft hover:text-rust-light"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={buildWhatsAppLink(DEFAULT_WHATSAPP_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center justify-center gap-2 rounded-sm bg-rust px-5 py-3 font-display text-sm font-semibold uppercase tracking-wide text-white"
          >
            Consultar por WhatsApp
          </a>
          <p className="mt-4 px-2 font-mono-data text-xs text-graphite-light">{siteConfig.phoneDisplay}</p>
        </nav>
      </div>
    </header>
  );
}

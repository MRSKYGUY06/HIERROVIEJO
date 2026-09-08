import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";
import { buildWhatsAppLink, DEFAULT_WHATSAPP_MESSAGE, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contactá a Hierro Viejo por teléfono o WhatsApp.",
  alternates: { canonical: "/contacto" },
};

export default function ContactoPage() {
  return (
    <div className="bg-offwhite py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Contacto" }]} />
        <h1 className="mt-4 font-display text-3xl font-bold uppercase tracking-tight text-carbon sm:text-4xl">
          Contactanos
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-graphite">
          Escribinos por WhatsApp, llamanos o dejanos tu consulta por el formulario. Te
          respondemos a la brevedad.
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-8">
            <div className="rounded-md border border-graphite/10 bg-white p-6">
              <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-graphite-light">
                Datos de contacto
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-carbon">
                <li className="flex justify-between gap-4">
                  <span className="text-graphite-light">Teléfono</span>
                  <span className="font-mono-data">{siteConfig.phoneDisplay}</span>
                </li>
              </ul>
              <a
                href={buildWhatsAppLink(DEFAULT_WHATSAPP_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-rust py-3 font-display text-sm font-semibold uppercase tracking-wide text-white hover:bg-rust-dark"
              >
                Consultar por WhatsApp
              </a>
            </div>

            <div className="rounded-md border border-graphite/10 bg-white p-6">
              <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-graphite-light">
                Horarios
              </h2>
              <ul className="mt-4 space-y-2 text-sm">
                {siteConfig.hours.map((h) => (
                  <li key={h.day} className="flex justify-between">
                    <span className="text-graphite-light">{h.day}</span>
                    <span className="font-mono-data text-carbon">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-md border border-graphite/10 bg-white p-6 sm:p-8">
            <h2 className="font-display text-lg font-semibold uppercase tracking-tight text-carbon">
              Formulario de contacto
            </h2>
            <div className="mt-5">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

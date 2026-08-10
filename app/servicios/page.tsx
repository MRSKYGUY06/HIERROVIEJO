import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import Reveal from "@/components/Reveal";
import { buildWhatsAppLink } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Venta, compra, permutas, consignaciones, tasaciones y asesoramiento en maquinaria industrial.",
  alternates: { canonical: "/servicios" },
};

const SERVICES = [
  {
    title: "Venta de maquinaria",
    text: "Maquinaria nueva y usada para diferentes procesos industriales, con asesoramiento técnico en cada etapa de la compra.",
    message: "Hola, quisiera información sobre la venta de maquinaria industrial.",
  },
  {
    title: "Compra de maquinaria",
    text: "Recibimos consultas de empresas y particulares interesados en vender sus equipos. Evaluamos y tasamos sin cargo.",
    message: "Hola, tengo maquinaria para vender y quisiera una tasación.",
  },
  {
    title: "Permutas",
    text: "Evaluamos alternativas de permuta de maquinaria como parte de pago en la compra de nuevos equipos.",
    message: "Hola, quisiera consultar por una permuta de maquinaria.",
  },
  {
    title: "Consignaciones",
    text: "Servicio de consignación para maquinaria industrial: la exhibimos y gestionamos la venta por vos.",
    message: "Hola, quisiera consultar por el servicio de consignación de maquinaria.",
  },
  {
    title: "Tasaciones",
    text: "Evaluación profesional de maquinaria industrial para venta, seguro, sucesión o valuación patrimonial.",
    message: "Hola, quisiera solicitar una tasación de maquinaria.",
  },
  {
    title: "Asesoramiento",
    text: "Ayudamos al cliente a encontrar la máquina adecuada para sus necesidades productivas y presupuesto.",
    message: "Hola, quisiera asesoramiento para elegir una máquina.",
  },
];

export default function ServiciosPage() {
  return (
    <div className="bg-offwhite py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Servicios" }]} />
        <h1 className="mt-4 font-display text-3xl font-bold uppercase tracking-tight text-carbon sm:text-4xl">
          Servicios para tu operación industrial
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-graphite">
          Acompañamos a empresas, talleres y profesionales en todo el ciclo de vida de su maquinaria.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 50}>
              <div className="flex h-full flex-col rounded-md border border-graphite/10 bg-white p-6">
                <span className="font-mono-data text-xs uppercase tracking-widest text-rust">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-3 font-display text-lg font-semibold uppercase tracking-tight text-carbon">
                  {s.title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-graphite-light">{s.text}</p>
                <a
                  href={buildWhatsAppLink(s.message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1 font-display text-xs font-semibold uppercase tracking-wide text-rust hover:text-rust-dark"
                >
                  Consultar por WhatsApp →
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

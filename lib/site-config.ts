export const siteConfig = {
  name: "Hierro Viejo",
  legalName: "Hierro Viejo Maquinaria Industrial",
  tagline: "Maquinaria industrial para la industria que produce",
  description:
    "Venta de maquinaria industrial y metalúrgica nueva y usada: mecanizado, deformación de chapa, bombas y equipos de proceso.",
  url: "https://www.hierroviejo.com.ar",
  // Único medio de contacto del sitio. Reemplazar por el número real
  // (formato internacional, sin '+' ni espacios) antes de publicar.
  phoneDisplay: "+54 9 11 5555-1234",
  phoneWhatsApp: "5491155551234",
  hours: [
    { day: "Lunes a Viernes", time: "8:30 – 18:00" },
    { day: "Sábados", time: "9:00 – 13:00" },
  ],
} as const;

/** Construye un link de WhatsApp con mensaje precargado. */
export function buildWhatsAppLink(message?: string) {
  const base = `https://wa.me/${siteConfig.phoneWhatsApp}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export const DEFAULT_WHATSAPP_MESSAGE =
  "Hola, estoy interesado en una máquina de su catálogo y quisiera recibir más información.";

export function productWhatsAppMessage(productName: string) {
  return `Hola, estoy interesado en la máquina ${productName}. ¿Podrían brindarme más información?`;
}

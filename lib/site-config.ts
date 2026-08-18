export const siteConfig = {
  name: "Hierro Viejo",
  legalName: "Hierro Viejo Maquinaria Industrial",
  tagline: "Maquinaria industrial para la industria que produce",
  description:
    "Venta de maquinaria industrial y metalúrgica nueva y usada: mecanizado, deformación de chapa, bombas y equipos de proceso. Más de 35 años de experiencia.",
  url: "https://www.hierroviejo.com.ar",
  phoneDisplay: "+54 9 11 5555-1234",
  phoneWhatsApp: "5491155551234", // DEMO — reemplazar por el número real (formato internacional, sin '+' ni espacios)
  email: "ventas@hierroviejo.com.ar",
  address: "Ruta 7 Km 112, San Andrés de Giles, Buenos Aires, Argentina",
  hours: [
    { day: "Lunes a Viernes", time: "8:30 – 18:00" },
    { day: "Sábados", time: "9:00 – 13:00" },
  ],
  mapEmbedSrc:
    "https://www.google.com/maps?q=San+Andr%C3%A9s+de+Giles,+Buenos+Aires,+Argentina&output=embed",
  social: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    linkedin: "https://linkedin.com/",
  },
  stats: {
    years: "+35",
    machines: "+100",
  },
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

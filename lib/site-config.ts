// ---------------------------------------------------------------------------
// DATOS DE CONTACTO — TODO: reemplazar TODOS estos valores demo por los reales
// antes del lanzamiento oficial: url (dominio), teléfono, WhatsApp, email y
// redes. El sitio funciona igual mientras tanto gracias al dominio *.vercel.app.
// ---------------------------------------------------------------------------
export const siteConfig = {
  name: "Hierro Viejo",
  legalName: "Hierro Viejo Maquinaria Industrial",
  tagline: "Maquinaria industrial para la industria que produce",
  description:
    "Venta de maquinaria industrial y metalúrgica nueva y usada: mecanizado, deformación de chapa, bombas y equipos de proceso. Más de 35 años de experiencia.",
  // TODO: reemplazar por el dominio real (ej: https://www.hierroviejo.com.ar) cuando esté conectado
  url: "https://www.hierroviejo.com.ar",
  // TODO: reemplazar por el teléfono real en formato de display (ej: +54 9 11 5555-1234)
  phoneDisplay: "+54 9 11 5555-1234",
  // TODO: reemplazar por el número real de WhatsApp (formato internacional, sin '+' ni espacios, ej: 5491155551234)
  phoneWhatsApp: "5491155551234",
  // TODO: reemplazar por el email real de ventas
  email: "ventas@hierroviejo.com.ar",
  // IMPORTANTE: dirección deliberadamente FICTICIA (no revela la ubicación real
  // del negocio). No reemplazarla por una real sin autorización explícita.
  address: "Bv. del Parque 3210, Villa Martelli, Buenos Aires, Argentina",
  hours: [
    { day: "Lunes a Viernes", time: "8:30 – 18:00" },
    { day: "Sábados", time: "9:00 – 13:00" },
  ],
  // Mapa: dirección ficticia (mismo criterio que address) — no señala la
  // ubicación real del negocio
  mapEmbedSrc:
    "https://www.google.com/maps?q=Bv.+del+Parque+3210,+Villa+Martelli,+Buenos+Aires,+Argentina&output=embed",
  social: {
    // TODO: reemplazar por las URLs reales de las redes de la empresa
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

export type Condition = "nueva" | "usada";

export type Category = {
  slug: string;
  name: string;
  group: "nuevas" | "usadas";
  description: string;
  image: string;
};

export type Specification = {
  label: string;
  value?: string; // si no hay valor, el campo se oculta automáticamente
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  condition: Condition;
  category: string; // category.slug
  subcategory?: string;
  brand: string;
  model: string;
  description: string;
  specifications: Specification[];
  images: string[];
  featured: boolean;
  availability: "Disponible" | "Reservada" | "Consultar";
  price: number | null; // null => "Consultar precio"
  origin?: string;
  isDemo?: boolean; // dato ficticio de demostración
};

// ---------------------------------------------------------------------------
// CATEGORÍAS
// ---------------------------------------------------------------------------
export const categories: Category[] = [
  {
    slug: "agujereadoras",
    name: "Agujereadoras",
    group: "nuevas",
    description: "Perforado de precisión para producción seriada.",
    image: "/images/products/valvulas-industriales-01.jpg",
  },
  {
    slug: "fresadoras",
    name: "Fresadoras",
    group: "nuevas",
    description: "Universales y CNC para mecanizado de alta exigencia.",
    image: "/images/products/valvulas-industriales-02.jpg",
  },
  {
    slug: "tornos",
    name: "Tornos",
    group: "nuevas",
    description: "Paralelos y CNC para arranque de viruta.",
    image: "/images/products/bomba-centrifuga-02.jpg",
  },
  {
    slug: "sierras",
    name: "Sierras sin fin",
    group: "nuevas",
    description: "Corte de perfiles y barras en acero y aleaciones.",
    image: "/images/products/bomba-centrifuga-03.jpg",
  },
  {
    slug: "arranque-de-viruta",
    name: "Arranque de viruta",
    group: "usadas",
    description: "Tornos, fresadoras y rectificadoras usadas revisadas.",
    image: "/images/products/bomba-centrifuga-01.jpg",
  },
  {
    slug: "deformacion-de-chapa",
    name: "Deformación de chapa",
    group: "usadas",
    description: "Plegadoras, guillotinas y prensas de segunda mano.",
    image: "/images/products/valvulas-industriales-01.jpg",
  },
  {
    slug: "bombas-industriales",
    name: "Bombas industriales",
    group: "usadas",
    description: "Bombas centrífugas y equipos de proceso relevados de planta.",
    image: "/images/products/bomba-centrifuga-02.jpg",
  },
  {
    slug: "otras-maquinas",
    name: "Otras máquinas",
    group: "usadas",
    description: "Equipos varios para talleres y plantas industriales.",
    image: "/images/products/valvulas-industriales-02.jpg",
  },
];

// ---------------------------------------------------------------------------
// PRODUCTOS
// isDemo: true => dato ficticio, reemplazar por inventario real.
// Los dos productos de bombas usan fotografías reales provistas por el cliente.
// ---------------------------------------------------------------------------
export const products: Product[] = [
  {
    id: "1",
    slug: "torno-industrial-t-500",
    name: "Torno Industrial T-500",
    condition: "nueva",
    category: "tornos",
    brand: "Genérica Industrial",
    model: "T-500",
    description:
      "Torno paralelo de bancada robusta pensado para talleres de mecanizado exigentes. Estructura reforzada, husillo templado y sistema de lubricación centralizada para trabajos de alta precisión en producción continua.",
    specifications: [
      { label: "Distancia entre puntos", value: "1.500 mm" },
      { label: "Diámetro admitido sobre bancada", value: "500 mm" },
      { label: "Potencia motor principal", value: "7,5 kW" },
      { label: "Velocidades de husillo", value: "16 (18–1.800 rpm)" },
      { label: "Peso", value: "2.400 kg" },
      { label: "Origen", value: "Importado" },
    ],
    images: ["/images/products/bomba-centrifuga-02.jpg"],
    featured: true,
    availability: "Disponible",
    price: null,
    origin: "Importado",
    isDemo: true,
  },
  {
    id: "2",
    slug: "fresadora-universal-f-800",
    name: "Fresadora Universal F-800",
    condition: "nueva",
    category: "fresadoras",
    brand: "Genérica Industrial",
    model: "F-800",
    description:
      "Fresadora universal de gran versatilidad, ideal para trabajos de desbaste y terminación en piezas de mediano y gran porte. Mesa de amplio recorrido y cabezal orientable.",
    specifications: [
      { label: "Superficie de mesa", value: "1.700 x 400 mm" },
      { label: "Recorrido longitudinal", value: "800 mm" },
      { label: "Potencia motor", value: "5,5 kW" },
      { label: "Conicidad de husillo", value: "ISO 40" },
      { label: "Peso", value: "1.850 kg" },
    ],
    images: ["/images/products/valvulas-industriales-02.jpg"],
    featured: true,
    availability: "Disponible",
    price: null,
    isDemo: true,
  },
  {
    id: "3",
    slug: "plegadora-hidraulica-ph-3000",
    name: "Plegadora Hidráulica PH-3000",
    condition: "nueva",
    category: "deformacion-de-chapa",
    subcategory: "Plegadoras",
    brand: "Genérica Industrial",
    model: "PH-3000",
    description:
      "Plegadora hidráulica CNC de dos ejes para conformado de chapa de precisión. Sistema de sincronismo hidráulico y tope trasero motorizado.",
    specifications: [
      { label: "Fuerza de plegado", value: "300 Tn" },
      { label: "Longitud de plegado", value: "3.000 mm" },
      { label: "Distancia entre montantes", value: "2.500 mm" },
      { label: "Carrera del pistón", value: "250 mm" },
      { label: "Potencia instalada", value: "18,5 kW" },
    ],
    images: ["/images/products/bomba-centrifuga-03.jpg"],
    featured: true,
    availability: "Consultar",
    price: null,
    isDemo: true,
  },
  {
    id: "4",
    slug: "guillotina-industrial-gi-2500",
    name: "Guillotina Industrial GI-2500",
    condition: "nueva",
    category: "deformacion-de-chapa",
    subcategory: "Guillotinas",
    brand: "Genérica Industrial",
    model: "GI-2500",
    description:
      "Guillotina hidráulica de corte recto para chapa de hasta 6 mm de espesor, con escuadra de retención neumática y tope de medida programable.",
    specifications: [
      { label: "Longitud de corte", value: "2.500 mm" },
      { label: "Capacidad de corte", value: "6 mm (acero)" },
      { label: "Ángulo de corte", value: "1° 30'" },
      { label: "Golpes por minuto", value: "18" },
    ],
    images: ["/images/products/valvulas-industriales-01.jpg"],
    featured: false,
    availability: "Disponible",
    price: null,
    isDemo: true,
  },
  {
    id: "5",
    slug: "prensa-hidraulica-ph-100",
    name: "Prensa Hidráulica PH-100",
    condition: "nueva",
    category: "deformacion-de-chapa",
    subcategory: "Prensas",
    brand: "Genérica Industrial",
    model: "PH-100",
    description:
      "Prensa hidráulica de columna para procesos de embutido, estampado y enderezado. Mando por doble pulsador con enclavamiento de seguridad.",
    specifications: [
      { label: "Fuerza nominal", value: "100 Tn" },
      { label: "Carrera del cilindro", value: "400 mm" },
      { label: "Distancia entre columnas", value: "900 mm" },
      { label: "Altura de trabajo regulable", value: "Sí" },
    ],
    images: ["/images/products/bomba-centrifuga-01.jpg"],
    featured: false,
    availability: "Disponible",
    price: null,
    isDemo: true,
  },
  {
    id: "6",
    slug: "agujereadora-radial-ar-100",
    name: "Agujereadora Radial AR-100",
    condition: "nueva",
    category: "agujereadoras",
    brand: "Genérica Industrial",
    model: "AR-100",
    description:
      "Agujereadora radial de brazo orientable para perforado de piezas de gran tamaño directamente en planta. Avance automático y roscado incorporado.",
    specifications: [
      { label: "Diámetro máx. de perforado", value: "80 mm" },
      { label: "Longitud del brazo", value: "1.600 mm" },
      { label: "Recorrido vertical del cabezal", value: "700 mm" },
      { label: "Potencia motor principal", value: "4 kW" },
    ],
    images: ["/images/products/valvulas-industriales-02.jpg"],
    featured: true,
    availability: "Disponible",
    price: null,
    isDemo: true,
  },
  {
    id: "7",
    slug: "sierra-sin-fin-sf-500",
    name: "Sierra Sin Fin SF-500",
    condition: "nueva",
    category: "sierras",
    brand: "Genérica Industrial",
    model: "SF-500",
    description:
      "Sierra sin fin semiautomática para corte de perfiles, tubos y barras macizas. Bajada hidráulica regulable y cepillo limpiador de viruta.",
    specifications: [
      { label: "Capacidad de corte redondo", value: "500 mm" },
      { label: "Capacidad de corte rectangular", value: "500 x 350 mm" },
      { label: "Velocidad de cinta", value: "20–80 m/min" },
      { label: "Potencia motor", value: "3 kW" },
    ],
    images: ["/images/products/bomba-centrifuga-02.jpg"],
    featured: false,
    availability: "Disponible",
    price: null,
    isDemo: true,
  },
  {
    id: "8",
    slug: "rectificadora-industrial-ri-600",
    name: "Rectificadora Industrial RI-600",
    condition: "usada",
    category: "arranque-de-viruta",
    brand: "Genérica Industrial",
    model: "RI-600",
    description:
      "Rectificadora plana usada, revisada y funcionando, apta para trabajos de terminación de alta precisión superficial. Mesa magnética incluida.",
    specifications: [
      { label: "Superficie de mesa", value: "600 x 300 mm" },
      { label: "Recorrido vertical", value: "450 mm" },
      { label: "Mesa magnética", value: "Incluida" },
      { label: "Estado", value: "Funcionando, revisada" },
    ],
    images: ["/images/products/bomba-centrifuga-03.jpg"],
    featured: false,
    availability: "Disponible",
    price: null,
    isDemo: true,
  },
  {
    id: "9",
    slug: "bomba-centrifuga-industrial-usada",
    name: "Bomba Centrífuga Industrial Usada",
    condition: "usada",
    category: "bombas-industriales",
    brand: "A definir",
    model: "A definir",
    description:
      "Lote de bombas centrífugas industriales retiradas de planta, en condición de uso, aptas para repuesto o reacondicionamiento. Cuerpo y voluta de hierro fundido, bridas normalizadas. Fotografías reales del estado actual del equipo.",
    specifications: [
      { label: "Tipo", value: "Centrífuga, cuerpo voluta" },
      { label: "Material", value: "Hierro fundido" },
      { label: "Conexión", value: "Bridada" },
      { label: "Estado", value: "Usada — requiere revisión" },
      { label: "Origen", value: "Retiro de planta industrial" },
    ],
    images: [
      "/images/products/bomba-centrifuga-01.jpg",
      "/images/products/bomba-centrifuga-02.jpg",
      "/images/products/bomba-centrifuga-03.jpg",
    ],
    featured: true,
    availability: "Consultar",
    price: null,
    isDemo: false,
  },
  {
    id: "10",
    slug: "lote-valvulas-y-conexiones-industriales",
    name: "Lote de Válvulas y Conexiones Industriales",
    condition: "usada",
    category: "otras-maquinas",
    brand: "Varias",
    model: "Lote",
    description:
      "Lote de válvulas de paso, esclusas y conexiones bridadas usadas, provenientes de desmantelamiento de planta. Ideal para mantenimiento, repuesto o reacondicionamiento. Fotografías reales del lote disponible.",
    specifications: [
      { label: "Tipo", value: "Válvulas esclusa y de paso" },
      { label: "Conexión", value: "Bridada" },
      { label: "Estado", value: "Usadas — a relevar por unidad" },
      { label: "Origen", value: "Desmantelamiento de planta" },
    ],
    images: [
      "/images/products/valvulas-industriales-01.jpg",
      "/images/products/valvulas-industriales-02.jpg",
    ],
    featured: false,
    availability: "Consultar",
    price: null,
    isDemo: false,
  },
];

// ---------------------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------------------
export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 4) {
  return products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, limit);
}

export const brands = Array.from(new Set(products.map((p) => p.brand))).sort();

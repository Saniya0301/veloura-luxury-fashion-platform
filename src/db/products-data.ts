export interface ProductData {
  name: string;
  slug: string;
  category: string;
  price: number;
  description: string;
  primaryImage: string;
  secondaryImage: string;
  images: string[];
  colorVariants: Array<{ name: string; hex: string }>;
  sizes: string[];
  details: string[];
  material: string;
  care: string;
  rating: string;
  isSignature: boolean;
  isNew: boolean;
}

export const SEED_PRODUCTS: ProductData[] = [
  {
    name: "VELOURA SATIN DRESS",
    slug: "veloura-satin-dress",
    category: "dresses",
    price: 14900,
    description: "A luxurious satin slip dress designed with a subtle cowl neckline, delicate adjustable straps, and a fluid bias-cut drape that moves like liquid light.",
    primaryImage: "https://images.pexels.com/photos/34896903/pexels-photo-34896903.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    secondaryImage: "https://images.pexels.com/photos/22912103/pexels-photo-22912103.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    images: [
      "https://images.pexels.com/photos/34896903/pexels-photo-34896903.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
      "https://images.pexels.com/photos/22912103/pexels-photo-22912103.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
      "https://images.pexels.com/photos/19771938/pexels-photo-19771938.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800"
    ],
    colorVariants: [
      { name: "Champagne", hex: "#F3EED9" },
      { name: "Espresso Noir", hex: "#1C1412" },
      { name: "Steel Gray", hex: "#7E8287" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    details: [
      "100% premium mulberry silk-satin blend",
      "Elegant bias-cut drape for a liquid silhouette",
      "Adjustable micro-spaghetti straps",
      "Unlined for ultimate lightweight comfort"
    ],
    material: "92% Mulberry Silk, 8% Elastane",
    care: "Dry clean only. Iron on low heat using a protective cloth.",
    rating: "4.9",
    isSignature: true,
    isNew: true
  },
  {
    name: "AURELIA TAILORED COAT",
    slug: "aurelia-tailored-coat",
    category: "tailoring",
    price: 22500,
    description: "An exquisite double-breasted long coat tailored from a premium virgin wool and cashmere blend. Designed with clean architectural lines and structure.",
    primaryImage: "https://images.pexels.com/photos/18978249/pexels-photo-18978249.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    secondaryImage: "https://images.pexels.com/photos/20578707/pexels-photo-20578707.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    images: [
      "https://images.pexels.com/photos/18978249/pexels-photo-18978249.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
      "https://images.pexels.com/photos/20578707/pexels-photo-20578707.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
      "https://images.pexels.com/photos/9823823/pexels-photo-9823823.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800"
    ],
    colorVariants: [
      { name: "Taupe Beige", hex: "#C2B29F" },
      { name: "Espresso Brown", hex: "#2E1A16" },
      { name: "Midnight Charcoal", hex: "#22252A" }
    ],
    sizes: ["S", "M", "L", "XL"],
    details: [
      "Double-breasted front with real horn buttons",
      "Premium heavyweight virgin wool-cashmere blend",
      "Hand-finished interior seams",
      "Deep side-slit pockets and back vent"
    ],
    material: "85% Virgin Wool, 15% Cashmere. Lining: 100% Viscose",
    care: "Professional dry clean only.",
    rating: "4.8",
    isSignature: true,
    isNew: false
  },
  {
    name: "NOIR STRUCTURED BLAZER",
    slug: "noir-structured-blazer",
    category: "tailoring",
    price: 18900,
    description: "A sharp-shouldered single-breasted blazer featuring clean notch lapels, structural interior support, and a modern, slightly oversized tailored silhouette.",
    primaryImage: "https://images.pexels.com/photos/27623995/pexels-photo-27623995.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    secondaryImage: "https://images.pexels.com/photos/33401683/pexels-photo-33401683.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    images: [
      "https://images.pexels.com/photos/27623995/pexels-photo-27623995.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
      "https://images.pexels.com/photos/33401683/pexels-photo-33401683.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
      "https://images.pexels.com/photos/987577/pexels-photo-987577.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800"
    ],
    colorVariants: [
      { name: "Midnight Charcoal", hex: "#1F2124" },
      { name: "Ivory", hex: "#F7F6F2" }
    ],
    sizes: ["XS", "S", "M", "L"],
    details: [
      "Structured shoulder pads with custom tailoring insert",
      "Single horn button closure",
      "Welt breast pocket and dual flap pockets",
      "Fully lined with bespoke satin jacquard"
    ],
    material: "95% Worsted Wool, 5% Lycra. Lining: 100% Bemberg Silk",
    care: "Dry clean only. Steam iron on low.",
    rating: "5.0",
    isSignature: true,
    isNew: true
  },
  {
    name: "CELINE SILK BLOUSE",
    slug: "celine-silk-blouse",
    category: "essentials",
    price: 9800,
    description: "Crafted from heavy 100% silk crepe de chine. Featuring a soft draped scarf collar and elegant elongated cuffs for a statement of quiet luxury.",
    primaryImage: "https://images.pexels.com/photos/11826093/pexels-photo-11826093.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    secondaryImage: "https://images.pexels.com/photos/28452456/pexels-photo-28452456.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    images: [
      "https://images.pexels.com/photos/11826093/pexels-photo-11826093.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
      "https://images.pexels.com/photos/28452456/pexels-photo-28452456.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800"
    ],
    colorVariants: [
      { name: "Alabaster Ivory", hex: "#FBF9F6" },
      { name: "Soft Taupe", hex: "#D2C5B8" }
    ],
    sizes: ["XS", "S", "M", "L"],
    details: [
      "100% heavy silk crepe de chine fabric",
      "Convertible draped scarf collar",
      "Elongated cuffs with delicate mother-of-pearl buttons",
      "Seamless clean French seams throughout"
    ],
    material: "100% Pure Mulberry Silk",
    care: "Hand wash cold with silk detergent or dry clean.",
    rating: "4.7",
    isSignature: false,
    isNew: true
  },
  {
    name: "ELARA LEATHER BAG",
    slug: "elara-leather-bag",
    category: "accessories",
    price: 16500,
    description: "A sculptural, structured handbag crafted from smooth full-grain calfskin leather, complete with custom gold-tone hardware and a luxurious suede-lined interior.",
    primaryImage: "https://images.pexels.com/photos/8396731/pexels-photo-8396731.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    secondaryImage: "https://images.pexels.com/photos/26316185/pexels-photo-26316185.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    images: [
      "https://images.pexels.com/photos/8396731/pexels-photo-8396731.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
      "https://images.pexels.com/photos/26316185/pexels-photo-26316185.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
      "https://images.pexels.com/photos/31929486/pexels-photo-31929486.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800"
    ],
    colorVariants: [
      { name: "Champagne Beige", hex: "#EBE3D5" },
      { name: "Espresso Brown", hex: "#2E1E1B" },
      { name: "Noir", hex: "#111111" }
    ],
    sizes: ["One Size"],
    details: [
      "Handcrafted from full-grain Italian calfskin leather",
      "Polished custom gold-plated metal clasp",
      "Real split suede lined interior compartment",
      "Adjustable and detachable shoulder strap"
    ],
    material: "100% Italian Calfskin Leather, 100% Suede lining",
    care: "Wipe with a soft damp cloth. Store in its protective cotton dust bag.",
    rating: "4.9",
    isSignature: true,
    isNew: false
  },
  {
    name: "SILK EVENING COUTURE DRESS",
    slug: "silk-evening-couture-dress",
    category: "dresses",
    price: 24900,
    description: "An absolute showstopper. Flowing backless design in fluid steel-gray silk satin. Features a high collar, delicate draped back details, and an invisible side-zip closure.",
    primaryImage: "https://images.pexels.com/photos/20117725/pexels-photo-20117725.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    secondaryImage: "https://images.pexels.com/photos/19771915/pexels-photo-19771915.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    images: [
      "https://images.pexels.com/photos/20117725/pexels-photo-20117725.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
      "https://images.pexels.com/photos/19771915/pexels-photo-19771915.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800"
    ],
    colorVariants: [
      { name: "Steel Gray", hex: "#7E8287" },
      { name: "Noir Black", hex: "#121212" }
    ],
    sizes: ["XS", "S", "M", "L"],
    details: [
      "Premium 19-momme heavyweight mulberry silk",
      "Dramatic open back with cross-drape finish",
      "Mock neck with dual delicate loop buttons",
      "Floor-length bias-cut hem with mini train"
    ],
    material: "100% Heavy Mulberry Silk",
    care: "Dry clean only. Hang on padded hangers only.",
    rating: "4.9",
    isSignature: false,
    isNew: true
  },
  {
    name: "EVELYN MERINO TURTLENECK",
    slug: "evelyn-merino-turtleneck",
    category: "essentials",
    price: 8200,
    description: "Knitted from ultra-fine Italian Merino wool, featuring a seamless mock neck, second-skin rib structure, and sophisticated split-cuffs.",
    primaryImage: "https://images.pexels.com/photos/30721037/pexels-photo-30721037.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    secondaryImage: "https://images.pexels.com/photos/7760026/pexels-photo-7760026.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    images: [
      "https://images.pexels.com/photos/30721037/pexels-photo-30721037.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
      "https://images.pexels.com/photos/7760026/pexels-photo-7760026.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800"
    ],
    colorVariants: [
      { name: "Espresso Brown", hex: "#3A2B29" },
      { name: "Alabaster Ivory", hex: "#F5F3EF" },
      { name: "Charcoal Black", hex: "#1C1C1D" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    details: [
      "100% Extra-fine Italian Merino wool",
      "High-gauge seamless body construct",
      "Extended sleeve length with sophisticated cuff splits",
      "Beautifully breathable yet isolating thermals"
    ],
    material: "100% Extra-fine Merino Wool",
    care: "Hand wash warm using wool detergent. Lay flat to dry.",
    rating: "4.8",
    isSignature: false,
    isNew: false
  },
  {
    name: "AMARA GOLD ACCENT CHAIN",
    slug: "amara-gold-accent-chain",
    category: "accessories",
    price: 6500,
    description: "An elegant minimal chain necklace crafted in heavy 18k gold vermeil. Features subtle sculptural interlocking links for everyday quiet luxury statement.",
    primaryImage: "https://images.pexels.com/photos/33722978/pexels-photo-33722978.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    secondaryImage: "https://images.pexels.com/photos/33722977/pexels-photo-33722977.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    images: [
      "https://images.pexels.com/photos/33722978/pexels-photo-33722978.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
      "https://images.pexels.com/photos/33722977/pexels-photo-33722977.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800"
    ],
    colorVariants: [
      { name: "18k Gold Vermeil", hex: "#E8C881" },
      { name: "Sterling Silver 925", hex: "#D6D9DC" }
    ],
    sizes: ["One Size"],
    details: [
      "Thick layer of 18k solid gold on 925 sterling silver base",
      "Handcrafted interlocking statement linkages",
      "Adjustable lobster-clasp closure with dainty logo tag",
      "Hypoallergenic, nickel-free composition"
    ],
    material: "18k Gold Vermeil (Sterling Silver 925 base, 2.5 micron plating)",
    care: "Avoid direct contact with perfumes, swimming pools, and sweat. Polish gently with dry microfiber cloth.",
    rating: "4.6",
    isSignature: false,
    isNew: true
  }
];

export const SEED_JOURNAL = [
  {
    title: "The Art of Quiet Luxury",
    slug: "the-art-of-quiet-luxury",
    excerpt: "True elegance doesn't shout. It is a quiet confidence found in the mastery of fabrics, shapes, and exquisite attention to details.",
    content: `
      <p>Luxury has undergone a quiet revolution. Moving away from heavy logos and flashing branding, the modern connoisseur of style seeks something deeper: timeless silhouettes, superb drape, and tactile mastery.</p>
      <p>At Veloura, we define this as <em>The Art of Less</em>. Every button is selected for its weight and color; every seam is finished with meticulous single-needle stitching; every drape is calculated to flow in unison with your movement.</p>
      <blockquote>"Luxury is not excess. It is intention."</blockquote>
      <p>In this editorial journal, we explore how to curate a modular wardrobe that radiates premium quality without uttering a single loud statement. It starts with a foundational double-breasted coat in premium wool-cashmere blend, paired with a fluid bias-cut satin dress, and anchored with a single hand-finished full-grain leather handbag.</p>
    `,
    category: "Philosophy",
    readTime: "4 min read",
    date: "October 14, 2026",
    image: "https://images.pexels.com/photos/18978249/pexels-photo-18978249.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800"
  },
  {
    title: "Building a Timeless Wardrobe",
    slug: "building-a-timeless-wardrobe",
    excerpt: "A guide on selecting high-end capsule pieces that transition effortlessly across seasons and occasions, maintaining their structural elegance for a lifetime.",
    content: `
      <p>The goal of a thoughtful closet is to provide effortless beauty on demand. When your garments share a cohesive language of neutral tones—ivory, sand, champagne, espresso, and deep charcoal—assembling an outfit becomes an acts of artistic joy.</p>
      <p>Start with three key pillars:</p>
      <ul>
        <li><strong>The Structural Pillar:</strong> A sharp, shoulder-padded tailored blazer. Our Noir Structured Blazer acts as an instantly polishing layer over casual wear or formal dresses.</li>
        <li><strong>The Fluid Pillar:</strong> A liquid silk slip dress. It provides a touch of romanticism and reflects natural light beautifully during evening affairs.</li>
        <li><strong>The Tactile Pillar:</strong> An ultra-fine Merino wool turtleneck. Its seamless mock-neck offers thermal warmth with sleek second-skin sophistication.</li>
      </ul>
      <p>By investing in fabrics that endure—virgin wool, mulberry silk, full-grain Italian calfskin, and Merino wool—you write an ongoing story of personal excellence.</p>
    `,
    category: "Style Guide",
    readTime: "6 min read",
    date: "November 2, 2026",
    image: "https://images.pexels.com/photos/27623995/pexels-photo-27623995.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800"
  },
  {
    title: "The Language of Tailoring",
    slug: "the-language-of-tailoring",
    excerpt: "Behind the scenes of our atelier. Discover the hand-finished details and architectural patterns that form the backbone of Veloura tailoring.",
    content: `
      <p>Tailoring is a dialogue between architecture and human anatomy. A perfect jacket must support the wearer while allowing absolute ease of expression.</p>
      <p>In the Veloura atelier, we begin each piece with hand-drawn charcoal lines. We sculpt the shoulders using multi-layered canvas to maintain crisp sharpness over years of wear. The sleeves are angled precisely to mirror the natural rest of the arms, ensuring no bunching occurs.</p>
      <p>We source our materials exclusively from historical family-owned mills in Northern Italy, choosing only long-staple threads that resist pilling and naturally recover their form. The result is clothing that doesn't feel like a costume, but rather a confident extension of your being.</p>
    `,
    category: "Couture",
    readTime: "5 min read",
    date: "December 12, 2026",
    image: "https://images.pexels.com/photos/11826093/pexels-photo-11826093.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800"
  }
];

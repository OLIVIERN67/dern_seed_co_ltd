export interface SeedProduct {
  id: string;
  name: string;
  category: 'Root Crops' | 'Legumes' | 'Cereals';
  image: string;
  galleryImages: string[];
  shortDescription: string;
  description: string;
  benefits: string[];
  characteristics: string[];
  availability: 'Available for Order' | 'In Stock' | 'Seasonal';
  plantingSeason: string;
  harvestPeriod: string;
  certification: string;
  pricePerKg?: number;
}

export const seedData: SeedProduct[] = [
  {
    id: 'irish-potato',
    name: 'Irish Potato Seed',
    category: 'Root Crops',
    image: '/gallery/potatoes 1.jpeg',
    galleryImages: [
      '/gallery/potatoes 1.jpeg',
      '/gallery/potatoes 2.jpeg',
      '/gallery/potatoes 5.jpeg',
      '/gallery/potatoes 6.jpeg',
      '/gallery/potatoes.jpeg',
      '/gallery/potatoes field 2.jpeg',
    ],
    shortDescription:
      'High-yielding certified Irish potato seed tubers produced under strict quality and sandponic minituber multiplication standards.',
    description:
      'DERN SEED specializes in the multiplication, processing, and distribution of certified Irish Potato seeds. Produced, inspected, and tested according to official seed certification standards, our potato seeds guarantee superior crop vigor, disease tolerance, uniform tuber development, and higher harvest yields.',
    benefits: [
      'Higher crop yields and uniform marketable tubers',
      'Better germination and rapid, vigorous crop establishment',
      'Reduced risk of bacterial wilt, late blight, and viral degeneration',
      'Improved crop quality with excellent culinary and processing traits',
      'Climate resilience adapted to Rwandan volcanic and highland soils',
    ],
    characteristics: [
      'Certification: Officially Certified Seed Standards (RICA approved)',
      'Genetic Purity: 100% true-to-type certified seed tubers',
      'Germination Rate: Superior field emergence (>95%)',
      'Planting Season: Season A (Sept - Feb) & Season B (March - July)',
      'Harvest Period: 90 - 120 days after planting',
      'Storage Quality: Excellent dormancy control and shelf life',
    ],
    availability: 'Available for Order',
    plantingSeason: 'Season A & Season B',
    harvestPeriod: '90 - 120 days',
    certification: 'Certified Seed',
    pricePerKg: 800,
  },
  {
    id: 'beans',
    name: 'Certified Bean Seed',
    category: 'Legumes',
    image: '/gallery/beans 1.jpeg',
    galleryImages: [
      '/gallery/beans 1.jpeg',
      '/gallery/beans 4.jpeg',
      '/gallery/beans 2.jpeg',
    ],
    shortDescription:
      'High-protein certified climbing and bush bean seeds selected for optimal germination, disease tolerance, and high productivity.',
    description:
      'DERN SEED produces premium certified bean seeds through rigorous contract farming and specialized processing. Every lot is cleaned, graded, tested, and inspected to provide farmers with reliable planting materials that improve food security and household incomes.',
    benefits: [
      'Higher crop yields with prolific pod formation',
      'Better germination and uniform seedling establishment',
      'Reduced risk of anthracnose, angular leaf spot, and root rots',
      'Rich in protein, iron, and essential nutrients for family nutrition',
      'Fixes atmospheric nitrogen to naturally enrich soil fertility',
    ],
    characteristics: [
      'Certification: National Certified Seed Standard',
      'Genetic Purity: 99%+ varietal purity',
      'Germination Rate: High tested viability (≥ 90%)',
      'Planting Season: Season A (September - November) & Season B (February - April)',
      'Harvest Period: 75 - 90 days (bush) / 90 - 110 days (climbing)',
      'Quality: Uniform size, cleaned, and moisture-calibrated',
    ],
    availability: 'Available for Order',
    plantingSeason: 'Season A & Season B',
    harvestPeriod: '75 - 110 days',
    certification: 'Certified Seed',
    pricePerKg: 1500,
  },
  {
    id: 'maize',
    name: 'Certified Maize Seed',
    category: 'Cereals',
    image: '/gallery/maize 3.jpeg',
    galleryImages: [
      '/gallery/maize 3.jpeg',
      '/gallery/maize 1.jpeg',
      '/gallery/maize 2.jpeg',
      '/gallery/maize 4.jpeg',
      '/gallery/maize crop 1.jpeg',
      '/gallery/Maize crop 2.jpeg',
      '/gallery/maize crop 3.jpeg',
      '/gallery/maize crop4.jpeg',
    ],
    shortDescription:
      'High-yielding certified maize seed varieties engineered for excellent grain filling, drought resilience, and disease resistance.',
    description:
      'Our certified maize seed varieties are produced and processed under stringent quality assurance guidelines. Adapted to Rwanda’s diverse agro-ecological conditions, these seeds deliver deep root systems, strong stalks, and heavy cob weights for commercial and smallholder farmers.',
    benefits: [
      'Exceptional yield potential with full cob tip-filling',
      'High germination rate and fast early vegetative vigor',
      'Strong tolerance against drought, foliar diseases, and lodging',
      'High-quality grain with superior flour yield and taste',
      'Climate-resilient performance in varying altitudes and soils',
    ],
    characteristics: [
      'Certification: Officially Inspected and Certified',
      'Genetic Purity: 99.5% certified hybrid purity',
      'Germination Rate: Laboratory tested (≥ 95%)',
      'Planting Season: Season A (September - October)',
      'Harvest Period: 120 - 150 days depending on elevation',
      'Grain Type: Semi-flint / Dent, high test weight',
    ],
    availability: 'Available for Order',
    plantingSeason: 'Season A (Sept - Oct)',
    harvestPeriod: '120 - 150 days',
    certification: 'Certified Seed',
    pricePerKg: 2200,
  },
  {
    id: 'wheat',
    name: 'Certified Wheat Seed',
    category: 'Cereals',
    image: '/gallery/Wheat 1.jpeg',
    galleryImages: [
      '/gallery/Wheat 1.jpeg',
      '/gallery/Wheat 2.jpeg',
    ],
    shortDescription:
      'Premium certified wheat seed varieties tailored for highland farming with superior tillering, disease tolerance, and milling quality.',
    description:
      'DERN SEED provides high-grade certified wheat seed produced specifically for highland production zones. Our cleaning, sorting, and seed testing procedures ensure maximum germination and robust tillering for commercial bakers and millers.',
    benefits: [
      'High tillering capacity producing dense, productive heads',
      'Fast and uniform emergence in cooler highland temperatures',
      'Strong resistance to yellow rust (stripe rust) and leaf blights',
      'High grain protein content and excellent baking properties',
      'Sturdy straw structure that prevents lodging in heavy rains',
    ],
    characteristics: [
      'Certification: National Certified Quality Seed',
      'Genetic Purity: High varietal consistency and clean seed stock',
      'Germination Rate: Tested germination (≥ 90%)',
      'Planting Season: Season B & highland planting windows',
      'Harvest Period: 110 - 130 days',
      'Application: Commercial milling and food processing',
    ],
    availability: 'Available for Order',
    plantingSeason: 'Season B (Feb - March)',
    harvestPeriod: '110 - 130 days',
    certification: 'Certified Seed',
    pricePerKg: 1800,
  },
  {
    id: 'soybeans',
    name: 'Certified Soybean Seed',
    category: 'Legumes',
    image: '/gallery/soya.jpeg',
    galleryImages: [
      '/gallery/soya.jpeg',
    ],
    shortDescription:
      'Nutrient-rich certified soybean seed with high protein and oil content, uniform pod maturation, and soil-enriching qualities.',
    description:
      'Certified and processed according to strict agricultural guidelines, DERN SEED soybeans offer dependable germination and vigorous vegetative growth. They are ideal for crop rotation, human nutrition, and industrial feed production.',
    benefits: [
      'High nutritional value with 40%+ protein and 20%+ oil content',
      'Reliable germination and uniform canopy closure',
      'Enhanced resistance to pod shattering and common leaf spots',
      'Significant natural nitrogen fixation that regenerates soil',
      'High market demand from animal feed and food processing industries',
    ],
    characteristics: [
      'Certification: Quality Certified Seed Standards',
      'Genetic Purity: 99%+ certified seed purity',
      'Germination Rate: Tested viability (≥ 90%)',
      'Planting Season: Season A & Season B',
      'Harvest Period: 95 - 115 days',
      'Seed Type: Yellow grain, uniform size and moisture level',
    ],
    availability: 'Available for Order',
    plantingSeason: 'Season A & Season B',
    harvestPeriod: '95 - 115 days',
    certification: 'Certified Seed',
    pricePerKg: 1600,
  },
];

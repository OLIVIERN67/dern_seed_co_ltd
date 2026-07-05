const MAIZE_IMAGES = [
  '/gallery/maize crop 1.jpeg',
  '/gallery/maize crop.jpeg',
  '/gallery/maize crop 2.jpeg',
  '/gallery/maize crop 3.jpeg',
  '/gallery/maize crop4.jpeg',
  '/gallery/maize crop 5.jpeg',
  '/gallery/maize seed 1.jpeg',
  '/gallery/maize seed 2.jpeg',
  '/gallery/maize seed 3.jpeg',
  '/gallery/maize seed.jpeg',
  '/gallery/maize white.jpeg',
];


const POTATO_IMAGES = [
  '/gallery/potatoes.jpeg',
  '/gallery/potatoes 1.jpeg',
  '/gallery/potatoes 2.jpeg',
  '/gallery/potatoes field 2.jpeg',
  '/gallery/potatoes 5.jpeg',
  '/gallery/potatoes 6.jpeg',
];

const BEAN_IMAGES = [
  '/gallery/beans.jpeg',
  '/gallery/beans 1.jpeg',
  '/gallery/mbc 23.jpeg',
];

const WHEAT_IMAGES = [
  '/gallery/Wheat.jpeg',
  '/gallery/Wheat (2).jpeg',
];

const SOYBEAN_IMAGES = [
  '/gallery/soya.jpeg',
];

export const cropGallery = {
  potatoes: {
    primary: POTATO_IMAGES[0],
    secondary: POTATO_IMAGES[1],
    all: POTATO_IMAGES,
  },
  beans: {
    primary: BEAN_IMAGES[0],
    secondary: BEAN_IMAGES[1],
    all: BEAN_IMAGES,
  },
  maize: {
    primary: MAIZE_IMAGES[0],
    secondary: MAIZE_IMAGES[1] ?? MAIZE_IMAGES[0],
    all: MAIZE_IMAGES,
  },
  wheat: {
    primary: WHEAT_IMAGES[0],
    secondary: WHEAT_IMAGES[1] ?? WHEAT_IMAGES[0],
    all: WHEAT_IMAGES,
  },
  soybean: {
    primary: SOYBEAN_IMAGES[0],
    secondary: SOYBEAN_IMAGES[0],
    all: SOYBEAN_IMAGES,
  },
} as const;







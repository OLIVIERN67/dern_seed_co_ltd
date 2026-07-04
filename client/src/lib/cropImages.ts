import { cropGallery } from "./galleryCropImages";

export const cropImages = {
  potato: {
    primary: cropGallery.potatoes.primary,
    secondary: cropGallery.potatoes.secondary,
    all: cropGallery.potatoes.all,
  },
  bean: {
    primary: cropGallery.beans.primary,
    secondary: cropGallery.beans.secondary,
    all: cropGallery.beans.all,
  },
  maize: {
    primary: cropGallery.maize.primary,
    secondary: cropGallery.maize.secondary,
    all: cropGallery.maize.all,
  },
  wheat: {
    primary: cropGallery.wheat.primary,
    secondary: cropGallery.wheat.secondary,
    all: cropGallery.wheat.all,
  },
  soybean: {
    primary: cropGallery.soybean.primary,
    secondary: cropGallery.soybean.secondary,
    all: cropGallery.soybean.all,
  },
} as const;



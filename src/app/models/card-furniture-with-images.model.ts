import { CardFurniture } from '~/src/app/models/card-furniture.model';

// src/app/models/card-furniture-with-images.model.ts
export interface CardFurnitureWithImages extends CardFurniture {
  imageUrls?: string[];
}

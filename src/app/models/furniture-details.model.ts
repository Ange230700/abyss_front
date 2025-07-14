// src\app\models\furniture-details.model.ts

export interface FurnitureDetails {
  id: number;
  name: string;
  description: string;
  price: number;
  size: string;
  colour: string;
  quantity: number;
  status: string;
  type: string;
  materialIds: number[];
  materials: string[]; // This will be used by the details page
  imageUrls: string[];
}

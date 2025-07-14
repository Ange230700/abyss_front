// src/app/models/furniture-form-data.model.ts
export interface FurnitureFormData {
  name: string;
  description: string;
  price: number;
  size: string;
  colour: string;
  quantity: number;
  status: string;
  typeId?: number;
  type?: string;
  materialIds?: number[];
  materials?: string[];
  imageUrls: string[];
}

// src\app\models\furniture.model.ts

export interface Furniture {
  id: number;
  name: string;
  description: string;
  id_type: number;
  size: string;
  colour: string;
  quantity: number;
  price: number;
  status: string;
  deleted_at?: Date | null;
}

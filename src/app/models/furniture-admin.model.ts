// src\app\models\furniture-admin.model.ts

export interface FurnitureAdmin {
  id: number;
  name: string;
  price: number;
  status: 'Disponible' | 'Rupture de stock' | 'Discontinué';
}

// src\app\models\furniturematerial.model.ts

export interface FurnitureMaterial {
  id: number;
  id_furniture: number;
  id_material: number;
  deleted_at?: Date | null;
}

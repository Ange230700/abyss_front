// src\app\models\image.model.ts

export interface Image {
  id: number;
  id_furniture: number;
  url: string;
  deleted_at?: Date | null;
}

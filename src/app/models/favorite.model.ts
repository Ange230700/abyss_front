// src\app\models\favorite.model.ts

export interface Favorite {
  id: number;
  id_furniture: number;
  id_user: number;
  is_favorite: boolean;
  deleted_at?: Date | null;
}

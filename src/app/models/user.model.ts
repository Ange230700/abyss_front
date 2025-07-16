// src\app\models\user.model.ts

export interface User {
  id: number;
  user_name: string;
  email: string;
  role: string;
  deleted_at?: Date | null;
}

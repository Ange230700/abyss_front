// src/app/utils/type-utils.ts

import { FurnitureType } from '~/src/app/models/furnituretype.model';

export function typeIdToName(typeId: number, types: FurnitureType[]): string {
  const found = types.find((t) => t.id === typeId);
  return found ? found.name : '';
}

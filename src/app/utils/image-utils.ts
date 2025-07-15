// src\app\utils\image-utils.ts

export function normalizeImageUrls<
  T extends { imageUrls?: string[]; imageUrl?: string },
>(item: T): string[] {
  if (Array.isArray(item.imageUrls)) return item.imageUrls;
  if (typeof item.imageUrl === 'string' && item.imageUrl)
    return [item.imageUrl];
  return [];
}

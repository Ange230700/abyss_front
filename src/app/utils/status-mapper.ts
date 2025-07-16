// src/app/utils/status-mapper.ts

export const StatusMap = {
  Available: 'AVAILABLE',
  'Out of Stock': 'OUT_OF_STOCK',
  'Low Stock': 'LOW_STOCK',
  Discontinued: 'DISCONTINUED',
} as const;
export const StatusReverseMap = {
  AVAILABLE: 'Available',
  OUT_OF_STOCK: 'Out of Stock',
  LOW_STOCK: 'Low Stock',
  DISCONTINUED: 'Discontinued',
};
export function isBackendStatus(
  status: string,
): status is keyof typeof StatusReverseMap {
  return Object.hasOwn(StatusReverseMap, status);
}
export function isFrontStatus(
  status: unknown,
): status is keyof typeof StatusMap {
  return typeof status === 'string' && Object.hasOwn(StatusMap, status);
}

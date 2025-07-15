// src/app/utils/status-mapper.ts
export const StatusMap = {
  Disponible: 'AVAILABLE',
  'Rupture de stock': 'OUT_OF_STOCK',
  Discontinué: 'DISCONTINUED',
} as const;
export const StatusReverseMap = {
  AVAILABLE: 'Disponible',
  OUT_OF_STOCK: 'Rupture de stock',
  DISCONTINUED: 'Discontinué',
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

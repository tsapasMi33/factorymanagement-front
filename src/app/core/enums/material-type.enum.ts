export const MaterialType = {
  PLATE: 'PLATE',
  TUBE: 'TUBE',
  OMEGA: 'OMEGA',
  L: 'L',
  Z: 'Z',
  FINISHED_PRODUCT: 'FINISHED_PRODUCT'
} as const;

export type MaterialType = keyof typeof MaterialType;

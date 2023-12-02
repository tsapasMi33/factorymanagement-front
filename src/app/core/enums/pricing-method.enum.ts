export const PricingMethod = {
  METER: 'METER',
  SQUARE_METER: 'SQUARE_METER',
  CUBE_METER: 'CUBE_METER',
  UNIT: 'UNIT'
} as const;

export type PricingMethod = keyof typeof PricingMethod;

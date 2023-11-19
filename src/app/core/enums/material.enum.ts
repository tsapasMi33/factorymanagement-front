export const Material = {
  T304: 'T304',
  T430: 'T430',
  OTHER: 'OTHER'
} as const;

export type Material = keyof typeof Material;

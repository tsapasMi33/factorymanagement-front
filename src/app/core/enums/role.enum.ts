export const Role = {
  ADMIN: 'ADMIN',
  CUTTER: 'CUTTER',
  BENDER: 'BENDER',
  COMBINER: 'COMBINER',
  WELDER: 'WELDER',
  ASSEMBLER: 'ASSEMBLER',
  FINISHER: 'FINISHER',
  PACKER: 'PACKER'
} as const;

export type Role = keyof typeof Role;

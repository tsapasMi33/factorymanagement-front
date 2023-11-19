export const Step = {
  ENCODED: 'ENCODED',
  PRODUCTION: 'PRODUCTION',
  CUT: 'CUT',
  BENT: 'BENT',
  COMBINED: 'COMBINED',
  WELDED: 'WELDED',
  ASSEMBLED: 'ASSEMBLED',
  FINISHED: 'FINISHED',
  PACKED: 'PACKED',
  SENT: 'SENT'
} as const;

export type Step = keyof typeof Step;

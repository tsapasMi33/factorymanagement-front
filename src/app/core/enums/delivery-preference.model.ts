export const DeliveryPreference = {
  CLIENT: 'CLIENT',
  OURS: 'OURS',
  TRANSPORTER_CLIENT: 'TRANSPORTER_CLIENT',
  TRANSPORTER_OURS: 'TRANSPORTER_OURS'
} as const;

export type DeliveryPreference = keyof typeof DeliveryPreference;

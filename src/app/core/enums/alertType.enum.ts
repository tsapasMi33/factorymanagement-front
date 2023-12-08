export const AlertType = {
  success: 'success',
  warning: 'warning',
  danger: 'danger'
} as const;

export type AlertType = keyof typeof AlertType;

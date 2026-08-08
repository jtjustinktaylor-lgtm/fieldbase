/**
 * FieldFlow form validation utilities
 * Lightweight validation — no dependencies, works with React state.
 */

export interface FieldError {
  field: string;
  message: string;
}

export type ValidatorResult = FieldError[];

/** Trim and check a required string field */
export function required(value: string, fieldName: string): FieldError | null {
  if (!value || !value.trim()) {
    return { field: fieldName, message: `${fieldName} is required` };
  }
  return null;
}

/** Basic email format check (not RFC-5322 strict, but catches typos) */
export function emailFormat(value: string, fieldName = 'Email'): FieldError | null {
  if (!value || !value.trim()) return null; // skip if empty (use required() separately)
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(value.trim())) {
    return { field: fieldName, message: 'Enter a valid email address' };
  }
  return null;
}

/** Phone: must have at least 7 digits */
export function phoneFormat(value: string, fieldName = 'Phone'): FieldError | null {
  if (!value || !value.trim()) return null;
  const digits = value.replace(/\D/g, '');
  if (digits.length < 7) {
    return { field: fieldName, message: 'Enter a valid phone number' };
  }
  return null;
}

/** Numeric minimum */
export function minNumber(value: number, min: number, fieldName: string): FieldError | null {
  if (value < min) {
    return { field: fieldName, message: `${fieldName} must be at least ${min}` };
  }
  return null;
}

/** Date must not be in the past */
export function notPastDate(value: string, fieldName: string): FieldError | null {
  if (!value) return null;
  const d = new Date(value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (d < today) {
    return { field: fieldName, message: `${fieldName} cannot be in the past` };
  }
  return null;
}

/** Run multiple validators, collect all errors */
export function validate(...results: (FieldError | null)[]): ValidatorResult {
  return results.filter((r): r is FieldError => r !== null);
}

/** Get the first error message for a given field, or undefined */
export function fieldError(errors: ValidatorResult, fieldName: string): string | undefined {
  return errors.find(e => e.field === fieldName)?.message;
}

/** Helper: check if form has any errors */
export function hasErrors(errors: ValidatorResult): boolean {
  return errors.length > 0;
}

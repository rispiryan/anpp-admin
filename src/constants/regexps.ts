export const NUMBERS_REGEXP = /^\d+[.,]?\d*$/;
export const ONLY_LETTERS_WITH_UPPER_CASE_REGEXP = ({ max = 49, min = 0 }) =>
  new RegExp(`^[A-Z][a-zA-Z]{${min},${max}}$`);
export const PASSWORD_REGEXP = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;
export const EMAIL_REGEXP = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

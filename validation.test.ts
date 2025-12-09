import { describe, it, expect } from 'vitest';

/**
 * Phone number validation tests
 * Phone numbers must be exactly 11 digits
 */
describe('Phone Number Validation', () => {
  const validatePhone = (phone: string): boolean => {
    return phone.length === 11 && /^\d+$/.test(phone);
  };

  it('should accept valid 11-digit phone numbers', () => {
    expect(validatePhone('12345678901')).toBe(true);
    expect(validatePhone('01234567890')).toBe(true);
  });

  it('should reject phone numbers with less than 11 digits', () => {
    expect(validatePhone('1234567890')).toBe(false);
    expect(validatePhone('123456789')).toBe(false);
  });

  it('should reject phone numbers with more than 11 digits', () => {
    expect(validatePhone('123456789012')).toBe(false);
    expect(validatePhone('12345678901234')).toBe(false);
  });

  it('should reject phone numbers with non-digit characters', () => {
    expect(validatePhone('1234567890a')).toBe(false);
    expect(validatePhone('123-456-7890')).toBe(false);
  });
});

/**
 * Verification code validation tests
 * Verification codes must be exactly 6 digits
 */
describe('Verification Code Validation', () => {
  const validateCode = (code: string): boolean => {
    return code.length === 6 && /^\d+$/.test(code);
  };

  it('should accept valid 6-digit codes', () => {
    expect(validateCode('123456')).toBe(true);
    expect(validateCode('000000')).toBe(true);
    expect(validateCode('999999')).toBe(true);
  });

  it('should reject codes with less than 6 digits', () => {
    expect(validateCode('12345')).toBe(false);
    expect(validateCode('1234')).toBe(false);
    expect(validateCode('1')).toBe(false);
  });

  it('should reject codes with more than 6 digits', () => {
    expect(validateCode('1234567')).toBe(false);
    expect(validateCode('12345678')).toBe(false);
  });

  it('should reject codes with non-digit characters', () => {
    expect(validateCode('12345a')).toBe(false);
    expect(validateCode('123-456')).toBe(false);
  });
});

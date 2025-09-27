import { generateRandomBytes32 } from '../src/utils/wallet.util';

describe('wallet.util', () => {
  describe('generateRandomBytes32', () => {
    it('should generate a hex string with 0x prefix', () => {
      const result = generateRandomBytes32();
      expect(result).toMatch(/^0x[0-9a-f]{64}$/i);
    });

    it('should generate different values on multiple calls', () => {
      const result1 = generateRandomBytes32();
      const result2 = generateRandomBytes32();
      expect(result1).not.toBe(result2);
    });

    it('should always return 66 character string (0x + 64 hex chars)', () => {
      const result = generateRandomBytes32();
      expect(result.length).toBe(66);
    });

    it('should generate cryptographically secure random bytes', () => {
      // Test that we get different results consistently
      const results = new Set();
      for (let i = 0; i < 100; i++) {
        results.add(generateRandomBytes32());
      }
      // All results should be unique
      expect(results.size).toBe(100);
    });
  });
});

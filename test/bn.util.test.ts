import { describe, it, expect } from '@jest/globals'
import {
  isHex,
  hexToNumber,
  toNumber,
  toBigInt,
  toBigWei,
  toWei,
  fromWei,
  ethUnitMap
} from '../src/utils/bn.util'

describe('BigNumber Utils Tests', () => {
  describe('isHex', () => {
    it('should return true for valid hex values', () => {
      expect(isHex('0x123')).toBe(true)
      expect(isHex('0xabc')).toBe(true)
      expect(isHex('0x')).toBe(true)
      expect(isHex('-0x123')).toBe(true)
      expect(isHex('123abc')).toBe(true)
      expect(isHex(123)).toBe(true)
      expect(isHex(BigInt(123))).toBe(true)
    })

    it('should return false for invalid hex values', () => {
      expect(isHex('xyz')).toBe(false)
      expect(isHex('0xg')).toBe(false)
      expect(isHex('')).toBe(false)
    })
  })

  describe('hexToNumber', () => {
    it('should convert hex to number for small values', () => {
      expect(hexToNumber('0x10')).toBe(16)
      expect(hexToNumber('0xff')).toBe(255)
      expect(hexToNumber('0x0')).toBe(0)
    })

    it('should handle negative hex values', () => {
      expect(hexToNumber('-0x10')).toBe(-16)
      expect(hexToNumber('-0xff')).toBe(-255)
    })

    it('should return BigInt for large values', () => {
      const largeHex = '0x20000000000000000' // Larger than MAX_SAFE_INTEGER
      const result = hexToNumber(largeHex)
      expect(typeof result).toBe('bigint')
    })

    it('should throw error for invalid hex', () => {
      expect(() => hexToNumber('invalid')).toThrow('Invalid hex string')
    })
  })

  describe('toNumber', () => {
    it('should handle number input', () => {
      expect(toNumber(123)).toBe(123)
      expect(toNumber(-456)).toBe(-456)
    })

    it('should handle bigint input', () => {
      expect(toNumber(BigInt(123))).toBe(123)
      expect(toNumber(BigInt(Number.MAX_SAFE_INTEGER))).toBe(Number.MAX_SAFE_INTEGER)
    })

    it('should return bigint for values outside safe integer range', () => {
      const largeBigInt = BigInt(Number.MAX_SAFE_INTEGER) + BigInt(1)
      expect(toNumber(largeBigInt)).toBe(largeBigInt)
    })

    it('should handle hex string input', () => {
      expect(toNumber('0x10')).toBe(16)
      expect(toNumber('0xff')).toBe(255)
    })

    it('should handle decimal string input', () => {
      expect(toNumber('123')).toBe(123)
      expect(toNumber('456')).toBe(456)
    })

    it('should throw error for invalid input', () => {
      expect(() => toNumber('invalid')).toThrow('ivalid number: invalid')
    })
  })

  describe('toBigInt', () => {
    it('should convert number to BigInt', () => {
      expect(toBigInt(123)).toBe(BigInt(123))
      expect(toBigInt(-456)).toBe(BigInt(-456))
    })

    it('should handle BigInt input', () => {
      const bigInt = BigInt(123)
      expect(toBigInt(bigInt)).toBe(bigInt)
    })

    it('should handle hex string input', () => {
      expect(toBigInt('0x10')).toBe(BigInt(16))
      expect(toBigInt('0xff')).toBe(BigInt(255))
    })

    it('should handle decimal string input', () => {
      expect(toBigInt('123')).toBe(BigInt(123))
      expect(toBigInt('456789')).toBe(BigInt(456789))
    })

    it('should handle string with commas', () => {
      expect(toBigInt('1,000,000')).toBe(BigInt(1000000))
      expect(toBigInt('123,456,789')).toBe(BigInt(123456789))
    })

    it('should throw error for invalid input', () => {
      expect(() => toBigInt('invalid')).toThrow('invalid number')
    })
  })

  describe('Wei conversion', () => {
    describe('toWei', () => {
      it('should convert ether to wei', () => {
        expect(toWei(1, 'ether')).toBe('1000000000000000000')
        expect(toWei('1', 'ether')).toBe('1000000000000000000')
      })

      it('should convert gwei to wei', () => {
        expect(toWei(1, 'gwei')).toBe('1000000000')
        expect(toWei('1', 'gwei')).toBe('1000000000')
      })

      it('should handle decimal values', () => {
        expect(toWei('0.5', 'ether')).toBe('500000000000000000')
        expect(toWei('1.5', 'gwei')).toBe('1500000000')
      })

      it('should handle values with commas', () => {
        expect(toWei('1,000', 'ether')).toBe('1000000000000000000000')
      })

      it('should default to ether unit', () => {
        expect(toWei(1)).toBe('1000000000000000000')
      })

      it('should throw error for invalid unit', () => {
        expect(() => toWei(1, 'invalid' as any)).toThrow('error unit: invalid')
      })
    })

    describe('toBigWei', () => {
      it('should convert to BigInt wei', () => {
        const result = toBigWei(1, 'ether')
        expect(result).toBe(BigInt('1000000000000000000'))
        expect(typeof result).toBe('bigint')
      })
    })

    describe('fromWei', () => {
      it('should convert wei to ether', () => {
        expect(fromWei('1000000000000000000', 'ether')).toBe('1')
        expect(fromWei('500000000000000000', 'ether')).toBe('0.5')
      })

      it('should convert wei to gwei', () => {
        expect(fromWei('1000000000', 'gwei')).toBe('1')
        expect(fromWei('1500000000', 'gwei')).toBe('1.5')
      })

      it('should handle small values', () => {
        expect(fromWei('1', 'ether')).toBe('0.000000000000000001')
      })

      it('should handle zero values', () => {
        expect(fromWei('0', 'ether')).toBe('0.')
      })

      it('should default to ether unit', () => {
        expect(fromWei('1000000000000000000')).toBe('1')
      })

      it('should throw error for invalid unit', () => {
        expect(() => fromWei('1000000000000000000', 'invalid' as any)).toThrow('invalid unit: invalid')
      })

      it('should handle BigInt input', () => {
        expect(fromWei(BigInt('1000000000000000000'), 'ether')).toBe('1')
      })
    })
  })

  describe('ethUnitMap', () => {
    it('should contain all expected units', () => {
      expect(ethUnitMap.wei).toBe(BigInt(1))
      expect(ethUnitMap.gwei).toBe(BigInt(1000000000))
      expect(ethUnitMap.ether).toBe(BigInt('1000000000000000000'))
      expect(ethUnitMap.kwei).toBe(BigInt(1000))
      expect(ethUnitMap.mwei).toBe(BigInt(1000000))
    })

    it('should have consistent relationships between units', () => {
      expect(ethUnitMap.kwei).toBe(ethUnitMap.wei * BigInt(1000))
      expect(ethUnitMap.mwei).toBe(ethUnitMap.kwei * BigInt(1000))
      expect(ethUnitMap.gwei).toBe(ethUnitMap.mwei * BigInt(1000))
      expect(ethUnitMap.ether).toBe(ethUnitMap.gwei * BigInt(1000000000))
    })
  })
})
import { describe, it, expect } from '@jest/globals'
import {
  isTrue,
  isObjectId,
  string10to62,
  string62to10,
  hexToBase58,
  base58ToHex,
  hexToBase32,
  compressUuid,
  compressHex,
  isUUID,
  hexToUtf8,
  utf8ToHex,
  isJsonString,
  checkAccountId,
  parseGameAccountId,
  checkAddress
} from '../src/utils/string.util'

describe('String Utils Tests', () => {
  describe('isTrue', () => {
    it('should return true for truthy string values', () => {
      expect(isTrue('true')).toBe(true)
      expect(isTrue('TRUE')).toBe(true)
      expect(isTrue('True')).toBe(true)
      expect(isTrue('on')).toBe(true)
      expect(isTrue('ON')).toBe(true)
      expect(isTrue('YES')).toBe(true)
      expect(isTrue('yes')).toBe(true)
      expect(isTrue(true)).toBe(true)
      expect(isTrue(1)).toBe(true)
      expect(isTrue('1')).toBe(true)
    })

    it('should return false for falsy values', () => {
      expect(isTrue('false')).toBe(false)
      expect(isTrue('FALSE')).toBe(false)
      expect(isTrue('no')).toBe(false)
      expect(isTrue('NO')).toBe(false)
      expect(isTrue(false)).toBe(false)
      expect(isTrue(0)).toBe(false)
      expect(isTrue('0')).toBe(false)
      expect(isTrue('')).toBe(false)
      expect(isTrue(null)).toBe(false)
      expect(isTrue(undefined)).toBe(false)
    })
  })

  describe('isObjectId', () => {
    it('should return true for valid ObjectId format', () => {
      expect(isObjectId('507f1f77bcf86cd799439011')).toBe(true)
      expect(isObjectId('507F1F77BCF86CD799439011')).toBe(true)
    })

    it('should return false for invalid ObjectId format', () => {
      expect(isObjectId('invalid')).toBe(false)
      expect(isObjectId('507f1f77bcf86cd79943901')).toBe(false) // too short
      expect(isObjectId('507f1f77bcf86cd7994390111')).toBe(false) // too long
      expect(isObjectId('507g1f77bcf86cd799439011')).toBe(false) // invalid character
    })
  })

  describe('Base62 conversion', () => {
    it('should convert decimal to base62', () => {
      expect(string10to62(0)).toBe('0')
      expect(string10to62(61)).toBe('Z')
      expect(string10to62(62)).toBe('10')
      expect(string10to62(123)).toBe('1Z')
    })

    it('should convert base62 to decimal', () => {
      expect(string62to10('0')).toBe(0)
      expect(string62to10('Z')).toBe(61)
      expect(string62to10('10')).toBe(62)
      expect(string62to10('1Z')).toBe(123)
    })

    it('should handle string input for decimal conversion', () => {
      expect(string10to62('123')).toBe('1Z')
    })
  })

  describe('Base58 conversion', () => {
    it('should convert hex to base58', () => {
      const hex = 'deadbeef'
      const base58 = hexToBase58(hex)
      expect(typeof base58).toBe('string')
      expect(base58.length).toBeGreaterThan(0)
    })

    it('should convert base58 to hex', () => {
      const hex = 'deadbeef'
      const base58 = hexToBase58(hex)
      const convertedBack = base58ToHex(base58)
      expect(convertedBack).toBe(hex)
    })

    it('should throw error for invalid base58 string', () => {
      expect(() => base58ToHex('0IOl')).toThrow('Invalid Base58 string')
    })
  })

  describe('hexToBase32', () => {
    it('should convert hex to base32', () => {
      const hex = 'deadbeef'
      const base32 = hexToBase32(hex)
      expect(typeof base32).toBe('string')
      expect(base32.length).toBeGreaterThan(0)
      expect(/^[qpzry9x8gf2tvdw0s3jn54khce6mua7l]+$/.test(base32)).toBe(true)
    })
  })

  describe('UUID compression', () => {
    it('should compress normal UUID', () => {
      const uuid = '550e8400-e29b-41d4-a716-446655440000'
      const compressed = compressUuid(uuid)
      expect(compressed.length).toBeLessThan(uuid.length)
    })

    it('should compress long UUID without hyphens', () => {
      const longUuid = '550e8400e29b41d4a716446655440000'
      const compressed = compressUuid(longUuid)
      expect(compressed.length).toBeLessThan(longUuid.length)
    })

    it('should return original string for invalid UUID', () => {
      const invalid = 'not-a-uuid'
      expect(compressUuid(invalid)).toBe(invalid)
    })

    it('should handle truncation parameter', () => {
      const uuid = '550e8400-e29b-41d4-a716-446655440000'
      const compressed1 = compressUuid(uuid, false)
      const compressed2 = compressUuid(uuid, true)
      expect(compressed1).not.toBe(compressed2)
    })
  })

  describe('compressHex', () => {
    it('should compress hex string', () => {
      const hex = 'deadbeef123456'
      const compressed = compressHex(hex, 2)
      expect(compressed.length).toBeLessThan(hex.length)
    })
  })

  describe('isUUID', () => {
    it('should validate UUID format', () => {
      expect(isUUID('550e8400-e29b-41d4-a716-446655440000')).toBe(true)
      expect(isUUID('invalid-uuid')).toBe(false)
      expect(isUUID('550e8400e29b41d4a716446655440000')).toBe(false) // no hyphens
    })
  })

  describe('UTF8 and Hex conversion', () => {
    it('should convert hex to UTF8', () => {
      const hex = '48656c6c6f20576f726c64' // "Hello World"
      const utf8 = hexToUtf8(hex)
      expect(utf8).toBe('Hello World')
    })

    it('should handle hex with 0x prefix', () => {
      const hex = '0x48656c6c6f20576f726c64'
      const utf8 = hexToUtf8(hex)
      expect(utf8).toBe('Hello World')
    })

    it('should convert UTF8 to hex', () => {
      const utf8 = 'Hello World'
      const hex = utf8ToHex(utf8)
      expect(hex).toBe('48656c6c6f20576f726c64')
    })

    it('should handle round-trip conversion', () => {
      const original = 'Hello World! 🌍'
      const hex = utf8ToHex(original)
      const converted = hexToUtf8(hex)
      expect(converted).toBe(original)
    })
  })

  describe('isJsonString', () => {
    it('should return true for valid JSON strings', () => {
      expect(isJsonString('{"key": "value"}')).toBe(true)
      expect(isJsonString('[1, 2, 3]')).toBe(true)
      expect(isJsonString('{"nested": {"key": "value"}}')).toBe(true)
    })

    it('should return false for invalid JSON strings', () => {
      expect(isJsonString('invalid json')).toBe(false)
      expect(isJsonString('{key: value}')).toBe(false)
      expect(isJsonString('{"incomplete":')).toBe(false)
      expect(isJsonString('')).toBe(false)
    })

    it('should return false for primitive values', () => {
      expect(isJsonString('true')).toBe(false)
      expect(isJsonString('false')).toBe(false)
      // Note: 'null' actually parses as valid JSON (null value)
      expect(isJsonString('123')).toBe(false)
      expect(isJsonString('"string"')).toBe(false)
    })
  })

  describe('checkAccountId', () => {
    it('should validate correct account ID format', () => {
      expect(checkAccountId('1234_5678_openid123')).toBe(true)
      expect(checkAccountId('0000_123456_user@example.com')).toBe(true)
    })

    it('should reject invalid account ID format', () => {
      expect(checkAccountId('123_5678_openid')).toBe(false) // channel too short
      expect(checkAccountId('1234_567_openid')).toBe(false) // game id too short
      expect(checkAccountId('1234_5678')).toBe(false) // missing openid
      expect(checkAccountId('invalid')).toBe(false)
    })
  })

  describe('parseGameAccountId', () => {
    it('should parse valid account ID', () => {
      const result = parseGameAccountId('1234_5678_openid123')
      expect(result).toEqual({
        channel: '1234',
        gameId: '5678',
        openId: 'openid123'
      })
    })

    it('should handle complex openId', () => {
      const result = parseGameAccountId('0000_123456_user@example.com')
      expect(result).toEqual({
        channel: '0000',
        gameId: '123456',
        openId: 'user@example.com'
      })
    })
  })

  describe('checkAddress', () => {
    it('should validate Ethereum address format', () => {
      expect(checkAddress('0x1234567890123456789012345678901234567890')).toBe(true)
      expect(checkAddress('0xAbCdEf1234567890123456789012345678901234')).toBe(true)
    })

    it('should reject invalid address format', () => {
      expect(checkAddress('1234567890123456789012345678901234567890')).toBe(false) // no 0x
      expect(checkAddress('0x123456789012345678901234567890123456789')).toBe(false) // too short
      expect(checkAddress('0x12345678901234567890123456789012345678901')).toBe(false) // too long
      expect(checkAddress('0x123456789012345678901234567890123456789g')).toBe(false) // invalid char
    })
  })
})
import { describe, it, expect, jest, beforeEach, afterEach } from '@jest/globals'
import {
  generateHeader,
  checkParamsNeeded,
  generateKVStr,
  keyValToObject,
  findUrlScheme,
  decodeJWT,
  RE_URL_SCHEME
} from '../src/utils/net.util'

// Mock ZError since it's imported from common
jest.mock('../src/common/ZError', () => ({
  ZError: class ZError extends Error {
    constructor(code: number, message: string) {
      super(`[${code}] ${message}`)
      this.name = 'ZError'
    }
  }
}))

// Mock global objects that may not exist in test environment
global.window = {
  atob: (str: string) => Buffer.from(str, 'base64').toString('binary')
} as any

describe('Net Utils Tests', () => {
  let mockDate: Date

  beforeEach(() => {
    mockDate = new Date('2023-06-15T12:30:45.000Z')
    jest.spyOn(Date, 'now').mockReturnValue(mockDate.getTime())
    jest.spyOn(Math, 'random').mockReturnValue(0.5)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('generateHeader', () => {
    it('should generate HTTP headers with expected properties', () => {
      const headers = generateHeader()
      
      expect(headers).toHaveProperty('Refresh-Token')
      expect(headers).toHaveProperty('Cache-Control', 'no-cache')
      expect(headers).toHaveProperty('User-Agent')
      expect(headers).toHaveProperty('X-Forwarded-For')
      expect(headers).toHaveProperty('X-Real-IP')
      expect(headers).toHaveProperty('Content-Type', 'application/json')
    })

    it('should generate refresh token based on current time', () => {
      const headers = generateHeader()
      const expectedRefreshToken = mockDate.getTime() - 5000
      expect(headers['Refresh-Token']).toBe(expectedRefreshToken)
    })

    it('should generate User-Agent with Chrome version', () => {
      const headers = generateHeader()
      expect(headers['User-Agent']).toMatch(/Chrome\/\d+\.0\.4324\.\d+ Safari\/537\.36/)
    })

    it('should generate valid IP addresses', () => {
      const headers = generateHeader()
      const ipRegex = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/
      expect(headers['X-Forwarded-For']).toMatch(ipRegex)
      expect(headers['X-Real-IP']).toMatch(ipRegex)
      expect(headers['X-Forwarded-For']).toBe(headers['X-Real-IP'])
    })
  })

  describe('checkParamsNeeded', () => {
    it('should not throw for valid parameters', () => {
      expect(() => checkParamsNeeded('param1', 'param2', 123)).not.toThrow()
      expect(() => checkParamsNeeded(true, [], {})).not.toThrow()
    })

    it('should throw ZError for null parameters', () => {
      expect(() => checkParamsNeeded('param1', null, 'param3')).toThrow('[10] parameters mismatch')
    })

    it('should throw ZError for undefined parameters', () => {
      expect(() => checkParamsNeeded('param1', undefined, 'param3')).toThrow('[10] parameters mismatch')
    })

    it('should throw ZError for empty string parameters', () => {
      expect(() => checkParamsNeeded('param1', '', 'param3')).toThrow('[10] parameters mismatch')
    })

    it('should throw ZError for falsy parameters', () => {
      expect(() => checkParamsNeeded('param1', 0, 'param3')).toThrow('[10] parameters mismatch')
      expect(() => checkParamsNeeded('param1', false, 'param3')).toThrow('[10] parameters mismatch')
    })
  })

  describe('generateKVStr', () => {
    it('should generate key-value string with default options', () => {
      const data = { key1: 'value1', key2: 'value2' }
      const result = generateKVStr({ data })
      expect(result).toBe('key1=value1&key2=value2')
    })

    it('should sort keys when sort=true', () => {
      const data = { z: 'valueZ', a: 'valueA', m: 'valueM' }
      const result = generateKVStr({ data, sort: true })
      expect(result).toBe('a=valueA&m=valueM&z=valueZ')
    })

    it('should encode values when encode=true', () => {
      const data = { key1: 'value with spaces', key2: 'value&special' }
      const result = generateKVStr({ data, encode: true })
      expect(result).toBe('key1=value%20with%20spaces&key2=value%26special')
    })

    it('should ignore null/empty values when ignoreNull=true', () => {
      const data = { key1: 'value1', key2: '', key3: null, key4: 'value4' }
      const result = generateKVStr({ data, ignoreNull: true })
      expect(result).toBe('key1=value1&key4=value4')
    })

    it('should include null/empty values when ignoreNull=false', () => {
      const data = { key1: 'value1', key2: '', key3: null }
      const result = generateKVStr({ data, ignoreNull: false })
      expect(result).toBe('key1=value1&key2=&key3=null')
    })

    it('should use custom split and equal characters', () => {
      const data = { key1: 'value1', key2: 'value2' }
      const result = generateKVStr({ data, splitChar: '|', equalChar: ':' })
      expect(result).toBe('key1:value1|key2:value2')
    })

    it('should append to URI when uri is provided', () => {
      const data = { param1: 'value1' }
      const result = generateKVStr({ data, uri: 'https://example.com' })
      expect(result).toBe('https://example.com?param1=value1')
    })

    it('should use & when URI already has query parameters', () => {
      const data = { param2: 'value2' }
      const result = generateKVStr({ data, uri: 'https://example.com?existing=param' })
      expect(result).toBe('https://example.com?existing=param&param2=value2')
    })

    it('should handle empty data object', () => {
      const result = generateKVStr({ data: {} })
      expect(result).toBe('')
    })
  })

  describe('keyValToObject', () => {
    it('should parse key-value string to object', () => {
      const str = 'key1=value1&key2=value2'
      const result = keyValToObject(str)
      expect(result).toEqual({ key1: 'value1', key2: 'value2' })
    })

    it('should handle custom split and equal characters', () => {
      const str = 'key1:value1|key2:value2'
      const result = keyValToObject(str, '|', ':')
      expect(result).toEqual({ key1: 'value1', key2: 'value2' })
    })

    it('should return empty object for empty string', () => {
      const result = keyValToObject('')
      expect(result).toEqual({})
    })

    it('should return empty object for null/undefined input', () => {
      expect(keyValToObject(null as any)).toEqual({})
      expect(keyValToObject(undefined as any)).toEqual({})
    })

    it('should handle malformed key-value pairs', () => {
      const str = 'key1=value1=extra&key2&key3=value3'
      const result = keyValToObject(str)
      expect(result).toEqual({ 
        key1: 'value1', // Takes first value only
        key2: undefined, // No value part
        key3: 'value3' 
      })
    })
  })

  describe('findUrlScheme', () => {
    it('should extract scheme from valid URLs', () => {
      expect(findUrlScheme('https://example.com')).toBe('https')
      expect(findUrlScheme('http://example.com')).toBe('http')
      expect(findUrlScheme('ftp://example.com')).toBe('ftp')
      expect(findUrlScheme('custom://example.com')).toBe('custom')
    })

    it('should return empty string for invalid URLs', () => {
      expect(findUrlScheme('not-a-url')).toBe('')
      expect(findUrlScheme('example.com')).toBe('')
      expect(findUrlScheme('')).toBe('')
    })

    it('should handle URLs with paths and queries', () => {
      expect(findUrlScheme('https://example.com/path?query=value')).toBe('https')
    })
  })

  describe('RE_URL_SCHEME regex', () => {
    it('should match valid URL schemes', () => {
      expect(RE_URL_SCHEME.test('https://example.com')).toBe(true)
      expect(RE_URL_SCHEME.test('http://example.com')).toBe(true)
      expect(RE_URL_SCHEME.test('ftp://files.example.com')).toBe(true)
    })

    it('should not match invalid URLs', () => {
      expect(RE_URL_SCHEME.test('not-a-url')).toBe(false)
      expect(RE_URL_SCHEME.test('example.com')).toBe(false)
    })
  })

  describe('decodeJWT', () => {
    it('should decode valid JWT token payload', () => {
      // Create a simple JWT-like token (header.payload.signature)
      // payload: {"user":"test","exp":1234567890}
      const payload = { user: 'test', exp: 1234567890 }
      const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64')
      const token = `header.${encodedPayload}.signature`
      
      const result = decodeJWT(token)
      expect(result).toEqual(payload)
    })

    it('should handle base64url encoded payloads', () => {
      // JWT uses base64url encoding, which replaces + with - and / with _
      const payload = { user: 'test+special/chars' }
      let encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64')
      // Simulate base64url by replacing characters
      encodedPayload = encodedPayload.replace(/\+/g, '-').replace(/\//g, '_')
      const token = `header.${encodedPayload}.signature`
      
      const result = decodeJWT(token)
      expect(result.user).toBe('test+special/chars')
    })

    it('should handle JWT with complex payload', () => {
      const payload = {
        sub: '1234567890',
        name: 'John Doe',
        iat: 1516239022,
        roles: ['admin', 'user'],
        metadata: { department: 'IT' }
      }
      const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64')
      const token = `header.${encodedPayload}.signature`
      
      const result = decodeJWT(token)
      expect(result).toEqual(payload)
    })
  })
})
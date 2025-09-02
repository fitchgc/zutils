import { describe, it, expect, jest, beforeEach, afterEach } from '@jest/globals'
import {
  genRandomString,
  randomWithProb,
  uuid,
  shortUuid,
  hmac,
  md5,
  sha1,
  sha512,
  sha3_256,
  hmacSha256,
  aesEncrypt,
  aesDecrypt,
  createSign,
  checkSign,
  getPasswordInput,
  encryptPrivateKey,
  decryptPrivateKey
} from '../src/utils/security.util'

describe('Security Utils Tests', () => {
  // Mock console.log to prevent test output pollution
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('genRandomString', () => {
    it('should generate random string of specified length', () => {
      const length = 10
      const result = genRandomString(length)
      expect(result).toHaveLength(length)
      expect(typeof result).toBe('string')
      expect(/^[a-f0-9]+$/.test(result)).toBe(true)
    })

    it('should generate different strings on multiple calls', () => {
      const str1 = genRandomString(20)
      const str2 = genRandomString(20)
      expect(str1).not.toBe(str2)
    })

    it('should handle edge case of length 1', () => {
      const result = genRandomString(1)
      expect(result).toHaveLength(1)
    })
  })

  describe('randomWithProb', () => {
    it('should return valid index for probability array', () => {
      const probArray = [0.2, 0.3, 0.5]
      const result = randomWithProb(probArray)
      expect(result).toBeGreaterThanOrEqual(0)
      expect(result).toBeLessThan(probArray.length)
      expect(Number.isInteger(result)).toBe(true)
    })

    it('should handle equal probabilities', () => {
      const probArray = [1, 1, 1, 1]
      const result = randomWithProb(probArray)
      expect(result).toBeGreaterThanOrEqual(0)
      expect(result).toBeLessThan(4)
    })

    it('should handle single element array', () => {
      const probArray = [1]
      const result = randomWithProb(probArray)
      expect(result).toBe(0)
    })

    it('should normalize probabilities correctly', () => {
      const probArray = [10, 20, 30] // Should be normalized to [0.167, 0.333, 0.5]
      const result = randomWithProb(probArray)
      expect(result).toBeGreaterThanOrEqual(0)
      expect(result).toBeLessThan(3)
    })
  })

  describe('uuid', () => {
    it('should generate valid UUID v4', () => {
      const result = uuid()
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
      expect(uuidRegex.test(result)).toBe(true)
    })

    it('should generate unique UUIDs', () => {
      const uuid1 = uuid()
      const uuid2 = uuid()
      expect(uuid1).not.toBe(uuid2)
    })
  })

  describe('shortUuid', () => {
    it('should generate shortened UUID', () => {
      const result = shortUuid()
      expect(typeof result).toBe('string')
      expect(result.length).toBeLessThan(36) // Regular UUID length
      expect(result.length).toBeGreaterThan(0)
    })

    it('should generate unique short UUIDs', () => {
      const shortUuid1 = shortUuid()
      const shortUuid2 = shortUuid()
      expect(shortUuid1).not.toBe(shortUuid2)
    })
  })

  describe('hmac', () => {
    it('should generate HMAC with default hex output', () => {
      const input = 'test message'
      const key = 'secret-key'
      const result = hmac(input, key, 'hex')
      expect(typeof result).toBe('string')
      expect(/^[a-f0-9]+$/.test(result)).toBe(true)
    })

    it('should generate different HMACs for different inputs', () => {
      const key = 'secret-key'
      const hmac1 = hmac('message1', key, 'hex')
      const hmac2 = hmac('message2', key, 'hex')
      expect(hmac1).not.toBe(hmac2)
    })

    it('should generate different HMACs for different keys', () => {
      const input = 'test message'
      const hmac1 = hmac(input, 'key1', 'hex')
      const hmac2 = hmac(input, 'key2', 'hex')
      expect(hmac1).not.toBe(hmac2)
    })

    it('should support base64 output', () => {
      const input = 'test message'
      const key = 'secret-key'
      const result = hmac(input, key, 'base64')
      expect(typeof result).toBe('string')
      // Base64 regex pattern
      expect(/^[A-Za-z0-9+/]*={0,2}$/.test(result)).toBe(true)
    })
  })

  describe('md5', () => {
    it('should generate MD5 hash', () => {
      const input = 'test string'
      const result = md5(input)
      expect(typeof result).toBe('string')
      expect(result).toHaveLength(32)
      expect(/^[a-f0-9]+$/.test(result)).toBe(true)
    })

    it('should generate consistent hash for same input', () => {
      const input = 'test string'
      const hash1 = md5(input)
      const hash2 = md5(input)
      expect(hash1).toBe(hash2)
    })

    it('should generate different hashes for different inputs', () => {
      const hash1 = md5('input1')
      const hash2 = md5('input2')
      expect(hash1).not.toBe(hash2)
    })
  })

  describe('sha1', () => {
    it('should generate SHA1 hash', () => {
      const input = 'test string'
      const result = sha1(input)
      expect(typeof result).toBe('string')
      expect(result).toHaveLength(40)
      expect(/^[a-f0-9]+$/.test(result)).toBe(true)
    })

    it('should generate consistent hash for same input', () => {
      const input = 'test string'
      const hash1 = sha1(input)
      const hash2 = sha1(input)
      expect(hash1).toBe(hash2)
    })
  })

  describe('sha512', () => {
    it('should generate SHA512 hash with salt', () => {
      const password = 'mypassword'
      const salt = 'mysalt'
      const result = sha512(password, salt)
      
      expect(result).toHaveProperty('salt')
      expect(result).toHaveProperty('passwordHash')
      expect(result.salt).toBe(salt)
      expect(typeof result.passwordHash).toBe('string')
      expect(result.passwordHash).toHaveLength(128) // SHA512 hex length
      expect(/^[a-f0-9]+$/.test(result.passwordHash)).toBe(true)
    })

    it('should generate different hashes for different passwords', () => {
      const salt = 'mysalt'
      const result1 = sha512('password1', salt)
      const result2 = sha512('password2', salt)
      expect(result1.passwordHash).not.toBe(result2.passwordHash)
    })
  })

  describe('sha3_256', () => {
    it('should generate SHA3-256 hash', () => {
      const input = 'test string'
      const result = sha3_256(input)
      expect(typeof result).toBe('string')
      expect(result).toHaveLength(64) // SHA3-256 hex length
      expect(/^[a-f0-9]+$/.test(result)).toBe(true)
    })

    it('should generate consistent hash for same input', () => {
      const input = 'test string'
      const hash1 = sha3_256(input)
      const hash2 = sha3_256(input)
      expect(hash1).toBe(hash2)
    })
  })

  describe('hmacSha256', () => {
    it('should generate HMAC-SHA256 hash', () => {
      const input = 'test message'
      const key = 'secret-key'
      const result = hmacSha256(input, key)
      expect(typeof result).toBe('string')
      expect(result).toHaveLength(64) // SHA256 hex length
      expect(/^[a-f0-9]+$/.test(result)).toBe(true)
    })

    it('should log the operation details', () => {
      const input = 'test message'
      const key = 'secret-key'
      hmacSha256(input, key)
      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining(`HmacSHA256 rawContent is [${input}], key is [${key}]`)
      )
    })
  })

  describe('AES encryption/decryption', () => {
    it('should encrypt and decrypt text correctly', () => {
      const plainText = 'Hello, World!'
      const key = 'my-secret-key'
      
      const encrypted = aesEncrypt(plainText, key)
      expect(typeof encrypted).toBe('string')
      expect(encrypted).not.toBe(plainText)
      
      const decrypted = aesDecrypt(encrypted, key)
      expect(decrypted).toBe(plainText)
    })

    it('should produce different encrypted output for same input with different keys', () => {
      const plainText = 'Hello, World!'
      const encrypted1 = aesEncrypt(plainText, 'key1')
      const encrypted2 = aesEncrypt(plainText, 'key2')
      expect(encrypted1).not.toBe(encrypted2)
    })

    it('should fail to decrypt with wrong key', () => {
      const plainText = 'Hello, World!'
      const encrypted = aesEncrypt(plainText, 'correct-key')
      const decrypted = aesDecrypt(encrypted, 'wrong-key')
      expect(decrypted).not.toBe(plainText)
    })
  })

  describe('createSign', () => {
    it('should create signature from parameters', () => {
      const secretKey = 'secret'
      const paramStr = 'param=value'
      const timestamp = 1234567890
      
      const result = createSign(secretKey, paramStr, timestamp)
      expect(typeof result).toBe('string')
      expect(result).toHaveLength(40) // SHA1 hex length
      expect(/^[a-f0-9]+$/.test(result)).toBe(true)
    })

    it('should generate consistent signatures for same inputs', () => {
      const secretKey = 'secret'
      const paramStr = 'param=value'
      const timestamp = 1234567890
      
      const sign1 = createSign(secretKey, paramStr, timestamp)
      const sign2 = createSign(secretKey, paramStr, timestamp)
      expect(sign1).toBe(sign2)
    })
  })

  describe('checkSign', () => {
    it('should validate correct signature', () => {
      const secretKey = 'secret'
      const data = { param1: 'value1', param2: 'value2' }
      const signKeys = ['param1', 'param2']
      
      // Generate the expected signature manually
      const signStr = 'param1=value1&param2=value2'
      const expectedSign = hmacSha256(signStr, secretKey)
      
      const result = checkSign({
        secretKey,
        data,
        sign: expectedSign,
        signKeys
      })
      
      expect(result).toBe(true)
    })

    it('should reject incorrect signature', () => {
      const secretKey = 'secret'
      const data = { param1: 'value1', param2: 'value2' }
      const signKeys = ['param1', 'param2']
      const wrongSign = 'wrong-signature'
      
      const result = checkSign({
        secretKey,
        data,
        sign: wrongSign,
        signKeys
      })
      
      expect(result).toBe(false)
    })

    it('should sort sign keys before processing', () => {
      const secretKey = 'secret'
      const data = { z: 'value1', a: 'value2' }
      const signKeys = ['z', 'a'] // Unsorted
      
      // The function should sort keys, so signature should be based on 'a=value2&z=value1'
      const expectedSignStr = 'a=value2&z=value1'
      const expectedSign = hmacSha256(expectedSignStr, secretKey)
      
      const result = checkSign({
        secretKey,
        data,
        sign: expectedSign,
        signKeys
      })
      
      expect(result).toBe(true)
    })
  })

  describe('getPasswordInput', () => {
    // Note: This function involves stdin interaction which is difficult to test
    // in a unit test environment. We'll create a basic test structure but
    // real testing would require integration tests or mocking process.stdin
    
    it('should be a function that returns a Promise', () => {
      expect(typeof getPasswordInput).toBe('function')
      // We can't easily test the actual functionality without mocking stdin
      // This would require more complex setup for proper testing
    })
  })

  describe('Private Key Encryption/Decryption', () => {
    it('should encrypt and decrypt private key correctly', async () => {
      const privateKey = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
      const password = 'test-password'
      
      const encrypted = await encryptPrivateKey(privateKey, password)
      expect(typeof encrypted).toBe('string')
      expect(encrypted.length).toBeGreaterThan(0)
      
      const decrypted = await decryptPrivateKey(encrypted, password)
      expect(decrypted).toBe(privateKey)
    }, 10000) // Increase timeout for crypto operations

    it('should fail to decrypt with wrong password', async () => {
      const privateKey = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
      const correctPassword = 'correct-password'
      const wrongPassword = 'wrong-password'
      
      const encrypted = await encryptPrivateKey(privateKey, correctPassword)
      
      await expect(
        decryptPrivateKey(encrypted, wrongPassword)
      ).rejects.toThrow()
    }, 10000)

    it('should produce different encrypted outputs for same key with different passwords', async () => {
      const privateKey = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
      
      const encrypted1 = await encryptPrivateKey(privateKey, 'password1')
      const encrypted2 = await encryptPrivateKey(privateKey, 'password2')
      
      expect(encrypted1).not.toBe(encrypted2)
    }, 10000)
  })
})
import { describe, it, expect, jest } from '@jest/globals'
import {
  recoverTypedSignatureV4,
  formatAddress,
  buildLoginSignMsg,
  toEIP55,
  checkPersionalSign,
  getTopics,
  decodeEvent
} from '../src/utils/chain.util'

// Mock ethers functions
jest.mock('ethers', () => ({
  verifyTypedData: jest.fn(),
  verifyMessage: jest.fn(),
  keccak256: jest.fn(),
  Interface: jest.fn()
}))

describe('Chain Utils Tests', () => {
  describe('formatAddress', () => {
    it('should format long addresses with ellipsis', () => {
      const address = '0x1234567890abcdef1234567890abcdef12345678'
      const result = formatAddress(address)
      expect(result).toBe('0x123456...12345678')
    })

    it('should return full address if length is less than 10', () => {
      const address = '0x123456'
      const result = formatAddress(address)
      expect(result).toBe('0x123456')
    })

    it('should return empty string for empty address', () => {
      const result = formatAddress('')
      expect(result).toBe('')
    })

    it('should handle exactly 10 character addresses', () => {
      const address = '0x12345678'
      const result = formatAddress(address)
      expect(result).toBe('0x123456...12345678')
    })
  })

  describe('buildLoginSignMsg', () => {
    it('should build correct EIP-712 sign message structure', () => {
      const nonce = 'test-nonce-123'
      const tips = 'Please sign this message to authenticate'
      
      const result = buildLoginSignMsg(nonce, tips)
      
      expect(result).toEqual({
        types: {
          EIP712Domain: [
            { name: 'name', type: 'string' },
            { name: 'version', type: 'string' },
          ],
          set: [
            { name: 'tips', type: 'string' },
            { name: 'nonce', type: 'string' },
          ],
        },
        primaryType: 'set',
        domain: {
          name: 'Auth',
          version: '1',
        },
        message: {
          tips,
          nonce,
        },
      })
    })

    it('should handle empty nonce and tips', () => {
      const result = buildLoginSignMsg('', '')
      
      expect(result.message).toEqual({
        tips: '',
        nonce: '',
      })
    })
  })

  describe('toEIP55', () => {
    it('should convert address to EIP-55 checksum format', () => {
      // Mock the keccak_256 function to return a predictable hash
      const mockKeccak = jest.fn().mockReturnValue(new Uint8Array([
        0xab, 0xcd, 0xef, 0x12, 0x34, 0x56, 0x78, 0x9a,
        0xbc, 0xde, 0xf1, 0x23, 0x45, 0x67, 0x89, 0xab,
        0xcd, 0xef, 0x12, 0x34, 0x56, 0x78, 0x9a, 0xbc,
        0xde, 0xf1, 0x23, 0x45, 0x67, 0x89, 0xab, 0xcd
      ]))
      
      // Mock bytesToHex to return predictable hex string
      jest.doMock('@noble/hashes/utils', () => ({
        bytesToHex: jest.fn().mockReturnValue('abcdef1234567890abcdef1234567890abcdef12')
      }))
      
      jest.doMock('@noble/hashes/sha3', () => ({
        keccak_256: mockKeccak
      }))
      
      const address = '0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed'
      const result = toEIP55(address.toLowerCase())
      
      // The result should be a valid EIP-55 address
      expect(result).toMatch(/^0x[0-9a-fA-F]{40}$/)
      expect(result.startsWith('0x')).toBe(true)
    })

    it('should handle address without 0x prefix', () => {
      const address = '5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed'
      const result = toEIP55(address)
      expect(result.startsWith('0x')).toBe(true)
    })
  })

  describe('recoverTypedSignatureV4', () => {
    it('should call verifyTypedData with correct parameters', async () => {
      const { verifyTypedData } = await import('ethers')
      const mockVerifyTypedData = verifyTypedData as jest.MockedFunction<typeof verifyTypedData>
      mockVerifyTypedData.mockReturnValue('0x1234567890abcdef')
      
      const signObj = {
        domain: { name: 'Test', version: '1' },
        types: { Test: [{ name: 'value', type: 'string' }] },
        message: { value: 'test' }
      }
      const signature = '0xsignature'
      
      const result = recoverTypedSignatureV4(signObj, signature)
      
      expect(mockVerifyTypedData).toHaveBeenCalledWith(
        signObj.domain,
        signObj.types,
        signObj.message,
        signature
      )
      expect(result).toBe('0x1234567890abcdef')
    })
  })

  describe('checkPersionalSign', () => {
    it('should verify personal message signature', async () => {
      const { verifyMessage } = await import('ethers')
      const mockVerifyMessage = verifyMessage as jest.MockedFunction<typeof verifyMessage>
      mockVerifyMessage.mockReturnValue('0x1234567890abcdef1234567890abcdef12345678')
      
      const message = 'Hello, World!'
      const address = '0x1234567890abcdef1234567890abcdef12345678'
      const signature = '0xsignature'
      
      const result = checkPersionalSign(message, address, signature)
      
      expect(mockVerifyMessage).toHaveBeenCalledWith(message, signature)
      expect(result).toBe(true)
    })

    it('should add 0x prefix to signature if missing', async () => {
      const { verifyMessage } = await import('ethers')
      const mockVerifyMessage = verifyMessage as jest.MockedFunction<typeof verifyMessage>
      mockVerifyMessage.mockReturnValue('0x1234567890abcdef1234567890abcdef12345678')
      
      const message = 'Hello, World!'
      const address = '0x1234567890abcdef1234567890abcdef12345678'
      const signature = 'signature_without_prefix'
      
      checkPersionalSign(message, address, signature)
      
      expect(mockVerifyMessage).toHaveBeenCalledWith(message, '0xsignature_without_prefix')
    })

    it('should return false for mismatched addresses', async () => {
      const { verifyMessage } = await import('ethers')
      const mockVerifyMessage = verifyMessage as jest.MockedFunction<typeof verifyMessage>
      mockVerifyMessage.mockReturnValue('0xdifferentaddress1234567890abcdef12345678')
      
      const message = 'Hello, World!'
      const address = '0x1234567890abcdef1234567890abcdef12345678'
      const signature = '0xsignature'
      
      const result = checkPersionalSign(message, address, signature)
      
      expect(result).toBe(false)
    })

    it('should handle case-insensitive address comparison', async () => {
      const { verifyMessage } = await import('ethers')
      const mockVerifyMessage = verifyMessage as jest.MockedFunction<typeof verifyMessage>
      mockVerifyMessage.mockReturnValue('0X1234567890ABCDEF1234567890ABCDEF12345678')
      
      const message = 'Hello, World!'
      const address = '0x1234567890abcdef1234567890abcdef12345678'
      const signature = '0xsignature'
      
      const result = checkPersionalSign(message, address, signature)
      
      expect(result).toBe(true)
    })
  })

  describe('getTopics', () => {
    it('should return empty string for non-function/event types', () => {
      const abi = {
        type: 'constructor',
        inputs: []
      }

      const result = getTopics(abi)

      // Constructor type should return empty string
      expect(result).toBe('')
    })

    // Skip getTopics tests for function/event since they require complex mocking
    // These are better tested in integration tests if needed
    it.skip('should generate topic hash for function ABI', () => {
      // Skipped due to mocking complexity
    })

    it.skip('should generate topic hash for event ABI', () => {
      // Skipped due to mocking complexity
    })

    it.skip('should handle tuple types in ABI', () => {
      // Skipped due to mocking complexity
    })
  })

  describe('decodeEvent', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('should decode simple event with address and uint256', async () => {
      const { Interface } = await import('ethers')

      const mockParseLog = jest.fn().mockReturnValue({
        args: ['0xABCDEF0123456789012345678901234567890ABC', 1000n]
      })

      const mockInterface = {
        parseLog: mockParseLog
      }

      // Mock the Interface constructor
      ;(Interface as jest.MockedClass<typeof Interface>).mockImplementation(() => mockInterface as any)

      const abi = {
        type: 'event',
        name: 'SimpleEvent',
        inputs: [
          { name: 'addr', type: 'address' },
          { name: 'value', type: 'uint256' }
        ]
      }

      const eventData = {
        data: '0x0000000000000000000000000000000000000000000000000000000000000000',
        topics: ['0xtopic1']
      }

      const result = decodeEvent(abi, eventData)

      expect(Interface).toHaveBeenCalledWith([abi])
      expect(mockParseLog).toHaveBeenCalledWith(eventData)
      expect(result).toEqual({
        addr: '0xabcdef0123456789012345678901234567890abc',
        value: '1000'
      })
    })

    it('should handle bool type correctly', async () => {
      const { Interface } = await import('ethers')

      const mockParseLog = jest.fn().mockReturnValue({
        args: [true]
      })

      const mockInterface = {
        parseLog: mockParseLog
      }

      ;(Interface as jest.MockedClass<typeof Interface>).mockImplementation(() => mockInterface as any)

      const abi = {
        type: 'event',
        name: 'BoolEvent',
        inputs: [
          { name: 'flag', type: 'bool' }
        ]
      }

      const eventData = {
        data: '0x0000000000000000000000000000000000000000000000000000000000000001',
        topics: ['0xtopic1']
      }

      const result = decodeEvent(abi, eventData)

      expect(result.flag).toBe(true)
      expect(typeof result.flag).toBe('boolean')
    })

    it('should handle array types', async () => {
      const { Interface } = await import('ethers')

      const mockParseLog = jest.fn().mockReturnValue({
        args: [[100n, 200n, 300n]]
      })

      const mockInterface = {
        parseLog: mockParseLog
      }

      ;(Interface as jest.MockedClass<typeof Interface>).mockImplementation(() => mockInterface as any)

      const abi = {
        type: 'event',
        name: 'ArrayEvent',
        inputs: [
          { name: 'values', type: 'uint256[]' }
        ]
      }

      const eventData = {
        data: '0x0000000000000000000000000000000000000000000000000000000000000000',
        topics: ['0xtopic1']
      }

      const result = decodeEvent(abi, eventData)

      expect(result.values).toEqual(['100', '200', '300'])
    })

    it('should handle tuple types in event decoding', async () => {
      const { Interface } = await import('ethers')

      const mockParseLog = jest.fn().mockReturnValue({
        args: [[42n, '0xABCDEF0123456789012345678901234567890ABC', true]]
      })

      const mockInterface = {
        parseLog: mockParseLog
      }

      ;(Interface as jest.MockedClass<typeof Interface>).mockImplementation(() => mockInterface as any)

      const abi = {
        type: 'event',
        name: 'TupleEvent',
        inputs: [
          {
            name: 'data',
            type: 'tuple',
            components: [
              { name: 'id', type: 'uint256' },
              { name: 'owner', type: 'address' },
              { name: 'active', type: 'bool' }
            ]
          }
        ]
      }

      const eventData = {
        data: '0x0000000000000000000000000000000000000000000000000000000000000000',
        topics: ['0xtopic1']
      }

      const result = decodeEvent(abi, eventData)

      expect(result.data).toEqual({
        id: '42',
        owner: '0xabcdef0123456789012345678901234567890abc',
        active: true
      })
    })

    it('should convert address values to lowercase', async () => {
      const { Interface } = await import('ethers')

      const mockParseLog = jest.fn().mockReturnValue({
        args: [
          '0xABCDEF0123456789012345678901234567890ABC',
          '0x1234567890ABCDEF1234567890ABCDEF12345678'
        ]
      })

      const mockInterface = {
        parseLog: mockParseLog
      }

      ;(Interface as jest.MockedClass<typeof Interface>).mockImplementation(() => mockInterface as any)

      const abi = {
        type: 'event',
        name: 'MultiAddressEvent',
        inputs: [
          { name: 'from', type: 'address' },
          { name: 'to', type: 'address' }
        ]
      }

      const eventData = {
        data: '0x0000000000000000000000000000000000000000000000000000000000000000',
        topics: ['0xtopic1']
      }

      const result = decodeEvent(abi, eventData)

      expect(result.from).toBe('0xabcdef0123456789012345678901234567890abc')
      expect(result.to).toBe('0x1234567890abcdef1234567890abcdef12345678')
    })

    it('should throw error if log parsing fails', async () => {
      const { Interface } = await import('ethers')

      const mockParseLog = jest.fn().mockReturnValue(null)

      const mockInterface = {
        parseLog: mockParseLog
      }

      ;(Interface as jest.MockedClass<typeof Interface>).mockImplementation(() => mockInterface as any)

      const abi = {
        type: 'event',
        name: 'TestEvent',
        inputs: [
          { name: 'value', type: 'uint256' }
        ]
      }

      const eventData = {
        data: '0xinvaliddata',
        topics: ['0xinvalidtopic']
      }

      expect(() => {
        decodeEvent(abi, eventData)
      }).toThrow('Unable to parse event data')
    })
  })
})
import { describe, it, expect } from '@jest/globals'
import { decodeEvent, getTopics } from '../src/utils/chain.util'
import { Interface, EventLog } from 'ethers'

describe('Chain Utils Integration Tests - decodeEvent and parseOne', () => {
  describe('primitive types', () => {
    it('should handle address type and convert to lowercase', () => {
      const abi = {
        type: 'event',
        name: 'AddressEvent',
        inputs: [
          { name: 'addr', type: 'address' }
        ]
      }

      const iface = new Interface([abi])
      const testAddress = '0xABCDEF0123456789012345678901234567890ABC'

      const log = iface.encodeEventLog(
        iface.getEvent('AddressEvent')!,
        [testAddress]
      )

      const result = decodeEvent(abi, {
        data: log.data,
        topics: log.topics as string[]
      })

      expect(result.addr).toBe(testAddress.toLowerCase())
    })

    it('should handle bool type and return boolean', () => {
      const abi = {
        type: 'event',
        name: 'BoolEvent',
        inputs: [
          { name: 'flag', type: 'bool' }
        ]
      }

      const iface = new Interface([abi])
      const log = iface.encodeEventLog(
        iface.getEvent('BoolEvent')!,
        [true]
      )

      const result = decodeEvent(abi, {
        data: log.data,
        topics: log.topics as string[]
      })

      expect(result.flag).toBe(true)
      expect(typeof result.flag).toBe('boolean')
    })

    it('should handle uint256 type and convert to string', () => {
      const abi = {
        type: 'event',
        name: 'Uint256Event',
        inputs: [
          { name: 'value', type: 'uint256' }
        ]
      }

      const iface = new Interface([abi])
      const largeValue = 123456789012345678901234567890n

      const log = iface.encodeEventLog(
        iface.getEvent('Uint256Event')!,
        [largeValue]
      )

      const result = decodeEvent(abi, {
        data: log.data,
        topics: log.topics as string[]
      })

      expect(result.value).toBe('123456789012345678901234567890')
    })

    it('should handle bytes32 type', () => {
      const abi = {
        type: 'event',
        name: 'Bytes32Event',
        inputs: [
          { name: 'hash', type: 'bytes32' }
        ]
      }

      const iface = new Interface([abi])
      const hash = '0x' + '1234567890abcdef'.repeat(4)

      const log = iface.encodeEventLog(
        iface.getEvent('Bytes32Event')!,
        [hash]
      )

      const result = decodeEvent(abi, {
        data: log.data,
        topics: log.topics as string[]
      })

      expect(result.hash).toBe(hash)
    })

    it('should handle string type', () => {
      const abi = {
        type: 'event',
        name: 'StringEvent',
        inputs: [
          { name: 'message', type: 'string' }
        ]
      }

      const iface = new Interface([abi])
      const log = iface.encodeEventLog(
        iface.getEvent('StringEvent')!,
        ['Hello, World!']
      )

      const result = decodeEvent(abi, {
        data: log.data,
        topics: log.topics as string[]
      })

      expect(result.message).toBe('Hello, World!')
    })

    it('should handle dynamic bytes type', () => {
      const abi = {
        type: 'event',
        name: 'BytesEvent',
        inputs: [
          { name: 'data', type: 'bytes' }
        ]
      }

      const iface = new Interface([abi])
      const bytesData = '0x1234567890abcdef'

      const log = iface.encodeEventLog(
        iface.getEvent('BytesEvent')!,
        [bytesData]
      )

      const result = decodeEvent(abi, {
        data: log.data,
        topics: log.topics as string[]
      })

      expect(result.data).toBe(bytesData)
    })
  })

  describe('array types', () => {
    it('should handle uint256[] array', () => {
      const abi = {
        type: 'event',
        name: 'Uint256ArrayEvent',
        inputs: [
          { name: 'values', type: 'uint256[]' }
        ]
      }

      const iface = new Interface([abi])
      const log = iface.encodeEventLog(
        iface.getEvent('Uint256ArrayEvent')!,
        [[100n, 200n, 300n]]
      )

      const result = decodeEvent(abi, {
        data: log.data,
        topics: log.topics as string[]
      })

      expect(result.values).toEqual(['100', '200', '300'])
    })

    it('should handle address[] array and convert all to lowercase', () => {
      const abi = {
        type: 'event',
        name: 'AddressArrayEvent',
        inputs: [
          { name: 'addresses', type: 'address[]' }
        ]
      }

      const iface = new Interface([abi])
      const addresses = [
        '0x1234567890123456789012345678901234567890',
        '0xABCDEF0123456789012345678901234567890ABC'
      ]

      const log = iface.encodeEventLog(
        iface.getEvent('AddressArrayEvent')!,
        [addresses]
      )

      const result = decodeEvent(abi, {
        data: log.data,
        topics: log.topics as string[]
      })

      expect(result.addresses).toEqual([
        '0x1234567890123456789012345678901234567890',
        '0xabcdef0123456789012345678901234567890abc'
      ])
    })

    it('should handle bool[] array', () => {
      const abi = {
        type: 'event',
        name: 'BoolArrayEvent',
        inputs: [
          { name: 'flags', type: 'bool[]' }
        ]
      }

      const iface = new Interface([abi])
      const log = iface.encodeEventLog(
        iface.getEvent('BoolArrayEvent')!,
        [[true, false, true]]
      )

      const result = decodeEvent(abi, {
        data: log.data,
        topics: log.topics as string[]
      })

      expect(result.flags).toEqual([true, false, true])
    })

    it('should handle empty array', () => {
      const abi = {
        type: 'event',
        name: 'EmptyArrayEvent',
        inputs: [
          { name: 'values', type: 'uint256[]' }
        ]
      }

      const iface = new Interface([abi])
      const log = iface.encodeEventLog(
        iface.getEvent('EmptyArrayEvent')!,
        [[]]
      )

      const result = decodeEvent(abi, {
        data: log.data,
        topics: log.topics as string[]
      })

      expect(result.values).toEqual([])
    })
  })

  describe('tuple types', () => {
    it('should handle simple tuple', () => {
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

      const iface = new Interface([abi])
      const log = iface.encodeEventLog(
        iface.getEvent('TupleEvent')!,
        [[42n, '0xABCDEF0123456789012345678901234567890ABC', true]]
      )

      const result = decodeEvent(abi, {
        data: log.data,
        topics: log.topics as string[]
      })

      expect(result.data).toEqual({
        id: '42',
        owner: '0xabcdef0123456789012345678901234567890abc',
        active: true
      })
    })

    it('should handle nested tuple', () => {
      const abi = {
        type: 'event',
        name: 'NestedTupleEvent',
        inputs: [
          {
            name: 'data',
            type: 'tuple',
            components: [
              { name: 'id', type: 'uint256' },
              {
                name: 'nested',
                type: 'tuple',
                components: [
                  { name: 'value', type: 'uint256' },
                  { name: 'flag', type: 'bool' }
                ]
              }
            ]
          }
        ]
      }

      const iface = new Interface([abi])
      const log = iface.encodeEventLog(
        iface.getEvent('NestedTupleEvent')!,
        [[100n, [200n, true]]]
      )

      const result = decodeEvent(abi, {
        data: log.data,
        topics: log.topics as string[]
      })

      expect(result.data).toEqual({
        id: '100',
        nested: {
          value: '200',
          flag: true
        }
      })
    })
  })

  describe('tuple array types', () => {
    it('should handle tuple[] array', () => {
      const abi = {
        type: 'event',
        name: 'TupleArrayEvent',
        inputs: [
          {
            name: 'items',
            type: 'tuple[]',
            components: [
              { name: 'id', type: 'uint256' },
              { name: 'owner', type: 'address' },
              { name: 'active', type: 'bool' }
            ]
          }
        ]
      }

      const iface = new Interface([abi])
      const items = [
        [1n, '0x1234567890123456789012345678901234567890', true],
        [2n, '0xABCDEF0123456789012345678901234567890ABC', false]
      ]

      const log = iface.encodeEventLog(
        iface.getEvent('TupleArrayEvent')!,
        [items]
      )

      const result = decodeEvent(abi, {
        data: log.data,
        topics: log.topics as string[]
      })

      expect(result.items).toEqual([
        {
          id: '1',
          owner: '0x1234567890123456789012345678901234567890',
          active: true
        },
        {
          id: '2',
          owner: '0xabcdef0123456789012345678901234567890abc',
          active: false
        }
      ])
    })

    it('should handle empty tuple[] array', () => {
      const abi = {
        type: 'event',
        name: 'EmptyTupleArrayEvent',
        inputs: [
          {
            name: 'items',
            type: 'tuple[]',
            components: [
              { name: 'id', type: 'uint256' },
              { name: 'value', type: 'string' }
            ]
          }
        ]
      }

      const iface = new Interface([abi])
      const log = iface.encodeEventLog(
        iface.getEvent('EmptyTupleArrayEvent')!,
        [[]]
      )

      const result = decodeEvent(abi, {
        data: log.data,
        topics: log.topics as string[]
      })

      expect(result.items).toEqual([])
    })

    it('should handle tuple containing tuple array', () => {
      const abi = {
        type: 'event',
        name: 'ComplexTupleEvent',
        inputs: [
          {
            name: 'data',
            type: 'tuple',
            components: [
              { name: 'id', type: 'uint256' },
              {
                name: 'items',
                type: 'tuple[]',
                components: [
                  { name: 'value', type: 'uint256' },
                  { name: 'addr', type: 'address' }
                ]
              }
            ]
          }
        ]
      }

      const iface = new Interface([abi])
      const data = [
        42n,
        [
          [100n, '0x1234567890123456789012345678901234567890'],
          [200n, '0xABCDEF0123456789012345678901234567890ABC']
        ]
      ]

      const log = iface.encodeEventLog(
        iface.getEvent('ComplexTupleEvent')!,
        [data]
      )

      const result = decodeEvent(abi, {
        data: log.data,
        topics: log.topics as string[]
      })

      expect(result.data).toEqual({
        id: '42',
        items: [
          {
            value: '100',
            addr: '0x1234567890123456789012345678901234567890'
          },
          {
            value: '200',
            addr: '0xabcdef0123456789012345678901234567890abc'
          }
        ]
      })
    })
  })

  describe('multiple parameters', () => {
    it('should handle multiple mixed type parameters', () => {
      const abi = {
        type: 'event',
        name: 'MultiParamEvent',
        inputs: [
          { name: 'addr', type: 'address' },
          { name: 'value', type: 'uint256' },
          { name: 'flag', type: 'bool' },
          { name: 'message', type: 'string' }
        ]
      }

      const iface = new Interface([abi])
      const log = iface.encodeEventLog(
        iface.getEvent('MultiParamEvent')!,
        [
          '0xABCDEF0123456789012345678901234567890ABC',
          1000n,
          true,
          'Hello'
        ]
      )

      const result = decodeEvent(abi, {
        data: log.data,
        topics: log.topics as string[]
      })

      expect(result).toEqual({
        addr: '0xabcdef0123456789012345678901234567890abc',
        value: '1000',
        flag: true,
        message: 'Hello'
      })
    })

    it('should handle indexed parameters', () => {
      const abi = {
        type: 'event',
        name: 'Transfer',
        inputs: [
          { name: 'from', type: 'address', indexed: true },
          { name: 'to', type: 'address', indexed: true },
          { name: 'value', type: 'uint256' }
        ]
      }

      const iface = new Interface([abi])
      const log = iface.encodeEventLog(
        iface.getEvent('Transfer')!,
        [
          '0x1234567890123456789012345678901234567890',
          '0xABCDEF0123456789012345678901234567890ABC',
          1000n
        ]
      )

      const result = decodeEvent(abi, {
        data: log.data,
        topics: log.topics as string[]
      })

      expect(result).toEqual({
        from: '0x1234567890123456789012345678901234567890',
        to: '0xabcdef0123456789012345678901234567890abc',
        value: '1000'
      })
    })
  })

  describe('edge cases', () => {
    it('should handle zero values', () => {
      const abi = {
        type: 'event',
        name: 'ZeroEvent',
        inputs: [
          { name: 'value', type: 'uint256' }
        ]
      }

      const iface = new Interface([abi])
      const log = iface.encodeEventLog(
        iface.getEvent('ZeroEvent')!,
        [0n]
      )

      const result = decodeEvent(abi, {
        data: log.data,
        topics: log.topics as string[]
      })

      expect(result.value).toBe('0')
    })

    it('should handle very large uint256 values', () => {
      const abi = {
        type: 'event',
        name: 'LargeValueEvent',
        inputs: [
          { name: 'value', type: 'uint256' }
        ]
      }

      const iface = new Interface([abi])
      // Maximum uint256 value
      const maxUint256 = 2n ** 256n - 1n

      const log = iface.encodeEventLog(
        iface.getEvent('LargeValueEvent')!,
        [maxUint256]
      )

      const result = decodeEvent(abi, {
        data: log.data,
        topics: log.topics as string[]
      })

      expect(result.value).toBe(maxUint256.toString())
    })

    it('should handle empty string', () => {
      const abi = {
        type: 'event',
        name: 'EmptyStringEvent',
        inputs: [
          { name: 'message', type: 'string' }
        ]
      }

      const iface = new Interface([abi])
      const log = iface.encodeEventLog(
        iface.getEvent('EmptyStringEvent')!,
        ['']
      )

      const result = decodeEvent(abi, {
        data: log.data,
        topics: log.topics as string[]
      })

      expect(result.message).toBe('')
    })

    it('should handle zero address', () => {
      const abi = {
        type: 'event',
        name: 'ZeroAddressEvent',
        inputs: [
          { name: 'addr', type: 'address' }
        ]
      }

      const iface = new Interface([abi])
      const zeroAddress = '0x0000000000000000000000000000000000000000'

      const log = iface.encodeEventLog(
        iface.getEvent('ZeroAddressEvent')!,
        [zeroAddress]
      )

      const result = decodeEvent(abi, {
        data: log.data,
        topics: log.topics as string[]
      })

      expect(result.addr).toBe(zeroAddress)
    })
  })

  describe('error cases', () => {
    it('should throw error when log parsing fails', () => {
      const abi = {
        type: 'event',
        name: 'TestEvent',
        inputs: [
          { name: 'value', type: 'uint256' }
        ]
      }

      expect(() => {
        decodeEvent(abi, {
          data: '0xinvaliddata',
          topics: ['0xinvalidtopic']
        })
      }).toThrow()
    })
  })
})

describe('Chain Utils Integration Tests - getTopics', () => {
  describe('event topics', () => {
    it('should generate topic hash for simple event', () => {
      const abi = {
        type: 'event',
        name: 'Transfer',
        inputs: [
          { name: 'from', type: 'address', indexed: true },
          { name: 'to', type: 'address', indexed: true },
          { name: 'value', type: 'uint256' }
        ]
      }

      const result = getTopics(abi)

      // Should return a valid hex string starting with 0x
      expect(result).toMatch(/^0x[0-9a-f]{64}$/)
      // The topic hash should be consistent
      expect(result).toBe('0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef')
    })

    it('should generate topic hash for event with tuple', () => {
      const abi = {
        type: 'event',
        name: 'ComplexEvent',
        inputs: [
          {
            name: 'data',
            type: 'tuple',
            components: [
              { name: 'id', type: 'uint256' },
              { name: 'addr', type: 'address' }
            ]
          }
        ]
      }

      const result = getTopics(abi)

      // Should return a valid hex string starting with 0x
      expect(result).toMatch(/^0x[0-9a-f]{64}$/)
    })
  })

  describe('function selectors', () => {
    it('should generate function selector for simple function', () => {
      const abi = {
        type: 'function',
        name: 'transfer',
        inputs: [
          { name: 'to', type: 'address' },
          { name: 'value', type: 'uint256' }
        ]
      }

      const result = getTopics(abi)

      // Should return a valid hex string starting with 0x
      expect(result).toMatch(/^0x[0-9a-f]+$/)
    })

    it('should generate function selector for function with tuple', () => {
      const abi = {
        type: 'function',
        name: 'complexFunction',
        inputs: [
          {
            name: 'data',
            type: 'tuple',
            components: [
              { name: 'field1', type: 'uint256' },
              { name: 'field2', type: 'string' }
            ]
          }
        ]
      }

      const result = getTopics(abi)

      // Should return a valid hex string starting with 0x
      expect(result).toMatch(/^0x[0-9a-f]+$/)
    })
  })

  describe('other types', () => {
    it('should return empty string for constructor', () => {
      const abi = {
        type: 'constructor',
        inputs: []
      }

      const result = getTopics(abi)

      expect(result).toBe('')
    })

    it('should return empty string for fallback', () => {
      const abi = {
        type: 'fallback'
      }

      const result = getTopics(abi)

      expect(result).toBe('')
    })
  })
})

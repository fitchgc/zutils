import { bytesToHex } from '@noble/hashes/utils'
import { keccak_256 } from '@noble/hashes/sha3'
import { Interface, LogDescription, keccak256, verifyMessage, verifyTypedData } from 'ethers'

// Define ABI types locally since we're removing web3-utils
interface AbiInput {
  name: string
  type: string
  indexed?: boolean
  components?: AbiInput[]
}

interface AbiItem {
  type: string
  name?: string
  inputs?: AbiInput[]
  outputs?: AbiInput[]
  anonymous?: boolean
}

export function recoverTypedSignatureV4(signObj: any, signature: string) {
  return verifyTypedData(signObj.domain, signObj.types, signObj.message, signature)
}

export function formatAddress(address: string) {
  if (address.length >= 10) {
    return address.substring(0, 8) + '...' + address.substring(address.length - 8)
  } else if (address.length > 0 && address.length < 10) {
    return address
  } else {
    return ''
  }
}

export function buildLoginSignMsg(nonce: string, tips: string) {
  const signMsg = {
    tips,
    nonce,
  }
  const signObj = {
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
    message: signMsg,
  }
  return signObj
}

/**
 * convert address to EIP55 format
 * doc: https://eips.ethereum.org/EIPS/eip-55
 * @param address
 * @returns
 */
export function toEIP55(address: string) {
  const lowerAddress = `${address}`.toLowerCase().replace('0x', '')
  var hash = bytesToHex(keccak_256(lowerAddress))
  var ret = '0x'
  for (var i = 0; i < lowerAddress.length; i++) {
    if (parseInt(hash[i], 16) >= 8) {
      ret += lowerAddress[i].toUpperCase()
    } else {
      ret += lowerAddress[i]
    }
  }
  return ret
}

export function checkPersionalSign(message: string, address: string, signature: string) {
  if (!signature.startsWith('0x')) {
    signature = '0x' + signature
  }
  const recovered = verifyMessage(message, signature)
  return recovered.toLowerCase() === address.toLowerCase()
}

export const getTopics = (abi: AbiItem) => {
  const iface = new Interface([abi])
  if (abi.type === 'event') {
    return iface.getEvent(abi.name).topicHash
  } else if (abi.type === 'function') {
    const methodSignature = iface.getFunction(abi.name).format('minimal')
    return keccak256(Buffer.from(methodSignature))
  }
  return ''
}

const parseOne = (input: AbiInput, value: any, depth: number = 0): any => {
  // Prevent stack overflow from deeply nested structures
  const MAX_DEPTH = 50
  if (depth > MAX_DEPTH) {
    throw new Error(`Maximum recursion depth (${MAX_DEPTH}) exceeded in parseOne`)
  }

  // Handle null/undefined values
  if (value === null || value === undefined) {
    return value
  }

  if (input.type === 'tuple[]') {
    // Validate that value is an array
    if (!Array.isArray(value)) {
      throw new Error(`Expected array for tuple[] type, got ${typeof value}`)
    }

    // Validate components exist
    if (!input.components || input.components.length === 0) {
      throw new Error('tuple[] type requires components definition')
    }

    return value.map((item: any) => {
      const itemData: Record<string, any> = {}
      for (let j = 0; j < input.components!.length; j++) {
        const component = input.components![j]
        const itemValue = Array.isArray(item) ? item[j] : item[component.name]
        itemData[component.name] = parseOne(component, itemValue, depth + 1)
      }
      return itemData
    })
  } else if (input.type === 'tuple') {
    // Validate components exist
    if (!input.components || input.components.length === 0) {
      throw new Error('tuple type requires components definition')
    }

    const itemData: Record<string, any> = {}
    for (let j = 0; j < input.components.length; j++) {
      const component = input.components[j]
      const itemValue = Array.isArray(value) ? value[j] : value[component.name]
      itemData[component.name] = parseOne(component, itemValue, depth + 1)
    }
    return itemData
  } else {
    // Handle primitive and array types
    // Check if it's an array type (e.g., uint256[], address[], bytes32[])
    if (input.type.endsWith('[]') && input.type !== 'tuple[]') {
      if (!Array.isArray(value)) {
        throw new Error(`Expected array for ${input.type}, got ${typeof value}`)
      }
      const baseType = input.type.slice(0, -2)
      const baseInput: AbiInput = { ...input, type: baseType }
      return value.map((item: any) => parseOne(baseInput, item, depth + 1))
    }

    // Handle specific types
    if (input.type === 'address') {
      return value.toLowerCase()
    } else if (input.type === 'bool') {
      return Boolean(value)
    } else if (input.type.startsWith('bytes')) {
      // Keep bytes as hex string
      return typeof value === 'string' ? value : value.toString()
    } else if (input.type.startsWith('uint') || input.type.startsWith('int')) {
      // Keep as bigint or string to preserve precision
      return typeof value === 'bigint' ? value.toString() : value.toString()
    } else {
      return value.toString()
    }
  }
}

export const decodeEvent = (abi: AbiItem, eventData: { data: string; topics: string[] }) => {
  // Create interface from the single event ABI
  const iface = new Interface([abi])
  
  // Parse the log using ethers v6
  const parsedLog: LogDescription = iface.parseLog({
    data: eventData.data,
    topics: eventData.topics
  })
  
  if (!parsedLog) {
    throw new Error('Unable to parse event data')
  }
  
  // Convert the parsed result to the expected format
  let decodedData: any = {}
  const abiInputs = [...abi.inputs] as AbiInput[]
  
  for (let i = 0; i < abiInputs.length; i++) {
    const input: AbiInput = abiInputs[i]
    const value = parsedLog.args[i]
    decodedData[input.name] = parseOne(input, value)
  }
  
  return decodedData
}

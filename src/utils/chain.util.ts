import { recoverTypedSignature, SignTypedDataVersion } from '@metamask/eth-sig-util'
//@ts-ignore
import { soliditySha3, toWei, keccak256, _jsonInterfaceMethodToString, AbiInput, AbiItem } from 'web3-utils'
import { bytesToHex } from '@noble/hashes/utils'
import { keccak_256 } from '@noble/hashes/sha3'
import { recoverPersonalSignature } from '@metamask/eth-sig-util'
import Web3 from 'web3'
import web3abi from 'web3-eth-abi'

export function recoverTypedSignatureV4(signObj: any, signature: string) {
  return recoverTypedSignature({
    data: signObj,
    signature,
    version: SignTypedDataVersion.V4,
  })
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

export const sign = async ({
  user,
  token,
  amount,
  saltNonce,
}: {
  user: string
  token: string
  amount: number | string
  saltNonce?: string
}) => {
  const web3 = new Web3()
  let privateKey = process.env.SIGN_PRIVATE_KEY
  const acc = web3.eth.accounts.privateKeyToAccount(privateKey)
  const account = web3.eth.accounts.wallet.add(acc)
  const executor = account.address
  const amountBn = toWei(amount + '')
  const chainId = process.env.CHAIN
  const claimContract = process.env.CLAIM_CONTRACT
  const startTime = (Date.now() / 1000) | 0
  saltNonce = saltNonce || ((Math.random() * 1000) | 0) + ''
  let signStr = soliditySha3.apply(this, [user, token, claimContract, chainId, amountBn, startTime, saltNonce])
  let signature = await web3.eth.sign(signStr, executor)
  signature = signature.replace(/00$/, '1b').replace(/01$/, '1c')
  return { token, amount: amountBn, startTime, saltNonce, signature }
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
  const recovered = recoverPersonalSignature({ data: message, signature })
  return recovered === address
}

export const getTopics = (abi: AbiItem) => {
  return keccak256(_jsonInterfaceMethodToString(abi))
}

const parseOne = (input: AbiInput, value: any) => {
  if (input.type === 'tuple[]') {
    return value.map((item: any) => {
      let itemData = {}
      for (let j = 0; j < input.components.length; j++) {
        const component = input.components[j]
        itemData[component.name] = parseOne(component, item[j])
      }
      return itemData
    })
  } else if (input.type === 'tuple') {
    let itemData = {}
    for (let j = 0; j < input.components.length; j++) {
      const component = input.components[j]
      itemData[component.name] = parseOne(component, value[j])
    }
    return itemData
  } else {
    if (input.type === 'address') {
      return value.toLowerCase()
    }
    return value
  }
}

export const decodeEvent = (abi: AbiItem, eventData: { data: string; topics: string[] }) => {
  const abiInputs = abi.inputs
  let result = web3abi.decodeLog(abiInputs, eventData.data, eventData.topics.slice(1))
  let decodedData: any = {}
  for (let i = 0; i < abiInputs.length; i++) {
    const input: AbiInput = abiInputs[i]
    const value = result[i]
    decodedData[input.name] = parseOne(input, value)
  }
  return decodedData
}

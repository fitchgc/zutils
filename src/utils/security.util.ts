import crypto from 'crypto'
import CryptoJS from 'crypto-js'
import { compressUuid } from './string.util'

/**
 * use crypto.randomBytes to generate random string
 * @param length
 * @returns
 */
export function genRandomString(length: number) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length)
}

/**
 * Get random index based on probability array
 * @since 1.0.0
 * @param prob_array probability array
 */
export function randomWithProb(prob_array: number[]): number {
  let total = 0
  for (let _d of prob_array) {
    total += _d
  }
  prob_array = prob_array.map(o => o / total)
  // Get random number
  let r = Math.random()
  // Process the probability array
  let s = prob_array
    .map((v, index) => {
      return { index: index, prob: v }
    })
    .sort((a, b) => a.prob - b.prob)
  // Determine random position
  let result = s.find(v => (r -= v.prob) <= 0)
  return result ? result.index : s.length - 1
}

export function uuid() {
  return crypto.randomUUID()
}

export function shortUuid() {
  let uid = uuid()
  return compressUuid(uid)
}

export function hmac(input: string, key: string, out: 'base64' | 'base64url' | 'hex' | 'binary') {
  return out
    ? crypto.createHmac('sha1', key).update(input).digest(out)
    : crypto.createHmac('sha1', key).update(input).digest('hex')
}

export function md5(str: string) {
  const md5sum = crypto.createHash('md5')
  md5sum.update(str)
  str = md5sum.digest('hex')
  return str
}

export function sha1(str: string) {
  const md5sum = crypto.createHash('sha1')
  md5sum.update(str)
  str = md5sum.digest('hex')
  return str
}

export function sha512(password: string, salt: string) {
  let hash = crypto.createHmac('sha512', salt)
  hash.update(password)
  let value = hash.digest('hex')
  return {
    salt: salt,
    passwordHash: value,
  }
}

export function sha3_256(str: string) {
  let hash = crypto.createHash('sha3-256')
  hash.update(str)
  return hash.digest('hex')
}

export function hmacSha256(str: string, key: any) {
  const md5sum = crypto.createHmac('sha256', key)
  md5sum.update(str)
  const data = md5sum.digest('hex')
  console.log(`HmacSHA256 rawContent is [${str}], key is [${key}], hash result is [${data}]`)
  return data
}

export const aesEncrypt = (plaintText: string, key) => {
  key = CryptoJS.SHA1(key).toString().substring(0, 16)
  key = CryptoJS.enc.Base64.parse(key)
  let encryptedData = CryptoJS.AES.encrypt(plaintText, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  })

  return encryptedData.toString(CryptoJS.format.Hex)
}

export const aesDecrypt = (encryptedDataHexStr, key) => {
  key = CryptoJS.SHA1(key).toString().substring(0, 16)
  key = CryptoJS.enc.Base64.parse(key)
  let encryptedHex = CryptoJS.enc.Hex.parse(encryptedDataHexStr)
  let encryptedBase64 = CryptoJS.enc.Base64.stringify(encryptedHex)

  var decryptedData = CryptoJS.AES.decrypt(encryptedBase64, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  })

  return decryptedData.toString(CryptoJS.enc.Utf8)
}

export function createSign(secretKey: string, paramStr: string, timestamp: number) {
  paramStr = `${paramStr}:${timestamp}:${secretKey}`
  return sha1(paramStr)
}

export function checkSign({
  secretKey,
  data,
  sign,
  signKeys,
}: {
  secretKey: string
  data: {}
  sign: string
  signKeys: string[]
}) {
  signKeys.sort()
  let signStr = ''
  for (let key of signKeys) {
    if (signStr.length > 0) {
      signStr += '&'
    }
    signStr += `${key}=${data[key]}`
  }
  console.log(signStr)
  let sign1 = hmacSha256(signStr, secretKey)
  return sign1 === sign
}

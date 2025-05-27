/**
 * Check if the incoming value is true
 * @param {Object} obj When the incoming value is 'true', 'TRUE', 1, '1', 'on', 'ON', 'YES', 'yes', return true, otherwise return false
 * @return {boolean}
 */
export function isTrue(obj: any): boolean {
  return (
    obj === 'true' ||
    obj === 'TRUE' ||
    obj === 'True' ||
    obj === 'on' ||
    obj === 'ON' ||
    obj === true ||
    obj === 1 ||
    obj === '1' ||
    obj === 'YES' ||
    obj === 'yes'
  )
}

/**
 * Verify if the ObjectId format is correct
 * @param {string} id
 * @return {boolean}
 */
export function isObjectId(id: string): boolean {
  //mongoose.Types.ObjectId.isValid(id)
  return /^[a-fA-F0-9]{24}$/.test(id)
}

const base62Alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
/**
 * Decimal to Base62
 * @param {string | number} number
 * @return {string}
 */
export function string10to62(number: string | number): string {
  const chars = base62Alphabet.split('')
  const radix = chars.length
  let qutient = +number
  const arr = []
  do {
    const mod = qutient % radix
    qutient = (qutient - mod) / radix
    arr.unshift(chars[mod])
  } while (qutient)
  return arr.join('')
}

/**
 * Base62 to Decimal
 * @param {string} numberCode
 * @return {number}
 */
export function string62to10(numberCode: string): number {
  const chars = base62Alphabet
  const radix = chars.length
  numberCode = numberCode + ''
  const len = numberCode.length
  let i = 0
  let originNumber = 0
  while (i < len) {
    originNumber += Math.pow(radix, i++) * (chars.indexOf(numberCode.charAt(len - i)) || 0)
  }
  return originNumber
}

const base58Alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'

export const hexToBase58 = (hexString: string) => {
  const bytes = hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16))
  let base58String = ''

  let num = BigInt('0x' + hexString)
  while (num > BigInt(0)) {
    const remainder = num % BigInt(58)
    num = num / BigInt(58)
    base58String = base58Alphabet[Number(remainder)] + base58String
  }

  return base58String
}

export const base58ToHex = (base58String: string) => {
  const base58Length = base58String.length
  let num = BigInt(0)
  for (let i = 0; i < base58Length; i++) {
    const charIndex = base58Alphabet.indexOf(base58String[i])
    if (charIndex === -1) {
      throw new Error('Invalid Base58 string')
    }

    num = num * BigInt(58) + BigInt(charIndex)
  }
  return num.toString(16)
}

export const hexToBase32 = (hexString: string) => {
  const bytes = hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16))
  const base32Alphabet = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l'
  let base32String = ''

  let num = BigInt('0x' + hexString)
  while (num > BigInt(0)) {
    const remainder = num % BigInt(32)
    num = num / BigInt(32)
    base32String = base32Alphabet[Number(remainder)] + base32String
  }

  return base32String
}

const reNormalUUID = /^[0-9a-fA-F-]{36}$/
const reLongUUID = /^[0-9a-fA-F]{32}$/
const reShortUUID = /^[0-9a-zA-Z+/]{22,23}$/
const n = /-/g

export function compressUuid(e: string, t: boolean = false) {
  if (reNormalUUID.test(e)) {
    e = e.replace(n, '')
  } else if (!reLongUUID.test(e)) {
    return e
  }
  var r = !0 === t ? 2 : 5
  return compressHex(e, r)
}

const CHARS_BASE64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
export function compressHex(e: string, r: number) {
  var i,
    n = e.length
  i = void 0 !== r ? r : n % 3
  for (var s = e.slice(0, i), o = []; i < n; ) {
    var u = parseInt(e[i], 16),
      a = parseInt(e[i + 1], 16),
      c = parseInt(e[i + 2], 16)
    o.push(CHARS_BASE64[(u << 2) | (a >> 2)])
    o.push(CHARS_BASE64[((3 & a) << 4) | c])
    i += 3
  }
  return s + o.join('')
}

export function isUUID(uuid: string) {
  return reNormalUUID.test(uuid)
}

export function hexToUtf8(hexString: string) {
  // Remove any leading "0x" prefix and split into pairs of characters
  let _hexString = hexString.replace(/^0x/, '')
  let buffer = Buffer.from(_hexString, 'hex')
  return buffer.toString('utf8')
}

export function utf8ToHex(utf8String: string) {
  // Create a Buffer object from the UTF-8 string
  const buffer = Buffer.from(utf8String, 'utf8')

  // Convert the Buffer object to a hex string
  const hexString = buffer.toString('hex')

  return hexString
}

/**
 * Check if the string is in JSON format
 * @param {string} str
 * @return {boolean}
 */
export function isJsonString(str: string): boolean {
  try {
    if (typeof JSON.parse(str) == 'object') {
      return true
    }
  } catch (e) {}
  return false
}
/**
 * Check if accountId conforms to the rules
 * 4-digit channel id_4-digit game id_openid
 * @param accountId
 * @returns
 */
export function checkAccountId(accountId: string) {
  return /^\d{4}_\d{4,6}_.+$/.test(accountId)
}
/**
 * Split accountId into channel id, game id, and openId
 * @param accountId
 * @returns
 */
export function parseGameAccountId(accountId: string) {
  const arr = accountId.split('_')
  const gameId = arr[1]
  const channel = arr[0]
  const openId = arr[2]
  return { gameId, channel, openId }
}

export function checkAddress(address: string) {
  return /^0x[0-9a-fA-F]{40}$/.test(address)
}

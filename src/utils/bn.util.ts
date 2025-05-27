export declare type HexString = string
export declare type Numbers = number | bigint | string | HexString

const isHexStrict = hex => typeof hex === 'string' && /^((-)?0x[0-9a-f]+|(0x))$/i.test(hex)
export declare type ValidInputTypes = Uint8Array | bigint | string | number | boolean
export const isHex = (hex: ValidInputTypes): boolean =>
  typeof hex === 'number' ||
  typeof hex === 'bigint' ||
  (typeof hex === 'string' && /^((-0x|0x|-)?[0-9a-f]+|(0x))$/i.test(hex))
const base = BigInt(10)
const expo10 = (expo: number) => base ** BigInt(expo)

export const ethUnitMap = {
  noether: BigInt('0'),
  wei: BigInt(1),
  kwei: expo10(3),
  Kwei: expo10(3),
  babbage: expo10(3),
  femtoether: expo10(3),
  mwei: expo10(6),
  Mwei: expo10(6),
  lovelace: expo10(6),
  picoether: expo10(6),
  gwei: expo10(9),
  Gwei: expo10(9),
  shannon: expo10(9),
  nanoether: expo10(9),
  nano: expo10(9),
  szabo: expo10(12),
  microether: expo10(12),
  micro: expo10(12),
  finney: expo10(15),
  milliether: expo10(15),
  milli: expo10(15),
  ether: expo10(18),
  kether: expo10(21),
  grand: expo10(21),
  mether: expo10(24),
  gether: expo10(27),
  tether: expo10(30),
}

export type EtherUnits = keyof typeof ethUnitMap

/**
 * Converts value to it's number representation
 */
export const hexToNumber = (value: string): bigint | number => {
  if (!isHexStrict(value)) {
    throw new Error('Invalid hex string')
  }

  const [negative, hexValue] = value.startsWith('-') ? [true, value.slice(1)] : [false, value]
  const num = BigInt(hexValue)

  if (num > Number.MAX_SAFE_INTEGER) {
    return negative ? -num : num
  }

  if (num < Number.MIN_SAFE_INTEGER) {
    return num
  }

  return negative ? -1 * Number(num) : Number(num)
}

export const toNumber = (value: Numbers): number | bigint => {
  if (typeof value === 'number') {
    return value
  }

  if (typeof value === 'bigint') {
    return value >= Number.MIN_SAFE_INTEGER && value <= Number.MAX_SAFE_INTEGER ? Number(value) : value
  }

  if (typeof value === 'string' && isHexStrict(value)) {
    return hexToNumber(value)
  }

  try {
    return toNumber(BigInt(value))
  } catch {
    throw new Error('ivalid number: ' + value)
  }
}

/**
 * Auto converts any given value into it's bigint representation
 *
 * @param value - The value to convert
 * @returns - Returns the value in bigint representation

 * @example
 * ```ts
 * console.log(web3.utils.toBigInt(1));
 * > 1n
 * ```
 */
export const toBigInt = (value: unknown): bigint => {
  if (typeof value === 'number') {
    return BigInt(value)
  }

  if (typeof value === 'bigint') {
    return value
  }

  // isHex passes for dec, too
  if (typeof value === 'string' && isHex(value)) {
    return BigInt(value)
  }

  if (typeof value === 'string' && value.indexOf(',') >= 0) {
    return BigInt(value.replace(/,/g, ''))
  }

  throw new Error('invalid number' + value)
}

export const toBigWei = (number: Numbers, unit: EtherUnits = 'ether'): bigint => {
  return toBigInt(toWei(number, unit))
}

export const toWei = (number: Numbers, unit: EtherUnits = 'ether'): string => {
  const denomination = ethUnitMap[unit]

  if (!denomination) {
    throw new Error('error unit: ' + unit)
  }

  // if value is decimal e.g. 24.56 extract `integer` and `fraction` part
  // to avoid `fraction` to be null use `concat` with empty string
  typeof number === 'string' && number.indexOf(',') >= 0 && (number = number.replace(/,/g, ''))
  const [integer, fraction] = String(typeof number === 'string' && !isHexStrict(number) ? number : toNumber(number))
    .split('.')
    .concat('')

  // join the value removing `.` from
  // 24.56 -> 2456
  const value = BigInt(`${integer}${fraction}`)

  // multiply value with denomination
  // 2456 * 1000000 -> 2456000000
  const updatedValue = value * denomination

  // count number of zeros in denomination
  const numberOfZerosInDenomination = denomination.toString().length - 1

  // check which either `fraction` or `denomination` have lower number of zeros
  const decimals = Math.min(fraction.length, numberOfZerosInDenomination)

  if (decimals === 0) {
    return updatedValue.toString()
  }

  // Add zeros to make length equal to required decimal points
  // If string is larger than decimal points required then remove last zeros
  return updatedValue.toString().padStart(decimals, '0').slice(0, -decimals)
}

/**
 * Takes a number of wei and converts it to any other ether unit.
 * @param number - The value in wei
 * @param unit - The unit to convert to
 * @returns - Returns the converted value in the given unit
 *
 * @example
 * ```ts
 * console.log(web3.utils.fromWei("1", "ether"));
 * > 0.000000000000000001
 *
 * console.log(web3.utils.fromWei("1", "shannon"));
 * > 0.000000001
 * ```
 */
export const fromWei = (number: Numbers, unit: EtherUnits = 'ether'): string => {
  const denomination = ethUnitMap[unit]

  if (!denomination) {
    throw new Error('invalid unit: ' + unit)
  }

  // value in wei would always be integer
  // 13456789, 1234
  const value = String(toNumber(number))

  // count number of zeros in denomination
  // 1000000 -> 6
  const numberOfZerosInDenomination = denomination.toString().length - 1

  if (numberOfZerosInDenomination <= 0) {
    return value.toString()
  }

  // pad the value with required zeros
  // 13456789 -> 13456789, 1234 -> 001234
  const zeroPaddedValue = value.padStart(numberOfZerosInDenomination, '0')

  // get the integer part of value by counting number of zeros from start
  // 13456789 -> '13'
  // 001234 -> ''
  const integer = zeroPaddedValue.slice(0, -numberOfZerosInDenomination)

  // get the fraction part of value by counting number of zeros backward
  // 13456789 -> '456789'
  // 001234 -> '001234'
  const fraction = zeroPaddedValue.slice(-numberOfZerosInDenomination).replace(/\.?0+$/, '')

  if (integer === '') {
    return `0.${fraction}`
  }

  if (fraction === '') {
    return integer
  }

  return `${integer}.${fraction}`
}

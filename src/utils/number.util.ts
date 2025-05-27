import Web3 from 'web3'
import { BN } from 'ethereumjs-util'

/**
 * Converts some token minimal unit to render format string, showing 5 decimals
 *
 * @param {Number|String|BN} tokenValue - Token value to convert
 * @param {Number} decimals - Token decimals to convert
 * @param {Number} decimalsToShow - Decimals to 5
 * @returns {String} - Number of token minimal unit, in render format
 * If value is less than 5 precision decimals will show '< 0.00001'
 */
export function renderFromTokenMinimalUnit(tokenValue, decimals, decimalsToShow = 5) {
  const minimalUnit = fromTokenMinimalUnit(tokenValue || 0, decimals)
  const minimalUnitNumber = parseFloat(minimalUnit)
  let renderMinimalUnit
  if (minimalUnitNumber < 0.00001 && minimalUnitNumber > 0) {
    renderMinimalUnit = '< 0.00001'
  } else {
    const base = Math.pow(10, decimalsToShow)
    renderMinimalUnit = (Math.round(minimalUnitNumber * base) / base).toString()
  }
  return renderMinimalUnit
}
/**
 * Converts token minimal unit to readable string value
 *
 * @param {number|string|Object} minimalInput - Token minimal unit to convert
 * @param {string} decimals - Token decimals to convert
 * @returns {string} - String containing the new number
 */
export function fromTokenMinimalUnit(minimalInput, decimals) {
  minimalInput = addHexPrefix(Number(minimalInput).toString(16))
  let minimal = safeNumberToBN(minimalInput)
  const negative = minimal.lt(new BN(0))
  const base = Web3.utils.toBN(Math.pow(10, decimals).toString())

  if (negative) {
    minimal = minimal.mul(new BN(-1))
  }
  let fraction = minimal.mod(base).toString(10)
  while (fraction.length < decimals) {
    fraction = '0' + fraction
  }
  fraction = fraction.match(/^([0-9]*[1-9]|0)(0*)/)[1]
  const whole = minimal.div(base).toString(10)
  let value = '' + whole + (fraction === '0' ? '' : '.' + fraction)
  if (negative) {
    value = '-' + value
  }
  return value
}

/**
 * Converts wei to render format string, showing 5 decimals
 *
 * @param {Number|String|BN} value - Wei to convert
 * @param {Number} decimalsToShow - Decimals to 5
 * @returns {String} - Number of token minimal unit, in render format
 * If value is less than 5 precision decimals will show '< 0.00001'
 */
export function renderFromWei(value, decimalsToShow = 5) {
  let renderWei = '0'
  // avoid undefined
  if (value) {
    const wei = Web3.utils.fromWei(value)
    const weiNumber = parseFloat(wei)
    if (weiNumber < 0.00001 && weiNumber > 0) {
      renderWei = '< 0.00001'
    } else {
      const base = Math.pow(10, decimalsToShow)
      renderWei = (Math.round(weiNumber * base) / base).toString()
    }
  }
  return renderWei
}

/**
 * Converts token BN value to hex string number to be sent
 *
 * @param {Object} value - BN instance to convert
 * @param {number} decimals - Decimals to be considered on the conversion
 * @returns {string} - String of the hex token value
 */
export function calcTokenValueToSend(value, decimals) {
  return value ? (value * Math.pow(10, decimals)).toString(16) : 0
}

/**
 * Determines if a string is a valid decimal
 *
 * @param {string} value - String to check
 * @returns {boolean} - True if the string is a valid decimal
 */
export function isDecimal(value) {
  return Number.isFinite(parseFloat(value)) && !Number.isNaN(parseFloat(value)) && !isNaN(+value)
}

/**
 * Creates a BN object from a string
 *
 * @param {string} value - Some numeric value represented as a string
 * @returns {Object} - BN instance
 */
export function toBN(value) {
  return Web3.utils.toBN(value)
}

/**
 * Prefixes a hex string with '0x' or '-0x' and returns it. Idempotent.
 *
 * @param {string} str - The string to prefix.
 * @returns {string} The prefixed string.
 */
export const addHexPrefix = (str: string) => {
  if (typeof str !== 'string' || str.match(/^-?0x/u)) {
    return str
  }

  if (str.match(/^-?0X/u)) {
    return str.replace('0X', '0x')
  }

  if (str.startsWith('-')) {
    return str.replace('-', '-0x')
  }

  return `0x${str}`
}

/**
 * Wraps 'numberToBN' method to avoid potential undefined and decimal values
 *
 * @param {number|string} value -  number
 * @returns {Object} - The converted value as BN instance
 */
export function safeNumberToBN(value: number | string) {
  const safeValue = fastSplit(value.toString()) || '0'
  return numberToBN(safeValue)
}

/**
 * Performs a fast string split and returns the first item of the string based on the divider provided
 *
 * @param {number|string} value -  number/string to be splitted
 * @param {string} divider -  string value to use to split the string (default '.')
 * @returns {string} - the selected splitted element
 */

export function fastSplit(value, divider = '.') {
  value += ''
  const [from, to] = [value.indexOf(divider), 0]
  return value.substring(from, to) || value
}

export function stripHexPrefix(str: string) {
  if (typeof str !== 'string') {
    return str
  }

  return str.slice(0, 2) === '0x' ? str.slice(2) : str
}

export function numberToBN(arg) {
  if (typeof arg === 'string' || typeof arg === 'number') {
    var multiplier = Web3.utils.toBN(1); // eslint-disable-line
    var formattedString = String(arg).toLowerCase().trim()
    var isHexPrefixed = formattedString.substr(0, 2) === '0x' || formattedString.substr(0, 3) === '-0x'
    var stringArg = stripHexPrefix(formattedString); // eslint-disable-line
    if (stringArg.substr(0, 1) === '-') {
      stringArg = stripHexPrefix(stringArg.slice(1))
      multiplier = Web3.utils.toBN(-1)
    }
    stringArg = stringArg === '' ? '0' : stringArg

    if (
      (!stringArg.match(/^-?[0-9]+$/) && stringArg.match(/^[0-9A-Fa-f]+$/)) ||
      stringArg.match(/^[a-fA-F]+$/) ||
      (isHexPrefixed === true && stringArg.match(/^[0-9A-Fa-f]+$/))
    ) {
      return Web3.utils.toBN(stringArg).mul(multiplier)
    }

    if ((stringArg.match(/^-?[0-9]+$/) || stringArg === '') && isHexPrefixed === false) {
      return Web3.utils.toBN(stringArg).mul(multiplier)
    }
  } else if (typeof arg === 'object' && arg.toString && !arg.pop && !arg.push) {
    if (arg.toString(10).match(/^-?[0-9]+$/) && (arg.mul || arg.dividedToIntegerBy)) {
      return Web3.utils.toBN(arg.toString(10))
    }
  }

  throw new Error(
    '[number-to-bn] while converting number ' +
      JSON.stringify(arg) +
      ' to BN.js instance, error: invalid number value. Value must be an integer, hex string, BN or BigNumber instance. Note, decimals are not supported.',
  )
}

/**
 * Checks if the radix is legal
 * @param {number} radix
 * @returns {boolean}
 */
function checkRadixLegal(radix) {
  return radix >= 2 && radix <= 62
}

/**
 * Converts a letter to a pure number
 * @param {string} letter
 * @returns {number}
 */
function transformCharToNum(letter, base) {
  if (base <= 36) {
    letter = letter.toLowerCase()
  }
  if (letter >= '0' && letter <= '9') {
    return parseInt(letter)
  }
  if (letter >= 'a' && letter <= 'z') {
    return letter.charCodeAt(0) - 'a'.charCodeAt(0) + 10
  }
  if (letter >= 'A' && letter <= 'Z') {
    return letter.charCodeAt(0) - 'A'.charCodeAt(0) + 36
  }
  return 0
}

/**
 * Converts a number to a character in the given base
 * @param {number} num
 * @return {string}
 */
function transformNumToChar(num, alphabet) {
  alphabet = alphabet || '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  return alphabet.charAt(num)
}

/**
 * Converts a number from the base specified by `base` to the base specified by `to`.
 * @param {string} numStr - The number string to be converted.
 * @param {number} base - The base of the number.
 * @param {number} to - The target base for the conversion.
 * @return {string} - The converted number string.
 */
export function convert({
  numStr,
  base,
  to,
  alphabet,
}: {
  numStr: string
  base: number
  to: number
  alphabet?: string
}): string {
  // 当base和to相等 或 base和to超出转换范围，则原样返回
  if (base === to || !checkRadixLegal(base) || !checkRadixLegal(to)) {
    return numStr
  }

  // 先转成10进制
  let p = new BN(0)
  let number10 = new BN(0)
  while (p.ltn(numStr.length)) {
    number10 = number10.muln(base)
    number10 = number10.addn(transformCharToNum(numStr.charAt(p.toNumber()), base))
    p = p.addn(1)
  }
  // 若要转换的正好是进制，则直接返回
  if (to === 10) {
    return number10.toString()
  }
  let result = ''
  let cur
  while (number10.gtn(0)) {
    cur = number10.modrn(to)
    result = transformNumToChar(cur, alphabet) + result
    number10 = number10.divn(to)
  }
  return result
}

import { ethers } from 'ethers'

// Common types for number utilities
type NumberInput = number | string | bigint

/**
 * Converts some token minimal unit to render format string, showing 5 decimals
 *
 * @param {Number|String} tokenValue - Token value to convert
 * @param {Number} decimals - Token decimals to convert
 * @param {Number} decimalsToShow - Decimals to 5
 * @returns {String} - Number of token minimal unit, in render format
 * If value is less than 5 precision decimals will show '< 0.00001'
 */
export function renderFromTokenMinimalUnit(tokenValue: NumberInput, decimals: number, decimalsToShow: number = 5): string {
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
export function fromTokenMinimalUnit(minimalInput: NumberInput, decimals: number): string {
  return ethers.formatUnits(minimalInput, decimals)
}

/**
 * Converts wei to render format string, showing 5 decimals
 *
 * @param {Number|String} value - Wei to convert
 * @param {Number} decimalsToShow - Decimals to 5
 * @returns {String} - Number of token minimal unit, in render format
 * If value is less than 5 precision decimals will show '< 0.00001'
 */
export function renderFromWei(value: NumberInput, decimalsToShow: number = 5): string {
  let renderWei = '0'
  // avoid undefined
  if (value) {
    // Use ethers.formatUnits to convert wei to ether (18 decimals)
    const etherValue = ethers.formatUnits(value || 0, 18)
    const etherNumber = parseFloat(etherValue)
    if (etherNumber < 0.00001 && etherNumber > 0) {
      renderWei = '< 0.00001'
    } else {
      const base = Math.pow(10, decimalsToShow)
      renderWei = (Math.round(etherNumber * base) / base).toString()
    }
  }
  return renderWei
}

/**
 * Converts token value to hex string number to be sent
 *
 * @param {number|string} value - Token value to convert
 * @param {number} decimals - Decimals to be considered on the conversion
 * @returns {string} - String of the hex token value
 */
export function calcTokenValueToSend(value: NumberInput, decimals: number): string {
  if (!value) return '0x0'
  
  // Use ethers.parseUnits to convert to the smallest unit, then convert to hex
  const tokenValue = ethers.parseUnits(value.toString(), decimals)
  return '0x' + tokenValue.toString(16)
}

/**
 * Determines if a string is a valid decimal
 *
 * @param {string} value - String to check
 * @returns {boolean} - True if the string is a valid decimal
 */
export function isDecimal(value: string): boolean {
  return Number.isFinite(parseFloat(value)) && !Number.isNaN(parseFloat(value)) && !isNaN(+value)
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
 * Performs a fast string split and returns the first item of the string based on the divider provided
 *
 * @param {number|string} value -  number/string to be splitted
 * @param {string} divider -  string value to use to split the string (default '.')
 * @returns {string} - the selected splitted element
 */

export function fastSplit(value: number | string, divider: string = '.'): string {
  const valueStr = value + ''
  const [from, to] = [valueStr.indexOf(divider), 0]
  return valueStr.substring(from, to) || valueStr
}

export function stripHexPrefix(str: string) {
  if (typeof str !== 'string') {
    return str
  }

  return str.slice(0, 2) === '0x' ? str.slice(2) : str
}

/**
 * Checks if the radix is legal
 * @param {number} radix
 * @returns {boolean}
 */
function checkRadixLegal(radix: number): boolean {
  return radix >= 2 && radix <= 62
}

/**
 * Converts a letter to a pure number
 * @param {string} letter
 * @returns {number}
 */
function transformCharToNum(letter: string, base: number): number {
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
function transformNumToChar(num: number, alphabet?: string): string {
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
  let number10 = BigInt(0)
  for (let i = 0; i < numStr.length; i++) {
    number10 = number10 * BigInt(base)
    number10 = number10 + BigInt(transformCharToNum(numStr.charAt(i), base))
  }
  
  // 若要转换的正好是10进制，则直接返回
  if (to === 10) {
    return number10.toString()
  }
  
  let result = ''
  while (number10 > BigInt(0)) {
    const cur = Number(number10 % BigInt(to))
    result = transformNumToChar(cur, alphabet) + result
    number10 = number10 / BigInt(to)
  }
  return result || '0'
}

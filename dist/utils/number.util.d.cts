import { BN } from 'ethereumjs-util';

/**
 * Converts some token minimal unit to render format string, showing 5 decimals
 *
 * @param {Number|String|BN} tokenValue - Token value to convert
 * @param {Number} decimals - Token decimals to convert
 * @param {Number} decimalsToShow - Decimals to 5
 * @returns {String} - Number of token minimal unit, in render format
 * If value is less than 5 precision decimals will show '< 0.00001'
 */
declare function renderFromTokenMinimalUnit(tokenValue: any, decimals: any, decimalsToShow?: number): any;
/**
 * Converts token minimal unit to readable string value
 *
 * @param {number|string|Object} minimalInput - Token minimal unit to convert
 * @param {string} decimals - Token decimals to convert
 * @returns {string} - String containing the new number
 */
declare function fromTokenMinimalUnit(minimalInput: any, decimals: any): string;
/**
 * Converts wei to render format string, showing 5 decimals
 *
 * @param {Number|String|BN} value - Wei to convert
 * @param {Number} decimalsToShow - Decimals to 5
 * @returns {String} - Number of token minimal unit, in render format
 * If value is less than 5 precision decimals will show '< 0.00001'
 */
declare function renderFromWei(value: any, decimalsToShow?: number): string;
/**
 * Converts token BN value to hex string number to be sent
 *
 * @param {Object} value - BN instance to convert
 * @param {number} decimals - Decimals to be considered on the conversion
 * @returns {string} - String of the hex token value
 */
declare function calcTokenValueToSend(value: any, decimals: any): string | 0;
/**
 * Determines if a string is a valid decimal
 *
 * @param {string} value - String to check
 * @returns {boolean} - True if the string is a valid decimal
 */
declare function isDecimal(value: any): boolean;
/**
 * Creates a BN object from a string
 *
 * @param {string} value - Some numeric value represented as a string
 * @returns {Object} - BN instance
 */
declare function toBN(value: any): BN;
/**
 * Prefixes a hex string with '0x' or '-0x' and returns it. Idempotent.
 *
 * @param {string} str - The string to prefix.
 * @returns {string} The prefixed string.
 */
declare const addHexPrefix: (str: string) => string;
/**
 * Wraps 'numberToBN' method to avoid potential undefined and decimal values
 *
 * @param {number|string} value -  number
 * @returns {Object} - The converted value as BN instance
 */
declare function safeNumberToBN(value: number | string): BN;
/**
 * Performs a fast string split and returns the first item of the string based on the divider provided
 *
 * @param {number|string} value -  number/string to be splitted
 * @param {string} divider -  string value to use to split the string (default '.')
 * @returns {string} - the selected splitted element
 */
declare function fastSplit(value: any, divider?: string): any;
declare function stripHexPrefix(str: string): string;
declare function numberToBN(arg: any): BN;
/**
 * Converts a number from the base specified by `base` to the base specified by `to`.
 * @param {string} numStr - The number string to be converted.
 * @param {number} base - The base of the number.
 * @param {number} to - The target base for the conversion.
 * @return {string} - The converted number string.
 */
declare function convert({ numStr, base, to, alphabet, }: {
    numStr: string;
    base: number;
    to: number;
    alphabet?: string;
}): string;

export { addHexPrefix, calcTokenValueToSend, convert, fastSplit, fromTokenMinimalUnit, isDecimal, numberToBN, renderFromTokenMinimalUnit, renderFromWei, safeNumberToBN, stripHexPrefix, toBN };

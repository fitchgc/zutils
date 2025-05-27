declare type HexString = string;
declare type Numbers = number | bigint | string | HexString;
declare type ValidInputTypes = Uint8Array | bigint | string | number | boolean;
declare const isHex: (hex: ValidInputTypes) => boolean;
declare const ethUnitMap: {
    noether: bigint;
    wei: bigint;
    kwei: bigint;
    Kwei: bigint;
    babbage: bigint;
    femtoether: bigint;
    mwei: bigint;
    Mwei: bigint;
    lovelace: bigint;
    picoether: bigint;
    gwei: bigint;
    Gwei: bigint;
    shannon: bigint;
    nanoether: bigint;
    nano: bigint;
    szabo: bigint;
    microether: bigint;
    micro: bigint;
    finney: bigint;
    milliether: bigint;
    milli: bigint;
    ether: bigint;
    kether: bigint;
    grand: bigint;
    mether: bigint;
    gether: bigint;
    tether: bigint;
};
type EtherUnits = keyof typeof ethUnitMap;
/**
 * Converts value to it's number representation
 */
declare const hexToNumber: (value: string) => bigint | number;
declare const toNumber: (value: Numbers) => number | bigint;
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
declare const toBigInt: (value: unknown) => bigint;
declare const toBigWei: (number: Numbers, unit?: EtherUnits) => bigint;
declare const toWei: (number: Numbers, unit?: EtherUnits) => string;
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
declare const fromWei: (number: Numbers, unit?: EtherUnits) => string;

export { type EtherUnits, type HexString, type Numbers, type ValidInputTypes, ethUnitMap, fromWei, hexToNumber, isHex, toBigInt, toBigWei, toNumber, toWei };

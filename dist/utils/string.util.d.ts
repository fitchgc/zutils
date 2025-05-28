/**
 * Check if the incoming value is true
 * @param {Object} obj When the incoming value is 'true', 'TRUE', 1, '1', 'on', 'ON', 'YES', 'yes', return true, otherwise return false
 * @return {boolean}
 */
declare function isTrue(obj: any): boolean;
/**
 * Verify if the ObjectId format is correct
 * @param {string} id
 * @return {boolean}
 */
declare function isObjectId(id: string): boolean;
/**
 * Decimal to Base62
 * @param {string | number} number
 * @return {string}
 */
declare function string10to62(number: string | number): string;
/**
 * Base62 to Decimal
 * @param {string} numberCode
 * @return {number}
 */
declare function string62to10(numberCode: string): number;
declare const hexToBase58: (hexString: string) => string;
declare const base58ToHex: (base58String: string) => string;
declare const hexToBase32: (hexString: string) => string;
declare function compressUuid(e: string, t?: boolean): string;
declare function compressHex(e: string, r: number): string;
declare function isUUID(uuid: string): boolean;
declare function hexToUtf8(hexString: string): string;
declare function utf8ToHex(utf8String: string): string;
/**
 * Check if the string is in JSON format
 * @param {string} str
 * @return {boolean}
 */
declare function isJsonString(str: string): boolean;
/**
 * Check if accountId conforms to the rules
 * 4-digit channel id_4-digit game id_openid
 * @param accountId
 * @returns
 */
declare function checkAccountId(accountId: string): boolean;
/**
 * Split accountId into channel id, game id, and openId
 * @param accountId
 * @returns
 */
declare function parseGameAccountId(accountId: string): {
    gameId: string;
    channel: string;
    openId: string;
};
declare function checkAddress(address: string): boolean;

export { base58ToHex, checkAccountId, checkAddress, compressHex, compressUuid, hexToBase32, hexToBase58, hexToUtf8, isJsonString, isObjectId, isTrue, isUUID, parseGameAccountId, string10to62, string62to10, utf8ToHex };

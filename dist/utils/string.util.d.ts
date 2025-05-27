/**
 * 判断传入的值是否为true
 * @param {Object} obj   传入值为'true','TRUE',1,'1','on','ON','YES','yes'时,返回true,其他值均返回false
 * @return {boolean}
 */
declare function isTrue(obj: any): boolean;
/**
 * 验证ObjectId格式是否正确
 * @param {string} id
 * @return {boolean}
 */
declare function isObjectId(id: string): boolean;
/**
 * 10进制 -> 62进制
 * @param {string | number} number
 * @return {string}
 */
declare function string10to62(number: string | number): string;
/**
 * 62进制 -> 10 进制
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
 * 判断是否是json格式的字符串
 * @param {string} str
 * @return {boolean}
 */
declare function isJsonString(str: string): boolean;
/**
 * 检查accountId是否符合规则
 * 4位渠道id_4位游戏id_openid
 * @param accountId
 * @returns
 */
declare function checkAccountId(accountId: string): boolean;
/**
 * 将accountId拆分出 渠道id, 游戏id, 和openId
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

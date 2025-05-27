/**
 * use crypto.randomBytes to generate random string
 * @param length
 * @returns
 */
declare function genRandomString(length: number): string;
/**
 * 根据概率数组获取随机index
 * @since 1.0.0
 * @param prob_array 概率数组
 */
declare function randomWithProb(prob_array: number[]): number;
declare function uuid(): `${string}-${string}-${string}-${string}-${string}`;
declare function shortUuid(): string;
declare function hmac(input: string, key: string, out: 'base64' | 'base64url' | 'hex' | 'binary'): string;
declare function md5(str: string): string;
declare function sha1(str: string): string;
declare function sha512(password: string, salt: string): {
    salt: string;
    passwordHash: string;
};
declare function sha3_256(str: string): string;
declare function hmacSha256(str: string, key: any): string;
declare const aesEncrypt: (plaintText: string, key: any) => string;
declare const aesDecrypt: (encryptedDataHexStr: any, key: any) => string;
declare function createSign(secretKey: string, paramStr: string, timestamp: number): string;
declare function checkSign({ secretKey, data, sign, signKeys, }: {
    secretKey: string;
    data: {};
    sign: string;
    signKeys: string[];
}): boolean;

export { aesDecrypt, aesEncrypt, checkSign, createSign, genRandomString, hmac, hmacSha256, md5, randomWithProb, sha1, sha3_256, sha512, shortUuid, uuid };

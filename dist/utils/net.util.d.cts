declare function generateHeader(): {
    'Refresh-Token': number;
    'Cache-Control': string;
    'User-Agent': string;
    'X-Forwarded-For': string;
    'X-Real-IP': string;
    'Content-Type': string;
};
declare const checkParamsNeeded: (...args: any[]) => void;
/**
 * Generate a string in the format key1=val1&key2=val2
 * @param {object} data The object to be processed
 * @param {boolean} sort Whether to sort by key in ascending order
 * @param {boolean} ignoreNull Whether to filter out null values (spaces or null values are not included in the concatenation)
 * @param splitChar The connecting character, defaults to &
 * @param equalChar The equals character, defaults to =
 */
declare function generateKVStr({ data, sort, encode, ignoreNull, splitChar, equalChar, uri, }: {
    data?: any;
    sort?: boolean;
    encode?: boolean;
    ignoreNull?: boolean;
    splitChar?: string;
    equalChar?: string;
    uri?: string;
}): string;
/**
 * Assemble a string in the format key1=val&key2=val into an object
 * @param str A string in the format key1=val&key2=val
 * @param splitChar The connecting character, defaults to &
 * @param equalChar The equals character, defaults to =
 */
declare function keyValToObject(str: string, splitChar?: string, equalChar?: string): {};
declare const RE_URL_SCHEME: RegExp;
/**
 * Get the scheme from the URL
 * @param url
 * @returns
 */
declare function findUrlScheme(url: string): string;
/**
 * Parse user information in JWT token, without signature verification
 * @param token
 * @returns
 */
declare function decodeJWT(token: string): any;

export { RE_URL_SCHEME, checkParamsNeeded, decodeJWT, findUrlScheme, generateHeader, generateKVStr, keyValToObject };

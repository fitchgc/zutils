import { RequestInit, Response } from 'node-fetch';

/**
 * Execute fetch and verify that the response was successful.
 *
 * @param request - Request information.
 * @param options - Fetch options.
 * @returns The fetch response.
 */
declare function successfulFetch(request: string, options?: RequestInit): Promise<any>;
/**
 * Execute fetch and return object response.
 *
 * @param request - The request information.
 * @param options - The fetch options.
 * @returns The fetch response JSON data.
 */
declare function handleFetch(request: string, options?: RequestInit): Promise<any>;
/**
 * Execute fetch and return object response, log if known error thrown, otherwise rethrow error.
 *
 * @param request - the request options object
 * @param request.url - The request url to query.
 * @param request.options - The fetch options.
 * @param request.timeout - Timeout to fail request
 * @param request.errorCodesToCatch - array of error codes for errors we want to catch in a particular context
 * @returns The fetch response JSON data or undefined (if error occurs).
 */
declare function fetchWithErrorHandling({ url, options, timeout, errorCodesToCatch, }: {
    url: string;
    options?: RequestInit;
    timeout?: number;
    errorCodesToCatch?: number[];
}): Promise<any>;
/**
 * Fetch that fails after timeout.
 *
 * @param url - Url to fetch.
 * @param options - Options to send with the request.
 * @param timeout - Timeout to fail request.
 * @returns Promise resolving the request.
 */
declare function timeoutFetch(url: string, options?: RequestInit, timeout?: number): Promise<Response>;
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
 * 生成 key1=val1&key2=val2的字符串
 * @param {object} data 需要处理的对象
 * @param {boolean} sort 是否按key生序重排
 * @param {boolean} ignoreNull 是否过滤空值(空格或者null值不参与拼接)
 * @param splitChar 连接的字符, 默认是&
 * @param equalChar =
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
 * 将key1=val&key2=val的字符串组装成对象
 * @param str key1=val&key2=val的字符串
 * @param splitChar 连接的字符, 默认是&
 * @param equalChar =
 */
declare function keyValToObject(str: string, splitChar?: string, equalChar?: string): {};
declare const RE_URL_SCHEME: RegExp;
/**
 * 获取url中的scheme
 * @param url
 * @returns
 */
declare function findUrlScheme(url: string): string;
/**
 * 解析jwt token中的用户信息, 不校验签名
 * @param token
 * @returns
 */
declare function decodeJWT(token: string): any;

export { RE_URL_SCHEME, checkParamsNeeded, decodeJWT, fetchWithErrorHandling, findUrlScheme, generateHeader, generateKVStr, handleFetch, keyValToObject, successfulFetch, timeoutFetch };

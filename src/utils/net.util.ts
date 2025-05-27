import { ZError } from 'common/ZError'
import fetch, { Response, RequestInit } from 'node-fetch'

const TIMEOUT_ERROR = new Error('timeout')

/**
 * Execute fetch and verify that the response was successful.
 *
 * @param request - Request information.
 * @param options - Fetch options.
 * @returns The fetch response.
 */
export async function successfulFetch(request: string, options?: RequestInit): Promise<any> {
  const response = await fetch(request, options)
  if (!response.ok) {
    throw new Error(`Fetch failed with status '${response.status}' for request '${request}'`)
  }
  return response
}

/**
 * Execute fetch and return object response.
 *
 * @param request - The request information.
 * @param options - The fetch options.
 * @returns The fetch response JSON data.
 */
export async function handleFetch(request: string, options?: RequestInit) {
  const response = await successfulFetch(request, options)
  const object = await response.json()
  return object
}

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
export async function fetchWithErrorHandling({
  url,
  options,
  timeout,
  errorCodesToCatch,
}: {
  url: string
  options?: RequestInit
  timeout?: number
  errorCodesToCatch?: number[]
}) {
  let result
  try {
    if (timeout) {
      result = Promise.race([
        await handleFetch(url, options),
        new Promise<Response>((_, reject) =>
          setTimeout(() => {
            reject(TIMEOUT_ERROR)
          }, timeout),
        ),
      ])
    } else {
      result = await handleFetch(url, options)
    }
  } catch (e) {
    logOrRethrowError(e, errorCodesToCatch)
  }
  return result
}

/**
 * Fetch that fails after timeout.
 *
 * @param url - Url to fetch.
 * @param options - Options to send with the request.
 * @param timeout - Timeout to fail request.
 * @returns Promise resolving the request.
 */
export async function timeoutFetch(url: string, options?: RequestInit, timeout = 500): Promise<Response> {
  return Promise.race([
    successfulFetch(url, options),
    new Promise<Response>((_, reject) =>
      setTimeout(() => {
        reject(TIMEOUT_ERROR)
      }, timeout),
    ),
  ])
}

/**
 * Utility method to log if error is a common fetch error and otherwise rethrow it.
 *
 * @param error - Caught error that we should either rethrow or log to console
 * @param codesToCatch - array of error codes for errors we want to catch and log in a particular context
 */
function logOrRethrowError(error: any, codesToCatch: number[] = []) {
  if (!error) {
    return
  }

  const includesErrorCodeToCatch = codesToCatch.some(code =>
    error.message.includes(`Fetch failed with status '${code}'`),
  )

  if (
    error instanceof Error &&
    (includesErrorCodeToCatch || error.message.includes('Failed to fetch') || error === TIMEOUT_ERROR)
  ) {
    console.error(error)
  } else {
    throw error
  }
}

export function generateHeader() {
  let random = function (start, end) {
    return (Math.random() * (end - start) + start) | 0
  }
  let getIp = function () {
    return `${random(1, 254)}.${random(1, 254)}.${random(1, 254)}.${random(1, 254)}`
  }
  let time = Date.now()
  let useragent = `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_0_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${
    (70 + Math.random() * 10) | 0
  }.0.4324.${(Math.random() * 100) | 0} Safari/537.36`
  const ip = getIp()
  return {
    'Refresh-Token': (time -= 5000),
    'Cache-Control': 'no-cache',
    'User-Agent': useragent,
    'X-Forwarded-For': ip,
    'X-Real-IP': ip,
    'Content-Type': 'application/json',
  }
}

export const checkParamsNeeded = (...args) => {
  args.forEach(arg => {
    if (!arg) {
      throw new ZError(10, 'parameters mismatch')
    }
  })
}

/**
 * Generate a string in the format key1=val1&key2=val2
 * @param {object} data The object to be processed
 * @param {boolean} sort Whether to sort by key in ascending order
 * @param {boolean} ignoreNull Whether to filter out null values (spaces or null values are not included in the concatenation)
 * @param splitChar The connecting character, defaults to &
 * @param equalChar The equals character, defaults to =
 */
export function generateKVStr({
  data = {},
  sort = false,
  encode = false,
  ignoreNull = true,
  splitChar = '&',
  equalChar = '=',
  uri = '',
}: {
  data?: any
  sort?: boolean
  encode?: boolean
  ignoreNull?: boolean
  splitChar?: string
  equalChar?: string
  uri?: string
}) {
  const keys = Object.keys(data)
  sort && keys.sort()
  let result = ''
  let i = 0
  for (let key of keys) {
    if (ignoreNull && !data[key]) {
      continue
    }
    if (i++ > 0) result += splitChar
    if (encode) {
      result += `${key}${equalChar}${encodeURIComponent(data[key])}`
    } else {
      result += `${key}${equalChar}${data[key]}`
    }
  }
  if (uri) {
    const joinChar = uri.search(/\?/) === -1 ? '?' : '&'
    result = uri + joinChar + result
  }
  return result
}

/**
 * Assemble a string in the format key1=val&key2=val into an object
 * @param str A string in the format key1=val&key2=val
 * @param splitChar The connecting character, defaults to &
 * @param equalChar The equals character, defaults to =
 */
export function keyValToObject(str: string, splitChar: string = '&', equalChar = '='): {} {
  let result: any = {}
  if (!str) {
    return result
  }
  let arrs = str.split(splitChar)
  for (let sub of arrs) {
    let subArr = sub.split(equalChar)
    result[subArr[0]] = subArr[1]
  }
  return result
}

export const RE_URL_SCHEME = /^(.+?):\/\/.+?$/
/**
 * Get the scheme from the URL
 * @param url
 * @returns
 */
export function findUrlScheme(url: string) {
  let result = url.match(RE_URL_SCHEME)
  if (!result) {
    return ''
  }
  return result[1]
}

/**
 * Parse user information in JWT token, without signature verification
 * @param token
 * @returns
 */
export function decodeJWT(token: string) {
  let strings = token.split('.')
  var userinfo = JSON.parse(
    decodeURIComponent(encodeURIComponent(window.atob(strings[1].replace(/-/g, '+').replace(/_/g, '/')))),
  )
  return userinfo
}

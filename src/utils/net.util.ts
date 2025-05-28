import { ZError } from 'common/ZError'

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

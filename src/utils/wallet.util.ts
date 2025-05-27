import { renderFromTokenMinimalUnit } from './number.util'
import { asciiToHex } from 'web3-utils'

/**
 * Removes IPFS protocol prefix from input string.
 *
 * @param ipfsUrl - An IPFS url (e.g. ipfs://{content id})
 * @returns IPFS content identifier and (possibly) path in a string
 * @throws Will throw if the url passed is not IPFS.
 */
export function removeIpfsProtocolPrefix(ipfsUrl: string) {
  if (ipfsUrl.startsWith('ipfs://ipfs/')) {
    return ipfsUrl.replace('ipfs://ipfs/', '')
  } else if (ipfsUrl.startsWith('ipfs://')) {
    return ipfsUrl.replace('ipfs://', '')
  }
  // this method should not be used with non-ipfs urls (i.e. startsWith('ipfs://') === true)
  throw new Error('this method should not be used with non ipfs urls')
}

/**
 * Extracts content identifier and path from an input string.
 *
 * @param ipfsUrl - An IPFS URL minus the IPFS protocol prefix
 * @returns IFPS content identifier (cid) and sub path as string.
 * @throws Will throw if the url passed is not ipfs.
 */
export function getIpfsCIDv1AndPath(ipfsUrl: string): {
  cid: string
  path?: string
} {
  const url = removeIpfsProtocolPrefix(ipfsUrl)

  // check if there is a path
  // (CID is everything preceding first forward slash, path is everything after)
  const index = url.indexOf('/')
  const cid = index !== -1 ? url.substring(0, index) : url
  const path = index !== -1 ? url.substring(index) : undefined
  //TODO:
  // We want to ensure that the CID is v1 (https://docs.ipfs.io/concepts/content-addressing/#identifier-formats)
  // because most cid v0s appear to be incompatible with IPFS subdomains
  // return {
  //   cid: CID.parse(cid).toV1().toString(),
  //   path,
  // };
  return {
    cid,
    path,
  }
}

/**
 * Adds URL protocol prefix to input URL string if missing.
 *
 * @param urlString - An IPFS URL.
 * @returns A URL with a https:// prepended.
 */
export function addUrlProtocolPrefix(urlString: string): string {
  if (!urlString.match(/(^http:\/\/)|(^https:\/\/)/u)) {
    return `https://${urlString}`
  }
  return urlString
}

/**
 * Formats URL correctly for use retrieving assets hosted on IPFS.
 *
 * @param ipfsGateway - The users preferred IPFS gateway (full URL or just host).
 * @param ipfsUrl - The IFPS URL pointed at the asset.
 * @param subdomainSupported - Boolean indicating whether the URL should be formatted with subdomains or not.
 * @returns A formatted URL, with the user's preferred IPFS gateway and format (subdomain or not), pointing to an asset hosted on IPFS.
 */
export function getFormattedIpfsUrl(ipfsGateway: string, ipfsUrl: string, subdomainSupported: boolean): string {
  const { host, protocol, origin } = new URL(addUrlProtocolPrefix(ipfsGateway))
  if (subdomainSupported) {
    const { cid, path } = getIpfsCIDv1AndPath(ipfsUrl)
    return `${protocol}//${cid}.ipfs.${host}${path || ''}`
  }
  const cidAndPath = removeIpfsProtocolPrefix(ipfsUrl)
  return `${origin}/ipfs/${cidAndPath}`
}

/**
 * Returns whether the given code corresponds to a smart contract.
 *
 * @param code - The potential smart contract code.
 * @returns Whether the code was smart contract code or not.
 */
export function isSmartContractCode(code: string) {
  /* istanbul ignore if */
  if (!code) {
    return false
  }
  // Geth will return '0x', and ganache-core v2.2.1 will return '0x0'
  const smartContractCode = code !== '0x' && code !== '0x0'
  return smartContractCode
}

export function formatAddress(address: string) {
  if (address.length >= 10) {
    return address.substring(0, 6) + '...' + address.substring(address.length - 4)
  } else if (address.length > 0 && address.length < 10) {
    return address
  } else {
    return ''
  }
}

export function formatMoney(balance: number | string, symbol: string) {
  if (balance === '-') {
    return `- ${symbol}`
  }
  let money = renderFromTokenMinimalUnit(balance, 18, 4)
  return `${money} ${symbol}`
}

/**
 * 生成随机的bytes32的字符串
 * @returns
 */
export function generateRandomBytes32() {
  const v1 = (Math.random() * 9000000 + 1000000) | 0
  const v2 = (Math.random() * 900000 + 100000) | 0
  return asciiToHex(v1 + '' + v2)
}

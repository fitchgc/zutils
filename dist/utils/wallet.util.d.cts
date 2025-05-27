/**
 * Removes IPFS protocol prefix from input string.
 *
 * @param ipfsUrl - An IPFS url (e.g. ipfs://{content id})
 * @returns IPFS content identifier and (possibly) path in a string
 * @throws Will throw if the url passed is not IPFS.
 */
declare function removeIpfsProtocolPrefix(ipfsUrl: string): string;
/**
 * Extracts content identifier and path from an input string.
 *
 * @param ipfsUrl - An IPFS URL minus the IPFS protocol prefix
 * @returns IFPS content identifier (cid) and sub path as string.
 * @throws Will throw if the url passed is not ipfs.
 */
declare function getIpfsCIDv1AndPath(ipfsUrl: string): {
    cid: string;
    path?: string;
};
/**
 * Adds URL protocol prefix to input URL string if missing.
 *
 * @param urlString - An IPFS URL.
 * @returns A URL with a https:// prepended.
 */
declare function addUrlProtocolPrefix(urlString: string): string;
/**
 * Formats URL correctly for use retrieving assets hosted on IPFS.
 *
 * @param ipfsGateway - The users preferred IPFS gateway (full URL or just host).
 * @param ipfsUrl - The IFPS URL pointed at the asset.
 * @param subdomainSupported - Boolean indicating whether the URL should be formatted with subdomains or not.
 * @returns A formatted URL, with the user's preferred IPFS gateway and format (subdomain or not), pointing to an asset hosted on IPFS.
 */
declare function getFormattedIpfsUrl(ipfsGateway: string, ipfsUrl: string, subdomainSupported: boolean): string;
/**
 * Returns whether the given code corresponds to a smart contract.
 *
 * @param code - The potential smart contract code.
 * @returns Whether the code was smart contract code or not.
 */
declare function isSmartContractCode(code: string): boolean;
declare function formatAddress(address: string): string;
declare function formatMoney(balance: number | string, symbol: string): string;
/**
 * 生成随机的bytes32的字符串
 * @returns
 */
declare function generateRandomBytes32(): string;

export { addUrlProtocolPrefix, formatAddress, formatMoney, generateRandomBytes32, getFormattedIpfsUrl, getIpfsCIDv1AndPath, isSmartContractCode, removeIpfsProtocolPrefix };

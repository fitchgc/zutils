var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/utils/number.util.ts
import { ethers } from "ethers";
function renderFromTokenMinimalUnit(tokenValue, decimals, decimalsToShow = 5) {
  const minimalUnit = fromTokenMinimalUnit(tokenValue || 0, decimals);
  const minimalUnitNumber = parseFloat(minimalUnit);
  let renderMinimalUnit;
  if (minimalUnitNumber < 1e-5 && minimalUnitNumber > 0) {
    renderMinimalUnit = "< 0.00001";
  } else {
    const base = Math.pow(10, decimalsToShow);
    renderMinimalUnit = (Math.round(minimalUnitNumber * base) / base).toString();
  }
  return renderMinimalUnit;
}
__name(renderFromTokenMinimalUnit, "renderFromTokenMinimalUnit");
function fromTokenMinimalUnit(minimalInput, decimals) {
  return ethers.formatUnits(minimalInput, decimals);
}
__name(fromTokenMinimalUnit, "fromTokenMinimalUnit");

// src/utils/wallet.util.ts
import { randomBytes } from "crypto";
function removeIpfsProtocolPrefix(ipfsUrl) {
  if (ipfsUrl.startsWith("ipfs://ipfs/")) {
    return ipfsUrl.replace("ipfs://ipfs/", "");
  } else if (ipfsUrl.startsWith("ipfs://")) {
    return ipfsUrl.replace("ipfs://", "");
  }
  throw new Error("this method should not be used with non ipfs urls");
}
__name(removeIpfsProtocolPrefix, "removeIpfsProtocolPrefix");
function getIpfsCIDv1AndPath(ipfsUrl) {
  const url = removeIpfsProtocolPrefix(ipfsUrl);
  const index = url.indexOf("/");
  const cid = index !== -1 ? url.substring(0, index) : url;
  const path = index !== -1 ? url.substring(index) : void 0;
  return {
    cid,
    path
  };
}
__name(getIpfsCIDv1AndPath, "getIpfsCIDv1AndPath");
function addUrlProtocolPrefix(urlString) {
  if (!urlString.match(/(^http:\/\/)|(^https:\/\/)/u)) {
    return `https://${urlString}`;
  }
  return urlString;
}
__name(addUrlProtocolPrefix, "addUrlProtocolPrefix");
function getFormattedIpfsUrl(ipfsGateway, ipfsUrl, subdomainSupported) {
  const { host, protocol, origin } = new URL(addUrlProtocolPrefix(ipfsGateway));
  if (subdomainSupported) {
    const { cid, path } = getIpfsCIDv1AndPath(ipfsUrl);
    return `${protocol}//${cid}.ipfs.${host}${path || ""}`;
  }
  const cidAndPath = removeIpfsProtocolPrefix(ipfsUrl);
  return `${origin}/ipfs/${cidAndPath}`;
}
__name(getFormattedIpfsUrl, "getFormattedIpfsUrl");
function isSmartContractCode(code) {
  if (!code) {
    return false;
  }
  const smartContractCode = code !== "0x" && code !== "0x0";
  return smartContractCode;
}
__name(isSmartContractCode, "isSmartContractCode");
function formatAddress(address) {
  if (address.length >= 10) {
    return address.substring(0, 6) + "..." + address.substring(address.length - 4);
  } else if (address.length > 0 && address.length < 10) {
    return address;
  } else {
    return "";
  }
}
__name(formatAddress, "formatAddress");
function formatMoney(balance, symbol) {
  if (balance === "-") {
    return `- ${symbol}`;
  }
  let money = renderFromTokenMinimalUnit(balance, 18, 4);
  return `${money} ${symbol}`;
}
__name(formatMoney, "formatMoney");
function generateRandomBytes32() {
  return "0x" + randomBytes(32).toString("hex");
}
__name(generateRandomBytes32, "generateRandomBytes32");
export {
  addUrlProtocolPrefix,
  formatAddress,
  formatMoney,
  generateRandomBytes32,
  getFormattedIpfsUrl,
  getIpfsCIDv1AndPath,
  isSmartContractCode,
  removeIpfsProtocolPrefix
};
//# sourceMappingURL=wallet.util.js.map
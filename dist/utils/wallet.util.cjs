var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/utils/wallet.util.ts
var wallet_util_exports = {};
__export(wallet_util_exports, {
  addUrlProtocolPrefix: () => addUrlProtocolPrefix,
  formatAddress: () => formatAddress,
  formatMoney: () => formatMoney,
  generateRandomBytes32: () => generateRandomBytes32,
  getFormattedIpfsUrl: () => getFormattedIpfsUrl,
  getIpfsCIDv1AndPath: () => getIpfsCIDv1AndPath,
  isSmartContractCode: () => isSmartContractCode,
  removeIpfsProtocolPrefix: () => removeIpfsProtocolPrefix
});
module.exports = __toCommonJS(wallet_util_exports);

// src/utils/number.util.ts
var import_web3 = __toESM(require("web3"), 1);
var import_ethereumjs_util = require("ethereumjs-util");
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
  minimalInput = addHexPrefix(Number(minimalInput).toString(16));
  let minimal = safeNumberToBN(minimalInput);
  const negative = minimal.lt(new import_ethereumjs_util.BN(0));
  const base = import_web3.default.utils.toBN(Math.pow(10, decimals).toString());
  if (negative) {
    minimal = minimal.mul(new import_ethereumjs_util.BN(-1));
  }
  let fraction = minimal.mod(base).toString(10);
  while (fraction.length < decimals) {
    fraction = "0" + fraction;
  }
  fraction = fraction.match(/^([0-9]*[1-9]|0)(0*)/)[1];
  const whole = minimal.div(base).toString(10);
  let value = "" + whole + (fraction === "0" ? "" : "." + fraction);
  if (negative) {
    value = "-" + value;
  }
  return value;
}
__name(fromTokenMinimalUnit, "fromTokenMinimalUnit");
var addHexPrefix = /* @__PURE__ */ __name((str) => {
  if (typeof str !== "string" || str.match(/^-?0x/u)) {
    return str;
  }
  if (str.match(/^-?0X/u)) {
    return str.replace("0X", "0x");
  }
  if (str.startsWith("-")) {
    return str.replace("-", "-0x");
  }
  return `0x${str}`;
}, "addHexPrefix");
function safeNumberToBN(value) {
  const safeValue = fastSplit(value.toString()) || "0";
  return numberToBN(safeValue);
}
__name(safeNumberToBN, "safeNumberToBN");
function fastSplit(value, divider = ".") {
  value += "";
  const [from, to] = [
    value.indexOf(divider),
    0
  ];
  return value.substring(from, to) || value;
}
__name(fastSplit, "fastSplit");
function stripHexPrefix(str) {
  if (typeof str !== "string") {
    return str;
  }
  return str.slice(0, 2) === "0x" ? str.slice(2) : str;
}
__name(stripHexPrefix, "stripHexPrefix");
function numberToBN(arg) {
  if (typeof arg === "string" || typeof arg === "number") {
    var multiplier = import_web3.default.utils.toBN(1);
    var formattedString = String(arg).toLowerCase().trim();
    var isHexPrefixed = formattedString.substr(0, 2) === "0x" || formattedString.substr(0, 3) === "-0x";
    var stringArg = stripHexPrefix(formattedString);
    if (stringArg.substr(0, 1) === "-") {
      stringArg = stripHexPrefix(stringArg.slice(1));
      multiplier = import_web3.default.utils.toBN(-1);
    }
    stringArg = stringArg === "" ? "0" : stringArg;
    if (!stringArg.match(/^-?[0-9]+$/) && stringArg.match(/^[0-9A-Fa-f]+$/) || stringArg.match(/^[a-fA-F]+$/) || isHexPrefixed === true && stringArg.match(/^[0-9A-Fa-f]+$/)) {
      return import_web3.default.utils.toBN(stringArg).mul(multiplier);
    }
    if ((stringArg.match(/^-?[0-9]+$/) || stringArg === "") && isHexPrefixed === false) {
      return import_web3.default.utils.toBN(stringArg).mul(multiplier);
    }
  } else if (typeof arg === "object" && arg.toString && !arg.pop && !arg.push) {
    if (arg.toString(10).match(/^-?[0-9]+$/) && (arg.mul || arg.dividedToIntegerBy)) {
      return import_web3.default.utils.toBN(arg.toString(10));
    }
  }
  throw new Error("[number-to-bn] while converting number " + JSON.stringify(arg) + " to BN.js instance, error: invalid number value. Value must be an integer, hex string, BN or BigNumber instance. Note, decimals are not supported.");
}
__name(numberToBN, "numberToBN");

// src/utils/wallet.util.ts
var import_web3_utils = require("web3-utils");
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
  const v1 = Math.random() * 9e6 + 1e6 | 0;
  const v2 = Math.random() * 9e5 + 1e5 | 0;
  return (0, import_web3_utils.asciiToHex)(v1 + "" + v2);
}
__name(generateRandomBytes32, "generateRandomBytes32");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addUrlProtocolPrefix,
  formatAddress,
  formatMoney,
  generateRandomBytes32,
  getFormattedIpfsUrl,
  getIpfsCIDv1AndPath,
  isSmartContractCode,
  removeIpfsProtocolPrefix
});
//# sourceMappingURL=wallet.util.cjs.map
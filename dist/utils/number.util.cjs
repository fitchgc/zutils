var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/utils/number.util.ts
var number_util_exports = {};
__export(number_util_exports, {
  addHexPrefix: () => addHexPrefix,
  calcTokenValueToSend: () => calcTokenValueToSend,
  convert: () => convert,
  fastSplit: () => fastSplit,
  fromTokenMinimalUnit: () => fromTokenMinimalUnit,
  isDecimal: () => isDecimal,
  renderFromTokenMinimalUnit: () => renderFromTokenMinimalUnit,
  renderFromWei: () => renderFromWei,
  stripHexPrefix: () => stripHexPrefix
});
module.exports = __toCommonJS(number_util_exports);
var import_ethers = require("ethers");
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
  return import_ethers.ethers.formatUnits(minimalInput, decimals);
}
__name(fromTokenMinimalUnit, "fromTokenMinimalUnit");
function renderFromWei(value, decimalsToShow = 5) {
  let renderWei = "0";
  if (value) {
    const etherValue = import_ethers.ethers.formatUnits(value || 0, 18);
    const etherNumber = parseFloat(etherValue);
    if (etherNumber < 1e-5 && etherNumber > 0) {
      renderWei = "< 0.00001";
    } else {
      const base = Math.pow(10, decimalsToShow);
      renderWei = (Math.round(etherNumber * base) / base).toString();
    }
  }
  return renderWei;
}
__name(renderFromWei, "renderFromWei");
function calcTokenValueToSend(value, decimals) {
  if (!value) return "0x0";
  const tokenValue = import_ethers.ethers.parseUnits(value.toString(), decimals);
  return "0x" + tokenValue.toString(16);
}
__name(calcTokenValueToSend, "calcTokenValueToSend");
function isDecimal(value) {
  return Number.isFinite(parseFloat(value)) && !Number.isNaN(parseFloat(value)) && !isNaN(+value);
}
__name(isDecimal, "isDecimal");
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
function fastSplit(value, divider = ".") {
  const valueStr = value + "";
  const [from, to] = [
    valueStr.indexOf(divider),
    0
  ];
  return valueStr.substring(from, to) || valueStr;
}
__name(fastSplit, "fastSplit");
function stripHexPrefix(str) {
  if (typeof str !== "string") {
    return str;
  }
  return str.slice(0, 2) === "0x" ? str.slice(2) : str;
}
__name(stripHexPrefix, "stripHexPrefix");
function checkRadixLegal(radix) {
  return radix >= 2 && radix <= 62;
}
__name(checkRadixLegal, "checkRadixLegal");
function transformCharToNum(letter, base) {
  if (base <= 36) {
    letter = letter.toLowerCase();
  }
  if (letter >= "0" && letter <= "9") {
    return parseInt(letter);
  }
  if (letter >= "a" && letter <= "z") {
    return letter.charCodeAt(0) - "a".charCodeAt(0) + 10;
  }
  if (letter >= "A" && letter <= "Z") {
    return letter.charCodeAt(0) - "A".charCodeAt(0) + 36;
  }
  return 0;
}
__name(transformCharToNum, "transformCharToNum");
function transformNumToChar(num, alphabet) {
  alphabet = alphabet || "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return alphabet.charAt(num);
}
__name(transformNumToChar, "transformNumToChar");
function convert({ numStr, base, to, alphabet }) {
  if (base === to || !checkRadixLegal(base) || !checkRadixLegal(to)) {
    return numStr;
  }
  let number10 = BigInt(0);
  for (let i = 0; i < numStr.length; i++) {
    number10 = number10 * BigInt(base);
    number10 = number10 + BigInt(transformCharToNum(numStr.charAt(i), base));
  }
  if (to === 10) {
    return number10.toString();
  }
  let result = "";
  while (number10 > BigInt(0)) {
    const cur = Number(number10 % BigInt(to));
    result = transformNumToChar(cur, alphabet) + result;
    number10 = number10 / BigInt(to);
  }
  return result || "0";
}
__name(convert, "convert");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addHexPrefix,
  calcTokenValueToSend,
  convert,
  fastSplit,
  fromTokenMinimalUnit,
  isDecimal,
  renderFromTokenMinimalUnit,
  renderFromWei,
  stripHexPrefix
});
//# sourceMappingURL=number.util.cjs.map
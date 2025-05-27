var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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

// src/utils/number.util.ts
var number_util_exports = {};
__export(number_util_exports, {
  addHexPrefix: () => addHexPrefix,
  calcTokenValueToSend: () => calcTokenValueToSend,
  convert: () => convert,
  fastSplit: () => fastSplit,
  fromTokenMinimalUnit: () => fromTokenMinimalUnit,
  isDecimal: () => isDecimal,
  numberToBN: () => numberToBN,
  renderFromTokenMinimalUnit: () => renderFromTokenMinimalUnit,
  renderFromWei: () => renderFromWei,
  safeNumberToBN: () => safeNumberToBN,
  stripHexPrefix: () => stripHexPrefix,
  toBN: () => toBN
});
module.exports = __toCommonJS(number_util_exports);
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
function renderFromWei(value, decimalsToShow = 5) {
  let renderWei = "0";
  if (value) {
    const wei = import_web3.default.utils.fromWei(value);
    const weiNumber = parseFloat(wei);
    if (weiNumber < 1e-5 && weiNumber > 0) {
      renderWei = "< 0.00001";
    } else {
      const base = Math.pow(10, decimalsToShow);
      renderWei = (Math.round(weiNumber * base) / base).toString();
    }
  }
  return renderWei;
}
function calcTokenValueToSend(value, decimals) {
  return value ? (value * Math.pow(10, decimals)).toString(16) : 0;
}
function isDecimal(value) {
  return Number.isFinite(parseFloat(value)) && !Number.isNaN(parseFloat(value)) && !isNaN(+value);
}
function toBN(value) {
  return import_web3.default.utils.toBN(value);
}
var addHexPrefix = (str) => {
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
};
function safeNumberToBN(value) {
  const safeValue = fastSplit(value.toString()) || "0";
  return numberToBN(safeValue);
}
function fastSplit(value, divider = ".") {
  value += "";
  const [from, to] = [value.indexOf(divider), 0];
  return value.substring(from, to) || value;
}
function stripHexPrefix(str) {
  if (typeof str !== "string") {
    return str;
  }
  return str.slice(0, 2) === "0x" ? str.slice(2) : str;
}
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
  throw new Error(
    "[number-to-bn] while converting number " + JSON.stringify(arg) + " to BN.js instance, error: invalid number value. Value must be an integer, hex string, BN or BigNumber instance. Note, decimals are not supported."
  );
}
function checkRadixLegal(radix) {
  return radix >= 2 && radix <= 62;
}
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
function transformNumToChar(num, alphabet) {
  alphabet = alphabet || "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return alphabet.charAt(num);
}
function convert({
  numStr,
  base,
  to,
  alphabet
}) {
  if (base === to || !checkRadixLegal(base) || !checkRadixLegal(to)) {
    return numStr;
  }
  let p = new import_ethereumjs_util.BN(0);
  let number10 = new import_ethereumjs_util.BN(0);
  while (p.ltn(numStr.length)) {
    number10 = number10.muln(base);
    number10 = number10.addn(transformCharToNum(numStr.charAt(p.toNumber()), base));
    p = p.addn(1);
  }
  if (to === 10) {
    return number10.toString();
  }
  let result = "";
  let cur;
  while (number10.gtn(0)) {
    cur = number10.modrn(to);
    result = transformNumToChar(cur, alphabet) + result;
    number10 = number10.divn(to);
  }
  return result;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addHexPrefix,
  calcTokenValueToSend,
  convert,
  fastSplit,
  fromTokenMinimalUnit,
  isDecimal,
  numberToBN,
  renderFromTokenMinimalUnit,
  renderFromWei,
  safeNumberToBN,
  stripHexPrefix,
  toBN
});
//# sourceMappingURL=number.util.cjs.map
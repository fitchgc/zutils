var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/utils/bn.util.ts
var bn_util_exports = {};
__export(bn_util_exports, {
  ethUnitMap: () => ethUnitMap,
  fromWei: () => fromWei,
  hexToNumber: () => hexToNumber,
  isHex: () => isHex,
  toBigInt: () => toBigInt,
  toBigWei: () => toBigWei,
  toNumber: () => toNumber,
  toWei: () => toWei
});
module.exports = __toCommonJS(bn_util_exports);
var isHexStrict = (hex) => typeof hex === "string" && /^((-)?0x[0-9a-f]+|(0x))$/i.test(hex);
var isHex = (hex) => typeof hex === "number" || typeof hex === "bigint" || typeof hex === "string" && /^((-0x|0x|-)?[0-9a-f]+|(0x))$/i.test(hex);
var base = BigInt(10);
var expo10 = (expo) => base ** BigInt(expo);
var ethUnitMap = {
  noether: BigInt("0"),
  wei: BigInt(1),
  kwei: expo10(3),
  Kwei: expo10(3),
  babbage: expo10(3),
  femtoether: expo10(3),
  mwei: expo10(6),
  Mwei: expo10(6),
  lovelace: expo10(6),
  picoether: expo10(6),
  gwei: expo10(9),
  Gwei: expo10(9),
  shannon: expo10(9),
  nanoether: expo10(9),
  nano: expo10(9),
  szabo: expo10(12),
  microether: expo10(12),
  micro: expo10(12),
  finney: expo10(15),
  milliether: expo10(15),
  milli: expo10(15),
  ether: expo10(18),
  kether: expo10(21),
  grand: expo10(21),
  mether: expo10(24),
  gether: expo10(27),
  tether: expo10(30)
};
var hexToNumber = (value) => {
  if (!isHexStrict(value)) {
    throw new Error("Invalid hex string");
  }
  const [negative, hexValue] = value.startsWith("-") ? [true, value.slice(1)] : [false, value];
  const num = BigInt(hexValue);
  if (num > Number.MAX_SAFE_INTEGER) {
    return negative ? -num : num;
  }
  if (num < Number.MIN_SAFE_INTEGER) {
    return num;
  }
  return negative ? -1 * Number(num) : Number(num);
};
var toNumber = (value) => {
  if (typeof value === "number") {
    return value;
  }
  if (typeof value === "bigint") {
    return value >= Number.MIN_SAFE_INTEGER && value <= Number.MAX_SAFE_INTEGER ? Number(value) : value;
  }
  if (typeof value === "string" && isHexStrict(value)) {
    return hexToNumber(value);
  }
  try {
    return toNumber(BigInt(value));
  } catch {
    throw new Error("ivalid number: " + value);
  }
};
var toBigInt = (value) => {
  if (typeof value === "number") {
    return BigInt(value);
  }
  if (typeof value === "bigint") {
    return value;
  }
  if (typeof value === "string" && isHex(value)) {
    return BigInt(value);
  }
  if (typeof value === "string" && value.indexOf(",") >= 0) {
    return BigInt(value.replace(/,/g, ""));
  }
  throw new Error("invalid number" + value);
};
var toBigWei = (number, unit = "ether") => {
  return toBigInt(toWei(number, unit));
};
var toWei = (number, unit = "ether") => {
  const denomination = ethUnitMap[unit];
  if (!denomination) {
    throw new Error("error unit: " + unit);
  }
  typeof number === "string" && number.indexOf(",") >= 0 && (number = number.replace(/,/g, ""));
  const [integer, fraction] = String(typeof number === "string" && !isHexStrict(number) ? number : toNumber(number)).split(".").concat("");
  const value = BigInt(`${integer}${fraction}`);
  const updatedValue = value * denomination;
  const numberOfZerosInDenomination = denomination.toString().length - 1;
  const decimals = Math.min(fraction.length, numberOfZerosInDenomination);
  if (decimals === 0) {
    return updatedValue.toString();
  }
  return updatedValue.toString().padStart(decimals, "0").slice(0, -decimals);
};
var fromWei = (number, unit = "ether") => {
  const denomination = ethUnitMap[unit];
  if (!denomination) {
    throw new Error("invalid unit: " + unit);
  }
  const value = String(toNumber(number));
  const numberOfZerosInDenomination = denomination.toString().length - 1;
  if (numberOfZerosInDenomination <= 0) {
    return value.toString();
  }
  const zeroPaddedValue = value.padStart(numberOfZerosInDenomination, "0");
  const integer = zeroPaddedValue.slice(0, -numberOfZerosInDenomination);
  const fraction = zeroPaddedValue.slice(-numberOfZerosInDenomination).replace(/\.?0+$/, "");
  if (integer === "") {
    return `0.${fraction}`;
  }
  if (fraction === "") {
    return integer;
  }
  return `${integer}.${fraction}`;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ethUnitMap,
  fromWei,
  hexToNumber,
  isHex,
  toBigInt,
  toBigWei,
  toNumber,
  toWei
});
//# sourceMappingURL=bn.util.cjs.map
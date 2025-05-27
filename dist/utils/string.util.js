// src/utils/string.util.ts
function isTrue(obj) {
  return obj === "true" || obj === "TRUE" || obj === "True" || obj === "on" || obj === "ON" || obj === true || obj === 1 || obj === "1" || obj === "YES" || obj === "yes";
}
function isObjectId(id) {
  return /^[a-fA-F0-9]{24}$/.test(id);
}
var base62Alphabet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
function string10to62(number) {
  const chars = base62Alphabet.split("");
  const radix = chars.length;
  let qutient = +number;
  const arr = [];
  do {
    const mod = qutient % radix;
    qutient = (qutient - mod) / radix;
    arr.unshift(chars[mod]);
  } while (qutient);
  return arr.join("");
}
function string62to10(numberCode) {
  const chars = base62Alphabet;
  const radix = chars.length;
  numberCode = numberCode + "";
  const len = numberCode.length;
  let i = 0;
  let originNumber = 0;
  while (i < len) {
    originNumber += Math.pow(radix, i++) * (chars.indexOf(numberCode.charAt(len - i)) || 0);
  }
  return originNumber;
}
var base58Alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
var hexToBase58 = (hexString) => {
  const bytes = hexString.match(/.{1,2}/g).map((byte) => parseInt(byte, 16));
  let base58String = "";
  let num = BigInt("0x" + hexString);
  while (num > BigInt(0)) {
    const remainder = num % BigInt(58);
    num = num / BigInt(58);
    base58String = base58Alphabet[Number(remainder)] + base58String;
  }
  return base58String;
};
var base58ToHex = (base58String) => {
  const base58Length = base58String.length;
  let num = BigInt(0);
  for (let i = 0; i < base58Length; i++) {
    const charIndex = base58Alphabet.indexOf(base58String[i]);
    if (charIndex === -1) {
      throw new Error("Invalid Base58 string");
    }
    num = num * BigInt(58) + BigInt(charIndex);
  }
  return num.toString(16);
};
var hexToBase32 = (hexString) => {
  const bytes = hexString.match(/.{1,2}/g).map((byte) => parseInt(byte, 16));
  const base32Alphabet = "qpzry9x8gf2tvdw0s3jn54khce6mua7l";
  let base32String = "";
  let num = BigInt("0x" + hexString);
  while (num > BigInt(0)) {
    const remainder = num % BigInt(32);
    num = num / BigInt(32);
    base32String = base32Alphabet[Number(remainder)] + base32String;
  }
  return base32String;
};
var reNormalUUID = /^[0-9a-fA-F-]{36}$/;
var reLongUUID = /^[0-9a-fA-F]{32}$/;
var n = /-/g;
function compressUuid(e, t = false) {
  if (reNormalUUID.test(e)) {
    e = e.replace(n, "");
  } else if (!reLongUUID.test(e)) {
    return e;
  }
  var r = true === t ? 2 : 5;
  return compressHex(e, r);
}
var CHARS_BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
function compressHex(e, r) {
  var i, n2 = e.length;
  i = void 0 !== r ? r : n2 % 3;
  for (var s = e.slice(0, i), o = []; i < n2; ) {
    var u = parseInt(e[i], 16), a = parseInt(e[i + 1], 16), c = parseInt(e[i + 2], 16);
    o.push(CHARS_BASE64[u << 2 | a >> 2]);
    o.push(CHARS_BASE64[(3 & a) << 4 | c]);
    i += 3;
  }
  return s + o.join("");
}
function isUUID(uuid) {
  return reNormalUUID.test(uuid);
}
function hexToUtf8(hexString) {
  let _hexString = hexString.replace(/^0x/, "");
  let buffer = Buffer.from(_hexString, "hex");
  return buffer.toString("utf8");
}
function utf8ToHex(utf8String) {
  const buffer = Buffer.from(utf8String, "utf8");
  const hexString = buffer.toString("hex");
  return hexString;
}
function isJsonString(str) {
  try {
    if (typeof JSON.parse(str) == "object") {
      return true;
    }
  } catch (e) {
  }
  return false;
}
function checkAccountId(accountId) {
  return /^\d{4}_\d{4,6}_.+$/.test(accountId);
}
function parseGameAccountId(accountId) {
  const arr = accountId.split("_");
  const gameId = arr[1];
  const channel = arr[0];
  const openId = arr[2];
  return { gameId, channel, openId };
}
function checkAddress(address) {
  return /^0x[0-9a-fA-F]{40}$/.test(address);
}
export {
  base58ToHex,
  checkAccountId,
  checkAddress,
  compressHex,
  compressUuid,
  hexToBase32,
  hexToBase58,
  hexToUtf8,
  isJsonString,
  isObjectId,
  isTrue,
  isUUID,
  parseGameAccountId,
  string10to62,
  string62to10,
  utf8ToHex
};
//# sourceMappingURL=string.util.js.map
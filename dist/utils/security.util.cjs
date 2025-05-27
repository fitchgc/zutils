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

// src/utils/security.util.ts
var security_util_exports = {};
__export(security_util_exports, {
  aesDecrypt: () => aesDecrypt,
  aesEncrypt: () => aesEncrypt,
  checkSign: () => checkSign,
  createSign: () => createSign,
  genRandomString: () => genRandomString,
  hmac: () => hmac,
  hmacSha256: () => hmacSha256,
  md5: () => md5,
  randomWithProb: () => randomWithProb,
  sha1: () => sha1,
  sha3_256: () => sha3_256,
  sha512: () => sha512,
  shortUuid: () => shortUuid,
  uuid: () => uuid
});
module.exports = __toCommonJS(security_util_exports);
var import_crypto = __toESM(require("crypto"), 1);
var import_crypto_js = __toESM(require("crypto-js"), 1);

// src/utils/string.util.ts
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

// src/utils/security.util.ts
function genRandomString(length) {
  return import_crypto.default.randomBytes(Math.ceil(length / 2)).toString("hex").slice(0, length);
}
function randomWithProb(prob_array) {
  let total = 0;
  for (let _d of prob_array) {
    total += _d;
  }
  prob_array = prob_array.map((o) => o / total);
  let r = Math.random();
  let s = prob_array.map((v, index) => {
    return { index, prob: v };
  }).sort((a, b) => a.prob - b.prob);
  let result = s.find((v) => (r -= v.prob) <= 0);
  return result ? result.index : s.length - 1;
}
function uuid() {
  return import_crypto.default.randomUUID();
}
function shortUuid() {
  let uid = uuid();
  return compressUuid(uid);
}
function hmac(input, key, out) {
  return out ? import_crypto.default.createHmac("sha1", key).update(input).digest(out) : import_crypto.default.createHmac("sha1", key).update(input).digest("hex");
}
function md5(str) {
  const md5sum = import_crypto.default.createHash("md5");
  md5sum.update(str);
  str = md5sum.digest("hex");
  return str;
}
function sha1(str) {
  const md5sum = import_crypto.default.createHash("sha1");
  md5sum.update(str);
  str = md5sum.digest("hex");
  return str;
}
function sha512(password, salt) {
  let hash = import_crypto.default.createHmac("sha512", salt);
  hash.update(password);
  let value = hash.digest("hex");
  return {
    salt,
    passwordHash: value
  };
}
function sha3_256(str) {
  let hash = import_crypto.default.createHash("sha3-256");
  hash.update(str);
  return hash.digest("hex");
}
function hmacSha256(str, key) {
  const md5sum = import_crypto.default.createHmac("sha256", key);
  md5sum.update(str);
  const data = md5sum.digest("hex");
  console.log(`HmacSHA256 rawContent is [${str}], key is [${key}], hash result is [${data}]`);
  return data;
}
var aesEncrypt = (plaintText, key) => {
  key = import_crypto_js.default.SHA1(key).toString().substring(0, 16);
  key = import_crypto_js.default.enc.Base64.parse(key);
  let encryptedData = import_crypto_js.default.AES.encrypt(plaintText, key, {
    mode: import_crypto_js.default.mode.ECB,
    padding: import_crypto_js.default.pad.Pkcs7
  });
  return encryptedData.toString(import_crypto_js.default.format.Hex);
};
var aesDecrypt = (encryptedDataHexStr, key) => {
  key = import_crypto_js.default.SHA1(key).toString().substring(0, 16);
  key = import_crypto_js.default.enc.Base64.parse(key);
  let encryptedHex = import_crypto_js.default.enc.Hex.parse(encryptedDataHexStr);
  let encryptedBase64 = import_crypto_js.default.enc.Base64.stringify(encryptedHex);
  var decryptedData = import_crypto_js.default.AES.decrypt(encryptedBase64, key, {
    mode: import_crypto_js.default.mode.ECB,
    padding: import_crypto_js.default.pad.Pkcs7
  });
  return decryptedData.toString(import_crypto_js.default.enc.Utf8);
};
function createSign(secretKey, paramStr, timestamp) {
  paramStr = `${paramStr}:${timestamp}:${secretKey}`;
  return sha1(paramStr);
}
function checkSign({
  secretKey,
  data,
  sign,
  signKeys
}) {
  signKeys.sort();
  let signStr = "";
  for (let key of signKeys) {
    if (signStr.length > 0) {
      signStr += "&";
    }
    signStr += `${key}=${data[key]}`;
  }
  console.log(signStr);
  let sign1 = hmacSha256(signStr, secretKey);
  return sign1 === sign;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  aesDecrypt,
  aesEncrypt,
  checkSign,
  createSign,
  genRandomString,
  hmac,
  hmacSha256,
  md5,
  randomWithProb,
  sha1,
  sha3_256,
  sha512,
  shortUuid,
  uuid
});
//# sourceMappingURL=security.util.cjs.map
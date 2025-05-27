// src/utils/security.util.ts
import crypto from "crypto";
import CryptoJS from "crypto-js";

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
  return crypto.randomBytes(Math.ceil(length / 2)).toString("hex").slice(0, length);
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
  return crypto.randomUUID();
}
function shortUuid() {
  let uid = uuid();
  return compressUuid(uid);
}
function hmac(input, key, out) {
  return out ? crypto.createHmac("sha1", key).update(input).digest(out) : crypto.createHmac("sha1", key).update(input).digest("hex");
}
function md5(str) {
  const md5sum = crypto.createHash("md5");
  md5sum.update(str);
  str = md5sum.digest("hex");
  return str;
}
function sha1(str) {
  const md5sum = crypto.createHash("sha1");
  md5sum.update(str);
  str = md5sum.digest("hex");
  return str;
}
function sha512(password, salt) {
  let hash = crypto.createHmac("sha512", salt);
  hash.update(password);
  let value = hash.digest("hex");
  return {
    salt,
    passwordHash: value
  };
}
function sha3_256(str) {
  let hash = crypto.createHash("sha3-256");
  hash.update(str);
  return hash.digest("hex");
}
function hmacSha256(str, key) {
  const md5sum = crypto.createHmac("sha256", key);
  md5sum.update(str);
  const data = md5sum.digest("hex");
  console.log(`HmacSHA256 rawContent is [${str}], key is [${key}], hash result is [${data}]`);
  return data;
}
var aesEncrypt = (plaintText, key) => {
  key = CryptoJS.SHA1(key).toString().substring(0, 16);
  key = CryptoJS.enc.Base64.parse(key);
  let encryptedData = CryptoJS.AES.encrypt(plaintText, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return encryptedData.toString(CryptoJS.format.Hex);
};
var aesDecrypt = (encryptedDataHexStr, key) => {
  key = CryptoJS.SHA1(key).toString().substring(0, 16);
  key = CryptoJS.enc.Base64.parse(key);
  let encryptedHex = CryptoJS.enc.Hex.parse(encryptedDataHexStr);
  let encryptedBase64 = CryptoJS.enc.Base64.stringify(encryptedHex);
  var decryptedData = CryptoJS.AES.decrypt(encryptedBase64, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return decryptedData.toString(CryptoJS.enc.Utf8);
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
export {
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
};
//# sourceMappingURL=security.util.js.map
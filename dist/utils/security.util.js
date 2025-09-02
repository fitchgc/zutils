var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

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
__name(compressUuid, "compressUuid");
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
__name(compressHex, "compressHex");

// src/utils/security.util.ts
import pkg from "scrypt-js";
import { sha3 } from "web3-utils";
import argon2 from "argon2";
var { syncScrypt } = pkg;
function genRandomString(length) {
  return crypto.randomBytes(Math.ceil(length / 2)).toString("hex").slice(0, length);
}
__name(genRandomString, "genRandomString");
function randomWithProb(prob_array) {
  let total = 0;
  for (let _d of prob_array) {
    total += _d;
  }
  prob_array = prob_array.map((o) => o / total);
  let r = Math.random();
  let s = prob_array.map((v, index) => {
    return {
      index,
      prob: v
    };
  }).sort((a, b) => a.prob - b.prob);
  let result = s.find((v) => (r -= v.prob) <= 0);
  return result ? result.index : s.length - 1;
}
__name(randomWithProb, "randomWithProb");
function uuid() {
  return crypto.randomUUID();
}
__name(uuid, "uuid");
function shortUuid() {
  let uid = uuid();
  return compressUuid(uid);
}
__name(shortUuid, "shortUuid");
function hmac(input, key, out) {
  return out ? crypto.createHmac("sha1", key).update(input).digest(out) : crypto.createHmac("sha1", key).update(input).digest("hex");
}
__name(hmac, "hmac");
function md5(str) {
  const md5sum = crypto.createHash("md5");
  md5sum.update(str);
  str = md5sum.digest("hex");
  return str;
}
__name(md5, "md5");
function sha1(str) {
  const md5sum = crypto.createHash("sha1");
  md5sum.update(str);
  str = md5sum.digest("hex");
  return str;
}
__name(sha1, "sha1");
function sha512(password, salt) {
  let hash = crypto.createHmac("sha512", salt);
  hash.update(password);
  let value = hash.digest("hex");
  return {
    salt,
    passwordHash: value
  };
}
__name(sha512, "sha512");
function sha3_256(str) {
  let hash = crypto.createHash("sha3-256");
  hash.update(str);
  return hash.digest("hex");
}
__name(sha3_256, "sha3_256");
function hmacSha256(str, key) {
  const md5sum = crypto.createHmac("sha256", key);
  md5sum.update(str);
  const data = md5sum.digest("hex");
  console.log(`HmacSHA256 rawContent is [${str}], key is [${key}], hash result is [${data}]`);
  return data;
}
__name(hmacSha256, "hmacSha256");
var aesEncrypt = /* @__PURE__ */ __name((plaintText, key) => {
  key = CryptoJS.SHA1(key).toString().substring(0, 16);
  key = CryptoJS.enc.Base64.parse(key);
  let encryptedData = CryptoJS.AES.encrypt(plaintText, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return encryptedData.toString(CryptoJS.format.Hex);
}, "aesEncrypt");
var aesDecrypt = /* @__PURE__ */ __name((encryptedDataHexStr, key) => {
  key = CryptoJS.SHA1(key).toString().substring(0, 16);
  key = CryptoJS.enc.Base64.parse(key);
  let encryptedHex = CryptoJS.enc.Hex.parse(encryptedDataHexStr);
  let encryptedBase64 = CryptoJS.enc.Base64.stringify(encryptedHex);
  var decryptedData = CryptoJS.AES.decrypt(encryptedBase64, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return decryptedData.toString(CryptoJS.enc.Utf8);
}, "aesDecrypt");
function createSign(secretKey, paramStr, timestamp) {
  paramStr = `${paramStr}:${timestamp}:${secretKey}`;
  return sha1(paramStr);
}
__name(createSign, "createSign");
function checkSign({ secretKey, data, sign, signKeys }) {
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
__name(checkSign, "checkSign");
var getPasswordInput = /* @__PURE__ */ __name(() => {
  return new Promise((resolve) => {
    process.stdout.write("Please enter password: ");
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding("utf8");
    let password = "";
    process.stdin.on("data", (key) => {
      if (key === "\r" || key === "\n") {
        process.stdin.setRawMode(false);
        process.stdin.pause();
        process.stdout.write("\n");
        resolve(password);
      } else if (key === "") {
        process.exit(1);
      } else if (key === "\x7F" || key === "\b") {
        if (password.length > 0) {
          password = password.slice(0, -1);
        }
      } else {
        password += key;
      }
    });
  });
}, "getPasswordInput");
var decrypt = /* @__PURE__ */ __name(async function(v3Keystore, password, nonStrict) {
  var json = !!v3Keystore && typeof v3Keystore === "object" ? v3Keystore : JSON.parse(nonStrict ? v3Keystore.toLowerCase() : v3Keystore);
  const cryptoObj = json.crypto || json;
  const kdfparams = cryptoObj.kdfparams;
  let derivedKey;
  if (cryptoObj.kdf === "scrypt") {
    derivedKey = syncScrypt(Buffer.from(password), Buffer.from(kdfparams.salt, "hex"), kdfparams.n, kdfparams.r, kdfparams.p, kdfparams.dklen);
  } else if (cryptoObj.kdf === "argon2") {
    try {
      derivedKey = await argon2.hash(password, {
        salt: Buffer.from(kdfparams.salt, "hex"),
        hashLength: kdfparams.dklen,
        timeCost: kdfparams.t,
        memoryCost: kdfparams.m,
        parallelism: kdfparams.p,
        type: argon2.argon2id,
        raw: true
      });
    } catch (error) {
      throw new Error("Argon2 key derivation failed: " + error.message);
    }
  }
  var ciphertext = Buffer.from(cryptoObj.ciphertext, "hex");
  var mac = sha3(Uint8Array.from(Buffer.from([
    ...derivedKey.slice(16, 32),
    ...ciphertext
  ]))).replace("0x", "");
  if (mac !== cryptoObj.mac) {
    throw new Error("Key derivation failed - possibly wrong password");
  }
  var decipher = crypto.createDecipheriv(cryptoObj.cipher, derivedKey.slice(0, 16), Uint8Array.from(Buffer.from(cryptoObj.cipherparams.iv, "hex")));
  var seed = "0x" + Buffer.from([
    ...decipher.update(Uint8Array.from(ciphertext)),
    ...decipher.final()
  ]).toString("hex");
  return seed;
}, "decrypt");
var encrypt = /* @__PURE__ */ __name(async function(privateKey, password, options) {
  options = options || {};
  var salt = options.salt || crypto.randomBytes(32);
  var iv = options.iv || crypto.randomBytes(16);
  var derivedKey;
  var kdf = options.kdf || "scrypt";
  var kdfparams = {
    dklen: options.dklen || 32,
    salt: salt.toString("hex")
  };
  if (kdf === "scrypt") {
    kdfparams.n = options.n || 8192;
    kdfparams.r = options.r || 8;
    kdfparams.p = options.p || 1;
    derivedKey = syncScrypt(Buffer.from(password), Buffer.from(kdfparams.salt, "hex"), kdfparams.n, kdfparams.r, kdfparams.p, kdfparams.dklen);
  } else if (kdf === "argon2") {
    kdfparams.t = options.t || 3;
    kdfparams.m = options.m || 4096;
    kdfparams.p = options.p || 1;
    try {
      derivedKey = await argon2.hash(password, {
        salt: Buffer.from(kdfparams.salt, "hex"),
        hashLength: kdfparams.dklen,
        timeCost: kdfparams.t,
        memoryCost: kdfparams.m,
        parallelism: kdfparams.p,
        type: argon2.argon2id,
        raw: true
      });
    } catch (error) {
      throw new Error("Argon2 key derivation failed: " + error.message);
    }
  }
  var cipher = crypto.createCipheriv(options.cipher || "aes-128-ctr", derivedKey.slice(0, 16), Uint8Array.from(iv));
  if (!cipher) {
    throw new Error("Unsupported cipher");
  }
  var ciphertext = Buffer.from([
    ...cipher.update(Uint8Array.from(Buffer.from(privateKey.replace("0x", ""), "hex"))),
    ...cipher.final()
  ]);
  var mac = sha3(Uint8Array.from(Buffer.from([
    ...derivedKey.slice(16, 32),
    ...ciphertext
  ]))).replace("0x", "");
  return {
    ciphertext: ciphertext.toString("hex"),
    cipherparams: {
      iv: iv.toString("hex")
    },
    cipher: options.cipher || "aes-128-ctr",
    kdf,
    kdfparams,
    mac: mac.toString()
  };
}, "encrypt");
var encryptPrivateKey = /* @__PURE__ */ __name(async (privateKey, password) => {
  const encryptedData = await encrypt(privateKey, password, {
    kdf: "argon2"
  });
  const { ciphertext, cipherparams, mac, kdfparams } = encryptedData;
  return `${cipherparams.iv}${kdfparams.salt}${mac}${ciphertext}`;
}, "encryptPrivateKey");
var decryptPrivateKey = /* @__PURE__ */ __name(async (encryptedStr, password) => {
  const iv = encryptedStr.slice(0, 32);
  const salt = encryptedStr.slice(32, 96);
  const mac = encryptedStr.slice(96, 160);
  const ciphertext = encryptedStr.slice(160);
  return await decrypt({
    ciphertext,
    cipherparams: {
      iv
    },
    cipher: "aes-128-ctr",
    kdf: "argon2",
    mac,
    kdfparams: {
      salt,
      dklen: 32,
      t: 3,
      m: 4096,
      p: 1
    }
  }, password);
}, "decryptPrivateKey");
export {
  aesDecrypt,
  aesEncrypt,
  checkSign,
  createSign,
  decryptPrivateKey,
  encryptPrivateKey,
  genRandomString,
  getPasswordInput,
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
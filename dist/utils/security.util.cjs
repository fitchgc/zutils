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

// src/utils/security.util.ts
var security_util_exports = {};
__export(security_util_exports, {
  aesDecrypt: () => aesDecrypt,
  aesEncrypt: () => aesEncrypt,
  checkSign: () => checkSign,
  createSign: () => createSign,
  decryptPrivateKey: () => decryptPrivateKey,
  encryptPrivateKey: () => encryptPrivateKey,
  genRandomString: () => genRandomString,
  getPasswordInput: () => getPasswordInput,
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
var import_scrypt_js = __toESM(require("scrypt-js"), 1);
var import_ethers = require("ethers");
var import_argon2 = __toESM(require("argon2"), 1);
var { syncScrypt } = import_scrypt_js.default;
function genRandomString(length) {
  return import_crypto.default.randomBytes(Math.ceil(length / 2)).toString("hex").slice(0, length);
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
  return import_crypto.default.randomUUID();
}
__name(uuid, "uuid");
function shortUuid() {
  let uid = uuid();
  return compressUuid(uid);
}
__name(shortUuid, "shortUuid");
function hmac(input, key, out) {
  return out ? import_crypto.default.createHmac("sha1", key).update(input).digest(out) : import_crypto.default.createHmac("sha1", key).update(input).digest("hex");
}
__name(hmac, "hmac");
function md5(str) {
  const md5sum = import_crypto.default.createHash("md5");
  md5sum.update(str);
  str = md5sum.digest("hex");
  return str;
}
__name(md5, "md5");
function sha1(str) {
  const md5sum = import_crypto.default.createHash("sha1");
  md5sum.update(str);
  str = md5sum.digest("hex");
  return str;
}
__name(sha1, "sha1");
function sha512(password, salt) {
  let hash = import_crypto.default.createHmac("sha512", salt);
  hash.update(password);
  let value = hash.digest("hex");
  return {
    salt,
    passwordHash: value
  };
}
__name(sha512, "sha512");
function sha3_256(str) {
  let hash = import_crypto.default.createHash("sha3-256");
  hash.update(str);
  return hash.digest("hex");
}
__name(sha3_256, "sha3_256");
function hmacSha256(str, key) {
  const md5sum = import_crypto.default.createHmac("sha256", key);
  md5sum.update(str);
  const data = md5sum.digest("hex");
  console.log(`HmacSHA256 rawContent is [${str}], key is [${key}], hash result is [${data}]`);
  return data;
}
__name(hmacSha256, "hmacSha256");
var aesEncrypt = /* @__PURE__ */ __name((plaintText, key) => {
  key = import_crypto_js.default.SHA1(key).toString().substring(0, 16);
  key = import_crypto_js.default.enc.Base64.parse(key);
  let encryptedData = import_crypto_js.default.AES.encrypt(plaintText, key, {
    mode: import_crypto_js.default.mode.ECB,
    padding: import_crypto_js.default.pad.Pkcs7
  });
  return encryptedData.toString(import_crypto_js.default.format.Hex);
}, "aesEncrypt");
var aesDecrypt = /* @__PURE__ */ __name((encryptedDataHexStr, key) => {
  key = import_crypto_js.default.SHA1(key).toString().substring(0, 16);
  key = import_crypto_js.default.enc.Base64.parse(key);
  let encryptedHex = import_crypto_js.default.enc.Hex.parse(encryptedDataHexStr);
  let encryptedBase64 = import_crypto_js.default.enc.Base64.stringify(encryptedHex);
  var decryptedData = import_crypto_js.default.AES.decrypt(encryptedBase64, key, {
    mode: import_crypto_js.default.mode.ECB,
    padding: import_crypto_js.default.pad.Pkcs7
  });
  return decryptedData.toString(import_crypto_js.default.enc.Utf8);
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
      derivedKey = await import_argon2.default.hash(password, {
        salt: Buffer.from(kdfparams.salt, "hex"),
        hashLength: kdfparams.dklen,
        timeCost: kdfparams.t,
        memoryCost: kdfparams.m,
        parallelism: kdfparams.p,
        type: import_argon2.default.argon2id,
        raw: true
      });
    } catch (error) {
      throw new Error("Argon2 key derivation failed: " + error.message);
    }
  }
  var ciphertext = Buffer.from(cryptoObj.ciphertext, "hex");
  var mac = (0, import_ethers.keccak256)(Uint8Array.from(Buffer.from([
    ...derivedKey.slice(16, 32),
    ...ciphertext
  ]))).replace("0x", "");
  if (mac !== cryptoObj.mac) {
    throw new Error("Key derivation failed - possibly wrong password");
  }
  var decipher = import_crypto.default.createDecipheriv(cryptoObj.cipher, derivedKey.slice(0, 16), Uint8Array.from(Buffer.from(cryptoObj.cipherparams.iv, "hex")));
  var seed = "0x" + Buffer.from([
    ...decipher.update(Uint8Array.from(ciphertext)),
    ...decipher.final()
  ]).toString("hex");
  return seed;
}, "decrypt");
var encrypt = /* @__PURE__ */ __name(async function(privateKey, password, options) {
  options = options || {};
  var salt = options.salt || import_crypto.default.randomBytes(32);
  var iv = options.iv || import_crypto.default.randomBytes(16);
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
      derivedKey = await import_argon2.default.hash(password, {
        salt: Buffer.from(kdfparams.salt, "hex"),
        hashLength: kdfparams.dklen,
        timeCost: kdfparams.t,
        memoryCost: kdfparams.m,
        parallelism: kdfparams.p,
        type: import_argon2.default.argon2id,
        raw: true
      });
    } catch (error) {
      throw new Error("Argon2 key derivation failed: " + error.message);
    }
  }
  var cipher = import_crypto.default.createCipheriv(options.cipher || "aes-128-ctr", derivedKey.slice(0, 16), Uint8Array.from(iv));
  if (!cipher) {
    throw new Error("Unsupported cipher");
  }
  var ciphertext = Buffer.from([
    ...cipher.update(Uint8Array.from(Buffer.from(privateKey.replace("0x", ""), "hex"))),
    ...cipher.final()
  ]);
  var mac = (0, import_ethers.keccak256)(Uint8Array.from(Buffer.from([
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
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
});
//# sourceMappingURL=security.util.cjs.map
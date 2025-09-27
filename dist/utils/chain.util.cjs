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

// src/utils/chain.util.ts
var chain_util_exports = {};
__export(chain_util_exports, {
  buildLoginSignMsg: () => buildLoginSignMsg,
  checkPersionalSign: () => checkPersionalSign,
  decodeEvent: () => decodeEvent,
  formatAddress: () => formatAddress,
  getTopics: () => getTopics,
  recoverTypedSignatureV4: () => recoverTypedSignatureV4,
  toEIP55: () => toEIP55
});
module.exports = __toCommonJS(chain_util_exports);
var import_eth_sig_util = require("@metamask/eth-sig-util");

// node_modules/@noble/hashes/esm/cryptoNode.js
var nc = __toESM(require("crypto"), 1);
var crypto = nc && typeof nc === "object" && "webcrypto" in nc ? nc.webcrypto : void 0;

// node_modules/@noble/hashes/esm/utils.js
var u8a = /* @__PURE__ */ __name((a) => a instanceof Uint8Array, "u8a");
var u32 = /* @__PURE__ */ __name((arr) => new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4)), "u32");
var isLE = new Uint8Array(new Uint32Array([
  287454020
]).buffer)[0] === 68;
if (!isLE) throw new Error("Non little-endian hardware is not supported");
var hexes = Array.from({
  length: 256
}, (v, i) => i.toString(16).padStart(2, "0"));
function bytesToHex(bytes2) {
  if (!u8a(bytes2)) throw new Error("Uint8Array expected");
  let hex = "";
  for (let i = 0; i < bytes2.length; i++) {
    hex += hexes[bytes2[i]];
  }
  return hex;
}
__name(bytesToHex, "bytesToHex");
function utf8ToBytes(str) {
  if (typeof str !== "string") throw new Error(`utf8ToBytes expected string, got ${typeof str}`);
  return new Uint8Array(new TextEncoder().encode(str));
}
__name(utf8ToBytes, "utf8ToBytes");
function toBytes(data) {
  if (typeof data === "string") data = utf8ToBytes(data);
  if (!u8a(data)) throw new Error(`expected Uint8Array, got ${typeof data}`);
  return data;
}
__name(toBytes, "toBytes");
var _Hash = class _Hash {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
};
__name(_Hash, "Hash");
var Hash = _Hash;
function wrapConstructor(hashCons) {
  const hashC = /* @__PURE__ */ __name((msg) => hashCons().update(toBytes(msg)).digest(), "hashC");
  const tmp = hashCons();
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.create = () => hashCons();
  return hashC;
}
__name(wrapConstructor, "wrapConstructor");
function wrapXOFConstructorWithOpts(hashCons) {
  const hashC = /* @__PURE__ */ __name((msg, opts) => hashCons(opts).update(toBytes(msg)).digest(), "hashC");
  const tmp = hashCons({});
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.create = (opts) => hashCons(opts);
  return hashC;
}
__name(wrapXOFConstructorWithOpts, "wrapXOFConstructorWithOpts");

// node_modules/@noble/hashes/esm/_assert.js
function number(n) {
  if (!Number.isSafeInteger(n) || n < 0) throw new Error(`Wrong positive integer: ${n}`);
}
__name(number, "number");
function bool(b) {
  if (typeof b !== "boolean") throw new Error(`Expected boolean, not ${b}`);
}
__name(bool, "bool");
function bytes(b, ...lengths) {
  if (!(b instanceof Uint8Array)) throw new Error("Expected Uint8Array");
  if (lengths.length > 0 && !lengths.includes(b.length)) throw new Error(`Expected Uint8Array of length ${lengths}, not of length=${b.length}`);
}
__name(bytes, "bytes");
function hash(hash2) {
  if (typeof hash2 !== "function" || typeof hash2.create !== "function") throw new Error("Hash should be wrapped by utils.wrapConstructor");
  number(hash2.outputLen);
  number(hash2.blockLen);
}
__name(hash, "hash");
function exists(instance, checkFinished = true) {
  if (instance.destroyed) throw new Error("Hash instance has been destroyed");
  if (checkFinished && instance.finished) throw new Error("Hash#digest() has already been called");
}
__name(exists, "exists");
function output(out, instance) {
  bytes(out);
  const min = instance.outputLen;
  if (out.length < min) {
    throw new Error(`digestInto() expects output buffer of length at least ${min}`);
  }
}
__name(output, "output");
var assert = {
  number,
  bool,
  bytes,
  hash,
  exists,
  output
};
var assert_default = assert;

// node_modules/@noble/hashes/esm/_u64.js
var U32_MASK64 = BigInt(2 ** 32 - 1);
var _32n = BigInt(32);
function fromBig(n, le = false) {
  if (le) return {
    h: Number(n & U32_MASK64),
    l: Number(n >> _32n & U32_MASK64)
  };
  return {
    h: Number(n >> _32n & U32_MASK64) | 0,
    l: Number(n & U32_MASK64) | 0
  };
}
__name(fromBig, "fromBig");
function split(lst, le = false) {
  let Ah = new Uint32Array(lst.length);
  let Al = new Uint32Array(lst.length);
  for (let i = 0; i < lst.length; i++) {
    const { h, l } = fromBig(lst[i], le);
    [Ah[i], Al[i]] = [
      h,
      l
    ];
  }
  return [
    Ah,
    Al
  ];
}
__name(split, "split");
var toBig = /* @__PURE__ */ __name((h, l) => BigInt(h >>> 0) << _32n | BigInt(l >>> 0), "toBig");
var shrSH = /* @__PURE__ */ __name((h, l, s) => h >>> s, "shrSH");
var shrSL = /* @__PURE__ */ __name((h, l, s) => h << 32 - s | l >>> s, "shrSL");
var rotrSH = /* @__PURE__ */ __name((h, l, s) => h >>> s | l << 32 - s, "rotrSH");
var rotrSL = /* @__PURE__ */ __name((h, l, s) => h << 32 - s | l >>> s, "rotrSL");
var rotrBH = /* @__PURE__ */ __name((h, l, s) => h << 64 - s | l >>> s - 32, "rotrBH");
var rotrBL = /* @__PURE__ */ __name((h, l, s) => h >>> s - 32 | l << 64 - s, "rotrBL");
var rotr32H = /* @__PURE__ */ __name((h, l) => l, "rotr32H");
var rotr32L = /* @__PURE__ */ __name((h, l) => h, "rotr32L");
var rotlSH = /* @__PURE__ */ __name((h, l, s) => h << s | l >>> 32 - s, "rotlSH");
var rotlSL = /* @__PURE__ */ __name((h, l, s) => l << s | h >>> 32 - s, "rotlSL");
var rotlBH = /* @__PURE__ */ __name((h, l, s) => l << s - 32 | h >>> 64 - s, "rotlBH");
var rotlBL = /* @__PURE__ */ __name((h, l, s) => h << s - 32 | l >>> 64 - s, "rotlBL");
function add(Ah, Al, Bh, Bl) {
  const l = (Al >>> 0) + (Bl >>> 0);
  return {
    h: Ah + Bh + (l / 2 ** 32 | 0) | 0,
    l: l | 0
  };
}
__name(add, "add");
var add3L = /* @__PURE__ */ __name((Al, Bl, Cl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0), "add3L");
var add3H = /* @__PURE__ */ __name((low, Ah, Bh, Ch) => Ah + Bh + Ch + (low / 2 ** 32 | 0) | 0, "add3H");
var add4L = /* @__PURE__ */ __name((Al, Bl, Cl, Dl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0), "add4L");
var add4H = /* @__PURE__ */ __name((low, Ah, Bh, Ch, Dh) => Ah + Bh + Ch + Dh + (low / 2 ** 32 | 0) | 0, "add4H");
var add5L = /* @__PURE__ */ __name((Al, Bl, Cl, Dl, El) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0) + (El >>> 0), "add5L");
var add5H = /* @__PURE__ */ __name((low, Ah, Bh, Ch, Dh, Eh) => Ah + Bh + Ch + Dh + Eh + (low / 2 ** 32 | 0) | 0, "add5H");
var u64 = {
  fromBig,
  split,
  toBig,
  shrSH,
  shrSL,
  rotrSH,
  rotrSL,
  rotrBH,
  rotrBL,
  rotr32H,
  rotr32L,
  rotlSH,
  rotlSL,
  rotlBH,
  rotlBL,
  add,
  add3L,
  add3H,
  add4L,
  add4H,
  add5H,
  add5L
};
var u64_default = u64;

// node_modules/@noble/hashes/esm/sha3.js
var [SHA3_PI, SHA3_ROTL, _SHA3_IOTA] = [
  [],
  [],
  []
];
var _0n = BigInt(0);
var _1n = BigInt(1);
var _2n = BigInt(2);
var _7n = BigInt(7);
var _256n = BigInt(256);
var _0x71n = BigInt(113);
for (let round = 0, R = _1n, x = 1, y = 0; round < 24; round++) {
  [x, y] = [
    y,
    (2 * x + 3 * y) % 5
  ];
  SHA3_PI.push(2 * (5 * y + x));
  SHA3_ROTL.push((round + 1) * (round + 2) / 2 % 64);
  let t = _0n;
  for (let j = 0; j < 7; j++) {
    R = (R << _1n ^ (R >> _7n) * _0x71n) % _256n;
    if (R & _2n) t ^= _1n << (_1n << BigInt(j)) - _1n;
  }
  _SHA3_IOTA.push(t);
}
var [SHA3_IOTA_H, SHA3_IOTA_L] = u64_default.split(_SHA3_IOTA, true);
var rotlH = /* @__PURE__ */ __name((h, l, s) => s > 32 ? u64_default.rotlBH(h, l, s) : u64_default.rotlSH(h, l, s), "rotlH");
var rotlL = /* @__PURE__ */ __name((h, l, s) => s > 32 ? u64_default.rotlBL(h, l, s) : u64_default.rotlSL(h, l, s), "rotlL");
function keccakP(s, rounds = 24) {
  const B = new Uint32Array(5 * 2);
  for (let round = 24 - rounds; round < 24; round++) {
    for (let x = 0; x < 10; x++) B[x] = s[x] ^ s[x + 10] ^ s[x + 20] ^ s[x + 30] ^ s[x + 40];
    for (let x = 0; x < 10; x += 2) {
      const idx1 = (x + 8) % 10;
      const idx0 = (x + 2) % 10;
      const B0 = B[idx0];
      const B1 = B[idx0 + 1];
      const Th = rotlH(B0, B1, 1) ^ B[idx1];
      const Tl = rotlL(B0, B1, 1) ^ B[idx1 + 1];
      for (let y = 0; y < 50; y += 10) {
        s[x + y] ^= Th;
        s[x + y + 1] ^= Tl;
      }
    }
    let curH = s[2];
    let curL = s[3];
    for (let t = 0; t < 24; t++) {
      const shift = SHA3_ROTL[t];
      const Th = rotlH(curH, curL, shift);
      const Tl = rotlL(curH, curL, shift);
      const PI = SHA3_PI[t];
      curH = s[PI];
      curL = s[PI + 1];
      s[PI] = Th;
      s[PI + 1] = Tl;
    }
    for (let y = 0; y < 50; y += 10) {
      for (let x = 0; x < 10; x++) B[x] = s[y + x];
      for (let x = 0; x < 10; x++) s[y + x] ^= ~B[(x + 2) % 10] & B[(x + 4) % 10];
    }
    s[0] ^= SHA3_IOTA_H[round];
    s[1] ^= SHA3_IOTA_L[round];
  }
  B.fill(0);
}
__name(keccakP, "keccakP");
var _Keccak = class _Keccak extends Hash {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(blockLen, suffix, outputLen, enableXOF = false, rounds = 24) {
    super();
    this.blockLen = blockLen;
    this.suffix = suffix;
    this.outputLen = outputLen;
    this.enableXOF = enableXOF;
    this.rounds = rounds;
    this.pos = 0;
    this.posOut = 0;
    this.finished = false;
    this.destroyed = false;
    assert_default.number(outputLen);
    if (0 >= this.blockLen || this.blockLen >= 200) throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200);
    this.state32 = u32(this.state);
  }
  keccak() {
    keccakP(this.state32, this.rounds);
    this.posOut = 0;
    this.pos = 0;
  }
  update(data) {
    assert_default.exists(this);
    const { blockLen, state } = this;
    data = toBytes(data);
    const len = data.length;
    for (let pos = 0; pos < len; ) {
      const take = Math.min(blockLen - this.pos, len - pos);
      for (let i = 0; i < take; i++) state[this.pos++] ^= data[pos++];
      if (this.pos === blockLen) this.keccak();
    }
    return this;
  }
  finish() {
    if (this.finished) return;
    this.finished = true;
    const { state, suffix, pos, blockLen } = this;
    state[pos] ^= suffix;
    if ((suffix & 128) !== 0 && pos === blockLen - 1) this.keccak();
    state[blockLen - 1] ^= 128;
    this.keccak();
  }
  writeInto(out) {
    assert_default.exists(this, false);
    assert_default.bytes(out);
    this.finish();
    const bufferOut = this.state;
    const { blockLen } = this;
    for (let pos = 0, len = out.length; pos < len; ) {
      if (this.posOut >= blockLen) this.keccak();
      const take = Math.min(blockLen - this.posOut, len - pos);
      out.set(bufferOut.subarray(this.posOut, this.posOut + take), pos);
      this.posOut += take;
      pos += take;
    }
    return out;
  }
  xofInto(out) {
    if (!this.enableXOF) throw new Error("XOF is not possible for this instance");
    return this.writeInto(out);
  }
  xof(bytes2) {
    assert_default.number(bytes2);
    return this.xofInto(new Uint8Array(bytes2));
  }
  digestInto(out) {
    assert_default.output(out, this);
    if (this.finished) throw new Error("digest() was already called");
    this.writeInto(out);
    this.destroy();
    return out;
  }
  digest() {
    return this.digestInto(new Uint8Array(this.outputLen));
  }
  destroy() {
    this.destroyed = true;
    this.state.fill(0);
  }
  _cloneInto(to) {
    const { blockLen, suffix, outputLen, rounds, enableXOF } = this;
    to || (to = new _Keccak(blockLen, suffix, outputLen, enableXOF, rounds));
    to.state32.set(this.state32);
    to.pos = this.pos;
    to.posOut = this.posOut;
    to.finished = this.finished;
    to.rounds = rounds;
    to.suffix = suffix;
    to.outputLen = outputLen;
    to.enableXOF = enableXOF;
    to.destroyed = this.destroyed;
    return to;
  }
};
__name(_Keccak, "Keccak");
var Keccak = _Keccak;
var gen = /* @__PURE__ */ __name((suffix, blockLen, outputLen) => wrapConstructor(() => new Keccak(blockLen, suffix, outputLen)), "gen");
var sha3_224 = gen(6, 144, 224 / 8);
var sha3_256 = gen(6, 136, 256 / 8);
var sha3_384 = gen(6, 104, 384 / 8);
var sha3_512 = gen(6, 72, 512 / 8);
var keccak_224 = gen(1, 144, 224 / 8);
var keccak_256 = gen(1, 136, 256 / 8);
var keccak_384 = gen(1, 104, 384 / 8);
var keccak_512 = gen(1, 72, 512 / 8);
var genShake = /* @__PURE__ */ __name((suffix, blockLen, outputLen) => wrapXOFConstructorWithOpts((opts = {}) => new Keccak(blockLen, suffix, opts.dkLen === void 0 ? outputLen : opts.dkLen, true)), "genShake");
var shake128 = genShake(31, 168, 128 / 8);
var shake256 = genShake(31, 136, 256 / 8);

// src/utils/chain.util.ts
var import_eth_sig_util2 = require("@metamask/eth-sig-util");
var import_ethers = require("ethers");
function recoverTypedSignatureV4(signObj, signature) {
  return (0, import_eth_sig_util.recoverTypedSignature)({
    data: signObj,
    signature,
    version: import_eth_sig_util.SignTypedDataVersion.V4
  });
}
__name(recoverTypedSignatureV4, "recoverTypedSignatureV4");
function formatAddress(address) {
  if (address.length >= 10) {
    return address.substring(0, 8) + "..." + address.substring(address.length - 8);
  } else if (address.length > 0 && address.length < 10) {
    return address;
  } else {
    return "";
  }
}
__name(formatAddress, "formatAddress");
function buildLoginSignMsg(nonce, tips) {
  const signMsg = {
    tips,
    nonce
  };
  const signObj = {
    types: {
      EIP712Domain: [
        {
          name: "name",
          type: "string"
        },
        {
          name: "version",
          type: "string"
        }
      ],
      set: [
        {
          name: "tips",
          type: "string"
        },
        {
          name: "nonce",
          type: "string"
        }
      ]
    },
    primaryType: "set",
    domain: {
      name: "Auth",
      version: "1"
    },
    message: signMsg
  };
  return signObj;
}
__name(buildLoginSignMsg, "buildLoginSignMsg");
function toEIP55(address) {
  const lowerAddress = `${address}`.toLowerCase().replace("0x", "");
  var hash2 = bytesToHex(keccak_256(lowerAddress));
  var ret = "0x";
  for (var i = 0; i < lowerAddress.length; i++) {
    if (parseInt(hash2[i], 16) >= 8) {
      ret += lowerAddress[i].toUpperCase();
    } else {
      ret += lowerAddress[i];
    }
  }
  return ret;
}
__name(toEIP55, "toEIP55");
function checkPersionalSign(message, address, signature) {
  if (!signature.startsWith("0x")) {
    signature = "0x" + signature;
  }
  const recovered = (0, import_eth_sig_util2.recoverPersonalSignature)({
    data: message,
    signature
  });
  return recovered === address;
}
__name(checkPersionalSign, "checkPersionalSign");
var getMethodSignature = /* @__PURE__ */ __name((abi) => {
  if (abi.type === "function" || abi.type === "event") {
    const inputs = abi.inputs || [];
    const inputTypes = inputs.map((input) => {
      if (input.type === "tuple" && input.components) {
        const componentTypes = input.components.map((comp) => comp.type).join(",");
        return `(${componentTypes})`;
      }
      return input.type;
    });
    return `${abi.name}(${inputTypes.join(",")})`;
  }
  return "";
}, "getMethodSignature");
var getTopics = /* @__PURE__ */ __name((abi) => {
  return (0, import_ethers.keccak256)(getMethodSignature(abi));
}, "getTopics");
var parseOne = /* @__PURE__ */ __name((input, value) => {
  if (input.type === "tuple[]") {
    return value.map((item) => {
      let itemData = {};
      for (let j = 0; j < input.components.length; j++) {
        const component = input.components[j];
        itemData[component.name] = parseOne(component, item[j]);
      }
      return itemData;
    });
  } else if (input.type === "tuple") {
    let itemData = {};
    for (let j = 0; j < input.components.length; j++) {
      const component = input.components[j];
      itemData[component.name] = parseOne(component, value[j]);
    }
    return itemData;
  } else {
    if (input.type === "address") {
      return value.toLowerCase();
    }
    return value;
  }
}, "parseOne");
var decodeEvent = /* @__PURE__ */ __name((abi, eventData) => {
  const iface = new import_ethers.Interface([
    abi
  ]);
  const parsedLog = iface.parseLog({
    data: eventData.data,
    topics: eventData.topics
  });
  if (!parsedLog) {
    throw new Error("Unable to parse event data");
  }
  let decodedData = {};
  const abiInputs = [
    ...abi.inputs
  ];
  for (let i = 0; i < abiInputs.length; i++) {
    const input = abiInputs[i];
    const value = parsedLog.args[i];
    decodedData[input.name] = parseOne(input, value);
  }
  return decodedData;
}, "decodeEvent");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  buildLoginSignMsg,
  checkPersionalSign,
  decodeEvent,
  formatAddress,
  getTopics,
  recoverTypedSignatureV4,
  toEIP55
});
/*! Bundled license information:

@noble/hashes/esm/utils.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)
*/
//# sourceMappingURL=chain.util.cjs.map
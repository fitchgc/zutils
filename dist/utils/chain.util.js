var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
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

// node_modules/ethjs-unit/node_modules/bn.js/lib/bn.js
var require_bn = __commonJS({
  "node_modules/ethjs-unit/node_modules/bn.js/lib/bn.js"(exports, module) {
    (function(module2, exports2) {
      "use strict";
      function assert2(val, msg) {
        if (!val) throw new Error(msg || "Assertion failed");
      }
      function inherits(ctor, superCtor) {
        ctor.super_ = superCtor;
        var TempCtor = function() {
        };
        TempCtor.prototype = superCtor.prototype;
        ctor.prototype = new TempCtor();
        ctor.prototype.constructor = ctor;
      }
      function BN2(number2, base, endian) {
        if (BN2.isBN(number2)) {
          return number2;
        }
        this.negative = 0;
        this.words = null;
        this.length = 0;
        this.red = null;
        if (number2 !== null) {
          if (base === "le" || base === "be") {
            endian = base;
            base = 10;
          }
          this._init(number2 || 0, base || 10, endian || "be");
        }
      }
      if (typeof module2 === "object") {
        module2.exports = BN2;
      } else {
        exports2.BN = BN2;
      }
      BN2.BN = BN2;
      BN2.wordSize = 26;
      var Buffer2;
      try {
        Buffer2 = __require("buffer").Buffer;
      } catch (e) {
      }
      BN2.isBN = function isBN(num) {
        if (num instanceof BN2) {
          return true;
        }
        return num !== null && typeof num === "object" && num.constructor.wordSize === BN2.wordSize && Array.isArray(num.words);
      };
      BN2.max = function max(left, right) {
        if (left.cmp(right) > 0) return left;
        return right;
      };
      BN2.min = function min(left, right) {
        if (left.cmp(right) < 0) return left;
        return right;
      };
      BN2.prototype._init = function init(number2, base, endian) {
        if (typeof number2 === "number") {
          return this._initNumber(number2, base, endian);
        }
        if (typeof number2 === "object") {
          return this._initArray(number2, base, endian);
        }
        if (base === "hex") {
          base = 16;
        }
        assert2(base === (base | 0) && base >= 2 && base <= 36);
        number2 = number2.toString().replace(/\s+/g, "");
        var start = 0;
        if (number2[0] === "-") {
          start++;
        }
        if (base === 16) {
          this._parseHex(number2, start);
        } else {
          this._parseBase(number2, base, start);
        }
        if (number2[0] === "-") {
          this.negative = 1;
        }
        this.strip();
        if (endian !== "le") return;
        this._initArray(this.toArray(), base, endian);
      };
      BN2.prototype._initNumber = function _initNumber(number2, base, endian) {
        if (number2 < 0) {
          this.negative = 1;
          number2 = -number2;
        }
        if (number2 < 67108864) {
          this.words = [number2 & 67108863];
          this.length = 1;
        } else if (number2 < 4503599627370496) {
          this.words = [
            number2 & 67108863,
            number2 / 67108864 & 67108863
          ];
          this.length = 2;
        } else {
          assert2(number2 < 9007199254740992);
          this.words = [
            number2 & 67108863,
            number2 / 67108864 & 67108863,
            1
          ];
          this.length = 3;
        }
        if (endian !== "le") return;
        this._initArray(this.toArray(), base, endian);
      };
      BN2.prototype._initArray = function _initArray(number2, base, endian) {
        assert2(typeof number2.length === "number");
        if (number2.length <= 0) {
          this.words = [0];
          this.length = 1;
          return this;
        }
        this.length = Math.ceil(number2.length / 3);
        this.words = new Array(this.length);
        for (var i = 0; i < this.length; i++) {
          this.words[i] = 0;
        }
        var j, w;
        var off = 0;
        if (endian === "be") {
          for (i = number2.length - 1, j = 0; i >= 0; i -= 3) {
            w = number2[i] | number2[i - 1] << 8 | number2[i - 2] << 16;
            this.words[j] |= w << off & 67108863;
            this.words[j + 1] = w >>> 26 - off & 67108863;
            off += 24;
            if (off >= 26) {
              off -= 26;
              j++;
            }
          }
        } else if (endian === "le") {
          for (i = 0, j = 0; i < number2.length; i += 3) {
            w = number2[i] | number2[i + 1] << 8 | number2[i + 2] << 16;
            this.words[j] |= w << off & 67108863;
            this.words[j + 1] = w >>> 26 - off & 67108863;
            off += 24;
            if (off >= 26) {
              off -= 26;
              j++;
            }
          }
        }
        return this.strip();
      };
      function parseHex(str, start, end) {
        var r = 0;
        var len = Math.min(str.length, end);
        for (var i = start; i < len; i++) {
          var c = str.charCodeAt(i) - 48;
          r <<= 4;
          if (c >= 49 && c <= 54) {
            r |= c - 49 + 10;
          } else if (c >= 17 && c <= 22) {
            r |= c - 17 + 10;
          } else {
            r |= c & 15;
          }
        }
        return r;
      }
      BN2.prototype._parseHex = function _parseHex(number2, start) {
        this.length = Math.ceil((number2.length - start) / 6);
        this.words = new Array(this.length);
        for (var i = 0; i < this.length; i++) {
          this.words[i] = 0;
        }
        var j, w;
        var off = 0;
        for (i = number2.length - 6, j = 0; i >= start; i -= 6) {
          w = parseHex(number2, i, i + 6);
          this.words[j] |= w << off & 67108863;
          this.words[j + 1] |= w >>> 26 - off & 4194303;
          off += 24;
          if (off >= 26) {
            off -= 26;
            j++;
          }
        }
        if (i + 6 !== start) {
          w = parseHex(number2, start, i + 6);
          this.words[j] |= w << off & 67108863;
          this.words[j + 1] |= w >>> 26 - off & 4194303;
        }
        this.strip();
      };
      function parseBase(str, start, end, mul) {
        var r = 0;
        var len = Math.min(str.length, end);
        for (var i = start; i < len; i++) {
          var c = str.charCodeAt(i) - 48;
          r *= mul;
          if (c >= 49) {
            r += c - 49 + 10;
          } else if (c >= 17) {
            r += c - 17 + 10;
          } else {
            r += c;
          }
        }
        return r;
      }
      BN2.prototype._parseBase = function _parseBase(number2, base, start) {
        this.words = [0];
        this.length = 1;
        for (var limbLen = 0, limbPow = 1; limbPow <= 67108863; limbPow *= base) {
          limbLen++;
        }
        limbLen--;
        limbPow = limbPow / base | 0;
        var total = number2.length - start;
        var mod = total % limbLen;
        var end = Math.min(total, total - mod) + start;
        var word = 0;
        for (var i = start; i < end; i += limbLen) {
          word = parseBase(number2, i, i + limbLen, base);
          this.imuln(limbPow);
          if (this.words[0] + word < 67108864) {
            this.words[0] += word;
          } else {
            this._iaddn(word);
          }
        }
        if (mod !== 0) {
          var pow = 1;
          word = parseBase(number2, i, number2.length, base);
          for (i = 0; i < mod; i++) {
            pow *= base;
          }
          this.imuln(pow);
          if (this.words[0] + word < 67108864) {
            this.words[0] += word;
          } else {
            this._iaddn(word);
          }
        }
      };
      BN2.prototype.copy = function copy(dest) {
        dest.words = new Array(this.length);
        for (var i = 0; i < this.length; i++) {
          dest.words[i] = this.words[i];
        }
        dest.length = this.length;
        dest.negative = this.negative;
        dest.red = this.red;
      };
      BN2.prototype.clone = function clone() {
        var r = new BN2(null);
        this.copy(r);
        return r;
      };
      BN2.prototype._expand = function _expand(size) {
        while (this.length < size) {
          this.words[this.length++] = 0;
        }
        return this;
      };
      BN2.prototype.strip = function strip() {
        while (this.length > 1 && this.words[this.length - 1] === 0) {
          this.length--;
        }
        return this._normSign();
      };
      BN2.prototype._normSign = function _normSign() {
        if (this.length === 1 && this.words[0] === 0) {
          this.negative = 0;
        }
        return this;
      };
      BN2.prototype.inspect = function inspect() {
        return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
      };
      var zeros = [
        "",
        "0",
        "00",
        "000",
        "0000",
        "00000",
        "000000",
        "0000000",
        "00000000",
        "000000000",
        "0000000000",
        "00000000000",
        "000000000000",
        "0000000000000",
        "00000000000000",
        "000000000000000",
        "0000000000000000",
        "00000000000000000",
        "000000000000000000",
        "0000000000000000000",
        "00000000000000000000",
        "000000000000000000000",
        "0000000000000000000000",
        "00000000000000000000000",
        "000000000000000000000000",
        "0000000000000000000000000"
      ];
      var groupSizes = [
        0,
        0,
        25,
        16,
        12,
        11,
        10,
        9,
        8,
        8,
        7,
        7,
        7,
        7,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5
      ];
      var groupBases = [
        0,
        0,
        33554432,
        43046721,
        16777216,
        48828125,
        60466176,
        40353607,
        16777216,
        43046721,
        1e7,
        19487171,
        35831808,
        62748517,
        7529536,
        11390625,
        16777216,
        24137569,
        34012224,
        47045881,
        64e6,
        4084101,
        5153632,
        6436343,
        7962624,
        9765625,
        11881376,
        14348907,
        17210368,
        20511149,
        243e5,
        28629151,
        33554432,
        39135393,
        45435424,
        52521875,
        60466176
      ];
      BN2.prototype.toString = function toString(base, padding) {
        base = base || 10;
        padding = padding | 0 || 1;
        var out;
        if (base === 16 || base === "hex") {
          out = "";
          var off = 0;
          var carry = 0;
          for (var i = 0; i < this.length; i++) {
            var w = this.words[i];
            var word = ((w << off | carry) & 16777215).toString(16);
            carry = w >>> 24 - off & 16777215;
            if (carry !== 0 || i !== this.length - 1) {
              out = zeros[6 - word.length] + word + out;
            } else {
              out = word + out;
            }
            off += 2;
            if (off >= 26) {
              off -= 26;
              i--;
            }
          }
          if (carry !== 0) {
            out = carry.toString(16) + out;
          }
          while (out.length % padding !== 0) {
            out = "0" + out;
          }
          if (this.negative !== 0) {
            out = "-" + out;
          }
          return out;
        }
        if (base === (base | 0) && base >= 2 && base <= 36) {
          var groupSize = groupSizes[base];
          var groupBase = groupBases[base];
          out = "";
          var c = this.clone();
          c.negative = 0;
          while (!c.isZero()) {
            var r = c.modn(groupBase).toString(base);
            c = c.idivn(groupBase);
            if (!c.isZero()) {
              out = zeros[groupSize - r.length] + r + out;
            } else {
              out = r + out;
            }
          }
          if (this.isZero()) {
            out = "0" + out;
          }
          while (out.length % padding !== 0) {
            out = "0" + out;
          }
          if (this.negative !== 0) {
            out = "-" + out;
          }
          return out;
        }
        assert2(false, "Base should be between 2 and 36");
      };
      BN2.prototype.toNumber = function toNumber() {
        var ret = this.words[0];
        if (this.length === 2) {
          ret += this.words[1] * 67108864;
        } else if (this.length === 3 && this.words[2] === 1) {
          ret += 4503599627370496 + this.words[1] * 67108864;
        } else if (this.length > 2) {
          assert2(false, "Number can only safely store up to 53 bits");
        }
        return this.negative !== 0 ? -ret : ret;
      };
      BN2.prototype.toJSON = function toJSON() {
        return this.toString(16);
      };
      BN2.prototype.toBuffer = function toBuffer(endian, length) {
        assert2(typeof Buffer2 !== "undefined");
        return this.toArrayLike(Buffer2, endian, length);
      };
      BN2.prototype.toArray = function toArray(endian, length) {
        return this.toArrayLike(Array, endian, length);
      };
      BN2.prototype.toArrayLike = function toArrayLike(ArrayType, endian, length) {
        var byteLength = this.byteLength();
        var reqLength = length || Math.max(1, byteLength);
        assert2(byteLength <= reqLength, "byte array longer than desired length");
        assert2(reqLength > 0, "Requested array length <= 0");
        this.strip();
        var littleEndian = endian === "le";
        var res = new ArrayType(reqLength);
        var b, i;
        var q = this.clone();
        if (!littleEndian) {
          for (i = 0; i < reqLength - byteLength; i++) {
            res[i] = 0;
          }
          for (i = 0; !q.isZero(); i++) {
            b = q.andln(255);
            q.iushrn(8);
            res[reqLength - i - 1] = b;
          }
        } else {
          for (i = 0; !q.isZero(); i++) {
            b = q.andln(255);
            q.iushrn(8);
            res[i] = b;
          }
          for (; i < reqLength; i++) {
            res[i] = 0;
          }
        }
        return res;
      };
      if (Math.clz32) {
        BN2.prototype._countBits = function _countBits(w) {
          return 32 - Math.clz32(w);
        };
      } else {
        BN2.prototype._countBits = function _countBits(w) {
          var t = w;
          var r = 0;
          if (t >= 4096) {
            r += 13;
            t >>>= 13;
          }
          if (t >= 64) {
            r += 7;
            t >>>= 7;
          }
          if (t >= 8) {
            r += 4;
            t >>>= 4;
          }
          if (t >= 2) {
            r += 2;
            t >>>= 2;
          }
          return r + t;
        };
      }
      BN2.prototype._zeroBits = function _zeroBits(w) {
        if (w === 0) return 26;
        var t = w;
        var r = 0;
        if ((t & 8191) === 0) {
          r += 13;
          t >>>= 13;
        }
        if ((t & 127) === 0) {
          r += 7;
          t >>>= 7;
        }
        if ((t & 15) === 0) {
          r += 4;
          t >>>= 4;
        }
        if ((t & 3) === 0) {
          r += 2;
          t >>>= 2;
        }
        if ((t & 1) === 0) {
          r++;
        }
        return r;
      };
      BN2.prototype.bitLength = function bitLength() {
        var w = this.words[this.length - 1];
        var hi = this._countBits(w);
        return (this.length - 1) * 26 + hi;
      };
      function toBitArray(num) {
        var w = new Array(num.bitLength());
        for (var bit = 0; bit < w.length; bit++) {
          var off = bit / 26 | 0;
          var wbit = bit % 26;
          w[bit] = (num.words[off] & 1 << wbit) >>> wbit;
        }
        return w;
      }
      BN2.prototype.zeroBits = function zeroBits() {
        if (this.isZero()) return 0;
        var r = 0;
        for (var i = 0; i < this.length; i++) {
          var b = this._zeroBits(this.words[i]);
          r += b;
          if (b !== 26) break;
        }
        return r;
      };
      BN2.prototype.byteLength = function byteLength() {
        return Math.ceil(this.bitLength() / 8);
      };
      BN2.prototype.toTwos = function toTwos(width) {
        if (this.negative !== 0) {
          return this.abs().inotn(width).iaddn(1);
        }
        return this.clone();
      };
      BN2.prototype.fromTwos = function fromTwos(width) {
        if (this.testn(width - 1)) {
          return this.notn(width).iaddn(1).ineg();
        }
        return this.clone();
      };
      BN2.prototype.isNeg = function isNeg() {
        return this.negative !== 0;
      };
      BN2.prototype.neg = function neg() {
        return this.clone().ineg();
      };
      BN2.prototype.ineg = function ineg() {
        if (!this.isZero()) {
          this.negative ^= 1;
        }
        return this;
      };
      BN2.prototype.iuor = function iuor(num) {
        while (this.length < num.length) {
          this.words[this.length++] = 0;
        }
        for (var i = 0; i < num.length; i++) {
          this.words[i] = this.words[i] | num.words[i];
        }
        return this.strip();
      };
      BN2.prototype.ior = function ior(num) {
        assert2((this.negative | num.negative) === 0);
        return this.iuor(num);
      };
      BN2.prototype.or = function or(num) {
        if (this.length > num.length) return this.clone().ior(num);
        return num.clone().ior(this);
      };
      BN2.prototype.uor = function uor(num) {
        if (this.length > num.length) return this.clone().iuor(num);
        return num.clone().iuor(this);
      };
      BN2.prototype.iuand = function iuand(num) {
        var b;
        if (this.length > num.length) {
          b = num;
        } else {
          b = this;
        }
        for (var i = 0; i < b.length; i++) {
          this.words[i] = this.words[i] & num.words[i];
        }
        this.length = b.length;
        return this.strip();
      };
      BN2.prototype.iand = function iand(num) {
        assert2((this.negative | num.negative) === 0);
        return this.iuand(num);
      };
      BN2.prototype.and = function and(num) {
        if (this.length > num.length) return this.clone().iand(num);
        return num.clone().iand(this);
      };
      BN2.prototype.uand = function uand(num) {
        if (this.length > num.length) return this.clone().iuand(num);
        return num.clone().iuand(this);
      };
      BN2.prototype.iuxor = function iuxor(num) {
        var a;
        var b;
        if (this.length > num.length) {
          a = this;
          b = num;
        } else {
          a = num;
          b = this;
        }
        for (var i = 0; i < b.length; i++) {
          this.words[i] = a.words[i] ^ b.words[i];
        }
        if (this !== a) {
          for (; i < a.length; i++) {
            this.words[i] = a.words[i];
          }
        }
        this.length = a.length;
        return this.strip();
      };
      BN2.prototype.ixor = function ixor(num) {
        assert2((this.negative | num.negative) === 0);
        return this.iuxor(num);
      };
      BN2.prototype.xor = function xor(num) {
        if (this.length > num.length) return this.clone().ixor(num);
        return num.clone().ixor(this);
      };
      BN2.prototype.uxor = function uxor(num) {
        if (this.length > num.length) return this.clone().iuxor(num);
        return num.clone().iuxor(this);
      };
      BN2.prototype.inotn = function inotn(width) {
        assert2(typeof width === "number" && width >= 0);
        var bytesNeeded = Math.ceil(width / 26) | 0;
        var bitsLeft = width % 26;
        this._expand(bytesNeeded);
        if (bitsLeft > 0) {
          bytesNeeded--;
        }
        for (var i = 0; i < bytesNeeded; i++) {
          this.words[i] = ~this.words[i] & 67108863;
        }
        if (bitsLeft > 0) {
          this.words[i] = ~this.words[i] & 67108863 >> 26 - bitsLeft;
        }
        return this.strip();
      };
      BN2.prototype.notn = function notn(width) {
        return this.clone().inotn(width);
      };
      BN2.prototype.setn = function setn(bit, val) {
        assert2(typeof bit === "number" && bit >= 0);
        var off = bit / 26 | 0;
        var wbit = bit % 26;
        this._expand(off + 1);
        if (val) {
          this.words[off] = this.words[off] | 1 << wbit;
        } else {
          this.words[off] = this.words[off] & ~(1 << wbit);
        }
        return this.strip();
      };
      BN2.prototype.iadd = function iadd(num) {
        var r;
        if (this.negative !== 0 && num.negative === 0) {
          this.negative = 0;
          r = this.isub(num);
          this.negative ^= 1;
          return this._normSign();
        } else if (this.negative === 0 && num.negative !== 0) {
          num.negative = 0;
          r = this.isub(num);
          num.negative = 1;
          return r._normSign();
        }
        var a, b;
        if (this.length > num.length) {
          a = this;
          b = num;
        } else {
          a = num;
          b = this;
        }
        var carry = 0;
        for (var i = 0; i < b.length; i++) {
          r = (a.words[i] | 0) + (b.words[i] | 0) + carry;
          this.words[i] = r & 67108863;
          carry = r >>> 26;
        }
        for (; carry !== 0 && i < a.length; i++) {
          r = (a.words[i] | 0) + carry;
          this.words[i] = r & 67108863;
          carry = r >>> 26;
        }
        this.length = a.length;
        if (carry !== 0) {
          this.words[this.length] = carry;
          this.length++;
        } else if (a !== this) {
          for (; i < a.length; i++) {
            this.words[i] = a.words[i];
          }
        }
        return this;
      };
      BN2.prototype.add = function add2(num) {
        var res;
        if (num.negative !== 0 && this.negative === 0) {
          num.negative = 0;
          res = this.sub(num);
          num.negative ^= 1;
          return res;
        } else if (num.negative === 0 && this.negative !== 0) {
          this.negative = 0;
          res = num.sub(this);
          this.negative = 1;
          return res;
        }
        if (this.length > num.length) return this.clone().iadd(num);
        return num.clone().iadd(this);
      };
      BN2.prototype.isub = function isub(num) {
        if (num.negative !== 0) {
          num.negative = 0;
          var r = this.iadd(num);
          num.negative = 1;
          return r._normSign();
        } else if (this.negative !== 0) {
          this.negative = 0;
          this.iadd(num);
          this.negative = 1;
          return this._normSign();
        }
        var cmp = this.cmp(num);
        if (cmp === 0) {
          this.negative = 0;
          this.length = 1;
          this.words[0] = 0;
          return this;
        }
        var a, b;
        if (cmp > 0) {
          a = this;
          b = num;
        } else {
          a = num;
          b = this;
        }
        var carry = 0;
        for (var i = 0; i < b.length; i++) {
          r = (a.words[i] | 0) - (b.words[i] | 0) + carry;
          carry = r >> 26;
          this.words[i] = r & 67108863;
        }
        for (; carry !== 0 && i < a.length; i++) {
          r = (a.words[i] | 0) + carry;
          carry = r >> 26;
          this.words[i] = r & 67108863;
        }
        if (carry === 0 && i < a.length && a !== this) {
          for (; i < a.length; i++) {
            this.words[i] = a.words[i];
          }
        }
        this.length = Math.max(this.length, i);
        if (a !== this) {
          this.negative = 1;
        }
        return this.strip();
      };
      BN2.prototype.sub = function sub(num) {
        return this.clone().isub(num);
      };
      function smallMulTo(self2, num, out) {
        out.negative = num.negative ^ self2.negative;
        var len = self2.length + num.length | 0;
        out.length = len;
        len = len - 1 | 0;
        var a = self2.words[0] | 0;
        var b = num.words[0] | 0;
        var r = a * b;
        var lo = r & 67108863;
        var carry = r / 67108864 | 0;
        out.words[0] = lo;
        for (var k = 1; k < len; k++) {
          var ncarry = carry >>> 26;
          var rword = carry & 67108863;
          var maxJ = Math.min(k, num.length - 1);
          for (var j = Math.max(0, k - self2.length + 1); j <= maxJ; j++) {
            var i = k - j | 0;
            a = self2.words[i] | 0;
            b = num.words[j] | 0;
            r = a * b + rword;
            ncarry += r / 67108864 | 0;
            rword = r & 67108863;
          }
          out.words[k] = rword | 0;
          carry = ncarry | 0;
        }
        if (carry !== 0) {
          out.words[k] = carry | 0;
        } else {
          out.length--;
        }
        return out.strip();
      }
      var comb10MulTo = function comb10MulTo2(self2, num, out) {
        var a = self2.words;
        var b = num.words;
        var o = out.words;
        var c = 0;
        var lo;
        var mid;
        var hi;
        var a0 = a[0] | 0;
        var al0 = a0 & 8191;
        var ah0 = a0 >>> 13;
        var a1 = a[1] | 0;
        var al1 = a1 & 8191;
        var ah1 = a1 >>> 13;
        var a2 = a[2] | 0;
        var al2 = a2 & 8191;
        var ah2 = a2 >>> 13;
        var a3 = a[3] | 0;
        var al3 = a3 & 8191;
        var ah3 = a3 >>> 13;
        var a4 = a[4] | 0;
        var al4 = a4 & 8191;
        var ah4 = a4 >>> 13;
        var a5 = a[5] | 0;
        var al5 = a5 & 8191;
        var ah5 = a5 >>> 13;
        var a6 = a[6] | 0;
        var al6 = a6 & 8191;
        var ah6 = a6 >>> 13;
        var a7 = a[7] | 0;
        var al7 = a7 & 8191;
        var ah7 = a7 >>> 13;
        var a8 = a[8] | 0;
        var al8 = a8 & 8191;
        var ah8 = a8 >>> 13;
        var a9 = a[9] | 0;
        var al9 = a9 & 8191;
        var ah9 = a9 >>> 13;
        var b0 = b[0] | 0;
        var bl0 = b0 & 8191;
        var bh0 = b0 >>> 13;
        var b1 = b[1] | 0;
        var bl1 = b1 & 8191;
        var bh1 = b1 >>> 13;
        var b2 = b[2] | 0;
        var bl2 = b2 & 8191;
        var bh2 = b2 >>> 13;
        var b3 = b[3] | 0;
        var bl3 = b3 & 8191;
        var bh3 = b3 >>> 13;
        var b4 = b[4] | 0;
        var bl4 = b4 & 8191;
        var bh4 = b4 >>> 13;
        var b5 = b[5] | 0;
        var bl5 = b5 & 8191;
        var bh5 = b5 >>> 13;
        var b6 = b[6] | 0;
        var bl6 = b6 & 8191;
        var bh6 = b6 >>> 13;
        var b7 = b[7] | 0;
        var bl7 = b7 & 8191;
        var bh7 = b7 >>> 13;
        var b8 = b[8] | 0;
        var bl8 = b8 & 8191;
        var bh8 = b8 >>> 13;
        var b9 = b[9] | 0;
        var bl9 = b9 & 8191;
        var bh9 = b9 >>> 13;
        out.negative = self2.negative ^ num.negative;
        out.length = 19;
        lo = Math.imul(al0, bl0);
        mid = Math.imul(al0, bh0);
        mid = mid + Math.imul(ah0, bl0) | 0;
        hi = Math.imul(ah0, bh0);
        var w0 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w0 >>> 26) | 0;
        w0 &= 67108863;
        lo = Math.imul(al1, bl0);
        mid = Math.imul(al1, bh0);
        mid = mid + Math.imul(ah1, bl0) | 0;
        hi = Math.imul(ah1, bh0);
        lo = lo + Math.imul(al0, bl1) | 0;
        mid = mid + Math.imul(al0, bh1) | 0;
        mid = mid + Math.imul(ah0, bl1) | 0;
        hi = hi + Math.imul(ah0, bh1) | 0;
        var w1 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w1 >>> 26) | 0;
        w1 &= 67108863;
        lo = Math.imul(al2, bl0);
        mid = Math.imul(al2, bh0);
        mid = mid + Math.imul(ah2, bl0) | 0;
        hi = Math.imul(ah2, bh0);
        lo = lo + Math.imul(al1, bl1) | 0;
        mid = mid + Math.imul(al1, bh1) | 0;
        mid = mid + Math.imul(ah1, bl1) | 0;
        hi = hi + Math.imul(ah1, bh1) | 0;
        lo = lo + Math.imul(al0, bl2) | 0;
        mid = mid + Math.imul(al0, bh2) | 0;
        mid = mid + Math.imul(ah0, bl2) | 0;
        hi = hi + Math.imul(ah0, bh2) | 0;
        var w2 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w2 >>> 26) | 0;
        w2 &= 67108863;
        lo = Math.imul(al3, bl0);
        mid = Math.imul(al3, bh0);
        mid = mid + Math.imul(ah3, bl0) | 0;
        hi = Math.imul(ah3, bh0);
        lo = lo + Math.imul(al2, bl1) | 0;
        mid = mid + Math.imul(al2, bh1) | 0;
        mid = mid + Math.imul(ah2, bl1) | 0;
        hi = hi + Math.imul(ah2, bh1) | 0;
        lo = lo + Math.imul(al1, bl2) | 0;
        mid = mid + Math.imul(al1, bh2) | 0;
        mid = mid + Math.imul(ah1, bl2) | 0;
        hi = hi + Math.imul(ah1, bh2) | 0;
        lo = lo + Math.imul(al0, bl3) | 0;
        mid = mid + Math.imul(al0, bh3) | 0;
        mid = mid + Math.imul(ah0, bl3) | 0;
        hi = hi + Math.imul(ah0, bh3) | 0;
        var w3 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w3 >>> 26) | 0;
        w3 &= 67108863;
        lo = Math.imul(al4, bl0);
        mid = Math.imul(al4, bh0);
        mid = mid + Math.imul(ah4, bl0) | 0;
        hi = Math.imul(ah4, bh0);
        lo = lo + Math.imul(al3, bl1) | 0;
        mid = mid + Math.imul(al3, bh1) | 0;
        mid = mid + Math.imul(ah3, bl1) | 0;
        hi = hi + Math.imul(ah3, bh1) | 0;
        lo = lo + Math.imul(al2, bl2) | 0;
        mid = mid + Math.imul(al2, bh2) | 0;
        mid = mid + Math.imul(ah2, bl2) | 0;
        hi = hi + Math.imul(ah2, bh2) | 0;
        lo = lo + Math.imul(al1, bl3) | 0;
        mid = mid + Math.imul(al1, bh3) | 0;
        mid = mid + Math.imul(ah1, bl3) | 0;
        hi = hi + Math.imul(ah1, bh3) | 0;
        lo = lo + Math.imul(al0, bl4) | 0;
        mid = mid + Math.imul(al0, bh4) | 0;
        mid = mid + Math.imul(ah0, bl4) | 0;
        hi = hi + Math.imul(ah0, bh4) | 0;
        var w4 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w4 >>> 26) | 0;
        w4 &= 67108863;
        lo = Math.imul(al5, bl0);
        mid = Math.imul(al5, bh0);
        mid = mid + Math.imul(ah5, bl0) | 0;
        hi = Math.imul(ah5, bh0);
        lo = lo + Math.imul(al4, bl1) | 0;
        mid = mid + Math.imul(al4, bh1) | 0;
        mid = mid + Math.imul(ah4, bl1) | 0;
        hi = hi + Math.imul(ah4, bh1) | 0;
        lo = lo + Math.imul(al3, bl2) | 0;
        mid = mid + Math.imul(al3, bh2) | 0;
        mid = mid + Math.imul(ah3, bl2) | 0;
        hi = hi + Math.imul(ah3, bh2) | 0;
        lo = lo + Math.imul(al2, bl3) | 0;
        mid = mid + Math.imul(al2, bh3) | 0;
        mid = mid + Math.imul(ah2, bl3) | 0;
        hi = hi + Math.imul(ah2, bh3) | 0;
        lo = lo + Math.imul(al1, bl4) | 0;
        mid = mid + Math.imul(al1, bh4) | 0;
        mid = mid + Math.imul(ah1, bl4) | 0;
        hi = hi + Math.imul(ah1, bh4) | 0;
        lo = lo + Math.imul(al0, bl5) | 0;
        mid = mid + Math.imul(al0, bh5) | 0;
        mid = mid + Math.imul(ah0, bl5) | 0;
        hi = hi + Math.imul(ah0, bh5) | 0;
        var w5 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w5 >>> 26) | 0;
        w5 &= 67108863;
        lo = Math.imul(al6, bl0);
        mid = Math.imul(al6, bh0);
        mid = mid + Math.imul(ah6, bl0) | 0;
        hi = Math.imul(ah6, bh0);
        lo = lo + Math.imul(al5, bl1) | 0;
        mid = mid + Math.imul(al5, bh1) | 0;
        mid = mid + Math.imul(ah5, bl1) | 0;
        hi = hi + Math.imul(ah5, bh1) | 0;
        lo = lo + Math.imul(al4, bl2) | 0;
        mid = mid + Math.imul(al4, bh2) | 0;
        mid = mid + Math.imul(ah4, bl2) | 0;
        hi = hi + Math.imul(ah4, bh2) | 0;
        lo = lo + Math.imul(al3, bl3) | 0;
        mid = mid + Math.imul(al3, bh3) | 0;
        mid = mid + Math.imul(ah3, bl3) | 0;
        hi = hi + Math.imul(ah3, bh3) | 0;
        lo = lo + Math.imul(al2, bl4) | 0;
        mid = mid + Math.imul(al2, bh4) | 0;
        mid = mid + Math.imul(ah2, bl4) | 0;
        hi = hi + Math.imul(ah2, bh4) | 0;
        lo = lo + Math.imul(al1, bl5) | 0;
        mid = mid + Math.imul(al1, bh5) | 0;
        mid = mid + Math.imul(ah1, bl5) | 0;
        hi = hi + Math.imul(ah1, bh5) | 0;
        lo = lo + Math.imul(al0, bl6) | 0;
        mid = mid + Math.imul(al0, bh6) | 0;
        mid = mid + Math.imul(ah0, bl6) | 0;
        hi = hi + Math.imul(ah0, bh6) | 0;
        var w6 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w6 >>> 26) | 0;
        w6 &= 67108863;
        lo = Math.imul(al7, bl0);
        mid = Math.imul(al7, bh0);
        mid = mid + Math.imul(ah7, bl0) | 0;
        hi = Math.imul(ah7, bh0);
        lo = lo + Math.imul(al6, bl1) | 0;
        mid = mid + Math.imul(al6, bh1) | 0;
        mid = mid + Math.imul(ah6, bl1) | 0;
        hi = hi + Math.imul(ah6, bh1) | 0;
        lo = lo + Math.imul(al5, bl2) | 0;
        mid = mid + Math.imul(al5, bh2) | 0;
        mid = mid + Math.imul(ah5, bl2) | 0;
        hi = hi + Math.imul(ah5, bh2) | 0;
        lo = lo + Math.imul(al4, bl3) | 0;
        mid = mid + Math.imul(al4, bh3) | 0;
        mid = mid + Math.imul(ah4, bl3) | 0;
        hi = hi + Math.imul(ah4, bh3) | 0;
        lo = lo + Math.imul(al3, bl4) | 0;
        mid = mid + Math.imul(al3, bh4) | 0;
        mid = mid + Math.imul(ah3, bl4) | 0;
        hi = hi + Math.imul(ah3, bh4) | 0;
        lo = lo + Math.imul(al2, bl5) | 0;
        mid = mid + Math.imul(al2, bh5) | 0;
        mid = mid + Math.imul(ah2, bl5) | 0;
        hi = hi + Math.imul(ah2, bh5) | 0;
        lo = lo + Math.imul(al1, bl6) | 0;
        mid = mid + Math.imul(al1, bh6) | 0;
        mid = mid + Math.imul(ah1, bl6) | 0;
        hi = hi + Math.imul(ah1, bh6) | 0;
        lo = lo + Math.imul(al0, bl7) | 0;
        mid = mid + Math.imul(al0, bh7) | 0;
        mid = mid + Math.imul(ah0, bl7) | 0;
        hi = hi + Math.imul(ah0, bh7) | 0;
        var w7 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w7 >>> 26) | 0;
        w7 &= 67108863;
        lo = Math.imul(al8, bl0);
        mid = Math.imul(al8, bh0);
        mid = mid + Math.imul(ah8, bl0) | 0;
        hi = Math.imul(ah8, bh0);
        lo = lo + Math.imul(al7, bl1) | 0;
        mid = mid + Math.imul(al7, bh1) | 0;
        mid = mid + Math.imul(ah7, bl1) | 0;
        hi = hi + Math.imul(ah7, bh1) | 0;
        lo = lo + Math.imul(al6, bl2) | 0;
        mid = mid + Math.imul(al6, bh2) | 0;
        mid = mid + Math.imul(ah6, bl2) | 0;
        hi = hi + Math.imul(ah6, bh2) | 0;
        lo = lo + Math.imul(al5, bl3) | 0;
        mid = mid + Math.imul(al5, bh3) | 0;
        mid = mid + Math.imul(ah5, bl3) | 0;
        hi = hi + Math.imul(ah5, bh3) | 0;
        lo = lo + Math.imul(al4, bl4) | 0;
        mid = mid + Math.imul(al4, bh4) | 0;
        mid = mid + Math.imul(ah4, bl4) | 0;
        hi = hi + Math.imul(ah4, bh4) | 0;
        lo = lo + Math.imul(al3, bl5) | 0;
        mid = mid + Math.imul(al3, bh5) | 0;
        mid = mid + Math.imul(ah3, bl5) | 0;
        hi = hi + Math.imul(ah3, bh5) | 0;
        lo = lo + Math.imul(al2, bl6) | 0;
        mid = mid + Math.imul(al2, bh6) | 0;
        mid = mid + Math.imul(ah2, bl6) | 0;
        hi = hi + Math.imul(ah2, bh6) | 0;
        lo = lo + Math.imul(al1, bl7) | 0;
        mid = mid + Math.imul(al1, bh7) | 0;
        mid = mid + Math.imul(ah1, bl7) | 0;
        hi = hi + Math.imul(ah1, bh7) | 0;
        lo = lo + Math.imul(al0, bl8) | 0;
        mid = mid + Math.imul(al0, bh8) | 0;
        mid = mid + Math.imul(ah0, bl8) | 0;
        hi = hi + Math.imul(ah0, bh8) | 0;
        var w8 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w8 >>> 26) | 0;
        w8 &= 67108863;
        lo = Math.imul(al9, bl0);
        mid = Math.imul(al9, bh0);
        mid = mid + Math.imul(ah9, bl0) | 0;
        hi = Math.imul(ah9, bh0);
        lo = lo + Math.imul(al8, bl1) | 0;
        mid = mid + Math.imul(al8, bh1) | 0;
        mid = mid + Math.imul(ah8, bl1) | 0;
        hi = hi + Math.imul(ah8, bh1) | 0;
        lo = lo + Math.imul(al7, bl2) | 0;
        mid = mid + Math.imul(al7, bh2) | 0;
        mid = mid + Math.imul(ah7, bl2) | 0;
        hi = hi + Math.imul(ah7, bh2) | 0;
        lo = lo + Math.imul(al6, bl3) | 0;
        mid = mid + Math.imul(al6, bh3) | 0;
        mid = mid + Math.imul(ah6, bl3) | 0;
        hi = hi + Math.imul(ah6, bh3) | 0;
        lo = lo + Math.imul(al5, bl4) | 0;
        mid = mid + Math.imul(al5, bh4) | 0;
        mid = mid + Math.imul(ah5, bl4) | 0;
        hi = hi + Math.imul(ah5, bh4) | 0;
        lo = lo + Math.imul(al4, bl5) | 0;
        mid = mid + Math.imul(al4, bh5) | 0;
        mid = mid + Math.imul(ah4, bl5) | 0;
        hi = hi + Math.imul(ah4, bh5) | 0;
        lo = lo + Math.imul(al3, bl6) | 0;
        mid = mid + Math.imul(al3, bh6) | 0;
        mid = mid + Math.imul(ah3, bl6) | 0;
        hi = hi + Math.imul(ah3, bh6) | 0;
        lo = lo + Math.imul(al2, bl7) | 0;
        mid = mid + Math.imul(al2, bh7) | 0;
        mid = mid + Math.imul(ah2, bl7) | 0;
        hi = hi + Math.imul(ah2, bh7) | 0;
        lo = lo + Math.imul(al1, bl8) | 0;
        mid = mid + Math.imul(al1, bh8) | 0;
        mid = mid + Math.imul(ah1, bl8) | 0;
        hi = hi + Math.imul(ah1, bh8) | 0;
        lo = lo + Math.imul(al0, bl9) | 0;
        mid = mid + Math.imul(al0, bh9) | 0;
        mid = mid + Math.imul(ah0, bl9) | 0;
        hi = hi + Math.imul(ah0, bh9) | 0;
        var w9 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w9 >>> 26) | 0;
        w9 &= 67108863;
        lo = Math.imul(al9, bl1);
        mid = Math.imul(al9, bh1);
        mid = mid + Math.imul(ah9, bl1) | 0;
        hi = Math.imul(ah9, bh1);
        lo = lo + Math.imul(al8, bl2) | 0;
        mid = mid + Math.imul(al8, bh2) | 0;
        mid = mid + Math.imul(ah8, bl2) | 0;
        hi = hi + Math.imul(ah8, bh2) | 0;
        lo = lo + Math.imul(al7, bl3) | 0;
        mid = mid + Math.imul(al7, bh3) | 0;
        mid = mid + Math.imul(ah7, bl3) | 0;
        hi = hi + Math.imul(ah7, bh3) | 0;
        lo = lo + Math.imul(al6, bl4) | 0;
        mid = mid + Math.imul(al6, bh4) | 0;
        mid = mid + Math.imul(ah6, bl4) | 0;
        hi = hi + Math.imul(ah6, bh4) | 0;
        lo = lo + Math.imul(al5, bl5) | 0;
        mid = mid + Math.imul(al5, bh5) | 0;
        mid = mid + Math.imul(ah5, bl5) | 0;
        hi = hi + Math.imul(ah5, bh5) | 0;
        lo = lo + Math.imul(al4, bl6) | 0;
        mid = mid + Math.imul(al4, bh6) | 0;
        mid = mid + Math.imul(ah4, bl6) | 0;
        hi = hi + Math.imul(ah4, bh6) | 0;
        lo = lo + Math.imul(al3, bl7) | 0;
        mid = mid + Math.imul(al3, bh7) | 0;
        mid = mid + Math.imul(ah3, bl7) | 0;
        hi = hi + Math.imul(ah3, bh7) | 0;
        lo = lo + Math.imul(al2, bl8) | 0;
        mid = mid + Math.imul(al2, bh8) | 0;
        mid = mid + Math.imul(ah2, bl8) | 0;
        hi = hi + Math.imul(ah2, bh8) | 0;
        lo = lo + Math.imul(al1, bl9) | 0;
        mid = mid + Math.imul(al1, bh9) | 0;
        mid = mid + Math.imul(ah1, bl9) | 0;
        hi = hi + Math.imul(ah1, bh9) | 0;
        var w10 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w10 >>> 26) | 0;
        w10 &= 67108863;
        lo = Math.imul(al9, bl2);
        mid = Math.imul(al9, bh2);
        mid = mid + Math.imul(ah9, bl2) | 0;
        hi = Math.imul(ah9, bh2);
        lo = lo + Math.imul(al8, bl3) | 0;
        mid = mid + Math.imul(al8, bh3) | 0;
        mid = mid + Math.imul(ah8, bl3) | 0;
        hi = hi + Math.imul(ah8, bh3) | 0;
        lo = lo + Math.imul(al7, bl4) | 0;
        mid = mid + Math.imul(al7, bh4) | 0;
        mid = mid + Math.imul(ah7, bl4) | 0;
        hi = hi + Math.imul(ah7, bh4) | 0;
        lo = lo + Math.imul(al6, bl5) | 0;
        mid = mid + Math.imul(al6, bh5) | 0;
        mid = mid + Math.imul(ah6, bl5) | 0;
        hi = hi + Math.imul(ah6, bh5) | 0;
        lo = lo + Math.imul(al5, bl6) | 0;
        mid = mid + Math.imul(al5, bh6) | 0;
        mid = mid + Math.imul(ah5, bl6) | 0;
        hi = hi + Math.imul(ah5, bh6) | 0;
        lo = lo + Math.imul(al4, bl7) | 0;
        mid = mid + Math.imul(al4, bh7) | 0;
        mid = mid + Math.imul(ah4, bl7) | 0;
        hi = hi + Math.imul(ah4, bh7) | 0;
        lo = lo + Math.imul(al3, bl8) | 0;
        mid = mid + Math.imul(al3, bh8) | 0;
        mid = mid + Math.imul(ah3, bl8) | 0;
        hi = hi + Math.imul(ah3, bh8) | 0;
        lo = lo + Math.imul(al2, bl9) | 0;
        mid = mid + Math.imul(al2, bh9) | 0;
        mid = mid + Math.imul(ah2, bl9) | 0;
        hi = hi + Math.imul(ah2, bh9) | 0;
        var w11 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w11 >>> 26) | 0;
        w11 &= 67108863;
        lo = Math.imul(al9, bl3);
        mid = Math.imul(al9, bh3);
        mid = mid + Math.imul(ah9, bl3) | 0;
        hi = Math.imul(ah9, bh3);
        lo = lo + Math.imul(al8, bl4) | 0;
        mid = mid + Math.imul(al8, bh4) | 0;
        mid = mid + Math.imul(ah8, bl4) | 0;
        hi = hi + Math.imul(ah8, bh4) | 0;
        lo = lo + Math.imul(al7, bl5) | 0;
        mid = mid + Math.imul(al7, bh5) | 0;
        mid = mid + Math.imul(ah7, bl5) | 0;
        hi = hi + Math.imul(ah7, bh5) | 0;
        lo = lo + Math.imul(al6, bl6) | 0;
        mid = mid + Math.imul(al6, bh6) | 0;
        mid = mid + Math.imul(ah6, bl6) | 0;
        hi = hi + Math.imul(ah6, bh6) | 0;
        lo = lo + Math.imul(al5, bl7) | 0;
        mid = mid + Math.imul(al5, bh7) | 0;
        mid = mid + Math.imul(ah5, bl7) | 0;
        hi = hi + Math.imul(ah5, bh7) | 0;
        lo = lo + Math.imul(al4, bl8) | 0;
        mid = mid + Math.imul(al4, bh8) | 0;
        mid = mid + Math.imul(ah4, bl8) | 0;
        hi = hi + Math.imul(ah4, bh8) | 0;
        lo = lo + Math.imul(al3, bl9) | 0;
        mid = mid + Math.imul(al3, bh9) | 0;
        mid = mid + Math.imul(ah3, bl9) | 0;
        hi = hi + Math.imul(ah3, bh9) | 0;
        var w12 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w12 >>> 26) | 0;
        w12 &= 67108863;
        lo = Math.imul(al9, bl4);
        mid = Math.imul(al9, bh4);
        mid = mid + Math.imul(ah9, bl4) | 0;
        hi = Math.imul(ah9, bh4);
        lo = lo + Math.imul(al8, bl5) | 0;
        mid = mid + Math.imul(al8, bh5) | 0;
        mid = mid + Math.imul(ah8, bl5) | 0;
        hi = hi + Math.imul(ah8, bh5) | 0;
        lo = lo + Math.imul(al7, bl6) | 0;
        mid = mid + Math.imul(al7, bh6) | 0;
        mid = mid + Math.imul(ah7, bl6) | 0;
        hi = hi + Math.imul(ah7, bh6) | 0;
        lo = lo + Math.imul(al6, bl7) | 0;
        mid = mid + Math.imul(al6, bh7) | 0;
        mid = mid + Math.imul(ah6, bl7) | 0;
        hi = hi + Math.imul(ah6, bh7) | 0;
        lo = lo + Math.imul(al5, bl8) | 0;
        mid = mid + Math.imul(al5, bh8) | 0;
        mid = mid + Math.imul(ah5, bl8) | 0;
        hi = hi + Math.imul(ah5, bh8) | 0;
        lo = lo + Math.imul(al4, bl9) | 0;
        mid = mid + Math.imul(al4, bh9) | 0;
        mid = mid + Math.imul(ah4, bl9) | 0;
        hi = hi + Math.imul(ah4, bh9) | 0;
        var w13 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w13 >>> 26) | 0;
        w13 &= 67108863;
        lo = Math.imul(al9, bl5);
        mid = Math.imul(al9, bh5);
        mid = mid + Math.imul(ah9, bl5) | 0;
        hi = Math.imul(ah9, bh5);
        lo = lo + Math.imul(al8, bl6) | 0;
        mid = mid + Math.imul(al8, bh6) | 0;
        mid = mid + Math.imul(ah8, bl6) | 0;
        hi = hi + Math.imul(ah8, bh6) | 0;
        lo = lo + Math.imul(al7, bl7) | 0;
        mid = mid + Math.imul(al7, bh7) | 0;
        mid = mid + Math.imul(ah7, bl7) | 0;
        hi = hi + Math.imul(ah7, bh7) | 0;
        lo = lo + Math.imul(al6, bl8) | 0;
        mid = mid + Math.imul(al6, bh8) | 0;
        mid = mid + Math.imul(ah6, bl8) | 0;
        hi = hi + Math.imul(ah6, bh8) | 0;
        lo = lo + Math.imul(al5, bl9) | 0;
        mid = mid + Math.imul(al5, bh9) | 0;
        mid = mid + Math.imul(ah5, bl9) | 0;
        hi = hi + Math.imul(ah5, bh9) | 0;
        var w14 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w14 >>> 26) | 0;
        w14 &= 67108863;
        lo = Math.imul(al9, bl6);
        mid = Math.imul(al9, bh6);
        mid = mid + Math.imul(ah9, bl6) | 0;
        hi = Math.imul(ah9, bh6);
        lo = lo + Math.imul(al8, bl7) | 0;
        mid = mid + Math.imul(al8, bh7) | 0;
        mid = mid + Math.imul(ah8, bl7) | 0;
        hi = hi + Math.imul(ah8, bh7) | 0;
        lo = lo + Math.imul(al7, bl8) | 0;
        mid = mid + Math.imul(al7, bh8) | 0;
        mid = mid + Math.imul(ah7, bl8) | 0;
        hi = hi + Math.imul(ah7, bh8) | 0;
        lo = lo + Math.imul(al6, bl9) | 0;
        mid = mid + Math.imul(al6, bh9) | 0;
        mid = mid + Math.imul(ah6, bl9) | 0;
        hi = hi + Math.imul(ah6, bh9) | 0;
        var w15 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w15 >>> 26) | 0;
        w15 &= 67108863;
        lo = Math.imul(al9, bl7);
        mid = Math.imul(al9, bh7);
        mid = mid + Math.imul(ah9, bl7) | 0;
        hi = Math.imul(ah9, bh7);
        lo = lo + Math.imul(al8, bl8) | 0;
        mid = mid + Math.imul(al8, bh8) | 0;
        mid = mid + Math.imul(ah8, bl8) | 0;
        hi = hi + Math.imul(ah8, bh8) | 0;
        lo = lo + Math.imul(al7, bl9) | 0;
        mid = mid + Math.imul(al7, bh9) | 0;
        mid = mid + Math.imul(ah7, bl9) | 0;
        hi = hi + Math.imul(ah7, bh9) | 0;
        var w16 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w16 >>> 26) | 0;
        w16 &= 67108863;
        lo = Math.imul(al9, bl8);
        mid = Math.imul(al9, bh8);
        mid = mid + Math.imul(ah9, bl8) | 0;
        hi = Math.imul(ah9, bh8);
        lo = lo + Math.imul(al8, bl9) | 0;
        mid = mid + Math.imul(al8, bh9) | 0;
        mid = mid + Math.imul(ah8, bl9) | 0;
        hi = hi + Math.imul(ah8, bh9) | 0;
        var w17 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w17 >>> 26) | 0;
        w17 &= 67108863;
        lo = Math.imul(al9, bl9);
        mid = Math.imul(al9, bh9);
        mid = mid + Math.imul(ah9, bl9) | 0;
        hi = Math.imul(ah9, bh9);
        var w18 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w18 >>> 26) | 0;
        w18 &= 67108863;
        o[0] = w0;
        o[1] = w1;
        o[2] = w2;
        o[3] = w3;
        o[4] = w4;
        o[5] = w5;
        o[6] = w6;
        o[7] = w7;
        o[8] = w8;
        o[9] = w9;
        o[10] = w10;
        o[11] = w11;
        o[12] = w12;
        o[13] = w13;
        o[14] = w14;
        o[15] = w15;
        o[16] = w16;
        o[17] = w17;
        o[18] = w18;
        if (c !== 0) {
          o[19] = c;
          out.length++;
        }
        return out;
      };
      if (!Math.imul) {
        comb10MulTo = smallMulTo;
      }
      function bigMulTo(self2, num, out) {
        out.negative = num.negative ^ self2.negative;
        out.length = self2.length + num.length;
        var carry = 0;
        var hncarry = 0;
        for (var k = 0; k < out.length - 1; k++) {
          var ncarry = hncarry;
          hncarry = 0;
          var rword = carry & 67108863;
          var maxJ = Math.min(k, num.length - 1);
          for (var j = Math.max(0, k - self2.length + 1); j <= maxJ; j++) {
            var i = k - j;
            var a = self2.words[i] | 0;
            var b = num.words[j] | 0;
            var r = a * b;
            var lo = r & 67108863;
            ncarry = ncarry + (r / 67108864 | 0) | 0;
            lo = lo + rword | 0;
            rword = lo & 67108863;
            ncarry = ncarry + (lo >>> 26) | 0;
            hncarry += ncarry >>> 26;
            ncarry &= 67108863;
          }
          out.words[k] = rword;
          carry = ncarry;
          ncarry = hncarry;
        }
        if (carry !== 0) {
          out.words[k] = carry;
        } else {
          out.length--;
        }
        return out.strip();
      }
      function jumboMulTo(self2, num, out) {
        var fftm = new FFTM();
        return fftm.mulp(self2, num, out);
      }
      BN2.prototype.mulTo = function mulTo(num, out) {
        var res;
        var len = this.length + num.length;
        if (this.length === 10 && num.length === 10) {
          res = comb10MulTo(this, num, out);
        } else if (len < 63) {
          res = smallMulTo(this, num, out);
        } else if (len < 1024) {
          res = bigMulTo(this, num, out);
        } else {
          res = jumboMulTo(this, num, out);
        }
        return res;
      };
      function FFTM(x, y) {
        this.x = x;
        this.y = y;
      }
      FFTM.prototype.makeRBT = function makeRBT(N) {
        var t = new Array(N);
        var l = BN2.prototype._countBits(N) - 1;
        for (var i = 0; i < N; i++) {
          t[i] = this.revBin(i, l, N);
        }
        return t;
      };
      FFTM.prototype.revBin = function revBin(x, l, N) {
        if (x === 0 || x === N - 1) return x;
        var rb = 0;
        for (var i = 0; i < l; i++) {
          rb |= (x & 1) << l - i - 1;
          x >>= 1;
        }
        return rb;
      };
      FFTM.prototype.permute = function permute(rbt, rws, iws, rtws, itws, N) {
        for (var i = 0; i < N; i++) {
          rtws[i] = rws[rbt[i]];
          itws[i] = iws[rbt[i]];
        }
      };
      FFTM.prototype.transform = function transform(rws, iws, rtws, itws, N, rbt) {
        this.permute(rbt, rws, iws, rtws, itws, N);
        for (var s = 1; s < N; s <<= 1) {
          var l = s << 1;
          var rtwdf = Math.cos(2 * Math.PI / l);
          var itwdf = Math.sin(2 * Math.PI / l);
          for (var p = 0; p < N; p += l) {
            var rtwdf_ = rtwdf;
            var itwdf_ = itwdf;
            for (var j = 0; j < s; j++) {
              var re = rtws[p + j];
              var ie = itws[p + j];
              var ro = rtws[p + j + s];
              var io = itws[p + j + s];
              var rx = rtwdf_ * ro - itwdf_ * io;
              io = rtwdf_ * io + itwdf_ * ro;
              ro = rx;
              rtws[p + j] = re + ro;
              itws[p + j] = ie + io;
              rtws[p + j + s] = re - ro;
              itws[p + j + s] = ie - io;
              if (j !== l) {
                rx = rtwdf * rtwdf_ - itwdf * itwdf_;
                itwdf_ = rtwdf * itwdf_ + itwdf * rtwdf_;
                rtwdf_ = rx;
              }
            }
          }
        }
      };
      FFTM.prototype.guessLen13b = function guessLen13b(n, m) {
        var N = Math.max(m, n) | 1;
        var odd = N & 1;
        var i = 0;
        for (N = N / 2 | 0; N; N = N >>> 1) {
          i++;
        }
        return 1 << i + 1 + odd;
      };
      FFTM.prototype.conjugate = function conjugate(rws, iws, N) {
        if (N <= 1) return;
        for (var i = 0; i < N / 2; i++) {
          var t = rws[i];
          rws[i] = rws[N - i - 1];
          rws[N - i - 1] = t;
          t = iws[i];
          iws[i] = -iws[N - i - 1];
          iws[N - i - 1] = -t;
        }
      };
      FFTM.prototype.normalize13b = function normalize13b(ws, N) {
        var carry = 0;
        for (var i = 0; i < N / 2; i++) {
          var w = Math.round(ws[2 * i + 1] / N) * 8192 + Math.round(ws[2 * i] / N) + carry;
          ws[i] = w & 67108863;
          if (w < 67108864) {
            carry = 0;
          } else {
            carry = w / 67108864 | 0;
          }
        }
        return ws;
      };
      FFTM.prototype.convert13b = function convert13b(ws, len, rws, N) {
        var carry = 0;
        for (var i = 0; i < len; i++) {
          carry = carry + (ws[i] | 0);
          rws[2 * i] = carry & 8191;
          carry = carry >>> 13;
          rws[2 * i + 1] = carry & 8191;
          carry = carry >>> 13;
        }
        for (i = 2 * len; i < N; ++i) {
          rws[i] = 0;
        }
        assert2(carry === 0);
        assert2((carry & ~8191) === 0);
      };
      FFTM.prototype.stub = function stub(N) {
        var ph = new Array(N);
        for (var i = 0; i < N; i++) {
          ph[i] = 0;
        }
        return ph;
      };
      FFTM.prototype.mulp = function mulp(x, y, out) {
        var N = 2 * this.guessLen13b(x.length, y.length);
        var rbt = this.makeRBT(N);
        var _ = this.stub(N);
        var rws = new Array(N);
        var rwst = new Array(N);
        var iwst = new Array(N);
        var nrws = new Array(N);
        var nrwst = new Array(N);
        var niwst = new Array(N);
        var rmws = out.words;
        rmws.length = N;
        this.convert13b(x.words, x.length, rws, N);
        this.convert13b(y.words, y.length, nrws, N);
        this.transform(rws, _, rwst, iwst, N, rbt);
        this.transform(nrws, _, nrwst, niwst, N, rbt);
        for (var i = 0; i < N; i++) {
          var rx = rwst[i] * nrwst[i] - iwst[i] * niwst[i];
          iwst[i] = rwst[i] * niwst[i] + iwst[i] * nrwst[i];
          rwst[i] = rx;
        }
        this.conjugate(rwst, iwst, N);
        this.transform(rwst, iwst, rmws, _, N, rbt);
        this.conjugate(rmws, _, N);
        this.normalize13b(rmws, N);
        out.negative = x.negative ^ y.negative;
        out.length = x.length + y.length;
        return out.strip();
      };
      BN2.prototype.mul = function mul(num) {
        var out = new BN2(null);
        out.words = new Array(this.length + num.length);
        return this.mulTo(num, out);
      };
      BN2.prototype.mulf = function mulf(num) {
        var out = new BN2(null);
        out.words = new Array(this.length + num.length);
        return jumboMulTo(this, num, out);
      };
      BN2.prototype.imul = function imul(num) {
        return this.clone().mulTo(num, this);
      };
      BN2.prototype.imuln = function imuln(num) {
        assert2(typeof num === "number");
        assert2(num < 67108864);
        var carry = 0;
        for (var i = 0; i < this.length; i++) {
          var w = (this.words[i] | 0) * num;
          var lo = (w & 67108863) + (carry & 67108863);
          carry >>= 26;
          carry += w / 67108864 | 0;
          carry += lo >>> 26;
          this.words[i] = lo & 67108863;
        }
        if (carry !== 0) {
          this.words[i] = carry;
          this.length++;
        }
        return this;
      };
      BN2.prototype.muln = function muln(num) {
        return this.clone().imuln(num);
      };
      BN2.prototype.sqr = function sqr() {
        return this.mul(this);
      };
      BN2.prototype.isqr = function isqr() {
        return this.imul(this.clone());
      };
      BN2.prototype.pow = function pow(num) {
        var w = toBitArray(num);
        if (w.length === 0) return new BN2(1);
        var res = this;
        for (var i = 0; i < w.length; i++, res = res.sqr()) {
          if (w[i] !== 0) break;
        }
        if (++i < w.length) {
          for (var q = res.sqr(); i < w.length; i++, q = q.sqr()) {
            if (w[i] === 0) continue;
            res = res.mul(q);
          }
        }
        return res;
      };
      BN2.prototype.iushln = function iushln(bits) {
        assert2(typeof bits === "number" && bits >= 0);
        var r = bits % 26;
        var s = (bits - r) / 26;
        var carryMask = 67108863 >>> 26 - r << 26 - r;
        var i;
        if (r !== 0) {
          var carry = 0;
          for (i = 0; i < this.length; i++) {
            var newCarry = this.words[i] & carryMask;
            var c = (this.words[i] | 0) - newCarry << r;
            this.words[i] = c | carry;
            carry = newCarry >>> 26 - r;
          }
          if (carry) {
            this.words[i] = carry;
            this.length++;
          }
        }
        if (s !== 0) {
          for (i = this.length - 1; i >= 0; i--) {
            this.words[i + s] = this.words[i];
          }
          for (i = 0; i < s; i++) {
            this.words[i] = 0;
          }
          this.length += s;
        }
        return this.strip();
      };
      BN2.prototype.ishln = function ishln(bits) {
        assert2(this.negative === 0);
        return this.iushln(bits);
      };
      BN2.prototype.iushrn = function iushrn(bits, hint, extended) {
        assert2(typeof bits === "number" && bits >= 0);
        var h;
        if (hint) {
          h = (hint - hint % 26) / 26;
        } else {
          h = 0;
        }
        var r = bits % 26;
        var s = Math.min((bits - r) / 26, this.length);
        var mask = 67108863 ^ 67108863 >>> r << r;
        var maskedWords = extended;
        h -= s;
        h = Math.max(0, h);
        if (maskedWords) {
          for (var i = 0; i < s; i++) {
            maskedWords.words[i] = this.words[i];
          }
          maskedWords.length = s;
        }
        if (s === 0) {
        } else if (this.length > s) {
          this.length -= s;
          for (i = 0; i < this.length; i++) {
            this.words[i] = this.words[i + s];
          }
        } else {
          this.words[0] = 0;
          this.length = 1;
        }
        var carry = 0;
        for (i = this.length - 1; i >= 0 && (carry !== 0 || i >= h); i--) {
          var word = this.words[i] | 0;
          this.words[i] = carry << 26 - r | word >>> r;
          carry = word & mask;
        }
        if (maskedWords && carry !== 0) {
          maskedWords.words[maskedWords.length++] = carry;
        }
        if (this.length === 0) {
          this.words[0] = 0;
          this.length = 1;
        }
        return this.strip();
      };
      BN2.prototype.ishrn = function ishrn(bits, hint, extended) {
        assert2(this.negative === 0);
        return this.iushrn(bits, hint, extended);
      };
      BN2.prototype.shln = function shln(bits) {
        return this.clone().ishln(bits);
      };
      BN2.prototype.ushln = function ushln(bits) {
        return this.clone().iushln(bits);
      };
      BN2.prototype.shrn = function shrn(bits) {
        return this.clone().ishrn(bits);
      };
      BN2.prototype.ushrn = function ushrn(bits) {
        return this.clone().iushrn(bits);
      };
      BN2.prototype.testn = function testn(bit) {
        assert2(typeof bit === "number" && bit >= 0);
        var r = bit % 26;
        var s = (bit - r) / 26;
        var q = 1 << r;
        if (this.length <= s) return false;
        var w = this.words[s];
        return !!(w & q);
      };
      BN2.prototype.imaskn = function imaskn(bits) {
        assert2(typeof bits === "number" && bits >= 0);
        var r = bits % 26;
        var s = (bits - r) / 26;
        assert2(this.negative === 0, "imaskn works only with positive numbers");
        if (this.length <= s) {
          return this;
        }
        if (r !== 0) {
          s++;
        }
        this.length = Math.min(s, this.length);
        if (r !== 0) {
          var mask = 67108863 ^ 67108863 >>> r << r;
          this.words[this.length - 1] &= mask;
        }
        return this.strip();
      };
      BN2.prototype.maskn = function maskn(bits) {
        return this.clone().imaskn(bits);
      };
      BN2.prototype.iaddn = function iaddn(num) {
        assert2(typeof num === "number");
        assert2(num < 67108864);
        if (num < 0) return this.isubn(-num);
        if (this.negative !== 0) {
          if (this.length === 1 && (this.words[0] | 0) < num) {
            this.words[0] = num - (this.words[0] | 0);
            this.negative = 0;
            return this;
          }
          this.negative = 0;
          this.isubn(num);
          this.negative = 1;
          return this;
        }
        return this._iaddn(num);
      };
      BN2.prototype._iaddn = function _iaddn(num) {
        this.words[0] += num;
        for (var i = 0; i < this.length && this.words[i] >= 67108864; i++) {
          this.words[i] -= 67108864;
          if (i === this.length - 1) {
            this.words[i + 1] = 1;
          } else {
            this.words[i + 1]++;
          }
        }
        this.length = Math.max(this.length, i + 1);
        return this;
      };
      BN2.prototype.isubn = function isubn(num) {
        assert2(typeof num === "number");
        assert2(num < 67108864);
        if (num < 0) return this.iaddn(-num);
        if (this.negative !== 0) {
          this.negative = 0;
          this.iaddn(num);
          this.negative = 1;
          return this;
        }
        this.words[0] -= num;
        if (this.length === 1 && this.words[0] < 0) {
          this.words[0] = -this.words[0];
          this.negative = 1;
        } else {
          for (var i = 0; i < this.length && this.words[i] < 0; i++) {
            this.words[i] += 67108864;
            this.words[i + 1] -= 1;
          }
        }
        return this.strip();
      };
      BN2.prototype.addn = function addn(num) {
        return this.clone().iaddn(num);
      };
      BN2.prototype.subn = function subn(num) {
        return this.clone().isubn(num);
      };
      BN2.prototype.iabs = function iabs() {
        this.negative = 0;
        return this;
      };
      BN2.prototype.abs = function abs() {
        return this.clone().iabs();
      };
      BN2.prototype._ishlnsubmul = function _ishlnsubmul(num, mul, shift) {
        var len = num.length + shift;
        var i;
        this._expand(len);
        var w;
        var carry = 0;
        for (i = 0; i < num.length; i++) {
          w = (this.words[i + shift] | 0) + carry;
          var right = (num.words[i] | 0) * mul;
          w -= right & 67108863;
          carry = (w >> 26) - (right / 67108864 | 0);
          this.words[i + shift] = w & 67108863;
        }
        for (; i < this.length - shift; i++) {
          w = (this.words[i + shift] | 0) + carry;
          carry = w >> 26;
          this.words[i + shift] = w & 67108863;
        }
        if (carry === 0) return this.strip();
        assert2(carry === -1);
        carry = 0;
        for (i = 0; i < this.length; i++) {
          w = -(this.words[i] | 0) + carry;
          carry = w >> 26;
          this.words[i] = w & 67108863;
        }
        this.negative = 1;
        return this.strip();
      };
      BN2.prototype._wordDiv = function _wordDiv(num, mode) {
        var shift = this.length - num.length;
        var a = this.clone();
        var b = num;
        var bhi = b.words[b.length - 1] | 0;
        var bhiBits = this._countBits(bhi);
        shift = 26 - bhiBits;
        if (shift !== 0) {
          b = b.ushln(shift);
          a.iushln(shift);
          bhi = b.words[b.length - 1] | 0;
        }
        var m = a.length - b.length;
        var q;
        if (mode !== "mod") {
          q = new BN2(null);
          q.length = m + 1;
          q.words = new Array(q.length);
          for (var i = 0; i < q.length; i++) {
            q.words[i] = 0;
          }
        }
        var diff = a.clone()._ishlnsubmul(b, 1, m);
        if (diff.negative === 0) {
          a = diff;
          if (q) {
            q.words[m] = 1;
          }
        }
        for (var j = m - 1; j >= 0; j--) {
          var qj = (a.words[b.length + j] | 0) * 67108864 + (a.words[b.length + j - 1] | 0);
          qj = Math.min(qj / bhi | 0, 67108863);
          a._ishlnsubmul(b, qj, j);
          while (a.negative !== 0) {
            qj--;
            a.negative = 0;
            a._ishlnsubmul(b, 1, j);
            if (!a.isZero()) {
              a.negative ^= 1;
            }
          }
          if (q) {
            q.words[j] = qj;
          }
        }
        if (q) {
          q.strip();
        }
        a.strip();
        if (mode !== "div" && shift !== 0) {
          a.iushrn(shift);
        }
        return {
          div: q || null,
          mod: a
        };
      };
      BN2.prototype.divmod = function divmod(num, mode, positive) {
        assert2(!num.isZero());
        if (this.isZero()) {
          return {
            div: new BN2(0),
            mod: new BN2(0)
          };
        }
        var div, mod, res;
        if (this.negative !== 0 && num.negative === 0) {
          res = this.neg().divmod(num, mode);
          if (mode !== "mod") {
            div = res.div.neg();
          }
          if (mode !== "div") {
            mod = res.mod.neg();
            if (positive && mod.negative !== 0) {
              mod.iadd(num);
            }
          }
          return {
            div,
            mod
          };
        }
        if (this.negative === 0 && num.negative !== 0) {
          res = this.divmod(num.neg(), mode);
          if (mode !== "mod") {
            div = res.div.neg();
          }
          return {
            div,
            mod: res.mod
          };
        }
        if ((this.negative & num.negative) !== 0) {
          res = this.neg().divmod(num.neg(), mode);
          if (mode !== "div") {
            mod = res.mod.neg();
            if (positive && mod.negative !== 0) {
              mod.isub(num);
            }
          }
          return {
            div: res.div,
            mod
          };
        }
        if (num.length > this.length || this.cmp(num) < 0) {
          return {
            div: new BN2(0),
            mod: this
          };
        }
        if (num.length === 1) {
          if (mode === "div") {
            return {
              div: this.divn(num.words[0]),
              mod: null
            };
          }
          if (mode === "mod") {
            return {
              div: null,
              mod: new BN2(this.modn(num.words[0]))
            };
          }
          return {
            div: this.divn(num.words[0]),
            mod: new BN2(this.modn(num.words[0]))
          };
        }
        return this._wordDiv(num, mode);
      };
      BN2.prototype.div = function div(num) {
        return this.divmod(num, "div", false).div;
      };
      BN2.prototype.mod = function mod(num) {
        return this.divmod(num, "mod", false).mod;
      };
      BN2.prototype.umod = function umod(num) {
        return this.divmod(num, "mod", true).mod;
      };
      BN2.prototype.divRound = function divRound(num) {
        var dm = this.divmod(num);
        if (dm.mod.isZero()) return dm.div;
        var mod = dm.div.negative !== 0 ? dm.mod.isub(num) : dm.mod;
        var half = num.ushrn(1);
        var r2 = num.andln(1);
        var cmp = mod.cmp(half);
        if (cmp < 0 || r2 === 1 && cmp === 0) return dm.div;
        return dm.div.negative !== 0 ? dm.div.isubn(1) : dm.div.iaddn(1);
      };
      BN2.prototype.modn = function modn(num) {
        assert2(num <= 67108863);
        var p = (1 << 26) % num;
        var acc = 0;
        for (var i = this.length - 1; i >= 0; i--) {
          acc = (p * acc + (this.words[i] | 0)) % num;
        }
        return acc;
      };
      BN2.prototype.idivn = function idivn(num) {
        assert2(num <= 67108863);
        var carry = 0;
        for (var i = this.length - 1; i >= 0; i--) {
          var w = (this.words[i] | 0) + carry * 67108864;
          this.words[i] = w / num | 0;
          carry = w % num;
        }
        return this.strip();
      };
      BN2.prototype.divn = function divn(num) {
        return this.clone().idivn(num);
      };
      BN2.prototype.egcd = function egcd(p) {
        assert2(p.negative === 0);
        assert2(!p.isZero());
        var x = this;
        var y = p.clone();
        if (x.negative !== 0) {
          x = x.umod(p);
        } else {
          x = x.clone();
        }
        var A = new BN2(1);
        var B = new BN2(0);
        var C = new BN2(0);
        var D = new BN2(1);
        var g = 0;
        while (x.isEven() && y.isEven()) {
          x.iushrn(1);
          y.iushrn(1);
          ++g;
        }
        var yp = y.clone();
        var xp = x.clone();
        while (!x.isZero()) {
          for (var i = 0, im = 1; (x.words[0] & im) === 0 && i < 26; ++i, im <<= 1) ;
          if (i > 0) {
            x.iushrn(i);
            while (i-- > 0) {
              if (A.isOdd() || B.isOdd()) {
                A.iadd(yp);
                B.isub(xp);
              }
              A.iushrn(1);
              B.iushrn(1);
            }
          }
          for (var j = 0, jm = 1; (y.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1) ;
          if (j > 0) {
            y.iushrn(j);
            while (j-- > 0) {
              if (C.isOdd() || D.isOdd()) {
                C.iadd(yp);
                D.isub(xp);
              }
              C.iushrn(1);
              D.iushrn(1);
            }
          }
          if (x.cmp(y) >= 0) {
            x.isub(y);
            A.isub(C);
            B.isub(D);
          } else {
            y.isub(x);
            C.isub(A);
            D.isub(B);
          }
        }
        return {
          a: C,
          b: D,
          gcd: y.iushln(g)
        };
      };
      BN2.prototype._invmp = function _invmp(p) {
        assert2(p.negative === 0);
        assert2(!p.isZero());
        var a = this;
        var b = p.clone();
        if (a.negative !== 0) {
          a = a.umod(p);
        } else {
          a = a.clone();
        }
        var x1 = new BN2(1);
        var x2 = new BN2(0);
        var delta = b.clone();
        while (a.cmpn(1) > 0 && b.cmpn(1) > 0) {
          for (var i = 0, im = 1; (a.words[0] & im) === 0 && i < 26; ++i, im <<= 1) ;
          if (i > 0) {
            a.iushrn(i);
            while (i-- > 0) {
              if (x1.isOdd()) {
                x1.iadd(delta);
              }
              x1.iushrn(1);
            }
          }
          for (var j = 0, jm = 1; (b.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1) ;
          if (j > 0) {
            b.iushrn(j);
            while (j-- > 0) {
              if (x2.isOdd()) {
                x2.iadd(delta);
              }
              x2.iushrn(1);
            }
          }
          if (a.cmp(b) >= 0) {
            a.isub(b);
            x1.isub(x2);
          } else {
            b.isub(a);
            x2.isub(x1);
          }
        }
        var res;
        if (a.cmpn(1) === 0) {
          res = x1;
        } else {
          res = x2;
        }
        if (res.cmpn(0) < 0) {
          res.iadd(p);
        }
        return res;
      };
      BN2.prototype.gcd = function gcd(num) {
        if (this.isZero()) return num.abs();
        if (num.isZero()) return this.abs();
        var a = this.clone();
        var b = num.clone();
        a.negative = 0;
        b.negative = 0;
        for (var shift = 0; a.isEven() && b.isEven(); shift++) {
          a.iushrn(1);
          b.iushrn(1);
        }
        do {
          while (a.isEven()) {
            a.iushrn(1);
          }
          while (b.isEven()) {
            b.iushrn(1);
          }
          var r = a.cmp(b);
          if (r < 0) {
            var t = a;
            a = b;
            b = t;
          } else if (r === 0 || b.cmpn(1) === 0) {
            break;
          }
          a.isub(b);
        } while (true);
        return b.iushln(shift);
      };
      BN2.prototype.invm = function invm(num) {
        return this.egcd(num).a.umod(num);
      };
      BN2.prototype.isEven = function isEven() {
        return (this.words[0] & 1) === 0;
      };
      BN2.prototype.isOdd = function isOdd() {
        return (this.words[0] & 1) === 1;
      };
      BN2.prototype.andln = function andln(num) {
        return this.words[0] & num;
      };
      BN2.prototype.bincn = function bincn(bit) {
        assert2(typeof bit === "number");
        var r = bit % 26;
        var s = (bit - r) / 26;
        var q = 1 << r;
        if (this.length <= s) {
          this._expand(s + 1);
          this.words[s] |= q;
          return this;
        }
        var carry = q;
        for (var i = s; carry !== 0 && i < this.length; i++) {
          var w = this.words[i] | 0;
          w += carry;
          carry = w >>> 26;
          w &= 67108863;
          this.words[i] = w;
        }
        if (carry !== 0) {
          this.words[i] = carry;
          this.length++;
        }
        return this;
      };
      BN2.prototype.isZero = function isZero() {
        return this.length === 1 && this.words[0] === 0;
      };
      BN2.prototype.cmpn = function cmpn(num) {
        var negative = num < 0;
        if (this.negative !== 0 && !negative) return -1;
        if (this.negative === 0 && negative) return 1;
        this.strip();
        var res;
        if (this.length > 1) {
          res = 1;
        } else {
          if (negative) {
            num = -num;
          }
          assert2(num <= 67108863, "Number is too big");
          var w = this.words[0] | 0;
          res = w === num ? 0 : w < num ? -1 : 1;
        }
        if (this.negative !== 0) return -res | 0;
        return res;
      };
      BN2.prototype.cmp = function cmp(num) {
        if (this.negative !== 0 && num.negative === 0) return -1;
        if (this.negative === 0 && num.negative !== 0) return 1;
        var res = this.ucmp(num);
        if (this.negative !== 0) return -res | 0;
        return res;
      };
      BN2.prototype.ucmp = function ucmp(num) {
        if (this.length > num.length) return 1;
        if (this.length < num.length) return -1;
        var res = 0;
        for (var i = this.length - 1; i >= 0; i--) {
          var a = this.words[i] | 0;
          var b = num.words[i] | 0;
          if (a === b) continue;
          if (a < b) {
            res = -1;
          } else if (a > b) {
            res = 1;
          }
          break;
        }
        return res;
      };
      BN2.prototype.gtn = function gtn(num) {
        return this.cmpn(num) === 1;
      };
      BN2.prototype.gt = function gt(num) {
        return this.cmp(num) === 1;
      };
      BN2.prototype.gten = function gten(num) {
        return this.cmpn(num) >= 0;
      };
      BN2.prototype.gte = function gte(num) {
        return this.cmp(num) >= 0;
      };
      BN2.prototype.ltn = function ltn(num) {
        return this.cmpn(num) === -1;
      };
      BN2.prototype.lt = function lt(num) {
        return this.cmp(num) === -1;
      };
      BN2.prototype.lten = function lten(num) {
        return this.cmpn(num) <= 0;
      };
      BN2.prototype.lte = function lte(num) {
        return this.cmp(num) <= 0;
      };
      BN2.prototype.eqn = function eqn(num) {
        return this.cmpn(num) === 0;
      };
      BN2.prototype.eq = function eq(num) {
        return this.cmp(num) === 0;
      };
      BN2.red = function red(num) {
        return new Red(num);
      };
      BN2.prototype.toRed = function toRed(ctx) {
        assert2(!this.red, "Already a number in reduction context");
        assert2(this.negative === 0, "red works only with positives");
        return ctx.convertTo(this)._forceRed(ctx);
      };
      BN2.prototype.fromRed = function fromRed() {
        assert2(this.red, "fromRed works only with numbers in reduction context");
        return this.red.convertFrom(this);
      };
      BN2.prototype._forceRed = function _forceRed(ctx) {
        this.red = ctx;
        return this;
      };
      BN2.prototype.forceRed = function forceRed(ctx) {
        assert2(!this.red, "Already a number in reduction context");
        return this._forceRed(ctx);
      };
      BN2.prototype.redAdd = function redAdd(num) {
        assert2(this.red, "redAdd works only with red numbers");
        return this.red.add(this, num);
      };
      BN2.prototype.redIAdd = function redIAdd(num) {
        assert2(this.red, "redIAdd works only with red numbers");
        return this.red.iadd(this, num);
      };
      BN2.prototype.redSub = function redSub(num) {
        assert2(this.red, "redSub works only with red numbers");
        return this.red.sub(this, num);
      };
      BN2.prototype.redISub = function redISub(num) {
        assert2(this.red, "redISub works only with red numbers");
        return this.red.isub(this, num);
      };
      BN2.prototype.redShl = function redShl(num) {
        assert2(this.red, "redShl works only with red numbers");
        return this.red.shl(this, num);
      };
      BN2.prototype.redMul = function redMul(num) {
        assert2(this.red, "redMul works only with red numbers");
        this.red._verify2(this, num);
        return this.red.mul(this, num);
      };
      BN2.prototype.redIMul = function redIMul(num) {
        assert2(this.red, "redMul works only with red numbers");
        this.red._verify2(this, num);
        return this.red.imul(this, num);
      };
      BN2.prototype.redSqr = function redSqr() {
        assert2(this.red, "redSqr works only with red numbers");
        this.red._verify1(this);
        return this.red.sqr(this);
      };
      BN2.prototype.redISqr = function redISqr() {
        assert2(this.red, "redISqr works only with red numbers");
        this.red._verify1(this);
        return this.red.isqr(this);
      };
      BN2.prototype.redSqrt = function redSqrt() {
        assert2(this.red, "redSqrt works only with red numbers");
        this.red._verify1(this);
        return this.red.sqrt(this);
      };
      BN2.prototype.redInvm = function redInvm() {
        assert2(this.red, "redInvm works only with red numbers");
        this.red._verify1(this);
        return this.red.invm(this);
      };
      BN2.prototype.redNeg = function redNeg() {
        assert2(this.red, "redNeg works only with red numbers");
        this.red._verify1(this);
        return this.red.neg(this);
      };
      BN2.prototype.redPow = function redPow(num) {
        assert2(this.red && !num.red, "redPow(normalNum)");
        this.red._verify1(this);
        return this.red.pow(this, num);
      };
      var primes = {
        k256: null,
        p224: null,
        p192: null,
        p25519: null
      };
      function MPrime(name, p) {
        this.name = name;
        this.p = new BN2(p, 16);
        this.n = this.p.bitLength();
        this.k = new BN2(1).iushln(this.n).isub(this.p);
        this.tmp = this._tmp();
      }
      MPrime.prototype._tmp = function _tmp() {
        var tmp = new BN2(null);
        tmp.words = new Array(Math.ceil(this.n / 13));
        return tmp;
      };
      MPrime.prototype.ireduce = function ireduce(num) {
        var r = num;
        var rlen;
        do {
          this.split(r, this.tmp);
          r = this.imulK(r);
          r = r.iadd(this.tmp);
          rlen = r.bitLength();
        } while (rlen > this.n);
        var cmp = rlen < this.n ? -1 : r.ucmp(this.p);
        if (cmp === 0) {
          r.words[0] = 0;
          r.length = 1;
        } else if (cmp > 0) {
          r.isub(this.p);
        } else {
          r.strip();
        }
        return r;
      };
      MPrime.prototype.split = function split2(input, out) {
        input.iushrn(this.n, 0, out);
      };
      MPrime.prototype.imulK = function imulK(num) {
        return num.imul(this.k);
      };
      function K256() {
        MPrime.call(
          this,
          "k256",
          "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
        );
      }
      inherits(K256, MPrime);
      K256.prototype.split = function split2(input, output2) {
        var mask = 4194303;
        var outLen = Math.min(input.length, 9);
        for (var i = 0; i < outLen; i++) {
          output2.words[i] = input.words[i];
        }
        output2.length = outLen;
        if (input.length <= 9) {
          input.words[0] = 0;
          input.length = 1;
          return;
        }
        var prev = input.words[9];
        output2.words[output2.length++] = prev & mask;
        for (i = 10; i < input.length; i++) {
          var next = input.words[i] | 0;
          input.words[i - 10] = (next & mask) << 4 | prev >>> 22;
          prev = next;
        }
        prev >>>= 22;
        input.words[i - 10] = prev;
        if (prev === 0 && input.length > 10) {
          input.length -= 10;
        } else {
          input.length -= 9;
        }
      };
      K256.prototype.imulK = function imulK(num) {
        num.words[num.length] = 0;
        num.words[num.length + 1] = 0;
        num.length += 2;
        var lo = 0;
        for (var i = 0; i < num.length; i++) {
          var w = num.words[i] | 0;
          lo += w * 977;
          num.words[i] = lo & 67108863;
          lo = w * 64 + (lo / 67108864 | 0);
        }
        if (num.words[num.length - 1] === 0) {
          num.length--;
          if (num.words[num.length - 1] === 0) {
            num.length--;
          }
        }
        return num;
      };
      function P224() {
        MPrime.call(
          this,
          "p224",
          "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
        );
      }
      inherits(P224, MPrime);
      function P192() {
        MPrime.call(
          this,
          "p192",
          "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
        );
      }
      inherits(P192, MPrime);
      function P25519() {
        MPrime.call(
          this,
          "25519",
          "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
        );
      }
      inherits(P25519, MPrime);
      P25519.prototype.imulK = function imulK(num) {
        var carry = 0;
        for (var i = 0; i < num.length; i++) {
          var hi = (num.words[i] | 0) * 19 + carry;
          var lo = hi & 67108863;
          hi >>>= 26;
          num.words[i] = lo;
          carry = hi;
        }
        if (carry !== 0) {
          num.words[num.length++] = carry;
        }
        return num;
      };
      BN2._prime = function prime(name) {
        if (primes[name]) return primes[name];
        var prime2;
        if (name === "k256") {
          prime2 = new K256();
        } else if (name === "p224") {
          prime2 = new P224();
        } else if (name === "p192") {
          prime2 = new P192();
        } else if (name === "p25519") {
          prime2 = new P25519();
        } else {
          throw new Error("Unknown prime " + name);
        }
        primes[name] = prime2;
        return prime2;
      };
      function Red(m) {
        if (typeof m === "string") {
          var prime = BN2._prime(m);
          this.m = prime.p;
          this.prime = prime;
        } else {
          assert2(m.gtn(1), "modulus must be greater than 1");
          this.m = m;
          this.prime = null;
        }
      }
      Red.prototype._verify1 = function _verify1(a) {
        assert2(a.negative === 0, "red works only with positives");
        assert2(a.red, "red works only with red numbers");
      };
      Red.prototype._verify2 = function _verify2(a, b) {
        assert2((a.negative | b.negative) === 0, "red works only with positives");
        assert2(
          a.red && a.red === b.red,
          "red works only with red numbers"
        );
      };
      Red.prototype.imod = function imod(a) {
        if (this.prime) return this.prime.ireduce(a)._forceRed(this);
        return a.umod(this.m)._forceRed(this);
      };
      Red.prototype.neg = function neg(a) {
        if (a.isZero()) {
          return a.clone();
        }
        return this.m.sub(a)._forceRed(this);
      };
      Red.prototype.add = function add2(a, b) {
        this._verify2(a, b);
        var res = a.add(b);
        if (res.cmp(this.m) >= 0) {
          res.isub(this.m);
        }
        return res._forceRed(this);
      };
      Red.prototype.iadd = function iadd(a, b) {
        this._verify2(a, b);
        var res = a.iadd(b);
        if (res.cmp(this.m) >= 0) {
          res.isub(this.m);
        }
        return res;
      };
      Red.prototype.sub = function sub(a, b) {
        this._verify2(a, b);
        var res = a.sub(b);
        if (res.cmpn(0) < 0) {
          res.iadd(this.m);
        }
        return res._forceRed(this);
      };
      Red.prototype.isub = function isub(a, b) {
        this._verify2(a, b);
        var res = a.isub(b);
        if (res.cmpn(0) < 0) {
          res.iadd(this.m);
        }
        return res;
      };
      Red.prototype.shl = function shl(a, num) {
        this._verify1(a);
        return this.imod(a.ushln(num));
      };
      Red.prototype.imul = function imul(a, b) {
        this._verify2(a, b);
        return this.imod(a.imul(b));
      };
      Red.prototype.mul = function mul(a, b) {
        this._verify2(a, b);
        return this.imod(a.mul(b));
      };
      Red.prototype.isqr = function isqr(a) {
        return this.imul(a, a.clone());
      };
      Red.prototype.sqr = function sqr(a) {
        return this.mul(a, a);
      };
      Red.prototype.sqrt = function sqrt(a) {
        if (a.isZero()) return a.clone();
        var mod3 = this.m.andln(3);
        assert2(mod3 % 2 === 1);
        if (mod3 === 3) {
          var pow = this.m.add(new BN2(1)).iushrn(2);
          return this.pow(a, pow);
        }
        var q = this.m.subn(1);
        var s = 0;
        while (!q.isZero() && q.andln(1) === 0) {
          s++;
          q.iushrn(1);
        }
        assert2(!q.isZero());
        var one = new BN2(1).toRed(this);
        var nOne = one.redNeg();
        var lpow = this.m.subn(1).iushrn(1);
        var z = this.m.bitLength();
        z = new BN2(2 * z * z).toRed(this);
        while (this.pow(z, lpow).cmp(nOne) !== 0) {
          z.redIAdd(nOne);
        }
        var c = this.pow(z, q);
        var r = this.pow(a, q.addn(1).iushrn(1));
        var t = this.pow(a, q);
        var m = s;
        while (t.cmp(one) !== 0) {
          var tmp = t;
          for (var i = 0; tmp.cmp(one) !== 0; i++) {
            tmp = tmp.redSqr();
          }
          assert2(i < m);
          var b = this.pow(c, new BN2(1).iushln(m - i - 1));
          r = r.redMul(b);
          c = b.redSqr();
          t = t.redMul(c);
          m = i;
        }
        return r;
      };
      Red.prototype.invm = function invm(a) {
        var inv = a._invmp(this.m);
        if (inv.negative !== 0) {
          inv.negative = 0;
          return this.imod(inv).redNeg();
        } else {
          return this.imod(inv);
        }
      };
      Red.prototype.pow = function pow(a, num) {
        if (num.isZero()) return new BN2(1);
        if (num.cmpn(1) === 0) return a.clone();
        var windowSize = 4;
        var wnd = new Array(1 << windowSize);
        wnd[0] = new BN2(1).toRed(this);
        wnd[1] = a;
        for (var i = 2; i < wnd.length; i++) {
          wnd[i] = this.mul(wnd[i - 1], a);
        }
        var res = wnd[0];
        var current = 0;
        var currentLen = 0;
        var start = num.bitLength() % 26;
        if (start === 0) {
          start = 26;
        }
        for (i = num.length - 1; i >= 0; i--) {
          var word = num.words[i];
          for (var j = start - 1; j >= 0; j--) {
            var bit = word >> j & 1;
            if (res !== wnd[0]) {
              res = this.sqr(res);
            }
            if (bit === 0 && current === 0) {
              currentLen = 0;
              continue;
            }
            current <<= 1;
            current |= bit;
            currentLen++;
            if (currentLen !== windowSize && (i !== 0 || j !== 0)) continue;
            res = this.mul(res, wnd[current]);
            currentLen = 0;
            current = 0;
          }
          start = 26;
        }
        return res;
      };
      Red.prototype.convertTo = function convertTo(num) {
        var r = num.umod(this.m);
        return r === num ? r.clone() : r;
      };
      Red.prototype.convertFrom = function convertFrom(num) {
        var res = num.clone();
        res.red = null;
        return res;
      };
      BN2.mont = function mont(num) {
        return new Mont(num);
      };
      function Mont(m) {
        Red.call(this, m);
        this.shift = this.m.bitLength();
        if (this.shift % 26 !== 0) {
          this.shift += 26 - this.shift % 26;
        }
        this.r = new BN2(1).iushln(this.shift);
        this.r2 = this.imod(this.r.sqr());
        this.rinv = this.r._invmp(this.m);
        this.minv = this.rinv.mul(this.r).isubn(1).div(this.m);
        this.minv = this.minv.umod(this.r);
        this.minv = this.r.sub(this.minv);
      }
      inherits(Mont, Red);
      Mont.prototype.convertTo = function convertTo(num) {
        return this.imod(num.ushln(this.shift));
      };
      Mont.prototype.convertFrom = function convertFrom(num) {
        var r = this.imod(num.mul(this.rinv));
        r.red = null;
        return r;
      };
      Mont.prototype.imul = function imul(a, b) {
        if (a.isZero() || b.isZero()) {
          a.words[0] = 0;
          a.length = 1;
          return a;
        }
        var t = a.imul(b);
        var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
        var u = t.isub(c).iushrn(this.shift);
        var res = u;
        if (u.cmp(this.m) >= 0) {
          res = u.isub(this.m);
        } else if (u.cmpn(0) < 0) {
          res = u.iadd(this.m);
        }
        return res._forceRed(this);
      };
      Mont.prototype.mul = function mul(a, b) {
        if (a.isZero() || b.isZero()) return new BN2(0)._forceRed(this);
        var t = a.mul(b);
        var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
        var u = t.isub(c).iushrn(this.shift);
        var res = u;
        if (u.cmp(this.m) >= 0) {
          res = u.isub(this.m);
        } else if (u.cmpn(0) < 0) {
          res = u.iadd(this.m);
        }
        return res._forceRed(this);
      };
      Mont.prototype.invm = function invm(a) {
        var res = this.imod(a._invmp(this.m).mul(this.r2));
        return res._forceRed(this);
      };
    })(typeof module === "undefined" || module, exports);
  }
});

// node_modules/number-to-bn/node_modules/bn.js/lib/bn.js
var require_bn2 = __commonJS({
  "node_modules/number-to-bn/node_modules/bn.js/lib/bn.js"(exports, module) {
    (function(module2, exports2) {
      "use strict";
      function assert2(val, msg) {
        if (!val) throw new Error(msg || "Assertion failed");
      }
      function inherits(ctor, superCtor) {
        ctor.super_ = superCtor;
        var TempCtor = function() {
        };
        TempCtor.prototype = superCtor.prototype;
        ctor.prototype = new TempCtor();
        ctor.prototype.constructor = ctor;
      }
      function BN2(number2, base, endian) {
        if (BN2.isBN(number2)) {
          return number2;
        }
        this.negative = 0;
        this.words = null;
        this.length = 0;
        this.red = null;
        if (number2 !== null) {
          if (base === "le" || base === "be") {
            endian = base;
            base = 10;
          }
          this._init(number2 || 0, base || 10, endian || "be");
        }
      }
      if (typeof module2 === "object") {
        module2.exports = BN2;
      } else {
        exports2.BN = BN2;
      }
      BN2.BN = BN2;
      BN2.wordSize = 26;
      var Buffer2;
      try {
        Buffer2 = __require("buffer").Buffer;
      } catch (e) {
      }
      BN2.isBN = function isBN(num) {
        if (num instanceof BN2) {
          return true;
        }
        return num !== null && typeof num === "object" && num.constructor.wordSize === BN2.wordSize && Array.isArray(num.words);
      };
      BN2.max = function max(left, right) {
        if (left.cmp(right) > 0) return left;
        return right;
      };
      BN2.min = function min(left, right) {
        if (left.cmp(right) < 0) return left;
        return right;
      };
      BN2.prototype._init = function init(number2, base, endian) {
        if (typeof number2 === "number") {
          return this._initNumber(number2, base, endian);
        }
        if (typeof number2 === "object") {
          return this._initArray(number2, base, endian);
        }
        if (base === "hex") {
          base = 16;
        }
        assert2(base === (base | 0) && base >= 2 && base <= 36);
        number2 = number2.toString().replace(/\s+/g, "");
        var start = 0;
        if (number2[0] === "-") {
          start++;
        }
        if (base === 16) {
          this._parseHex(number2, start);
        } else {
          this._parseBase(number2, base, start);
        }
        if (number2[0] === "-") {
          this.negative = 1;
        }
        this.strip();
        if (endian !== "le") return;
        this._initArray(this.toArray(), base, endian);
      };
      BN2.prototype._initNumber = function _initNumber(number2, base, endian) {
        if (number2 < 0) {
          this.negative = 1;
          number2 = -number2;
        }
        if (number2 < 67108864) {
          this.words = [number2 & 67108863];
          this.length = 1;
        } else if (number2 < 4503599627370496) {
          this.words = [
            number2 & 67108863,
            number2 / 67108864 & 67108863
          ];
          this.length = 2;
        } else {
          assert2(number2 < 9007199254740992);
          this.words = [
            number2 & 67108863,
            number2 / 67108864 & 67108863,
            1
          ];
          this.length = 3;
        }
        if (endian !== "le") return;
        this._initArray(this.toArray(), base, endian);
      };
      BN2.prototype._initArray = function _initArray(number2, base, endian) {
        assert2(typeof number2.length === "number");
        if (number2.length <= 0) {
          this.words = [0];
          this.length = 1;
          return this;
        }
        this.length = Math.ceil(number2.length / 3);
        this.words = new Array(this.length);
        for (var i = 0; i < this.length; i++) {
          this.words[i] = 0;
        }
        var j, w;
        var off = 0;
        if (endian === "be") {
          for (i = number2.length - 1, j = 0; i >= 0; i -= 3) {
            w = number2[i] | number2[i - 1] << 8 | number2[i - 2] << 16;
            this.words[j] |= w << off & 67108863;
            this.words[j + 1] = w >>> 26 - off & 67108863;
            off += 24;
            if (off >= 26) {
              off -= 26;
              j++;
            }
          }
        } else if (endian === "le") {
          for (i = 0, j = 0; i < number2.length; i += 3) {
            w = number2[i] | number2[i + 1] << 8 | number2[i + 2] << 16;
            this.words[j] |= w << off & 67108863;
            this.words[j + 1] = w >>> 26 - off & 67108863;
            off += 24;
            if (off >= 26) {
              off -= 26;
              j++;
            }
          }
        }
        return this.strip();
      };
      function parseHex(str, start, end) {
        var r = 0;
        var len = Math.min(str.length, end);
        for (var i = start; i < len; i++) {
          var c = str.charCodeAt(i) - 48;
          r <<= 4;
          if (c >= 49 && c <= 54) {
            r |= c - 49 + 10;
          } else if (c >= 17 && c <= 22) {
            r |= c - 17 + 10;
          } else {
            r |= c & 15;
          }
        }
        return r;
      }
      BN2.prototype._parseHex = function _parseHex(number2, start) {
        this.length = Math.ceil((number2.length - start) / 6);
        this.words = new Array(this.length);
        for (var i = 0; i < this.length; i++) {
          this.words[i] = 0;
        }
        var j, w;
        var off = 0;
        for (i = number2.length - 6, j = 0; i >= start; i -= 6) {
          w = parseHex(number2, i, i + 6);
          this.words[j] |= w << off & 67108863;
          this.words[j + 1] |= w >>> 26 - off & 4194303;
          off += 24;
          if (off >= 26) {
            off -= 26;
            j++;
          }
        }
        if (i + 6 !== start) {
          w = parseHex(number2, start, i + 6);
          this.words[j] |= w << off & 67108863;
          this.words[j + 1] |= w >>> 26 - off & 4194303;
        }
        this.strip();
      };
      function parseBase(str, start, end, mul) {
        var r = 0;
        var len = Math.min(str.length, end);
        for (var i = start; i < len; i++) {
          var c = str.charCodeAt(i) - 48;
          r *= mul;
          if (c >= 49) {
            r += c - 49 + 10;
          } else if (c >= 17) {
            r += c - 17 + 10;
          } else {
            r += c;
          }
        }
        return r;
      }
      BN2.prototype._parseBase = function _parseBase(number2, base, start) {
        this.words = [0];
        this.length = 1;
        for (var limbLen = 0, limbPow = 1; limbPow <= 67108863; limbPow *= base) {
          limbLen++;
        }
        limbLen--;
        limbPow = limbPow / base | 0;
        var total = number2.length - start;
        var mod = total % limbLen;
        var end = Math.min(total, total - mod) + start;
        var word = 0;
        for (var i = start; i < end; i += limbLen) {
          word = parseBase(number2, i, i + limbLen, base);
          this.imuln(limbPow);
          if (this.words[0] + word < 67108864) {
            this.words[0] += word;
          } else {
            this._iaddn(word);
          }
        }
        if (mod !== 0) {
          var pow = 1;
          word = parseBase(number2, i, number2.length, base);
          for (i = 0; i < mod; i++) {
            pow *= base;
          }
          this.imuln(pow);
          if (this.words[0] + word < 67108864) {
            this.words[0] += word;
          } else {
            this._iaddn(word);
          }
        }
      };
      BN2.prototype.copy = function copy(dest) {
        dest.words = new Array(this.length);
        for (var i = 0; i < this.length; i++) {
          dest.words[i] = this.words[i];
        }
        dest.length = this.length;
        dest.negative = this.negative;
        dest.red = this.red;
      };
      BN2.prototype.clone = function clone() {
        var r = new BN2(null);
        this.copy(r);
        return r;
      };
      BN2.prototype._expand = function _expand(size) {
        while (this.length < size) {
          this.words[this.length++] = 0;
        }
        return this;
      };
      BN2.prototype.strip = function strip() {
        while (this.length > 1 && this.words[this.length - 1] === 0) {
          this.length--;
        }
        return this._normSign();
      };
      BN2.prototype._normSign = function _normSign() {
        if (this.length === 1 && this.words[0] === 0) {
          this.negative = 0;
        }
        return this;
      };
      BN2.prototype.inspect = function inspect() {
        return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
      };
      var zeros = [
        "",
        "0",
        "00",
        "000",
        "0000",
        "00000",
        "000000",
        "0000000",
        "00000000",
        "000000000",
        "0000000000",
        "00000000000",
        "000000000000",
        "0000000000000",
        "00000000000000",
        "000000000000000",
        "0000000000000000",
        "00000000000000000",
        "000000000000000000",
        "0000000000000000000",
        "00000000000000000000",
        "000000000000000000000",
        "0000000000000000000000",
        "00000000000000000000000",
        "000000000000000000000000",
        "0000000000000000000000000"
      ];
      var groupSizes = [
        0,
        0,
        25,
        16,
        12,
        11,
        10,
        9,
        8,
        8,
        7,
        7,
        7,
        7,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5
      ];
      var groupBases = [
        0,
        0,
        33554432,
        43046721,
        16777216,
        48828125,
        60466176,
        40353607,
        16777216,
        43046721,
        1e7,
        19487171,
        35831808,
        62748517,
        7529536,
        11390625,
        16777216,
        24137569,
        34012224,
        47045881,
        64e6,
        4084101,
        5153632,
        6436343,
        7962624,
        9765625,
        11881376,
        14348907,
        17210368,
        20511149,
        243e5,
        28629151,
        33554432,
        39135393,
        45435424,
        52521875,
        60466176
      ];
      BN2.prototype.toString = function toString(base, padding) {
        base = base || 10;
        padding = padding | 0 || 1;
        var out;
        if (base === 16 || base === "hex") {
          out = "";
          var off = 0;
          var carry = 0;
          for (var i = 0; i < this.length; i++) {
            var w = this.words[i];
            var word = ((w << off | carry) & 16777215).toString(16);
            carry = w >>> 24 - off & 16777215;
            if (carry !== 0 || i !== this.length - 1) {
              out = zeros[6 - word.length] + word + out;
            } else {
              out = word + out;
            }
            off += 2;
            if (off >= 26) {
              off -= 26;
              i--;
            }
          }
          if (carry !== 0) {
            out = carry.toString(16) + out;
          }
          while (out.length % padding !== 0) {
            out = "0" + out;
          }
          if (this.negative !== 0) {
            out = "-" + out;
          }
          return out;
        }
        if (base === (base | 0) && base >= 2 && base <= 36) {
          var groupSize = groupSizes[base];
          var groupBase = groupBases[base];
          out = "";
          var c = this.clone();
          c.negative = 0;
          while (!c.isZero()) {
            var r = c.modn(groupBase).toString(base);
            c = c.idivn(groupBase);
            if (!c.isZero()) {
              out = zeros[groupSize - r.length] + r + out;
            } else {
              out = r + out;
            }
          }
          if (this.isZero()) {
            out = "0" + out;
          }
          while (out.length % padding !== 0) {
            out = "0" + out;
          }
          if (this.negative !== 0) {
            out = "-" + out;
          }
          return out;
        }
        assert2(false, "Base should be between 2 and 36");
      };
      BN2.prototype.toNumber = function toNumber() {
        var ret = this.words[0];
        if (this.length === 2) {
          ret += this.words[1] * 67108864;
        } else if (this.length === 3 && this.words[2] === 1) {
          ret += 4503599627370496 + this.words[1] * 67108864;
        } else if (this.length > 2) {
          assert2(false, "Number can only safely store up to 53 bits");
        }
        return this.negative !== 0 ? -ret : ret;
      };
      BN2.prototype.toJSON = function toJSON() {
        return this.toString(16);
      };
      BN2.prototype.toBuffer = function toBuffer(endian, length) {
        assert2(typeof Buffer2 !== "undefined");
        return this.toArrayLike(Buffer2, endian, length);
      };
      BN2.prototype.toArray = function toArray(endian, length) {
        return this.toArrayLike(Array, endian, length);
      };
      BN2.prototype.toArrayLike = function toArrayLike(ArrayType, endian, length) {
        var byteLength = this.byteLength();
        var reqLength = length || Math.max(1, byteLength);
        assert2(byteLength <= reqLength, "byte array longer than desired length");
        assert2(reqLength > 0, "Requested array length <= 0");
        this.strip();
        var littleEndian = endian === "le";
        var res = new ArrayType(reqLength);
        var b, i;
        var q = this.clone();
        if (!littleEndian) {
          for (i = 0; i < reqLength - byteLength; i++) {
            res[i] = 0;
          }
          for (i = 0; !q.isZero(); i++) {
            b = q.andln(255);
            q.iushrn(8);
            res[reqLength - i - 1] = b;
          }
        } else {
          for (i = 0; !q.isZero(); i++) {
            b = q.andln(255);
            q.iushrn(8);
            res[i] = b;
          }
          for (; i < reqLength; i++) {
            res[i] = 0;
          }
        }
        return res;
      };
      if (Math.clz32) {
        BN2.prototype._countBits = function _countBits(w) {
          return 32 - Math.clz32(w);
        };
      } else {
        BN2.prototype._countBits = function _countBits(w) {
          var t = w;
          var r = 0;
          if (t >= 4096) {
            r += 13;
            t >>>= 13;
          }
          if (t >= 64) {
            r += 7;
            t >>>= 7;
          }
          if (t >= 8) {
            r += 4;
            t >>>= 4;
          }
          if (t >= 2) {
            r += 2;
            t >>>= 2;
          }
          return r + t;
        };
      }
      BN2.prototype._zeroBits = function _zeroBits(w) {
        if (w === 0) return 26;
        var t = w;
        var r = 0;
        if ((t & 8191) === 0) {
          r += 13;
          t >>>= 13;
        }
        if ((t & 127) === 0) {
          r += 7;
          t >>>= 7;
        }
        if ((t & 15) === 0) {
          r += 4;
          t >>>= 4;
        }
        if ((t & 3) === 0) {
          r += 2;
          t >>>= 2;
        }
        if ((t & 1) === 0) {
          r++;
        }
        return r;
      };
      BN2.prototype.bitLength = function bitLength() {
        var w = this.words[this.length - 1];
        var hi = this._countBits(w);
        return (this.length - 1) * 26 + hi;
      };
      function toBitArray(num) {
        var w = new Array(num.bitLength());
        for (var bit = 0; bit < w.length; bit++) {
          var off = bit / 26 | 0;
          var wbit = bit % 26;
          w[bit] = (num.words[off] & 1 << wbit) >>> wbit;
        }
        return w;
      }
      BN2.prototype.zeroBits = function zeroBits() {
        if (this.isZero()) return 0;
        var r = 0;
        for (var i = 0; i < this.length; i++) {
          var b = this._zeroBits(this.words[i]);
          r += b;
          if (b !== 26) break;
        }
        return r;
      };
      BN2.prototype.byteLength = function byteLength() {
        return Math.ceil(this.bitLength() / 8);
      };
      BN2.prototype.toTwos = function toTwos(width) {
        if (this.negative !== 0) {
          return this.abs().inotn(width).iaddn(1);
        }
        return this.clone();
      };
      BN2.prototype.fromTwos = function fromTwos(width) {
        if (this.testn(width - 1)) {
          return this.notn(width).iaddn(1).ineg();
        }
        return this.clone();
      };
      BN2.prototype.isNeg = function isNeg() {
        return this.negative !== 0;
      };
      BN2.prototype.neg = function neg() {
        return this.clone().ineg();
      };
      BN2.prototype.ineg = function ineg() {
        if (!this.isZero()) {
          this.negative ^= 1;
        }
        return this;
      };
      BN2.prototype.iuor = function iuor(num) {
        while (this.length < num.length) {
          this.words[this.length++] = 0;
        }
        for (var i = 0; i < num.length; i++) {
          this.words[i] = this.words[i] | num.words[i];
        }
        return this.strip();
      };
      BN2.prototype.ior = function ior(num) {
        assert2((this.negative | num.negative) === 0);
        return this.iuor(num);
      };
      BN2.prototype.or = function or(num) {
        if (this.length > num.length) return this.clone().ior(num);
        return num.clone().ior(this);
      };
      BN2.prototype.uor = function uor(num) {
        if (this.length > num.length) return this.clone().iuor(num);
        return num.clone().iuor(this);
      };
      BN2.prototype.iuand = function iuand(num) {
        var b;
        if (this.length > num.length) {
          b = num;
        } else {
          b = this;
        }
        for (var i = 0; i < b.length; i++) {
          this.words[i] = this.words[i] & num.words[i];
        }
        this.length = b.length;
        return this.strip();
      };
      BN2.prototype.iand = function iand(num) {
        assert2((this.negative | num.negative) === 0);
        return this.iuand(num);
      };
      BN2.prototype.and = function and(num) {
        if (this.length > num.length) return this.clone().iand(num);
        return num.clone().iand(this);
      };
      BN2.prototype.uand = function uand(num) {
        if (this.length > num.length) return this.clone().iuand(num);
        return num.clone().iuand(this);
      };
      BN2.prototype.iuxor = function iuxor(num) {
        var a;
        var b;
        if (this.length > num.length) {
          a = this;
          b = num;
        } else {
          a = num;
          b = this;
        }
        for (var i = 0; i < b.length; i++) {
          this.words[i] = a.words[i] ^ b.words[i];
        }
        if (this !== a) {
          for (; i < a.length; i++) {
            this.words[i] = a.words[i];
          }
        }
        this.length = a.length;
        return this.strip();
      };
      BN2.prototype.ixor = function ixor(num) {
        assert2((this.negative | num.negative) === 0);
        return this.iuxor(num);
      };
      BN2.prototype.xor = function xor(num) {
        if (this.length > num.length) return this.clone().ixor(num);
        return num.clone().ixor(this);
      };
      BN2.prototype.uxor = function uxor(num) {
        if (this.length > num.length) return this.clone().iuxor(num);
        return num.clone().iuxor(this);
      };
      BN2.prototype.inotn = function inotn(width) {
        assert2(typeof width === "number" && width >= 0);
        var bytesNeeded = Math.ceil(width / 26) | 0;
        var bitsLeft = width % 26;
        this._expand(bytesNeeded);
        if (bitsLeft > 0) {
          bytesNeeded--;
        }
        for (var i = 0; i < bytesNeeded; i++) {
          this.words[i] = ~this.words[i] & 67108863;
        }
        if (bitsLeft > 0) {
          this.words[i] = ~this.words[i] & 67108863 >> 26 - bitsLeft;
        }
        return this.strip();
      };
      BN2.prototype.notn = function notn(width) {
        return this.clone().inotn(width);
      };
      BN2.prototype.setn = function setn(bit, val) {
        assert2(typeof bit === "number" && bit >= 0);
        var off = bit / 26 | 0;
        var wbit = bit % 26;
        this._expand(off + 1);
        if (val) {
          this.words[off] = this.words[off] | 1 << wbit;
        } else {
          this.words[off] = this.words[off] & ~(1 << wbit);
        }
        return this.strip();
      };
      BN2.prototype.iadd = function iadd(num) {
        var r;
        if (this.negative !== 0 && num.negative === 0) {
          this.negative = 0;
          r = this.isub(num);
          this.negative ^= 1;
          return this._normSign();
        } else if (this.negative === 0 && num.negative !== 0) {
          num.negative = 0;
          r = this.isub(num);
          num.negative = 1;
          return r._normSign();
        }
        var a, b;
        if (this.length > num.length) {
          a = this;
          b = num;
        } else {
          a = num;
          b = this;
        }
        var carry = 0;
        for (var i = 0; i < b.length; i++) {
          r = (a.words[i] | 0) + (b.words[i] | 0) + carry;
          this.words[i] = r & 67108863;
          carry = r >>> 26;
        }
        for (; carry !== 0 && i < a.length; i++) {
          r = (a.words[i] | 0) + carry;
          this.words[i] = r & 67108863;
          carry = r >>> 26;
        }
        this.length = a.length;
        if (carry !== 0) {
          this.words[this.length] = carry;
          this.length++;
        } else if (a !== this) {
          for (; i < a.length; i++) {
            this.words[i] = a.words[i];
          }
        }
        return this;
      };
      BN2.prototype.add = function add2(num) {
        var res;
        if (num.negative !== 0 && this.negative === 0) {
          num.negative = 0;
          res = this.sub(num);
          num.negative ^= 1;
          return res;
        } else if (num.negative === 0 && this.negative !== 0) {
          this.negative = 0;
          res = num.sub(this);
          this.negative = 1;
          return res;
        }
        if (this.length > num.length) return this.clone().iadd(num);
        return num.clone().iadd(this);
      };
      BN2.prototype.isub = function isub(num) {
        if (num.negative !== 0) {
          num.negative = 0;
          var r = this.iadd(num);
          num.negative = 1;
          return r._normSign();
        } else if (this.negative !== 0) {
          this.negative = 0;
          this.iadd(num);
          this.negative = 1;
          return this._normSign();
        }
        var cmp = this.cmp(num);
        if (cmp === 0) {
          this.negative = 0;
          this.length = 1;
          this.words[0] = 0;
          return this;
        }
        var a, b;
        if (cmp > 0) {
          a = this;
          b = num;
        } else {
          a = num;
          b = this;
        }
        var carry = 0;
        for (var i = 0; i < b.length; i++) {
          r = (a.words[i] | 0) - (b.words[i] | 0) + carry;
          carry = r >> 26;
          this.words[i] = r & 67108863;
        }
        for (; carry !== 0 && i < a.length; i++) {
          r = (a.words[i] | 0) + carry;
          carry = r >> 26;
          this.words[i] = r & 67108863;
        }
        if (carry === 0 && i < a.length && a !== this) {
          for (; i < a.length; i++) {
            this.words[i] = a.words[i];
          }
        }
        this.length = Math.max(this.length, i);
        if (a !== this) {
          this.negative = 1;
        }
        return this.strip();
      };
      BN2.prototype.sub = function sub(num) {
        return this.clone().isub(num);
      };
      function smallMulTo(self2, num, out) {
        out.negative = num.negative ^ self2.negative;
        var len = self2.length + num.length | 0;
        out.length = len;
        len = len - 1 | 0;
        var a = self2.words[0] | 0;
        var b = num.words[0] | 0;
        var r = a * b;
        var lo = r & 67108863;
        var carry = r / 67108864 | 0;
        out.words[0] = lo;
        for (var k = 1; k < len; k++) {
          var ncarry = carry >>> 26;
          var rword = carry & 67108863;
          var maxJ = Math.min(k, num.length - 1);
          for (var j = Math.max(0, k - self2.length + 1); j <= maxJ; j++) {
            var i = k - j | 0;
            a = self2.words[i] | 0;
            b = num.words[j] | 0;
            r = a * b + rword;
            ncarry += r / 67108864 | 0;
            rword = r & 67108863;
          }
          out.words[k] = rword | 0;
          carry = ncarry | 0;
        }
        if (carry !== 0) {
          out.words[k] = carry | 0;
        } else {
          out.length--;
        }
        return out.strip();
      }
      var comb10MulTo = function comb10MulTo2(self2, num, out) {
        var a = self2.words;
        var b = num.words;
        var o = out.words;
        var c = 0;
        var lo;
        var mid;
        var hi;
        var a0 = a[0] | 0;
        var al0 = a0 & 8191;
        var ah0 = a0 >>> 13;
        var a1 = a[1] | 0;
        var al1 = a1 & 8191;
        var ah1 = a1 >>> 13;
        var a2 = a[2] | 0;
        var al2 = a2 & 8191;
        var ah2 = a2 >>> 13;
        var a3 = a[3] | 0;
        var al3 = a3 & 8191;
        var ah3 = a3 >>> 13;
        var a4 = a[4] | 0;
        var al4 = a4 & 8191;
        var ah4 = a4 >>> 13;
        var a5 = a[5] | 0;
        var al5 = a5 & 8191;
        var ah5 = a5 >>> 13;
        var a6 = a[6] | 0;
        var al6 = a6 & 8191;
        var ah6 = a6 >>> 13;
        var a7 = a[7] | 0;
        var al7 = a7 & 8191;
        var ah7 = a7 >>> 13;
        var a8 = a[8] | 0;
        var al8 = a8 & 8191;
        var ah8 = a8 >>> 13;
        var a9 = a[9] | 0;
        var al9 = a9 & 8191;
        var ah9 = a9 >>> 13;
        var b0 = b[0] | 0;
        var bl0 = b0 & 8191;
        var bh0 = b0 >>> 13;
        var b1 = b[1] | 0;
        var bl1 = b1 & 8191;
        var bh1 = b1 >>> 13;
        var b2 = b[2] | 0;
        var bl2 = b2 & 8191;
        var bh2 = b2 >>> 13;
        var b3 = b[3] | 0;
        var bl3 = b3 & 8191;
        var bh3 = b3 >>> 13;
        var b4 = b[4] | 0;
        var bl4 = b4 & 8191;
        var bh4 = b4 >>> 13;
        var b5 = b[5] | 0;
        var bl5 = b5 & 8191;
        var bh5 = b5 >>> 13;
        var b6 = b[6] | 0;
        var bl6 = b6 & 8191;
        var bh6 = b6 >>> 13;
        var b7 = b[7] | 0;
        var bl7 = b7 & 8191;
        var bh7 = b7 >>> 13;
        var b8 = b[8] | 0;
        var bl8 = b8 & 8191;
        var bh8 = b8 >>> 13;
        var b9 = b[9] | 0;
        var bl9 = b9 & 8191;
        var bh9 = b9 >>> 13;
        out.negative = self2.negative ^ num.negative;
        out.length = 19;
        lo = Math.imul(al0, bl0);
        mid = Math.imul(al0, bh0);
        mid = mid + Math.imul(ah0, bl0) | 0;
        hi = Math.imul(ah0, bh0);
        var w0 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w0 >>> 26) | 0;
        w0 &= 67108863;
        lo = Math.imul(al1, bl0);
        mid = Math.imul(al1, bh0);
        mid = mid + Math.imul(ah1, bl0) | 0;
        hi = Math.imul(ah1, bh0);
        lo = lo + Math.imul(al0, bl1) | 0;
        mid = mid + Math.imul(al0, bh1) | 0;
        mid = mid + Math.imul(ah0, bl1) | 0;
        hi = hi + Math.imul(ah0, bh1) | 0;
        var w1 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w1 >>> 26) | 0;
        w1 &= 67108863;
        lo = Math.imul(al2, bl0);
        mid = Math.imul(al2, bh0);
        mid = mid + Math.imul(ah2, bl0) | 0;
        hi = Math.imul(ah2, bh0);
        lo = lo + Math.imul(al1, bl1) | 0;
        mid = mid + Math.imul(al1, bh1) | 0;
        mid = mid + Math.imul(ah1, bl1) | 0;
        hi = hi + Math.imul(ah1, bh1) | 0;
        lo = lo + Math.imul(al0, bl2) | 0;
        mid = mid + Math.imul(al0, bh2) | 0;
        mid = mid + Math.imul(ah0, bl2) | 0;
        hi = hi + Math.imul(ah0, bh2) | 0;
        var w2 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w2 >>> 26) | 0;
        w2 &= 67108863;
        lo = Math.imul(al3, bl0);
        mid = Math.imul(al3, bh0);
        mid = mid + Math.imul(ah3, bl0) | 0;
        hi = Math.imul(ah3, bh0);
        lo = lo + Math.imul(al2, bl1) | 0;
        mid = mid + Math.imul(al2, bh1) | 0;
        mid = mid + Math.imul(ah2, bl1) | 0;
        hi = hi + Math.imul(ah2, bh1) | 0;
        lo = lo + Math.imul(al1, bl2) | 0;
        mid = mid + Math.imul(al1, bh2) | 0;
        mid = mid + Math.imul(ah1, bl2) | 0;
        hi = hi + Math.imul(ah1, bh2) | 0;
        lo = lo + Math.imul(al0, bl3) | 0;
        mid = mid + Math.imul(al0, bh3) | 0;
        mid = mid + Math.imul(ah0, bl3) | 0;
        hi = hi + Math.imul(ah0, bh3) | 0;
        var w3 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w3 >>> 26) | 0;
        w3 &= 67108863;
        lo = Math.imul(al4, bl0);
        mid = Math.imul(al4, bh0);
        mid = mid + Math.imul(ah4, bl0) | 0;
        hi = Math.imul(ah4, bh0);
        lo = lo + Math.imul(al3, bl1) | 0;
        mid = mid + Math.imul(al3, bh1) | 0;
        mid = mid + Math.imul(ah3, bl1) | 0;
        hi = hi + Math.imul(ah3, bh1) | 0;
        lo = lo + Math.imul(al2, bl2) | 0;
        mid = mid + Math.imul(al2, bh2) | 0;
        mid = mid + Math.imul(ah2, bl2) | 0;
        hi = hi + Math.imul(ah2, bh2) | 0;
        lo = lo + Math.imul(al1, bl3) | 0;
        mid = mid + Math.imul(al1, bh3) | 0;
        mid = mid + Math.imul(ah1, bl3) | 0;
        hi = hi + Math.imul(ah1, bh3) | 0;
        lo = lo + Math.imul(al0, bl4) | 0;
        mid = mid + Math.imul(al0, bh4) | 0;
        mid = mid + Math.imul(ah0, bl4) | 0;
        hi = hi + Math.imul(ah0, bh4) | 0;
        var w4 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w4 >>> 26) | 0;
        w4 &= 67108863;
        lo = Math.imul(al5, bl0);
        mid = Math.imul(al5, bh0);
        mid = mid + Math.imul(ah5, bl0) | 0;
        hi = Math.imul(ah5, bh0);
        lo = lo + Math.imul(al4, bl1) | 0;
        mid = mid + Math.imul(al4, bh1) | 0;
        mid = mid + Math.imul(ah4, bl1) | 0;
        hi = hi + Math.imul(ah4, bh1) | 0;
        lo = lo + Math.imul(al3, bl2) | 0;
        mid = mid + Math.imul(al3, bh2) | 0;
        mid = mid + Math.imul(ah3, bl2) | 0;
        hi = hi + Math.imul(ah3, bh2) | 0;
        lo = lo + Math.imul(al2, bl3) | 0;
        mid = mid + Math.imul(al2, bh3) | 0;
        mid = mid + Math.imul(ah2, bl3) | 0;
        hi = hi + Math.imul(ah2, bh3) | 0;
        lo = lo + Math.imul(al1, bl4) | 0;
        mid = mid + Math.imul(al1, bh4) | 0;
        mid = mid + Math.imul(ah1, bl4) | 0;
        hi = hi + Math.imul(ah1, bh4) | 0;
        lo = lo + Math.imul(al0, bl5) | 0;
        mid = mid + Math.imul(al0, bh5) | 0;
        mid = mid + Math.imul(ah0, bl5) | 0;
        hi = hi + Math.imul(ah0, bh5) | 0;
        var w5 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w5 >>> 26) | 0;
        w5 &= 67108863;
        lo = Math.imul(al6, bl0);
        mid = Math.imul(al6, bh0);
        mid = mid + Math.imul(ah6, bl0) | 0;
        hi = Math.imul(ah6, bh0);
        lo = lo + Math.imul(al5, bl1) | 0;
        mid = mid + Math.imul(al5, bh1) | 0;
        mid = mid + Math.imul(ah5, bl1) | 0;
        hi = hi + Math.imul(ah5, bh1) | 0;
        lo = lo + Math.imul(al4, bl2) | 0;
        mid = mid + Math.imul(al4, bh2) | 0;
        mid = mid + Math.imul(ah4, bl2) | 0;
        hi = hi + Math.imul(ah4, bh2) | 0;
        lo = lo + Math.imul(al3, bl3) | 0;
        mid = mid + Math.imul(al3, bh3) | 0;
        mid = mid + Math.imul(ah3, bl3) | 0;
        hi = hi + Math.imul(ah3, bh3) | 0;
        lo = lo + Math.imul(al2, bl4) | 0;
        mid = mid + Math.imul(al2, bh4) | 0;
        mid = mid + Math.imul(ah2, bl4) | 0;
        hi = hi + Math.imul(ah2, bh4) | 0;
        lo = lo + Math.imul(al1, bl5) | 0;
        mid = mid + Math.imul(al1, bh5) | 0;
        mid = mid + Math.imul(ah1, bl5) | 0;
        hi = hi + Math.imul(ah1, bh5) | 0;
        lo = lo + Math.imul(al0, bl6) | 0;
        mid = mid + Math.imul(al0, bh6) | 0;
        mid = mid + Math.imul(ah0, bl6) | 0;
        hi = hi + Math.imul(ah0, bh6) | 0;
        var w6 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w6 >>> 26) | 0;
        w6 &= 67108863;
        lo = Math.imul(al7, bl0);
        mid = Math.imul(al7, bh0);
        mid = mid + Math.imul(ah7, bl0) | 0;
        hi = Math.imul(ah7, bh0);
        lo = lo + Math.imul(al6, bl1) | 0;
        mid = mid + Math.imul(al6, bh1) | 0;
        mid = mid + Math.imul(ah6, bl1) | 0;
        hi = hi + Math.imul(ah6, bh1) | 0;
        lo = lo + Math.imul(al5, bl2) | 0;
        mid = mid + Math.imul(al5, bh2) | 0;
        mid = mid + Math.imul(ah5, bl2) | 0;
        hi = hi + Math.imul(ah5, bh2) | 0;
        lo = lo + Math.imul(al4, bl3) | 0;
        mid = mid + Math.imul(al4, bh3) | 0;
        mid = mid + Math.imul(ah4, bl3) | 0;
        hi = hi + Math.imul(ah4, bh3) | 0;
        lo = lo + Math.imul(al3, bl4) | 0;
        mid = mid + Math.imul(al3, bh4) | 0;
        mid = mid + Math.imul(ah3, bl4) | 0;
        hi = hi + Math.imul(ah3, bh4) | 0;
        lo = lo + Math.imul(al2, bl5) | 0;
        mid = mid + Math.imul(al2, bh5) | 0;
        mid = mid + Math.imul(ah2, bl5) | 0;
        hi = hi + Math.imul(ah2, bh5) | 0;
        lo = lo + Math.imul(al1, bl6) | 0;
        mid = mid + Math.imul(al1, bh6) | 0;
        mid = mid + Math.imul(ah1, bl6) | 0;
        hi = hi + Math.imul(ah1, bh6) | 0;
        lo = lo + Math.imul(al0, bl7) | 0;
        mid = mid + Math.imul(al0, bh7) | 0;
        mid = mid + Math.imul(ah0, bl7) | 0;
        hi = hi + Math.imul(ah0, bh7) | 0;
        var w7 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w7 >>> 26) | 0;
        w7 &= 67108863;
        lo = Math.imul(al8, bl0);
        mid = Math.imul(al8, bh0);
        mid = mid + Math.imul(ah8, bl0) | 0;
        hi = Math.imul(ah8, bh0);
        lo = lo + Math.imul(al7, bl1) | 0;
        mid = mid + Math.imul(al7, bh1) | 0;
        mid = mid + Math.imul(ah7, bl1) | 0;
        hi = hi + Math.imul(ah7, bh1) | 0;
        lo = lo + Math.imul(al6, bl2) | 0;
        mid = mid + Math.imul(al6, bh2) | 0;
        mid = mid + Math.imul(ah6, bl2) | 0;
        hi = hi + Math.imul(ah6, bh2) | 0;
        lo = lo + Math.imul(al5, bl3) | 0;
        mid = mid + Math.imul(al5, bh3) | 0;
        mid = mid + Math.imul(ah5, bl3) | 0;
        hi = hi + Math.imul(ah5, bh3) | 0;
        lo = lo + Math.imul(al4, bl4) | 0;
        mid = mid + Math.imul(al4, bh4) | 0;
        mid = mid + Math.imul(ah4, bl4) | 0;
        hi = hi + Math.imul(ah4, bh4) | 0;
        lo = lo + Math.imul(al3, bl5) | 0;
        mid = mid + Math.imul(al3, bh5) | 0;
        mid = mid + Math.imul(ah3, bl5) | 0;
        hi = hi + Math.imul(ah3, bh5) | 0;
        lo = lo + Math.imul(al2, bl6) | 0;
        mid = mid + Math.imul(al2, bh6) | 0;
        mid = mid + Math.imul(ah2, bl6) | 0;
        hi = hi + Math.imul(ah2, bh6) | 0;
        lo = lo + Math.imul(al1, bl7) | 0;
        mid = mid + Math.imul(al1, bh7) | 0;
        mid = mid + Math.imul(ah1, bl7) | 0;
        hi = hi + Math.imul(ah1, bh7) | 0;
        lo = lo + Math.imul(al0, bl8) | 0;
        mid = mid + Math.imul(al0, bh8) | 0;
        mid = mid + Math.imul(ah0, bl8) | 0;
        hi = hi + Math.imul(ah0, bh8) | 0;
        var w8 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w8 >>> 26) | 0;
        w8 &= 67108863;
        lo = Math.imul(al9, bl0);
        mid = Math.imul(al9, bh0);
        mid = mid + Math.imul(ah9, bl0) | 0;
        hi = Math.imul(ah9, bh0);
        lo = lo + Math.imul(al8, bl1) | 0;
        mid = mid + Math.imul(al8, bh1) | 0;
        mid = mid + Math.imul(ah8, bl1) | 0;
        hi = hi + Math.imul(ah8, bh1) | 0;
        lo = lo + Math.imul(al7, bl2) | 0;
        mid = mid + Math.imul(al7, bh2) | 0;
        mid = mid + Math.imul(ah7, bl2) | 0;
        hi = hi + Math.imul(ah7, bh2) | 0;
        lo = lo + Math.imul(al6, bl3) | 0;
        mid = mid + Math.imul(al6, bh3) | 0;
        mid = mid + Math.imul(ah6, bl3) | 0;
        hi = hi + Math.imul(ah6, bh3) | 0;
        lo = lo + Math.imul(al5, bl4) | 0;
        mid = mid + Math.imul(al5, bh4) | 0;
        mid = mid + Math.imul(ah5, bl4) | 0;
        hi = hi + Math.imul(ah5, bh4) | 0;
        lo = lo + Math.imul(al4, bl5) | 0;
        mid = mid + Math.imul(al4, bh5) | 0;
        mid = mid + Math.imul(ah4, bl5) | 0;
        hi = hi + Math.imul(ah4, bh5) | 0;
        lo = lo + Math.imul(al3, bl6) | 0;
        mid = mid + Math.imul(al3, bh6) | 0;
        mid = mid + Math.imul(ah3, bl6) | 0;
        hi = hi + Math.imul(ah3, bh6) | 0;
        lo = lo + Math.imul(al2, bl7) | 0;
        mid = mid + Math.imul(al2, bh7) | 0;
        mid = mid + Math.imul(ah2, bl7) | 0;
        hi = hi + Math.imul(ah2, bh7) | 0;
        lo = lo + Math.imul(al1, bl8) | 0;
        mid = mid + Math.imul(al1, bh8) | 0;
        mid = mid + Math.imul(ah1, bl8) | 0;
        hi = hi + Math.imul(ah1, bh8) | 0;
        lo = lo + Math.imul(al0, bl9) | 0;
        mid = mid + Math.imul(al0, bh9) | 0;
        mid = mid + Math.imul(ah0, bl9) | 0;
        hi = hi + Math.imul(ah0, bh9) | 0;
        var w9 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w9 >>> 26) | 0;
        w9 &= 67108863;
        lo = Math.imul(al9, bl1);
        mid = Math.imul(al9, bh1);
        mid = mid + Math.imul(ah9, bl1) | 0;
        hi = Math.imul(ah9, bh1);
        lo = lo + Math.imul(al8, bl2) | 0;
        mid = mid + Math.imul(al8, bh2) | 0;
        mid = mid + Math.imul(ah8, bl2) | 0;
        hi = hi + Math.imul(ah8, bh2) | 0;
        lo = lo + Math.imul(al7, bl3) | 0;
        mid = mid + Math.imul(al7, bh3) | 0;
        mid = mid + Math.imul(ah7, bl3) | 0;
        hi = hi + Math.imul(ah7, bh3) | 0;
        lo = lo + Math.imul(al6, bl4) | 0;
        mid = mid + Math.imul(al6, bh4) | 0;
        mid = mid + Math.imul(ah6, bl4) | 0;
        hi = hi + Math.imul(ah6, bh4) | 0;
        lo = lo + Math.imul(al5, bl5) | 0;
        mid = mid + Math.imul(al5, bh5) | 0;
        mid = mid + Math.imul(ah5, bl5) | 0;
        hi = hi + Math.imul(ah5, bh5) | 0;
        lo = lo + Math.imul(al4, bl6) | 0;
        mid = mid + Math.imul(al4, bh6) | 0;
        mid = mid + Math.imul(ah4, bl6) | 0;
        hi = hi + Math.imul(ah4, bh6) | 0;
        lo = lo + Math.imul(al3, bl7) | 0;
        mid = mid + Math.imul(al3, bh7) | 0;
        mid = mid + Math.imul(ah3, bl7) | 0;
        hi = hi + Math.imul(ah3, bh7) | 0;
        lo = lo + Math.imul(al2, bl8) | 0;
        mid = mid + Math.imul(al2, bh8) | 0;
        mid = mid + Math.imul(ah2, bl8) | 0;
        hi = hi + Math.imul(ah2, bh8) | 0;
        lo = lo + Math.imul(al1, bl9) | 0;
        mid = mid + Math.imul(al1, bh9) | 0;
        mid = mid + Math.imul(ah1, bl9) | 0;
        hi = hi + Math.imul(ah1, bh9) | 0;
        var w10 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w10 >>> 26) | 0;
        w10 &= 67108863;
        lo = Math.imul(al9, bl2);
        mid = Math.imul(al9, bh2);
        mid = mid + Math.imul(ah9, bl2) | 0;
        hi = Math.imul(ah9, bh2);
        lo = lo + Math.imul(al8, bl3) | 0;
        mid = mid + Math.imul(al8, bh3) | 0;
        mid = mid + Math.imul(ah8, bl3) | 0;
        hi = hi + Math.imul(ah8, bh3) | 0;
        lo = lo + Math.imul(al7, bl4) | 0;
        mid = mid + Math.imul(al7, bh4) | 0;
        mid = mid + Math.imul(ah7, bl4) | 0;
        hi = hi + Math.imul(ah7, bh4) | 0;
        lo = lo + Math.imul(al6, bl5) | 0;
        mid = mid + Math.imul(al6, bh5) | 0;
        mid = mid + Math.imul(ah6, bl5) | 0;
        hi = hi + Math.imul(ah6, bh5) | 0;
        lo = lo + Math.imul(al5, bl6) | 0;
        mid = mid + Math.imul(al5, bh6) | 0;
        mid = mid + Math.imul(ah5, bl6) | 0;
        hi = hi + Math.imul(ah5, bh6) | 0;
        lo = lo + Math.imul(al4, bl7) | 0;
        mid = mid + Math.imul(al4, bh7) | 0;
        mid = mid + Math.imul(ah4, bl7) | 0;
        hi = hi + Math.imul(ah4, bh7) | 0;
        lo = lo + Math.imul(al3, bl8) | 0;
        mid = mid + Math.imul(al3, bh8) | 0;
        mid = mid + Math.imul(ah3, bl8) | 0;
        hi = hi + Math.imul(ah3, bh8) | 0;
        lo = lo + Math.imul(al2, bl9) | 0;
        mid = mid + Math.imul(al2, bh9) | 0;
        mid = mid + Math.imul(ah2, bl9) | 0;
        hi = hi + Math.imul(ah2, bh9) | 0;
        var w11 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w11 >>> 26) | 0;
        w11 &= 67108863;
        lo = Math.imul(al9, bl3);
        mid = Math.imul(al9, bh3);
        mid = mid + Math.imul(ah9, bl3) | 0;
        hi = Math.imul(ah9, bh3);
        lo = lo + Math.imul(al8, bl4) | 0;
        mid = mid + Math.imul(al8, bh4) | 0;
        mid = mid + Math.imul(ah8, bl4) | 0;
        hi = hi + Math.imul(ah8, bh4) | 0;
        lo = lo + Math.imul(al7, bl5) | 0;
        mid = mid + Math.imul(al7, bh5) | 0;
        mid = mid + Math.imul(ah7, bl5) | 0;
        hi = hi + Math.imul(ah7, bh5) | 0;
        lo = lo + Math.imul(al6, bl6) | 0;
        mid = mid + Math.imul(al6, bh6) | 0;
        mid = mid + Math.imul(ah6, bl6) | 0;
        hi = hi + Math.imul(ah6, bh6) | 0;
        lo = lo + Math.imul(al5, bl7) | 0;
        mid = mid + Math.imul(al5, bh7) | 0;
        mid = mid + Math.imul(ah5, bl7) | 0;
        hi = hi + Math.imul(ah5, bh7) | 0;
        lo = lo + Math.imul(al4, bl8) | 0;
        mid = mid + Math.imul(al4, bh8) | 0;
        mid = mid + Math.imul(ah4, bl8) | 0;
        hi = hi + Math.imul(ah4, bh8) | 0;
        lo = lo + Math.imul(al3, bl9) | 0;
        mid = mid + Math.imul(al3, bh9) | 0;
        mid = mid + Math.imul(ah3, bl9) | 0;
        hi = hi + Math.imul(ah3, bh9) | 0;
        var w12 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w12 >>> 26) | 0;
        w12 &= 67108863;
        lo = Math.imul(al9, bl4);
        mid = Math.imul(al9, bh4);
        mid = mid + Math.imul(ah9, bl4) | 0;
        hi = Math.imul(ah9, bh4);
        lo = lo + Math.imul(al8, bl5) | 0;
        mid = mid + Math.imul(al8, bh5) | 0;
        mid = mid + Math.imul(ah8, bl5) | 0;
        hi = hi + Math.imul(ah8, bh5) | 0;
        lo = lo + Math.imul(al7, bl6) | 0;
        mid = mid + Math.imul(al7, bh6) | 0;
        mid = mid + Math.imul(ah7, bl6) | 0;
        hi = hi + Math.imul(ah7, bh6) | 0;
        lo = lo + Math.imul(al6, bl7) | 0;
        mid = mid + Math.imul(al6, bh7) | 0;
        mid = mid + Math.imul(ah6, bl7) | 0;
        hi = hi + Math.imul(ah6, bh7) | 0;
        lo = lo + Math.imul(al5, bl8) | 0;
        mid = mid + Math.imul(al5, bh8) | 0;
        mid = mid + Math.imul(ah5, bl8) | 0;
        hi = hi + Math.imul(ah5, bh8) | 0;
        lo = lo + Math.imul(al4, bl9) | 0;
        mid = mid + Math.imul(al4, bh9) | 0;
        mid = mid + Math.imul(ah4, bl9) | 0;
        hi = hi + Math.imul(ah4, bh9) | 0;
        var w13 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w13 >>> 26) | 0;
        w13 &= 67108863;
        lo = Math.imul(al9, bl5);
        mid = Math.imul(al9, bh5);
        mid = mid + Math.imul(ah9, bl5) | 0;
        hi = Math.imul(ah9, bh5);
        lo = lo + Math.imul(al8, bl6) | 0;
        mid = mid + Math.imul(al8, bh6) | 0;
        mid = mid + Math.imul(ah8, bl6) | 0;
        hi = hi + Math.imul(ah8, bh6) | 0;
        lo = lo + Math.imul(al7, bl7) | 0;
        mid = mid + Math.imul(al7, bh7) | 0;
        mid = mid + Math.imul(ah7, bl7) | 0;
        hi = hi + Math.imul(ah7, bh7) | 0;
        lo = lo + Math.imul(al6, bl8) | 0;
        mid = mid + Math.imul(al6, bh8) | 0;
        mid = mid + Math.imul(ah6, bl8) | 0;
        hi = hi + Math.imul(ah6, bh8) | 0;
        lo = lo + Math.imul(al5, bl9) | 0;
        mid = mid + Math.imul(al5, bh9) | 0;
        mid = mid + Math.imul(ah5, bl9) | 0;
        hi = hi + Math.imul(ah5, bh9) | 0;
        var w14 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w14 >>> 26) | 0;
        w14 &= 67108863;
        lo = Math.imul(al9, bl6);
        mid = Math.imul(al9, bh6);
        mid = mid + Math.imul(ah9, bl6) | 0;
        hi = Math.imul(ah9, bh6);
        lo = lo + Math.imul(al8, bl7) | 0;
        mid = mid + Math.imul(al8, bh7) | 0;
        mid = mid + Math.imul(ah8, bl7) | 0;
        hi = hi + Math.imul(ah8, bh7) | 0;
        lo = lo + Math.imul(al7, bl8) | 0;
        mid = mid + Math.imul(al7, bh8) | 0;
        mid = mid + Math.imul(ah7, bl8) | 0;
        hi = hi + Math.imul(ah7, bh8) | 0;
        lo = lo + Math.imul(al6, bl9) | 0;
        mid = mid + Math.imul(al6, bh9) | 0;
        mid = mid + Math.imul(ah6, bl9) | 0;
        hi = hi + Math.imul(ah6, bh9) | 0;
        var w15 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w15 >>> 26) | 0;
        w15 &= 67108863;
        lo = Math.imul(al9, bl7);
        mid = Math.imul(al9, bh7);
        mid = mid + Math.imul(ah9, bl7) | 0;
        hi = Math.imul(ah9, bh7);
        lo = lo + Math.imul(al8, bl8) | 0;
        mid = mid + Math.imul(al8, bh8) | 0;
        mid = mid + Math.imul(ah8, bl8) | 0;
        hi = hi + Math.imul(ah8, bh8) | 0;
        lo = lo + Math.imul(al7, bl9) | 0;
        mid = mid + Math.imul(al7, bh9) | 0;
        mid = mid + Math.imul(ah7, bl9) | 0;
        hi = hi + Math.imul(ah7, bh9) | 0;
        var w16 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w16 >>> 26) | 0;
        w16 &= 67108863;
        lo = Math.imul(al9, bl8);
        mid = Math.imul(al9, bh8);
        mid = mid + Math.imul(ah9, bl8) | 0;
        hi = Math.imul(ah9, bh8);
        lo = lo + Math.imul(al8, bl9) | 0;
        mid = mid + Math.imul(al8, bh9) | 0;
        mid = mid + Math.imul(ah8, bl9) | 0;
        hi = hi + Math.imul(ah8, bh9) | 0;
        var w17 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w17 >>> 26) | 0;
        w17 &= 67108863;
        lo = Math.imul(al9, bl9);
        mid = Math.imul(al9, bh9);
        mid = mid + Math.imul(ah9, bl9) | 0;
        hi = Math.imul(ah9, bh9);
        var w18 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w18 >>> 26) | 0;
        w18 &= 67108863;
        o[0] = w0;
        o[1] = w1;
        o[2] = w2;
        o[3] = w3;
        o[4] = w4;
        o[5] = w5;
        o[6] = w6;
        o[7] = w7;
        o[8] = w8;
        o[9] = w9;
        o[10] = w10;
        o[11] = w11;
        o[12] = w12;
        o[13] = w13;
        o[14] = w14;
        o[15] = w15;
        o[16] = w16;
        o[17] = w17;
        o[18] = w18;
        if (c !== 0) {
          o[19] = c;
          out.length++;
        }
        return out;
      };
      if (!Math.imul) {
        comb10MulTo = smallMulTo;
      }
      function bigMulTo(self2, num, out) {
        out.negative = num.negative ^ self2.negative;
        out.length = self2.length + num.length;
        var carry = 0;
        var hncarry = 0;
        for (var k = 0; k < out.length - 1; k++) {
          var ncarry = hncarry;
          hncarry = 0;
          var rword = carry & 67108863;
          var maxJ = Math.min(k, num.length - 1);
          for (var j = Math.max(0, k - self2.length + 1); j <= maxJ; j++) {
            var i = k - j;
            var a = self2.words[i] | 0;
            var b = num.words[j] | 0;
            var r = a * b;
            var lo = r & 67108863;
            ncarry = ncarry + (r / 67108864 | 0) | 0;
            lo = lo + rword | 0;
            rword = lo & 67108863;
            ncarry = ncarry + (lo >>> 26) | 0;
            hncarry += ncarry >>> 26;
            ncarry &= 67108863;
          }
          out.words[k] = rword;
          carry = ncarry;
          ncarry = hncarry;
        }
        if (carry !== 0) {
          out.words[k] = carry;
        } else {
          out.length--;
        }
        return out.strip();
      }
      function jumboMulTo(self2, num, out) {
        var fftm = new FFTM();
        return fftm.mulp(self2, num, out);
      }
      BN2.prototype.mulTo = function mulTo(num, out) {
        var res;
        var len = this.length + num.length;
        if (this.length === 10 && num.length === 10) {
          res = comb10MulTo(this, num, out);
        } else if (len < 63) {
          res = smallMulTo(this, num, out);
        } else if (len < 1024) {
          res = bigMulTo(this, num, out);
        } else {
          res = jumboMulTo(this, num, out);
        }
        return res;
      };
      function FFTM(x, y) {
        this.x = x;
        this.y = y;
      }
      FFTM.prototype.makeRBT = function makeRBT(N) {
        var t = new Array(N);
        var l = BN2.prototype._countBits(N) - 1;
        for (var i = 0; i < N; i++) {
          t[i] = this.revBin(i, l, N);
        }
        return t;
      };
      FFTM.prototype.revBin = function revBin(x, l, N) {
        if (x === 0 || x === N - 1) return x;
        var rb = 0;
        for (var i = 0; i < l; i++) {
          rb |= (x & 1) << l - i - 1;
          x >>= 1;
        }
        return rb;
      };
      FFTM.prototype.permute = function permute(rbt, rws, iws, rtws, itws, N) {
        for (var i = 0; i < N; i++) {
          rtws[i] = rws[rbt[i]];
          itws[i] = iws[rbt[i]];
        }
      };
      FFTM.prototype.transform = function transform(rws, iws, rtws, itws, N, rbt) {
        this.permute(rbt, rws, iws, rtws, itws, N);
        for (var s = 1; s < N; s <<= 1) {
          var l = s << 1;
          var rtwdf = Math.cos(2 * Math.PI / l);
          var itwdf = Math.sin(2 * Math.PI / l);
          for (var p = 0; p < N; p += l) {
            var rtwdf_ = rtwdf;
            var itwdf_ = itwdf;
            for (var j = 0; j < s; j++) {
              var re = rtws[p + j];
              var ie = itws[p + j];
              var ro = rtws[p + j + s];
              var io = itws[p + j + s];
              var rx = rtwdf_ * ro - itwdf_ * io;
              io = rtwdf_ * io + itwdf_ * ro;
              ro = rx;
              rtws[p + j] = re + ro;
              itws[p + j] = ie + io;
              rtws[p + j + s] = re - ro;
              itws[p + j + s] = ie - io;
              if (j !== l) {
                rx = rtwdf * rtwdf_ - itwdf * itwdf_;
                itwdf_ = rtwdf * itwdf_ + itwdf * rtwdf_;
                rtwdf_ = rx;
              }
            }
          }
        }
      };
      FFTM.prototype.guessLen13b = function guessLen13b(n, m) {
        var N = Math.max(m, n) | 1;
        var odd = N & 1;
        var i = 0;
        for (N = N / 2 | 0; N; N = N >>> 1) {
          i++;
        }
        return 1 << i + 1 + odd;
      };
      FFTM.prototype.conjugate = function conjugate(rws, iws, N) {
        if (N <= 1) return;
        for (var i = 0; i < N / 2; i++) {
          var t = rws[i];
          rws[i] = rws[N - i - 1];
          rws[N - i - 1] = t;
          t = iws[i];
          iws[i] = -iws[N - i - 1];
          iws[N - i - 1] = -t;
        }
      };
      FFTM.prototype.normalize13b = function normalize13b(ws, N) {
        var carry = 0;
        for (var i = 0; i < N / 2; i++) {
          var w = Math.round(ws[2 * i + 1] / N) * 8192 + Math.round(ws[2 * i] / N) + carry;
          ws[i] = w & 67108863;
          if (w < 67108864) {
            carry = 0;
          } else {
            carry = w / 67108864 | 0;
          }
        }
        return ws;
      };
      FFTM.prototype.convert13b = function convert13b(ws, len, rws, N) {
        var carry = 0;
        for (var i = 0; i < len; i++) {
          carry = carry + (ws[i] | 0);
          rws[2 * i] = carry & 8191;
          carry = carry >>> 13;
          rws[2 * i + 1] = carry & 8191;
          carry = carry >>> 13;
        }
        for (i = 2 * len; i < N; ++i) {
          rws[i] = 0;
        }
        assert2(carry === 0);
        assert2((carry & ~8191) === 0);
      };
      FFTM.prototype.stub = function stub(N) {
        var ph = new Array(N);
        for (var i = 0; i < N; i++) {
          ph[i] = 0;
        }
        return ph;
      };
      FFTM.prototype.mulp = function mulp(x, y, out) {
        var N = 2 * this.guessLen13b(x.length, y.length);
        var rbt = this.makeRBT(N);
        var _ = this.stub(N);
        var rws = new Array(N);
        var rwst = new Array(N);
        var iwst = new Array(N);
        var nrws = new Array(N);
        var nrwst = new Array(N);
        var niwst = new Array(N);
        var rmws = out.words;
        rmws.length = N;
        this.convert13b(x.words, x.length, rws, N);
        this.convert13b(y.words, y.length, nrws, N);
        this.transform(rws, _, rwst, iwst, N, rbt);
        this.transform(nrws, _, nrwst, niwst, N, rbt);
        for (var i = 0; i < N; i++) {
          var rx = rwst[i] * nrwst[i] - iwst[i] * niwst[i];
          iwst[i] = rwst[i] * niwst[i] + iwst[i] * nrwst[i];
          rwst[i] = rx;
        }
        this.conjugate(rwst, iwst, N);
        this.transform(rwst, iwst, rmws, _, N, rbt);
        this.conjugate(rmws, _, N);
        this.normalize13b(rmws, N);
        out.negative = x.negative ^ y.negative;
        out.length = x.length + y.length;
        return out.strip();
      };
      BN2.prototype.mul = function mul(num) {
        var out = new BN2(null);
        out.words = new Array(this.length + num.length);
        return this.mulTo(num, out);
      };
      BN2.prototype.mulf = function mulf(num) {
        var out = new BN2(null);
        out.words = new Array(this.length + num.length);
        return jumboMulTo(this, num, out);
      };
      BN2.prototype.imul = function imul(num) {
        return this.clone().mulTo(num, this);
      };
      BN2.prototype.imuln = function imuln(num) {
        assert2(typeof num === "number");
        assert2(num < 67108864);
        var carry = 0;
        for (var i = 0; i < this.length; i++) {
          var w = (this.words[i] | 0) * num;
          var lo = (w & 67108863) + (carry & 67108863);
          carry >>= 26;
          carry += w / 67108864 | 0;
          carry += lo >>> 26;
          this.words[i] = lo & 67108863;
        }
        if (carry !== 0) {
          this.words[i] = carry;
          this.length++;
        }
        return this;
      };
      BN2.prototype.muln = function muln(num) {
        return this.clone().imuln(num);
      };
      BN2.prototype.sqr = function sqr() {
        return this.mul(this);
      };
      BN2.prototype.isqr = function isqr() {
        return this.imul(this.clone());
      };
      BN2.prototype.pow = function pow(num) {
        var w = toBitArray(num);
        if (w.length === 0) return new BN2(1);
        var res = this;
        for (var i = 0; i < w.length; i++, res = res.sqr()) {
          if (w[i] !== 0) break;
        }
        if (++i < w.length) {
          for (var q = res.sqr(); i < w.length; i++, q = q.sqr()) {
            if (w[i] === 0) continue;
            res = res.mul(q);
          }
        }
        return res;
      };
      BN2.prototype.iushln = function iushln(bits) {
        assert2(typeof bits === "number" && bits >= 0);
        var r = bits % 26;
        var s = (bits - r) / 26;
        var carryMask = 67108863 >>> 26 - r << 26 - r;
        var i;
        if (r !== 0) {
          var carry = 0;
          for (i = 0; i < this.length; i++) {
            var newCarry = this.words[i] & carryMask;
            var c = (this.words[i] | 0) - newCarry << r;
            this.words[i] = c | carry;
            carry = newCarry >>> 26 - r;
          }
          if (carry) {
            this.words[i] = carry;
            this.length++;
          }
        }
        if (s !== 0) {
          for (i = this.length - 1; i >= 0; i--) {
            this.words[i + s] = this.words[i];
          }
          for (i = 0; i < s; i++) {
            this.words[i] = 0;
          }
          this.length += s;
        }
        return this.strip();
      };
      BN2.prototype.ishln = function ishln(bits) {
        assert2(this.negative === 0);
        return this.iushln(bits);
      };
      BN2.prototype.iushrn = function iushrn(bits, hint, extended) {
        assert2(typeof bits === "number" && bits >= 0);
        var h;
        if (hint) {
          h = (hint - hint % 26) / 26;
        } else {
          h = 0;
        }
        var r = bits % 26;
        var s = Math.min((bits - r) / 26, this.length);
        var mask = 67108863 ^ 67108863 >>> r << r;
        var maskedWords = extended;
        h -= s;
        h = Math.max(0, h);
        if (maskedWords) {
          for (var i = 0; i < s; i++) {
            maskedWords.words[i] = this.words[i];
          }
          maskedWords.length = s;
        }
        if (s === 0) {
        } else if (this.length > s) {
          this.length -= s;
          for (i = 0; i < this.length; i++) {
            this.words[i] = this.words[i + s];
          }
        } else {
          this.words[0] = 0;
          this.length = 1;
        }
        var carry = 0;
        for (i = this.length - 1; i >= 0 && (carry !== 0 || i >= h); i--) {
          var word = this.words[i] | 0;
          this.words[i] = carry << 26 - r | word >>> r;
          carry = word & mask;
        }
        if (maskedWords && carry !== 0) {
          maskedWords.words[maskedWords.length++] = carry;
        }
        if (this.length === 0) {
          this.words[0] = 0;
          this.length = 1;
        }
        return this.strip();
      };
      BN2.prototype.ishrn = function ishrn(bits, hint, extended) {
        assert2(this.negative === 0);
        return this.iushrn(bits, hint, extended);
      };
      BN2.prototype.shln = function shln(bits) {
        return this.clone().ishln(bits);
      };
      BN2.prototype.ushln = function ushln(bits) {
        return this.clone().iushln(bits);
      };
      BN2.prototype.shrn = function shrn(bits) {
        return this.clone().ishrn(bits);
      };
      BN2.prototype.ushrn = function ushrn(bits) {
        return this.clone().iushrn(bits);
      };
      BN2.prototype.testn = function testn(bit) {
        assert2(typeof bit === "number" && bit >= 0);
        var r = bit % 26;
        var s = (bit - r) / 26;
        var q = 1 << r;
        if (this.length <= s) return false;
        var w = this.words[s];
        return !!(w & q);
      };
      BN2.prototype.imaskn = function imaskn(bits) {
        assert2(typeof bits === "number" && bits >= 0);
        var r = bits % 26;
        var s = (bits - r) / 26;
        assert2(this.negative === 0, "imaskn works only with positive numbers");
        if (this.length <= s) {
          return this;
        }
        if (r !== 0) {
          s++;
        }
        this.length = Math.min(s, this.length);
        if (r !== 0) {
          var mask = 67108863 ^ 67108863 >>> r << r;
          this.words[this.length - 1] &= mask;
        }
        return this.strip();
      };
      BN2.prototype.maskn = function maskn(bits) {
        return this.clone().imaskn(bits);
      };
      BN2.prototype.iaddn = function iaddn(num) {
        assert2(typeof num === "number");
        assert2(num < 67108864);
        if (num < 0) return this.isubn(-num);
        if (this.negative !== 0) {
          if (this.length === 1 && (this.words[0] | 0) < num) {
            this.words[0] = num - (this.words[0] | 0);
            this.negative = 0;
            return this;
          }
          this.negative = 0;
          this.isubn(num);
          this.negative = 1;
          return this;
        }
        return this._iaddn(num);
      };
      BN2.prototype._iaddn = function _iaddn(num) {
        this.words[0] += num;
        for (var i = 0; i < this.length && this.words[i] >= 67108864; i++) {
          this.words[i] -= 67108864;
          if (i === this.length - 1) {
            this.words[i + 1] = 1;
          } else {
            this.words[i + 1]++;
          }
        }
        this.length = Math.max(this.length, i + 1);
        return this;
      };
      BN2.prototype.isubn = function isubn(num) {
        assert2(typeof num === "number");
        assert2(num < 67108864);
        if (num < 0) return this.iaddn(-num);
        if (this.negative !== 0) {
          this.negative = 0;
          this.iaddn(num);
          this.negative = 1;
          return this;
        }
        this.words[0] -= num;
        if (this.length === 1 && this.words[0] < 0) {
          this.words[0] = -this.words[0];
          this.negative = 1;
        } else {
          for (var i = 0; i < this.length && this.words[i] < 0; i++) {
            this.words[i] += 67108864;
            this.words[i + 1] -= 1;
          }
        }
        return this.strip();
      };
      BN2.prototype.addn = function addn(num) {
        return this.clone().iaddn(num);
      };
      BN2.prototype.subn = function subn(num) {
        return this.clone().isubn(num);
      };
      BN2.prototype.iabs = function iabs() {
        this.negative = 0;
        return this;
      };
      BN2.prototype.abs = function abs() {
        return this.clone().iabs();
      };
      BN2.prototype._ishlnsubmul = function _ishlnsubmul(num, mul, shift) {
        var len = num.length + shift;
        var i;
        this._expand(len);
        var w;
        var carry = 0;
        for (i = 0; i < num.length; i++) {
          w = (this.words[i + shift] | 0) + carry;
          var right = (num.words[i] | 0) * mul;
          w -= right & 67108863;
          carry = (w >> 26) - (right / 67108864 | 0);
          this.words[i + shift] = w & 67108863;
        }
        for (; i < this.length - shift; i++) {
          w = (this.words[i + shift] | 0) + carry;
          carry = w >> 26;
          this.words[i + shift] = w & 67108863;
        }
        if (carry === 0) return this.strip();
        assert2(carry === -1);
        carry = 0;
        for (i = 0; i < this.length; i++) {
          w = -(this.words[i] | 0) + carry;
          carry = w >> 26;
          this.words[i] = w & 67108863;
        }
        this.negative = 1;
        return this.strip();
      };
      BN2.prototype._wordDiv = function _wordDiv(num, mode) {
        var shift = this.length - num.length;
        var a = this.clone();
        var b = num;
        var bhi = b.words[b.length - 1] | 0;
        var bhiBits = this._countBits(bhi);
        shift = 26 - bhiBits;
        if (shift !== 0) {
          b = b.ushln(shift);
          a.iushln(shift);
          bhi = b.words[b.length - 1] | 0;
        }
        var m = a.length - b.length;
        var q;
        if (mode !== "mod") {
          q = new BN2(null);
          q.length = m + 1;
          q.words = new Array(q.length);
          for (var i = 0; i < q.length; i++) {
            q.words[i] = 0;
          }
        }
        var diff = a.clone()._ishlnsubmul(b, 1, m);
        if (diff.negative === 0) {
          a = diff;
          if (q) {
            q.words[m] = 1;
          }
        }
        for (var j = m - 1; j >= 0; j--) {
          var qj = (a.words[b.length + j] | 0) * 67108864 + (a.words[b.length + j - 1] | 0);
          qj = Math.min(qj / bhi | 0, 67108863);
          a._ishlnsubmul(b, qj, j);
          while (a.negative !== 0) {
            qj--;
            a.negative = 0;
            a._ishlnsubmul(b, 1, j);
            if (!a.isZero()) {
              a.negative ^= 1;
            }
          }
          if (q) {
            q.words[j] = qj;
          }
        }
        if (q) {
          q.strip();
        }
        a.strip();
        if (mode !== "div" && shift !== 0) {
          a.iushrn(shift);
        }
        return {
          div: q || null,
          mod: a
        };
      };
      BN2.prototype.divmod = function divmod(num, mode, positive) {
        assert2(!num.isZero());
        if (this.isZero()) {
          return {
            div: new BN2(0),
            mod: new BN2(0)
          };
        }
        var div, mod, res;
        if (this.negative !== 0 && num.negative === 0) {
          res = this.neg().divmod(num, mode);
          if (mode !== "mod") {
            div = res.div.neg();
          }
          if (mode !== "div") {
            mod = res.mod.neg();
            if (positive && mod.negative !== 0) {
              mod.iadd(num);
            }
          }
          return {
            div,
            mod
          };
        }
        if (this.negative === 0 && num.negative !== 0) {
          res = this.divmod(num.neg(), mode);
          if (mode !== "mod") {
            div = res.div.neg();
          }
          return {
            div,
            mod: res.mod
          };
        }
        if ((this.negative & num.negative) !== 0) {
          res = this.neg().divmod(num.neg(), mode);
          if (mode !== "div") {
            mod = res.mod.neg();
            if (positive && mod.negative !== 0) {
              mod.isub(num);
            }
          }
          return {
            div: res.div,
            mod
          };
        }
        if (num.length > this.length || this.cmp(num) < 0) {
          return {
            div: new BN2(0),
            mod: this
          };
        }
        if (num.length === 1) {
          if (mode === "div") {
            return {
              div: this.divn(num.words[0]),
              mod: null
            };
          }
          if (mode === "mod") {
            return {
              div: null,
              mod: new BN2(this.modn(num.words[0]))
            };
          }
          return {
            div: this.divn(num.words[0]),
            mod: new BN2(this.modn(num.words[0]))
          };
        }
        return this._wordDiv(num, mode);
      };
      BN2.prototype.div = function div(num) {
        return this.divmod(num, "div", false).div;
      };
      BN2.prototype.mod = function mod(num) {
        return this.divmod(num, "mod", false).mod;
      };
      BN2.prototype.umod = function umod(num) {
        return this.divmod(num, "mod", true).mod;
      };
      BN2.prototype.divRound = function divRound(num) {
        var dm = this.divmod(num);
        if (dm.mod.isZero()) return dm.div;
        var mod = dm.div.negative !== 0 ? dm.mod.isub(num) : dm.mod;
        var half = num.ushrn(1);
        var r2 = num.andln(1);
        var cmp = mod.cmp(half);
        if (cmp < 0 || r2 === 1 && cmp === 0) return dm.div;
        return dm.div.negative !== 0 ? dm.div.isubn(1) : dm.div.iaddn(1);
      };
      BN2.prototype.modn = function modn(num) {
        assert2(num <= 67108863);
        var p = (1 << 26) % num;
        var acc = 0;
        for (var i = this.length - 1; i >= 0; i--) {
          acc = (p * acc + (this.words[i] | 0)) % num;
        }
        return acc;
      };
      BN2.prototype.idivn = function idivn(num) {
        assert2(num <= 67108863);
        var carry = 0;
        for (var i = this.length - 1; i >= 0; i--) {
          var w = (this.words[i] | 0) + carry * 67108864;
          this.words[i] = w / num | 0;
          carry = w % num;
        }
        return this.strip();
      };
      BN2.prototype.divn = function divn(num) {
        return this.clone().idivn(num);
      };
      BN2.prototype.egcd = function egcd(p) {
        assert2(p.negative === 0);
        assert2(!p.isZero());
        var x = this;
        var y = p.clone();
        if (x.negative !== 0) {
          x = x.umod(p);
        } else {
          x = x.clone();
        }
        var A = new BN2(1);
        var B = new BN2(0);
        var C = new BN2(0);
        var D = new BN2(1);
        var g = 0;
        while (x.isEven() && y.isEven()) {
          x.iushrn(1);
          y.iushrn(1);
          ++g;
        }
        var yp = y.clone();
        var xp = x.clone();
        while (!x.isZero()) {
          for (var i = 0, im = 1; (x.words[0] & im) === 0 && i < 26; ++i, im <<= 1) ;
          if (i > 0) {
            x.iushrn(i);
            while (i-- > 0) {
              if (A.isOdd() || B.isOdd()) {
                A.iadd(yp);
                B.isub(xp);
              }
              A.iushrn(1);
              B.iushrn(1);
            }
          }
          for (var j = 0, jm = 1; (y.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1) ;
          if (j > 0) {
            y.iushrn(j);
            while (j-- > 0) {
              if (C.isOdd() || D.isOdd()) {
                C.iadd(yp);
                D.isub(xp);
              }
              C.iushrn(1);
              D.iushrn(1);
            }
          }
          if (x.cmp(y) >= 0) {
            x.isub(y);
            A.isub(C);
            B.isub(D);
          } else {
            y.isub(x);
            C.isub(A);
            D.isub(B);
          }
        }
        return {
          a: C,
          b: D,
          gcd: y.iushln(g)
        };
      };
      BN2.prototype._invmp = function _invmp(p) {
        assert2(p.negative === 0);
        assert2(!p.isZero());
        var a = this;
        var b = p.clone();
        if (a.negative !== 0) {
          a = a.umod(p);
        } else {
          a = a.clone();
        }
        var x1 = new BN2(1);
        var x2 = new BN2(0);
        var delta = b.clone();
        while (a.cmpn(1) > 0 && b.cmpn(1) > 0) {
          for (var i = 0, im = 1; (a.words[0] & im) === 0 && i < 26; ++i, im <<= 1) ;
          if (i > 0) {
            a.iushrn(i);
            while (i-- > 0) {
              if (x1.isOdd()) {
                x1.iadd(delta);
              }
              x1.iushrn(1);
            }
          }
          for (var j = 0, jm = 1; (b.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1) ;
          if (j > 0) {
            b.iushrn(j);
            while (j-- > 0) {
              if (x2.isOdd()) {
                x2.iadd(delta);
              }
              x2.iushrn(1);
            }
          }
          if (a.cmp(b) >= 0) {
            a.isub(b);
            x1.isub(x2);
          } else {
            b.isub(a);
            x2.isub(x1);
          }
        }
        var res;
        if (a.cmpn(1) === 0) {
          res = x1;
        } else {
          res = x2;
        }
        if (res.cmpn(0) < 0) {
          res.iadd(p);
        }
        return res;
      };
      BN2.prototype.gcd = function gcd(num) {
        if (this.isZero()) return num.abs();
        if (num.isZero()) return this.abs();
        var a = this.clone();
        var b = num.clone();
        a.negative = 0;
        b.negative = 0;
        for (var shift = 0; a.isEven() && b.isEven(); shift++) {
          a.iushrn(1);
          b.iushrn(1);
        }
        do {
          while (a.isEven()) {
            a.iushrn(1);
          }
          while (b.isEven()) {
            b.iushrn(1);
          }
          var r = a.cmp(b);
          if (r < 0) {
            var t = a;
            a = b;
            b = t;
          } else if (r === 0 || b.cmpn(1) === 0) {
            break;
          }
          a.isub(b);
        } while (true);
        return b.iushln(shift);
      };
      BN2.prototype.invm = function invm(num) {
        return this.egcd(num).a.umod(num);
      };
      BN2.prototype.isEven = function isEven() {
        return (this.words[0] & 1) === 0;
      };
      BN2.prototype.isOdd = function isOdd() {
        return (this.words[0] & 1) === 1;
      };
      BN2.prototype.andln = function andln(num) {
        return this.words[0] & num;
      };
      BN2.prototype.bincn = function bincn(bit) {
        assert2(typeof bit === "number");
        var r = bit % 26;
        var s = (bit - r) / 26;
        var q = 1 << r;
        if (this.length <= s) {
          this._expand(s + 1);
          this.words[s] |= q;
          return this;
        }
        var carry = q;
        for (var i = s; carry !== 0 && i < this.length; i++) {
          var w = this.words[i] | 0;
          w += carry;
          carry = w >>> 26;
          w &= 67108863;
          this.words[i] = w;
        }
        if (carry !== 0) {
          this.words[i] = carry;
          this.length++;
        }
        return this;
      };
      BN2.prototype.isZero = function isZero() {
        return this.length === 1 && this.words[0] === 0;
      };
      BN2.prototype.cmpn = function cmpn(num) {
        var negative = num < 0;
        if (this.negative !== 0 && !negative) return -1;
        if (this.negative === 0 && negative) return 1;
        this.strip();
        var res;
        if (this.length > 1) {
          res = 1;
        } else {
          if (negative) {
            num = -num;
          }
          assert2(num <= 67108863, "Number is too big");
          var w = this.words[0] | 0;
          res = w === num ? 0 : w < num ? -1 : 1;
        }
        if (this.negative !== 0) return -res | 0;
        return res;
      };
      BN2.prototype.cmp = function cmp(num) {
        if (this.negative !== 0 && num.negative === 0) return -1;
        if (this.negative === 0 && num.negative !== 0) return 1;
        var res = this.ucmp(num);
        if (this.negative !== 0) return -res | 0;
        return res;
      };
      BN2.prototype.ucmp = function ucmp(num) {
        if (this.length > num.length) return 1;
        if (this.length < num.length) return -1;
        var res = 0;
        for (var i = this.length - 1; i >= 0; i--) {
          var a = this.words[i] | 0;
          var b = num.words[i] | 0;
          if (a === b) continue;
          if (a < b) {
            res = -1;
          } else if (a > b) {
            res = 1;
          }
          break;
        }
        return res;
      };
      BN2.prototype.gtn = function gtn(num) {
        return this.cmpn(num) === 1;
      };
      BN2.prototype.gt = function gt(num) {
        return this.cmp(num) === 1;
      };
      BN2.prototype.gten = function gten(num) {
        return this.cmpn(num) >= 0;
      };
      BN2.prototype.gte = function gte(num) {
        return this.cmp(num) >= 0;
      };
      BN2.prototype.ltn = function ltn(num) {
        return this.cmpn(num) === -1;
      };
      BN2.prototype.lt = function lt(num) {
        return this.cmp(num) === -1;
      };
      BN2.prototype.lten = function lten(num) {
        return this.cmpn(num) <= 0;
      };
      BN2.prototype.lte = function lte(num) {
        return this.cmp(num) <= 0;
      };
      BN2.prototype.eqn = function eqn(num) {
        return this.cmpn(num) === 0;
      };
      BN2.prototype.eq = function eq(num) {
        return this.cmp(num) === 0;
      };
      BN2.red = function red(num) {
        return new Red(num);
      };
      BN2.prototype.toRed = function toRed(ctx) {
        assert2(!this.red, "Already a number in reduction context");
        assert2(this.negative === 0, "red works only with positives");
        return ctx.convertTo(this)._forceRed(ctx);
      };
      BN2.prototype.fromRed = function fromRed() {
        assert2(this.red, "fromRed works only with numbers in reduction context");
        return this.red.convertFrom(this);
      };
      BN2.prototype._forceRed = function _forceRed(ctx) {
        this.red = ctx;
        return this;
      };
      BN2.prototype.forceRed = function forceRed(ctx) {
        assert2(!this.red, "Already a number in reduction context");
        return this._forceRed(ctx);
      };
      BN2.prototype.redAdd = function redAdd(num) {
        assert2(this.red, "redAdd works only with red numbers");
        return this.red.add(this, num);
      };
      BN2.prototype.redIAdd = function redIAdd(num) {
        assert2(this.red, "redIAdd works only with red numbers");
        return this.red.iadd(this, num);
      };
      BN2.prototype.redSub = function redSub(num) {
        assert2(this.red, "redSub works only with red numbers");
        return this.red.sub(this, num);
      };
      BN2.prototype.redISub = function redISub(num) {
        assert2(this.red, "redISub works only with red numbers");
        return this.red.isub(this, num);
      };
      BN2.prototype.redShl = function redShl(num) {
        assert2(this.red, "redShl works only with red numbers");
        return this.red.shl(this, num);
      };
      BN2.prototype.redMul = function redMul(num) {
        assert2(this.red, "redMul works only with red numbers");
        this.red._verify2(this, num);
        return this.red.mul(this, num);
      };
      BN2.prototype.redIMul = function redIMul(num) {
        assert2(this.red, "redMul works only with red numbers");
        this.red._verify2(this, num);
        return this.red.imul(this, num);
      };
      BN2.prototype.redSqr = function redSqr() {
        assert2(this.red, "redSqr works only with red numbers");
        this.red._verify1(this);
        return this.red.sqr(this);
      };
      BN2.prototype.redISqr = function redISqr() {
        assert2(this.red, "redISqr works only with red numbers");
        this.red._verify1(this);
        return this.red.isqr(this);
      };
      BN2.prototype.redSqrt = function redSqrt() {
        assert2(this.red, "redSqrt works only with red numbers");
        this.red._verify1(this);
        return this.red.sqrt(this);
      };
      BN2.prototype.redInvm = function redInvm() {
        assert2(this.red, "redInvm works only with red numbers");
        this.red._verify1(this);
        return this.red.invm(this);
      };
      BN2.prototype.redNeg = function redNeg() {
        assert2(this.red, "redNeg works only with red numbers");
        this.red._verify1(this);
        return this.red.neg(this);
      };
      BN2.prototype.redPow = function redPow(num) {
        assert2(this.red && !num.red, "redPow(normalNum)");
        this.red._verify1(this);
        return this.red.pow(this, num);
      };
      var primes = {
        k256: null,
        p224: null,
        p192: null,
        p25519: null
      };
      function MPrime(name, p) {
        this.name = name;
        this.p = new BN2(p, 16);
        this.n = this.p.bitLength();
        this.k = new BN2(1).iushln(this.n).isub(this.p);
        this.tmp = this._tmp();
      }
      MPrime.prototype._tmp = function _tmp() {
        var tmp = new BN2(null);
        tmp.words = new Array(Math.ceil(this.n / 13));
        return tmp;
      };
      MPrime.prototype.ireduce = function ireduce(num) {
        var r = num;
        var rlen;
        do {
          this.split(r, this.tmp);
          r = this.imulK(r);
          r = r.iadd(this.tmp);
          rlen = r.bitLength();
        } while (rlen > this.n);
        var cmp = rlen < this.n ? -1 : r.ucmp(this.p);
        if (cmp === 0) {
          r.words[0] = 0;
          r.length = 1;
        } else if (cmp > 0) {
          r.isub(this.p);
        } else {
          r.strip();
        }
        return r;
      };
      MPrime.prototype.split = function split2(input, out) {
        input.iushrn(this.n, 0, out);
      };
      MPrime.prototype.imulK = function imulK(num) {
        return num.imul(this.k);
      };
      function K256() {
        MPrime.call(
          this,
          "k256",
          "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
        );
      }
      inherits(K256, MPrime);
      K256.prototype.split = function split2(input, output2) {
        var mask = 4194303;
        var outLen = Math.min(input.length, 9);
        for (var i = 0; i < outLen; i++) {
          output2.words[i] = input.words[i];
        }
        output2.length = outLen;
        if (input.length <= 9) {
          input.words[0] = 0;
          input.length = 1;
          return;
        }
        var prev = input.words[9];
        output2.words[output2.length++] = prev & mask;
        for (i = 10; i < input.length; i++) {
          var next = input.words[i] | 0;
          input.words[i - 10] = (next & mask) << 4 | prev >>> 22;
          prev = next;
        }
        prev >>>= 22;
        input.words[i - 10] = prev;
        if (prev === 0 && input.length > 10) {
          input.length -= 10;
        } else {
          input.length -= 9;
        }
      };
      K256.prototype.imulK = function imulK(num) {
        num.words[num.length] = 0;
        num.words[num.length + 1] = 0;
        num.length += 2;
        var lo = 0;
        for (var i = 0; i < num.length; i++) {
          var w = num.words[i] | 0;
          lo += w * 977;
          num.words[i] = lo & 67108863;
          lo = w * 64 + (lo / 67108864 | 0);
        }
        if (num.words[num.length - 1] === 0) {
          num.length--;
          if (num.words[num.length - 1] === 0) {
            num.length--;
          }
        }
        return num;
      };
      function P224() {
        MPrime.call(
          this,
          "p224",
          "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
        );
      }
      inherits(P224, MPrime);
      function P192() {
        MPrime.call(
          this,
          "p192",
          "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
        );
      }
      inherits(P192, MPrime);
      function P25519() {
        MPrime.call(
          this,
          "25519",
          "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
        );
      }
      inherits(P25519, MPrime);
      P25519.prototype.imulK = function imulK(num) {
        var carry = 0;
        for (var i = 0; i < num.length; i++) {
          var hi = (num.words[i] | 0) * 19 + carry;
          var lo = hi & 67108863;
          hi >>>= 26;
          num.words[i] = lo;
          carry = hi;
        }
        if (carry !== 0) {
          num.words[num.length++] = carry;
        }
        return num;
      };
      BN2._prime = function prime(name) {
        if (primes[name]) return primes[name];
        var prime2;
        if (name === "k256") {
          prime2 = new K256();
        } else if (name === "p224") {
          prime2 = new P224();
        } else if (name === "p192") {
          prime2 = new P192();
        } else if (name === "p25519") {
          prime2 = new P25519();
        } else {
          throw new Error("Unknown prime " + name);
        }
        primes[name] = prime2;
        return prime2;
      };
      function Red(m) {
        if (typeof m === "string") {
          var prime = BN2._prime(m);
          this.m = prime.p;
          this.prime = prime;
        } else {
          assert2(m.gtn(1), "modulus must be greater than 1");
          this.m = m;
          this.prime = null;
        }
      }
      Red.prototype._verify1 = function _verify1(a) {
        assert2(a.negative === 0, "red works only with positives");
        assert2(a.red, "red works only with red numbers");
      };
      Red.prototype._verify2 = function _verify2(a, b) {
        assert2((a.negative | b.negative) === 0, "red works only with positives");
        assert2(
          a.red && a.red === b.red,
          "red works only with red numbers"
        );
      };
      Red.prototype.imod = function imod(a) {
        if (this.prime) return this.prime.ireduce(a)._forceRed(this);
        return a.umod(this.m)._forceRed(this);
      };
      Red.prototype.neg = function neg(a) {
        if (a.isZero()) {
          return a.clone();
        }
        return this.m.sub(a)._forceRed(this);
      };
      Red.prototype.add = function add2(a, b) {
        this._verify2(a, b);
        var res = a.add(b);
        if (res.cmp(this.m) >= 0) {
          res.isub(this.m);
        }
        return res._forceRed(this);
      };
      Red.prototype.iadd = function iadd(a, b) {
        this._verify2(a, b);
        var res = a.iadd(b);
        if (res.cmp(this.m) >= 0) {
          res.isub(this.m);
        }
        return res;
      };
      Red.prototype.sub = function sub(a, b) {
        this._verify2(a, b);
        var res = a.sub(b);
        if (res.cmpn(0) < 0) {
          res.iadd(this.m);
        }
        return res._forceRed(this);
      };
      Red.prototype.isub = function isub(a, b) {
        this._verify2(a, b);
        var res = a.isub(b);
        if (res.cmpn(0) < 0) {
          res.iadd(this.m);
        }
        return res;
      };
      Red.prototype.shl = function shl(a, num) {
        this._verify1(a);
        return this.imod(a.ushln(num));
      };
      Red.prototype.imul = function imul(a, b) {
        this._verify2(a, b);
        return this.imod(a.imul(b));
      };
      Red.prototype.mul = function mul(a, b) {
        this._verify2(a, b);
        return this.imod(a.mul(b));
      };
      Red.prototype.isqr = function isqr(a) {
        return this.imul(a, a.clone());
      };
      Red.prototype.sqr = function sqr(a) {
        return this.mul(a, a);
      };
      Red.prototype.sqrt = function sqrt(a) {
        if (a.isZero()) return a.clone();
        var mod3 = this.m.andln(3);
        assert2(mod3 % 2 === 1);
        if (mod3 === 3) {
          var pow = this.m.add(new BN2(1)).iushrn(2);
          return this.pow(a, pow);
        }
        var q = this.m.subn(1);
        var s = 0;
        while (!q.isZero() && q.andln(1) === 0) {
          s++;
          q.iushrn(1);
        }
        assert2(!q.isZero());
        var one = new BN2(1).toRed(this);
        var nOne = one.redNeg();
        var lpow = this.m.subn(1).iushrn(1);
        var z = this.m.bitLength();
        z = new BN2(2 * z * z).toRed(this);
        while (this.pow(z, lpow).cmp(nOne) !== 0) {
          z.redIAdd(nOne);
        }
        var c = this.pow(z, q);
        var r = this.pow(a, q.addn(1).iushrn(1));
        var t = this.pow(a, q);
        var m = s;
        while (t.cmp(one) !== 0) {
          var tmp = t;
          for (var i = 0; tmp.cmp(one) !== 0; i++) {
            tmp = tmp.redSqr();
          }
          assert2(i < m);
          var b = this.pow(c, new BN2(1).iushln(m - i - 1));
          r = r.redMul(b);
          c = b.redSqr();
          t = t.redMul(c);
          m = i;
        }
        return r;
      };
      Red.prototype.invm = function invm(a) {
        var inv = a._invmp(this.m);
        if (inv.negative !== 0) {
          inv.negative = 0;
          return this.imod(inv).redNeg();
        } else {
          return this.imod(inv);
        }
      };
      Red.prototype.pow = function pow(a, num) {
        if (num.isZero()) return new BN2(1);
        if (num.cmpn(1) === 0) return a.clone();
        var windowSize = 4;
        var wnd = new Array(1 << windowSize);
        wnd[0] = new BN2(1).toRed(this);
        wnd[1] = a;
        for (var i = 2; i < wnd.length; i++) {
          wnd[i] = this.mul(wnd[i - 1], a);
        }
        var res = wnd[0];
        var current = 0;
        var currentLen = 0;
        var start = num.bitLength() % 26;
        if (start === 0) {
          start = 26;
        }
        for (i = num.length - 1; i >= 0; i--) {
          var word = num.words[i];
          for (var j = start - 1; j >= 0; j--) {
            var bit = word >> j & 1;
            if (res !== wnd[0]) {
              res = this.sqr(res);
            }
            if (bit === 0 && current === 0) {
              currentLen = 0;
              continue;
            }
            current <<= 1;
            current |= bit;
            currentLen++;
            if (currentLen !== windowSize && (i !== 0 || j !== 0)) continue;
            res = this.mul(res, wnd[current]);
            currentLen = 0;
            current = 0;
          }
          start = 26;
        }
        return res;
      };
      Red.prototype.convertTo = function convertTo(num) {
        var r = num.umod(this.m);
        return r === num ? r.clone() : r;
      };
      Red.prototype.convertFrom = function convertFrom(num) {
        var res = num.clone();
        res.red = null;
        return res;
      };
      BN2.mont = function mont(num) {
        return new Mont(num);
      };
      function Mont(m) {
        Red.call(this, m);
        this.shift = this.m.bitLength();
        if (this.shift % 26 !== 0) {
          this.shift += 26 - this.shift % 26;
        }
        this.r = new BN2(1).iushln(this.shift);
        this.r2 = this.imod(this.r.sqr());
        this.rinv = this.r._invmp(this.m);
        this.minv = this.rinv.mul(this.r).isubn(1).div(this.m);
        this.minv = this.minv.umod(this.r);
        this.minv = this.r.sub(this.minv);
      }
      inherits(Mont, Red);
      Mont.prototype.convertTo = function convertTo(num) {
        return this.imod(num.ushln(this.shift));
      };
      Mont.prototype.convertFrom = function convertFrom(num) {
        var r = this.imod(num.mul(this.rinv));
        r.red = null;
        return r;
      };
      Mont.prototype.imul = function imul(a, b) {
        if (a.isZero() || b.isZero()) {
          a.words[0] = 0;
          a.length = 1;
          return a;
        }
        var t = a.imul(b);
        var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
        var u = t.isub(c).iushrn(this.shift);
        var res = u;
        if (u.cmp(this.m) >= 0) {
          res = u.isub(this.m);
        } else if (u.cmpn(0) < 0) {
          res = u.iadd(this.m);
        }
        return res._forceRed(this);
      };
      Mont.prototype.mul = function mul(a, b) {
        if (a.isZero() || b.isZero()) return new BN2(0)._forceRed(this);
        var t = a.mul(b);
        var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
        var u = t.isub(c).iushrn(this.shift);
        var res = u;
        if (u.cmp(this.m) >= 0) {
          res = u.isub(this.m);
        } else if (u.cmpn(0) < 0) {
          res = u.iadd(this.m);
        }
        return res._forceRed(this);
      };
      Mont.prototype.invm = function invm(a) {
        var res = this.imod(a._invmp(this.m).mul(this.r2));
        return res._forceRed(this);
      };
    })(typeof module === "undefined" || module, exports);
  }
});

// node_modules/is-hex-prefixed/src/index.js
var require_src = __commonJS({
  "node_modules/is-hex-prefixed/src/index.js"(exports, module) {
    module.exports = function isHexPrefixed(str) {
      if (typeof str !== "string") {
        throw new Error("[is-hex-prefixed] value must be type 'string', is currently type " + typeof str + ", while checking isHexPrefixed.");
      }
      return str.slice(0, 2) === "0x";
    };
  }
});

// node_modules/strip-hex-prefix/src/index.js
var require_src2 = __commonJS({
  "node_modules/strip-hex-prefix/src/index.js"(exports, module) {
    var isHexPrefixed = require_src();
    module.exports = function stripHexPrefix(str) {
      if (typeof str !== "string") {
        return str;
      }
      return isHexPrefixed(str) ? str.slice(2) : str;
    };
  }
});

// node_modules/number-to-bn/src/index.js
var require_src3 = __commonJS({
  "node_modules/number-to-bn/src/index.js"(exports, module) {
    var BN2 = require_bn2();
    var stripHexPrefix = require_src2();
    module.exports = function numberToBN(arg) {
      if (typeof arg === "string" || typeof arg === "number") {
        var multiplier = new BN2(1);
        var formattedString = String(arg).toLowerCase().trim();
        var isHexPrefixed = formattedString.substr(0, 2) === "0x" || formattedString.substr(0, 3) === "-0x";
        var stringArg = stripHexPrefix(formattedString);
        if (stringArg.substr(0, 1) === "-") {
          stringArg = stripHexPrefix(stringArg.slice(1));
          multiplier = new BN2(-1, 10);
        }
        stringArg = stringArg === "" ? "0" : stringArg;
        if (!stringArg.match(/^-?[0-9]+$/) && stringArg.match(/^[0-9A-Fa-f]+$/) || stringArg.match(/^[a-fA-F]+$/) || isHexPrefixed === true && stringArg.match(/^[0-9A-Fa-f]+$/)) {
          return new BN2(stringArg, 16).mul(multiplier);
        }
        if ((stringArg.match(/^-?[0-9]+$/) || stringArg === "") && isHexPrefixed === false) {
          return new BN2(stringArg, 10).mul(multiplier);
        }
      } else if (typeof arg === "object" && arg.toString && (!arg.pop && !arg.push)) {
        if (arg.toString(10).match(/^-?[0-9]+$/) && (arg.mul || arg.dividedToIntegerBy)) {
          return new BN2(arg.toString(10), 10);
        }
      }
      throw new Error("[number-to-bn] while converting number " + JSON.stringify(arg) + " to BN.js instance, error: invalid number value. Value must be an integer, hex string, BN or BigNumber instance. Note, decimals are not supported.");
    };
  }
});

// node_modules/ethjs-unit/lib/index.js
var require_lib = __commonJS({
  "node_modules/ethjs-unit/lib/index.js"(exports, module) {
    "use strict";
    var BN2 = require_bn();
    var numberToBN = require_src3();
    var zero = new BN2(0);
    var negative1 = new BN2(-1);
    var unitMap = {
      "noether": "0",
      // eslint-disable-line
      "wei": "1",
      // eslint-disable-line
      "kwei": "1000",
      // eslint-disable-line
      "Kwei": "1000",
      // eslint-disable-line
      "babbage": "1000",
      // eslint-disable-line
      "femtoether": "1000",
      // eslint-disable-line
      "mwei": "1000000",
      // eslint-disable-line
      "Mwei": "1000000",
      // eslint-disable-line
      "lovelace": "1000000",
      // eslint-disable-line
      "picoether": "1000000",
      // eslint-disable-line
      "gwei": "1000000000",
      // eslint-disable-line
      "Gwei": "1000000000",
      // eslint-disable-line
      "shannon": "1000000000",
      // eslint-disable-line
      "nanoether": "1000000000",
      // eslint-disable-line
      "nano": "1000000000",
      // eslint-disable-line
      "szabo": "1000000000000",
      // eslint-disable-line
      "microether": "1000000000000",
      // eslint-disable-line
      "micro": "1000000000000",
      // eslint-disable-line
      "finney": "1000000000000000",
      // eslint-disable-line
      "milliether": "1000000000000000",
      // eslint-disable-line
      "milli": "1000000000000000",
      // eslint-disable-line
      "ether": "1000000000000000000",
      // eslint-disable-line
      "kether": "1000000000000000000000",
      // eslint-disable-line
      "grand": "1000000000000000000000",
      // eslint-disable-line
      "mether": "1000000000000000000000000",
      // eslint-disable-line
      "gether": "1000000000000000000000000000",
      // eslint-disable-line
      "tether": "1000000000000000000000000000000"
    };
    function getValueOfUnit(unitInput) {
      var unit = unitInput ? unitInput.toLowerCase() : "ether";
      var unitValue = unitMap[unit];
      if (typeof unitValue !== "string") {
        throw new Error("[ethjs-unit] the unit provided " + unitInput + " doesn't exists, please use the one of the following units " + JSON.stringify(unitMap, null, 2));
      }
      return new BN2(unitValue, 10);
    }
    function numberToString(arg) {
      if (typeof arg === "string") {
        if (!arg.match(/^-?[0-9.]+$/)) {
          throw new Error("while converting number to string, invalid number value '" + arg + "', should be a number matching (^-?[0-9.]+).");
        }
        return arg;
      } else if (typeof arg === "number") {
        return String(arg);
      } else if (typeof arg === "object" && arg.toString && (arg.toTwos || arg.dividedToIntegerBy)) {
        if (arg.toPrecision) {
          return String(arg.toPrecision());
        } else {
          return arg.toString(10);
        }
      }
      throw new Error("while converting number to string, invalid number value '" + arg + "' type " + typeof arg + ".");
    }
    function fromWei(weiInput, unit, optionsInput) {
      var wei = numberToBN(weiInput);
      var negative = wei.lt(zero);
      var base = getValueOfUnit(unit);
      var baseLength = unitMap[unit].length - 1 || 1;
      var options = optionsInput || {};
      if (negative) {
        wei = wei.mul(negative1);
      }
      var fraction = wei.mod(base).toString(10);
      while (fraction.length < baseLength) {
        fraction = "0" + fraction;
      }
      if (!options.pad) {
        fraction = fraction.match(/^([0-9]*[1-9]|0)(0*)/)[1];
      }
      var whole = wei.div(base).toString(10);
      if (options.commify) {
        whole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
      var value = "" + whole + (fraction == "0" ? "" : "." + fraction);
      if (negative) {
        value = "-" + value;
      }
      return value;
    }
    function toWei2(etherInput, unit) {
      var ether = numberToString(etherInput);
      var base = getValueOfUnit(unit);
      var baseLength = unitMap[unit].length - 1 || 1;
      var negative = ether.substring(0, 1) === "-";
      if (negative) {
        ether = ether.substring(1);
      }
      if (ether === ".") {
        throw new Error("[ethjs-unit] while converting number " + etherInput + " to wei, invalid value");
      }
      var comps = ether.split(".");
      if (comps.length > 2) {
        throw new Error("[ethjs-unit] while converting number " + etherInput + " to wei,  too many decimal points");
      }
      var whole = comps[0], fraction = comps[1];
      if (!whole) {
        whole = "0";
      }
      if (!fraction) {
        fraction = "0";
      }
      if (fraction.length > baseLength) {
        throw new Error("[ethjs-unit] while converting number " + etherInput + " to wei, too many decimal places");
      }
      while (fraction.length < baseLength) {
        fraction += "0";
      }
      whole = new BN2(whole);
      fraction = new BN2(fraction);
      var wei = whole.mul(base).add(fraction);
      if (negative) {
        wei = wei.mul(negative1);
      }
      return new BN2(wei.toString(10), 10);
    }
    module.exports = {
      unitMap,
      numberToString,
      getValueOfUnit,
      fromWei,
      toWei: toWei2
    };
  }
});

// node_modules/bn.js/lib/bn.js
var require_bn3 = __commonJS({
  "node_modules/bn.js/lib/bn.js"(exports, module) {
    (function(module2, exports2) {
      "use strict";
      function assert2(val, msg) {
        if (!val) throw new Error(msg || "Assertion failed");
      }
      function inherits(ctor, superCtor) {
        ctor.super_ = superCtor;
        var TempCtor = function() {
        };
        TempCtor.prototype = superCtor.prototype;
        ctor.prototype = new TempCtor();
        ctor.prototype.constructor = ctor;
      }
      function BN2(number2, base, endian) {
        if (BN2.isBN(number2)) {
          return number2;
        }
        this.negative = 0;
        this.words = null;
        this.length = 0;
        this.red = null;
        if (number2 !== null) {
          if (base === "le" || base === "be") {
            endian = base;
            base = 10;
          }
          this._init(number2 || 0, base || 10, endian || "be");
        }
      }
      if (typeof module2 === "object") {
        module2.exports = BN2;
      } else {
        exports2.BN = BN2;
      }
      BN2.BN = BN2;
      BN2.wordSize = 26;
      var Buffer2;
      try {
        if (typeof window !== "undefined" && typeof window.Buffer !== "undefined") {
          Buffer2 = window.Buffer;
        } else {
          Buffer2 = __require("buffer").Buffer;
        }
      } catch (e) {
      }
      BN2.isBN = function isBN(num) {
        if (num instanceof BN2) {
          return true;
        }
        return num !== null && typeof num === "object" && num.constructor.wordSize === BN2.wordSize && Array.isArray(num.words);
      };
      BN2.max = function max(left, right) {
        if (left.cmp(right) > 0) return left;
        return right;
      };
      BN2.min = function min(left, right) {
        if (left.cmp(right) < 0) return left;
        return right;
      };
      BN2.prototype._init = function init(number2, base, endian) {
        if (typeof number2 === "number") {
          return this._initNumber(number2, base, endian);
        }
        if (typeof number2 === "object") {
          return this._initArray(number2, base, endian);
        }
        if (base === "hex") {
          base = 16;
        }
        assert2(base === (base | 0) && base >= 2 && base <= 36);
        number2 = number2.toString().replace(/\s+/g, "");
        var start = 0;
        if (number2[0] === "-") {
          start++;
          this.negative = 1;
        }
        if (start < number2.length) {
          if (base === 16) {
            this._parseHex(number2, start, endian);
          } else {
            this._parseBase(number2, base, start);
            if (endian === "le") {
              this._initArray(this.toArray(), base, endian);
            }
          }
        }
      };
      BN2.prototype._initNumber = function _initNumber(number2, base, endian) {
        if (number2 < 0) {
          this.negative = 1;
          number2 = -number2;
        }
        if (number2 < 67108864) {
          this.words = [number2 & 67108863];
          this.length = 1;
        } else if (number2 < 4503599627370496) {
          this.words = [
            number2 & 67108863,
            number2 / 67108864 & 67108863
          ];
          this.length = 2;
        } else {
          assert2(number2 < 9007199254740992);
          this.words = [
            number2 & 67108863,
            number2 / 67108864 & 67108863,
            1
          ];
          this.length = 3;
        }
        if (endian !== "le") return;
        this._initArray(this.toArray(), base, endian);
      };
      BN2.prototype._initArray = function _initArray(number2, base, endian) {
        assert2(typeof number2.length === "number");
        if (number2.length <= 0) {
          this.words = [0];
          this.length = 1;
          return this;
        }
        this.length = Math.ceil(number2.length / 3);
        this.words = new Array(this.length);
        for (var i = 0; i < this.length; i++) {
          this.words[i] = 0;
        }
        var j, w;
        var off = 0;
        if (endian === "be") {
          for (i = number2.length - 1, j = 0; i >= 0; i -= 3) {
            w = number2[i] | number2[i - 1] << 8 | number2[i - 2] << 16;
            this.words[j] |= w << off & 67108863;
            this.words[j + 1] = w >>> 26 - off & 67108863;
            off += 24;
            if (off >= 26) {
              off -= 26;
              j++;
            }
          }
        } else if (endian === "le") {
          for (i = 0, j = 0; i < number2.length; i += 3) {
            w = number2[i] | number2[i + 1] << 8 | number2[i + 2] << 16;
            this.words[j] |= w << off & 67108863;
            this.words[j + 1] = w >>> 26 - off & 67108863;
            off += 24;
            if (off >= 26) {
              off -= 26;
              j++;
            }
          }
        }
        return this._strip();
      };
      function parseHex4Bits(string, index) {
        var c = string.charCodeAt(index);
        if (c >= 48 && c <= 57) {
          return c - 48;
        } else if (c >= 65 && c <= 70) {
          return c - 55;
        } else if (c >= 97 && c <= 102) {
          return c - 87;
        } else {
          assert2(false, "Invalid character in " + string);
        }
      }
      function parseHexByte(string, lowerBound, index) {
        var r = parseHex4Bits(string, index);
        if (index - 1 >= lowerBound) {
          r |= parseHex4Bits(string, index - 1) << 4;
        }
        return r;
      }
      BN2.prototype._parseHex = function _parseHex(number2, start, endian) {
        this.length = Math.ceil((number2.length - start) / 6);
        this.words = new Array(this.length);
        for (var i = 0; i < this.length; i++) {
          this.words[i] = 0;
        }
        var off = 0;
        var j = 0;
        var w;
        if (endian === "be") {
          for (i = number2.length - 1; i >= start; i -= 2) {
            w = parseHexByte(number2, start, i) << off;
            this.words[j] |= w & 67108863;
            if (off >= 18) {
              off -= 18;
              j += 1;
              this.words[j] |= w >>> 26;
            } else {
              off += 8;
            }
          }
        } else {
          var parseLength = number2.length - start;
          for (i = parseLength % 2 === 0 ? start + 1 : start; i < number2.length; i += 2) {
            w = parseHexByte(number2, start, i) << off;
            this.words[j] |= w & 67108863;
            if (off >= 18) {
              off -= 18;
              j += 1;
              this.words[j] |= w >>> 26;
            } else {
              off += 8;
            }
          }
        }
        this._strip();
      };
      function parseBase(str, start, end, mul) {
        var r = 0;
        var b = 0;
        var len = Math.min(str.length, end);
        for (var i = start; i < len; i++) {
          var c = str.charCodeAt(i) - 48;
          r *= mul;
          if (c >= 49) {
            b = c - 49 + 10;
          } else if (c >= 17) {
            b = c - 17 + 10;
          } else {
            b = c;
          }
          assert2(c >= 0 && b < mul, "Invalid character");
          r += b;
        }
        return r;
      }
      BN2.prototype._parseBase = function _parseBase(number2, base, start) {
        this.words = [0];
        this.length = 1;
        for (var limbLen = 0, limbPow = 1; limbPow <= 67108863; limbPow *= base) {
          limbLen++;
        }
        limbLen--;
        limbPow = limbPow / base | 0;
        var total = number2.length - start;
        var mod = total % limbLen;
        var end = Math.min(total, total - mod) + start;
        var word = 0;
        for (var i = start; i < end; i += limbLen) {
          word = parseBase(number2, i, i + limbLen, base);
          this.imuln(limbPow);
          if (this.words[0] + word < 67108864) {
            this.words[0] += word;
          } else {
            this._iaddn(word);
          }
        }
        if (mod !== 0) {
          var pow = 1;
          word = parseBase(number2, i, number2.length, base);
          for (i = 0; i < mod; i++) {
            pow *= base;
          }
          this.imuln(pow);
          if (this.words[0] + word < 67108864) {
            this.words[0] += word;
          } else {
            this._iaddn(word);
          }
        }
        this._strip();
      };
      BN2.prototype.copy = function copy(dest) {
        dest.words = new Array(this.length);
        for (var i = 0; i < this.length; i++) {
          dest.words[i] = this.words[i];
        }
        dest.length = this.length;
        dest.negative = this.negative;
        dest.red = this.red;
      };
      function move(dest, src) {
        dest.words = src.words;
        dest.length = src.length;
        dest.negative = src.negative;
        dest.red = src.red;
      }
      BN2.prototype._move = function _move(dest) {
        move(dest, this);
      };
      BN2.prototype.clone = function clone() {
        var r = new BN2(null);
        this.copy(r);
        return r;
      };
      BN2.prototype._expand = function _expand(size) {
        while (this.length < size) {
          this.words[this.length++] = 0;
        }
        return this;
      };
      BN2.prototype._strip = function strip() {
        while (this.length > 1 && this.words[this.length - 1] === 0) {
          this.length--;
        }
        return this._normSign();
      };
      BN2.prototype._normSign = function _normSign() {
        if (this.length === 1 && this.words[0] === 0) {
          this.negative = 0;
        }
        return this;
      };
      if (typeof Symbol !== "undefined" && typeof Symbol.for === "function") {
        try {
          BN2.prototype[Symbol.for("nodejs.util.inspect.custom")] = inspect;
        } catch (e) {
          BN2.prototype.inspect = inspect;
        }
      } else {
        BN2.prototype.inspect = inspect;
      }
      function inspect() {
        return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
      }
      var zeros = [
        "",
        "0",
        "00",
        "000",
        "0000",
        "00000",
        "000000",
        "0000000",
        "00000000",
        "000000000",
        "0000000000",
        "00000000000",
        "000000000000",
        "0000000000000",
        "00000000000000",
        "000000000000000",
        "0000000000000000",
        "00000000000000000",
        "000000000000000000",
        "0000000000000000000",
        "00000000000000000000",
        "000000000000000000000",
        "0000000000000000000000",
        "00000000000000000000000",
        "000000000000000000000000",
        "0000000000000000000000000"
      ];
      var groupSizes = [
        0,
        0,
        25,
        16,
        12,
        11,
        10,
        9,
        8,
        8,
        7,
        7,
        7,
        7,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5
      ];
      var groupBases = [
        0,
        0,
        33554432,
        43046721,
        16777216,
        48828125,
        60466176,
        40353607,
        16777216,
        43046721,
        1e7,
        19487171,
        35831808,
        62748517,
        7529536,
        11390625,
        16777216,
        24137569,
        34012224,
        47045881,
        64e6,
        4084101,
        5153632,
        6436343,
        7962624,
        9765625,
        11881376,
        14348907,
        17210368,
        20511149,
        243e5,
        28629151,
        33554432,
        39135393,
        45435424,
        52521875,
        60466176
      ];
      BN2.prototype.toString = function toString(base, padding) {
        base = base || 10;
        padding = padding | 0 || 1;
        var out;
        if (base === 16 || base === "hex") {
          out = "";
          var off = 0;
          var carry = 0;
          for (var i = 0; i < this.length; i++) {
            var w = this.words[i];
            var word = ((w << off | carry) & 16777215).toString(16);
            carry = w >>> 24 - off & 16777215;
            off += 2;
            if (off >= 26) {
              off -= 26;
              i--;
            }
            if (carry !== 0 || i !== this.length - 1) {
              out = zeros[6 - word.length] + word + out;
            } else {
              out = word + out;
            }
          }
          if (carry !== 0) {
            out = carry.toString(16) + out;
          }
          while (out.length % padding !== 0) {
            out = "0" + out;
          }
          if (this.negative !== 0) {
            out = "-" + out;
          }
          return out;
        }
        if (base === (base | 0) && base >= 2 && base <= 36) {
          var groupSize = groupSizes[base];
          var groupBase = groupBases[base];
          out = "";
          var c = this.clone();
          c.negative = 0;
          while (!c.isZero()) {
            var r = c.modrn(groupBase).toString(base);
            c = c.idivn(groupBase);
            if (!c.isZero()) {
              out = zeros[groupSize - r.length] + r + out;
            } else {
              out = r + out;
            }
          }
          if (this.isZero()) {
            out = "0" + out;
          }
          while (out.length % padding !== 0) {
            out = "0" + out;
          }
          if (this.negative !== 0) {
            out = "-" + out;
          }
          return out;
        }
        assert2(false, "Base should be between 2 and 36");
      };
      BN2.prototype.toNumber = function toNumber() {
        var ret = this.words[0];
        if (this.length === 2) {
          ret += this.words[1] * 67108864;
        } else if (this.length === 3 && this.words[2] === 1) {
          ret += 4503599627370496 + this.words[1] * 67108864;
        } else if (this.length > 2) {
          assert2(false, "Number can only safely store up to 53 bits");
        }
        return this.negative !== 0 ? -ret : ret;
      };
      BN2.prototype.toJSON = function toJSON() {
        return this.toString(16, 2);
      };
      if (Buffer2) {
        BN2.prototype.toBuffer = function toBuffer(endian, length) {
          return this.toArrayLike(Buffer2, endian, length);
        };
      }
      BN2.prototype.toArray = function toArray(endian, length) {
        return this.toArrayLike(Array, endian, length);
      };
      var allocate = function allocate2(ArrayType, size) {
        if (ArrayType.allocUnsafe) {
          return ArrayType.allocUnsafe(size);
        }
        return new ArrayType(size);
      };
      BN2.prototype.toArrayLike = function toArrayLike(ArrayType, endian, length) {
        this._strip();
        var byteLength = this.byteLength();
        var reqLength = length || Math.max(1, byteLength);
        assert2(byteLength <= reqLength, "byte array longer than desired length");
        assert2(reqLength > 0, "Requested array length <= 0");
        var res = allocate(ArrayType, reqLength);
        var postfix = endian === "le" ? "LE" : "BE";
        this["_toArrayLike" + postfix](res, byteLength);
        return res;
      };
      BN2.prototype._toArrayLikeLE = function _toArrayLikeLE(res, byteLength) {
        var position = 0;
        var carry = 0;
        for (var i = 0, shift = 0; i < this.length; i++) {
          var word = this.words[i] << shift | carry;
          res[position++] = word & 255;
          if (position < res.length) {
            res[position++] = word >> 8 & 255;
          }
          if (position < res.length) {
            res[position++] = word >> 16 & 255;
          }
          if (shift === 6) {
            if (position < res.length) {
              res[position++] = word >> 24 & 255;
            }
            carry = 0;
            shift = 0;
          } else {
            carry = word >>> 24;
            shift += 2;
          }
        }
        if (position < res.length) {
          res[position++] = carry;
          while (position < res.length) {
            res[position++] = 0;
          }
        }
      };
      BN2.prototype._toArrayLikeBE = function _toArrayLikeBE(res, byteLength) {
        var position = res.length - 1;
        var carry = 0;
        for (var i = 0, shift = 0; i < this.length; i++) {
          var word = this.words[i] << shift | carry;
          res[position--] = word & 255;
          if (position >= 0) {
            res[position--] = word >> 8 & 255;
          }
          if (position >= 0) {
            res[position--] = word >> 16 & 255;
          }
          if (shift === 6) {
            if (position >= 0) {
              res[position--] = word >> 24 & 255;
            }
            carry = 0;
            shift = 0;
          } else {
            carry = word >>> 24;
            shift += 2;
          }
        }
        if (position >= 0) {
          res[position--] = carry;
          while (position >= 0) {
            res[position--] = 0;
          }
        }
      };
      if (Math.clz32) {
        BN2.prototype._countBits = function _countBits(w) {
          return 32 - Math.clz32(w);
        };
      } else {
        BN2.prototype._countBits = function _countBits(w) {
          var t = w;
          var r = 0;
          if (t >= 4096) {
            r += 13;
            t >>>= 13;
          }
          if (t >= 64) {
            r += 7;
            t >>>= 7;
          }
          if (t >= 8) {
            r += 4;
            t >>>= 4;
          }
          if (t >= 2) {
            r += 2;
            t >>>= 2;
          }
          return r + t;
        };
      }
      BN2.prototype._zeroBits = function _zeroBits(w) {
        if (w === 0) return 26;
        var t = w;
        var r = 0;
        if ((t & 8191) === 0) {
          r += 13;
          t >>>= 13;
        }
        if ((t & 127) === 0) {
          r += 7;
          t >>>= 7;
        }
        if ((t & 15) === 0) {
          r += 4;
          t >>>= 4;
        }
        if ((t & 3) === 0) {
          r += 2;
          t >>>= 2;
        }
        if ((t & 1) === 0) {
          r++;
        }
        return r;
      };
      BN2.prototype.bitLength = function bitLength() {
        var w = this.words[this.length - 1];
        var hi = this._countBits(w);
        return (this.length - 1) * 26 + hi;
      };
      function toBitArray(num) {
        var w = new Array(num.bitLength());
        for (var bit = 0; bit < w.length; bit++) {
          var off = bit / 26 | 0;
          var wbit = bit % 26;
          w[bit] = num.words[off] >>> wbit & 1;
        }
        return w;
      }
      BN2.prototype.zeroBits = function zeroBits() {
        if (this.isZero()) return 0;
        var r = 0;
        for (var i = 0; i < this.length; i++) {
          var b = this._zeroBits(this.words[i]);
          r += b;
          if (b !== 26) break;
        }
        return r;
      };
      BN2.prototype.byteLength = function byteLength() {
        return Math.ceil(this.bitLength() / 8);
      };
      BN2.prototype.toTwos = function toTwos(width) {
        if (this.negative !== 0) {
          return this.abs().inotn(width).iaddn(1);
        }
        return this.clone();
      };
      BN2.prototype.fromTwos = function fromTwos(width) {
        if (this.testn(width - 1)) {
          return this.notn(width).iaddn(1).ineg();
        }
        return this.clone();
      };
      BN2.prototype.isNeg = function isNeg() {
        return this.negative !== 0;
      };
      BN2.prototype.neg = function neg() {
        return this.clone().ineg();
      };
      BN2.prototype.ineg = function ineg() {
        if (!this.isZero()) {
          this.negative ^= 1;
        }
        return this;
      };
      BN2.prototype.iuor = function iuor(num) {
        while (this.length < num.length) {
          this.words[this.length++] = 0;
        }
        for (var i = 0; i < num.length; i++) {
          this.words[i] = this.words[i] | num.words[i];
        }
        return this._strip();
      };
      BN2.prototype.ior = function ior(num) {
        assert2((this.negative | num.negative) === 0);
        return this.iuor(num);
      };
      BN2.prototype.or = function or(num) {
        if (this.length > num.length) return this.clone().ior(num);
        return num.clone().ior(this);
      };
      BN2.prototype.uor = function uor(num) {
        if (this.length > num.length) return this.clone().iuor(num);
        return num.clone().iuor(this);
      };
      BN2.prototype.iuand = function iuand(num) {
        var b;
        if (this.length > num.length) {
          b = num;
        } else {
          b = this;
        }
        for (var i = 0; i < b.length; i++) {
          this.words[i] = this.words[i] & num.words[i];
        }
        this.length = b.length;
        return this._strip();
      };
      BN2.prototype.iand = function iand(num) {
        assert2((this.negative | num.negative) === 0);
        return this.iuand(num);
      };
      BN2.prototype.and = function and(num) {
        if (this.length > num.length) return this.clone().iand(num);
        return num.clone().iand(this);
      };
      BN2.prototype.uand = function uand(num) {
        if (this.length > num.length) return this.clone().iuand(num);
        return num.clone().iuand(this);
      };
      BN2.prototype.iuxor = function iuxor(num) {
        var a;
        var b;
        if (this.length > num.length) {
          a = this;
          b = num;
        } else {
          a = num;
          b = this;
        }
        for (var i = 0; i < b.length; i++) {
          this.words[i] = a.words[i] ^ b.words[i];
        }
        if (this !== a) {
          for (; i < a.length; i++) {
            this.words[i] = a.words[i];
          }
        }
        this.length = a.length;
        return this._strip();
      };
      BN2.prototype.ixor = function ixor(num) {
        assert2((this.negative | num.negative) === 0);
        return this.iuxor(num);
      };
      BN2.prototype.xor = function xor(num) {
        if (this.length > num.length) return this.clone().ixor(num);
        return num.clone().ixor(this);
      };
      BN2.prototype.uxor = function uxor(num) {
        if (this.length > num.length) return this.clone().iuxor(num);
        return num.clone().iuxor(this);
      };
      BN2.prototype.inotn = function inotn(width) {
        assert2(typeof width === "number" && width >= 0);
        var bytesNeeded = Math.ceil(width / 26) | 0;
        var bitsLeft = width % 26;
        this._expand(bytesNeeded);
        if (bitsLeft > 0) {
          bytesNeeded--;
        }
        for (var i = 0; i < bytesNeeded; i++) {
          this.words[i] = ~this.words[i] & 67108863;
        }
        if (bitsLeft > 0) {
          this.words[i] = ~this.words[i] & 67108863 >> 26 - bitsLeft;
        }
        return this._strip();
      };
      BN2.prototype.notn = function notn(width) {
        return this.clone().inotn(width);
      };
      BN2.prototype.setn = function setn(bit, val) {
        assert2(typeof bit === "number" && bit >= 0);
        var off = bit / 26 | 0;
        var wbit = bit % 26;
        this._expand(off + 1);
        if (val) {
          this.words[off] = this.words[off] | 1 << wbit;
        } else {
          this.words[off] = this.words[off] & ~(1 << wbit);
        }
        return this._strip();
      };
      BN2.prototype.iadd = function iadd(num) {
        var r;
        if (this.negative !== 0 && num.negative === 0) {
          this.negative = 0;
          r = this.isub(num);
          this.negative ^= 1;
          return this._normSign();
        } else if (this.negative === 0 && num.negative !== 0) {
          num.negative = 0;
          r = this.isub(num);
          num.negative = 1;
          return r._normSign();
        }
        var a, b;
        if (this.length > num.length) {
          a = this;
          b = num;
        } else {
          a = num;
          b = this;
        }
        var carry = 0;
        for (var i = 0; i < b.length; i++) {
          r = (a.words[i] | 0) + (b.words[i] | 0) + carry;
          this.words[i] = r & 67108863;
          carry = r >>> 26;
        }
        for (; carry !== 0 && i < a.length; i++) {
          r = (a.words[i] | 0) + carry;
          this.words[i] = r & 67108863;
          carry = r >>> 26;
        }
        this.length = a.length;
        if (carry !== 0) {
          this.words[this.length] = carry;
          this.length++;
        } else if (a !== this) {
          for (; i < a.length; i++) {
            this.words[i] = a.words[i];
          }
        }
        return this;
      };
      BN2.prototype.add = function add2(num) {
        var res;
        if (num.negative !== 0 && this.negative === 0) {
          num.negative = 0;
          res = this.sub(num);
          num.negative ^= 1;
          return res;
        } else if (num.negative === 0 && this.negative !== 0) {
          this.negative = 0;
          res = num.sub(this);
          this.negative = 1;
          return res;
        }
        if (this.length > num.length) return this.clone().iadd(num);
        return num.clone().iadd(this);
      };
      BN2.prototype.isub = function isub(num) {
        if (num.negative !== 0) {
          num.negative = 0;
          var r = this.iadd(num);
          num.negative = 1;
          return r._normSign();
        } else if (this.negative !== 0) {
          this.negative = 0;
          this.iadd(num);
          this.negative = 1;
          return this._normSign();
        }
        var cmp = this.cmp(num);
        if (cmp === 0) {
          this.negative = 0;
          this.length = 1;
          this.words[0] = 0;
          return this;
        }
        var a, b;
        if (cmp > 0) {
          a = this;
          b = num;
        } else {
          a = num;
          b = this;
        }
        var carry = 0;
        for (var i = 0; i < b.length; i++) {
          r = (a.words[i] | 0) - (b.words[i] | 0) + carry;
          carry = r >> 26;
          this.words[i] = r & 67108863;
        }
        for (; carry !== 0 && i < a.length; i++) {
          r = (a.words[i] | 0) + carry;
          carry = r >> 26;
          this.words[i] = r & 67108863;
        }
        if (carry === 0 && i < a.length && a !== this) {
          for (; i < a.length; i++) {
            this.words[i] = a.words[i];
          }
        }
        this.length = Math.max(this.length, i);
        if (a !== this) {
          this.negative = 1;
        }
        return this._strip();
      };
      BN2.prototype.sub = function sub(num) {
        return this.clone().isub(num);
      };
      function smallMulTo(self2, num, out) {
        out.negative = num.negative ^ self2.negative;
        var len = self2.length + num.length | 0;
        out.length = len;
        len = len - 1 | 0;
        var a = self2.words[0] | 0;
        var b = num.words[0] | 0;
        var r = a * b;
        var lo = r & 67108863;
        var carry = r / 67108864 | 0;
        out.words[0] = lo;
        for (var k = 1; k < len; k++) {
          var ncarry = carry >>> 26;
          var rword = carry & 67108863;
          var maxJ = Math.min(k, num.length - 1);
          for (var j = Math.max(0, k - self2.length + 1); j <= maxJ; j++) {
            var i = k - j | 0;
            a = self2.words[i] | 0;
            b = num.words[j] | 0;
            r = a * b + rword;
            ncarry += r / 67108864 | 0;
            rword = r & 67108863;
          }
          out.words[k] = rword | 0;
          carry = ncarry | 0;
        }
        if (carry !== 0) {
          out.words[k] = carry | 0;
        } else {
          out.length--;
        }
        return out._strip();
      }
      var comb10MulTo = function comb10MulTo2(self2, num, out) {
        var a = self2.words;
        var b = num.words;
        var o = out.words;
        var c = 0;
        var lo;
        var mid;
        var hi;
        var a0 = a[0] | 0;
        var al0 = a0 & 8191;
        var ah0 = a0 >>> 13;
        var a1 = a[1] | 0;
        var al1 = a1 & 8191;
        var ah1 = a1 >>> 13;
        var a2 = a[2] | 0;
        var al2 = a2 & 8191;
        var ah2 = a2 >>> 13;
        var a3 = a[3] | 0;
        var al3 = a3 & 8191;
        var ah3 = a3 >>> 13;
        var a4 = a[4] | 0;
        var al4 = a4 & 8191;
        var ah4 = a4 >>> 13;
        var a5 = a[5] | 0;
        var al5 = a5 & 8191;
        var ah5 = a5 >>> 13;
        var a6 = a[6] | 0;
        var al6 = a6 & 8191;
        var ah6 = a6 >>> 13;
        var a7 = a[7] | 0;
        var al7 = a7 & 8191;
        var ah7 = a7 >>> 13;
        var a8 = a[8] | 0;
        var al8 = a8 & 8191;
        var ah8 = a8 >>> 13;
        var a9 = a[9] | 0;
        var al9 = a9 & 8191;
        var ah9 = a9 >>> 13;
        var b0 = b[0] | 0;
        var bl0 = b0 & 8191;
        var bh0 = b0 >>> 13;
        var b1 = b[1] | 0;
        var bl1 = b1 & 8191;
        var bh1 = b1 >>> 13;
        var b2 = b[2] | 0;
        var bl2 = b2 & 8191;
        var bh2 = b2 >>> 13;
        var b3 = b[3] | 0;
        var bl3 = b3 & 8191;
        var bh3 = b3 >>> 13;
        var b4 = b[4] | 0;
        var bl4 = b4 & 8191;
        var bh4 = b4 >>> 13;
        var b5 = b[5] | 0;
        var bl5 = b5 & 8191;
        var bh5 = b5 >>> 13;
        var b6 = b[6] | 0;
        var bl6 = b6 & 8191;
        var bh6 = b6 >>> 13;
        var b7 = b[7] | 0;
        var bl7 = b7 & 8191;
        var bh7 = b7 >>> 13;
        var b8 = b[8] | 0;
        var bl8 = b8 & 8191;
        var bh8 = b8 >>> 13;
        var b9 = b[9] | 0;
        var bl9 = b9 & 8191;
        var bh9 = b9 >>> 13;
        out.negative = self2.negative ^ num.negative;
        out.length = 19;
        lo = Math.imul(al0, bl0);
        mid = Math.imul(al0, bh0);
        mid = mid + Math.imul(ah0, bl0) | 0;
        hi = Math.imul(ah0, bh0);
        var w0 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w0 >>> 26) | 0;
        w0 &= 67108863;
        lo = Math.imul(al1, bl0);
        mid = Math.imul(al1, bh0);
        mid = mid + Math.imul(ah1, bl0) | 0;
        hi = Math.imul(ah1, bh0);
        lo = lo + Math.imul(al0, bl1) | 0;
        mid = mid + Math.imul(al0, bh1) | 0;
        mid = mid + Math.imul(ah0, bl1) | 0;
        hi = hi + Math.imul(ah0, bh1) | 0;
        var w1 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w1 >>> 26) | 0;
        w1 &= 67108863;
        lo = Math.imul(al2, bl0);
        mid = Math.imul(al2, bh0);
        mid = mid + Math.imul(ah2, bl0) | 0;
        hi = Math.imul(ah2, bh0);
        lo = lo + Math.imul(al1, bl1) | 0;
        mid = mid + Math.imul(al1, bh1) | 0;
        mid = mid + Math.imul(ah1, bl1) | 0;
        hi = hi + Math.imul(ah1, bh1) | 0;
        lo = lo + Math.imul(al0, bl2) | 0;
        mid = mid + Math.imul(al0, bh2) | 0;
        mid = mid + Math.imul(ah0, bl2) | 0;
        hi = hi + Math.imul(ah0, bh2) | 0;
        var w2 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w2 >>> 26) | 0;
        w2 &= 67108863;
        lo = Math.imul(al3, bl0);
        mid = Math.imul(al3, bh0);
        mid = mid + Math.imul(ah3, bl0) | 0;
        hi = Math.imul(ah3, bh0);
        lo = lo + Math.imul(al2, bl1) | 0;
        mid = mid + Math.imul(al2, bh1) | 0;
        mid = mid + Math.imul(ah2, bl1) | 0;
        hi = hi + Math.imul(ah2, bh1) | 0;
        lo = lo + Math.imul(al1, bl2) | 0;
        mid = mid + Math.imul(al1, bh2) | 0;
        mid = mid + Math.imul(ah1, bl2) | 0;
        hi = hi + Math.imul(ah1, bh2) | 0;
        lo = lo + Math.imul(al0, bl3) | 0;
        mid = mid + Math.imul(al0, bh3) | 0;
        mid = mid + Math.imul(ah0, bl3) | 0;
        hi = hi + Math.imul(ah0, bh3) | 0;
        var w3 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w3 >>> 26) | 0;
        w3 &= 67108863;
        lo = Math.imul(al4, bl0);
        mid = Math.imul(al4, bh0);
        mid = mid + Math.imul(ah4, bl0) | 0;
        hi = Math.imul(ah4, bh0);
        lo = lo + Math.imul(al3, bl1) | 0;
        mid = mid + Math.imul(al3, bh1) | 0;
        mid = mid + Math.imul(ah3, bl1) | 0;
        hi = hi + Math.imul(ah3, bh1) | 0;
        lo = lo + Math.imul(al2, bl2) | 0;
        mid = mid + Math.imul(al2, bh2) | 0;
        mid = mid + Math.imul(ah2, bl2) | 0;
        hi = hi + Math.imul(ah2, bh2) | 0;
        lo = lo + Math.imul(al1, bl3) | 0;
        mid = mid + Math.imul(al1, bh3) | 0;
        mid = mid + Math.imul(ah1, bl3) | 0;
        hi = hi + Math.imul(ah1, bh3) | 0;
        lo = lo + Math.imul(al0, bl4) | 0;
        mid = mid + Math.imul(al0, bh4) | 0;
        mid = mid + Math.imul(ah0, bl4) | 0;
        hi = hi + Math.imul(ah0, bh4) | 0;
        var w4 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w4 >>> 26) | 0;
        w4 &= 67108863;
        lo = Math.imul(al5, bl0);
        mid = Math.imul(al5, bh0);
        mid = mid + Math.imul(ah5, bl0) | 0;
        hi = Math.imul(ah5, bh0);
        lo = lo + Math.imul(al4, bl1) | 0;
        mid = mid + Math.imul(al4, bh1) | 0;
        mid = mid + Math.imul(ah4, bl1) | 0;
        hi = hi + Math.imul(ah4, bh1) | 0;
        lo = lo + Math.imul(al3, bl2) | 0;
        mid = mid + Math.imul(al3, bh2) | 0;
        mid = mid + Math.imul(ah3, bl2) | 0;
        hi = hi + Math.imul(ah3, bh2) | 0;
        lo = lo + Math.imul(al2, bl3) | 0;
        mid = mid + Math.imul(al2, bh3) | 0;
        mid = mid + Math.imul(ah2, bl3) | 0;
        hi = hi + Math.imul(ah2, bh3) | 0;
        lo = lo + Math.imul(al1, bl4) | 0;
        mid = mid + Math.imul(al1, bh4) | 0;
        mid = mid + Math.imul(ah1, bl4) | 0;
        hi = hi + Math.imul(ah1, bh4) | 0;
        lo = lo + Math.imul(al0, bl5) | 0;
        mid = mid + Math.imul(al0, bh5) | 0;
        mid = mid + Math.imul(ah0, bl5) | 0;
        hi = hi + Math.imul(ah0, bh5) | 0;
        var w5 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w5 >>> 26) | 0;
        w5 &= 67108863;
        lo = Math.imul(al6, bl0);
        mid = Math.imul(al6, bh0);
        mid = mid + Math.imul(ah6, bl0) | 0;
        hi = Math.imul(ah6, bh0);
        lo = lo + Math.imul(al5, bl1) | 0;
        mid = mid + Math.imul(al5, bh1) | 0;
        mid = mid + Math.imul(ah5, bl1) | 0;
        hi = hi + Math.imul(ah5, bh1) | 0;
        lo = lo + Math.imul(al4, bl2) | 0;
        mid = mid + Math.imul(al4, bh2) | 0;
        mid = mid + Math.imul(ah4, bl2) | 0;
        hi = hi + Math.imul(ah4, bh2) | 0;
        lo = lo + Math.imul(al3, bl3) | 0;
        mid = mid + Math.imul(al3, bh3) | 0;
        mid = mid + Math.imul(ah3, bl3) | 0;
        hi = hi + Math.imul(ah3, bh3) | 0;
        lo = lo + Math.imul(al2, bl4) | 0;
        mid = mid + Math.imul(al2, bh4) | 0;
        mid = mid + Math.imul(ah2, bl4) | 0;
        hi = hi + Math.imul(ah2, bh4) | 0;
        lo = lo + Math.imul(al1, bl5) | 0;
        mid = mid + Math.imul(al1, bh5) | 0;
        mid = mid + Math.imul(ah1, bl5) | 0;
        hi = hi + Math.imul(ah1, bh5) | 0;
        lo = lo + Math.imul(al0, bl6) | 0;
        mid = mid + Math.imul(al0, bh6) | 0;
        mid = mid + Math.imul(ah0, bl6) | 0;
        hi = hi + Math.imul(ah0, bh6) | 0;
        var w6 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w6 >>> 26) | 0;
        w6 &= 67108863;
        lo = Math.imul(al7, bl0);
        mid = Math.imul(al7, bh0);
        mid = mid + Math.imul(ah7, bl0) | 0;
        hi = Math.imul(ah7, bh0);
        lo = lo + Math.imul(al6, bl1) | 0;
        mid = mid + Math.imul(al6, bh1) | 0;
        mid = mid + Math.imul(ah6, bl1) | 0;
        hi = hi + Math.imul(ah6, bh1) | 0;
        lo = lo + Math.imul(al5, bl2) | 0;
        mid = mid + Math.imul(al5, bh2) | 0;
        mid = mid + Math.imul(ah5, bl2) | 0;
        hi = hi + Math.imul(ah5, bh2) | 0;
        lo = lo + Math.imul(al4, bl3) | 0;
        mid = mid + Math.imul(al4, bh3) | 0;
        mid = mid + Math.imul(ah4, bl3) | 0;
        hi = hi + Math.imul(ah4, bh3) | 0;
        lo = lo + Math.imul(al3, bl4) | 0;
        mid = mid + Math.imul(al3, bh4) | 0;
        mid = mid + Math.imul(ah3, bl4) | 0;
        hi = hi + Math.imul(ah3, bh4) | 0;
        lo = lo + Math.imul(al2, bl5) | 0;
        mid = mid + Math.imul(al2, bh5) | 0;
        mid = mid + Math.imul(ah2, bl5) | 0;
        hi = hi + Math.imul(ah2, bh5) | 0;
        lo = lo + Math.imul(al1, bl6) | 0;
        mid = mid + Math.imul(al1, bh6) | 0;
        mid = mid + Math.imul(ah1, bl6) | 0;
        hi = hi + Math.imul(ah1, bh6) | 0;
        lo = lo + Math.imul(al0, bl7) | 0;
        mid = mid + Math.imul(al0, bh7) | 0;
        mid = mid + Math.imul(ah0, bl7) | 0;
        hi = hi + Math.imul(ah0, bh7) | 0;
        var w7 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w7 >>> 26) | 0;
        w7 &= 67108863;
        lo = Math.imul(al8, bl0);
        mid = Math.imul(al8, bh0);
        mid = mid + Math.imul(ah8, bl0) | 0;
        hi = Math.imul(ah8, bh0);
        lo = lo + Math.imul(al7, bl1) | 0;
        mid = mid + Math.imul(al7, bh1) | 0;
        mid = mid + Math.imul(ah7, bl1) | 0;
        hi = hi + Math.imul(ah7, bh1) | 0;
        lo = lo + Math.imul(al6, bl2) | 0;
        mid = mid + Math.imul(al6, bh2) | 0;
        mid = mid + Math.imul(ah6, bl2) | 0;
        hi = hi + Math.imul(ah6, bh2) | 0;
        lo = lo + Math.imul(al5, bl3) | 0;
        mid = mid + Math.imul(al5, bh3) | 0;
        mid = mid + Math.imul(ah5, bl3) | 0;
        hi = hi + Math.imul(ah5, bh3) | 0;
        lo = lo + Math.imul(al4, bl4) | 0;
        mid = mid + Math.imul(al4, bh4) | 0;
        mid = mid + Math.imul(ah4, bl4) | 0;
        hi = hi + Math.imul(ah4, bh4) | 0;
        lo = lo + Math.imul(al3, bl5) | 0;
        mid = mid + Math.imul(al3, bh5) | 0;
        mid = mid + Math.imul(ah3, bl5) | 0;
        hi = hi + Math.imul(ah3, bh5) | 0;
        lo = lo + Math.imul(al2, bl6) | 0;
        mid = mid + Math.imul(al2, bh6) | 0;
        mid = mid + Math.imul(ah2, bl6) | 0;
        hi = hi + Math.imul(ah2, bh6) | 0;
        lo = lo + Math.imul(al1, bl7) | 0;
        mid = mid + Math.imul(al1, bh7) | 0;
        mid = mid + Math.imul(ah1, bl7) | 0;
        hi = hi + Math.imul(ah1, bh7) | 0;
        lo = lo + Math.imul(al0, bl8) | 0;
        mid = mid + Math.imul(al0, bh8) | 0;
        mid = mid + Math.imul(ah0, bl8) | 0;
        hi = hi + Math.imul(ah0, bh8) | 0;
        var w8 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w8 >>> 26) | 0;
        w8 &= 67108863;
        lo = Math.imul(al9, bl0);
        mid = Math.imul(al9, bh0);
        mid = mid + Math.imul(ah9, bl0) | 0;
        hi = Math.imul(ah9, bh0);
        lo = lo + Math.imul(al8, bl1) | 0;
        mid = mid + Math.imul(al8, bh1) | 0;
        mid = mid + Math.imul(ah8, bl1) | 0;
        hi = hi + Math.imul(ah8, bh1) | 0;
        lo = lo + Math.imul(al7, bl2) | 0;
        mid = mid + Math.imul(al7, bh2) | 0;
        mid = mid + Math.imul(ah7, bl2) | 0;
        hi = hi + Math.imul(ah7, bh2) | 0;
        lo = lo + Math.imul(al6, bl3) | 0;
        mid = mid + Math.imul(al6, bh3) | 0;
        mid = mid + Math.imul(ah6, bl3) | 0;
        hi = hi + Math.imul(ah6, bh3) | 0;
        lo = lo + Math.imul(al5, bl4) | 0;
        mid = mid + Math.imul(al5, bh4) | 0;
        mid = mid + Math.imul(ah5, bl4) | 0;
        hi = hi + Math.imul(ah5, bh4) | 0;
        lo = lo + Math.imul(al4, bl5) | 0;
        mid = mid + Math.imul(al4, bh5) | 0;
        mid = mid + Math.imul(ah4, bl5) | 0;
        hi = hi + Math.imul(ah4, bh5) | 0;
        lo = lo + Math.imul(al3, bl6) | 0;
        mid = mid + Math.imul(al3, bh6) | 0;
        mid = mid + Math.imul(ah3, bl6) | 0;
        hi = hi + Math.imul(ah3, bh6) | 0;
        lo = lo + Math.imul(al2, bl7) | 0;
        mid = mid + Math.imul(al2, bh7) | 0;
        mid = mid + Math.imul(ah2, bl7) | 0;
        hi = hi + Math.imul(ah2, bh7) | 0;
        lo = lo + Math.imul(al1, bl8) | 0;
        mid = mid + Math.imul(al1, bh8) | 0;
        mid = mid + Math.imul(ah1, bl8) | 0;
        hi = hi + Math.imul(ah1, bh8) | 0;
        lo = lo + Math.imul(al0, bl9) | 0;
        mid = mid + Math.imul(al0, bh9) | 0;
        mid = mid + Math.imul(ah0, bl9) | 0;
        hi = hi + Math.imul(ah0, bh9) | 0;
        var w9 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w9 >>> 26) | 0;
        w9 &= 67108863;
        lo = Math.imul(al9, bl1);
        mid = Math.imul(al9, bh1);
        mid = mid + Math.imul(ah9, bl1) | 0;
        hi = Math.imul(ah9, bh1);
        lo = lo + Math.imul(al8, bl2) | 0;
        mid = mid + Math.imul(al8, bh2) | 0;
        mid = mid + Math.imul(ah8, bl2) | 0;
        hi = hi + Math.imul(ah8, bh2) | 0;
        lo = lo + Math.imul(al7, bl3) | 0;
        mid = mid + Math.imul(al7, bh3) | 0;
        mid = mid + Math.imul(ah7, bl3) | 0;
        hi = hi + Math.imul(ah7, bh3) | 0;
        lo = lo + Math.imul(al6, bl4) | 0;
        mid = mid + Math.imul(al6, bh4) | 0;
        mid = mid + Math.imul(ah6, bl4) | 0;
        hi = hi + Math.imul(ah6, bh4) | 0;
        lo = lo + Math.imul(al5, bl5) | 0;
        mid = mid + Math.imul(al5, bh5) | 0;
        mid = mid + Math.imul(ah5, bl5) | 0;
        hi = hi + Math.imul(ah5, bh5) | 0;
        lo = lo + Math.imul(al4, bl6) | 0;
        mid = mid + Math.imul(al4, bh6) | 0;
        mid = mid + Math.imul(ah4, bl6) | 0;
        hi = hi + Math.imul(ah4, bh6) | 0;
        lo = lo + Math.imul(al3, bl7) | 0;
        mid = mid + Math.imul(al3, bh7) | 0;
        mid = mid + Math.imul(ah3, bl7) | 0;
        hi = hi + Math.imul(ah3, bh7) | 0;
        lo = lo + Math.imul(al2, bl8) | 0;
        mid = mid + Math.imul(al2, bh8) | 0;
        mid = mid + Math.imul(ah2, bl8) | 0;
        hi = hi + Math.imul(ah2, bh8) | 0;
        lo = lo + Math.imul(al1, bl9) | 0;
        mid = mid + Math.imul(al1, bh9) | 0;
        mid = mid + Math.imul(ah1, bl9) | 0;
        hi = hi + Math.imul(ah1, bh9) | 0;
        var w10 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w10 >>> 26) | 0;
        w10 &= 67108863;
        lo = Math.imul(al9, bl2);
        mid = Math.imul(al9, bh2);
        mid = mid + Math.imul(ah9, bl2) | 0;
        hi = Math.imul(ah9, bh2);
        lo = lo + Math.imul(al8, bl3) | 0;
        mid = mid + Math.imul(al8, bh3) | 0;
        mid = mid + Math.imul(ah8, bl3) | 0;
        hi = hi + Math.imul(ah8, bh3) | 0;
        lo = lo + Math.imul(al7, bl4) | 0;
        mid = mid + Math.imul(al7, bh4) | 0;
        mid = mid + Math.imul(ah7, bl4) | 0;
        hi = hi + Math.imul(ah7, bh4) | 0;
        lo = lo + Math.imul(al6, bl5) | 0;
        mid = mid + Math.imul(al6, bh5) | 0;
        mid = mid + Math.imul(ah6, bl5) | 0;
        hi = hi + Math.imul(ah6, bh5) | 0;
        lo = lo + Math.imul(al5, bl6) | 0;
        mid = mid + Math.imul(al5, bh6) | 0;
        mid = mid + Math.imul(ah5, bl6) | 0;
        hi = hi + Math.imul(ah5, bh6) | 0;
        lo = lo + Math.imul(al4, bl7) | 0;
        mid = mid + Math.imul(al4, bh7) | 0;
        mid = mid + Math.imul(ah4, bl7) | 0;
        hi = hi + Math.imul(ah4, bh7) | 0;
        lo = lo + Math.imul(al3, bl8) | 0;
        mid = mid + Math.imul(al3, bh8) | 0;
        mid = mid + Math.imul(ah3, bl8) | 0;
        hi = hi + Math.imul(ah3, bh8) | 0;
        lo = lo + Math.imul(al2, bl9) | 0;
        mid = mid + Math.imul(al2, bh9) | 0;
        mid = mid + Math.imul(ah2, bl9) | 0;
        hi = hi + Math.imul(ah2, bh9) | 0;
        var w11 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w11 >>> 26) | 0;
        w11 &= 67108863;
        lo = Math.imul(al9, bl3);
        mid = Math.imul(al9, bh3);
        mid = mid + Math.imul(ah9, bl3) | 0;
        hi = Math.imul(ah9, bh3);
        lo = lo + Math.imul(al8, bl4) | 0;
        mid = mid + Math.imul(al8, bh4) | 0;
        mid = mid + Math.imul(ah8, bl4) | 0;
        hi = hi + Math.imul(ah8, bh4) | 0;
        lo = lo + Math.imul(al7, bl5) | 0;
        mid = mid + Math.imul(al7, bh5) | 0;
        mid = mid + Math.imul(ah7, bl5) | 0;
        hi = hi + Math.imul(ah7, bh5) | 0;
        lo = lo + Math.imul(al6, bl6) | 0;
        mid = mid + Math.imul(al6, bh6) | 0;
        mid = mid + Math.imul(ah6, bl6) | 0;
        hi = hi + Math.imul(ah6, bh6) | 0;
        lo = lo + Math.imul(al5, bl7) | 0;
        mid = mid + Math.imul(al5, bh7) | 0;
        mid = mid + Math.imul(ah5, bl7) | 0;
        hi = hi + Math.imul(ah5, bh7) | 0;
        lo = lo + Math.imul(al4, bl8) | 0;
        mid = mid + Math.imul(al4, bh8) | 0;
        mid = mid + Math.imul(ah4, bl8) | 0;
        hi = hi + Math.imul(ah4, bh8) | 0;
        lo = lo + Math.imul(al3, bl9) | 0;
        mid = mid + Math.imul(al3, bh9) | 0;
        mid = mid + Math.imul(ah3, bl9) | 0;
        hi = hi + Math.imul(ah3, bh9) | 0;
        var w12 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w12 >>> 26) | 0;
        w12 &= 67108863;
        lo = Math.imul(al9, bl4);
        mid = Math.imul(al9, bh4);
        mid = mid + Math.imul(ah9, bl4) | 0;
        hi = Math.imul(ah9, bh4);
        lo = lo + Math.imul(al8, bl5) | 0;
        mid = mid + Math.imul(al8, bh5) | 0;
        mid = mid + Math.imul(ah8, bl5) | 0;
        hi = hi + Math.imul(ah8, bh5) | 0;
        lo = lo + Math.imul(al7, bl6) | 0;
        mid = mid + Math.imul(al7, bh6) | 0;
        mid = mid + Math.imul(ah7, bl6) | 0;
        hi = hi + Math.imul(ah7, bh6) | 0;
        lo = lo + Math.imul(al6, bl7) | 0;
        mid = mid + Math.imul(al6, bh7) | 0;
        mid = mid + Math.imul(ah6, bl7) | 0;
        hi = hi + Math.imul(ah6, bh7) | 0;
        lo = lo + Math.imul(al5, bl8) | 0;
        mid = mid + Math.imul(al5, bh8) | 0;
        mid = mid + Math.imul(ah5, bl8) | 0;
        hi = hi + Math.imul(ah5, bh8) | 0;
        lo = lo + Math.imul(al4, bl9) | 0;
        mid = mid + Math.imul(al4, bh9) | 0;
        mid = mid + Math.imul(ah4, bl9) | 0;
        hi = hi + Math.imul(ah4, bh9) | 0;
        var w13 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w13 >>> 26) | 0;
        w13 &= 67108863;
        lo = Math.imul(al9, bl5);
        mid = Math.imul(al9, bh5);
        mid = mid + Math.imul(ah9, bl5) | 0;
        hi = Math.imul(ah9, bh5);
        lo = lo + Math.imul(al8, bl6) | 0;
        mid = mid + Math.imul(al8, bh6) | 0;
        mid = mid + Math.imul(ah8, bl6) | 0;
        hi = hi + Math.imul(ah8, bh6) | 0;
        lo = lo + Math.imul(al7, bl7) | 0;
        mid = mid + Math.imul(al7, bh7) | 0;
        mid = mid + Math.imul(ah7, bl7) | 0;
        hi = hi + Math.imul(ah7, bh7) | 0;
        lo = lo + Math.imul(al6, bl8) | 0;
        mid = mid + Math.imul(al6, bh8) | 0;
        mid = mid + Math.imul(ah6, bl8) | 0;
        hi = hi + Math.imul(ah6, bh8) | 0;
        lo = lo + Math.imul(al5, bl9) | 0;
        mid = mid + Math.imul(al5, bh9) | 0;
        mid = mid + Math.imul(ah5, bl9) | 0;
        hi = hi + Math.imul(ah5, bh9) | 0;
        var w14 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w14 >>> 26) | 0;
        w14 &= 67108863;
        lo = Math.imul(al9, bl6);
        mid = Math.imul(al9, bh6);
        mid = mid + Math.imul(ah9, bl6) | 0;
        hi = Math.imul(ah9, bh6);
        lo = lo + Math.imul(al8, bl7) | 0;
        mid = mid + Math.imul(al8, bh7) | 0;
        mid = mid + Math.imul(ah8, bl7) | 0;
        hi = hi + Math.imul(ah8, bh7) | 0;
        lo = lo + Math.imul(al7, bl8) | 0;
        mid = mid + Math.imul(al7, bh8) | 0;
        mid = mid + Math.imul(ah7, bl8) | 0;
        hi = hi + Math.imul(ah7, bh8) | 0;
        lo = lo + Math.imul(al6, bl9) | 0;
        mid = mid + Math.imul(al6, bh9) | 0;
        mid = mid + Math.imul(ah6, bl9) | 0;
        hi = hi + Math.imul(ah6, bh9) | 0;
        var w15 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w15 >>> 26) | 0;
        w15 &= 67108863;
        lo = Math.imul(al9, bl7);
        mid = Math.imul(al9, bh7);
        mid = mid + Math.imul(ah9, bl7) | 0;
        hi = Math.imul(ah9, bh7);
        lo = lo + Math.imul(al8, bl8) | 0;
        mid = mid + Math.imul(al8, bh8) | 0;
        mid = mid + Math.imul(ah8, bl8) | 0;
        hi = hi + Math.imul(ah8, bh8) | 0;
        lo = lo + Math.imul(al7, bl9) | 0;
        mid = mid + Math.imul(al7, bh9) | 0;
        mid = mid + Math.imul(ah7, bl9) | 0;
        hi = hi + Math.imul(ah7, bh9) | 0;
        var w16 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w16 >>> 26) | 0;
        w16 &= 67108863;
        lo = Math.imul(al9, bl8);
        mid = Math.imul(al9, bh8);
        mid = mid + Math.imul(ah9, bl8) | 0;
        hi = Math.imul(ah9, bh8);
        lo = lo + Math.imul(al8, bl9) | 0;
        mid = mid + Math.imul(al8, bh9) | 0;
        mid = mid + Math.imul(ah8, bl9) | 0;
        hi = hi + Math.imul(ah8, bh9) | 0;
        var w17 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w17 >>> 26) | 0;
        w17 &= 67108863;
        lo = Math.imul(al9, bl9);
        mid = Math.imul(al9, bh9);
        mid = mid + Math.imul(ah9, bl9) | 0;
        hi = Math.imul(ah9, bh9);
        var w18 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w18 >>> 26) | 0;
        w18 &= 67108863;
        o[0] = w0;
        o[1] = w1;
        o[2] = w2;
        o[3] = w3;
        o[4] = w4;
        o[5] = w5;
        o[6] = w6;
        o[7] = w7;
        o[8] = w8;
        o[9] = w9;
        o[10] = w10;
        o[11] = w11;
        o[12] = w12;
        o[13] = w13;
        o[14] = w14;
        o[15] = w15;
        o[16] = w16;
        o[17] = w17;
        o[18] = w18;
        if (c !== 0) {
          o[19] = c;
          out.length++;
        }
        return out;
      };
      if (!Math.imul) {
        comb10MulTo = smallMulTo;
      }
      function bigMulTo(self2, num, out) {
        out.negative = num.negative ^ self2.negative;
        out.length = self2.length + num.length;
        var carry = 0;
        var hncarry = 0;
        for (var k = 0; k < out.length - 1; k++) {
          var ncarry = hncarry;
          hncarry = 0;
          var rword = carry & 67108863;
          var maxJ = Math.min(k, num.length - 1);
          for (var j = Math.max(0, k - self2.length + 1); j <= maxJ; j++) {
            var i = k - j;
            var a = self2.words[i] | 0;
            var b = num.words[j] | 0;
            var r = a * b;
            var lo = r & 67108863;
            ncarry = ncarry + (r / 67108864 | 0) | 0;
            lo = lo + rword | 0;
            rword = lo & 67108863;
            ncarry = ncarry + (lo >>> 26) | 0;
            hncarry += ncarry >>> 26;
            ncarry &= 67108863;
          }
          out.words[k] = rword;
          carry = ncarry;
          ncarry = hncarry;
        }
        if (carry !== 0) {
          out.words[k] = carry;
        } else {
          out.length--;
        }
        return out._strip();
      }
      function jumboMulTo(self2, num, out) {
        return bigMulTo(self2, num, out);
      }
      BN2.prototype.mulTo = function mulTo(num, out) {
        var res;
        var len = this.length + num.length;
        if (this.length === 10 && num.length === 10) {
          res = comb10MulTo(this, num, out);
        } else if (len < 63) {
          res = smallMulTo(this, num, out);
        } else if (len < 1024) {
          res = bigMulTo(this, num, out);
        } else {
          res = jumboMulTo(this, num, out);
        }
        return res;
      };
      function FFTM(x, y) {
        this.x = x;
        this.y = y;
      }
      FFTM.prototype.makeRBT = function makeRBT(N) {
        var t = new Array(N);
        var l = BN2.prototype._countBits(N) - 1;
        for (var i = 0; i < N; i++) {
          t[i] = this.revBin(i, l, N);
        }
        return t;
      };
      FFTM.prototype.revBin = function revBin(x, l, N) {
        if (x === 0 || x === N - 1) return x;
        var rb = 0;
        for (var i = 0; i < l; i++) {
          rb |= (x & 1) << l - i - 1;
          x >>= 1;
        }
        return rb;
      };
      FFTM.prototype.permute = function permute(rbt, rws, iws, rtws, itws, N) {
        for (var i = 0; i < N; i++) {
          rtws[i] = rws[rbt[i]];
          itws[i] = iws[rbt[i]];
        }
      };
      FFTM.prototype.transform = function transform(rws, iws, rtws, itws, N, rbt) {
        this.permute(rbt, rws, iws, rtws, itws, N);
        for (var s = 1; s < N; s <<= 1) {
          var l = s << 1;
          var rtwdf = Math.cos(2 * Math.PI / l);
          var itwdf = Math.sin(2 * Math.PI / l);
          for (var p = 0; p < N; p += l) {
            var rtwdf_ = rtwdf;
            var itwdf_ = itwdf;
            for (var j = 0; j < s; j++) {
              var re = rtws[p + j];
              var ie = itws[p + j];
              var ro = rtws[p + j + s];
              var io = itws[p + j + s];
              var rx = rtwdf_ * ro - itwdf_ * io;
              io = rtwdf_ * io + itwdf_ * ro;
              ro = rx;
              rtws[p + j] = re + ro;
              itws[p + j] = ie + io;
              rtws[p + j + s] = re - ro;
              itws[p + j + s] = ie - io;
              if (j !== l) {
                rx = rtwdf * rtwdf_ - itwdf * itwdf_;
                itwdf_ = rtwdf * itwdf_ + itwdf * rtwdf_;
                rtwdf_ = rx;
              }
            }
          }
        }
      };
      FFTM.prototype.guessLen13b = function guessLen13b(n, m) {
        var N = Math.max(m, n) | 1;
        var odd = N & 1;
        var i = 0;
        for (N = N / 2 | 0; N; N = N >>> 1) {
          i++;
        }
        return 1 << i + 1 + odd;
      };
      FFTM.prototype.conjugate = function conjugate(rws, iws, N) {
        if (N <= 1) return;
        for (var i = 0; i < N / 2; i++) {
          var t = rws[i];
          rws[i] = rws[N - i - 1];
          rws[N - i - 1] = t;
          t = iws[i];
          iws[i] = -iws[N - i - 1];
          iws[N - i - 1] = -t;
        }
      };
      FFTM.prototype.normalize13b = function normalize13b(ws, N) {
        var carry = 0;
        for (var i = 0; i < N / 2; i++) {
          var w = Math.round(ws[2 * i + 1] / N) * 8192 + Math.round(ws[2 * i] / N) + carry;
          ws[i] = w & 67108863;
          if (w < 67108864) {
            carry = 0;
          } else {
            carry = w / 67108864 | 0;
          }
        }
        return ws;
      };
      FFTM.prototype.convert13b = function convert13b(ws, len, rws, N) {
        var carry = 0;
        for (var i = 0; i < len; i++) {
          carry = carry + (ws[i] | 0);
          rws[2 * i] = carry & 8191;
          carry = carry >>> 13;
          rws[2 * i + 1] = carry & 8191;
          carry = carry >>> 13;
        }
        for (i = 2 * len; i < N; ++i) {
          rws[i] = 0;
        }
        assert2(carry === 0);
        assert2((carry & ~8191) === 0);
      };
      FFTM.prototype.stub = function stub(N) {
        var ph = new Array(N);
        for (var i = 0; i < N; i++) {
          ph[i] = 0;
        }
        return ph;
      };
      FFTM.prototype.mulp = function mulp(x, y, out) {
        var N = 2 * this.guessLen13b(x.length, y.length);
        var rbt = this.makeRBT(N);
        var _ = this.stub(N);
        var rws = new Array(N);
        var rwst = new Array(N);
        var iwst = new Array(N);
        var nrws = new Array(N);
        var nrwst = new Array(N);
        var niwst = new Array(N);
        var rmws = out.words;
        rmws.length = N;
        this.convert13b(x.words, x.length, rws, N);
        this.convert13b(y.words, y.length, nrws, N);
        this.transform(rws, _, rwst, iwst, N, rbt);
        this.transform(nrws, _, nrwst, niwst, N, rbt);
        for (var i = 0; i < N; i++) {
          var rx = rwst[i] * nrwst[i] - iwst[i] * niwst[i];
          iwst[i] = rwst[i] * niwst[i] + iwst[i] * nrwst[i];
          rwst[i] = rx;
        }
        this.conjugate(rwst, iwst, N);
        this.transform(rwst, iwst, rmws, _, N, rbt);
        this.conjugate(rmws, _, N);
        this.normalize13b(rmws, N);
        out.negative = x.negative ^ y.negative;
        out.length = x.length + y.length;
        return out._strip();
      };
      BN2.prototype.mul = function mul(num) {
        var out = new BN2(null);
        out.words = new Array(this.length + num.length);
        return this.mulTo(num, out);
      };
      BN2.prototype.mulf = function mulf(num) {
        var out = new BN2(null);
        out.words = new Array(this.length + num.length);
        return jumboMulTo(this, num, out);
      };
      BN2.prototype.imul = function imul(num) {
        return this.clone().mulTo(num, this);
      };
      BN2.prototype.imuln = function imuln(num) {
        var isNegNum = num < 0;
        if (isNegNum) num = -num;
        assert2(typeof num === "number");
        assert2(num < 67108864);
        var carry = 0;
        for (var i = 0; i < this.length; i++) {
          var w = (this.words[i] | 0) * num;
          var lo = (w & 67108863) + (carry & 67108863);
          carry >>= 26;
          carry += w / 67108864 | 0;
          carry += lo >>> 26;
          this.words[i] = lo & 67108863;
        }
        if (carry !== 0) {
          this.words[i] = carry;
          this.length++;
        }
        return isNegNum ? this.ineg() : this;
      };
      BN2.prototype.muln = function muln(num) {
        return this.clone().imuln(num);
      };
      BN2.prototype.sqr = function sqr() {
        return this.mul(this);
      };
      BN2.prototype.isqr = function isqr() {
        return this.imul(this.clone());
      };
      BN2.prototype.pow = function pow(num) {
        var w = toBitArray(num);
        if (w.length === 0) return new BN2(1);
        var res = this;
        for (var i = 0; i < w.length; i++, res = res.sqr()) {
          if (w[i] !== 0) break;
        }
        if (++i < w.length) {
          for (var q = res.sqr(); i < w.length; i++, q = q.sqr()) {
            if (w[i] === 0) continue;
            res = res.mul(q);
          }
        }
        return res;
      };
      BN2.prototype.iushln = function iushln(bits) {
        assert2(typeof bits === "number" && bits >= 0);
        var r = bits % 26;
        var s = (bits - r) / 26;
        var carryMask = 67108863 >>> 26 - r << 26 - r;
        var i;
        if (r !== 0) {
          var carry = 0;
          for (i = 0; i < this.length; i++) {
            var newCarry = this.words[i] & carryMask;
            var c = (this.words[i] | 0) - newCarry << r;
            this.words[i] = c | carry;
            carry = newCarry >>> 26 - r;
          }
          if (carry) {
            this.words[i] = carry;
            this.length++;
          }
        }
        if (s !== 0) {
          for (i = this.length - 1; i >= 0; i--) {
            this.words[i + s] = this.words[i];
          }
          for (i = 0; i < s; i++) {
            this.words[i] = 0;
          }
          this.length += s;
        }
        return this._strip();
      };
      BN2.prototype.ishln = function ishln(bits) {
        assert2(this.negative === 0);
        return this.iushln(bits);
      };
      BN2.prototype.iushrn = function iushrn(bits, hint, extended) {
        assert2(typeof bits === "number" && bits >= 0);
        var h;
        if (hint) {
          h = (hint - hint % 26) / 26;
        } else {
          h = 0;
        }
        var r = bits % 26;
        var s = Math.min((bits - r) / 26, this.length);
        var mask = 67108863 ^ 67108863 >>> r << r;
        var maskedWords = extended;
        h -= s;
        h = Math.max(0, h);
        if (maskedWords) {
          for (var i = 0; i < s; i++) {
            maskedWords.words[i] = this.words[i];
          }
          maskedWords.length = s;
        }
        if (s === 0) {
        } else if (this.length > s) {
          this.length -= s;
          for (i = 0; i < this.length; i++) {
            this.words[i] = this.words[i + s];
          }
        } else {
          this.words[0] = 0;
          this.length = 1;
        }
        var carry = 0;
        for (i = this.length - 1; i >= 0 && (carry !== 0 || i >= h); i--) {
          var word = this.words[i] | 0;
          this.words[i] = carry << 26 - r | word >>> r;
          carry = word & mask;
        }
        if (maskedWords && carry !== 0) {
          maskedWords.words[maskedWords.length++] = carry;
        }
        if (this.length === 0) {
          this.words[0] = 0;
          this.length = 1;
        }
        return this._strip();
      };
      BN2.prototype.ishrn = function ishrn(bits, hint, extended) {
        assert2(this.negative === 0);
        return this.iushrn(bits, hint, extended);
      };
      BN2.prototype.shln = function shln(bits) {
        return this.clone().ishln(bits);
      };
      BN2.prototype.ushln = function ushln(bits) {
        return this.clone().iushln(bits);
      };
      BN2.prototype.shrn = function shrn(bits) {
        return this.clone().ishrn(bits);
      };
      BN2.prototype.ushrn = function ushrn(bits) {
        return this.clone().iushrn(bits);
      };
      BN2.prototype.testn = function testn(bit) {
        assert2(typeof bit === "number" && bit >= 0);
        var r = bit % 26;
        var s = (bit - r) / 26;
        var q = 1 << r;
        if (this.length <= s) return false;
        var w = this.words[s];
        return !!(w & q);
      };
      BN2.prototype.imaskn = function imaskn(bits) {
        assert2(typeof bits === "number" && bits >= 0);
        var r = bits % 26;
        var s = (bits - r) / 26;
        assert2(this.negative === 0, "imaskn works only with positive numbers");
        if (this.length <= s) {
          return this;
        }
        if (r !== 0) {
          s++;
        }
        this.length = Math.min(s, this.length);
        if (r !== 0) {
          var mask = 67108863 ^ 67108863 >>> r << r;
          this.words[this.length - 1] &= mask;
        }
        return this._strip();
      };
      BN2.prototype.maskn = function maskn(bits) {
        return this.clone().imaskn(bits);
      };
      BN2.prototype.iaddn = function iaddn(num) {
        assert2(typeof num === "number");
        assert2(num < 67108864);
        if (num < 0) return this.isubn(-num);
        if (this.negative !== 0) {
          if (this.length === 1 && (this.words[0] | 0) <= num) {
            this.words[0] = num - (this.words[0] | 0);
            this.negative = 0;
            return this;
          }
          this.negative = 0;
          this.isubn(num);
          this.negative = 1;
          return this;
        }
        return this._iaddn(num);
      };
      BN2.prototype._iaddn = function _iaddn(num) {
        this.words[0] += num;
        for (var i = 0; i < this.length && this.words[i] >= 67108864; i++) {
          this.words[i] -= 67108864;
          if (i === this.length - 1) {
            this.words[i + 1] = 1;
          } else {
            this.words[i + 1]++;
          }
        }
        this.length = Math.max(this.length, i + 1);
        return this;
      };
      BN2.prototype.isubn = function isubn(num) {
        assert2(typeof num === "number");
        assert2(num < 67108864);
        if (num < 0) return this.iaddn(-num);
        if (this.negative !== 0) {
          this.negative = 0;
          this.iaddn(num);
          this.negative = 1;
          return this;
        }
        this.words[0] -= num;
        if (this.length === 1 && this.words[0] < 0) {
          this.words[0] = -this.words[0];
          this.negative = 1;
        } else {
          for (var i = 0; i < this.length && this.words[i] < 0; i++) {
            this.words[i] += 67108864;
            this.words[i + 1] -= 1;
          }
        }
        return this._strip();
      };
      BN2.prototype.addn = function addn(num) {
        return this.clone().iaddn(num);
      };
      BN2.prototype.subn = function subn(num) {
        return this.clone().isubn(num);
      };
      BN2.prototype.iabs = function iabs() {
        this.negative = 0;
        return this;
      };
      BN2.prototype.abs = function abs() {
        return this.clone().iabs();
      };
      BN2.prototype._ishlnsubmul = function _ishlnsubmul(num, mul, shift) {
        var len = num.length + shift;
        var i;
        this._expand(len);
        var w;
        var carry = 0;
        for (i = 0; i < num.length; i++) {
          w = (this.words[i + shift] | 0) + carry;
          var right = (num.words[i] | 0) * mul;
          w -= right & 67108863;
          carry = (w >> 26) - (right / 67108864 | 0);
          this.words[i + shift] = w & 67108863;
        }
        for (; i < this.length - shift; i++) {
          w = (this.words[i + shift] | 0) + carry;
          carry = w >> 26;
          this.words[i + shift] = w & 67108863;
        }
        if (carry === 0) return this._strip();
        assert2(carry === -1);
        carry = 0;
        for (i = 0; i < this.length; i++) {
          w = -(this.words[i] | 0) + carry;
          carry = w >> 26;
          this.words[i] = w & 67108863;
        }
        this.negative = 1;
        return this._strip();
      };
      BN2.prototype._wordDiv = function _wordDiv(num, mode) {
        var shift = this.length - num.length;
        var a = this.clone();
        var b = num;
        var bhi = b.words[b.length - 1] | 0;
        var bhiBits = this._countBits(bhi);
        shift = 26 - bhiBits;
        if (shift !== 0) {
          b = b.ushln(shift);
          a.iushln(shift);
          bhi = b.words[b.length - 1] | 0;
        }
        var m = a.length - b.length;
        var q;
        if (mode !== "mod") {
          q = new BN2(null);
          q.length = m + 1;
          q.words = new Array(q.length);
          for (var i = 0; i < q.length; i++) {
            q.words[i] = 0;
          }
        }
        var diff = a.clone()._ishlnsubmul(b, 1, m);
        if (diff.negative === 0) {
          a = diff;
          if (q) {
            q.words[m] = 1;
          }
        }
        for (var j = m - 1; j >= 0; j--) {
          var qj = (a.words[b.length + j] | 0) * 67108864 + (a.words[b.length + j - 1] | 0);
          qj = Math.min(qj / bhi | 0, 67108863);
          a._ishlnsubmul(b, qj, j);
          while (a.negative !== 0) {
            qj--;
            a.negative = 0;
            a._ishlnsubmul(b, 1, j);
            if (!a.isZero()) {
              a.negative ^= 1;
            }
          }
          if (q) {
            q.words[j] = qj;
          }
        }
        if (q) {
          q._strip();
        }
        a._strip();
        if (mode !== "div" && shift !== 0) {
          a.iushrn(shift);
        }
        return {
          div: q || null,
          mod: a
        };
      };
      BN2.prototype.divmod = function divmod(num, mode, positive) {
        assert2(!num.isZero());
        if (this.isZero()) {
          return {
            div: new BN2(0),
            mod: new BN2(0)
          };
        }
        var div, mod, res;
        if (this.negative !== 0 && num.negative === 0) {
          res = this.neg().divmod(num, mode);
          if (mode !== "mod") {
            div = res.div.neg();
          }
          if (mode !== "div") {
            mod = res.mod.neg();
            if (positive && mod.negative !== 0) {
              mod.iadd(num);
            }
          }
          return {
            div,
            mod
          };
        }
        if (this.negative === 0 && num.negative !== 0) {
          res = this.divmod(num.neg(), mode);
          if (mode !== "mod") {
            div = res.div.neg();
          }
          return {
            div,
            mod: res.mod
          };
        }
        if ((this.negative & num.negative) !== 0) {
          res = this.neg().divmod(num.neg(), mode);
          if (mode !== "div") {
            mod = res.mod.neg();
            if (positive && mod.negative !== 0) {
              mod.isub(num);
            }
          }
          return {
            div: res.div,
            mod
          };
        }
        if (num.length > this.length || this.cmp(num) < 0) {
          return {
            div: new BN2(0),
            mod: this
          };
        }
        if (num.length === 1) {
          if (mode === "div") {
            return {
              div: this.divn(num.words[0]),
              mod: null
            };
          }
          if (mode === "mod") {
            return {
              div: null,
              mod: new BN2(this.modrn(num.words[0]))
            };
          }
          return {
            div: this.divn(num.words[0]),
            mod: new BN2(this.modrn(num.words[0]))
          };
        }
        return this._wordDiv(num, mode);
      };
      BN2.prototype.div = function div(num) {
        return this.divmod(num, "div", false).div;
      };
      BN2.prototype.mod = function mod(num) {
        return this.divmod(num, "mod", false).mod;
      };
      BN2.prototype.umod = function umod(num) {
        return this.divmod(num, "mod", true).mod;
      };
      BN2.prototype.divRound = function divRound(num) {
        var dm = this.divmod(num);
        if (dm.mod.isZero()) return dm.div;
        var mod = dm.div.negative !== 0 ? dm.mod.isub(num) : dm.mod;
        var half = num.ushrn(1);
        var r2 = num.andln(1);
        var cmp = mod.cmp(half);
        if (cmp < 0 || r2 === 1 && cmp === 0) return dm.div;
        return dm.div.negative !== 0 ? dm.div.isubn(1) : dm.div.iaddn(1);
      };
      BN2.prototype.modrn = function modrn(num) {
        var isNegNum = num < 0;
        if (isNegNum) num = -num;
        assert2(num <= 67108863);
        var p = (1 << 26) % num;
        var acc = 0;
        for (var i = this.length - 1; i >= 0; i--) {
          acc = (p * acc + (this.words[i] | 0)) % num;
        }
        return isNegNum ? -acc : acc;
      };
      BN2.prototype.modn = function modn(num) {
        return this.modrn(num);
      };
      BN2.prototype.idivn = function idivn(num) {
        var isNegNum = num < 0;
        if (isNegNum) num = -num;
        assert2(num <= 67108863);
        var carry = 0;
        for (var i = this.length - 1; i >= 0; i--) {
          var w = (this.words[i] | 0) + carry * 67108864;
          this.words[i] = w / num | 0;
          carry = w % num;
        }
        this._strip();
        return isNegNum ? this.ineg() : this;
      };
      BN2.prototype.divn = function divn(num) {
        return this.clone().idivn(num);
      };
      BN2.prototype.egcd = function egcd(p) {
        assert2(p.negative === 0);
        assert2(!p.isZero());
        var x = this;
        var y = p.clone();
        if (x.negative !== 0) {
          x = x.umod(p);
        } else {
          x = x.clone();
        }
        var A = new BN2(1);
        var B = new BN2(0);
        var C = new BN2(0);
        var D = new BN2(1);
        var g = 0;
        while (x.isEven() && y.isEven()) {
          x.iushrn(1);
          y.iushrn(1);
          ++g;
        }
        var yp = y.clone();
        var xp = x.clone();
        while (!x.isZero()) {
          for (var i = 0, im = 1; (x.words[0] & im) === 0 && i < 26; ++i, im <<= 1) ;
          if (i > 0) {
            x.iushrn(i);
            while (i-- > 0) {
              if (A.isOdd() || B.isOdd()) {
                A.iadd(yp);
                B.isub(xp);
              }
              A.iushrn(1);
              B.iushrn(1);
            }
          }
          for (var j = 0, jm = 1; (y.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1) ;
          if (j > 0) {
            y.iushrn(j);
            while (j-- > 0) {
              if (C.isOdd() || D.isOdd()) {
                C.iadd(yp);
                D.isub(xp);
              }
              C.iushrn(1);
              D.iushrn(1);
            }
          }
          if (x.cmp(y) >= 0) {
            x.isub(y);
            A.isub(C);
            B.isub(D);
          } else {
            y.isub(x);
            C.isub(A);
            D.isub(B);
          }
        }
        return {
          a: C,
          b: D,
          gcd: y.iushln(g)
        };
      };
      BN2.prototype._invmp = function _invmp(p) {
        assert2(p.negative === 0);
        assert2(!p.isZero());
        var a = this;
        var b = p.clone();
        if (a.negative !== 0) {
          a = a.umod(p);
        } else {
          a = a.clone();
        }
        var x1 = new BN2(1);
        var x2 = new BN2(0);
        var delta = b.clone();
        while (a.cmpn(1) > 0 && b.cmpn(1) > 0) {
          for (var i = 0, im = 1; (a.words[0] & im) === 0 && i < 26; ++i, im <<= 1) ;
          if (i > 0) {
            a.iushrn(i);
            while (i-- > 0) {
              if (x1.isOdd()) {
                x1.iadd(delta);
              }
              x1.iushrn(1);
            }
          }
          for (var j = 0, jm = 1; (b.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1) ;
          if (j > 0) {
            b.iushrn(j);
            while (j-- > 0) {
              if (x2.isOdd()) {
                x2.iadd(delta);
              }
              x2.iushrn(1);
            }
          }
          if (a.cmp(b) >= 0) {
            a.isub(b);
            x1.isub(x2);
          } else {
            b.isub(a);
            x2.isub(x1);
          }
        }
        var res;
        if (a.cmpn(1) === 0) {
          res = x1;
        } else {
          res = x2;
        }
        if (res.cmpn(0) < 0) {
          res.iadd(p);
        }
        return res;
      };
      BN2.prototype.gcd = function gcd(num) {
        if (this.isZero()) return num.abs();
        if (num.isZero()) return this.abs();
        var a = this.clone();
        var b = num.clone();
        a.negative = 0;
        b.negative = 0;
        for (var shift = 0; a.isEven() && b.isEven(); shift++) {
          a.iushrn(1);
          b.iushrn(1);
        }
        do {
          while (a.isEven()) {
            a.iushrn(1);
          }
          while (b.isEven()) {
            b.iushrn(1);
          }
          var r = a.cmp(b);
          if (r < 0) {
            var t = a;
            a = b;
            b = t;
          } else if (r === 0 || b.cmpn(1) === 0) {
            break;
          }
          a.isub(b);
        } while (true);
        return b.iushln(shift);
      };
      BN2.prototype.invm = function invm(num) {
        return this.egcd(num).a.umod(num);
      };
      BN2.prototype.isEven = function isEven() {
        return (this.words[0] & 1) === 0;
      };
      BN2.prototype.isOdd = function isOdd() {
        return (this.words[0] & 1) === 1;
      };
      BN2.prototype.andln = function andln(num) {
        return this.words[0] & num;
      };
      BN2.prototype.bincn = function bincn(bit) {
        assert2(typeof bit === "number");
        var r = bit % 26;
        var s = (bit - r) / 26;
        var q = 1 << r;
        if (this.length <= s) {
          this._expand(s + 1);
          this.words[s] |= q;
          return this;
        }
        var carry = q;
        for (var i = s; carry !== 0 && i < this.length; i++) {
          var w = this.words[i] | 0;
          w += carry;
          carry = w >>> 26;
          w &= 67108863;
          this.words[i] = w;
        }
        if (carry !== 0) {
          this.words[i] = carry;
          this.length++;
        }
        return this;
      };
      BN2.prototype.isZero = function isZero() {
        return this.length === 1 && this.words[0] === 0;
      };
      BN2.prototype.cmpn = function cmpn(num) {
        var negative = num < 0;
        if (this.negative !== 0 && !negative) return -1;
        if (this.negative === 0 && negative) return 1;
        this._strip();
        var res;
        if (this.length > 1) {
          res = 1;
        } else {
          if (negative) {
            num = -num;
          }
          assert2(num <= 67108863, "Number is too big");
          var w = this.words[0] | 0;
          res = w === num ? 0 : w < num ? -1 : 1;
        }
        if (this.negative !== 0) return -res | 0;
        return res;
      };
      BN2.prototype.cmp = function cmp(num) {
        if (this.negative !== 0 && num.negative === 0) return -1;
        if (this.negative === 0 && num.negative !== 0) return 1;
        var res = this.ucmp(num);
        if (this.negative !== 0) return -res | 0;
        return res;
      };
      BN2.prototype.ucmp = function ucmp(num) {
        if (this.length > num.length) return 1;
        if (this.length < num.length) return -1;
        var res = 0;
        for (var i = this.length - 1; i >= 0; i--) {
          var a = this.words[i] | 0;
          var b = num.words[i] | 0;
          if (a === b) continue;
          if (a < b) {
            res = -1;
          } else if (a > b) {
            res = 1;
          }
          break;
        }
        return res;
      };
      BN2.prototype.gtn = function gtn(num) {
        return this.cmpn(num) === 1;
      };
      BN2.prototype.gt = function gt(num) {
        return this.cmp(num) === 1;
      };
      BN2.prototype.gten = function gten(num) {
        return this.cmpn(num) >= 0;
      };
      BN2.prototype.gte = function gte(num) {
        return this.cmp(num) >= 0;
      };
      BN2.prototype.ltn = function ltn(num) {
        return this.cmpn(num) === -1;
      };
      BN2.prototype.lt = function lt(num) {
        return this.cmp(num) === -1;
      };
      BN2.prototype.lten = function lten(num) {
        return this.cmpn(num) <= 0;
      };
      BN2.prototype.lte = function lte(num) {
        return this.cmp(num) <= 0;
      };
      BN2.prototype.eqn = function eqn(num) {
        return this.cmpn(num) === 0;
      };
      BN2.prototype.eq = function eq(num) {
        return this.cmp(num) === 0;
      };
      BN2.red = function red(num) {
        return new Red(num);
      };
      BN2.prototype.toRed = function toRed(ctx) {
        assert2(!this.red, "Already a number in reduction context");
        assert2(this.negative === 0, "red works only with positives");
        return ctx.convertTo(this)._forceRed(ctx);
      };
      BN2.prototype.fromRed = function fromRed() {
        assert2(this.red, "fromRed works only with numbers in reduction context");
        return this.red.convertFrom(this);
      };
      BN2.prototype._forceRed = function _forceRed(ctx) {
        this.red = ctx;
        return this;
      };
      BN2.prototype.forceRed = function forceRed(ctx) {
        assert2(!this.red, "Already a number in reduction context");
        return this._forceRed(ctx);
      };
      BN2.prototype.redAdd = function redAdd(num) {
        assert2(this.red, "redAdd works only with red numbers");
        return this.red.add(this, num);
      };
      BN2.prototype.redIAdd = function redIAdd(num) {
        assert2(this.red, "redIAdd works only with red numbers");
        return this.red.iadd(this, num);
      };
      BN2.prototype.redSub = function redSub(num) {
        assert2(this.red, "redSub works only with red numbers");
        return this.red.sub(this, num);
      };
      BN2.prototype.redISub = function redISub(num) {
        assert2(this.red, "redISub works only with red numbers");
        return this.red.isub(this, num);
      };
      BN2.prototype.redShl = function redShl(num) {
        assert2(this.red, "redShl works only with red numbers");
        return this.red.shl(this, num);
      };
      BN2.prototype.redMul = function redMul(num) {
        assert2(this.red, "redMul works only with red numbers");
        this.red._verify2(this, num);
        return this.red.mul(this, num);
      };
      BN2.prototype.redIMul = function redIMul(num) {
        assert2(this.red, "redMul works only with red numbers");
        this.red._verify2(this, num);
        return this.red.imul(this, num);
      };
      BN2.prototype.redSqr = function redSqr() {
        assert2(this.red, "redSqr works only with red numbers");
        this.red._verify1(this);
        return this.red.sqr(this);
      };
      BN2.prototype.redISqr = function redISqr() {
        assert2(this.red, "redISqr works only with red numbers");
        this.red._verify1(this);
        return this.red.isqr(this);
      };
      BN2.prototype.redSqrt = function redSqrt() {
        assert2(this.red, "redSqrt works only with red numbers");
        this.red._verify1(this);
        return this.red.sqrt(this);
      };
      BN2.prototype.redInvm = function redInvm() {
        assert2(this.red, "redInvm works only with red numbers");
        this.red._verify1(this);
        return this.red.invm(this);
      };
      BN2.prototype.redNeg = function redNeg() {
        assert2(this.red, "redNeg works only with red numbers");
        this.red._verify1(this);
        return this.red.neg(this);
      };
      BN2.prototype.redPow = function redPow(num) {
        assert2(this.red && !num.red, "redPow(normalNum)");
        this.red._verify1(this);
        return this.red.pow(this, num);
      };
      var primes = {
        k256: null,
        p224: null,
        p192: null,
        p25519: null
      };
      function MPrime(name, p) {
        this.name = name;
        this.p = new BN2(p, 16);
        this.n = this.p.bitLength();
        this.k = new BN2(1).iushln(this.n).isub(this.p);
        this.tmp = this._tmp();
      }
      MPrime.prototype._tmp = function _tmp() {
        var tmp = new BN2(null);
        tmp.words = new Array(Math.ceil(this.n / 13));
        return tmp;
      };
      MPrime.prototype.ireduce = function ireduce(num) {
        var r = num;
        var rlen;
        do {
          this.split(r, this.tmp);
          r = this.imulK(r);
          r = r.iadd(this.tmp);
          rlen = r.bitLength();
        } while (rlen > this.n);
        var cmp = rlen < this.n ? -1 : r.ucmp(this.p);
        if (cmp === 0) {
          r.words[0] = 0;
          r.length = 1;
        } else if (cmp > 0) {
          r.isub(this.p);
        } else {
          if (r.strip !== void 0) {
            r.strip();
          } else {
            r._strip();
          }
        }
        return r;
      };
      MPrime.prototype.split = function split2(input, out) {
        input.iushrn(this.n, 0, out);
      };
      MPrime.prototype.imulK = function imulK(num) {
        return num.imul(this.k);
      };
      function K256() {
        MPrime.call(
          this,
          "k256",
          "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
        );
      }
      inherits(K256, MPrime);
      K256.prototype.split = function split2(input, output2) {
        var mask = 4194303;
        var outLen = Math.min(input.length, 9);
        for (var i = 0; i < outLen; i++) {
          output2.words[i] = input.words[i];
        }
        output2.length = outLen;
        if (input.length <= 9) {
          input.words[0] = 0;
          input.length = 1;
          return;
        }
        var prev = input.words[9];
        output2.words[output2.length++] = prev & mask;
        for (i = 10; i < input.length; i++) {
          var next = input.words[i] | 0;
          input.words[i - 10] = (next & mask) << 4 | prev >>> 22;
          prev = next;
        }
        prev >>>= 22;
        input.words[i - 10] = prev;
        if (prev === 0 && input.length > 10) {
          input.length -= 10;
        } else {
          input.length -= 9;
        }
      };
      K256.prototype.imulK = function imulK(num) {
        num.words[num.length] = 0;
        num.words[num.length + 1] = 0;
        num.length += 2;
        var lo = 0;
        for (var i = 0; i < num.length; i++) {
          var w = num.words[i] | 0;
          lo += w * 977;
          num.words[i] = lo & 67108863;
          lo = w * 64 + (lo / 67108864 | 0);
        }
        if (num.words[num.length - 1] === 0) {
          num.length--;
          if (num.words[num.length - 1] === 0) {
            num.length--;
          }
        }
        return num;
      };
      function P224() {
        MPrime.call(
          this,
          "p224",
          "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
        );
      }
      inherits(P224, MPrime);
      function P192() {
        MPrime.call(
          this,
          "p192",
          "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
        );
      }
      inherits(P192, MPrime);
      function P25519() {
        MPrime.call(
          this,
          "25519",
          "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
        );
      }
      inherits(P25519, MPrime);
      P25519.prototype.imulK = function imulK(num) {
        var carry = 0;
        for (var i = 0; i < num.length; i++) {
          var hi = (num.words[i] | 0) * 19 + carry;
          var lo = hi & 67108863;
          hi >>>= 26;
          num.words[i] = lo;
          carry = hi;
        }
        if (carry !== 0) {
          num.words[num.length++] = carry;
        }
        return num;
      };
      BN2._prime = function prime(name) {
        if (primes[name]) return primes[name];
        var prime2;
        if (name === "k256") {
          prime2 = new K256();
        } else if (name === "p224") {
          prime2 = new P224();
        } else if (name === "p192") {
          prime2 = new P192();
        } else if (name === "p25519") {
          prime2 = new P25519();
        } else {
          throw new Error("Unknown prime " + name);
        }
        primes[name] = prime2;
        return prime2;
      };
      function Red(m) {
        if (typeof m === "string") {
          var prime = BN2._prime(m);
          this.m = prime.p;
          this.prime = prime;
        } else {
          assert2(m.gtn(1), "modulus must be greater than 1");
          this.m = m;
          this.prime = null;
        }
      }
      Red.prototype._verify1 = function _verify1(a) {
        assert2(a.negative === 0, "red works only with positives");
        assert2(a.red, "red works only with red numbers");
      };
      Red.prototype._verify2 = function _verify2(a, b) {
        assert2((a.negative | b.negative) === 0, "red works only with positives");
        assert2(
          a.red && a.red === b.red,
          "red works only with red numbers"
        );
      };
      Red.prototype.imod = function imod(a) {
        if (this.prime) return this.prime.ireduce(a)._forceRed(this);
        move(a, a.umod(this.m)._forceRed(this));
        return a;
      };
      Red.prototype.neg = function neg(a) {
        if (a.isZero()) {
          return a.clone();
        }
        return this.m.sub(a)._forceRed(this);
      };
      Red.prototype.add = function add2(a, b) {
        this._verify2(a, b);
        var res = a.add(b);
        if (res.cmp(this.m) >= 0) {
          res.isub(this.m);
        }
        return res._forceRed(this);
      };
      Red.prototype.iadd = function iadd(a, b) {
        this._verify2(a, b);
        var res = a.iadd(b);
        if (res.cmp(this.m) >= 0) {
          res.isub(this.m);
        }
        return res;
      };
      Red.prototype.sub = function sub(a, b) {
        this._verify2(a, b);
        var res = a.sub(b);
        if (res.cmpn(0) < 0) {
          res.iadd(this.m);
        }
        return res._forceRed(this);
      };
      Red.prototype.isub = function isub(a, b) {
        this._verify2(a, b);
        var res = a.isub(b);
        if (res.cmpn(0) < 0) {
          res.iadd(this.m);
        }
        return res;
      };
      Red.prototype.shl = function shl(a, num) {
        this._verify1(a);
        return this.imod(a.ushln(num));
      };
      Red.prototype.imul = function imul(a, b) {
        this._verify2(a, b);
        return this.imod(a.imul(b));
      };
      Red.prototype.mul = function mul(a, b) {
        this._verify2(a, b);
        return this.imod(a.mul(b));
      };
      Red.prototype.isqr = function isqr(a) {
        return this.imul(a, a.clone());
      };
      Red.prototype.sqr = function sqr(a) {
        return this.mul(a, a);
      };
      Red.prototype.sqrt = function sqrt(a) {
        if (a.isZero()) return a.clone();
        var mod3 = this.m.andln(3);
        assert2(mod3 % 2 === 1);
        if (mod3 === 3) {
          var pow = this.m.add(new BN2(1)).iushrn(2);
          return this.pow(a, pow);
        }
        var q = this.m.subn(1);
        var s = 0;
        while (!q.isZero() && q.andln(1) === 0) {
          s++;
          q.iushrn(1);
        }
        assert2(!q.isZero());
        var one = new BN2(1).toRed(this);
        var nOne = one.redNeg();
        var lpow = this.m.subn(1).iushrn(1);
        var z = this.m.bitLength();
        z = new BN2(2 * z * z).toRed(this);
        while (this.pow(z, lpow).cmp(nOne) !== 0) {
          z.redIAdd(nOne);
        }
        var c = this.pow(z, q);
        var r = this.pow(a, q.addn(1).iushrn(1));
        var t = this.pow(a, q);
        var m = s;
        while (t.cmp(one) !== 0) {
          var tmp = t;
          for (var i = 0; tmp.cmp(one) !== 0; i++) {
            tmp = tmp.redSqr();
          }
          assert2(i < m);
          var b = this.pow(c, new BN2(1).iushln(m - i - 1));
          r = r.redMul(b);
          c = b.redSqr();
          t = t.redMul(c);
          m = i;
        }
        return r;
      };
      Red.prototype.invm = function invm(a) {
        var inv = a._invmp(this.m);
        if (inv.negative !== 0) {
          inv.negative = 0;
          return this.imod(inv).redNeg();
        } else {
          return this.imod(inv);
        }
      };
      Red.prototype.pow = function pow(a, num) {
        if (num.isZero()) return new BN2(1).toRed(this);
        if (num.cmpn(1) === 0) return a.clone();
        var windowSize = 4;
        var wnd = new Array(1 << windowSize);
        wnd[0] = new BN2(1).toRed(this);
        wnd[1] = a;
        for (var i = 2; i < wnd.length; i++) {
          wnd[i] = this.mul(wnd[i - 1], a);
        }
        var res = wnd[0];
        var current = 0;
        var currentLen = 0;
        var start = num.bitLength() % 26;
        if (start === 0) {
          start = 26;
        }
        for (i = num.length - 1; i >= 0; i--) {
          var word = num.words[i];
          for (var j = start - 1; j >= 0; j--) {
            var bit = word >> j & 1;
            if (res !== wnd[0]) {
              res = this.sqr(res);
            }
            if (bit === 0 && current === 0) {
              currentLen = 0;
              continue;
            }
            current <<= 1;
            current |= bit;
            currentLen++;
            if (currentLen !== windowSize && (i !== 0 || j !== 0)) continue;
            res = this.mul(res, wnd[current]);
            currentLen = 0;
            current = 0;
          }
          start = 26;
        }
        return res;
      };
      Red.prototype.convertTo = function convertTo(num) {
        var r = num.umod(this.m);
        return r === num ? r.clone() : r;
      };
      Red.prototype.convertFrom = function convertFrom(num) {
        var res = num.clone();
        res.red = null;
        return res;
      };
      BN2.mont = function mont(num) {
        return new Mont(num);
      };
      function Mont(m) {
        Red.call(this, m);
        this.shift = this.m.bitLength();
        if (this.shift % 26 !== 0) {
          this.shift += 26 - this.shift % 26;
        }
        this.r = new BN2(1).iushln(this.shift);
        this.r2 = this.imod(this.r.sqr());
        this.rinv = this.r._invmp(this.m);
        this.minv = this.rinv.mul(this.r).isubn(1).div(this.m);
        this.minv = this.minv.umod(this.r);
        this.minv = this.r.sub(this.minv);
      }
      inherits(Mont, Red);
      Mont.prototype.convertTo = function convertTo(num) {
        return this.imod(num.ushln(this.shift));
      };
      Mont.prototype.convertFrom = function convertFrom(num) {
        var r = this.imod(num.mul(this.rinv));
        r.red = null;
        return r;
      };
      Mont.prototype.imul = function imul(a, b) {
        if (a.isZero() || b.isZero()) {
          a.words[0] = 0;
          a.length = 1;
          return a;
        }
        var t = a.imul(b);
        var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
        var u = t.isub(c).iushrn(this.shift);
        var res = u;
        if (u.cmp(this.m) >= 0) {
          res = u.isub(this.m);
        } else if (u.cmpn(0) < 0) {
          res = u.iadd(this.m);
        }
        return res._forceRed(this);
      };
      Mont.prototype.mul = function mul(a, b) {
        if (a.isZero() || b.isZero()) return new BN2(0)._forceRed(this);
        var t = a.mul(b);
        var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
        var u = t.isub(c).iushrn(this.shift);
        var res = u;
        if (u.cmp(this.m) >= 0) {
          res = u.isub(this.m);
        } else if (u.cmpn(0) < 0) {
          res = u.iadd(this.m);
        }
        return res._forceRed(this);
      };
      Mont.prototype.invm = function invm(a) {
        var res = this.imod(a._invmp(this.m).mul(this.r2));
        return res._forceRed(this);
      };
    })(typeof module === "undefined" || module, exports);
  }
});

// node_modules/utf8/utf8.js
var require_utf8 = __commonJS({
  "node_modules/utf8/utf8.js"(exports) {
    (function(root) {
      var stringFromCharCode = String.fromCharCode;
      function ucs2decode(string) {
        var output2 = [];
        var counter = 0;
        var length = string.length;
        var value;
        var extra;
        while (counter < length) {
          value = string.charCodeAt(counter++);
          if (value >= 55296 && value <= 56319 && counter < length) {
            extra = string.charCodeAt(counter++);
            if ((extra & 64512) == 56320) {
              output2.push(((value & 1023) << 10) + (extra & 1023) + 65536);
            } else {
              output2.push(value);
              counter--;
            }
          } else {
            output2.push(value);
          }
        }
        return output2;
      }
      function ucs2encode(array) {
        var length = array.length;
        var index = -1;
        var value;
        var output2 = "";
        while (++index < length) {
          value = array[index];
          if (value > 65535) {
            value -= 65536;
            output2 += stringFromCharCode(value >>> 10 & 1023 | 55296);
            value = 56320 | value & 1023;
          }
          output2 += stringFromCharCode(value);
        }
        return output2;
      }
      function checkScalarValue(codePoint) {
        if (codePoint >= 55296 && codePoint <= 57343) {
          throw Error(
            "Lone surrogate U+" + codePoint.toString(16).toUpperCase() + " is not a scalar value"
          );
        }
      }
      function createByte(codePoint, shift) {
        return stringFromCharCode(codePoint >> shift & 63 | 128);
      }
      function encodeCodePoint(codePoint) {
        if ((codePoint & 4294967168) == 0) {
          return stringFromCharCode(codePoint);
        }
        var symbol = "";
        if ((codePoint & 4294965248) == 0) {
          symbol = stringFromCharCode(codePoint >> 6 & 31 | 192);
        } else if ((codePoint & 4294901760) == 0) {
          checkScalarValue(codePoint);
          symbol = stringFromCharCode(codePoint >> 12 & 15 | 224);
          symbol += createByte(codePoint, 6);
        } else if ((codePoint & 4292870144) == 0) {
          symbol = stringFromCharCode(codePoint >> 18 & 7 | 240);
          symbol += createByte(codePoint, 12);
          symbol += createByte(codePoint, 6);
        }
        symbol += stringFromCharCode(codePoint & 63 | 128);
        return symbol;
      }
      function utf8encode(string) {
        var codePoints = ucs2decode(string);
        var length = codePoints.length;
        var index = -1;
        var codePoint;
        var byteString = "";
        while (++index < length) {
          codePoint = codePoints[index];
          byteString += encodeCodePoint(codePoint);
        }
        return byteString;
      }
      function readContinuationByte() {
        if (byteIndex >= byteCount) {
          throw Error("Invalid byte index");
        }
        var continuationByte = byteArray[byteIndex] & 255;
        byteIndex++;
        if ((continuationByte & 192) == 128) {
          return continuationByte & 63;
        }
        throw Error("Invalid continuation byte");
      }
      function decodeSymbol() {
        var byte1;
        var byte2;
        var byte3;
        var byte4;
        var codePoint;
        if (byteIndex > byteCount) {
          throw Error("Invalid byte index");
        }
        if (byteIndex == byteCount) {
          return false;
        }
        byte1 = byteArray[byteIndex] & 255;
        byteIndex++;
        if ((byte1 & 128) == 0) {
          return byte1;
        }
        if ((byte1 & 224) == 192) {
          byte2 = readContinuationByte();
          codePoint = (byte1 & 31) << 6 | byte2;
          if (codePoint >= 128) {
            return codePoint;
          } else {
            throw Error("Invalid continuation byte");
          }
        }
        if ((byte1 & 240) == 224) {
          byte2 = readContinuationByte();
          byte3 = readContinuationByte();
          codePoint = (byte1 & 15) << 12 | byte2 << 6 | byte3;
          if (codePoint >= 2048) {
            checkScalarValue(codePoint);
            return codePoint;
          } else {
            throw Error("Invalid continuation byte");
          }
        }
        if ((byte1 & 248) == 240) {
          byte2 = readContinuationByte();
          byte3 = readContinuationByte();
          byte4 = readContinuationByte();
          codePoint = (byte1 & 7) << 18 | byte2 << 12 | byte3 << 6 | byte4;
          if (codePoint >= 65536 && codePoint <= 1114111) {
            return codePoint;
          }
        }
        throw Error("Invalid UTF-8 detected");
      }
      var byteArray;
      var byteCount;
      var byteIndex;
      function utf8decode(byteString) {
        byteArray = ucs2decode(byteString);
        byteCount = byteArray.length;
        byteIndex = 0;
        var codePoints = [];
        var tmp;
        while ((tmp = decodeSymbol()) !== false) {
          codePoints.push(tmp);
        }
        return ucs2encode(codePoints);
      }
      root.version = "3.0.0";
      root.encode = utf8encode;
      root.decode = utf8decode;
    })(typeof exports === "undefined" ? exports.utf8 = {} : exports);
  }
});

// node_modules/@noble/hashes/_assert.js
var require_assert = __commonJS({
  "node_modules/@noble/hashes/_assert.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.output = exports.exists = exports.hash = exports.bytes = exports.bool = exports.number = void 0;
    function number2(n) {
      if (!Number.isSafeInteger(n) || n < 0)
        throw new Error(`Wrong positive integer: ${n}`);
    }
    exports.number = number2;
    function bool2(b) {
      if (typeof b !== "boolean")
        throw new Error(`Expected boolean, not ${b}`);
    }
    exports.bool = bool2;
    function bytes2(b, ...lengths) {
      if (!(b instanceof Uint8Array))
        throw new Error("Expected Uint8Array");
      if (lengths.length > 0 && !lengths.includes(b.length))
        throw new Error(`Expected Uint8Array of length ${lengths}, not of length=${b.length}`);
    }
    exports.bytes = bytes2;
    function hash2(hash3) {
      if (typeof hash3 !== "function" || typeof hash3.create !== "function")
        throw new Error("Hash should be wrapped by utils.wrapConstructor");
      number2(hash3.outputLen);
      number2(hash3.blockLen);
    }
    exports.hash = hash2;
    function exists2(instance, checkFinished = true) {
      if (instance.destroyed)
        throw new Error("Hash instance has been destroyed");
      if (checkFinished && instance.finished)
        throw new Error("Hash#digest() has already been called");
    }
    exports.exists = exists2;
    function output2(out, instance) {
      bytes2(out);
      const min = instance.outputLen;
      if (out.length < min) {
        throw new Error(`digestInto() expects output buffer of length at least ${min}`);
      }
    }
    exports.output = output2;
    var assert2 = {
      number: number2,
      bool: bool2,
      bytes: bytes2,
      hash: hash2,
      exists: exists2,
      output: output2
    };
    exports.default = assert2;
  }
});

// node_modules/@noble/hashes/cryptoNode.js
var require_cryptoNode = __commonJS({
  "node_modules/@noble/hashes/cryptoNode.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.crypto = void 0;
    var nc2 = __require("node:crypto");
    exports.crypto = nc2 && typeof nc2 === "object" && "webcrypto" in nc2 ? nc2.webcrypto : void 0;
  }
});

// node_modules/@noble/hashes/utils.js
var require_utils = __commonJS({
  "node_modules/@noble/hashes/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.randomBytes = exports.wrapXOFConstructorWithOpts = exports.wrapConstructorWithOpts = exports.wrapConstructor = exports.checkOpts = exports.Hash = exports.concatBytes = exports.toBytes = exports.utf8ToBytes = exports.asyncLoop = exports.nextTick = exports.hexToBytes = exports.bytesToHex = exports.isLE = exports.rotr = exports.createView = exports.u32 = exports.u8 = void 0;
    var crypto_1 = require_cryptoNode();
    var u8a2 = (a) => a instanceof Uint8Array;
    var u8 = (arr) => new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength);
    exports.u8 = u8;
    var u322 = (arr) => new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
    exports.u32 = u322;
    var createView = (arr) => new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
    exports.createView = createView;
    var rotr = (word, shift) => word << 32 - shift | word >>> shift;
    exports.rotr = rotr;
    exports.isLE = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
    if (!exports.isLE)
      throw new Error("Non little-endian hardware is not supported");
    var hexes2 = Array.from({ length: 256 }, (v, i) => i.toString(16).padStart(2, "0"));
    function bytesToHex2(bytes2) {
      if (!u8a2(bytes2))
        throw new Error("Uint8Array expected");
      let hex = "";
      for (let i = 0; i < bytes2.length; i++) {
        hex += hexes2[bytes2[i]];
      }
      return hex;
    }
    exports.bytesToHex = bytesToHex2;
    function hexToBytes(hex) {
      if (typeof hex !== "string")
        throw new Error("hex string expected, got " + typeof hex);
      const len = hex.length;
      if (len % 2)
        throw new Error("padded hex string expected, got unpadded hex of length " + len);
      const array = new Uint8Array(len / 2);
      for (let i = 0; i < array.length; i++) {
        const j = i * 2;
        const hexByte = hex.slice(j, j + 2);
        const byte = Number.parseInt(hexByte, 16);
        if (Number.isNaN(byte) || byte < 0)
          throw new Error("Invalid byte sequence");
        array[i] = byte;
      }
      return array;
    }
    exports.hexToBytes = hexToBytes;
    var nextTick = async () => {
    };
    exports.nextTick = nextTick;
    async function asyncLoop(iters, tick, cb) {
      let ts = Date.now();
      for (let i = 0; i < iters; i++) {
        cb(i);
        const diff = Date.now() - ts;
        if (diff >= 0 && diff < tick)
          continue;
        await (0, exports.nextTick)();
        ts += diff;
      }
    }
    exports.asyncLoop = asyncLoop;
    function utf8ToBytes2(str) {
      if (typeof str !== "string")
        throw new Error(`utf8ToBytes expected string, got ${typeof str}`);
      return new Uint8Array(new TextEncoder().encode(str));
    }
    exports.utf8ToBytes = utf8ToBytes2;
    function toBytes2(data) {
      if (typeof data === "string")
        data = utf8ToBytes2(data);
      if (!u8a2(data))
        throw new Error(`expected Uint8Array, got ${typeof data}`);
      return data;
    }
    exports.toBytes = toBytes2;
    function concatBytes(...arrays) {
      const r = new Uint8Array(arrays.reduce((sum, a) => sum + a.length, 0));
      let pad = 0;
      arrays.forEach((a) => {
        if (!u8a2(a))
          throw new Error("Uint8Array expected");
        r.set(a, pad);
        pad += a.length;
      });
      return r;
    }
    exports.concatBytes = concatBytes;
    var Hash2 = class {
      // Safe version that clones internal state
      clone() {
        return this._cloneInto();
      }
    };
    exports.Hash = Hash2;
    var isPlainObject = (obj) => Object.prototype.toString.call(obj) === "[object Object]" && obj.constructor === Object;
    function checkOpts(defaults, opts) {
      if (opts !== void 0 && (typeof opts !== "object" || !isPlainObject(opts)))
        throw new Error("Options should be object or undefined");
      const merged = Object.assign(defaults, opts);
      return merged;
    }
    exports.checkOpts = checkOpts;
    function wrapConstructor2(hashCons) {
      const hashC = (msg) => hashCons().update(toBytes2(msg)).digest();
      const tmp = hashCons();
      hashC.outputLen = tmp.outputLen;
      hashC.blockLen = tmp.blockLen;
      hashC.create = () => hashCons();
      return hashC;
    }
    exports.wrapConstructor = wrapConstructor2;
    function wrapConstructorWithOpts(hashCons) {
      const hashC = (msg, opts) => hashCons(opts).update(toBytes2(msg)).digest();
      const tmp = hashCons({});
      hashC.outputLen = tmp.outputLen;
      hashC.blockLen = tmp.blockLen;
      hashC.create = (opts) => hashCons(opts);
      return hashC;
    }
    exports.wrapConstructorWithOpts = wrapConstructorWithOpts;
    function wrapXOFConstructorWithOpts2(hashCons) {
      const hashC = (msg, opts) => hashCons(opts).update(toBytes2(msg)).digest();
      const tmp = hashCons({});
      hashC.outputLen = tmp.outputLen;
      hashC.blockLen = tmp.blockLen;
      hashC.create = (opts) => hashCons(opts);
      return hashC;
    }
    exports.wrapXOFConstructorWithOpts = wrapXOFConstructorWithOpts2;
    function randomBytes(bytesLength = 32) {
      if (crypto_1.crypto && typeof crypto_1.crypto.getRandomValues === "function") {
        return crypto_1.crypto.getRandomValues(new Uint8Array(bytesLength));
      }
      throw new Error("crypto.getRandomValues must be defined");
    }
    exports.randomBytes = randomBytes;
  }
});

// node_modules/@noble/hashes/_sha2.js
var require_sha2 = __commonJS({
  "node_modules/@noble/hashes/_sha2.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SHA2 = void 0;
    var _assert_js_1 = require_assert();
    var utils_js_1 = require_utils();
    function setBigUint64(view, byteOffset, value, isLE2) {
      if (typeof view.setBigUint64 === "function")
        return view.setBigUint64(byteOffset, value, isLE2);
      const _32n2 = BigInt(32);
      const _u32_max = BigInt(4294967295);
      const wh = Number(value >> _32n2 & _u32_max);
      const wl = Number(value & _u32_max);
      const h = isLE2 ? 4 : 0;
      const l = isLE2 ? 0 : 4;
      view.setUint32(byteOffset + h, wh, isLE2);
      view.setUint32(byteOffset + l, wl, isLE2);
    }
    var SHA2 = class extends utils_js_1.Hash {
      constructor(blockLen, outputLen, padOffset, isLE2) {
        super();
        this.blockLen = blockLen;
        this.outputLen = outputLen;
        this.padOffset = padOffset;
        this.isLE = isLE2;
        this.finished = false;
        this.length = 0;
        this.pos = 0;
        this.destroyed = false;
        this.buffer = new Uint8Array(blockLen);
        this.view = (0, utils_js_1.createView)(this.buffer);
      }
      update(data) {
        _assert_js_1.default.exists(this);
        const { view, buffer, blockLen } = this;
        data = (0, utils_js_1.toBytes)(data);
        const len = data.length;
        for (let pos = 0; pos < len; ) {
          const take = Math.min(blockLen - this.pos, len - pos);
          if (take === blockLen) {
            const dataView = (0, utils_js_1.createView)(data);
            for (; blockLen <= len - pos; pos += blockLen)
              this.process(dataView, pos);
            continue;
          }
          buffer.set(data.subarray(pos, pos + take), this.pos);
          this.pos += take;
          pos += take;
          if (this.pos === blockLen) {
            this.process(view, 0);
            this.pos = 0;
          }
        }
        this.length += data.length;
        this.roundClean();
        return this;
      }
      digestInto(out) {
        _assert_js_1.default.exists(this);
        _assert_js_1.default.output(out, this);
        this.finished = true;
        const { buffer, view, blockLen, isLE: isLE2 } = this;
        let { pos } = this;
        buffer[pos++] = 128;
        this.buffer.subarray(pos).fill(0);
        if (this.padOffset > blockLen - pos) {
          this.process(view, 0);
          pos = 0;
        }
        for (let i = pos; i < blockLen; i++)
          buffer[i] = 0;
        setBigUint64(view, blockLen - 8, BigInt(this.length * 8), isLE2);
        this.process(view, 0);
        const oview = (0, utils_js_1.createView)(out);
        const len = this.outputLen;
        if (len % 4)
          throw new Error("_sha2: outputLen should be aligned to 32bit");
        const outLen = len / 4;
        const state = this.get();
        if (outLen > state.length)
          throw new Error("_sha2: outputLen bigger than state");
        for (let i = 0; i < outLen; i++)
          oview.setUint32(4 * i, state[i], isLE2);
      }
      digest() {
        const { buffer, outputLen } = this;
        this.digestInto(buffer);
        const res = buffer.slice(0, outputLen);
        this.destroy();
        return res;
      }
      _cloneInto(to) {
        to || (to = new this.constructor());
        to.set(...this.get());
        const { blockLen, buffer, length, finished, destroyed, pos } = this;
        to.length = length;
        to.pos = pos;
        to.finished = finished;
        to.destroyed = destroyed;
        if (length % blockLen)
          to.buffer.set(buffer);
        return to;
      }
    };
    exports.SHA2 = SHA2;
  }
});

// node_modules/@noble/hashes/sha256.js
var require_sha256 = __commonJS({
  "node_modules/@noble/hashes/sha256.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.sha224 = exports.sha256 = void 0;
    var _sha2_js_1 = require_sha2();
    var utils_js_1 = require_utils();
    var Chi = (a, b, c) => a & b ^ ~a & c;
    var Maj = (a, b, c) => a & b ^ a & c ^ b & c;
    var SHA256_K = new Uint32Array([
      1116352408,
      1899447441,
      3049323471,
      3921009573,
      961987163,
      1508970993,
      2453635748,
      2870763221,
      3624381080,
      310598401,
      607225278,
      1426881987,
      1925078388,
      2162078206,
      2614888103,
      3248222580,
      3835390401,
      4022224774,
      264347078,
      604807628,
      770255983,
      1249150122,
      1555081692,
      1996064986,
      2554220882,
      2821834349,
      2952996808,
      3210313671,
      3336571891,
      3584528711,
      113926993,
      338241895,
      666307205,
      773529912,
      1294757372,
      1396182291,
      1695183700,
      1986661051,
      2177026350,
      2456956037,
      2730485921,
      2820302411,
      3259730800,
      3345764771,
      3516065817,
      3600352804,
      4094571909,
      275423344,
      430227734,
      506948616,
      659060556,
      883997877,
      958139571,
      1322822218,
      1537002063,
      1747873779,
      1955562222,
      2024104815,
      2227730452,
      2361852424,
      2428436474,
      2756734187,
      3204031479,
      3329325298
    ]);
    var IV = new Uint32Array([
      1779033703,
      3144134277,
      1013904242,
      2773480762,
      1359893119,
      2600822924,
      528734635,
      1541459225
    ]);
    var SHA256_W = new Uint32Array(64);
    var SHA256 = class extends _sha2_js_1.SHA2 {
      constructor() {
        super(64, 32, 8, false);
        this.A = IV[0] | 0;
        this.B = IV[1] | 0;
        this.C = IV[2] | 0;
        this.D = IV[3] | 0;
        this.E = IV[4] | 0;
        this.F = IV[5] | 0;
        this.G = IV[6] | 0;
        this.H = IV[7] | 0;
      }
      get() {
        const { A, B, C, D, E, F, G, H } = this;
        return [A, B, C, D, E, F, G, H];
      }
      // prettier-ignore
      set(A, B, C, D, E, F, G, H) {
        this.A = A | 0;
        this.B = B | 0;
        this.C = C | 0;
        this.D = D | 0;
        this.E = E | 0;
        this.F = F | 0;
        this.G = G | 0;
        this.H = H | 0;
      }
      process(view, offset) {
        for (let i = 0; i < 16; i++, offset += 4)
          SHA256_W[i] = view.getUint32(offset, false);
        for (let i = 16; i < 64; i++) {
          const W15 = SHA256_W[i - 15];
          const W2 = SHA256_W[i - 2];
          const s0 = (0, utils_js_1.rotr)(W15, 7) ^ (0, utils_js_1.rotr)(W15, 18) ^ W15 >>> 3;
          const s1 = (0, utils_js_1.rotr)(W2, 17) ^ (0, utils_js_1.rotr)(W2, 19) ^ W2 >>> 10;
          SHA256_W[i] = s1 + SHA256_W[i - 7] + s0 + SHA256_W[i - 16] | 0;
        }
        let { A, B, C, D, E, F, G, H } = this;
        for (let i = 0; i < 64; i++) {
          const sigma1 = (0, utils_js_1.rotr)(E, 6) ^ (0, utils_js_1.rotr)(E, 11) ^ (0, utils_js_1.rotr)(E, 25);
          const T1 = H + sigma1 + Chi(E, F, G) + SHA256_K[i] + SHA256_W[i] | 0;
          const sigma0 = (0, utils_js_1.rotr)(A, 2) ^ (0, utils_js_1.rotr)(A, 13) ^ (0, utils_js_1.rotr)(A, 22);
          const T2 = sigma0 + Maj(A, B, C) | 0;
          H = G;
          G = F;
          F = E;
          E = D + T1 | 0;
          D = C;
          C = B;
          B = A;
          A = T1 + T2 | 0;
        }
        A = A + this.A | 0;
        B = B + this.B | 0;
        C = C + this.C | 0;
        D = D + this.D | 0;
        E = E + this.E | 0;
        F = F + this.F | 0;
        G = G + this.G | 0;
        H = H + this.H | 0;
        this.set(A, B, C, D, E, F, G, H);
      }
      roundClean() {
        SHA256_W.fill(0);
      }
      destroy() {
        this.set(0, 0, 0, 0, 0, 0, 0, 0);
        this.buffer.fill(0);
      }
    };
    var SHA224 = class extends SHA256 {
      constructor() {
        super();
        this.A = 3238371032 | 0;
        this.B = 914150663 | 0;
        this.C = 812702999 | 0;
        this.D = 4144912697 | 0;
        this.E = 4290775857 | 0;
        this.F = 1750603025 | 0;
        this.G = 1694076839 | 0;
        this.H = 3204075428 | 0;
        this.outputLen = 28;
      }
    };
    exports.sha256 = (0, utils_js_1.wrapConstructor)(() => new SHA256());
    exports.sha224 = (0, utils_js_1.wrapConstructor)(() => new SHA224());
  }
});

// node_modules/@noble/curves/abstract/utils.js
var require_utils2 = __commonJS({
  "node_modules/@noble/curves/abstract/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validateObject = exports.createHmacDrbg = exports.bitMask = exports.bitSet = exports.bitGet = exports.bitLen = exports.utf8ToBytes = exports.equalBytes = exports.concatBytes = exports.ensureBytes = exports.numberToVarBytesBE = exports.numberToBytesLE = exports.numberToBytesBE = exports.bytesToNumberLE = exports.bytesToNumberBE = exports.hexToBytes = exports.hexToNumber = exports.numberToHexUnpadded = exports.bytesToHex = void 0;
    var _0n2 = BigInt(0);
    var _1n2 = BigInt(1);
    var _2n2 = BigInt(2);
    var u8a2 = (a) => a instanceof Uint8Array;
    var hexes2 = Array.from({ length: 256 }, (v, i) => i.toString(16).padStart(2, "0"));
    function bytesToHex2(bytes2) {
      if (!u8a2(bytes2))
        throw new Error("Uint8Array expected");
      let hex = "";
      for (let i = 0; i < bytes2.length; i++) {
        hex += hexes2[bytes2[i]];
      }
      return hex;
    }
    exports.bytesToHex = bytesToHex2;
    function numberToHexUnpadded(num) {
      const hex = num.toString(16);
      return hex.length & 1 ? `0${hex}` : hex;
    }
    exports.numberToHexUnpadded = numberToHexUnpadded;
    function hexToNumber(hex) {
      if (typeof hex !== "string")
        throw new Error("hex string expected, got " + typeof hex);
      return BigInt(hex === "" ? "0" : `0x${hex}`);
    }
    exports.hexToNumber = hexToNumber;
    function hexToBytes(hex) {
      if (typeof hex !== "string")
        throw new Error("hex string expected, got " + typeof hex);
      const len = hex.length;
      if (len % 2)
        throw new Error("padded hex string expected, got unpadded hex of length " + len);
      const array = new Uint8Array(len / 2);
      for (let i = 0; i < array.length; i++) {
        const j = i * 2;
        const hexByte = hex.slice(j, j + 2);
        const byte = Number.parseInt(hexByte, 16);
        if (Number.isNaN(byte) || byte < 0)
          throw new Error("Invalid byte sequence");
        array[i] = byte;
      }
      return array;
    }
    exports.hexToBytes = hexToBytes;
    function bytesToNumberBE(bytes2) {
      return hexToNumber(bytesToHex2(bytes2));
    }
    exports.bytesToNumberBE = bytesToNumberBE;
    function bytesToNumberLE(bytes2) {
      if (!u8a2(bytes2))
        throw new Error("Uint8Array expected");
      return hexToNumber(bytesToHex2(Uint8Array.from(bytes2).reverse()));
    }
    exports.bytesToNumberLE = bytesToNumberLE;
    function numberToBytesBE(n, len) {
      return hexToBytes(n.toString(16).padStart(len * 2, "0"));
    }
    exports.numberToBytesBE = numberToBytesBE;
    function numberToBytesLE(n, len) {
      return numberToBytesBE(n, len).reverse();
    }
    exports.numberToBytesLE = numberToBytesLE;
    function numberToVarBytesBE(n) {
      return hexToBytes(numberToHexUnpadded(n));
    }
    exports.numberToVarBytesBE = numberToVarBytesBE;
    function ensureBytes(title, hex, expectedLength) {
      let res;
      if (typeof hex === "string") {
        try {
          res = hexToBytes(hex);
        } catch (e) {
          throw new Error(`${title} must be valid hex string, got "${hex}". Cause: ${e}`);
        }
      } else if (u8a2(hex)) {
        res = Uint8Array.from(hex);
      } else {
        throw new Error(`${title} must be hex string or Uint8Array`);
      }
      const len = res.length;
      if (typeof expectedLength === "number" && len !== expectedLength)
        throw new Error(`${title} expected ${expectedLength} bytes, got ${len}`);
      return res;
    }
    exports.ensureBytes = ensureBytes;
    function concatBytes(...arrays) {
      const r = new Uint8Array(arrays.reduce((sum, a) => sum + a.length, 0));
      let pad = 0;
      arrays.forEach((a) => {
        if (!u8a2(a))
          throw new Error("Uint8Array expected");
        r.set(a, pad);
        pad += a.length;
      });
      return r;
    }
    exports.concatBytes = concatBytes;
    function equalBytes(b1, b2) {
      if (b1.length !== b2.length)
        return false;
      for (let i = 0; i < b1.length; i++)
        if (b1[i] !== b2[i])
          return false;
      return true;
    }
    exports.equalBytes = equalBytes;
    function utf8ToBytes2(str) {
      if (typeof str !== "string")
        throw new Error(`utf8ToBytes expected string, got ${typeof str}`);
      return new Uint8Array(new TextEncoder().encode(str));
    }
    exports.utf8ToBytes = utf8ToBytes2;
    function bitLen(n) {
      let len;
      for (len = 0; n > _0n2; n >>= _1n2, len += 1)
        ;
      return len;
    }
    exports.bitLen = bitLen;
    function bitGet(n, pos) {
      return n >> BigInt(pos) & _1n2;
    }
    exports.bitGet = bitGet;
    var bitSet = (n, pos, value) => {
      return n | (value ? _1n2 : _0n2) << BigInt(pos);
    };
    exports.bitSet = bitSet;
    var bitMask = (n) => (_2n2 << BigInt(n - 1)) - _1n2;
    exports.bitMask = bitMask;
    var u8n = (data) => new Uint8Array(data);
    var u8fr = (arr) => Uint8Array.from(arr);
    function createHmacDrbg(hashLen, qByteLen, hmacFn) {
      if (typeof hashLen !== "number" || hashLen < 2)
        throw new Error("hashLen must be a number");
      if (typeof qByteLen !== "number" || qByteLen < 2)
        throw new Error("qByteLen must be a number");
      if (typeof hmacFn !== "function")
        throw new Error("hmacFn must be a function");
      let v = u8n(hashLen);
      let k = u8n(hashLen);
      let i = 0;
      const reset = () => {
        v.fill(1);
        k.fill(0);
        i = 0;
      };
      const h = (...b) => hmacFn(k, v, ...b);
      const reseed = (seed = u8n()) => {
        k = h(u8fr([0]), seed);
        v = h();
        if (seed.length === 0)
          return;
        k = h(u8fr([1]), seed);
        v = h();
      };
      const gen2 = () => {
        if (i++ >= 1e3)
          throw new Error("drbg: tried 1000 values");
        let len = 0;
        const out = [];
        while (len < qByteLen) {
          v = h();
          const sl = v.slice();
          out.push(sl);
          len += v.length;
        }
        return concatBytes(...out);
      };
      const genUntil = (seed, pred) => {
        reset();
        reseed(seed);
        let res = void 0;
        while (!(res = pred(gen2())))
          reseed();
        reset();
        return res;
      };
      return genUntil;
    }
    exports.createHmacDrbg = createHmacDrbg;
    var validatorFns = {
      bigint: (val) => typeof val === "bigint",
      function: (val) => typeof val === "function",
      boolean: (val) => typeof val === "boolean",
      string: (val) => typeof val === "string",
      isSafeInteger: (val) => Number.isSafeInteger(val),
      array: (val) => Array.isArray(val),
      field: (val, object) => object.Fp.isValid(val),
      hash: (val) => typeof val === "function" && Number.isSafeInteger(val.outputLen)
    };
    function validateObject(object, validators, optValidators = {}) {
      const checkField = (fieldName, type, isOptional) => {
        const checkVal = validatorFns[type];
        if (typeof checkVal !== "function")
          throw new Error(`Invalid validator "${type}", expected function`);
        const val = object[fieldName];
        if (isOptional && val === void 0)
          return;
        if (!checkVal(val, object)) {
          throw new Error(`Invalid param ${String(fieldName)}=${val} (${typeof val}), expected ${type}`);
        }
      };
      for (const [fieldName, type] of Object.entries(validators))
        checkField(fieldName, type, false);
      for (const [fieldName, type] of Object.entries(optValidators))
        checkField(fieldName, type, true);
      return object;
    }
    exports.validateObject = validateObject;
  }
});

// node_modules/@noble/curves/abstract/modular.js
var require_modular = __commonJS({
  "node_modules/@noble/curves/abstract/modular.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.hashToPrivateScalar = exports.FpSqrtEven = exports.FpSqrtOdd = exports.Field = exports.nLength = exports.FpIsSquare = exports.FpDiv = exports.FpInvertBatch = exports.FpPow = exports.validateField = exports.isNegativeLE = exports.FpSqrt = exports.tonelliShanks = exports.invert = exports.pow2 = exports.pow = exports.mod = void 0;
    var utils_js_1 = require_utils2();
    var _0n2 = BigInt(0);
    var _1n2 = BigInt(1);
    var _2n2 = BigInt(2);
    var _3n = BigInt(3);
    var _4n = BigInt(4);
    var _5n = BigInt(5);
    var _8n = BigInt(8);
    var _9n = BigInt(9);
    var _16n = BigInt(16);
    function mod(a, b) {
      const result = a % b;
      return result >= _0n2 ? result : b + result;
    }
    exports.mod = mod;
    function pow(num, power, modulo) {
      if (modulo <= _0n2 || power < _0n2)
        throw new Error("Expected power/modulo > 0");
      if (modulo === _1n2)
        return _0n2;
      let res = _1n2;
      while (power > _0n2) {
        if (power & _1n2)
          res = res * num % modulo;
        num = num * num % modulo;
        power >>= _1n2;
      }
      return res;
    }
    exports.pow = pow;
    function pow2(x, power, modulo) {
      let res = x;
      while (power-- > _0n2) {
        res *= res;
        res %= modulo;
      }
      return res;
    }
    exports.pow2 = pow2;
    function invert(number2, modulo) {
      if (number2 === _0n2 || modulo <= _0n2) {
        throw new Error(`invert: expected positive integers, got n=${number2} mod=${modulo}`);
      }
      let a = mod(number2, modulo);
      let b = modulo;
      let x = _0n2, y = _1n2, u = _1n2, v = _0n2;
      while (a !== _0n2) {
        const q = b / a;
        const r = b % a;
        const m = x - u * q;
        const n = y - v * q;
        b = a, a = r, x = u, y = v, u = m, v = n;
      }
      const gcd = b;
      if (gcd !== _1n2)
        throw new Error("invert: does not exist");
      return mod(x, modulo);
    }
    exports.invert = invert;
    function tonelliShanks(P) {
      const legendreC = (P - _1n2) / _2n2;
      let Q, S, Z;
      for (Q = P - _1n2, S = 0; Q % _2n2 === _0n2; Q /= _2n2, S++)
        ;
      for (Z = _2n2; Z < P && pow(Z, legendreC, P) !== P - _1n2; Z++)
        ;
      if (S === 1) {
        const p1div4 = (P + _1n2) / _4n;
        return function tonelliFast(Fp, n) {
          const root = Fp.pow(n, p1div4);
          if (!Fp.eql(Fp.sqr(root), n))
            throw new Error("Cannot find square root");
          return root;
        };
      }
      const Q1div2 = (Q + _1n2) / _2n2;
      return function tonelliSlow(Fp, n) {
        if (Fp.pow(n, legendreC) === Fp.neg(Fp.ONE))
          throw new Error("Cannot find square root");
        let r = S;
        let g = Fp.pow(Fp.mul(Fp.ONE, Z), Q);
        let x = Fp.pow(n, Q1div2);
        let b = Fp.pow(n, Q);
        while (!Fp.eql(b, Fp.ONE)) {
          if (Fp.eql(b, Fp.ZERO))
            return Fp.ZERO;
          let m = 1;
          for (let t2 = Fp.sqr(b); m < r; m++) {
            if (Fp.eql(t2, Fp.ONE))
              break;
            t2 = Fp.sqr(t2);
          }
          const ge = Fp.pow(g, _1n2 << BigInt(r - m - 1));
          g = Fp.sqr(ge);
          x = Fp.mul(x, ge);
          b = Fp.mul(b, g);
          r = m;
        }
        return x;
      };
    }
    exports.tonelliShanks = tonelliShanks;
    function FpSqrt(P) {
      if (P % _4n === _3n) {
        const p1div4 = (P + _1n2) / _4n;
        return function sqrt3mod4(Fp, n) {
          const root = Fp.pow(n, p1div4);
          if (!Fp.eql(Fp.sqr(root), n))
            throw new Error("Cannot find square root");
          return root;
        };
      }
      if (P % _8n === _5n) {
        const c1 = (P - _5n) / _8n;
        return function sqrt5mod8(Fp, n) {
          const n2 = Fp.mul(n, _2n2);
          const v = Fp.pow(n2, c1);
          const nv = Fp.mul(n, v);
          const i = Fp.mul(Fp.mul(nv, _2n2), v);
          const root = Fp.mul(nv, Fp.sub(i, Fp.ONE));
          if (!Fp.eql(Fp.sqr(root), n))
            throw new Error("Cannot find square root");
          return root;
        };
      }
      if (P % _16n === _9n) {
      }
      return tonelliShanks(P);
    }
    exports.FpSqrt = FpSqrt;
    var isNegativeLE = (num, modulo) => (mod(num, modulo) & _1n2) === _1n2;
    exports.isNegativeLE = isNegativeLE;
    var FIELD_FIELDS = [
      "create",
      "isValid",
      "is0",
      "neg",
      "inv",
      "sqrt",
      "sqr",
      "eql",
      "add",
      "sub",
      "mul",
      "pow",
      "div",
      "addN",
      "subN",
      "mulN",
      "sqrN"
    ];
    function validateField(field) {
      const initial = {
        ORDER: "bigint",
        MASK: "bigint",
        BYTES: "isSafeInteger",
        BITS: "isSafeInteger"
      };
      const opts = FIELD_FIELDS.reduce((map, val) => {
        map[val] = "function";
        return map;
      }, initial);
      return (0, utils_js_1.validateObject)(field, opts);
    }
    exports.validateField = validateField;
    function FpPow(f, num, power) {
      if (power < _0n2)
        throw new Error("Expected power > 0");
      if (power === _0n2)
        return f.ONE;
      if (power === _1n2)
        return num;
      let p = f.ONE;
      let d = num;
      while (power > _0n2) {
        if (power & _1n2)
          p = f.mul(p, d);
        d = f.sqr(d);
        power >>= _1n2;
      }
      return p;
    }
    exports.FpPow = FpPow;
    function FpInvertBatch(f, nums) {
      const tmp = new Array(nums.length);
      const lastMultiplied = nums.reduce((acc, num, i) => {
        if (f.is0(num))
          return acc;
        tmp[i] = acc;
        return f.mul(acc, num);
      }, f.ONE);
      const inverted = f.inv(lastMultiplied);
      nums.reduceRight((acc, num, i) => {
        if (f.is0(num))
          return acc;
        tmp[i] = f.mul(acc, tmp[i]);
        return f.mul(acc, num);
      }, inverted);
      return tmp;
    }
    exports.FpInvertBatch = FpInvertBatch;
    function FpDiv(f, lhs, rhs) {
      return f.mul(lhs, typeof rhs === "bigint" ? invert(rhs, f.ORDER) : f.inv(rhs));
    }
    exports.FpDiv = FpDiv;
    function FpIsSquare(f) {
      const legendreConst = (f.ORDER - _1n2) / _2n2;
      return (x) => {
        const p = f.pow(x, legendreConst);
        return f.eql(p, f.ZERO) || f.eql(p, f.ONE);
      };
    }
    exports.FpIsSquare = FpIsSquare;
    function nLength(n, nBitLength) {
      const _nBitLength = nBitLength !== void 0 ? nBitLength : n.toString(2).length;
      const nByteLength = Math.ceil(_nBitLength / 8);
      return { nBitLength: _nBitLength, nByteLength };
    }
    exports.nLength = nLength;
    function Field(ORDER, bitLen, isLE2 = false, redef = {}) {
      if (ORDER <= _0n2)
        throw new Error(`Expected Fp ORDER > 0, got ${ORDER}`);
      const { nBitLength: BITS, nByteLength: BYTES } = nLength(ORDER, bitLen);
      if (BYTES > 2048)
        throw new Error("Field lengths over 2048 bytes are not supported");
      const sqrtP = FpSqrt(ORDER);
      const f = Object.freeze({
        ORDER,
        BITS,
        BYTES,
        MASK: (0, utils_js_1.bitMask)(BITS),
        ZERO: _0n2,
        ONE: _1n2,
        create: (num) => mod(num, ORDER),
        isValid: (num) => {
          if (typeof num !== "bigint")
            throw new Error(`Invalid field element: expected bigint, got ${typeof num}`);
          return _0n2 <= num && num < ORDER;
        },
        is0: (num) => num === _0n2,
        isOdd: (num) => (num & _1n2) === _1n2,
        neg: (num) => mod(-num, ORDER),
        eql: (lhs, rhs) => lhs === rhs,
        sqr: (num) => mod(num * num, ORDER),
        add: (lhs, rhs) => mod(lhs + rhs, ORDER),
        sub: (lhs, rhs) => mod(lhs - rhs, ORDER),
        mul: (lhs, rhs) => mod(lhs * rhs, ORDER),
        pow: (num, power) => FpPow(f, num, power),
        div: (lhs, rhs) => mod(lhs * invert(rhs, ORDER), ORDER),
        // Same as above, but doesn't normalize
        sqrN: (num) => num * num,
        addN: (lhs, rhs) => lhs + rhs,
        subN: (lhs, rhs) => lhs - rhs,
        mulN: (lhs, rhs) => lhs * rhs,
        inv: (num) => invert(num, ORDER),
        sqrt: redef.sqrt || ((n) => sqrtP(f, n)),
        invertBatch: (lst) => FpInvertBatch(f, lst),
        // TODO: do we really need constant cmov?
        // We don't have const-time bigints anyway, so probably will be not very useful
        cmov: (a, b, c) => c ? b : a,
        toBytes: (num) => isLE2 ? (0, utils_js_1.numberToBytesLE)(num, BYTES) : (0, utils_js_1.numberToBytesBE)(num, BYTES),
        fromBytes: (bytes2) => {
          if (bytes2.length !== BYTES)
            throw new Error(`Fp.fromBytes: expected ${BYTES}, got ${bytes2.length}`);
          return isLE2 ? (0, utils_js_1.bytesToNumberLE)(bytes2) : (0, utils_js_1.bytesToNumberBE)(bytes2);
        }
      });
      return Object.freeze(f);
    }
    exports.Field = Field;
    function FpSqrtOdd(Fp, elm) {
      if (!Fp.isOdd)
        throw new Error(`Field doesn't have isOdd`);
      const root = Fp.sqrt(elm);
      return Fp.isOdd(root) ? root : Fp.neg(root);
    }
    exports.FpSqrtOdd = FpSqrtOdd;
    function FpSqrtEven(Fp, elm) {
      if (!Fp.isOdd)
        throw new Error(`Field doesn't have isOdd`);
      const root = Fp.sqrt(elm);
      return Fp.isOdd(root) ? Fp.neg(root) : root;
    }
    exports.FpSqrtEven = FpSqrtEven;
    function hashToPrivateScalar(hash2, groupOrder, isLE2 = false) {
      hash2 = (0, utils_js_1.ensureBytes)("privateHash", hash2);
      const hashLen = hash2.length;
      const minLen = nLength(groupOrder).nByteLength + 8;
      if (minLen < 24 || hashLen < minLen || hashLen > 1024)
        throw new Error(`hashToPrivateScalar: expected ${minLen}-1024 bytes of input, got ${hashLen}`);
      const num = isLE2 ? (0, utils_js_1.bytesToNumberLE)(hash2) : (0, utils_js_1.bytesToNumberBE)(hash2);
      return mod(num, groupOrder - _1n2) + _1n2;
    }
    exports.hashToPrivateScalar = hashToPrivateScalar;
  }
});

// node_modules/@noble/curves/abstract/curve.js
var require_curve = __commonJS({
  "node_modules/@noble/curves/abstract/curve.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validateBasic = exports.wNAF = void 0;
    var modular_js_1 = require_modular();
    var utils_js_1 = require_utils2();
    var _0n2 = BigInt(0);
    var _1n2 = BigInt(1);
    function wNAF(c, bits) {
      const constTimeNegate = (condition, item) => {
        const neg = item.negate();
        return condition ? neg : item;
      };
      const opts = (W) => {
        const windows = Math.ceil(bits / W) + 1;
        const windowSize = 2 ** (W - 1);
        return { windows, windowSize };
      };
      return {
        constTimeNegate,
        // non-const time multiplication ladder
        unsafeLadder(elm, n) {
          let p = c.ZERO;
          let d = elm;
          while (n > _0n2) {
            if (n & _1n2)
              p = p.add(d);
            d = d.double();
            n >>= _1n2;
          }
          return p;
        },
        /**
         * Creates a wNAF precomputation window. Used for caching.
         * Default window size is set by `utils.precompute()` and is equal to 8.
         * Number of precomputed points depends on the curve size:
         * 2^(𝑊−1) * (Math.ceil(𝑛 / 𝑊) + 1), where:
         * - 𝑊 is the window size
         * - 𝑛 is the bitlength of the curve order.
         * For a 256-bit curve and window size 8, the number of precomputed points is 128 * 33 = 4224.
         * @returns precomputed point tables flattened to a single array
         */
        precomputeWindow(elm, W) {
          const { windows, windowSize } = opts(W);
          const points = [];
          let p = elm;
          let base = p;
          for (let window2 = 0; window2 < windows; window2++) {
            base = p;
            points.push(base);
            for (let i = 1; i < windowSize; i++) {
              base = base.add(p);
              points.push(base);
            }
            p = base.double();
          }
          return points;
        },
        /**
         * Implements ec multiplication using precomputed tables and w-ary non-adjacent form.
         * @param W window size
         * @param precomputes precomputed tables
         * @param n scalar (we don't check here, but should be less than curve order)
         * @returns real and fake (for const-time) points
         */
        wNAF(W, precomputes, n) {
          const { windows, windowSize } = opts(W);
          let p = c.ZERO;
          let f = c.BASE;
          const mask = BigInt(2 ** W - 1);
          const maxNumber = 2 ** W;
          const shiftBy = BigInt(W);
          for (let window2 = 0; window2 < windows; window2++) {
            const offset = window2 * windowSize;
            let wbits = Number(n & mask);
            n >>= shiftBy;
            if (wbits > windowSize) {
              wbits -= maxNumber;
              n += _1n2;
            }
            const offset1 = offset;
            const offset2 = offset + Math.abs(wbits) - 1;
            const cond1 = window2 % 2 !== 0;
            const cond2 = wbits < 0;
            if (wbits === 0) {
              f = f.add(constTimeNegate(cond1, precomputes[offset1]));
            } else {
              p = p.add(constTimeNegate(cond2, precomputes[offset2]));
            }
          }
          return { p, f };
        },
        wNAFCached(P, precomputesMap, n, transform) {
          const W = P._WINDOW_SIZE || 1;
          let comp = precomputesMap.get(P);
          if (!comp) {
            comp = this.precomputeWindow(P, W);
            if (W !== 1) {
              precomputesMap.set(P, transform(comp));
            }
          }
          return this.wNAF(W, comp, n);
        }
      };
    }
    exports.wNAF = wNAF;
    function validateBasic(curve) {
      (0, modular_js_1.validateField)(curve.Fp);
      (0, utils_js_1.validateObject)(curve, {
        n: "bigint",
        h: "bigint",
        Gx: "field",
        Gy: "field"
      }, {
        nBitLength: "isSafeInteger",
        nByteLength: "isSafeInteger"
      });
      return Object.freeze({
        ...(0, modular_js_1.nLength)(curve.n, curve.nBitLength),
        ...curve,
        ...{ p: curve.Fp.ORDER }
      });
    }
    exports.validateBasic = validateBasic;
  }
});

// node_modules/@noble/curves/abstract/weierstrass.js
var require_weierstrass = __commonJS({
  "node_modules/@noble/curves/abstract/weierstrass.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.mapToCurveSimpleSWU = exports.SWUFpSqrtRatio = exports.weierstrass = exports.weierstrassPoints = exports.DER = void 0;
    var mod = require_modular();
    var ut = require_utils2();
    var utils_js_1 = require_utils2();
    var curve_js_1 = require_curve();
    function validatePointOpts(curve) {
      const opts = (0, curve_js_1.validateBasic)(curve);
      ut.validateObject(opts, {
        a: "field",
        b: "field"
      }, {
        allowedPrivateKeyLengths: "array",
        wrapPrivateKey: "boolean",
        isTorsionFree: "function",
        clearCofactor: "function",
        allowInfinityPoint: "boolean",
        fromBytes: "function",
        toBytes: "function"
      });
      const { endo, Fp, a } = opts;
      if (endo) {
        if (!Fp.eql(a, Fp.ZERO)) {
          throw new Error("Endomorphism can only be defined for Koblitz curves that have a=0");
        }
        if (typeof endo !== "object" || typeof endo.beta !== "bigint" || typeof endo.splitScalar !== "function") {
          throw new Error("Expected endomorphism with beta: bigint and splitScalar: function");
        }
      }
      return Object.freeze({ ...opts });
    }
    var { bytesToNumberBE: b2n, hexToBytes: h2b } = ut;
    exports.DER = {
      // asn.1 DER encoding utils
      Err: class DERErr extends Error {
        constructor(m = "") {
          super(m);
        }
      },
      _parseInt(data) {
        const { Err: E } = exports.DER;
        if (data.length < 2 || data[0] !== 2)
          throw new E("Invalid signature integer tag");
        const len = data[1];
        const res = data.subarray(2, len + 2);
        if (!len || res.length !== len)
          throw new E("Invalid signature integer: wrong length");
        if (res[0] & 128)
          throw new E("Invalid signature integer: negative");
        if (res[0] === 0 && !(res[1] & 128))
          throw new E("Invalid signature integer: unnecessary leading zero");
        return { d: b2n(res), l: data.subarray(len + 2) };
      },
      toSig(hex) {
        const { Err: E } = exports.DER;
        const data = typeof hex === "string" ? h2b(hex) : hex;
        if (!(data instanceof Uint8Array))
          throw new Error("ui8a expected");
        let l = data.length;
        if (l < 2 || data[0] != 48)
          throw new E("Invalid signature tag");
        if (data[1] !== l - 2)
          throw new E("Invalid signature: incorrect length");
        const { d: r, l: sBytes } = exports.DER._parseInt(data.subarray(2));
        const { d: s, l: rBytesLeft } = exports.DER._parseInt(sBytes);
        if (rBytesLeft.length)
          throw new E("Invalid signature: left bytes after parsing");
        return { r, s };
      },
      hexFromSig(sig) {
        const slice = (s2) => Number.parseInt(s2[0], 16) & 8 ? "00" + s2 : s2;
        const h = (num) => {
          const hex = num.toString(16);
          return hex.length & 1 ? `0${hex}` : hex;
        };
        const s = slice(h(sig.s));
        const r = slice(h(sig.r));
        const shl = s.length / 2;
        const rhl = r.length / 2;
        const sl = h(shl);
        const rl = h(rhl);
        return `30${h(rhl + shl + 4)}02${rl}${r}02${sl}${s}`;
      }
    };
    var _0n2 = BigInt(0);
    var _1n2 = BigInt(1);
    var _2n2 = BigInt(2);
    var _3n = BigInt(3);
    var _4n = BigInt(4);
    function weierstrassPoints(opts) {
      const CURVE = validatePointOpts(opts);
      const { Fp } = CURVE;
      const toBytes2 = CURVE.toBytes || ((c, point, isCompressed) => {
        const a = point.toAffine();
        return ut.concatBytes(Uint8Array.from([4]), Fp.toBytes(a.x), Fp.toBytes(a.y));
      });
      const fromBytes = CURVE.fromBytes || ((bytes2) => {
        const tail = bytes2.subarray(1);
        const x = Fp.fromBytes(tail.subarray(0, Fp.BYTES));
        const y = Fp.fromBytes(tail.subarray(Fp.BYTES, 2 * Fp.BYTES));
        return { x, y };
      });
      function weierstrassEquation(x) {
        const { a, b } = CURVE;
        const x2 = Fp.sqr(x);
        const x3 = Fp.mul(x2, x);
        return Fp.add(Fp.add(x3, Fp.mul(x, a)), b);
      }
      if (!Fp.eql(Fp.sqr(CURVE.Gy), weierstrassEquation(CURVE.Gx)))
        throw new Error("bad generator point: equation left != right");
      function isWithinCurveOrder(num) {
        return typeof num === "bigint" && _0n2 < num && num < CURVE.n;
      }
      function assertGE(num) {
        if (!isWithinCurveOrder(num))
          throw new Error("Expected valid bigint: 0 < bigint < curve.n");
      }
      function normPrivateKeyToScalar(key) {
        const { allowedPrivateKeyLengths: lengths, nByteLength, wrapPrivateKey, n } = CURVE;
        if (lengths && typeof key !== "bigint") {
          if (key instanceof Uint8Array)
            key = ut.bytesToHex(key);
          if (typeof key !== "string" || !lengths.includes(key.length))
            throw new Error("Invalid key");
          key = key.padStart(nByteLength * 2, "0");
        }
        let num;
        try {
          num = typeof key === "bigint" ? key : ut.bytesToNumberBE((0, utils_js_1.ensureBytes)("private key", key, nByteLength));
        } catch (error) {
          throw new Error(`private key must be ${nByteLength} bytes, hex or bigint, not ${typeof key}`);
        }
        if (wrapPrivateKey)
          num = mod.mod(num, n);
        assertGE(num);
        return num;
      }
      const pointPrecomputes = /* @__PURE__ */ new Map();
      function assertPrjPoint(other) {
        if (!(other instanceof Point))
          throw new Error("ProjectivePoint expected");
      }
      class Point {
        constructor(px, py, pz) {
          this.px = px;
          this.py = py;
          this.pz = pz;
          if (px == null || !Fp.isValid(px))
            throw new Error("x required");
          if (py == null || !Fp.isValid(py))
            throw new Error("y required");
          if (pz == null || !Fp.isValid(pz))
            throw new Error("z required");
        }
        // Does not validate if the point is on-curve.
        // Use fromHex instead, or call assertValidity() later.
        static fromAffine(p) {
          const { x, y } = p || {};
          if (!p || !Fp.isValid(x) || !Fp.isValid(y))
            throw new Error("invalid affine point");
          if (p instanceof Point)
            throw new Error("projective point not allowed");
          const is0 = (i) => Fp.eql(i, Fp.ZERO);
          if (is0(x) && is0(y))
            return Point.ZERO;
          return new Point(x, y, Fp.ONE);
        }
        get x() {
          return this.toAffine().x;
        }
        get y() {
          return this.toAffine().y;
        }
        /**
         * Takes a bunch of Projective Points but executes only one
         * inversion on all of them. Inversion is very slow operation,
         * so this improves performance massively.
         * Optimization: converts a list of projective points to a list of identical points with Z=1.
         */
        static normalizeZ(points) {
          const toInv = Fp.invertBatch(points.map((p) => p.pz));
          return points.map((p, i) => p.toAffine(toInv[i])).map(Point.fromAffine);
        }
        /**
         * Converts hash string or Uint8Array to Point.
         * @param hex short/long ECDSA hex
         */
        static fromHex(hex) {
          const P = Point.fromAffine(fromBytes((0, utils_js_1.ensureBytes)("pointHex", hex)));
          P.assertValidity();
          return P;
        }
        // Multiplies generator point by privateKey.
        static fromPrivateKey(privateKey) {
          return Point.BASE.multiply(normPrivateKeyToScalar(privateKey));
        }
        // "Private method", don't use it directly
        _setWindowSize(windowSize) {
          this._WINDOW_SIZE = windowSize;
          pointPrecomputes.delete(this);
        }
        // A point on curve is valid if it conforms to equation.
        assertValidity() {
          if (this.is0()) {
            if (CURVE.allowInfinityPoint)
              return;
            throw new Error("bad point: ZERO");
          }
          const { x, y } = this.toAffine();
          if (!Fp.isValid(x) || !Fp.isValid(y))
            throw new Error("bad point: x or y not FE");
          const left = Fp.sqr(y);
          const right = weierstrassEquation(x);
          if (!Fp.eql(left, right))
            throw new Error("bad point: equation left != right");
          if (!this.isTorsionFree())
            throw new Error("bad point: not in prime-order subgroup");
        }
        hasEvenY() {
          const { y } = this.toAffine();
          if (Fp.isOdd)
            return !Fp.isOdd(y);
          throw new Error("Field doesn't support isOdd");
        }
        /**
         * Compare one point to another.
         */
        equals(other) {
          assertPrjPoint(other);
          const { px: X1, py: Y1, pz: Z1 } = this;
          const { px: X2, py: Y2, pz: Z2 } = other;
          const U1 = Fp.eql(Fp.mul(X1, Z2), Fp.mul(X2, Z1));
          const U2 = Fp.eql(Fp.mul(Y1, Z2), Fp.mul(Y2, Z1));
          return U1 && U2;
        }
        /**
         * Flips point to one corresponding to (x, -y) in Affine coordinates.
         */
        negate() {
          return new Point(this.px, Fp.neg(this.py), this.pz);
        }
        // Renes-Costello-Batina exception-free doubling formula.
        // There is 30% faster Jacobian formula, but it is not complete.
        // https://eprint.iacr.org/2015/1060, algorithm 3
        // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
        double() {
          const { a, b } = CURVE;
          const b3 = Fp.mul(b, _3n);
          const { px: X1, py: Y1, pz: Z1 } = this;
          let X3 = Fp.ZERO, Y3 = Fp.ZERO, Z3 = Fp.ZERO;
          let t0 = Fp.mul(X1, X1);
          let t1 = Fp.mul(Y1, Y1);
          let t2 = Fp.mul(Z1, Z1);
          let t3 = Fp.mul(X1, Y1);
          t3 = Fp.add(t3, t3);
          Z3 = Fp.mul(X1, Z1);
          Z3 = Fp.add(Z3, Z3);
          X3 = Fp.mul(a, Z3);
          Y3 = Fp.mul(b3, t2);
          Y3 = Fp.add(X3, Y3);
          X3 = Fp.sub(t1, Y3);
          Y3 = Fp.add(t1, Y3);
          Y3 = Fp.mul(X3, Y3);
          X3 = Fp.mul(t3, X3);
          Z3 = Fp.mul(b3, Z3);
          t2 = Fp.mul(a, t2);
          t3 = Fp.sub(t0, t2);
          t3 = Fp.mul(a, t3);
          t3 = Fp.add(t3, Z3);
          Z3 = Fp.add(t0, t0);
          t0 = Fp.add(Z3, t0);
          t0 = Fp.add(t0, t2);
          t0 = Fp.mul(t0, t3);
          Y3 = Fp.add(Y3, t0);
          t2 = Fp.mul(Y1, Z1);
          t2 = Fp.add(t2, t2);
          t0 = Fp.mul(t2, t3);
          X3 = Fp.sub(X3, t0);
          Z3 = Fp.mul(t2, t1);
          Z3 = Fp.add(Z3, Z3);
          Z3 = Fp.add(Z3, Z3);
          return new Point(X3, Y3, Z3);
        }
        // Renes-Costello-Batina exception-free addition formula.
        // There is 30% faster Jacobian formula, but it is not complete.
        // https://eprint.iacr.org/2015/1060, algorithm 1
        // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
        add(other) {
          assertPrjPoint(other);
          const { px: X1, py: Y1, pz: Z1 } = this;
          const { px: X2, py: Y2, pz: Z2 } = other;
          let X3 = Fp.ZERO, Y3 = Fp.ZERO, Z3 = Fp.ZERO;
          const a = CURVE.a;
          const b3 = Fp.mul(CURVE.b, _3n);
          let t0 = Fp.mul(X1, X2);
          let t1 = Fp.mul(Y1, Y2);
          let t2 = Fp.mul(Z1, Z2);
          let t3 = Fp.add(X1, Y1);
          let t4 = Fp.add(X2, Y2);
          t3 = Fp.mul(t3, t4);
          t4 = Fp.add(t0, t1);
          t3 = Fp.sub(t3, t4);
          t4 = Fp.add(X1, Z1);
          let t5 = Fp.add(X2, Z2);
          t4 = Fp.mul(t4, t5);
          t5 = Fp.add(t0, t2);
          t4 = Fp.sub(t4, t5);
          t5 = Fp.add(Y1, Z1);
          X3 = Fp.add(Y2, Z2);
          t5 = Fp.mul(t5, X3);
          X3 = Fp.add(t1, t2);
          t5 = Fp.sub(t5, X3);
          Z3 = Fp.mul(a, t4);
          X3 = Fp.mul(b3, t2);
          Z3 = Fp.add(X3, Z3);
          X3 = Fp.sub(t1, Z3);
          Z3 = Fp.add(t1, Z3);
          Y3 = Fp.mul(X3, Z3);
          t1 = Fp.add(t0, t0);
          t1 = Fp.add(t1, t0);
          t2 = Fp.mul(a, t2);
          t4 = Fp.mul(b3, t4);
          t1 = Fp.add(t1, t2);
          t2 = Fp.sub(t0, t2);
          t2 = Fp.mul(a, t2);
          t4 = Fp.add(t4, t2);
          t0 = Fp.mul(t1, t4);
          Y3 = Fp.add(Y3, t0);
          t0 = Fp.mul(t5, t4);
          X3 = Fp.mul(t3, X3);
          X3 = Fp.sub(X3, t0);
          t0 = Fp.mul(t3, t1);
          Z3 = Fp.mul(t5, Z3);
          Z3 = Fp.add(Z3, t0);
          return new Point(X3, Y3, Z3);
        }
        subtract(other) {
          return this.add(other.negate());
        }
        is0() {
          return this.equals(Point.ZERO);
        }
        wNAF(n) {
          return wnaf.wNAFCached(this, pointPrecomputes, n, (comp) => {
            const toInv = Fp.invertBatch(comp.map((p) => p.pz));
            return comp.map((p, i) => p.toAffine(toInv[i])).map(Point.fromAffine);
          });
        }
        /**
         * Non-constant-time multiplication. Uses double-and-add algorithm.
         * It's faster, but should only be used when you don't care about
         * an exposed private key e.g. sig verification, which works over *public* keys.
         */
        multiplyUnsafe(n) {
          const I = Point.ZERO;
          if (n === _0n2)
            return I;
          assertGE(n);
          if (n === _1n2)
            return this;
          const { endo } = CURVE;
          if (!endo)
            return wnaf.unsafeLadder(this, n);
          let { k1neg, k1, k2neg, k2 } = endo.splitScalar(n);
          let k1p = I;
          let k2p = I;
          let d = this;
          while (k1 > _0n2 || k2 > _0n2) {
            if (k1 & _1n2)
              k1p = k1p.add(d);
            if (k2 & _1n2)
              k2p = k2p.add(d);
            d = d.double();
            k1 >>= _1n2;
            k2 >>= _1n2;
          }
          if (k1neg)
            k1p = k1p.negate();
          if (k2neg)
            k2p = k2p.negate();
          k2p = new Point(Fp.mul(k2p.px, endo.beta), k2p.py, k2p.pz);
          return k1p.add(k2p);
        }
        /**
         * Constant time multiplication.
         * Uses wNAF method. Windowed method may be 10% faster,
         * but takes 2x longer to generate and consumes 2x memory.
         * Uses precomputes when available.
         * Uses endomorphism for Koblitz curves.
         * @param scalar by which the point would be multiplied
         * @returns New point
         */
        multiply(scalar) {
          assertGE(scalar);
          let n = scalar;
          let point, fake;
          const { endo } = CURVE;
          if (endo) {
            const { k1neg, k1, k2neg, k2 } = endo.splitScalar(n);
            let { p: k1p, f: f1p } = this.wNAF(k1);
            let { p: k2p, f: f2p } = this.wNAF(k2);
            k1p = wnaf.constTimeNegate(k1neg, k1p);
            k2p = wnaf.constTimeNegate(k2neg, k2p);
            k2p = new Point(Fp.mul(k2p.px, endo.beta), k2p.py, k2p.pz);
            point = k1p.add(k2p);
            fake = f1p.add(f2p);
          } else {
            const { p, f } = this.wNAF(n);
            point = p;
            fake = f;
          }
          return Point.normalizeZ([point, fake])[0];
        }
        /**
         * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
         * Not using Strauss-Shamir trick: precomputation tables are faster.
         * The trick could be useful if both P and Q are not G (not in our case).
         * @returns non-zero affine point
         */
        multiplyAndAddUnsafe(Q, a, b) {
          const G = Point.BASE;
          const mul = (P, a2) => a2 === _0n2 || a2 === _1n2 || !P.equals(G) ? P.multiplyUnsafe(a2) : P.multiply(a2);
          const sum = mul(this, a).add(mul(Q, b));
          return sum.is0() ? void 0 : sum;
        }
        // Converts Projective point to affine (x, y) coordinates.
        // Can accept precomputed Z^-1 - for example, from invertBatch.
        // (x, y, z) ∋ (x=x/z, y=y/z)
        toAffine(iz) {
          const { px: x, py: y, pz: z } = this;
          const is0 = this.is0();
          if (iz == null)
            iz = is0 ? Fp.ONE : Fp.inv(z);
          const ax = Fp.mul(x, iz);
          const ay = Fp.mul(y, iz);
          const zz = Fp.mul(z, iz);
          if (is0)
            return { x: Fp.ZERO, y: Fp.ZERO };
          if (!Fp.eql(zz, Fp.ONE))
            throw new Error("invZ was invalid");
          return { x: ax, y: ay };
        }
        isTorsionFree() {
          const { h: cofactor, isTorsionFree } = CURVE;
          if (cofactor === _1n2)
            return true;
          if (isTorsionFree)
            return isTorsionFree(Point, this);
          throw new Error("isTorsionFree() has not been declared for the elliptic curve");
        }
        clearCofactor() {
          const { h: cofactor, clearCofactor } = CURVE;
          if (cofactor === _1n2)
            return this;
          if (clearCofactor)
            return clearCofactor(Point, this);
          return this.multiplyUnsafe(CURVE.h);
        }
        toRawBytes(isCompressed = true) {
          this.assertValidity();
          return toBytes2(Point, this, isCompressed);
        }
        toHex(isCompressed = true) {
          return ut.bytesToHex(this.toRawBytes(isCompressed));
        }
      }
      Point.BASE = new Point(CURVE.Gx, CURVE.Gy, Fp.ONE);
      Point.ZERO = new Point(Fp.ZERO, Fp.ONE, Fp.ZERO);
      const _bits = CURVE.nBitLength;
      const wnaf = (0, curve_js_1.wNAF)(Point, CURVE.endo ? Math.ceil(_bits / 2) : _bits);
      return {
        CURVE,
        ProjectivePoint: Point,
        normPrivateKeyToScalar,
        weierstrassEquation,
        isWithinCurveOrder
      };
    }
    exports.weierstrassPoints = weierstrassPoints;
    function validateOpts(curve) {
      const opts = (0, curve_js_1.validateBasic)(curve);
      ut.validateObject(opts, {
        hash: "hash",
        hmac: "function",
        randomBytes: "function"
      }, {
        bits2int: "function",
        bits2int_modN: "function",
        lowS: "boolean"
      });
      return Object.freeze({ lowS: true, ...opts });
    }
    function weierstrass(curveDef) {
      const CURVE = validateOpts(curveDef);
      const { Fp, n: CURVE_ORDER } = CURVE;
      const compressedLen = Fp.BYTES + 1;
      const uncompressedLen = 2 * Fp.BYTES + 1;
      function isValidFieldElement(num) {
        return _0n2 < num && num < Fp.ORDER;
      }
      function modN(a) {
        return mod.mod(a, CURVE_ORDER);
      }
      function invN(a) {
        return mod.invert(a, CURVE_ORDER);
      }
      const { ProjectivePoint: Point, normPrivateKeyToScalar, weierstrassEquation, isWithinCurveOrder } = weierstrassPoints({
        ...CURVE,
        toBytes(c, point, isCompressed) {
          const a = point.toAffine();
          const x = Fp.toBytes(a.x);
          const cat = ut.concatBytes;
          if (isCompressed) {
            return cat(Uint8Array.from([point.hasEvenY() ? 2 : 3]), x);
          } else {
            return cat(Uint8Array.from([4]), x, Fp.toBytes(a.y));
          }
        },
        fromBytes(bytes2) {
          const len = bytes2.length;
          const head = bytes2[0];
          const tail = bytes2.subarray(1);
          if (len === compressedLen && (head === 2 || head === 3)) {
            const x = ut.bytesToNumberBE(tail);
            if (!isValidFieldElement(x))
              throw new Error("Point is not on curve");
            const y2 = weierstrassEquation(x);
            let y = Fp.sqrt(y2);
            const isYOdd = (y & _1n2) === _1n2;
            const isHeadOdd = (head & 1) === 1;
            if (isHeadOdd !== isYOdd)
              y = Fp.neg(y);
            return { x, y };
          } else if (len === uncompressedLen && head === 4) {
            const x = Fp.fromBytes(tail.subarray(0, Fp.BYTES));
            const y = Fp.fromBytes(tail.subarray(Fp.BYTES, 2 * Fp.BYTES));
            return { x, y };
          } else {
            throw new Error(`Point of length ${len} was invalid. Expected ${compressedLen} compressed bytes or ${uncompressedLen} uncompressed bytes`);
          }
        }
      });
      const numToNByteStr = (num) => ut.bytesToHex(ut.numberToBytesBE(num, CURVE.nByteLength));
      function isBiggerThanHalfOrder(number2) {
        const HALF = CURVE_ORDER >> _1n2;
        return number2 > HALF;
      }
      function normalizeS(s) {
        return isBiggerThanHalfOrder(s) ? modN(-s) : s;
      }
      const slcNum = (b, from, to) => ut.bytesToNumberBE(b.slice(from, to));
      class Signature {
        constructor(r, s, recovery) {
          this.r = r;
          this.s = s;
          this.recovery = recovery;
          this.assertValidity();
        }
        // pair (bytes of r, bytes of s)
        static fromCompact(hex) {
          const l = CURVE.nByteLength;
          hex = (0, utils_js_1.ensureBytes)("compactSignature", hex, l * 2);
          return new Signature(slcNum(hex, 0, l), slcNum(hex, l, 2 * l));
        }
        // DER encoded ECDSA signature
        // https://bitcoin.stackexchange.com/questions/57644/what-are-the-parts-of-a-bitcoin-transaction-input-script
        static fromDER(hex) {
          const { r, s } = exports.DER.toSig((0, utils_js_1.ensureBytes)("DER", hex));
          return new Signature(r, s);
        }
        assertValidity() {
          if (!isWithinCurveOrder(this.r))
            throw new Error("r must be 0 < r < CURVE.n");
          if (!isWithinCurveOrder(this.s))
            throw new Error("s must be 0 < s < CURVE.n");
        }
        addRecoveryBit(recovery) {
          return new Signature(this.r, this.s, recovery);
        }
        recoverPublicKey(msgHash) {
          const { r, s, recovery: rec } = this;
          const h = bits2int_modN((0, utils_js_1.ensureBytes)("msgHash", msgHash));
          if (rec == null || ![0, 1, 2, 3].includes(rec))
            throw new Error("recovery id invalid");
          const radj = rec === 2 || rec === 3 ? r + CURVE.n : r;
          if (radj >= Fp.ORDER)
            throw new Error("recovery id 2 or 3 invalid");
          const prefix = (rec & 1) === 0 ? "02" : "03";
          const R = Point.fromHex(prefix + numToNByteStr(radj));
          const ir = invN(radj);
          const u1 = modN(-h * ir);
          const u2 = modN(s * ir);
          const Q = Point.BASE.multiplyAndAddUnsafe(R, u1, u2);
          if (!Q)
            throw new Error("point at infinify");
          Q.assertValidity();
          return Q;
        }
        // Signatures should be low-s, to prevent malleability.
        hasHighS() {
          return isBiggerThanHalfOrder(this.s);
        }
        normalizeS() {
          return this.hasHighS() ? new Signature(this.r, modN(-this.s), this.recovery) : this;
        }
        // DER-encoded
        toDERRawBytes() {
          return ut.hexToBytes(this.toDERHex());
        }
        toDERHex() {
          return exports.DER.hexFromSig({ r: this.r, s: this.s });
        }
        // padded bytes of r, then padded bytes of s
        toCompactRawBytes() {
          return ut.hexToBytes(this.toCompactHex());
        }
        toCompactHex() {
          return numToNByteStr(this.r) + numToNByteStr(this.s);
        }
      }
      const utils = {
        isValidPrivateKey(privateKey) {
          try {
            normPrivateKeyToScalar(privateKey);
            return true;
          } catch (error) {
            return false;
          }
        },
        normPrivateKeyToScalar,
        /**
         * Produces cryptographically secure private key from random of size (nBitLength+64)
         * as per FIPS 186 B.4.1 with modulo bias being neglible.
         */
        randomPrivateKey: () => {
          const rand = CURVE.randomBytes(Fp.BYTES + 8);
          const num = mod.hashToPrivateScalar(rand, CURVE_ORDER);
          return ut.numberToBytesBE(num, CURVE.nByteLength);
        },
        /**
         * Creates precompute table for an arbitrary EC point. Makes point "cached".
         * Allows to massively speed-up `point.multiply(scalar)`.
         * @returns cached point
         * @example
         * const fast = utils.precompute(8, ProjectivePoint.fromHex(someonesPubKey));
         * fast.multiply(privKey); // much faster ECDH now
         */
        precompute(windowSize = 8, point = Point.BASE) {
          point._setWindowSize(windowSize);
          point.multiply(BigInt(3));
          return point;
        }
      };
      function getPublicKey(privateKey, isCompressed = true) {
        return Point.fromPrivateKey(privateKey).toRawBytes(isCompressed);
      }
      function isProbPub(item) {
        const arr = item instanceof Uint8Array;
        const str = typeof item === "string";
        const len = (arr || str) && item.length;
        if (arr)
          return len === compressedLen || len === uncompressedLen;
        if (str)
          return len === 2 * compressedLen || len === 2 * uncompressedLen;
        if (item instanceof Point)
          return true;
        return false;
      }
      function getSharedSecret(privateA, publicB, isCompressed = true) {
        if (isProbPub(privateA))
          throw new Error("first arg must be private key");
        if (!isProbPub(publicB))
          throw new Error("second arg must be public key");
        const b = Point.fromHex(publicB);
        return b.multiply(normPrivateKeyToScalar(privateA)).toRawBytes(isCompressed);
      }
      const bits2int = CURVE.bits2int || function(bytes2) {
        const num = ut.bytesToNumberBE(bytes2);
        const delta = bytes2.length * 8 - CURVE.nBitLength;
        return delta > 0 ? num >> BigInt(delta) : num;
      };
      const bits2int_modN = CURVE.bits2int_modN || function(bytes2) {
        return modN(bits2int(bytes2));
      };
      const ORDER_MASK = ut.bitMask(CURVE.nBitLength);
      function int2octets(num) {
        if (typeof num !== "bigint")
          throw new Error("bigint expected");
        if (!(_0n2 <= num && num < ORDER_MASK))
          throw new Error(`bigint expected < 2^${CURVE.nBitLength}`);
        return ut.numberToBytesBE(num, CURVE.nByteLength);
      }
      function prepSig(msgHash, privateKey, opts = defaultSigOpts) {
        if (["recovered", "canonical"].some((k) => k in opts))
          throw new Error("sign() legacy options not supported");
        const { hash: hash2, randomBytes } = CURVE;
        let { lowS, prehash, extraEntropy: ent } = opts;
        if (lowS == null)
          lowS = true;
        msgHash = (0, utils_js_1.ensureBytes)("msgHash", msgHash);
        if (prehash)
          msgHash = (0, utils_js_1.ensureBytes)("prehashed msgHash", hash2(msgHash));
        const h1int = bits2int_modN(msgHash);
        const d = normPrivateKeyToScalar(privateKey);
        const seedArgs = [int2octets(d), int2octets(h1int)];
        if (ent != null) {
          const e = ent === true ? randomBytes(Fp.BYTES) : ent;
          seedArgs.push((0, utils_js_1.ensureBytes)("extraEntropy", e, Fp.BYTES));
        }
        const seed = ut.concatBytes(...seedArgs);
        const m = h1int;
        function k2sig(kBytes) {
          const k = bits2int(kBytes);
          if (!isWithinCurveOrder(k))
            return;
          const ik = invN(k);
          const q = Point.BASE.multiply(k).toAffine();
          const r = modN(q.x);
          if (r === _0n2)
            return;
          const s = modN(ik * modN(m + r * d));
          if (s === _0n2)
            return;
          let recovery = (q.x === r ? 0 : 2) | Number(q.y & _1n2);
          let normS = s;
          if (lowS && isBiggerThanHalfOrder(s)) {
            normS = normalizeS(s);
            recovery ^= 1;
          }
          return new Signature(r, normS, recovery);
        }
        return { seed, k2sig };
      }
      const defaultSigOpts = { lowS: CURVE.lowS, prehash: false };
      const defaultVerOpts = { lowS: CURVE.lowS, prehash: false };
      function sign2(msgHash, privKey, opts = defaultSigOpts) {
        const { seed, k2sig } = prepSig(msgHash, privKey, opts);
        const C = CURVE;
        const drbg = ut.createHmacDrbg(C.hash.outputLen, C.nByteLength, C.hmac);
        return drbg(seed, k2sig);
      }
      Point.BASE._setWindowSize(8);
      function verify(signature, msgHash, publicKey, opts = defaultVerOpts) {
        const sg = signature;
        msgHash = (0, utils_js_1.ensureBytes)("msgHash", msgHash);
        publicKey = (0, utils_js_1.ensureBytes)("publicKey", publicKey);
        if ("strict" in opts)
          throw new Error("options.strict was renamed to lowS");
        const { lowS, prehash } = opts;
        let _sig = void 0;
        let P;
        try {
          if (typeof sg === "string" || sg instanceof Uint8Array) {
            try {
              _sig = Signature.fromDER(sg);
            } catch (derError) {
              if (!(derError instanceof exports.DER.Err))
                throw derError;
              _sig = Signature.fromCompact(sg);
            }
          } else if (typeof sg === "object" && typeof sg.r === "bigint" && typeof sg.s === "bigint") {
            const { r: r2, s: s2 } = sg;
            _sig = new Signature(r2, s2);
          } else {
            throw new Error("PARSE");
          }
          P = Point.fromHex(publicKey);
        } catch (error) {
          if (error.message === "PARSE")
            throw new Error(`signature must be Signature instance, Uint8Array or hex string`);
          return false;
        }
        if (lowS && _sig.hasHighS())
          return false;
        if (prehash)
          msgHash = CURVE.hash(msgHash);
        const { r, s } = _sig;
        const h = bits2int_modN(msgHash);
        const is = invN(s);
        const u1 = modN(h * is);
        const u2 = modN(r * is);
        const R = Point.BASE.multiplyAndAddUnsafe(P, u1, u2)?.toAffine();
        if (!R)
          return false;
        const v = modN(R.x);
        return v === r;
      }
      return {
        CURVE,
        getPublicKey,
        getSharedSecret,
        sign: sign2,
        verify,
        ProjectivePoint: Point,
        Signature,
        utils
      };
    }
    exports.weierstrass = weierstrass;
    function SWUFpSqrtRatio(Fp, Z) {
      const q = Fp.ORDER;
      let l = _0n2;
      for (let o = q - _1n2; o % _2n2 === _0n2; o /= _2n2)
        l += _1n2;
      const c1 = l;
      const _2n_pow_c1_1 = _2n2 << c1 - _1n2 - _1n2;
      const _2n_pow_c1 = _2n_pow_c1_1 * _2n2;
      const c2 = (q - _1n2) / _2n_pow_c1;
      const c3 = (c2 - _1n2) / _2n2;
      const c4 = _2n_pow_c1 - _1n2;
      const c5 = _2n_pow_c1_1;
      const c6 = Fp.pow(Z, c2);
      const c7 = Fp.pow(Z, (c2 + _1n2) / _2n2);
      let sqrtRatio = (u, v) => {
        let tv1 = c6;
        let tv2 = Fp.pow(v, c4);
        let tv3 = Fp.sqr(tv2);
        tv3 = Fp.mul(tv3, v);
        let tv5 = Fp.mul(u, tv3);
        tv5 = Fp.pow(tv5, c3);
        tv5 = Fp.mul(tv5, tv2);
        tv2 = Fp.mul(tv5, v);
        tv3 = Fp.mul(tv5, u);
        let tv4 = Fp.mul(tv3, tv2);
        tv5 = Fp.pow(tv4, c5);
        let isQR = Fp.eql(tv5, Fp.ONE);
        tv2 = Fp.mul(tv3, c7);
        tv5 = Fp.mul(tv4, tv1);
        tv3 = Fp.cmov(tv2, tv3, isQR);
        tv4 = Fp.cmov(tv5, tv4, isQR);
        for (let i = c1; i > _1n2; i--) {
          let tv52 = i - _2n2;
          tv52 = _2n2 << tv52 - _1n2;
          let tvv5 = Fp.pow(tv4, tv52);
          const e1 = Fp.eql(tvv5, Fp.ONE);
          tv2 = Fp.mul(tv3, tv1);
          tv1 = Fp.mul(tv1, tv1);
          tvv5 = Fp.mul(tv4, tv1);
          tv3 = Fp.cmov(tv2, tv3, e1);
          tv4 = Fp.cmov(tvv5, tv4, e1);
        }
        return { isValid: isQR, value: tv3 };
      };
      if (Fp.ORDER % _4n === _3n) {
        const c12 = (Fp.ORDER - _3n) / _4n;
        const c22 = Fp.sqrt(Fp.neg(Z));
        sqrtRatio = (u, v) => {
          let tv1 = Fp.sqr(v);
          const tv2 = Fp.mul(u, v);
          tv1 = Fp.mul(tv1, tv2);
          let y1 = Fp.pow(tv1, c12);
          y1 = Fp.mul(y1, tv2);
          const y2 = Fp.mul(y1, c22);
          const tv3 = Fp.mul(Fp.sqr(y1), v);
          const isQR = Fp.eql(tv3, u);
          let y = Fp.cmov(y2, y1, isQR);
          return { isValid: isQR, value: y };
        };
      }
      return sqrtRatio;
    }
    exports.SWUFpSqrtRatio = SWUFpSqrtRatio;
    function mapToCurveSimpleSWU(Fp, opts) {
      mod.validateField(Fp);
      if (!Fp.isValid(opts.A) || !Fp.isValid(opts.B) || !Fp.isValid(opts.Z))
        throw new Error("mapToCurveSimpleSWU: invalid opts");
      const sqrtRatio = SWUFpSqrtRatio(Fp, opts.Z);
      if (!Fp.isOdd)
        throw new Error("Fp.isOdd is not implemented!");
      return (u) => {
        let tv1, tv2, tv3, tv4, tv5, tv6, x, y;
        tv1 = Fp.sqr(u);
        tv1 = Fp.mul(tv1, opts.Z);
        tv2 = Fp.sqr(tv1);
        tv2 = Fp.add(tv2, tv1);
        tv3 = Fp.add(tv2, Fp.ONE);
        tv3 = Fp.mul(tv3, opts.B);
        tv4 = Fp.cmov(opts.Z, Fp.neg(tv2), !Fp.eql(tv2, Fp.ZERO));
        tv4 = Fp.mul(tv4, opts.A);
        tv2 = Fp.sqr(tv3);
        tv6 = Fp.sqr(tv4);
        tv5 = Fp.mul(tv6, opts.A);
        tv2 = Fp.add(tv2, tv5);
        tv2 = Fp.mul(tv2, tv3);
        tv6 = Fp.mul(tv6, tv4);
        tv5 = Fp.mul(tv6, opts.B);
        tv2 = Fp.add(tv2, tv5);
        x = Fp.mul(tv1, tv3);
        const { isValid, value } = sqrtRatio(tv2, tv6);
        y = Fp.mul(tv1, u);
        y = Fp.mul(y, value);
        x = Fp.cmov(x, tv3, isValid);
        y = Fp.cmov(y, value, isValid);
        const e1 = Fp.isOdd(u) === Fp.isOdd(y);
        y = Fp.cmov(Fp.neg(y), y, e1);
        x = Fp.div(x, tv4);
        return { x, y };
      };
    }
    exports.mapToCurveSimpleSWU = mapToCurveSimpleSWU;
  }
});

// node_modules/@noble/curves/abstract/hash-to-curve.js
var require_hash_to_curve = __commonJS({
  "node_modules/@noble/curves/abstract/hash-to-curve.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createHasher = exports.isogenyMap = exports.hash_to_field = exports.expand_message_xof = exports.expand_message_xmd = void 0;
    var modular_js_1 = require_modular();
    var utils_js_1 = require_utils2();
    function validateDST(dst) {
      if (dst instanceof Uint8Array)
        return dst;
      if (typeof dst === "string")
        return (0, utils_js_1.utf8ToBytes)(dst);
      throw new Error("DST must be Uint8Array or string");
    }
    var os2ip = utils_js_1.bytesToNumberBE;
    function i2osp(value, length) {
      if (value < 0 || value >= 1 << 8 * length) {
        throw new Error(`bad I2OSP call: value=${value} length=${length}`);
      }
      const res = Array.from({ length }).fill(0);
      for (let i = length - 1; i >= 0; i--) {
        res[i] = value & 255;
        value >>>= 8;
      }
      return new Uint8Array(res);
    }
    function strxor(a, b) {
      const arr = new Uint8Array(a.length);
      for (let i = 0; i < a.length; i++) {
        arr[i] = a[i] ^ b[i];
      }
      return arr;
    }
    function isBytes2(item) {
      if (!(item instanceof Uint8Array))
        throw new Error("Uint8Array expected");
    }
    function isNum(item) {
      if (!Number.isSafeInteger(item))
        throw new Error("number expected");
    }
    function expand_message_xmd(msg, DST, lenInBytes, H) {
      isBytes2(msg);
      isBytes2(DST);
      isNum(lenInBytes);
      if (DST.length > 255)
        DST = H((0, utils_js_1.concatBytes)((0, utils_js_1.utf8ToBytes)("H2C-OVERSIZE-DST-"), DST));
      const { outputLen: b_in_bytes, blockLen: r_in_bytes } = H;
      const ell = Math.ceil(lenInBytes / b_in_bytes);
      if (ell > 255)
        throw new Error("Invalid xmd length");
      const DST_prime = (0, utils_js_1.concatBytes)(DST, i2osp(DST.length, 1));
      const Z_pad = i2osp(0, r_in_bytes);
      const l_i_b_str = i2osp(lenInBytes, 2);
      const b = new Array(ell);
      const b_0 = H((0, utils_js_1.concatBytes)(Z_pad, msg, l_i_b_str, i2osp(0, 1), DST_prime));
      b[0] = H((0, utils_js_1.concatBytes)(b_0, i2osp(1, 1), DST_prime));
      for (let i = 1; i <= ell; i++) {
        const args = [strxor(b_0, b[i - 1]), i2osp(i + 1, 1), DST_prime];
        b[i] = H((0, utils_js_1.concatBytes)(...args));
      }
      const pseudo_random_bytes = (0, utils_js_1.concatBytes)(...b);
      return pseudo_random_bytes.slice(0, lenInBytes);
    }
    exports.expand_message_xmd = expand_message_xmd;
    function expand_message_xof(msg, DST, lenInBytes, k, H) {
      isBytes2(msg);
      isBytes2(DST);
      isNum(lenInBytes);
      if (DST.length > 255) {
        const dkLen = Math.ceil(2 * k / 8);
        DST = H.create({ dkLen }).update((0, utils_js_1.utf8ToBytes)("H2C-OVERSIZE-DST-")).update(DST).digest();
      }
      if (lenInBytes > 65535 || DST.length > 255)
        throw new Error("expand_message_xof: invalid lenInBytes");
      return H.create({ dkLen: lenInBytes }).update(msg).update(i2osp(lenInBytes, 2)).update(DST).update(i2osp(DST.length, 1)).digest();
    }
    exports.expand_message_xof = expand_message_xof;
    function hash_to_field(msg, count, options) {
      (0, utils_js_1.validateObject)(options, {
        DST: "string",
        p: "bigint",
        m: "isSafeInteger",
        k: "isSafeInteger",
        hash: "hash"
      });
      const { p, k, m, hash: hash2, expand, DST: _DST } = options;
      isBytes2(msg);
      isNum(count);
      const DST = validateDST(_DST);
      const log2p = p.toString(2).length;
      const L = Math.ceil((log2p + k) / 8);
      const len_in_bytes = count * m * L;
      let prb;
      if (expand === "xmd") {
        prb = expand_message_xmd(msg, DST, len_in_bytes, hash2);
      } else if (expand === "xof") {
        prb = expand_message_xof(msg, DST, len_in_bytes, k, hash2);
      } else if (expand === "_internal_pass") {
        prb = msg;
      } else {
        throw new Error('expand must be "xmd" or "xof"');
      }
      const u = new Array(count);
      for (let i = 0; i < count; i++) {
        const e = new Array(m);
        for (let j = 0; j < m; j++) {
          const elm_offset = L * (j + i * m);
          const tv = prb.subarray(elm_offset, elm_offset + L);
          e[j] = (0, modular_js_1.mod)(os2ip(tv), p);
        }
        u[i] = e;
      }
      return u;
    }
    exports.hash_to_field = hash_to_field;
    function isogenyMap(field, map) {
      const COEFF = map.map((i) => Array.from(i).reverse());
      return (x, y) => {
        const [xNum, xDen, yNum, yDen] = COEFF.map((val) => val.reduce((acc, i) => field.add(field.mul(acc, x), i)));
        x = field.div(xNum, xDen);
        y = field.mul(y, field.div(yNum, yDen));
        return { x, y };
      };
    }
    exports.isogenyMap = isogenyMap;
    function createHasher(Point, mapToCurve, def) {
      if (typeof mapToCurve !== "function")
        throw new Error("mapToCurve() must be defined");
      return {
        // Encodes byte string to elliptic curve
        // https://datatracker.ietf.org/doc/html/draft-irtf-cfrg-hash-to-curve-16#section-3
        hashToCurve(msg, options) {
          const u = hash_to_field(msg, 2, { ...def, DST: def.DST, ...options });
          const u0 = Point.fromAffine(mapToCurve(u[0]));
          const u1 = Point.fromAffine(mapToCurve(u[1]));
          const P = u0.add(u1).clearCofactor();
          P.assertValidity();
          return P;
        },
        // https://datatracker.ietf.org/doc/html/draft-irtf-cfrg-hash-to-curve-16#section-3
        encodeToCurve(msg, options) {
          const u = hash_to_field(msg, 1, { ...def, DST: def.encodeDST, ...options });
          const P = Point.fromAffine(mapToCurve(u[0])).clearCofactor();
          P.assertValidity();
          return P;
        }
      };
    }
    exports.createHasher = createHasher;
  }
});

// node_modules/@noble/hashes/hmac.js
var require_hmac = __commonJS({
  "node_modules/@noble/hashes/hmac.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.hmac = exports.HMAC = void 0;
    var _assert_js_1 = require_assert();
    var utils_js_1 = require_utils();
    var HMAC = class extends utils_js_1.Hash {
      constructor(hash2, _key) {
        super();
        this.finished = false;
        this.destroyed = false;
        _assert_js_1.default.hash(hash2);
        const key = (0, utils_js_1.toBytes)(_key);
        this.iHash = hash2.create();
        if (typeof this.iHash.update !== "function")
          throw new Error("Expected instance of class which extends utils.Hash");
        this.blockLen = this.iHash.blockLen;
        this.outputLen = this.iHash.outputLen;
        const blockLen = this.blockLen;
        const pad = new Uint8Array(blockLen);
        pad.set(key.length > blockLen ? hash2.create().update(key).digest() : key);
        for (let i = 0; i < pad.length; i++)
          pad[i] ^= 54;
        this.iHash.update(pad);
        this.oHash = hash2.create();
        for (let i = 0; i < pad.length; i++)
          pad[i] ^= 54 ^ 92;
        this.oHash.update(pad);
        pad.fill(0);
      }
      update(buf) {
        _assert_js_1.default.exists(this);
        this.iHash.update(buf);
        return this;
      }
      digestInto(out) {
        _assert_js_1.default.exists(this);
        _assert_js_1.default.bytes(out, this.outputLen);
        this.finished = true;
        this.iHash.digestInto(out);
        this.oHash.update(out);
        this.oHash.digestInto(out);
        this.destroy();
      }
      digest() {
        const out = new Uint8Array(this.oHash.outputLen);
        this.digestInto(out);
        return out;
      }
      _cloneInto(to) {
        to || (to = Object.create(Object.getPrototypeOf(this), {}));
        const { oHash, iHash, finished, destroyed, blockLen, outputLen } = this;
        to = to;
        to.finished = finished;
        to.destroyed = destroyed;
        to.blockLen = blockLen;
        to.outputLen = outputLen;
        to.oHash = oHash._cloneInto(to.oHash);
        to.iHash = iHash._cloneInto(to.iHash);
        return to;
      }
      destroy() {
        this.destroyed = true;
        this.oHash.destroy();
        this.iHash.destroy();
      }
    };
    exports.HMAC = HMAC;
    var hmac = (hash2, key, message) => new HMAC(hash2, key).update(message).digest();
    exports.hmac = hmac;
    exports.hmac.create = (hash2, key) => new HMAC(hash2, key);
  }
});

// node_modules/@noble/curves/_shortw_utils.js
var require_shortw_utils = __commonJS({
  "node_modules/@noble/curves/_shortw_utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createCurve = exports.getHash = void 0;
    var hmac_1 = require_hmac();
    var utils_1 = require_utils();
    var weierstrass_js_1 = require_weierstrass();
    function getHash(hash2) {
      return {
        hash: hash2,
        hmac: (key, ...msgs) => (0, hmac_1.hmac)(hash2, key, (0, utils_1.concatBytes)(...msgs)),
        randomBytes: utils_1.randomBytes
      };
    }
    exports.getHash = getHash;
    function createCurve(curveDef, defHash) {
      const create = (hash2) => (0, weierstrass_js_1.weierstrass)({ ...curveDef, ...getHash(hash2) });
      return Object.freeze({ ...create(defHash), create });
    }
    exports.createCurve = createCurve;
  }
});

// node_modules/@noble/curves/secp256k1.js
var require_secp256k1 = __commonJS({
  "node_modules/@noble/curves/secp256k1.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.encodeToCurve = exports.hashToCurve = exports.schnorr = exports.secp256k1 = void 0;
    var sha256_1 = require_sha256();
    var utils_1 = require_utils();
    var modular_js_1 = require_modular();
    var weierstrass_js_1 = require_weierstrass();
    var utils_js_1 = require_utils2();
    var hash_to_curve_js_1 = require_hash_to_curve();
    var _shortw_utils_js_1 = require_shortw_utils();
    var secp256k1P = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f");
    var secp256k1N = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141");
    var _1n2 = BigInt(1);
    var _2n2 = BigInt(2);
    var divNearest = (a, b) => (a + b / _2n2) / b;
    function sqrtMod(y) {
      const P = secp256k1P;
      const _3n = BigInt(3), _6n = BigInt(6), _11n = BigInt(11), _22n = BigInt(22);
      const _23n = BigInt(23), _44n = BigInt(44), _88n = BigInt(88);
      const b2 = y * y * y % P;
      const b3 = b2 * b2 * y % P;
      const b6 = (0, modular_js_1.pow2)(b3, _3n, P) * b3 % P;
      const b9 = (0, modular_js_1.pow2)(b6, _3n, P) * b3 % P;
      const b11 = (0, modular_js_1.pow2)(b9, _2n2, P) * b2 % P;
      const b22 = (0, modular_js_1.pow2)(b11, _11n, P) * b11 % P;
      const b44 = (0, modular_js_1.pow2)(b22, _22n, P) * b22 % P;
      const b88 = (0, modular_js_1.pow2)(b44, _44n, P) * b44 % P;
      const b176 = (0, modular_js_1.pow2)(b88, _88n, P) * b88 % P;
      const b220 = (0, modular_js_1.pow2)(b176, _44n, P) * b44 % P;
      const b223 = (0, modular_js_1.pow2)(b220, _3n, P) * b3 % P;
      const t1 = (0, modular_js_1.pow2)(b223, _23n, P) * b22 % P;
      const t2 = (0, modular_js_1.pow2)(t1, _6n, P) * b2 % P;
      const root = (0, modular_js_1.pow2)(t2, _2n2, P);
      if (!Fp.eql(Fp.sqr(root), y))
        throw new Error("Cannot find square root");
      return root;
    }
    var Fp = (0, modular_js_1.Field)(secp256k1P, void 0, void 0, { sqrt: sqrtMod });
    exports.secp256k1 = (0, _shortw_utils_js_1.createCurve)({
      a: BigInt(0),
      b: BigInt(7),
      Fp,
      n: secp256k1N,
      // Base point (x, y) aka generator point
      Gx: BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),
      Gy: BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),
      h: BigInt(1),
      lowS: true,
      /**
       * secp256k1 belongs to Koblitz curves: it has efficiently computable endomorphism.
       * Endomorphism uses 2x less RAM, speeds up precomputation by 2x and ECDH / key recovery by 20%.
       * For precomputed wNAF it trades off 1/2 init time & 1/3 ram for 20% perf hit.
       * Explanation: https://gist.github.com/paulmillr/eb670806793e84df628a7c434a873066
       */
      endo: {
        beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),
        splitScalar: (k) => {
          const n = secp256k1N;
          const a1 = BigInt("0x3086d221a7d46bcde86c90e49284eb15");
          const b1 = -_1n2 * BigInt("0xe4437ed6010e88286f547fa90abfe4c3");
          const a2 = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8");
          const b2 = a1;
          const POW_2_128 = BigInt("0x100000000000000000000000000000000");
          const c1 = divNearest(b2 * k, n);
          const c2 = divNearest(-b1 * k, n);
          let k1 = (0, modular_js_1.mod)(k - c1 * a1 - c2 * a2, n);
          let k2 = (0, modular_js_1.mod)(-c1 * b1 - c2 * b2, n);
          const k1neg = k1 > POW_2_128;
          const k2neg = k2 > POW_2_128;
          if (k1neg)
            k1 = n - k1;
          if (k2neg)
            k2 = n - k2;
          if (k1 > POW_2_128 || k2 > POW_2_128) {
            throw new Error("splitScalar: Endomorphism failed, k=" + k);
          }
          return { k1neg, k1, k2neg, k2 };
        }
      }
    }, sha256_1.sha256);
    var _0n2 = BigInt(0);
    var fe = (x) => typeof x === "bigint" && _0n2 < x && x < secp256k1P;
    var ge = (x) => typeof x === "bigint" && _0n2 < x && x < secp256k1N;
    var TAGGED_HASH_PREFIXES = {};
    function taggedHash(tag, ...messages) {
      let tagP = TAGGED_HASH_PREFIXES[tag];
      if (tagP === void 0) {
        const tagH = (0, sha256_1.sha256)(Uint8Array.from(tag, (c) => c.charCodeAt(0)));
        tagP = (0, utils_js_1.concatBytes)(tagH, tagH);
        TAGGED_HASH_PREFIXES[tag] = tagP;
      }
      return (0, sha256_1.sha256)((0, utils_js_1.concatBytes)(tagP, ...messages));
    }
    var pointToBytes = (point) => point.toRawBytes(true).slice(1);
    var numTo32b = (n) => (0, utils_js_1.numberToBytesBE)(n, 32);
    var modP = (x) => (0, modular_js_1.mod)(x, secp256k1P);
    var modN = (x) => (0, modular_js_1.mod)(x, secp256k1N);
    var Point = exports.secp256k1.ProjectivePoint;
    var GmulAdd = (Q, a, b) => Point.BASE.multiplyAndAddUnsafe(Q, a, b);
    function schnorrGetExtPubKey(priv) {
      let d_ = exports.secp256k1.utils.normPrivateKeyToScalar(priv);
      let p = Point.fromPrivateKey(d_);
      const scalar = p.hasEvenY() ? d_ : modN(-d_);
      return { scalar, bytes: pointToBytes(p) };
    }
    function lift_x(x) {
      if (!fe(x))
        throw new Error("bad x: need 0 < x < p");
      const xx = modP(x * x);
      const c = modP(xx * x + BigInt(7));
      let y = sqrtMod(c);
      if (y % _2n2 !== _0n2)
        y = modP(-y);
      const p = new Point(x, y, _1n2);
      p.assertValidity();
      return p;
    }
    function challenge(...args) {
      return modN((0, utils_js_1.bytesToNumberBE)(taggedHash("BIP0340/challenge", ...args)));
    }
    function schnorrGetPublicKey(privateKey) {
      return schnorrGetExtPubKey(privateKey).bytes;
    }
    function schnorrSign(message, privateKey, auxRand = (0, utils_1.randomBytes)(32)) {
      const m = (0, utils_js_1.ensureBytes)("message", message);
      const { bytes: px, scalar: d } = schnorrGetExtPubKey(privateKey);
      const a = (0, utils_js_1.ensureBytes)("auxRand", auxRand, 32);
      const t = numTo32b(d ^ (0, utils_js_1.bytesToNumberBE)(taggedHash("BIP0340/aux", a)));
      const rand = taggedHash("BIP0340/nonce", t, px, m);
      const k_ = modN((0, utils_js_1.bytesToNumberBE)(rand));
      if (k_ === _0n2)
        throw new Error("sign failed: k is zero");
      const { bytes: rx, scalar: k } = schnorrGetExtPubKey(k_);
      const e = challenge(rx, px, m);
      const sig = new Uint8Array(64);
      sig.set(rx, 0);
      sig.set(numTo32b(modN(k + e * d)), 32);
      if (!schnorrVerify(sig, m, px))
        throw new Error("sign: Invalid signature produced");
      return sig;
    }
    function schnorrVerify(signature, message, publicKey) {
      const sig = (0, utils_js_1.ensureBytes)("signature", signature, 64);
      const m = (0, utils_js_1.ensureBytes)("message", message);
      const pub = (0, utils_js_1.ensureBytes)("publicKey", publicKey, 32);
      try {
        const P = lift_x((0, utils_js_1.bytesToNumberBE)(pub));
        const r = (0, utils_js_1.bytesToNumberBE)(sig.subarray(0, 32));
        if (!fe(r))
          return false;
        const s = (0, utils_js_1.bytesToNumberBE)(sig.subarray(32, 64));
        if (!ge(s))
          return false;
        const e = challenge(numTo32b(r), pointToBytes(P), m);
        const R = GmulAdd(P, s, modN(-e));
        if (!R || !R.hasEvenY() || R.toAffine().x !== r)
          return false;
        return true;
      } catch (error) {
        return false;
      }
    }
    exports.schnorr = (() => ({
      getPublicKey: schnorrGetPublicKey,
      sign: schnorrSign,
      verify: schnorrVerify,
      utils: {
        randomPrivateKey: exports.secp256k1.utils.randomPrivateKey,
        lift_x,
        pointToBytes,
        numberToBytesBE: utils_js_1.numberToBytesBE,
        bytesToNumberBE: utils_js_1.bytesToNumberBE,
        taggedHash,
        mod: modular_js_1.mod
      }
    }))();
    var isoMap = /* @__PURE__ */ (() => (0, hash_to_curve_js_1.isogenyMap)(Fp, [
      // xNum
      [
        "0x8e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38daaaaa8c7",
        "0x7d3d4c80bc321d5b9f315cea7fd44c5d595d2fc0bf63b92dfff1044f17c6581",
        "0x534c328d23f234e6e2a413deca25caece4506144037c40314ecbd0b53d9dd262",
        "0x8e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38daaaaa88c"
      ],
      // xDen
      [
        "0xd35771193d94918a9ca34ccbb7b640dd86cd409542f8487d9fe6b745781eb49b",
        "0xedadc6f64383dc1df7c4b2d51b54225406d36b641f5e41bbc52a56612a8c6d14",
        "0x0000000000000000000000000000000000000000000000000000000000000001"
        // LAST 1
      ],
      // yNum
      [
        "0x4bda12f684bda12f684bda12f684bda12f684bda12f684bda12f684b8e38e23c",
        "0xc75e0c32d5cb7c0fa9d0a54b12a0a6d5647ab046d686da6fdffc90fc201d71a3",
        "0x29a6194691f91a73715209ef6512e576722830a201be2018a765e85a9ecee931",
        "0x2f684bda12f684bda12f684bda12f684bda12f684bda12f684bda12f38e38d84"
      ],
      // yDen
      [
        "0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffff93b",
        "0x7a06534bb8bdb49fd5e9e6632722c2989467c1bfc8e8d978dfb425d2685c2573",
        "0x6484aa716545ca2cf3a70c3fa8fe337e0a3d21162f0d6299a7bf8192bfd2a76f",
        "0x0000000000000000000000000000000000000000000000000000000000000001"
        // LAST 1
      ]
    ].map((i) => i.map((j) => BigInt(j)))))();
    var mapSWU = /* @__PURE__ */ (() => (0, weierstrass_js_1.mapToCurveSimpleSWU)(Fp, {
      A: BigInt("0x3f8731abdd661adca08a5558f0f5d272e953d363cb6f0e5d405447c01a444533"),
      B: BigInt("1771"),
      Z: Fp.create(BigInt("-11"))
    }))();
    var htf = /* @__PURE__ */ (() => (0, hash_to_curve_js_1.createHasher)(exports.secp256k1.ProjectivePoint, (scalars) => {
      const { x, y } = mapSWU(Fp.create(scalars[0]));
      return isoMap(x, y);
    }, {
      DST: "secp256k1_XMD:SHA-256_SSWU_RO_",
      encodeDST: "secp256k1_XMD:SHA-256_SSWU_NU_",
      p: Fp.ORDER,
      m: 1,
      k: 128,
      expand: "xmd",
      hash: sha256_1.sha256
    }))();
    exports.hashToCurve = (() => htf.hashToCurve)();
    exports.encodeToCurve = (() => htf.encodeToCurve)();
  }
});

// node_modules/ethereum-cryptography/secp256k1.js
var require_secp256k12 = __commonJS({
  "node_modules/ethereum-cryptography/secp256k1.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.secp256k1 = void 0;
    var secp256k1_1 = require_secp256k1();
    Object.defineProperty(exports, "secp256k1", { enumerable: true, get: function() {
      return secp256k1_1.secp256k1;
    } });
  }
});

// node_modules/@ethereumjs/util/dist/constants.js
var require_constants = __commonJS({
  "node_modules/@ethereumjs/util/dist/constants.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MAX_WITHDRAWALS_PER_PAYLOAD = exports.RLP_EMPTY_STRING = exports.KECCAK256_RLP = exports.KECCAK256_RLP_S = exports.KECCAK256_RLP_ARRAY = exports.KECCAK256_RLP_ARRAY_S = exports.KECCAK256_NULL = exports.KECCAK256_NULL_S = exports.TWO_POW256 = exports.SECP256K1_ORDER_DIV_2 = exports.SECP256K1_ORDER = exports.MAX_INTEGER_BIGINT = exports.MAX_INTEGER = exports.MAX_UINT64 = void 0;
    var buffer_1 = __require("buffer");
    var secp256k1_1 = require_secp256k12();
    exports.MAX_UINT64 = BigInt("0xffffffffffffffff");
    exports.MAX_INTEGER = BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
    exports.MAX_INTEGER_BIGINT = BigInt("115792089237316195423570985008687907853269984665640564039457584007913129639935");
    exports.SECP256K1_ORDER = secp256k1_1.secp256k1.CURVE.n;
    exports.SECP256K1_ORDER_DIV_2 = secp256k1_1.secp256k1.CURVE.n / BigInt(2);
    exports.TWO_POW256 = BigInt("0x10000000000000000000000000000000000000000000000000000000000000000");
    exports.KECCAK256_NULL_S = "c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470";
    exports.KECCAK256_NULL = buffer_1.Buffer.from(exports.KECCAK256_NULL_S, "hex");
    exports.KECCAK256_RLP_ARRAY_S = "1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347";
    exports.KECCAK256_RLP_ARRAY = buffer_1.Buffer.from(exports.KECCAK256_RLP_ARRAY_S, "hex");
    exports.KECCAK256_RLP_S = "56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421";
    exports.KECCAK256_RLP = buffer_1.Buffer.from(exports.KECCAK256_RLP_S, "hex");
    exports.RLP_EMPTY_STRING = buffer_1.Buffer.from([128]);
    exports.MAX_WITHDRAWALS_PER_PAYLOAD = 16;
  }
});

// node_modules/@ethereumjs/util/dist/units.js
var require_units = __commonJS({
  "node_modules/@ethereumjs/util/dist/units.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GWEI_TO_WEI = void 0;
    exports.GWEI_TO_WEI = BigInt(1e9);
  }
});

// node_modules/@ethereumjs/rlp/dist/index.js
var require_dist = __commonJS({
  "node_modules/@ethereumjs/rlp/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RLP = exports.utils = exports.decode = exports.encode = void 0;
    function encode(input) {
      if (Array.isArray(input)) {
        const output2 = [];
        let outputLength = 0;
        for (let i = 0; i < input.length; i++) {
          const encoded = encode(input[i]);
          output2.push(encoded);
          outputLength += encoded.length;
        }
        return concatBytes(encodeLength(outputLength, 192), ...output2);
      }
      const inputBuf = toBytes2(input);
      if (inputBuf.length === 1 && inputBuf[0] < 128) {
        return inputBuf;
      }
      return concatBytes(encodeLength(inputBuf.length, 128), inputBuf);
    }
    exports.encode = encode;
    function safeSlice(input, start, end) {
      if (end > input.length) {
        throw new Error("invalid RLP (safeSlice): end slice of Uint8Array out-of-bounds");
      }
      return input.slice(start, end);
    }
    function decodeLength(v) {
      if (v[0] === 0) {
        throw new Error("invalid RLP: extra zeros");
      }
      return parseHexByte(bytesToHex2(v));
    }
    function encodeLength(len, offset) {
      if (len < 56) {
        return Uint8Array.from([len + offset]);
      }
      const hexLength = numberToHex(len);
      const lLength = hexLength.length / 2;
      const firstByte = numberToHex(offset + 55 + lLength);
      return Uint8Array.from(hexToBytes(firstByte + hexLength));
    }
    function decode(input, stream = false) {
      if (typeof input === "undefined" || input === null || input.length === 0) {
        return Uint8Array.from([]);
      }
      const inputBytes = toBytes2(input);
      const decoded = _decode(inputBytes);
      if (stream) {
        return decoded;
      }
      if (decoded.remainder.length !== 0) {
        throw new Error("invalid RLP: remainder must be zero");
      }
      return decoded.data;
    }
    exports.decode = decode;
    function _decode(input) {
      let length, llength, data, innerRemainder, d;
      const decoded = [];
      const firstByte = input[0];
      if (firstByte <= 127) {
        return {
          data: input.slice(0, 1),
          remainder: input.slice(1)
        };
      } else if (firstByte <= 183) {
        length = firstByte - 127;
        if (firstByte === 128) {
          data = Uint8Array.from([]);
        } else {
          data = safeSlice(input, 1, length);
        }
        if (length === 2 && data[0] < 128) {
          throw new Error("invalid RLP encoding: invalid prefix, single byte < 0x80 are not prefixed");
        }
        return {
          data,
          remainder: input.slice(length)
        };
      } else if (firstByte <= 191) {
        llength = firstByte - 182;
        if (input.length - 1 < llength) {
          throw new Error("invalid RLP: not enough bytes for string length");
        }
        length = decodeLength(safeSlice(input, 1, llength));
        if (length <= 55) {
          throw new Error("invalid RLP: expected string length to be greater than 55");
        }
        data = safeSlice(input, llength, length + llength);
        return {
          data,
          remainder: input.slice(length + llength)
        };
      } else if (firstByte <= 247) {
        length = firstByte - 191;
        innerRemainder = safeSlice(input, 1, length);
        while (innerRemainder.length) {
          d = _decode(innerRemainder);
          decoded.push(d.data);
          innerRemainder = d.remainder;
        }
        return {
          data: decoded,
          remainder: input.slice(length)
        };
      } else {
        llength = firstByte - 246;
        length = decodeLength(safeSlice(input, 1, llength));
        if (length < 56) {
          throw new Error("invalid RLP: encoded list too short");
        }
        const totalLength = llength + length;
        if (totalLength > input.length) {
          throw new Error("invalid RLP: total length is larger than the data");
        }
        innerRemainder = safeSlice(input, llength, totalLength);
        while (innerRemainder.length) {
          d = _decode(innerRemainder);
          decoded.push(d.data);
          innerRemainder = d.remainder;
        }
        return {
          data: decoded,
          remainder: input.slice(totalLength)
        };
      }
    }
    var cachedHexes = Array.from({ length: 256 }, (_v, i) => i.toString(16).padStart(2, "0"));
    function bytesToHex2(uint8a) {
      let hex = "";
      for (let i = 0; i < uint8a.length; i++) {
        hex += cachedHexes[uint8a[i]];
      }
      return hex;
    }
    function parseHexByte(hexByte) {
      const byte = Number.parseInt(hexByte, 16);
      if (Number.isNaN(byte))
        throw new Error("Invalid byte sequence");
      return byte;
    }
    function hexToBytes(hex) {
      if (typeof hex !== "string") {
        throw new TypeError("hexToBytes: expected string, got " + typeof hex);
      }
      if (hex.length % 2)
        throw new Error("hexToBytes: received invalid unpadded hex");
      const array = new Uint8Array(hex.length / 2);
      for (let i = 0; i < array.length; i++) {
        const j = i * 2;
        array[i] = parseHexByte(hex.slice(j, j + 2));
      }
      return array;
    }
    function concatBytes(...arrays) {
      if (arrays.length === 1)
        return arrays[0];
      const length = arrays.reduce((a, arr) => a + arr.length, 0);
      const result = new Uint8Array(length);
      for (let i = 0, pad = 0; i < arrays.length; i++) {
        const arr = arrays[i];
        result.set(arr, pad);
        pad += arr.length;
      }
      return result;
    }
    function utf8ToBytes2(utf) {
      return new TextEncoder().encode(utf);
    }
    function numberToHex(integer) {
      if (integer < 0) {
        throw new Error("Invalid integer as argument, must be unsigned!");
      }
      const hex = integer.toString(16);
      return hex.length % 2 ? `0${hex}` : hex;
    }
    function padToEven(a) {
      return a.length % 2 ? `0${a}` : a;
    }
    function isHexPrefixed(str) {
      return str.length >= 2 && str[0] === "0" && str[1] === "x";
    }
    function stripHexPrefix(str) {
      if (typeof str !== "string") {
        return str;
      }
      return isHexPrefixed(str) ? str.slice(2) : str;
    }
    function toBytes2(v) {
      if (v instanceof Uint8Array) {
        return v;
      }
      if (typeof v === "string") {
        if (isHexPrefixed(v)) {
          return hexToBytes(padToEven(stripHexPrefix(v)));
        }
        return utf8ToBytes2(v);
      }
      if (typeof v === "number" || typeof v === "bigint") {
        if (!v) {
          return Uint8Array.from([]);
        }
        return hexToBytes(numberToHex(v));
      }
      if (v === null || v === void 0) {
        return Uint8Array.from([]);
      }
      throw new Error("toBytes: received unsupported type " + typeof v);
    }
    exports.utils = {
      bytesToHex: bytesToHex2,
      concatBytes,
      hexToBytes,
      utf8ToBytes: utf8ToBytes2
    };
    exports.RLP = { encode, decode };
  }
});

// node_modules/@noble/hashes/_u64.js
var require_u64 = __commonJS({
  "node_modules/@noble/hashes/_u64.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.add = exports.toBig = exports.split = exports.fromBig = void 0;
    var U32_MASK642 = BigInt(2 ** 32 - 1);
    var _32n2 = BigInt(32);
    function fromBig2(n, le = false) {
      if (le)
        return { h: Number(n & U32_MASK642), l: Number(n >> _32n2 & U32_MASK642) };
      return { h: Number(n >> _32n2 & U32_MASK642) | 0, l: Number(n & U32_MASK642) | 0 };
    }
    exports.fromBig = fromBig2;
    function split2(lst, le = false) {
      let Ah = new Uint32Array(lst.length);
      let Al = new Uint32Array(lst.length);
      for (let i = 0; i < lst.length; i++) {
        const { h, l } = fromBig2(lst[i], le);
        [Ah[i], Al[i]] = [h, l];
      }
      return [Ah, Al];
    }
    exports.split = split2;
    var toBig2 = (h, l) => BigInt(h >>> 0) << _32n2 | BigInt(l >>> 0);
    exports.toBig = toBig2;
    var shrSH2 = (h, l, s) => h >>> s;
    var shrSL2 = (h, l, s) => h << 32 - s | l >>> s;
    var rotrSH2 = (h, l, s) => h >>> s | l << 32 - s;
    var rotrSL2 = (h, l, s) => h << 32 - s | l >>> s;
    var rotrBH2 = (h, l, s) => h << 64 - s | l >>> s - 32;
    var rotrBL2 = (h, l, s) => h >>> s - 32 | l << 64 - s;
    var rotr32H2 = (h, l) => l;
    var rotr32L2 = (h, l) => h;
    var rotlSH2 = (h, l, s) => h << s | l >>> 32 - s;
    var rotlSL2 = (h, l, s) => l << s | h >>> 32 - s;
    var rotlBH2 = (h, l, s) => l << s - 32 | h >>> 64 - s;
    var rotlBL2 = (h, l, s) => h << s - 32 | l >>> 64 - s;
    function add2(Ah, Al, Bh, Bl) {
      const l = (Al >>> 0) + (Bl >>> 0);
      return { h: Ah + Bh + (l / 2 ** 32 | 0) | 0, l: l | 0 };
    }
    exports.add = add2;
    var add3L2 = (Al, Bl, Cl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0);
    var add3H2 = (low, Ah, Bh, Ch) => Ah + Bh + Ch + (low / 2 ** 32 | 0) | 0;
    var add4L2 = (Al, Bl, Cl, Dl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0);
    var add4H2 = (low, Ah, Bh, Ch, Dh) => Ah + Bh + Ch + Dh + (low / 2 ** 32 | 0) | 0;
    var add5L2 = (Al, Bl, Cl, Dl, El) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0) + (El >>> 0);
    var add5H2 = (low, Ah, Bh, Ch, Dh, Eh) => Ah + Bh + Ch + Dh + Eh + (low / 2 ** 32 | 0) | 0;
    var u642 = {
      fromBig: fromBig2,
      split: split2,
      toBig: exports.toBig,
      shrSH: shrSH2,
      shrSL: shrSL2,
      rotrSH: rotrSH2,
      rotrSL: rotrSL2,
      rotrBH: rotrBH2,
      rotrBL: rotrBL2,
      rotr32H: rotr32H2,
      rotr32L: rotr32L2,
      rotlSH: rotlSH2,
      rotlSL: rotlSL2,
      rotlBH: rotlBH2,
      rotlBL: rotlBL2,
      add: add2,
      add3L: add3L2,
      add3H: add3H2,
      add4L: add4L2,
      add4H: add4H2,
      add5H: add5H2,
      add5L: add5L2
    };
    exports.default = u642;
  }
});

// node_modules/@noble/hashes/sha3.js
var require_sha3 = __commonJS({
  "node_modules/@noble/hashes/sha3.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.shake256 = exports.shake128 = exports.keccak_512 = exports.keccak_384 = exports.keccak_256 = exports.keccak_224 = exports.sha3_512 = exports.sha3_384 = exports.sha3_256 = exports.sha3_224 = exports.Keccak = exports.keccakP = void 0;
    var _assert_js_1 = require_assert();
    var _u64_js_1 = require_u64();
    var utils_js_1 = require_utils();
    var [SHA3_PI2, SHA3_ROTL2, _SHA3_IOTA2] = [[], [], []];
    var _0n2 = BigInt(0);
    var _1n2 = BigInt(1);
    var _2n2 = BigInt(2);
    var _7n2 = BigInt(7);
    var _256n2 = BigInt(256);
    var _0x71n2 = BigInt(113);
    for (let round = 0, R = _1n2, x = 1, y = 0; round < 24; round++) {
      [x, y] = [y, (2 * x + 3 * y) % 5];
      SHA3_PI2.push(2 * (5 * y + x));
      SHA3_ROTL2.push((round + 1) * (round + 2) / 2 % 64);
      let t = _0n2;
      for (let j = 0; j < 7; j++) {
        R = (R << _1n2 ^ (R >> _7n2) * _0x71n2) % _256n2;
        if (R & _2n2)
          t ^= _1n2 << (_1n2 << BigInt(j)) - _1n2;
      }
      _SHA3_IOTA2.push(t);
    }
    var [SHA3_IOTA_H2, SHA3_IOTA_L2] = _u64_js_1.default.split(_SHA3_IOTA2, true);
    var rotlH2 = (h, l, s) => s > 32 ? _u64_js_1.default.rotlBH(h, l, s) : _u64_js_1.default.rotlSH(h, l, s);
    var rotlL2 = (h, l, s) => s > 32 ? _u64_js_1.default.rotlBL(h, l, s) : _u64_js_1.default.rotlSL(h, l, s);
    function keccakP2(s, rounds = 24) {
      const B = new Uint32Array(5 * 2);
      for (let round = 24 - rounds; round < 24; round++) {
        for (let x = 0; x < 10; x++)
          B[x] = s[x] ^ s[x + 10] ^ s[x + 20] ^ s[x + 30] ^ s[x + 40];
        for (let x = 0; x < 10; x += 2) {
          const idx1 = (x + 8) % 10;
          const idx0 = (x + 2) % 10;
          const B0 = B[idx0];
          const B1 = B[idx0 + 1];
          const Th = rotlH2(B0, B1, 1) ^ B[idx1];
          const Tl = rotlL2(B0, B1, 1) ^ B[idx1 + 1];
          for (let y = 0; y < 50; y += 10) {
            s[x + y] ^= Th;
            s[x + y + 1] ^= Tl;
          }
        }
        let curH = s[2];
        let curL = s[3];
        for (let t = 0; t < 24; t++) {
          const shift = SHA3_ROTL2[t];
          const Th = rotlH2(curH, curL, shift);
          const Tl = rotlL2(curH, curL, shift);
          const PI = SHA3_PI2[t];
          curH = s[PI];
          curL = s[PI + 1];
          s[PI] = Th;
          s[PI + 1] = Tl;
        }
        for (let y = 0; y < 50; y += 10) {
          for (let x = 0; x < 10; x++)
            B[x] = s[y + x];
          for (let x = 0; x < 10; x++)
            s[y + x] ^= ~B[(x + 2) % 10] & B[(x + 4) % 10];
        }
        s[0] ^= SHA3_IOTA_H2[round];
        s[1] ^= SHA3_IOTA_L2[round];
      }
      B.fill(0);
    }
    exports.keccakP = keccakP2;
    var Keccak2 = class _Keccak extends utils_js_1.Hash {
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
        _assert_js_1.default.number(outputLen);
        if (0 >= this.blockLen || this.blockLen >= 200)
          throw new Error("Sha3 supports only keccak-f1600 function");
        this.state = new Uint8Array(200);
        this.state32 = (0, utils_js_1.u32)(this.state);
      }
      keccak() {
        keccakP2(this.state32, this.rounds);
        this.posOut = 0;
        this.pos = 0;
      }
      update(data) {
        _assert_js_1.default.exists(this);
        const { blockLen, state } = this;
        data = (0, utils_js_1.toBytes)(data);
        const len = data.length;
        for (let pos = 0; pos < len; ) {
          const take = Math.min(blockLen - this.pos, len - pos);
          for (let i = 0; i < take; i++)
            state[this.pos++] ^= data[pos++];
          if (this.pos === blockLen)
            this.keccak();
        }
        return this;
      }
      finish() {
        if (this.finished)
          return;
        this.finished = true;
        const { state, suffix, pos, blockLen } = this;
        state[pos] ^= suffix;
        if ((suffix & 128) !== 0 && pos === blockLen - 1)
          this.keccak();
        state[blockLen - 1] ^= 128;
        this.keccak();
      }
      writeInto(out) {
        _assert_js_1.default.exists(this, false);
        _assert_js_1.default.bytes(out);
        this.finish();
        const bufferOut = this.state;
        const { blockLen } = this;
        for (let pos = 0, len = out.length; pos < len; ) {
          if (this.posOut >= blockLen)
            this.keccak();
          const take = Math.min(blockLen - this.posOut, len - pos);
          out.set(bufferOut.subarray(this.posOut, this.posOut + take), pos);
          this.posOut += take;
          pos += take;
        }
        return out;
      }
      xofInto(out) {
        if (!this.enableXOF)
          throw new Error("XOF is not possible for this instance");
        return this.writeInto(out);
      }
      xof(bytes2) {
        _assert_js_1.default.number(bytes2);
        return this.xofInto(new Uint8Array(bytes2));
      }
      digestInto(out) {
        _assert_js_1.default.output(out, this);
        if (this.finished)
          throw new Error("digest() was already called");
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
    exports.Keccak = Keccak2;
    var gen2 = (suffix, blockLen, outputLen) => (0, utils_js_1.wrapConstructor)(() => new Keccak2(blockLen, suffix, outputLen));
    exports.sha3_224 = gen2(6, 144, 224 / 8);
    exports.sha3_256 = gen2(6, 136, 256 / 8);
    exports.sha3_384 = gen2(6, 104, 384 / 8);
    exports.sha3_512 = gen2(6, 72, 512 / 8);
    exports.keccak_224 = gen2(1, 144, 224 / 8);
    exports.keccak_256 = gen2(1, 136, 256 / 8);
    exports.keccak_384 = gen2(1, 104, 384 / 8);
    exports.keccak_512 = gen2(1, 72, 512 / 8);
    var genShake2 = (suffix, blockLen, outputLen) => (0, utils_js_1.wrapXOFConstructorWithOpts)((opts = {}) => new Keccak2(blockLen, suffix, opts.dkLen === void 0 ? outputLen : opts.dkLen, true));
    exports.shake128 = genShake2(31, 168, 128 / 8);
    exports.shake256 = genShake2(31, 136, 256 / 8);
  }
});

// node_modules/ethereum-cryptography/utils.js
var require_utils3 = __commonJS({
  "node_modules/ethereum-cryptography/utils.js"(exports, module) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.crypto = exports.wrapHash = exports.equalsBytes = exports.hexToBytes = exports.bytesToUtf8 = exports.utf8ToBytes = exports.createView = exports.concatBytes = exports.toHex = exports.bytesToHex = exports.assertBytes = exports.assertBool = void 0;
    var _assert_1 = __importDefault(require_assert());
    var utils_1 = require_utils();
    var assertBool = _assert_1.default.bool;
    exports.assertBool = assertBool;
    var assertBytes = _assert_1.default.bytes;
    exports.assertBytes = assertBytes;
    var utils_2 = require_utils();
    Object.defineProperty(exports, "bytesToHex", { enumerable: true, get: function() {
      return utils_2.bytesToHex;
    } });
    Object.defineProperty(exports, "toHex", { enumerable: true, get: function() {
      return utils_2.bytesToHex;
    } });
    Object.defineProperty(exports, "concatBytes", { enumerable: true, get: function() {
      return utils_2.concatBytes;
    } });
    Object.defineProperty(exports, "createView", { enumerable: true, get: function() {
      return utils_2.createView;
    } });
    Object.defineProperty(exports, "utf8ToBytes", { enumerable: true, get: function() {
      return utils_2.utf8ToBytes;
    } });
    function bytesToUtf8(data) {
      if (!(data instanceof Uint8Array)) {
        throw new TypeError(`bytesToUtf8 expected Uint8Array, got ${typeof data}`);
      }
      return new TextDecoder().decode(data);
    }
    exports.bytesToUtf8 = bytesToUtf8;
    function hexToBytes(data) {
      const sliced = data.startsWith("0x") ? data.substring(2) : data;
      return (0, utils_1.hexToBytes)(sliced);
    }
    exports.hexToBytes = hexToBytes;
    function equalsBytes(a, b) {
      if (a.length !== b.length) {
        return false;
      }
      for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
          return false;
        }
      }
      return true;
    }
    exports.equalsBytes = equalsBytes;
    function wrapHash(hash2) {
      return (msg) => {
        _assert_1.default.bytes(msg);
        return hash2(msg);
      };
    }
    exports.wrapHash = wrapHash;
    exports.crypto = (() => {
      const webCrypto = typeof globalThis === "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
      const nodeRequire = typeof module !== "undefined" && typeof module.require === "function" && module.require.bind(module);
      return {
        node: nodeRequire && !webCrypto ? nodeRequire("crypto") : void 0,
        web: webCrypto
      };
    })();
  }
});

// node_modules/ethereum-cryptography/keccak.js
var require_keccak = __commonJS({
  "node_modules/ethereum-cryptography/keccak.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.keccak512 = exports.keccak384 = exports.keccak256 = exports.keccak224 = void 0;
    var sha3_1 = require_sha3();
    var utils_js_1 = require_utils3();
    exports.keccak224 = (0, utils_js_1.wrapHash)(sha3_1.keccak_224);
    exports.keccak256 = (() => {
      const k = (0, utils_js_1.wrapHash)(sha3_1.keccak_256);
      k.create = sha3_1.keccak_256.create;
      return k;
    })();
    exports.keccak384 = (0, utils_js_1.wrapHash)(sha3_1.keccak_384);
    exports.keccak512 = (0, utils_js_1.wrapHash)(sha3_1.keccak_512);
  }
});

// node_modules/@ethereumjs/util/dist/internal.js
var require_internal = __commonJS({
  "node_modules/@ethereumjs/util/dist/internal.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isHexString = exports.getKeys = exports.fromAscii = exports.fromUtf8 = exports.toAscii = exports.arrayContainsArray = exports.getBinarySize = exports.padToEven = exports.stripHexPrefix = exports.isHexPrefixed = void 0;
    function isHexPrefixed(str) {
      if (typeof str !== "string") {
        throw new Error(`[isHexPrefixed] input must be type 'string', received type ${typeof str}`);
      }
      return str[0] === "0" && str[1] === "x";
    }
    exports.isHexPrefixed = isHexPrefixed;
    var stripHexPrefix = (str) => {
      if (typeof str !== "string")
        throw new Error(`[stripHexPrefix] input must be type 'string', received ${typeof str}`);
      return isHexPrefixed(str) ? str.slice(2) : str;
    };
    exports.stripHexPrefix = stripHexPrefix;
    function padToEven(value) {
      let a = value;
      if (typeof a !== "string") {
        throw new Error(`[padToEven] value must be type 'string', received ${typeof a}`);
      }
      if (a.length % 2)
        a = `0${a}`;
      return a;
    }
    exports.padToEven = padToEven;
    function getBinarySize(str) {
      if (typeof str !== "string") {
        throw new Error(`[getBinarySize] method requires input type 'string', received ${typeof str}`);
      }
      return Buffer.byteLength(str, "utf8");
    }
    exports.getBinarySize = getBinarySize;
    function arrayContainsArray(superset, subset, some) {
      if (Array.isArray(superset) !== true) {
        throw new Error(`[arrayContainsArray] method requires input 'superset' to be an array, got type '${typeof superset}'`);
      }
      if (Array.isArray(subset) !== true) {
        throw new Error(`[arrayContainsArray] method requires input 'subset' to be an array, got type '${typeof subset}'`);
      }
      return subset[some === true ? "some" : "every"]((value) => superset.indexOf(value) >= 0);
    }
    exports.arrayContainsArray = arrayContainsArray;
    function toAscii(hex) {
      let str = "";
      let i = 0;
      const l = hex.length;
      if (hex.substring(0, 2) === "0x")
        i = 2;
      for (; i < l; i += 2) {
        const code = parseInt(hex.substr(i, 2), 16);
        str += String.fromCharCode(code);
      }
      return str;
    }
    exports.toAscii = toAscii;
    function fromUtf8(stringValue) {
      const str = Buffer.from(stringValue, "utf8");
      return `0x${padToEven(str.toString("hex")).replace(/^0+|0+$/g, "")}`;
    }
    exports.fromUtf8 = fromUtf8;
    function fromAscii(stringValue) {
      let hex = "";
      for (let i = 0; i < stringValue.length; i++) {
        const code = stringValue.charCodeAt(i);
        const n = code.toString(16);
        hex += n.length < 2 ? `0${n}` : n;
      }
      return `0x${hex}`;
    }
    exports.fromAscii = fromAscii;
    function getKeys(params, key, allowEmpty) {
      if (!Array.isArray(params)) {
        throw new Error(`[getKeys] method expects input 'params' to be an array, got ${typeof params}`);
      }
      if (typeof key !== "string") {
        throw new Error(`[getKeys] method expects input 'key' to be type 'string', got ${typeof params}`);
      }
      const result = [];
      for (let i = 0; i < params.length; i++) {
        let value = params[i][key];
        if (allowEmpty === true && !value) {
          value = "";
        } else if (typeof value !== "string") {
          throw new Error(`invalid abi - expected type 'string', received ${typeof value}`);
        }
        result.push(value);
      }
      return result;
    }
    exports.getKeys = getKeys;
    function isHexString2(value, length) {
      if (typeof value !== "string" || !value.match(/^0x[0-9A-Fa-f]*$/))
        return false;
      if (typeof length !== "undefined" && length > 0 && value.length !== 2 + 2 * length)
        return false;
      return true;
    }
    exports.isHexString = isHexString2;
  }
});

// node_modules/@ethereumjs/util/dist/helpers.js
var require_helpers = __commonJS({
  "node_modules/@ethereumjs/util/dist/helpers.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.assertIsString = exports.assertIsArray = exports.assertIsBuffer = exports.assertIsHexString = void 0;
    var internal_1 = require_internal();
    var assertIsHexString = function(input) {
      if (!(0, internal_1.isHexString)(input)) {
        const msg = `This method only supports 0x-prefixed hex strings but input was: ${input}`;
        throw new Error(msg);
      }
    };
    exports.assertIsHexString = assertIsHexString;
    var assertIsBuffer = function(input) {
      if (!Buffer.isBuffer(input)) {
        const msg = `This method only supports Buffer but input was: ${input}`;
        throw new Error(msg);
      }
    };
    exports.assertIsBuffer = assertIsBuffer;
    var assertIsArray = function(input) {
      if (!Array.isArray(input)) {
        const msg = `This method only supports number arrays but input was: ${input}`;
        throw new Error(msg);
      }
    };
    exports.assertIsArray = assertIsArray;
    var assertIsString = function(input) {
      if (typeof input !== "string") {
        const msg = `This method only supports strings but input was: ${input}`;
        throw new Error(msg);
      }
    };
    exports.assertIsString = assertIsString;
  }
});

// node_modules/@ethereumjs/util/dist/bytes.js
var require_bytes = __commonJS({
  "node_modules/@ethereumjs/util/dist/bytes.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.intToUnpaddedBuffer = exports.bigIntToUnpaddedBuffer = exports.bigIntToHex = exports.bufArrToArr = exports.arrToBufArr = exports.validateNoLeadingZeroes = exports.baToJSON = exports.toUtf8 = exports.short = exports.addHexPrefix = exports.toUnsigned = exports.fromSigned = exports.bufferToInt = exports.bigIntToBuffer = exports.bufferToBigInt = exports.bufferToHex = exports.toBuffer = exports.unpadHexString = exports.unpadArray = exports.unpadBuffer = exports.setLengthRight = exports.setLengthLeft = exports.zeros = exports.intToBuffer = exports.intToHex = void 0;
    var helpers_1 = require_helpers();
    var internal_1 = require_internal();
    var intToHex = function(i) {
      if (!Number.isSafeInteger(i) || i < 0) {
        throw new Error(`Received an invalid integer type: ${i}`);
      }
      return `0x${i.toString(16)}`;
    };
    exports.intToHex = intToHex;
    var intToBuffer = function(i) {
      const hex = (0, exports.intToHex)(i);
      return Buffer.from((0, internal_1.padToEven)(hex.slice(2)), "hex");
    };
    exports.intToBuffer = intToBuffer;
    var zeros = function(bytes2) {
      return Buffer.allocUnsafe(bytes2).fill(0);
    };
    exports.zeros = zeros;
    var setLength = function(msg, length, right) {
      const buf = (0, exports.zeros)(length);
      if (right) {
        if (msg.length < length) {
          msg.copy(buf);
          return buf;
        }
        return msg.slice(0, length);
      } else {
        if (msg.length < length) {
          msg.copy(buf, length - msg.length);
          return buf;
        }
        return msg.slice(-length);
      }
    };
    var setLengthLeft = function(msg, length) {
      (0, helpers_1.assertIsBuffer)(msg);
      return setLength(msg, length, false);
    };
    exports.setLengthLeft = setLengthLeft;
    var setLengthRight = function(msg, length) {
      (0, helpers_1.assertIsBuffer)(msg);
      return setLength(msg, length, true);
    };
    exports.setLengthRight = setLengthRight;
    var stripZeros2 = function(a) {
      let first = a[0];
      while (a.length > 0 && first.toString() === "0") {
        a = a.slice(1);
        first = a[0];
      }
      return a;
    };
    var unpadBuffer = function(a) {
      (0, helpers_1.assertIsBuffer)(a);
      return stripZeros2(a);
    };
    exports.unpadBuffer = unpadBuffer;
    var unpadArray = function(a) {
      (0, helpers_1.assertIsArray)(a);
      return stripZeros2(a);
    };
    exports.unpadArray = unpadArray;
    var unpadHexString = function(a) {
      (0, helpers_1.assertIsHexString)(a);
      a = (0, internal_1.stripHexPrefix)(a);
      return "0x" + stripZeros2(a);
    };
    exports.unpadHexString = unpadHexString;
    var toBuffer = function(v) {
      if (v === null || v === void 0) {
        return Buffer.allocUnsafe(0);
      }
      if (Buffer.isBuffer(v)) {
        return Buffer.from(v);
      }
      if (Array.isArray(v) || v instanceof Uint8Array) {
        return Buffer.from(v);
      }
      if (typeof v === "string") {
        if (!(0, internal_1.isHexString)(v)) {
          throw new Error(`Cannot convert string to buffer. toBuffer only supports 0x-prefixed hex strings and this string was given: ${v}`);
        }
        return Buffer.from((0, internal_1.padToEven)((0, internal_1.stripHexPrefix)(v)), "hex");
      }
      if (typeof v === "number") {
        return (0, exports.intToBuffer)(v);
      }
      if (typeof v === "bigint") {
        if (v < BigInt(0)) {
          throw new Error(`Cannot convert negative bigint to buffer. Given: ${v}`);
        }
        let n = v.toString(16);
        if (n.length % 2)
          n = "0" + n;
        return Buffer.from(n, "hex");
      }
      if (v.toArray) {
        return Buffer.from(v.toArray());
      }
      if (v.toBuffer) {
        return Buffer.from(v.toBuffer());
      }
      throw new Error("invalid type");
    };
    exports.toBuffer = toBuffer;
    var bufferToHex = function(buf) {
      buf = (0, exports.toBuffer)(buf);
      return "0x" + buf.toString("hex");
    };
    exports.bufferToHex = bufferToHex;
    function bufferToBigInt(buf) {
      const hex = (0, exports.bufferToHex)(buf);
      if (hex === "0x") {
        return BigInt(0);
      }
      return BigInt(hex);
    }
    exports.bufferToBigInt = bufferToBigInt;
    function bigIntToBuffer(num) {
      return (0, exports.toBuffer)("0x" + num.toString(16));
    }
    exports.bigIntToBuffer = bigIntToBuffer;
    var bufferToInt = function(buf) {
      const res = Number(bufferToBigInt(buf));
      if (!Number.isSafeInteger(res))
        throw new Error("Number exceeds 53 bits");
      return res;
    };
    exports.bufferToInt = bufferToInt;
    var fromSigned = function(num) {
      return BigInt.asIntN(256, bufferToBigInt(num));
    };
    exports.fromSigned = fromSigned;
    var toUnsigned = function(num) {
      return bigIntToBuffer(BigInt.asUintN(256, num));
    };
    exports.toUnsigned = toUnsigned;
    var addHexPrefix = function(str) {
      if (typeof str !== "string") {
        return str;
      }
      return (0, internal_1.isHexPrefixed)(str) ? str : "0x" + str;
    };
    exports.addHexPrefix = addHexPrefix;
    function short(buffer, maxLength = 50) {
      const bufferStr = Buffer.isBuffer(buffer) ? buffer.toString("hex") : buffer;
      if (bufferStr.length <= maxLength) {
        return bufferStr;
      }
      return bufferStr.slice(0, maxLength) + "\u2026";
    }
    exports.short = short;
    var toUtf8 = function(hex) {
      const zerosRegexp = /^(00)+|(00)+$/g;
      hex = (0, internal_1.stripHexPrefix)(hex);
      if (hex.length % 2 !== 0) {
        throw new Error("Invalid non-even hex string input for toUtf8() provided");
      }
      const bufferVal = Buffer.from(hex.replace(zerosRegexp, ""), "hex");
      return bufferVal.toString("utf8");
    };
    exports.toUtf8 = toUtf8;
    var baToJSON = function(ba) {
      if (Buffer.isBuffer(ba)) {
        return `0x${ba.toString("hex")}`;
      } else if (ba instanceof Array) {
        const array = [];
        for (let i = 0; i < ba.length; i++) {
          array.push((0, exports.baToJSON)(ba[i]));
        }
        return array;
      }
    };
    exports.baToJSON = baToJSON;
    var validateNoLeadingZeroes = function(values) {
      for (const [k, v] of Object.entries(values)) {
        if (v !== void 0 && v.length > 0 && v[0] === 0) {
          throw new Error(`${k} cannot have leading zeroes, received: ${v.toString("hex")}`);
        }
      }
    };
    exports.validateNoLeadingZeroes = validateNoLeadingZeroes;
    function arrToBufArr(arr) {
      if (!Array.isArray(arr)) {
        return Buffer.from(arr);
      }
      return arr.map((a) => arrToBufArr(a));
    }
    exports.arrToBufArr = arrToBufArr;
    function bufArrToArr(arr) {
      if (!Array.isArray(arr)) {
        return Uint8Array.from(arr ?? []);
      }
      return arr.map((a) => bufArrToArr(a));
    }
    exports.bufArrToArr = bufArrToArr;
    var bigIntToHex = (num) => {
      return "0x" + num.toString(16);
    };
    exports.bigIntToHex = bigIntToHex;
    function bigIntToUnpaddedBuffer(value) {
      return (0, exports.unpadBuffer)(bigIntToBuffer(value));
    }
    exports.bigIntToUnpaddedBuffer = bigIntToUnpaddedBuffer;
    function intToUnpaddedBuffer(value) {
      return (0, exports.unpadBuffer)((0, exports.intToBuffer)(value));
    }
    exports.intToUnpaddedBuffer = intToUnpaddedBuffer;
  }
});

// node_modules/@ethereumjs/util/dist/account.js
var require_account = __commonJS({
  "node_modules/@ethereumjs/util/dist/account.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.accountBodyToRLP = exports.accountBodyToSlim = exports.accountBodyFromSlim = exports.isZeroAddress = exports.zeroAddress = exports.importPublic = exports.privateToAddress = exports.privateToPublic = exports.publicToAddress = exports.pubToAddress = exports.isValidPublic = exports.isValidPrivate = exports.generateAddress2 = exports.generateAddress = exports.isValidChecksumAddress = exports.toChecksumAddress = exports.isValidAddress = exports.Account = void 0;
    var rlp_1 = require_dist();
    var keccak_1 = require_keccak();
    var secp256k1_1 = require_secp256k12();
    var utils_1 = require_utils3();
    var bytes_1 = require_bytes();
    var constants_1 = require_constants();
    var helpers_1 = require_helpers();
    var internal_1 = require_internal();
    var _0n2 = BigInt(0);
    var Account = class _Account {
      /**
       * This constructor assigns and validates the values.
       * Use the static factory methods to assist in creating an Account from varying data types.
       */
      constructor(nonce = _0n2, balance = _0n2, storageRoot = constants_1.KECCAK256_RLP, codeHash = constants_1.KECCAK256_NULL) {
        this.nonce = nonce;
        this.balance = balance;
        this.storageRoot = storageRoot;
        this.codeHash = codeHash;
        this._validate();
      }
      static fromAccountData(accountData) {
        const { nonce, balance, storageRoot, codeHash } = accountData;
        return new _Account(nonce !== void 0 ? (0, bytes_1.bufferToBigInt)((0, bytes_1.toBuffer)(nonce)) : void 0, balance !== void 0 ? (0, bytes_1.bufferToBigInt)((0, bytes_1.toBuffer)(balance)) : void 0, storageRoot !== void 0 ? (0, bytes_1.toBuffer)(storageRoot) : void 0, codeHash !== void 0 ? (0, bytes_1.toBuffer)(codeHash) : void 0);
      }
      static fromRlpSerializedAccount(serialized) {
        const values = (0, bytes_1.arrToBufArr)(rlp_1.RLP.decode(Uint8Array.from(serialized)));
        if (!Array.isArray(values)) {
          throw new Error("Invalid serialized account input. Must be array");
        }
        return this.fromValuesArray(values);
      }
      static fromValuesArray(values) {
        const [nonce, balance, storageRoot, codeHash] = values;
        return new _Account((0, bytes_1.bufferToBigInt)(nonce), (0, bytes_1.bufferToBigInt)(balance), storageRoot, codeHash);
      }
      _validate() {
        if (this.nonce < _0n2) {
          throw new Error("nonce must be greater than zero");
        }
        if (this.balance < _0n2) {
          throw new Error("balance must be greater than zero");
        }
        if (this.storageRoot.length !== 32) {
          throw new Error("storageRoot must have a length of 32");
        }
        if (this.codeHash.length !== 32) {
          throw new Error("codeHash must have a length of 32");
        }
      }
      /**
       * Returns a Buffer Array of the raw Buffers for the account, in order.
       */
      raw() {
        return [
          (0, bytes_1.bigIntToUnpaddedBuffer)(this.nonce),
          (0, bytes_1.bigIntToUnpaddedBuffer)(this.balance),
          this.storageRoot,
          this.codeHash
        ];
      }
      /**
       * Returns the RLP serialization of the account as a `Buffer`.
       */
      serialize() {
        return Buffer.from(rlp_1.RLP.encode((0, bytes_1.bufArrToArr)(this.raw())));
      }
      /**
       * Returns a `Boolean` determining if the account is a contract.
       */
      isContract() {
        return !this.codeHash.equals(constants_1.KECCAK256_NULL);
      }
      /**
       * Returns a `Boolean` determining if the account is empty complying to the definition of
       * account emptiness in [EIP-161](https://eips.ethereum.org/EIPS/eip-161):
       * "An account is considered empty when it has no code and zero nonce and zero balance."
       */
      isEmpty() {
        return this.balance === _0n2 && this.nonce === _0n2 && this.codeHash.equals(constants_1.KECCAK256_NULL);
      }
    };
    exports.Account = Account;
    var isValidAddress = function(hexAddress) {
      try {
        (0, helpers_1.assertIsString)(hexAddress);
      } catch (e) {
        return false;
      }
      return /^0x[0-9a-fA-F]{40}$/.test(hexAddress);
    };
    exports.isValidAddress = isValidAddress;
    var toChecksumAddress = function(hexAddress, eip1191ChainId) {
      (0, helpers_1.assertIsHexString)(hexAddress);
      const address = (0, internal_1.stripHexPrefix)(hexAddress).toLowerCase();
      let prefix = "";
      if (eip1191ChainId !== void 0) {
        const chainId = (0, bytes_1.bufferToBigInt)((0, bytes_1.toBuffer)(eip1191ChainId));
        prefix = chainId.toString() + "0x";
      }
      const buf = Buffer.from(prefix + address, "utf8");
      const hash2 = (0, utils_1.bytesToHex)((0, keccak_1.keccak256)(buf));
      let ret = "0x";
      for (let i = 0; i < address.length; i++) {
        if (parseInt(hash2[i], 16) >= 8) {
          ret += address[i].toUpperCase();
        } else {
          ret += address[i];
        }
      }
      return ret;
    };
    exports.toChecksumAddress = toChecksumAddress;
    var isValidChecksumAddress = function(hexAddress, eip1191ChainId) {
      return (0, exports.isValidAddress)(hexAddress) && (0, exports.toChecksumAddress)(hexAddress, eip1191ChainId) === hexAddress;
    };
    exports.isValidChecksumAddress = isValidChecksumAddress;
    var generateAddress = function(from, nonce) {
      (0, helpers_1.assertIsBuffer)(from);
      (0, helpers_1.assertIsBuffer)(nonce);
      if ((0, bytes_1.bufferToBigInt)(nonce) === BigInt(0)) {
        return Buffer.from((0, keccak_1.keccak256)(rlp_1.RLP.encode((0, bytes_1.bufArrToArr)([from, null])))).slice(-20);
      }
      return Buffer.from((0, keccak_1.keccak256)(rlp_1.RLP.encode((0, bytes_1.bufArrToArr)([from, nonce])))).slice(-20);
    };
    exports.generateAddress = generateAddress;
    var generateAddress2 = function(from, salt, initCode) {
      (0, helpers_1.assertIsBuffer)(from);
      (0, helpers_1.assertIsBuffer)(salt);
      (0, helpers_1.assertIsBuffer)(initCode);
      if (from.length !== 20) {
        throw new Error("Expected from to be of length 20");
      }
      if (salt.length !== 32) {
        throw new Error("Expected salt to be of length 32");
      }
      const address = (0, keccak_1.keccak256)(Buffer.concat([Buffer.from("ff", "hex"), from, salt, (0, keccak_1.keccak256)(initCode)]));
      return (0, bytes_1.toBuffer)(address).slice(-20);
    };
    exports.generateAddress2 = generateAddress2;
    var isValidPrivate = function(privateKey) {
      return secp256k1_1.secp256k1.utils.isValidPrivateKey(privateKey);
    };
    exports.isValidPrivate = isValidPrivate;
    var isValidPublic = function(publicKey, sanitize = false) {
      (0, helpers_1.assertIsBuffer)(publicKey);
      if (publicKey.length === 64) {
        try {
          secp256k1_1.secp256k1.ProjectivePoint.fromHex(Buffer.concat([Buffer.from([4]), publicKey]));
          return true;
        } catch (e) {
          return false;
        }
      }
      if (!sanitize) {
        return false;
      }
      try {
        secp256k1_1.secp256k1.ProjectivePoint.fromHex(publicKey);
        return true;
      } catch (e) {
        return false;
      }
    };
    exports.isValidPublic = isValidPublic;
    var pubToAddress = function(pubKey, sanitize = false) {
      (0, helpers_1.assertIsBuffer)(pubKey);
      if (sanitize && pubKey.length !== 64) {
        pubKey = Buffer.from(secp256k1_1.secp256k1.ProjectivePoint.fromHex(pubKey).toRawBytes(false).slice(1));
      }
      if (pubKey.length !== 64) {
        throw new Error("Expected pubKey to be of length 64");
      }
      return Buffer.from((0, keccak_1.keccak256)(pubKey)).slice(-20);
    };
    exports.pubToAddress = pubToAddress;
    exports.publicToAddress = exports.pubToAddress;
    var privateToPublic = function(privateKey) {
      (0, helpers_1.assertIsBuffer)(privateKey);
      return Buffer.from(secp256k1_1.secp256k1.ProjectivePoint.fromPrivateKey(privateKey).toRawBytes(false).slice(1));
    };
    exports.privateToPublic = privateToPublic;
    var privateToAddress = function(privateKey) {
      return (0, exports.publicToAddress)((0, exports.privateToPublic)(privateKey));
    };
    exports.privateToAddress = privateToAddress;
    var importPublic = function(publicKey) {
      (0, helpers_1.assertIsBuffer)(publicKey);
      if (publicKey.length !== 64) {
        publicKey = Buffer.from(secp256k1_1.secp256k1.ProjectivePoint.fromHex(publicKey).toRawBytes(false).slice(1));
      }
      return publicKey;
    };
    exports.importPublic = importPublic;
    var zeroAddress = function() {
      const addressLength = 20;
      const addr = (0, bytes_1.zeros)(addressLength);
      return (0, bytes_1.bufferToHex)(addr);
    };
    exports.zeroAddress = zeroAddress;
    var isZeroAddress = function(hexAddress) {
      try {
        (0, helpers_1.assertIsString)(hexAddress);
      } catch (e) {
        return false;
      }
      const zeroAddr = (0, exports.zeroAddress)();
      return zeroAddr === hexAddress;
    };
    exports.isZeroAddress = isZeroAddress;
    function accountBodyFromSlim(body) {
      const [nonce, balance, storageRoot, codeHash] = body;
      return [
        nonce,
        balance,
        (0, bytes_1.arrToBufArr)(storageRoot).length === 0 ? constants_1.KECCAK256_RLP : storageRoot,
        (0, bytes_1.arrToBufArr)(codeHash).length === 0 ? constants_1.KECCAK256_NULL : codeHash
      ];
    }
    exports.accountBodyFromSlim = accountBodyFromSlim;
    var emptyUint8Arr = new Uint8Array(0);
    function accountBodyToSlim(body) {
      const [nonce, balance, storageRoot, codeHash] = body;
      return [
        nonce,
        balance,
        (0, bytes_1.arrToBufArr)(storageRoot).equals(constants_1.KECCAK256_RLP) ? emptyUint8Arr : storageRoot,
        (0, bytes_1.arrToBufArr)(codeHash).equals(constants_1.KECCAK256_NULL) ? emptyUint8Arr : codeHash
      ];
    }
    exports.accountBodyToSlim = accountBodyToSlim;
    function accountBodyToRLP(body, couldBeSlim = true) {
      const accountBody = couldBeSlim ? accountBodyFromSlim(body) : body;
      return (0, bytes_1.arrToBufArr)(rlp_1.RLP.encode(accountBody));
    }
    exports.accountBodyToRLP = accountBodyToRLP;
  }
});

// node_modules/@ethereumjs/util/dist/address.js
var require_address = __commonJS({
  "node_modules/@ethereumjs/util/dist/address.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Address = void 0;
    var account_1 = require_account();
    var bytes_1 = require_bytes();
    var Address = class _Address {
      constructor(buf) {
        if (buf.length !== 20) {
          throw new Error("Invalid address length");
        }
        this.buf = buf;
      }
      /**
       * Returns the zero address.
       */
      static zero() {
        return new _Address((0, bytes_1.zeros)(20));
      }
      /**
       * Returns an Address object from a hex-encoded string.
       * @param str - Hex-encoded address
       */
      static fromString(str) {
        if (!(0, account_1.isValidAddress)(str)) {
          throw new Error("Invalid address");
        }
        return new _Address((0, bytes_1.toBuffer)(str));
      }
      /**
       * Returns an address for a given public key.
       * @param pubKey The two points of an uncompressed key
       */
      static fromPublicKey(pubKey) {
        if (!Buffer.isBuffer(pubKey)) {
          throw new Error("Public key should be Buffer");
        }
        const buf = (0, account_1.pubToAddress)(pubKey);
        return new _Address(buf);
      }
      /**
       * Returns an address for a given private key.
       * @param privateKey A private key must be 256 bits wide
       */
      static fromPrivateKey(privateKey) {
        if (!Buffer.isBuffer(privateKey)) {
          throw new Error("Private key should be Buffer");
        }
        const buf = (0, account_1.privateToAddress)(privateKey);
        return new _Address(buf);
      }
      /**
       * Generates an address for a newly created contract.
       * @param from The address which is creating this new address
       * @param nonce The nonce of the from account
       */
      static generate(from, nonce) {
        if (typeof nonce !== "bigint") {
          throw new Error("Expected nonce to be a bigint");
        }
        return new _Address((0, account_1.generateAddress)(from.buf, (0, bytes_1.bigIntToBuffer)(nonce)));
      }
      /**
       * Generates an address for a contract created using CREATE2.
       * @param from The address which is creating this new address
       * @param salt A salt
       * @param initCode The init code of the contract being created
       */
      static generate2(from, salt, initCode) {
        if (!Buffer.isBuffer(salt)) {
          throw new Error("Expected salt to be a Buffer");
        }
        if (!Buffer.isBuffer(initCode)) {
          throw new Error("Expected initCode to be a Buffer");
        }
        return new _Address((0, account_1.generateAddress2)(from.buf, salt, initCode));
      }
      /**
       * Is address equal to another.
       */
      equals(address) {
        return this.buf.equals(address.buf);
      }
      /**
       * Is address zero.
       */
      isZero() {
        return this.equals(_Address.zero());
      }
      /**
       * True if address is in the address range defined
       * by EIP-1352
       */
      isPrecompileOrSystemAddress() {
        const address = (0, bytes_1.bufferToBigInt)(this.buf);
        const rangeMin = BigInt(0);
        const rangeMax = BigInt("0xffff");
        return address >= rangeMin && address <= rangeMax;
      }
      /**
       * Returns hex encoding of address.
       */
      toString() {
        return "0x" + this.buf.toString("hex");
      }
      /**
       * Returns Buffer representation of address.
       */
      toBuffer() {
        return Buffer.from(this.buf);
      }
    };
    exports.Address = Address;
  }
});

// node_modules/@ethereumjs/util/dist/types.js
var require_types = __commonJS({
  "node_modules/@ethereumjs/util/dist/types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.toType = exports.TypeOutput = void 0;
    var bytes_1 = require_bytes();
    var internal_1 = require_internal();
    var TypeOutput;
    (function(TypeOutput2) {
      TypeOutput2[TypeOutput2["Number"] = 0] = "Number";
      TypeOutput2[TypeOutput2["BigInt"] = 1] = "BigInt";
      TypeOutput2[TypeOutput2["Buffer"] = 2] = "Buffer";
      TypeOutput2[TypeOutput2["PrefixedHexString"] = 3] = "PrefixedHexString";
    })(TypeOutput = exports.TypeOutput || (exports.TypeOutput = {}));
    function toType(input, outputType) {
      if (input === null) {
        return null;
      }
      if (input === void 0) {
        return void 0;
      }
      if (typeof input === "string" && !(0, internal_1.isHexString)(input)) {
        throw new Error(`A string must be provided with a 0x-prefix, given: ${input}`);
      } else if (typeof input === "number" && !Number.isSafeInteger(input)) {
        throw new Error("The provided number is greater than MAX_SAFE_INTEGER (please use an alternative input type)");
      }
      const output2 = (0, bytes_1.toBuffer)(input);
      switch (outputType) {
        case TypeOutput.Buffer:
          return output2;
        case TypeOutput.BigInt:
          return (0, bytes_1.bufferToBigInt)(output2);
        case TypeOutput.Number: {
          const bigInt = (0, bytes_1.bufferToBigInt)(output2);
          if (bigInt > BigInt(Number.MAX_SAFE_INTEGER)) {
            throw new Error("The provided number is greater than MAX_SAFE_INTEGER (please use an alternative output type)");
          }
          return Number(bigInt);
        }
        case TypeOutput.PrefixedHexString:
          return (0, bytes_1.bufferToHex)(output2);
        default:
          throw new Error("unknown outputType");
      }
    }
    exports.toType = toType;
  }
});

// node_modules/@ethereumjs/util/dist/withdrawal.js
var require_withdrawal = __commonJS({
  "node_modules/@ethereumjs/util/dist/withdrawal.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Withdrawal = void 0;
    var address_1 = require_address();
    var bytes_1 = require_bytes();
    var types_1 = require_types();
    var Withdrawal = class _Withdrawal {
      /**
       * This constructor assigns and validates the values.
       * Use the static factory methods to assist in creating a Withdrawal object from varying data types.
       * Its amount is in Gwei to match CL representation and for eventual ssz withdrawalsRoot
       */
      constructor(index, validatorIndex, address, amount) {
        this.index = index;
        this.validatorIndex = validatorIndex;
        this.address = address;
        this.amount = amount;
      }
      static fromWithdrawalData(withdrawalData) {
        const { index: indexData, validatorIndex: validatorIndexData, address: addressData, amount: amountData } = withdrawalData;
        const index = (0, types_1.toType)(indexData, types_1.TypeOutput.BigInt);
        const validatorIndex = (0, types_1.toType)(validatorIndexData, types_1.TypeOutput.BigInt);
        const address = new address_1.Address((0, types_1.toType)(addressData, types_1.TypeOutput.Buffer));
        const amount = (0, types_1.toType)(amountData, types_1.TypeOutput.BigInt);
        return new _Withdrawal(index, validatorIndex, address, amount);
      }
      static fromValuesArray(withdrawalArray) {
        if (withdrawalArray.length !== 4) {
          throw Error(`Invalid withdrawalArray length expected=4 actual=${withdrawalArray.length}`);
        }
        const [index, validatorIndex, address, amount] = withdrawalArray;
        return _Withdrawal.fromWithdrawalData({ index, validatorIndex, address, amount });
      }
      /**
       * Convert a withdrawal to a buffer array
       * @param withdrawal the withdrawal to convert
       * @returns buffer array of the withdrawal
       */
      static toBufferArray(withdrawal) {
        const { index, validatorIndex, address, amount } = withdrawal;
        const indexBuffer = (0, types_1.toType)(index, types_1.TypeOutput.BigInt) === BigInt(0) ? Buffer.alloc(0) : (0, types_1.toType)(index, types_1.TypeOutput.Buffer);
        const validatorIndexBuffer = (0, types_1.toType)(validatorIndex, types_1.TypeOutput.BigInt) === BigInt(0) ? Buffer.alloc(0) : (0, types_1.toType)(validatorIndex, types_1.TypeOutput.Buffer);
        let addressBuffer;
        if (address instanceof address_1.Address) {
          addressBuffer = address.buf;
        } else {
          addressBuffer = (0, types_1.toType)(address, types_1.TypeOutput.Buffer);
        }
        const amountBuffer = (0, types_1.toType)(amount, types_1.TypeOutput.BigInt) === BigInt(0) ? Buffer.alloc(0) : (0, types_1.toType)(amount, types_1.TypeOutput.Buffer);
        return [indexBuffer, validatorIndexBuffer, addressBuffer, amountBuffer];
      }
      raw() {
        return _Withdrawal.toBufferArray(this);
      }
      toValue() {
        return {
          index: this.index,
          validatorIndex: this.validatorIndex,
          address: this.address.buf,
          amount: this.amount
        };
      }
      toJSON() {
        return {
          index: (0, bytes_1.bigIntToHex)(this.index),
          validatorIndex: (0, bytes_1.bigIntToHex)(this.validatorIndex),
          address: "0x" + this.address.buf.toString("hex"),
          amount: (0, bytes_1.bigIntToHex)(this.amount)
        };
      }
    };
    exports.Withdrawal = Withdrawal;
  }
});

// node_modules/@ethereumjs/util/dist/signature.js
var require_signature = __commonJS({
  "node_modules/@ethereumjs/util/dist/signature.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.hashPersonalMessage = exports.isValidSignature = exports.fromRpcSig = exports.toCompactSig = exports.toRpcSig = exports.ecrecover = exports.ecsign = void 0;
    var keccak_1 = require_keccak();
    var secp256k1_1 = require_secp256k12();
    var bytes_1 = require_bytes();
    var constants_1 = require_constants();
    var helpers_1 = require_helpers();
    function ecsign(msgHash, privateKey, chainId) {
      const sig = secp256k1_1.secp256k1.sign(msgHash, privateKey);
      const buf = sig.toCompactRawBytes();
      const r = Buffer.from(buf.slice(0, 32));
      const s = Buffer.from(buf.slice(32, 64));
      const v = chainId === void 0 ? BigInt(sig.recovery + 27) : BigInt(sig.recovery + 35) + BigInt(chainId) * BigInt(2);
      return { r, s, v };
    }
    exports.ecsign = ecsign;
    function calculateSigRecovery(v, chainId) {
      if (v === BigInt(0) || v === BigInt(1))
        return v;
      if (chainId === void 0) {
        return v - BigInt(27);
      }
      return v - (chainId * BigInt(2) + BigInt(35));
    }
    function isValidSigRecovery(recovery) {
      return recovery === BigInt(0) || recovery === BigInt(1);
    }
    var ecrecover = function(msgHash, v, r, s, chainId) {
      const signature = Buffer.concat([(0, bytes_1.setLengthLeft)(r, 32), (0, bytes_1.setLengthLeft)(s, 32)], 64);
      const recovery = calculateSigRecovery(v, chainId);
      if (!isValidSigRecovery(recovery)) {
        throw new Error("Invalid signature v value");
      }
      const sig = secp256k1_1.secp256k1.Signature.fromCompact(signature).addRecoveryBit(Number(recovery));
      const senderPubKey = sig.recoverPublicKey(msgHash);
      return Buffer.from(senderPubKey.toRawBytes(false).slice(1));
    };
    exports.ecrecover = ecrecover;
    var toRpcSig = function(v, r, s, chainId) {
      const recovery = calculateSigRecovery(v, chainId);
      if (!isValidSigRecovery(recovery)) {
        throw new Error("Invalid signature v value");
      }
      return (0, bytes_1.bufferToHex)(Buffer.concat([(0, bytes_1.setLengthLeft)(r, 32), (0, bytes_1.setLengthLeft)(s, 32), (0, bytes_1.toBuffer)(v)]));
    };
    exports.toRpcSig = toRpcSig;
    var toCompactSig = function(v, r, s, chainId) {
      const recovery = calculateSigRecovery(v, chainId);
      if (!isValidSigRecovery(recovery)) {
        throw new Error("Invalid signature v value");
      }
      let ss = s;
      if (v > BigInt(28) && v % BigInt(2) === BigInt(1) || v === BigInt(1) || v === BigInt(28)) {
        ss = Buffer.from(s);
        ss[0] |= 128;
      }
      return (0, bytes_1.bufferToHex)(Buffer.concat([(0, bytes_1.setLengthLeft)(r, 32), (0, bytes_1.setLengthLeft)(ss, 32)]));
    };
    exports.toCompactSig = toCompactSig;
    var fromRpcSig = function(sig) {
      const buf = (0, bytes_1.toBuffer)(sig);
      let r;
      let s;
      let v;
      if (buf.length >= 65) {
        r = buf.slice(0, 32);
        s = buf.slice(32, 64);
        v = (0, bytes_1.bufferToBigInt)(buf.slice(64));
      } else if (buf.length === 64) {
        r = buf.slice(0, 32);
        s = buf.slice(32, 64);
        v = BigInt((0, bytes_1.bufferToInt)(buf.slice(32, 33)) >> 7);
        s[0] &= 127;
      } else {
        throw new Error("Invalid signature length");
      }
      if (v < 27) {
        v = v + BigInt(27);
      }
      return {
        v,
        r,
        s
      };
    };
    exports.fromRpcSig = fromRpcSig;
    var isValidSignature = function(v, r, s, homesteadOrLater = true, chainId) {
      if (r.length !== 32 || s.length !== 32) {
        return false;
      }
      if (!isValidSigRecovery(calculateSigRecovery(v, chainId))) {
        return false;
      }
      const rBigInt = (0, bytes_1.bufferToBigInt)(r);
      const sBigInt = (0, bytes_1.bufferToBigInt)(s);
      if (rBigInt === BigInt(0) || rBigInt >= constants_1.SECP256K1_ORDER || sBigInt === BigInt(0) || sBigInt >= constants_1.SECP256K1_ORDER) {
        return false;
      }
      if (homesteadOrLater && sBigInt >= constants_1.SECP256K1_ORDER_DIV_2) {
        return false;
      }
      return true;
    };
    exports.isValidSignature = isValidSignature;
    var hashPersonalMessage = function(message) {
      (0, helpers_1.assertIsBuffer)(message);
      const prefix = Buffer.from(`Ethereum Signed Message:
${message.length}`, "utf-8");
      return Buffer.from((0, keccak_1.keccak256)(Buffer.concat([prefix, message])));
    };
    exports.hashPersonalMessage = hashPersonalMessage;
  }
});

// node_modules/@ethereumjs/util/dist/encoding.js
var require_encoding = __commonJS({
  "node_modules/@ethereumjs/util/dist/encoding.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.compactBytesToNibbles = exports.bytesToNibbles = exports.nibblesToCompactBytes = exports.nibblesToBytes = exports.hasTerminator = void 0;
    var hasTerminator = (nibbles) => {
      return nibbles.length > 0 && nibbles[nibbles.length - 1] === 16;
    };
    exports.hasTerminator = hasTerminator;
    var nibblesToBytes = (nibbles, bytes2) => {
      for (let bi = 0, ni = 0; ni < nibbles.length; bi += 1, ni += 2) {
        bytes2[bi] = nibbles[ni] << 4 | nibbles[ni + 1];
      }
    };
    exports.nibblesToBytes = nibblesToBytes;
    var nibblesToCompactBytes = (nibbles) => {
      let terminator = 0;
      if ((0, exports.hasTerminator)(nibbles)) {
        terminator = 1;
        nibbles = nibbles.subarray(0, nibbles.length - 1);
      }
      const buf = new Uint8Array(nibbles.length / 2 + 1);
      buf[0] = terminator << 5;
      if ((nibbles.length & 1) === 1) {
        buf[0] |= 1 << 4;
        buf[0] |= nibbles[0];
        nibbles = nibbles.subarray(1);
      }
      (0, exports.nibblesToBytes)(nibbles, buf.subarray(1));
      return buf;
    };
    exports.nibblesToCompactBytes = nibblesToCompactBytes;
    var bytesToNibbles = (str) => {
      const l = str.length * 2 + 1;
      const nibbles = new Uint8Array(l);
      for (let i = 0; i < str.length; i++) {
        const b = str[i];
        nibbles[i * 2] = b / 16;
        nibbles[i * 2 + 1] = b % 16;
      }
      nibbles[l - 1] = 16;
      return nibbles;
    };
    exports.bytesToNibbles = bytesToNibbles;
    var compactBytesToNibbles = (compact) => {
      if (compact.length === 0) {
        return compact;
      }
      let base = (0, exports.bytesToNibbles)(compact);
      if (base[0] < 2) {
        base = base.subarray(0, base.length - 1);
      }
      const chop = 2 - (base[0] & 1);
      return base.subarray(chop);
    };
    exports.compactBytesToNibbles = compactBytesToNibbles;
  }
});

// node_modules/@ethereumjs/util/dist/asyncEventEmitter.js
var require_asyncEventEmitter = __commonJS({
  "node_modules/@ethereumjs/util/dist/asyncEventEmitter.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AsyncEventEmitter = void 0;
    var events_1 = __require("events");
    async function runInSeries(context, tasks, data) {
      let error;
      for await (const task of tasks) {
        try {
          if (task.length < 2) {
            task.call(context, data);
          } else {
            await new Promise((resolve, reject) => {
              task.call(context, data, (error2) => {
                if (error2) {
                  reject(error2);
                } else {
                  resolve();
                }
              });
            });
          }
        } catch (e) {
          error = e;
        }
      }
      if (error) {
        throw error;
      }
    }
    var AsyncEventEmitter = class extends events_1.EventEmitter {
      emit(event, ...args) {
        let [data, callback] = args;
        const self2 = this;
        let listeners = self2._events[event] ?? [];
        if (callback === void 0 && typeof data === "function") {
          callback = data;
          data = void 0;
        }
        if (event === "newListener" || event === "removeListener") {
          data = {
            event: data,
            fn: callback
          };
          callback = void 0;
        }
        listeners = Array.isArray(listeners) ? listeners : [listeners];
        runInSeries(self2, listeners.slice(), data).then(callback).catch(callback);
        return self2.listenerCount(event) > 0;
      }
      once(event, listener) {
        const self2 = this;
        let g;
        if (typeof listener !== "function") {
          throw new TypeError("listener must be a function");
        }
        if (listener.length >= 2) {
          g = function(e, next) {
            self2.removeListener(event, g);
            void listener(e, next);
          };
        } else {
          g = function(e) {
            self2.removeListener(event, g);
            void listener(e, g);
          };
        }
        self2.on(event, g);
        return self2;
      }
      first(event, listener) {
        let listeners = this._events[event] ?? [];
        if (typeof listener !== "function") {
          throw new TypeError("listener must be a function");
        }
        if (!Array.isArray(listeners)) {
          ;
          this._events[event] = listeners = [listeners];
        }
        listeners.unshift(listener);
        return this;
      }
      before(event, target, listener) {
        return this.beforeOrAfter(event, target, listener);
      }
      after(event, target, listener) {
        return this.beforeOrAfter(event, target, listener, "after");
      }
      beforeOrAfter(event, target, listener, beforeOrAfter) {
        let listeners = this._events[event] ?? [];
        let i;
        let index;
        const add2 = beforeOrAfter === "after" ? 1 : 0;
        if (typeof listener !== "function") {
          throw new TypeError("listener must be a function");
        }
        if (typeof target !== "function") {
          throw new TypeError("target must be a function");
        }
        if (!Array.isArray(listeners)) {
          ;
          this._events[event] = listeners = [listeners];
        }
        index = listeners.length;
        for (i = listeners.length; i--; ) {
          if (listeners[i] === target) {
            index = i + add2;
            break;
          }
        }
        listeners.splice(index, 0, listener);
        return this;
      }
      on(event, listener) {
        return super.on(event, listener);
      }
      addListener(event, listener) {
        return super.addListener(event, listener);
      }
      prependListener(event, listener) {
        return super.prependListener(event, listener);
      }
      prependOnceListener(event, listener) {
        return super.prependOnceListener(event, listener);
      }
      removeAllListeners(event) {
        return super.removeAllListeners(event);
      }
      removeListener(event, listener) {
        return super.removeListener(event, listener);
      }
      eventNames() {
        return super.eventNames();
      }
      listeners(event) {
        return super.listeners(event);
      }
      listenerCount(event) {
        return super.listenerCount(event);
      }
      getMaxListeners() {
        return super.getMaxListeners();
      }
      setMaxListeners(maxListeners) {
        return super.setMaxListeners(maxListeners);
      }
    };
    exports.AsyncEventEmitter = AsyncEventEmitter;
  }
});

// node_modules/@ethereumjs/util/dist/lock.js
var require_lock = __commonJS({
  "node_modules/@ethereumjs/util/dist/lock.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Lock = void 0;
    var Lock = class {
      constructor() {
        this.permits = 1;
        this.promiseResolverQueue = [];
      }
      /**
       * Returns a promise used to wait for a permit to become available. This method should be awaited on.
       * @returns  A promise that gets resolved when execution is allowed to proceed.
       */
      async acquire() {
        if (this.permits > 0) {
          this.permits -= 1;
          return Promise.resolve(true);
        }
        return new Promise((resolver) => this.promiseResolverQueue.push(resolver));
      }
      /**
       * Increases the number of permits by one. If there are other functions waiting, one of them will
       * continue to execute in a future iteration of the event loop.
       */
      release() {
        this.permits += 1;
        if (this.permits > 1 && this.promiseResolverQueue.length > 0) {
          console.warn("Lock.permits should never be > 0 when there is someone waiting.");
        } else if (this.permits === 1 && this.promiseResolverQueue.length > 0) {
          this.permits -= 1;
          const nextResolver = this.promiseResolverQueue.shift();
          if (nextResolver) {
            nextResolver(true);
          }
        }
      }
    };
    exports.Lock = Lock;
  }
});

// node_modules/micro-ftch/index.js
var require_micro_ftch = __commonJS({
  "node_modules/micro-ftch/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InvalidStatusCodeError = exports.InvalidCertError = void 0;
    var DEFAULT_OPT = Object.freeze({
      redirect: true,
      expectStatusCode: 200,
      headers: {},
      full: false,
      keepAlive: true,
      cors: false,
      referrer: false,
      sslAllowSelfSigned: false,
      _redirectCount: 0
    });
    var InvalidCertError = class extends Error {
      constructor(msg, fingerprint256) {
        super(msg);
        this.fingerprint256 = fingerprint256;
      }
    };
    exports.InvalidCertError = InvalidCertError;
    var InvalidStatusCodeError = class extends Error {
      constructor(statusCode) {
        super(`Request Failed. Status Code: ${statusCode}`);
        this.statusCode = statusCode;
      }
    };
    exports.InvalidStatusCodeError = InvalidStatusCodeError;
    function detectType(b, type) {
      if (!type || type === "text" || type === "json") {
        try {
          let text = new TextDecoder("utf8", { fatal: true }).decode(b);
          if (type === "text")
            return text;
          try {
            return JSON.parse(text);
          } catch (err) {
            if (type === "json")
              throw err;
            return text;
          }
        } catch (err) {
          if (type === "text" || type === "json")
            throw err;
        }
      }
      return b;
    }
    var agents = {};
    function fetchNode(url, _options) {
      let options = { ...DEFAULT_OPT, ..._options };
      const http = __require("http");
      const https = __require("https");
      const zlib = __require("zlib");
      const { promisify } = __require("util");
      const { resolve: urlResolve } = __require("url");
      const isSecure = !!/^https/.test(url);
      let opts = {
        method: options.method || "GET",
        headers: { "Accept-Encoding": "gzip, deflate, br" }
      };
      const compactFP = (s) => s.replace(/:| /g, "").toLowerCase();
      if (options.keepAlive) {
        const agentOpt = {
          keepAlive: true,
          keepAliveMsecs: 30 * 1e3,
          maxFreeSockets: 1024,
          maxCachedSessions: 1024
        };
        const agentKey = [
          isSecure,
          isSecure && options.sslPinnedCertificates?.map((i) => compactFP(i)).sort()
        ].join();
        opts.agent = agents[agentKey] || (agents[agentKey] = new (isSecure ? https : http).Agent(agentOpt));
      }
      if (options.type === "json")
        opts.headers["Content-Type"] = "application/json";
      if (options.data) {
        if (!options.method)
          opts.method = "POST";
        opts.body = options.type === "json" ? JSON.stringify(options.data) : options.data;
      }
      opts.headers = { ...opts.headers, ...options.headers };
      if (options.sslAllowSelfSigned)
        opts.rejectUnauthorized = false;
      const handleRes = async (res) => {
        const status = res.statusCode;
        if (options.redirect && 300 <= status && status < 400 && res.headers["location"]) {
          if (options._redirectCount == 10)
            throw new Error("Request failed. Too much redirects.");
          options._redirectCount += 1;
          return await fetchNode(urlResolve(url, res.headers["location"]), options);
        }
        if (options.expectStatusCode && status !== options.expectStatusCode) {
          res.resume();
          throw new InvalidStatusCodeError(status);
        }
        let buf = [];
        for await (const chunk of res)
          buf.push(chunk);
        let bytes2 = Buffer.concat(buf);
        const encoding = res.headers["content-encoding"];
        if (encoding === "br")
          bytes2 = await promisify(zlib.brotliDecompress)(bytes2);
        if (encoding === "gzip" || encoding === "deflate")
          bytes2 = await promisify(zlib.unzip)(bytes2);
        const body = detectType(bytes2, options.type);
        if (options.full)
          return { headers: res.headers, status, body };
        return body;
      };
      return new Promise((resolve, reject) => {
        const handleError = async (err) => {
          if (err && err.code === "DEPTH_ZERO_SELF_SIGNED_CERT") {
            try {
              await fetchNode(url, { ...options, sslAllowSelfSigned: true, sslPinnedCertificates: [] });
            } catch (e) {
              if (e && e.fingerprint256) {
                err = new InvalidCertError(`Self-signed SSL certificate: ${e.fingerprint256}`, e.fingerprint256);
              }
            }
          }
          reject(err);
        };
        const req = (isSecure ? https : http).request(url, opts, (res) => {
          res.on("error", handleError);
          (async () => {
            try {
              resolve(await handleRes(res));
            } catch (error) {
              reject(error);
            }
          })();
        });
        req.on("error", handleError);
        const pinned = options.sslPinnedCertificates?.map((i) => compactFP(i));
        const mfetchSecureConnect = (socket) => {
          const fp256 = compactFP(socket.getPeerCertificate()?.fingerprint256 || "");
          if (!fp256 && socket.isSessionReused())
            return;
          if (pinned.includes(fp256))
            return;
          req.emit("error", new InvalidCertError(`Invalid SSL certificate: ${fp256} Expected: ${pinned}`, fp256));
          return req.abort();
        };
        if (options.sslPinnedCertificates) {
          req.on("socket", (socket) => {
            const hasListeners = socket.listeners("secureConnect").map((i) => (i.name || "").replace("bound ", "")).includes("mfetchSecureConnect");
            if (hasListeners)
              return;
            socket.on("secureConnect", mfetchSecureConnect.bind(null, socket));
          });
        }
        if (options.keepAlive)
          req.setNoDelay(true);
        if (opts.body)
          req.write(opts.body);
        req.end();
      });
    }
    var SAFE_HEADERS = new Set(["Accept", "Accept-Language", "Content-Language", "Content-Type"].map((i) => i.toLowerCase()));
    var FORBIDDEN_HEADERS = new Set([
      "Accept-Charset",
      "Accept-Encoding",
      "Access-Control-Request-Headers",
      "Access-Control-Request-Method",
      "Connection",
      "Content-Length",
      "Cookie",
      "Cookie2",
      "Date",
      "DNT",
      "Expect",
      "Host",
      "Keep-Alive",
      "Origin",
      "Referer",
      "TE",
      "Trailer",
      "Transfer-Encoding",
      "Upgrade",
      "Via"
    ].map((i) => i.toLowerCase()));
    async function fetchBrowser(url, _options) {
      let options = { ...DEFAULT_OPT, ..._options };
      const headers = new Headers();
      if (options.type === "json")
        headers.set("Content-Type", "application/json");
      let parsed = new URL(url);
      if (parsed.username) {
        const auth = btoa(`${parsed.username}:${parsed.password}`);
        headers.set("Authorization", `Basic ${auth}`);
        parsed.username = "";
        parsed.password = "";
      }
      url = "" + parsed;
      for (let k in options.headers) {
        const name = k.toLowerCase();
        if (SAFE_HEADERS.has(name) || options.cors && !FORBIDDEN_HEADERS.has(name))
          headers.set(k, options.headers[k]);
      }
      let opts = { headers, redirect: options.redirect ? "follow" : "manual" };
      if (!options.referrer)
        opts.referrerPolicy = "no-referrer";
      if (options.cors)
        opts.mode = "cors";
      if (options.data) {
        if (!options.method)
          opts.method = "POST";
        opts.body = options.type === "json" ? JSON.stringify(options.data) : options.data;
      }
      const res = await fetch(url, opts);
      if (options.expectStatusCode && res.status !== options.expectStatusCode)
        throw new InvalidStatusCodeError(res.status);
      const body = detectType(new Uint8Array(await res.arrayBuffer()), options.type);
      if (options.full)
        return { headers: Object.fromEntries(res.headers.entries()), status: res.status, body };
      return body;
    }
    var IS_NODE = !!(typeof process == "object" && process.versions && process.versions.node && process.versions.v8);
    function fetchUrl(url, options) {
      const fn = IS_NODE ? fetchNode : fetchBrowser;
      return fn(url, options);
    }
    exports.default = fetchUrl;
  }
});

// node_modules/@ethereumjs/util/dist/provider.js
var require_provider = __commonJS({
  "node_modules/@ethereumjs/util/dist/provider.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getProvider = exports.fetchFromProvider = void 0;
    var micro_ftch_1 = require_micro_ftch();
    var fetchFromProvider = async (url, params) => {
      const res = await (0, micro_ftch_1.default)(url, {
        headers: {
          "content-type": "application/json"
        },
        type: "json",
        data: {
          method: params.method,
          params: params.params,
          jsonrpc: "2.0",
          id: 1
        }
      });
      return res.result;
    };
    exports.fetchFromProvider = fetchFromProvider;
    var getProvider = (provider) => {
      if (typeof provider === "string") {
        return provider;
      } else if (provider?.connection?.url !== void 0) {
        return provider.connection.url;
      } else {
        throw new Error("Must provide valid provider URL or Web3Provider");
      }
    };
    exports.getProvider = getProvider;
  }
});

// node_modules/@ethereumjs/util/dist/index.js
var require_dist2 = __commonJS({
  "node_modules/@ethereumjs/util/dist/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.toAscii = exports.stripHexPrefix = exports.padToEven = exports.isHexString = exports.isHexPrefixed = exports.getKeys = exports.getBinarySize = exports.fromUtf8 = exports.fromAscii = exports.arrayContainsArray = void 0;
    __exportStar(require_constants(), exports);
    __exportStar(require_units(), exports);
    __exportStar(require_account(), exports);
    __exportStar(require_address(), exports);
    __exportStar(require_withdrawal(), exports);
    __exportStar(require_signature(), exports);
    __exportStar(require_bytes(), exports);
    __exportStar(require_types(), exports);
    __exportStar(require_encoding(), exports);
    __exportStar(require_asyncEventEmitter(), exports);
    var internal_1 = require_internal();
    Object.defineProperty(exports, "arrayContainsArray", { enumerable: true, get: function() {
      return internal_1.arrayContainsArray;
    } });
    Object.defineProperty(exports, "fromAscii", { enumerable: true, get: function() {
      return internal_1.fromAscii;
    } });
    Object.defineProperty(exports, "fromUtf8", { enumerable: true, get: function() {
      return internal_1.fromUtf8;
    } });
    Object.defineProperty(exports, "getBinarySize", { enumerable: true, get: function() {
      return internal_1.getBinarySize;
    } });
    Object.defineProperty(exports, "getKeys", { enumerable: true, get: function() {
      return internal_1.getKeys;
    } });
    Object.defineProperty(exports, "isHexPrefixed", { enumerable: true, get: function() {
      return internal_1.isHexPrefixed;
    } });
    Object.defineProperty(exports, "isHexString", { enumerable: true, get: function() {
      return internal_1.isHexString;
    } });
    Object.defineProperty(exports, "padToEven", { enumerable: true, get: function() {
      return internal_1.padToEven;
    } });
    Object.defineProperty(exports, "stripHexPrefix", { enumerable: true, get: function() {
      return internal_1.stripHexPrefix;
    } });
    Object.defineProperty(exports, "toAscii", { enumerable: true, get: function() {
      return internal_1.toAscii;
    } });
    __exportStar(require_lock(), exports);
    __exportStar(require_provider(), exports);
  }
});

// node_modules/js-sha3/src/sha3.js
var require_sha32 = __commonJS({
  "node_modules/js-sha3/src/sha3.js"(exports, module) {
    (function() {
      "use strict";
      var INPUT_ERROR = "input is invalid type";
      var FINALIZE_ERROR = "finalize already called";
      var WINDOW = typeof window === "object";
      var root = WINDOW ? window : {};
      if (root.JS_SHA3_NO_WINDOW) {
        WINDOW = false;
      }
      var WEB_WORKER = !WINDOW && typeof self === "object";
      var NODE_JS = !root.JS_SHA3_NO_NODE_JS && typeof process === "object" && process.versions && process.versions.node;
      if (NODE_JS) {
        root = global;
      } else if (WEB_WORKER) {
        root = self;
      }
      var COMMON_JS = !root.JS_SHA3_NO_COMMON_JS && typeof module === "object" && module.exports;
      var AMD = typeof define === "function" && define.amd;
      var ARRAY_BUFFER = !root.JS_SHA3_NO_ARRAY_BUFFER && typeof ArrayBuffer !== "undefined";
      var HEX_CHARS = "0123456789abcdef".split("");
      var SHAKE_PADDING = [31, 7936, 2031616, 520093696];
      var CSHAKE_PADDING = [4, 1024, 262144, 67108864];
      var KECCAK_PADDING = [1, 256, 65536, 16777216];
      var PADDING = [6, 1536, 393216, 100663296];
      var SHIFT = [0, 8, 16, 24];
      var RC = [
        1,
        0,
        32898,
        0,
        32906,
        2147483648,
        2147516416,
        2147483648,
        32907,
        0,
        2147483649,
        0,
        2147516545,
        2147483648,
        32777,
        2147483648,
        138,
        0,
        136,
        0,
        2147516425,
        0,
        2147483658,
        0,
        2147516555,
        0,
        139,
        2147483648,
        32905,
        2147483648,
        32771,
        2147483648,
        32770,
        2147483648,
        128,
        2147483648,
        32778,
        0,
        2147483658,
        2147483648,
        2147516545,
        2147483648,
        32896,
        2147483648,
        2147483649,
        0,
        2147516424,
        2147483648
      ];
      var BITS = [224, 256, 384, 512];
      var SHAKE_BITS = [128, 256];
      var OUTPUT_TYPES = ["hex", "buffer", "arrayBuffer", "array", "digest"];
      var CSHAKE_BYTEPAD = {
        "128": 168,
        "256": 136
      };
      if (root.JS_SHA3_NO_NODE_JS || !Array.isArray) {
        Array.isArray = function(obj) {
          return Object.prototype.toString.call(obj) === "[object Array]";
        };
      }
      if (ARRAY_BUFFER && (root.JS_SHA3_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView)) {
        ArrayBuffer.isView = function(obj) {
          return typeof obj === "object" && obj.buffer && obj.buffer.constructor === ArrayBuffer;
        };
      }
      var createOutputMethod = function(bits2, padding, outputType) {
        return function(message) {
          return new Keccak2(bits2, padding, bits2).update(message)[outputType]();
        };
      };
      var createShakeOutputMethod = function(bits2, padding, outputType) {
        return function(message, outputBits) {
          return new Keccak2(bits2, padding, outputBits).update(message)[outputType]();
        };
      };
      var createCshakeOutputMethod = function(bits2, padding, outputType) {
        return function(message, outputBits, n, s) {
          return methods["cshake" + bits2].update(message, outputBits, n, s)[outputType]();
        };
      };
      var createKmacOutputMethod = function(bits2, padding, outputType) {
        return function(key, message, outputBits, s) {
          return methods["kmac" + bits2].update(key, message, outputBits, s)[outputType]();
        };
      };
      var createOutputMethods = function(method, createMethod2, bits2, padding) {
        for (var i2 = 0; i2 < OUTPUT_TYPES.length; ++i2) {
          var type = OUTPUT_TYPES[i2];
          method[type] = createMethod2(bits2, padding, type);
        }
        return method;
      };
      var createMethod = function(bits2, padding) {
        var method = createOutputMethod(bits2, padding, "hex");
        method.create = function() {
          return new Keccak2(bits2, padding, bits2);
        };
        method.update = function(message) {
          return method.create().update(message);
        };
        return createOutputMethods(method, createOutputMethod, bits2, padding);
      };
      var createShakeMethod = function(bits2, padding) {
        var method = createShakeOutputMethod(bits2, padding, "hex");
        method.create = function(outputBits) {
          return new Keccak2(bits2, padding, outputBits);
        };
        method.update = function(message, outputBits) {
          return method.create(outputBits).update(message);
        };
        return createOutputMethods(method, createShakeOutputMethod, bits2, padding);
      };
      var createCshakeMethod = function(bits2, padding) {
        var w = CSHAKE_BYTEPAD[bits2];
        var method = createCshakeOutputMethod(bits2, padding, "hex");
        method.create = function(outputBits, n, s) {
          if (!n && !s) {
            return methods["shake" + bits2].create(outputBits);
          } else {
            return new Keccak2(bits2, padding, outputBits).bytepad([n, s], w);
          }
        };
        method.update = function(message, outputBits, n, s) {
          return method.create(outputBits, n, s).update(message);
        };
        return createOutputMethods(method, createCshakeOutputMethod, bits2, padding);
      };
      var createKmacMethod = function(bits2, padding) {
        var w = CSHAKE_BYTEPAD[bits2];
        var method = createKmacOutputMethod(bits2, padding, "hex");
        method.create = function(key, outputBits, s) {
          return new Kmac(bits2, padding, outputBits).bytepad(["KMAC", s], w).bytepad([key], w);
        };
        method.update = function(key, message, outputBits, s) {
          return method.create(key, outputBits, s).update(message);
        };
        return createOutputMethods(method, createKmacOutputMethod, bits2, padding);
      };
      var algorithms = [
        { name: "keccak", padding: KECCAK_PADDING, bits: BITS, createMethod },
        { name: "sha3", padding: PADDING, bits: BITS, createMethod },
        { name: "shake", padding: SHAKE_PADDING, bits: SHAKE_BITS, createMethod: createShakeMethod },
        { name: "cshake", padding: CSHAKE_PADDING, bits: SHAKE_BITS, createMethod: createCshakeMethod },
        { name: "kmac", padding: CSHAKE_PADDING, bits: SHAKE_BITS, createMethod: createKmacMethod }
      ];
      var methods = {}, methodNames = [];
      for (var i = 0; i < algorithms.length; ++i) {
        var algorithm = algorithms[i];
        var bits = algorithm.bits;
        for (var j = 0; j < bits.length; ++j) {
          var methodName = algorithm.name + "_" + bits[j];
          methodNames.push(methodName);
          methods[methodName] = algorithm.createMethod(bits[j], algorithm.padding);
          if (algorithm.name !== "sha3") {
            var newMethodName = algorithm.name + bits[j];
            methodNames.push(newMethodName);
            methods[newMethodName] = methods[methodName];
          }
        }
      }
      function Keccak2(bits2, padding, outputBits) {
        this.blocks = [];
        this.s = [];
        this.padding = padding;
        this.outputBits = outputBits;
        this.reset = true;
        this.finalized = false;
        this.block = 0;
        this.start = 0;
        this.blockCount = 1600 - (bits2 << 1) >> 5;
        this.byteCount = this.blockCount << 2;
        this.outputBlocks = outputBits >> 5;
        this.extraBytes = (outputBits & 31) >> 3;
        for (var i2 = 0; i2 < 50; ++i2) {
          this.s[i2] = 0;
        }
      }
      Keccak2.prototype.update = function(message) {
        if (this.finalized) {
          throw new Error(FINALIZE_ERROR);
        }
        var notString, type = typeof message;
        if (type !== "string") {
          if (type === "object") {
            if (message === null) {
              throw new Error(INPUT_ERROR);
            } else if (ARRAY_BUFFER && message.constructor === ArrayBuffer) {
              message = new Uint8Array(message);
            } else if (!Array.isArray(message)) {
              if (!ARRAY_BUFFER || !ArrayBuffer.isView(message)) {
                throw new Error(INPUT_ERROR);
              }
            }
          } else {
            throw new Error(INPUT_ERROR);
          }
          notString = true;
        }
        var blocks = this.blocks, byteCount = this.byteCount, length = message.length, blockCount = this.blockCount, index = 0, s = this.s, i2, code;
        while (index < length) {
          if (this.reset) {
            this.reset = false;
            blocks[0] = this.block;
            for (i2 = 1; i2 < blockCount + 1; ++i2) {
              blocks[i2] = 0;
            }
          }
          if (notString) {
            for (i2 = this.start; index < length && i2 < byteCount; ++index) {
              blocks[i2 >> 2] |= message[index] << SHIFT[i2++ & 3];
            }
          } else {
            for (i2 = this.start; index < length && i2 < byteCount; ++index) {
              code = message.charCodeAt(index);
              if (code < 128) {
                blocks[i2 >> 2] |= code << SHIFT[i2++ & 3];
              } else if (code < 2048) {
                blocks[i2 >> 2] |= (192 | code >> 6) << SHIFT[i2++ & 3];
                blocks[i2 >> 2] |= (128 | code & 63) << SHIFT[i2++ & 3];
              } else if (code < 55296 || code >= 57344) {
                blocks[i2 >> 2] |= (224 | code >> 12) << SHIFT[i2++ & 3];
                blocks[i2 >> 2] |= (128 | code >> 6 & 63) << SHIFT[i2++ & 3];
                blocks[i2 >> 2] |= (128 | code & 63) << SHIFT[i2++ & 3];
              } else {
                code = 65536 + ((code & 1023) << 10 | message.charCodeAt(++index) & 1023);
                blocks[i2 >> 2] |= (240 | code >> 18) << SHIFT[i2++ & 3];
                blocks[i2 >> 2] |= (128 | code >> 12 & 63) << SHIFT[i2++ & 3];
                blocks[i2 >> 2] |= (128 | code >> 6 & 63) << SHIFT[i2++ & 3];
                blocks[i2 >> 2] |= (128 | code & 63) << SHIFT[i2++ & 3];
              }
            }
          }
          this.lastByteIndex = i2;
          if (i2 >= byteCount) {
            this.start = i2 - byteCount;
            this.block = blocks[blockCount];
            for (i2 = 0; i2 < blockCount; ++i2) {
              s[i2] ^= blocks[i2];
            }
            f(s);
            this.reset = true;
          } else {
            this.start = i2;
          }
        }
        return this;
      };
      Keccak2.prototype.encode = function(x, right) {
        var o = x & 255, n = 1;
        var bytes2 = [o];
        x = x >> 8;
        o = x & 255;
        while (o > 0) {
          bytes2.unshift(o);
          x = x >> 8;
          o = x & 255;
          ++n;
        }
        if (right) {
          bytes2.push(n);
        } else {
          bytes2.unshift(n);
        }
        this.update(bytes2);
        return bytes2.length;
      };
      Keccak2.prototype.encodeString = function(str) {
        var notString, type = typeof str;
        if (type !== "string") {
          if (type === "object") {
            if (str === null) {
              throw new Error(INPUT_ERROR);
            } else if (ARRAY_BUFFER && str.constructor === ArrayBuffer) {
              str = new Uint8Array(str);
            } else if (!Array.isArray(str)) {
              if (!ARRAY_BUFFER || !ArrayBuffer.isView(str)) {
                throw new Error(INPUT_ERROR);
              }
            }
          } else {
            throw new Error(INPUT_ERROR);
          }
          notString = true;
        }
        var bytes2 = 0, length = str.length;
        if (notString) {
          bytes2 = length;
        } else {
          for (var i2 = 0; i2 < str.length; ++i2) {
            var code = str.charCodeAt(i2);
            if (code < 128) {
              bytes2 += 1;
            } else if (code < 2048) {
              bytes2 += 2;
            } else if (code < 55296 || code >= 57344) {
              bytes2 += 3;
            } else {
              code = 65536 + ((code & 1023) << 10 | str.charCodeAt(++i2) & 1023);
              bytes2 += 4;
            }
          }
        }
        bytes2 += this.encode(bytes2 * 8);
        this.update(str);
        return bytes2;
      };
      Keccak2.prototype.bytepad = function(strs, w) {
        var bytes2 = this.encode(w);
        for (var i2 = 0; i2 < strs.length; ++i2) {
          bytes2 += this.encodeString(strs[i2]);
        }
        var paddingBytes = w - bytes2 % w;
        var zeros = [];
        zeros.length = paddingBytes;
        this.update(zeros);
        return this;
      };
      Keccak2.prototype.finalize = function() {
        if (this.finalized) {
          return;
        }
        this.finalized = true;
        var blocks = this.blocks, i2 = this.lastByteIndex, blockCount = this.blockCount, s = this.s;
        blocks[i2 >> 2] |= this.padding[i2 & 3];
        if (this.lastByteIndex === this.byteCount) {
          blocks[0] = blocks[blockCount];
          for (i2 = 1; i2 < blockCount + 1; ++i2) {
            blocks[i2] = 0;
          }
        }
        blocks[blockCount - 1] |= 2147483648;
        for (i2 = 0; i2 < blockCount; ++i2) {
          s[i2] ^= blocks[i2];
        }
        f(s);
      };
      Keccak2.prototype.toString = Keccak2.prototype.hex = function() {
        this.finalize();
        var blockCount = this.blockCount, s = this.s, outputBlocks = this.outputBlocks, extraBytes = this.extraBytes, i2 = 0, j2 = 0;
        var hex = "", block;
        while (j2 < outputBlocks) {
          for (i2 = 0; i2 < blockCount && j2 < outputBlocks; ++i2, ++j2) {
            block = s[i2];
            hex += HEX_CHARS[block >> 4 & 15] + HEX_CHARS[block & 15] + HEX_CHARS[block >> 12 & 15] + HEX_CHARS[block >> 8 & 15] + HEX_CHARS[block >> 20 & 15] + HEX_CHARS[block >> 16 & 15] + HEX_CHARS[block >> 28 & 15] + HEX_CHARS[block >> 24 & 15];
          }
          if (j2 % blockCount === 0) {
            f(s);
            i2 = 0;
          }
        }
        if (extraBytes) {
          block = s[i2];
          hex += HEX_CHARS[block >> 4 & 15] + HEX_CHARS[block & 15];
          if (extraBytes > 1) {
            hex += HEX_CHARS[block >> 12 & 15] + HEX_CHARS[block >> 8 & 15];
          }
          if (extraBytes > 2) {
            hex += HEX_CHARS[block >> 20 & 15] + HEX_CHARS[block >> 16 & 15];
          }
        }
        return hex;
      };
      Keccak2.prototype.arrayBuffer = function() {
        this.finalize();
        var blockCount = this.blockCount, s = this.s, outputBlocks = this.outputBlocks, extraBytes = this.extraBytes, i2 = 0, j2 = 0;
        var bytes2 = this.outputBits >> 3;
        var buffer;
        if (extraBytes) {
          buffer = new ArrayBuffer(outputBlocks + 1 << 2);
        } else {
          buffer = new ArrayBuffer(bytes2);
        }
        var array = new Uint32Array(buffer);
        while (j2 < outputBlocks) {
          for (i2 = 0; i2 < blockCount && j2 < outputBlocks; ++i2, ++j2) {
            array[j2] = s[i2];
          }
          if (j2 % blockCount === 0) {
            f(s);
          }
        }
        if (extraBytes) {
          array[i2] = s[i2];
          buffer = buffer.slice(0, bytes2);
        }
        return buffer;
      };
      Keccak2.prototype.buffer = Keccak2.prototype.arrayBuffer;
      Keccak2.prototype.digest = Keccak2.prototype.array = function() {
        this.finalize();
        var blockCount = this.blockCount, s = this.s, outputBlocks = this.outputBlocks, extraBytes = this.extraBytes, i2 = 0, j2 = 0;
        var array = [], offset, block;
        while (j2 < outputBlocks) {
          for (i2 = 0; i2 < blockCount && j2 < outputBlocks; ++i2, ++j2) {
            offset = j2 << 2;
            block = s[i2];
            array[offset] = block & 255;
            array[offset + 1] = block >> 8 & 255;
            array[offset + 2] = block >> 16 & 255;
            array[offset + 3] = block >> 24 & 255;
          }
          if (j2 % blockCount === 0) {
            f(s);
          }
        }
        if (extraBytes) {
          offset = j2 << 2;
          block = s[i2];
          array[offset] = block & 255;
          if (extraBytes > 1) {
            array[offset + 1] = block >> 8 & 255;
          }
          if (extraBytes > 2) {
            array[offset + 2] = block >> 16 & 255;
          }
        }
        return array;
      };
      function Kmac(bits2, padding, outputBits) {
        Keccak2.call(this, bits2, padding, outputBits);
      }
      Kmac.prototype = new Keccak2();
      Kmac.prototype.finalize = function() {
        this.encode(this.outputBits, true);
        return Keccak2.prototype.finalize.call(this);
      };
      var f = function(s) {
        var h, l, n, c0, c1, c2, c3, c4, c5, c6, c7, c8, c9, b0, b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14, b15, b16, b17, b18, b19, b20, b21, b22, b23, b24, b25, b26, b27, b28, b29, b30, b31, b32, b33, b34, b35, b36, b37, b38, b39, b40, b41, b42, b43, b44, b45, b46, b47, b48, b49;
        for (n = 0; n < 48; n += 2) {
          c0 = s[0] ^ s[10] ^ s[20] ^ s[30] ^ s[40];
          c1 = s[1] ^ s[11] ^ s[21] ^ s[31] ^ s[41];
          c2 = s[2] ^ s[12] ^ s[22] ^ s[32] ^ s[42];
          c3 = s[3] ^ s[13] ^ s[23] ^ s[33] ^ s[43];
          c4 = s[4] ^ s[14] ^ s[24] ^ s[34] ^ s[44];
          c5 = s[5] ^ s[15] ^ s[25] ^ s[35] ^ s[45];
          c6 = s[6] ^ s[16] ^ s[26] ^ s[36] ^ s[46];
          c7 = s[7] ^ s[17] ^ s[27] ^ s[37] ^ s[47];
          c8 = s[8] ^ s[18] ^ s[28] ^ s[38] ^ s[48];
          c9 = s[9] ^ s[19] ^ s[29] ^ s[39] ^ s[49];
          h = c8 ^ (c2 << 1 | c3 >>> 31);
          l = c9 ^ (c3 << 1 | c2 >>> 31);
          s[0] ^= h;
          s[1] ^= l;
          s[10] ^= h;
          s[11] ^= l;
          s[20] ^= h;
          s[21] ^= l;
          s[30] ^= h;
          s[31] ^= l;
          s[40] ^= h;
          s[41] ^= l;
          h = c0 ^ (c4 << 1 | c5 >>> 31);
          l = c1 ^ (c5 << 1 | c4 >>> 31);
          s[2] ^= h;
          s[3] ^= l;
          s[12] ^= h;
          s[13] ^= l;
          s[22] ^= h;
          s[23] ^= l;
          s[32] ^= h;
          s[33] ^= l;
          s[42] ^= h;
          s[43] ^= l;
          h = c2 ^ (c6 << 1 | c7 >>> 31);
          l = c3 ^ (c7 << 1 | c6 >>> 31);
          s[4] ^= h;
          s[5] ^= l;
          s[14] ^= h;
          s[15] ^= l;
          s[24] ^= h;
          s[25] ^= l;
          s[34] ^= h;
          s[35] ^= l;
          s[44] ^= h;
          s[45] ^= l;
          h = c4 ^ (c8 << 1 | c9 >>> 31);
          l = c5 ^ (c9 << 1 | c8 >>> 31);
          s[6] ^= h;
          s[7] ^= l;
          s[16] ^= h;
          s[17] ^= l;
          s[26] ^= h;
          s[27] ^= l;
          s[36] ^= h;
          s[37] ^= l;
          s[46] ^= h;
          s[47] ^= l;
          h = c6 ^ (c0 << 1 | c1 >>> 31);
          l = c7 ^ (c1 << 1 | c0 >>> 31);
          s[8] ^= h;
          s[9] ^= l;
          s[18] ^= h;
          s[19] ^= l;
          s[28] ^= h;
          s[29] ^= l;
          s[38] ^= h;
          s[39] ^= l;
          s[48] ^= h;
          s[49] ^= l;
          b0 = s[0];
          b1 = s[1];
          b32 = s[11] << 4 | s[10] >>> 28;
          b33 = s[10] << 4 | s[11] >>> 28;
          b14 = s[20] << 3 | s[21] >>> 29;
          b15 = s[21] << 3 | s[20] >>> 29;
          b46 = s[31] << 9 | s[30] >>> 23;
          b47 = s[30] << 9 | s[31] >>> 23;
          b28 = s[40] << 18 | s[41] >>> 14;
          b29 = s[41] << 18 | s[40] >>> 14;
          b20 = s[2] << 1 | s[3] >>> 31;
          b21 = s[3] << 1 | s[2] >>> 31;
          b2 = s[13] << 12 | s[12] >>> 20;
          b3 = s[12] << 12 | s[13] >>> 20;
          b34 = s[22] << 10 | s[23] >>> 22;
          b35 = s[23] << 10 | s[22] >>> 22;
          b16 = s[33] << 13 | s[32] >>> 19;
          b17 = s[32] << 13 | s[33] >>> 19;
          b48 = s[42] << 2 | s[43] >>> 30;
          b49 = s[43] << 2 | s[42] >>> 30;
          b40 = s[5] << 30 | s[4] >>> 2;
          b41 = s[4] << 30 | s[5] >>> 2;
          b22 = s[14] << 6 | s[15] >>> 26;
          b23 = s[15] << 6 | s[14] >>> 26;
          b4 = s[25] << 11 | s[24] >>> 21;
          b5 = s[24] << 11 | s[25] >>> 21;
          b36 = s[34] << 15 | s[35] >>> 17;
          b37 = s[35] << 15 | s[34] >>> 17;
          b18 = s[45] << 29 | s[44] >>> 3;
          b19 = s[44] << 29 | s[45] >>> 3;
          b10 = s[6] << 28 | s[7] >>> 4;
          b11 = s[7] << 28 | s[6] >>> 4;
          b42 = s[17] << 23 | s[16] >>> 9;
          b43 = s[16] << 23 | s[17] >>> 9;
          b24 = s[26] << 25 | s[27] >>> 7;
          b25 = s[27] << 25 | s[26] >>> 7;
          b6 = s[36] << 21 | s[37] >>> 11;
          b7 = s[37] << 21 | s[36] >>> 11;
          b38 = s[47] << 24 | s[46] >>> 8;
          b39 = s[46] << 24 | s[47] >>> 8;
          b30 = s[8] << 27 | s[9] >>> 5;
          b31 = s[9] << 27 | s[8] >>> 5;
          b12 = s[18] << 20 | s[19] >>> 12;
          b13 = s[19] << 20 | s[18] >>> 12;
          b44 = s[29] << 7 | s[28] >>> 25;
          b45 = s[28] << 7 | s[29] >>> 25;
          b26 = s[38] << 8 | s[39] >>> 24;
          b27 = s[39] << 8 | s[38] >>> 24;
          b8 = s[48] << 14 | s[49] >>> 18;
          b9 = s[49] << 14 | s[48] >>> 18;
          s[0] = b0 ^ ~b2 & b4;
          s[1] = b1 ^ ~b3 & b5;
          s[10] = b10 ^ ~b12 & b14;
          s[11] = b11 ^ ~b13 & b15;
          s[20] = b20 ^ ~b22 & b24;
          s[21] = b21 ^ ~b23 & b25;
          s[30] = b30 ^ ~b32 & b34;
          s[31] = b31 ^ ~b33 & b35;
          s[40] = b40 ^ ~b42 & b44;
          s[41] = b41 ^ ~b43 & b45;
          s[2] = b2 ^ ~b4 & b6;
          s[3] = b3 ^ ~b5 & b7;
          s[12] = b12 ^ ~b14 & b16;
          s[13] = b13 ^ ~b15 & b17;
          s[22] = b22 ^ ~b24 & b26;
          s[23] = b23 ^ ~b25 & b27;
          s[32] = b32 ^ ~b34 & b36;
          s[33] = b33 ^ ~b35 & b37;
          s[42] = b42 ^ ~b44 & b46;
          s[43] = b43 ^ ~b45 & b47;
          s[4] = b4 ^ ~b6 & b8;
          s[5] = b5 ^ ~b7 & b9;
          s[14] = b14 ^ ~b16 & b18;
          s[15] = b15 ^ ~b17 & b19;
          s[24] = b24 ^ ~b26 & b28;
          s[25] = b25 ^ ~b27 & b29;
          s[34] = b34 ^ ~b36 & b38;
          s[35] = b35 ^ ~b37 & b39;
          s[44] = b44 ^ ~b46 & b48;
          s[45] = b45 ^ ~b47 & b49;
          s[6] = b6 ^ ~b8 & b0;
          s[7] = b7 ^ ~b9 & b1;
          s[16] = b16 ^ ~b18 & b10;
          s[17] = b17 ^ ~b19 & b11;
          s[26] = b26 ^ ~b28 & b20;
          s[27] = b27 ^ ~b29 & b21;
          s[36] = b36 ^ ~b38 & b30;
          s[37] = b37 ^ ~b39 & b31;
          s[46] = b46 ^ ~b48 & b40;
          s[47] = b47 ^ ~b49 & b41;
          s[8] = b8 ^ ~b0 & b2;
          s[9] = b9 ^ ~b1 & b3;
          s[18] = b18 ^ ~b10 & b12;
          s[19] = b19 ^ ~b11 & b13;
          s[28] = b28 ^ ~b20 & b22;
          s[29] = b29 ^ ~b21 & b23;
          s[38] = b38 ^ ~b30 & b32;
          s[39] = b39 ^ ~b31 & b33;
          s[48] = b48 ^ ~b40 & b42;
          s[49] = b49 ^ ~b41 & b43;
          s[0] ^= RC[n];
          s[1] ^= RC[n + 1];
        }
      };
      if (COMMON_JS) {
        module.exports = methods;
      } else {
        for (i = 0; i < methodNames.length; ++i) {
          root[methodNames[i]] = methods[methodNames[i]];
        }
        if (AMD) {
          define(function() {
            return methods;
          });
        }
      }
    })();
  }
});

// node_modules/ethereum-bloom-filters/dist/utils.js
var require_utils4 = __commonJS({
  "node_modules/ethereum-bloom-filters/dist/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var sha32 = require_sha32();
    function keccak2563(data) {
      return "0x" + sha32.keccak_256(toByteArray(data));
    }
    exports.keccak256 = keccak2563;
    exports.padLeft = (value, chars) => {
      const hasPrefix = /^0x/i.test(value) || typeof value === "number";
      value = value.toString().replace(/^0x/i, "");
      const padding = chars - value.length + 1 >= 0 ? chars - value.length + 1 : 0;
      return (hasPrefix ? "0x" : "") + new Array(padding).join("0") + value;
    };
    function bytesToHex2(bytes2) {
      const hex = [];
      for (let i = 0; i < bytes2.length; i++) {
        hex.push((bytes2[i] >>> 4).toString(16));
        hex.push((bytes2[i] & 15).toString(16));
      }
      return `0x${hex.join("").replace(/^0+/, "")}`;
    }
    exports.bytesToHex = bytesToHex2;
    function toByteArray(value) {
      if (value == null) {
        throw new Error("cannot convert null value to array");
      }
      if (typeof value === "string") {
        const match = value.match(/^(0x)?[0-9a-fA-F]*$/);
        if (!match) {
          throw new Error("invalid hexidecimal string");
        }
        if (match[1] !== "0x") {
          throw new Error("hex string must have 0x prefix");
        }
        value = value.substring(2);
        if (value.length % 2) {
          value = "0" + value;
        }
        const result = [];
        for (let i = 0; i < value.length; i += 2) {
          result.push(parseInt(value.substr(i, 2), 16));
        }
        return addSlice2(new Uint8Array(result));
      }
      if (isByteArray(value)) {
        return addSlice2(new Uint8Array(value));
      }
      throw new Error("invalid arrayify value");
    }
    exports.toByteArray = toByteArray;
    function isByteArray(value) {
      if (!value || // tslint:disable-next-line: radix
      parseInt(String(value.length)) != value.length || typeof value === "string") {
        return false;
      }
      for (let i = 0; i < value.length; i++) {
        const v = value[i];
        if (v < 0 || v >= 256 || parseInt(String(v)) != v) {
          return false;
        }
      }
      return true;
    }
    function addSlice2(array) {
      if (array.slice !== void 0) {
        return array;
      }
      array.slice = () => {
        const args = Array.prototype.slice.call(arguments);
        return addSlice2(new Uint8Array(Array.prototype.slice.apply(array, args)));
      };
      return array;
    }
  }
});

// node_modules/ethereum-bloom-filters/dist/index.js
var require_dist3 = __commonJS({
  "node_modules/ethereum-bloom-filters/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils_1 = require_utils4();
    function isBloom(bloom) {
      if (typeof bloom !== "string") {
        return false;
      }
      if (!/^(0x)?[0-9a-f]{512}$/i.test(bloom)) {
        return false;
      }
      if (/^(0x)?[0-9a-f]{512}$/.test(bloom) || /^(0x)?[0-9A-F]{512}$/.test(bloom)) {
        return true;
      }
      return false;
    }
    exports.isBloom = isBloom;
    function isInBloom(bloom, value) {
      if (typeof value === "object" && value.constructor === Uint8Array) {
        value = utils_1.bytesToHex(value);
      }
      const hash2 = utils_1.keccak256(value).replace("0x", "");
      for (let i = 0; i < 12; i += 4) {
        const bitpos = (parseInt(hash2.substr(i, 2), 16) << 8) + parseInt(hash2.substr(i + 2, 2), 16) & 2047;
        const code = codePointToInt(bloom.charCodeAt(bloom.length - 1 - Math.floor(bitpos / 4)));
        const offset = 1 << bitpos % 4;
        if ((code & offset) !== offset) {
          return false;
        }
      }
      return true;
    }
    exports.isInBloom = isInBloom;
    function codePointToInt(codePoint) {
      if (codePoint >= 48 && codePoint <= 57) {
        return codePoint - 48;
      }
      if (codePoint >= 65 && codePoint <= 70) {
        return codePoint - 55;
      }
      if (codePoint >= 97 && codePoint <= 102) {
        return codePoint - 87;
      }
      throw new Error("invalid bloom");
    }
    function isUserEthereumAddressInBloom(bloom, ethereumAddress) {
      if (!isBloom(bloom)) {
        throw new Error("Invalid bloom given");
      }
      if (!isAddress(ethereumAddress)) {
        throw new Error(`Invalid ethereum address given: "${ethereumAddress}"`);
      }
      const address = utils_1.padLeft(ethereumAddress, 64);
      return isInBloom(bloom, address);
    }
    exports.isUserEthereumAddressInBloom = isUserEthereumAddressInBloom;
    function isContractAddressInBloom(bloom, contractAddress) {
      if (!isBloom(bloom)) {
        throw new Error("Invalid bloom given");
      }
      if (!isAddress(contractAddress)) {
        throw new Error(`Invalid contract address given: "${contractAddress}"`);
      }
      return isInBloom(bloom, contractAddress);
    }
    exports.isContractAddressInBloom = isContractAddressInBloom;
    function isTopicInBloom(bloom, topic) {
      if (!isBloom(bloom)) {
        throw new Error("Invalid bloom given");
      }
      if (!isTopic(topic)) {
        throw new Error("Invalid topic");
      }
      return isInBloom(bloom, topic);
    }
    exports.isTopicInBloom = isTopicInBloom;
    function isTopic(topic) {
      if (typeof topic !== "string") {
        return false;
      }
      if (!/^(0x)?[0-9a-f]{64}$/i.test(topic)) {
        return false;
      } else if (/^(0x)?[0-9a-f]{64}$/.test(topic) || /^(0x)?[0-9A-F]{64}$/.test(topic)) {
        return true;
      }
      return false;
    }
    exports.isTopic = isTopic;
    function isAddress(address) {
      if (typeof address !== "string") {
        return false;
      }
      if (address.match(/^(0x)?[0-9a-fA-F]{40}$/)) {
        return true;
      }
      if (address.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/)) {
        return true;
      }
      return false;
    }
    exports.isAddress = isAddress;
  }
});

// node_modules/web3-utils/lib/utils.js
var require_utils5 = __commonJS({
  "node_modules/web3-utils/lib/utils.js"(exports, module) {
    var BN2 = require_bn3();
    var numberToBN = require_src3();
    var utf8 = require_utf8();
    var ethereumjsUtil = require_dist2();
    var ethereumBloomFilters = require_dist3();
    var { keccak256: keccak2563 } = require_keccak();
    var isBN = function(object) {
      return BN2.isBN(object);
    };
    var isBigNumber = function(object) {
      return object && object.constructor && object.constructor.name === "BigNumber";
    };
    var toBN2 = function(number2) {
      try {
        return numberToBN.apply(null, arguments);
      } catch (e) {
        throw new Error(e + ' Given value: "' + number2 + '"');
      }
    };
    var toTwosComplement = function(number2) {
      return "0x" + toBN2(number2).toTwos(256).toString(16, 64);
    };
    var isAddress = function(address) {
      if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
        return false;
      } else if (/^(0x|0X)?[0-9a-f]{40}$/.test(address) || /^(0x|0X)?[0-9A-F]{40}$/.test(address)) {
        return true;
      } else {
        return checkAddressChecksum(address);
      }
    };
    var checkAddressChecksum = function(address) {
      address = address.replace(/^0x/i, "");
      var addressHash = sha32(address.toLowerCase()).replace(/^0x/i, "");
      for (var i = 0; i < 40; i++) {
        if (parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i] || parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i]) {
          return false;
        }
      }
      return true;
    };
    var leftPad = function(string, chars, sign2) {
      var hasPrefix = /^0x/i.test(string) || typeof string === "number";
      string = string.toString(16).replace(/^0x/i, "");
      var padding = chars - string.length + 1 >= 0 ? chars - string.length + 1 : 0;
      return (hasPrefix ? "0x" : "") + new Array(padding).join(sign2 ? sign2 : "0") + string;
    };
    var rightPad = function(string, chars, sign2) {
      var hasPrefix = /^0x/i.test(string) || typeof string === "number";
      string = string.toString(16).replace(/^0x/i, "");
      var padding = chars - string.length + 1 >= 0 ? chars - string.length + 1 : 0;
      return (hasPrefix ? "0x" : "") + string + new Array(padding).join(sign2 ? sign2 : "0");
    };
    var utf8ToHex = function(str) {
      str = utf8.encode(str);
      var hex = "";
      str = str.replace(/^(?:\u0000)*/, "");
      str = str.split("").reverse().join("");
      str = str.replace(/^(?:\u0000)*/, "");
      str = str.split("").reverse().join("");
      for (var i = 0; i < str.length; i++) {
        var code = str.charCodeAt(i);
        var n = code.toString(16);
        hex += n.length < 2 ? "0" + n : n;
      }
      return "0x" + hex;
    };
    var hexToUtf8 = function(hex) {
      if (!isHexStrict(hex))
        throw new Error('The parameter "' + hex + '" must be a valid HEX string.');
      var str = "";
      var code = 0;
      hex = hex.replace(/^0x/i, "");
      hex = hex.replace(/^(?:00)*/, "");
      hex = hex.split("").reverse().join("");
      hex = hex.replace(/^(?:00)*/, "");
      hex = hex.split("").reverse().join("");
      var l = hex.length;
      for (var i = 0; i < l; i += 2) {
        code = parseInt(hex.slice(i, i + 2), 16);
        str += String.fromCharCode(code);
      }
      return utf8.decode(str);
    };
    var hexToNumber = function(value, bigIntOnOverflow = false) {
      if (!value) {
        return value;
      }
      if (typeof value === "string" && !isHexStrict(value)) {
        throw new Error('Given value "' + value + '" is not a valid hex string.');
      }
      const n = toBN2(value);
      if (bigIntOnOverflow && (n > Number.MAX_SAFE_INTEGER || n < Number.MIN_SAFE_INTEGER)) {
        return BigInt(n);
      }
      return n.toNumber();
    };
    var hexToNumberString = function(value) {
      if (!value)
        return value;
      if (typeof value === "string" && !isHexStrict(value)) {
        throw new Error('Given value "' + value + '" is not a valid hex string.');
      }
      return toBN2(value).toString(10);
    };
    var numberToHex = function(value) {
      if (value === null || value === void 0) {
        return value;
      }
      if (!isFinite(value) && !isHexStrict(value)) {
        throw new Error('Given input "' + value + '" is not a number.');
      }
      var number2 = toBN2(value);
      var result = number2.toString(16);
      return number2.lt(new BN2(0)) ? "-0x" + result.slice(1) : "0x" + result;
    };
    var bytesToHex2 = function(bytes2) {
      for (var hex = [], i = 0; i < bytes2.length; i++) {
        hex.push((bytes2[i] >>> 4).toString(16));
        hex.push((bytes2[i] & 15).toString(16));
      }
      return "0x" + hex.join("");
    };
    var hexToBytes = function(hex) {
      hex = hex.toString(16);
      if (!isHexStrict(hex)) {
        throw new Error('Given value "' + hex + '" is not a valid hex string.');
      }
      hex = hex.replace(/^0x/i, "");
      for (var bytes2 = [], c = 0; c < hex.length; c += 2)
        bytes2.push(parseInt(hex.slice(c, c + 2), 16));
      return bytes2;
    };
    var toHex2 = function(value, returnType) {
      if (isAddress(value)) {
        return returnType ? "address" : "0x" + value.toLowerCase().replace(/^0x/i, "");
      }
      if (typeof value === "boolean") {
        return returnType ? "bool" : value ? "0x01" : "0x00";
      }
      if (Buffer.isBuffer(value)) {
        return "0x" + value.toString("hex");
      }
      if (typeof value === "object" && !!value && !isBigNumber(value) && !isBN(value)) {
        return returnType ? "string" : utf8ToHex(JSON.stringify(value));
      }
      if (typeof value === "string") {
        if (value.indexOf("-0x") === 0 || value.indexOf("-0X") === 0) {
          return returnType ? "int256" : numberToHex(value);
        } else if (value.indexOf("0x") === 0 || value.indexOf("0X") === 0) {
          return returnType ? "bytes" : value;
        } else if (!isFinite(value)) {
          return returnType ? "string" : utf8ToHex(value);
        }
      }
      return returnType ? value < 0 ? "int256" : "uint256" : numberToHex(value);
    };
    var isHexStrict = function(hex) {
      return (typeof hex === "string" || typeof hex === "number") && /^(-)?0x[0-9a-f]*$/i.test(hex);
    };
    var isHex = function(hex) {
      return (typeof hex === "string" || typeof hex === "number") && /^(-0x|0x)?[0-9a-f]*$/i.test(hex);
    };
    var stripHexPrefix = function(str) {
      if (str !== 0 && isHex(str))
        return str.replace(/^(-)?0x/i, "$1");
      return str;
    };
    var isBloom = function(bloom) {
      return ethereumBloomFilters.isBloom(bloom);
    };
    var isUserEthereumAddressInBloom = function(bloom, ethereumAddress) {
      return ethereumBloomFilters.isUserEthereumAddressInBloom(bloom, ethereumAddress);
    };
    var isContractAddressInBloom = function(bloom, contractAddress) {
      return ethereumBloomFilters.isContractAddressInBloom(bloom, contractAddress);
    };
    var isTopic = function(topic) {
      return ethereumBloomFilters.isTopic(topic);
    };
    var isTopicInBloom = function(bloom, topic) {
      return ethereumBloomFilters.isTopicInBloom(bloom, topic);
    };
    var isInBloom = function(bloom, topic) {
      return ethereumBloomFilters.isInBloom(bloom, topic);
    };
    var SHA3_NULL_S = "0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470";
    var sha32 = function(value) {
      if (isBN(value)) {
        value = value.toString();
      }
      if (isHexStrict(value) && /^0x/i.test(value.toString())) {
        value = ethereumjsUtil.toBuffer(value);
      } else if (typeof value === "string") {
        value = Buffer.from(value, "utf-8");
      }
      var returnValue = ethereumjsUtil.bufferToHex(keccak2563(value));
      if (returnValue === SHA3_NULL_S) {
        return null;
      } else {
        return returnValue;
      }
    };
    sha32._Hash = keccak2563;
    var sha3Raw = function(value) {
      value = sha32(value);
      if (value === null) {
        return SHA3_NULL_S;
      }
      return value;
    };
    var toNumber = function(value, bigIntOnOverflow = false) {
      return typeof value === "number" ? value : hexToNumber(toHex2(value), bigIntOnOverflow);
    };
    var BNwrapped = function(value) {
      if (typeof value == "string" && value.includes("0x")) {
        const [negative, hexValue] = value.toLocaleLowerCase().startsWith("-") ? ["-", value.slice(3)] : ["", value.slice(2)];
        return new BN2(negative + hexValue, 16);
      } else {
        return new BN2(value);
      }
    };
    Object.setPrototypeOf(BNwrapped, BN2);
    Object.setPrototypeOf(BNwrapped.prototype, BN2.prototype);
    module.exports = {
      BN: BNwrapped,
      isBN,
      isBigNumber,
      toBN: toBN2,
      isAddress,
      isBloom,
      isUserEthereumAddressInBloom,
      isContractAddressInBloom,
      isTopic,
      isTopicInBloom,
      isInBloom,
      checkAddressChecksum,
      utf8ToHex,
      hexToUtf8,
      hexToNumber,
      hexToNumberString,
      numberToHex,
      toHex: toHex2,
      hexToBytes,
      bytesToHex: bytesToHex2,
      isHex,
      isHexStrict,
      stripHexPrefix,
      leftPad,
      rightPad,
      toTwosComplement,
      sha3: sha32,
      sha3Raw,
      toNumber
    };
  }
});

// node_modules/web3-utils/lib/soliditySha3.js
var require_soliditySha3 = __commonJS({
  "node_modules/web3-utils/lib/soliditySha3.js"(exports, module) {
    var BN2 = require_bn3();
    var utils = require_utils5();
    var _elementaryName = function(name) {
      if (name.startsWith("int[")) {
        return "int256" + name.slice(3);
      } else if (name === "int") {
        return "int256";
      } else if (name.startsWith("uint[")) {
        return "uint256" + name.slice(4);
      } else if (name === "uint") {
        return "uint256";
      } else if (name.startsWith("fixed[")) {
        return "fixed128x128" + name.slice(5);
      } else if (name === "fixed") {
        return "fixed128x128";
      } else if (name.startsWith("ufixed[")) {
        return "ufixed128x128" + name.slice(6);
      } else if (name === "ufixed") {
        return "ufixed128x128";
      }
      return name;
    };
    var _parseTypeN = function(type) {
      var typesize = /^\D+(\d+).*$/.exec(type);
      return typesize ? parseInt(typesize[1], 10) : null;
    };
    var _parseTypeNArray = function(type) {
      var arraySize = /^\D+\d*\[(\d+)\]$/.exec(type);
      return arraySize ? parseInt(arraySize[1], 10) : null;
    };
    var _parseNumber = function(arg) {
      var type = typeof arg;
      if (type === "string") {
        if (utils.isHexStrict(arg)) {
          return new BN2(arg.replace(/0x/i, ""), 16);
        } else {
          return new BN2(arg, 10);
        }
      } else if (type === "number") {
        return new BN2(arg);
      } else if (utils.isBigNumber(arg)) {
        return new BN2(arg.toString(10));
      } else if (utils.isBN(arg)) {
        return arg;
      } else {
        throw new Error(arg + " is not a number");
      }
    };
    var _solidityPack = function(type, value, arraySize) {
      var size, num;
      type = _elementaryName(type);
      if (type === "bytes") {
        if (value.replace(/^0x/i, "").length % 2 !== 0) {
          throw new Error("Invalid bytes characters " + value.length);
        }
        return value;
      } else if (type === "string") {
        return utils.utf8ToHex(value);
      } else if (type === "bool") {
        return value ? "01" : "00";
      } else if (type.startsWith("address")) {
        if (arraySize) {
          size = 64;
        } else {
          size = 40;
        }
        if (!utils.isAddress(value)) {
          throw new Error(value + " is not a valid address, or the checksum is invalid.");
        }
        return utils.leftPad(value.toLowerCase(), size);
      }
      size = _parseTypeN(type);
      if (type.startsWith("bytes")) {
        if (!size) {
          throw new Error("bytes[] not yet supported in solidity");
        }
        if (arraySize) {
          size = 32;
        }
        if (size < 1 || size > 32 || size < value.replace(/^0x/i, "").length / 2) {
          throw new Error("Invalid bytes" + size + " for " + value);
        }
        return utils.rightPad(value, size * 2);
      } else if (type.startsWith("uint")) {
        if (size % 8 || size < 8 || size > 256) {
          throw new Error("Invalid uint" + size + " size");
        }
        num = _parseNumber(value);
        if (num.bitLength() > size) {
          throw new Error("Supplied uint exceeds width: " + size + " vs " + num.bitLength());
        }
        if (num.lt(new BN2(0))) {
          throw new Error("Supplied uint " + num.toString() + " is negative");
        }
        return size ? utils.leftPad(num.toString("hex"), size / 8 * 2) : num;
      } else if (type.startsWith("int")) {
        if (size % 8 || size < 8 || size > 256) {
          throw new Error("Invalid int" + size + " size");
        }
        num = _parseNumber(value);
        if (num.bitLength() > size) {
          throw new Error("Supplied int exceeds width: " + size + " vs " + num.bitLength());
        }
        if (num.lt(new BN2(0))) {
          return num.toTwos(size).toString("hex");
        } else {
          return size ? utils.leftPad(num.toString("hex"), size / 8 * 2) : num;
        }
      } else {
        throw new Error("Unsupported or invalid type: " + type);
      }
    };
    var _processSolidityEncodePackedArgs = function(arg) {
      if (Array.isArray(arg)) {
        throw new Error("Autodetection of array types is not supported.");
      }
      var type, value = "";
      var hexArg, arraySize;
      if (!!arg && typeof arg === "object" && (arg.hasOwnProperty("v") || arg.hasOwnProperty("t") || arg.hasOwnProperty("value") || arg.hasOwnProperty("type"))) {
        type = arg.hasOwnProperty("t") ? arg.t : arg.type;
        value = arg.hasOwnProperty("v") ? arg.v : arg.value;
      } else {
        type = utils.toHex(arg, true);
        value = utils.toHex(arg);
        if (!type.startsWith("int") && !type.startsWith("uint")) {
          type = "bytes";
        }
      }
      if ((type.startsWith("int") || type.startsWith("uint")) && typeof value === "string" && !/^(-)?0x/i.test(value)) {
        value = new BN2(value);
      }
      if (Array.isArray(value)) {
        arraySize = _parseTypeNArray(type);
        if (arraySize && value.length !== arraySize) {
          throw new Error(type + " is not matching the given array " + JSON.stringify(value));
        } else {
          arraySize = value.length;
        }
      }
      if (Array.isArray(value)) {
        hexArg = value.map(function(val) {
          return _solidityPack(type, val, arraySize).toString("hex").replace("0x", "");
        });
        return hexArg.join("");
      } else {
        hexArg = _solidityPack(type, value, arraySize);
        return hexArg.toString("hex").replace("0x", "");
      }
    };
    var soliditySha32 = function() {
      var args = Array.prototype.slice.call(arguments);
      var hexArgs = args.map(_processSolidityEncodePackedArgs);
      return utils.sha3("0x" + hexArgs.join(""));
    };
    var soliditySha3Raw = function() {
      return utils.sha3Raw("0x" + Array.prototype.slice.call(arguments).map(_processSolidityEncodePackedArgs).join(""));
    };
    var encodePacked = function() {
      var args = Array.prototype.slice.call(arguments);
      var hexArgs = args.map(_processSolidityEncodePackedArgs);
      return "0x" + hexArgs.join("").toLowerCase();
    };
    module.exports = {
      soliditySha3: soliditySha32,
      soliditySha3Raw,
      encodePacked
    };
  }
});

// node_modules/randombytes/index.js
var require_randombytes = __commonJS({
  "node_modules/randombytes/index.js"(exports, module) {
    module.exports = __require("crypto").randomBytes;
  }
});

// node_modules/web3-utils/lib/index.js
var require_lib2 = __commonJS({
  "node_modules/web3-utils/lib/index.js"(exports, module) {
    var ethjsUnit = require_lib();
    var utils = require_utils5();
    var soliditySha32 = require_soliditySha3();
    var randombytes = require_randombytes();
    var BN2 = require_bn3();
    var _fireError = function(error, emitter, reject, callback, optionalData) {
      if (!!error && typeof error === "object" && !(error instanceof Error) && error.data) {
        if (!!error.data && typeof error.data === "object" || Array.isArray(error.data)) {
          error.data = JSON.stringify(error.data, null, 2);
        }
        error = error.message + "\n" + error.data;
      }
      if (typeof error === "string") {
        error = new Error(error);
      }
      if (typeof callback === "function") {
        callback(error, optionalData);
      }
      if (typeof reject === "function") {
        if (emitter && (typeof emitter.listeners === "function" && emitter.listeners("error").length) || typeof callback === "function") {
          emitter.catch(function() {
          });
        }
        setTimeout(function() {
          reject(error);
        }, 1);
      }
      if (emitter && typeof emitter.emit === "function") {
        setTimeout(function() {
          emitter.emit("error", error, optionalData);
          emitter.removeAllListeners();
        }, 1);
      }
      return emitter;
    };
    var _jsonInterfaceMethodToString2 = function(json) {
      if (!!json && typeof json === "object" && json.name && json.name.indexOf("(") !== -1) {
        return json.name;
      }
      return json.name + "(" + _flattenTypes(false, json.inputs).join(",") + ")";
    };
    var _flattenTypes = function(includeTuple, puts) {
      var types = [];
      puts.forEach(function(param) {
        if (typeof param.components === "object") {
          if (param.type.substring(0, 5) !== "tuple") {
            throw new Error("components found but type is not tuple; report on GitHub");
          }
          var suffix = "";
          var arrayBracket = param.type.indexOf("[");
          if (arrayBracket >= 0) {
            suffix = param.type.substring(arrayBracket);
          }
          var result = _flattenTypes(includeTuple, param.components);
          if (Array.isArray(result) && includeTuple) {
            types.push("tuple(" + result.join(",") + ")" + suffix);
          } else if (!includeTuple) {
            types.push("(" + result.join(",") + ")" + suffix);
          } else {
            types.push("(" + result + ")");
          }
        } else {
          types.push(param.type);
        }
      });
      return types;
    };
    var randomHex = function(size) {
      return "0x" + randombytes(size).toString("hex");
    };
    var hexToAscii = function(hex) {
      if (!utils.isHexStrict(hex))
        throw new Error("The parameter must be a valid HEX string.");
      var str = "";
      var i = 0, l = hex.length;
      if (hex.substring(0, 2) === "0x") {
        i = 2;
      }
      for (; i < l; i += 2) {
        var code = parseInt(hex.slice(i, i + 2), 16);
        str += String.fromCharCode(code);
      }
      return str;
    };
    var asciiToHex = function(str) {
      if (!str)
        return "0x00";
      var hex = "";
      for (var i = 0; i < str.length; i++) {
        var code = str.charCodeAt(i);
        var n = code.toString(16);
        hex += n.length < 2 ? "0" + n : n;
      }
      return "0x" + hex;
    };
    var getUnitValue = function(unit) {
      unit = unit ? unit.toLowerCase() : "ether";
      if (!ethjsUnit.unitMap[unit]) {
        throw new Error('This unit "' + unit + `" doesn't exist, please use the one of the following units` + JSON.stringify(ethjsUnit.unitMap, null, 2));
      }
      return unit;
    };
    var fromWei = function(number2, unit) {
      unit = getUnitValue(unit);
      if (!utils.isBN(number2) && !(typeof number2 === "string")) {
        throw new Error("Please pass numbers as strings or BN objects to avoid precision errors.");
      }
      return utils.isBN(number2) ? ethjsUnit.fromWei(number2, unit) : ethjsUnit.fromWei(number2, unit).toString(10);
    };
    var toWei2 = function(number2, unit) {
      unit = getUnitValue(unit);
      if (!utils.isBN(number2) && !(typeof number2 === "string")) {
        throw new Error("Please pass numbers as strings or BN objects to avoid precision errors.");
      }
      return utils.isBN(number2) ? ethjsUnit.toWei(number2, unit) : ethjsUnit.toWei(number2, unit).toString(10);
    };
    var toChecksumAddress = function(address) {
      if (typeof address === "undefined")
        return "";
      if (!/^(0x)?[0-9a-f]{40}$/i.test(address))
        throw new Error('Given address "' + address + '" is not a valid Ethereum address.');
      address = address.toLowerCase().replace(/^0x/i, "");
      var addressHash = utils.sha3(address).replace(/^0x/i, "");
      var checksumAddress = "0x";
      for (var i = 0; i < address.length; i++) {
        if (parseInt(addressHash[i], 16) > 7) {
          checksumAddress += address[i].toUpperCase();
        } else {
          checksumAddress += address[i];
        }
      }
      return checksumAddress;
    };
    var compareBlockNumbers = function(a, b) {
      if (a === b) {
        return 0;
      } else if (("genesis" === a || "earliest" === a || 0 === a) && ("genesis" === b || "earliest" === b || 0 === b)) {
        return 0;
      } else if ("genesis" === a || "earliest" === a || a === 0) {
        return -1;
      } else if ("genesis" === b || "earliest" === b || b === 0) {
        return 1;
      } else if (a === "latest" || a === "finalized") {
        if (b === "pending") {
          return -1;
        } else {
          return 1;
        }
      } else if (b === "latest" || b === "finalized") {
        if (a === "pending") {
          return 1;
        } else {
          return -1;
        }
      } else if (a === "pending") {
        return 1;
      } else if (b === "pending") {
        return -1;
      } else if (a === "safe" || b === "safe") {
        return void 0;
      } else {
        let bnA = new BN2(a);
        let bnB = new BN2(b);
        if (bnA.lt(bnB)) {
          return -1;
        } else if (bnA.eq(bnB)) {
          return 0;
        } else {
          return 1;
        }
      }
    };
    module.exports = {
      _fireError,
      _jsonInterfaceMethodToString: _jsonInterfaceMethodToString2,
      _flattenTypes,
      // extractDisplayName: extractDisplayName,
      // extractTypeName: extractTypeName,
      randomHex,
      BN: utils.BN,
      isBN: utils.isBN,
      isBigNumber: utils.isBigNumber,
      isHex: utils.isHex,
      isHexStrict: utils.isHexStrict,
      sha3: utils.sha3,
      sha3Raw: utils.sha3Raw,
      keccak256: utils.sha3,
      soliditySha3: soliditySha32.soliditySha3,
      soliditySha3Raw: soliditySha32.soliditySha3Raw,
      encodePacked: soliditySha32.encodePacked,
      isAddress: utils.isAddress,
      checkAddressChecksum: utils.checkAddressChecksum,
      toChecksumAddress,
      toHex: utils.toHex,
      toBN: utils.toBN,
      bytesToHex: utils.bytesToHex,
      hexToBytes: utils.hexToBytes,
      hexToNumberString: utils.hexToNumberString,
      hexToNumber: utils.hexToNumber,
      toDecimal: utils.hexToNumber,
      numberToHex: utils.numberToHex,
      fromDecimal: utils.numberToHex,
      hexToUtf8: utils.hexToUtf8,
      hexToString: utils.hexToUtf8,
      toUtf8: utils.hexToUtf8,
      stripHexPrefix: utils.stripHexPrefix,
      utf8ToHex: utils.utf8ToHex,
      stringToHex: utils.utf8ToHex,
      fromUtf8: utils.utf8ToHex,
      hexToAscii,
      toAscii: hexToAscii,
      asciiToHex,
      fromAscii: asciiToHex,
      unitMap: ethjsUnit.unitMap,
      toWei: toWei2,
      fromWei,
      padLeft: utils.leftPad,
      leftPad: utils.leftPad,
      padRight: utils.rightPad,
      rightPad: utils.rightPad,
      toTwosComplement: utils.toTwosComplement,
      isBloom: utils.isBloom,
      isUserEthereumAddressInBloom: utils.isUserEthereumAddressInBloom,
      isContractAddressInBloom: utils.isContractAddressInBloom,
      isTopic: utils.isTopic,
      isTopicInBloom: utils.isTopicInBloom,
      isInBloom: utils.isInBloom,
      compareBlockNumbers,
      toNumber: utils.toNumber
    };
  }
});

// node_modules/@ethersproject/logger/lib.esm/_version.js
var version;
var init_version = __esm({
  "node_modules/@ethersproject/logger/lib.esm/_version.js"() {
    version = "logger/5.7.0";
  }
});

// node_modules/@ethersproject/logger/lib.esm/index.js
function _checkNormalize() {
  try {
    const missing = [];
    ["NFD", "NFC", "NFKD", "NFKC"].forEach((form) => {
      try {
        if ("test".normalize(form) !== "test") {
          throw new Error("bad normalize");
        }
        ;
      } catch (error) {
        missing.push(form);
      }
    });
    if (missing.length) {
      throw new Error("missing " + missing.join(", "));
    }
    if (String.fromCharCode(233).normalize("NFD") !== String.fromCharCode(101, 769)) {
      throw new Error("broken implementation");
    }
  } catch (error) {
    return error.message;
  }
  return null;
}
var _permanentCensorErrors, _censorErrors, LogLevels, _logLevel, _globalLogger, _normalizeError, LogLevel, ErrorCode, HEX, Logger;
var init_lib = __esm({
  "node_modules/@ethersproject/logger/lib.esm/index.js"() {
    "use strict";
    init_version();
    _permanentCensorErrors = false;
    _censorErrors = false;
    LogLevels = { debug: 1, "default": 2, info: 2, warning: 3, error: 4, off: 5 };
    _logLevel = LogLevels["default"];
    _globalLogger = null;
    _normalizeError = _checkNormalize();
    (function(LogLevel2) {
      LogLevel2["DEBUG"] = "DEBUG";
      LogLevel2["INFO"] = "INFO";
      LogLevel2["WARNING"] = "WARNING";
      LogLevel2["ERROR"] = "ERROR";
      LogLevel2["OFF"] = "OFF";
    })(LogLevel || (LogLevel = {}));
    (function(ErrorCode2) {
      ErrorCode2["UNKNOWN_ERROR"] = "UNKNOWN_ERROR";
      ErrorCode2["NOT_IMPLEMENTED"] = "NOT_IMPLEMENTED";
      ErrorCode2["UNSUPPORTED_OPERATION"] = "UNSUPPORTED_OPERATION";
      ErrorCode2["NETWORK_ERROR"] = "NETWORK_ERROR";
      ErrorCode2["SERVER_ERROR"] = "SERVER_ERROR";
      ErrorCode2["TIMEOUT"] = "TIMEOUT";
      ErrorCode2["BUFFER_OVERRUN"] = "BUFFER_OVERRUN";
      ErrorCode2["NUMERIC_FAULT"] = "NUMERIC_FAULT";
      ErrorCode2["MISSING_NEW"] = "MISSING_NEW";
      ErrorCode2["INVALID_ARGUMENT"] = "INVALID_ARGUMENT";
      ErrorCode2["MISSING_ARGUMENT"] = "MISSING_ARGUMENT";
      ErrorCode2["UNEXPECTED_ARGUMENT"] = "UNEXPECTED_ARGUMENT";
      ErrorCode2["CALL_EXCEPTION"] = "CALL_EXCEPTION";
      ErrorCode2["INSUFFICIENT_FUNDS"] = "INSUFFICIENT_FUNDS";
      ErrorCode2["NONCE_EXPIRED"] = "NONCE_EXPIRED";
      ErrorCode2["REPLACEMENT_UNDERPRICED"] = "REPLACEMENT_UNDERPRICED";
      ErrorCode2["UNPREDICTABLE_GAS_LIMIT"] = "UNPREDICTABLE_GAS_LIMIT";
      ErrorCode2["TRANSACTION_REPLACED"] = "TRANSACTION_REPLACED";
      ErrorCode2["ACTION_REJECTED"] = "ACTION_REJECTED";
    })(ErrorCode || (ErrorCode = {}));
    HEX = "0123456789abcdef";
    Logger = class _Logger {
      constructor(version8) {
        Object.defineProperty(this, "version", {
          enumerable: true,
          value: version8,
          writable: false
        });
      }
      _log(logLevel, args) {
        const level = logLevel.toLowerCase();
        if (LogLevels[level] == null) {
          this.throwArgumentError("invalid log level name", "logLevel", logLevel);
        }
        if (_logLevel > LogLevels[level]) {
          return;
        }
        console.log.apply(console, args);
      }
      debug(...args) {
        this._log(_Logger.levels.DEBUG, args);
      }
      info(...args) {
        this._log(_Logger.levels.INFO, args);
      }
      warn(...args) {
        this._log(_Logger.levels.WARNING, args);
      }
      makeError(message, code, params) {
        if (_censorErrors) {
          return this.makeError("censored error", code, {});
        }
        if (!code) {
          code = _Logger.errors.UNKNOWN_ERROR;
        }
        if (!params) {
          params = {};
        }
        const messageDetails = [];
        Object.keys(params).forEach((key) => {
          const value = params[key];
          try {
            if (value instanceof Uint8Array) {
              let hex = "";
              for (let i = 0; i < value.length; i++) {
                hex += HEX[value[i] >> 4];
                hex += HEX[value[i] & 15];
              }
              messageDetails.push(key + "=Uint8Array(0x" + hex + ")");
            } else {
              messageDetails.push(key + "=" + JSON.stringify(value));
            }
          } catch (error2) {
            messageDetails.push(key + "=" + JSON.stringify(params[key].toString()));
          }
        });
        messageDetails.push(`code=${code}`);
        messageDetails.push(`version=${this.version}`);
        const reason = message;
        let url = "";
        switch (code) {
          case ErrorCode.NUMERIC_FAULT: {
            url = "NUMERIC_FAULT";
            const fault = message;
            switch (fault) {
              case "overflow":
              case "underflow":
              case "division-by-zero":
                url += "-" + fault;
                break;
              case "negative-power":
              case "negative-width":
                url += "-unsupported";
                break;
              case "unbound-bitwise-result":
                url += "-unbound-result";
                break;
            }
            break;
          }
          case ErrorCode.CALL_EXCEPTION:
          case ErrorCode.INSUFFICIENT_FUNDS:
          case ErrorCode.MISSING_NEW:
          case ErrorCode.NONCE_EXPIRED:
          case ErrorCode.REPLACEMENT_UNDERPRICED:
          case ErrorCode.TRANSACTION_REPLACED:
          case ErrorCode.UNPREDICTABLE_GAS_LIMIT:
            url = code;
            break;
        }
        if (url) {
          message += " [ See: https://links.ethers.org/v5-errors-" + url + " ]";
        }
        if (messageDetails.length) {
          message += " (" + messageDetails.join(", ") + ")";
        }
        const error = new Error(message);
        error.reason = reason;
        error.code = code;
        Object.keys(params).forEach(function(key) {
          error[key] = params[key];
        });
        return error;
      }
      throwError(message, code, params) {
        throw this.makeError(message, code, params);
      }
      throwArgumentError(message, name, value) {
        return this.throwError(message, _Logger.errors.INVALID_ARGUMENT, {
          argument: name,
          value
        });
      }
      assert(condition, message, code, params) {
        if (!!condition) {
          return;
        }
        this.throwError(message, code, params);
      }
      assertArgument(condition, message, name, value) {
        if (!!condition) {
          return;
        }
        this.throwArgumentError(message, name, value);
      }
      checkNormalize(message) {
        if (message == null) {
          message = "platform missing String.prototype.normalize";
        }
        if (_normalizeError) {
          this.throwError("platform missing String.prototype.normalize", _Logger.errors.UNSUPPORTED_OPERATION, {
            operation: "String.prototype.normalize",
            form: _normalizeError
          });
        }
      }
      checkSafeUint53(value, message) {
        if (typeof value !== "number") {
          return;
        }
        if (message == null) {
          message = "value not safe";
        }
        if (value < 0 || value >= 9007199254740991) {
          this.throwError(message, _Logger.errors.NUMERIC_FAULT, {
            operation: "checkSafeInteger",
            fault: "out-of-safe-range",
            value
          });
        }
        if (value % 1) {
          this.throwError(message, _Logger.errors.NUMERIC_FAULT, {
            operation: "checkSafeInteger",
            fault: "non-integer",
            value
          });
        }
      }
      checkArgumentCount(count, expectedCount, message) {
        if (message) {
          message = ": " + message;
        } else {
          message = "";
        }
        if (count < expectedCount) {
          this.throwError("missing argument" + message, _Logger.errors.MISSING_ARGUMENT, {
            count,
            expectedCount
          });
        }
        if (count > expectedCount) {
          this.throwError("too many arguments" + message, _Logger.errors.UNEXPECTED_ARGUMENT, {
            count,
            expectedCount
          });
        }
      }
      checkNew(target, kind) {
        if (target === Object || target == null) {
          this.throwError("missing new", _Logger.errors.MISSING_NEW, { name: kind.name });
        }
      }
      checkAbstract(target, kind) {
        if (target === kind) {
          this.throwError("cannot instantiate abstract class " + JSON.stringify(kind.name) + " directly; use a sub-class", _Logger.errors.UNSUPPORTED_OPERATION, { name: target.name, operation: "new" });
        } else if (target === Object || target == null) {
          this.throwError("missing new", _Logger.errors.MISSING_NEW, { name: kind.name });
        }
      }
      static globalLogger() {
        if (!_globalLogger) {
          _globalLogger = new _Logger(version);
        }
        return _globalLogger;
      }
      static setCensorship(censorship, permanent) {
        if (!censorship && permanent) {
          this.globalLogger().throwError("cannot permanently disable censorship", _Logger.errors.UNSUPPORTED_OPERATION, {
            operation: "setCensorship"
          });
        }
        if (_permanentCensorErrors) {
          if (!censorship) {
            return;
          }
          this.globalLogger().throwError("error censorship permanent", _Logger.errors.UNSUPPORTED_OPERATION, {
            operation: "setCensorship"
          });
        }
        _censorErrors = !!censorship;
        _permanentCensorErrors = !!permanent;
      }
      static setLogLevel(logLevel) {
        const level = LogLevels[logLevel.toLowerCase()];
        if (level == null) {
          _Logger.globalLogger().warn("invalid log level - " + logLevel);
          return;
        }
        _logLevel = level;
      }
      static from(version8) {
        return new _Logger(version8);
      }
    };
    Logger.errors = ErrorCode;
    Logger.levels = LogLevel;
  }
});

// node_modules/@ethersproject/bytes/lib.esm/_version.js
var version2;
var init_version2 = __esm({
  "node_modules/@ethersproject/bytes/lib.esm/_version.js"() {
    version2 = "bytes/5.7.0";
  }
});

// node_modules/@ethersproject/bytes/lib.esm/index.js
function isHexable(value) {
  return !!value.toHexString;
}
function addSlice(array) {
  if (array.slice) {
    return array;
  }
  array.slice = function() {
    const args = Array.prototype.slice.call(arguments);
    return addSlice(new Uint8Array(Array.prototype.slice.apply(array, args)));
  };
  return array;
}
function isInteger(value) {
  return typeof value === "number" && value == value && value % 1 === 0;
}
function isBytes(value) {
  if (value == null) {
    return false;
  }
  if (value.constructor === Uint8Array) {
    return true;
  }
  if (typeof value === "string") {
    return false;
  }
  if (!isInteger(value.length) || value.length < 0) {
    return false;
  }
  for (let i = 0; i < value.length; i++) {
    const v = value[i];
    if (!isInteger(v) || v < 0 || v >= 256) {
      return false;
    }
  }
  return true;
}
function arrayify(value, options) {
  if (!options) {
    options = {};
  }
  if (typeof value === "number") {
    logger.checkSafeUint53(value, "invalid arrayify value");
    const result = [];
    while (value) {
      result.unshift(value & 255);
      value = parseInt(String(value / 256));
    }
    if (result.length === 0) {
      result.push(0);
    }
    return addSlice(new Uint8Array(result));
  }
  if (options.allowMissingPrefix && typeof value === "string" && value.substring(0, 2) !== "0x") {
    value = "0x" + value;
  }
  if (isHexable(value)) {
    value = value.toHexString();
  }
  if (isHexString(value)) {
    let hex = value.substring(2);
    if (hex.length % 2) {
      if (options.hexPad === "left") {
        hex = "0" + hex;
      } else if (options.hexPad === "right") {
        hex += "0";
      } else {
        logger.throwArgumentError("hex data is odd-length", "value", value);
      }
    }
    const result = [];
    for (let i = 0; i < hex.length; i += 2) {
      result.push(parseInt(hex.substring(i, i + 2), 16));
    }
    return addSlice(new Uint8Array(result));
  }
  if (isBytes(value)) {
    return addSlice(new Uint8Array(value));
  }
  return logger.throwArgumentError("invalid arrayify value", "value", value);
}
function concat(items) {
  const objects = items.map((item) => arrayify(item));
  const length = objects.reduce((accum, item) => accum + item.length, 0);
  const result = new Uint8Array(length);
  objects.reduce((offset, object) => {
    result.set(object, offset);
    return offset + object.length;
  }, 0);
  return addSlice(result);
}
function isHexString(value, length) {
  if (typeof value !== "string" || !value.match(/^0x[0-9A-Fa-f]*$/)) {
    return false;
  }
  if (length && value.length !== 2 + 2 * length) {
    return false;
  }
  return true;
}
function hexlify(value, options) {
  if (!options) {
    options = {};
  }
  if (typeof value === "number") {
    logger.checkSafeUint53(value, "invalid hexlify value");
    let hex = "";
    while (value) {
      hex = HexCharacters[value & 15] + hex;
      value = Math.floor(value / 16);
    }
    if (hex.length) {
      if (hex.length % 2) {
        hex = "0" + hex;
      }
      return "0x" + hex;
    }
    return "0x00";
  }
  if (typeof value === "bigint") {
    value = value.toString(16);
    if (value.length % 2) {
      return "0x0" + value;
    }
    return "0x" + value;
  }
  if (options.allowMissingPrefix && typeof value === "string" && value.substring(0, 2) !== "0x") {
    value = "0x" + value;
  }
  if (isHexable(value)) {
    return value.toHexString();
  }
  if (isHexString(value)) {
    if (value.length % 2) {
      if (options.hexPad === "left") {
        value = "0x0" + value.substring(2);
      } else if (options.hexPad === "right") {
        value += "0";
      } else {
        logger.throwArgumentError("hex data is odd-length", "value", value);
      }
    }
    return value.toLowerCase();
  }
  if (isBytes(value)) {
    let result = "0x";
    for (let i = 0; i < value.length; i++) {
      let v = value[i];
      result += HexCharacters[(v & 240) >> 4] + HexCharacters[v & 15];
    }
    return result;
  }
  return logger.throwArgumentError("invalid hexlify value", "value", value);
}
function hexDataSlice(data, offset, endOffset) {
  if (typeof data !== "string") {
    data = hexlify(data);
  } else if (!isHexString(data) || data.length % 2) {
    logger.throwArgumentError("invalid hexData", "value", data);
  }
  offset = 2 + 2 * offset;
  if (endOffset != null) {
    return "0x" + data.substring(offset, 2 + 2 * endOffset);
  }
  return "0x" + data.substring(offset);
}
function hexConcat(items) {
  let result = "0x";
  items.forEach((item) => {
    result += hexlify(item).substring(2);
  });
  return result;
}
function hexZeroPad(value, length) {
  if (typeof value !== "string") {
    value = hexlify(value);
  } else if (!isHexString(value)) {
    logger.throwArgumentError("invalid hex string", "value", value);
  }
  if (value.length > 2 * length + 2) {
    logger.throwArgumentError("value out of range", "value", arguments[1]);
  }
  while (value.length < 2 * length + 2) {
    value = "0x0" + value.substring(2);
  }
  return value;
}
var logger, HexCharacters;
var init_lib2 = __esm({
  "node_modules/@ethersproject/bytes/lib.esm/index.js"() {
    "use strict";
    init_lib();
    init_version2();
    logger = new Logger(version2);
    HexCharacters = "0123456789abcdef";
  }
});

// node_modules/@ethersproject/bignumber/lib.esm/_version.js
var version3;
var init_version3 = __esm({
  "node_modules/@ethersproject/bignumber/lib.esm/_version.js"() {
    version3 = "bignumber/5.7.0";
  }
});

// node_modules/@ethersproject/bignumber/lib.esm/bignumber.js
function toHex(value) {
  if (typeof value !== "string") {
    return toHex(value.toString(16));
  }
  if (value[0] === "-") {
    value = value.substring(1);
    if (value[0] === "-") {
      logger2.throwArgumentError("invalid hex", "value", value);
    }
    value = toHex(value);
    if (value === "0x00") {
      return value;
    }
    return "-" + value;
  }
  if (value.substring(0, 2) !== "0x") {
    value = "0x" + value;
  }
  if (value === "0x") {
    return "0x00";
  }
  if (value.length % 2) {
    value = "0x0" + value.substring(2);
  }
  while (value.length > 4 && value.substring(0, 4) === "0x00") {
    value = "0x" + value.substring(4);
  }
  return value;
}
function toBigNumber(value) {
  return BigNumber.from(toHex(value));
}
function toBN(value) {
  const hex = BigNumber.from(value).toHexString();
  if (hex[0] === "-") {
    return new BN("-" + hex.substring(3), 16);
  }
  return new BN(hex.substring(2), 16);
}
function throwFault(fault, operation, value) {
  const params = { fault, operation };
  if (value != null) {
    params.value = value;
  }
  return logger2.throwError(fault, Logger.errors.NUMERIC_FAULT, params);
}
function _base36To16(value) {
  return new BN(value, 36).toString(16);
}
var import_bn, BN, logger2, _constructorGuard, MAX_SAFE, _warnedToStringRadix, BigNumber;
var init_bignumber = __esm({
  "node_modules/@ethersproject/bignumber/lib.esm/bignumber.js"() {
    "use strict";
    import_bn = __toESM(require_bn3());
    init_lib2();
    init_lib();
    init_version3();
    BN = import_bn.default.BN;
    logger2 = new Logger(version3);
    _constructorGuard = {};
    MAX_SAFE = 9007199254740991;
    _warnedToStringRadix = false;
    BigNumber = class _BigNumber {
      constructor(constructorGuard, hex) {
        if (constructorGuard !== _constructorGuard) {
          logger2.throwError("cannot call constructor directly; use BigNumber.from", Logger.errors.UNSUPPORTED_OPERATION, {
            operation: "new (BigNumber)"
          });
        }
        this._hex = hex;
        this._isBigNumber = true;
        Object.freeze(this);
      }
      fromTwos(value) {
        return toBigNumber(toBN(this).fromTwos(value));
      }
      toTwos(value) {
        return toBigNumber(toBN(this).toTwos(value));
      }
      abs() {
        if (this._hex[0] === "-") {
          return _BigNumber.from(this._hex.substring(1));
        }
        return this;
      }
      add(other) {
        return toBigNumber(toBN(this).add(toBN(other)));
      }
      sub(other) {
        return toBigNumber(toBN(this).sub(toBN(other)));
      }
      div(other) {
        const o = _BigNumber.from(other);
        if (o.isZero()) {
          throwFault("division-by-zero", "div");
        }
        return toBigNumber(toBN(this).div(toBN(other)));
      }
      mul(other) {
        return toBigNumber(toBN(this).mul(toBN(other)));
      }
      mod(other) {
        const value = toBN(other);
        if (value.isNeg()) {
          throwFault("division-by-zero", "mod");
        }
        return toBigNumber(toBN(this).umod(value));
      }
      pow(other) {
        const value = toBN(other);
        if (value.isNeg()) {
          throwFault("negative-power", "pow");
        }
        return toBigNumber(toBN(this).pow(value));
      }
      and(other) {
        const value = toBN(other);
        if (this.isNegative() || value.isNeg()) {
          throwFault("unbound-bitwise-result", "and");
        }
        return toBigNumber(toBN(this).and(value));
      }
      or(other) {
        const value = toBN(other);
        if (this.isNegative() || value.isNeg()) {
          throwFault("unbound-bitwise-result", "or");
        }
        return toBigNumber(toBN(this).or(value));
      }
      xor(other) {
        const value = toBN(other);
        if (this.isNegative() || value.isNeg()) {
          throwFault("unbound-bitwise-result", "xor");
        }
        return toBigNumber(toBN(this).xor(value));
      }
      mask(value) {
        if (this.isNegative() || value < 0) {
          throwFault("negative-width", "mask");
        }
        return toBigNumber(toBN(this).maskn(value));
      }
      shl(value) {
        if (this.isNegative() || value < 0) {
          throwFault("negative-width", "shl");
        }
        return toBigNumber(toBN(this).shln(value));
      }
      shr(value) {
        if (this.isNegative() || value < 0) {
          throwFault("negative-width", "shr");
        }
        return toBigNumber(toBN(this).shrn(value));
      }
      eq(other) {
        return toBN(this).eq(toBN(other));
      }
      lt(other) {
        return toBN(this).lt(toBN(other));
      }
      lte(other) {
        return toBN(this).lte(toBN(other));
      }
      gt(other) {
        return toBN(this).gt(toBN(other));
      }
      gte(other) {
        return toBN(this).gte(toBN(other));
      }
      isNegative() {
        return this._hex[0] === "-";
      }
      isZero() {
        return toBN(this).isZero();
      }
      toNumber() {
        try {
          return toBN(this).toNumber();
        } catch (error) {
          throwFault("overflow", "toNumber", this.toString());
        }
        return null;
      }
      toBigInt() {
        try {
          return BigInt(this.toString());
        } catch (e) {
        }
        return logger2.throwError("this platform does not support BigInt", Logger.errors.UNSUPPORTED_OPERATION, {
          value: this.toString()
        });
      }
      toString() {
        if (arguments.length > 0) {
          if (arguments[0] === 10) {
            if (!_warnedToStringRadix) {
              _warnedToStringRadix = true;
              logger2.warn("BigNumber.toString does not accept any parameters; base-10 is assumed");
            }
          } else if (arguments[0] === 16) {
            logger2.throwError("BigNumber.toString does not accept any parameters; use bigNumber.toHexString()", Logger.errors.UNEXPECTED_ARGUMENT, {});
          } else {
            logger2.throwError("BigNumber.toString does not accept parameters", Logger.errors.UNEXPECTED_ARGUMENT, {});
          }
        }
        return toBN(this).toString(10);
      }
      toHexString() {
        return this._hex;
      }
      toJSON(key) {
        return { type: "BigNumber", hex: this.toHexString() };
      }
      static from(value) {
        if (value instanceof _BigNumber) {
          return value;
        }
        if (typeof value === "string") {
          if (value.match(/^-?0x[0-9a-f]+$/i)) {
            return new _BigNumber(_constructorGuard, toHex(value));
          }
          if (value.match(/^-?[0-9]+$/)) {
            return new _BigNumber(_constructorGuard, toHex(new BN(value)));
          }
          return logger2.throwArgumentError("invalid BigNumber string", "value", value);
        }
        if (typeof value === "number") {
          if (value % 1) {
            throwFault("underflow", "BigNumber.from", value);
          }
          if (value >= MAX_SAFE || value <= -MAX_SAFE) {
            throwFault("overflow", "BigNumber.from", value);
          }
          return _BigNumber.from(String(value));
        }
        const anyValue = value;
        if (typeof anyValue === "bigint") {
          return _BigNumber.from(anyValue.toString());
        }
        if (isBytes(anyValue)) {
          return _BigNumber.from(hexlify(anyValue));
        }
        if (anyValue) {
          if (anyValue.toHexString) {
            const hex = anyValue.toHexString();
            if (typeof hex === "string") {
              return _BigNumber.from(hex);
            }
          } else {
            let hex = anyValue._hex;
            if (hex == null && anyValue.type === "BigNumber") {
              hex = anyValue.hex;
            }
            if (typeof hex === "string") {
              if (isHexString(hex) || hex[0] === "-" && isHexString(hex.substring(1))) {
                return _BigNumber.from(hex);
              }
            }
          }
        }
        return logger2.throwArgumentError("invalid BigNumber value", "value", value);
      }
      static isBigNumber(value) {
        return !!(value && value._isBigNumber);
      }
    };
  }
});

// node_modules/@ethersproject/bignumber/lib.esm/index.js
var init_lib3 = __esm({
  "node_modules/@ethersproject/bignumber/lib.esm/index.js"() {
    init_bignumber();
    init_bignumber();
  }
});

// node_modules/@ethersproject/properties/lib.esm/_version.js
var version4;
var init_version4 = __esm({
  "node_modules/@ethersproject/properties/lib.esm/_version.js"() {
    version4 = "properties/5.7.0";
  }
});

// node_modules/@ethersproject/properties/lib.esm/index.js
function defineReadOnly(object, name, value) {
  Object.defineProperty(object, name, {
    enumerable: true,
    value,
    writable: false
  });
}
function getStatic(ctor, key) {
  for (let i = 0; i < 32; i++) {
    if (ctor[key]) {
      return ctor[key];
    }
    if (!ctor.prototype || typeof ctor.prototype !== "object") {
      break;
    }
    ctor = Object.getPrototypeOf(ctor.prototype).constructor;
  }
  return null;
}
function _isFrozen(object) {
  if (object === void 0 || object === null || opaque[typeof object]) {
    return true;
  }
  if (Array.isArray(object) || typeof object === "object") {
    if (!Object.isFrozen(object)) {
      return false;
    }
    const keys = Object.keys(object);
    for (let i = 0; i < keys.length; i++) {
      let value = null;
      try {
        value = object[keys[i]];
      } catch (error) {
        continue;
      }
      if (!_isFrozen(value)) {
        return false;
      }
    }
    return true;
  }
  return logger3.throwArgumentError(`Cannot deepCopy ${typeof object}`, "object", object);
}
function _deepCopy(object) {
  if (_isFrozen(object)) {
    return object;
  }
  if (Array.isArray(object)) {
    return Object.freeze(object.map((item) => deepCopy(item)));
  }
  if (typeof object === "object") {
    const result = {};
    for (const key in object) {
      const value = object[key];
      if (value === void 0) {
        continue;
      }
      defineReadOnly(result, key, deepCopy(value));
    }
    return result;
  }
  return logger3.throwArgumentError(`Cannot deepCopy ${typeof object}`, "object", object);
}
function deepCopy(object) {
  return _deepCopy(object);
}
var logger3, opaque, Description;
var init_lib4 = __esm({
  "node_modules/@ethersproject/properties/lib.esm/index.js"() {
    "use strict";
    init_lib();
    init_version4();
    logger3 = new Logger(version4);
    opaque = { bigint: true, boolean: true, "function": true, number: true, string: true };
    Description = class {
      constructor(info) {
        for (const key in info) {
          this[key] = deepCopy(info[key]);
        }
      }
    };
  }
});

// node_modules/@ethersproject/abi/lib.esm/_version.js
var version5;
var init_version5 = __esm({
  "node_modules/@ethersproject/abi/lib.esm/_version.js"() {
    version5 = "abi/5.7.0";
  }
});

// node_modules/@ethersproject/abi/lib.esm/fragments.js
function checkModifier(type, name) {
  if (type === "bytes" || type === "string") {
    if (ModifiersBytes[name]) {
      return true;
    }
  } else if (type === "address") {
    if (name === "payable") {
      return true;
    }
  } else if (type.indexOf("[") >= 0 || type === "tuple") {
    if (ModifiersNest[name]) {
      return true;
    }
  }
  if (ModifiersBytes[name] || name === "payable") {
    logger4.throwArgumentError("invalid modifier", "name", name);
  }
  return false;
}
function parseParamType(param, allowIndexed) {
  let originalParam = param;
  function throwError(i) {
    logger4.throwArgumentError(`unexpected character at position ${i}`, "param", param);
  }
  param = param.replace(/\s/g, " ");
  function newNode(parent2) {
    let node2 = { type: "", name: "", parent: parent2, state: { allowType: true } };
    if (allowIndexed) {
      node2.indexed = false;
    }
    return node2;
  }
  let parent = { type: "", name: "", state: { allowType: true } };
  let node = parent;
  for (let i = 0; i < param.length; i++) {
    let c = param[i];
    switch (c) {
      case "(":
        if (node.state.allowType && node.type === "") {
          node.type = "tuple";
        } else if (!node.state.allowParams) {
          throwError(i);
        }
        node.state.allowType = false;
        node.type = verifyType(node.type);
        node.components = [newNode(node)];
        node = node.components[0];
        break;
      case ")":
        delete node.state;
        if (node.name === "indexed") {
          if (!allowIndexed) {
            throwError(i);
          }
          node.indexed = true;
          node.name = "";
        }
        if (checkModifier(node.type, node.name)) {
          node.name = "";
        }
        node.type = verifyType(node.type);
        let child = node;
        node = node.parent;
        if (!node) {
          throwError(i);
        }
        delete child.parent;
        node.state.allowParams = false;
        node.state.allowName = true;
        node.state.allowArray = true;
        break;
      case ",":
        delete node.state;
        if (node.name === "indexed") {
          if (!allowIndexed) {
            throwError(i);
          }
          node.indexed = true;
          node.name = "";
        }
        if (checkModifier(node.type, node.name)) {
          node.name = "";
        }
        node.type = verifyType(node.type);
        let sibling = newNode(node.parent);
        node.parent.components.push(sibling);
        delete node.parent;
        node = sibling;
        break;
      // Hit a space...
      case " ":
        if (node.state.allowType) {
          if (node.type !== "") {
            node.type = verifyType(node.type);
            delete node.state.allowType;
            node.state.allowName = true;
            node.state.allowParams = true;
          }
        }
        if (node.state.allowName) {
          if (node.name !== "") {
            if (node.name === "indexed") {
              if (!allowIndexed) {
                throwError(i);
              }
              if (node.indexed) {
                throwError(i);
              }
              node.indexed = true;
              node.name = "";
            } else if (checkModifier(node.type, node.name)) {
              node.name = "";
            } else {
              node.state.allowName = false;
            }
          }
        }
        break;
      case "[":
        if (!node.state.allowArray) {
          throwError(i);
        }
        node.type += c;
        node.state.allowArray = false;
        node.state.allowName = false;
        node.state.readArray = true;
        break;
      case "]":
        if (!node.state.readArray) {
          throwError(i);
        }
        node.type += c;
        node.state.readArray = false;
        node.state.allowArray = true;
        node.state.allowName = true;
        break;
      default:
        if (node.state.allowType) {
          node.type += c;
          node.state.allowParams = true;
          node.state.allowArray = true;
        } else if (node.state.allowName) {
          node.name += c;
          delete node.state.allowArray;
        } else if (node.state.readArray) {
          node.type += c;
        } else {
          throwError(i);
        }
    }
  }
  if (node.parent) {
    logger4.throwArgumentError("unexpected eof", "param", param);
  }
  delete parent.state;
  if (node.name === "indexed") {
    if (!allowIndexed) {
      throwError(originalParam.length - 7);
    }
    if (node.indexed) {
      throwError(originalParam.length - 7);
    }
    node.indexed = true;
    node.name = "";
  } else if (checkModifier(node.type, node.name)) {
    node.name = "";
  }
  parent.type = verifyType(parent.type);
  return parent;
}
function populate(object, params) {
  for (let key in params) {
    defineReadOnly(object, key, params[key]);
  }
}
function parseParams(value, allowIndex) {
  return splitNesting(value).map((param) => ParamType.fromString(param, allowIndex));
}
function parseGas(value, params) {
  params.gas = null;
  let comps = value.split("@");
  if (comps.length !== 1) {
    if (comps.length > 2) {
      logger4.throwArgumentError("invalid human-readable ABI signature", "value", value);
    }
    if (!comps[1].match(/^[0-9]+$/)) {
      logger4.throwArgumentError("invalid human-readable ABI signature gas", "value", value);
    }
    params.gas = BigNumber.from(comps[1]);
    return comps[0];
  }
  return value;
}
function parseModifiers(value, params) {
  params.constant = false;
  params.payable = false;
  params.stateMutability = "nonpayable";
  value.split(" ").forEach((modifier) => {
    switch (modifier.trim()) {
      case "constant":
        params.constant = true;
        break;
      case "payable":
        params.payable = true;
        params.stateMutability = "payable";
        break;
      case "nonpayable":
        params.payable = false;
        params.stateMutability = "nonpayable";
        break;
      case "pure":
        params.constant = true;
        params.stateMutability = "pure";
        break;
      case "view":
        params.constant = true;
        params.stateMutability = "view";
        break;
      case "external":
      case "public":
      case "":
        break;
      default:
        console.log("unknown modifier: " + modifier);
    }
  });
}
function verifyState(value) {
  let result = {
    constant: false,
    payable: true,
    stateMutability: "payable"
  };
  if (value.stateMutability != null) {
    result.stateMutability = value.stateMutability;
    result.constant = result.stateMutability === "view" || result.stateMutability === "pure";
    if (value.constant != null) {
      if (!!value.constant !== result.constant) {
        logger4.throwArgumentError("cannot have constant function with mutability " + result.stateMutability, "value", value);
      }
    }
    result.payable = result.stateMutability === "payable";
    if (value.payable != null) {
      if (!!value.payable !== result.payable) {
        logger4.throwArgumentError("cannot have payable function with mutability " + result.stateMutability, "value", value);
      }
    }
  } else if (value.payable != null) {
    result.payable = !!value.payable;
    if (value.constant == null && !result.payable && value.type !== "constructor") {
      logger4.throwArgumentError("unable to determine stateMutability", "value", value);
    }
    result.constant = !!value.constant;
    if (result.constant) {
      result.stateMutability = "view";
    } else {
      result.stateMutability = result.payable ? "payable" : "nonpayable";
    }
    if (result.payable && result.constant) {
      logger4.throwArgumentError("cannot have constant payable function", "value", value);
    }
  } else if (value.constant != null) {
    result.constant = !!value.constant;
    result.payable = !result.constant;
    result.stateMutability = result.constant ? "view" : "payable";
  } else if (value.type !== "constructor") {
    logger4.throwArgumentError("unable to determine stateMutability", "value", value);
  }
  return result;
}
function checkForbidden(fragment) {
  const sig = fragment.format();
  if (sig === "Error(string)" || sig === "Panic(uint256)") {
    logger4.throwArgumentError(`cannot specify user defined ${sig} error`, "fragment", fragment);
  }
  return fragment;
}
function verifyType(type) {
  if (type.match(/^uint($|[^1-9])/)) {
    type = "uint256" + type.substring(4);
  } else if (type.match(/^int($|[^1-9])/)) {
    type = "int256" + type.substring(3);
  }
  return type;
}
function verifyIdentifier(value) {
  if (!value || !value.match(regexIdentifier)) {
    logger4.throwArgumentError(`invalid identifier "${value}"`, "value", value);
  }
  return value;
}
function splitNesting(value) {
  value = value.trim();
  let result = [];
  let accum = "";
  let depth = 0;
  for (let offset = 0; offset < value.length; offset++) {
    let c = value[offset];
    if (c === "," && depth === 0) {
      result.push(accum);
      accum = "";
    } else {
      accum += c;
      if (c === "(") {
        depth++;
      } else if (c === ")") {
        depth--;
        if (depth === -1) {
          logger4.throwArgumentError("unbalanced parenthesis", "value", value);
        }
      }
    }
  }
  if (accum) {
    result.push(accum);
  }
  return result;
}
var logger4, _constructorGuard2, ModifiersBytes, ModifiersNest, FormatTypes, paramTypeArray, ParamType, Fragment, EventFragment, ConstructorFragment, FunctionFragment, ErrorFragment, regexIdentifier, regexParen;
var init_fragments = __esm({
  "node_modules/@ethersproject/abi/lib.esm/fragments.js"() {
    "use strict";
    init_lib3();
    init_lib4();
    init_lib();
    init_version5();
    logger4 = new Logger(version5);
    _constructorGuard2 = {};
    ModifiersBytes = { calldata: true, memory: true, storage: true };
    ModifiersNest = { calldata: true, memory: true };
    FormatTypes = Object.freeze({
      // Bare formatting, as is needed for computing a sighash of an event or function
      sighash: "sighash",
      // Human-Readable with Minimal spacing and without names (compact human-readable)
      minimal: "minimal",
      // Human-Readable with nice spacing, including all names
      full: "full",
      // JSON-format a la Solidity
      json: "json"
    });
    paramTypeArray = new RegExp(/^(.*)\[([0-9]*)\]$/);
    ParamType = class _ParamType {
      constructor(constructorGuard, params) {
        if (constructorGuard !== _constructorGuard2) {
          logger4.throwError("use fromString", Logger.errors.UNSUPPORTED_OPERATION, {
            operation: "new ParamType()"
          });
        }
        populate(this, params);
        let match = this.type.match(paramTypeArray);
        if (match) {
          populate(this, {
            arrayLength: parseInt(match[2] || "-1"),
            arrayChildren: _ParamType.fromObject({
              type: match[1],
              components: this.components
            }),
            baseType: "array"
          });
        } else {
          populate(this, {
            arrayLength: null,
            arrayChildren: null,
            baseType: this.components != null ? "tuple" : this.type
          });
        }
        this._isParamType = true;
        Object.freeze(this);
      }
      // Format the parameter fragment
      //   - sighash: "(uint256,address)"
      //   - minimal: "tuple(uint256,address) indexed"
      //   - full:    "tuple(uint256 foo, address bar) indexed baz"
      format(format) {
        if (!format) {
          format = FormatTypes.sighash;
        }
        if (!FormatTypes[format]) {
          logger4.throwArgumentError("invalid format type", "format", format);
        }
        if (format === FormatTypes.json) {
          let result2 = {
            type: this.baseType === "tuple" ? "tuple" : this.type,
            name: this.name || void 0
          };
          if (typeof this.indexed === "boolean") {
            result2.indexed = this.indexed;
          }
          if (this.components) {
            result2.components = this.components.map((comp) => JSON.parse(comp.format(format)));
          }
          return JSON.stringify(result2);
        }
        let result = "";
        if (this.baseType === "array") {
          result += this.arrayChildren.format(format);
          result += "[" + (this.arrayLength < 0 ? "" : String(this.arrayLength)) + "]";
        } else {
          if (this.baseType === "tuple") {
            if (format !== FormatTypes.sighash) {
              result += this.type;
            }
            result += "(" + this.components.map((comp) => comp.format(format)).join(format === FormatTypes.full ? ", " : ",") + ")";
          } else {
            result += this.type;
          }
        }
        if (format !== FormatTypes.sighash) {
          if (this.indexed === true) {
            result += " indexed";
          }
          if (format === FormatTypes.full && this.name) {
            result += " " + this.name;
          }
        }
        return result;
      }
      static from(value, allowIndexed) {
        if (typeof value === "string") {
          return _ParamType.fromString(value, allowIndexed);
        }
        return _ParamType.fromObject(value);
      }
      static fromObject(value) {
        if (_ParamType.isParamType(value)) {
          return value;
        }
        return new _ParamType(_constructorGuard2, {
          name: value.name || null,
          type: verifyType(value.type),
          indexed: value.indexed == null ? null : !!value.indexed,
          components: value.components ? value.components.map(_ParamType.fromObject) : null
        });
      }
      static fromString(value, allowIndexed) {
        function ParamTypify(node) {
          return _ParamType.fromObject({
            name: node.name,
            type: node.type,
            indexed: node.indexed,
            components: node.components
          });
        }
        return ParamTypify(parseParamType(value, !!allowIndexed));
      }
      static isParamType(value) {
        return !!(value != null && value._isParamType);
      }
    };
    Fragment = class _Fragment {
      constructor(constructorGuard, params) {
        if (constructorGuard !== _constructorGuard2) {
          logger4.throwError("use a static from method", Logger.errors.UNSUPPORTED_OPERATION, {
            operation: "new Fragment()"
          });
        }
        populate(this, params);
        this._isFragment = true;
        Object.freeze(this);
      }
      static from(value) {
        if (_Fragment.isFragment(value)) {
          return value;
        }
        if (typeof value === "string") {
          return _Fragment.fromString(value);
        }
        return _Fragment.fromObject(value);
      }
      static fromObject(value) {
        if (_Fragment.isFragment(value)) {
          return value;
        }
        switch (value.type) {
          case "function":
            return FunctionFragment.fromObject(value);
          case "event":
            return EventFragment.fromObject(value);
          case "constructor":
            return ConstructorFragment.fromObject(value);
          case "error":
            return ErrorFragment.fromObject(value);
          case "fallback":
          case "receive":
            return null;
        }
        return logger4.throwArgumentError("invalid fragment object", "value", value);
      }
      static fromString(value) {
        value = value.replace(/\s/g, " ");
        value = value.replace(/\(/g, " (").replace(/\)/g, ") ").replace(/\s+/g, " ");
        value = value.trim();
        if (value.split(" ")[0] === "event") {
          return EventFragment.fromString(value.substring(5).trim());
        } else if (value.split(" ")[0] === "function") {
          return FunctionFragment.fromString(value.substring(8).trim());
        } else if (value.split("(")[0].trim() === "constructor") {
          return ConstructorFragment.fromString(value.trim());
        } else if (value.split(" ")[0] === "error") {
          return ErrorFragment.fromString(value.substring(5).trim());
        }
        return logger4.throwArgumentError("unsupported fragment", "value", value);
      }
      static isFragment(value) {
        return !!(value && value._isFragment);
      }
    };
    EventFragment = class _EventFragment extends Fragment {
      format(format) {
        if (!format) {
          format = FormatTypes.sighash;
        }
        if (!FormatTypes[format]) {
          logger4.throwArgumentError("invalid format type", "format", format);
        }
        if (format === FormatTypes.json) {
          return JSON.stringify({
            type: "event",
            anonymous: this.anonymous,
            name: this.name,
            inputs: this.inputs.map((input) => JSON.parse(input.format(format)))
          });
        }
        let result = "";
        if (format !== FormatTypes.sighash) {
          result += "event ";
        }
        result += this.name + "(" + this.inputs.map((input) => input.format(format)).join(format === FormatTypes.full ? ", " : ",") + ") ";
        if (format !== FormatTypes.sighash) {
          if (this.anonymous) {
            result += "anonymous ";
          }
        }
        return result.trim();
      }
      static from(value) {
        if (typeof value === "string") {
          return _EventFragment.fromString(value);
        }
        return _EventFragment.fromObject(value);
      }
      static fromObject(value) {
        if (_EventFragment.isEventFragment(value)) {
          return value;
        }
        if (value.type !== "event") {
          logger4.throwArgumentError("invalid event object", "value", value);
        }
        const params = {
          name: verifyIdentifier(value.name),
          anonymous: value.anonymous,
          inputs: value.inputs ? value.inputs.map(ParamType.fromObject) : [],
          type: "event"
        };
        return new _EventFragment(_constructorGuard2, params);
      }
      static fromString(value) {
        let match = value.match(regexParen);
        if (!match) {
          logger4.throwArgumentError("invalid event string", "value", value);
        }
        let anonymous = false;
        match[3].split(" ").forEach((modifier) => {
          switch (modifier.trim()) {
            case "anonymous":
              anonymous = true;
              break;
            case "":
              break;
            default:
              logger4.warn("unknown modifier: " + modifier);
          }
        });
        return _EventFragment.fromObject({
          name: match[1].trim(),
          anonymous,
          inputs: parseParams(match[2], true),
          type: "event"
        });
      }
      static isEventFragment(value) {
        return value && value._isFragment && value.type === "event";
      }
    };
    ConstructorFragment = class _ConstructorFragment extends Fragment {
      format(format) {
        if (!format) {
          format = FormatTypes.sighash;
        }
        if (!FormatTypes[format]) {
          logger4.throwArgumentError("invalid format type", "format", format);
        }
        if (format === FormatTypes.json) {
          return JSON.stringify({
            type: "constructor",
            stateMutability: this.stateMutability !== "nonpayable" ? this.stateMutability : void 0,
            payable: this.payable,
            gas: this.gas ? this.gas.toNumber() : void 0,
            inputs: this.inputs.map((input) => JSON.parse(input.format(format)))
          });
        }
        if (format === FormatTypes.sighash) {
          logger4.throwError("cannot format a constructor for sighash", Logger.errors.UNSUPPORTED_OPERATION, {
            operation: "format(sighash)"
          });
        }
        let result = "constructor(" + this.inputs.map((input) => input.format(format)).join(format === FormatTypes.full ? ", " : ",") + ") ";
        if (this.stateMutability && this.stateMutability !== "nonpayable") {
          result += this.stateMutability + " ";
        }
        return result.trim();
      }
      static from(value) {
        if (typeof value === "string") {
          return _ConstructorFragment.fromString(value);
        }
        return _ConstructorFragment.fromObject(value);
      }
      static fromObject(value) {
        if (_ConstructorFragment.isConstructorFragment(value)) {
          return value;
        }
        if (value.type !== "constructor") {
          logger4.throwArgumentError("invalid constructor object", "value", value);
        }
        let state = verifyState(value);
        if (state.constant) {
          logger4.throwArgumentError("constructor cannot be constant", "value", value);
        }
        const params = {
          name: null,
          type: value.type,
          inputs: value.inputs ? value.inputs.map(ParamType.fromObject) : [],
          payable: state.payable,
          stateMutability: state.stateMutability,
          gas: value.gas ? BigNumber.from(value.gas) : null
        };
        return new _ConstructorFragment(_constructorGuard2, params);
      }
      static fromString(value) {
        let params = { type: "constructor" };
        value = parseGas(value, params);
        let parens = value.match(regexParen);
        if (!parens || parens[1].trim() !== "constructor") {
          logger4.throwArgumentError("invalid constructor string", "value", value);
        }
        params.inputs = parseParams(parens[2].trim(), false);
        parseModifiers(parens[3].trim(), params);
        return _ConstructorFragment.fromObject(params);
      }
      static isConstructorFragment(value) {
        return value && value._isFragment && value.type === "constructor";
      }
    };
    FunctionFragment = class _FunctionFragment extends ConstructorFragment {
      format(format) {
        if (!format) {
          format = FormatTypes.sighash;
        }
        if (!FormatTypes[format]) {
          logger4.throwArgumentError("invalid format type", "format", format);
        }
        if (format === FormatTypes.json) {
          return JSON.stringify({
            type: "function",
            name: this.name,
            constant: this.constant,
            stateMutability: this.stateMutability !== "nonpayable" ? this.stateMutability : void 0,
            payable: this.payable,
            gas: this.gas ? this.gas.toNumber() : void 0,
            inputs: this.inputs.map((input) => JSON.parse(input.format(format))),
            outputs: this.outputs.map((output2) => JSON.parse(output2.format(format)))
          });
        }
        let result = "";
        if (format !== FormatTypes.sighash) {
          result += "function ";
        }
        result += this.name + "(" + this.inputs.map((input) => input.format(format)).join(format === FormatTypes.full ? ", " : ",") + ") ";
        if (format !== FormatTypes.sighash) {
          if (this.stateMutability) {
            if (this.stateMutability !== "nonpayable") {
              result += this.stateMutability + " ";
            }
          } else if (this.constant) {
            result += "view ";
          }
          if (this.outputs && this.outputs.length) {
            result += "returns (" + this.outputs.map((output2) => output2.format(format)).join(", ") + ") ";
          }
          if (this.gas != null) {
            result += "@" + this.gas.toString() + " ";
          }
        }
        return result.trim();
      }
      static from(value) {
        if (typeof value === "string") {
          return _FunctionFragment.fromString(value);
        }
        return _FunctionFragment.fromObject(value);
      }
      static fromObject(value) {
        if (_FunctionFragment.isFunctionFragment(value)) {
          return value;
        }
        if (value.type !== "function") {
          logger4.throwArgumentError("invalid function object", "value", value);
        }
        let state = verifyState(value);
        const params = {
          type: value.type,
          name: verifyIdentifier(value.name),
          constant: state.constant,
          inputs: value.inputs ? value.inputs.map(ParamType.fromObject) : [],
          outputs: value.outputs ? value.outputs.map(ParamType.fromObject) : [],
          payable: state.payable,
          stateMutability: state.stateMutability,
          gas: value.gas ? BigNumber.from(value.gas) : null
        };
        return new _FunctionFragment(_constructorGuard2, params);
      }
      static fromString(value) {
        let params = { type: "function" };
        value = parseGas(value, params);
        let comps = value.split(" returns ");
        if (comps.length > 2) {
          logger4.throwArgumentError("invalid function string", "value", value);
        }
        let parens = comps[0].match(regexParen);
        if (!parens) {
          logger4.throwArgumentError("invalid function signature", "value", value);
        }
        params.name = parens[1].trim();
        if (params.name) {
          verifyIdentifier(params.name);
        }
        params.inputs = parseParams(parens[2], false);
        parseModifiers(parens[3].trim(), params);
        if (comps.length > 1) {
          let returns = comps[1].match(regexParen);
          if (returns[1].trim() != "" || returns[3].trim() != "") {
            logger4.throwArgumentError("unexpected tokens", "value", value);
          }
          params.outputs = parseParams(returns[2], false);
        } else {
          params.outputs = [];
        }
        return _FunctionFragment.fromObject(params);
      }
      static isFunctionFragment(value) {
        return value && value._isFragment && value.type === "function";
      }
    };
    ErrorFragment = class _ErrorFragment extends Fragment {
      format(format) {
        if (!format) {
          format = FormatTypes.sighash;
        }
        if (!FormatTypes[format]) {
          logger4.throwArgumentError("invalid format type", "format", format);
        }
        if (format === FormatTypes.json) {
          return JSON.stringify({
            type: "error",
            name: this.name,
            inputs: this.inputs.map((input) => JSON.parse(input.format(format)))
          });
        }
        let result = "";
        if (format !== FormatTypes.sighash) {
          result += "error ";
        }
        result += this.name + "(" + this.inputs.map((input) => input.format(format)).join(format === FormatTypes.full ? ", " : ",") + ") ";
        return result.trim();
      }
      static from(value) {
        if (typeof value === "string") {
          return _ErrorFragment.fromString(value);
        }
        return _ErrorFragment.fromObject(value);
      }
      static fromObject(value) {
        if (_ErrorFragment.isErrorFragment(value)) {
          return value;
        }
        if (value.type !== "error") {
          logger4.throwArgumentError("invalid error object", "value", value);
        }
        const params = {
          type: value.type,
          name: verifyIdentifier(value.name),
          inputs: value.inputs ? value.inputs.map(ParamType.fromObject) : []
        };
        return checkForbidden(new _ErrorFragment(_constructorGuard2, params));
      }
      static fromString(value) {
        let params = { type: "error" };
        let parens = value.match(regexParen);
        if (!parens) {
          logger4.throwArgumentError("invalid error signature", "value", value);
        }
        params.name = parens[1].trim();
        if (params.name) {
          verifyIdentifier(params.name);
        }
        params.inputs = parseParams(parens[2], false);
        return checkForbidden(_ErrorFragment.fromObject(params));
      }
      static isErrorFragment(value) {
        return value && value._isFragment && value.type === "error";
      }
    };
    regexIdentifier = new RegExp("^[a-zA-Z$_][a-zA-Z0-9$_]*$");
    regexParen = new RegExp("^([^)(]*)\\((.*)\\)([^)(]*)$");
  }
});

// node_modules/@ethersproject/abi/lib.esm/coders/abstract-coder.js
function checkResultErrors(result) {
  const errors = [];
  const checkErrors = function(path, object) {
    if (!Array.isArray(object)) {
      return;
    }
    for (let key in object) {
      const childPath = path.slice();
      childPath.push(key);
      try {
        checkErrors(childPath, object[key]);
      } catch (error) {
        errors.push({ path: childPath, error });
      }
    }
  };
  checkErrors([], result);
  return errors;
}
var logger5, Coder, Writer, Reader;
var init_abstract_coder = __esm({
  "node_modules/@ethersproject/abi/lib.esm/coders/abstract-coder.js"() {
    "use strict";
    init_lib2();
    init_lib3();
    init_lib4();
    init_lib();
    init_version5();
    logger5 = new Logger(version5);
    Coder = class {
      constructor(name, type, localName, dynamic) {
        this.name = name;
        this.type = type;
        this.localName = localName;
        this.dynamic = dynamic;
      }
      _throwError(message, value) {
        logger5.throwArgumentError(message, this.localName, value);
      }
    };
    Writer = class {
      constructor(wordSize) {
        defineReadOnly(this, "wordSize", wordSize || 32);
        this._data = [];
        this._dataLength = 0;
        this._padding = new Uint8Array(wordSize);
      }
      get data() {
        return hexConcat(this._data);
      }
      get length() {
        return this._dataLength;
      }
      _writeData(data) {
        this._data.push(data);
        this._dataLength += data.length;
        return data.length;
      }
      appendWriter(writer) {
        return this._writeData(concat(writer._data));
      }
      // Arrayish items; padded on the right to wordSize
      writeBytes(value) {
        let bytes2 = arrayify(value);
        const paddingOffset = bytes2.length % this.wordSize;
        if (paddingOffset) {
          bytes2 = concat([bytes2, this._padding.slice(paddingOffset)]);
        }
        return this._writeData(bytes2);
      }
      _getValue(value) {
        let bytes2 = arrayify(BigNumber.from(value));
        if (bytes2.length > this.wordSize) {
          logger5.throwError("value out-of-bounds", Logger.errors.BUFFER_OVERRUN, {
            length: this.wordSize,
            offset: bytes2.length
          });
        }
        if (bytes2.length % this.wordSize) {
          bytes2 = concat([this._padding.slice(bytes2.length % this.wordSize), bytes2]);
        }
        return bytes2;
      }
      // BigNumberish items; padded on the left to wordSize
      writeValue(value) {
        return this._writeData(this._getValue(value));
      }
      writeUpdatableValue() {
        const offset = this._data.length;
        this._data.push(this._padding);
        this._dataLength += this.wordSize;
        return (value) => {
          this._data[offset] = this._getValue(value);
        };
      }
    };
    Reader = class _Reader {
      constructor(data, wordSize, coerceFunc, allowLoose) {
        defineReadOnly(this, "_data", arrayify(data));
        defineReadOnly(this, "wordSize", wordSize || 32);
        defineReadOnly(this, "_coerceFunc", coerceFunc);
        defineReadOnly(this, "allowLoose", allowLoose);
        this._offset = 0;
      }
      get data() {
        return hexlify(this._data);
      }
      get consumed() {
        return this._offset;
      }
      // The default Coerce function
      static coerce(name, value) {
        let match = name.match("^u?int([0-9]+)$");
        if (match && parseInt(match[1]) <= 48) {
          value = value.toNumber();
        }
        return value;
      }
      coerce(name, value) {
        if (this._coerceFunc) {
          return this._coerceFunc(name, value);
        }
        return _Reader.coerce(name, value);
      }
      _peekBytes(offset, length, loose) {
        let alignedLength = Math.ceil(length / this.wordSize) * this.wordSize;
        if (this._offset + alignedLength > this._data.length) {
          if (this.allowLoose && loose && this._offset + length <= this._data.length) {
            alignedLength = length;
          } else {
            logger5.throwError("data out-of-bounds", Logger.errors.BUFFER_OVERRUN, {
              length: this._data.length,
              offset: this._offset + alignedLength
            });
          }
        }
        return this._data.slice(this._offset, this._offset + alignedLength);
      }
      subReader(offset) {
        return new _Reader(this._data.slice(this._offset + offset), this.wordSize, this._coerceFunc, this.allowLoose);
      }
      readBytes(length, loose) {
        let bytes2 = this._peekBytes(0, length, !!loose);
        this._offset += bytes2.length;
        return bytes2.slice(0, length);
      }
      readValue() {
        return BigNumber.from(this.readBytes(this.wordSize));
      }
    };
  }
});

// node_modules/@ethersproject/keccak256/lib.esm/index.js
function keccak256(data) {
  return "0x" + import_js_sha3.default.keccak_256(arrayify(data));
}
var import_js_sha3;
var init_lib5 = __esm({
  "node_modules/@ethersproject/keccak256/lib.esm/index.js"() {
    "use strict";
    import_js_sha3 = __toESM(require_sha32());
    init_lib2();
  }
});

// node_modules/@ethersproject/address/lib.esm/_version.js
var version6;
var init_version6 = __esm({
  "node_modules/@ethersproject/address/lib.esm/_version.js"() {
    version6 = "address/5.7.0";
  }
});

// node_modules/@ethersproject/address/lib.esm/index.js
function getChecksumAddress(address) {
  if (!isHexString(address, 20)) {
    logger6.throwArgumentError("invalid address", "address", address);
  }
  address = address.toLowerCase();
  const chars = address.substring(2).split("");
  const expanded = new Uint8Array(40);
  for (let i = 0; i < 40; i++) {
    expanded[i] = chars[i].charCodeAt(0);
  }
  const hashed = arrayify(keccak256(expanded));
  for (let i = 0; i < 40; i += 2) {
    if (hashed[i >> 1] >> 4 >= 8) {
      chars[i] = chars[i].toUpperCase();
    }
    if ((hashed[i >> 1] & 15) >= 8) {
      chars[i + 1] = chars[i + 1].toUpperCase();
    }
  }
  return "0x" + chars.join("");
}
function log10(x) {
  if (Math.log10) {
    return Math.log10(x);
  }
  return Math.log(x) / Math.LN10;
}
function ibanChecksum(address) {
  address = address.toUpperCase();
  address = address.substring(4) + address.substring(0, 2) + "00";
  let expanded = address.split("").map((c) => {
    return ibanLookup[c];
  }).join("");
  while (expanded.length >= safeDigits) {
    let block = expanded.substring(0, safeDigits);
    expanded = parseInt(block, 10) % 97 + expanded.substring(block.length);
  }
  let checksum = String(98 - parseInt(expanded, 10) % 97);
  while (checksum.length < 2) {
    checksum = "0" + checksum;
  }
  return checksum;
}
function getAddress(address) {
  let result = null;
  if (typeof address !== "string") {
    logger6.throwArgumentError("invalid address", "address", address);
  }
  if (address.match(/^(0x)?[0-9a-fA-F]{40}$/)) {
    if (address.substring(0, 2) !== "0x") {
      address = "0x" + address;
    }
    result = getChecksumAddress(address);
    if (address.match(/([A-F].*[a-f])|([a-f].*[A-F])/) && result !== address) {
      logger6.throwArgumentError("bad address checksum", "address", address);
    }
  } else if (address.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/)) {
    if (address.substring(2, 4) !== ibanChecksum(address)) {
      logger6.throwArgumentError("bad icap checksum", "address", address);
    }
    result = _base36To16(address.substring(4));
    while (result.length < 40) {
      result = "0" + result;
    }
    result = getChecksumAddress("0x" + result);
  } else {
    logger6.throwArgumentError("invalid address", "address", address);
  }
  return result;
}
var logger6, MAX_SAFE_INTEGER, ibanLookup, safeDigits;
var init_lib6 = __esm({
  "node_modules/@ethersproject/address/lib.esm/index.js"() {
    "use strict";
    init_lib2();
    init_lib3();
    init_lib5();
    init_lib();
    init_version6();
    logger6 = new Logger(version6);
    MAX_SAFE_INTEGER = 9007199254740991;
    ibanLookup = {};
    for (let i = 0; i < 10; i++) {
      ibanLookup[String(i)] = String(i);
    }
    for (let i = 0; i < 26; i++) {
      ibanLookup[String.fromCharCode(65 + i)] = String(10 + i);
    }
    safeDigits = Math.floor(log10(MAX_SAFE_INTEGER));
  }
});

// node_modules/@ethersproject/abi/lib.esm/coders/address.js
var AddressCoder;
var init_address = __esm({
  "node_modules/@ethersproject/abi/lib.esm/coders/address.js"() {
    "use strict";
    init_lib6();
    init_lib2();
    init_abstract_coder();
    AddressCoder = class extends Coder {
      constructor(localName) {
        super("address", "address", localName, false);
      }
      defaultValue() {
        return "0x0000000000000000000000000000000000000000";
      }
      encode(writer, value) {
        try {
          value = getAddress(value);
        } catch (error) {
          this._throwError(error.message, value);
        }
        return writer.writeValue(value);
      }
      decode(reader) {
        return getAddress(hexZeroPad(reader.readValue().toHexString(), 20));
      }
    };
  }
});

// node_modules/@ethersproject/abi/lib.esm/coders/anonymous.js
var AnonymousCoder;
var init_anonymous = __esm({
  "node_modules/@ethersproject/abi/lib.esm/coders/anonymous.js"() {
    "use strict";
    init_abstract_coder();
    AnonymousCoder = class extends Coder {
      constructor(coder) {
        super(coder.name, coder.type, void 0, coder.dynamic);
        this.coder = coder;
      }
      defaultValue() {
        return this.coder.defaultValue();
      }
      encode(writer, value) {
        return this.coder.encode(writer, value);
      }
      decode(reader) {
        return this.coder.decode(reader);
      }
    };
  }
});

// node_modules/@ethersproject/abi/lib.esm/coders/array.js
function pack(writer, coders, values) {
  let arrayValues = null;
  if (Array.isArray(values)) {
    arrayValues = values;
  } else if (values && typeof values === "object") {
    let unique = {};
    arrayValues = coders.map((coder) => {
      const name = coder.localName;
      if (!name) {
        logger7.throwError("cannot encode object for signature with missing names", Logger.errors.INVALID_ARGUMENT, {
          argument: "values",
          coder,
          value: values
        });
      }
      if (unique[name]) {
        logger7.throwError("cannot encode object for signature with duplicate names", Logger.errors.INVALID_ARGUMENT, {
          argument: "values",
          coder,
          value: values
        });
      }
      unique[name] = true;
      return values[name];
    });
  } else {
    logger7.throwArgumentError("invalid tuple value", "tuple", values);
  }
  if (coders.length !== arrayValues.length) {
    logger7.throwArgumentError("types/value length mismatch", "tuple", values);
  }
  let staticWriter = new Writer(writer.wordSize);
  let dynamicWriter = new Writer(writer.wordSize);
  let updateFuncs = [];
  coders.forEach((coder, index) => {
    let value = arrayValues[index];
    if (coder.dynamic) {
      let dynamicOffset = dynamicWriter.length;
      coder.encode(dynamicWriter, value);
      let updateFunc = staticWriter.writeUpdatableValue();
      updateFuncs.push((baseOffset) => {
        updateFunc(baseOffset + dynamicOffset);
      });
    } else {
      coder.encode(staticWriter, value);
    }
  });
  updateFuncs.forEach((func) => {
    func(staticWriter.length);
  });
  let length = writer.appendWriter(staticWriter);
  length += writer.appendWriter(dynamicWriter);
  return length;
}
function unpack(reader, coders) {
  let values = [];
  let baseReader = reader.subReader(0);
  coders.forEach((coder) => {
    let value = null;
    if (coder.dynamic) {
      let offset = reader.readValue();
      let offsetReader = baseReader.subReader(offset.toNumber());
      try {
        value = coder.decode(offsetReader);
      } catch (error) {
        if (error.code === Logger.errors.BUFFER_OVERRUN) {
          throw error;
        }
        value = error;
        value.baseType = coder.name;
        value.name = coder.localName;
        value.type = coder.type;
      }
    } else {
      try {
        value = coder.decode(reader);
      } catch (error) {
        if (error.code === Logger.errors.BUFFER_OVERRUN) {
          throw error;
        }
        value = error;
        value.baseType = coder.name;
        value.name = coder.localName;
        value.type = coder.type;
      }
    }
    if (value != void 0) {
      values.push(value);
    }
  });
  const uniqueNames = coders.reduce((accum, coder) => {
    const name = coder.localName;
    if (name) {
      if (!accum[name]) {
        accum[name] = 0;
      }
      accum[name]++;
    }
    return accum;
  }, {});
  coders.forEach((coder, index) => {
    let name = coder.localName;
    if (!name || uniqueNames[name] !== 1) {
      return;
    }
    if (name === "length") {
      name = "_length";
    }
    if (values[name] != null) {
      return;
    }
    const value = values[index];
    if (value instanceof Error) {
      Object.defineProperty(values, name, {
        enumerable: true,
        get: () => {
          throw value;
        }
      });
    } else {
      values[name] = value;
    }
  });
  for (let i = 0; i < values.length; i++) {
    const value = values[i];
    if (value instanceof Error) {
      Object.defineProperty(values, i, {
        enumerable: true,
        get: () => {
          throw value;
        }
      });
    }
  }
  return Object.freeze(values);
}
var logger7, ArrayCoder;
var init_array = __esm({
  "node_modules/@ethersproject/abi/lib.esm/coders/array.js"() {
    "use strict";
    init_lib();
    init_version5();
    init_abstract_coder();
    init_anonymous();
    logger7 = new Logger(version5);
    ArrayCoder = class extends Coder {
      constructor(coder, length, localName) {
        const type = coder.type + "[" + (length >= 0 ? length : "") + "]";
        const dynamic = length === -1 || coder.dynamic;
        super("array", type, localName, dynamic);
        this.coder = coder;
        this.length = length;
      }
      defaultValue() {
        const defaultChild = this.coder.defaultValue();
        const result = [];
        for (let i = 0; i < this.length; i++) {
          result.push(defaultChild);
        }
        return result;
      }
      encode(writer, value) {
        if (!Array.isArray(value)) {
          this._throwError("expected array value", value);
        }
        let count = this.length;
        if (count === -1) {
          count = value.length;
          writer.writeValue(value.length);
        }
        logger7.checkArgumentCount(value.length, count, "coder array" + (this.localName ? " " + this.localName : ""));
        let coders = [];
        for (let i = 0; i < value.length; i++) {
          coders.push(this.coder);
        }
        return pack(writer, coders, value);
      }
      decode(reader) {
        let count = this.length;
        if (count === -1) {
          count = reader.readValue().toNumber();
          if (count * 32 > reader._data.length) {
            logger7.throwError("insufficient data length", Logger.errors.BUFFER_OVERRUN, {
              length: reader._data.length,
              count
            });
          }
        }
        let coders = [];
        for (let i = 0; i < count; i++) {
          coders.push(new AnonymousCoder(this.coder));
        }
        return reader.coerce(this.name, unpack(reader, coders));
      }
    };
  }
});

// node_modules/@ethersproject/abi/lib.esm/coders/boolean.js
var BooleanCoder;
var init_boolean = __esm({
  "node_modules/@ethersproject/abi/lib.esm/coders/boolean.js"() {
    "use strict";
    init_abstract_coder();
    BooleanCoder = class extends Coder {
      constructor(localName) {
        super("bool", "bool", localName, false);
      }
      defaultValue() {
        return false;
      }
      encode(writer, value) {
        return writer.writeValue(value ? 1 : 0);
      }
      decode(reader) {
        return reader.coerce(this.type, !reader.readValue().isZero());
      }
    };
  }
});

// node_modules/@ethersproject/abi/lib.esm/coders/bytes.js
var DynamicBytesCoder, BytesCoder;
var init_bytes = __esm({
  "node_modules/@ethersproject/abi/lib.esm/coders/bytes.js"() {
    "use strict";
    init_lib2();
    init_abstract_coder();
    DynamicBytesCoder = class extends Coder {
      constructor(type, localName) {
        super(type, type, localName, true);
      }
      defaultValue() {
        return "0x";
      }
      encode(writer, value) {
        value = arrayify(value);
        let length = writer.writeValue(value.length);
        length += writer.writeBytes(value);
        return length;
      }
      decode(reader) {
        return reader.readBytes(reader.readValue().toNumber(), true);
      }
    };
    BytesCoder = class extends DynamicBytesCoder {
      constructor(localName) {
        super("bytes", localName);
      }
      decode(reader) {
        return reader.coerce(this.name, hexlify(super.decode(reader)));
      }
    };
  }
});

// node_modules/@ethersproject/abi/lib.esm/coders/fixed-bytes.js
var FixedBytesCoder;
var init_fixed_bytes = __esm({
  "node_modules/@ethersproject/abi/lib.esm/coders/fixed-bytes.js"() {
    "use strict";
    init_lib2();
    init_abstract_coder();
    FixedBytesCoder = class extends Coder {
      constructor(size, localName) {
        let name = "bytes" + String(size);
        super(name, name, localName, false);
        this.size = size;
      }
      defaultValue() {
        return "0x0000000000000000000000000000000000000000000000000000000000000000".substring(0, 2 + this.size * 2);
      }
      encode(writer, value) {
        let data = arrayify(value);
        if (data.length !== this.size) {
          this._throwError("incorrect data length", value);
        }
        return writer.writeBytes(data);
      }
      decode(reader) {
        return reader.coerce(this.name, hexlify(reader.readBytes(this.size)));
      }
    };
  }
});

// node_modules/@ethersproject/abi/lib.esm/coders/null.js
var NullCoder;
var init_null = __esm({
  "node_modules/@ethersproject/abi/lib.esm/coders/null.js"() {
    "use strict";
    init_abstract_coder();
    NullCoder = class extends Coder {
      constructor(localName) {
        super("null", "", localName, false);
      }
      defaultValue() {
        return null;
      }
      encode(writer, value) {
        if (value != null) {
          this._throwError("not null", value);
        }
        return writer.writeBytes([]);
      }
      decode(reader) {
        reader.readBytes(0);
        return reader.coerce(this.name, null);
      }
    };
  }
});

// node_modules/@ethersproject/constants/lib.esm/bignumbers.js
var NegativeOne, Zero, One, MaxUint256;
var init_bignumbers = __esm({
  "node_modules/@ethersproject/constants/lib.esm/bignumbers.js"() {
    init_lib3();
    NegativeOne = /* @__PURE__ */ BigNumber.from(-1);
    Zero = /* @__PURE__ */ BigNumber.from(0);
    One = /* @__PURE__ */ BigNumber.from(1);
    MaxUint256 = /* @__PURE__ */ BigNumber.from("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
  }
});

// node_modules/@ethersproject/constants/lib.esm/index.js
var init_lib7 = __esm({
  "node_modules/@ethersproject/constants/lib.esm/index.js"() {
    "use strict";
    init_bignumbers();
  }
});

// node_modules/@ethersproject/abi/lib.esm/coders/number.js
var NumberCoder;
var init_number = __esm({
  "node_modules/@ethersproject/abi/lib.esm/coders/number.js"() {
    "use strict";
    init_lib3();
    init_lib7();
    init_abstract_coder();
    NumberCoder = class extends Coder {
      constructor(size, signed, localName) {
        const name = (signed ? "int" : "uint") + size * 8;
        super(name, name, localName, false);
        this.size = size;
        this.signed = signed;
      }
      defaultValue() {
        return 0;
      }
      encode(writer, value) {
        let v = BigNumber.from(value);
        let maxUintValue = MaxUint256.mask(writer.wordSize * 8);
        if (this.signed) {
          let bounds = maxUintValue.mask(this.size * 8 - 1);
          if (v.gt(bounds) || v.lt(bounds.add(One).mul(NegativeOne))) {
            this._throwError("value out-of-bounds", value);
          }
        } else if (v.lt(Zero) || v.gt(maxUintValue.mask(this.size * 8))) {
          this._throwError("value out-of-bounds", value);
        }
        v = v.toTwos(this.size * 8).mask(this.size * 8);
        if (this.signed) {
          v = v.fromTwos(this.size * 8).toTwos(8 * writer.wordSize);
        }
        return writer.writeValue(v);
      }
      decode(reader) {
        let value = reader.readValue().mask(this.size * 8);
        if (this.signed) {
          value = value.fromTwos(this.size * 8);
        }
        return reader.coerce(this.name, value);
      }
    };
  }
});

// node_modules/@ethersproject/strings/lib.esm/_version.js
var version7;
var init_version7 = __esm({
  "node_modules/@ethersproject/strings/lib.esm/_version.js"() {
    version7 = "strings/5.7.0";
  }
});

// node_modules/@ethersproject/strings/lib.esm/utf8.js
function errorFunc(reason, offset, bytes2, output2, badCodepoint) {
  return logger8.throwArgumentError(`invalid codepoint at offset ${offset}; ${reason}`, "bytes", bytes2);
}
function ignoreFunc(reason, offset, bytes2, output2, badCodepoint) {
  if (reason === Utf8ErrorReason.BAD_PREFIX || reason === Utf8ErrorReason.UNEXPECTED_CONTINUE) {
    let i = 0;
    for (let o = offset + 1; o < bytes2.length; o++) {
      if (bytes2[o] >> 6 !== 2) {
        break;
      }
      i++;
    }
    return i;
  }
  if (reason === Utf8ErrorReason.OVERRUN) {
    return bytes2.length - offset - 1;
  }
  return 0;
}
function replaceFunc(reason, offset, bytes2, output2, badCodepoint) {
  if (reason === Utf8ErrorReason.OVERLONG) {
    output2.push(badCodepoint);
    return 0;
  }
  output2.push(65533);
  return ignoreFunc(reason, offset, bytes2, output2, badCodepoint);
}
function getUtf8CodePoints(bytes2, onError) {
  if (onError == null) {
    onError = Utf8ErrorFuncs.error;
  }
  bytes2 = arrayify(bytes2);
  const result = [];
  let i = 0;
  while (i < bytes2.length) {
    const c = bytes2[i++];
    if (c >> 7 === 0) {
      result.push(c);
      continue;
    }
    let extraLength = null;
    let overlongMask = null;
    if ((c & 224) === 192) {
      extraLength = 1;
      overlongMask = 127;
    } else if ((c & 240) === 224) {
      extraLength = 2;
      overlongMask = 2047;
    } else if ((c & 248) === 240) {
      extraLength = 3;
      overlongMask = 65535;
    } else {
      if ((c & 192) === 128) {
        i += onError(Utf8ErrorReason.UNEXPECTED_CONTINUE, i - 1, bytes2, result);
      } else {
        i += onError(Utf8ErrorReason.BAD_PREFIX, i - 1, bytes2, result);
      }
      continue;
    }
    if (i - 1 + extraLength >= bytes2.length) {
      i += onError(Utf8ErrorReason.OVERRUN, i - 1, bytes2, result);
      continue;
    }
    let res = c & (1 << 8 - extraLength - 1) - 1;
    for (let j = 0; j < extraLength; j++) {
      let nextChar = bytes2[i];
      if ((nextChar & 192) != 128) {
        i += onError(Utf8ErrorReason.MISSING_CONTINUE, i, bytes2, result);
        res = null;
        break;
      }
      ;
      res = res << 6 | nextChar & 63;
      i++;
    }
    if (res === null) {
      continue;
    }
    if (res > 1114111) {
      i += onError(Utf8ErrorReason.OUT_OF_RANGE, i - 1 - extraLength, bytes2, result, res);
      continue;
    }
    if (res >= 55296 && res <= 57343) {
      i += onError(Utf8ErrorReason.UTF16_SURROGATE, i - 1 - extraLength, bytes2, result, res);
      continue;
    }
    if (res <= overlongMask) {
      i += onError(Utf8ErrorReason.OVERLONG, i - 1 - extraLength, bytes2, result, res);
      continue;
    }
    result.push(res);
  }
  return result;
}
function toUtf8Bytes(str, form = UnicodeNormalizationForm.current) {
  if (form != UnicodeNormalizationForm.current) {
    logger8.checkNormalize();
    str = str.normalize(form);
  }
  let result = [];
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    if (c < 128) {
      result.push(c);
    } else if (c < 2048) {
      result.push(c >> 6 | 192);
      result.push(c & 63 | 128);
    } else if ((c & 64512) == 55296) {
      i++;
      const c2 = str.charCodeAt(i);
      if (i >= str.length || (c2 & 64512) !== 56320) {
        throw new Error("invalid utf-8 string");
      }
      const pair = 65536 + ((c & 1023) << 10) + (c2 & 1023);
      result.push(pair >> 18 | 240);
      result.push(pair >> 12 & 63 | 128);
      result.push(pair >> 6 & 63 | 128);
      result.push(pair & 63 | 128);
    } else {
      result.push(c >> 12 | 224);
      result.push(c >> 6 & 63 | 128);
      result.push(c & 63 | 128);
    }
  }
  return arrayify(result);
}
function _toUtf8String(codePoints) {
  return codePoints.map((codePoint) => {
    if (codePoint <= 65535) {
      return String.fromCharCode(codePoint);
    }
    codePoint -= 65536;
    return String.fromCharCode((codePoint >> 10 & 1023) + 55296, (codePoint & 1023) + 56320);
  }).join("");
}
function toUtf8String(bytes2, onError) {
  return _toUtf8String(getUtf8CodePoints(bytes2, onError));
}
var logger8, UnicodeNormalizationForm, Utf8ErrorReason, Utf8ErrorFuncs;
var init_utf8 = __esm({
  "node_modules/@ethersproject/strings/lib.esm/utf8.js"() {
    "use strict";
    init_lib2();
    init_lib();
    init_version7();
    logger8 = new Logger(version7);
    (function(UnicodeNormalizationForm2) {
      UnicodeNormalizationForm2["current"] = "";
      UnicodeNormalizationForm2["NFC"] = "NFC";
      UnicodeNormalizationForm2["NFD"] = "NFD";
      UnicodeNormalizationForm2["NFKC"] = "NFKC";
      UnicodeNormalizationForm2["NFKD"] = "NFKD";
    })(UnicodeNormalizationForm || (UnicodeNormalizationForm = {}));
    (function(Utf8ErrorReason2) {
      Utf8ErrorReason2["UNEXPECTED_CONTINUE"] = "unexpected continuation byte";
      Utf8ErrorReason2["BAD_PREFIX"] = "bad codepoint prefix";
      Utf8ErrorReason2["OVERRUN"] = "string overrun";
      Utf8ErrorReason2["MISSING_CONTINUE"] = "missing continuation byte";
      Utf8ErrorReason2["OUT_OF_RANGE"] = "out of UTF-8 range";
      Utf8ErrorReason2["UTF16_SURROGATE"] = "UTF-16 surrogate";
      Utf8ErrorReason2["OVERLONG"] = "overlong representation";
    })(Utf8ErrorReason || (Utf8ErrorReason = {}));
    Utf8ErrorFuncs = Object.freeze({
      error: errorFunc,
      ignore: ignoreFunc,
      replace: replaceFunc
    });
  }
});

// node_modules/@ethersproject/strings/lib.esm/index.js
var init_lib8 = __esm({
  "node_modules/@ethersproject/strings/lib.esm/index.js"() {
    "use strict";
    init_utf8();
  }
});

// node_modules/@ethersproject/abi/lib.esm/coders/string.js
var StringCoder;
var init_string = __esm({
  "node_modules/@ethersproject/abi/lib.esm/coders/string.js"() {
    "use strict";
    init_lib8();
    init_bytes();
    StringCoder = class extends DynamicBytesCoder {
      constructor(localName) {
        super("string", localName);
      }
      defaultValue() {
        return "";
      }
      encode(writer, value) {
        return super.encode(writer, toUtf8Bytes(value));
      }
      decode(reader) {
        return toUtf8String(super.decode(reader));
      }
    };
  }
});

// node_modules/@ethersproject/abi/lib.esm/coders/tuple.js
var TupleCoder;
var init_tuple = __esm({
  "node_modules/@ethersproject/abi/lib.esm/coders/tuple.js"() {
    "use strict";
    init_abstract_coder();
    init_array();
    TupleCoder = class extends Coder {
      constructor(coders, localName) {
        let dynamic = false;
        const types = [];
        coders.forEach((coder) => {
          if (coder.dynamic) {
            dynamic = true;
          }
          types.push(coder.type);
        });
        const type = "tuple(" + types.join(",") + ")";
        super("tuple", type, localName, dynamic);
        this.coders = coders;
      }
      defaultValue() {
        const values = [];
        this.coders.forEach((coder) => {
          values.push(coder.defaultValue());
        });
        const uniqueNames = this.coders.reduce((accum, coder) => {
          const name = coder.localName;
          if (name) {
            if (!accum[name]) {
              accum[name] = 0;
            }
            accum[name]++;
          }
          return accum;
        }, {});
        this.coders.forEach((coder, index) => {
          let name = coder.localName;
          if (!name || uniqueNames[name] !== 1) {
            return;
          }
          if (name === "length") {
            name = "_length";
          }
          if (values[name] != null) {
            return;
          }
          values[name] = values[index];
        });
        return Object.freeze(values);
      }
      encode(writer, value) {
        return pack(writer, this.coders, value);
      }
      decode(reader) {
        return reader.coerce(this.name, unpack(reader, this.coders));
      }
    };
  }
});

// node_modules/@ethersproject/abi/lib.esm/abi-coder.js
var logger9, paramTypeBytes, paramTypeNumber, AbiCoder, defaultAbiCoder;
var init_abi_coder = __esm({
  "node_modules/@ethersproject/abi/lib.esm/abi-coder.js"() {
    "use strict";
    init_lib2();
    init_lib4();
    init_lib();
    init_version5();
    init_abstract_coder();
    init_address();
    init_array();
    init_boolean();
    init_bytes();
    init_fixed_bytes();
    init_null();
    init_number();
    init_string();
    init_tuple();
    init_fragments();
    logger9 = new Logger(version5);
    paramTypeBytes = new RegExp(/^bytes([0-9]*)$/);
    paramTypeNumber = new RegExp(/^(u?int)([0-9]*)$/);
    AbiCoder = class {
      constructor(coerceFunc) {
        defineReadOnly(this, "coerceFunc", coerceFunc || null);
      }
      _getCoder(param) {
        switch (param.baseType) {
          case "address":
            return new AddressCoder(param.name);
          case "bool":
            return new BooleanCoder(param.name);
          case "string":
            return new StringCoder(param.name);
          case "bytes":
            return new BytesCoder(param.name);
          case "array":
            return new ArrayCoder(this._getCoder(param.arrayChildren), param.arrayLength, param.name);
          case "tuple":
            return new TupleCoder((param.components || []).map((component) => {
              return this._getCoder(component);
            }), param.name);
          case "":
            return new NullCoder(param.name);
        }
        let match = param.type.match(paramTypeNumber);
        if (match) {
          let size = parseInt(match[2] || "256");
          if (size === 0 || size > 256 || size % 8 !== 0) {
            logger9.throwArgumentError("invalid " + match[1] + " bit length", "param", param);
          }
          return new NumberCoder(size / 8, match[1] === "int", param.name);
        }
        match = param.type.match(paramTypeBytes);
        if (match) {
          let size = parseInt(match[1]);
          if (size === 0 || size > 32) {
            logger9.throwArgumentError("invalid bytes length", "param", param);
          }
          return new FixedBytesCoder(size, param.name);
        }
        return logger9.throwArgumentError("invalid type", "type", param.type);
      }
      _getWordSize() {
        return 32;
      }
      _getReader(data, allowLoose) {
        return new Reader(data, this._getWordSize(), this.coerceFunc, allowLoose);
      }
      _getWriter() {
        return new Writer(this._getWordSize());
      }
      getDefaultValue(types) {
        const coders = types.map((type) => this._getCoder(ParamType.from(type)));
        const coder = new TupleCoder(coders, "_");
        return coder.defaultValue();
      }
      encode(types, values) {
        if (types.length !== values.length) {
          logger9.throwError("types/values length mismatch", Logger.errors.INVALID_ARGUMENT, {
            count: { types: types.length, values: values.length },
            value: { types, values }
          });
        }
        const coders = types.map((type) => this._getCoder(ParamType.from(type)));
        const coder = new TupleCoder(coders, "_");
        const writer = this._getWriter();
        coder.encode(writer, values);
        return writer.data;
      }
      decode(types, data, loose) {
        const coders = types.map((type) => this._getCoder(ParamType.from(type)));
        const coder = new TupleCoder(coders, "_");
        return coder.decode(this._getReader(arrayify(data), loose));
      }
    };
    defaultAbiCoder = new AbiCoder();
  }
});

// node_modules/@ethersproject/hash/lib.esm/id.js
function id(text) {
  return keccak256(toUtf8Bytes(text));
}
var init_id = __esm({
  "node_modules/@ethersproject/hash/lib.esm/id.js"() {
    init_lib5();
    init_lib8();
  }
});

// node_modules/@ethersproject/hash/lib.esm/index.js
var init_lib9 = __esm({
  "node_modules/@ethersproject/hash/lib.esm/index.js"() {
    "use strict";
    init_id();
  }
});

// node_modules/@ethersproject/abi/lib.esm/interface.js
function wrapAccessError(property, error) {
  const wrap = new Error(`deferred error during ABI decoding triggered accessing ${property}`);
  wrap.error = error;
  return wrap;
}
var logger10, LogDescription, TransactionDescription, ErrorDescription, Indexed, BuiltinErrors, Interface;
var init_interface = __esm({
  "node_modules/@ethersproject/abi/lib.esm/interface.js"() {
    "use strict";
    init_lib6();
    init_lib3();
    init_lib2();
    init_lib9();
    init_lib5();
    init_lib4();
    init_abi_coder();
    init_abstract_coder();
    init_fragments();
    init_lib();
    init_version5();
    logger10 = new Logger(version5);
    LogDescription = class extends Description {
    };
    TransactionDescription = class extends Description {
    };
    ErrorDescription = class extends Description {
    };
    Indexed = class extends Description {
      static isIndexed(value) {
        return !!(value && value._isIndexed);
      }
    };
    BuiltinErrors = {
      "0x08c379a0": { signature: "Error(string)", name: "Error", inputs: ["string"], reason: true },
      "0x4e487b71": { signature: "Panic(uint256)", name: "Panic", inputs: ["uint256"] }
    };
    Interface = class {
      constructor(fragments) {
        let abi = [];
        if (typeof fragments === "string") {
          abi = JSON.parse(fragments);
        } else {
          abi = fragments;
        }
        defineReadOnly(this, "fragments", abi.map((fragment) => {
          return Fragment.from(fragment);
        }).filter((fragment) => fragment != null));
        defineReadOnly(this, "_abiCoder", getStatic(new.target, "getAbiCoder")());
        defineReadOnly(this, "functions", {});
        defineReadOnly(this, "errors", {});
        defineReadOnly(this, "events", {});
        defineReadOnly(this, "structs", {});
        this.fragments.forEach((fragment) => {
          let bucket = null;
          switch (fragment.type) {
            case "constructor":
              if (this.deploy) {
                logger10.warn("duplicate definition - constructor");
                return;
              }
              defineReadOnly(this, "deploy", fragment);
              return;
            case "function":
              bucket = this.functions;
              break;
            case "event":
              bucket = this.events;
              break;
            case "error":
              bucket = this.errors;
              break;
            default:
              return;
          }
          let signature = fragment.format();
          if (bucket[signature]) {
            logger10.warn("duplicate definition - " + signature);
            return;
          }
          bucket[signature] = fragment;
        });
        if (!this.deploy) {
          defineReadOnly(this, "deploy", ConstructorFragment.from({
            payable: false,
            type: "constructor"
          }));
        }
        defineReadOnly(this, "_isInterface", true);
      }
      format(format) {
        if (!format) {
          format = FormatTypes.full;
        }
        if (format === FormatTypes.sighash) {
          logger10.throwArgumentError("interface does not support formatting sighash", "format", format);
        }
        const abi = this.fragments.map((fragment) => fragment.format(format));
        if (format === FormatTypes.json) {
          return JSON.stringify(abi.map((j) => JSON.parse(j)));
        }
        return abi;
      }
      // Sub-classes can override these to handle other blockchains
      static getAbiCoder() {
        return defaultAbiCoder;
      }
      static getAddress(address) {
        return getAddress(address);
      }
      static getSighash(fragment) {
        return hexDataSlice(id(fragment.format()), 0, 4);
      }
      static getEventTopic(eventFragment) {
        return id(eventFragment.format());
      }
      // Find a function definition by any means necessary (unless it is ambiguous)
      getFunction(nameOrSignatureOrSighash) {
        if (isHexString(nameOrSignatureOrSighash)) {
          for (const name in this.functions) {
            if (nameOrSignatureOrSighash === this.getSighash(name)) {
              return this.functions[name];
            }
          }
          logger10.throwArgumentError("no matching function", "sighash", nameOrSignatureOrSighash);
        }
        if (nameOrSignatureOrSighash.indexOf("(") === -1) {
          const name = nameOrSignatureOrSighash.trim();
          const matching = Object.keys(this.functions).filter((f) => f.split(
            "("
            /* fix:) */
          )[0] === name);
          if (matching.length === 0) {
            logger10.throwArgumentError("no matching function", "name", name);
          } else if (matching.length > 1) {
            logger10.throwArgumentError("multiple matching functions", "name", name);
          }
          return this.functions[matching[0]];
        }
        const result = this.functions[FunctionFragment.fromString(nameOrSignatureOrSighash).format()];
        if (!result) {
          logger10.throwArgumentError("no matching function", "signature", nameOrSignatureOrSighash);
        }
        return result;
      }
      // Find an event definition by any means necessary (unless it is ambiguous)
      getEvent(nameOrSignatureOrTopic) {
        if (isHexString(nameOrSignatureOrTopic)) {
          const topichash = nameOrSignatureOrTopic.toLowerCase();
          for (const name in this.events) {
            if (topichash === this.getEventTopic(name)) {
              return this.events[name];
            }
          }
          logger10.throwArgumentError("no matching event", "topichash", topichash);
        }
        if (nameOrSignatureOrTopic.indexOf("(") === -1) {
          const name = nameOrSignatureOrTopic.trim();
          const matching = Object.keys(this.events).filter((f) => f.split(
            "("
            /* fix:) */
          )[0] === name);
          if (matching.length === 0) {
            logger10.throwArgumentError("no matching event", "name", name);
          } else if (matching.length > 1) {
            logger10.throwArgumentError("multiple matching events", "name", name);
          }
          return this.events[matching[0]];
        }
        const result = this.events[EventFragment.fromString(nameOrSignatureOrTopic).format()];
        if (!result) {
          logger10.throwArgumentError("no matching event", "signature", nameOrSignatureOrTopic);
        }
        return result;
      }
      // Find a function definition by any means necessary (unless it is ambiguous)
      getError(nameOrSignatureOrSighash) {
        if (isHexString(nameOrSignatureOrSighash)) {
          const getSighash = getStatic(this.constructor, "getSighash");
          for (const name in this.errors) {
            const error = this.errors[name];
            if (nameOrSignatureOrSighash === getSighash(error)) {
              return this.errors[name];
            }
          }
          logger10.throwArgumentError("no matching error", "sighash", nameOrSignatureOrSighash);
        }
        if (nameOrSignatureOrSighash.indexOf("(") === -1) {
          const name = nameOrSignatureOrSighash.trim();
          const matching = Object.keys(this.errors).filter((f) => f.split(
            "("
            /* fix:) */
          )[0] === name);
          if (matching.length === 0) {
            logger10.throwArgumentError("no matching error", "name", name);
          } else if (matching.length > 1) {
            logger10.throwArgumentError("multiple matching errors", "name", name);
          }
          return this.errors[matching[0]];
        }
        const result = this.errors[FunctionFragment.fromString(nameOrSignatureOrSighash).format()];
        if (!result) {
          logger10.throwArgumentError("no matching error", "signature", nameOrSignatureOrSighash);
        }
        return result;
      }
      // Get the sighash (the bytes4 selector) used by Solidity to identify a function
      getSighash(fragment) {
        if (typeof fragment === "string") {
          try {
            fragment = this.getFunction(fragment);
          } catch (error) {
            try {
              fragment = this.getError(fragment);
            } catch (_) {
              throw error;
            }
          }
        }
        return getStatic(this.constructor, "getSighash")(fragment);
      }
      // Get the topic (the bytes32 hash) used by Solidity to identify an event
      getEventTopic(eventFragment) {
        if (typeof eventFragment === "string") {
          eventFragment = this.getEvent(eventFragment);
        }
        return getStatic(this.constructor, "getEventTopic")(eventFragment);
      }
      _decodeParams(params, data) {
        return this._abiCoder.decode(params, data);
      }
      _encodeParams(params, values) {
        return this._abiCoder.encode(params, values);
      }
      encodeDeploy(values) {
        return this._encodeParams(this.deploy.inputs, values || []);
      }
      decodeErrorResult(fragment, data) {
        if (typeof fragment === "string") {
          fragment = this.getError(fragment);
        }
        const bytes2 = arrayify(data);
        if (hexlify(bytes2.slice(0, 4)) !== this.getSighash(fragment)) {
          logger10.throwArgumentError(`data signature does not match error ${fragment.name}.`, "data", hexlify(bytes2));
        }
        return this._decodeParams(fragment.inputs, bytes2.slice(4));
      }
      encodeErrorResult(fragment, values) {
        if (typeof fragment === "string") {
          fragment = this.getError(fragment);
        }
        return hexlify(concat([
          this.getSighash(fragment),
          this._encodeParams(fragment.inputs, values || [])
        ]));
      }
      // Decode the data for a function call (e.g. tx.data)
      decodeFunctionData(functionFragment, data) {
        if (typeof functionFragment === "string") {
          functionFragment = this.getFunction(functionFragment);
        }
        const bytes2 = arrayify(data);
        if (hexlify(bytes2.slice(0, 4)) !== this.getSighash(functionFragment)) {
          logger10.throwArgumentError(`data signature does not match function ${functionFragment.name}.`, "data", hexlify(bytes2));
        }
        return this._decodeParams(functionFragment.inputs, bytes2.slice(4));
      }
      // Encode the data for a function call (e.g. tx.data)
      encodeFunctionData(functionFragment, values) {
        if (typeof functionFragment === "string") {
          functionFragment = this.getFunction(functionFragment);
        }
        return hexlify(concat([
          this.getSighash(functionFragment),
          this._encodeParams(functionFragment.inputs, values || [])
        ]));
      }
      // Decode the result from a function call (e.g. from eth_call)
      decodeFunctionResult(functionFragment, data) {
        if (typeof functionFragment === "string") {
          functionFragment = this.getFunction(functionFragment);
        }
        let bytes2 = arrayify(data);
        let reason = null;
        let message = "";
        let errorArgs = null;
        let errorName = null;
        let errorSignature = null;
        switch (bytes2.length % this._abiCoder._getWordSize()) {
          case 0:
            try {
              return this._abiCoder.decode(functionFragment.outputs, bytes2);
            } catch (error) {
            }
            break;
          case 4: {
            const selector = hexlify(bytes2.slice(0, 4));
            const builtin = BuiltinErrors[selector];
            if (builtin) {
              errorArgs = this._abiCoder.decode(builtin.inputs, bytes2.slice(4));
              errorName = builtin.name;
              errorSignature = builtin.signature;
              if (builtin.reason) {
                reason = errorArgs[0];
              }
              if (errorName === "Error") {
                message = `; VM Exception while processing transaction: reverted with reason string ${JSON.stringify(errorArgs[0])}`;
              } else if (errorName === "Panic") {
                message = `; VM Exception while processing transaction: reverted with panic code ${errorArgs[0]}`;
              }
            } else {
              try {
                const error = this.getError(selector);
                errorArgs = this._abiCoder.decode(error.inputs, bytes2.slice(4));
                errorName = error.name;
                errorSignature = error.format();
              } catch (error) {
              }
            }
            break;
          }
        }
        return logger10.throwError("call revert exception" + message, Logger.errors.CALL_EXCEPTION, {
          method: functionFragment.format(),
          data: hexlify(data),
          errorArgs,
          errorName,
          errorSignature,
          reason
        });
      }
      // Encode the result for a function call (e.g. for eth_call)
      encodeFunctionResult(functionFragment, values) {
        if (typeof functionFragment === "string") {
          functionFragment = this.getFunction(functionFragment);
        }
        return hexlify(this._abiCoder.encode(functionFragment.outputs, values || []));
      }
      // Create the filter for the event with search criteria (e.g. for eth_filterLog)
      encodeFilterTopics(eventFragment, values) {
        if (typeof eventFragment === "string") {
          eventFragment = this.getEvent(eventFragment);
        }
        if (values.length > eventFragment.inputs.length) {
          logger10.throwError("too many arguments for " + eventFragment.format(), Logger.errors.UNEXPECTED_ARGUMENT, {
            argument: "values",
            value: values
          });
        }
        let topics = [];
        if (!eventFragment.anonymous) {
          topics.push(this.getEventTopic(eventFragment));
        }
        const encodeTopic = (param, value) => {
          if (param.type === "string") {
            return id(value);
          } else if (param.type === "bytes") {
            return keccak256(hexlify(value));
          }
          if (param.type === "bool" && typeof value === "boolean") {
            value = value ? "0x01" : "0x00";
          }
          if (param.type.match(/^u?int/)) {
            value = BigNumber.from(value).toHexString();
          }
          if (param.type === "address") {
            this._abiCoder.encode(["address"], [value]);
          }
          return hexZeroPad(hexlify(value), 32);
        };
        values.forEach((value, index) => {
          let param = eventFragment.inputs[index];
          if (!param.indexed) {
            if (value != null) {
              logger10.throwArgumentError("cannot filter non-indexed parameters; must be null", "contract." + param.name, value);
            }
            return;
          }
          if (value == null) {
            topics.push(null);
          } else if (param.baseType === "array" || param.baseType === "tuple") {
            logger10.throwArgumentError("filtering with tuples or arrays not supported", "contract." + param.name, value);
          } else if (Array.isArray(value)) {
            topics.push(value.map((value2) => encodeTopic(param, value2)));
          } else {
            topics.push(encodeTopic(param, value));
          }
        });
        while (topics.length && topics[topics.length - 1] === null) {
          topics.pop();
        }
        return topics;
      }
      encodeEventLog(eventFragment, values) {
        if (typeof eventFragment === "string") {
          eventFragment = this.getEvent(eventFragment);
        }
        const topics = [];
        const dataTypes = [];
        const dataValues = [];
        if (!eventFragment.anonymous) {
          topics.push(this.getEventTopic(eventFragment));
        }
        if (values.length !== eventFragment.inputs.length) {
          logger10.throwArgumentError("event arguments/values mismatch", "values", values);
        }
        eventFragment.inputs.forEach((param, index) => {
          const value = values[index];
          if (param.indexed) {
            if (param.type === "string") {
              topics.push(id(value));
            } else if (param.type === "bytes") {
              topics.push(keccak256(value));
            } else if (param.baseType === "tuple" || param.baseType === "array") {
              throw new Error("not implemented");
            } else {
              topics.push(this._abiCoder.encode([param.type], [value]));
            }
          } else {
            dataTypes.push(param);
            dataValues.push(value);
          }
        });
        return {
          data: this._abiCoder.encode(dataTypes, dataValues),
          topics
        };
      }
      // Decode a filter for the event and the search criteria
      decodeEventLog(eventFragment, data, topics) {
        if (typeof eventFragment === "string") {
          eventFragment = this.getEvent(eventFragment);
        }
        if (topics != null && !eventFragment.anonymous) {
          let topicHash = this.getEventTopic(eventFragment);
          if (!isHexString(topics[0], 32) || topics[0].toLowerCase() !== topicHash) {
            logger10.throwError("fragment/topic mismatch", Logger.errors.INVALID_ARGUMENT, { argument: "topics[0]", expected: topicHash, value: topics[0] });
          }
          topics = topics.slice(1);
        }
        let indexed = [];
        let nonIndexed = [];
        let dynamic = [];
        eventFragment.inputs.forEach((param, index) => {
          if (param.indexed) {
            if (param.type === "string" || param.type === "bytes" || param.baseType === "tuple" || param.baseType === "array") {
              indexed.push(ParamType.fromObject({ type: "bytes32", name: param.name }));
              dynamic.push(true);
            } else {
              indexed.push(param);
              dynamic.push(false);
            }
          } else {
            nonIndexed.push(param);
            dynamic.push(false);
          }
        });
        let resultIndexed = topics != null ? this._abiCoder.decode(indexed, concat(topics)) : null;
        let resultNonIndexed = this._abiCoder.decode(nonIndexed, data, true);
        let result = [];
        let nonIndexedIndex = 0, indexedIndex = 0;
        eventFragment.inputs.forEach((param, index) => {
          if (param.indexed) {
            if (resultIndexed == null) {
              result[index] = new Indexed({ _isIndexed: true, hash: null });
            } else if (dynamic[index]) {
              result[index] = new Indexed({ _isIndexed: true, hash: resultIndexed[indexedIndex++] });
            } else {
              try {
                result[index] = resultIndexed[indexedIndex++];
              } catch (error) {
                result[index] = error;
              }
            }
          } else {
            try {
              result[index] = resultNonIndexed[nonIndexedIndex++];
            } catch (error) {
              result[index] = error;
            }
          }
          if (param.name && result[param.name] == null) {
            const value = result[index];
            if (value instanceof Error) {
              Object.defineProperty(result, param.name, {
                enumerable: true,
                get: () => {
                  throw wrapAccessError(`property ${JSON.stringify(param.name)}`, value);
                }
              });
            } else {
              result[param.name] = value;
            }
          }
        });
        for (let i = 0; i < result.length; i++) {
          const value = result[i];
          if (value instanceof Error) {
            Object.defineProperty(result, i, {
              enumerable: true,
              get: () => {
                throw wrapAccessError(`index ${i}`, value);
              }
            });
          }
        }
        return Object.freeze(result);
      }
      // Given a transaction, find the matching function fragment (if any) and
      // determine all its properties and call parameters
      parseTransaction(tx) {
        let fragment = this.getFunction(tx.data.substring(0, 10).toLowerCase());
        if (!fragment) {
          return null;
        }
        return new TransactionDescription({
          args: this._abiCoder.decode(fragment.inputs, "0x" + tx.data.substring(10)),
          functionFragment: fragment,
          name: fragment.name,
          signature: fragment.format(),
          sighash: this.getSighash(fragment),
          value: BigNumber.from(tx.value || "0")
        });
      }
      // @TODO
      //parseCallResult(data: BytesLike): ??
      // Given an event log, find the matching event fragment (if any) and
      // determine all its properties and values
      parseLog(log) {
        let fragment = this.getEvent(log.topics[0]);
        if (!fragment || fragment.anonymous) {
          return null;
        }
        return new LogDescription({
          eventFragment: fragment,
          name: fragment.name,
          signature: fragment.format(),
          topic: this.getEventTopic(fragment),
          args: this.decodeEventLog(fragment, log.data, log.topics)
        });
      }
      parseError(data) {
        const hexData = hexlify(data);
        let fragment = this.getError(hexData.substring(0, 10).toLowerCase());
        if (!fragment) {
          return null;
        }
        return new ErrorDescription({
          args: this._abiCoder.decode(fragment.inputs, "0x" + hexData.substring(10)),
          errorFragment: fragment,
          name: fragment.name,
          signature: fragment.format(),
          sighash: this.getSighash(fragment)
        });
      }
      /*
      static from(value: Array<Fragment | string | JsonAbi> | string | Interface) {
          if (Interface.isInterface(value)) {
              return value;
          }
          if (typeof(value) === "string") {
              return new Interface(JSON.parse(value));
          }
          return new Interface(value);
      }
      */
      static isInterface(value) {
        return !!(value && value._isInterface);
      }
    };
  }
});

// node_modules/@ethersproject/abi/lib.esm/index.js
var lib_exports = {};
__export(lib_exports, {
  AbiCoder: () => AbiCoder,
  ConstructorFragment: () => ConstructorFragment,
  ErrorFragment: () => ErrorFragment,
  EventFragment: () => EventFragment,
  FormatTypes: () => FormatTypes,
  Fragment: () => Fragment,
  FunctionFragment: () => FunctionFragment,
  Indexed: () => Indexed,
  Interface: () => Interface,
  LogDescription: () => LogDescription,
  ParamType: () => ParamType,
  TransactionDescription: () => TransactionDescription,
  checkResultErrors: () => checkResultErrors,
  defaultAbiCoder: () => defaultAbiCoder
});
var init_lib10 = __esm({
  "node_modules/@ethersproject/abi/lib.esm/index.js"() {
    "use strict";
    init_fragments();
    init_abi_coder();
    init_interface();
  }
});

// node_modules/web3-eth-abi/lib/index.js
var require_lib3 = __commonJS({
  "node_modules/web3-eth-abi/lib/index.js"(exports, module) {
    var Buffer2 = __require("buffer").Buffer;
    var utils = require_lib2();
    var EthersAbiCoder = (init_lib10(), __toCommonJS(lib_exports)).AbiCoder;
    var ParamType2 = (init_lib10(), __toCommonJS(lib_exports)).ParamType;
    var ethersAbiCoder = new EthersAbiCoder(function(type, value) {
      if (type.match(/^u?int/) && !Array.isArray(value) && (!(!!value && typeof value === "object") || value.constructor.name !== "BN")) {
        return value.toString();
      }
      return value;
    });
    function Result() {
    }
    var ABICoder = function() {
    };
    ABICoder.prototype.encodeFunctionSignature = function(functionName) {
      if (typeof functionName === "function" || typeof functionName === "object" && functionName) {
        functionName = utils._jsonInterfaceMethodToString(functionName);
      }
      return utils.sha3(functionName).slice(0, 10);
    };
    ABICoder.prototype.encodeEventSignature = function(functionName) {
      if (typeof functionName === "function" || typeof functionName === "object" && functionName) {
        functionName = utils._jsonInterfaceMethodToString(functionName);
      }
      return utils.sha3(functionName);
    };
    ABICoder.prototype.encodeParameter = function(type, param) {
      return this.encodeParameters([type], [param]);
    };
    ABICoder.prototype.encodeParameters = function(types, params) {
      var self2 = this;
      types = self2.mapTypes(types);
      params = params.map(function(param, index) {
        let type = types[index];
        if (typeof type === "object" && type.type) {
          type = type.type;
        }
        param = self2.formatParam(type, param);
        if (typeof type === "string" && type.includes("tuple")) {
          const coder2 = ethersAbiCoder._getCoder(ParamType2.from(type));
          const modifyParams = (coder3, param2) => {
            if (coder3.name === "array") {
              if (!coder3.type.match(/\[(\d+)\]/)) {
                return param2.map((p) => modifyParams(ethersAbiCoder._getCoder(ParamType2.from(coder3.type.replace("[]", ""))), p));
              }
              const arrayLength = parseInt(coder3.type.match(/\[(\d+)\]/)[1]);
              if (param2.length !== arrayLength) {
                throw new Error("Array length does not matches with the given input");
              }
              return param2.map((p) => modifyParams(ethersAbiCoder._getCoder(ParamType2.from(coder3.type.replace(/\[\d+\]/, ""))), p));
            }
            coder3.coders.forEach((c, i) => {
              if (c.name === "tuple") {
                modifyParams(c, param2[i]);
              } else {
                param2[i] = self2.formatParam(c.name, param2[i]);
              }
            });
          };
          modifyParams(coder2, param);
        }
        return param;
      });
      return ethersAbiCoder.encode(types, params);
    };
    ABICoder.prototype.mapTypes = function(types) {
      var self2 = this;
      var mappedTypes = [];
      types.forEach(function(type) {
        if (typeof type === "object" && type.type === "function") {
          type = Object.assign({}, type, { type: "bytes24" });
        }
        if (self2.isSimplifiedStructFormat(type)) {
          var structName = Object.keys(type)[0];
          mappedTypes.push(Object.assign(self2.mapStructNameAndType(structName), {
            components: self2.mapStructToCoderFormat(type[structName])
          }));
          return;
        }
        mappedTypes.push(type);
      });
      return mappedTypes;
    };
    ABICoder.prototype.isSimplifiedStructFormat = function(type) {
      return typeof type === "object" && typeof type.components === "undefined" && typeof type.name === "undefined";
    };
    ABICoder.prototype.mapStructNameAndType = function(structName) {
      var type = "tuple";
      if (structName.indexOf("[]") > -1) {
        type = "tuple[]";
        structName = structName.slice(0, -2);
      }
      return { type, name: structName };
    };
    ABICoder.prototype.mapStructToCoderFormat = function(struct) {
      var self2 = this;
      var components = [];
      Object.keys(struct).forEach(function(key) {
        if (typeof struct[key] === "object") {
          components.push(Object.assign(self2.mapStructNameAndType(key), {
            components: self2.mapStructToCoderFormat(struct[key])
          }));
          return;
        }
        components.push({
          name: key,
          type: struct[key]
        });
      });
      return components;
    };
    ABICoder.prototype.formatParam = function(type, param) {
      const paramTypeBytes2 = new RegExp(/^bytes([0-9]*)$/);
      const paramTypeBytesArray = new RegExp(/^bytes([0-9]*)\[\]$/);
      const paramTypeNumber2 = new RegExp(/^(u?int)([0-9]*)$/);
      const paramTypeNumberArray = new RegExp(/^(u?int)([0-9]*)\[\]$/);
      if (utils.isBN(param) || utils.isBigNumber(param)) {
        return param.toString(10);
      }
      if (type.match(paramTypeBytesArray) || type.match(paramTypeNumberArray)) {
        return param.map((p) => this.formatParam(type.replace("[]", ""), p));
      }
      let match = type.match(paramTypeNumber2);
      if (match) {
        let size = parseInt(match[2] || "256");
        if (size / 8 < param.length) {
          param = param.startsWith("-") ? `-${utils.leftPad(param.substring(1), size)}` : utils.leftPad(param, size);
        }
      }
      match = type.match(paramTypeBytes2);
      if (match) {
        if (Buffer2.isBuffer(param)) {
          param = utils.toHex(param);
        }
        let size = parseInt(match[1]);
        if (size) {
          let maxSize = size * 2;
          if (param.substring(0, 2) === "0x") {
            maxSize += 2;
          }
          if (param.length < maxSize) {
            param = utils.rightPad(param, size * 2);
          }
        }
        if (param.length % 2 === 1) {
          param = "0x0" + param.substring(2);
        }
      }
      return param;
    };
    ABICoder.prototype.encodeFunctionCall = function(jsonInterface, params) {
      return this.encodeFunctionSignature(jsonInterface) + this.encodeParameters(jsonInterface.inputs, params).replace("0x", "");
    };
    ABICoder.prototype.decodeParameter = function(type, bytes2) {
      return this.decodeParameters([type], bytes2)[0];
    };
    ABICoder.prototype.decodeParameters = function(outputs, bytes2) {
      return this.decodeParametersWith(outputs, bytes2, false);
    };
    ABICoder.prototype.decodeParametersWith = function(outputs, bytes2, loose) {
      if (outputs.length > 0 && (!bytes2 || bytes2 === "0x" || bytes2 === "0X")) {
        throw new Error("Returned values aren't valid, did it run Out of Gas? You might also see this error if you are not using the correct ABI for the contract you are retrieving data from, requesting data from a block number that does not exist, or querying a node which is not fully synced.");
      }
      var res = ethersAbiCoder.decode(this.mapTypes(outputs), "0x" + bytes2.replace(/0x/i, ""), loose);
      var returnValue = new Result();
      returnValue.__length__ = 0;
      outputs.forEach(function(output2, i) {
        var decodedValue = res[returnValue.__length__];
        const isStringObject = typeof output2 === "object" && output2.type && output2.type === "string";
        const isStringType = typeof output2 === "string" && output2 === "string";
        decodedValue = decodedValue === "0x" && !isStringObject && !isStringType ? null : decodedValue;
        returnValue[i] = decodedValue;
        if ((typeof output2 === "function" || !!output2 && typeof output2 === "object") && output2.name) {
          returnValue[output2.name] = decodedValue;
        }
        returnValue.__length__++;
      });
      return returnValue;
    };
    ABICoder.prototype.decodeLog = function(inputs, data, topics) {
      var _this = this;
      topics = Array.isArray(topics) ? topics : [topics];
      data = data || "";
      var notIndexedInputs = [];
      var indexedParams = [];
      var topicCount = 0;
      inputs.forEach(function(input, i) {
        if (input.indexed) {
          indexedParams[i] = ["bool", "int", "uint", "address", "fixed", "ufixed"].find(function(staticType) {
            return input.type.indexOf(staticType) !== -1;
          }) ? _this.decodeParameter(input.type, topics[topicCount]) : topics[topicCount];
          topicCount++;
        } else {
          notIndexedInputs[i] = input;
        }
      });
      var nonIndexedData = data;
      var notIndexedParams = nonIndexedData ? this.decodeParametersWith(notIndexedInputs, nonIndexedData, true) : [];
      var returnValue = new Result();
      returnValue.__length__ = 0;
      inputs.forEach(function(res, i) {
        returnValue[i] = res.type === "string" ? "" : null;
        if (typeof notIndexedParams[i] !== "undefined") {
          returnValue[i] = notIndexedParams[i];
        }
        if (typeof indexedParams[i] !== "undefined") {
          returnValue[i] = indexedParams[i];
        }
        if (res.name) {
          returnValue[res.name] = returnValue[i];
        }
        returnValue.__length__++;
      });
      return returnValue;
    };
    var coder = new ABICoder();
    module.exports = coder;
  }
});

// src/utils/chain.util.ts
var import_web3_utils = __toESM(require_lib2(), 1);
import { recoverTypedSignature, SignTypedDataVersion } from "@metamask/eth-sig-util";

// node_modules/@noble/hashes/esm/cryptoNode.js
import * as nc from "node:crypto";
var crypto = nc && typeof nc === "object" && "webcrypto" in nc ? nc.webcrypto : void 0;

// node_modules/@noble/hashes/esm/utils.js
var u8a = (a) => a instanceof Uint8Array;
var u32 = (arr) => new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
var isLE = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!isLE)
  throw new Error("Non little-endian hardware is not supported");
var hexes = Array.from({ length: 256 }, (v, i) => i.toString(16).padStart(2, "0"));
function bytesToHex(bytes2) {
  if (!u8a(bytes2))
    throw new Error("Uint8Array expected");
  let hex = "";
  for (let i = 0; i < bytes2.length; i++) {
    hex += hexes[bytes2[i]];
  }
  return hex;
}
function utf8ToBytes(str) {
  if (typeof str !== "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof str}`);
  return new Uint8Array(new TextEncoder().encode(str));
}
function toBytes(data) {
  if (typeof data === "string")
    data = utf8ToBytes(data);
  if (!u8a(data))
    throw new Error(`expected Uint8Array, got ${typeof data}`);
  return data;
}
var Hash = class {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
};
function wrapConstructor(hashCons) {
  const hashC = (msg) => hashCons().update(toBytes(msg)).digest();
  const tmp = hashCons();
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.create = () => hashCons();
  return hashC;
}
function wrapXOFConstructorWithOpts(hashCons) {
  const hashC = (msg, opts) => hashCons(opts).update(toBytes(msg)).digest();
  const tmp = hashCons({});
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.create = (opts) => hashCons(opts);
  return hashC;
}

// node_modules/@noble/hashes/esm/_assert.js
function number(n) {
  if (!Number.isSafeInteger(n) || n < 0)
    throw new Error(`Wrong positive integer: ${n}`);
}
function bool(b) {
  if (typeof b !== "boolean")
    throw new Error(`Expected boolean, not ${b}`);
}
function bytes(b, ...lengths) {
  if (!(b instanceof Uint8Array))
    throw new Error("Expected Uint8Array");
  if (lengths.length > 0 && !lengths.includes(b.length))
    throw new Error(`Expected Uint8Array of length ${lengths}, not of length=${b.length}`);
}
function hash(hash2) {
  if (typeof hash2 !== "function" || typeof hash2.create !== "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  number(hash2.outputLen);
  number(hash2.blockLen);
}
function exists(instance, checkFinished = true) {
  if (instance.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (checkFinished && instance.finished)
    throw new Error("Hash#digest() has already been called");
}
function output(out, instance) {
  bytes(out);
  const min = instance.outputLen;
  if (out.length < min) {
    throw new Error(`digestInto() expects output buffer of length at least ${min}`);
  }
}
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
  if (le)
    return { h: Number(n & U32_MASK64), l: Number(n >> _32n & U32_MASK64) };
  return { h: Number(n >> _32n & U32_MASK64) | 0, l: Number(n & U32_MASK64) | 0 };
}
function split(lst, le = false) {
  let Ah = new Uint32Array(lst.length);
  let Al = new Uint32Array(lst.length);
  for (let i = 0; i < lst.length; i++) {
    const { h, l } = fromBig(lst[i], le);
    [Ah[i], Al[i]] = [h, l];
  }
  return [Ah, Al];
}
var toBig = (h, l) => BigInt(h >>> 0) << _32n | BigInt(l >>> 0);
var shrSH = (h, l, s) => h >>> s;
var shrSL = (h, l, s) => h << 32 - s | l >>> s;
var rotrSH = (h, l, s) => h >>> s | l << 32 - s;
var rotrSL = (h, l, s) => h << 32 - s | l >>> s;
var rotrBH = (h, l, s) => h << 64 - s | l >>> s - 32;
var rotrBL = (h, l, s) => h >>> s - 32 | l << 64 - s;
var rotr32H = (h, l) => l;
var rotr32L = (h, l) => h;
var rotlSH = (h, l, s) => h << s | l >>> 32 - s;
var rotlSL = (h, l, s) => l << s | h >>> 32 - s;
var rotlBH = (h, l, s) => l << s - 32 | h >>> 64 - s;
var rotlBL = (h, l, s) => h << s - 32 | l >>> 64 - s;
function add(Ah, Al, Bh, Bl) {
  const l = (Al >>> 0) + (Bl >>> 0);
  return { h: Ah + Bh + (l / 2 ** 32 | 0) | 0, l: l | 0 };
}
var add3L = (Al, Bl, Cl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0);
var add3H = (low, Ah, Bh, Ch) => Ah + Bh + Ch + (low / 2 ** 32 | 0) | 0;
var add4L = (Al, Bl, Cl, Dl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0);
var add4H = (low, Ah, Bh, Ch, Dh) => Ah + Bh + Ch + Dh + (low / 2 ** 32 | 0) | 0;
var add5L = (Al, Bl, Cl, Dl, El) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0) + (El >>> 0);
var add5H = (low, Ah, Bh, Ch, Dh, Eh) => Ah + Bh + Ch + Dh + Eh + (low / 2 ** 32 | 0) | 0;
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
var [SHA3_PI, SHA3_ROTL, _SHA3_IOTA] = [[], [], []];
var _0n = BigInt(0);
var _1n = BigInt(1);
var _2n = BigInt(2);
var _7n = BigInt(7);
var _256n = BigInt(256);
var _0x71n = BigInt(113);
for (let round = 0, R = _1n, x = 1, y = 0; round < 24; round++) {
  [x, y] = [y, (2 * x + 3 * y) % 5];
  SHA3_PI.push(2 * (5 * y + x));
  SHA3_ROTL.push((round + 1) * (round + 2) / 2 % 64);
  let t = _0n;
  for (let j = 0; j < 7; j++) {
    R = (R << _1n ^ (R >> _7n) * _0x71n) % _256n;
    if (R & _2n)
      t ^= _1n << (_1n << BigInt(j)) - _1n;
  }
  _SHA3_IOTA.push(t);
}
var [SHA3_IOTA_H, SHA3_IOTA_L] = u64_default.split(_SHA3_IOTA, true);
var rotlH = (h, l, s) => s > 32 ? u64_default.rotlBH(h, l, s) : u64_default.rotlSH(h, l, s);
var rotlL = (h, l, s) => s > 32 ? u64_default.rotlBL(h, l, s) : u64_default.rotlSL(h, l, s);
function keccakP(s, rounds = 24) {
  const B = new Uint32Array(5 * 2);
  for (let round = 24 - rounds; round < 24; round++) {
    for (let x = 0; x < 10; x++)
      B[x] = s[x] ^ s[x + 10] ^ s[x + 20] ^ s[x + 30] ^ s[x + 40];
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
      for (let x = 0; x < 10; x++)
        B[x] = s[y + x];
      for (let x = 0; x < 10; x++)
        s[y + x] ^= ~B[(x + 2) % 10] & B[(x + 4) % 10];
    }
    s[0] ^= SHA3_IOTA_H[round];
    s[1] ^= SHA3_IOTA_L[round];
  }
  B.fill(0);
}
var Keccak = class _Keccak extends Hash {
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
    if (0 >= this.blockLen || this.blockLen >= 200)
      throw new Error("Sha3 supports only keccak-f1600 function");
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
      for (let i = 0; i < take; i++)
        state[this.pos++] ^= data[pos++];
      if (this.pos === blockLen)
        this.keccak();
    }
    return this;
  }
  finish() {
    if (this.finished)
      return;
    this.finished = true;
    const { state, suffix, pos, blockLen } = this;
    state[pos] ^= suffix;
    if ((suffix & 128) !== 0 && pos === blockLen - 1)
      this.keccak();
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
      if (this.posOut >= blockLen)
        this.keccak();
      const take = Math.min(blockLen - this.posOut, len - pos);
      out.set(bufferOut.subarray(this.posOut, this.posOut + take), pos);
      this.posOut += take;
      pos += take;
    }
    return out;
  }
  xofInto(out) {
    if (!this.enableXOF)
      throw new Error("XOF is not possible for this instance");
    return this.writeInto(out);
  }
  xof(bytes2) {
    assert_default.number(bytes2);
    return this.xofInto(new Uint8Array(bytes2));
  }
  digestInto(out) {
    assert_default.output(out, this);
    if (this.finished)
      throw new Error("digest() was already called");
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
var gen = (suffix, blockLen, outputLen) => wrapConstructor(() => new Keccak(blockLen, suffix, outputLen));
var sha3_224 = gen(6, 144, 224 / 8);
var sha3_256 = gen(6, 136, 256 / 8);
var sha3_384 = gen(6, 104, 384 / 8);
var sha3_512 = gen(6, 72, 512 / 8);
var keccak_224 = gen(1, 144, 224 / 8);
var keccak_256 = gen(1, 136, 256 / 8);
var keccak_384 = gen(1, 104, 384 / 8);
var keccak_512 = gen(1, 72, 512 / 8);
var genShake = (suffix, blockLen, outputLen) => wrapXOFConstructorWithOpts((opts = {}) => new Keccak(blockLen, suffix, opts.dkLen === void 0 ? outputLen : opts.dkLen, true));
var shake128 = genShake(31, 168, 128 / 8);
var shake256 = genShake(31, 136, 256 / 8);

// src/utils/chain.util.ts
var import_web3_eth_abi = __toESM(require_lib3(), 1);
import { recoverPersonalSignature } from "@metamask/eth-sig-util";
import Web3 from "web3";
function recoverTypedSignatureV4(signObj, signature) {
  return recoverTypedSignature({
    data: signObj,
    signature,
    version: SignTypedDataVersion.V4
  });
}
function formatAddress(address) {
  if (address.length >= 10) {
    return address.substring(0, 8) + "..." + address.substring(address.length - 8);
  } else if (address.length > 0 && address.length < 10) {
    return address;
  } else {
    return "";
  }
}
function buildLoginSignMsg(nonce, tips) {
  const signMsg = {
    tips,
    nonce
  };
  const signObj = {
    types: {
      EIP712Domain: [
        { name: "name", type: "string" },
        { name: "version", type: "string" }
      ],
      set: [
        { name: "tips", type: "string" },
        { name: "nonce", type: "string" }
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
var sign = async ({
  user,
  token,
  amount,
  saltNonce
}) => {
  const web3 = new Web3();
  let privateKey = process.env.SIGN_PRIVATE_KEY;
  const acc = web3.eth.accounts.privateKeyToAccount(privateKey);
  const account = web3.eth.accounts.wallet.add(acc);
  const executor = account.address;
  const amountBn = (0, import_web3_utils.toWei)(amount + "");
  const chainId = process.env.CHAIN;
  const claimContract = process.env.CLAIM_CONTRACT;
  const startTime = Date.now() / 1e3 | 0;
  saltNonce = saltNonce || (Math.random() * 1e3 | 0) + "";
  let signStr = import_web3_utils.soliditySha3.apply(void 0, [user, token, claimContract, chainId, amountBn, startTime, saltNonce]);
  let signature = await web3.eth.sign(signStr, executor);
  signature = signature.replace(/00$/, "1b").replace(/01$/, "1c");
  return { token, amount: amountBn, startTime, saltNonce, signature };
};
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
function checkPersionalSign(message, address, signature) {
  if (!signature.startsWith("0x")) {
    signature = "0x" + signature;
  }
  const recovered = recoverPersonalSignature({ data: message, signature });
  return recovered === address;
}
var getTopics = (abi) => {
  return (0, import_web3_utils.keccak256)((0, import_web3_utils._jsonInterfaceMethodToString)(abi));
};
var parseOne = (input, value) => {
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
};
var decodeEvent = (abi, eventData) => {
  const abiInputs = abi.inputs;
  let result = import_web3_eth_abi.default.decodeLog(abiInputs, eventData.data, eventData.topics.slice(1));
  let decodedData = {};
  for (let i = 0; i < abiInputs.length; i++) {
    const input = abiInputs[i];
    const value = result[i];
    decodedData[input.name] = parseOne(input, value);
  }
  return decodedData;
};
export {
  buildLoginSignMsg,
  checkPersionalSign,
  decodeEvent,
  formatAddress,
  getTopics,
  recoverTypedSignatureV4,
  sign,
  toEIP55
};
/*! Bundled license information:

utf8/utf8.js:
  (*! https://mths.be/utf8js v3.0.0 by @mathias *)

@noble/hashes/utils.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/abstract/utils.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/abstract/modular.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/abstract/curve.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/abstract/weierstrass.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/_shortw_utils.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/secp256k1.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

js-sha3/src/sha3.js:
  (**
   * [js-sha3]{@link https://github.com/emn178/js-sha3}
   *
   * @version 0.8.0
   * @author Chen, Yi-Cyuan [emn178@gmail.com]
   * @copyright Chen, Yi-Cyuan 2015-2018
   * @license MIT
   *)

@noble/hashes/esm/utils.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)
*/
//# sourceMappingURL=chain.util.js.map
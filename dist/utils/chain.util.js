var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
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

// node_modules/bn.js/lib/bn.js
var require_bn = __commonJS({
  "node_modules/bn.js/lib/bn.js"(exports, module) {
    (function(module1, exports2) {
      "use strict";
      function assert2(val, msg) {
        if (!val) throw new Error(msg || "Assertion failed");
      }
      __name(assert2, "assert");
      function inherits(ctor, superCtor) {
        ctor.super_ = superCtor;
        var TempCtor = /* @__PURE__ */ __name(function() {
        }, "TempCtor");
        TempCtor.prototype = superCtor.prototype;
        ctor.prototype = new TempCtor();
        ctor.prototype.constructor = ctor;
      }
      __name(inherits, "inherits");
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
      __name(BN2, "BN");
      if (typeof module1 === "object") {
        module1.exports = BN2;
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
      BN2.isBN = /* @__PURE__ */ __name(function isBN(num) {
        if (num instanceof BN2) {
          return true;
        }
        return num !== null && typeof num === "object" && num.constructor.wordSize === BN2.wordSize && Array.isArray(num.words);
      }, "isBN");
      BN2.max = /* @__PURE__ */ __name(function max(left, right) {
        if (left.cmp(right) > 0) return left;
        return right;
      }, "max");
      BN2.min = /* @__PURE__ */ __name(function min(left, right) {
        if (left.cmp(right) < 0) return left;
        return right;
      }, "min");
      BN2.prototype._init = /* @__PURE__ */ __name(function init(number2, base, endian) {
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
      }, "init");
      BN2.prototype._initNumber = /* @__PURE__ */ __name(function _initNumber(number2, base, endian) {
        if (number2 < 0) {
          this.negative = 1;
          number2 = -number2;
        }
        if (number2 < 67108864) {
          this.words = [
            number2 & 67108863
          ];
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
      }, "_initNumber");
      BN2.prototype._initArray = /* @__PURE__ */ __name(function _initArray(number2, base, endian) {
        assert2(typeof number2.length === "number");
        if (number2.length <= 0) {
          this.words = [
            0
          ];
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
      }, "_initArray");
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
      __name(parseHex4Bits, "parseHex4Bits");
      function parseHexByte(string, lowerBound, index) {
        var r = parseHex4Bits(string, index);
        if (index - 1 >= lowerBound) {
          r |= parseHex4Bits(string, index - 1) << 4;
        }
        return r;
      }
      __name(parseHexByte, "parseHexByte");
      BN2.prototype._parseHex = /* @__PURE__ */ __name(function _parseHex(number2, start, endian) {
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
      }, "_parseHex");
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
      __name(parseBase, "parseBase");
      BN2.prototype._parseBase = /* @__PURE__ */ __name(function _parseBase(number2, base, start) {
        this.words = [
          0
        ];
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
      }, "_parseBase");
      BN2.prototype.copy = /* @__PURE__ */ __name(function copy(dest) {
        dest.words = new Array(this.length);
        for (var i = 0; i < this.length; i++) {
          dest.words[i] = this.words[i];
        }
        dest.length = this.length;
        dest.negative = this.negative;
        dest.red = this.red;
      }, "copy");
      function move(dest, src) {
        dest.words = src.words;
        dest.length = src.length;
        dest.negative = src.negative;
        dest.red = src.red;
      }
      __name(move, "move");
      BN2.prototype._move = /* @__PURE__ */ __name(function _move(dest) {
        move(dest, this);
      }, "_move");
      BN2.prototype.clone = /* @__PURE__ */ __name(function clone() {
        var r = new BN2(null);
        this.copy(r);
        return r;
      }, "clone");
      BN2.prototype._expand = /* @__PURE__ */ __name(function _expand(size) {
        while (this.length < size) {
          this.words[this.length++] = 0;
        }
        return this;
      }, "_expand");
      BN2.prototype._strip = /* @__PURE__ */ __name(function strip() {
        while (this.length > 1 && this.words[this.length - 1] === 0) {
          this.length--;
        }
        return this._normSign();
      }, "strip");
      BN2.prototype._normSign = /* @__PURE__ */ __name(function _normSign() {
        if (this.length === 1 && this.words[0] === 0) {
          this.negative = 0;
        }
        return this;
      }, "_normSign");
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
      __name(inspect, "inspect");
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
      BN2.prototype.toString = /* @__PURE__ */ __name(function toString(base, padding) {
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
      }, "toString");
      BN2.prototype.toNumber = /* @__PURE__ */ __name(function toNumber() {
        var ret = this.words[0];
        if (this.length === 2) {
          ret += this.words[1] * 67108864;
        } else if (this.length === 3 && this.words[2] === 1) {
          ret += 4503599627370496 + this.words[1] * 67108864;
        } else if (this.length > 2) {
          assert2(false, "Number can only safely store up to 53 bits");
        }
        return this.negative !== 0 ? -ret : ret;
      }, "toNumber");
      BN2.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
        return this.toString(16, 2);
      }, "toJSON");
      if (Buffer2) {
        BN2.prototype.toBuffer = /* @__PURE__ */ __name(function toBuffer(endian, length) {
          return this.toArrayLike(Buffer2, endian, length);
        }, "toBuffer");
      }
      BN2.prototype.toArray = /* @__PURE__ */ __name(function toArray(endian, length) {
        return this.toArrayLike(Array, endian, length);
      }, "toArray");
      var allocate = /* @__PURE__ */ __name(function allocate2(ArrayType, size) {
        if (ArrayType.allocUnsafe) {
          return ArrayType.allocUnsafe(size);
        }
        return new ArrayType(size);
      }, "allocate");
      BN2.prototype.toArrayLike = /* @__PURE__ */ __name(function toArrayLike(ArrayType, endian, length) {
        this._strip();
        var byteLength = this.byteLength();
        var reqLength = length || Math.max(1, byteLength);
        assert2(byteLength <= reqLength, "byte array longer than desired length");
        assert2(reqLength > 0, "Requested array length <= 0");
        var res = allocate(ArrayType, reqLength);
        var postfix = endian === "le" ? "LE" : "BE";
        this["_toArrayLike" + postfix](res, byteLength);
        return res;
      }, "toArrayLike");
      BN2.prototype._toArrayLikeLE = /* @__PURE__ */ __name(function _toArrayLikeLE(res, byteLength) {
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
      }, "_toArrayLikeLE");
      BN2.prototype._toArrayLikeBE = /* @__PURE__ */ __name(function _toArrayLikeBE(res, byteLength) {
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
      }, "_toArrayLikeBE");
      if (Math.clz32) {
        BN2.prototype._countBits = /* @__PURE__ */ __name(function _countBits(w) {
          return 32 - Math.clz32(w);
        }, "_countBits");
      } else {
        BN2.prototype._countBits = /* @__PURE__ */ __name(function _countBits(w) {
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
        }, "_countBits");
      }
      BN2.prototype._zeroBits = /* @__PURE__ */ __name(function _zeroBits(w) {
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
      }, "_zeroBits");
      BN2.prototype.bitLength = /* @__PURE__ */ __name(function bitLength() {
        var w = this.words[this.length - 1];
        var hi = this._countBits(w);
        return (this.length - 1) * 26 + hi;
      }, "bitLength");
      function toBitArray(num) {
        var w = new Array(num.bitLength());
        for (var bit = 0; bit < w.length; bit++) {
          var off = bit / 26 | 0;
          var wbit = bit % 26;
          w[bit] = num.words[off] >>> wbit & 1;
        }
        return w;
      }
      __name(toBitArray, "toBitArray");
      BN2.prototype.zeroBits = /* @__PURE__ */ __name(function zeroBits() {
        if (this.isZero()) return 0;
        var r = 0;
        for (var i = 0; i < this.length; i++) {
          var b = this._zeroBits(this.words[i]);
          r += b;
          if (b !== 26) break;
        }
        return r;
      }, "zeroBits");
      BN2.prototype.byteLength = /* @__PURE__ */ __name(function byteLength() {
        return Math.ceil(this.bitLength() / 8);
      }, "byteLength");
      BN2.prototype.toTwos = /* @__PURE__ */ __name(function toTwos(width) {
        if (this.negative !== 0) {
          return this.abs().inotn(width).iaddn(1);
        }
        return this.clone();
      }, "toTwos");
      BN2.prototype.fromTwos = /* @__PURE__ */ __name(function fromTwos(width) {
        if (this.testn(width - 1)) {
          return this.notn(width).iaddn(1).ineg();
        }
        return this.clone();
      }, "fromTwos");
      BN2.prototype.isNeg = /* @__PURE__ */ __name(function isNeg() {
        return this.negative !== 0;
      }, "isNeg");
      BN2.prototype.neg = /* @__PURE__ */ __name(function neg() {
        return this.clone().ineg();
      }, "neg");
      BN2.prototype.ineg = /* @__PURE__ */ __name(function ineg() {
        if (!this.isZero()) {
          this.negative ^= 1;
        }
        return this;
      }, "ineg");
      BN2.prototype.iuor = /* @__PURE__ */ __name(function iuor(num) {
        while (this.length < num.length) {
          this.words[this.length++] = 0;
        }
        for (var i = 0; i < num.length; i++) {
          this.words[i] = this.words[i] | num.words[i];
        }
        return this._strip();
      }, "iuor");
      BN2.prototype.ior = /* @__PURE__ */ __name(function ior(num) {
        assert2((this.negative | num.negative) === 0);
        return this.iuor(num);
      }, "ior");
      BN2.prototype.or = /* @__PURE__ */ __name(function or(num) {
        if (this.length > num.length) return this.clone().ior(num);
        return num.clone().ior(this);
      }, "or");
      BN2.prototype.uor = /* @__PURE__ */ __name(function uor(num) {
        if (this.length > num.length) return this.clone().iuor(num);
        return num.clone().iuor(this);
      }, "uor");
      BN2.prototype.iuand = /* @__PURE__ */ __name(function iuand(num) {
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
      }, "iuand");
      BN2.prototype.iand = /* @__PURE__ */ __name(function iand(num) {
        assert2((this.negative | num.negative) === 0);
        return this.iuand(num);
      }, "iand");
      BN2.prototype.and = /* @__PURE__ */ __name(function and(num) {
        if (this.length > num.length) return this.clone().iand(num);
        return num.clone().iand(this);
      }, "and");
      BN2.prototype.uand = /* @__PURE__ */ __name(function uand(num) {
        if (this.length > num.length) return this.clone().iuand(num);
        return num.clone().iuand(this);
      }, "uand");
      BN2.prototype.iuxor = /* @__PURE__ */ __name(function iuxor(num) {
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
      }, "iuxor");
      BN2.prototype.ixor = /* @__PURE__ */ __name(function ixor(num) {
        assert2((this.negative | num.negative) === 0);
        return this.iuxor(num);
      }, "ixor");
      BN2.prototype.xor = /* @__PURE__ */ __name(function xor(num) {
        if (this.length > num.length) return this.clone().ixor(num);
        return num.clone().ixor(this);
      }, "xor");
      BN2.prototype.uxor = /* @__PURE__ */ __name(function uxor(num) {
        if (this.length > num.length) return this.clone().iuxor(num);
        return num.clone().iuxor(this);
      }, "uxor");
      BN2.prototype.inotn = /* @__PURE__ */ __name(function inotn(width) {
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
      }, "inotn");
      BN2.prototype.notn = /* @__PURE__ */ __name(function notn(width) {
        return this.clone().inotn(width);
      }, "notn");
      BN2.prototype.setn = /* @__PURE__ */ __name(function setn(bit, val) {
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
      }, "setn");
      BN2.prototype.iadd = /* @__PURE__ */ __name(function iadd(num) {
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
      }, "iadd");
      BN2.prototype.add = /* @__PURE__ */ __name(function add2(num) {
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
      }, "add");
      BN2.prototype.isub = /* @__PURE__ */ __name(function isub(num) {
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
      }, "isub");
      BN2.prototype.sub = /* @__PURE__ */ __name(function sub(num) {
        return this.clone().isub(num);
      }, "sub");
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
      __name(smallMulTo, "smallMulTo");
      var comb10MulTo = /* @__PURE__ */ __name(function comb10MulTo2(self2, num, out) {
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
      }, "comb10MulTo");
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
      __name(bigMulTo, "bigMulTo");
      function jumboMulTo(self2, num, out) {
        return bigMulTo(self2, num, out);
      }
      __name(jumboMulTo, "jumboMulTo");
      BN2.prototype.mulTo = /* @__PURE__ */ __name(function mulTo(num, out) {
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
      }, "mulTo");
      function FFTM(x, y) {
        this.x = x;
        this.y = y;
      }
      __name(FFTM, "FFTM");
      FFTM.prototype.makeRBT = /* @__PURE__ */ __name(function makeRBT(N) {
        var t = new Array(N);
        var l = BN2.prototype._countBits(N) - 1;
        for (var i = 0; i < N; i++) {
          t[i] = this.revBin(i, l, N);
        }
        return t;
      }, "makeRBT");
      FFTM.prototype.revBin = /* @__PURE__ */ __name(function revBin(x, l, N) {
        if (x === 0 || x === N - 1) return x;
        var rb = 0;
        for (var i = 0; i < l; i++) {
          rb |= (x & 1) << l - i - 1;
          x >>= 1;
        }
        return rb;
      }, "revBin");
      FFTM.prototype.permute = /* @__PURE__ */ __name(function permute(rbt, rws, iws, rtws, itws, N) {
        for (var i = 0; i < N; i++) {
          rtws[i] = rws[rbt[i]];
          itws[i] = iws[rbt[i]];
        }
      }, "permute");
      FFTM.prototype.transform = /* @__PURE__ */ __name(function transform(rws, iws, rtws, itws, N, rbt) {
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
      }, "transform");
      FFTM.prototype.guessLen13b = /* @__PURE__ */ __name(function guessLen13b(n, m) {
        var N = Math.max(m, n) | 1;
        var odd = N & 1;
        var i = 0;
        for (N = N / 2 | 0; N; N = N >>> 1) {
          i++;
        }
        return 1 << i + 1 + odd;
      }, "guessLen13b");
      FFTM.prototype.conjugate = /* @__PURE__ */ __name(function conjugate(rws, iws, N) {
        if (N <= 1) return;
        for (var i = 0; i < N / 2; i++) {
          var t = rws[i];
          rws[i] = rws[N - i - 1];
          rws[N - i - 1] = t;
          t = iws[i];
          iws[i] = -iws[N - i - 1];
          iws[N - i - 1] = -t;
        }
      }, "conjugate");
      FFTM.prototype.normalize13b = /* @__PURE__ */ __name(function normalize13b(ws, N) {
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
      }, "normalize13b");
      FFTM.prototype.convert13b = /* @__PURE__ */ __name(function convert13b(ws, len, rws, N) {
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
      }, "convert13b");
      FFTM.prototype.stub = /* @__PURE__ */ __name(function stub(N) {
        var ph = new Array(N);
        for (var i = 0; i < N; i++) {
          ph[i] = 0;
        }
        return ph;
      }, "stub");
      FFTM.prototype.mulp = /* @__PURE__ */ __name(function mulp(x, y, out) {
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
      }, "mulp");
      BN2.prototype.mul = /* @__PURE__ */ __name(function mul(num) {
        var out = new BN2(null);
        out.words = new Array(this.length + num.length);
        return this.mulTo(num, out);
      }, "mul");
      BN2.prototype.mulf = /* @__PURE__ */ __name(function mulf(num) {
        var out = new BN2(null);
        out.words = new Array(this.length + num.length);
        return jumboMulTo(this, num, out);
      }, "mulf");
      BN2.prototype.imul = /* @__PURE__ */ __name(function imul(num) {
        return this.clone().mulTo(num, this);
      }, "imul");
      BN2.prototype.imuln = /* @__PURE__ */ __name(function imuln(num) {
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
      }, "imuln");
      BN2.prototype.muln = /* @__PURE__ */ __name(function muln(num) {
        return this.clone().imuln(num);
      }, "muln");
      BN2.prototype.sqr = /* @__PURE__ */ __name(function sqr() {
        return this.mul(this);
      }, "sqr");
      BN2.prototype.isqr = /* @__PURE__ */ __name(function isqr() {
        return this.imul(this.clone());
      }, "isqr");
      BN2.prototype.pow = /* @__PURE__ */ __name(function pow(num) {
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
      }, "pow");
      BN2.prototype.iushln = /* @__PURE__ */ __name(function iushln(bits) {
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
      }, "iushln");
      BN2.prototype.ishln = /* @__PURE__ */ __name(function ishln(bits) {
        assert2(this.negative === 0);
        return this.iushln(bits);
      }, "ishln");
      BN2.prototype.iushrn = /* @__PURE__ */ __name(function iushrn(bits, hint, extended) {
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
      }, "iushrn");
      BN2.prototype.ishrn = /* @__PURE__ */ __name(function ishrn(bits, hint, extended) {
        assert2(this.negative === 0);
        return this.iushrn(bits, hint, extended);
      }, "ishrn");
      BN2.prototype.shln = /* @__PURE__ */ __name(function shln(bits) {
        return this.clone().ishln(bits);
      }, "shln");
      BN2.prototype.ushln = /* @__PURE__ */ __name(function ushln(bits) {
        return this.clone().iushln(bits);
      }, "ushln");
      BN2.prototype.shrn = /* @__PURE__ */ __name(function shrn(bits) {
        return this.clone().ishrn(bits);
      }, "shrn");
      BN2.prototype.ushrn = /* @__PURE__ */ __name(function ushrn(bits) {
        return this.clone().iushrn(bits);
      }, "ushrn");
      BN2.prototype.testn = /* @__PURE__ */ __name(function testn(bit) {
        assert2(typeof bit === "number" && bit >= 0);
        var r = bit % 26;
        var s = (bit - r) / 26;
        var q = 1 << r;
        if (this.length <= s) return false;
        var w = this.words[s];
        return !!(w & q);
      }, "testn");
      BN2.prototype.imaskn = /* @__PURE__ */ __name(function imaskn(bits) {
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
      }, "imaskn");
      BN2.prototype.maskn = /* @__PURE__ */ __name(function maskn(bits) {
        return this.clone().imaskn(bits);
      }, "maskn");
      BN2.prototype.iaddn = /* @__PURE__ */ __name(function iaddn(num) {
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
      }, "iaddn");
      BN2.prototype._iaddn = /* @__PURE__ */ __name(function _iaddn(num) {
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
      }, "_iaddn");
      BN2.prototype.isubn = /* @__PURE__ */ __name(function isubn(num) {
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
      }, "isubn");
      BN2.prototype.addn = /* @__PURE__ */ __name(function addn(num) {
        return this.clone().iaddn(num);
      }, "addn");
      BN2.prototype.subn = /* @__PURE__ */ __name(function subn(num) {
        return this.clone().isubn(num);
      }, "subn");
      BN2.prototype.iabs = /* @__PURE__ */ __name(function iabs() {
        this.negative = 0;
        return this;
      }, "iabs");
      BN2.prototype.abs = /* @__PURE__ */ __name(function abs() {
        return this.clone().iabs();
      }, "abs");
      BN2.prototype._ishlnsubmul = /* @__PURE__ */ __name(function _ishlnsubmul(num, mul, shift) {
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
      }, "_ishlnsubmul");
      BN2.prototype._wordDiv = /* @__PURE__ */ __name(function _wordDiv(num, mode) {
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
      }, "_wordDiv");
      BN2.prototype.divmod = /* @__PURE__ */ __name(function divmod(num, mode, positive) {
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
      }, "divmod");
      BN2.prototype.div = /* @__PURE__ */ __name(function div(num) {
        return this.divmod(num, "div", false).div;
      }, "div");
      BN2.prototype.mod = /* @__PURE__ */ __name(function mod(num) {
        return this.divmod(num, "mod", false).mod;
      }, "mod");
      BN2.prototype.umod = /* @__PURE__ */ __name(function umod(num) {
        return this.divmod(num, "mod", true).mod;
      }, "umod");
      BN2.prototype.divRound = /* @__PURE__ */ __name(function divRound(num) {
        var dm = this.divmod(num);
        if (dm.mod.isZero()) return dm.div;
        var mod = dm.div.negative !== 0 ? dm.mod.isub(num) : dm.mod;
        var half = num.ushrn(1);
        var r2 = num.andln(1);
        var cmp = mod.cmp(half);
        if (cmp < 0 || r2 === 1 && cmp === 0) return dm.div;
        return dm.div.negative !== 0 ? dm.div.isubn(1) : dm.div.iaddn(1);
      }, "divRound");
      BN2.prototype.modrn = /* @__PURE__ */ __name(function modrn(num) {
        var isNegNum = num < 0;
        if (isNegNum) num = -num;
        assert2(num <= 67108863);
        var p = (1 << 26) % num;
        var acc = 0;
        for (var i = this.length - 1; i >= 0; i--) {
          acc = (p * acc + (this.words[i] | 0)) % num;
        }
        return isNegNum ? -acc : acc;
      }, "modrn");
      BN2.prototype.modn = /* @__PURE__ */ __name(function modn(num) {
        return this.modrn(num);
      }, "modn");
      BN2.prototype.idivn = /* @__PURE__ */ __name(function idivn(num) {
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
      }, "idivn");
      BN2.prototype.divn = /* @__PURE__ */ __name(function divn(num) {
        return this.clone().idivn(num);
      }, "divn");
      BN2.prototype.egcd = /* @__PURE__ */ __name(function egcd(p) {
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
      }, "egcd");
      BN2.prototype._invmp = /* @__PURE__ */ __name(function _invmp(p) {
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
      }, "_invmp");
      BN2.prototype.gcd = /* @__PURE__ */ __name(function gcd(num) {
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
      }, "gcd");
      BN2.prototype.invm = /* @__PURE__ */ __name(function invm(num) {
        return this.egcd(num).a.umod(num);
      }, "invm");
      BN2.prototype.isEven = /* @__PURE__ */ __name(function isEven() {
        return (this.words[0] & 1) === 0;
      }, "isEven");
      BN2.prototype.isOdd = /* @__PURE__ */ __name(function isOdd() {
        return (this.words[0] & 1) === 1;
      }, "isOdd");
      BN2.prototype.andln = /* @__PURE__ */ __name(function andln(num) {
        return this.words[0] & num;
      }, "andln");
      BN2.prototype.bincn = /* @__PURE__ */ __name(function bincn(bit) {
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
      }, "bincn");
      BN2.prototype.isZero = /* @__PURE__ */ __name(function isZero() {
        return this.length === 1 && this.words[0] === 0;
      }, "isZero");
      BN2.prototype.cmpn = /* @__PURE__ */ __name(function cmpn(num) {
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
      }, "cmpn");
      BN2.prototype.cmp = /* @__PURE__ */ __name(function cmp(num) {
        if (this.negative !== 0 && num.negative === 0) return -1;
        if (this.negative === 0 && num.negative !== 0) return 1;
        var res = this.ucmp(num);
        if (this.negative !== 0) return -res | 0;
        return res;
      }, "cmp");
      BN2.prototype.ucmp = /* @__PURE__ */ __name(function ucmp(num) {
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
      }, "ucmp");
      BN2.prototype.gtn = /* @__PURE__ */ __name(function gtn(num) {
        return this.cmpn(num) === 1;
      }, "gtn");
      BN2.prototype.gt = /* @__PURE__ */ __name(function gt(num) {
        return this.cmp(num) === 1;
      }, "gt");
      BN2.prototype.gten = /* @__PURE__ */ __name(function gten(num) {
        return this.cmpn(num) >= 0;
      }, "gten");
      BN2.prototype.gte = /* @__PURE__ */ __name(function gte(num) {
        return this.cmp(num) >= 0;
      }, "gte");
      BN2.prototype.ltn = /* @__PURE__ */ __name(function ltn(num) {
        return this.cmpn(num) === -1;
      }, "ltn");
      BN2.prototype.lt = /* @__PURE__ */ __name(function lt(num) {
        return this.cmp(num) === -1;
      }, "lt");
      BN2.prototype.lten = /* @__PURE__ */ __name(function lten(num) {
        return this.cmpn(num) <= 0;
      }, "lten");
      BN2.prototype.lte = /* @__PURE__ */ __name(function lte(num) {
        return this.cmp(num) <= 0;
      }, "lte");
      BN2.prototype.eqn = /* @__PURE__ */ __name(function eqn(num) {
        return this.cmpn(num) === 0;
      }, "eqn");
      BN2.prototype.eq = /* @__PURE__ */ __name(function eq(num) {
        return this.cmp(num) === 0;
      }, "eq");
      BN2.red = /* @__PURE__ */ __name(function red(num) {
        return new Red(num);
      }, "red");
      BN2.prototype.toRed = /* @__PURE__ */ __name(function toRed(ctx) {
        assert2(!this.red, "Already a number in reduction context");
        assert2(this.negative === 0, "red works only with positives");
        return ctx.convertTo(this)._forceRed(ctx);
      }, "toRed");
      BN2.prototype.fromRed = /* @__PURE__ */ __name(function fromRed() {
        assert2(this.red, "fromRed works only with numbers in reduction context");
        return this.red.convertFrom(this);
      }, "fromRed");
      BN2.prototype._forceRed = /* @__PURE__ */ __name(function _forceRed(ctx) {
        this.red = ctx;
        return this;
      }, "_forceRed");
      BN2.prototype.forceRed = /* @__PURE__ */ __name(function forceRed(ctx) {
        assert2(!this.red, "Already a number in reduction context");
        return this._forceRed(ctx);
      }, "forceRed");
      BN2.prototype.redAdd = /* @__PURE__ */ __name(function redAdd(num) {
        assert2(this.red, "redAdd works only with red numbers");
        return this.red.add(this, num);
      }, "redAdd");
      BN2.prototype.redIAdd = /* @__PURE__ */ __name(function redIAdd(num) {
        assert2(this.red, "redIAdd works only with red numbers");
        return this.red.iadd(this, num);
      }, "redIAdd");
      BN2.prototype.redSub = /* @__PURE__ */ __name(function redSub(num) {
        assert2(this.red, "redSub works only with red numbers");
        return this.red.sub(this, num);
      }, "redSub");
      BN2.prototype.redISub = /* @__PURE__ */ __name(function redISub(num) {
        assert2(this.red, "redISub works only with red numbers");
        return this.red.isub(this, num);
      }, "redISub");
      BN2.prototype.redShl = /* @__PURE__ */ __name(function redShl(num) {
        assert2(this.red, "redShl works only with red numbers");
        return this.red.shl(this, num);
      }, "redShl");
      BN2.prototype.redMul = /* @__PURE__ */ __name(function redMul(num) {
        assert2(this.red, "redMul works only with red numbers");
        this.red._verify2(this, num);
        return this.red.mul(this, num);
      }, "redMul");
      BN2.prototype.redIMul = /* @__PURE__ */ __name(function redIMul(num) {
        assert2(this.red, "redMul works only with red numbers");
        this.red._verify2(this, num);
        return this.red.imul(this, num);
      }, "redIMul");
      BN2.prototype.redSqr = /* @__PURE__ */ __name(function redSqr() {
        assert2(this.red, "redSqr works only with red numbers");
        this.red._verify1(this);
        return this.red.sqr(this);
      }, "redSqr");
      BN2.prototype.redISqr = /* @__PURE__ */ __name(function redISqr() {
        assert2(this.red, "redISqr works only with red numbers");
        this.red._verify1(this);
        return this.red.isqr(this);
      }, "redISqr");
      BN2.prototype.redSqrt = /* @__PURE__ */ __name(function redSqrt() {
        assert2(this.red, "redSqrt works only with red numbers");
        this.red._verify1(this);
        return this.red.sqrt(this);
      }, "redSqrt");
      BN2.prototype.redInvm = /* @__PURE__ */ __name(function redInvm() {
        assert2(this.red, "redInvm works only with red numbers");
        this.red._verify1(this);
        return this.red.invm(this);
      }, "redInvm");
      BN2.prototype.redNeg = /* @__PURE__ */ __name(function redNeg() {
        assert2(this.red, "redNeg works only with red numbers");
        this.red._verify1(this);
        return this.red.neg(this);
      }, "redNeg");
      BN2.prototype.redPow = /* @__PURE__ */ __name(function redPow(num) {
        assert2(this.red && !num.red, "redPow(normalNum)");
        this.red._verify1(this);
        return this.red.pow(this, num);
      }, "redPow");
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
      __name(MPrime, "MPrime");
      MPrime.prototype._tmp = /* @__PURE__ */ __name(function _tmp() {
        var tmp = new BN2(null);
        tmp.words = new Array(Math.ceil(this.n / 13));
        return tmp;
      }, "_tmp");
      MPrime.prototype.ireduce = /* @__PURE__ */ __name(function ireduce(num) {
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
      }, "ireduce");
      MPrime.prototype.split = /* @__PURE__ */ __name(function split2(input, out) {
        input.iushrn(this.n, 0, out);
      }, "split");
      MPrime.prototype.imulK = /* @__PURE__ */ __name(function imulK(num) {
        return num.imul(this.k);
      }, "imulK");
      function K256() {
        MPrime.call(this, "k256", "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f");
      }
      __name(K256, "K256");
      inherits(K256, MPrime);
      K256.prototype.split = /* @__PURE__ */ __name(function split2(input, output2) {
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
      }, "split");
      K256.prototype.imulK = /* @__PURE__ */ __name(function imulK(num) {
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
      }, "imulK");
      function P224() {
        MPrime.call(this, "p224", "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001");
      }
      __name(P224, "P224");
      inherits(P224, MPrime);
      function P192() {
        MPrime.call(this, "p192", "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff");
      }
      __name(P192, "P192");
      inherits(P192, MPrime);
      function P25519() {
        MPrime.call(this, "25519", "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed");
      }
      __name(P25519, "P25519");
      inherits(P25519, MPrime);
      P25519.prototype.imulK = /* @__PURE__ */ __name(function imulK(num) {
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
      }, "imulK");
      BN2._prime = /* @__PURE__ */ __name(function prime(name) {
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
      }, "prime");
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
      __name(Red, "Red");
      Red.prototype._verify1 = /* @__PURE__ */ __name(function _verify1(a) {
        assert2(a.negative === 0, "red works only with positives");
        assert2(a.red, "red works only with red numbers");
      }, "_verify1");
      Red.prototype._verify2 = /* @__PURE__ */ __name(function _verify2(a, b) {
        assert2((a.negative | b.negative) === 0, "red works only with positives");
        assert2(a.red && a.red === b.red, "red works only with red numbers");
      }, "_verify2");
      Red.prototype.imod = /* @__PURE__ */ __name(function imod(a) {
        if (this.prime) return this.prime.ireduce(a)._forceRed(this);
        move(a, a.umod(this.m)._forceRed(this));
        return a;
      }, "imod");
      Red.prototype.neg = /* @__PURE__ */ __name(function neg(a) {
        if (a.isZero()) {
          return a.clone();
        }
        return this.m.sub(a)._forceRed(this);
      }, "neg");
      Red.prototype.add = /* @__PURE__ */ __name(function add2(a, b) {
        this._verify2(a, b);
        var res = a.add(b);
        if (res.cmp(this.m) >= 0) {
          res.isub(this.m);
        }
        return res._forceRed(this);
      }, "add");
      Red.prototype.iadd = /* @__PURE__ */ __name(function iadd(a, b) {
        this._verify2(a, b);
        var res = a.iadd(b);
        if (res.cmp(this.m) >= 0) {
          res.isub(this.m);
        }
        return res;
      }, "iadd");
      Red.prototype.sub = /* @__PURE__ */ __name(function sub(a, b) {
        this._verify2(a, b);
        var res = a.sub(b);
        if (res.cmpn(0) < 0) {
          res.iadd(this.m);
        }
        return res._forceRed(this);
      }, "sub");
      Red.prototype.isub = /* @__PURE__ */ __name(function isub(a, b) {
        this._verify2(a, b);
        var res = a.isub(b);
        if (res.cmpn(0) < 0) {
          res.iadd(this.m);
        }
        return res;
      }, "isub");
      Red.prototype.shl = /* @__PURE__ */ __name(function shl(a, num) {
        this._verify1(a);
        return this.imod(a.ushln(num));
      }, "shl");
      Red.prototype.imul = /* @__PURE__ */ __name(function imul(a, b) {
        this._verify2(a, b);
        return this.imod(a.imul(b));
      }, "imul");
      Red.prototype.mul = /* @__PURE__ */ __name(function mul(a, b) {
        this._verify2(a, b);
        return this.imod(a.mul(b));
      }, "mul");
      Red.prototype.isqr = /* @__PURE__ */ __name(function isqr(a) {
        return this.imul(a, a.clone());
      }, "isqr");
      Red.prototype.sqr = /* @__PURE__ */ __name(function sqr(a) {
        return this.mul(a, a);
      }, "sqr");
      Red.prototype.sqrt = /* @__PURE__ */ __name(function sqrt(a) {
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
      }, "sqrt");
      Red.prototype.invm = /* @__PURE__ */ __name(function invm(a) {
        var inv = a._invmp(this.m);
        if (inv.negative !== 0) {
          inv.negative = 0;
          return this.imod(inv).redNeg();
        } else {
          return this.imod(inv);
        }
      }, "invm");
      Red.prototype.pow = /* @__PURE__ */ __name(function pow(a, num) {
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
      }, "pow");
      Red.prototype.convertTo = /* @__PURE__ */ __name(function convertTo(num) {
        var r = num.umod(this.m);
        return r === num ? r.clone() : r;
      }, "convertTo");
      Red.prototype.convertFrom = /* @__PURE__ */ __name(function convertFrom(num) {
        var res = num.clone();
        res.red = null;
        return res;
      }, "convertFrom");
      BN2.mont = /* @__PURE__ */ __name(function mont(num) {
        return new Mont(num);
      }, "mont");
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
      __name(Mont, "Mont");
      inherits(Mont, Red);
      Mont.prototype.convertTo = /* @__PURE__ */ __name(function convertTo(num) {
        return this.imod(num.ushln(this.shift));
      }, "convertTo");
      Mont.prototype.convertFrom = /* @__PURE__ */ __name(function convertFrom(num) {
        var r = this.imod(num.mul(this.rinv));
        r.red = null;
        return r;
      }, "convertFrom");
      Mont.prototype.imul = /* @__PURE__ */ __name(function imul(a, b) {
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
      }, "imul");
      Mont.prototype.mul = /* @__PURE__ */ __name(function mul(a, b) {
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
      }, "mul");
      Mont.prototype.invm = /* @__PURE__ */ __name(function invm(a) {
        var res = this.imod(a._invmp(this.m).mul(this.r2));
        return res._forceRed(this);
      }, "invm");
    })(typeof module === "undefined" || module, exports);
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
    [
      "NFD",
      "NFC",
      "NFKD",
      "NFKC"
    ].forEach((form) => {
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
var _permanentCensorErrors, _censorErrors, LogLevels, _logLevel, _globalLogger, _normalizeError, LogLevel, ErrorCode, HEX, _Logger, Logger;
var init_lib = __esm({
  "node_modules/@ethersproject/logger/lib.esm/index.js"() {
    "use strict";
    init_version();
    _permanentCensorErrors = false;
    _censorErrors = false;
    LogLevels = {
      debug: 1,
      "default": 2,
      info: 2,
      warning: 3,
      error: 4,
      off: 5
    };
    _logLevel = LogLevels["default"];
    _globalLogger = null;
    __name(_checkNormalize, "_checkNormalize");
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
    _Logger = class _Logger {
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
          this.throwError("missing new", _Logger.errors.MISSING_NEW, {
            name: kind.name
          });
        }
      }
      checkAbstract(target, kind) {
        if (target === kind) {
          this.throwError("cannot instantiate abstract class " + JSON.stringify(kind.name) + " directly; use a sub-class", _Logger.errors.UNSUPPORTED_OPERATION, {
            name: target.name,
            operation: "new"
          });
        } else if (target === Object || target == null) {
          this.throwError("missing new", _Logger.errors.MISSING_NEW, {
            name: kind.name
          });
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
    __name(_Logger, "Logger");
    Logger = _Logger;
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
    __name(isHexable, "isHexable");
    __name(addSlice, "addSlice");
    __name(isInteger, "isInteger");
    __name(isBytes, "isBytes");
    __name(arrayify, "arrayify");
    __name(concat, "concat");
    __name(isHexString, "isHexString");
    HexCharacters = "0123456789abcdef";
    __name(hexlify, "hexlify");
    __name(hexDataSlice, "hexDataSlice");
    __name(hexConcat, "hexConcat");
    __name(hexZeroPad, "hexZeroPad");
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
  const params = {
    fault,
    operation
  };
  if (value != null) {
    params.value = value;
  }
  return logger2.throwError(fault, Logger.errors.NUMERIC_FAULT, params);
}
function _base36To16(value) {
  return new BN(value, 36).toString(16);
}
var import_bn, BN, logger2, _constructorGuard, MAX_SAFE, _warnedToStringRadix, _BigNumber, BigNumber;
var init_bignumber = __esm({
  "node_modules/@ethersproject/bignumber/lib.esm/bignumber.js"() {
    "use strict";
    import_bn = __toESM(require_bn());
    init_lib2();
    init_lib();
    init_version3();
    BN = import_bn.default.BN;
    logger2 = new Logger(version3);
    _constructorGuard = {};
    MAX_SAFE = 9007199254740991;
    _warnedToStringRadix = false;
    _BigNumber = class _BigNumber {
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
        return {
          type: "BigNumber",
          hex: this.toHexString()
        };
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
    __name(_BigNumber, "BigNumber");
    BigNumber = _BigNumber;
    __name(toHex, "toHex");
    __name(toBigNumber, "toBigNumber");
    __name(toBN, "toBN");
    __name(throwFault, "throwFault");
    __name(_base36To16, "_base36To16");
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
var logger3, opaque, _Description, Description;
var init_lib4 = __esm({
  "node_modules/@ethersproject/properties/lib.esm/index.js"() {
    "use strict";
    init_lib();
    init_version4();
    logger3 = new Logger(version4);
    __name(defineReadOnly, "defineReadOnly");
    __name(getStatic, "getStatic");
    opaque = {
      bigint: true,
      boolean: true,
      "function": true,
      number: true,
      string: true
    };
    __name(_isFrozen, "_isFrozen");
    __name(_deepCopy, "_deepCopy");
    __name(deepCopy, "deepCopy");
    _Description = class _Description {
      constructor(info) {
        for (const key in info) {
          this[key] = deepCopy(info[key]);
        }
      }
    };
    __name(_Description, "Description");
    Description = _Description;
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
  __name(throwError, "throwError");
  param = param.replace(/\s/g, " ");
  function newNode(parent2) {
    let node2 = {
      type: "",
      name: "",
      parent: parent2,
      state: {
        allowType: true
      }
    };
    if (allowIndexed) {
      node2.indexed = false;
    }
    return node2;
  }
  __name(newNode, "newNode");
  let parent = {
    type: "",
    name: "",
    state: {
      allowType: true
    }
  };
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
        node.components = [
          newNode(node)
        ];
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
var logger4, _constructorGuard2, ModifiersBytes, ModifiersNest, FormatTypes, paramTypeArray, _ParamType, ParamType, _Fragment, Fragment, _EventFragment, EventFragment, _ConstructorFragment, ConstructorFragment, _FunctionFragment, FunctionFragment, _ErrorFragment, ErrorFragment, regexIdentifier, regexParen;
var init_fragments = __esm({
  "node_modules/@ethersproject/abi/lib.esm/fragments.js"() {
    "use strict";
    init_lib3();
    init_lib4();
    init_lib();
    init_version5();
    logger4 = new Logger(version5);
    _constructorGuard2 = {};
    ModifiersBytes = {
      calldata: true,
      memory: true,
      storage: true
    };
    ModifiersNest = {
      calldata: true,
      memory: true
    };
    __name(checkModifier, "checkModifier");
    __name(parseParamType, "parseParamType");
    __name(populate, "populate");
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
    _ParamType = class _ParamType {
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
        __name(ParamTypify, "ParamTypify");
        return ParamTypify(parseParamType(value, !!allowIndexed));
      }
      static isParamType(value) {
        return !!(value != null && value._isParamType);
      }
    };
    __name(_ParamType, "ParamType");
    ParamType = _ParamType;
    __name(parseParams, "parseParams");
    _Fragment = class _Fragment {
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
    __name(_Fragment, "Fragment");
    Fragment = _Fragment;
    _EventFragment = class _EventFragment extends Fragment {
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
    __name(_EventFragment, "EventFragment");
    EventFragment = _EventFragment;
    __name(parseGas, "parseGas");
    __name(parseModifiers, "parseModifiers");
    __name(verifyState, "verifyState");
    _ConstructorFragment = class _ConstructorFragment extends Fragment {
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
        let params = {
          type: "constructor"
        };
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
    __name(_ConstructorFragment, "ConstructorFragment");
    ConstructorFragment = _ConstructorFragment;
    _FunctionFragment = class _FunctionFragment extends ConstructorFragment {
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
        let params = {
          type: "function"
        };
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
    __name(_FunctionFragment, "FunctionFragment");
    FunctionFragment = _FunctionFragment;
    __name(checkForbidden, "checkForbidden");
    _ErrorFragment = class _ErrorFragment extends Fragment {
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
        let params = {
          type: "error"
        };
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
    __name(_ErrorFragment, "ErrorFragment");
    ErrorFragment = _ErrorFragment;
    __name(verifyType, "verifyType");
    regexIdentifier = new RegExp("^[a-zA-Z$_][a-zA-Z0-9$_]*$");
    __name(verifyIdentifier, "verifyIdentifier");
    regexParen = new RegExp("^([^)(]*)\\((.*)\\)([^)(]*)$");
    __name(splitNesting, "splitNesting");
  }
});

// node_modules/@ethersproject/abi/lib.esm/coders/abstract-coder.js
function checkResultErrors(result) {
  const errors = [];
  const checkErrors = /* @__PURE__ */ __name(function(path, object) {
    if (!Array.isArray(object)) {
      return;
    }
    for (let key in object) {
      const childPath = path.slice();
      childPath.push(key);
      try {
        checkErrors(childPath, object[key]);
      } catch (error) {
        errors.push({
          path: childPath,
          error
        });
      }
    }
  }, "checkErrors");
  checkErrors([], result);
  return errors;
}
var logger5, _Coder, Coder, _Writer, Writer, _Reader, Reader;
var init_abstract_coder = __esm({
  "node_modules/@ethersproject/abi/lib.esm/coders/abstract-coder.js"() {
    "use strict";
    init_lib2();
    init_lib3();
    init_lib4();
    init_lib();
    init_version5();
    logger5 = new Logger(version5);
    __name(checkResultErrors, "checkResultErrors");
    _Coder = class _Coder {
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
    __name(_Coder, "Coder");
    Coder = _Coder;
    _Writer = class _Writer {
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
          bytes2 = concat([
            bytes2,
            this._padding.slice(paddingOffset)
          ]);
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
          bytes2 = concat([
            this._padding.slice(bytes2.length % this.wordSize),
            bytes2
          ]);
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
    __name(_Writer, "Writer");
    Writer = _Writer;
    _Reader = class _Reader {
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
    __name(_Reader, "Reader");
    Reader = _Reader;
  }
});

// node_modules/js-sha3/src/sha3.js
var require_sha3 = __commonJS({
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
      var SHAKE_PADDING = [
        31,
        7936,
        2031616,
        520093696
      ];
      var CSHAKE_PADDING = [
        4,
        1024,
        262144,
        67108864
      ];
      var KECCAK_PADDING = [
        1,
        256,
        65536,
        16777216
      ];
      var PADDING = [
        6,
        1536,
        393216,
        100663296
      ];
      var SHIFT = [
        0,
        8,
        16,
        24
      ];
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
      var BITS = [
        224,
        256,
        384,
        512
      ];
      var SHAKE_BITS = [
        128,
        256
      ];
      var OUTPUT_TYPES = [
        "hex",
        "buffer",
        "arrayBuffer",
        "array",
        "digest"
      ];
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
      var createOutputMethod = /* @__PURE__ */ __name(function(bits2, padding, outputType) {
        return function(message) {
          return new Keccak2(bits2, padding, bits2).update(message)[outputType]();
        };
      }, "createOutputMethod");
      var createShakeOutputMethod = /* @__PURE__ */ __name(function(bits2, padding, outputType) {
        return function(message, outputBits) {
          return new Keccak2(bits2, padding, outputBits).update(message)[outputType]();
        };
      }, "createShakeOutputMethod");
      var createCshakeOutputMethod = /* @__PURE__ */ __name(function(bits2, padding, outputType) {
        return function(message, outputBits, n, s) {
          return methods["cshake" + bits2].update(message, outputBits, n, s)[outputType]();
        };
      }, "createCshakeOutputMethod");
      var createKmacOutputMethod = /* @__PURE__ */ __name(function(bits2, padding, outputType) {
        return function(key, message, outputBits, s) {
          return methods["kmac" + bits2].update(key, message, outputBits, s)[outputType]();
        };
      }, "createKmacOutputMethod");
      var createOutputMethods = /* @__PURE__ */ __name(function(method, createMethod2, bits2, padding) {
        for (var i2 = 0; i2 < OUTPUT_TYPES.length; ++i2) {
          var type = OUTPUT_TYPES[i2];
          method[type] = createMethod2(bits2, padding, type);
        }
        return method;
      }, "createOutputMethods");
      var createMethod = /* @__PURE__ */ __name(function(bits2, padding) {
        var method = createOutputMethod(bits2, padding, "hex");
        method.create = function() {
          return new Keccak2(bits2, padding, bits2);
        };
        method.update = function(message) {
          return method.create().update(message);
        };
        return createOutputMethods(method, createOutputMethod, bits2, padding);
      }, "createMethod");
      var createShakeMethod = /* @__PURE__ */ __name(function(bits2, padding) {
        var method = createShakeOutputMethod(bits2, padding, "hex");
        method.create = function(outputBits) {
          return new Keccak2(bits2, padding, outputBits);
        };
        method.update = function(message, outputBits) {
          return method.create(outputBits).update(message);
        };
        return createOutputMethods(method, createShakeOutputMethod, bits2, padding);
      }, "createShakeMethod");
      var createCshakeMethod = /* @__PURE__ */ __name(function(bits2, padding) {
        var w = CSHAKE_BYTEPAD[bits2];
        var method = createCshakeOutputMethod(bits2, padding, "hex");
        method.create = function(outputBits, n, s) {
          if (!n && !s) {
            return methods["shake" + bits2].create(outputBits);
          } else {
            return new Keccak2(bits2, padding, outputBits).bytepad([
              n,
              s
            ], w);
          }
        };
        method.update = function(message, outputBits, n, s) {
          return method.create(outputBits, n, s).update(message);
        };
        return createOutputMethods(method, createCshakeOutputMethod, bits2, padding);
      }, "createCshakeMethod");
      var createKmacMethod = /* @__PURE__ */ __name(function(bits2, padding) {
        var w = CSHAKE_BYTEPAD[bits2];
        var method = createKmacOutputMethod(bits2, padding, "hex");
        method.create = function(key, outputBits, s) {
          return new Kmac(bits2, padding, outputBits).bytepad([
            "KMAC",
            s
          ], w).bytepad([
            key
          ], w);
        };
        method.update = function(key, message, outputBits, s) {
          return method.create(key, outputBits, s).update(message);
        };
        return createOutputMethods(method, createKmacOutputMethod, bits2, padding);
      }, "createKmacMethod");
      var algorithms = [
        {
          name: "keccak",
          padding: KECCAK_PADDING,
          bits: BITS,
          createMethod
        },
        {
          name: "sha3",
          padding: PADDING,
          bits: BITS,
          createMethod
        },
        {
          name: "shake",
          padding: SHAKE_PADDING,
          bits: SHAKE_BITS,
          createMethod: createShakeMethod
        },
        {
          name: "cshake",
          padding: CSHAKE_PADDING,
          bits: SHAKE_BITS,
          createMethod: createCshakeMethod
        },
        {
          name: "kmac",
          padding: CSHAKE_PADDING,
          bits: SHAKE_BITS,
          createMethod: createKmacMethod
        }
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
      __name(Keccak2, "Keccak");
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
        var bytes2 = [
          o
        ];
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
      __name(Kmac, "Kmac");
      Kmac.prototype = new Keccak2();
      Kmac.prototype.finalize = function() {
        this.encode(this.outputBits, true);
        return Keccak2.prototype.finalize.call(this);
      };
      var f = /* @__PURE__ */ __name(function(s) {
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
      }, "f");
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

// node_modules/@ethersproject/keccak256/lib.esm/index.js
function keccak256(data) {
  return "0x" + import_js_sha3.default.keccak_256(arrayify(data));
}
var import_js_sha3;
var init_lib5 = __esm({
  "node_modules/@ethersproject/keccak256/lib.esm/index.js"() {
    "use strict";
    import_js_sha3 = __toESM(require_sha3());
    init_lib2();
    __name(keccak256, "keccak256");
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
    __name(getChecksumAddress, "getChecksumAddress");
    MAX_SAFE_INTEGER = 9007199254740991;
    __name(log10, "log10");
    ibanLookup = {};
    for (let i = 0; i < 10; i++) {
      ibanLookup[String(i)] = String(i);
    }
    for (let i = 0; i < 26; i++) {
      ibanLookup[String.fromCharCode(65 + i)] = String(10 + i);
    }
    safeDigits = Math.floor(log10(MAX_SAFE_INTEGER));
    __name(ibanChecksum, "ibanChecksum");
    __name(getAddress, "getAddress");
  }
});

// node_modules/@ethersproject/abi/lib.esm/coders/address.js
var _AddressCoder, AddressCoder;
var init_address = __esm({
  "node_modules/@ethersproject/abi/lib.esm/coders/address.js"() {
    "use strict";
    init_lib6();
    init_lib2();
    init_abstract_coder();
    _AddressCoder = class _AddressCoder extends Coder {
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
    __name(_AddressCoder, "AddressCoder");
    AddressCoder = _AddressCoder;
  }
});

// node_modules/@ethersproject/abi/lib.esm/coders/anonymous.js
var _AnonymousCoder, AnonymousCoder;
var init_anonymous = __esm({
  "node_modules/@ethersproject/abi/lib.esm/coders/anonymous.js"() {
    "use strict";
    init_abstract_coder();
    _AnonymousCoder = class _AnonymousCoder extends Coder {
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
    __name(_AnonymousCoder, "AnonymousCoder");
    AnonymousCoder = _AnonymousCoder;
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
        get: /* @__PURE__ */ __name(() => {
          throw value;
        }, "get")
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
        get: /* @__PURE__ */ __name(() => {
          throw value;
        }, "get")
      });
    }
  }
  return Object.freeze(values);
}
var logger7, _ArrayCoder, ArrayCoder;
var init_array = __esm({
  "node_modules/@ethersproject/abi/lib.esm/coders/array.js"() {
    "use strict";
    init_lib();
    init_version5();
    init_abstract_coder();
    init_anonymous();
    logger7 = new Logger(version5);
    __name(pack, "pack");
    __name(unpack, "unpack");
    _ArrayCoder = class _ArrayCoder extends Coder {
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
    __name(_ArrayCoder, "ArrayCoder");
    ArrayCoder = _ArrayCoder;
  }
});

// node_modules/@ethersproject/abi/lib.esm/coders/boolean.js
var _BooleanCoder, BooleanCoder;
var init_boolean = __esm({
  "node_modules/@ethersproject/abi/lib.esm/coders/boolean.js"() {
    "use strict";
    init_abstract_coder();
    _BooleanCoder = class _BooleanCoder extends Coder {
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
    __name(_BooleanCoder, "BooleanCoder");
    BooleanCoder = _BooleanCoder;
  }
});

// node_modules/@ethersproject/abi/lib.esm/coders/bytes.js
var _DynamicBytesCoder, DynamicBytesCoder, _BytesCoder, BytesCoder;
var init_bytes = __esm({
  "node_modules/@ethersproject/abi/lib.esm/coders/bytes.js"() {
    "use strict";
    init_lib2();
    init_abstract_coder();
    _DynamicBytesCoder = class _DynamicBytesCoder extends Coder {
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
    __name(_DynamicBytesCoder, "DynamicBytesCoder");
    DynamicBytesCoder = _DynamicBytesCoder;
    _BytesCoder = class _BytesCoder extends DynamicBytesCoder {
      constructor(localName) {
        super("bytes", localName);
      }
      decode(reader) {
        return reader.coerce(this.name, hexlify(super.decode(reader)));
      }
    };
    __name(_BytesCoder, "BytesCoder");
    BytesCoder = _BytesCoder;
  }
});

// node_modules/@ethersproject/abi/lib.esm/coders/fixed-bytes.js
var _FixedBytesCoder, FixedBytesCoder;
var init_fixed_bytes = __esm({
  "node_modules/@ethersproject/abi/lib.esm/coders/fixed-bytes.js"() {
    "use strict";
    init_lib2();
    init_abstract_coder();
    _FixedBytesCoder = class _FixedBytesCoder extends Coder {
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
    __name(_FixedBytesCoder, "FixedBytesCoder");
    FixedBytesCoder = _FixedBytesCoder;
  }
});

// node_modules/@ethersproject/abi/lib.esm/coders/null.js
var _NullCoder, NullCoder;
var init_null = __esm({
  "node_modules/@ethersproject/abi/lib.esm/coders/null.js"() {
    "use strict";
    init_abstract_coder();
    _NullCoder = class _NullCoder extends Coder {
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
    __name(_NullCoder, "NullCoder");
    NullCoder = _NullCoder;
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
var _NumberCoder, NumberCoder;
var init_number = __esm({
  "node_modules/@ethersproject/abi/lib.esm/coders/number.js"() {
    "use strict";
    init_lib3();
    init_lib7();
    init_abstract_coder();
    _NumberCoder = class _NumberCoder extends Coder {
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
    __name(_NumberCoder, "NumberCoder");
    NumberCoder = _NumberCoder;
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
    __name(errorFunc, "errorFunc");
    __name(ignoreFunc, "ignoreFunc");
    __name(replaceFunc, "replaceFunc");
    Utf8ErrorFuncs = Object.freeze({
      error: errorFunc,
      ignore: ignoreFunc,
      replace: replaceFunc
    });
    __name(getUtf8CodePoints, "getUtf8CodePoints");
    __name(toUtf8Bytes, "toUtf8Bytes");
    __name(_toUtf8String, "_toUtf8String");
    __name(toUtf8String, "toUtf8String");
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
var _StringCoder, StringCoder;
var init_string = __esm({
  "node_modules/@ethersproject/abi/lib.esm/coders/string.js"() {
    "use strict";
    init_lib8();
    init_bytes();
    _StringCoder = class _StringCoder extends DynamicBytesCoder {
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
    __name(_StringCoder, "StringCoder");
    StringCoder = _StringCoder;
  }
});

// node_modules/@ethersproject/abi/lib.esm/coders/tuple.js
var _TupleCoder, TupleCoder;
var init_tuple = __esm({
  "node_modules/@ethersproject/abi/lib.esm/coders/tuple.js"() {
    "use strict";
    init_abstract_coder();
    init_array();
    _TupleCoder = class _TupleCoder extends Coder {
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
    __name(_TupleCoder, "TupleCoder");
    TupleCoder = _TupleCoder;
  }
});

// node_modules/@ethersproject/abi/lib.esm/abi-coder.js
var logger9, paramTypeBytes, paramTypeNumber, _AbiCoder, AbiCoder, defaultAbiCoder;
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
    _AbiCoder = class _AbiCoder {
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
            count: {
              types: types.length,
              values: values.length
            },
            value: {
              types,
              values
            }
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
    __name(_AbiCoder, "AbiCoder");
    AbiCoder = _AbiCoder;
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
    __name(id, "id");
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
var logger10, _LogDescription, LogDescription, _TransactionDescription, TransactionDescription, _ErrorDescription, ErrorDescription, _Indexed, Indexed, BuiltinErrors, _Interface, Interface;
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
    _LogDescription = class _LogDescription extends Description {
    };
    __name(_LogDescription, "LogDescription");
    LogDescription = _LogDescription;
    _TransactionDescription = class _TransactionDescription extends Description {
    };
    __name(_TransactionDescription, "TransactionDescription");
    TransactionDescription = _TransactionDescription;
    _ErrorDescription = class _ErrorDescription extends Description {
    };
    __name(_ErrorDescription, "ErrorDescription");
    ErrorDescription = _ErrorDescription;
    _Indexed = class _Indexed extends Description {
      static isIndexed(value) {
        return !!(value && value._isIndexed);
      }
    };
    __name(_Indexed, "Indexed");
    Indexed = _Indexed;
    BuiltinErrors = {
      "0x08c379a0": {
        signature: "Error(string)",
        name: "Error",
        inputs: [
          "string"
        ],
        reason: true
      },
      "0x4e487b71": {
        signature: "Panic(uint256)",
        name: "Panic",
        inputs: [
          "uint256"
        ]
      }
    };
    __name(wrapAccessError, "wrapAccessError");
    _Interface = class _Interface {
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
        const encodeTopic = /* @__PURE__ */ __name((param, value) => {
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
            this._abiCoder.encode([
              "address"
            ], [
              value
            ]);
          }
          return hexZeroPad(hexlify(value), 32);
        }, "encodeTopic");
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
              topics.push(this._abiCoder.encode([
                param.type
              ], [
                value
              ]));
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
            logger10.throwError("fragment/topic mismatch", Logger.errors.INVALID_ARGUMENT, {
              argument: "topics[0]",
              expected: topicHash,
              value: topics[0]
            });
          }
          topics = topics.slice(1);
        }
        let indexed = [];
        let nonIndexed = [];
        let dynamic = [];
        eventFragment.inputs.forEach((param, index) => {
          if (param.indexed) {
            if (param.type === "string" || param.type === "bytes" || param.baseType === "tuple" || param.baseType === "array") {
              indexed.push(ParamType.fromObject({
                type: "bytes32",
                name: param.name
              }));
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
              result[index] = new Indexed({
                _isIndexed: true,
                hash: null
              });
            } else if (dynamic[index]) {
              result[index] = new Indexed({
                _isIndexed: true,
                hash: resultIndexed[indexedIndex++]
              });
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
                get: /* @__PURE__ */ __name(() => {
                  throw wrapAccessError(`property ${JSON.stringify(param.name)}`, value);
                }, "get")
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
              get: /* @__PURE__ */ __name(() => {
                throw wrapAccessError(`index ${i}`, value);
              }, "get")
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
    __name(_Interface, "Interface");
    Interface = _Interface;
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
var require_lib = __commonJS({
  "node_modules/web3-eth-abi/lib/index.js"(exports, module) {
    var Buffer2 = __require("buffer").Buffer;
    var utils = __require("web3-utils");
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
    __name(Result, "Result");
    var ABICoder = /* @__PURE__ */ __name(function() {
    }, "ABICoder");
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
      return this.encodeParameters([
        type
      ], [
        param
      ]);
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
          const modifyParams = /* @__PURE__ */ __name((coder3, param2) => {
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
          }, "modifyParams");
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
          type = Object.assign({}, type, {
            type: "bytes24"
          });
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
      return {
        type,
        name: structName
      };
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
      return this.decodeParameters([
        type
      ], bytes2)[0];
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
      topics = Array.isArray(topics) ? topics : [
        topics
      ];
      data = data || "";
      var notIndexedInputs = [];
      var indexedParams = [];
      var topicCount = 0;
      inputs.forEach(function(input, i) {
        if (input.indexed) {
          indexedParams[i] = [
            "bool",
            "int",
            "uint",
            "address",
            "fixed",
            "ufixed"
          ].find(function(staticType) {
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
import { recoverTypedSignature, SignTypedDataVersion } from "@metamask/eth-sig-util";
import { keccak256 as keccak2562, _jsonInterfaceMethodToString } from "web3-utils";

// node_modules/@noble/hashes/esm/cryptoNode.js
import * as nc from "node:crypto";
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
var import_web3_eth_abi = __toESM(require_lib(), 1);
import { recoverPersonalSignature } from "@metamask/eth-sig-util";
function recoverTypedSignatureV4(signObj, signature) {
  return recoverTypedSignature({
    data: signObj,
    signature,
    version: SignTypedDataVersion.V4
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
  const recovered = recoverPersonalSignature({
    data: message,
    signature
  });
  return recovered === address;
}
__name(checkPersionalSign, "checkPersionalSign");
var getTopics = /* @__PURE__ */ __name((abi) => {
  return keccak2562(_jsonInterfaceMethodToString(abi));
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
  const abiInputs = [
    ...abi.inputs
  ];
  let result = import_web3_eth_abi.default.decodeLog(abiInputs, eventData.data, eventData.topics.slice(1));
  let decodedData = {};
  for (let i = 0; i < abiInputs.length; i++) {
    const input = abiInputs[i];
    const value = result[i];
    decodedData[input.name] = parseOne(input, value);
  }
  return decodedData;
}, "decodeEvent");
export {
  buildLoginSignMsg,
  checkPersionalSign,
  decodeEvent,
  formatAddress,
  getTopics,
  recoverTypedSignatureV4,
  toEIP55
};
/*! Bundled license information:

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
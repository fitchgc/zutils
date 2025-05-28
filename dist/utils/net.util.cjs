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

// src/utils/net.util.ts
var net_util_exports = {};
__export(net_util_exports, {
  RE_URL_SCHEME: () => RE_URL_SCHEME,
  checkParamsNeeded: () => checkParamsNeeded,
  decodeJWT: () => decodeJWT,
  findUrlScheme: () => findUrlScheme,
  generateHeader: () => generateHeader,
  generateKVStr: () => generateKVStr,
  keyValToObject: () => keyValToObject
});
module.exports = __toCommonJS(net_util_exports);

// src/common/ZError.ts
var ZError = class {
  constructor(statusCode, message) {
    this.statusCode = statusCode;
    this.message = message;
  }
};

// src/utils/net.util.ts
function generateHeader() {
  let random = function(start, end) {
    return Math.random() * (end - start) + start | 0;
  };
  let getIp = function() {
    return `${random(1, 254)}.${random(1, 254)}.${random(1, 254)}.${random(1, 254)}`;
  };
  let time = Date.now();
  let useragent = `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_0_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${70 + Math.random() * 10 | 0}.0.4324.${Math.random() * 100 | 0} Safari/537.36`;
  const ip = getIp();
  return {
    "Refresh-Token": time -= 5e3,
    "Cache-Control": "no-cache",
    "User-Agent": useragent,
    "X-Forwarded-For": ip,
    "X-Real-IP": ip,
    "Content-Type": "application/json"
  };
}
var checkParamsNeeded = (...args) => {
  args.forEach((arg) => {
    if (!arg) {
      throw new ZError(10, "parameters mismatch");
    }
  });
};
function generateKVStr({
  data = {},
  sort = false,
  encode = false,
  ignoreNull = true,
  splitChar = "&",
  equalChar = "=",
  uri = ""
}) {
  const keys = Object.keys(data);
  sort && keys.sort();
  let result = "";
  let i = 0;
  for (let key of keys) {
    if (ignoreNull && !data[key]) {
      continue;
    }
    if (i++ > 0) result += splitChar;
    if (encode) {
      result += `${key}${equalChar}${encodeURIComponent(data[key])}`;
    } else {
      result += `${key}${equalChar}${data[key]}`;
    }
  }
  if (uri) {
    const joinChar = uri.search(/\?/) === -1 ? "?" : "&";
    result = uri + joinChar + result;
  }
  return result;
}
function keyValToObject(str, splitChar = "&", equalChar = "=") {
  let result = {};
  if (!str) {
    return result;
  }
  let arrs = str.split(splitChar);
  for (let sub of arrs) {
    let subArr = sub.split(equalChar);
    result[subArr[0]] = subArr[1];
  }
  return result;
}
var RE_URL_SCHEME = /^(.+?):\/\/.+?$/;
function findUrlScheme(url) {
  let result = url.match(RE_URL_SCHEME);
  if (!result) {
    return "";
  }
  return result[1];
}
function decodeJWT(token) {
  let strings = token.split(".");
  var userinfo = JSON.parse(
    decodeURIComponent(encodeURIComponent(window.atob(strings[1].replace(/-/g, "+").replace(/_/g, "/"))))
  );
  return userinfo;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RE_URL_SCHEME,
  checkParamsNeeded,
  decodeJWT,
  findUrlScheme,
  generateHeader,
  generateKVStr,
  keyValToObject
});
//# sourceMappingURL=net.util.cjs.map
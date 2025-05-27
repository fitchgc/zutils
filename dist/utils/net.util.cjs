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

// src/utils/net.util.ts
var net_util_exports = {};
__export(net_util_exports, {
  RE_URL_SCHEME: () => RE_URL_SCHEME,
  checkParamsNeeded: () => checkParamsNeeded,
  decodeJWT: () => decodeJWT,
  fetchWithErrorHandling: () => fetchWithErrorHandling,
  findUrlScheme: () => findUrlScheme,
  generateHeader: () => generateHeader,
  generateKVStr: () => generateKVStr,
  handleFetch: () => handleFetch,
  keyValToObject: () => keyValToObject,
  successfulFetch: () => successfulFetch,
  timeoutFetch: () => timeoutFetch
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
var import_node_fetch = __toESM(require("node-fetch"), 1);
var TIMEOUT_ERROR = new Error("timeout");
async function successfulFetch(request, options) {
  const response = await (0, import_node_fetch.default)(request, options);
  if (!response.ok) {
    throw new Error(`Fetch failed with status '${response.status}' for request '${request}'`);
  }
  return response;
}
async function handleFetch(request, options) {
  const response = await successfulFetch(request, options);
  const object = await response.json();
  return object;
}
async function fetchWithErrorHandling({
  url,
  options,
  timeout,
  errorCodesToCatch
}) {
  let result;
  try {
    if (timeout) {
      result = Promise.race([
        await handleFetch(url, options),
        new Promise(
          (_, reject) => setTimeout(() => {
            reject(TIMEOUT_ERROR);
          }, timeout)
        )
      ]);
    } else {
      result = await handleFetch(url, options);
    }
  } catch (e) {
    logOrRethrowError(e, errorCodesToCatch);
  }
  return result;
}
async function timeoutFetch(url, options, timeout = 500) {
  return Promise.race([
    successfulFetch(url, options),
    new Promise(
      (_, reject) => setTimeout(() => {
        reject(TIMEOUT_ERROR);
      }, timeout)
    )
  ]);
}
function logOrRethrowError(error, codesToCatch = []) {
  if (!error) {
    return;
  }
  const includesErrorCodeToCatch = codesToCatch.some(
    (code) => error.message.includes(`Fetch failed with status '${code}'`)
  );
  if (error instanceof Error && (includesErrorCodeToCatch || error.message.includes("Failed to fetch") || error === TIMEOUT_ERROR)) {
    console.error(error);
  } else {
    throw error;
  }
}
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
      throw new ZError(10, "params mismatch");
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
  fetchWithErrorHandling,
  findUrlScheme,
  generateHeader,
  generateKVStr,
  handleFetch,
  keyValToObject,
  successfulFetch,
  timeoutFetch
});
//# sourceMappingURL=net.util.cjs.map
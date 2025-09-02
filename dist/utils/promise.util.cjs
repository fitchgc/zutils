var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// src/utils/promise.util.ts
var promise_util_exports = {};
__export(promise_util_exports, {
  Deferred: () => Deferred,
  PromiseQueue: () => PromiseQueue,
  retry: () => retry
});
module.exports = __toCommonJS(promise_util_exports);
function retry(promiseFn, options) {
  let retries = 0;
  let defaultOptions = {
    maxRetries: 3,
    whitelistErrors: []
  };
  Object.assign(defaultOptions, options);
  const { maxRetries, whitelistErrors } = options;
  const retryPromise = /* @__PURE__ */ __name(async () => {
    try {
      return await promiseFn();
    } catch (err) {
      if (retries < maxRetries && (whitelistErrors.length === 0 || whitelistErrors.some((whitelistedError) => err instanceof whitelistedError.constructor))) {
        await new Promise((resolve) => setTimeout(resolve, 1e3 * 2 ** retries));
        retries++;
        return retryPromise();
      }
      throw err;
    }
  }, "retryPromise");
  return retryPromise();
}
__name(retry, "retry");
var _Deferred = class _Deferred {
  constructor() {
    __publicField(this, "_resolve");
    __publicField(this, "_reject");
    __publicField(this, "promise");
    this.promise = new Promise((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });
  }
  resolve(value) {
    this._resolve(value);
  }
  reject(reason) {
    this._reject(reason);
  }
  then(onfulfilled, onrejected) {
    return this.promise.then(onfulfilled, onrejected);
  }
  catch(onrejected) {
    return this.promise.catch(onrejected);
  }
};
__name(_Deferred, "Deferred");
var Deferred = _Deferred;
var _PromiseQueue = class _PromiseQueue {
  constructor({ concurrency = 2 }) {
    __publicField(this, "concurrency");
    __publicField(this, "_current", 0);
    __publicField(this, "_list", []);
    this.concurrency = concurrency;
  }
  add(promiseFn) {
    this._list.push(promiseFn);
    this.loadNext();
  }
  loadNext() {
    if (this._list.length === 0 || this.concurrency === this._current) return;
    this._current++;
    const fn = this._list.shift();
    const promise = fn.call(this);
    promise.then(this.onLoaded.bind(this)).catch(this.onLoaded.bind(this));
  }
  onLoaded() {
    this._current--;
    this.loadNext();
  }
};
__name(_PromiseQueue, "PromiseQueue");
var PromiseQueue = _PromiseQueue;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Deferred,
  PromiseQueue,
  retry
});
//# sourceMappingURL=promise.util.cjs.map
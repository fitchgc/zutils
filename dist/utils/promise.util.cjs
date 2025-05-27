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
  const retryPromise = async () => {
    try {
      return await promiseFn();
    } catch (err) {
      if (retries < maxRetries && whitelistErrors.some((whitelistedError) => err instanceof whitelistedError.constructor)) {
        retries++;
        return retryPromise();
      }
      throw err;
    }
  };
  return retryPromise();
}
var Deferred = class {
  constructor() {
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
var PromiseQueue = class {
  constructor({ concurrency = 2 }) {
    this._current = 0;
    this._list = [];
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Deferred,
  PromiseQueue,
  retry
});
//# sourceMappingURL=promise.util.cjs.map
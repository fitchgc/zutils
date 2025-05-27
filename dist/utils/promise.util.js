// src/utils/promise.util.ts
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
export {
  Deferred,
  PromiseQueue,
  retry
};
//# sourceMappingURL=promise.util.js.map
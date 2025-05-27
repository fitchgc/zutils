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
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};

// src/common/SyncLocker.ts
var SyncLocker_exports = {};
__export(SyncLocker_exports, {
  SyncLocker: () => SyncLocker
});
module.exports = __toCommonJS(SyncLocker_exports);

// src/decorators/singleton.ts
var SINGLETON_KEY = Symbol();
var singleton = (classTarget) => new Proxy(classTarget, {
  construct(target, argumentsList, newTarget) {
    if (target.prototype !== newTarget.prototype) {
      return Reflect.construct(target, argumentsList, newTarget);
    }
    if (!target[SINGLETON_KEY]) {
      target[SINGLETON_KEY] = Reflect.construct(target, argumentsList, newTarget);
    }
    return target[SINGLETON_KEY];
  }
});

// src/common/ZError.ts
var ZError = class {
  constructor(statusCode, message) {
    this.statusCode = statusCode;
    this.message = message;
  }
};

// src/common/SyncLocker.ts
var SyncLocker = class {
  constructor() {
    this.map = /* @__PURE__ */ new Map();
  }
  lock(req) {
    const key = `${req.method}:${req.url}:${req.user?.id || ""}`;
    if (this.map.has(key)) {
      return false;
    }
    this.map.set(key, true);
    return true;
  }
  unlock(req) {
    const key = `${req.method}:${req.url}:${req.user?.id || ""}`;
    this.map.delete(key);
  }
  checkLock(req) {
    const key = `${req.method}:${req.url}:${req.user?.id || ""}`;
    if (this.map.has(key)) {
      throw new ZError(100, "request too fast");
    }
    this.lock(req);
    return true;
  }
  isLocked(req) {
    const key = `${req.method}:${req.url}:${req.user?.id || ""}`;
    return this.map.has(key);
  }
};
SyncLocker = __decorateClass([
  singleton
], SyncLocker);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SyncLocker
});
//# sourceMappingURL=SyncLocker.cjs.map
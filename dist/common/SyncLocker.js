var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// src/decorators/singleton.ts
var SINGLETON_KEY = Symbol();
var singleton = /* @__PURE__ */ __name((classTarget) => new Proxy(classTarget, {
  construct(target, argumentsList, newTarget) {
    if (target.prototype !== newTarget.prototype) {
      return Reflect.construct(target, argumentsList, newTarget);
    }
    if (!target[SINGLETON_KEY]) {
      target[SINGLETON_KEY] = Reflect.construct(target, argumentsList, newTarget);
    }
    return target[SINGLETON_KEY];
  }
}), "singleton");

// src/common/ZError.ts
var _ZError = class _ZError {
  constructor(statusCode, message) {
    __publicField(this, "code");
    __publicField(this, "statusCode");
    __publicField(this, "message");
    __publicField(this, "name");
    this.statusCode = statusCode;
    this.message = message;
  }
};
__name(_ZError, "ZError");
var ZError = _ZError;

// src/common/SyncLocker.ts
function _ts_decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate, "_ts_decorate");
var _SyncLocker = class _SyncLocker {
  constructor() {
    __publicField(this, "map", /* @__PURE__ */ new Map());
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
__name(_SyncLocker, "SyncLocker");
var SyncLocker = _SyncLocker;
SyncLocker = _ts_decorate([
  singleton
], SyncLocker);
export {
  SyncLocker
};
//# sourceMappingURL=SyncLocker.js.map
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

// src/index.ts
var src_exports = {};
__export(src_exports, {
  BaseController: () => BaseController,
  ROLE_ANON: () => ROLE_ANON,
  RouterData: () => RouterData,
  RouterMap: () => RouterMap,
  SINGLETON_KEY: () => SINGLETON_KEY,
  SyncLocker: () => SyncLocker,
  ZError: () => ZError,
  ZRedisClient: () => ZRedisClient,
  createAsyncQueue: () => createAsyncQueue,
  createAsyncQueues: () => createAsyncQueues,
  dept: () => dept,
  limit: () => limit,
  permission: () => permission,
  role: () => role,
  router: () => router,
  singleton: () => singleton
});
module.exports = __toCommonJS(src_exports);

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

// src/common/base.controller.ts
var ROLE_ANON = "anon";
var _BaseController = class _BaseController {
};
__name(_BaseController, "BaseController");
var BaseController = _BaseController;

// src/common/AsyncQueue.ts
function createAsyncQueue(opts = {
  dedupeConcurrent: false
}) {
  const { dedupeConcurrent } = opts;
  let queue = [];
  let running;
  let nextPromise = new DeferredPromise();
  const push = /* @__PURE__ */ __name((task) => {
    let taskPromise = new DeferredPromise();
    if (dedupeConcurrent) {
      queue = [];
      if (nextPromise.started) nextPromise = new DeferredPromise();
      taskPromise = nextPromise;
    }
    queue.push(() => {
      taskPromise.started = true;
      task().then(taskPromise.resolve).catch(taskPromise.reject);
      return taskPromise.promise;
    });
    if (!running) running = start();
    return taskPromise.promise;
  }, "push");
  const start = /* @__PURE__ */ __name(async () => {
    while (queue.length) {
      const task = queue.shift();
      await task().catch(() => {
      });
    }
    running = void 0;
  }, "start");
  return {
    push,
    flush: /* @__PURE__ */ __name(() => running || Promise.resolve(), "flush"),
    get size() {
      return queue.length;
    }
  };
}
__name(createAsyncQueue, "createAsyncQueue");
var createAsyncQueues = /* @__PURE__ */ __name((opts = {
  dedupeConcurrent: false
}) => {
  const queues = {};
  const push = /* @__PURE__ */ __name((queueId, task) => {
    if (!queues[queueId]) queues[queueId] = createAsyncQueue(opts);
    return queues[queueId].push(task);
  }, "push");
  const flush = /* @__PURE__ */ __name((queueId) => {
    if (!queues[queueId]) queues[queueId] = createAsyncQueue(opts);
    return queues[queueId].flush();
  }, "flush");
  return {
    push,
    flush
  };
}, "createAsyncQueues");
var _a;
var DeferredPromise = (_a = class {
  constructor() {
    __publicField(this, "started", false);
    __publicField(this, "resolve", /* @__PURE__ */ __name(() => {
    }, "resolve"));
    __publicField(this, "reject", /* @__PURE__ */ __name(() => {
    }, "reject"));
    __publicField(this, "promise");
    this.promise = new Promise((res, rej) => {
      this.resolve = res;
      this.reject = rej;
    });
  }
}, __name(_a, "DeferredPromise"), _a);

// src/redis/ZRedisClient.ts
var import_redis = require("redis");
var import_util = require("util");
function _ts_decorate2(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate2, "_ts_decorate");
function _ts_metadata(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
__name(_ts_metadata, "_ts_metadata");
var _ZRedisClient = class _ZRedisClient {
  constructor(opts) {
    __publicField(this, "pub");
    __publicField(this, "sub");
    __publicField(this, "subscribeAsync");
    __publicField(this, "unsubscribeAsync");
    __publicField(this, "publishAsync");
    __publicField(this, "subscriptions", {});
    __publicField(this, "smembersAsync");
    __publicField(this, "sismemberAsync");
    __publicField(this, "hgetAsync");
    __publicField(this, "hlenAsync");
    __publicField(this, "pubsubAsync");
    __publicField(this, "incrAsync");
    __publicField(this, "decrAsync");
    __publicField(this, "handleSubscription", /* @__PURE__ */ __name((channel, message) => {
      if (this.subscriptions[channel]) {
        for (let i = 0, l = this.subscriptions[channel].length; i < l; i++) {
          this.subscriptions[channel][i](JSON.parse(message));
        }
      }
    }, "handleSubscription"));
    this.sub = (0, import_redis.createClient)(opts);
    this.pub = (0, import_redis.createClient)(opts);
    this.sub.setMaxListeners(0);
    this.subscribeAsync = (0, import_util.promisify)(this.sub.subscribe).bind(this.sub);
    this.unsubscribeAsync = (0, import_util.promisify)(this.sub.unsubscribe).bind(this.sub);
    this.publishAsync = (0, import_util.promisify)(this.pub.publish).bind(this.pub);
    this.smembersAsync = (0, import_util.promisify)(this.pub.smembers).bind(this.pub);
    this.sismemberAsync = (0, import_util.promisify)(this.pub.sismember).bind(this.pub);
    this.hlenAsync = (0, import_util.promisify)(this.pub.hlen).bind(this.pub);
    this.hgetAsync = (0, import_util.promisify)(this.pub.hget).bind(this.pub);
    this.pubsubAsync = (0, import_util.promisify)(this.pub.pubsub).bind(this.pub);
    this.decrAsync = (0, import_util.promisify)(this.pub.decr).bind(this.pub);
    this.incrAsync = (0, import_util.promisify)(this.pub.incr).bind(this.pub);
  }
  async subscribe(topic, callback) {
    if (!this.subscriptions[topic]) {
      this.subscriptions[topic] = [];
    }
    this.subscriptions[topic].push(callback);
    if (this.sub.listeners("message").length === 0) {
      this.sub.addListener("message", this.handleSubscription);
    }
    await this.subscribeAsync(topic);
    return this;
  }
  async unsubscribe(topic, callback) {
    if (callback) {
      const index = this.subscriptions[topic].indexOf(callback);
      this.subscriptions[topic].splice(index, 1);
    } else {
      this.subscriptions[topic] = [];
    }
    if (this.subscriptions[topic].length === 0) {
      await this.unsubscribeAsync(topic);
    }
    return this;
  }
  async publish(topic, data) {
    if (data === void 0) {
      data = false;
    }
    await this.publishAsync(topic, JSON.stringify(data));
  }
  async exists(roomId) {
    return (await this.pubsubAsync("channels", roomId)).length > 0;
  }
  async setex(key, value, seconds) {
    return new Promise((resolve) => this.pub.setex(key, seconds, value, resolve));
  }
  async expire(key, seconds) {
    return new Promise((resolve) => this.pub.expire(key, seconds, resolve));
  }
  async get(key) {
    return new Promise((resolve, reject) => {
      this.pub.get(key, (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  }
  async set(key, val) {
    return new Promise((resolve) => {
      this.pub.set(key, val, () => {
        resolve && resolve("");
      });
    });
  }
  async del(roomId) {
    return new Promise((resolve) => {
      this.pub.del(roomId, resolve);
    });
  }
  async sadd(key, value) {
    return new Promise((resolve) => {
      this.pub.sadd(key, value, resolve);
    });
  }
  async smembers(key) {
    return await this.smembersAsync(key);
  }
  async sismember(key, field) {
    return await this.sismemberAsync(key, field);
  }
  async srem(key, value) {
    return new Promise((resolve) => {
      this.pub.srem(key, value, resolve);
    });
  }
  async scard(key) {
    return new Promise((resolve, reject) => {
      this.pub.scard(key, (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  }
  async spop(key) {
    return new Promise((resolve, reject) => {
      this.pub.spop(key, (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  }
  async srandmember(key) {
    return new Promise((resolve, reject) => {
      this.pub.srandmember(key, (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  }
  async sinter(...keys) {
    return new Promise((resolve, reject) => {
      this.pub.sinter(...keys, (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  }
  async zadd(key, value, member) {
    return new Promise((resolve) => {
      this.pub.zadd(key, value, member, resolve);
    });
  }
  async zincrby(key, value, member) {
    return new Promise((resolve) => {
      this.pub.zincrby(key, value, member, resolve);
    });
  }
  async zrangebyscore(key, min, max) {
    return new Promise((resolve, reject) => {
      this.pub.zrangebyscore(key, min, max, "withscores", (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  }
  async zcard(key) {
    return new Promise((resolve, reject) => {
      this.pub.zcard(key, (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  }
  async zcount(key, min, max) {
    return new Promise((resolve, reject) => {
      this.pub.zcount(key, min, max, (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  }
  async zrevrank(key, member) {
    return new Promise((resolve, reject) => {
      this.pub.zrevrank(key, member, (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  }
  async zscore(key, member) {
    return new Promise((resolve, reject) => {
      this.pub.zscore(key, member, (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  }
  async zrevrange(key, start, end) {
    return new Promise((resolve, reject) => {
      this.pub.zrevrange(key, start, end, "withscores", (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  }
  async hset(key, field, value) {
    return new Promise((resolve) => {
      this.pub.hset(key, field, value, resolve);
    });
  }
  async hincrby(key, field, value) {
    return new Promise((resolve) => {
      this.pub.hincrby(key, field, value, resolve);
    });
  }
  async hget(key, field) {
    return await this.hgetAsync(key, field);
  }
  async hgetall(key) {
    return new Promise((resolve, reject) => {
      this.pub.hgetall(key, (err, values) => {
        if (err) {
          return reject(err);
        }
        resolve(values);
      });
    });
  }
  async hdel(key, field) {
    return new Promise((resolve, reject) => {
      this.pub.hdel(key, field, (err, ok) => {
        if (err) {
          return reject(err);
        }
        resolve(ok);
      });
    });
  }
  async hlen(key) {
    return await this.hlenAsync(key);
  }
  async incr(key) {
    return await this.incrAsync(key);
  }
  async decr(key) {
    return await this.decrAsync(key);
  }
};
__name(_ZRedisClient, "ZRedisClient");
var ZRedisClient = _ZRedisClient;
ZRedisClient = _ts_decorate2([
  singleton,
  _ts_metadata("design:type", Function),
  _ts_metadata("design:paramtypes", [
    typeof import_redis.ClientOpts === "undefined" ? Object : import_redis.ClientOpts
  ])
], ZRedisClient);

// src/decorators/router.ts
var _RouterData = class _RouterData {
  constructor() {
    __publicField(this, "target");
    __publicField(this, "method");
    __publicField(this, "path");
    __publicField(this, "fun");
  }
};
__name(_RouterData, "RouterData");
var RouterData = _RouterData;
var _RouterMap = class _RouterMap {
};
__name(_RouterMap, "RouterMap");
__publicField(_RouterMap, "decoratedRouters", /* @__PURE__ */ new Map());
var RouterMap = _RouterMap;
function router(route) {
  return (target, name, value) => {
    if (!route) {
      const controller = target.constructor.name;
      const controllerName = controller.toLowerCase().replace(".controller", "");
      route = "all " + [
        "",
        controllerName,
        name
      ].join("/");
    }
    const split = route.split(" ");
    if (split.length > 2) {
      throw new Error("Only one space is allowed in @router()");
    }
    const [method, path] = split;
    const key = target[name];
    let routerData = new RouterData();
    routerData.target = target;
    routerData.method = method;
    routerData.path = path;
    routerData.fun = target[name];
    if (RouterMap.decoratedRouters.has(key)) {
      let objCurrent = RouterMap.decoratedRouters.get(key);
      if (!objCurrent.data) {
        objCurrent.data = [
          routerData
        ];
      } else {
        objCurrent.data.push(routerData);
      }
      RouterMap.decoratedRouters.set(target[name], objCurrent);
    } else {
      let routerObj = {
        data: [
          routerData
        ]
      };
      RouterMap.decoratedRouters.set(target[name], routerObj);
    }
  };
}
__name(router, "router");
function role(roles) {
  return (target, name, value) => {
    let roleList = [];
    if (roles) {
      if (Array.isArray(roles)) {
        roleList = roles;
      } else {
        roleList = [
          roles
        ];
      }
    }
    const key = target[name];
    let roleObj = {
      roles: roleList
    };
    if (RouterMap.decoratedRouters.has(key)) {
      let objCurrent = RouterMap.decoratedRouters.get(key);
      Object.assign(objCurrent, roleObj);
      RouterMap.decoratedRouters.set(target[name], objCurrent);
    } else {
      RouterMap.decoratedRouters.set(target[name], roleObj);
    }
  };
}
__name(role, "role");
function permission(permissions) {
  return (target, name, value) => {
    let permissionList = [
      []
    ];
    if (permissions) {
      if (Array.isArray(permissions)) {
        let arr = [];
        for (let sub of permissions) {
          arr.push(sub.split(":"));
        }
        permissionList = arr;
      } else {
        permissionList = [
          permissions.split(":")
        ];
      }
    }
    const key = target[name];
    let permissionObj = {
      permissions: permissionList
    };
    if (RouterMap.decoratedRouters.has(key)) {
      let objCurrent = RouterMap.decoratedRouters.get(key);
      Object.assign(objCurrent, permissionObj);
      RouterMap.decoratedRouters.set(target[name], objCurrent);
    } else {
      RouterMap.decoratedRouters.set(target[name], permissionObj);
    }
  };
}
__name(permission, "permission");
function dept(depts) {
  return (target, name, value) => {
    let deptList = [];
    if (depts) {
      if (Array.isArray(depts)) {
        deptList = depts;
      } else {
        deptList = [
          depts
        ];
      }
    }
    const key = target[name];
    let deptObj = {
      depts: deptList
    };
    if (RouterMap.decoratedRouters.has(key)) {
      let objCurrent = RouterMap.decoratedRouters.get(key);
      Object.assign(objCurrent, deptObj);
      RouterMap.decoratedRouters.set(target[name], objCurrent);
    } else {
      RouterMap.decoratedRouters.set(target[name], deptObj);
    }
  };
}
__name(dept, "dept");
function limit(opt) {
  return (target, name, value) => {
    const key = target[name];
    let limitObj = {
      limit: opt || true
    };
    if (RouterMap.decoratedRouters.has(key)) {
      let objCurrent = RouterMap.decoratedRouters.get(key);
      Object.assign(objCurrent, limitObj);
      RouterMap.decoratedRouters.set(target[name], objCurrent);
    } else {
      RouterMap.decoratedRouters.set(target[name], limitObj);
    }
  };
}
__name(limit, "limit");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BaseController,
  ROLE_ANON,
  RouterData,
  RouterMap,
  SINGLETON_KEY,
  SyncLocker,
  ZError,
  ZRedisClient,
  createAsyncQueue,
  createAsyncQueues,
  dept,
  limit,
  permission,
  role,
  router,
  singleton
});
//# sourceMappingURL=index.cjs.map
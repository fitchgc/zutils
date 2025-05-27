var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};

// src/common/ZError.ts
var ZError = class {
  constructor(statusCode, message) {
    this.statusCode = statusCode;
    this.message = message;
  }
};

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

// src/common/base.controller.ts
var ROLE_ANON = "anon";
var BaseController = class {
};

// src/common/AsyncQueue.ts
function createAsyncQueue(opts = { dedupeConcurrent: false }) {
  const { dedupeConcurrent } = opts;
  let queue = [];
  let running;
  let nextPromise = new DeferredPromise();
  const push = (task) => {
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
  };
  const start = async () => {
    while (queue.length) {
      const task = queue.shift();
      await task().catch(() => {
      });
    }
    running = void 0;
  };
  return {
    push,
    flush: () => running || Promise.resolve(),
    get size() {
      return queue.length;
    }
  };
}
var createAsyncQueues = (opts = { dedupeConcurrent: false }) => {
  const queues = {};
  const push = (queueId, task) => {
    if (!queues[queueId]) queues[queueId] = createAsyncQueue(opts);
    return queues[queueId].push(task);
  };
  const flush = (queueId) => {
    if (!queues[queueId]) queues[queueId] = createAsyncQueue(opts);
    return queues[queueId].flush();
  };
  return { push, flush };
};
var DeferredPromise = class {
  constructor() {
    this.started = false;
    this.resolve = () => {
    };
    this.reject = () => {
    };
    this.promise = new Promise((res, rej) => {
      this.resolve = res;
      this.reject = rej;
    });
  }
};

// src/redis/ZRedisClient.ts
import { createClient } from "redis";
import { promisify } from "util";
var ZRedisClient = class {
  constructor(opts) {
    this.subscriptions = {};
    this.handleSubscription = (channel, message) => {
      if (this.subscriptions[channel]) {
        for (let i = 0, l = this.subscriptions[channel].length; i < l; i++) {
          this.subscriptions[channel][i](JSON.parse(message));
        }
      }
    };
    this.sub = createClient(opts);
    this.pub = createClient(opts);
    this.sub.setMaxListeners(0);
    this.subscribeAsync = promisify(this.sub.subscribe).bind(this.sub);
    this.unsubscribeAsync = promisify(this.sub.unsubscribe).bind(this.sub);
    this.publishAsync = promisify(this.pub.publish).bind(this.pub);
    this.smembersAsync = promisify(this.pub.smembers).bind(this.pub);
    this.sismemberAsync = promisify(this.pub.sismember).bind(this.pub);
    this.hlenAsync = promisify(this.pub.hlen).bind(this.pub);
    this.hgetAsync = promisify(this.pub.hget).bind(this.pub);
    this.pubsubAsync = promisify(this.pub.pubsub).bind(this.pub);
    this.decrAsync = promisify(this.pub.decr).bind(this.pub);
    this.incrAsync = promisify(this.pub.incr).bind(this.pub);
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
ZRedisClient = __decorateClass([
  singleton
], ZRedisClient);

// src/decorators/router.ts
var RouterData = class {
};
var RouterMap = class {
};
RouterMap.decoratedRouters = /* @__PURE__ */ new Map();
function router(route) {
  return (target, name, value) => {
    if (!route) {
      const controller = target.constructor.name;
      const controllerName = controller.toLowerCase().replace(".controller", "");
      route = "all " + ["", controllerName, name].join("/");
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
        objCurrent.data = [routerData];
      } else {
        objCurrent.data.push(routerData);
      }
      RouterMap.decoratedRouters.set(target[name], objCurrent);
    } else {
      let routerObj = {
        data: [routerData]
      };
      RouterMap.decoratedRouters.set(target[name], routerObj);
    }
  };
}
function role(roles) {
  return (target, name, value) => {
    let roleList = [];
    if (roles) {
      if (Array.isArray(roles)) {
        roleList = roles;
      } else {
        roleList = [roles];
      }
    }
    const key = target[name];
    let roleObj = { roles: roleList };
    if (RouterMap.decoratedRouters.has(key)) {
      let objCurrent = RouterMap.decoratedRouters.get(key);
      Object.assign(objCurrent, roleObj);
      RouterMap.decoratedRouters.set(target[name], objCurrent);
    } else {
      RouterMap.decoratedRouters.set(target[name], roleObj);
    }
  };
}
function permission(permissions) {
  return (target, name, value) => {
    let permissionList = [[]];
    if (permissions) {
      if (Array.isArray(permissions)) {
        let arr = [];
        for (let sub of permissions) {
          arr.push(sub.split(":"));
        }
        permissionList = arr;
      } else {
        permissionList = [permissions.split(":")];
      }
    }
    const key = target[name];
    let permissionObj = { permissions: permissionList };
    if (RouterMap.decoratedRouters.has(key)) {
      let objCurrent = RouterMap.decoratedRouters.get(key);
      Object.assign(objCurrent, permissionObj);
      RouterMap.decoratedRouters.set(target[name], objCurrent);
    } else {
      RouterMap.decoratedRouters.set(target[name], permissionObj);
    }
  };
}
function dept(depts) {
  return (target, name, value) => {
    let deptList = [];
    if (depts) {
      if (Array.isArray(depts)) {
        deptList = depts;
      } else {
        deptList = [depts];
      }
    }
    const key = target[name];
    let deptObj = { depts: deptList };
    if (RouterMap.decoratedRouters.has(key)) {
      let objCurrent = RouterMap.decoratedRouters.get(key);
      Object.assign(objCurrent, deptObj);
      RouterMap.decoratedRouters.set(target[name], objCurrent);
    } else {
      RouterMap.decoratedRouters.set(target[name], deptObj);
    }
  };
}
function limit(opt) {
  return (target, name, value) => {
    const key = target[name];
    let limitObj = { limit: opt || true };
    if (RouterMap.decoratedRouters.has(key)) {
      let objCurrent = RouterMap.decoratedRouters.get(key);
      Object.assign(objCurrent, limitObj);
      RouterMap.decoratedRouters.set(target[name], objCurrent);
    } else {
      RouterMap.decoratedRouters.set(target[name], limitObj);
    }
  };
}
export {
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
};
//# sourceMappingURL=index.js.map
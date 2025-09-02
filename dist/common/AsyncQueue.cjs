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

// src/common/AsyncQueue.ts
var AsyncQueue_exports = {};
__export(AsyncQueue_exports, {
  createAsyncQueue: () => createAsyncQueue,
  createAsyncQueues: () => createAsyncQueues
});
module.exports = __toCommonJS(AsyncQueue_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createAsyncQueue,
  createAsyncQueues
});
//# sourceMappingURL=AsyncQueue.cjs.map
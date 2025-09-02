var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

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
export {
  createAsyncQueue,
  createAsyncQueues
};
//# sourceMappingURL=AsyncQueue.js.map
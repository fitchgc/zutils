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

// src/common/AsyncQueue.ts
var AsyncQueue_exports = {};
__export(AsyncQueue_exports, {
  createAsyncQueue: () => createAsyncQueue,
  createAsyncQueues: () => createAsyncQueues
});
module.exports = __toCommonJS(AsyncQueue_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createAsyncQueue,
  createAsyncQueues
});
//# sourceMappingURL=AsyncQueue.cjs.map
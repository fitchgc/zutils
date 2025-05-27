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
export {
  createAsyncQueue,
  createAsyncQueues
};
//# sourceMappingURL=AsyncQueue.js.map
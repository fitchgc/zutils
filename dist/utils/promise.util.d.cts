type RetryOptions = {
    maxRetries: number;
    whitelistErrors: Error[];
};
/**
 * Usage:
 * retry(() => fetch("https://example.com"), { maxRetries: 3, whitelistErrors: [] })
 *  .then((response) => console.log(response))
 *  .catch((error) => console.error(error));
 * @param promiseFn
 * @param options
 * @returns
 */
declare function retry<T>(promiseFn: () => Promise<T>, options: RetryOptions): Promise<T>;
/**
 * 构建一个promise, 可以在任意时刻resolve或reject
 * Usage:
 * function delay(ms: number): Promise<void> {
      const deferred = new Deferred<void>();

      setTimeout(() => {
        deferred.resolve();
      }, ms);

      return deferred.promise;
    }

    console.log("start");

    delay(1000).then(() => {
      console.log("after 1 second");
    });

    console.log("end");
 */
declare class Deferred<T = any> {
    private _resolve;
    private _reject;
    readonly promise: Promise<T>;
    constructor();
    resolve(value: T | PromiseLike<T>): void;
    reject(reason?: any): void;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null | undefined, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined): Promise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null | undefined): Promise<T | TResult>;
}
/**
 * 简单限流的 Promise 队列
 * Usage:
 const q = new PromiseQueue();
 [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach((v) => {
  q.add(
    () =>
      new Promise((resolve) => {
        setTimeout(() => {
          console.log(v);
          resolve();
        }, 1000);
      })
  );
});
 */
declare class PromiseQueue {
    private readonly concurrency;
    private _current;
    private _list;
    constructor({ concurrency }: {
        concurrency: number;
    });
    add(promiseFn: () => Promise<any>): void;
    loadNext(): void;
    onLoaded(): void;
}

export { Deferred, PromiseQueue, retry };

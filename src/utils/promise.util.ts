type RetryOptions = {
  maxRetries: number
  whitelistErrors: Error[]
}
/**
 * Usage:
 * retry(() => fetch("https://example.com"), { maxRetries: 3, whitelistErrors: [] })
 *  .then((response) => console.log(response))
 *  .catch((error) => console.error(error));
 * @param promiseFn
 * @param options
 * @returns
 */
export function retry<T>(promiseFn: () => Promise<T>, options: RetryOptions): Promise<T> {
  let retries = 0
  let defaultOptions = {
    maxRetries: 3,
    whitelistErrors: [],
  }
  Object.assign(defaultOptions, options)
  const { maxRetries, whitelistErrors } = options

  const retryPromise = async (): Promise<T> => {
    try {
      return await promiseFn()
    } catch (err) {
      if (
        retries < maxRetries &&
        whitelistErrors.some(whitelistedError => err instanceof whitelistedError.constructor)
      ) {
        await new Promise(resolve => setTimeout(resolve, 1000 * 2 ** retries)) // Exponential backoff
        retries++
        return retryPromise()
      }
      throw err
    }
  }

  return retryPromise()
}
/**
 * Creates a promise that can be resolved or rejected at any time.
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
export class Deferred<T = any> {
  private _resolve!: (value: T | PromiseLike<T>) => void
  private _reject!: (reason?: any) => void

  public readonly promise: Promise<T>

  constructor() {
    this.promise = new Promise<T>((resolve, reject) => {
      this._resolve = resolve
      this._reject = reject
    })
  }

  public resolve(value: T | PromiseLike<T>): void {
    this._resolve(value)
  }

  public reject(reason?: any): void {
    this._reject(reason)
  }

  public then<TResult1 = T, TResult2 = never>(
    onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null | undefined,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined,
  ): Promise<TResult1 | TResult2> {
    return this.promise.then(onfulfilled, onrejected)
  }

  public catch<TResult = never>(
    onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null | undefined,
  ): Promise<T | TResult> {
    return this.promise.catch(onrejected)
  }
}

/**
 * A simple promise queue with concurrency control.
 * Usage:
 const q = new PromiseQueue({ concurrency: 2 }); // Set concurrency to 2
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
export class PromiseQueue {
  private readonly concurrency: number
  private _current: number = 0
  private _list: (() => Promise<any>)[] = []

  constructor({ concurrency = 2 }: { concurrency: number }) {
    this.concurrency = concurrency
  }

  add(promiseFn: () => Promise<any>) {
    this._list.push(promiseFn)
    this.loadNext()
  }

  loadNext() {
    if (this._list.length === 0 || this.concurrency === this._current) return
    this._current++
    const fn = this._list.shift()!
    const promise = fn.call(this)
    promise.then(this.onLoaded.bind(this)).catch(this.onLoaded.bind(this))
  }

  onLoaded() {
    this._current--
    this.loadNext()
  }
}

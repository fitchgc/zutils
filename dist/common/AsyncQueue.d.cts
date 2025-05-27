type Callback<T> = () => Promise<T>;
type AsyncQueue<T = void> = {
    push: (task: Callback<T>) => Promise<T>;
    flush: () => Promise<void>;
    size: number;
};
/**
 * Ensures that each callback pushed onto the queue is executed in series.
 * Such a quetie 😻
 * @param opts.dedupeConcurrent If dedupeConcurrent is `true` it ensures that if multiple
 * tasks are pushed onto the queue while there is an active task, only the
 * last one will be executed, once the active task has completed.
 * e.g. in the below example, only 0 and 3 will be executed.
 * ```
 * const queue = createAsyncQueue({ dedupeConcurrent: true })
 * queue.push(async () => console.log(0)) // returns 0
 * queue.push(async () => console.log(1)) // returns 3
 * queue.push(async () => console.log(2)) // returns 3
 * queue.push(async () => console.log(3)) // returns 3
 * ```
 * */
declare function createAsyncQueue<T = void>(opts?: {
    dedupeConcurrent: boolean;
}): AsyncQueue<T>;
declare const createAsyncQueues: <T = void>(opts?: {
    dedupeConcurrent: boolean;
}) => {
    push: (queueId: string, task: Callback<T>) => Promise<T>;
    flush: (queueId: string) => Promise<void>;
};

export { type AsyncQueue, createAsyncQueue, createAsyncQueues };

/**
 * Currying a function
 * @param func
 * @returns
 */
declare function curry(func: (...args0: any[]) => any): (this: unknown, ...args: any[]) => any;

export { curry };

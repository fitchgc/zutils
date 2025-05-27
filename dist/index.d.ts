export { ZError } from './common/ZError.js';
export { SyncLocker } from './common/SyncLocker.js';
import { BaseController } from './common/base.controller.js';
export { ROLE_ANON } from './common/base.controller.js';
export { AsyncQueue, createAsyncQueue, createAsyncQueues } from './common/AsyncQueue.js';
import { RedisClient, ClientOpts } from 'redis';

type Callback = (...args: any[]) => void;
declare class ZRedisClient {
    pub: RedisClient;
    sub: RedisClient;
    protected subscribeAsync: any;
    protected unsubscribeAsync: any;
    protected publishAsync: any;
    protected subscriptions: {
        [channel: string]: Callback[];
    };
    protected smembersAsync: any;
    protected sismemberAsync: any;
    protected hgetAsync: any;
    protected hlenAsync: any;
    protected pubsubAsync: any;
    protected incrAsync: any;
    protected decrAsync: any;
    constructor(opts?: ClientOpts);
    subscribe(topic: string, callback: Callback): Promise<this>;
    unsubscribe(topic: string, callback?: Callback): Promise<this>;
    publish(topic: string, data: any): Promise<void>;
    exists(roomId: string): Promise<boolean>;
    setex(key: string, value: string, seconds: number): Promise<unknown>;
    expire(key: string, seconds: number): Promise<unknown>;
    get(key: string): Promise<string | null>;
    set(key: string, val: string): Promise<unknown>;
    del(roomId: string): Promise<unknown>;
    sadd(key: string, value: any): Promise<unknown>;
    smembers(key: string): Promise<string[]>;
    sismember(key: string, field: string): Promise<number>;
    srem(key: string, value: any): Promise<unknown>;
    scard(key: string): Promise<unknown>;
    spop(key: string): Promise<unknown>;
    srandmember(key: string): Promise<unknown>;
    sinter(...keys: string[]): Promise<string[]>;
    zadd(key: string, value: any, member: string): Promise<unknown>;
    zincrby(key: string, value: any, member: string): Promise<unknown>;
    zrangebyscore(key: string, min: number, max: number): Promise<unknown>;
    zcard(key: string): Promise<unknown>;
    zcount(key: string, min: number, max: number): Promise<unknown>;
    zrevrank(key: string, member: string): Promise<unknown>;
    zscore(key: string, member: string): Promise<unknown>;
    zrevrange(key: string, start: number, end: number): Promise<string[]>;
    hset(key: string, field: string, value: string): Promise<unknown>;
    hincrby(key: string, field: string, value: number): Promise<unknown>;
    hget(key: string, field: string): Promise<any>;
    hgetall(key: string): Promise<{
        [key: string]: string;
    }>;
    hdel(key: string, field: string): Promise<unknown>;
    hlen(key: string): Promise<number>;
    incr(key: string): Promise<number>;
    decr(key: string): Promise<number>;
    protected handleSubscription: (channel: string, message: string) => void;
}

declare class RouterData {
    target?: any;
    method?: string;
    path?: string;
    fun?: Function;
}
declare class RouterMap {
    static decoratedRouters: Map<Function, {
        roles?: string[];
        permissions?: string[][];
        data?: RouterData[];
        depts?: string[];
        limit?: any;
        limitMethod?: Function;
    }>;
}
declare function router(route?: string): (target: BaseController, name: string, value: PropertyDescriptor) => void;
declare function role(roles?: string | string[]): (target: BaseController, name: string, value: PropertyDescriptor) => void;
declare function permission(permissions?: string | string[]): (target: BaseController, name: string, value: PropertyDescriptor) => void;
/**
 * If there is a dept modifier, you need to verify whether the department id exists.
 */
declare function dept(depts?: string | string[]): (target: BaseController, name: string, value: PropertyDescriptor) => void;
/**
 * 是否需要限流
 * 使用 @fastify/rate-limit
 */
declare function limit(opt?: any): (target: BaseController, name: string, value: PropertyDescriptor) => void;

/**
 * Singletonize a class
 * Usage:
 * @singleton
 * class Test {}
 * new Test() === new Test() // returns `true`
 * It can also be used without a decorator
 * const TestSingleton = singleton(Test)
 * new TestSingleton() === new TestSingleton() // returns `true`
 */
declare const SINGLETON_KEY: unique symbol;
type Singleton<T extends new (...args: any[]) => any> = T & {
    [SINGLETON_KEY]: T extends new (...args: any[]) => infer I ? I : never;
};
declare const singleton: <T extends new (...args: any[]) => any>(classTarget: T) => T;

export { BaseController, RouterData, RouterMap, SINGLETON_KEY, type Singleton, ZRedisClient, dept, limit, permission, role, router, singleton };

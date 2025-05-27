import { singleton } from 'decorators/singleton'
import { ClientOpts, RedisClient, createClient } from 'redis'
import { promisify } from 'util'

type Callback = (...args: any[]) => void

@singleton
export class ZRedisClient {
  public pub: RedisClient
  public sub: RedisClient

  protected subscribeAsync: any
  protected unsubscribeAsync: any
  protected publishAsync: any

  protected subscriptions: { [channel: string]: Callback[] } = {}

  protected smembersAsync: any
  protected sismemberAsync: any
  protected hgetAsync: any
  protected hlenAsync: any
  protected pubsubAsync: any
  protected incrAsync: any
  protected decrAsync: any

  constructor(opts?: ClientOpts) {
    this.sub = createClient(opts)
    this.pub = createClient(opts)

    // no listener limit
    this.sub.setMaxListeners(0)

    // create promisified pub/sub methods.
    this.subscribeAsync = promisify(this.sub.subscribe).bind(this.sub)
    this.unsubscribeAsync = promisify(this.sub.unsubscribe).bind(this.sub)

    this.publishAsync = promisify(this.pub.publish).bind(this.pub)

    // create promisified redis methods.
    this.smembersAsync = promisify(this.pub.smembers).bind(this.pub)
    this.sismemberAsync = promisify(this.pub.sismember).bind(this.pub)
    this.hlenAsync = promisify(this.pub.hlen).bind(this.pub)
    this.hgetAsync = promisify(this.pub.hget).bind(this.pub)
    this.pubsubAsync = promisify(this.pub.pubsub).bind(this.pub)
    this.decrAsync = promisify(this.pub.decr).bind(this.pub)
    this.incrAsync = promisify(this.pub.incr).bind(this.pub)
  }

  public async subscribe(topic: string, callback: Callback) {
    if (!this.subscriptions[topic]) {
      this.subscriptions[topic] = []
    }

    this.subscriptions[topic].push(callback)

    if (this.sub.listeners('message').length === 0) {
      this.sub.addListener('message', this.handleSubscription)
    }

    await this.subscribeAsync(topic)

    return this
  }

  public async unsubscribe(topic: string, callback?: Callback) {
    if (callback) {
      const index = this.subscriptions[topic].indexOf(callback)
      this.subscriptions[topic].splice(index, 1)
    } else {
      this.subscriptions[topic] = []
    }

    if (this.subscriptions[topic].length === 0) {
      await this.unsubscribeAsync(topic)
    }

    return this
  }

  public async publish(topic: string, data: any) {
    if (data === undefined) {
      data = false
    }

    await this.publishAsync(topic, JSON.stringify(data))
  }

  public async exists(roomId: string): Promise<boolean> {
    return (await this.pubsubAsync('channels', roomId)).length > 0
  }

  public async setex(key: string, value: string, seconds: number) {
    return new Promise(resolve => this.pub.setex(key, seconds, value, resolve))
  }

  public async expire(key: string, seconds: number) {
    return new Promise(resolve => this.pub.expire(key, seconds, resolve))
  }

  public async get(key: string): Promise<string | null> {
    return new Promise((resolve, reject) => {
      this.pub.get(key, (err, data: string | null) => {
        if (err) {
          return reject(err)
        }
        resolve(data)
      })
    })
  }

  public async set(key: string, val: string) {
    return new Promise(resolve => {
      this.pub.set(key, val, () => {
        resolve && resolve('')
      })
    })
  }

  public async del(roomId: string) {
    return new Promise(resolve => {
      this.pub.del(roomId, resolve)
    })
  }

  public async sadd(key: string, value: any) {
    return new Promise(resolve => {
      this.pub.sadd(key, value, resolve)
    })
  }

  public async smembers(key: string): Promise<string[]> {
    return await this.smembersAsync(key)
  }

  public async sismember(key: string, field: string): Promise<number> {
    return await this.sismemberAsync(key, field)
  }

  public async srem(key: string, value: any) {
    return new Promise(resolve => {
      this.pub.srem(key, value, resolve)
    })
  }

  public async scard(key: string) {
    return new Promise((resolve, reject) => {
      this.pub.scard(key, (err, data) => {
        if (err) {
          return reject(err)
        }
        resolve(data)
      })
    })
  }

  public async spop(key: string) {
    return new Promise((resolve, reject) => {
      this.pub.spop(key, (err, data) => {
        if (err) {
          return reject(err)
        }
        resolve(data)
      })
    })
  }

  public async srandmember(key: string) {
    return new Promise((resolve, reject) => {
      this.pub.srandmember(key, (err, data) => {
        if (err) {
          return reject(err)
        }
        resolve(data)
      })
    })
  }

  public async sinter(...keys: string[]) {
    return new Promise<string[]>((resolve, reject) => {
      this.pub.sinter(...keys, (err, data) => {
        if (err) {
          return reject(err)
        }
        resolve(data)
      })
    })
  }

  public async zadd(key: string, value: any, member: string) {
    return new Promise(resolve => {
      this.pub.zadd(key, value, member, resolve)
    })
  }

  public async zincrby(key: string, value: any, member: string) {
    return new Promise(resolve => {
      this.pub.zincrby(key, value, member, resolve)
    })
  }

  public async zrangebyscore(key: string, min: number, max: number) {
    return new Promise((resolve, reject) => {
      this.pub.zrangebyscore(key, min, max, 'withscores', (err, data) => {
        if (err) {
          return reject(err)
        }
        resolve(data)
      })
    })
  }

  public async zcard(key: string) {
    return new Promise((resolve, reject) => {
      this.pub.zcard(key, (err, data) => {
        if (err) {
          return reject(err)
        }
        resolve(data)
      })
    })
  }

  public async zcount(key: string, min: number, max: number) {
    return new Promise((resolve, reject) => {
      this.pub.zcount(key, min, max, (err, data) => {
        if (err) {
          return reject(err)
        }
        resolve(data)
      })
    })
  }

  public async zrevrank(key: string, member: string) {
    return new Promise((resolve, reject) => {
      this.pub.zrevrank(key, member, (err, data) => {
        if (err) {
          return reject(err)
        }
        resolve(data)
      })
    })
  }

  public async zscore(key: string, member: string) {
    return new Promise((resolve, reject) => {
      this.pub.zscore(key, member, (err, data) => {
        if (err) {
          return reject(err)
        }
        resolve(data)
      })
    })
  }

  public async zrevrange(key: string, start: number, end: number): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.pub.zrevrange(key, start, end, 'withscores', (err, data) => {
        if (err) {
          return reject(err)
        }
        resolve(data)
      })
    })
  }

  public async hset(key: string, field: string, value: string) {
    return new Promise(resolve => {
      this.pub.hset(key, field, value, resolve)
    })
  }

  public async hincrby(key: string, field: string, value: number) {
    return new Promise(resolve => {
      this.pub.hincrby(key, field, value, resolve)
    })
  }

  public async hget(key: string, field: string) {
    return await this.hgetAsync(key, field)
  }

  public async hgetall(key: string) {
    return new Promise<{ [key: string]: string }>((resolve, reject) => {
      this.pub.hgetall(key, (err, values) => {
        if (err) {
          return reject(err)
        }
        resolve(values)
      })
    })
  }

  public async hdel(key: string, field: string) {
    return new Promise((resolve, reject) => {
      this.pub.hdel(key, field, (err, ok) => {
        if (err) {
          return reject(err)
        }
        resolve(ok)
      })
    })
  }

  public async hlen(key: string): Promise<number> {
    return await this.hlenAsync(key)
  }

  public async incr(key: string): Promise<number> {
    return await this.incrAsync(key)
  }

  public async decr(key: string): Promise<number> {
    return await this.decrAsync(key)
  }

  protected handleSubscription = (channel: string, message: string) => {
    if (this.subscriptions[channel]) {
      for (let i = 0, l = this.subscriptions[channel].length; i < l; i++) {
        this.subscriptions[channel][i](JSON.parse(message))
      }
    }
  }
}

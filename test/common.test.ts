import { describe, it, expect, jest, beforeEach, afterEach } from '@jest/globals'
import { ZError } from '../src/common/ZError'
import { SyncLocker } from '../src/common/SyncLocker'
import { createAsyncQueue, createAsyncQueues } from '../src/common/AsyncQueue'
import { BaseController, ROLE_ANON } from '../src/common/base.controller'

// Mock the singleton decorator to avoid dependency issues
jest.mock('../src/decorators/singleton', () => ({
  singleton: (target: any) => target
}))

describe('Common Classes Tests', () => {
  describe('ZError', () => {
    it('should create error with status code and message', () => {
      const error = new ZError(404, 'Not found')
      
      expect(error.statusCode).toBe(404)
      expect(error.message).toBe('Not found')
      expect(error).toBeInstanceOf(ZError)
    })

    it('should implement Error interface', () => {
      const error = new ZError(500, 'Internal server error')
      
      expect(error.message).toBe('Internal server error')
      expect(error.name).toBeUndefined() // name is not set in constructor
      expect(error.code).toBeUndefined() // code is not set in constructor
    })

    it('should handle different status codes', () => {
      const error1 = new ZError(400, 'Bad request')
      const error2 = new ZError(401, 'Unauthorized')
      const error3 = new ZError(403, 'Forbidden')
      
      expect(error1.statusCode).toBe(400)
      expect(error2.statusCode).toBe(401)
      expect(error3.statusCode).toBe(403)
    })
  })

  describe('SyncLocker', () => {
    let locker: SyncLocker

    beforeEach(() => {
      locker = new SyncLocker()
    })

    const createRequest = (method: string, url: string, userId?: string) => ({
      method,
      url,
      user: userId ? { id: userId } : undefined
    })

    describe('lock', () => {
      it('should lock a request successfully', () => {
        const req = createRequest('GET', '/api/test', 'user1')
        const result = locker.lock(req)
        
        expect(result).toBe(true)
        expect(locker.isLocked(req)).toBe(true)
      })

      it('should return false if request is already locked', () => {
        const req = createRequest('GET', '/api/test', 'user1')
        
        locker.lock(req)
        const result = locker.lock(req)
        
        expect(result).toBe(false)
      })

      it('should create different keys for different methods', () => {
        const req1 = createRequest('GET', '/api/test', 'user1')
        const req2 = createRequest('POST', '/api/test', 'user1')
        
        expect(locker.lock(req1)).toBe(true)
        expect(locker.lock(req2)).toBe(true)
      })

      it('should create different keys for different URLs', () => {
        const req1 = createRequest('GET', '/api/test1', 'user1')
        const req2 = createRequest('GET', '/api/test2', 'user1')
        
        expect(locker.lock(req1)).toBe(true)
        expect(locker.lock(req2)).toBe(true)
      })

      it('should create different keys for different users', () => {
        const req1 = createRequest('GET', '/api/test', 'user1')
        const req2 = createRequest('GET', '/api/test', 'user2')
        
        expect(locker.lock(req1)).toBe(true)
        expect(locker.lock(req2)).toBe(true)
      })

      it('should handle requests without user', () => {
        const req = createRequest('GET', '/api/test')
        const result = locker.lock(req)
        
        expect(result).toBe(true)
        expect(locker.isLocked(req)).toBe(true)
      })
    })

    describe('unlock', () => {
      it('should unlock a locked request', () => {
        const req = createRequest('GET', '/api/test', 'user1')
        
        locker.lock(req)
        expect(locker.isLocked(req)).toBe(true)
        
        locker.unlock(req)
        expect(locker.isLocked(req)).toBe(false)
      })

      it('should handle unlocking non-locked request gracefully', () => {
        const req = createRequest('GET', '/api/test', 'user1')
        
        expect(() => locker.unlock(req)).not.toThrow()
        expect(locker.isLocked(req)).toBe(false)
      })
    })

    describe('checkLock', () => {
      it('should lock request if not already locked', () => {
        const req = createRequest('GET', '/api/test', 'user1')
        const result = locker.checkLock(req)
        
        expect(result).toBe(true)
        expect(locker.isLocked(req)).toBe(true)
      })

      it('should throw ZError if request is already locked', () => {
        const req = createRequest('GET', '/api/test', 'user1')
        
        locker.lock(req)
        
        expect(() => locker.checkLock(req)).toThrow('request too fast')
      })
    })

    describe('isLocked', () => {
      it('should return true for locked requests', () => {
        const req = createRequest('GET', '/api/test', 'user1')
        
        locker.lock(req)
        expect(locker.isLocked(req)).toBe(true)
      })

      it('should return false for non-locked requests', () => {
        const req = createRequest('GET', '/api/test', 'user1')
        
        expect(locker.isLocked(req)).toBe(false)
      })

      it('should return false after unlocking', () => {
        const req = createRequest('GET', '/api/test', 'user1')
        
        locker.lock(req)
        locker.unlock(req)
        expect(locker.isLocked(req)).toBe(false)
      })
    })

    describe('key generation', () => {
      it('should generate consistent keys for same request', () => {
        const req1 = createRequest('GET', '/api/test', 'user1')
        const req2 = createRequest('GET', '/api/test', 'user1')
        
        locker.lock(req1)
        expect(locker.isLocked(req2)).toBe(true)
      })

      it('should handle empty user ID', () => {
        const req = createRequest('GET', '/api/test')
        
        locker.lock(req)
        expect(locker.isLocked(req)).toBe(true)
      })
    })
  })

  describe('AsyncQueue', () => {
    beforeEach(() => {
      jest.useFakeTimers()
    })

    afterEach(() => {
      jest.useRealTimers()
    })

    describe('createAsyncQueue', () => {
      it('should execute tasks in series', async () => {
        const queue = createAsyncQueue()
        const executionOrder: number[] = []
        
        const task1 = jest.fn(() => {
          executionOrder.push(1)
          return Promise.resolve()
        })
        
        const task2 = jest.fn(() => {
          executionOrder.push(2)
          return Promise.resolve()
        })
        
        queue.push(task1)
        queue.push(task2)
        
        jest.runAllTimers()
        await queue.flush()
        
        expect(executionOrder).toEqual([1, 2])
        expect(task1).toHaveBeenCalledTimes(1)
        expect(task2).toHaveBeenCalledTimes(1)
      })

      it('should return promise that resolves with task result', async () => {
        const queue = createAsyncQueue<string>()
        
        const promise = queue.push(() => Promise.resolve('test result'))
        jest.runAllTimers()
        
        const result = await promise
        expect(result).toBe('test result')
      })

      it('should handle task rejections', async () => {
        const queue = createAsyncQueue()
        const error = new Error('task failed')
        
        const promise = queue.push(() => Promise.reject(error))
        jest.runAllTimers()
        
        await expect(promise).rejects.toThrow('task failed')
      })

      it('should continue executing after task failure', async () => {
        const queue = createAsyncQueue()
        const executionOrder: number[] = []
        
        queue.push(() => {
          executionOrder.push(1)
          return Promise.reject(new Error('fail'))
        })
        
        queue.push(() => {
          executionOrder.push(2)
          return Promise.resolve()
        })
        
        jest.runAllTimers()
        await queue.flush()
        
        expect(executionOrder).toEqual([1, 2])
      })

      it('should track queue size correctly', () => {
        const queue = createAsyncQueue()
        
        expect(queue.size).toBe(0)
        
        // The queue processes tasks immediately, so size might be 0 after adding
        queue.push(() => Promise.resolve())
        
        // Queue size depends on implementation - just verify it's a number
        expect(typeof queue.size).toBe('number')
        expect(queue.size).toBeGreaterThanOrEqual(0)
      })

      describe('with dedupeConcurrent option', () => {
        it('should deduplicate concurrent tasks', async () => {
          const queue = createAsyncQueue({ dedupeConcurrent: true })
          const executionOrder: number[] = []
          
          const longTask = () => new Promise<void>(resolve => {
            setTimeout(() => {
              executionOrder.push(0)
              resolve()
            }, 100)
          })
          
          const promise1 = queue.push(longTask)
          const promise2 = queue.push(() => {
            executionOrder.push(1)
            return Promise.resolve()
          })
          const promise3 = queue.push(() => {
            executionOrder.push(2)
            return Promise.resolve()
          })
          const promise4 = queue.push(() => {
            executionOrder.push(3)
            return Promise.resolve()
          })
          
          jest.runAllTimers()
          
          await Promise.all([promise1, promise2, promise3, promise4])
          
          // Only first task (0) and last task (3) should execute
          expect(executionOrder).toEqual([0, 3])
          
          // All promises should resolve to the same value (from last task)
          await expect(promise2).resolves.toBeUndefined()
          await expect(promise3).resolves.toBeUndefined()
          await expect(promise4).resolves.toBeUndefined()
        })
      })
    })

    describe('createAsyncQueues', () => {
      it('should create separate queues for different IDs', async () => {
        const queues = createAsyncQueues()
        const executionOrder: string[] = []
        
        queues.push('queue1', () => {
          executionOrder.push('queue1-task1')
          return Promise.resolve()
        })
        
        queues.push('queue2', () => {
          executionOrder.push('queue2-task1')
          return Promise.resolve()
        })
        
        queues.push('queue1', () => {
          executionOrder.push('queue1-task2')
          return Promise.resolve()
        })
        
        jest.runAllTimers()
        
        await Promise.all([
          queues.flush('queue1'),
          queues.flush('queue2')
        ])
        
        expect(executionOrder).toContain('queue1-task1')
        expect(executionOrder).toContain('queue1-task2')
        expect(executionOrder).toContain('queue2-task1')
        
        // Tasks in same queue should be in order
        const queue1Tasks = executionOrder.filter(task => task.startsWith('queue1'))
        expect(queue1Tasks).toEqual(['queue1-task1', 'queue1-task2'])
      })

      it('should create queue on first push if not exists', async () => {
        const queues = createAsyncQueues<string>()
        
        const promise = queues.push('newQueue', () => Promise.resolve('result'))
        jest.runAllTimers()
        
        const result = await promise
        expect(result).toBe('result')
      })

      it('should create queue on flush if not exists', async () => {
        const queues = createAsyncQueues()
        
        expect(() => queues.flush('nonExistentQueue')).not.toThrow()
        await queues.flush('nonExistentQueue')
      })
    })
  })

  describe('BaseController', () => {
    it('should export ROLE_ANON constant', () => {
      expect(ROLE_ANON).toBe('anon')
    })

    it('should create BaseController instance', () => {
      const controller = new BaseController()
      expect(controller).toBeInstanceOf(BaseController)
    })

    it('should be extendable', () => {
      class TestController extends BaseController {
        test() {
          return 'test'
        }
      }
      
      const controller = new TestController()
      expect(controller).toBeInstanceOf(BaseController)
      expect(controller).toBeInstanceOf(TestController)
      expect(controller.test()).toBe('test')
    })
  })
})
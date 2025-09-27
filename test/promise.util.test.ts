import { describe, it, expect, jest, beforeEach, afterEach } from '@jest/globals'
import { Deferred, PromiseQueue } from '../src/utils/promise.util'

describe('Promise Utils Tests', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  describe('Deferred', () => {
    it('should resolve manually', async () => {
      const deferred = new Deferred<string>()
      
      setTimeout(() => deferred.resolve('resolved value'), 100)
      jest.advanceTimersByTime(100)
      
      const result = await deferred.promise
      expect(result).toBe('resolved value')
    })

    it('should reject manually', async () => {
      const deferred = new Deferred<string>()
      const error = new Error('rejected')
      
      setTimeout(() => deferred.reject(error), 100)
      jest.advanceTimersByTime(100)
      
      await expect(deferred.promise).rejects.toThrow('rejected')
    })

    it('should support then chaining', async () => {
      const deferred = new Deferred<number>()
      
      const chainedPromise = deferred.then(value => value * 2)
      
      setTimeout(() => deferred.resolve(5), 100)
      jest.advanceTimersByTime(100)
      
      const result = await chainedPromise
      expect(result).toBe(10)
    })

    it('should support catch chaining', async () => {
      const deferred = new Deferred<string>()
      
      const catchPromise = deferred.catch(error => `caught: ${error.message}`)
      
      setTimeout(() => deferred.reject(new Error('test error')), 100)
      jest.advanceTimersByTime(100)
      
      const result = await catchPromise
      expect(result).toBe('caught: test error')
    })

    it('should support then with both resolve and reject handlers', async () => {
      const deferred = new Deferred<string>()
      
      const promise = deferred.then(
        value => `resolved: ${value}`,
        error => `rejected: ${error.message}`
      )
      
      setTimeout(() => deferred.reject(new Error('test error')), 100)
      jest.advanceTimersByTime(100)
      
      const result = await promise
      expect(result).toBe('rejected: test error')
    })

    it('should resolve with promise-like values', async () => {
      const deferred = new Deferred<string>()
      const anotherPromise = Promise.resolve('from another promise')
      
      setTimeout(() => deferred.resolve(anotherPromise), 100)
      jest.advanceTimersByTime(100)
      
      const result = await deferred.promise
      expect(result).toBe('from another promise')
    })
  })

  describe('PromiseQueue', () => {
    it('should create queue with specified concurrency', () => {
      const queue = new PromiseQueue({ concurrency: 2 })
      expect(queue).toBeDefined()
    })

    it('should execute promises', () => {
      const queue = new PromiseQueue({ concurrency: 1 })
      const mockFn = jest.fn(() => Promise.resolve('test'))
      
      queue.add(mockFn)
      
      // Function should be called
      expect(mockFn).toHaveBeenCalledTimes(1)
    })

    it('should handle multiple promises', () => {
      const queue = new PromiseQueue({ concurrency: 2 })
      const mockFn1 = jest.fn(() => Promise.resolve('first'))
      const mockFn2 = jest.fn(() => Promise.resolve('second'))
      
      queue.add(mockFn1)
      queue.add(mockFn2)
      
      // Both should be called since concurrency is 2
      expect(mockFn1).toHaveBeenCalledTimes(1)
      expect(mockFn2).toHaveBeenCalledTimes(1)
    })

    it('should handle promise rejections gracefully', () => {
      const queue = new PromiseQueue({ concurrency: 1 })
      const mockFn = jest.fn(() => Promise.reject(new Error('failed')))
      
      // Should not throw when adding a failing promise
      expect(() => queue.add(mockFn)).not.toThrow()
      expect(mockFn).toHaveBeenCalledTimes(1)
    })

    it('should handle empty queue correctly', () => {
      const queue = new PromiseQueue({ concurrency: 2 })
      // No promises added - should not crash
      expect(() => queue.loadNext()).not.toThrow()
    })
  })
})
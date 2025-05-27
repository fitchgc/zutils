import { singleton } from 'decorators/singleton'
import { ZError } from './ZError'

interface IRequest {
  method: string
  url: string
  user?: {
    id: string
  }
}

@singleton
export class SyncLocker {
  map: Map<string, boolean> = new Map()

  public lock(req: IRequest) {
    const key = `${req.method}:${req.url}:${req.user?.id || ''}`
    if (this.map.has(key)) {
      return false
    }
    this.map.set(key, true)
    return true
  }

  public unlock(req: IRequest) {
    const key = `${req.method}:${req.url}:${req.user?.id || ''}`
    this.map.delete(key)
  }

  public checkLock(req: IRequest) {
    const key = `${req.method}:${req.url}:${req.user?.id || ''}`
    if (this.map.has(key)) {
      throw new ZError(100, 'request too fast')
    }
    this.lock(req)
    return true
  }

  public isLocked(req: IRequest) {
    const key = `${req.method}:${req.url}:${req.user?.id || ''}`
    return this.map.has(key)
  }
}

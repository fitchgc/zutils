import { BaseController } from '../common/base.controller'

export class RouterData {
  target?: any
  method?: string
  path?: string
  fun?: Function
}

export class RouterMap {
  static decoratedRouters: Map<
    Function,
    {
      roles?: string[]
      permissions?: string[][]
      data?: RouterData[]
      depts?: string[]
      limit?: any
      limitMethod?: Function
    }
  > = new Map()
}

export function router(route?: string) {
  return (target: BaseController, name: string, value: PropertyDescriptor) => {
    if (!route) {
      const controller = target.constructor.name
      const controllerName = controller.toLowerCase().replace('.controller', '')
      route = 'all ' + ['', controllerName, name].join('/')
    }
    const split = route.split(' ')
    if (split.length > 2) {
      throw new Error('Only one space is allowed in @router()')
    }
    const [method, path] = split
    // @ts-ignore
    const key = target[name]
    let routerData = new RouterData()
    routerData.target = target
    routerData.method = method
    routerData.path = path
    // @ts-ignore
    routerData.fun = target[name]

    if (RouterMap.decoratedRouters.has(key)) {
      let objCurrent = RouterMap.decoratedRouters.get(key)
      if (!objCurrent.data) {
        objCurrent.data = [routerData]
      } else {
        objCurrent.data.push(routerData)
      }
      // @ts-ignore
      RouterMap.decoratedRouters.set(target[name], objCurrent)
    } else {
      let routerObj = {
        data: [routerData],
      }
      // @ts-ignore
      RouterMap.decoratedRouters.set(target[name], routerObj)
    }
  }
}

export function role(roles?: string | string[]) {
  return (target: BaseController, name: string, value: PropertyDescriptor) => {
    let roleList: string[] = []
    if (roles) {
      if (Array.isArray(roles)) {
        roleList = roles
      } else {
        roleList = [roles]
      }
    }
    // @ts-ignore
    const key = target[name]
    let roleObj = { roles: roleList }
    if (RouterMap.decoratedRouters.has(key)) {
      let objCurrent = RouterMap.decoratedRouters.get(key)
      Object.assign(objCurrent, roleObj)
      // @ts-ignore
      RouterMap.decoratedRouters.set(target[name], objCurrent)
    } else {
      // @ts-ignore
      RouterMap.decoratedRouters.set(target[name], roleObj)
    }
  }
}

export function permission(permissions?: string | string[]) {
  return (target: BaseController, name: string, value: PropertyDescriptor) => {
    let permissionList: string[][] = [[]]
    if (permissions) {
      if (Array.isArray(permissions)) {
        let arr = []
        for (let sub of permissions) {
          arr.push(sub.split(':'))
        }
        permissionList = arr
      } else {
        permissionList = [permissions.split(':')]
      }
    }
    // @ts-ignore
    const key = target[name]
    let permissionObj = { permissions: permissionList }
    if (RouterMap.decoratedRouters.has(key)) {
      let objCurrent = RouterMap.decoratedRouters.get(key)
      Object.assign(objCurrent, permissionObj)
      // @ts-ignore
      RouterMap.decoratedRouters.set(target[name], objCurrent)
    } else {
      // @ts-ignore
      RouterMap.decoratedRouters.set(target[name], permissionObj)
    }
  }
}

/**
 * If there is a dept modifier, you need to verify whether the department id exists.
 */
export function dept(depts?: string | string[]) {
  return (target: BaseController, name: string, value: PropertyDescriptor) => {
    let deptList: string[] = []
    if (depts) {
      if (Array.isArray(depts)) {
        deptList = depts
      } else {
        deptList = [depts]
      }
    }
    // @ts-ignore
    const key = target[name]
    let deptObj = { depts: deptList }
    if (RouterMap.decoratedRouters.has(key)) {
      let objCurrent = RouterMap.decoratedRouters.get(key)
      Object.assign(objCurrent, deptObj)
      // @ts-ignore
      RouterMap.decoratedRouters.set(target[name], objCurrent)
    } else {
      // @ts-ignore
      RouterMap.decoratedRouters.set(target[name], deptObj)
    }
  }
}

/**
 * Whether rate limiting is required.
 * Uses @fastify/rate-limit
 */
export function limit(opt?: any) {
  return (target: BaseController, name: string, value: PropertyDescriptor) => {
    // @ts-ignore
    const key = target[name]
    let limitObj = { limit: opt || true }
    if (RouterMap.decoratedRouters.has(key)) {
      let objCurrent = RouterMap.decoratedRouters.get(key)
      Object.assign(objCurrent, limitObj)
      // @ts-ignore
      RouterMap.decoratedRouters.set(target[name], objCurrent)
    } else {
      // @ts-ignore
      RouterMap.decoratedRouters.set(target[name], limitObj)
    }
  }
}


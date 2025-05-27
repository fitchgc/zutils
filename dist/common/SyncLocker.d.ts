interface IRequest {
    method: string;
    url: string;
    user?: {
        id: string;
    };
}
declare class SyncLocker {
    map: Map<string, boolean>;
    lock(req: IRequest): boolean;
    unlock(req: IRequest): void;
    checkLock(req: IRequest): boolean;
    isLocked(req: IRequest): boolean;
}

export { SyncLocker };

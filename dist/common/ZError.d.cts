declare class ZError implements Error {
    code: string;
    statusCode?: number;
    message: string;
    name: string;
    constructor(statusCode: number, message: string);
}

export { ZError };

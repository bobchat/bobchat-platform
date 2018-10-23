/// <reference types="node" />
export interface ISubscriptionRoutes {
    [routeName: string]: IMessageHandler;
}
export interface IConnectionManager {
    connect(): any;
    close(): any;
    on(event: string, cb: (...args: any[]) => void): any;
    send(serviceId: string, method: string, req: Buffer, cb: (error: any, reply: any) => void, timeout?: number): any;
    sendAsync(serviceId: string, method: string, req: Buffer, cb: (error: any, reply: any) => void, timeout?: number): any;
    sendBroadcast(messageId: string, req: Buffer, cb: (error: any, reply: any) => void): any;
    subscribe(serviceId: string, queue: string, routes: ISubscriptionRoutes): any;
    subscribeBroadcast(routes: ISubscriptionRoutes): any;
}
export interface ILogManager {
    info(msg: string, ...params: string[]): void;
    warn(msg: string, ...params: string[]): void;
    error(msg: string, ...params: string[]): void;
}
export interface ILogManagerOpts {
    serviceName: string;
}
export interface IMessageHandler {
    process(req: Buffer): Promise<Buffer>;
}
export interface IServiceOpts {
    serviceName: string;
    connectionMgr: IConnectionManager;
    logManager: ILogManager;
    storageManager?: any;
}

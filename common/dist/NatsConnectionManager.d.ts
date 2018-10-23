/// <reference types="node" />
import { IConnectionManager, ILogManager, ISubscriptionRoutes } from './interfaces';
/**
 * Exposes connection operations for NATS.
 */
declare class NatsConnectionManager implements IConnectionManager {
    /**
     * Exception representing an error that occurred during invocation of
     * a message handler.
     *
     */
    static MESSAGE_HANDLER_ERROR: {
        new (errors: any, messageSubject: string): {
            errors: any;
            name: string;
            message: string;
            stack?: string | undefined;
        };
        captureStackTrace(targetObject: Object, constructorOpt?: Function | undefined): void;
        prepareStackTrace?: ((err: Error, stackTraces: NodeJS.CallSite[]) => any) | undefined;
        stackTraceLimit: number;
    };
    /**
     * Exception caused by request timeout.
     */
    static TIMEOUT_ERROR: {
        new (errors: any): {
            errors: any;
            name: string;
            message: string;
            stack?: string | undefined;
        };
        captureStackTrace(targetObject: Object, constructorOpt?: Function | undefined): void;
        prepareStackTrace?: ((err: Error, stackTraces: NodeJS.CallSite[]) => any) | undefined;
        stackTraceLimit: number;
    };
    natsServers: string[];
    private verbose;
    private defaultRequestTimeout;
    private conn;
    private logPrefix;
    private logger;
    /**
     * Manages connections to NATS servers.
     * @constructor
     *
     * @param {boolean} verbose - Log all events if true
     */
    constructor(natsServers: string[], logger: ILogManager, verbose?: boolean, defaultRequestTimeout?: number);
    /**
     * Connect to one of the specified servers.
     *
     * @param {string[]} servers - Array of server URLs for NATS (server is randomly chosen)
     */
    connect(waitForConnect?: boolean): void;
    /**
     * Close active connections.
     */
    close(): void;
    /**
     * Expose event system of Nats client.
     *
     * @param event
     * @callback cb
     */
    on(event: string, cb: (...args: any[]) => void): void;
    /**
     * Subscribes a service listener to its methods within a NATS queue.
     *
     * IMPORTANT: Ensure service message handlers are defined via arrow functions
     *            to ensure instance variables of the class are accessible within
     *            the scope of the handlers.
     *
     * @param service - Service Id of listener
     * @param @optional {string} - Optional name of queue to subscribe
     * @param {SubscriptionRoutes} routes - Mapping of method Ids to handlers
     */
    subscribe(serviceId: string, queue: string, routes: ISubscriptionRoutes): void;
    subscribeBroadcast(routes: ISubscriptionRoutes): void;
    subscribeTopic(topicQualifier: string, queue: string | undefined, routes: ISubscriptionRoutes): void;
    /**
     * Publish request for service.
     *
     * @param {string} serviceId - Service Id of receipient
     * @param {string} method - Id of method to call
     * @param {Buffer} req - Request buffer
     * @callback cb - Reply callback
     * @param { number}  [timeout] - Register a default timeout for requests
     */
    send: (serviceId: string, method: string, req: Buffer, cb: (error: any, reply: any) => void, timeout?: number | undefined) => void;
    /**
     * Publish a broadcast message
     */
    sendBroadcast: (messageId: string, req: Buffer, cb: (error: any, reply: any) => void) => void;
    /**
     * Publish asynchronous request for service.
     *
     * @param {string} serviceId - Service Id of receipient
     * @param {string} method - Id of method to call
     * @param {Buffer} req - Request buffer
     * @callback cb - Reply callback
     */
    sendAsync: (serviceId: string, method: string, req: Buffer, cb: (error: any, reply: any) => void) => void;
    /**
     * Register for logged connection events
     */
    private enableLogging;
    /**
     * Log a message
     *
     * @param msg
     */
    private logMessage;
}
export default NatsConnectionManager;

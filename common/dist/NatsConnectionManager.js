'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const NATS = require("nats");
const BROADCAST_PREFIX = 'BROADCAST'; /* Prefix for broadcast messages */
/* tslint:disable: max-classes-per-file */
/**
 * Exposes connection operations for NATS.
 */
class NatsConnectionManager {
    /**
     * Manages connections to NATS servers.
     * @constructor
     *
     * @param {boolean} verbose - Log all events if true
     */
    constructor(natsServers, logger, verbose = false, defaultRequestTimeout = 10000) {
        this.logPrefix = 'NatsConnectionManager';
        /**
         * Publish request for service.
         *
         * @param {string} serviceId - Service Id of receipient
         * @param {string} method - Id of method to call
         * @param {Buffer} req - Request buffer
         * @callback cb - Reply callback
         * @param { number}  [timeout] - Register a default timeout for requests
         */
        // tslint:disable-next-line:max-line-length
        this.send = (serviceId, method, req, cb, timeout) => {
            const subject = [serviceId, method].join('.');
            const msgId = this.conn.requestOne(subject, req, {}, timeout == null ? this.defaultRequestTimeout : timeout, (reply) => {
                this.logMessage(`Sending message: ${subject} ${msgId}`);
                if (reply.code && reply.code === NATS.REQ_TIMEOUT) {
                    const error = new NatsConnectionManager.TIMEOUT_ERROR({
                        message: `Timeout sending request: ${subject}`,
                    });
                    cb(error, null);
                    return;
                }
                this.logMessage(`Received reply: ${subject} (${msgId})`);
                cb(null, reply);
            });
        };
        /**
         * Publish a broadcast message
         */
        this.sendBroadcast = (messageId, req, cb) => {
            return this.sendAsync(BROADCAST_PREFIX, messageId, req, cb);
        };
        /**
         * Publish asynchronous request for service.
         *
         * @param {string} serviceId - Service Id of receipient
         * @param {string} method - Id of method to call
         * @param {Buffer} req - Request buffer
         * @callback cb - Reply callback
         */
        this.sendAsync = (serviceId, method, req, cb) => {
            const subject = [serviceId, method].join('.');
            this.conn.publish(subject, req, (reply) => {
                this.logMessage(`Queued message: ${subject}`);
                // NATS always returns "undefined" for publish, since reply is N/A.
                // Protobuf Services require _some_ kind of Type (cannot be undefined or void).
                // thus, return an empty `<Buffer >` here, which can be marshalled to the `google.protobuf.Empty` type.
                const empty = new Buffer(0);
                cb(null, empty);
            });
        };
        this.logger = logger;
        this.natsServers = natsServers;
        this.verbose = verbose;
        if (process.env.NATS_TIMEOUT) {
            this.defaultRequestTimeout = parseInt(process.env.NATS_TIMEOUT, 10);
        }
        else {
            this.defaultRequestTimeout = defaultRequestTimeout;
        }
    }
    /**
     * Connect to one of the specified servers.
     *
     * @param {string[]} servers - Array of server URLs for NATS (server is randomly chosen)
     */
    connect(waitForConnect = true) {
        const opts = {};
        opts.servers = this.natsServers;
        opts.preserveBuffers = true;
        opts.verbose = this.verbose;
        opts.waitOnFirstConnect = waitForConnect;
        opts.maxReconnectAttempts = -1; /* Infinite reconnect attempts */
        this.conn = NATS.connect(opts);
        this.enableLogging();
    }
    /**
     * Close active connections.
     */
    close() {
        this.conn.close();
    }
    /**
     * Expose event system of Nats client.
     *
     * @param event
     * @callback cb
     */
    on(event, cb) {
        this.conn.on(event, cb);
    }
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
    subscribe(serviceId, queue, routes) {
        this.logMessage(`Subscribing handlers for service='${serviceId}', queue='${queue}'`);
        return this.subscribeTopic([serviceId, '>'].join('.'), queue, routes); /* Match all topics containing Service Id */
    }
    subscribeBroadcast(routes) {
        const routeNames = Object.keys(routes);
        this.logMessage(`Subscribing handlers for broadcast: [${routeNames.join(', ')}]`);
        routeNames.forEach((r) => {
            this.subscribeTopic([BROADCAST_PREFIX, r].join('.'), undefined, { [r]: routes[r] });
        });
    }
    subscribeTopic(topicQualifier, queue, routes) {
        const opts = {};
        opts.queue = queue;
        this.conn.subscribe(topicQualifier, opts, (req, reply, subject) => {
            const method = subject.substring(subject.indexOf('.') + 1);
            const handler = routes[method];
            this.logMessage(`Receive message: full subject=${subject}, method=${method}, replyTo=${reply} `);
            handler.process(req).then((resp) => {
                if (reply) {
                    this.logMessage(`Publishing reply: ${reply}`);
                    this.conn.publish(reply, resp);
                }
                else {
                    this.logMessage('No reply required');
                }
            }, (reason) => {
                this.logMessage(`Handler failed. Reason= ${reason}`, false);
                throw new NatsConnectionManager.MESSAGE_HANDLER_ERROR(reason, subject);
            });
        });
    }
    /**
     * Register for logged connection events
     */
    enableLogging() {
        /**
         * GENERIC ERROR LOGGING
         */
        this.conn.on('error', (err) => {
            this.logMessage(err, false);
        });
        if (!this.verbose) {
            return;
        }
        /**
         * VERBOSE EVENT LOGGING
         */
        this.conn.on('connect', (conn) => {
            this.logMessage(`Connection established to ${conn.currentServer.url.host}`);
        });
        this.conn.on('disconnect', () => {
            this.logMessage('Disconnected', false);
        });
        this.conn.on('reconnect', () => {
            this.logMessage('Reconnected', false);
        });
        this.conn.on('close', () => {
            this.logMessage('Connection closed');
        });
    }
    /**
     * Log a message
     *
     * @param msg
     */
    logMessage(msg, info = true) {
        if (!info || this.verbose) {
            this.logger.info(`(${this.logPrefix}) ${msg}`);
        }
    }
}
/**
 * Exception representing an error that occurred during invocation of
 * a message handler.
 *
 */
NatsConnectionManager.MESSAGE_HANDLER_ERROR = class extends Error {
    constructor(errors, messageSubject) {
        super(`Error from message handler for '${messageSubject}'. Reason = ${JSON.stringify(errors)}`);
        this.errors = errors;
    }
};
/**
 * Exception caused by request timeout.
 */
NatsConnectionManager.TIMEOUT_ERROR = class extends Error {
    constructor(errors) {
        super('NATS Timeout');
        this.errors = errors;
    }
};
exports.default = NatsConnectionManager;
//# sourceMappingURL=NatsConnectionManager.js.map
/// <reference types="node" />
/**
 * Provides a wrapper around Protobuf messages. Incoming buffers are decoded, the
 * handler method is called using staticly-compiled Protobuf definitions, and returned
 * reponse objects are encoded and marshalled into Buffer.
 */
export declare class PbMessageHandler {
    method: any;
    requestCls: any;
    responseCls: any;
    /**
     * @constructor
     * @param method - Message handler method to be invoked
     * @param requestCls - Request class provided by Protobuf
     * @param responseCls - Response class provided by Protobuf
     */
    constructor(method: any, requestCls: any, responseCls: any);
    /**
     * Invoke registered message handler.
     *
     * @param {Buffer} req - Incoming request
     * @returns {Promise<Buffer>} - Promise for buffer containing encoded response object
     */
    process(req: Buffer): Promise<Buffer>;
}
export default PbMessageHandler;

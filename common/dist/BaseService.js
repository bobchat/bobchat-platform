"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Provides the abstract class for all service implementations.
 */
class BaseService {
    constructor(opts) {
        this.opts = opts;
        this.connectionMgr = this.opts.connectionMgr;
        this.logger = this.opts.logManager;
        this.serviceName = this.opts.serviceName;
        this.storage = this.opts.storageManager;
    }
    /**
     * Register message listeners here.
     */
    register() {
        throw new Error("Not Implemented: register method in Service class.");
    }
    run() {
        throw new Error("Not Implemented: run method in Service class.");
    }
}
exports.default = BaseService;
//# sourceMappingURL=BaseService.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ConsoleLogManager {
    constructor(opts) {
        this.opts = opts;
    }
    info(msg, ...params) {
        console.info(msg, ...params);
    }
    warn(msg, ...params) {
        console.warn(msg, ...params);
    }
    error(msg, ...params) {
        console.error(msg, ...params);
    }
}
exports.default = ConsoleLogManager;
//# sourceMappingURL=ConsoleLogManager.js.map
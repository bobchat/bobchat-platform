"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pb = require("bobchat-common/dist/bobchat-proto");
const PbServiceProxy_1 = require("bobchat-common/dist/PbServiceProxy");
function proxyProvider(conn) {
    return {
        userService: new PbServiceProxy_1.default(conn, pb.UserService.name)
            .activate(pb.UserService),
    };
}
exports.proxyProvider = proxyProvider;
//# sourceMappingURL=proxyProvider.js.map
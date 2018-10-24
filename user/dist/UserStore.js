"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Tracer_1 = require("bobchat-common/dist/Tracer");
const tracer = new Tracer_1.default('UserStore');
class UserStore {
    constructor(User) {
        this.User = User;
    }
    createUser(spanContext, attributes) {
        return __awaiter(this, void 0, void 0, function* () {
            const span = tracer.startSpan('createUser', spanContext);
            const user = new this.User(attributes);
            try {
                return yield user.save();
            }
            catch (e) {
                span.setTag('error', true);
                span.log({ errors: e });
                span.finish();
                return Promise.reject(UserStore.OPERATION_UNSUCCESSFUL);
            }
        });
    }
    findById(spanContext, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const span = tracer.startSpan('findById', spanContext);
            try {
                return yield this.User.findById(userId);
            }
            catch (e) {
                span.setTag('error', true);
                span.log({ errors: e });
                span.finish();
                return Promise.reject(UserStore.OPERATION_UNSUCCESSFUL);
            }
        });
    }
    findByDeviceUniqueId(spanContext, deviceUniqueId) {
        return __awaiter(this, void 0, void 0, function* () {
            const span = tracer.startSpan('findByDeviceUniqueId', spanContext);
            try {
                return yield this.User.findOne({ deviceUniqueId });
            }
            catch (e) {
                span.setTag('error', true);
                span.log({ errors: e });
                span.finish();
                return Promise.reject(UserStore.OPERATION_UNSUCCESSFUL);
            }
        });
    }
}
UserStore.OPERATION_UNSUCCESSFUL = class extends Error {
    constructor() {
        super('Database returned an incorrect number of effected rows.');
    }
};
exports.default = UserStore;
//# sourceMappingURL=UserStore.js.map
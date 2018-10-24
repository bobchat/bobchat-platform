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
const pb = require("bobchat-common/dist/bobchat-proto");
const Joi = require("joi");
const BaseService_1 = require("bobchat-common/dist/BaseService");
const ConsoleLogManager_1 = require("bobchat-common/dist/ConsoleLogManager");
const NatsConnectionManager_1 = require("bobchat-common/dist/NatsConnectionManager");
const PbMessageHandler_1 = require("bobchat-common/dist/PbMessageHandler");
const joiToErrors_1 = require("bobchat-common/dist/joiToErrors");
const User_1 = require("./User");
const UserStore_1 = require("./UserStore");
const Tracer_1 = require("bobchat-common/dist/Tracer");
const proxyProvider_1 = require("./proxyProvider");
const env_1 = require("./env");
const tracer = new Tracer_1.default('UserService');
class UserService extends BaseService_1.default {
    constructor(opts) {
        super(opts);
        this.createUser = (request) => __awaiter(this, void 0, void 0, function* () {
            const span = tracer.startSpan('createUser', request.spanContext);
            const response = pb.CreateUserResponse.create();
            const schema = Joi.object().keys({
                deviceUniqueId: Joi.string().required()
            });
            const params = Joi.validate(request.user, schema);
            const { deviceUniqueId } = params.value;
            if (params.error) {
                response.status = pb.StatusCode.UNPROCESSABLE_ENTITY;
                response.errors = joiToErrors_1.default(params.error, pb.Error);
                return response;
            }
            const attributes = {
                deviceUniqueId,
                created: Date.now(),
            };
            let model;
            try {
                model = yield this.storage.createUser(span, attributes);
                response.status = pb.StatusCode.OK;
                response.user = pb.User.create();
                response.user.deviceUniqueId = model.deviceUniqueId;
                response.user.created = model.created;
            }
            catch (e) {
                this.logger.error(`creatUser - error: ${JSON.stringify(e)}`);
                response.errors = [
                    pb.Error.create({
                        key: 'Error',
                        value: 'Signup was not successful. Please try again.'
                    })
                ];
            }
            return response;
        });
        this.proxy = proxyProvider_1.proxyProvider(this.connectionMgr);
    }
    static main() {
        const serviceName = pb.UserService.name;
        const logger = new ConsoleLogManager_1.default({
            serviceName,
        });
        const service = new UserService({
            serviceName: serviceName,
            connectionMgr: new NatsConnectionManager_1.default([env_1.NATS_URL], logger, true),
            logManager: logger,
            storageManager: new UserStore_1.default(User_1.User),
        });
        service.run();
    }
    run() {
        this.connectionMgr.connect();
        this.connectionMgr.on('connect', () => {
            this.register();
            this.logger.info(`Service instance ${this.serviceName} is running...`);
        });
    }
    register() {
        this.connectionMgr.subscribe(this.serviceName, 'api', {
            /**
             * Incoming Message Handlers
             */
            createUser: new PbMessageHandler_1.default(this.createUser, pb.CreateUserRequest, pb.CreateUserResponse),
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=UserService.js.map
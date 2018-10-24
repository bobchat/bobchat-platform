import * as pb from 'bobchat-common/dist/bobchat-proto';
import * as Joi from 'joi';
import BaseService from 'bobchat-common/dist/BaseService';
import ConsoleLogManager from 'bobchat-common/dist/ConsoleLogManager';
import NatsConnectionManager from 'bobchat-common/dist/NatsConnectionManager';
import PbMessageHandler from 'bobchat-common/dist/PbMessageHandler';
import joiToErrors from 'bobchat-common/dist/joiToErrors';
import { User } from './User';
import UserStore from './UserStore';
import IUser  from './interfaces/IUser';
import Tracer from 'bobchat-common/dist/Tracer';
import { IServiceProxy, proxyProvider } from './proxyProvider';
import { NATS_URL } from './env';

const tracer = new Tracer('UserService');

export default class UserService extends BaseService {

  public proxy: IServiceProxy;

  constructor(opts) {
    super(opts);
    this.proxy = proxyProvider(this.connectionMgr);
  }
  public static main() {
    const serviceName = pb.UserService.name;
    const logger = new ConsoleLogManager({
      serviceName,
    });
    const service = new UserService({
      serviceName: serviceName,
      connectionMgr: new NatsConnectionManager([<string>NATS_URL], logger, true),
      logManager: logger,
      storageManager: new UserStore(User),
    });
    service.run();
  }
  public run() {
    this.connectionMgr.connect();
    this.connectionMgr.on('connect', () => {
      this.register();
      this.logger.info(`Service instance ${this.serviceName} is running...`);
    });
  }
  public register() {
    this.connectionMgr.subscribe(this.serviceName, 'api', {
      /**
       * Incoming Message Handlers
       */
      createUser: new PbMessageHandler(
        this.createUser,
        pb.CreateUserRequest,
        pb.CreateUserResponse,
      ),


    });
  }
  public createUser = async (request: pb.CreateUserRequest): Promise<pb.CreateUserResponse> => {
    const span = tracer.startSpan('createUser', request.spanContext);
    const response: pb.CreateUserResponse = pb.CreateUserResponse.create();

    const schema = Joi.object().keys({
      deviceUniqueId: Joi.string().required()
    });

    const params = Joi.validate(request.user, schema);
    const  {deviceUniqueId } = params.value;

    if(params.error) {
      response.status = pb.StatusCode.UNPROCESSABLE_ENTITY;
      response.errors = joiToErrors(params.error, pb.Error);
      return response;
    }

    const attributes: IUser = {
      deviceUniqueId,
      created: Date.now(),
    };

    let model;
    try {
      model = await this.storage.createUser(span, attributes);
      response.status = pb.StatusCode.OK;
      response.user = pb.User.create();
      response.user.deviceUniqueId = model.deviceUniqueId;
      response.user.created = model.created;

    } catch(e) {
      this.logger.error(`creatUser - error: ${JSON.stringify(e)}`);
      response.errors = [
        pb.Error.create({
          key: 'Error',
          value: 'Signup was not successful. Please try again.'
        })
      ];
    }

    return response;
  }
}










import IUser from './interfaces/IUser';
import Tracer from './../../common/dist/Tracer';

const tracer = new Tracer('UserStore');

export default class UserStore {

  public static OPERATION_UNSUCCESSFUL = class extends Error {
    constructor() {
      super('Database returned an incorrect number of effected rows.');
    }
  };

  private User;

  constructor(User) {
    this.User = User;
  }

  public async createUser(spanContext: string, attributes: IUser ): Promise<IUser> {
    const span = tracer.startSpan('createUser', spanContext);
    const user = new this.User(attributes);
    try {
      return await user.save();
    } catch (e) {
      span.setTag('error', true);
      span.log({ errors: e });
      span.finish();
      return Promise.reject(UserStore.OPERATION_UNSUCCESSFUL);
    }
  }

  public async findById(spanContext: string, userId: string): Promise<IUser> {
    const span = tracer.startSpan('findById', spanContext);
    try {
      return await this.User.findById(userId);
    } catch(e) {
      span.setTag('error', true);
      span.log({ errors: e });
      span.finish();
      return Promise.reject(UserStore.OPERATION_UNSUCCESSFUL);
    }
  }

  public async findByDeviceUniqueId(spanContext: string, deviceUniqueId: string): Promise<IUser> {
    const span = tracer.startSpan('findByDeviceUniqueId', spanContext);
    try {
      return await this.User.findOne({ deviceUniqueId });
    } catch (e) {
      span.setTag('error', true);
      span.log({ errors: e });
      span.finish();
      return Promise.reject(UserStore.OPERATION_UNSUCCESSFUL);
    }
  }

}


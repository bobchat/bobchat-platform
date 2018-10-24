import BaseService from 'bobchat-common/dist/BaseService';
import { IServiceProxy } from './proxyProvider';
export default class UserService extends BaseService {
    proxy: IServiceProxy;
    constructor(opts: any);
    static main(): void;
    run(): void;
    register(): void;
    createUser: (request: any) => Promise<any>;
}

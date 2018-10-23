import { IConnectionManager } from './../../common/dist/interfaces';
import * as pb from './../../common/dist/bobchat-proto';
export interface IServiceProxy {
    userService: pb.UserService;
}
export declare function proxyProvider(conn: IConnectionManager): IServiceProxy;

import { IConnectionManager } from 'bobchat-common/dist/interfaces';
import * as pb from 'bobchat-common/dist/bobchat-proto';
export interface IServiceProxy {
    userService: pb.UserService;
}
export declare function proxyProvider(conn: IConnectionManager): IServiceProxy;

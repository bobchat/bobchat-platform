/// <reference types="node" />
import IUser from './interfaces/IUser';
export default class UserStore {
    static OPERATION_UNSUCCESSFUL: {
        new (): {
            name: string;
            message: string;
            stack?: string;
        };
        captureStackTrace(targetObject: Object, constructorOpt?: Function): void;
        prepareStackTrace?: (err: Error, stackTraces: NodeJS.CallSite[]) => any;
        stackTraceLimit: number;
    };
    private User;
    constructor(User: any);
    createUser(spanContext: string, attributes: IUser): Promise<IUser>;
    findById(spanContext: string, userId: string): Promise<IUser>;
    findByDeviceUniqueId(spanContext: string, deviceUniqueId: string): Promise<IUser>;
}

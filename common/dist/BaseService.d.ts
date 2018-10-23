import { IConnectionManager, ILogManager, IServiceOpts } from "./interfaces";
/**
 * Provides the abstract class for all service implementations.
 */
declare class BaseService {
    opts: IServiceOpts;
    serviceName: string;
    connectionMgr: IConnectionManager;
    logger: ILogManager;
    storage: any;
    constructor(opts: IServiceOpts);
    /**
     * Register message listeners here.
     */
    register(): void;
    run(): void;
}
export default BaseService;

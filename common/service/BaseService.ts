import { IConnectionManager, ILogManager, IServiceOpts } from "./interfaces";

/**
 * Provides the abstract class for all service implementations.
 */
class BaseService {
  public opts: IServiceOpts;
  public serviceName: string;
  public connectionMgr: IConnectionManager;
  public logger: ILogManager;
  public storage;

  constructor(opts: IServiceOpts) {
    this.opts = opts;
    this.connectionMgr = this.opts.connectionMgr;
    this.logger = this.opts.logManager;
    this.serviceName = this.opts.serviceName;
    this.storage = this.opts.storageManager;
  }

  /**
   * Register message listeners here.
   */
  public register() {
    throw new Error("Not Implemented: register method in Service class.");
  }

  public run() {
    throw new Error("Not Implemented: run method in Service class.");
  }
}

export default BaseService;

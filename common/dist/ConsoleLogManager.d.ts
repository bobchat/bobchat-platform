import { ILogManager, ILogManagerOpts } from "./interfaces";
declare class ConsoleLogManager implements ILogManager {
    opts: ILogManagerOpts;
    constructor(opts: ILogManagerOpts);
    info(msg: string, ...params: string[]): void;
    warn(msg: string, ...params: string[]): void;
    error(msg: string, ...params: string[]): void;
}
export default ConsoleLogManager;

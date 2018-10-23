import { Span, SpanContext } from 'jaeger-client';
export default class Tracer {
    serviceName: string;
    logger: any;
    tracer: any;
    constructor(serviceName: string, logger?: any, verbose?: boolean);
    config(verbose?: boolean): {
        serviceName: string;
        sampler: {
            type: string;
            param: number;
        };
        reporter: {
            logSpans: boolean;
        };
    };
    options(): {
        logger: any;
    };
    startSpan(name: string, parentSpan?: (Span | SpanContext | string)): any;
}

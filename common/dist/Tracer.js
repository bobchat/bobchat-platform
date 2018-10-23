"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jaeger_client_1 = require("jaeger-client");
// const JAEGER_AGENT_HOST = process.env.JAEGER_AGENT_HOST;
class Tracer {
    constructor(serviceName, logger = console, verbose = true) {
        this.serviceName = serviceName;
        this.logger = logger ? logger : console;
        this.tracer = jaeger_client_1.initTracer(this.config(verbose), this.options());
    }
    config(verbose = true) {
        // Should fail to start if JAEGER_AGENT_HOST is not provided in the container utilizing this code.
        // if (!Boolean(JAEGER_AGENT_HOST)) {
        //   throw Error('JAEGER_AGENT_HOST not found in ENV');
        // }
        return {
            serviceName: this.serviceName,
            sampler: {
                type: 'const',
                param: 1,
            },
            reporter: {
                // agentHost: JAEGER_AGENT_HOST,
                logSpans: verbose,
            },
        };
    }
    options() {
        const options = {
            logger: this.logger,
        };
        return options;
    }
    startSpan(name, parentSpan) {
        let childOf;
        if (typeof parentSpan === 'string') {
            childOf = jaeger_client_1.SpanContext.fromString(parentSpan);
        }
        else if (parentSpan instanceof jaeger_client_1.Span) {
            childOf = parentSpan.context();
        }
        else if (parentSpan instanceof jaeger_client_1.SpanContext) {
            childOf = parentSpan;
        }
        return this.tracer.startSpan(name, { childOf });
    }
}
exports.default = Tracer;
//# sourceMappingURL=Tracer.js.map
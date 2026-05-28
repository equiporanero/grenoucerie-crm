"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "LogExecutionTime", {
    enumerable: true,
    get: function() {
        return LogExecutionTime;
    }
});
const _common = require("@nestjs/common");
const _classvalidator = require("class-validator");
function LogExecutionTime(label) {
    return function(// oxlint-disable-next-line @typescripttypescript/no-explicit-any
    target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        const logger = new _common.Logger(`${target.constructor.name}:${propertyKey}`);
        // oxlint-disable-next-line @typescripttypescript/no-explicit-any
        descriptor.value = async function(...args) {
            const start = performance.now();
            const result = await originalMethod.apply(this, args);
            const end = performance.now();
            const executionTime = end - start;
            if ((0, _classvalidator.isDefined)(label)) {
                logger.log(`${label} execution time: ${executionTime.toFixed(2)}ms`);
            } else {
                logger.log(`Execution time: ${executionTime.toFixed(2)}ms`);
            }
            return result;
        };
        return descriptor;
    };
}

//# sourceMappingURL=log-execution-time.decorator.js.map
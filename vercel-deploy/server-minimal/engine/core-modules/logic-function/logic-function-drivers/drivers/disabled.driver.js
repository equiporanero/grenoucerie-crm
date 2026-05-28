"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DisabledDriver", {
    enumerable: true,
    get: function() {
        return DisabledDriver;
    }
});
const _logicfunctionexception = require("../../../../metadata-modules/logic-function/logic-function.exception");
let DisabledDriver = class DisabledDriver {
    async delete() {
    // No-op when disabled
    }
    async execute() {
        throw new _logicfunctionexception.LogicFunctionException('Logic function execution is disabled. Set LOGIC_FUNCTION_TYPE to LOCAL or LAMBDA to enable.', _logicfunctionexception.LogicFunctionExceptionCode.LOGIC_FUNCTION_DISABLED);
    }
    async transpile() {
        throw new _logicfunctionexception.LogicFunctionException('Logic function transpilation is disabled. Set LOGIC_FUNCTION_TYPE to LOCAL or LAMBDA to enable.', _logicfunctionexception.LogicFunctionExceptionCode.LOGIC_FUNCTION_DISABLED);
    }
};

//# sourceMappingURL=disabled.driver.js.map
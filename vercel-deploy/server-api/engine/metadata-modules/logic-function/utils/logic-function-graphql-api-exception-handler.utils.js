"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "logicFunctionGraphQLApiExceptionHandler", {
    enumerable: true,
    get: function() {
        return logicFunctionGraphQLApiExceptionHandler;
    }
});
const _utils = require("twenty-shared/utils");
const _graphqlerrorsutil = require("../../../core-modules/graphql/utils/graphql-errors.util");
const _logicfunctionexception = require("../logic-function.exception");
const logicFunctionGraphQLApiExceptionHandler = (error)=>{
    if (error instanceof _logicfunctionexception.LogicFunctionException) {
        switch(error.code){
            case _logicfunctionexception.LogicFunctionExceptionCode.LOGIC_FUNCTION_NOT_FOUND:
                throw new _graphqlerrorsutil.NotFoundError(error);
            case _logicfunctionexception.LogicFunctionExceptionCode.LOGIC_FUNCTION_ALREADY_EXIST:
                throw new _graphqlerrorsutil.ConflictError(error);
            case _logicfunctionexception.LogicFunctionExceptionCode.LOGIC_FUNCTION_NOT_READY:
            case _logicfunctionexception.LogicFunctionExceptionCode.LOGIC_FUNCTION_BUILDING:
            case _logicfunctionexception.LogicFunctionExceptionCode.LOGIC_FUNCTION_EXECUTION_LIMIT_REACHED:
                throw new _graphqlerrorsutil.ForbiddenError(error);
            case _logicfunctionexception.LogicFunctionExceptionCode.LOGIC_FUNCTION_EXECUTION_TIMEOUT:
                throw new _graphqlerrorsutil.TimeoutError(error);
            case _logicfunctionexception.LogicFunctionExceptionCode.LOGIC_FUNCTION_CODE_UNCHANGED:
            case _logicfunctionexception.LogicFunctionExceptionCode.LOGIC_FUNCTION_CREATE_FAILED:
            case _logicfunctionexception.LogicFunctionExceptionCode.LOGIC_FUNCTION_INVALID_SEED_PROJECT:
            case _logicfunctionexception.LogicFunctionExceptionCode.LOGIC_FUNCTION_EXECUTION_FAILED:
            case _logicfunctionexception.LogicFunctionExceptionCode.LOGIC_FUNCTION_LAYER_BUILD_FAILED:
                throw error;
            case _logicfunctionexception.LogicFunctionExceptionCode.LOGIC_FUNCTION_COMPILATION_FAILED:
            case _logicfunctionexception.LogicFunctionExceptionCode.INVALID_LOGIC_FUNCTION_INPUT:
                throw new _graphqlerrorsutil.UserInputError(error);
            case _logicfunctionexception.LogicFunctionExceptionCode.LOGIC_FUNCTION_DISABLED:
                throw new _graphqlerrorsutil.ForbiddenError(error);
            default:
                {
                    return (0, _utils.assertUnreachable)(error.code);
                }
        }
    }
    throw error;
};

//# sourceMappingURL=logic-function-graphql-api-exception-handler.utils.js.map
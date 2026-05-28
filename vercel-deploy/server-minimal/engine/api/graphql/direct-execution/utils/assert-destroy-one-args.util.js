"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "assertDestroyOneArgs", {
    enumerable: true,
    get: function() {
        return assertDestroyOneArgs;
    }
});
const _classvalidator = require("class-validator");
const _utils = require("twenty-shared/utils");
const _graphqldirectexecutionexception = require("../errors/graphql-direct-execution.exception");
const _standarderrormessageconstant = require("../../../common/common-query-runners/errors/standard-error-message.constant");
function assertDestroyOneArgs(args) {
    if (!(0, _classvalidator.isObject)(args)) {
        throw new _graphqldirectexecutionexception.GraphqlDirectExecutionException('Invalid argument: it must be an object', _graphqldirectexecutionexception.GraphqlDirectExecutionExceptionCode.INVALID_QUERY_INPUT, {
            userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
        });
    }
    const argKeys = Object.keys(args);
    const allowedKeys = new Set([
        'id'
    ]);
    for (const key of argKeys){
        if (!allowedKeys.has(key)) {
            throw new _graphqldirectexecutionexception.GraphqlDirectExecutionException(`Argument not allowed: ${key}`, _graphqldirectexecutionexception.GraphqlDirectExecutionExceptionCode.INVALID_QUERY_INPUT, {
                userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
            });
        }
    }
    if (!('id' in args) || !(0, _classvalidator.isString)(args.id) || !(0, _utils.isValidUuid)(args.id)) {
        throw new _graphqldirectexecutionexception.GraphqlDirectExecutionException('Missing required argument: "id" (UUID)', _graphqldirectexecutionexception.GraphqlDirectExecutionExceptionCode.INVALID_QUERY_INPUT, {
            userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
        });
    }
}

//# sourceMappingURL=assert-destroy-one-args.util.js.map
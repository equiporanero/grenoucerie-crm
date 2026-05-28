"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "assertUpdateManyArgs", {
    enumerable: true,
    get: function() {
        return assertUpdateManyArgs;
    }
});
const _classvalidator = require("class-validator");
const _standarderrormessageconstant = require("../../../common/common-query-runners/errors/standard-error-message.constant");
const _graphqldirectexecutionexception = require("../errors/graphql-direct-execution.exception");
function assertUpdateManyArgs(args) {
    if (!(0, _classvalidator.isObject)(args)) {
        throw new _graphqldirectexecutionexception.GraphqlDirectExecutionException('Invalid argument: it must be an object', _graphqldirectexecutionexception.GraphqlDirectExecutionExceptionCode.INVALID_QUERY_INPUT, {
            userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
        });
    }
    const argKeys = Object.keys(args);
    const allowedKeys = new Set([
        'filter',
        'data'
    ]);
    for (const key of argKeys){
        if (!allowedKeys.has(key)) {
            throw new _graphqldirectexecutionexception.GraphqlDirectExecutionException(`Argument not allowed: ${key}`, _graphqldirectexecutionexception.GraphqlDirectExecutionExceptionCode.INVALID_QUERY_INPUT, {
                userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
            });
        }
    }
    if (!('filter' in args) || !(0, _classvalidator.isObject)(args.filter)) {
        throw new _graphqldirectexecutionexception.GraphqlDirectExecutionException('Missing required argument: "filter" (object)', _graphqldirectexecutionexception.GraphqlDirectExecutionExceptionCode.INVALID_QUERY_INPUT, {
            userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
        });
    }
    if (!('data' in args) || !(0, _classvalidator.isObject)(args.data)) {
        throw new _graphqldirectexecutionexception.GraphqlDirectExecutionException('Missing required argument: "data" (object)', _graphqldirectexecutionexception.GraphqlDirectExecutionExceptionCode.INVALID_QUERY_INPUT, {
            userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
        });
    }
}

//# sourceMappingURL=assert-update-many-args.util.js.map
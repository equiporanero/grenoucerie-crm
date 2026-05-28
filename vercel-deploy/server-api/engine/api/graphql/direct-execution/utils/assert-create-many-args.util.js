"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "assertCreateManyArgs", {
    enumerable: true,
    get: function() {
        return assertCreateManyArgs;
    }
});
const _classvalidator = require("class-validator");
const _utils = require("twenty-shared/utils");
const _graphqldirectexecutionexception = require("../errors/graphql-direct-execution.exception");
const _standarderrormessageconstant = require("../../../common/common-query-runners/errors/standard-error-message.constant");
function assertCreateManyArgs(args) {
    if (!(0, _classvalidator.isObject)(args)) {
        throw new _graphqldirectexecutionexception.GraphqlDirectExecutionException('Invalid argument: it must be an object', _graphqldirectexecutionexception.GraphqlDirectExecutionExceptionCode.INVALID_QUERY_INPUT, {
            userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
        });
    }
    const argKeys = Object.keys(args);
    const allowedKeys = new Set([
        'data',
        'upsert'
    ]);
    for (const key of argKeys){
        if (!allowedKeys.has(key)) {
            throw new _graphqldirectexecutionexception.GraphqlDirectExecutionException(`Argument not allowed: ${key}`, _graphqldirectexecutionexception.GraphqlDirectExecutionExceptionCode.INVALID_QUERY_INPUT, {
                userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
            });
        }
    }
    if (!('data' in args) || !Array.isArray(args.data)) {
        throw new _graphqldirectexecutionexception.GraphqlDirectExecutionException('Missing required argument: "data" (array)', _graphqldirectexecutionexception.GraphqlDirectExecutionExceptionCode.INVALID_QUERY_INPUT, {
            userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
        });
    }
    if ('upsert' in args && (0, _utils.isDefined)(args.upsert) && !(0, _classvalidator.isBoolean)(args.upsert)) {
        throw new _graphqldirectexecutionexception.GraphqlDirectExecutionException('Invalid argument: "upsert" must be a boolean', _graphqldirectexecutionexception.GraphqlDirectExecutionExceptionCode.INVALID_QUERY_INPUT, {
            userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
        });
    }
}

//# sourceMappingURL=assert-create-many-args.util.js.map
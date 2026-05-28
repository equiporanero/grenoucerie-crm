"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "assertFindDuplicatesArgs", {
    enumerable: true,
    get: function() {
        return assertFindDuplicatesArgs;
    }
});
const _classvalidator = require("class-validator");
const _utils = require("twenty-shared/utils");
const _graphqldirectexecutionexception = require("../errors/graphql-direct-execution.exception");
const _standarderrormessageconstant = require("../../../common/common-query-runners/errors/standard-error-message.constant");
function assertFindDuplicatesArgs(args) {
    if (!(0, _classvalidator.isObject)(args)) {
        throw new _graphqldirectexecutionexception.GraphqlDirectExecutionException('Invalid argument: it must be an object', _graphqldirectexecutionexception.GraphqlDirectExecutionExceptionCode.INVALID_QUERY_INPUT, {
            userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
        });
    }
    const argKeys = Object.keys(args);
    const allowedKeys = new Set([
        'data',
        'ids'
    ]);
    for (const key of argKeys){
        if (!allowedKeys.has(key)) {
            throw new _graphqldirectexecutionexception.GraphqlDirectExecutionException(`Argument not allowed: ${key}`, _graphqldirectexecutionexception.GraphqlDirectExecutionExceptionCode.INVALID_QUERY_INPUT, {
                userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
            });
        }
    }
    if ('data' in args && (0, _utils.isDefined)(args.data) && !Array.isArray(args.data)) {
        throw new _graphqldirectexecutionexception.GraphqlDirectExecutionException('Invalid argument: "data" must be an array', _graphqldirectexecutionexception.GraphqlDirectExecutionExceptionCode.INVALID_QUERY_INPUT, {
            userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
        });
    }
    if ('ids' in args && (0, _utils.isDefined)(args.ids) && !Array.isArray(args.ids)) {
        throw new _graphqldirectexecutionexception.GraphqlDirectExecutionException('Invalid argument: "ids" must be an array', _graphqldirectexecutionexception.GraphqlDirectExecutionExceptionCode.INVALID_QUERY_INPUT, {
            userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
        });
    }
}

//# sourceMappingURL=assert-find-duplicates-args.util.js.map
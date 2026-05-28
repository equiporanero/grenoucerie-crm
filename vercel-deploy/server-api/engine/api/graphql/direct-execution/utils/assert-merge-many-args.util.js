"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "assertMergeManyArgs", {
    enumerable: true,
    get: function() {
        return assertMergeManyArgs;
    }
});
const _classvalidator = require("class-validator");
const _utils = require("twenty-shared/utils");
const _graphqldirectexecutionexception = require("../errors/graphql-direct-execution.exception");
const _standarderrormessageconstant = require("../../../common/common-query-runners/errors/standard-error-message.constant");
function assertMergeManyArgs(args) {
    if (!(0, _classvalidator.isObject)(args)) {
        throw new _graphqldirectexecutionexception.GraphqlDirectExecutionException('Invalid argument: it must be an object', _graphqldirectexecutionexception.GraphqlDirectExecutionExceptionCode.INVALID_QUERY_INPUT, {
            userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
        });
    }
    const argKeys = Object.keys(args);
    const allowedKeys = new Set([
        'ids',
        'conflictPriorityIndex',
        'dryRun'
    ]);
    for (const key of argKeys){
        if (!allowedKeys.has(key)) {
            throw new _graphqldirectexecutionexception.GraphqlDirectExecutionException(`Argument not allowed: ${key}`, _graphqldirectexecutionexception.GraphqlDirectExecutionExceptionCode.INVALID_QUERY_INPUT, {
                userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
            });
        }
    }
    if (!('ids' in args) || !Array.isArray(args.ids)) {
        throw new _graphqldirectexecutionexception.GraphqlDirectExecutionException('Missing required argument: "ids" (array)', _graphqldirectexecutionexception.GraphqlDirectExecutionExceptionCode.INVALID_QUERY_INPUT, {
            userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
        });
    }
    if (!('conflictPriorityIndex' in args) || !(0, _classvalidator.isNumber)(args.conflictPriorityIndex)) {
        throw new _graphqldirectexecutionexception.GraphqlDirectExecutionException('Missing required argument: "conflictPriorityIndex" (number)', _graphqldirectexecutionexception.GraphqlDirectExecutionExceptionCode.INVALID_QUERY_INPUT, {
            userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
        });
    }
    if ('dryRun' in args && (0, _utils.isDefined)(args.dryRun) && !(0, _classvalidator.isBoolean)(args.dryRun)) {
        throw new _graphqldirectexecutionexception.GraphqlDirectExecutionException('Invalid argument: "dryRun" must be a boolean', _graphqldirectexecutionexception.GraphqlDirectExecutionExceptionCode.INVALID_QUERY_INPUT, {
            userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
        });
    }
}

//# sourceMappingURL=assert-merge-many-args.util.js.map
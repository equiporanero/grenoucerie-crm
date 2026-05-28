"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "assertFindManyArgs", {
    enumerable: true,
    get: function() {
        return assertFindManyArgs;
    }
});
const _classvalidator = require("class-validator");
const _utils = require("twenty-shared/utils");
const _graphqldirectexecutionexception = require("../errors/graphql-direct-execution.exception");
const _standarderrormessageconstant = require("../../../common/common-query-runners/errors/standard-error-message.constant");
function assertFindManyArgs(args) {
    if (!(0, _classvalidator.isObject)(args)) {
        throw new _graphqldirectexecutionexception.GraphqlDirectExecutionException('Invalid argument: it must be an object', _graphqldirectexecutionexception.GraphqlDirectExecutionExceptionCode.INVALID_QUERY_INPUT, {
            userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
        });
    }
    const argKeys = Object.keys(args);
    const allowedKeys = new Set([
        'filter',
        'orderBy',
        'first',
        'last',
        'before',
        'after',
        'offset'
    ]);
    for (const key of argKeys){
        if (!allowedKeys.has(key)) {
            throw new _graphqldirectexecutionexception.GraphqlDirectExecutionException(`Argument not allowed: ${key}`, _graphqldirectexecutionexception.GraphqlDirectExecutionExceptionCode.INVALID_QUERY_INPUT, {
                userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
            });
        }
    }
    if ('first' in args && (0, _utils.isDefined)(args.first) && !(0, _classvalidator.isNumber)(args.first)) {
        throw new _graphqldirectexecutionexception.GraphqlDirectExecutionException('Invalid argument: "first" must be a number', _graphqldirectexecutionexception.GraphqlDirectExecutionExceptionCode.INVALID_QUERY_INPUT, {
            userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
        });
    }
    if ('last' in args && (0, _utils.isDefined)(args.last) && !(0, _classvalidator.isNumber)(args.last)) {
        throw new _graphqldirectexecutionexception.GraphqlDirectExecutionException('Invalid argument: "last" must be a number', _graphqldirectexecutionexception.GraphqlDirectExecutionExceptionCode.INVALID_QUERY_INPUT, {
            userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
        });
    }
    if ('filter' in args && (0, _utils.isDefined)(args.filter) && !(0, _classvalidator.isObject)(args.filter)) {
        throw new _graphqldirectexecutionexception.GraphqlDirectExecutionException('Invalid argument: "filter" must be an object', _graphqldirectexecutionexception.GraphqlDirectExecutionExceptionCode.INVALID_QUERY_INPUT, {
            userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
        });
    }
    if ('orderBy' in args && (0, _utils.isDefined)(args.orderBy) && !(0, _utils.isEmptyObject)(args.orderBy) && !(0, _classvalidator.isArray)(args.orderBy) && !(0, _classvalidator.isObject)(args.orderBy)) {
        throw new _graphqldirectexecutionexception.GraphqlDirectExecutionException('Invalid argument: "orderBy" must be an array', _graphqldirectexecutionexception.GraphqlDirectExecutionExceptionCode.INVALID_QUERY_INPUT, {
            userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
        });
    }
    if ('before' in args && (0, _utils.isDefined)(args.before) && !(0, _classvalidator.isString)(args.before)) {
        throw new _graphqldirectexecutionexception.GraphqlDirectExecutionException('Invalid argument: "before" must be a string', _graphqldirectexecutionexception.GraphqlDirectExecutionExceptionCode.INVALID_QUERY_INPUT, {
            userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
        });
    }
    if ('after' in args && (0, _utils.isDefined)(args.after) && !(0, _classvalidator.isString)(args.after)) {
        throw new _graphqldirectexecutionexception.GraphqlDirectExecutionException('Invalid argument: "after" must be a string', _graphqldirectexecutionexception.GraphqlDirectExecutionExceptionCode.INVALID_QUERY_INPUT, {
            userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
        });
    }
    if ('offset' in args && (0, _utils.isDefined)(args.offset) && !(0, _classvalidator.isNumber)(args.offset)) {
        throw new _graphqldirectexecutionexception.GraphqlDirectExecutionException('Invalid argument: "offset" must be a number', _graphqldirectexecutionexception.GraphqlDirectExecutionExceptionCode.INVALID_QUERY_INPUT, {
            userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
        });
    }
}

//# sourceMappingURL=assert-find-many-args.util.js.map
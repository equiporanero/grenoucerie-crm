"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "assertGroupByArgs", {
    enumerable: true,
    get: function() {
        return assertGroupByArgs;
    }
});
const _classvalidator = require("class-validator");
const _utils = require("twenty-shared/utils");
const _standarderrormessageconstant = require("../../../common/common-query-runners/errors/standard-error-message.constant");
const _graphqldirectexecutionexception = require("../errors/graphql-direct-execution.exception");
function assertGroupByArgs(args) {
    if (!(0, _classvalidator.isObject)(args)) {
        throw new _graphqldirectexecutionexception.GraphqlDirectExecutionException('Invalid argument: it must be an object', _graphqldirectexecutionexception.GraphqlDirectExecutionExceptionCode.INVALID_QUERY_INPUT, {
            userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
        });
    }
    const argKeys = Object.keys(args);
    const allowedKeys = new Set([
        'filter',
        'orderBy',
        'orderByForRecords',
        'groupBy',
        'viewId',
        'includeRecords',
        'limit',
        'offsetForRecords'
    ]);
    for (const key of argKeys){
        if (!allowedKeys.has(key)) {
            throw new _graphqldirectexecutionexception.GraphqlDirectExecutionException(`Argument not allowed: ${key}`, _graphqldirectexecutionexception.GraphqlDirectExecutionExceptionCode.INVALID_QUERY_INPUT, {
                userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
            });
        }
    }
    if (!('groupBy' in args) || !Array.isArray(args.groupBy) && !(0, _classvalidator.isObject)(args.groupBy)) {
        throw new _graphqldirectexecutionexception.GraphqlDirectExecutionException('Missing required argument: "groupBy" must be an array.', _graphqldirectexecutionexception.GraphqlDirectExecutionExceptionCode.INVALID_QUERY_INPUT, {
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
    if ('orderByForRecords' in args && (0, _utils.isDefined)(args.orderByForRecords) && !(0, _utils.isEmptyObject)(args.orderByForRecords) && !(0, _classvalidator.isArray)(args.orderByForRecords) && !(0, _classvalidator.isObject)(args.orderByForRecords)) {
        throw new _graphqldirectexecutionexception.GraphqlDirectExecutionException('Invalid argument: "orderByForRecords" must be an array', _graphqldirectexecutionexception.GraphqlDirectExecutionExceptionCode.INVALID_QUERY_INPUT, {
            userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
        });
    }
    if ('viewId' in args && (0, _utils.isDefined)(args.viewId) && !(0, _classvalidator.isString)(args.viewId)) {
        throw new _graphqldirectexecutionexception.GraphqlDirectExecutionException('Invalid argument: "viewId" must be a string', _graphqldirectexecutionexception.GraphqlDirectExecutionExceptionCode.INVALID_QUERY_INPUT, {
            userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
        });
    }
    if ('includeRecords' in args && (0, _utils.isDefined)(args.includeRecords) && !(0, _classvalidator.isBoolean)(args.includeRecords)) {
        throw new _graphqldirectexecutionexception.GraphqlDirectExecutionException('Invalid argument: "includeRecords" must be a boolean', _graphqldirectexecutionexception.GraphqlDirectExecutionExceptionCode.INVALID_QUERY_INPUT, {
            userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
        });
    }
    if ('limit' in args && (0, _utils.isDefined)(args.limit) && !(0, _classvalidator.isNumber)(args.limit)) {
        throw new _graphqldirectexecutionexception.GraphqlDirectExecutionException('Invalid argument: "limit" must be a number', _graphqldirectexecutionexception.GraphqlDirectExecutionExceptionCode.INVALID_QUERY_INPUT, {
            userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
        });
    }
    if ('offsetForRecords' in args && (0, _utils.isDefined)(args.offsetForRecords) && !(0, _classvalidator.isNumber)(args.offsetForRecords)) {
        throw new _graphqldirectexecutionexception.GraphqlDirectExecutionException('Invalid argument: "offsetForRecords" must be a number', _graphqldirectexecutionexception.GraphqlDirectExecutionExceptionCode.INVALID_QUERY_INPUT, {
            userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
        });
    }
}

//# sourceMappingURL=assert-group-by-args.util.js.map
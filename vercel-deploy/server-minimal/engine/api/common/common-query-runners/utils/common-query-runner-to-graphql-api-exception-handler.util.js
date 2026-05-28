"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "commonQueryRunnerToGraphqlApiExceptionHandler", {
    enumerable: true,
    get: function() {
        return commonQueryRunnerToGraphqlApiExceptionHandler;
    }
});
const _utils = require("twenty-shared/utils");
const _commonqueryrunnerexception = require("../errors/common-query-runner.exception");
const _graphqlerrorsutil = require("../../../../core-modules/graphql/utils/graphql-errors.util");
const commonQueryRunnerToGraphqlApiExceptionHandler = (error)=>{
    switch(error.code){
        case _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.RECORD_NOT_FOUND:
            throw new _graphqlerrorsutil.NotFoundError(error);
        case _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.ARGS_CONFLICT:
        case _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_ARGS_FIRST:
        case _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_ARGS_LAST:
        case _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_QUERY_INPUT:
        case _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_ARGS_DATA:
        case _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_ARGS_FILTER:
        case _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.UPSERT_MULTIPLE_MATCHING_RECORDS_CONFLICT:
        case _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_CURSOR:
        case _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.TOO_MANY_RECORDS_TO_UPDATE:
        case _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.BAD_REQUEST:
        case _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.TOO_COMPLEX_QUERY:
        case _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.MISSING_TIMEZONE_FOR_DATE_GROUP_BY:
        case _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_TIMEZONE:
            throw new _graphqlerrorsutil.UserInputError(error);
        case _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_AUTH_CONTEXT:
            throw new _graphqlerrorsutil.AuthenticationError(error);
        case _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.MISSING_SYSTEM_FIELD:
        case _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INTERNAL_SERVER_ERROR:
            throw new _graphqlerrorsutil.InternalServerError(error);
        default:
            {
                return (0, _utils.assertUnreachable)(error.code);
            }
    }
};

//# sourceMappingURL=common-query-runner-to-graphql-api-exception-handler.util.js.map
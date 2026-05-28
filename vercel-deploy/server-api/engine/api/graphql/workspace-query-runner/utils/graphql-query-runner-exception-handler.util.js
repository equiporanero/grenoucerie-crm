"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "graphqlQueryRunnerExceptionHandler", {
    enumerable: true,
    get: function() {
        return graphqlQueryRunnerExceptionHandler;
    }
});
const _utils = require("twenty-shared/utils");
const _graphqlqueryrunnerexception = require("../../graphql-query-runner/errors/graphql-query-runner.exception");
const _graphqlerrorsutil = require("../../../../core-modules/graphql/utils/graphql-errors.util");
const graphqlQueryRunnerExceptionHandler = (error)=>{
    switch(error.code){
        case _graphqlqueryrunnerexception.GraphqlQueryRunnerExceptionCode.INVALID_ARGS_FIRST:
        case _graphqlqueryrunnerexception.GraphqlQueryRunnerExceptionCode.INVALID_ARGS_LAST:
        case _graphqlqueryrunnerexception.GraphqlQueryRunnerExceptionCode.OBJECT_METADATA_NOT_FOUND:
        case _graphqlqueryrunnerexception.GraphqlQueryRunnerExceptionCode.MAX_DEPTH_REACHED:
        case _graphqlqueryrunnerexception.GraphqlQueryRunnerExceptionCode.INVALID_CURSOR:
        case _graphqlqueryrunnerexception.GraphqlQueryRunnerExceptionCode.INVALID_DIRECTION:
        case _graphqlqueryrunnerexception.GraphqlQueryRunnerExceptionCode.UNSUPPORTED_OPERATOR:
        case _graphqlqueryrunnerexception.GraphqlQueryRunnerExceptionCode.ARGS_CONFLICT:
        case _graphqlqueryrunnerexception.GraphqlQueryRunnerExceptionCode.FIELD_NOT_FOUND:
        case _graphqlqueryrunnerexception.GraphqlQueryRunnerExceptionCode.INVALID_QUERY_INPUT:
        case _graphqlqueryrunnerexception.GraphqlQueryRunnerExceptionCode.NOT_IMPLEMENTED:
        case _graphqlqueryrunnerexception.GraphqlQueryRunnerExceptionCode.UPSERT_MULTIPLE_MATCHING_RECORDS_CONFLICT:
        case _graphqlqueryrunnerexception.GraphqlQueryRunnerExceptionCode.UPSERT_MAX_RECORDS_EXCEEDED:
            throw new _graphqlerrorsutil.UserInputError(error);
        case _graphqlqueryrunnerexception.GraphqlQueryRunnerExceptionCode.RECORD_NOT_FOUND:
            throw new _graphqlerrorsutil.NotFoundError(error);
        case _graphqlqueryrunnerexception.GraphqlQueryRunnerExceptionCode.RELATION_SETTINGS_NOT_FOUND:
        case _graphqlqueryrunnerexception.GraphqlQueryRunnerExceptionCode.RELATION_TARGET_OBJECT_METADATA_NOT_FOUND:
        case _graphqlqueryrunnerexception.GraphqlQueryRunnerExceptionCode.INVALID_POST_HOOK_PAYLOAD:
        case _graphqlqueryrunnerexception.GraphqlQueryRunnerExceptionCode.MISSING_SYSTEM_FIELD:
            throw error;
        default:
            {
                return (0, _utils.assertUnreachable)(error.code);
            }
    }
};

//# sourceMappingURL=graphql-query-runner-exception-handler.util.js.map
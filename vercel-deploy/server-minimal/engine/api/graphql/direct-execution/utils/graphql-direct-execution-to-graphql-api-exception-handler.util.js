"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "graphqlDirectExecutionToGraphqlApiExceptionHandler", {
    enumerable: true,
    get: function() {
        return graphqlDirectExecutionToGraphqlApiExceptionHandler;
    }
});
const _utils = require("twenty-shared/utils");
const _graphqldirectexecutionexception = require("../errors/graphql-direct-execution.exception");
const _graphqlerrorsutil = require("../../../../core-modules/graphql/utils/graphql-errors.util");
const graphqlDirectExecutionToGraphqlApiExceptionHandler = (error)=>{
    switch(error.code){
        case _graphqldirectexecutionexception.GraphqlDirectExecutionExceptionCode.INVALID_QUERY_INPUT:
            throw new _graphqlerrorsutil.UserInputError(error);
        case _graphqldirectexecutionexception.GraphqlDirectExecutionExceptionCode.INVALID_RESULT_TYPE:
        case _graphqldirectexecutionexception.GraphqlDirectExecutionExceptionCode.UNKNOWN_METHOD:
            throw new _graphqlerrorsutil.InternalServerError(error);
        default:
            {
                return (0, _utils.assertUnreachable)(error.code);
            }
    }
};

//# sourceMappingURL=graphql-direct-execution-to-graphql-api-exception-handler.util.js.map
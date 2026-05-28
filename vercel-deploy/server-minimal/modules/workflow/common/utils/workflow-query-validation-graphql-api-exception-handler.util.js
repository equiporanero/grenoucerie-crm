"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "workflowQueryValidationGraphqlApiExceptionHandler", {
    enumerable: true,
    get: function() {
        return workflowQueryValidationGraphqlApiExceptionHandler;
    }
});
const _utils = require("twenty-shared/utils");
const _graphqlerrorsutil = require("../../../../engine/core-modules/graphql/utils/graphql-errors.util");
const _workflowqueryvalidationexception = require("../exceptions/workflow-query-validation.exception");
const workflowQueryValidationGraphqlApiExceptionHandler = (exception)=>{
    switch(exception.code){
        case _workflowqueryvalidationexception.WorkflowQueryValidationExceptionCode.FORBIDDEN:
            throw new _graphqlerrorsutil.ForbiddenError(exception);
        default:
            {
                (0, _utils.assertUnreachable)(exception.code);
            }
    }
};

//# sourceMappingURL=workflow-query-validation-graphql-api-exception-handler.util.js.map
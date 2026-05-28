"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "workspaceQueryRunnerGraphqlApiExceptionHandler", {
    enumerable: true,
    get: function() {
        return workspaceQueryRunnerGraphqlApiExceptionHandler;
    }
});
const _commonqueryrunnerexception = require("../../../common/common-query-runners/errors/common-query-runner.exception");
const _commonqueryrunnertographqlapiexceptionhandlerutil = require("../../../common/common-query-runners/utils/common-query-runner-to-graphql-api-exception-handler.util");
const _graphqldirectexecutionexception = require("../../direct-execution/errors/graphql-direct-execution.exception");
const _graphqldirectexecutiontographqlapiexceptionhandlerutil = require("../../direct-execution/utils/graphql-direct-execution-to-graphql-api-exception-handler.util");
const _graphqlqueryrunnerexception = require("../../graphql-query-runner/errors/graphql-query-runner.exception");
const _graphqlqueryrunnerexceptionhandlerutil = require("./graphql-query-runner-exception-handler.util");
const _workspaceexceptionhandlerutil = require("./workspace-exception-handler.util");
const _workspacequeryrunnerexception = require("../workspace-query-runner.exception");
const _apikeyexception = require("../../../../core-modules/api-key/exceptions/api-key.exception");
const _apikeygraphqlapiexceptionhandlerutil = require("../../../../core-modules/api-key/utils/api-key-graphql-api-exception-handler.util");
const _authexception = require("../../../../core-modules/auth/auth.exception");
const _authgraphqlapiexceptionhandlerutil = require("../../../../core-modules/auth/utils/auth-graphql-api-exception-handler.util");
const _recordtransformerexception = require("../../../../core-modules/record-transformer/record-transformer.exception");
const _recordtransformergraphqlapiexceptionhandlerutil = require("../../../../core-modules/record-transformer/utils/record-transformer-graphql-api-exception-handler.util");
const _throttlerexception = require("../../../../core-modules/throttler/throttler.exception");
const _throttlertographqlapiexceptionhandlerutil = require("../../../../core-modules/throttler/utils/throttler-to-graphql-api-exception-handler.util");
const _permissionsexception = require("../../../../metadata-modules/permissions/permissions.exception");
const _permissiongraphqlapiexceptionhandlerutil = require("../../../../metadata-modules/permissions/utils/permission-graphql-api-exception-handler.util");
const _twentyormexception = require("../../../../twenty-orm/exceptions/twenty-orm.exception");
const _twentyormgraphqlapiexceptionhandlerutil = require("../../../../twenty-orm/utils/twenty-orm-graphql-api-exception-handler.util");
const _workflowqueryvalidationexception = require("../../../../../modules/workflow/common/exceptions/workflow-query-validation.exception");
const _workflowqueryvalidationgraphqlapiexceptionhandlerutil = require("../../../../../modules/workflow/common/utils/workflow-query-validation-graphql-api-exception-handler.util");
const workspaceQueryRunnerGraphqlApiExceptionHandler = (error)=>{
    switch(true){
        case error instanceof _recordtransformerexception.RecordTransformerException:
            return (0, _recordtransformergraphqlapiexceptionhandlerutil.recordTransformerGraphqlApiExceptionHandler)(error);
        case error instanceof _permissionsexception.PermissionsException:
            return (0, _permissiongraphqlapiexceptionhandlerutil.permissionGraphqlApiExceptionHandler)(error);
        case error instanceof _workspacequeryrunnerexception.WorkspaceQueryRunnerException:
            return (0, _workspaceexceptionhandlerutil.workspaceExceptionHandler)(error);
        case error instanceof _graphqlqueryrunnerexception.GraphqlQueryRunnerException:
            return (0, _graphqlqueryrunnerexceptionhandlerutil.graphqlQueryRunnerExceptionHandler)(error);
        case error instanceof _twentyormexception.TwentyORMException:
            return (0, _twentyormgraphqlapiexceptionhandlerutil.twentyORMGraphqlApiExceptionHandler)(error);
        case error instanceof _commonqueryrunnerexception.CommonQueryRunnerException:
            return (0, _commonqueryrunnertographqlapiexceptionhandlerutil.commonQueryRunnerToGraphqlApiExceptionHandler)(error);
        case error instanceof _authexception.AuthException:
            return (0, _authgraphqlapiexceptionhandlerutil.authGraphqlApiExceptionHandler)(error);
        case error instanceof _apikeyexception.ApiKeyException:
            return (0, _apikeygraphqlapiexceptionhandlerutil.apiKeyGraphqlApiExceptionHandler)(error);
        case error instanceof _throttlerexception.ThrottlerException:
            return (0, _throttlertographqlapiexceptionhandlerutil.throttlerToGraphqlApiExceptionHandler)(error);
        case error instanceof _graphqldirectexecutionexception.GraphqlDirectExecutionException:
            return (0, _graphqldirectexecutiontographqlapiexceptionhandlerutil.graphqlDirectExecutionToGraphqlApiExceptionHandler)(error);
        case error instanceof _workflowqueryvalidationexception.WorkflowQueryValidationException:
            return (0, _workflowqueryvalidationgraphqlapiexceptionhandlerutil.workflowQueryValidationGraphqlApiExceptionHandler)(error);
        default:
            throw error;
    }
};

//# sourceMappingURL=workspace-query-runner-graphql-api-exception-handler.util.js.map
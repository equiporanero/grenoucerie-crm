"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "workspaceMigrationRunnerExceptionFormatter", {
    enumerable: true,
    get: function() {
        return workspaceMigrationRunnerExceptionFormatter;
    }
});
const _graphqlerrorsutil = require("../../../core-modules/graphql/utils/graphql-errors.util");
const _workspacemigrationrunnerexception = require("../workspace-migration-runner/exceptions/workspace-migration-runner.exception");
const workspaceMigrationRunnerExceptionFormatter = (error)=>{
    const isExecutionFailed = error.code === _workspacemigrationrunnerexception.WorkspaceMigrationRunnerExceptionCode.EXECUTION_FAILED;
    throw new _graphqlerrorsutil.BaseGraphQLError(error.message, isExecutionFailed ? _graphqlerrorsutil.ErrorCode.APPLICATION_INSTALLATION_FAILED : _graphqlerrorsutil.ErrorCode.INTERNAL_SERVER_ERROR, {
        code: error.code,
        ...isExecutionFailed && {
            action: error.action,
            errors: {
                ...error.errors?.actionTranspilation && {
                    actionTranspilation: {
                        message: error.errors.actionTranspilation.message,
                        code: error.errors.actionTranspilation?.code ?? 'INTERNAL_SERVER_ERROR'
                    }
                },
                ...error.errors?.metadata && {
                    metadata: {
                        message: error.errors.metadata.message,
                        code: error.errors.metadata?.code ?? 'INTERNAL_SERVER_ERROR'
                    }
                },
                ...error.errors?.workspaceSchema && {
                    workspaceSchema: {
                        message: error.errors.workspaceSchema.message,
                        code: error.errors.workspaceSchema?.code ?? 'INTERNAL_SERVER_ERROR'
                    }
                }
            }
        },
        userFriendlyMessage: error.userFriendlyMessage
    });
};

//# sourceMappingURL=workspace-migration-runner-exception-formatter.js.map
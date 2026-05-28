"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "formatUpgradeErrorForStorage", {
    enumerable: true,
    get: function() {
        return formatUpgradeErrorForStorage;
    }
});
const _utils = require("twenty-shared/utils");
const _typeorm = require("typeorm");
const _workspacemigrationbuilderexception = require("../../../workspace-manager/workspace-migration/exceptions/workspace-migration-builder-exception");
const _workspacemigrationrunnerexception = require("../../../workspace-manager/workspace-migration/workspace-migration-runner/exceptions/workspace-migration-runner.exception");
const MAX_ERROR_MESSAGE_LENGTH = 10_000;
const formatStack = (stack)=>{
    return (stack ?? '').split('\n').slice(1).join('\n');
};
const joinParts = (parts)=>{
    const joined = parts.filter(Boolean).join('\n');
    if (joined.length <= MAX_ERROR_MESSAGE_LENGTH) {
        return joined;
    }
    return joined.slice(0, MAX_ERROR_MESSAGE_LENGTH) + '\n[truncated]';
};
const buildErrorParts = (error)=>{
    if (error instanceof _typeorm.QueryFailedError) {
        const driverError = error.driverError;
        return [
            `[QueryFailedError] ${error.message}`,
            driverError?.code ? `PostgreSQL code: ${driverError.code}` : null,
            driverError?.detail ? `Detail: ${driverError.detail}` : null,
            `Query: ${error.query}`,
            formatStack(error.stack)
        ];
    }
    if (error instanceof _workspacemigrationrunnerexception.WorkspaceMigrationRunnerException) {
        return [
            `[WorkspaceMigrationRunnerException] ${error.message}`,
            `Code: ${error.code}`,
            error.action ? `Action: ${error.action.type} on ${error.action.metadataName}` : null,
            error.errors?.metadata ? `Metadata error: ${error.errors.metadata.message}` : null,
            error.errors?.workspaceSchema ? `Schema error: ${error.errors.workspaceSchema.message}` : null,
            error.errors?.actionTranspilation ? `Transpilation error: ${error.errors.actionTranspilation.message}` : null,
            formatStack(error.stack)
        ];
    }
    if (error instanceof _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException) {
        return [
            `[WorkspaceMigrationBuilderException] ${error.message}`,
            `Report: ${JSON.stringify(error.failedWorkspaceMigrationBuildResult.report, null, 2)}`,
            formatStack(error.stack)
        ];
    }
    if (error instanceof _utils.CustomError) {
        return [
            `[CustomError] ${error.message}`,
            error.code ? `Code: ${error.code}` : null,
            formatStack(error.stack)
        ];
    }
    if (error instanceof Error) {
        return [
            `[Error] ${error.message}`,
            formatStack(error.stack)
        ];
    }
    return [
        String(error)
    ];
};
const formatUpgradeErrorForStorage = (error)=>{
    return joinParts(buildErrorParts(error));
};

//# sourceMappingURL=format-upgrade-error-for-storage.util.js.map
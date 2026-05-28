"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "workspaceGraphqlApiExceptionHandler", {
    enumerable: true,
    get: function() {
        return workspaceGraphqlApiExceptionHandler;
    }
});
const _utils = require("twenty-shared/utils");
const _graphqlerrorsutil = require("../../graphql/utils/graphql-errors.util");
const _workspaceexception = require("../workspace.exception");
const workspaceGraphqlApiExceptionHandler = (error)=>{
    if (error instanceof _workspaceexception.WorkspaceException) {
        switch(error.code){
            case _workspaceexception.WorkspaceExceptionCode.SUBDOMAIN_NOT_FOUND:
            case _workspaceexception.WorkspaceExceptionCode.WORKSPACE_NOT_FOUND:
            case _workspaceexception.WorkspaceExceptionCode.CUSTOM_DOMAIN_NOT_FOUND:
                throw new _graphqlerrorsutil.NotFoundError(error);
            case _workspaceexception.WorkspaceExceptionCode.DOMAIN_ALREADY_TAKEN:
            case _workspaceexception.WorkspaceExceptionCode.SUBDOMAIN_ALREADY_TAKEN:
            case _workspaceexception.WorkspaceExceptionCode.SUBDOMAIN_NOT_VALID:
                throw new _graphqlerrorsutil.ConflictError(error);
            case _workspaceexception.WorkspaceExceptionCode.ENVIRONMENT_VAR_NOT_ENABLED:
            case _workspaceexception.WorkspaceExceptionCode.WORKSPACE_CUSTOM_DOMAIN_DISABLED:
                throw new _graphqlerrorsutil.ForbiddenError(error);
            default:
                {
                    return (0, _utils.assertUnreachable)(error.code);
                }
        }
    }
    throw error;
};

//# sourceMappingURL=workspace-graphql-api-exception-handler.util.js.map
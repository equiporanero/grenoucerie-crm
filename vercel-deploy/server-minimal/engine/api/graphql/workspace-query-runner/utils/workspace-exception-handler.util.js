"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "workspaceExceptionHandler", {
    enumerable: true,
    get: function() {
        return workspaceExceptionHandler;
    }
});
const _utils = require("twenty-shared/utils");
const _workspacequeryrunnerexception = require("../workspace-query-runner.exception");
const _graphqlerrorsutil = require("../../../../core-modules/graphql/utils/graphql-errors.util");
const workspaceExceptionHandler = (error)=>{
    switch(error.code){
        case _workspacequeryrunnerexception.WorkspaceQueryRunnerExceptionCode.DATA_NOT_FOUND:
            throw new _graphqlerrorsutil.NotFoundError(error);
        case _workspacequeryrunnerexception.WorkspaceQueryRunnerExceptionCode.INVALID_QUERY_INPUT:
            throw new _graphqlerrorsutil.UserInputError(error);
        case _workspacequeryrunnerexception.WorkspaceQueryRunnerExceptionCode.QUERY_VIOLATES_UNIQUE_CONSTRAINT:
        case _workspacequeryrunnerexception.WorkspaceQueryRunnerExceptionCode.QUERY_VIOLATES_FOREIGN_KEY_CONSTRAINT:
        case _workspacequeryrunnerexception.WorkspaceQueryRunnerExceptionCode.TOO_MANY_ROWS_AFFECTED:
        case _workspacequeryrunnerexception.WorkspaceQueryRunnerExceptionCode.NO_ROWS_AFFECTED:
            throw new _graphqlerrorsutil.ForbiddenError(error);
        case _workspacequeryrunnerexception.WorkspaceQueryRunnerExceptionCode.QUERY_TIMEOUT:
            throw new _graphqlerrorsutil.TimeoutError(error);
        case _workspacequeryrunnerexception.WorkspaceQueryRunnerExceptionCode.INTERNAL_SERVER_ERROR:
            throw error;
        default:
            {
                return (0, _utils.assertUnreachable)(error.code);
            }
    }
};

//# sourceMappingURL=workspace-exception-handler.util.js.map
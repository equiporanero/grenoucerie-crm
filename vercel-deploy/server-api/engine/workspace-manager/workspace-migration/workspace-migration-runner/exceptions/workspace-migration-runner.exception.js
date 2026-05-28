"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get WorkspaceMigrationRunnerException () {
        return WorkspaceMigrationRunnerException;
    },
    get WorkspaceMigrationRunnerExceptionCode () {
        return WorkspaceMigrationRunnerExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const WorkspaceMigrationRunnerExceptionCode = {
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
    EXECUTION_FAILED: 'EXECUTION_FAILED',
    APPLICATION_NOT_FOUND: 'APPLICATION_NOT_FOUND',
    DDL_LOCKED: 'DDL_LOCKED'
};
const getWorkspaceMigrationRunnerExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case WorkspaceMigrationRunnerExceptionCode.INTERNAL_SERVER_ERROR:
            return /*i18n*/ {
                id: "W5A0Ly",
                message: "An unexpected error occurred."
            };
        case WorkspaceMigrationRunnerExceptionCode.EXECUTION_FAILED:
            return /*i18n*/ {
                id: "oqzqZq",
                message: "Migration execution failed."
            };
        case WorkspaceMigrationRunnerExceptionCode.APPLICATION_NOT_FOUND:
            return /*i18n*/ {
                id: "ltvmAF",
                message: "Application not found."
            };
        case WorkspaceMigrationRunnerExceptionCode.DDL_LOCKED:
            return /*i18n*/ {
                id: "osscRx",
                message: "Workspace schema changes are temporarily locked."
            };
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
const { // oxlint-disable-next-line unused-imports/no-unused-vars
EXECUTION_FAILED: WorkspaceMigrationRunnerExceptionExecutionFailedCode, // oxlint-disable-next-line unused-imports/no-unused-vars
...WorkspaceMigrationRunnerExceptionCodeOtherCode } = WorkspaceMigrationRunnerExceptionCode;
let WorkspaceMigrationRunnerException = class WorkspaceMigrationRunnerException extends _utils.CustomError {
    constructor(args){
        if (args.code === WorkspaceMigrationRunnerExceptionCode.EXECUTION_FAILED) {
            super(`Migration action '${args.action.type}' for '${args.action.metadataName}' failed`);
            this.code = args.code;
            this.action = args.action;
            this.errors = args.errors;
        } else {
            super(args.message);
            this.code = args.code;
        }
        this.userFriendlyMessage = args.userFriendlyMessage ?? getWorkspaceMigrationRunnerExceptionUserFriendlyMessage(args.code);
    }
};

//# sourceMappingURL=workspace-migration-runner.exception.js.map
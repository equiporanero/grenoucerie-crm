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
    get WorkspaceMigrationActionExecutionException () {
        return WorkspaceMigrationActionExecutionException;
    },
    get WorkspaceMigrationActionExecutionExceptionCode () {
        return WorkspaceMigrationActionExecutionExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const WorkspaceMigrationActionExecutionExceptionCode = {
    FIELD_METADATA_NOT_FOUND: 'FIELD_METADATA_NOT_FOUND',
    OBJECT_METADATA_NOT_FOUND: 'OBJECT_METADATA_NOT_FOUND',
    ENUM_OPERATION_FAILED: 'ENUM_OPERATION_FAILED',
    UNSUPPORTED_COMPOSITE_COLUMN_TYPE: 'UNSUPPORTED_COMPOSITE_COLUMN_TYPE',
    NOT_SUPPORTED: 'NOT_SUPPORTED',
    INVALID_ACTION_TYPE: 'INVALID_ACTION_TYPE',
    FLAT_ENTITY_NOT_FOUND: 'FLAT_ENTITY_NOT_FOUND',
    UNSUPPORTED_FIELD_METADATA_TYPE: 'UNSUPPORTED_FIELD_METADATA_TYPE',
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR'
};
const getWorkspaceMigrationActionExecutionExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case WorkspaceMigrationActionExecutionExceptionCode.FIELD_METADATA_NOT_FOUND:
            return /*i18n*/ {
                id: "JrAl/I",
                message: "Field metadata not found."
            };
        case WorkspaceMigrationActionExecutionExceptionCode.OBJECT_METADATA_NOT_FOUND:
            return /*i18n*/ {
                id: "rHce90",
                message: "Object metadata not found."
            };
        case WorkspaceMigrationActionExecutionExceptionCode.ENUM_OPERATION_FAILED:
            return /*i18n*/ {
                id: "jxgcg/",
                message: "Enum operation failed."
            };
        case WorkspaceMigrationActionExecutionExceptionCode.UNSUPPORTED_COMPOSITE_COLUMN_TYPE:
            return /*i18n*/ {
                id: "Md/2jb",
                message: "Unsupported composite column type."
            };
        case WorkspaceMigrationActionExecutionExceptionCode.NOT_SUPPORTED:
            return /*i18n*/ {
                id: "bEhTPN",
                message: "This operation is not supported."
            };
        case WorkspaceMigrationActionExecutionExceptionCode.INVALID_ACTION_TYPE:
            return /*i18n*/ {
                id: "pSjWxS",
                message: "Invalid action type."
            };
        case WorkspaceMigrationActionExecutionExceptionCode.FLAT_ENTITY_NOT_FOUND:
            return /*i18n*/ {
                id: "qpXqpa",
                message: "Entity not found."
            };
        case WorkspaceMigrationActionExecutionExceptionCode.UNSUPPORTED_FIELD_METADATA_TYPE:
            return /*i18n*/ {
                id: "B4Eu7x",
                message: "Unsupported field metadata type."
            };
        case WorkspaceMigrationActionExecutionExceptionCode.INTERNAL_SERVER_ERROR:
            return /*i18n*/ {
                id: "W5A0Ly",
                message: "An unexpected error occurred."
            };
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let WorkspaceMigrationActionExecutionException = class WorkspaceMigrationActionExecutionException extends _utils.CustomError {
    constructor({ message, code, userFriendlyMessage }){
        super(message);
        this.code = code;
        this.userFriendlyMessage = userFriendlyMessage ?? getWorkspaceMigrationActionExecutionExceptionUserFriendlyMessage(code);
    }
};

//# sourceMappingURL=workspace-migration-action-execution.exception.js.map
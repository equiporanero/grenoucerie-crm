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
    get WorkspaceQueryRunnerException () {
        return WorkspaceQueryRunnerException;
    },
    get WorkspaceQueryRunnerExceptionCode () {
        return WorkspaceQueryRunnerExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const _standarderrormessageconstant = require("../../common/common-query-runners/errors/standard-error-message.constant");
const _customexception = require("../../../../utils/custom-exception");
const WorkspaceQueryRunnerExceptionCode = (0, _customexception.appendCommonExceptionCode)({
    INVALID_QUERY_INPUT: 'INVALID_QUERY_INPUT',
    DATA_NOT_FOUND: 'DATA_NOT_FOUND',
    QUERY_TIMEOUT: 'QUERY_TIMEOUT',
    QUERY_VIOLATES_UNIQUE_CONSTRAINT: 'QUERY_VIOLATES_UNIQUE_CONSTRAINT',
    QUERY_VIOLATES_FOREIGN_KEY_CONSTRAINT: 'QUERY_VIOLATES_FOREIGN_KEY_CONSTRAINT',
    TOO_MANY_ROWS_AFFECTED: 'TOO_MANY_ROWS_AFFECTED',
    NO_ROWS_AFFECTED: 'NO_ROWS_AFFECTED'
});
const getWorkspaceQueryRunnerExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case WorkspaceQueryRunnerExceptionCode.QUERY_VIOLATES_UNIQUE_CONSTRAINT:
            return /*i18n*/ {
                id: "j7gCou",
                message: "A record with this value already exists."
            };
        case WorkspaceQueryRunnerExceptionCode.QUERY_VIOLATES_FOREIGN_KEY_CONSTRAINT:
            return /*i18n*/ {
                id: "6kqLHf",
                message: "Cannot complete operation due to related records."
            };
        case WorkspaceQueryRunnerExceptionCode.TOO_MANY_ROWS_AFFECTED:
            return /*i18n*/ {
                id: "MYdvBz",
                message: "Too many records affected."
            };
        case WorkspaceQueryRunnerExceptionCode.NO_ROWS_AFFECTED:
            return /*i18n*/ {
                id: "NcwTz7",
                message: "No records were affected."
            };
        case WorkspaceQueryRunnerExceptionCode.QUERY_TIMEOUT:
        case WorkspaceQueryRunnerExceptionCode.DATA_NOT_FOUND:
        case WorkspaceQueryRunnerExceptionCode.INVALID_QUERY_INPUT:
        case WorkspaceQueryRunnerExceptionCode.INTERNAL_SERVER_ERROR:
            return _standarderrormessageconstant.STANDARD_ERROR_MESSAGE;
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let WorkspaceQueryRunnerException = class WorkspaceQueryRunnerException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getWorkspaceQueryRunnerExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=workspace-query-runner.exception.js.map
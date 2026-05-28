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
    get WorkspaceSchemaManagerException () {
        return WorkspaceSchemaManagerException;
    },
    get WorkspaceSchemaManagerExceptionCode () {
        return WorkspaceSchemaManagerExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const _standarderrormessageconstant = require("../../../api/common/common-query-runners/errors/standard-error-message.constant");
const _customexception = require("../../../../utils/custom-exception");
const WorkspaceSchemaManagerExceptionCode = (0, _customexception.appendCommonExceptionCode)({
    ENUM_OPERATION_FAILED: 'ENUM_OPERATION_FAILED',
    CONCURRENT_INDEX_CREATION_IN_TRANSACTION: 'CONCURRENT_INDEX_CREATION_IN_TRANSACTION'
});
const getWorkspaceSchemaManagerExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case WorkspaceSchemaManagerExceptionCode.CONCURRENT_INDEX_CREATION_IN_TRANSACTION:
            return /*i18n*/ {
                id: "s+lEnL",
                message: "Could not create the index because it must run outside a database transaction."
            };
        case WorkspaceSchemaManagerExceptionCode.ENUM_OPERATION_FAILED:
        case WorkspaceSchemaManagerExceptionCode.INTERNAL_SERVER_ERROR:
            return _standarderrormessageconstant.STANDARD_ERROR_MESSAGE;
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let WorkspaceSchemaManagerException = class WorkspaceSchemaManagerException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getWorkspaceSchemaManagerExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=workspace-schema-manager.exception.js.map
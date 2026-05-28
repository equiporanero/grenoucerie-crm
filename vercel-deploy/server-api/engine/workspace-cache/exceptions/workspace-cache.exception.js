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
    get WorkspaceCacheException () {
        return WorkspaceCacheException;
    },
    get WorkspaceCacheExceptionCode () {
        return WorkspaceCacheExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const _customexception = require("../../../utils/custom-exception");
const WorkspaceCacheExceptionCode = (0, _customexception.appendCommonExceptionCode)({
    MISSING_DECORATOR: 'MISSING_DECORATOR',
    INVALID_PARAMETERS: 'INVALID_PARAMETERS'
});
const getWorkspaceCacheExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case WorkspaceCacheExceptionCode.MISSING_DECORATOR:
            return /*i18n*/ {
                id: "lCnasH",
                message: "Missing decorator configuration."
            };
        case WorkspaceCacheExceptionCode.INVALID_PARAMETERS:
            return /*i18n*/ {
                id: "HiaWGB",
                message: "Invalid parameters provided."
            };
        case WorkspaceCacheExceptionCode.INTERNAL_SERVER_ERROR:
            return /*i18n*/ {
                id: "W5A0Ly",
                message: "An unexpected error occurred."
            };
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let WorkspaceCacheException = class WorkspaceCacheException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getWorkspaceCacheExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=workspace-cache.exception.js.map
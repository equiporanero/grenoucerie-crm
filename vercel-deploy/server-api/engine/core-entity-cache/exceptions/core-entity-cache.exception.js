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
    get CoreEntityCacheException () {
        return CoreEntityCacheException;
    },
    get CoreEntityCacheExceptionCode () {
        return CoreEntityCacheExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const _customexception = require("../../../utils/custom-exception");
const CoreEntityCacheExceptionCode = (0, _customexception.appendCommonExceptionCode)({
    INVALID_PARAMETERS: 'INVALID_PARAMETERS'
});
const getCoreEntityCacheExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case CoreEntityCacheExceptionCode.INVALID_PARAMETERS:
            return /*i18n*/ {
                id: "HiaWGB",
                message: "Invalid parameters provided."
            };
        case CoreEntityCacheExceptionCode.INTERNAL_SERVER_ERROR:
            return /*i18n*/ {
                id: "W5A0Ly",
                message: "An unexpected error occurred."
            };
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let CoreEntityCacheException = class CoreEntityCacheException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getCoreEntityCacheExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=core-entity-cache.exception.js.map
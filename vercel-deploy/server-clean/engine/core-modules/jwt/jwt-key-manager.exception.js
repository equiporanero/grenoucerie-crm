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
    get JwtKeyManagerException () {
        return JwtKeyManagerException;
    },
    get JwtKeyManagerExceptionCode () {
        return JwtKeyManagerExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const _standarderrormessageconstant = require("../../api/common/common-query-runners/errors/standard-error-message.constant");
const _customexception = require("../../../utils/custom-exception");
const JwtKeyManagerExceptionCode = (0, _customexception.appendCommonExceptionCode)({
    INVALID_PRIVATE_KEY: 'INVALID_PRIVATE_KEY',
    SIGNING_KEY_NOT_FOUND: 'SIGNING_KEY_NOT_FOUND'
});
const getJwtKeyManagerExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case JwtKeyManagerExceptionCode.INVALID_PRIVATE_KEY:
        case JwtKeyManagerExceptionCode.SIGNING_KEY_NOT_FOUND:
        case JwtKeyManagerExceptionCode.INTERNAL_SERVER_ERROR:
            return _standarderrormessageconstant.STANDARD_ERROR_MESSAGE;
        default:
            return (0, _utils.assertUnreachable)(code);
    }
};
let JwtKeyManagerException = class JwtKeyManagerException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getJwtKeyManagerExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=jwt-key-manager.exception.js.map
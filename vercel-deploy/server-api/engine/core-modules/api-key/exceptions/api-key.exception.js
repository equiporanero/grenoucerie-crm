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
    get ApiKeyException () {
        return ApiKeyException;
    },
    get ApiKeyExceptionCode () {
        return ApiKeyExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const _customexception = require("../../../../utils/custom-exception");
var ApiKeyExceptionCode = /*#__PURE__*/ function(ApiKeyExceptionCode) {
    ApiKeyExceptionCode["API_KEY_NOT_FOUND"] = "API_KEY_NOT_FOUND";
    ApiKeyExceptionCode["API_KEY_REVOKED"] = "API_KEY_REVOKED";
    ApiKeyExceptionCode["API_KEY_EXPIRED"] = "API_KEY_EXPIRED";
    ApiKeyExceptionCode["API_KEY_NO_ROLE_ASSIGNED"] = "API_KEY_NO_ROLE_ASSIGNED";
    ApiKeyExceptionCode["ROLE_CANNOT_BE_ASSIGNED_TO_API_KEYS"] = "ROLE_CANNOT_BE_ASSIGNED_TO_API_KEYS";
    return ApiKeyExceptionCode;
}({});
const getApiKeyExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case "API_KEY_NOT_FOUND":
            return /*i18n*/ {
                id: "MyJhTw",
                message: "API key not found."
            };
        case "API_KEY_REVOKED":
            return /*i18n*/ {
                id: "K02c+I",
                message: "This API key has been revoked."
            };
        case "API_KEY_EXPIRED":
            return /*i18n*/ {
                id: "OLL1W0",
                message: "This API key has expired."
            };
        case "API_KEY_NO_ROLE_ASSIGNED":
            return /*i18n*/ {
                id: "9J2vmW",
                message: "This API key has no role assigned."
            };
        case "ROLE_CANNOT_BE_ASSIGNED_TO_API_KEYS":
            return /*i18n*/ {
                id: "UP3ZAj",
                message: "This role cannot be assigned to API keys."
            };
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let ApiKeyException = class ApiKeyException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getApiKeyExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=api-key.exception.js.map
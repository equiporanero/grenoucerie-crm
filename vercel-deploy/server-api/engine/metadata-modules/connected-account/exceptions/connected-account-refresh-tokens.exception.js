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
    get ConnectedAccountRefreshAccessTokenException () {
        return ConnectedAccountRefreshAccessTokenException;
    },
    get ConnectedAccountRefreshAccessTokenExceptionCode () {
        return ConnectedAccountRefreshAccessTokenExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const _customexception = require("../../../../utils/custom-exception");
var ConnectedAccountRefreshAccessTokenExceptionCode = /*#__PURE__*/ function(ConnectedAccountRefreshAccessTokenExceptionCode) {
    ConnectedAccountRefreshAccessTokenExceptionCode["REFRESH_TOKEN_NOT_FOUND"] = "REFRESH_TOKEN_NOT_FOUND";
    ConnectedAccountRefreshAccessTokenExceptionCode["INVALID_REFRESH_TOKEN"] = "INVALID_REFRESH_TOKEN";
    ConnectedAccountRefreshAccessTokenExceptionCode["PROVIDER_NOT_SUPPORTED"] = "PROVIDER_NOT_SUPPORTED";
    ConnectedAccountRefreshAccessTokenExceptionCode["TEMPORARY_NETWORK_ERROR"] = "TEMPORARY_NETWORK_ERROR";
    ConnectedAccountRefreshAccessTokenExceptionCode["ACCESS_TOKEN_NOT_FOUND"] = "ACCESS_TOKEN_NOT_FOUND";
    return ConnectedAccountRefreshAccessTokenExceptionCode;
}({});
const getConnectedAccountRefreshAccessTokenExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case "REFRESH_TOKEN_NOT_FOUND":
            return /*i18n*/ {
                id: "1GvzpH",
                message: "Refresh token not found."
            };
        case "INVALID_REFRESH_TOKEN":
            return /*i18n*/ {
                id: "XBYAgs",
                message: "Invalid refresh token."
            };
        case "PROVIDER_NOT_SUPPORTED":
            return /*i18n*/ {
                id: "Y5C3uK",
                message: "This provider is not supported."
            };
        case "TEMPORARY_NETWORK_ERROR":
            return /*i18n*/ {
                id: "reBsjo",
                message: "A temporary network error occurred."
            };
        case "ACCESS_TOKEN_NOT_FOUND":
            return /*i18n*/ {
                id: "Bk+qoW",
                message: "Access token not found."
            };
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let ConnectedAccountRefreshAccessTokenException = class ConnectedAccountRefreshAccessTokenException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getConnectedAccountRefreshAccessTokenExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=connected-account-refresh-tokens.exception.js.map
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
    get ConnectedAccountException () {
        return ConnectedAccountException;
    },
    get ConnectedAccountExceptionCode () {
        return ConnectedAccountExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const _customexception = require("../../../utils/custom-exception");
var ConnectedAccountExceptionCode = /*#__PURE__*/ function(ConnectedAccountExceptionCode) {
    ConnectedAccountExceptionCode["CONNECTED_ACCOUNT_NOT_FOUND"] = "CONNECTED_ACCOUNT_NOT_FOUND";
    ConnectedAccountExceptionCode["INVALID_CONNECTED_ACCOUNT_INPUT"] = "INVALID_CONNECTED_ACCOUNT_INPUT";
    ConnectedAccountExceptionCode["CONNECTED_ACCOUNT_OWNERSHIP_VIOLATION"] = "CONNECTED_ACCOUNT_OWNERSHIP_VIOLATION";
    return ConnectedAccountExceptionCode;
}({});
const getConnectedAccountExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case "CONNECTED_ACCOUNT_NOT_FOUND":
            return /*i18n*/ {
                id: "/OJTzk",
                message: "Connected account not found."
            };
        case "INVALID_CONNECTED_ACCOUNT_INPUT":
            return /*i18n*/ {
                id: "DH8Ofc",
                message: "Invalid connected account input."
            };
        case "CONNECTED_ACCOUNT_OWNERSHIP_VIOLATION":
            return /*i18n*/ {
                id: "FUPyWG",
                message: "You do not have access to this connected account."
            };
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let ConnectedAccountException = class ConnectedAccountException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getConnectedAccountExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=connected-account.exception.js.map
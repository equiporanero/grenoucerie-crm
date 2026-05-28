"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ConnectionProviderException", {
    enumerable: true,
    get: function() {
        return ConnectionProviderException;
    }
});
const _utils = require("twenty-shared/utils");
const _connectionproviderexceptioncodeenum = require("./connection-provider-exception-code.enum");
const _customexception = require("../../../../utils/custom-exception");
const getConnectionProviderExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case _connectionproviderexceptioncodeenum.ConnectionProviderExceptionCode.PROVIDER_NOT_FOUND:
            return /*i18n*/ {
                id: "xodh4N",
                message: "OAuth provider not found."
            };
        case _connectionproviderexceptioncodeenum.ConnectionProviderExceptionCode.CLIENT_CREDENTIALS_NOT_CONFIGURED:
            return /*i18n*/ {
                id: "J7dFKa",
                message: "Client credentials are not configured for this OAuth provider."
            };
        case _connectionproviderexceptioncodeenum.ConnectionProviderExceptionCode.TOKEN_EXCHANGE_FAILED:
            return /*i18n*/ {
                id: "srkEOV",
                message: "Failed to exchange the authorization code for an access token."
            };
        case _connectionproviderexceptioncodeenum.ConnectionProviderExceptionCode.REFRESH_FAILED:
            return /*i18n*/ {
                id: "eQmx6a",
                message: "Failed to refresh the access token."
            };
        case _connectionproviderexceptioncodeenum.ConnectionProviderExceptionCode.INVALID_STATE:
            return /*i18n*/ {
                id: "mCM5lH",
                message: "The OAuth state parameter is invalid or expired."
            };
        case _connectionproviderexceptioncodeenum.ConnectionProviderExceptionCode.INVALID_REQUEST:
            return /*i18n*/ {
                id: "kdTB4e",
                message: "The OAuth request is missing required parameters."
            };
        case _connectionproviderexceptioncodeenum.ConnectionProviderExceptionCode.FORBIDDEN:
            return /*i18n*/ {
                id: "eRIGld",
                message: "Not authorized to access this OAuth provider."
            };
        case _connectionproviderexceptioncodeenum.ConnectionProviderExceptionCode.INVALID_CONNECTION_PROVIDER_INPUT:
            return /*i18n*/ {
                id: "j6q6l+",
                message: "The connection-provider manifest is missing required fields."
            };
        case _connectionproviderexceptioncodeenum.ConnectionProviderExceptionCode.CONNECTION_PROVIDER_NOT_FOUND:
            return /*i18n*/ {
                id: "b+xWjq",
                message: "Connection provider not found."
            };
        case _connectionproviderexceptioncodeenum.ConnectionProviderExceptionCode.CONNECTION_PROVIDER_NAME_ALREADY_EXISTS:
            return /*i18n*/ {
                id: "jzhZvB",
                message: "A connection provider with this name already exists for this application."
            };
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let ConnectionProviderException = class ConnectionProviderException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getConnectionProviderExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=connection-provider.exception.js.map
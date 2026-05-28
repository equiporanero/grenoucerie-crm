"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "parseMsalError", {
    enumerable: true,
    get: function() {
        return parseMsalError;
    }
});
const _msalnode = require("@azure/msal-node");
const _connectedaccountrefreshtokensexception = require("../../../../../../engine/metadata-modules/connected-account/exceptions/connected-account-refresh-tokens.exception");
/**
 * @see https://learn.microsoft.com/en-us/entra/identity-platform/reference-error-codes
 */ const PERMANENT_AUTH_ERROR_CODES = new Set([
    'invalid_grant',
    'invalid_client',
    'unauthorized_client',
    'invalid_request'
]);
/**
 * @see https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/src/error/ClientAuthErrorCodes.ts
 */ const TRANSIENT_AUTH_ERROR_CODES = new Set([
    'network_error',
    'no_network_connectivity',
    'endpoints_resolution_error',
    'openid_config_error',
    'request_cannot_be_made'
]);
const parseMsalError = (error)=>{
    if (error instanceof _msalnode.InteractionRequiredAuthError) {
        return new _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenException(`Microsoft token refresh requires re-authentication: ${error.errorCode}`, _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenExceptionCode.INVALID_REFRESH_TOKEN);
    }
    if (error instanceof _msalnode.ServerError) {
        const status = error.status;
        if (status === 429) {
            return new _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenException('Microsoft rate limit exceeded', _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenExceptionCode.TEMPORARY_NETWORK_ERROR);
        }
        if (status && status >= 500 && status < 600) {
            return new _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenException(`Microsoft server error (${status}): ${error.errorMessage}`, _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenExceptionCode.TEMPORARY_NETWORK_ERROR);
        }
    }
    if (error instanceof _msalnode.AuthError) {
        if (TRANSIENT_AUTH_ERROR_CODES.has(error.errorCode)) {
            return new _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenException(`Microsoft network error: ${error.errorCode} - ${error.errorMessage}`, _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenExceptionCode.TEMPORARY_NETWORK_ERROR);
        }
        if (PERMANENT_AUTH_ERROR_CODES.has(error.errorCode)) {
            return new _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenException(`Microsoft auth error: ${error.errorCode} - ${error.errorMessage}`, _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenExceptionCode.INVALID_REFRESH_TOKEN);
        }
    }
    const message = error instanceof Error ? error.message : String(error);
    return new _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenException(`Microsoft token refresh failed: ${message}`, _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenExceptionCode.INVALID_REFRESH_TOKEN);
};

//# sourceMappingURL=parse-msal-error.util.js.map
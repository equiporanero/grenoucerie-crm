"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "parseGoogleOAuthError", {
    enumerable: true,
    get: function() {
        return parseGoogleOAuthError;
    }
});
const _connectedaccountrefreshtokensexception = require("../../../../../../engine/metadata-modules/connected-account/exceptions/connected-account-refresh-tokens.exception");
const _isgmailnetworkerrorutil = require("../../../../../messaging/message-import-manager/drivers/gmail/utils/is-gmail-network-error.util");
const parseGoogleOAuthError = (error)=>{
    if ((0, _isgmailnetworkerrorutil.isGmailNetworkError)(error)) {
        return new _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenException(`Google refresh token network error: ${error.code} - ${error.message}`, _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenExceptionCode.TEMPORARY_NETWORK_ERROR);
    }
    const gaxiosError = error;
    const googleOAuthError = {
        code: gaxiosError.response?.status,
        reason: gaxiosError.response?.data?.error || gaxiosError.response?.data?.error_description || 'Unknown reason',
        message: gaxiosError.response?.data?.error_description || gaxiosError.message || 'Unknown error'
    };
    switch(googleOAuthError.code){
        case 400:
            if (googleOAuthError.reason === 'invalid_grant') {
                return new _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenException(googleOAuthError.message, _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenExceptionCode.INVALID_REFRESH_TOKEN);
            }
            return new _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenException(googleOAuthError.message, _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenExceptionCode.INVALID_REFRESH_TOKEN);
        case 401:
            return new _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenException(googleOAuthError.message, _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenExceptionCode.INVALID_REFRESH_TOKEN);
        case 403:
            return new _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenException(googleOAuthError.message, _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenExceptionCode.INVALID_REFRESH_TOKEN);
        case 429:
            return new _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenException(googleOAuthError.message, _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenExceptionCode.TEMPORARY_NETWORK_ERROR);
        case 500:
        case 502:
        case 503:
        case 504:
            return new _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenException(`${googleOAuthError.code} - ${googleOAuthError.message}`, _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenExceptionCode.TEMPORARY_NETWORK_ERROR);
        default:
            break;
    }
    return new _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenException(`Google refresh token failed: ${googleOAuthError.message}`, _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenExceptionCode.INVALID_REFRESH_TOKEN);
};

//# sourceMappingURL=parse-google-oauth-error.util.js.map
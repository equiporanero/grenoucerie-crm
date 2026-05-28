"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isImapNetworkError", {
    enumerable: true,
    get: function() {
        return isImapNetworkError;
    }
});
const _utils = require("twenty-shared/utils");
const _messagenetworkexception = require("../../exceptions/message-network.exception");
const IMAPFLOW_TIMEOUT_ERROR_CODES = [
    'ETIMEOUT',
    'UPGRADE_TIMEOUT',
    'CONNECT_TIMEOUT',
    'GREETING_TIMEOUT'
];
const IMAPFLOW_CONNECTION_ERROR_CODES = [
    'NoConnection',
    'EConnectionClosed',
    'ProxyError',
    'ClosedAfterConnectTLS',
    'ClosedAfterConnectText'
];
const NODEJS_NETWORK_ERROR_CODES = [
    _messagenetworkexception.MessageNetworkExceptionCode.ECONNREFUSED,
    _messagenetworkexception.MessageNetworkExceptionCode.ECONNRESET,
    _messagenetworkexception.MessageNetworkExceptionCode.ENOTFOUND,
    _messagenetworkexception.MessageNetworkExceptionCode.ECONNABORTED,
    _messagenetworkexception.MessageNetworkExceptionCode.ETIMEDOUT,
    _messagenetworkexception.MessageNetworkExceptionCode.ERR_NETWORK,
    _messagenetworkexception.MessageNetworkExceptionCode.EHOSTUNREACH
];
const isImapNetworkError = (error)=>{
    const errorWithCode = error;
    if (!(0, _utils.isDefined)(errorWithCode.code)) {
        return false;
    }
    if (IMAPFLOW_TIMEOUT_ERROR_CODES.includes(errorWithCode.code)) {
        return true;
    }
    if (IMAPFLOW_CONNECTION_ERROR_CODES.includes(errorWithCode.code)) {
        return true;
    }
    if (NODEJS_NETWORK_ERROR_CODES.includes(errorWithCode.code)) {
        return true;
    }
    return false;
};

//# sourceMappingURL=is-imap-network-error.util.js.map
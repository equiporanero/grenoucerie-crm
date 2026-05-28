"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isGmailNetworkError", {
    enumerable: true,
    get: function() {
        return isGmailNetworkError;
    }
});
const _messagenetworkexception = require("../../exceptions/message-network.exception");
const isGmailNetworkError = (error)=>{
    if (error === null || typeof error !== 'object') {
        return false;
    }
    if (!('code' in error)) {
        return false;
    }
    switch(error.code){
        case _messagenetworkexception.MessageNetworkExceptionCode.ECONNRESET:
        case _messagenetworkexception.MessageNetworkExceptionCode.ENOTFOUND:
        case _messagenetworkexception.MessageNetworkExceptionCode.ECONNABORTED:
        case _messagenetworkexception.MessageNetworkExceptionCode.ETIMEDOUT:
        case _messagenetworkexception.MessageNetworkExceptionCode.ERR_NETWORK:
        case _messagenetworkexception.MessageNetworkExceptionCode.EHOSTUNREACH:
            return true;
        default:
            return false;
    }
};

//# sourceMappingURL=is-gmail-network-error.util.js.map
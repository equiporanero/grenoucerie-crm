"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "setRequestExtraParams", {
    enumerable: true,
    get: function() {
        return setRequestExtraParams;
    }
});
const _authexception = require("../auth.exception");
const setRequestExtraParams = (request, params)=>{
    const { transientToken, redirectLocation, calendarVisibility, messageVisibility, loginHint, userId, workspaceId, skipMessageChannelConfiguration } = params;
    if (!transientToken) {
        throw new _authexception.AuthException('transientToken is required', _authexception.AuthExceptionCode.INVALID_INPUT);
    }
    request.params.transientToken = transientToken;
    if (redirectLocation) {
        request.params.redirectLocation = redirectLocation;
    }
    if (calendarVisibility) {
        request.params.calendarVisibility = calendarVisibility;
    }
    if (messageVisibility) {
        request.params.messageVisibility = messageVisibility;
    }
    if (loginHint) {
        request.params.loginHint = loginHint;
    }
    if (userId) {
        request.params.userId = userId;
    }
    if (workspaceId) {
        request.params.workspaceId = workspaceId;
    }
    if (skipMessageChannelConfiguration) {
        request.params.skipMessageChannelConfiguration = skipMessageChannelConfiguration;
    }
};

//# sourceMappingURL=google-apis-set-request-extra-params.util.js.map
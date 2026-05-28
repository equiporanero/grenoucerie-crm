"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "workspaceValidator", {
    enumerable: true,
    get: function() {
        return workspaceValidator;
    }
});
const _authexception = require("../auth/auth.exception");
const _workspacetype = require("./types/workspace.type");
const isAuthEnabledOrThrow = (provider, workspace, exceptionToThrowCustom = new _authexception.AuthException(`${provider} auth is not enabled for this workspace`, _authexception.AuthExceptionCode.OAUTH_ACCESS_DENIED))=>{
    if (provider === _workspacetype.AuthProviderEnum.Google && workspace.isGoogleAuthEnabled) return true;
    if (provider === _workspacetype.AuthProviderEnum.Microsoft && workspace.isMicrosoftAuthEnabled) return true;
    if (provider === _workspacetype.AuthProviderEnum.Password && workspace.isPasswordAuthEnabled) return true;
    if (provider === _workspacetype.AuthProviderEnum.SSO) return true;
    throw exceptionToThrowCustom;
};
const isAuthEnabled = (provider, workspace)=>{
    if (provider === _workspacetype.AuthProviderEnum.Google && workspace.isGoogleAuthEnabled) return true;
    if (provider === _workspacetype.AuthProviderEnum.Microsoft && workspace.isMicrosoftAuthEnabled) return true;
    if (provider === _workspacetype.AuthProviderEnum.Password && workspace.isPasswordAuthEnabled) return true;
    return false;
};
const workspaceValidator = {
    isAuthEnabledOrThrow: isAuthEnabledOrThrow,
    isAuthEnabled: isAuthEnabled
};

//# sourceMappingURL=workspace.validate.js.map
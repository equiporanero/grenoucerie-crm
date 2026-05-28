"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "resolveRolePermissionConfig", {
    enumerable: true,
    get: function() {
        return resolveRolePermissionConfig;
    }
});
const _utils = require("twenty-shared/utils");
const _isapikeyauthcontextguard = require("../../core-modules/auth/guards/is-api-key-auth-context.guard");
const _isapplicationauthcontextguard = require("../../core-modules/auth/guards/is-application-auth-context.guard");
const _issystemauthcontextguard = require("../../core-modules/auth/guards/is-system-auth-context.guard");
const _isuserauthcontextguard = require("../../core-modules/auth/guards/is-user-auth-context.guard");
const resolveRolePermissionConfig = ({ authContext, userWorkspaceRoleMap, apiKeyRoleMap })=>{
    if ((0, _issystemauthcontextguard.isSystemAuthContext)(authContext)) {
        return {
            shouldBypassPermissionChecks: true
        };
    }
    if ((0, _isapikeyauthcontextguard.isApiKeyAuthContext)(authContext)) {
        const roleId = apiKeyRoleMap[authContext.apiKey.id];
        if (!(0, _utils.isDefined)(roleId)) {
            return null;
        }
        return {
            intersectionOf: [
                roleId
            ]
        };
    }
    if ((0, _isapplicationauthcontextguard.isApplicationAuthContext)(authContext) && (0, _utils.isDefined)(authContext.application.defaultRoleId)) {
        return {
            intersectionOf: [
                authContext.application.defaultRoleId
            ]
        };
    }
    if ((0, _isuserauthcontextguard.isUserAuthContext)(authContext)) {
        const roleId = userWorkspaceRoleMap[authContext.userWorkspaceId];
        if (!(0, _utils.isDefined)(roleId)) {
            return null;
        }
        return {
            intersectionOf: [
                roleId
            ]
        };
    }
    return null;
};

//# sourceMappingURL=resolve-role-permission-config.util.js.map
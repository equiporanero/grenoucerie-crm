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
    get AUTH_CONTEXT_USER_SELECT_FIELDS () {
        return _authcontextuserselectfieldsconstants.AUTH_CONTEXT_USER_SELECT_FIELDS;
    },
    get JwtTokenTypeEnum () {
        return JwtTokenTypeEnum;
    }
});
const _authcontextuserselectfieldsconstants = require("../constants/auth-context-user-select-fields.constants");
var JwtTokenTypeEnum = /*#__PURE__*/ function(JwtTokenTypeEnum) {
    JwtTokenTypeEnum["ACCESS"] = "ACCESS";
    JwtTokenTypeEnum["REFRESH"] = "REFRESH";
    JwtTokenTypeEnum["WORKSPACE_AGNOSTIC"] = "WORKSPACE_AGNOSTIC";
    JwtTokenTypeEnum["LOGIN"] = "LOGIN";
    JwtTokenTypeEnum["FILE"] = "FILE";
    JwtTokenTypeEnum["API_KEY"] = "API_KEY";
    JwtTokenTypeEnum["REMOTE_SERVER"] = "REMOTE_SERVER";
    JwtTokenTypeEnum["KEY_ENCRYPTION_KEY"] = "KEY_ENCRYPTION_KEY";
    JwtTokenTypeEnum["APPLICATION_ACCESS"] = "APPLICATION_ACCESS";
    JwtTokenTypeEnum["APPLICATION_REFRESH"] = "APPLICATION_REFRESH";
    JwtTokenTypeEnum["APP_OAUTH_STATE"] = "APP_OAUTH_STATE";
    JwtTokenTypeEnum["APPROVED_ACCESS_DOMAIN"] = "APPROVED_ACCESS_DOMAIN";
    return JwtTokenTypeEnum;
}({});

//# sourceMappingURL=auth-context.type.js.map
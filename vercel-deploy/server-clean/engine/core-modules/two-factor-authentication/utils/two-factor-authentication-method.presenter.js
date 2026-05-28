"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildTwoFactorAuthenticationMethodSummary", {
    enumerable: true,
    get: function() {
        return buildTwoFactorAuthenticationMethodSummary;
    }
});
const _utils = require("twenty-shared/utils");
function buildTwoFactorAuthenticationMethodSummary(methods) {
    if (!(0, _utils.isDefined)(methods)) return undefined;
    return methods.map((method)=>({
            twoFactorAuthenticationMethodId: method.id,
            status: method.status,
            strategy: method.strategy
        }));
}

//# sourceMappingURL=two-factor-authentication-method.presenter.js.map
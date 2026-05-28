"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TwoFactorAuthenticationExceptionFilter", {
    enumerable: true,
    get: function() {
        return TwoFactorAuthenticationExceptionFilter;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _graphqlerrorsutil = require("../graphql/utils/graphql-errors.util");
const _twofactorauthenticationexception = require("./two-factor-authentication.exception");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let TwoFactorAuthenticationExceptionFilter = class TwoFactorAuthenticationExceptionFilter {
    catch(exception) {
        switch(exception.code){
            case _twofactorauthenticationexception.TwoFactorAuthenticationExceptionCode.INVALID_OTP:
                throw new _graphqlerrorsutil.UserInputError(exception.message, {
                    subCode: exception.code,
                    userFriendlyMessage: /*i18n*/ {
                        id: "VEKoJx",
                        message: "Invalid verification code. Please try again."
                    }
                });
            case _twofactorauthenticationexception.TwoFactorAuthenticationExceptionCode.INVALID_CONFIGURATION:
            case _twofactorauthenticationexception.TwoFactorAuthenticationExceptionCode.TWO_FACTOR_AUTHENTICATION_METHOD_NOT_FOUND:
            case _twofactorauthenticationexception.TwoFactorAuthenticationExceptionCode.MALFORMED_DATABASE_OBJECT:
            case _twofactorauthenticationexception.TwoFactorAuthenticationExceptionCode.TWO_FACTOR_AUTHENTICATION_METHOD_ALREADY_PROVISIONED:
                throw new _graphqlerrorsutil.ForbiddenError(exception);
            default:
                {
                    (0, _utils.assertUnreachable)(exception.code);
                }
        }
    }
};
TwoFactorAuthenticationExceptionFilter = _ts_decorate([
    (0, _common.Catch)(_twofactorauthenticationexception.TwoFactorAuthenticationException)
], TwoFactorAuthenticationExceptionFilter);

//# sourceMappingURL=two-factor-authentication-exception.filter.js.map
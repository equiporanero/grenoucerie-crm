"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "twoFactorAuthenticationMethodsValidator", {
    enumerable: true,
    get: function() {
        return twoFactorAuthenticationMethodsValidator;
    }
});
const _utils = require("twenty-shared/utils");
const _twofactorauthenticationexception = require("./two-factor-authentication.exception");
const _otpconstants = require("./strategies/otp/otp.constants");
const assertIsDefinedOrThrow = (twoFactorAuthenticationMethod, exceptionToThrow = new _twofactorauthenticationexception.TwoFactorAuthenticationException('2FA method not found', _twofactorauthenticationexception.TwoFactorAuthenticationExceptionCode.TWO_FACTOR_AUTHENTICATION_METHOD_NOT_FOUND))=>{
    if (!(0, _utils.isDefined)(twoFactorAuthenticationMethod)) {
        throw exceptionToThrow;
    }
};
const areTwoFactorAuthenticationMethodsDefined = (twoFactorAuthenticationMethods)=>{
    return (0, _utils.isDefined)(twoFactorAuthenticationMethods) && twoFactorAuthenticationMethods.length > 0;
};
const isAnyTwoFactorAuthenticationMethodVerified = (twoFactorAuthenticationMethods)=>{
    return twoFactorAuthenticationMethods.filter((method)=>method.status === _otpconstants.OTPStatus.VERIFIED).length > 0;
};
const twoFactorAuthenticationMethodsValidator = {
    assertIsDefinedOrThrow,
    areDefined: areTwoFactorAuthenticationMethodsDefined,
    areVerified: isAnyTwoFactorAuthenticationMethodVerified
};

//# sourceMappingURL=two-factor-authentication.validation.js.map
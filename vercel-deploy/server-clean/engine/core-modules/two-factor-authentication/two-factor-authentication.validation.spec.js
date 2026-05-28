"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _twofactorauthenticationexception = require("./two-factor-authentication.exception");
const _twofactorauthenticationvalidation = require("./two-factor-authentication.validation");
const _otpconstants = require("./strategies/otp/otp.constants");
describe('twoFactorAuthenticationMethodsValidator', ()=>{
    const createMockMethod = (status = _otpconstants.OTPStatus.VERIFIED)=>({
            id: 'method-123',
            status,
            strategy: 'TOTP',
            userWorkspaceId: 'uw-123',
            userWorkspace: {},
            secret: 'secret',
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: new Date()
        });
    describe('assertIsDefinedOrThrow', ()=>{
        it('should not throw when method is defined', ()=>{
            const method = createMockMethod();
            expect(()=>_twofactorauthenticationvalidation.twoFactorAuthenticationMethodsValidator.assertIsDefinedOrThrow(method)).not.toThrow();
        });
        it('should throw default exception when method is null', ()=>{
            expect(()=>_twofactorauthenticationvalidation.twoFactorAuthenticationMethodsValidator.assertIsDefinedOrThrow(null)).toThrow(new _twofactorauthenticationexception.TwoFactorAuthenticationException('2FA method not found', _twofactorauthenticationexception.TwoFactorAuthenticationExceptionCode.TWO_FACTOR_AUTHENTICATION_METHOD_NOT_FOUND));
        });
        it('should throw default exception when method is undefined', ()=>{
            expect(()=>_twofactorauthenticationvalidation.twoFactorAuthenticationMethodsValidator.assertIsDefinedOrThrow(undefined)).toThrow(new _twofactorauthenticationexception.TwoFactorAuthenticationException('2FA method not found', _twofactorauthenticationexception.TwoFactorAuthenticationExceptionCode.TWO_FACTOR_AUTHENTICATION_METHOD_NOT_FOUND));
        });
        it('should throw custom exception when provided', ()=>{
            const customException = new _twofactorauthenticationexception.TwoFactorAuthenticationException('Custom error message', _twofactorauthenticationexception.TwoFactorAuthenticationExceptionCode.INVALID_CONFIGURATION);
            expect(()=>_twofactorauthenticationvalidation.twoFactorAuthenticationMethodsValidator.assertIsDefinedOrThrow(null, customException)).toThrow(customException);
        });
    });
    describe('areDefined', ()=>{
        it('should return true when methods array has items', ()=>{
            const methods = [
                createMockMethod()
            ];
            const result = _twofactorauthenticationvalidation.twoFactorAuthenticationMethodsValidator.areDefined(methods);
            expect(result).toBe(true);
        });
        it('should return true when methods array has multiple items', ()=>{
            const methods = [
                createMockMethod(),
                createMockMethod()
            ];
            const result = _twofactorauthenticationvalidation.twoFactorAuthenticationMethodsValidator.areDefined(methods);
            expect(result).toBe(true);
        });
        it('should return false when methods array is empty', ()=>{
            const methods = [];
            const result = _twofactorauthenticationvalidation.twoFactorAuthenticationMethodsValidator.areDefined(methods);
            expect(result).toBe(false);
        });
        it('should return false when methods is null', ()=>{
            const result = _twofactorauthenticationvalidation.twoFactorAuthenticationMethodsValidator.areDefined(null);
            expect(result).toBe(false);
        });
        it('should return false when methods is undefined', ()=>{
            const result = _twofactorauthenticationvalidation.twoFactorAuthenticationMethodsValidator.areDefined(undefined);
            expect(result).toBe(false);
        });
    });
    describe('areVerified', ()=>{
        it('should return true when at least one method is verified', ()=>{
            const methods = [
                createMockMethod(_otpconstants.OTPStatus.VERIFIED),
                createMockMethod(_otpconstants.OTPStatus.PENDING)
            ];
            const result = _twofactorauthenticationvalidation.twoFactorAuthenticationMethodsValidator.areVerified(methods);
            expect(result).toBe(true);
        });
        it('should return true when all methods are verified', ()=>{
            const methods = [
                createMockMethod(_otpconstants.OTPStatus.VERIFIED),
                createMockMethod(_otpconstants.OTPStatus.VERIFIED)
            ];
            const result = _twofactorauthenticationvalidation.twoFactorAuthenticationMethodsValidator.areVerified(methods);
            expect(result).toBe(true);
        });
        it('should return false when no methods are verified', ()=>{
            const methods = [
                createMockMethod(_otpconstants.OTPStatus.PENDING),
                createMockMethod(_otpconstants.OTPStatus.PENDING)
            ];
            const result = _twofactorauthenticationvalidation.twoFactorAuthenticationMethodsValidator.areVerified(methods);
            expect(result).toBe(false);
        });
        it('should return false when methods array is empty', ()=>{
            const methods = [];
            const result = _twofactorauthenticationvalidation.twoFactorAuthenticationMethodsValidator.areVerified(methods);
            expect(result).toBe(false);
        });
        it('should return true when single method is verified', ()=>{
            const methods = [
                createMockMethod(_otpconstants.OTPStatus.VERIFIED)
            ];
            const result = _twofactorauthenticationvalidation.twoFactorAuthenticationMethodsValidator.areVerified(methods);
            expect(result).toBe(true);
        });
        it('should return false when single method is pending', ()=>{
            const methods = [
                createMockMethod(_otpconstants.OTPStatus.PENDING)
            ];
            const result = _twofactorauthenticationvalidation.twoFactorAuthenticationMethodsValidator.areVerified(methods);
            expect(result).toBe(false);
        });
    });
});

//# sourceMappingURL=two-factor-authentication.validation.spec.js.map
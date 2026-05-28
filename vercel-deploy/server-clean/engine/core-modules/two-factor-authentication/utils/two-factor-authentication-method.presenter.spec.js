"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _otpconstants = require("../strategies/otp/otp.constants");
const _twofactorauthenticationmethodpresenter = require("./two-factor-authentication-method.presenter");
describe('buildTwoFactorAuthenticationMethodSummary', ()=>{
    const createMockMethod = (id, status, strategy)=>({
            id,
            status,
            strategy,
            userWorkspaceId: 'uw-123',
            userWorkspace: {},
            secret: 'secret',
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: new Date()
        });
    it('should return undefined when methods is undefined', ()=>{
        const result = (0, _twofactorauthenticationmethodpresenter.buildTwoFactorAuthenticationMethodSummary)(undefined);
        expect(result).toBeUndefined();
    });
    it('should return undefined when methods is null', ()=>{
        const result = (0, _twofactorauthenticationmethodpresenter.buildTwoFactorAuthenticationMethodSummary)(null);
        expect(result).toBeUndefined();
    });
    it('should return empty array when methods is empty array', ()=>{
        const result = (0, _twofactorauthenticationmethodpresenter.buildTwoFactorAuthenticationMethodSummary)([]);
        expect(result).toEqual([]);
    });
    it('should transform single method correctly', ()=>{
        const methods = [
            createMockMethod('method-1', _otpconstants.OTPStatus.VERIFIED, _types.TwoFactorAuthenticationStrategy.TOTP)
        ];
        const result = (0, _twofactorauthenticationmethodpresenter.buildTwoFactorAuthenticationMethodSummary)(methods);
        expect(result).toEqual([
            {
                twoFactorAuthenticationMethodId: 'method-1',
                status: _otpconstants.OTPStatus.VERIFIED,
                strategy: _types.TwoFactorAuthenticationStrategy.TOTP
            }
        ]);
    });
    it('should transform multiple methods correctly', ()=>{
        const methods = [
            createMockMethod('method-1', _otpconstants.OTPStatus.VERIFIED, _types.TwoFactorAuthenticationStrategy.TOTP),
            createMockMethod('method-2', _otpconstants.OTPStatus.PENDING, _types.TwoFactorAuthenticationStrategy.TOTP)
        ];
        const result = (0, _twofactorauthenticationmethodpresenter.buildTwoFactorAuthenticationMethodSummary)(methods);
        expect(result).toEqual([
            {
                twoFactorAuthenticationMethodId: 'method-1',
                status: _otpconstants.OTPStatus.VERIFIED,
                strategy: _types.TwoFactorAuthenticationStrategy.TOTP
            },
            {
                twoFactorAuthenticationMethodId: 'method-2',
                status: _otpconstants.OTPStatus.PENDING,
                strategy: _types.TwoFactorAuthenticationStrategy.TOTP
            }
        ]);
    });
    it('should only include relevant fields in summary', ()=>{
        const methods = [
            createMockMethod('method-1', _otpconstants.OTPStatus.VERIFIED, _types.TwoFactorAuthenticationStrategy.TOTP)
        ];
        const result = (0, _twofactorauthenticationmethodpresenter.buildTwoFactorAuthenticationMethodSummary)(methods);
        expect(result[0]).toEqual({
            twoFactorAuthenticationMethodId: 'method-1',
            status: _otpconstants.OTPStatus.VERIFIED,
            strategy: _types.TwoFactorAuthenticationStrategy.TOTP
        });
        // Ensure other fields are not included
        expect(result[0]).not.toHaveProperty('secret');
        expect(result[0]).not.toHaveProperty('userWorkspaceId');
        expect(result[0]).not.toHaveProperty('userWorkspace');
        expect(result[0]).not.toHaveProperty('createdAt');
        expect(result[0]).not.toHaveProperty('updatedAt');
        expect(result[0]).not.toHaveProperty('deletedAt');
    });
    it('should handle methods with different statuses', ()=>{
        const methods = [
            createMockMethod('method-pending', _otpconstants.OTPStatus.PENDING, _types.TwoFactorAuthenticationStrategy.TOTP),
            createMockMethod('method-verified', _otpconstants.OTPStatus.VERIFIED, _types.TwoFactorAuthenticationStrategy.TOTP)
        ];
        const result = (0, _twofactorauthenticationmethodpresenter.buildTwoFactorAuthenticationMethodSummary)(methods);
        expect(result).toHaveLength(2);
        expect(result[0]).toEqual({
            twoFactorAuthenticationMethodId: 'method-pending',
            status: _otpconstants.OTPStatus.PENDING,
            strategy: _types.TwoFactorAuthenticationStrategy.TOTP
        });
        expect(result[1]).toEqual({
            twoFactorAuthenticationMethodId: 'method-verified',
            status: _otpconstants.OTPStatus.VERIFIED,
            strategy: _types.TwoFactorAuthenticationStrategy.TOTP
        });
    });
});

//# sourceMappingURL=two-factor-authentication-method.presenter.spec.js.map
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _classtransformer = require("class-transformer");
const _classvalidator = require("class-validator");
const _verifytwofactorauthenticationmethodinput = require("./verify-two-factor-authentication-method.input");
describe('VerifyTwoFactorAuthenticationMethodInput', ()=>{
    it('should pass validation with valid OTP', async ()=>{
        const input = (0, _classtransformer.plainToClass)(_verifytwofactorauthenticationmethodinput.VerifyTwoFactorAuthenticationMethodInput, {
            otp: '123456'
        });
        const errors = await (0, _classvalidator.validate)(input);
        expect(errors).toHaveLength(0);
    });
    it('should fail validation with empty OTP', async ()=>{
        const input = (0, _classtransformer.plainToClass)(_verifytwofactorauthenticationmethodinput.VerifyTwoFactorAuthenticationMethodInput, {
            otp: ''
        });
        const errors = await (0, _classvalidator.validate)(input);
        expect(errors).toHaveLength(1);
        expect(errors[0].property).toBe('otp');
        expect(errors[0].constraints).toHaveProperty('isNotEmpty');
    });
    it('should fail validation with non-string OTP', async ()=>{
        const input = (0, _classtransformer.plainToClass)(_verifytwofactorauthenticationmethodinput.VerifyTwoFactorAuthenticationMethodInput, {
            otp: 123456
        });
        const errors = await (0, _classvalidator.validate)(input);
        expect(errors).toHaveLength(1);
        expect(errors[0].property).toBe('otp');
        expect(errors[0].constraints).toHaveProperty('isString');
    });
    it('should fail validation with non-numeric string OTP', async ()=>{
        const input = (0, _classtransformer.plainToClass)(_verifytwofactorauthenticationmethodinput.VerifyTwoFactorAuthenticationMethodInput, {
            otp: 'abcdef'
        });
        const errors = await (0, _classvalidator.validate)(input);
        expect(errors).toHaveLength(1);
        expect(errors[0].property).toBe('otp');
        expect(errors[0].constraints).toHaveProperty('isNumberString');
    });
    it('should fail validation with OTP shorter than 6 digits', async ()=>{
        const input = (0, _classtransformer.plainToClass)(_verifytwofactorauthenticationmethodinput.VerifyTwoFactorAuthenticationMethodInput, {
            otp: '12345'
        });
        const errors = await (0, _classvalidator.validate)(input);
        expect(errors).toHaveLength(1);
        expect(errors[0].property).toBe('otp');
        expect(errors[0].constraints).toHaveProperty('isLength');
        expect(errors[0].constraints?.isLength).toBe('OTP must be exactly 6 digits');
    });
    it('should fail validation with OTP longer than 6 digits', async ()=>{
        const input = (0, _classtransformer.plainToClass)(_verifytwofactorauthenticationmethodinput.VerifyTwoFactorAuthenticationMethodInput, {
            otp: '1234567'
        });
        const errors = await (0, _classvalidator.validate)(input);
        expect(errors).toHaveLength(1);
        expect(errors[0].property).toBe('otp');
        expect(errors[0].constraints).toHaveProperty('isLength');
        expect(errors[0].constraints?.isLength).toBe('OTP must be exactly 6 digits');
    });
    it('should fail validation with null OTP', async ()=>{
        const input = (0, _classtransformer.plainToClass)(_verifytwofactorauthenticationmethodinput.VerifyTwoFactorAuthenticationMethodInput, {
            otp: null
        });
        const errors = await (0, _classvalidator.validate)(input);
        expect(errors).toHaveLength(1);
        expect(errors[0].property).toBe('otp');
        expect(errors[0].constraints).toHaveProperty('isNotEmpty');
    });
    it('should fail validation with undefined OTP', async ()=>{
        const input = (0, _classtransformer.plainToClass)(_verifytwofactorauthenticationmethodinput.VerifyTwoFactorAuthenticationMethodInput, {});
        const errors = await (0, _classvalidator.validate)(input);
        expect(errors).toHaveLength(1);
        expect(errors[0].property).toBe('otp');
        expect(errors[0].constraints).toHaveProperty('isNotEmpty');
    });
    it('should pass validation with numeric string OTP containing leading zeros', async ()=>{
        const input = (0, _classtransformer.plainToClass)(_verifytwofactorauthenticationmethodinput.VerifyTwoFactorAuthenticationMethodInput, {
            otp: '012345'
        });
        const errors = await (0, _classvalidator.validate)(input);
        expect(errors).toHaveLength(0);
    });
});

//# sourceMappingURL=verify-two-factor-authentication-method.input.spec.js.map
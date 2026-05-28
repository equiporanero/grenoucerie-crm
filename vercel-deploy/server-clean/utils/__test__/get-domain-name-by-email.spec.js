"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _graphqlerrorsutil = require("../../engine/core-modules/graphql/utils/graphql-errors.util");
const _getdomainnamebyemail = require("../get-domain-name-by-email");
describe('getDomainNameByEmail', ()=>{
    it('should return the domain name for a valid email', ()=>{
        expect((0, _getdomainnamebyemail.getDomainNameByEmail)('user@example.com')).toBe('example.com');
    });
    it('should throw a UserInputError if email is empty', ()=>{
        expect(()=>(0, _getdomainnamebyemail.getDomainNameByEmail)('')).toThrow(_graphqlerrorsutil.UserInputError);
        expect(()=>(0, _getdomainnamebyemail.getDomainNameByEmail)('')).toThrow('Email is required. Please provide a valid email address.');
        try {
            (0, _getdomainnamebyemail.getDomainNameByEmail)('');
        } catch (error) {
            expect(error).toBeInstanceOf(_graphqlerrorsutil.UserInputError);
            expect(error.extensions.code).toBe(_graphqlerrorsutil.ErrorCode.BAD_USER_INPUT);
            expect(error.extensions.userFriendlyMessage.message).toContain('Email is required. Please provide a valid email address.');
        }
    });
    it('should throw a UserInputError if email does not contain "@"', ()=>{
        expect(()=>(0, _getdomainnamebyemail.getDomainNameByEmail)('userexample.com')).toThrow(_graphqlerrorsutil.UserInputError);
        try {
            (0, _getdomainnamebyemail.getDomainNameByEmail)('userexample.com');
        } catch (error) {
            expect(error).toBeInstanceOf(_graphqlerrorsutil.UserInputError);
            expect(error.extensions.code).toBe(_graphqlerrorsutil.ErrorCode.BAD_USER_INPUT);
            expect(error.extensions.userFriendlyMessage.message).toContain('The provided email address is not valid. Please use a standard email format (e.g., user@example.com).');
        }
    });
    it('should throw a UserInputError if email has more than one "@"', ()=>{
        expect(()=>(0, _getdomainnamebyemail.getDomainNameByEmail)('user@example@com')).toThrow(_graphqlerrorsutil.UserInputError);
        try {
            (0, _getdomainnamebyemail.getDomainNameByEmail)('user@example@com');
        } catch (error) {
            expect(error).toBeInstanceOf(_graphqlerrorsutil.UserInputError);
            expect(error.extensions.code).toBe(_graphqlerrorsutil.ErrorCode.BAD_USER_INPUT);
            expect(error.extensions.userFriendlyMessage.message).toContain('The provided email address is not valid. Please use a standard email format (e.g., user@example.com).');
        }
    });
    it('should throw a UserInputError if domain part is empty', ()=>{
        expect(()=>(0, _getdomainnamebyemail.getDomainNameByEmail)('user@')).toThrow(_graphqlerrorsutil.UserInputError);
        try {
            (0, _getdomainnamebyemail.getDomainNameByEmail)('user@');
        } catch (error) {
            expect(error).toBeInstanceOf(_graphqlerrorsutil.UserInputError);
            expect(error.extensions.code).toBe(_graphqlerrorsutil.ErrorCode.BAD_USER_INPUT);
            expect(error.extensions.userFriendlyMessage.message).toContain('The provided email address is missing a domain. Please use a standard email format (e.g., user@example.com).');
        }
    });
    // Edge cases with weird but potentially valid email formats
    it('should handle email with plus addressing', ()=>{
        expect((0, _getdomainnamebyemail.getDomainNameByEmail)('user+tag@example.com')).toBe('example.com');
    });
    it('should handle email with dots in local part', ()=>{
        expect((0, _getdomainnamebyemail.getDomainNameByEmail)('user.name@example.com')).toBe('example.com');
    });
    it('should handle email with subdomain', ()=>{
        expect((0, _getdomainnamebyemail.getDomainNameByEmail)('user@mail.example.com')).toBe('mail.example.com');
    });
    it('should handle email with numeric domain', ()=>{
        expect((0, _getdomainnamebyemail.getDomainNameByEmail)('user@123.456.1.2')).toBe('123.456.1.2');
    });
    it('should handle email with hyphenated domain', ()=>{
        expect((0, _getdomainnamebyemail.getDomainNameByEmail)('user@my-domain.com')).toBe('my-domain.com');
    });
    it('should handle email with international domain (punycode)', ()=>{
        expect((0, _getdomainnamebyemail.getDomainNameByEmail)('user@xn--nxasmq6b.com')).toBe('xn--nxasmq6b.com');
    });
    it('should handle email with very long domain', ()=>{
        const longDomain = 'a'.repeat(160) + '.com';
        expect((0, _getdomainnamebyemail.getDomainNameByEmail)(`user@${longDomain}`)).toBe(longDomain);
    });
    it('should handle email with quoted local part containing spaces', ()=>{
        expect((0, _getdomainnamebyemail.getDomainNameByEmail)('"user name"@example.com')).toBe('example.com');
    });
    it.skip('should handle email with special characters in quoted local part', ()=>{
        expect((0, _getdomainnamebyemail.getDomainNameByEmail)('"user@#$%"@example.com')).toBe('example.com');
    });
    it.skip('should handle email with quoted local part containing @', ()=>{
        expect((0, _getdomainnamebyemail.getDomainNameByEmail)('"user@local"@example.com')).toBe('example.com');
    });
});

//# sourceMappingURL=get-domain-name-by-email.spec.js.map
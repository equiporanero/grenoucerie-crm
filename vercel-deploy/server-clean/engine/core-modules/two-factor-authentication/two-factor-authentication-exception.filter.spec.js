"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _graphqlerrorsutil = require("../graphql/utils/graphql-errors.util");
const _twofactorauthenticationexceptionfilter = require("./two-factor-authentication-exception.filter");
const _twofactorauthenticationexception = require("./two-factor-authentication.exception");
describe('TwoFactorAuthenticationExceptionFilter', ()=>{
    let filter;
    beforeEach(()=>{
        filter = new _twofactorauthenticationexceptionfilter.TwoFactorAuthenticationExceptionFilter();
    });
    it('should be defined', ()=>{
        expect(filter).toBeDefined();
    });
    describe('catch', ()=>{
        it('should throw UserInputError for INVALID_OTP exception', ()=>{
            const exception = new _twofactorauthenticationexception.TwoFactorAuthenticationException('Invalid OTP code', _twofactorauthenticationexception.TwoFactorAuthenticationExceptionCode.INVALID_OTP);
            expect(()=>filter.catch(exception)).toThrow(_graphqlerrorsutil.UserInputError);
            try {
                filter.catch(exception);
            } catch (error) {
                expect(error).toBeInstanceOf(_graphqlerrorsutil.UserInputError);
                expect(error.message).toBe('Invalid OTP code');
                expect(error.extensions.subCode).toBe(_twofactorauthenticationexception.TwoFactorAuthenticationExceptionCode.INVALID_OTP);
                expect(error.extensions.userFriendlyMessage).toEqual(expect.objectContaining({
                    id: expect.any(String),
                    message: 'Invalid verification code. Please try again.'
                }));
            }
        });
        it('should throw ForbiddenError for INVALID_CONFIGURATION exception', ()=>{
            const exception = new _twofactorauthenticationexception.TwoFactorAuthenticationException('Invalid configuration', _twofactorauthenticationexception.TwoFactorAuthenticationExceptionCode.INVALID_CONFIGURATION);
            expect(()=>filter.catch(exception)).toThrow(_graphqlerrorsutil.ForbiddenError);
            try {
                filter.catch(exception);
            } catch (error) {
                expect(error).toBeInstanceOf(_graphqlerrorsutil.ForbiddenError);
            }
        });
        it('should throw ForbiddenError for TWO_FACTOR_AUTHENTICATION_METHOD_NOT_FOUND exception', ()=>{
            const exception = new _twofactorauthenticationexception.TwoFactorAuthenticationException('Method not found', _twofactorauthenticationexception.TwoFactorAuthenticationExceptionCode.TWO_FACTOR_AUTHENTICATION_METHOD_NOT_FOUND);
            expect(()=>filter.catch(exception)).toThrow(_graphqlerrorsutil.ForbiddenError);
            try {
                filter.catch(exception);
            } catch (error) {
                expect(error).toBeInstanceOf(_graphqlerrorsutil.ForbiddenError);
            }
        });
        it('should throw ForbiddenError for MALFORMED_DATABASE_OBJECT exception', ()=>{
            const exception = new _twofactorauthenticationexception.TwoFactorAuthenticationException('Malformed object', _twofactorauthenticationexception.TwoFactorAuthenticationExceptionCode.MALFORMED_DATABASE_OBJECT);
            expect(()=>filter.catch(exception)).toThrow(_graphqlerrorsutil.ForbiddenError);
            try {
                filter.catch(exception);
            } catch (error) {
                expect(error).toBeInstanceOf(_graphqlerrorsutil.ForbiddenError);
            }
        });
        it('should throw ForbiddenError for TWO_FACTOR_AUTHENTICATION_METHOD_ALREADY_PROVISIONED exception', ()=>{
            const exception = new _twofactorauthenticationexception.TwoFactorAuthenticationException('Already provisioned', _twofactorauthenticationexception.TwoFactorAuthenticationExceptionCode.TWO_FACTOR_AUTHENTICATION_METHOD_ALREADY_PROVISIONED);
            expect(()=>filter.catch(exception)).toThrow(_graphqlerrorsutil.ForbiddenError);
            try {
                filter.catch(exception);
            } catch (error) {
                expect(error).toBeInstanceOf(_graphqlerrorsutil.ForbiddenError);
            }
        });
    });
});

//# sourceMappingURL=two-factor-authentication-exception.filter.spec.js.map
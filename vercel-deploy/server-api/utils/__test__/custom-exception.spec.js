"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _customexception = require("../custom-exception");
describe('appendCommonExceptionCode', ()=>{
    it('should merge CommonExceptionCode with specific exception code', ()=>{
        const specificExceptionCode = {
            SPECIFIC_ERROR: 'SPECIFIC_ERROR'
        };
        const result = (0, _customexception.appendCommonExceptionCode)(specificExceptionCode);
        expect(result).toEqual({
            INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
            SPECIFIC_ERROR: 'SPECIFIC_ERROR'
        });
    });
    it('should return CommonExceptionCode when empty object is provided', ()=>{
        const result = (0, _customexception.appendCommonExceptionCode)({});
        expect(result).toEqual({
            INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR'
        });
    });
});
describe('CustomException', ()=>{
    let TestException = class TestException extends _customexception.CustomException {
        constructor(message, code, { userFriendlyMessage }){
            super(message, code, {
                userFriendlyMessage
            });
        }
    };
    it('should set message and code correctly', ()=>{
        const message = 'Test error message';
        const code = 'TEST_ERROR';
        const userFriendlyMessage = /*i18n*/ {
            id: "J+cH9z",
            message: "Test user friendly message"
        };
        const exception = new TestException(message, code, {
            userFriendlyMessage
        });
        expect(exception.message).toBe(message);
        expect(exception.code).toBe(code);
        expect(exception.userFriendlyMessage).toBe(userFriendlyMessage);
    });
    it('should set userFriendlyMessage when provided', ()=>{
        const message = 'Test error message';
        const code = 'TEST_ERROR';
        const userFriendlyMessage = /*i18n*/ {
            id: "EHZMfR",
            message: "User friendly error message"
        };
        const exception = new TestException(message, code, {
            userFriendlyMessage
        });
        expect(exception.message).toBe(message);
        expect(exception.code).toBe(code);
        expect(exception.userFriendlyMessage).toBe(userFriendlyMessage);
    });
    it('should extend Error', ()=>{
        const exception = new TestException('Test error', 'TEST_ERROR', {
            userFriendlyMessage: /*i18n*/ {
                id: "M10it4",
                message: "Test error"
            }
        });
        expect(exception).toBeInstanceOf(Error);
    });
});
describe('UnknownException', ()=>{
    it('should extend CustomException', ()=>{
        const exception = new _customexception.UnknownException('Test error', 'TEST_ERROR', {
            userFriendlyMessage: /*i18n*/ {
                id: "M10it4",
                message: "Test error"
            }
        });
        expect(exception).toBeInstanceOf(_customexception.CustomException);
    });
    it('should set message and code correctly', ()=>{
        const message = 'Test error message';
        const code = 'TEST_ERROR';
        const exception = new _customexception.UnknownException(message, code, {
            userFriendlyMessage: /*i18n*/ {
                id: "M10it4",
                message: "Test error"
            }
        });
        expect(exception.message).toBe(message);
        expect(exception.code).toBe(code);
    });
    it('should set userFriendlyMessage when provided', ()=>{
        const message = 'Test error message';
        const code = 'TEST_ERROR';
        const userFriendlyMessage = /*i18n*/ {
            id: "EHZMfR",
            message: "User friendly error message"
        };
        const exception = new _customexception.UnknownException(message, code, {
            userFriendlyMessage
        });
        expect(exception.message).toBe(message);
        expect(exception.code).toBe(code);
        expect(exception.userFriendlyMessage).toBe(userFriendlyMessage);
    });
});

//# sourceMappingURL=custom-exception.spec.js.map
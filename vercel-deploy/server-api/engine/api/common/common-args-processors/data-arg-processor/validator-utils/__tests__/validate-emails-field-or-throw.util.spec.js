"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _validateemailsfieldorthrowutil = require("../validate-emails-field-or-throw.util");
const _commonqueryrunnerexception = require("../../../../common-query-runners/errors/common-query-runner.exception");
describe('validateEmailsFieldOrThrow', ()=>{
    describe('valid inputs', ()=>{
        it('should return null when value is null', ()=>{
            const result = (0, _validateemailsfieldorthrowutil.validateEmailsFieldOrThrow)(null, 'testField');
            expect(result).toBeNull();
        });
        it('should return the emails object when all fields are valid', ()=>{
            const emailsValue = {
                primaryEmail: 'primary@example.com',
                additionalEmails: [
                    'secondary1@example.com',
                    'secondary2@example.com'
                ]
            };
            const result = (0, _validateemailsfieldorthrowutil.validateEmailsFieldOrThrow)(emailsValue, 'testField');
            expect(result).toEqual(emailsValue);
        });
        it('should return the emails object when only primaryEmail is provided', ()=>{
            const emailsValue = {
                primaryEmail: 'primary@example.com'
            };
            const result = (0, _validateemailsfieldorthrowutil.validateEmailsFieldOrThrow)(emailsValue, 'testField');
            expect(result).toEqual(emailsValue);
        });
        it('should accept empty additionalEmails array', ()=>{
            const emailsValue = {
                primaryEmail: 'primary@example.com',
                additionalEmails: []
            };
            const result = (0, _validateemailsfieldorthrowutil.validateEmailsFieldOrThrow)(emailsValue, 'testField');
            expect(result).toEqual(emailsValue);
        });
    });
    describe('invalid inputs', ()=>{
        it('should throw when value is not an object', ()=>{
            expect(()=>(0, _validateemailsfieldorthrowutil.validateEmailsFieldOrThrow)('not an object', 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when value is undefined', ()=>{
            expect(()=>(0, _validateemailsfieldorthrowutil.validateEmailsFieldOrThrow)(undefined, 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when primaryEmail is not a string', ()=>{
            const emailsValue = {
                primaryEmail: 12345
            };
            expect(()=>(0, _validateemailsfieldorthrowutil.validateEmailsFieldOrThrow)(emailsValue, 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when additionalEmails is not an array', ()=>{
            const emailsValue = {
                additionalEmails: {
                    key: 'not an array'
                }
            };
            expect(()=>(0, _validateemailsfieldorthrowutil.validateEmailsFieldOrThrow)(emailsValue, 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when invalid subfields are present', ()=>{
            const emailsValue = {
                primaryEmail: 'primary@example.com',
                invalidField1: 'invalid',
                invalidField2: 'invalid'
            };
            expect(()=>(0, _validateemailsfieldorthrowutil.validateEmailsFieldOrThrow)(emailsValue, 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when additionalEmails is an invalid string', ()=>{
            const emailsValue = {
                additionalEmails: 'ADDITIONALexample.com'
            };
            expect(()=>(0, _validateemailsfieldorthrowutil.validateEmailsFieldOrThrow)(emailsValue, 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when primaryEmail is invalid but additionalEmails are valid', ()=>{
            const emailsValue = {
                primaryEmail: 'Primaryexample.com',
                additionalEmails: [
                    'additional@example.com'
                ]
            };
            expect(()=>(0, _validateemailsfieldorthrowutil.validateEmailsFieldOrThrow)(emailsValue, 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when one of additionalEmails is invalid', ()=>{
            const emailsValue = {
                additionalEmails: [
                    'Additional1example.com',
                    'additional2@example.com'
                ]
            };
            expect(()=>(0, _validateemailsfieldorthrowutil.validateEmailsFieldOrThrow)(emailsValue, 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
    });
});

//# sourceMappingURL=validate-emails-field-or-throw.util.spec.js.map
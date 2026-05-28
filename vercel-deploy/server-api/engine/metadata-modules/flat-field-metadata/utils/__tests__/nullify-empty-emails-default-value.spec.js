"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _nullifyemptyemailsdefaultvalueutil = require("../nullify-empty-emails-default-value.util");
describe('nullifyEmptyEmailsDefaultValue', ()=>{
    it('returns null when all sub-fields are empty-string equivalents', ()=>{
        expect((0, _nullifyemptyemailsdefaultvalueutil.nullifyEmptyEmailsDefaultValue)({
            primaryEmail: "''",
            additionalEmails: []
        })).toBeNull();
    });
    it('returns normalized object when primaryEmail has a value', ()=>{
        expect((0, _nullifyemptyemailsdefaultvalueutil.nullifyEmptyEmailsDefaultValue)({
            primaryEmail: 'user@example.com',
            additionalEmails: []
        })).toEqual({
            primaryEmail: 'user@example.com',
            additionalEmails: null
        });
    });
});

//# sourceMappingURL=nullify-empty-emails-default-value.spec.js.map
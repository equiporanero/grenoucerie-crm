"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _ismicrosoftoauthtransienterrorutil = require("../is-microsoft-oauth-transient-error.util");
describe('isMicrosoftOAuthTransientError', ()=>{
    it('should detect AADSTS650051 in the error message', ()=>{
        const error = new Error('AADSTS650051: The application needs to be provisioned for this tenant.');
        expect((0, _ismicrosoftoauthtransienterrorutil.isMicrosoftOAuthTransientError)(error)).toBe(true);
    });
    it('should reject other errors and non-Error values', ()=>{
        expect((0, _ismicrosoftoauthtransienterrorutil.isMicrosoftOAuthTransientError)(new Error('invalid_client'))).toBe(false);
        expect((0, _ismicrosoftoauthtransienterrorutil.isMicrosoftOAuthTransientError)('AADSTS650051')).toBe(false);
        expect((0, _ismicrosoftoauthtransienterrorutil.isMicrosoftOAuthTransientError)(null)).toBe(false);
    });
});

//# sourceMappingURL=is-microsoft-oauth-transient-error.util.spec.js.map
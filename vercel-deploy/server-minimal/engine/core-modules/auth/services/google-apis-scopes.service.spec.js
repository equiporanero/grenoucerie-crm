"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _getgoogleapisoauthscopes = require("../utils/get-google-apis-oauth-scopes");
const _googleapisscopesserviceutil = require("./google-apis-scopes.service.util");
describe('GoogleAPIScopesService', ()=>{
    describe('includesExpectedScopes', ()=>{
        it('should return true when all expected scopes are present', ()=>{
            const scopes = [
                'email',
                'profile',
                'https://www.googleapis.com/auth/gmail.readonly',
                'https://www.googleapis.com/auth/calendar.events'
            ];
            const expectedScopes = [
                'email',
                'profile'
            ];
            const result = (0, _googleapisscopesserviceutil.includesExpectedScopes)(scopes, expectedScopes);
            expect(result).toBe(true);
        });
        it('should return false when some expected scopes are missing', ()=>{
            const scopes = [
                'email',
                'profile'
            ];
            const expectedScopes = [
                'email',
                'profile',
                'https://www.googleapis.com/auth/gmail.readonly'
            ];
            const result = (0, _googleapisscopesserviceutil.includesExpectedScopes)(scopes, expectedScopes);
            expect(result).toBe(false);
        });
        it('should return true when expected scopes match with userinfo prefix fallback', ()=>{
            const scopes = [
                'https://www.googleapis.com/auth/userinfo.email',
                'https://www.googleapis.com/auth/userinfo.profile'
            ];
            const expectedScopes = [
                'email',
                'profile'
            ];
            const result = (0, _googleapisscopesserviceutil.includesExpectedScopes)(scopes, expectedScopes);
            expect(result).toBe(true);
        });
        it('should return true when some scopes are direct matches and others use userinfo prefix', ()=>{
            const scopes = [
                'email',
                'https://www.googleapis.com/auth/userinfo.profile',
                'https://www.googleapis.com/auth/gmail.readonly'
            ];
            const expectedScopes = [
                'email',
                'profile'
            ];
            const result = (0, _googleapisscopesserviceutil.includesExpectedScopes)(scopes, expectedScopes);
            expect(result).toBe(true);
        });
        it('should return true when 0 expected scopes', ()=>{
            const scopes = [
                'email',
                'profile'
            ];
            const expectedScopes = [];
            const result = (0, _googleapisscopesserviceutil.includesExpectedScopes)(scopes, expectedScopes);
            expect(result).toBe(true);
        });
        it('should return false when 0 scopes but expected scopes', ()=>{
            const scopes = [];
            const expectedScopes = [
                'email',
                'profile'
            ];
            const result = (0, _googleapisscopesserviceutil.includesExpectedScopes)(scopes, expectedScopes);
            expect(result).toBe(false);
        });
        it('should return true when both empty', ()=>{
            const scopes = [];
            const expectedScopes = [];
            const result = (0, _googleapisscopesserviceutil.includesExpectedScopes)(scopes, expectedScopes);
            expect(result).toBe(true);
        });
        it('should handle case-sensitive scope matching', ()=>{
            const scopes = [
                'EMAIL',
                'PROFILE'
            ];
            const expectedScopes = [
                'email',
                'profile'
            ];
            const result = (0, _googleapisscopesserviceutil.includesExpectedScopes)(scopes, expectedScopes);
            expect(result).toBe(false);
        });
        it('should work with the current Google API scopes', ()=>{
            // What is currently returned by Google
            const actualGoogleScopes = [
                'https://www.googleapis.com/auth/calendar.events',
                'https://www.googleapis.com/auth/gmail.readonly',
                'https://www.googleapis.com/auth/gmail.send',
                'https://www.googleapis.com/auth/gmail.compose',
                'https://www.googleapis.com/auth/profile.emails.read',
                'https://www.googleapis.com/auth/userinfo.email',
                'https://www.googleapis.com/auth/userinfo.profile',
                'openid'
            ];
            const expectedScopes = (0, _getgoogleapisoauthscopes.getGoogleApisOauthScopes)();
            const result = (0, _googleapisscopesserviceutil.includesExpectedScopes)(actualGoogleScopes, expectedScopes);
            expect(result).toBe(true);
        });
    });
});

//# sourceMappingURL=google-apis-scopes.service.spec.js.map
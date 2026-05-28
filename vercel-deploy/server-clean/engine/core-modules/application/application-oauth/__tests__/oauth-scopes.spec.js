"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _oauthscopes = require("../constants/oauth-scopes");
describe('OAuth Scopes', ()=>{
    it('should have all scopes defined', ()=>{
        expect(_oauthscopes.ALL_OAUTH_SCOPES).toContain('api');
        expect(_oauthscopes.ALL_OAUTH_SCOPES).toContain('profile');
        expect(_oauthscopes.ALL_OAUTH_SCOPES).toHaveLength(2);
    });
    it('should have descriptions for all scopes', ()=>{
        for (const scope of _oauthscopes.ALL_OAUTH_SCOPES){
            expect(_oauthscopes.OAUTH_SCOPE_DESCRIPTIONS[scope]).toBeDefined();
            expect(_oauthscopes.OAUTH_SCOPE_DESCRIPTIONS[scope].length).toBeGreaterThan(0);
        }
    });
    it('should have consistent keys and values', ()=>{
        expect(_oauthscopes.OAUTH_SCOPES.API).toBe('api');
        expect(_oauthscopes.OAUTH_SCOPES.PROFILE).toBe('profile');
    });
});

//# sourceMappingURL=oauth-scopes.spec.js.map
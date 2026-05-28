"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _validateredirecturiutil = require("../validate-redirect-uri.util");
describe('validateRedirectUri', ()=>{
    it('should accept a valid HTTPS URI', ()=>{
        const result = (0, _validateredirecturiutil.validateRedirectUri)('https://example.com/callback');
        expect(result.valid).toBe(true);
        if (result.valid) {
            expect(result.parsed.href).toBe('https://example.com/callback');
        }
    });
    it('should accept localhost HTTP', ()=>{
        const result = (0, _validateredirecturiutil.validateRedirectUri)('http://localhost:3000/callback');
        expect(result.valid).toBe(true);
    });
    it('should accept 127.0.0.1 HTTP', ()=>{
        const result = (0, _validateredirecturiutil.validateRedirectUri)('http://127.0.0.1:8080/callback');
        expect(result.valid).toBe(true);
    });
    it('should reject non-HTTPS non-localhost URIs', ()=>{
        const result = (0, _validateredirecturiutil.validateRedirectUri)('http://example.com/callback');
        expect(result.valid).toBe(false);
        if (!result.valid) {
            expect(result.reason).toContain('HTTPS');
        }
    });
    it('should reject URIs with fragments', ()=>{
        const result = (0, _validateredirecturiutil.validateRedirectUri)('https://example.com/callback#section');
        expect(result.valid).toBe(false);
        if (!result.valid) {
            expect(result.reason).toContain('fragments');
        }
    });
    it('should reject invalid URIs', ()=>{
        const result = (0, _validateredirecturiutil.validateRedirectUri)('not-a-url');
        expect(result.valid).toBe(false);
        if (!result.valid) {
            expect(result.reason).toContain('Invalid redirect URI');
        }
    });
    it('should accept cursor:// custom scheme for desktop app OAuth', ()=>{
        const result = (0, _validateredirecturiutil.validateRedirectUri)('cursor://anysphere.cursor-mcp/oauth/callback');
        expect(result.valid).toBe(true);
    });
    it('should accept vscode:// custom scheme', ()=>{
        const result = (0, _validateredirecturiutil.validateRedirectUri)('vscode://vscode.github/oauth/callback');
        expect(result.valid).toBe(true);
    });
    it('should reject unknown custom schemes', ()=>{
        const result = (0, _validateredirecturiutil.validateRedirectUri)('evilapp://callback');
        expect(result.valid).toBe(false);
        if (!result.valid) {
            expect(result.reason).toContain('allowed custom scheme');
        }
    });
    it('should accept HTTPS with query parameters', ()=>{
        const result = (0, _validateredirecturiutil.validateRedirectUri)('https://example.com/callback?state=abc');
        expect(result.valid).toBe(true);
    });
    it('should accept HTTPS with port', ()=>{
        const result = (0, _validateredirecturiutil.validateRedirectUri)('https://example.com:8443/callback');
        expect(result.valid).toBe(true);
    });
});

//# sourceMappingURL=validate-redirect-uri.util.spec.js.map
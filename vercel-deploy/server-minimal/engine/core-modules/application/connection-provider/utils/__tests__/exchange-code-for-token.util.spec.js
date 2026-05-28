"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _exchangecodefortokenutil = require("../exchange-code-for-token.util");
const _exchangerefreshtokenfortokenutil = require("../exchange-refresh-token-for-token.util");
const buildResponse = (json, options = {})=>({
        ok: options.ok ?? true,
        status: options.status ?? 200,
        json: async ()=>json,
        text: async ()=>JSON.stringify(json)
    });
const baseExchangeArgs = {
    tokenEndpoint: 'https://example.com/token',
    contentType: 'form-urlencoded',
    clientId: 'cid',
    clientSecret: 'csec',
    code: 'c',
    redirectUri: 'https://example.com/cb',
    codeVerifier: null
};
describe('exchangeCodeForToken', ()=>{
    it('POSTs form-urlencoded with the OAuth2 standard fields and parses the response', async ()=>{
        const fetchFn = jest.fn(async ()=>buildResponse({
                access_token: 'lin_access',
                refresh_token: 'lin_refresh',
                expires_in: 315360000,
                scope: 'read write'
            }));
        const result = await (0, _exchangecodefortokenutil.exchangeCodeForToken)({
            ...baseExchangeArgs,
            fetchFn: fetchFn,
            codeVerifier: 'verifier_123'
        });
        expect(result).toEqual({
            accessToken: 'lin_access',
            refreshToken: 'lin_refresh',
            scopes: [
                'read',
                'write'
            ]
        });
        const init = fetchFn.mock.calls[0][1];
        expect(init.headers['Content-Type']).toBe('application/x-www-form-urlencoded');
        const params = new URLSearchParams(init.body);
        expect(params.get('grant_type')).toBe('authorization_code');
        expect(params.get('code')).toBe('c');
        expect(params.get('client_id')).toBe('cid');
        expect(params.get('client_secret')).toBe('csec');
        expect(params.get('code_verifier')).toBe('verifier_123');
    });
    it('POSTs JSON when contentType is json', async ()=>{
        const fetchFn = jest.fn(async ()=>buildResponse({
                access_token: 'a',
                refresh_token: 'r'
            }));
        await (0, _exchangecodefortokenutil.exchangeCodeForToken)({
            ...baseExchangeArgs,
            contentType: 'json',
            fetchFn: fetchFn
        });
        const init = fetchFn.mock.calls[0][1];
        expect(init.headers['Content-Type']).toBe('application/json');
        expect(JSON.parse(init.body)).toMatchObject({
            grant_type: 'authorization_code',
            code: 'c'
        });
    });
    it('throws on non-2xx response', async ()=>{
        const fetchFn = jest.fn(async ()=>buildResponse({
                error: 'invalid_grant'
            }, {
                ok: false,
                status: 400
            }));
        await expect((0, _exchangecodefortokenutil.exchangeCodeForToken)({
            ...baseExchangeArgs,
            fetchFn: fetchFn
        })).rejects.toThrow(/400/);
    });
    it('throws when 200 response is missing access_token', async ()=>{
        const fetchFn = jest.fn(async ()=>buildResponse({
                refresh_token: 'r'
            }));
        await expect((0, _exchangecodefortokenutil.exchangeCodeForToken)({
            ...baseExchangeArgs,
            fetchFn: fetchFn
        })).rejects.toThrow(/access_token/);
    });
});
describe('exchangeRefreshTokenForToken', ()=>{
    const baseRefreshArgs = {
        tokenEndpoint: 'https://example.com/token',
        contentType: 'form-urlencoded',
        clientId: 'cid',
        clientSecret: 'csec',
        refreshToken: 'old_refresh'
    };
    it('uses grant_type=refresh_token and returns the rotated tokens', async ()=>{
        const fetchFn = jest.fn(async ()=>buildResponse({
                access_token: 'new_access',
                refresh_token: 'new_refresh'
            }));
        const result = await (0, _exchangerefreshtokenfortokenutil.exchangeRefreshTokenForToken)({
            ...baseRefreshArgs,
            fetchFn: fetchFn
        });
        expect(result).toEqual({
            accessToken: 'new_access',
            refreshToken: 'new_refresh',
            scopes: null
        });
        const init = fetchFn.mock.calls[0][1];
        const params = new URLSearchParams(init.body);
        expect(params.get('grant_type')).toBe('refresh_token');
        expect(params.get('refresh_token')).toBe('old_refresh');
    });
    it('returns refreshToken=null when the provider omits it (caller applies fallback)', async ()=>{
        const fetchFn = jest.fn(async ()=>buildResponse({
                access_token: 'new_access'
            }));
        const result = await (0, _exchangerefreshtokenfortokenutil.exchangeRefreshTokenForToken)({
            ...baseRefreshArgs,
            fetchFn: fetchFn
        });
        expect(result.refreshToken).toBeNull();
    });
});

//# sourceMappingURL=exchange-code-for-token.util.spec.js.map
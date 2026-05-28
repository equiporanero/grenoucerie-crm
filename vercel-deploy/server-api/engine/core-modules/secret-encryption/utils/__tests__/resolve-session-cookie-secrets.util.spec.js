"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _crypto = require("crypto");
const _deriveinstancehmackeyutil = require("../derive-instance-hmac-key.util");
const _resolvesessioncookiesecretsutil = require("../resolve-session-cookie-secrets.util");
const buildConfig = (env)=>({
        get: jest.fn((key)=>env[key])
    });
const hmacFor = (rawKey)=>(0, _deriveinstancehmackeyutil.deriveInstanceHmacKey)({
        rawKey,
        purpose: 'session-cookie'
    }).toString('hex');
const legacyAppSecretHash = (appSecret)=>(0, _crypto.createHash)('sha256').update(`${appSecret}SESSION_STORE_SECRET`).digest('hex');
describe('resolveSessionCookieSecretsOrThrow', ()=>{
    it('throws when neither ENCRYPTION_KEY nor APP_SECRET is configured', ()=>{
        expect(()=>(0, _resolvesessioncookiesecretsutil.resolveSessionCookieSecretsOrThrow)({
                twentyConfigService: buildConfig({})
            })).toThrow(/ENCRYPTION_KEY/);
    });
    it('signs with ENCRYPTION_KEY first when set, with legacy APP_SECRET hash kept for verification', ()=>{
        const secrets = (0, _resolvesessioncookiesecretsutil.resolveSessionCookieSecretsOrThrow)({
            twentyConfigService: buildConfig({
                ENCRYPTION_KEY: 'new-key',
                APP_SECRET: 'app'
            })
        });
        expect(secrets[0]).toBe(hmacFor('new-key'));
        expect(secrets).toContain(legacyAppSecretHash('app'));
        expect(secrets).toHaveLength(2);
    });
    it('places FALLBACK_ENCRYPTION_KEY between the primary and the legacy slot', ()=>{
        const secrets = (0, _resolvesessioncookiesecretsutil.resolveSessionCookieSecretsOrThrow)({
            twentyConfigService: buildConfig({
                ENCRYPTION_KEY: 'new-key',
                FALLBACK_ENCRYPTION_KEY: 'previous-key',
                APP_SECRET: 'app'
            })
        });
        expect(secrets).toEqual([
            hmacFor('new-key'),
            hmacFor('previous-key'),
            legacyAppSecretHash('app')
        ]);
    });
    it('omits the FALLBACK slot when FALLBACK_ENCRYPTION_KEY is empty', ()=>{
        const secrets = (0, _resolvesessioncookiesecretsutil.resolveSessionCookieSecretsOrThrow)({
            twentyConfigService: buildConfig({
                ENCRYPTION_KEY: 'new-key',
                FALLBACK_ENCRYPTION_KEY: '',
                APP_SECRET: 'app'
            })
        });
        expect(secrets).toEqual([
            hmacFor('new-key'),
            legacyAppSecretHash('app')
        ]);
    });
    it('omits the legacy slot when APP_SECRET is unset', ()=>{
        const secrets = (0, _resolvesessioncookiesecretsutil.resolveSessionCookieSecretsOrThrow)({
            twentyConfigService: buildConfig({
                ENCRYPTION_KEY: 'new-key'
            })
        });
        expect(secrets).toEqual([
            hmacFor('new-key')
        ]);
    });
    it('falls back to HKDF(APP_SECRET) as primary when ENCRYPTION_KEY is unset, while keeping the legacy SHA slot', ()=>{
        const secrets = (0, _resolvesessioncookiesecretsutil.resolveSessionCookieSecretsOrThrow)({
            twentyConfigService: buildConfig({
                APP_SECRET: 'app'
            })
        });
        expect(secrets).toEqual([
            hmacFor('app'),
            legacyAppSecretHash('app')
        ]);
        expect(secrets[0]).not.toBe(secrets[1]);
    });
    it('derives different keys for different purposes (domain separation)', ()=>{
        const sessionCookieKey = (0, _deriveinstancehmackeyutil.deriveInstanceHmacKey)({
            rawKey: 'same',
            purpose: 'session-cookie'
        });
        const otherPurposeKey = (0, _deriveinstancehmackeyutil.deriveInstanceHmacKey)({
            rawKey: 'same',
            purpose: 'something-else'
        });
        expect(sessionCookieKey.equals(otherPurposeKey)).toBe(false);
    });
});

//# sourceMappingURL=resolve-session-cookie-secrets.util.spec.js.map
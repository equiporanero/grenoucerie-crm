"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _secretencryptionexception = require("../../exceptions/secret-encryption.exception");
const _resolveencryptionkeysorthrowutil = require("../resolve-encryption-keys-or-throw.util");
const buildDriver = (env)=>({
        get: jest.fn((key)=>env[key])
    });
describe('resolveEncryptionKeysOrThrow', ()=>{
    it('throws NO_ENCRYPTION_KEY_CONFIGURED when no key is set', ()=>{
        expect(()=>(0, _resolveencryptionkeysorthrowutil.resolveEncryptionKeysOrThrow)({
                environmentConfigDriver: buildDriver({})
            })).toThrow(expect.objectContaining({
            code: _secretencryptionexception.SecretEncryptionExceptionCode.NO_ENCRYPTION_KEY_CONFIGURED
        }));
    });
    it('uses APP_SECRET as primary when ENCRYPTION_KEY is unset', ()=>{
        const keys = (0, _resolveencryptionkeysorthrowutil.resolveEncryptionKeysOrThrow)({
            environmentConfigDriver: buildDriver({
                APP_SECRET: 'app'
            })
        });
        expect(keys.primary).toBe('app');
        expect(keys.fallback).toBeNull();
    });
    it('prefers ENCRYPTION_KEY over APP_SECRET when both are set', ()=>{
        const keys = (0, _resolveencryptionkeysorthrowutil.resolveEncryptionKeysOrThrow)({
            environmentConfigDriver: buildDriver({
                ENCRYPTION_KEY: 'new',
                APP_SECRET: 'old'
            })
        });
        expect(keys.primary).toBe('new');
    });
    it('exposes FALLBACK_ENCRYPTION_KEY when set', ()=>{
        const keys = (0, _resolveencryptionkeysorthrowutil.resolveEncryptionKeysOrThrow)({
            environmentConfigDriver: buildDriver({
                ENCRYPTION_KEY: 'new',
                FALLBACK_ENCRYPTION_KEY: 'old'
            })
        });
        expect(keys.primary).toBe('new');
        expect(keys.fallback).toBe('old');
    });
    it('returns null fallback when FALLBACK_ENCRYPTION_KEY is unset', ()=>{
        const keys = (0, _resolveencryptionkeysorthrowutil.resolveEncryptionKeysOrThrow)({
            environmentConfigDriver: buildDriver({
                ENCRYPTION_KEY: 'new'
            })
        });
        expect(keys.fallback).toBeNull();
    });
    it('treats empty-string env vars as unset', ()=>{
        const keys = (0, _resolveencryptionkeysorthrowutil.resolveEncryptionKeysOrThrow)({
            environmentConfigDriver: buildDriver({
                ENCRYPTION_KEY: '',
                APP_SECRET: 'app',
                FALLBACK_ENCRYPTION_KEY: ''
            })
        });
        expect(keys.primary).toBe('app');
        expect(keys.fallback).toBeNull();
    });
});

//# sourceMappingURL=resolve-encryption-keys-or-throw.util.spec.js.map
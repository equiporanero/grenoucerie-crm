"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _secretencryptionexception = require("../../exceptions/secret-encryption.exception");
const _computeencryptionkeyidutil = require("../compute-encryption-key-id.util");
const _pickencryptionkeybykeyidorthrowutil = require("../pick-encryption-key-by-key-id-or-throw.util");
describe('pickEncryptionKeyByKeyIdOrThrow', ()=>{
    const PRIMARY = 'primary-key-1234567890abcdefghij';
    const FALLBACK = 'fallback-key-zyxwvutsrqponmlkjihgf';
    it('returns the primary key when its fingerprint matches', ()=>{
        const keyId = (0, _computeencryptionkeyidutil.computeEncryptionKeyId)({
            rawKey: PRIMARY
        });
        expect((0, _pickencryptionkeybykeyidorthrowutil.pickEncryptionKeyByKeyIdOrThrow)({
            keyId,
            keys: {
                primary: PRIMARY,
                fallback: null
            }
        })).toBe(PRIMARY);
    });
    it('returns the fallback key when its fingerprint matches', ()=>{
        const keyId = (0, _computeencryptionkeyidutil.computeEncryptionKeyId)({
            rawKey: FALLBACK
        });
        expect((0, _pickencryptionkeybykeyidorthrowutil.pickEncryptionKeyByKeyIdOrThrow)({
            keyId,
            keys: {
                primary: PRIMARY,
                fallback: FALLBACK
            }
        })).toBe(FALLBACK);
    });
    it('prefers primary when both fingerprints would match', ()=>{
        const keyId = (0, _computeencryptionkeyidutil.computeEncryptionKeyId)({
            rawKey: PRIMARY
        });
        expect((0, _pickencryptionkeybykeyidorthrowutil.pickEncryptionKeyByKeyIdOrThrow)({
            keyId,
            keys: {
                primary: PRIMARY,
                fallback: PRIMARY
            }
        })).toBe(PRIMARY);
    });
    it('throws UNKNOWN_KEY_ID when no configured key matches', ()=>{
        expect(()=>(0, _pickencryptionkeybykeyidorthrowutil.pickEncryptionKeyByKeyIdOrThrow)({
                keyId: 'deadbeef',
                keys: {
                    primary: PRIMARY,
                    fallback: null
                }
            })).toThrow(expect.objectContaining({
            code: _secretencryptionexception.SecretEncryptionExceptionCode.UNKNOWN_KEY_ID
        }));
    });
    it('error message names the missing keyId for operator diagnostics', ()=>{
        expect(()=>(0, _pickencryptionkeybykeyidorthrowutil.pickEncryptionKeyByKeyIdOrThrow)({
                keyId: 'deadbeef',
                keys: {
                    primary: PRIMARY,
                    fallback: null
                }
            })).toThrow(/keyId 'deadbeef'/);
    });
});

//# sourceMappingURL=pick-encryption-key-by-key-id-or-throw.util.spec.js.map
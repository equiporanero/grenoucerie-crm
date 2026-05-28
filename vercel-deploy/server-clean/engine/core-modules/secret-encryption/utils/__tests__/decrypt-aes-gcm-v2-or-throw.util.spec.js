"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _secretencryptionexception = require("../../exceptions/secret-encryption.exception");
const _decryptaesgcmv2orthrowutil = require("../decrypt-aes-gcm-v2-or-throw.util");
const _encryptaesgcmv2util = require("../encrypt-aes-gcm-v2.util");
describe('decryptAesGcmV2OrThrow', ()=>{
    const KEY = 'gcm-test-key-zzzz1234567890abcdefghijkl';
    it('throws when decrypting with a different workspaceId (HKDF context binding)', ()=>{
        const ciphertext = (0, _encryptaesgcmv2util.encryptAesGcmV2)({
            plaintext: 'plaintext',
            rawKey: KEY,
            workspaceId: 'ws-1'
        });
        expect(()=>(0, _decryptaesgcmv2orthrowutil.decryptAesGcmV2OrThrow)({
                payloadBase64: ciphertext,
                rawKey: KEY,
                workspaceId: 'ws-2'
            })).toThrow();
    });
    it('throws when decrypting with a different key', ()=>{
        const ciphertext = (0, _encryptaesgcmv2util.encryptAesGcmV2)({
            plaintext: 'plaintext',
            rawKey: KEY,
            workspaceId: 'ws-1'
        });
        expect(()=>(0, _decryptaesgcmv2orthrowutil.decryptAesGcmV2OrThrow)({
                payloadBase64: ciphertext,
                rawKey: 'wrong-key',
                workspaceId: 'ws-1'
            })).toThrow();
    });
    it('throws when the ciphertext payload has been tampered with (GCM auth tag)', ()=>{
        const ciphertext = (0, _encryptaesgcmv2util.encryptAesGcmV2)({
            plaintext: 'plaintext',
            rawKey: KEY,
            workspaceId: 'ws-1'
        });
        // Base64 alphabet collisions and padding can make a 1-char flip a no-op.
        // Decode, flip one byte in the middle, re-encode.
        const buffer = Buffer.from(ciphertext, 'base64');
        const middle = Math.floor(buffer.length / 2);
        buffer[middle] = buffer[middle] ^ 0xff;
        const tampered = buffer.toString('base64');
        expect(()=>(0, _decryptaesgcmv2orthrowutil.decryptAesGcmV2OrThrow)({
                payloadBase64: tampered,
                rawKey: KEY,
                workspaceId: 'ws-1'
            })).toThrow();
    });
    it('throws CIPHERTEXT_TOO_SHORT on a payload that cannot contain IV + tag', ()=>{
        expect(()=>(0, _decryptaesgcmv2orthrowutil.decryptAesGcmV2OrThrow)({
                payloadBase64: 'AAAA',
                rawKey: KEY,
                workspaceId: 'ws-1'
            })).toThrow(expect.objectContaining({
            code: _secretencryptionexception.SecretEncryptionExceptionCode.CIPHERTEXT_TOO_SHORT
        }));
    });
});

//# sourceMappingURL=decrypt-aes-gcm-v2-or-throw.util.spec.js.map
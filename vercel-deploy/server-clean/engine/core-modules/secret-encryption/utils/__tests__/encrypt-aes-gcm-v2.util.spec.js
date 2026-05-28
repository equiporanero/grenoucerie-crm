"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _decryptaesgcmv2orthrowutil = require("../decrypt-aes-gcm-v2-or-throw.util");
const _encryptaesgcmv2util = require("../encrypt-aes-gcm-v2.util");
describe('encryptAesGcmV2', ()=>{
    const KEY = 'gcm-test-key-zzzz1234567890abcdefghijkl';
    it('produces a base64 payload that round-trips with workspaceId context', ()=>{
        const ciphertext = (0, _encryptaesgcmv2util.encryptAesGcmV2)({
            plaintext: 'plaintext',
            rawKey: KEY,
            workspaceId: 'ws-1'
        });
        expect((0, _decryptaesgcmv2orthrowutil.decryptAesGcmV2OrThrow)({
            payloadBase64: ciphertext,
            rawKey: KEY,
            workspaceId: 'ws-1'
        })).toBe('plaintext');
    });
    it('round-trips with no workspaceId (instance context)', ()=>{
        const ciphertext = (0, _encryptaesgcmv2util.encryptAesGcmV2)({
            plaintext: 'plaintext',
            rawKey: KEY
        });
        expect((0, _decryptaesgcmv2orthrowutil.decryptAesGcmV2OrThrow)({
            payloadBase64: ciphertext,
            rawKey: KEY
        })).toBe('plaintext');
    });
    it('produces a different ciphertext for the same plaintext under a different workspaceId', ()=>{
        const a = (0, _encryptaesgcmv2util.encryptAesGcmV2)({
            plaintext: 'plaintext',
            rawKey: KEY,
            workspaceId: 'ws-1'
        });
        const b = (0, _encryptaesgcmv2util.encryptAesGcmV2)({
            plaintext: 'plaintext',
            rawKey: KEY,
            workspaceId: 'ws-2'
        });
        expect(a).not.toBe(b);
    });
    it('produces a different ciphertext on every call (random IV)', ()=>{
        const a = (0, _encryptaesgcmv2util.encryptAesGcmV2)({
            plaintext: 'plaintext',
            rawKey: KEY,
            workspaceId: 'ws-1'
        });
        const b = (0, _encryptaesgcmv2util.encryptAesGcmV2)({
            plaintext: 'plaintext',
            rawKey: KEY,
            workspaceId: 'ws-1'
        });
        expect(a).not.toBe(b);
    });
    it('handles unicode and long plaintexts', ()=>{
        const plaintext = 'secret-with-émojis-🔐-and-中文-' + 'a'.repeat(2000);
        const ciphertext = (0, _encryptaesgcmv2util.encryptAesGcmV2)({
            plaintext,
            rawKey: KEY,
            workspaceId: 'ws-1'
        });
        expect((0, _decryptaesgcmv2orthrowutil.decryptAesGcmV2OrThrow)({
            payloadBase64: ciphertext,
            rawKey: KEY,
            workspaceId: 'ws-1'
        })).toBe(plaintext);
    });
});

//# sourceMappingURL=encrypt-aes-gcm-v2.util.spec.js.map
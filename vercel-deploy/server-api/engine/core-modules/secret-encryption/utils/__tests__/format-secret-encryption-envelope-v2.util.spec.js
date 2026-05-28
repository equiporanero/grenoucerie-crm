"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _secretencryptionconstant = require("../../constants/secret-encryption.constant");
const _formatsecretencryptionenvelopev2util = require("../format-secret-encryption-envelope-v2.util");
const _parsesecretencryptionenvelopeorthrowutil = require("../parse-secret-encryption-envelope-or-throw.util");
describe('formatSecretEncryptionEnvelopeV2', ()=>{
    it('concatenates the v2 prefix, keyId, and payload', ()=>{
        expect((0, _formatsecretencryptionenvelopev2util.formatSecretEncryptionEnvelopeV2)({
            keyId: 'abcd1234',
            payloadBase64: 'payload'
        })).toBe(`${_secretencryptionconstant.SECRET_ENCRYPTION_ENVELOPE_V2_PREFIX}abcd1234:payload`);
    });
    it('round-trips with parseSecretEncryptionEnvelopeOrThrow', ()=>{
        const envelope = (0, _formatsecretencryptionenvelopev2util.formatSecretEncryptionEnvelopeV2)({
            keyId: 'deadbeef',
            payloadBase64: 'cipherpayload'
        });
        const parsed = (0, _parsesecretencryptionenvelopeorthrowutil.parseSecretEncryptionEnvelopeOrThrow)({
            value: envelope
        });
        expect(parsed).toEqual({
            version: 2,
            keyId: 'deadbeef',
            payload: 'cipherpayload'
        });
    });
});

//# sourceMappingURL=format-secret-encryption-envelope-v2.util.spec.js.map
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _secretencryptionconstant = require("../../constants/secret-encryption.constant");
const _secretencryptionexception = require("../../exceptions/secret-encryption.exception");
const _parsesecretencryptionenvelopeorthrowutil = require("../parse-secret-encryption-envelope-or-throw.util");
describe('parseSecretEncryptionEnvelopeOrThrow', ()=>{
    it('returns version: null for an unprefixed value', ()=>{
        expect((0, _parsesecretencryptionenvelopeorthrowutil.parseSecretEncryptionEnvelopeOrThrow)({
            value: 'opaque-base64-string'
        })).toEqual({
            version: null
        });
    });
    it('returns version: null for the empty string', ()=>{
        expect((0, _parsesecretencryptionenvelopeorthrowutil.parseSecretEncryptionEnvelopeOrThrow)({
            value: ''
        })).toEqual({
            version: null
        });
    });
    it('parses a v2 envelope, splitting keyId and payload', ()=>{
        expect((0, _parsesecretencryptionenvelopeorthrowutil.parseSecretEncryptionEnvelopeOrThrow)({
            value: `${_secretencryptionconstant.SECRET_ENCRYPTION_ENVELOPE_V2_PREFIX}deadbeef:cipherpayload`
        })).toEqual({
            version: 2,
            keyId: 'deadbeef',
            payload: 'cipherpayload'
        });
    });
    it('throws MALFORMED_ENVELOPE on a v2 envelope missing the keyId separator', ()=>{
        expect(()=>(0, _parsesecretencryptionenvelopeorthrowutil.parseSecretEncryptionEnvelopeOrThrow)({
                value: `${_secretencryptionconstant.SECRET_ENCRYPTION_ENVELOPE_V2_PREFIX}no-separator`
            })).toThrow(expect.objectContaining({
            code: _secretencryptionexception.SecretEncryptionExceptionCode.MALFORMED_ENVELOPE
        }));
    });
    it('throws MALFORMED_ENVELOPE on a v2 envelope with an empty keyId', ()=>{
        expect(()=>(0, _parsesecretencryptionenvelopeorthrowutil.parseSecretEncryptionEnvelopeOrThrow)({
                value: `${_secretencryptionconstant.SECRET_ENCRYPTION_ENVELOPE_V2_PREFIX}:payload`
            })).toThrow(expect.objectContaining({
            code: _secretencryptionexception.SecretEncryptionExceptionCode.MALFORMED_ENVELOPE
        }));
    });
    it('throws INVALID_KEY_ID_FORMAT when keyId is not 8 hex characters', ()=>{
        expect(()=>(0, _parsesecretencryptionenvelopeorthrowutil.parseSecretEncryptionEnvelopeOrThrow)({
                value: `${_secretencryptionconstant.SECRET_ENCRYPTION_ENVELOPE_V2_PREFIX}NOTHEX!!:payload`
            })).toThrow(expect.objectContaining({
            code: _secretencryptionexception.SecretEncryptionExceptionCode.INVALID_KEY_ID_FORMAT
        }));
    });
    it('throws INVALID_KEY_ID_FORMAT when keyId is shorter than 8 chars', ()=>{
        expect(()=>(0, _parsesecretencryptionenvelopeorthrowutil.parseSecretEncryptionEnvelopeOrThrow)({
                value: `${_secretencryptionconstant.SECRET_ENCRYPTION_ENVELOPE_V2_PREFIX}abc:payload`
            })).toThrow(expect.objectContaining({
            code: _secretencryptionexception.SecretEncryptionExceptionCode.INVALID_KEY_ID_FORMAT
        }));
    });
    it('throws UNKNOWN_ENVELOPE_VERSION on an unknown envelope version (including the dropped v1)', ()=>{
        expect(()=>(0, _parsesecretencryptionenvelopeorthrowutil.parseSecretEncryptionEnvelopeOrThrow)({
                value: 'enc:v1:legacy'
            })).toThrow(expect.objectContaining({
            code: _secretencryptionexception.SecretEncryptionExceptionCode.UNKNOWN_ENVELOPE_VERSION
        }));
        expect(()=>(0, _parsesecretencryptionenvelopeorthrowutil.parseSecretEncryptionEnvelopeOrThrow)({
                value: 'enc:v99:whatever'
            })).toThrow(expect.objectContaining({
            code: _secretencryptionexception.SecretEncryptionExceptionCode.UNKNOWN_ENVELOPE_VERSION
        }));
    });
});

//# sourceMappingURL=parse-secret-encryption-envelope-or-throw.util.spec.js.map
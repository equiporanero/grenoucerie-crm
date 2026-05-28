"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "parseSecretEncryptionEnvelopeOrThrow", {
    enumerable: true,
    get: function() {
        return parseSecretEncryptionEnvelopeOrThrow;
    }
});
const _secretencryptionconstant = require("../constants/secret-encryption.constant");
const _secretencryptionexception = require("../exceptions/secret-encryption.exception");
const parseSecretEncryptionEnvelopeOrThrow = ({ value })=>{
    if (!value.startsWith(_secretencryptionconstant.SECRET_ENCRYPTION_ENVELOPE_PREFIX)) {
        return {
            version: null
        };
    }
    if (value.startsWith(_secretencryptionconstant.SECRET_ENCRYPTION_ENVELOPE_V2_PREFIX)) {
        const rest = value.slice(_secretencryptionconstant.SECRET_ENCRYPTION_ENVELOPE_V2_PREFIX.length);
        const separatorIndex = rest.indexOf(':');
        if (separatorIndex <= 0) {
            throw new _secretencryptionexception.SecretEncryptionException('Malformed enc:v2 envelope: missing keyId separator. Expected enc:v2:<keyId>:<payload>.', _secretencryptionexception.SecretEncryptionExceptionCode.MALFORMED_ENVELOPE);
        }
        const keyId = rest.slice(0, separatorIndex);
        const payload = rest.slice(separatorIndex + 1);
        if (!_secretencryptionconstant.SECRET_ENCRYPTION_KEY_ID_REGEX.test(keyId)) {
            throw new _secretencryptionexception.SecretEncryptionException(`Malformed enc:v2 envelope: keyId '${keyId}' is not 8 hex characters.`, _secretencryptionexception.SecretEncryptionExceptionCode.INVALID_KEY_ID_FORMAT);
        }
        return {
            version: 2,
            keyId,
            payload
        };
    }
    throw new _secretencryptionexception.SecretEncryptionException(`Unknown ciphertext envelope version. Value starts with '${value.slice(0, 16)}'.`, _secretencryptionexception.SecretEncryptionExceptionCode.UNKNOWN_ENVELOPE_VERSION);
};

//# sourceMappingURL=parse-secret-encryption-envelope-or-throw.util.js.map
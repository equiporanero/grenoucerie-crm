"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "decryptAesGcmV2OrThrow", {
    enumerable: true,
    get: function() {
        return decryptAesGcmV2OrThrow;
    }
});
const _crypto = require("crypto");
const _secretencryptionconstant = require("../constants/secret-encryption.constant");
const _secretencryptionexception = require("../exceptions/secret-encryption.exception");
const _derivegcmkeyutil = require("./derive-gcm-key.util");
const decryptAesGcmV2OrThrow = ({ payloadBase64, rawKey, workspaceId })=>{
    const buffer = Buffer.from(payloadBase64, 'base64');
    if (buffer.length < _secretencryptionconstant.SECRET_ENCRYPTION_GCM_IV_LENGTH + _secretencryptionconstant.SECRET_ENCRYPTION_GCM_TAG_LENGTH) {
        throw new _secretencryptionexception.SecretEncryptionException('v2 ciphertext payload is too short to contain an IV and an auth tag.', _secretencryptionexception.SecretEncryptionExceptionCode.CIPHERTEXT_TOO_SHORT);
    }
    const iv = buffer.subarray(0, _secretencryptionconstant.SECRET_ENCRYPTION_GCM_IV_LENGTH);
    const authTag = buffer.subarray(buffer.length - _secretencryptionconstant.SECRET_ENCRYPTION_GCM_TAG_LENGTH);
    const ciphertext = buffer.subarray(_secretencryptionconstant.SECRET_ENCRYPTION_GCM_IV_LENGTH, buffer.length - _secretencryptionconstant.SECRET_ENCRYPTION_GCM_TAG_LENGTH);
    const key = (0, _derivegcmkeyutil.deriveGcmKey)({
        rawKey,
        workspaceId
    });
    const decipher = (0, _crypto.createDecipheriv)('aes-256-gcm', key, iv);
    decipher.setAuthTag(authTag);
    return Buffer.concat([
        decipher.update(ciphertext),
        decipher.final()
    ]).toString('utf8');
};

//# sourceMappingURL=decrypt-aes-gcm-v2-or-throw.util.js.map
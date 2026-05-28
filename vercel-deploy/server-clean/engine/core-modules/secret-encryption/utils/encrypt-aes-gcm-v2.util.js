"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "encryptAesGcmV2", {
    enumerable: true,
    get: function() {
        return encryptAesGcmV2;
    }
});
const _crypto = require("crypto");
const _secretencryptionconstant = require("../constants/secret-encryption.constant");
const _derivegcmkeyutil = require("./derive-gcm-key.util");
const encryptAesGcmV2 = ({ plaintext, rawKey, workspaceId })=>{
    const key = (0, _derivegcmkeyutil.deriveGcmKey)({
        rawKey,
        workspaceId
    });
    const iv = (0, _crypto.randomBytes)(_secretencryptionconstant.SECRET_ENCRYPTION_GCM_IV_LENGTH);
    const cipher = (0, _crypto.createCipheriv)('aes-256-gcm', key, iv);
    const ciphertext = Buffer.concat([
        cipher.update(plaintext, 'utf8'),
        cipher.final()
    ]);
    const authTag = cipher.getAuthTag();
    return Buffer.concat([
        iv,
        ciphertext,
        authTag
    ]).toString('base64');
};

//# sourceMappingURL=encrypt-aes-gcm-v2.util.js.map
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "resolveEncryptionKeysOrThrow", {
    enumerable: true,
    get: function() {
        return resolveEncryptionKeysOrThrow;
    }
});
const _guards = require("@sniptt/guards");
const _secretencryptionexception = require("../exceptions/secret-encryption.exception");
const resolveEncryptionKeysOrThrow = ({ environmentConfigDriver })=>{
    const encryptionKey = environmentConfigDriver.get('ENCRYPTION_KEY');
    const fallbackEncryptionKey = environmentConfigDriver.get('FALLBACK_ENCRYPTION_KEY');
    const appSecret = environmentConfigDriver.get('APP_SECRET');
    const primary = (0, _guards.isNonEmptyString)(encryptionKey) ? encryptionKey : appSecret;
    if (!(0, _guards.isNonEmptyString)(primary)) {
        throw new _secretencryptionexception.SecretEncryptionException('No encryption key configured: set ENCRYPTION_KEY (or APP_SECRET for legacy deployments).', _secretencryptionexception.SecretEncryptionExceptionCode.NO_ENCRYPTION_KEY_CONFIGURED);
    }
    const fallback = (0, _guards.isNonEmptyString)(fallbackEncryptionKey) ? fallbackEncryptionKey : null;
    return {
        primary,
        fallback
    };
};

//# sourceMappingURL=resolve-encryption-keys-or-throw.util.js.map
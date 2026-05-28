"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildRotationErrorMessage", {
    enumerable: true,
    get: function() {
        return buildRotationErrorMessage;
    }
});
const _secretencryptionexception = require("../../../../engine/core-modules/secret-encryption/exceptions/secret-encryption.exception");
const buildRotationErrorMessage = (siteName, rowId, error)=>{
    if (error instanceof _secretencryptionexception.SecretEncryptionException && error.code === _secretencryptionexception.SecretEncryptionExceptionCode.UNKNOWN_KEY_ID) {
        return `[${siteName}] row ${rowId}: ${error.message} The row is encrypted with a key that is neither ENCRYPTION_KEY nor FALLBACK_ENCRYPTION_KEY — set FALLBACK_ENCRYPTION_KEY to the key that produced this envelope (e.g. after a partial earlier rotation).`;
    }
    const detail = error instanceof Error ? error.message : String(error);
    return `[${siteName}] row ${rowId}: failed to re-encrypt: ${detail}`;
};

//# sourceMappingURL=build-rotation-error-message.util.js.map
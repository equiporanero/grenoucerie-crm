"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "pickEncryptionKeyByKeyIdOrThrow", {
    enumerable: true,
    get: function() {
        return pickEncryptionKeyByKeyIdOrThrow;
    }
});
const _utils = require("twenty-shared/utils");
const _secretencryptionexception = require("../exceptions/secret-encryption.exception");
const _computeencryptionkeyidutil = require("./compute-encryption-key-id.util");
const pickEncryptionKeyByKeyIdOrThrow = ({ keyId, keys })=>{
    if ((0, _computeencryptionkeyidutil.computeEncryptionKeyId)({
        rawKey: keys.primary
    }) === keyId) {
        return keys.primary;
    }
    if ((0, _utils.isDefined)(keys.fallback) && (0, _computeencryptionkeyidutil.computeEncryptionKeyId)({
        rawKey: keys.fallback
    }) === keyId) {
        return keys.fallback;
    }
    throw new _secretencryptionexception.SecretEncryptionException(`No encryption key matches keyId '${keyId}'. Configure FALLBACK_ENCRYPTION_KEY with the key that encrypted this row.`, _secretencryptionexception.SecretEncryptionExceptionCode.UNKNOWN_KEY_ID);
};

//# sourceMappingURL=pick-encryption-key-by-key-id-or-throw.util.js.map
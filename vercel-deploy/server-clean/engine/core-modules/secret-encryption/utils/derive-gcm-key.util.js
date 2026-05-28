"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "deriveGcmKey", {
    enumerable: true,
    get: function() {
        return deriveGcmKey;
    }
});
const _crypto = require("crypto");
const _secretencryptionconstant = require("../constants/secret-encryption.constant");
const ZERO_SALT = Buffer.alloc(32);
const deriveGcmKey = ({ rawKey, workspaceId })=>Buffer.from((0, _crypto.hkdfSync)('sha256', Buffer.from(rawKey), ZERO_SALT, Buffer.from(`${_secretencryptionconstant.SECRET_ENCRYPTION_HKDF_INFO_PREFIX}${workspaceId ?? _secretencryptionconstant.SECRET_ENCRYPTION_INSTANCE_CONTEXT}`), _secretencryptionconstant.SECRET_ENCRYPTION_DERIVED_KEY_LENGTH));

//# sourceMappingURL=derive-gcm-key.util.js.map
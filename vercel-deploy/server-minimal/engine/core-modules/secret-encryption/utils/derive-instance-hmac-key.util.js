"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "deriveInstanceHmacKey", {
    enumerable: true,
    get: function() {
        return deriveInstanceHmacKey;
    }
});
const _crypto = require("crypto");
const _secretencryptionconstant = require("../constants/secret-encryption.constant");
const ZERO_SALT = Buffer.alloc(32);
const deriveInstanceHmacKey = ({ rawKey, purpose })=>Buffer.from((0, _crypto.hkdfSync)('sha256', Buffer.from(rawKey), ZERO_SALT, Buffer.from(`${_secretencryptionconstant.INSTANCE_HMAC_HKDF_INFO_PREFIX}${purpose}`), _secretencryptionconstant.INSTANCE_HMAC_DERIVED_KEY_LENGTH));

//# sourceMappingURL=derive-instance-hmac-key.util.js.map
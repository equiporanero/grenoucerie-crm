"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "formatSecretEncryptionEnvelopeV2", {
    enumerable: true,
    get: function() {
        return formatSecretEncryptionEnvelopeV2;
    }
});
const _secretencryptionconstant = require("../constants/secret-encryption.constant");
const formatSecretEncryptionEnvelopeV2 = ({ keyId, payloadBase64 })=>`${_secretencryptionconstant.SECRET_ENCRYPTION_ENVELOPE_V2_PREFIX}${keyId}:${payloadBase64}`;

//# sourceMappingURL=format-secret-encryption-envelope-v2.util.js.map
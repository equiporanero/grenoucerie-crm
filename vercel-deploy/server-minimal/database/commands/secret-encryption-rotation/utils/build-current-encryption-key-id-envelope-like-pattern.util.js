"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildCurrentEncryptionKeyIdEnvelopeLikePattern", {
    enumerable: true,
    get: function() {
        return buildCurrentEncryptionKeyIdEnvelopeLikePattern;
    }
});
const _secretencryptionconstant = require("../../../../engine/core-modules/secret-encryption/constants/secret-encryption.constant");
const buildCurrentEncryptionKeyIdEnvelopeLikePattern = (currentEncryptionKeyId)=>`${_secretencryptionconstant.SECRET_ENCRYPTION_ENVELOPE_V2_PREFIX}${currentEncryptionKeyId}:%`;

//# sourceMappingURL=build-current-encryption-key-id-envelope-like-pattern.util.js.map
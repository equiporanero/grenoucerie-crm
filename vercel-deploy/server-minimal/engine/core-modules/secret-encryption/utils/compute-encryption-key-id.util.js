"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeEncryptionKeyId", {
    enumerable: true,
    get: function() {
        return computeEncryptionKeyId;
    }
});
const _crypto = require("crypto");
const computeEncryptionKeyId = ({ rawKey })=>(0, _crypto.createHash)('sha256').update(rawKey).digest('hex').slice(0, 8);

//# sourceMappingURL=compute-encryption-key-id.util.js.map
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "decryptAesCtrOrThrow", {
    enumerable: true,
    get: function() {
        return decryptAesCtrOrThrow;
    }
});
const _crypto = require("crypto");
const deriveCtrKey = (rawKey)=>(0, _crypto.createHash)('sha512').update(rawKey).digest('hex').substring(0, 32);
const decryptAesCtrOrThrow = ({ ciphertext, rawKey })=>{
    const buffer = Buffer.from(ciphertext, 'base64');
    const iv = buffer.subarray(0, 16);
    const payload = buffer.subarray(16);
    const keyHash = deriveCtrKey(rawKey);
    const decipher = (0, _crypto.createDecipheriv)('aes-256-ctr', keyHash, iv);
    return Buffer.concat([
        decipher.update(payload),
        decipher.final()
    ]).toString();
};

//# sourceMappingURL=decrypt-aes-ctr-or-throw.util.js.map
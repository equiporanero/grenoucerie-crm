"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "encryptAesCtr", {
    enumerable: true,
    get: function() {
        return encryptAesCtr;
    }
});
const _crypto = require("crypto");
const deriveCtrKey = (rawKey)=>(0, _crypto.createHash)('sha512').update(rawKey).digest('hex').substring(0, 32);
const encryptAesCtr = ({ plaintext, rawKey })=>{
    const keyHash = deriveCtrKey(rawKey);
    const iv = (0, _crypto.randomBytes)(16);
    const cipher = (0, _crypto.createCipheriv)('aes-256-ctr', keyHash, iv);
    return Buffer.concat([
        iv,
        cipher.update(plaintext),
        cipher.final()
    ]).toString('base64');
};

//# sourceMappingURL=encrypt-aes-ctr.util.js.map
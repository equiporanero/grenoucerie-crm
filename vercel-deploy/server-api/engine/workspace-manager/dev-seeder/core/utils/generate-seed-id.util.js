"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "generateSeedId", {
    enumerable: true,
    get: function() {
        return generateSeedId;
    }
});
const _crypto = require("crypto");
const generateSeedId = (workspaceId, seedName)=>{
    const hash = (0, _crypto.createHash)('sha256').update(`${workspaceId}-${seedName}`).digest('hex');
    return [
        hash.substring(0, 8),
        hash.substring(8, 12),
        '4' + hash.substring(13, 16),
        (parseInt(hash.substring(16, 17), 16) & 0x3 | 0x8).toString(16) + hash.substring(17, 20),
        hash.substring(20, 32)
    ].join('-');
};

//# sourceMappingURL=generate-seed-id.util.js.map
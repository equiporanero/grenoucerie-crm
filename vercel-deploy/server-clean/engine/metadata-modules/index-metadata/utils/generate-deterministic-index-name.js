"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "generateDeterministicIndexName", {
    enumerable: true,
    get: function() {
        return generateDeterministicIndexName;
    }
});
const _crypto = require("crypto");
const generateDeterministicIndexName = (columns)=>{
    const hash = (0, _crypto.createHash)('sha256');
    columns.forEach((column)=>{
        hash.update(column);
    });
    return hash.digest('hex').slice(0, 27);
};

//# sourceMappingURL=generate-deterministic-index-name.js.map
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "generateDeterministicIndexNameV2", {
    enumerable: true,
    get: function() {
        return generateDeterministicIndexNameV2;
    }
});
const _crypto = require("crypto");
const _computetablenameutil = require("../../../utils/compute-table-name.util");
const generateDeterministicIndexNameV2 = ({ orderedIndexColumnNames, flatObjectMetadata, isUnique = false, indexWhereClause })=>{
    const hash = (0, _crypto.createHash)('sha256');
    const tableName = (0, _computetablenameutil.computeTableName)(flatObjectMetadata.nameSingular, flatObjectMetadata.isCustom);
    [
        tableName,
        ...orderedIndexColumnNames
    ].forEach((column)=>{
        hash.update(column);
    });
    if (indexWhereClause) {
        hash.update(indexWhereClause);
    }
    return `IDX_${isUnique ? 'UNIQUE_' : ''}${hash.digest('hex').slice(0, 27)}`;
};

//# sourceMappingURL=generate-deterministic-index-name-v2.js.map
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeUniqueFieldMetadataIdsFromIndexes", {
    enumerable: true,
    get: function() {
        return computeUniqueFieldMetadataIdsFromIndexes;
    }
});
const computeUniqueFieldMetadataIdsFromIndexes = (indexes)=>{
    const set = new Set();
    for (const index of indexes){
        if (!index.isUnique) continue;
        const fields = index.flatIndexFieldMetadatas ?? index.indexFieldMetadatas;
        if (fields?.length !== 1) continue;
        if (fields[0].subFieldName !== null) continue;
        set.add(fields[0].fieldMetadataId);
    }
    return set;
};

//# sourceMappingURL=compute-unique-field-metadata-ids-from-indexes.util.js.map
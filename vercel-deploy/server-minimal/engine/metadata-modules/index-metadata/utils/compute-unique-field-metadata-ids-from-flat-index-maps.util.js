"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeUniqueFieldMetadataIdsFromFlatIndexMaps", {
    enumerable: true,
    get: function() {
        return computeUniqueFieldMetadataIdsFromFlatIndexMaps;
    }
});
const _utils = require("twenty-shared/utils");
const _computeuniquefieldmetadataidsfromindexesutil = require("./compute-unique-field-metadata-ids-from-indexes.util");
const computeUniqueFieldMetadataIdsFromFlatIndexMaps = (flatIndexMaps)=>(0, _computeuniquefieldmetadataidsfromindexesutil.computeUniqueFieldMetadataIdsFromIndexes)(Object.values(flatIndexMaps.byUniversalIdentifier).filter(_utils.isDefined));

//# sourceMappingURL=compute-unique-field-metadata-ids-from-flat-index-maps.util.js.map
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getMetadataManyToOneRelatedNames", {
    enumerable: true,
    get: function() {
        return getMetadataManyToOneRelatedNames;
    }
});
const _allmanytoonemetadatarelationsconstant = require("../constant/all-many-to-one-metadata-relations.constant");
const getMetadataManyToOneRelatedNames = (metadataName)=>{
    return Object.values(_allmanytoonemetadatarelationsconstant.ALL_MANY_TO_ONE_METADATA_RELATIONS[metadataName]).filter((relation)=>relation !== null).map((relation)=>relation.metadataName);
};

//# sourceMappingURL=get-metadata-many-to-one-related-names.util.js.map
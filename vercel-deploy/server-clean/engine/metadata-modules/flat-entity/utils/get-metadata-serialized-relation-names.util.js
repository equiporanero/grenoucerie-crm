"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getMetadataSerializedRelationNames", {
    enumerable: true,
    get: function() {
        return getMetadataSerializedRelationNames;
    }
});
const _allmetadataserializedrelationconstant = require("../constant/all-metadata-serialized-relation.constant");
const getMetadataSerializedRelationNames = (metadataName)=>{
    return Object.keys(_allmetadataserializedrelationconstant.ALL_METADATA_SERIALIZED_RELATION[metadataName]);
};

//# sourceMappingURL=get-metadata-serialized-relation-names.util.js.map
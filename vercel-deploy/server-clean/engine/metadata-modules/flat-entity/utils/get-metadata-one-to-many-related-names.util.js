"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getMetadataOneToManyRelatedNames", {
    enumerable: true,
    get: function() {
        return getMetadataOneToManyRelatedNames;
    }
});
const _allonetomanymetadatarelationsconstant = require("../constant/all-one-to-many-metadata-relations.constant");
const getMetadataOneToManyRelatedNames = (metadataName)=>{
    return Object.values(_allonetomanymetadatarelationsconstant.ALL_ONE_TO_MANY_METADATA_RELATIONS[metadataName]).filter((relation)=>relation !== null).map((relation)=>relation.metadataName);
};

//# sourceMappingURL=get-metadata-one-to-many-related-names.util.js.map
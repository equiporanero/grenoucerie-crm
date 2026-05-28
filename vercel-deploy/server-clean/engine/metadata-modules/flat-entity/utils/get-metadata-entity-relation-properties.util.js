"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getMetadataEntityRelationProperties", {
    enumerable: true,
    get: function() {
        return getMetadataEntityRelationProperties;
    }
});
const _allmanytoonemetadatarelationsconstant = require("../constant/all-many-to-one-metadata-relations.constant");
const _allonetomanymetadatarelationsconstant = require("../constant/all-one-to-many-metadata-relations.constant");
const getMetadataEntityRelationProperties = (metadataName)=>{
    return [
        ...Object.keys(_allmanytoonemetadatarelationsconstant.ALL_MANY_TO_ONE_METADATA_RELATIONS[metadataName]),
        ...Object.keys(_allonetomanymetadatarelationsconstant.ALL_ONE_TO_MANY_METADATA_RELATIONS[metadataName])
    ];
};

//# sourceMappingURL=get-metadata-entity-relation-properties.util.js.map
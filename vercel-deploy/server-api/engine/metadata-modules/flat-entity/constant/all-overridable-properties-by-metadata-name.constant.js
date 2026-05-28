"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ALL_OVERRIDABLE_PROPERTIES_BY_METADATA_NAME", {
    enumerable: true,
    get: function() {
        return ALL_OVERRIDABLE_PROPERTIES_BY_METADATA_NAME;
    }
});
const _metadata = require("twenty-shared/metadata");
const _allentitypropertiesconfigurationbymetadatanameconstant = require("./all-entity-properties-configuration-by-metadata-name.constant");
const computeOverridableProperties = (metadataName)=>{
    const config = _allentitypropertiesconfigurationbymetadatanameconstant.ALL_ENTITY_PROPERTIES_CONFIGURATION_BY_METADATA_NAME[metadataName];
    return Object.entries(config).filter(([_, conf])=>conf.isOverridable === true).map(([property])=>property);
};
const ALL_OVERRIDABLE_PROPERTIES_BY_METADATA_NAME = Object.values(_metadata.ALL_METADATA_NAME).reduce((acc, metadataName)=>({
        ...acc,
        [metadataName]: computeOverridableProperties(metadataName)
    }), {});

//# sourceMappingURL=all-overridable-properties-by-metadata-name.constant.js.map
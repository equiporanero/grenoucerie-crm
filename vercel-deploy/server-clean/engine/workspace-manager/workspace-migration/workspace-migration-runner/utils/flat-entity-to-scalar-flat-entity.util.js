"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "flatEntityToScalarFlatEntity", {
    enumerable: true,
    get: function() {
        return flatEntityToScalarFlatEntity;
    }
});
const _allentitypropertiesconfigurationbymetadatanameconstant = require("../../../../metadata-modules/flat-entity/constant/all-entity-properties-configuration-by-metadata-name.constant");
const flatEntityToScalarFlatEntity = ({ metadataName, flatEntity })=>{
    const config = _allentitypropertiesconfigurationbymetadatanameconstant.ALL_ENTITY_PROPERTIES_CONFIGURATION_BY_METADATA_NAME[metadataName];
    const result = {};
    const flatEntityRecord = flatEntity;
    for (const key of Object.keys(config)){
        result[key] = flatEntityRecord[key];
    }
    result.id = flatEntityRecord.id;
    result.workspaceId = flatEntityRecord.workspaceId;
    result.applicationId = flatEntityRecord.applicationId;
    result.universalIdentifier = flatEntityRecord.universalIdentifier;
    return result;
};

//# sourceMappingURL=flat-entity-to-scalar-flat-entity.util.js.map
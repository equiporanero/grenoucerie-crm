"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getMetadataRelatedMetadataNamesForValidation", {
    enumerable: true,
    get: function() {
        return getMetadataRelatedMetadataNamesForValidation;
    }
});
const _allmetadatarequiredmetadataforvalidationconstant = require("../constant/all-metadata-required-metadata-for-validation.constant");
const getMetadataRelatedMetadataNamesForValidation = (metadataName)=>{
    return Object.keys(_allmetadatarequiredmetadataforvalidationconstant.ALL_METADATA_REQUIRED_METADATA_FOR_VALIDATION[metadataName]);
};

//# sourceMappingURL=get-metadata-related-metadata-names-for-validation.util.js.map
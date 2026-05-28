"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildDescriptionForRelationFieldMetadataOnFromField", {
    enumerable: true,
    get: function() {
        return buildDescriptionForRelationFieldMetadataOnFromField;
    }
});
const _utils = require("twenty-shared/utils");
const buildDescriptionForRelationFieldMetadataOnFromField = ({ relationObjectMetadataNamePlural, targetObjectLabelSingular })=>{
    const description = `${(0, _utils.capitalize)(relationObjectMetadataNamePlural)} tied to the ${targetObjectLabelSingular}`;
    return {
        description
    };
};

//# sourceMappingURL=build-description-for-relation-field-on-from-field.util.js.map
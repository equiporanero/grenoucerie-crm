"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildDescriptionForRelationFieldMetadataOnToField", {
    enumerable: true,
    get: function() {
        return buildDescriptionForRelationFieldMetadataOnToField;
    }
});
const _utils = require("twenty-shared/utils");
const buildDescriptionForRelationFieldMetadataOnToField = ({ relationObjectMetadataNamePlural, targetObjectLabelSingular })=>{
    const description = `${(0, _utils.capitalize)(relationObjectMetadataNamePlural)} ${targetObjectLabelSingular}`;
    return {
        description
    };
};

//# sourceMappingURL=build-description-for-relation-field-on-to-field.util.js.map
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "shouldGenerateFieldFakeValue", {
    enumerable: true,
    get: function() {
        return shouldGenerateFieldFakeValue;
    }
});
const _types = require("twenty-shared/types");
const _isflatfieldmetadataoftypeutil = require("../../../../../engine/metadata-modules/flat-field-metadata/utils/is-flat-field-metadata-of-type.util");
const _ismorphorrelationflatfieldmetadatautil = require("../../../../../engine/metadata-modules/flat-field-metadata/utils/is-morph-or-relation-flat-field-metadata.util");
const EXCLUDED_SYSTEM_FIELDS = [
    'searchVector',
    'position'
];
const isActiveField = (field)=>{
    return field.isActive;
};
const isExcludedSystemField = (field)=>{
    return field.isSystem && EXCLUDED_SYSTEM_FIELDS.includes(field.name);
};
const isManyToOneRelationField = (field)=>{
    if ((0, _isflatfieldmetadataoftypeutil.isFlatFieldMetadataOfType)(field, _types.FieldMetadataType.RELATION)) {
        return field.settings?.relationType === _types.RelationType.MANY_TO_ONE;
    }
    return false;
};
const isExcludedRelationField = (field)=>{
    return (0, _ismorphorrelationflatfieldmetadatautil.isMorphOrRelationFlatFieldMetadata)(field) && !isManyToOneRelationField(field);
};
const shouldGenerateFieldFakeValue = (field)=>{
    return isActiveField(field) && !isExcludedSystemField(field) && !isExcludedRelationField(field);
};

//# sourceMappingURL=should-generate-field-fake-value.js.map
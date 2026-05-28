"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateMorphOrRelationFlatFieldOnDelete", {
    enumerable: true,
    get: function() {
        return validateMorphOrRelationFlatFieldOnDelete;
    }
});
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _fieldmetadataexception = require("../../../field-metadata/field-metadata.exception");
const validateMorphOrRelationFlatFieldOnDelete = ({ universalFlatFieldMetadata })=>{
    const errors = [];
    if (!(0, _utils.isDefined)(universalFlatFieldMetadata.universalSettings?.relationType)) {
        return errors;
    }
    if ((0, _utils.isDefined)(universalFlatFieldMetadata.universalSettings.onDelete) && universalFlatFieldMetadata.universalSettings.relationType !== _types.RelationType.MANY_TO_ONE) {
        errors.push({
            code: _fieldmetadataexception.FieldMetadataExceptionCode.INVALID_FIELD_INPUT,
            message: 'On delete action is only supported for many to one relations',
            userFriendlyMessage: /*i18n*/ {
                id: "Tp2ptT",
                message: "On delete action is only supported for many to one relations"
            }
        });
    }
    return errors;
};

//# sourceMappingURL=validate-morph-or-relation-flat-field-on-delete.util.js.map
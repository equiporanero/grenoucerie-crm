"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "formatColumnNameForRelationField", {
    enumerable: true,
    get: function() {
        return formatColumnNameForRelationField;
    }
});
const _computemorphorrelationfieldjoincolumnnameutil = require("../../metadata-modules/field-metadata/utils/compute-morph-or-relation-field-join-column-name.util");
const _types = require("twenty-shared/types");
const formatColumnNameForRelationField = (fieldName, fieldMetadataSettings)=>{
    if (fieldMetadataSettings.relationType === _types.RelationType.ONE_TO_MANY) {
        throw new Error('No column exists for one to many relation fields');
    }
    if (fieldMetadataSettings.relationType === _types.RelationType.MANY_TO_ONE) {
        return (0, _computemorphorrelationfieldjoincolumnnameutil.computeMorphOrRelationFieldJoinColumnName)({
            name: fieldName
        });
    }
    return fieldName;
};

//# sourceMappingURL=format-column-name-for-relation-field.util.js.map
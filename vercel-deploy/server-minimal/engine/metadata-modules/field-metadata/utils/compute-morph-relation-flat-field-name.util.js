"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeMorphRelationFlatFieldName", {
    enumerable: true,
    get: function() {
        return computeMorphRelationFlatFieldName;
    }
});
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _fieldmetadataexception = require("../field-metadata.exception");
const computeMorphRelationFlatFieldName = ({ fieldName, relationType, targetObjectMetadataNameSingular: nameSingular, targetObjectMetadataNamePlural: namePlural })=>{
    if (relationType === _types.RelationType.MANY_TO_ONE) {
        return `${fieldName}${(0, _utils.capitalize)(nameSingular)}`;
    }
    if (relationType === _types.RelationType.ONE_TO_MANY) {
        return `${fieldName}${(0, _utils.capitalize)(namePlural)}`;
    }
    throw new _fieldmetadataexception.FieldMetadataException(`Invalid relation type (${relationType}) for field ${fieldName} on ${nameSingular}`, _fieldmetadataexception.FieldMetadataExceptionCode.INVALID_FIELD_INPUT);
};

//# sourceMappingURL=compute-morph-relation-flat-field-name.util.js.map
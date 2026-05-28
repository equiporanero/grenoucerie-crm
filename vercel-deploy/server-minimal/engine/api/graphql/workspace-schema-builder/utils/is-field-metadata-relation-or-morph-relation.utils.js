"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isFieldMetadataRelationOrMorphRelation", {
    enumerable: true,
    get: function() {
        return isFieldMetadataRelationOrMorphRelation;
    }
});
const _types = require("twenty-shared/types");
const _isfieldmetadataoftypeutil = require("../../../../utils/is-field-metadata-of-type.util");
const isFieldMetadataRelationOrMorphRelation = (fieldMetadata)=>{
    return (0, _isfieldmetadataoftypeutil.isFieldMetadataEntityOfType)(fieldMetadata, _types.FieldMetadataType.RELATION) || (0, _isfieldmetadataoftypeutil.isFieldMetadataEntityOfType)(fieldMetadata, _types.FieldMetadataType.MORPH_RELATION);
};

//# sourceMappingURL=is-field-metadata-relation-or-morph-relation.utils.js.map
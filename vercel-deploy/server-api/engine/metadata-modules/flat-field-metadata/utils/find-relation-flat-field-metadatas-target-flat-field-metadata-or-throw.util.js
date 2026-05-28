"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "findRelationFlatFieldMetadataTargetFlatFieldMetadataOrThrow", {
    enumerable: true,
    get: function() {
        return findRelationFlatFieldMetadataTargetFlatFieldMetadataOrThrow;
    }
});
const _utils = require("twenty-shared/utils");
const _fieldmetadataexception = require("../../field-metadata/field-metadata.exception");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _ismorphorrelationflatfieldmetadatautil = require("./is-morph-or-relation-flat-field-metadata.util");
const findRelationFlatFieldMetadataTargetFlatFieldMetadataOrThrow = ({ flatFieldMetadataMaps, flatFieldMetadata })=>{
    const { relationTargetFieldMetadataId } = flatFieldMetadata;
    const relatedFlatFieldMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: relationTargetFieldMetadataId,
        flatEntityMaps: flatFieldMetadataMaps
    });
    if (!(0, _utils.isDefined)(relatedFlatFieldMetadata)) {
        throw new _fieldmetadataexception.FieldMetadataException(`Deleted field metadata relation field metadata target not found`, _fieldmetadataexception.FieldMetadataExceptionCode.FIELD_METADATA_NOT_FOUND);
    }
    if (!(0, _ismorphorrelationflatfieldmetadatautil.isMorphOrRelationFlatFieldMetadata)(relatedFlatFieldMetadata)) {
        throw new _fieldmetadataexception.FieldMetadataException(`Relation target field metadata is not a relation or morph relation field metadata`, _fieldmetadataexception.FieldMetadataExceptionCode.FIELD_METADATA_RELATION_MALFORMED);
    }
    return relatedFlatFieldMetadata;
};

//# sourceMappingURL=find-relation-flat-field-metadatas-target-flat-field-metadata-or-throw.util.js.map
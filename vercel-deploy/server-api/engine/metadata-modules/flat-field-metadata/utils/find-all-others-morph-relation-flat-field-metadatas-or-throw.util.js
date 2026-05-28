"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "findAllOthersMorphRelationFlatFieldMetadatasOrThrow", {
    enumerable: true,
    get: function() {
        return findAllOthersMorphRelationFlatFieldMetadatasOrThrow;
    }
});
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _flatentitymapsexception = require("../../flat-entity/exceptions/flat-entity-maps.exception");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _findmanyflatentitybyidinflatentitymapsorthrowutil = require("../../flat-entity/utils/find-many-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _isflatfieldmetadataoftypeutil = require("./is-flat-field-metadata-of-type.util");
const findAllOthersMorphRelationFlatFieldMetadatasOrThrow = ({ flatFieldMetadataMaps, flatObjectMetadata, flatFieldMetadata: morphRelationFlatFieldMetadata })=>{
    if (!(0, _utils.isDefined)((0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: morphRelationFlatFieldMetadata.id,
        flatEntityMaps: flatFieldMetadataMaps
    }))) {
        throw new _flatentitymapsexception.FlatEntityMapsException('Morph relation field not found in flat field metadata maps', _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
    }
    const objectFlatFieldMetadatas = (0, _findmanyflatentitybyidinflatentitymapsorthrowutil.findManyFlatEntityByIdInFlatEntityMapsOrThrow)({
        flatEntityMaps: flatFieldMetadataMaps,
        flatEntityIds: flatObjectMetadata.fieldIds
    });
    return objectFlatFieldMetadatas.filter((flatFieldMetadata)=>(0, _isflatfieldmetadataoftypeutil.isFlatFieldMetadataOfType)(flatFieldMetadata, _types.FieldMetadataType.MORPH_RELATION) && flatFieldMetadata.morphId === morphRelationFlatFieldMetadata.morphId && flatFieldMetadata.id !== morphRelationFlatFieldMetadata.id);
};

//# sourceMappingURL=find-all-others-morph-relation-flat-field-metadatas-or-throw.util.js.map
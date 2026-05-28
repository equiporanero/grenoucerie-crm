"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "enrichFieldMetadataEventWithRelations", {
    enumerable: true,
    get: function() {
        return enrichFieldMetadataEventWithRelations;
    }
});
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _findflatentitybyidinflatentitymapsutil = require("../../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _isflatfieldmetadataoftypeutil = require("../../../metadata-modules/flat-field-metadata/utils/is-flat-field-metadata-of-type.util");
const _resolvemorphrelationsfromflatfieldmetadatautil = require("../../../metadata-modules/flat-field-metadata/utils/resolve-morph-relations-from-flat-field-metadata.util");
const _resolverelationfromflatfieldmetadatautil = require("../../../metadata-modules/flat-field-metadata/utils/resolve-relation-from-flat-field-metadata.util");
const enrichFieldMetadataEventWithRelations = ({ record, flatFieldMetadataMaps, flatObjectMetadataMaps })=>{
    const flatFieldMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: record.id,
        flatEntityMaps: flatFieldMetadataMaps
    });
    if (!(0, _utils.isDefined)(flatFieldMetadata)) {
        return record;
    }
    try {
        if ((0, _isflatfieldmetadataoftypeutil.isFlatFieldMetadataOfType)(flatFieldMetadata, _types.FieldMetadataType.RELATION)) {
            const relation = (0, _resolverelationfromflatfieldmetadatautil.resolveRelationFromFlatFieldMetadata)({
                sourceFlatFieldMetadata: flatFieldMetadata,
                flatFieldMetadataMaps,
                flatObjectMetadataMaps
            });
            return (0, _utils.isDefined)(relation) ? {
                ...record,
                relation
            } : record;
        }
        if ((0, _isflatfieldmetadataoftypeutil.isFlatFieldMetadataOfType)(flatFieldMetadata, _types.FieldMetadataType.MORPH_RELATION)) {
            const morphRelations = (0, _resolvemorphrelationsfromflatfieldmetadatautil.resolveMorphRelationsFromFlatFieldMetadata)({
                morphFlatFieldMetadata: flatFieldMetadata,
                flatFieldMetadataMaps,
                flatObjectMetadataMaps
            });
            return {
                ...record,
                morphRelations
            };
        }
    } catch  {
        return record;
    }
    return record;
};

//# sourceMappingURL=enrich-field-metadata-event-with-relations.util.js.map
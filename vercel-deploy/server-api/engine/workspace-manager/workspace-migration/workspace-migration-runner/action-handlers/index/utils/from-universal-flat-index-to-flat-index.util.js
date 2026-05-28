"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromUniversalFlatIndexToFlatIndex", {
    enumerable: true,
    get: function() {
        return fromUniversalFlatIndexToFlatIndex;
    }
});
const _utils = require("twenty-shared/utils");
const _uuid = require("uuid");
const _flatentitymapsexception = require("../../../../../../metadata-modules/flat-entity/exceptions/flat-entity-maps.exception");
const _findflatentitybyuniversalidentifierutil = require("../../../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier.util");
const fromUniversalFlatIndexToFlatIndex = ({ universalFlatIndexMetadata, indexMetadataId, allFlatEntityMaps, workspaceId, applicationId })=>{
    const objectMetadata = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
        flatEntityMaps: allFlatEntityMaps.flatObjectMetadataMaps,
        universalIdentifier: universalFlatIndexMetadata.objectMetadataUniversalIdentifier
    });
    if (!(0, _utils.isDefined)(objectMetadata)) {
        throw new _flatentitymapsexception.FlatEntityMapsException(`Could not resolve objectMetadataUniversalIdentifier to objectMetadataId: no objectMetadata found for universal identifier ${universalFlatIndexMetadata.objectMetadataUniversalIdentifier}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
    }
    const now = new Date().toISOString();
    const flatIndexFieldMetadatas = universalFlatIndexMetadata.universalFlatIndexFieldMetadatas.map((universalFlatIndexFieldMetadata)=>{
        const fieldMetadata = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            flatEntityMaps: allFlatEntityMaps.flatFieldMetadataMaps,
            universalIdentifier: universalFlatIndexFieldMetadata.fieldMetadataUniversalIdentifier
        });
        if (!(0, _utils.isDefined)(fieldMetadata)) {
            throw new _flatentitymapsexception.FlatEntityMapsException(`Could not resolve fieldMetadataUniversalIdentifier to fieldMetadataId: no fieldMetadata found for universal identifier ${universalFlatIndexFieldMetadata.fieldMetadataUniversalIdentifier}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
        }
        return {
            id: (0, _uuid.v4)(),
            indexMetadataId,
            fieldMetadataId: fieldMetadata.id,
            order: universalFlatIndexFieldMetadata.order,
            subFieldName: universalFlatIndexFieldMetadata.subFieldName,
            createdAt: now,
            updatedAt: now,
            workspaceId
        };
    });
    return {
        id: indexMetadataId,
        universalFlatIndexFieldMetadatas: universalFlatIndexMetadata.universalFlatIndexFieldMetadatas,
        universalIdentifier: universalFlatIndexMetadata.universalIdentifier,
        applicationId,
        applicationUniversalIdentifier: universalFlatIndexMetadata.applicationUniversalIdentifier,
        workspaceId,
        objectMetadataId: objectMetadata.id,
        objectMetadataUniversalIdentifier: universalFlatIndexMetadata.objectMetadataUniversalIdentifier,
        name: universalFlatIndexMetadata.name,
        isCustom: universalFlatIndexMetadata.isCustom,
        isUnique: universalFlatIndexMetadata.isUnique,
        indexWhereClause: universalFlatIndexMetadata.indexWhereClause,
        indexType: universalFlatIndexMetadata.indexType,
        createdAt: universalFlatIndexMetadata.createdAt,
        updatedAt: universalFlatIndexMetadata.updatedAt,
        flatIndexFieldMetadatas
    };
};

//# sourceMappingURL=from-universal-flat-index-to-flat-index.util.js.map
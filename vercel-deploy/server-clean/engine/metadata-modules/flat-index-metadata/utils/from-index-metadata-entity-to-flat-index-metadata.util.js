"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromIndexMetadataEntityToFlatIndexMetadata", {
    enumerable: true,
    get: function() {
        return fromIndexMetadataEntityToFlatIndexMetadata;
    }
});
const _utils = require("twenty-shared/utils");
const _flatentitymapsexception = require("../../flat-entity/exceptions/flat-entity-maps.exception");
const _getmetadataentityrelationpropertiesutil = require("../../flat-entity/utils/get-metadata-entity-relation-properties.util");
const fromIndexMetadataEntityToFlatIndexMetadata = ({ entity: indexMetadataEntity, applicationIdToUniversalIdentifierMap, objectMetadataIdToUniversalIdentifierMap, fieldMetadataIdToUniversalIdentifierMap })=>{
    const applicationUniversalIdentifier = applicationIdToUniversalIdentifierMap.get(indexMetadataEntity.applicationId);
    if (!(0, _utils.isDefined)(applicationUniversalIdentifier)) {
        throw new _flatentitymapsexception.FlatEntityMapsException(`Application with id ${indexMetadataEntity.applicationId} not found for index ${indexMetadataEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
    }
    const objectMetadataUniversalIdentifier = objectMetadataIdToUniversalIdentifierMap.get(indexMetadataEntity.objectMetadataId);
    if (!(0, _utils.isDefined)(objectMetadataUniversalIdentifier)) {
        throw new _flatentitymapsexception.FlatEntityMapsException(`ObjectMetadata with id ${indexMetadataEntity.objectMetadataId} not found for index ${indexMetadataEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
    }
    const indexMetadataEntityWithoutRelations = (0, _utils.removePropertiesFromRecord)(indexMetadataEntity, (0, _getmetadataentityrelationpropertiesutil.getMetadataEntityRelationProperties)('index'));
    return {
        ...indexMetadataEntityWithoutRelations,
        createdAt: indexMetadataEntity.createdAt.toISOString(),
        updatedAt: indexMetadataEntity.updatedAt.toISOString(),
        universalIdentifier: indexMetadataEntityWithoutRelations.universalIdentifier,
        flatIndexFieldMetadatas: indexMetadataEntity.indexFieldMetadatas.map((indexFieldMetadata)=>({
                ...(0, _utils.removePropertiesFromRecord)(indexFieldMetadata, [
                    'indexMetadata',
                    'fieldMetadata'
                ]),
                createdAt: indexFieldMetadata.createdAt.toISOString(),
                updatedAt: indexFieldMetadata.updatedAt.toISOString(),
                workspaceId: indexFieldMetadata.workspaceId
            })),
        universalFlatIndexFieldMetadatas: indexMetadataEntity.indexFieldMetadatas.map((indexFieldMetadata)=>{
            const fieldMetadataUniversalIdentifier = fieldMetadataIdToUniversalIdentifierMap.get(indexFieldMetadata.fieldMetadataId);
            if (!(0, _utils.isDefined)(fieldMetadataUniversalIdentifier)) {
                throw new _flatentitymapsexception.FlatEntityMapsException(`FieldMetadata with id ${indexFieldMetadata.fieldMetadataId} not found for index field metadata ${indexFieldMetadata.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.RELATION_UNIVERSAL_IDENTIFIER_NOT_FOUND);
            }
            return {
                order: indexFieldMetadata.order,
                subFieldName: indexFieldMetadata.subFieldName,
                createdAt: indexFieldMetadata.createdAt.toISOString(),
                updatedAt: indexFieldMetadata.updatedAt.toISOString(),
                indexMetadataUniversalIdentifier: indexMetadataEntity.universalIdentifier,
                fieldMetadataUniversalIdentifier
            };
        }),
        applicationUniversalIdentifier,
        objectMetadataUniversalIdentifier
    };
};

//# sourceMappingURL=from-index-metadata-entity-to-flat-index-metadata.util.js.map
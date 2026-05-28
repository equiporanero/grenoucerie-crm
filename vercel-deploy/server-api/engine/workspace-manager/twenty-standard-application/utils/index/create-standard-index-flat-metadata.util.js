"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createStandardIndexFlatMetadata", {
    enumerable: true,
    get: function() {
        return createStandardIndexFlatMetadata;
    }
});
const _metadata = require("twenty-shared/metadata");
const _utils = require("twenty-shared/utils");
const _uuid = require("uuid");
const _findflatentitybyuniversalidentifierorthrowutil = require("../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier-or-throw.util");
const _findmanyflatentitybyuniversalidentifierinuniversalflatentitymapsorthrowutil = require("../../../../metadata-modules/flat-entity/utils/find-many-flat-entity-by-universal-identifier-in-universal-flat-entity-maps-or-throw.util");
const _indexTypetypes = require("../../../../metadata-modules/index-metadata/types/indexType.types");
const _generateflatindexutil = require("../../../../metadata-modules/index-metadata/utils/generate-flat-index.util");
const _twentystandardapplications = require("../../constants/twenty-standard-applications");
const createStandardIndexFlatMetadata = ({ workspaceId, objectName, context: { indexName, relatedFieldNames, indexType = _indexTypetypes.IndexType.BTREE, indexWhereClause = null, isUnique = false }, standardObjectMetadataRelatedEntityIds, dependencyFlatEntityMaps: { flatFieldMetadataMaps, flatObjectMetadataMaps }, twentyStandardApplicationId, now })=>{
    const objectIndexes = _metadata.STANDARD_OBJECTS[objectName].indexes;
    if (!(0, _utils.isDefined)(objectIndexes)) {
        throw new Error(`Invalid index configuration ${objectName} ${indexName.toString()}`);
    }
    // @ts-expect-error ignore
    const indexDefinition = objectIndexes[indexName];
    const objectFields = _metadata.STANDARD_OBJECTS[objectName].fields;
    const objectMetadataId = standardObjectMetadataRelatedEntityIds[objectName].id;
    const relatedFieldIds = relatedFieldNames.map((fieldName)=>standardObjectMetadataRelatedEntityIds[objectName].fields[fieldName].id);
    const objectMetadataUniversalIdentifier = _metadata.STANDARD_OBJECTS[objectName].universalIdentifier;
    const flatObjectMetadata = (0, _findflatentitybyuniversalidentifierorthrowutil.findFlatEntityByUniversalIdentifierOrThrow)({
        universalIdentifier: objectMetadataUniversalIdentifier,
        flatEntityMaps: flatObjectMetadataMaps
    });
    const relatedFieldUniversalIdentifiers = relatedFieldNames.map((fieldName)=>objectFields[fieldName].universalIdentifier);
    const flatFieldMetadatas = (0, _findmanyflatentitybyuniversalidentifierinuniversalflatentitymapsorthrowutil.findManyFlatEntityByUniversalIdentifierInUniversalFlatEntityMapsOrThrow)({
        universalIdentifiers: relatedFieldUniversalIdentifiers,
        flatEntityMaps: flatFieldMetadataMaps
    });
    const indexId = (0, _uuid.v4)();
    const unviersalFlatIndex = (0, _generateflatindexutil.generateFlatIndexMetadataWithNameOrThrow)({
        flatIndex: {
            createdAt: now,
            applicationUniversalIdentifier: _twentystandardapplications.TWENTY_STANDARD_APPLICATION.universalIdentifier,
            indexType,
            indexWhereClause,
            isCustom: false,
            isUnique,
            objectMetadataUniversalIdentifier: flatObjectMetadata.universalIdentifier,
            universalIdentifier: indexDefinition.universalIdentifier,
            updatedAt: now,
            universalFlatIndexFieldMetadatas: flatFieldMetadatas.map(({ universalIdentifier: fieldMetadataUniversalIdentifier }, index)=>({
                    createdAt: now,
                    order: index,
                    subFieldName: null,
                    updatedAt: now,
                    fieldMetadataUniversalIdentifier,
                    indexMetadataUniversalIdentifier: indexDefinition.universalIdentifier
                }))
        },
        flatObjectMetadata,
        objectFlatFieldMetadatas: flatFieldMetadatas
    });
    return {
        ...unviersalFlatIndex,
        applicationId: twentyStandardApplicationId,
        id: (0, _uuid.v4)(),
        flatIndexFieldMetadatas: relatedFieldIds.map((fieldMetadataId, index)=>({
                createdAt: now,
                fieldMetadataId,
                id: (0, _uuid.v4)(),
                indexMetadataId: indexId,
                order: index,
                subFieldName: null,
                updatedAt: now,
                workspaceId
            })),
        workspaceId,
        objectMetadataId
    };
};

//# sourceMappingURL=create-standard-index-flat-metadata.util.js.map
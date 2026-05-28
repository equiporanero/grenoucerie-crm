"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get computeFlatIndexFieldColumnNames () {
        return computeFlatIndexFieldColumnNames;
    },
    get createIndexInWorkspaceSchema () {
        return createIndexInWorkspaceSchema;
    },
    get deleteIndexMetadata () {
        return deleteIndexMetadata;
    },
    get dropIndexFromWorkspaceSchema () {
        return dropIndexFromWorkspaceSchema;
    }
});
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _computemorphorrelationfieldjoincolumnnameutil = require("../../../../../../metadata-modules/field-metadata/utils/compute-morph-or-relation-field-join-column-name.util");
const _computecolumnnameutil = require("../../../../../../metadata-modules/field-metadata/utils/compute-column-name.util");
const _iscompositefieldmetadatatypeutil = require("../../../../../../metadata-modules/field-metadata/utils/is-composite-field-metadata-type.util");
const _flatentitymapsexception = require("../../../../../../metadata-modules/flat-entity/exceptions/flat-entity-maps.exception");
const _findflatentitybyidinflatentitymapsorthrowutil = require("../../../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _ismorphorrelationflatfieldmetadatautil = require("../../../../../../metadata-modules/flat-field-metadata/utils/is-morph-or-relation-flat-field-metadata.util");
const _indexmetadataentity = require("../../../../../../metadata-modules/index-metadata/index-metadata.entity");
const _getworkspaceschemacontextformigrationutil = require("../../../utils/get-workspace-schema-context-for-migration.util");
const computeFlatIndexFieldColumnNames = ({ flatIndexFieldMetadatas, flatFieldMetadataMaps })=>{
    return flatIndexFieldMetadatas.flatMap(({ fieldMetadataId, subFieldName })=>{
        const flatFieldMetadata = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityId: fieldMetadataId,
            flatEntityMaps: flatFieldMetadataMaps
        });
        if (!(0, _utils.isDefined)(flatFieldMetadata)) {
            throw new _flatentitymapsexception.FlatEntityMapsException('Index field related field metadata not found', _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
        }
        if ((0, _ismorphorrelationflatfieldmetadatautil.isMorphOrRelationFlatFieldMetadata)(flatFieldMetadata)) {
            if (flatFieldMetadata.settings?.relationType !== _types.RelationType.MANY_TO_ONE) {
                throw new _flatentitymapsexception.FlatEntityMapsException('Cannot index a relation field that has no join column', _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
            }
            return (0, _computemorphorrelationfieldjoincolumnnameutil.computeMorphOrRelationFieldJoinColumnName)({
                name: flatFieldMetadata.name
            });
        }
        if ((0, _iscompositefieldmetadatatypeutil.isCompositeFieldMetadataType)(flatFieldMetadata.type)) {
            const compositeType = _types.compositeTypeDefinitions.get(flatFieldMetadata.type);
            if (!compositeType) {
                throw new _flatentitymapsexception.FlatEntityMapsException('Composite type not found', _flatentitymapsexception.FlatEntityMapsExceptionCode.INTERNAL_SERVER_ERROR);
            }
            if ((0, _utils.isDefined)(subFieldName)) {
                const property = compositeType.properties.find((compositeProperty)=>compositeProperty.name === subFieldName);
                if (!(0, _utils.isDefined)(property)) {
                    throw new _flatentitymapsexception.FlatEntityMapsException(`Composite sub-field "${subFieldName}" not found on ${flatFieldMetadata.name}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
                }
                return [
                    (0, _computecolumnnameutil.computeCompositeColumnName)({
                        name: flatFieldMetadata.name,
                        type: flatFieldMetadata.type
                    }, property)
                ];
            }
            // System indexes (no subFieldName) project the composite parent onto
            // every property flagged isIncludedInUniqueConstraint.
            const uniqueCompositeProperties = compositeType.properties.filter((property)=>property.isIncludedInUniqueConstraint);
            return uniqueCompositeProperties.map((subField)=>(0, _computecolumnnameutil.computeCompositeColumnName)(flatFieldMetadata.name, subField));
        }
        return flatFieldMetadata.name;
    });
};
const deleteIndexMetadata = async ({ entityId, queryRunner, workspaceId })=>{
    const indexMetadataRepository = queryRunner.manager.getRepository(_indexmetadataentity.IndexMetadataEntity);
    await indexMetadataRepository.delete({
        id: entityId,
        workspaceId
    });
};
const createIndexInWorkspaceSchema = async ({ flatIndexMetadata, flatObjectMetadata, flatFieldMetadataMaps, workspaceSchemaManagerService, queryRunner, workspaceId, concurrently = false })=>{
    const { schemaName, tableName } = (0, _getworkspaceschemacontextformigrationutil.getWorkspaceSchemaContextForMigration)({
        workspaceId,
        objectMetadata: flatObjectMetadata
    });
    const columns = computeFlatIndexFieldColumnNames({
        flatIndexFieldMetadatas: flatIndexMetadata.flatIndexFieldMetadatas,
        flatFieldMetadataMaps
    });
    await workspaceSchemaManagerService.indexManager.createIndex({
        index: {
            columns,
            name: flatIndexMetadata.name,
            isUnique: flatIndexMetadata.isUnique,
            type: flatIndexMetadata.indexType,
            where: flatIndexMetadata.indexWhereClause ?? undefined
        },
        queryRunner,
        schemaName,
        tableName,
        concurrently
    });
};
const dropIndexFromWorkspaceSchema = async ({ indexName, workspaceSchemaManagerService, queryRunner, schemaName })=>{
    await workspaceSchemaManagerService.indexManager.dropIndex({
        indexName,
        queryRunner,
        schemaName
    });
};

//# sourceMappingURL=index-action-handler.utils.js.map
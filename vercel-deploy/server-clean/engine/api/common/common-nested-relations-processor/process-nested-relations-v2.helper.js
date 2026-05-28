"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ProcessNestedRelationsV2Helper", {
    enumerable: true,
    get: function() {
        return ProcessNestedRelationsV2Helper;
    }
});
const _common = require("@nestjs/common");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _computemorphorrelationfieldjoincolumnnameutil = require("../../../metadata-modules/field-metadata/utils/compute-morph-or-relation-field-join-column-name.util");
const _relationtypeinterface = require("../../../metadata-modules/field-metadata/interfaces/relation-type.interface");
const _standarderrormessageconstant = require("../common-query-runners/errors/standard-error-message.constant");
const _graphqlqueryrunnerexception = require("../../graphql/graphql-query-runner/errors/graphql-query-runner.exception");
const _processaggregatehelper = require("../../graphql/graphql-query-runner/helpers/process-aggregate.helper");
const _buildcolumnstoselect = require("../../graphql/graphql-query-runner/utils/build-columns-to-select");
const _gettargetobjectmetadatautil = require("../../graphql/graphql-query-runner/utils/get-target-object-metadata.util");
const _findflatentitybyidinflatentitymapsutil = require("../../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _buildfieldmapsfromflatobjectmetadatautil = require("../../../metadata-modules/flat-field-metadata/utils/build-field-maps-from-flat-object-metadata.util");
const _isfieldmetadataoftypeutil = require("../../../utils/is-field-metadata-of-type.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ProcessNestedRelationsV2Helper = class ProcessNestedRelationsV2Helper {
    async processNestedRelations({ flatObjectMetadataMaps, flatFieldMetadataMaps, parentObjectMetadataItem, parentObjectRecords, parentObjectRecordsAggregatedValues = {}, relations, aggregate = {}, limit, authContext, workspaceDataSource, rolePermissionConfig, selectedFields }) {
        const processRelationTasks = Object.entries(relations).map(([sourceFieldName, nestedRelations])=>this.processRelation({
                flatObjectMetadataMaps,
                flatFieldMetadataMaps,
                parentObjectMetadataItem,
                parentObjectRecords,
                parentObjectRecordsAggregatedValues,
                sourceFieldName,
                nestedRelations,
                aggregate,
                limit,
                authContext,
                workspaceDataSource,
                rolePermissionConfig,
                selectedFields: selectedFields[sourceFieldName] instanceof Object ? selectedFields[sourceFieldName] : undefined
            }));
        await Promise.all(processRelationTasks);
    }
    async processRelation({ flatObjectMetadataMaps, flatFieldMetadataMaps, parentObjectMetadataItem, parentObjectRecords, parentObjectRecordsAggregatedValues, sourceFieldName, nestedRelations, aggregate, limit, authContext, workspaceDataSource, rolePermissionConfig, selectedFields }) {
        const fieldMaps = (0, _buildfieldmapsfromflatobjectmetadatautil.buildFieldMapsFromFlatObjectMetadata)(flatFieldMetadataMaps, parentObjectMetadataItem);
        const sourceFieldMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId: fieldMaps.fieldIdByName[sourceFieldName],
            flatEntityMaps: flatFieldMetadataMaps
        });
        if (!sourceFieldMetadata) {
            return;
        }
        if (!(0, _isfieldmetadataoftypeutil.isFieldMetadataEntityOfType)(sourceFieldMetadata, _types.FieldMetadataType.RELATION) && !(0, _isfieldmetadataoftypeutil.isFieldMetadataEntityOfType)(sourceFieldMetadata, _types.FieldMetadataType.MORPH_RELATION)) {
            // TODO: Maybe we should throw an error here ?
            return;
        }
        if (!sourceFieldMetadata.settings) {
            throw new _graphqlqueryrunnerexception.GraphqlQueryRunnerException(`Relation settings not found for field ${sourceFieldName}`, _graphqlqueryrunnerexception.GraphqlQueryRunnerExceptionCode.RELATION_SETTINGS_NOT_FOUND, {
                userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
            });
        }
        const relationType = sourceFieldMetadata.settings?.relationType;
        const { targetRelationName, targetObjectMetadata, targetRelation } = this.getTargetObjectMetadata({
            flatObjectMetadataMaps,
            flatFieldMetadataMaps,
            parentObjectMetadataItem,
            sourceFieldName,
            fieldMaps
        });
        const targetObjectRepository = workspaceDataSource.getRepository(targetObjectMetadata.nameSingular, rolePermissionConfig);
        const targetObjectNameSingular = targetObjectMetadata.nameSingular;
        let targetObjectQueryBuilder = targetObjectRepository.createQueryBuilder(targetObjectNameSingular);
        const columnsToSelect = (0, _buildcolumnstoselect.buildColumnsToSelect)({
            select: selectedFields,
            relations: nestedRelations,
            flatObjectMetadata: targetObjectMetadata,
            flatObjectMetadataMaps,
            flatFieldMetadataMaps
        });
        if (relationType === _relationtypeinterface.RelationType.MANY_TO_ONE) {
            columnsToSelect.deletedAt = true;
            targetObjectQueryBuilder = targetObjectQueryBuilder.withDeleted();
        }
        targetObjectQueryBuilder = targetObjectQueryBuilder.setFindOptions({
            select: columnsToSelect
        });
        const joinColumnName = (0, _computemorphorrelationfieldjoincolumnnameutil.computeMorphOrRelationFieldJoinColumnName)({
            name: sourceFieldName
        });
        const relationIds = this.getUniqueIds({
            records: parentObjectRecords,
            idField: relationType === _relationtypeinterface.RelationType.ONE_TO_MANY ? 'id' : joinColumnName
        });
        if (relationType === _relationtypeinterface.RelationType.ONE_TO_MANY && !(0, _utils.isDefined)(targetRelationName)) {
            throw new _graphqlqueryrunnerexception.GraphqlQueryRunnerException(`Could not resolve target relation for one-to-many field ${sourceFieldName}`, _graphqlqueryrunnerexception.GraphqlQueryRunnerExceptionCode.RELATION_TARGET_OBJECT_METADATA_NOT_FOUND, {
                userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
            });
        }
        const fieldMetadataTargetRelationColumnName = (0, _computemorphorrelationfieldjoincolumnnameutil.computeMorphOrRelationFieldJoinColumnName)({
            name: targetRelation && (0, _isfieldmetadataoftypeutil.isFieldMetadataEntityOfType)(targetRelation, _types.FieldMetadataType.MORPH_RELATION) ? targetRelation.name : targetRelationName
        });
        const { relationResults, relationAggregatedFieldsResult } = await this.findRelations({
            referenceQueryBuilder: targetObjectQueryBuilder,
            column: relationType === _relationtypeinterface.RelationType.ONE_TO_MANY ? `"${fieldMetadataTargetRelationColumnName}"` : 'id',
            ids: relationIds,
            limit: limit * parentObjectRecords.length,
            aggregate,
            sourceFieldName,
            targetObjectNameSingular
        });
        this.assignRelationResults({
            parentRecords: parentObjectRecords,
            parentObjectRecordsAggregatedValues,
            relationResults,
            relationAggregatedFieldsResult,
            sourceFieldName,
            joinField: relationType === _relationtypeinterface.RelationType.ONE_TO_MANY ? `${fieldMetadataTargetRelationColumnName}` : 'id',
            joinColumnName,
            relationType,
            selectedFields
        });
        if (Object.keys(nestedRelations).length > 0) {
            await this.processNestedRelations({
                flatObjectMetadataMaps,
                flatFieldMetadataMaps,
                parentObjectMetadataItem: targetObjectMetadata,
                parentObjectRecords: relationResults,
                parentObjectRecordsAggregatedValues: relationAggregatedFieldsResult,
                relations: nestedRelations,
                aggregate,
                limit,
                authContext,
                workspaceDataSource,
                rolePermissionConfig,
                selectedFields
            });
        }
    }
    getTargetObjectMetadata({ flatObjectMetadataMaps, flatFieldMetadataMaps, parentObjectMetadataItem, sourceFieldName, fieldMaps }) {
        const targetFieldMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId: fieldMaps.fieldIdByName[sourceFieldName],
            flatEntityMaps: flatFieldMetadataMaps
        });
        if (!targetFieldMetadata) {
            throw new _graphqlqueryrunnerexception.GraphqlQueryRunnerException(`Field ${sourceFieldName} not found on object ${parentObjectMetadataItem.nameSingular}`, _graphqlqueryrunnerexception.GraphqlQueryRunnerExceptionCode.FIELD_NOT_FOUND, {
                userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
            });
        }
        const targetObjectMetadata = (0, _gettargetobjectmetadatautil.getTargetObjectMetadataOrThrow)(targetFieldMetadata, flatObjectMetadataMaps);
        if (!targetFieldMetadata.relationTargetObjectMetadataId || !targetFieldMetadata.relationTargetFieldMetadataId) {
            throw new _graphqlqueryrunnerexception.GraphqlQueryRunnerException(`Relation target object metadata id or field metadata id not found for field ${sourceFieldName}`, _graphqlqueryrunnerexception.GraphqlQueryRunnerExceptionCode.RELATION_TARGET_OBJECT_METADATA_NOT_FOUND, {
                userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
            });
        }
        const targetRelation = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId: targetFieldMetadata.relationTargetFieldMetadataId,
            flatEntityMaps: flatFieldMetadataMaps
        });
        const targetRelationName = targetRelation?.name;
        return {
            targetRelationName,
            targetObjectMetadata,
            targetRelation
        };
    }
    getUniqueIds({ records, idField }) {
        return [
            ...new Set(records.map((item)=>item[idField]))
        ];
    }
    async findRelations({ referenceQueryBuilder, column, ids, limit, aggregate, sourceFieldName, targetObjectNameSingular }) {
        if (ids.length === 0) {
            return {
                relationResults: [],
                relationAggregatedFieldsResult: {}
            };
        }
        const aggregateForRelation = aggregate[sourceFieldName];
        // oxlint-disable-next-line @typescripttypescript/no-explicit-any
        let relationAggregatedFieldsResult = {};
        if (aggregateForRelation) {
            const aggregateQueryBuilder = referenceQueryBuilder.clone();
            _processaggregatehelper.ProcessAggregateHelper.addSelectedAggregatedFieldsQueriesToQueryBuilder({
                selectedAggregatedFields: aggregateForRelation,
                queryBuilder: aggregateQueryBuilder,
                objectMetadataNameSingular: targetObjectNameSingular
            });
            const aggregatedFieldsValues = await aggregateQueryBuilder.addSelect(column).where(`${column} IN (:...ids)`, {
                ids
            }).groupBy(column).getRawMany();
            relationAggregatedFieldsResult = aggregatedFieldsValues.reduce((acc, item)=>{
                const columnWithoutQuotes = column.replace(/["']/g, '');
                const key = item[columnWithoutQuotes];
                const { [column]: _, ...itemWithoutColumn } = item;
                acc[key] = itemWithoutColumn;
                return acc;
            }, {});
        }
        const queryBuilderOptions = referenceQueryBuilder.getFindOptions();
        const columnWithoutQuotes = column.replace(/["']/g, '');
        const result = await referenceQueryBuilder.setFindOptions({
            ...queryBuilderOptions,
            select: {
                ...queryBuilderOptions.select,
                [columnWithoutQuotes]: true
            }
        }).where(`${column} IN (:...ids)`, {
            ids
        }).take(limit).getMany();
        return {
            relationResults: result,
            relationAggregatedFieldsResult
        };
    }
    assignRelationResults({ parentRecords, parentObjectRecordsAggregatedValues, relationResults, relationAggregatedFieldsResult, sourceFieldName, joinField, joinColumnName, relationType, selectedFields }) {
        parentRecords.forEach((item)=>{
            if (relationType === _relationtypeinterface.RelationType.ONE_TO_MANY) {
                item[sourceFieldName] = relationResults.filter((rel)=>rel[joinField] === item.id);
            } else {
                const matchedRelation = relationResults.find((rel)=>rel.id === item[joinColumnName]);
                if ((0, _utils.isDefined)(matchedRelation?.deletedAt)) {
                    item[sourceFieldName] = null;
                    item[joinColumnName] = null;
                } else if ((0, _utils.isDefined)(matchedRelation)) {
                    if (selectedFields?.deletedAt !== true) {
                        const { deletedAt: _, ...rest } = matchedRelation;
                        item[sourceFieldName] = rest;
                    } else {
                        item[sourceFieldName] = matchedRelation;
                    }
                } else {
                    item[sourceFieldName] = null;
                }
            }
        });
        parentObjectRecordsAggregatedValues[sourceFieldName] = relationAggregatedFieldsResult;
    }
    constructor(){}
};
ProcessNestedRelationsV2Helper = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [])
], ProcessNestedRelationsV2Helper);

//# sourceMappingURL=process-nested-relations-v2.helper.js.map
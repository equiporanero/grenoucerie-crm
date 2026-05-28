"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CommonMergeManyQueryRunnerService", {
    enumerable: true,
    get: function() {
        return CommonMergeManyQueryRunnerService;
    }
});
const _common = require("@nestjs/common");
const _constants = require("twenty-shared/constants");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _typeorm = require("typeorm");
const _uuid = require("uuid");
const _computemorphorrelationfieldjoincolumnnameutil = require("../../../metadata-modules/field-metadata/utils/compute-morph-or-relation-field-join-column-name.util");
const _commonbasequeryrunnerservice = require("./common-base-query-runner.service");
const _commonqueryrunnerexception = require("./errors/common-query-runner.exception");
const _standarderrormessageconstant = require("./errors/standard-error-message.constant");
const _commonqueryargstype = require("../types/common-query-args.type");
const _buildcolumnstoreturn = require("../../graphql/graphql-query-runner/utils/build-columns-to-return");
const _buildcolumnstoselect = require("../../graphql/graphql-query-runner/utils/build-columns-to-select");
const _hasrecordfieldvalueutil = require("../../graphql/graphql-query-runner/utils/has-record-field-value.util");
const _mergefieldvaluesutil = require("../../graphql/graphql-query-runner/utils/merge-field-values.util");
const _findflatentitybyidinflatentitymapsutil = require("../../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _buildfieldmapsfromflatobjectmetadatautil = require("../../../metadata-modules/flat-field-metadata/utils/build-field-maps-from-flat-object-metadata.util");
const _isflatfieldmetadataoftypeutil = require("../../../metadata-modules/flat-field-metadata/utils/is-flat-field-metadata-of-type.util");
const _assertmutationnotonremoteobjectutil = require("../../../metadata-modules/object-metadata/utils/assert-mutation-not-on-remote-object.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let CommonMergeManyQueryRunnerService = class CommonMergeManyQueryRunnerService extends _commonbasequeryrunnerservice.CommonBaseQueryRunnerService {
    async run(args, queryRunnerContext) {
        const { flatObjectMetadataMaps, flatFieldMetadataMaps, flatObjectMetadata } = queryRunnerContext;
        const recordsToMerge = await this.fetchRecordsToMerge(queryRunnerContext, args);
        const priorityRecord = this.validateAndGetPriorityRecord(recordsToMerge, args.ids, args.conflictPriorityIndex);
        const mergedData = this.performDeepMerge(recordsToMerge, priorityRecord.id, flatObjectMetadata, flatFieldMetadataMaps, args.dryRun ?? false);
        if (args.dryRun) {
            return this.createDryRunResponse(priorityRecord, mergedData);
        }
        const idsToDelete = args.ids.filter((id)=>id !== priorityRecord.id);
        await this.migrateRelatedRecords(queryRunnerContext, idsToDelete, priorityRecord.id);
        const queryBuilder = queryRunnerContext.repository.createQueryBuilder(flatObjectMetadata.nameSingular);
        const columnsToReturn = (0, _buildcolumnstoreturn.buildColumnsToReturn)({
            select: args.selectedFieldsResult.select,
            relations: args.selectedFieldsResult.relations,
            flatObjectMetadata,
            flatObjectMetadataMaps,
            flatFieldMetadataMaps
        });
        await queryBuilder.delete().whereInIds(idsToDelete).returning(columnsToReturn).execute();
        const updatedRecord = await this.updatePriorityRecord(args, queryRunnerContext, priorityRecord.id, mergedData);
        await this.processNestedRelations({
            args,
            queryRunnerContext,
            updatedRecords: [
                updatedRecord
            ]
        });
        return updatedRecord;
    }
    async fetchRecordsToMerge(context, args) {
        const columnsToSelect = (0, _buildcolumnstoselect.buildColumnsToSelect)({
            select: args.selectedFieldsResult.select,
            relations: args.selectedFieldsResult.relations,
            flatObjectMetadata: context.flatObjectMetadata,
            flatObjectMetadataMaps: context.flatObjectMetadataMaps,
            flatFieldMetadataMaps: context.flatFieldMetadataMaps
        });
        const fetchedRecords = await context.repository.find({
            where: {
                id: (0, _typeorm.In)(args.ids)
            },
            select: columnsToSelect
        });
        if (fetchedRecords.length !== args.ids.length) {
            throw new _commonqueryrunnerexception.CommonQueryRunnerException('One or more records not found', _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.RECORD_NOT_FOUND, {
                userFriendlyMessage: /*i18n*/ {
                    id: "JZB2eY",
                    message: "One or more records were not found."
                }
            });
        }
        const orderIndex = new Map(args.ids.map((id, index)=>[
                id,
                index
            ]));
        fetchedRecords.sort((a, b)=>(orderIndex.get(a.id) ?? 0) - (orderIndex.get(b.id) ?? 0));
        const recordsToMerge = fetchedRecords;
        if (args.dryRun && args.selectedFieldsResult.relations) {
            await this.processNestedRelationsHelper.processNestedRelations({
                flatObjectMetadataMaps: context.flatObjectMetadataMaps,
                flatFieldMetadataMaps: context.flatFieldMetadataMaps,
                parentObjectMetadataItem: context.flatObjectMetadata,
                parentObjectRecords: recordsToMerge,
                relations: args.selectedFieldsResult.relations,
                limit: _constants.QUERY_MAX_RECORDS_FROM_RELATION,
                authContext: context.authContext,
                workspaceDataSource: context.workspaceDataSource,
                rolePermissionConfig: context.rolePermissionConfig,
                selectedFields: args.selectedFieldsResult.select
            });
        }
        return recordsToMerge;
    }
    validateAndGetPriorityRecord(recordsToMerge, ids, conflictPriorityIndex) {
        const priorityRecordId = ids[conflictPriorityIndex];
        const priorityRecord = recordsToMerge.find((record)=>record.id === priorityRecordId);
        if (!priorityRecord) {
            throw new _commonqueryrunnerexception.CommonQueryRunnerException('Priority record not found', _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.RECORD_NOT_FOUND, {
                userFriendlyMessage: /*i18n*/ {
                    id: "0arbc4",
                    message: "This record does not exist or has been deleted."
                }
            });
        }
        return priorityRecord;
    }
    performDeepMerge(recordsToMerge, priorityRecordId, flatObjectMetadata, flatFieldMetadataMaps, isDryRun = false) {
        const mergedResult = {};
        const allFieldNames = new Set();
        recordsToMerge.forEach((record)=>{
            Object.keys(record).forEach((fieldName)=>{
                if (!this.shouldExcludeFieldFromMerge(fieldName, flatObjectMetadata, flatFieldMetadataMaps)) {
                    allFieldNames.add(fieldName);
                }
            });
        });
        allFieldNames.forEach((fieldName)=>{
            const recordsWithValues = [];
            recordsToMerge.forEach((record)=>{
                const fieldValue = record[fieldName];
                if ((0, _hasrecordfieldvalueutil.hasRecordFieldValue)(fieldValue)) {
                    recordsWithValues.push({
                        value: fieldValue,
                        recordId: record.id
                    });
                }
            });
            if (recordsWithValues.length === 0) {
                return;
            } else if (recordsWithValues.length === 1) {
                mergedResult[fieldName] = recordsWithValues[0].value;
            } else {
                const { fieldIdByName } = (0, _buildfieldmapsfromflatobjectmetadatautil.buildFieldMapsFromFlatObjectMetadata)(flatFieldMetadataMaps, flatObjectMetadata);
                const fieldMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
                    flatEntityId: fieldIdByName[fieldName],
                    flatEntityMaps: flatFieldMetadataMaps
                });
                if (!fieldMetadata) {
                    return;
                }
                const relationType = isDryRun && fieldMetadata.type === _types.FieldMetadataType.RELATION ? fieldMetadata.settings?.relationType : undefined;
                mergedResult[fieldName] = (0, _mergefieldvaluesutil.mergeFieldValues)(fieldMetadata.type, recordsWithValues, priorityRecordId, isDryRun, relationType);
            }
        });
        return mergedResult;
    }
    shouldExcludeFieldFromMerge(fieldName, flatObjectMetadata, flatFieldMetadataMaps) {
        const { fieldIdByName } = (0, _buildfieldmapsfromflatobjectmetadatautil.buildFieldMapsFromFlatObjectMetadata)(flatFieldMetadataMaps, flatObjectMetadata);
        const fieldMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId: fieldIdByName[fieldName],
            flatEntityMaps: flatFieldMetadataMaps
        });
        return fieldMetadata?.isSystem ?? false;
    }
    createDryRunResponse(priorityRecord, mergedData) {
        const dryRunRecord = {
            ...priorityRecord,
            ...mergedData,
            id: (0, _uuid.v4)(),
            deletedAt: new Date().toISOString()
        };
        return dryRunRecord;
    }
    async updatePriorityRecord(args, queryRunnerContext, priorityRecordId, mergedData) {
        const { flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps, repository } = queryRunnerContext;
        const queryBuilder = repository.createQueryBuilder(flatObjectMetadata.nameSingular);
        const columnsToReturn = (0, _buildcolumnstoreturn.buildColumnsToReturn)({
            select: args.selectedFieldsResult.select,
            relations: args.selectedFieldsResult.relations,
            flatObjectMetadata,
            flatObjectMetadataMaps,
            flatFieldMetadataMaps
        });
        const updatedObjectRecords = await queryBuilder.update().set(mergedData).where({
            id: priorityRecordId
        }).returning(columnsToReturn).execute();
        if (!updatedObjectRecords.generatedMaps.length) {
            throw new _commonqueryrunnerexception.CommonQueryRunnerException('Failed to update record', _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.RECORD_NOT_FOUND, {
                userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
            });
        }
        const updatedRecord = updatedObjectRecords.generatedMaps[0];
        return updatedRecord;
    }
    async migrateRelatedRecords(context, fromIds, toId) {
        const { flatObjectMetadataMaps, flatFieldMetadataMaps, flatObjectMetadata } = context;
        const relationFieldsPointingToCurrentObject = [];
        for (const field of Object.values(flatFieldMetadataMaps.byUniversalIdentifier).filter(_utils.isDefined)){
            if (!(0, _isflatfieldmetadataoftypeutil.isFlatFieldMetadataOfType)(field, _types.FieldMetadataType.RELATION) || field.relationTargetObjectMetadataId !== flatObjectMetadata.id || !field.isActive) {
                continue;
            }
            const relationSettings = field.settings;
            if (relationSettings?.relationType !== _types.RelationType.MANY_TO_ONE) {
                continue;
            }
            const objMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
                flatEntityId: field.objectMetadataId,
                flatEntityMaps: flatObjectMetadataMaps
            });
            if (!objMetadata) {
                continue;
            }
            relationFieldsPointingToCurrentObject.push({
                objectMetadata: objMetadata,
                fieldName: field.name,
                fieldId: field.id,
                joinColumnName: (0, _computemorphorrelationfieldjoincolumnnameutil.computeMorphOrRelationFieldJoinColumnName)({
                    name: field.name
                })
            });
        }
        for (const relationField of relationFieldsPointingToCurrentObject){
            if (!relationField.joinColumnName) {
                continue;
            }
            try {
                const repository = context.workspaceDataSource.getRepository(relationField.objectMetadata.nameSingular, context.rolePermissionConfig);
                const whereCondition = {
                    [relationField.joinColumnName]: (0, _typeorm.In)(fromIds)
                };
                const existingRecords = await repository.find({
                    where: whereCondition
                });
                if (existingRecords.length > 0) {
                    await repository.update(whereCondition, {
                        [relationField.joinColumnName]: toId
                    });
                }
            } catch (error) {
                this.logger.warn(`Failed to migrate relation field "${relationField.fieldName}" (${relationField.joinColumnName}) in object "${relationField.objectMetadata.nameSingular}":`, error.message);
            }
        }
    }
    async processNestedRelations({ args, queryRunnerContext, updatedRecords }) {
        const { flatObjectMetadataMaps, flatFieldMetadataMaps, flatObjectMetadata, authContext, workspaceDataSource, rolePermissionConfig } = queryRunnerContext;
        if (args.selectedFieldsResult.relations) {
            await this.processNestedRelationsHelper.processNestedRelations({
                flatObjectMetadataMaps,
                flatFieldMetadataMaps,
                parentObjectMetadataItem: flatObjectMetadata,
                parentObjectRecords: updatedRecords,
                relations: args.selectedFieldsResult.relations,
                limit: _constants.QUERY_MAX_RECORDS_FROM_RELATION,
                authContext,
                workspaceDataSource,
                rolePermissionConfig,
                selectedFields: args.selectedFieldsResult.select
            });
        }
    }
    async computeArgs(args, _queryRunnerContext) {
        return args;
    }
    async processQueryResult(queryResult, _flatObjectMetadata, _flatObjectMetadataMaps, _flatFieldMetadataMaps, _authContext) {
        return queryResult;
    }
    async validate(args, queryRunnerContext) {
        const { flatObjectMetadata } = queryRunnerContext;
        (0, _assertmutationnotonremoteobjectutil.assertMutationNotOnRemoteObject)(flatObjectMetadata);
        if (!(0, _utils.isDefined)(flatObjectMetadata.duplicateCriteria)) {
            throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Merge is only available for objects with duplicate criteria. Object '${flatObjectMetadata.nameSingular}' does not have duplicate criteria defined.`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_QUERY_INPUT, {
                userFriendlyMessage: /*i18n*/ {
                    id: "aXBMTb",
                    message: "This type of record cannot be merged."
                }
            });
        }
        const { ids, conflictPriorityIndex } = args;
        if (!ids || ids.length < 2) {
            throw new _commonqueryrunnerexception.CommonQueryRunnerException('At least 2 record IDs are required for merge', _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_QUERY_INPUT, {
                userFriendlyMessage: /*i18n*/ {
                    id: "sa9Q+R",
                    message: "Please select at least 2 records to merge."
                }
            });
        }
        if (ids.length > _constants.MUTATION_MAX_MERGE_RECORDS) {
            throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Maximum ${_constants.MUTATION_MAX_MERGE_RECORDS} records can be merged at once`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_QUERY_INPUT, {
                userFriendlyMessage: /*i18n*/ {
                    id: "84/Dko",
                    message: "You can merge up to {MUTATION_MAX_MERGE_RECORDS} records at once.",
                    values: {
                        MUTATION_MAX_MERGE_RECORDS: _constants.MUTATION_MAX_MERGE_RECORDS
                    }
                }
            });
        }
        if (conflictPriorityIndex < 0 || conflictPriorityIndex >= ids.length) {
            throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Invalid conflict priority '${conflictPriorityIndex}'. Valid options for ${ids.length} records: 0-${ids.length - 1}`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_QUERY_INPUT, {
                userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
            });
        }
    }
    constructor(...args){
        super(...args), this.operationName = _commonqueryargstype.CommonQueryNames.MERGE_MANY, this.logger = new _common.Logger(CommonMergeManyQueryRunnerService.name);
    }
};
CommonMergeManyQueryRunnerService = _ts_decorate([
    (0, _common.Injectable)()
], CommonMergeManyQueryRunnerService);

//# sourceMappingURL=common-merge-many-query-runner.service.js.map
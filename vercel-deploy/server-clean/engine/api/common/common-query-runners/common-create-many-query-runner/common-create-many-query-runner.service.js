"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CommonCreateManyQueryRunnerService", {
    enumerable: true,
    get: function() {
        return CommonCreateManyQueryRunnerService;
    }
});
const _common = require("@nestjs/common");
const _constants = require("twenty-shared/constants");
const _utils = require("twenty-shared/utils");
const _typeorm = require("typeorm");
const _commonbasequeryrunnerservice = require("../common-base-query-runner.service");
const _buildwhereconditionsutil = require("./utils/build-where-conditions.util");
const _categorizerecordsutil = require("./utils/categorize-records.util");
const _getconflictingfieldsutil = require("./utils/get-conflicting-fields.util");
const _commonqueryrunnerexception = require("../errors/common-query-runner.exception");
const _standarderrormessageconstant = require("../errors/standard-error-message.constant");
const _commonqueryargstype = require("../../types/common-query-args.type");
const _buildcolumnstoreturn = require("../../../graphql/graphql-query-runner/utils/build-columns-to-return");
const _buildcolumnstoselect = require("../../../graphql/graphql-query-runner/utils/build-columns-to-select");
const _assertisvaliduuidutil = require("../../../graphql/workspace-query-runner/utils/assert-is-valid-uuid.util");
const _getallselectablecolumnnamesutils = require("../../../utils/get-all-selectable-column-names.utils");
const _findflatentitybyidinflatentitymapsutil = require("../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _buildfieldmapsfromflatobjectmetadatautil = require("../../../../metadata-modules/flat-field-metadata/utils/build-field-maps-from-flat-object-metadata.util");
const _assertmutationnotonremoteobjectutil = require("../../../../metadata-modules/object-metadata/utils/assert-mutation-not-on-remote-object.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let CommonCreateManyQueryRunnerService = class CommonCreateManyQueryRunnerService extends _commonbasequeryrunnerservice.CommonBaseQueryRunnerService {
    async run(args, queryRunnerContext) {
        if (args.data.length > _constants.QUERY_MAX_RECORDS) {
            throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Maximum number of records to upsert is ${_constants.QUERY_MAX_RECORDS}.`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.TOO_MANY_RECORDS_TO_UPDATE, {
                userFriendlyMessage: /*i18n*/ {
                    id: "hw7Mwk",
                    message: "Maximum number of records to upsert is {QUERY_MAX_RECORDS}.",
                    values: {
                        QUERY_MAX_RECORDS: _constants.QUERY_MAX_RECORDS
                    }
                }
            });
        }
        const { repository, authContext, rolePermissionConfig, flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps, workspaceDataSource } = queryRunnerContext;
        const objectRecords = await this.insertOrUpsertRecords({
            repository,
            flatObjectMetadata,
            flatObjectMetadataMaps,
            flatFieldMetadataMaps,
            args
        });
        const upsertedRecords = await this.fetchUpsertedRecords({
            objectRecords,
            flatObjectMetadata,
            flatObjectMetadataMaps,
            flatFieldMetadataMaps,
            repository,
            selectedFieldsResult: args.selectedFieldsResult
        });
        await this.processNestedRelationsIfNeeded({
            args,
            records: upsertedRecords,
            flatObjectMetadata,
            flatObjectMetadataMaps,
            flatFieldMetadataMaps,
            authContext,
            workspaceDataSource,
            rolePermissionConfig
        });
        return upsertedRecords;
    }
    async processNestedRelationsIfNeeded({ args, records, flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps, authContext, workspaceDataSource, rolePermissionConfig }) {
        if (!args.selectedFieldsResult.relations) {
            return;
        }
        await this.processNestedRelationsHelper.processNestedRelations({
            flatObjectMetadataMaps,
            flatFieldMetadataMaps,
            parentObjectMetadataItem: flatObjectMetadata,
            parentObjectRecords: records,
            relations: args.selectedFieldsResult.relations,
            limit: _constants.QUERY_MAX_RECORDS,
            authContext,
            workspaceDataSource,
            rolePermissionConfig,
            selectedFields: args.selectedFieldsResult.select
        });
    }
    async computeArgs(args, queryRunnerContext) {
        const { authContext, flatObjectMetadata, flatFieldMetadataMaps, flatObjectMetadataMaps } = queryRunnerContext;
        return {
            ...args,
            data: await this.dataArgProcessor.process({
                partialRecordInputs: args.data,
                authContext,
                flatObjectMetadata,
                flatFieldMetadataMaps,
                flatObjectMetadataMaps
            })
        };
    }
    async validate(args, queryRunnerContext) {
        const { flatObjectMetadata } = queryRunnerContext;
        (0, _assertmutationnotonremoteobjectutil.assertMutationNotOnRemoteObject)(flatObjectMetadata);
        args.data.forEach((record)=>{
            if (record?.id) {
                (0, _assertisvaliduuidutil.assertIsValidUuid)(record.id);
            }
        });
    }
    async insertOrUpsertRecords({ repository, flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps, args }) {
        const { selectedFieldsResult } = args;
        if (!args.upsert) {
            const selectedColumns = (0, _buildcolumnstoreturn.buildColumnsToReturn)({
                select: selectedFieldsResult.select,
                relations: selectedFieldsResult.relations,
                flatObjectMetadata,
                flatObjectMetadataMaps,
                flatFieldMetadataMaps
            });
            return await repository.insert(args.data, undefined, selectedColumns);
        }
        return this.performUpsertOperation({
            repository,
            flatObjectMetadata,
            flatObjectMetadataMaps,
            flatFieldMetadataMaps,
            args,
            selectedFieldsResult
        });
    }
    async performUpsertOperation({ repository, flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps, args, selectedFieldsResult }) {
        const conflictingFieldGroups = (0, _getconflictingfieldsutil.getConflictingFields)(flatObjectMetadata, flatFieldMetadataMaps);
        const existingRecords = await this.findExistingRecords({
            repository,
            flatObjectMetadata,
            flatFieldMetadataMaps,
            args,
            conflictingFieldGroups
        });
        const { recordsToUpdate, recordsToInsert } = (0, _categorizerecordsutil.categorizeRecords)(args.data, conflictingFieldGroups, existingRecords);
        const result = {
            identifiers: [],
            generatedMaps: [],
            raw: []
        };
        const columnsToReturn = (0, _buildcolumnstoreturn.buildColumnsToReturn)({
            select: selectedFieldsResult.select,
            relations: selectedFieldsResult.relations,
            flatObjectMetadata,
            flatObjectMetadataMaps,
            flatFieldMetadataMaps
        });
        if (recordsToUpdate.length > 0) {
            await this.processRecordsToUpdate({
                partialRecordsToUpdate: recordsToUpdate,
                repository,
                flatObjectMetadata,
                flatFieldMetadataMaps,
                result,
                columnsToReturn
            });
        }
        await this.processRecordsToInsert({
            recordsToInsert,
            repository,
            result,
            columnsToReturn
        });
        return result;
    }
    async findExistingRecords({ repository, flatObjectMetadata, flatFieldMetadataMaps, args, conflictingFieldGroups }) {
        const queryBuilder = repository.createQueryBuilder(flatObjectMetadata.nameSingular);
        const whereConditions = (0, _buildwhereconditionsutil.buildWhereConditions)(args.data, conflictingFieldGroups);
        if (whereConditions.length === 0) {
            return [];
        }
        whereConditions.forEach((condition)=>{
            queryBuilder.orWhere(condition);
        });
        const restrictedFields = repository.objectRecordsPermissions?.[flatObjectMetadata.id]?.restrictedFields;
        const selectOptions = (0, _getallselectablecolumnnamesutils.getAllSelectableColumnNames)({
            restrictedFields: restrictedFields ?? {},
            objectMetadata: {
                objectMetadataMapItem: flatObjectMetadata,
                flatFieldMetadataMaps
            }
        });
        return await queryBuilder.withDeleted().setFindOptions({
            select: selectOptions
        }).getMany();
    }
    async processRecordsToUpdate({ partialRecordsToUpdate, repository, flatObjectMetadata, flatFieldMetadataMaps, result, columnsToReturn }) {
        const partialRecordsToUpdateWithoutCreatedByUpdate = partialRecordsToUpdate.map((record)=>this.getRecordWithoutCreatedBy(record, flatObjectMetadata, flatFieldMetadataMaps));
        const savedRecords = await repository.updateMany(partialRecordsToUpdateWithoutCreatedByUpdate.map((record)=>({
                criteria: record.id,
                partialEntity: {
                    ...record,
                    deletedAt: null
                }
            })), undefined, columnsToReturn);
        result.identifiers.push(...savedRecords.generatedMaps.map((record)=>({
                id: record.id
            })));
        result.generatedMaps.push(...savedRecords.generatedMaps.map((record)=>({
                id: record.id
            })));
    }
    async processRecordsToInsert({ recordsToInsert, repository, result, columnsToReturn }) {
        if (recordsToInsert.length > 0) {
            const insertResult = await repository.insert(recordsToInsert, undefined, columnsToReturn);
            result.identifiers.push(...insertResult.identifiers);
            result.generatedMaps.push(...insertResult.generatedMaps);
            result.raw.push(...insertResult.raw);
        }
    }
    async fetchUpsertedRecords({ objectRecords, flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps, repository, selectedFieldsResult }) {
        const queryBuilder = repository.createQueryBuilder(flatObjectMetadata.nameSingular);
        const columnsToSelect = (0, _buildcolumnstoselect.buildColumnsToSelect)({
            select: selectedFieldsResult.select,
            relations: selectedFieldsResult.relations,
            flatObjectMetadata,
            flatObjectMetadataMaps,
            flatFieldMetadataMaps
        });
        const orderedIds = objectRecords.generatedMaps.map((record)=>record.id);
        const upsertedRecords = await queryBuilder.setFindOptions({
            select: columnsToSelect
        }).where({
            id: (0, _typeorm.In)(orderedIds)
        }).withDeleted().take(_constants.QUERY_MAX_RECORDS).getMany();
        const orderIndex = new Map(orderedIds.map((id, index)=>[
                id,
                index
            ]));
        upsertedRecords.sort((a, b)=>(orderIndex.get(a.id) ?? 0) - (orderIndex.get(b.id) ?? 0));
        return upsertedRecords;
    }
    async processQueryResult(queryResult, flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps, authContext) {
        return await this.commonResultGettersService.processRecordArray(queryResult, flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps, authContext.workspace.id);
    }
    getRecordWithoutCreatedBy(record, flatObjectMetadata, flatFieldMetadataMaps) {
        let recordWithoutCreatedByUpdate = record;
        const { fieldIdByName } = (0, _buildfieldmapsfromflatobjectmetadatautil.buildFieldMapsFromFlatObjectMetadata)(flatFieldMetadataMaps, flatObjectMetadata);
        const createdByFieldMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId: fieldIdByName['createdBy'],
            flatEntityMaps: flatFieldMetadataMaps
        });
        if (!(0, _utils.isDefined)(createdByFieldMetadata)) {
            throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Missing createdBy field metadata for object ${flatObjectMetadata.nameSingular}`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.MISSING_SYSTEM_FIELD, {
                userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
            });
        }
        if ('createdBy' in record && createdByFieldMetadata.isCustom === false) {
            const { createdBy: _createdBy, ...recordWithoutCreatedBy } = record;
            recordWithoutCreatedByUpdate = recordWithoutCreatedBy;
        }
        return recordWithoutCreatedByUpdate;
    }
    constructor(...args){
        super(...args), this.operationName = _commonqueryargstype.CommonQueryNames.CREATE_MANY;
    }
};
CommonCreateManyQueryRunnerService = _ts_decorate([
    (0, _common.Injectable)()
], CommonCreateManyQueryRunnerService);

//# sourceMappingURL=common-create-many-query-runner.service.js.map
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CommonFindDuplicatesQueryRunnerService", {
    enumerable: true,
    get: function() {
        return CommonFindDuplicatesQueryRunnerService;
    }
});
const _common = require("@nestjs/common");
const _lodashisempty = /*#__PURE__*/ _interop_require_default(require("lodash.isempty"));
const _constants = require("twenty-shared/constants");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _typeorm = require("typeorm");
const _commonbasequeryrunnerservice = require("./common-base-query-runner.service");
const _commonqueryrunnerexception = require("./errors/common-query-runner.exception");
const _standarderrormessageconstant = require("./errors/standard-error-message.constant");
const _commonqueryargstype = require("../types/common-query-args.type");
const _getpageinfoutil = require("../utils/get-page-info.util");
const _buildcolumnstoselect = require("../../graphql/graphql-query-runner/utils/build-columns-to-select");
const _buildduplicateconditionsutils = require("../../utils/build-duplicate-conditions.utils");
const _buildfieldmapsfromflatobjectmetadatautil = require("../../../metadata-modules/flat-field-metadata/utils/build-field-maps-from-flat-object-metadata.util");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let CommonFindDuplicatesQueryRunnerService = class CommonFindDuplicatesQueryRunnerService extends _commonbasequeryrunnerservice.CommonBaseQueryRunnerService {
    async run(args, queryRunnerContext) {
        const { repository, flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps, commonQueryParser, authContext, workspaceDataSource, rolePermissionConfig } = queryRunnerContext;
        const existingRecordsQueryBuilder = repository.createQueryBuilder(flatObjectMetadata.nameSingular);
        let objectRecords = [];
        const columnsToSelect = (0, _buildcolumnstoselect.buildColumnsToSelect)({
            select: args.selectedFieldsResult.select,
            relations: args.selectedFieldsResult.relations,
            flatObjectMetadata,
            flatObjectMetadataMaps,
            flatFieldMetadataMaps
        });
        if ((0, _utils.isDefined)(args.ids) && args.ids.length > 0) {
            const fetchedRecords = await existingRecordsQueryBuilder.where({
                id: (0, _typeorm.In)(args.ids)
            }).setFindOptions({
                select: columnsToSelect
            }).getMany();
            const orderIndex = new Map(args.ids.map((id, index)=>[
                    id,
                    index
                ]));
            fetchedRecords.sort((a, b)=>(orderIndex.get(a.id) ?? 0) - (orderIndex.get(b.id) ?? 0));
            objectRecords = fetchedRecords;
        } else if (args.data && !(0, _lodashisempty.default)(args.data)) {
            objectRecords = args.data;
        }
        const findDuplicatesOutput = await Promise.all(objectRecords.map(async (record)=>{
            const duplicateConditions = (0, _buildduplicateconditionsutils.buildDuplicateConditions)(flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps, [
                record
            ], record.id);
            if ((0, _lodashisempty.default)(duplicateConditions)) {
                return {
                    records: [],
                    totalCount: 0,
                    hasNextPage: false,
                    hasPreviousPage: false,
                    startCursor: null,
                    endCursor: null
                };
            }
            const duplicateRecordsQueryBuilder = repository.createQueryBuilder(flatObjectMetadata.nameSingular);
            commonQueryParser.applyFilterToBuilder(duplicateRecordsQueryBuilder, flatObjectMetadata.nameSingular, duplicateConditions);
            const duplicates = await duplicateRecordsQueryBuilder.setFindOptions({
                select: columnsToSelect
            }).take(_constants.QUERY_MAX_RECORDS).getMany();
            const aggregateQueryBuilder = duplicateRecordsQueryBuilder.clone();
            const totalCount = await aggregateQueryBuilder.getCount();
            const { startCursor, endCursor } = (0, _getpageinfoutil.getPageInfo)(duplicates, [
                {
                    id: _types.OrderByDirection.AscNullsFirst
                }
            ], _constants.QUERY_MAX_RECORDS, true);
            return {
                records: duplicates,
                totalCount,
                hasNextPage: false,
                hasPreviousPage: false,
                startCursor,
                endCursor
            };
        }));
        if ((0, _utils.isDefined)(args.selectedFieldsResult.relations)) {
            await this.processNestedRelationsHelper.processNestedRelations({
                flatObjectMetadataMaps,
                flatFieldMetadataMaps,
                parentObjectMetadataItem: flatObjectMetadata,
                parentObjectRecords: findDuplicatesOutput.flatMap((item)=>item.records),
                parentObjectRecordsAggregatedValues: {},
                relations: args.selectedFieldsResult.relations,
                limit: _constants.QUERY_MAX_RECORDS_FROM_RELATION,
                authContext,
                workspaceDataSource,
                rolePermissionConfig,
                selectedFields: args.selectedFieldsResult.select
            });
        }
        return findDuplicatesOutput;
    }
    async computeArgs(args, queryRunnerContext) {
        const { authContext, flatObjectMetadata, flatFieldMetadataMaps, flatObjectMetadataMaps } = queryRunnerContext;
        const { fieldIdByName } = (0, _buildfieldmapsfromflatobjectmetadatautil.buildFieldMapsFromFlatObjectMetadata)(flatFieldMetadataMaps, flatObjectMetadata);
        return {
            ...args,
            ids: await Promise.all(args.ids?.map((id)=>this.queryRunnerArgsFactory.overrideValueByFieldMetadata('id', id, fieldIdByName, flatObjectMetadata, flatFieldMetadataMaps)) ?? []),
            data: await this.dataArgProcessor.process({
                partialRecordInputs: args.data,
                authContext,
                flatObjectMetadata,
                flatFieldMetadataMaps,
                flatObjectMetadataMaps,
                shouldBackfillPositionIfUndefined: false
            })
        };
    }
    async processQueryResult(queryResult, flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps, authContext) {
        const processedResults = await Promise.all(queryResult.map(async (result)=>{
            return {
                ...result,
                records: await this.commonResultGettersService.processRecordArray(result.records, flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps, authContext.workspace.id)
            };
        }));
        return processedResults;
    }
    async validate(args, _queryRunnerContext) {
        if (!args.data && !args.ids) {
            throw new _commonqueryrunnerexception.CommonQueryRunnerException('You have to provide either "data" or "ids" argument', _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_QUERY_INPUT, {
                userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
            });
        }
        if (args.data && args.ids) {
            throw new _commonqueryrunnerexception.CommonQueryRunnerException('You cannot provide both "data" and "ids" arguments', _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_QUERY_INPUT, {
                userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
            });
        }
        if (!args.ids && (0, _lodashisempty.default)(args.data)) {
            throw new _commonqueryrunnerexception.CommonQueryRunnerException('The "data" condition can not be empty when "ids" input not provided', _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_QUERY_INPUT, {
                userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
            });
        }
    }
    constructor(...args){
        super(...args), this.operationName = _commonqueryargstype.CommonQueryNames.FIND_DUPLICATES;
    }
};
CommonFindDuplicatesQueryRunnerService = _ts_decorate([
    (0, _common.Injectable)()
], CommonFindDuplicatesQueryRunnerService);

//# sourceMappingURL=common-find-duplicates-query-runner.service.js.map
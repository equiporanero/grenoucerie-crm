"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CommonFindManyQueryRunnerService", {
    enumerable: true,
    get: function() {
        return CommonFindManyQueryRunnerService;
    }
});
const _common = require("@nestjs/common");
const _classvalidator = require("class-validator");
const _constants = require("twenty-shared/constants");
const _types = require("twenty-shared/types");
const _commonbasequeryrunnerservice = require("./common-base-query-runner.service");
const _commonqueryrunnerexception = require("./errors/common-query-runner.exception");
const _standarderrormessageconstant = require("./errors/standard-error-message.constant");
const _commonqueryargstype = require("../types/common-query-args.type");
const _getpageinfoutil = require("../utils/get-page-info.util");
const _processaggregatehelper = require("../../graphql/graphql-query-runner/helpers/process-aggregate.helper");
const _buildcolumnstoselect = require("../../graphql/graphql-query-runner/utils/build-columns-to-select");
const _cursorsutil = require("../../graphql/graphql-query-runner/utils/cursors.util");
const _computecursorargfilterutils = require("../../utils/compute-cursor-arg-filter.utils");
const _validateandgetorderbyutils = require("../../utils/validate-and-get-order-by.utils");
const _buildfieldmapsfromflatobjectmetadatautil = require("../../../metadata-modules/flat-field-metadata/utils/build-field-maps-from-flat-object-metadata.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let CommonFindManyQueryRunnerService = class CommonFindManyQueryRunnerService extends _commonbasequeryrunnerservice.CommonBaseQueryRunnerService {
    async run(args, queryRunnerContext) {
        const { repository, authContext, rolePermissionConfig, flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps, workspaceDataSource, commonQueryParser } = queryRunnerContext;
        const queryBuilder = repository.createQueryBuilder(flatObjectMetadata.nameSingular);
        const aggregateQueryBuilder = queryBuilder.clone();
        let appliedFilters = args.filter ?? {};
        commonQueryParser.applyFilterToBuilder(aggregateQueryBuilder, flatObjectMetadata.nameSingular, appliedFilters);
        commonQueryParser.applyDeletedAtToBuilder(aggregateQueryBuilder, appliedFilters);
        const orderByWithIdCondition = [
            ...args.orderBy ?? [],
            {
                id: _types.OrderByDirection.AscNullsFirst
            }
        ];
        const isForwardPagination = !(0, _classvalidator.isDefined)(args.before);
        const cursor = (0, _cursorsutil.getCursor)(args);
        if (cursor) {
            const { fieldIdByName } = (0, _buildfieldmapsfromflatobjectmetadatautil.buildFieldMapsFromFlatObjectMetadata)(flatFieldMetadataMaps, flatObjectMetadata);
            if ((0, _validateandgetorderbyutils.hasRelationFieldInOrderBy)(args.orderBy ?? [], flatFieldMetadataMaps, fieldIdByName)) {
            // Not throwing exception because still used on record show page
            /* throw new GraphqlQueryRunnerException(
          'Cursor-based pagination is not supported with relation field ordering. Use offset pagination instead.',
          GraphqlQueryRunnerExceptionCode.INVALID_CURSOR,
          { userFriendlyMessage: STANDARD_ERROR_MESSAGE },
        ); */ }
            const cursorArgFilter = (0, _computecursorargfilterutils.computeCursorArgFilter)(cursor, orderByWithIdCondition, flatObjectMetadata, flatFieldMetadataMaps, isForwardPagination);
            appliedFilters = args.filter ? {
                and: [
                    args.filter,
                    {
                        or: cursorArgFilter
                    }
                ]
            } : {
                or: cursorArgFilter
            };
        }
        commonQueryParser.applyFilterToBuilder(queryBuilder, flatObjectMetadata.nameSingular, appliedFilters);
        const parsedOrderBy = commonQueryParser.applyOrderToBuilder(queryBuilder, orderByWithIdCondition, flatObjectMetadata.nameSingular, isForwardPagination);
        commonQueryParser.applyDeletedAtToBuilder(queryBuilder, appliedFilters);
        _processaggregatehelper.ProcessAggregateHelper.addSelectedAggregatedFieldsQueriesToQueryBuilder({
            selectedAggregatedFields: args.selectedFieldsResult.aggregate,
            queryBuilder: aggregateQueryBuilder,
            objectMetadataNameSingular: flatObjectMetadata.nameSingular
        });
        const limit = args.first ?? args.last ?? _constants.QUERY_MAX_RECORDS;
        const columnsToSelect = (0, _buildcolumnstoselect.buildColumnsToSelect)({
            select: args.selectedFieldsResult.select,
            relations: args.selectedFieldsResult.relations,
            flatObjectMetadata,
            flatObjectMetadataMaps,
            flatFieldMetadataMaps
        });
        if ((0, _classvalidator.isDefined)(args.offset)) {
            queryBuilder.skip(args.offset);
        }
        queryBuilder.setFindOptions({
            select: columnsToSelect
        });
        queryBuilder.take(limit + 1);
        // Add order columns AFTER setFindOptions (setFindOptions clears addSelect)
        // Pass columnsToSelect so we only add columns that aren't already selected
        commonQueryParser.addRelationOrderColumnsToBuilder(queryBuilder, parsedOrderBy, flatObjectMetadata.nameSingular, columnsToSelect);
        const objectRecords = await queryBuilder.getMany();
        const pageInfo = (0, _getpageinfoutil.getPageInfo)(objectRecords, orderByWithIdCondition, limit, isForwardPagination);
        if (!isForwardPagination) {
            objectRecords.reverse();
        }
        const hasAggregatedFields = Object.keys(args.selectedFieldsResult.aggregate ?? {}).length > 0;
        const parentObjectRecordsAggregatedValues = hasAggregatedFields ? await aggregateQueryBuilder.getRawOne() : undefined;
        if ((0, _classvalidator.isDefined)(args.selectedFieldsResult.relations)) {
            await this.processNestedRelationsHelper.processNestedRelations({
                flatObjectMetadataMaps,
                flatFieldMetadataMaps,
                parentObjectMetadataItem: flatObjectMetadata,
                parentObjectRecords: objectRecords,
                parentObjectRecordsAggregatedValues,
                relations: args.selectedFieldsResult.relations,
                aggregate: args.selectedFieldsResult.aggregate,
                limit: _constants.QUERY_MAX_RECORDS_FROM_RELATION,
                authContext,
                workspaceDataSource,
                rolePermissionConfig,
                selectedFields: args.selectedFieldsResult.select
            });
        }
        return {
            records: objectRecords,
            aggregatedValues: parentObjectRecordsAggregatedValues,
            totalCount: parentObjectRecordsAggregatedValues?.totalCount,
            pageInfo,
            selectedFieldsResult: args.selectedFieldsResult
        };
    }
    async computeArgs(args, queryRunnerContext) {
        const { flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps } = queryRunnerContext;
        return {
            ...args,
            orderBy: this.orderByArgProcessor.process({
                orderBy: args.orderBy
            }),
            filter: this.filterArgProcessor.process({
                filter: args.filter,
                flatObjectMetadata,
                flatObjectMetadataMaps,
                flatFieldMetadataMaps
            })
        };
    }
    async processQueryResult(queryResult, flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps, authContext) {
        const processedRecords = await this.commonResultGettersService.processRecordArray(queryResult.records, flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps, authContext.workspace.id);
        return {
            ...queryResult,
            records: processedRecords
        };
    }
    async validate(args, _queryRunnerContext) {
        if (args.first && args.last) {
            throw new _commonqueryrunnerexception.CommonQueryRunnerException('Cannot provide both first and last', _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.ARGS_CONFLICT, {
                userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
            });
        }
        if (args.before && args.after) {
            throw new _commonqueryrunnerexception.CommonQueryRunnerException('Cannot provide both before and after', _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.ARGS_CONFLICT, {
                userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
            });
        }
        if (args.before && args.first) {
            throw new _commonqueryrunnerexception.CommonQueryRunnerException('Cannot provide both before and first', _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.ARGS_CONFLICT, {
                userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
            });
        }
        if (args.after && args.last) {
            throw new _commonqueryrunnerexception.CommonQueryRunnerException('Cannot provide both after and last', _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.ARGS_CONFLICT, {
                userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
            });
        }
        if (args.first !== undefined && args.first < 0) {
            throw new _commonqueryrunnerexception.CommonQueryRunnerException('First argument must be non-negative', _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_ARGS_FIRST, {
                userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
            });
        }
        if (args.last !== undefined && args.last < 0) {
            throw new _commonqueryrunnerexception.CommonQueryRunnerException('Last argument must be non-negative', _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_ARGS_LAST, {
                userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
            });
        }
    }
    computeQueryComplexity(selectedFieldsResult, args, queryRunnerContext) {
        const baseComplexity = super.computeQueryComplexity(selectedFieldsResult, args, queryRunnerContext);
        const { flatObjectMetadata, flatFieldMetadataMaps } = queryRunnerContext;
        const { fieldIdByName } = (0, _buildfieldmapsfromflatobjectmetadatautil.buildFieldMapsFromFlatObjectMetadata)(flatFieldMetadataMaps, flatObjectMetadata);
        const orderByRelationCount = (0, _validateandgetorderbyutils.countRelationFieldsInOrderBy)(args.orderBy ?? [], flatFieldMetadataMaps, fieldIdByName);
        return baseComplexity + orderByRelationCount;
    }
    constructor(...args){
        super(...args), this.operationName = _commonqueryargstype.CommonQueryNames.FIND_MANY, this.isReadOnly = true;
    }
};
CommonFindManyQueryRunnerService = _ts_decorate([
    (0, _common.Injectable)()
], CommonFindManyQueryRunnerService);

//# sourceMappingURL=common-find-many-query-runner.service.js.map
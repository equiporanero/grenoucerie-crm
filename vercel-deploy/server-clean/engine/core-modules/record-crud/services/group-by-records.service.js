"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GroupByRecordsService", {
    enumerable: true,
    get: function() {
        return GroupByRecordsService;
    }
});
const _common = require("@nestjs/common");
const _constants = require("twenty-shared/constants");
const _types = require("twenty-shared/types");
const _groupbyargprocessorservice = require("../../../api/common/common-args-processors/group-by-arg-processor/group-by-arg-processor.service");
const _commongroupbyqueryrunnerservice = require("../../../api/common/common-query-runners/common-group-by-query-runner.service");
const _commonqueryrunnerexception = require("../../../api/common/common-query-runners/errors/common-query-runner.exception");
const _recordcrudexception = require("../exceptions/record-crud.exception");
const _commonapicontextbuilderservice = require("./common-api-context-builder.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let GroupByRecordsService = class GroupByRecordsService {
    async execute(params) {
        const { objectName, groupBy, aggregateOperation = _types.AggregateOperations.COUNT, aggregateFieldName, limit, orderBy = 'DESC', filter, authContext } = params;
        try {
            const { queryRunnerContext, flatObjectMetadata, flatFieldMetadataMaps, objectsPermissions } = await this.commonApiContextBuilder.build({
                authContext,
                objectName
            });
            const availableAggregations = this.groupByArgProcessor.getAvailableAggregations({
                flatObjectMetadata,
                flatFieldMetadataMaps,
                restrictedFields: objectsPermissions[flatObjectMetadata.id]?.restrictedFields
            });
            let aggregateFieldKey;
            try {
                aggregateFieldKey = this.groupByArgProcessor.resolveToolAggregateFieldKeyOrThrow({
                    aggregateOperation,
                    aggregateFieldName,
                    availableAggregations
                });
            } catch (error) {
                if (error instanceof _commonqueryrunnerexception.CommonQueryRunnerException) {
                    throw new _recordcrudexception.RecordCrudException(error.message, _recordcrudexception.RecordCrudExceptionCode.INVALID_REQUEST);
                }
                throw error;
            }
            const selectedFields = {
                [aggregateFieldKey]: true,
                groupByDimensionValues: true
            };
            const mappedOrderBy = [
                {
                    aggregate: {
                        [aggregateFieldKey]: orderBy === 'ASC' ? _types.OrderByDirection.AscNullsLast : _types.OrderByDirection.DescNullsLast
                    }
                }
            ];
            const clampedLimit = limit ? Math.min(limit, _constants.QUERY_MAX_RECORDS) : _constants.QUERY_MAX_RECORDS;
            const { results } = await this.commonGroupByRunner.execute({
                filter: filter ?? {},
                groupBy,
                orderBy: mappedOrderBy,
                selectedFields,
                limit: clampedLimit
            }, queryRunnerContext);
            const dimensionLabels = groupBy.map((entry)=>this.getDimensionLabelFromGroupByEntry(entry));
            this.logger.log(`Grouped ${objectName} by ${dimensionLabels.join(', ')}: ${results.length} groups`);
            return {
                success: true,
                message: `Grouped ${objectName} by ${dimensionLabels.join(', ')}: ${results.length} groups`,
                result: {
                    groups: results.map((item)=>({
                            dimensions: item.groupByDimensionValues,
                            value: item[aggregateFieldKey]
                        })),
                    dimensionLabels,
                    aggregation: aggregateOperation,
                    groupCount: results.length
                }
            };
        } catch (error) {
            if (error instanceof _recordcrudexception.RecordCrudException) {
                return {
                    success: false,
                    message: `Failed to group ${objectName} records`,
                    error: error.message
                };
            }
            this.logger.error(`Failed to group records: ${error}`);
            return {
                success: false,
                message: `Failed to group ${objectName} records`,
                error: error instanceof Error ? error.message : 'Failed to group records'
            };
        }
    }
    getDimensionLabelFromGroupByEntry(entry) {
        const fieldEntries = Object.entries(entry);
        if (fieldEntries.length === 0) {
            return '';
        }
        const [fieldName, fieldDefinition] = fieldEntries[0];
        if (fieldDefinition === true) {
            return fieldName;
        }
        if (typeof fieldDefinition !== 'object' || fieldDefinition === null) {
            return fieldName;
        }
        const nestedEntries = Object.entries(fieldDefinition);
        if (nestedEntries.length !== 1) {
            return fieldName;
        }
        const [nestedFieldName, nestedFieldDefinition] = nestedEntries[0];
        if (nestedFieldDefinition !== true) {
            return fieldName;
        }
        if (nestedFieldName === 'id' && fieldName.endsWith('Id')) {
            return fieldName;
        }
        return `${fieldName}.${nestedFieldName}`;
    }
    constructor(commonGroupByRunner, commonApiContextBuilder, groupByArgProcessor){
        this.commonGroupByRunner = commonGroupByRunner;
        this.commonApiContextBuilder = commonApiContextBuilder;
        this.groupByArgProcessor = groupByArgProcessor;
        this.logger = new _common.Logger(GroupByRecordsService.name);
    }
};
GroupByRecordsService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _commongroupbyqueryrunnerservice.CommonGroupByQueryRunnerService === "undefined" ? Object : _commongroupbyqueryrunnerservice.CommonGroupByQueryRunnerService,
        typeof _commonapicontextbuilderservice.CommonApiContextBuilderService === "undefined" ? Object : _commonapicontextbuilderservice.CommonApiContextBuilderService,
        typeof _groupbyargprocessorservice.GroupByArgProcessorService === "undefined" ? Object : _groupbyargprocessorservice.GroupByArgProcessorService
    ])
], GroupByRecordsService);

//# sourceMappingURL=group-by-records.service.js.map
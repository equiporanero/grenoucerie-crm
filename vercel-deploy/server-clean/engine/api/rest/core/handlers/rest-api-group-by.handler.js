"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RestApiGroupByHandler", {
    enumerable: true,
    get: function() {
        return RestApiGroupByHandler;
    }
});
const _common = require("@nestjs/common");
const _constants = require("twenty-shared/constants");
const _groupbyargprocessorservice = require("../../../common/common-args-processors/group-by-arg-processor/group-by-arg-processor.service");
const _commongroupbyqueryrunnerservice = require("../../../common/common-query-runners/common-group-by-query-runner.service");
const _restapibasehandler = require("./rest-api-base.handler");
const _parseaggregatefieldsrestrequestutil = require("../../input-request-parsers/aggregate-fields-parser-utils/parse-aggregate-fields-rest-request.util");
const _parsefilterrestrequestutil = require("../../input-request-parsers/filter-parser-utils/parse-filter-rest-request.util");
const _parsegroupbyrestrequestutil = require("../../input-request-parsers/group-by-parser-utils/parse-group-by-rest-request.util");
const _parseincluderecordssamplerestrequestutil = require("../../input-request-parsers/group-by-with-records/parse-include-records-sample-rest-request.util");
const _parselimitrestrequestutil = require("../../input-request-parsers/limit-parser-utils/parse-limit-rest-request.util");
const _parseorderbyforrecordsrestrequestutil = require("../../input-request-parsers/order-by-with-group-by-parser-utils/parse-order-by-for-records-rest-request.util");
const _parseorderbywithgroupbyrestrequestutil = require("../../input-request-parsers/order-by-with-group-by-parser-utils/parse-order-by-with-group-by-rest-request.util");
const _parseviewidrestrequestutil = require("../../input-request-parsers/view-id-parser-utils/parse-view-id-rest-request.util");
const _workspacequeryrunnerrestapiexceptionhandlerutil = require("../../utils/workspace-query-runner-rest-api-exception-handler.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let RestApiGroupByHandler = class RestApiGroupByHandler extends _restapibasehandler.RestApiBaseHandler {
    async handle(request) {
        try {
            const { filter, orderBy, viewId, groupBy, selectedFields, authContext, flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps, objectIdByNameSingular, includeRecords, orderByForRecords, limit } = await this.parseRequestArgs(request);
            const { results } = await this.commonGroupByQueryRunnerService.execute({
                filter,
                orderBy,
                viewId,
                groupBy,
                selectedFields,
                limit,
                includeRecords,
                orderByForRecords
            }, {
                authContext,
                flatObjectMetadata,
                flatObjectMetadataMaps,
                flatFieldMetadataMaps,
                objectIdByNameSingular
            });
            return results;
        } catch (error) {
            return (0, _workspacequeryrunnerrestapiexceptionhandlerutil.workspaceQueryRunnerRestApiExceptionHandler)(error);
        }
    }
    async parseRequestArgs(request) {
        const { authContext, flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps, objectIdByNameSingular } = await this.buildCommonOptions(request);
        const orderByWithGroupBy = (0, _parseorderbywithgroupbyrestrequestutil.parseOrderByWithGroupByRestRequest)(request);
        const orderByForRecordsWithGroupBy = (0, _parseorderbyforrecordsrestrequestutil.parseOrderByForRecordsWithGroupByRestRequest)(request);
        const filter = (0, _parsefilterrestrequestutil.parseFilterRestRequest)(request);
        const viewId = (0, _parseviewidrestrequestutil.parseViewIdRestRequest)(request);
        const groupBy = (0, _parsegroupbyrestrequestutil.parseGroupByRestRequest)(request);
        const includeRecords = (0, _parseincluderecordssamplerestrequestutil.parseIncludeRecordsSampleRestRequest)(request);
        const aggregateFields = (0, _parseaggregatefieldsrestrequestutil.parseAggregateFieldsRestRequest)(request);
        const availableAggregations = this.groupByArgProcessor.getAvailableAggregations({
            flatObjectMetadata,
            flatFieldMetadataMaps
        });
        this.groupByArgProcessor.validateAggregateFieldKeysOrThrow({
            aggregateFieldKeys: Object.keys(aggregateFields),
            availableAggregations
        });
        const limit = (0, _parselimitrestrequestutil.parseLimitRestRequest)(request, _constants.DEFAULT_NUMBER_OF_GROUPS_LIMIT);
        let selectedFields = {
            ...aggregateFields,
            groupByDimensionValues: true
        };
        if (includeRecords) {
            const selectableFields = await this.computeSelectedFields({
                depth: 0,
                flatObjectMetadata,
                flatObjectMetadataMaps,
                flatFieldMetadataMaps,
                authContext
            });
            selectedFields = {
                ...selectedFields,
                ...selectableFields
            };
        }
        return {
            authContext,
            flatObjectMetadata,
            flatObjectMetadataMaps,
            flatFieldMetadataMaps,
            objectIdByNameSingular,
            filter,
            orderBy: orderByWithGroupBy,
            orderByForRecords: orderByForRecordsWithGroupBy,
            viewId,
            groupBy,
            selectedFields,
            includeRecords,
            limit
        };
    }
    constructor(commonGroupByQueryRunnerService, groupByArgProcessor){
        super(), this.commonGroupByQueryRunnerService = commonGroupByQueryRunnerService, this.groupByArgProcessor = groupByArgProcessor;
    }
};
RestApiGroupByHandler = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _commongroupbyqueryrunnerservice.CommonGroupByQueryRunnerService === "undefined" ? Object : _commongroupbyqueryrunnerservice.CommonGroupByQueryRunnerService,
        typeof _groupbyargprocessorservice.GroupByArgProcessorService === "undefined" ? Object : _groupbyargprocessorservice.GroupByArgProcessorService
    ])
], RestApiGroupByHandler);

//# sourceMappingURL=rest-api-group-by.handler.js.map
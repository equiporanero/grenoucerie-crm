"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ChartDataQueryService", {
    enumerable: true,
    get: function() {
        return ChartDataQueryService;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _commongroupbyqueryrunnerservice = require("../../../../engine/api/common/common-query-runners/common-group-by-query-runner.service");
const _graphdefaultdategranularityconstant = require("../constants/graph-default-date-granularity.constant");
const _graphdefaultorderbyconstant = require("../constants/graph-default-order-by.constant");
const _chartdataexception = require("../exceptions/chart-data.exception");
const _buildaggregatefieldkeyutil = require("../utils/build-aggregate-field-key.util");
const _buildgroupbyfieldobjectutil = require("../utils/build-group-by-field-object.util");
const _convertchartfiltertogqloperationfilterutil = require("../utils/convert-chart-filter-to-gql-operation-filter.util");
const _getfieldmetadatautil = require("../utils/get-field-metadata.util");
const _getgroupbyorderbyutil = require("../utils/get-group-by-order-by.util");
const _isrelationnestedfielddatekindutil = require("../utils/is-relation-nested-field-date-kind.util");
const _transformaggregatevalueutil = require("../utils/transform-aggregate-value.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ChartDataQueryService = class ChartDataQueryService {
    async executeGroupByQuery({ flatObjectMetadata, flatFieldMetadataMaps, flatObjectMetadataMaps, objectIdByNameSingular, authContext, groupByFieldMetadataId, groupBySubFieldName, aggregateFieldMetadataId, aggregateOperation, filter, dateGranularity, userTimezone, firstDayOfTheWeek, limit, primaryAxisOrderBy, secondaryGroupByFieldMetadataId, secondaryGroupBySubFieldName, secondaryDateGranularity, secondaryAxisOrderBy, splitMultiValueFields }) {
        const gqlOperationFilter = (0, _convertchartfiltertogqloperationfilterutil.convertChartFilterToGqlOperationFilter)({
            filter,
            flatFieldMetadataMaps,
            userTimezone
        });
        const primaryGroupByField = (0, _getfieldmetadatautil.getFieldMetadata)(groupByFieldMetadataId, flatFieldMetadataMaps);
        const aggregateField = (0, _getfieldmetadatautil.getFieldMetadata)(aggregateFieldMetadataId, flatFieldMetadataMaps);
        const isPrimaryFieldDate = (0, _utils.isFieldMetadataDateKind)(primaryGroupByField.type);
        const isPrimaryNestedDate = (0, _isrelationnestedfielddatekindutil.isRelationNestedFieldDateKind)({
            relationFieldMetadata: primaryGroupByField,
            relationNestedFieldName: groupBySubFieldName ?? undefined,
            flatObjectMetadataMaps,
            flatFieldMetadataMaps
        });
        const shouldApplyPrimaryDateGranularity = isPrimaryFieldDate || isPrimaryNestedDate;
        const shouldSplitMultiValueFields = splitMultiValueFields ?? true;
        const shouldUnnestPrimary = shouldSplitMultiValueFields && (0, _utils.isFieldMetadataArrayKind)(primaryGroupByField.type);
        const groupBy = [];
        groupBy.push((0, _buildgroupbyfieldobjectutil.buildGroupByFieldObject)({
            fieldMetadata: primaryGroupByField,
            subFieldName: groupBySubFieldName,
            dateGranularity: shouldApplyPrimaryDateGranularity ? dateGranularity ?? _graphdefaultdategranularityconstant.GRAPH_DEFAULT_DATE_GRANULARITY : undefined,
            firstDayOfTheWeek,
            isNestedDateField: isPrimaryNestedDate,
            timeZone: userTimezone,
            shouldUnnest: shouldUnnestPrimary
        }));
        const orderBy = [];
        const primaryOrderBy = (0, _getgroupbyorderbyutil.getGroupByOrderBy)({
            graphOrderBy: primaryAxisOrderBy ?? _graphdefaultorderbyconstant.GRAPH_DEFAULT_ORDER_BY,
            groupByFieldMetadata: primaryGroupByField,
            groupBySubFieldName,
            aggregateOperation,
            aggregateFieldMetadata: aggregateField,
            dateGranularity: shouldApplyPrimaryDateGranularity ? dateGranularity ?? _graphdefaultdategranularityconstant.GRAPH_DEFAULT_DATE_GRANULARITY : undefined
        });
        if ((0, _utils.isDefined)(primaryOrderBy)) {
            orderBy.push(primaryOrderBy);
        }
        if ((0, _utils.isDefined)(secondaryGroupByFieldMetadataId)) {
            const secondaryGroupByField = (0, _getfieldmetadatautil.getFieldMetadata)(secondaryGroupByFieldMetadataId, flatFieldMetadataMaps);
            const isSecondaryFieldDate = (0, _utils.isFieldMetadataDateKind)(secondaryGroupByField.type);
            const isSecondaryNestedDate = (0, _isrelationnestedfielddatekindutil.isRelationNestedFieldDateKind)({
                relationFieldMetadata: secondaryGroupByField,
                relationNestedFieldName: secondaryGroupBySubFieldName ?? undefined,
                flatObjectMetadataMaps,
                flatFieldMetadataMaps
            });
            const shouldApplySecondaryDateGranularity = isSecondaryFieldDate || isSecondaryNestedDate;
            const shouldUnnestSecondary = shouldSplitMultiValueFields && (0, _utils.isFieldMetadataArrayKind)(secondaryGroupByField.type);
            if (shouldUnnestPrimary && shouldUnnestSecondary) {
                throw new _chartdataexception.ChartDataException((0, _chartdataexception.generateChartDataExceptionMessage)(_chartdataexception.ChartDataExceptionCode.INVALID_WIDGET_CONFIGURATION, 'Split multiple values can only be enabled when one grouped field is multi-value.'), _chartdataexception.ChartDataExceptionCode.INVALID_WIDGET_CONFIGURATION);
            }
            groupBy.push((0, _buildgroupbyfieldobjectutil.buildGroupByFieldObject)({
                fieldMetadata: secondaryGroupByField,
                subFieldName: secondaryGroupBySubFieldName,
                dateGranularity: shouldApplySecondaryDateGranularity ? secondaryDateGranularity ?? _graphdefaultdategranularityconstant.GRAPH_DEFAULT_DATE_GRANULARITY : undefined,
                firstDayOfTheWeek,
                isNestedDateField: isSecondaryNestedDate,
                timeZone: userTimezone,
                shouldUnnest: shouldUnnestSecondary
            }));
            if ((0, _utils.isDefined)(secondaryAxisOrderBy)) {
                const secondaryOrderByItem = (0, _getgroupbyorderbyutil.getGroupByOrderBy)({
                    graphOrderBy: secondaryAxisOrderBy,
                    groupByFieldMetadata: secondaryGroupByField,
                    groupBySubFieldName: secondaryGroupBySubFieldName,
                    aggregateOperation,
                    aggregateFieldMetadata: aggregateField,
                    dateGranularity: shouldApplySecondaryDateGranularity ? secondaryDateGranularity ?? _graphdefaultdategranularityconstant.GRAPH_DEFAULT_DATE_GRANULARITY : undefined
                });
                if ((0, _utils.isDefined)(secondaryOrderByItem)) {
                    orderBy.push(secondaryOrderByItem);
                }
            }
        }
        const aggregateFieldKey = (0, _buildaggregatefieldkeyutil.buildAggregateFieldKey)({
            aggregateOperation,
            aggregateFieldMetadata: aggregateField
        });
        const selectedFields = {
            [aggregateFieldKey]: true,
            groupByDimensionValues: true
        };
        const { results } = await this.commonGroupByQueryRunnerService.execute({
            filter: gqlOperationFilter,
            orderBy: orderBy.length > 0 ? orderBy : undefined,
            groupBy: groupBy,
            selectedFields,
            limit
        }, {
            authContext,
            flatObjectMetadata,
            flatObjectMetadataMaps,
            flatFieldMetadataMaps,
            objectIdByNameSingular
        });
        return results.map((result)=>({
                groupByDimensionValues: result.groupByDimensionValues ?? [],
                aggregateValue: (0, _transformaggregatevalueutil.transformAggregateValue)({
                    rawValue: result[aggregateFieldKey],
                    aggregateFieldType: aggregateField.type,
                    aggregateOperation
                })
            }));
    }
    constructor(commonGroupByQueryRunnerService){
        this.commonGroupByQueryRunnerService = commonGroupByQueryRunnerService;
    }
};
ChartDataQueryService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _commongroupbyqueryrunnerservice.CommonGroupByQueryRunnerService === "undefined" ? Object : _commongroupbyqueryrunnerservice.CommonGroupByQueryRunnerService
    ])
], ChartDataQueryService);

//# sourceMappingURL=chart-data-query.service.js.map
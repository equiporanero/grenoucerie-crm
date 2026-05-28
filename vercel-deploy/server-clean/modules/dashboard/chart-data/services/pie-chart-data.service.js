"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PieChartDataService", {
    enumerable: true,
    get: function() {
        return PieChartDataService;
    }
});
const _common = require("@nestjs/common");
const _constants = require("twenty-shared/constants");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _workspacemanyorallflatentitymapscacheservice = require("../../../../engine/metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _findflatentitybyidinflatentitymapsutil = require("../../../../engine/metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _widgetconfigurationtypetype = require("../../../../engine/metadata-modules/page-layout-widget/enums/widget-configuration-type.type");
const _extraitemtodetecttoomanygroupsconstant = require("../constants/extra-item-to-detect-too-many-groups.constant");
const _piechartmaximumnumberofslicesconstant = require("../constants/pie-chart-maximum-number-of-slices.constant");
const _chartdataexception = require("../exceptions/chart-data.exception");
const _chartdataqueryservice = require("./chart-data-query.service");
const _getfieldmetadatautil = require("../utils/get-field-metadata.util");
const _getselectoptionsutil = require("../utils/get-select-options.util");
const _processonedimensionalresultsutil = require("../utils/process-one-dimensional-results.util");
const _sortchartdataifneededutil = require("../utils/sort-chart-data-if-needed.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let PieChartDataService = class PieChartDataService {
    async getPieChartData({ workspaceId, objectMetadataId, configuration, authContext }) {
        try {
            if (configuration.configurationType !== _widgetconfigurationtypetype.WidgetConfigurationType.PIE_CHART) {
                throw new _chartdataexception.ChartDataException((0, _chartdataexception.generateChartDataExceptionMessage)(_chartdataexception.ChartDataExceptionCode.INVALID_WIDGET_CONFIGURATION, `Expected PIE_CHART, got ${configuration.configurationType}`), _chartdataexception.ChartDataExceptionCode.INVALID_WIDGET_CONFIGURATION);
            }
            const { flatObjectMetadataMaps, flatFieldMetadataMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
                workspaceId,
                flatMapsKeys: [
                    'flatObjectMetadataMaps',
                    'flatFieldMetadataMaps'
                ]
            });
            if (!(0, _utils.isDefined)(objectMetadataId)) {
                throw new _chartdataexception.ChartDataException((0, _chartdataexception.generateChartDataExceptionMessage)(_chartdataexception.ChartDataExceptionCode.OBJECT_METADATA_NOT_FOUND, 'Widget has no objectMetadataId'), _chartdataexception.ChartDataExceptionCode.OBJECT_METADATA_NOT_FOUND);
            }
            const flatObjectMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
                flatEntityId: objectMetadataId,
                flatEntityMaps: flatObjectMetadataMaps
            });
            if (!(0, _utils.isDefined)(flatObjectMetadata)) {
                throw new _chartdataexception.ChartDataException((0, _chartdataexception.generateChartDataExceptionMessage)(_chartdataexception.ChartDataExceptionCode.OBJECT_METADATA_NOT_FOUND, objectMetadataId), _chartdataexception.ChartDataExceptionCode.OBJECT_METADATA_NOT_FOUND);
            }
            const groupByField = (0, _getfieldmetadatautil.getFieldMetadata)(configuration.groupByFieldMetadataId, flatFieldMetadataMaps);
            const limit = _piechartmaximumnumberofslicesconstant.PIE_CHART_MAXIMUM_NUMBER_OF_SLICES + _extraitemtodetecttoomanygroupsconstant.EXTRA_ITEM_TO_DETECT_TOO_MANY_GROUPS;
            const objectIdByNameSingular = {};
            for (const objMetadata of Object.values(flatObjectMetadataMaps.byUniversalIdentifier)){
                if ((0, _utils.isDefined)(objMetadata)) {
                    objectIdByNameSingular[objMetadata.nameSingular] = objMetadata.id;
                }
            }
            const rawResults = await this.chartDataQueryService.executeGroupByQuery({
                flatObjectMetadata,
                flatObjectMetadataMaps,
                flatFieldMetadataMaps,
                objectIdByNameSingular,
                authContext,
                groupByFieldMetadataId: configuration.groupByFieldMetadataId,
                groupBySubFieldName: configuration.groupBySubFieldName,
                aggregateFieldMetadataId: configuration.aggregateFieldMetadataId,
                aggregateOperation: configuration.aggregateOperation,
                filter: configuration.filter,
                dateGranularity: configuration.dateGranularity,
                userTimezone: configuration.timezone ?? 'UTC',
                firstDayOfTheWeek: configuration.firstDayOfTheWeek ?? _constants.CalendarStartDay.MONDAY,
                limit,
                primaryAxisOrderBy: configuration.orderBy,
                splitMultiValueFields: configuration.splitMultiValueFields
            });
            return this.transformToPieChartData({
                rawResults,
                groupByField,
                configuration,
                userTimezone: configuration.timezone ?? 'UTC',
                firstDayOfTheWeek: configuration.firstDayOfTheWeek ?? _constants.CalendarStartDay.MONDAY
            });
        } catch (error) {
            if (error instanceof _chartdataexception.ChartDataException) {
                throw error;
            }
            throw new _chartdataexception.ChartDataException((0, _chartdataexception.generateChartDataExceptionMessage)(_chartdataexception.ChartDataExceptionCode.QUERY_EXECUTION_FAILED, `Pie chart data retrieval failed: ${error instanceof Error ? error.message : String(error)}`), _chartdataexception.ChartDataExceptionCode.QUERY_EXECUTION_FAILED);
        }
    }
    transformToPieChartData({ rawResults, groupByField, configuration, userTimezone, firstDayOfTheWeek }) {
        const filteredResults = configuration.hideEmptyCategory ? rawResults.filter((result)=>(0, _utils.isDefined)(result.groupByDimensionValues?.[0]) && result.aggregateValue !== 0) : rawResults;
        const selectOptions = (0, _getselectoptionsutil.getSelectOptions)(groupByField);
        const convertedFirstDayOfTheWeek = (0, _utils.convertCalendarStartDayNonIsoNumberToFirstDayOfTheWeek)(firstDayOfTheWeek, _types.FirstDayOfTheWeek.SUNDAY);
        const limitedResults = filteredResults.slice(0, _piechartmaximumnumberofslicesconstant.PIE_CHART_MAXIMUM_NUMBER_OF_SLICES);
        const { processedDataPoints: rawProcessedDataPoints, formattedToRawLookup } = (0, _processonedimensionalresultsutil.processOneDimensionalResults)({
            rawResults: limitedResults,
            primaryAxisGroupByField: groupByField,
            dateGranularity: configuration.dateGranularity,
            subFieldName: configuration.groupBySubFieldName,
            userTimezone,
            firstDayOfTheWeek: convertedFirstDayOfTheWeek
        });
        const processedDataPoints = rawProcessedDataPoints.map((point)=>{
            const rawValueString = (0, _utils.isDefined)(point.rawValue) ? String(point.rawValue) : null;
            return {
                id: point.formattedValue,
                value: point.aggregateValue,
                rawValue: rawValueString
            };
        });
        const sortedData = (0, _sortchartdataifneededutil.sortChartDataIfNeeded)({
            data: processedDataPoints,
            orderBy: configuration.orderBy,
            manualSortOrder: configuration.manualSortOrder,
            formattedToRawLookup,
            getFieldValue: (item)=>item.id,
            getNumericValue: (item)=>item.value,
            selectFieldOptions: selectOptions,
            fieldType: groupByField.type,
            dateGranularity: configuration.dateGranularity
        });
        const data = sortedData.map(({ rawValue: _rawValue, ...item })=>item);
        return {
            data,
            showLegend: configuration.displayLegend ?? true,
            showDataLabels: configuration.displayDataLabel ?? false,
            showCenterMetric: configuration.showCenterMetric ?? true,
            hasTooManyGroups: filteredResults.length > _piechartmaximumnumberofslicesconstant.PIE_CHART_MAXIMUM_NUMBER_OF_SLICES,
            formattedToRawLookup: Object.fromEntries(formattedToRawLookup)
        };
    }
    constructor(workspaceManyOrAllFlatEntityMapsCacheService, chartDataQueryService){
        this.workspaceManyOrAllFlatEntityMapsCacheService = workspaceManyOrAllFlatEntityMapsCacheService;
        this.chartDataQueryService = chartDataQueryService;
    }
};
PieChartDataService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService,
        typeof _chartdataqueryservice.ChartDataQueryService === "undefined" ? Object : _chartdataqueryservice.ChartDataQueryService
    ])
], PieChartDataService);

//# sourceMappingURL=pie-chart-data.service.js.map
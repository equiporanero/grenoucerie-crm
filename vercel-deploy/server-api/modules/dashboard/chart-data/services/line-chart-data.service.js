"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "LineChartDataService", {
    enumerable: true,
    get: function() {
        return LineChartDataService;
    }
});
const _common = require("@nestjs/common");
const _constants = require("twenty-shared/constants");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _findflatentitybyidinflatentitymapsutil = require("../../../../engine/metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _workspacemanyorallflatentitymapscacheservice = require("../../../../engine/metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _graphorderbyenum = require("../../../../engine/metadata-modules/page-layout-widget/enums/graph-order-by.enum");
const _extraitemtodetecttoomanygroupsconstant = require("../constants/extra-item-to-detect-too-many-groups.constant");
const _linechartmaximumnumberofdatapointsconstant = require("../constants/line-chart-maximum-number-of-data-points.constant");
const _linechartmaximumnumberofnonstackedseriesconstant = require("../constants/line-chart-maximum-number-of-non-stacked-series.constant");
const _linechartmaximumnumberofstackedseriesconstant = require("../constants/line-chart-maximum-number-of-stacked-series.constant");
const _chartdataexception = require("../exceptions/chart-data.exception");
const _chartdataqueryservice = require("./chart-data-query.service");
const _applygapfillingutil = require("../utils/apply-gap-filling.util");
const _getaggregateoperationlabelutil = require("../utils/get-aggregate-operation-label.util");
const _getfieldmetadatautil = require("../utils/get-field-metadata.util");
const _getselectoptionsutil = require("../utils/get-select-options.util");
const _processonedimensionalresultsutil = require("../utils/process-one-dimensional-results.util");
const _processtwodimensionalresultsutil = require("../utils/process-two-dimensional-results.util");
const _sortchartdataifneededutil = require("../utils/sort-chart-data-if-needed.util");
const _sortsecondaryaxisdatautil = require("../utils/sort-secondary-axis-data.util");
const _buildlinechartseriesidprefixutil = require("../utils/build-line-chart-series-id-prefix.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let LineChartDataService = class LineChartDataService {
    async getLineChartData({ workspaceId, objectMetadataId, configuration, authContext }) {
        try {
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
            const primaryAxisGroupByField = (0, _getfieldmetadatautil.getFieldMetadata)(configuration.primaryAxisGroupByFieldMetadataId, flatFieldMetadataMaps);
            const aggregateField = (0, _getfieldmetadatautil.getFieldMetadata)(configuration.aggregateFieldMetadataId, flatFieldMetadataMaps);
            const isTwoDimensional = (0, _utils.isDefined)(configuration.secondaryAxisGroupByFieldMetadataId);
            let secondaryAxisGroupByField;
            if (isTwoDimensional) {
                secondaryAxisGroupByField = (0, _getfieldmetadatautil.getFieldMetadata)(configuration.secondaryAxisGroupByFieldMetadataId, flatFieldMetadataMaps);
            }
            const isStackedTwoDimensional = isTwoDimensional && configuration.isStacked === true;
            const maxSeriesForQuery = isStackedTwoDimensional ? _linechartmaximumnumberofstackedseriesconstant.LINE_CHART_MAXIMUM_NUMBER_OF_STACKED_SERIES : _linechartmaximumnumberofnonstackedseriesconstant.LINE_CHART_MAXIMUM_NUMBER_OF_NON_STACKED_SERIES;
            const limit = isTwoDimensional ? _linechartmaximumnumberofdatapointsconstant.LINE_CHART_MAXIMUM_NUMBER_OF_DATA_POINTS * maxSeriesForQuery + _extraitemtodetecttoomanygroupsconstant.EXTRA_ITEM_TO_DETECT_TOO_MANY_GROUPS : _linechartmaximumnumberofdatapointsconstant.LINE_CHART_MAXIMUM_NUMBER_OF_DATA_POINTS + _extraitemtodetecttoomanygroupsconstant.EXTRA_ITEM_TO_DETECT_TOO_MANY_GROUPS;
            const userTimezone = configuration.timezone ?? 'UTC';
            const firstDayOfTheWeek = configuration.firstDayOfTheWeek ?? _constants.CalendarStartDay.MONDAY;
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
                groupByFieldMetadataId: configuration.primaryAxisGroupByFieldMetadataId,
                groupBySubFieldName: configuration.primaryAxisGroupBySubFieldName,
                aggregateFieldMetadataId: configuration.aggregateFieldMetadataId,
                aggregateOperation: configuration.aggregateOperation,
                filter: configuration.filter,
                dateGranularity: configuration.primaryAxisDateGranularity,
                userTimezone,
                firstDayOfTheWeek,
                limit,
                primaryAxisOrderBy: configuration.primaryAxisOrderBy,
                secondaryGroupByFieldMetadataId: configuration.secondaryAxisGroupByFieldMetadataId,
                secondaryGroupBySubFieldName: configuration.secondaryAxisGroupBySubFieldName,
                secondaryDateGranularity: configuration.secondaryAxisGroupByDateGranularity,
                secondaryAxisOrderBy: configuration.secondaryAxisOrderBy,
                splitMultiValueFields: configuration.splitMultiValueFields
            });
            const seriesIdPrefix = (0, _buildlinechartseriesidprefixutil.buildLineChartSeriesIdPrefix)(objectMetadataId, configuration);
            if (isTwoDimensional && (0, _utils.isDefined)(secondaryAxisGroupByField)) {
                return this.transformToTwoDimensionalLineChartData({
                    rawResults,
                    primaryAxisGroupByField,
                    secondaryAxisGroupByField,
                    aggregateField,
                    configuration,
                    userTimezone,
                    firstDayOfTheWeek,
                    seriesIdPrefix
                });
            }
            return this.transformToOneDimensionalLineChartData({
                rawResults,
                primaryAxisGroupByField,
                aggregateField,
                configuration,
                userTimezone,
                firstDayOfTheWeek,
                seriesIdPrefix
            });
        } catch (error) {
            if (error instanceof _chartdataexception.ChartDataException) {
                throw error;
            }
            throw new _chartdataexception.ChartDataException((0, _chartdataexception.generateChartDataExceptionMessage)(_chartdataexception.ChartDataExceptionCode.QUERY_EXECUTION_FAILED, `Line chart data retrieval failed: ${error instanceof Error ? error.message : String(error)}`), _chartdataexception.ChartDataExceptionCode.QUERY_EXECUTION_FAILED);
        }
    }
    transformToOneDimensionalLineChartData({ rawResults, primaryAxisGroupByField, aggregateField, configuration, userTimezone, firstDayOfTheWeek, seriesIdPrefix }) {
        const filteredResults = configuration.omitNullValues ? rawResults.filter((result)=>(0, _utils.isDefined)(result.groupByDimensionValues?.[0]) && result.aggregateValue !== 0) : rawResults;
        const isDescOrder = configuration.primaryAxisOrderBy === _graphorderbyenum.GraphOrderBy.FIELD_DESC;
        const { data: gapFilledResults, wasTruncated: dateRangeWasTruncated } = (0, _applygapfillingutil.applyGapFilling)({
            data: filteredResults,
            primaryAxisGroupByField,
            dateGranularity: configuration.primaryAxisDateGranularity,
            omitNullValues: configuration.omitNullValues ?? false,
            isDescOrder,
            isTwoDimensional: false,
            splitMultiValueFields: configuration.splitMultiValueFields
        });
        const selectOptions = (0, _getselectoptionsutil.getSelectOptions)(primaryAxisGroupByField);
        const convertedFirstDayOfTheWeek = (0, _utils.convertCalendarStartDayNonIsoNumberToFirstDayOfTheWeek)(firstDayOfTheWeek, _types.FirstDayOfTheWeek.SUNDAY);
        const { processedDataPoints: rawProcessedDataPoints, formattedToRawLookup } = (0, _processonedimensionalresultsutil.processOneDimensionalResults)({
            rawResults: gapFilledResults,
            primaryAxisGroupByField,
            dateGranularity: configuration.primaryAxisDateGranularity,
            subFieldName: configuration.primaryAxisGroupBySubFieldName,
            userTimezone,
            firstDayOfTheWeek: convertedFirstDayOfTheWeek
        });
        const processedDataPoints = rawProcessedDataPoints.map((point)=>({
                x: point.formattedValue,
                y: point.aggregateValue,
                rawValue: point.rawValue
            }));
        const sortedData = (0, _sortchartdataifneededutil.sortChartDataIfNeeded)({
            data: processedDataPoints,
            orderBy: configuration.primaryAxisOrderBy,
            manualSortOrder: configuration.primaryAxisManualSortOrder,
            formattedToRawLookup,
            getFieldValue: (item)=>item.x,
            getNumericValue: (item)=>item.y ?? 0,
            selectFieldOptions: selectOptions,
            fieldType: primaryAxisGroupByField.type,
            subFieldName: configuration.primaryAxisGroupBySubFieldName ?? undefined,
            dateGranularity: configuration.primaryAxisDateGranularity
        });
        const limitedSortedData = sortedData.slice(0, _linechartmaximumnumberofdatapointsconstant.LINE_CHART_MAXIMUM_NUMBER_OF_DATA_POINTS);
        const transformedData = configuration.isCumulative ? this.applyCumulativeTransform(limitedSortedData) : limitedSortedData;
        const dataPoints = transformedData.map(({ x, y })=>({
                x,
                y
            }));
        const series = [
            {
                id: `${seriesIdPrefix}${aggregateField.name}`,
                label: aggregateField.label,
                data: dataPoints
            }
        ];
        const xAxisLabel = primaryAxisGroupByField.label;
        const yAxisLabel = `${(0, _getaggregateoperationlabelutil.getAggregateOperationLabel)(configuration.aggregateOperation)} of ${aggregateField.label}`;
        return {
            series,
            xAxisLabel,
            yAxisLabel,
            showLegend: configuration.displayLegend ?? true,
            showDataLabels: configuration.displayDataLabel ?? false,
            hasTooManyGroups: filteredResults.length > _linechartmaximumnumberofdatapointsconstant.LINE_CHART_MAXIMUM_NUMBER_OF_DATA_POINTS || dateRangeWasTruncated,
            formattedToRawLookup: Object.fromEntries(formattedToRawLookup)
        };
    }
    transformToTwoDimensionalLineChartData({ rawResults, primaryAxisGroupByField, secondaryAxisGroupByField, aggregateField, configuration, userTimezone, firstDayOfTheWeek, seriesIdPrefix }) {
        const filteredResults = configuration.omitNullValues ? rawResults.filter((result)=>(0, _utils.isDefined)(result.groupByDimensionValues?.[0]) && result.aggregateValue !== 0) : rawResults;
        const isStacked = configuration.isStacked ?? false;
        const isDescOrder = configuration.primaryAxisOrderBy === _graphorderbyenum.GraphOrderBy.FIELD_DESC;
        const { data: gapFilledResults, wasTruncated: dateRangeWasTruncated } = (0, _applygapfillingutil.applyGapFilling)({
            data: filteredResults,
            primaryAxisGroupByField,
            dateGranularity: configuration.primaryAxisDateGranularity,
            omitNullValues: configuration.omitNullValues ?? false,
            isDescOrder,
            isTwoDimensional: true,
            splitMultiValueFields: configuration.splitMultiValueFields
        });
        const primarySelectOptions = (0, _getselectoptionsutil.getSelectOptions)(primaryAxisGroupByField);
        const secondarySelectOptions = (0, _getselectoptionsutil.getSelectOptions)(secondaryAxisGroupByField);
        const convertedFirstDayOfTheWeek = (0, _utils.convertCalendarStartDayNonIsoNumberToFirstDayOfTheWeek)(firstDayOfTheWeek, _types.FirstDayOfTheWeek.SUNDAY);
        const { processedDataPoints: rawProcessedDataPoints, formattedToRawLookup, secondaryFormattedToRawLookup } = (0, _processtwodimensionalresultsutil.processTwoDimensionalResults)({
            rawResults: gapFilledResults,
            primaryAxisGroupByField,
            secondaryAxisGroupByField,
            primaryDateGranularity: configuration.primaryAxisDateGranularity,
            primarySubFieldName: configuration.primaryAxisGroupBySubFieldName,
            secondaryDateGranularity: configuration.secondaryAxisGroupByDateGranularity,
            secondarySubFieldName: configuration.secondaryAxisGroupBySubFieldName,
            userTimezone,
            firstDayOfTheWeek: convertedFirstDayOfTheWeek
        });
        const allXValues = [];
        const xValueSet = new Set();
        const allSeriesIds = new Set();
        const processedDataPoints = rawProcessedDataPoints.map((point)=>{
            if (!xValueSet.has(point.xFormatted)) {
                xValueSet.add(point.xFormatted);
                allXValues.push(point.xFormatted);
            }
            allSeriesIds.add(point.yFormatted);
            return {
                xFormatted: point.xFormatted,
                ySeriesId: point.yFormatted,
                rawXValue: point.rawXValue,
                rawYValue: point.rawYValue,
                aggregateValue: point.aggregateValue
            };
        });
        const seriesMap = new Map();
        for (const point of processedDataPoints){
            if (!seriesMap.has(point.ySeriesId)) {
                seriesMap.set(point.ySeriesId, new Map());
            }
            seriesMap.get(point.ySeriesId).set(point.xFormatted, point.aggregateValue);
        }
        const sortedXValues = (0, _sortchartdataifneededutil.sortChartDataIfNeeded)({
            data: allXValues,
            orderBy: configuration.primaryAxisOrderBy,
            manualSortOrder: configuration.primaryAxisManualSortOrder,
            formattedToRawLookup,
            getFieldValue: (x)=>x,
            getNumericValue: (xValue)=>{
                let sum = 0;
                for (const xToYMap of seriesMap.values()){
                    const value = xToYMap.get(xValue);
                    if ((0, _utils.isDefined)(value)) {
                        sum += value;
                    }
                }
                return sum;
            },
            selectFieldOptions: primarySelectOptions,
            fieldType: primaryAxisGroupByField.type,
            subFieldName: configuration.primaryAxisGroupBySubFieldName ?? undefined,
            dateGranularity: configuration.primaryAxisDateGranularity
        });
        const limitedXValues = sortedXValues.slice(0, _linechartmaximumnumberofdatapointsconstant.LINE_CHART_MAXIMUM_NUMBER_OF_DATA_POINTS);
        const seriesIds = Array.from(allSeriesIds);
        const sortedSeriesIds = this.sortSecondaryAxisSeriesIds({
            seriesIds,
            seriesMap,
            configuration,
            secondaryFormattedToRawLookup,
            secondarySelectOptions,
            secondaryAxisGroupByField
        });
        const maxSeries = isStacked ? _linechartmaximumnumberofstackedseriesconstant.LINE_CHART_MAXIMUM_NUMBER_OF_STACKED_SERIES : _linechartmaximumnumberofnonstackedseriesconstant.LINE_CHART_MAXIMUM_NUMBER_OF_NON_STACKED_SERIES;
        const limitedSeriesIds = sortedSeriesIds.slice(0, maxSeries);
        const series = limitedSeriesIds.map((seriesId)=>{
            const xToYMap = seriesMap.get(seriesId) ?? new Map();
            const prefixedSeriesId = `${seriesIdPrefix}${seriesId}`;
            let dataPoints = limitedXValues.map((xValue)=>({
                    x: xValue,
                    y: xToYMap.get(xValue) ?? 0
                }));
            if (configuration.isCumulative) {
                dataPoints = this.applyCumulativeTransform(dataPoints);
            }
            return {
                id: prefixedSeriesId,
                label: seriesId,
                data: dataPoints
            };
        });
        const xAxisLabel = primaryAxisGroupByField.label;
        const yAxisLabel = `${(0, _getaggregateoperationlabelutil.getAggregateOperationLabel)(configuration.aggregateOperation)} of ${aggregateField.label}`;
        const hasTooManySeries = seriesIds.length > maxSeries;
        const hasTooManyDataPoints = allXValues.length > _linechartmaximumnumberofdatapointsconstant.LINE_CHART_MAXIMUM_NUMBER_OF_DATA_POINTS;
        const hasTooManyGroups = hasTooManySeries || hasTooManyDataPoints || dateRangeWasTruncated;
        const mergedLookup = new Map([
            ...formattedToRawLookup,
            ...secondaryFormattedToRawLookup
        ]);
        for (const seriesId of limitedSeriesIds){
            const rawValue = secondaryFormattedToRawLookup.get(seriesId);
            if ((0, _utils.isDefined)(rawValue)) {
                mergedLookup.set(`${seriesIdPrefix}${seriesId}`, rawValue);
            }
        }
        return {
            series,
            xAxisLabel,
            yAxisLabel,
            showLegend: configuration.displayLegend ?? true,
            showDataLabels: configuration.displayDataLabel ?? false,
            hasTooManyGroups,
            formattedToRawLookup: Object.fromEntries(mergedLookup)
        };
    }
    sortSecondaryAxisSeriesIds({ seriesIds, seriesMap, configuration, secondaryFormattedToRawLookup, secondarySelectOptions, secondaryAxisGroupByField }) {
        const orderBy = configuration.secondaryAxisOrderBy;
        if (!(0, _utils.isDefined)(orderBy)) {
            return seriesIds;
        }
        return (0, _sortsecondaryaxisdatautil.sortSecondaryAxisData)({
            items: seriesIds,
            orderBy,
            manualSortOrder: configuration.secondaryAxisManualSortOrder,
            formattedToRawLookup: secondaryFormattedToRawLookup,
            getFormattedValue: (id)=>id,
            getNumericValue: (id)=>{
                const xToYMap = seriesMap.get(id);
                if (!xToYMap) {
                    return 0;
                }
                let sum = 0;
                for (const value of xToYMap.values()){
                    sum += value;
                }
                return sum;
            },
            selectFieldOptions: secondarySelectOptions,
            fieldType: secondaryAxisGroupByField.type,
            subFieldName: configuration.secondaryAxisGroupBySubFieldName ?? undefined,
            dateGranularity: configuration.secondaryAxisGroupByDateGranularity
        });
    }
    applyCumulativeTransform(data) {
        const result = [];
        let runningTotal = 0;
        for (const point of data){
            if ((0, _utils.isDefined)(point.y)) {
                runningTotal += point.y;
            }
            const cumulativeValue = runningTotal;
            result.push({
                ...point,
                y: cumulativeValue
            });
        }
        return result;
    }
    constructor(workspaceManyOrAllFlatEntityMapsCacheService, chartDataQueryService){
        this.workspaceManyOrAllFlatEntityMapsCacheService = workspaceManyOrAllFlatEntityMapsCacheService;
        this.chartDataQueryService = chartDataQueryService;
    }
};
LineChartDataService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService,
        typeof _chartdataqueryservice.ChartDataQueryService === "undefined" ? Object : _chartdataqueryservice.ChartDataQueryService
    ])
], LineChartDataService);

//# sourceMappingURL=line-chart-data.service.js.map
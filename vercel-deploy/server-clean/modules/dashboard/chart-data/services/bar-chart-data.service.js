"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BarChartDataService", {
    enumerable: true,
    get: function() {
        return BarChartDataService;
    }
});
const _common = require("@nestjs/common");
const _guards = require("@sniptt/guards");
const _constants = require("twenty-shared/constants");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _workspacemanyorallflatentitymapscacheservice = require("../../../../engine/metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _findflatentitybyidinflatentitymapsutil = require("../../../../engine/metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _barchartgroupmodeenum = require("../../../../engine/metadata-modules/page-layout-widget/enums/bar-chart-group-mode.enum");
const _barchartlayoutenum = require("../../../../engine/metadata-modules/page-layout-widget/enums/bar-chart-layout.enum");
const _graphorderbyenum = require("../../../../engine/metadata-modules/page-layout-widget/enums/graph-order-by.enum");
const _barchartmaximumnumberofbarsconstant = require("../constants/bar-chart-maximum-number-of-bars.constant");
const _barchartmaximumnumberofgroupsperbarconstant = require("../constants/bar-chart-maximum-number-of-groups-per-bar.constant");
const _extraitemtodetecttoomanygroupsconstant = require("../constants/extra-item-to-detect-too-many-groups.constant");
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
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let BarChartDataService = class BarChartDataService {
    async getBarChartData({ workspaceId, objectMetadataId, configuration, authContext }) {
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
            const isStackedTwoDimensional = isTwoDimensional && configuration.groupMode === _barchartgroupmodeenum.BarChartGroupMode.STACKED;
            const limit = isStackedTwoDimensional ? _barchartmaximumnumberofbarsconstant.BAR_CHART_MAXIMUM_NUMBER_OF_BARS * _barchartmaximumnumberofgroupsperbarconstant.BAR_CHART_MAXIMUM_NUMBER_OF_GROUPS_PER_BAR + _extraitemtodetecttoomanygroupsconstant.EXTRA_ITEM_TO_DETECT_TOO_MANY_GROUPS : _barchartmaximumnumberofbarsconstant.BAR_CHART_MAXIMUM_NUMBER_OF_BARS + _extraitemtodetecttoomanygroupsconstant.EXTRA_ITEM_TO_DETECT_TOO_MANY_GROUPS;
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
            if (isTwoDimensional && (0, _utils.isDefined)(secondaryAxisGroupByField)) {
                return this.transformToTwoDimensionalBarChartData({
                    rawResults,
                    primaryAxisGroupByField,
                    secondaryAxisGroupByField,
                    aggregateField,
                    configuration,
                    userTimezone,
                    firstDayOfTheWeek
                });
            }
            return this.transformToOneDimensionalBarChartData({
                rawResults,
                primaryAxisGroupByField,
                aggregateField,
                configuration,
                userTimezone,
                firstDayOfTheWeek
            });
        } catch (error) {
            if (error instanceof _chartdataexception.ChartDataException) {
                throw error;
            }
            throw new _chartdataexception.ChartDataException((0, _chartdataexception.generateChartDataExceptionMessage)(_chartdataexception.ChartDataExceptionCode.QUERY_EXECUTION_FAILED, `Bar chart data retrieval failed: ${error instanceof Error ? error.message : String(error)}`), _chartdataexception.ChartDataExceptionCode.QUERY_EXECUTION_FAILED);
        }
    }
    transformToOneDimensionalBarChartData({ rawResults, primaryAxisGroupByField, aggregateField, configuration, userTimezone, firstDayOfTheWeek }) {
        const layout = configuration.layout ?? _barchartlayoutenum.BarChartLayout.VERTICAL;
        const isHorizontal = layout === _barchartlayoutenum.BarChartLayout.HORIZONTAL;
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
        const indexByKey = configuration.primaryAxisGroupBySubFieldName ? `${primaryAxisGroupByField.name}${this.capitalizeFirst(configuration.primaryAxisGroupBySubFieldName)}` : primaryAxisGroupByField.name;
        const aggregateValueKey = indexByKey === aggregateField.name ? `${aggregateField.name}-aggregate` : aggregateField.name;
        const { processedDataPoints, formattedToRawLookup } = (0, _processonedimensionalresultsutil.processOneDimensionalResults)({
            rawResults: gapFilledResults,
            primaryAxisGroupByField,
            dateGranularity: configuration.primaryAxisDateGranularity,
            subFieldName: configuration.primaryAxisGroupBySubFieldName,
            userTimezone,
            firstDayOfTheWeek: convertedFirstDayOfTheWeek
        });
        const sortedData = (0, _sortchartdataifneededutil.sortChartDataIfNeeded)({
            data: processedDataPoints,
            orderBy: configuration.primaryAxisOrderBy,
            manualSortOrder: configuration.primaryAxisManualSortOrder,
            formattedToRawLookup,
            getFieldValue: (item)=>item.formattedValue,
            getNumericValue: (item)=>item.aggregateValue,
            selectFieldOptions: selectOptions,
            fieldType: primaryAxisGroupByField.type,
            subFieldName: configuration.primaryAxisGroupBySubFieldName ?? undefined,
            dateGranularity: configuration.primaryAxisDateGranularity
        });
        const limitedSortedData = sortedData.slice(0, _barchartmaximumnumberofbarsconstant.BAR_CHART_MAXIMUM_NUMBER_OF_BARS);
        const transformedData = configuration.isCumulative ? this.applyCumulativeTransformInternal(limitedSortedData) : limitedSortedData;
        const data = transformedData.map((item)=>({
                [indexByKey]: item.formattedValue,
                [aggregateValueKey]: item.aggregateValue
            }));
        const series = [
            {
                key: aggregateValueKey,
                label: aggregateField.label
            }
        ];
        const categoryLabel = primaryAxisGroupByField.label;
        const valueLabel = `${(0, _getaggregateoperationlabelutil.getAggregateOperationLabel)(configuration.aggregateOperation)} of ${aggregateField.label}`;
        const xAxisLabel = isHorizontal ? valueLabel : categoryLabel;
        const yAxisLabel = isHorizontal ? categoryLabel : valueLabel;
        return {
            data,
            indexBy: indexByKey,
            keys: [
                aggregateValueKey
            ],
            series,
            xAxisLabel,
            yAxisLabel,
            showLegend: configuration.displayLegend ?? true,
            showDataLabels: configuration.displayDataLabel ?? false,
            layout,
            groupMode: configuration.groupMode ?? _barchartgroupmodeenum.BarChartGroupMode.GROUPED,
            hasTooManyGroups: filteredResults.length > _barchartmaximumnumberofbarsconstant.BAR_CHART_MAXIMUM_NUMBER_OF_BARS || dateRangeWasTruncated,
            formattedToRawLookup: Object.fromEntries(formattedToRawLookup)
        };
    }
    transformToTwoDimensionalBarChartData({ rawResults, primaryAxisGroupByField, secondaryAxisGroupByField, aggregateField, configuration, userTimezone, firstDayOfTheWeek }) {
        const layout = configuration.layout ?? _barchartlayoutenum.BarChartLayout.VERTICAL;
        const isHorizontal = layout === _barchartlayoutenum.BarChartLayout.HORIZONTAL;
        const filteredResults = configuration.omitNullValues ? rawResults.filter((result)=>(0, _utils.isDefined)(result.groupByDimensionValues?.[0]) && result.aggregateValue !== 0) : rawResults;
        const effectiveGroupMode = configuration.groupMode ?? _barchartgroupmodeenum.BarChartGroupMode.STACKED;
        const isStacked = effectiveGroupMode === _barchartgroupmodeenum.BarChartGroupMode.STACKED;
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
        const indexByKey = configuration.primaryAxisGroupBySubFieldName ? `${primaryAxisGroupByField.name}${this.capitalizeFirst(configuration.primaryAxisGroupBySubFieldName)}` : primaryAxisGroupByField.name;
        const convertedFirstDayOfTheWeek = (0, _utils.convertCalendarStartDayNonIsoNumberToFirstDayOfTheWeek)(firstDayOfTheWeek, _types.FirstDayOfTheWeek.SUNDAY);
        const { processedDataPoints, formattedToRawLookup, secondaryFormattedToRawLookup } = (0, _processtwodimensionalresultsutil.processTwoDimensionalResults)({
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
        const allSecondaryValues = new Set();
        for (const point of processedDataPoints){
            allSecondaryValues.add(point.yFormatted);
        }
        const dataMap = new Map();
        for (const point of processedDataPoints){
            if (!dataMap.has(point.xFormatted)) {
                dataMap.set(point.xFormatted, {
                    [indexByKey]: point.xFormatted
                });
            }
            const datum = dataMap.get(point.xFormatted);
            datum[point.yFormatted] = point.aggregateValue;
        }
        let unsortedData = Array.from(dataMap.values());
        const sortedData = (0, _sortchartdataifneededutil.sortChartDataIfNeeded)({
            data: unsortedData,
            orderBy: configuration.primaryAxisOrderBy,
            manualSortOrder: configuration.primaryAxisManualSortOrder,
            formattedToRawLookup,
            getFieldValue: (item)=>String(item[indexByKey]),
            getNumericValue: (item)=>{
                let sum = 0;
                for (const key of allSecondaryValues){
                    const value = item[key];
                    if ((0, _guards.isNumber)(value)) {
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
        const limitedData = sortedData.slice(0, _barchartmaximumnumberofbarsconstant.BAR_CHART_MAXIMUM_NUMBER_OF_BARS);
        const keys = Array.from(allSecondaryValues);
        const sortedKeys = this.sortSecondaryAxisKeys({
            keys,
            data: limitedData,
            configuration,
            secondaryFormattedToRawLookup,
            secondarySelectOptions,
            secondaryAxisGroupByField
        });
        const hasTooManyBars = sortedData.length > _barchartmaximumnumberofbarsconstant.BAR_CHART_MAXIMUM_NUMBER_OF_BARS;
        const hasTooManyGroupsPerBar = keys.length > _barchartmaximumnumberofgroupsperbarconstant.BAR_CHART_MAXIMUM_NUMBER_OF_GROUPS_PER_BAR;
        let finalLimitedData = limitedData;
        const limitedKeys = sortedKeys.slice(0, _barchartmaximumnumberofgroupsperbarconstant.BAR_CHART_MAXIMUM_NUMBER_OF_GROUPS_PER_BAR);
        if (!isStacked) {
            const totalSegments = finalLimitedData.length * limitedKeys.length;
            const hasTooManySegments = totalSegments > _barchartmaximumnumberofbarsconstant.BAR_CHART_MAXIMUM_NUMBER_OF_BARS;
            if (hasTooManySegments) {
                const maxXValues = Math.floor(_barchartmaximumnumberofbarsconstant.BAR_CHART_MAXIMUM_NUMBER_OF_BARS / limitedKeys.length);
                finalLimitedData = finalLimitedData.slice(0, Math.max(1, maxXValues));
            }
        }
        const finalData = configuration.isCumulative ? this.applyCumulativeTwoDimensional(finalLimitedData, limitedKeys) : finalLimitedData;
        const series = limitedKeys.map((key)=>({
                key,
                label: key
            }));
        const categoryLabel = primaryAxisGroupByField.label;
        const valueLabel = `${(0, _getaggregateoperationlabelutil.getAggregateOperationLabel)(configuration.aggregateOperation)} of ${aggregateField.label}`;
        const xAxisLabel = isHorizontal ? valueLabel : categoryLabel;
        const yAxisLabel = isHorizontal ? categoryLabel : valueLabel;
        let hasTooManyGroups = hasTooManyBars || hasTooManyGroupsPerBar;
        if (!isStacked) {
            const totalSegments = limitedData.length * limitedKeys.length;
            const hasTooManySegments = totalSegments > _barchartmaximumnumberofbarsconstant.BAR_CHART_MAXIMUM_NUMBER_OF_BARS;
            hasTooManyGroups = hasTooManyGroups || hasTooManySegments;
        }
        hasTooManyGroups = hasTooManyGroups || dateRangeWasTruncated;
        const mergedLookup = new Map([
            ...formattedToRawLookup,
            ...secondaryFormattedToRawLookup
        ]);
        return {
            data: finalData,
            indexBy: indexByKey,
            keys: limitedKeys,
            series,
            xAxisLabel,
            yAxisLabel,
            showLegend: configuration.displayLegend ?? true,
            showDataLabels: configuration.displayDataLabel ?? false,
            layout,
            groupMode: configuration.groupMode ?? _barchartgroupmodeenum.BarChartGroupMode.GROUPED,
            hasTooManyGroups,
            formattedToRawLookup: Object.fromEntries(mergedLookup)
        };
    }
    sortSecondaryAxisKeys({ keys, data, configuration, secondaryFormattedToRawLookup, secondarySelectOptions, secondaryAxisGroupByField }) {
        const orderBy = configuration.secondaryAxisOrderBy;
        if (!(0, _utils.isDefined)(orderBy)) {
            return keys;
        }
        return (0, _sortsecondaryaxisdatautil.sortSecondaryAxisData)({
            items: keys,
            orderBy,
            manualSortOrder: configuration.secondaryAxisManualSortOrder,
            formattedToRawLookup: secondaryFormattedToRawLookup,
            getFormattedValue: (key)=>key,
            getNumericValue: (key)=>{
                let sum = 0;
                for (const datum of data){
                    const value = datum[key];
                    if ((0, _guards.isNumber)(value)) {
                        sum += value;
                    }
                }
                return sum;
            },
            selectFieldOptions: secondarySelectOptions,
            fieldType: secondaryAxisGroupByField.type,
            subFieldName: configuration.secondaryAxisGroupBySubFieldName ?? undefined,
            dateGranularity: configuration.secondaryAxisGroupByDateGranularity
        });
    }
    applyCumulativeTwoDimensional(data, keys) {
        const runningTotals = {};
        for (const key of keys){
            runningTotals[key] = 0;
        }
        const result = [];
        for (const datum of data){
            const newDatum = {
                ...datum
            };
            for (const key of keys){
                const value = datum[key];
                if ((0, _guards.isNumber)(value)) {
                    runningTotals[key] += value;
                }
                newDatum[key] = runningTotals[key];
            }
            result.push(newDatum);
        }
        return result;
    }
    applyCumulativeTransformInternal(data) {
        const result = [];
        let runningTotal = 0;
        for (const point of data){
            runningTotal += point.aggregateValue;
            const cumulativeValue = runningTotal;
            result.push({
                ...point,
                aggregateValue: cumulativeValue
            });
        }
        return result;
    }
    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    constructor(workspaceManyOrAllFlatEntityMapsCacheService, chartDataQueryService){
        this.workspaceManyOrAllFlatEntityMapsCacheService = workspaceManyOrAllFlatEntityMapsCacheService;
        this.chartDataQueryService = chartDataQueryService;
    }
};
BarChartDataService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService,
        typeof _chartdataqueryservice.ChartDataQueryService === "undefined" ? Object : _chartdataqueryservice.ChartDataQueryService
    ])
], BarChartDataService);

//# sourceMappingURL=bar-chart-data.service.js.map
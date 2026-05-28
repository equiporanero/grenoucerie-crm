"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get AggregateOperations () {
        return _types.AggregateOperations;
    },
    get WidgetConfigurationType () {
        return _widgetconfigurationtypetype.WidgetConfigurationType;
    },
    get graphConfigurationSchema () {
        return graphConfigurationSchema;
    },
    get graphConfigurationSchemaWithoutDefaults () {
        return graphConfigurationSchemaWithoutDefaults;
    },
    get gridPositionSchema () {
        return gridPositionSchema;
    },
    get widgetConfigurationSchema () {
        return widgetConfigurationSchema;
    },
    get widgetConfigurationSchemaWithoutDefaults () {
        return widgetConfigurationSchemaWithoutDefaults;
    },
    get widgetTypeSchema () {
        return widgetTypeSchema;
    }
});
const _guards = require("@sniptt/guards");
const _types = require("twenty-shared/types");
const _zod = require("zod");
const _axisnamedisplayenum = require("../../../../engine/metadata-modules/page-layout-widget/enums/axis-name-display.enum");
const _barchartgroupmodeenum = require("../../../../engine/metadata-modules/page-layout-widget/enums/bar-chart-group-mode.enum");
const _barchartlayoutenum = require("../../../../engine/metadata-modules/page-layout-widget/enums/bar-chart-layout.enum");
const _graphorderbyenum = require("../../../../engine/metadata-modules/page-layout-widget/enums/graph-order-by.enum");
const _widgetconfigurationtypetype = require("../../../../engine/metadata-modules/page-layout-widget/enums/widget-configuration-type.type");
const _widgettypeenum = require("../../../../engine/metadata-modules/page-layout-widget/enums/widget-type.enum");
// Chart color options (MAIN_COLOR_NAMES plus 'auto').
// should we export MAIN_COLOR_NAMES from twenty-ui to twenty-shared and use that here?
const CHART_COLORS = [
    'auto',
    'red',
    'ruby',
    'crimson',
    'tomato',
    'orange',
    'amber',
    'yellow',
    'lime',
    'grass',
    'green',
    'jade',
    'mint',
    'turquoise',
    'cyan',
    'sky',
    'blue',
    'iris',
    'violet',
    'purple',
    'plum',
    'pink',
    'bronze',
    'gold',
    'brown',
    'gray'
];
const DATE_GRANULARITY_OPTIONS = [
    _types.ObjectRecordGroupByDateGranularity.DAY,
    _types.ObjectRecordGroupByDateGranularity.WEEK,
    _types.ObjectRecordGroupByDateGranularity.MONTH,
    _types.ObjectRecordGroupByDateGranularity.QUARTER,
    _types.ObjectRecordGroupByDateGranularity.YEAR,
    _types.ObjectRecordGroupByDateGranularity.DAY_OF_THE_WEEK,
    _types.ObjectRecordGroupByDateGranularity.MONTH_OF_THE_YEAR,
    _types.ObjectRecordGroupByDateGranularity.QUARTER_OF_THE_YEAR
];
const GRAPH_ORDER_BY_OPTIONS = Object.values(_graphorderbyenum.GraphOrderBy);
const AXIS_NAME_DISPLAY_OPTIONS = Object.values(_axisnamedisplayenum.AxisNameDisplay);
const BAR_CHART_GROUP_MODE_OPTIONS = Object.values(_barchartgroupmodeenum.BarChartGroupMode);
const BAR_CHART_LAYOUT_OPTIONS = Object.values(_barchartlayoutenum.BarChartLayout);
const AGGREGATE_OPERATION_OPTIONS = Object.values(_types.AggregateOperations);
const displayDataLabelSchema = _zod.z.boolean().optional();
const displayLegendSchema = _zod.z.boolean().optional();
const showCenterMetricSchema = _zod.z.boolean().optional().describe('Show aggregate value in center');
const hideEmptyCategorySchema = _zod.z.boolean().optional().describe('Hide slices with zero values');
const ratioAggregateConfigSchema = _zod.z.object({
    fieldMetadataId: _zod.z.uuid(),
    optionValue: _zod.z.string()
});
const withPrimarySecondaryManualSortRefinements = (schema)=>schema.refine((data)=>data.primaryAxisOrderBy !== _graphorderbyenum.GraphOrderBy.MANUAL || Array.isArray(data.primaryAxisManualSortOrder) && data.primaryAxisManualSortOrder.length > 0, {
        message: 'primaryAxisManualSortOrder must be a non-empty array when primaryAxisOrderBy is MANUAL',
        path: [
            'primaryAxisManualSortOrder'
        ]
    }).refine((data)=>data.secondaryAxisOrderBy !== _graphorderbyenum.GraphOrderBy.MANUAL || Array.isArray(data.secondaryAxisManualSortOrder) && data.secondaryAxisManualSortOrder.length > 0, {
        message: 'secondaryAxisManualSortOrder must be a non-empty array when secondaryAxisOrderBy is MANUAL',
        path: [
            'secondaryAxisManualSortOrder'
        ]
    });
const withManualSortRefinement = (schema)=>schema.refine((data)=>data.orderBy !== _graphorderbyenum.GraphOrderBy.MANUAL || Array.isArray(data.manualSortOrder) && data.manualSortOrder.length > 0, {
        message: 'manualSortOrder must be a non-empty array when orderBy is MANUAL',
        path: [
            'manualSortOrder'
        ]
    });
const withRangeMinMaxRefinement = (schema)=>schema.refine((data)=>!((0, _guards.isNumber)(data.rangeMin) && (0, _guards.isNumber)(data.rangeMax) && data.rangeMin > data.rangeMax), {
        message: 'rangeMin must be less than or equal to rangeMax',
        path: [
            'rangeMin'
        ]
    });
const gridPositionSchema = _zod.z.object({
    row: _zod.z.number().min(0).describe('Row position (0-based)'),
    column: _zod.z.number().min(0).max(11).describe('Column position (0-11 for 12-column grid)'),
    rowSpan: _zod.z.number().min(1).describe('Number of rows the widget spans'),
    columnSpan: _zod.z.number().min(1).max(12).describe('Number of columns the widget spans (1-12)')
});
const widgetTypeSchema = _zod.z.enum([
    _widgettypeenum.WidgetType.VIEW,
    _widgettypeenum.WidgetType.GRAPH,
    _widgettypeenum.WidgetType.IFRAME,
    _widgettypeenum.WidgetType.STANDALONE_RICH_TEXT,
    _widgettypeenum.WidgetType.RECORD_TABLE
]);
// Graph configuration schema for AGGREGATE type (KPI numbers)
const aggregateChartConfigSchemaBase = _zod.z.object({
    configurationType: _zod.z.literal(_widgetconfigurationtypetype.WidgetConfigurationType.AGGREGATE_CHART),
    aggregateFieldMetadataId: _zod.z.uuid().describe('Field UUID to aggregate (must be from the widget objectMetadataId)'),
    aggregateOperation: _zod.z.enum(AGGREGATE_OPERATION_OPTIONS).describe('Aggregation operation: COUNT, SUM, AVG, MIN, MAX, etc.'),
    label: _zod.z.string().optional(),
    displayDataLabel: displayDataLabelSchema,
    prefix: _zod.z.string().optional(),
    suffix: _zod.z.string().optional(),
    ratioAggregateConfig: ratioAggregateConfigSchema.optional()
});
const aggregateChartConfigSchema = aggregateChartConfigSchemaBase.extend({
    displayDataLabel: displayDataLabelSchema.default(true)
});
const aggregateChartConfigSchemaWithoutDefaults = aggregateChartConfigSchemaBase;
// Graph configuration schema for BAR charts
const barChartConfigSchemaCore = _zod.z.object({
    configurationType: _zod.z.literal(_widgetconfigurationtypetype.WidgetConfigurationType.BAR_CHART),
    aggregateFieldMetadataId: _zod.z.uuid().describe('Field UUID to aggregate'),
    aggregateOperation: _zod.z.enum(AGGREGATE_OPERATION_OPTIONS),
    primaryAxisGroupByFieldMetadataId: _zod.z.uuid().describe('Field UUID to group by on primary axis'),
    primaryAxisGroupBySubFieldName: _zod.z.string().optional().describe('REQUIRED for relation fields (e.g. "name", "address.addressCity") and composite fields (e.g. "addressCity"). Without this, relation fields group by raw UUID which is not useful.'),
    secondaryAxisGroupByFieldMetadataId: _zod.z.uuid().optional(),
    secondaryAxisGroupBySubFieldName: _zod.z.string().optional().describe('REQUIRED for relation fields (e.g. "name", "stage") and composite fields (e.g. "addressCity"). Without this, relation fields group by raw UUID which is not useful.'),
    primaryAxisOrderBy: _zod.z.enum(GRAPH_ORDER_BY_OPTIONS).optional(),
    primaryAxisManualSortOrder: _zod.z.array(_zod.z.string()).optional(),
    secondaryAxisOrderBy: _zod.z.enum(GRAPH_ORDER_BY_OPTIONS).optional(),
    secondaryAxisManualSortOrder: _zod.z.array(_zod.z.string()).optional(),
    omitNullValues: _zod.z.boolean().optional(),
    primaryAxisDateGranularity: _zod.z.enum(DATE_GRANULARITY_OPTIONS).optional().describe('Date grouping granularity for X axis'),
    secondaryAxisGroupByDateGranularity: _zod.z.enum(DATE_GRANULARITY_OPTIONS).optional().describe('Date grouping granularity for secondary grouping'),
    color: _zod.z.enum(CHART_COLORS).optional().describe('Chart color theme'),
    axisNameDisplay: _zod.z.enum(AXIS_NAME_DISPLAY_OPTIONS).optional().describe('Which axis labels to show'),
    displayDataLabel: displayDataLabelSchema,
    displayLegend: displayLegendSchema,
    groupMode: _zod.z.enum(BAR_CHART_GROUP_MODE_OPTIONS).optional().describe('Bar display mode when using secondary grouping'),
    isCumulative: _zod.z.boolean().optional().describe('Show running totals'),
    rangeMin: _zod.z.number().optional().describe('Y axis minimum value'),
    rangeMax: _zod.z.number().optional().describe('Y axis maximum value'),
    layout: _zod.z.enum(BAR_CHART_LAYOUT_OPTIONS).describe('Layout orientation for bar charts')
});
const barChartConfigSchemaWithoutDefaults = withRangeMinMaxRefinement(withPrimarySecondaryManualSortRefinements(barChartConfigSchemaCore));
const barChartConfigSchema = withRangeMinMaxRefinement(withPrimarySecondaryManualSortRefinements(barChartConfigSchemaCore.extend({
    displayDataLabel: displayDataLabelSchema.default(false),
    displayLegend: displayLegendSchema.default(true)
})));
// Graph configuration schema for LINE charts
const lineChartConfigSchemaCore = _zod.z.object({
    configurationType: _zod.z.literal(_widgetconfigurationtypetype.WidgetConfigurationType.LINE_CHART),
    aggregateFieldMetadataId: _zod.z.uuid(),
    aggregateOperation: _zod.z.enum(AGGREGATE_OPERATION_OPTIONS),
    primaryAxisGroupByFieldMetadataId: _zod.z.uuid(),
    primaryAxisGroupBySubFieldName: _zod.z.string().optional().describe('REQUIRED for relation fields (e.g. "name", "address.addressCity") and composite fields (e.g. "addressCity"). Without this, relation fields group by raw UUID which is not useful.'),
    secondaryAxisGroupByFieldMetadataId: _zod.z.uuid().optional(),
    secondaryAxisGroupBySubFieldName: _zod.z.string().optional().describe('REQUIRED for relation fields (e.g. "name", "stage") and composite fields (e.g. "addressCity"). Without this, relation fields group by raw UUID which is not useful.'),
    primaryAxisOrderBy: _zod.z.enum(GRAPH_ORDER_BY_OPTIONS).optional(),
    primaryAxisManualSortOrder: _zod.z.array(_zod.z.string()).optional(),
    secondaryAxisOrderBy: _zod.z.enum(GRAPH_ORDER_BY_OPTIONS).optional(),
    secondaryAxisManualSortOrder: _zod.z.array(_zod.z.string()).optional(),
    omitNullValues: _zod.z.boolean().optional(),
    primaryAxisDateGranularity: _zod.z.enum(DATE_GRANULARITY_OPTIONS).optional().describe('Date grouping granularity for X axis'),
    secondaryAxisGroupByDateGranularity: _zod.z.enum(DATE_GRANULARITY_OPTIONS).optional().describe('Date grouping granularity for secondary grouping'),
    color: _zod.z.enum(CHART_COLORS).optional().describe('Line color theme'),
    axisNameDisplay: _zod.z.enum(AXIS_NAME_DISPLAY_OPTIONS).optional().describe('Which axis labels to show'),
    displayDataLabel: displayDataLabelSchema,
    displayLegend: displayLegendSchema,
    isStacked: _zod.z.boolean().optional().describe('Stack multiple lines'),
    isCumulative: _zod.z.boolean().optional().describe('Show running totals'),
    rangeMin: _zod.z.number().optional().describe('Y axis minimum value'),
    rangeMax: _zod.z.number().optional().describe('Y axis maximum value')
});
const lineChartConfigSchemaWithoutDefaults = withRangeMinMaxRefinement(withPrimarySecondaryManualSortRefinements(lineChartConfigSchemaCore));
const lineChartConfigSchema = withRangeMinMaxRefinement(withPrimarySecondaryManualSortRefinements(lineChartConfigSchemaCore.extend({
    displayDataLabel: displayDataLabelSchema.default(false),
    displayLegend: displayLegendSchema.default(true)
})));
// Graph configuration schema for PIE charts
const pieChartConfigSchemaCore = _zod.z.object({
    configurationType: _zod.z.literal(_widgetconfigurationtypetype.WidgetConfigurationType.PIE_CHART),
    aggregateFieldMetadataId: _zod.z.uuid(),
    aggregateOperation: _zod.z.enum(AGGREGATE_OPERATION_OPTIONS),
    groupByFieldMetadataId: _zod.z.uuid().describe('Field UUID to slice by'),
    groupBySubFieldName: _zod.z.string().optional().describe('REQUIRED for relation fields (e.g. "name", "stage") and composite fields (e.g. "addressCity"). Without this, relation fields group by raw UUID which is not useful.'),
    orderBy: _zod.z.enum(GRAPH_ORDER_BY_OPTIONS).optional(),
    manualSortOrder: _zod.z.array(_zod.z.string()).optional(),
    dateGranularity: _zod.z.enum(DATE_GRANULARITY_OPTIONS).optional().describe('Date grouping granularity when slicing by date'),
    color: _zod.z.enum(CHART_COLORS).optional().describe('Chart color theme'),
    displayDataLabel: displayDataLabelSchema,
    displayLegend: displayLegendSchema,
    showCenterMetric: showCenterMetricSchema,
    hideEmptyCategory: hideEmptyCategorySchema
});
const pieChartConfigSchemaWithoutDefaults = withManualSortRefinement(pieChartConfigSchemaCore);
const pieChartConfigSchema = withManualSortRefinement(pieChartConfigSchemaCore.extend({
    displayDataLabel: displayDataLabelSchema.default(true),
    displayLegend: displayLegendSchema.default(true),
    showCenterMetric: showCenterMetricSchema.default(true),
    hideEmptyCategory: hideEmptyCategorySchema.default(false)
}));
// Record table configuration
const recordTableConfigSchema = _zod.z.object({
    configurationType: _zod.z.literal(_widgetconfigurationtypetype.WidgetConfigurationType.RECORD_TABLE),
    viewId: _zod.z.uuid().describe('UUID of the dedicated view created for this widget. Must be created with create_view before creating the widget. Never reuse a record index view.')
});
// Iframe configuration
const iframeConfigSchema = _zod.z.object({
    configurationType: _zod.z.literal(_widgetconfigurationtypetype.WidgetConfigurationType.IFRAME),
    url: _zod.z.string().url().optional().describe('URL to embed')
});
// Rich text configuration
const richTextConfigSchema = _zod.z.object({
    configurationType: _zod.z.literal(_widgetconfigurationtypetype.WidgetConfigurationType.STANDALONE_RICH_TEXT),
    body: _zod.z.object({
        blocknote: _zod.z.string().nullable().optional().describe('BlockNote JSON string (advanced). Stringified array of BlockNote blocks.'),
        markdown: _zod.z.string().nullable().optional().describe('Markdown content string (preferred for AI). Supports headings, bold, lists, links, etc.')
    }).describe('Rich text content. Use { "markdown": "your content here" } for text. Supports full markdown syntax.')
});
const graphConfigurationSchema = _zod.z.discriminatedUnion('configurationType', [
    aggregateChartConfigSchema,
    barChartConfigSchema,
    lineChartConfigSchema,
    pieChartConfigSchema
]);
const graphConfigurationSchemaWithoutDefaults = _zod.z.discriminatedUnion('configurationType', [
    aggregateChartConfigSchemaWithoutDefaults,
    barChartConfigSchemaWithoutDefaults,
    lineChartConfigSchemaWithoutDefaults,
    pieChartConfigSchemaWithoutDefaults
]);
const widgetConfigurationSchema = _zod.z.discriminatedUnion('configurationType', [
    aggregateChartConfigSchema,
    barChartConfigSchema,
    lineChartConfigSchema,
    pieChartConfigSchema,
    iframeConfigSchema,
    richTextConfigSchema,
    recordTableConfigSchema
]).optional().describe('Widget configuration - structure depends on widget type');
const widgetConfigurationSchemaWithoutDefaults = _zod.z.discriminatedUnion('configurationType', [
    aggregateChartConfigSchemaWithoutDefaults,
    barChartConfigSchemaWithoutDefaults,
    lineChartConfigSchemaWithoutDefaults,
    pieChartConfigSchemaWithoutDefaults,
    iframeConfigSchema,
    richTextConfigSchema,
    recordTableConfigSchema
]).optional().describe('Widget configuration - structure depends on widget type');

//# sourceMappingURL=widget.schema.js.map
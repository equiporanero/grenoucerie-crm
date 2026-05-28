"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeMyFirstDashboardWidgets", {
    enumerable: true,
    get: function() {
        return computeMyFirstDashboardWidgets;
    }
});
const _constants = require("twenty-shared/constants");
const _metadata = require("twenty-shared/metadata");
const _types = require("twenty-shared/types");
const _uuid = require("uuid");
const _axisnamedisplayenum = require("../../../../metadata-modules/page-layout-widget/enums/axis-name-display.enum");
const _barchartlayoutenum = require("../../../../metadata-modules/page-layout-widget/enums/bar-chart-layout.enum");
const _dategranularityenum = require("../../../../metadata-modules/page-layout-widget/enums/date-granularity.enum");
const _graphorderbyenum = require("../../../../metadata-modules/page-layout-widget/enums/graph-order-by.enum");
const _widgetconfigurationtypetype = require("../../../../metadata-modules/page-layout-widget/enums/widget-configuration-type.type");
const _widgettypeenum = require("../../../../metadata-modules/page-layout-widget/enums/widget-type.enum");
const _createstandardpagelayoutwidgetflatmetadatautil = require("./create-standard-page-layout-widget-flat-metadata.util");
const createFilterConfigs = (filters)=>{
    const groupId = (0, _uuid.v4)();
    const recordFilterGroups = [
        {
            id: groupId,
            logicalOperator: 'AND'
        }
    ];
    return {
        configuration: {
            recordFilters: filters.map((filter)=>({
                    type: filter.type,
                    label: filter.label,
                    value: filter.value,
                    displayValue: filter.displayValue,
                    operand: filter.operand,
                    fieldMetadataId: filter.fieldMetadataId,
                    recordFilterGroupId: groupId
                })),
            recordFilterGroups
        },
        universal: {
            recordFilters: filters.map((filter)=>({
                    type: filter.type,
                    label: filter.label,
                    value: filter.value,
                    displayValue: filter.displayValue,
                    operand: filter.operand,
                    fieldMetadataUniversalIdentifier: filter.fieldMetadataUniversalIdentifier,
                    recordFilterGroupId: groupId
                })),
            recordFilterGroups
        }
    };
};
const createWelcomeRichText = ({ args })=>{
    const configuration = {
        configurationType: _widgetconfigurationtypetype.WidgetConfigurationType.STANDALONE_RICH_TEXT,
        body: {
            blocknote: JSON.stringify([
                {
                    id: (0, _uuid.v4)(),
                    type: 'heading',
                    props: {
                        textColor: 'default',
                        backgroundColor: 'default',
                        textAlignment: 'left',
                        level: 3
                    },
                    content: [
                        {
                            type: 'text',
                            text: 'Welcome to your workspace',
                            styles: {}
                        }
                    ],
                    children: []
                },
                {
                    id: (0, _uuid.v4)(),
                    type: 'paragraph',
                    props: {
                        textColor: 'default',
                        backgroundColor: 'default',
                        textAlignment: 'left'
                    },
                    content: [],
                    children: []
                },
                {
                    id: (0, _uuid.v4)(),
                    type: 'paragraph',
                    props: {
                        textColor: 'default',
                        backgroundColor: 'default',
                        textAlignment: 'left'
                    },
                    content: [
                        {
                            type: 'text',
                            text: 'You can edit this dashboard by clicking the ',
                            styles: {}
                        },
                        {
                            type: 'text',
                            text: 'Edit',
                            styles: {
                                code: true
                            }
                        },
                        {
                            type: 'text',
                            text: ' button in the top-right corner to add your own charts or customize this one.',
                            styles: {}
                        }
                    ],
                    children: []
                },
                {
                    id: (0, _uuid.v4)(),
                    type: 'paragraph',
                    props: {
                        textColor: 'default',
                        backgroundColor: 'default',
                        textAlignment: 'left'
                    },
                    content: [],
                    children: []
                },
                {
                    id: (0, _uuid.v4)(),
                    type: 'paragraph',
                    props: {
                        textColor: 'default',
                        backgroundColor: 'default',
                        textAlignment: 'left'
                    },
                    content: [
                        {
                            type: 'text',
                            text: "Don't forget to replace the sample data with your own.",
                            styles: {}
                        }
                    ],
                    children: []
                },
                {
                    id: (0, _uuid.v4)(),
                    type: 'paragraph',
                    props: {
                        textColor: 'default',
                        backgroundColor: 'default',
                        textAlignment: 'left'
                    },
                    content: [],
                    children: []
                },
                {
                    id: (0, _uuid.v4)(),
                    type: 'paragraph',
                    props: {
                        textColor: 'default',
                        backgroundColor: 'default',
                        textAlignment: 'left'
                    },
                    content: [
                        {
                            type: 'text',
                            text: 'If you have any issues, you can check ',
                            styles: {}
                        },
                        {
                            type: 'link',
                            href: 'https://docs.twenty.com/getting-started/introduction',
                            content: [
                                {
                                    type: 'text',
                                    text: 'our documentation',
                                    styles: {}
                                }
                            ]
                        },
                        {
                            type: 'text',
                            text: ' or contact us through the Support section in Settings.',
                            styles: {}
                        }
                    ],
                    children: []
                },
                {
                    id: (0, _uuid.v4)(),
                    type: 'paragraph',
                    props: {
                        textColor: 'default',
                        backgroundColor: 'default',
                        textAlignment: 'left'
                    },
                    content: [],
                    children: []
                }
            ]),
            markdown: null
        }
    };
    return (0, _createstandardpagelayoutwidgetflatmetadatautil.createStandardPageLayoutWidgetFlatMetadata)({
        ...args,
        objectMetadataUniversalIdentifier: null,
        context: {
            layoutName: 'myFirstDashboard',
            tabTitle: 'tab1',
            widgetName: 'welcomeRichText',
            title: 'Untitled Rich Text',
            type: _widgettypeenum.WidgetType.STANDALONE_RICH_TEXT,
            gridPosition: {
                row: 0,
                column: 0,
                rowSpan: 6,
                columnSpan: 6
            },
            position: {
                layoutMode: _types.PageLayoutTabLayoutMode.GRID,
                row: 0,
                column: 0,
                rowSpan: 6,
                columnSpan: 6
            },
            configuration,
            universalConfiguration: configuration,
            objectMetadataId: null,
            conditionalDisplay: null,
            conditionalAvailabilityExpression: null
        }
    });
};
const createDealsByCompany = ({ args })=>{
    const opportunityFields = args.standardObjectMetadataRelatedEntityIds.opportunity.fields;
    const opportunityObjectId = args.standardObjectMetadataRelatedEntityIds.opportunity.id;
    return (0, _createstandardpagelayoutwidgetflatmetadatautil.createStandardPageLayoutWidgetFlatMetadata)({
        ...args,
        objectMetadataUniversalIdentifier: _metadata.STANDARD_OBJECTS.opportunity.universalIdentifier,
        context: {
            layoutName: 'myFirstDashboard',
            tabTitle: 'tab1',
            widgetName: 'dealsByCompany',
            title: 'Deals by Company',
            type: _widgettypeenum.WidgetType.GRAPH,
            gridPosition: {
                row: 0,
                column: 6,
                rowSpan: 6,
                columnSpan: 6
            },
            position: {
                layoutMode: _types.PageLayoutTabLayoutMode.GRID,
                row: 0,
                column: 6,
                rowSpan: 6,
                columnSpan: 6
            },
            configuration: {
                configurationType: _widgetconfigurationtypetype.WidgetConfigurationType.PIE_CHART,
                groupByFieldMetadataId: opportunityFields.company.id,
                groupBySubFieldName: 'name',
                aggregateFieldMetadataId: opportunityFields.id.id,
                aggregateOperation: _types.AggregateOperations.COUNT,
                orderBy: _graphorderbyenum.GraphOrderBy.FIELD_ASC,
                displayDataLabel: false,
                showCenterMetric: true,
                displayLegend: true,
                color: 'orange',
                timezone: 'UTC',
                firstDayOfTheWeek: _constants.CalendarStartDay.SUNDAY
            },
            universalConfiguration: {
                configurationType: _widgetconfigurationtypetype.WidgetConfigurationType.PIE_CHART,
                groupByFieldMetadataUniversalIdentifier: _metadata.STANDARD_OBJECTS.opportunity.fields.company.universalIdentifier,
                groupBySubFieldName: 'name',
                aggregateFieldMetadataUniversalIdentifier: _metadata.STANDARD_OBJECTS.opportunity.fields.id.universalIdentifier,
                aggregateOperation: _types.AggregateOperations.COUNT,
                orderBy: _graphorderbyenum.GraphOrderBy.FIELD_ASC,
                displayDataLabel: false,
                showCenterMetric: true,
                displayLegend: true,
                color: 'orange',
                timezone: 'UTC',
                firstDayOfTheWeek: _constants.CalendarStartDay.SUNDAY
            },
            objectMetadataId: opportunityObjectId,
            conditionalDisplay: null,
            conditionalAvailabilityExpression: null
        }
    });
};
const createPipelineValueByStage = ({ args })=>{
    const opportunityFields = args.standardObjectMetadataRelatedEntityIds.opportunity.fields;
    const opportunityObjectId = args.standardObjectMetadataRelatedEntityIds.opportunity.id;
    return (0, _createstandardpagelayoutwidgetflatmetadatautil.createStandardPageLayoutWidgetFlatMetadata)({
        ...args,
        objectMetadataUniversalIdentifier: _metadata.STANDARD_OBJECTS.opportunity.universalIdentifier,
        context: {
            layoutName: 'myFirstDashboard',
            tabTitle: 'tab1',
            widgetName: 'pipelineValueByStage',
            title: 'Pipeline Value by Stage',
            type: _widgettypeenum.WidgetType.GRAPH,
            gridPosition: {
                row: 6,
                column: 0,
                rowSpan: 6,
                columnSpan: 6
            },
            position: {
                layoutMode: _types.PageLayoutTabLayoutMode.GRID,
                row: 6,
                column: 0,
                rowSpan: 6,
                columnSpan: 6
            },
            configuration: {
                configurationType: _widgetconfigurationtypetype.WidgetConfigurationType.BAR_CHART,
                aggregateFieldMetadataId: opportunityFields.amount.id,
                aggregateOperation: _types.AggregateOperations.SUM,
                primaryAxisGroupByFieldMetadataId: opportunityFields.stage.id,
                primaryAxisDateGranularity: _dategranularityenum.ObjectRecordGroupByDateGranularity.DAY,
                primaryAxisOrderBy: _graphorderbyenum.GraphOrderBy.FIELD_POSITION_ASC,
                secondaryAxisGroupByFieldMetadataId: opportunityFields.company.id,
                secondaryAxisGroupBySubFieldName: 'name',
                secondaryAxisGroupByDateGranularity: _dategranularityenum.ObjectRecordGroupByDateGranularity.DAY,
                secondaryAxisOrderBy: _graphorderbyenum.GraphOrderBy.FIELD_ASC,
                axisNameDisplay: _axisnamedisplayenum.AxisNameDisplay.NONE,
                displayDataLabel: true,
                displayLegend: true,
                color: 'green',
                layout: _barchartlayoutenum.BarChartLayout.VERTICAL,
                timezone: 'UTC',
                firstDayOfTheWeek: _constants.CalendarStartDay.SUNDAY
            },
            universalConfiguration: {
                configurationType: _widgetconfigurationtypetype.WidgetConfigurationType.BAR_CHART,
                aggregateFieldMetadataUniversalIdentifier: _metadata.STANDARD_OBJECTS.opportunity.fields.amount.universalIdentifier,
                aggregateOperation: _types.AggregateOperations.SUM,
                primaryAxisGroupByFieldMetadataUniversalIdentifier: _metadata.STANDARD_OBJECTS.opportunity.fields.stage.universalIdentifier,
                primaryAxisDateGranularity: _dategranularityenum.ObjectRecordGroupByDateGranularity.DAY,
                primaryAxisOrderBy: _graphorderbyenum.GraphOrderBy.FIELD_POSITION_ASC,
                secondaryAxisGroupByFieldMetadataUniversalIdentifier: _metadata.STANDARD_OBJECTS.opportunity.fields.company.universalIdentifier,
                secondaryAxisGroupBySubFieldName: 'name',
                secondaryAxisGroupByDateGranularity: _dategranularityenum.ObjectRecordGroupByDateGranularity.DAY,
                secondaryAxisOrderBy: _graphorderbyenum.GraphOrderBy.FIELD_ASC,
                axisNameDisplay: _axisnamedisplayenum.AxisNameDisplay.NONE,
                displayDataLabel: true,
                displayLegend: true,
                color: 'green',
                layout: _barchartlayoutenum.BarChartLayout.VERTICAL,
                timezone: 'UTC',
                firstDayOfTheWeek: _constants.CalendarStartDay.SUNDAY
            },
            objectMetadataId: opportunityObjectId,
            conditionalDisplay: null,
            conditionalAvailabilityExpression: null
        }
    });
};
const createRevenueTimeline = ({ args })=>{
    const opportunityFields = args.standardObjectMetadataRelatedEntityIds.opportunity.fields;
    const opportunityObjectId = args.standardObjectMetadataRelatedEntityIds.opportunity.id;
    return (0, _createstandardpagelayoutwidgetflatmetadatautil.createStandardPageLayoutWidgetFlatMetadata)({
        ...args,
        objectMetadataUniversalIdentifier: _metadata.STANDARD_OBJECTS.opportunity.universalIdentifier,
        context: {
            layoutName: 'myFirstDashboard',
            tabTitle: 'tab1',
            widgetName: 'revenueTimeline',
            title: 'Revenue Timeline',
            type: _widgettypeenum.WidgetType.GRAPH,
            gridPosition: {
                row: 6,
                column: 6,
                rowSpan: 6,
                columnSpan: 6
            },
            position: {
                layoutMode: _types.PageLayoutTabLayoutMode.GRID,
                row: 6,
                column: 6,
                rowSpan: 6,
                columnSpan: 6
            },
            configuration: {
                configurationType: _widgetconfigurationtypetype.WidgetConfigurationType.LINE_CHART,
                aggregateFieldMetadataId: opportunityFields.amount.id,
                aggregateOperation: _types.AggregateOperations.SUM,
                primaryAxisGroupByFieldMetadataId: opportunityFields.closeDate.id,
                primaryAxisDateGranularity: _dategranularityenum.ObjectRecordGroupByDateGranularity.DAY,
                primaryAxisOrderBy: _graphorderbyenum.GraphOrderBy.FIELD_ASC,
                axisNameDisplay: _axisnamedisplayenum.AxisNameDisplay.NONE,
                displayDataLabel: false,
                displayLegend: true,
                color: 'crimson',
                isCumulative: false,
                timezone: 'UTC',
                firstDayOfTheWeek: _constants.CalendarStartDay.SUNDAY
            },
            universalConfiguration: {
                configurationType: _widgetconfigurationtypetype.WidgetConfigurationType.LINE_CHART,
                aggregateFieldMetadataUniversalIdentifier: _metadata.STANDARD_OBJECTS.opportunity.fields.amount.universalIdentifier,
                aggregateOperation: _types.AggregateOperations.SUM,
                primaryAxisGroupByFieldMetadataUniversalIdentifier: _metadata.STANDARD_OBJECTS.opportunity.fields.closeDate.universalIdentifier,
                primaryAxisDateGranularity: _dategranularityenum.ObjectRecordGroupByDateGranularity.DAY,
                primaryAxisOrderBy: _graphorderbyenum.GraphOrderBy.FIELD_ASC,
                axisNameDisplay: _axisnamedisplayenum.AxisNameDisplay.NONE,
                displayDataLabel: false,
                displayLegend: true,
                color: 'crimson',
                isCumulative: false,
                timezone: 'UTC',
                firstDayOfTheWeek: _constants.CalendarStartDay.SUNDAY
            },
            objectMetadataId: opportunityObjectId,
            conditionalDisplay: null,
            conditionalAvailabilityExpression: null
        }
    });
};
const createOpportunitiesByOwner = ({ args })=>{
    const opportunityFields = args.standardObjectMetadataRelatedEntityIds.opportunity.fields;
    const opportunityObjectId = args.standardObjectMetadataRelatedEntityIds.opportunity.id;
    return (0, _createstandardpagelayoutwidgetflatmetadatautil.createStandardPageLayoutWidgetFlatMetadata)({
        ...args,
        objectMetadataUniversalIdentifier: _metadata.STANDARD_OBJECTS.opportunity.universalIdentifier,
        context: {
            layoutName: 'myFirstDashboard',
            tabTitle: 'tab1',
            widgetName: 'opportunitiesByOwner',
            title: 'Opportunities by Owner',
            type: _widgettypeenum.WidgetType.GRAPH,
            gridPosition: {
                row: 12,
                column: 0,
                rowSpan: 6,
                columnSpan: 6
            },
            position: {
                layoutMode: _types.PageLayoutTabLayoutMode.GRID,
                row: 12,
                column: 0,
                rowSpan: 6,
                columnSpan: 6
            },
            configuration: {
                configurationType: _widgetconfigurationtypetype.WidgetConfigurationType.BAR_CHART,
                aggregateFieldMetadataId: opportunityFields.id.id,
                aggregateOperation: _types.AggregateOperations.COUNT,
                primaryAxisGroupByFieldMetadataId: opportunityFields.owner.id,
                primaryAxisGroupBySubFieldName: 'name.firstName',
                primaryAxisDateGranularity: _dategranularityenum.ObjectRecordGroupByDateGranularity.DAY,
                primaryAxisOrderBy: _graphorderbyenum.GraphOrderBy.FIELD_ASC,
                secondaryAxisGroupByFieldMetadataId: opportunityFields.owner.id,
                secondaryAxisGroupBySubFieldName: 'name.firstName',
                secondaryAxisGroupByDateGranularity: _dategranularityenum.ObjectRecordGroupByDateGranularity.DAY,
                secondaryAxisOrderBy: _graphorderbyenum.GraphOrderBy.FIELD_ASC,
                axisNameDisplay: _axisnamedisplayenum.AxisNameDisplay.NONE,
                displayDataLabel: false,
                displayLegend: true,
                color: 'blue',
                layout: _barchartlayoutenum.BarChartLayout.HORIZONTAL,
                isCumulative: false,
                timezone: 'UTC',
                firstDayOfTheWeek: _constants.CalendarStartDay.SUNDAY
            },
            universalConfiguration: {
                configurationType: _widgetconfigurationtypetype.WidgetConfigurationType.BAR_CHART,
                aggregateFieldMetadataUniversalIdentifier: _metadata.STANDARD_OBJECTS.opportunity.fields.id.universalIdentifier,
                aggregateOperation: _types.AggregateOperations.COUNT,
                primaryAxisGroupByFieldMetadataUniversalIdentifier: _metadata.STANDARD_OBJECTS.opportunity.fields.owner.universalIdentifier,
                primaryAxisGroupBySubFieldName: 'name.firstName',
                primaryAxisDateGranularity: _dategranularityenum.ObjectRecordGroupByDateGranularity.DAY,
                primaryAxisOrderBy: _graphorderbyenum.GraphOrderBy.FIELD_ASC,
                secondaryAxisGroupByFieldMetadataUniversalIdentifier: _metadata.STANDARD_OBJECTS.opportunity.fields.owner.universalIdentifier,
                secondaryAxisGroupBySubFieldName: 'name.firstName',
                secondaryAxisGroupByDateGranularity: _dategranularityenum.ObjectRecordGroupByDateGranularity.DAY,
                secondaryAxisOrderBy: _graphorderbyenum.GraphOrderBy.FIELD_ASC,
                axisNameDisplay: _axisnamedisplayenum.AxisNameDisplay.NONE,
                displayDataLabel: false,
                displayLegend: true,
                color: 'blue',
                layout: _barchartlayoutenum.BarChartLayout.HORIZONTAL,
                isCumulative: false,
                timezone: 'UTC',
                firstDayOfTheWeek: _constants.CalendarStartDay.SUNDAY
            },
            objectMetadataId: opportunityObjectId,
            conditionalDisplay: null,
            conditionalAvailabilityExpression: null
        }
    });
};
const createStockMarketIframe = ({ args })=>{
    const configuration = {
        configurationType: _widgetconfigurationtypetype.WidgetConfigurationType.IFRAME,
        url: 'https://www.tradingview.com/embed-widget/hotlists/?locale=en'
    };
    return (0, _createstandardpagelayoutwidgetflatmetadatautil.createStandardPageLayoutWidgetFlatMetadata)({
        ...args,
        objectMetadataUniversalIdentifier: null,
        context: {
            layoutName: 'myFirstDashboard',
            tabTitle: 'tab1',
            widgetName: 'stockMarketIframe',
            title: 'Stock market (Iframe)',
            type: _widgettypeenum.WidgetType.IFRAME,
            gridPosition: {
                row: 12,
                column: 6,
                rowSpan: 8,
                columnSpan: 6
            },
            position: {
                layoutMode: _types.PageLayoutTabLayoutMode.GRID,
                row: 12,
                column: 6,
                rowSpan: 8,
                columnSpan: 6
            },
            configuration,
            universalConfiguration: configuration,
            objectMetadataId: null,
            conditionalDisplay: null,
            conditionalAvailabilityExpression: null
        }
    });
};
const createDealsCreatedThisMonth = ({ args })=>{
    const opportunityFields = args.standardObjectMetadataRelatedEntityIds.opportunity.fields;
    const opportunityObjectId = args.standardObjectMetadataRelatedEntityIds.opportunity.id;
    const filterConfigs = createFilterConfigs([
        {
            type: 'DATE_TIME',
            label: 'Creation date',
            value: 'THIS_1_MONTH;;UTC;;SUNDAY;;',
            displayValue: 'THIS_1_MONTH;;UTC;;SUNDAY;;',
            operand: 'IS_RELATIVE',
            fieldMetadataId: opportunityFields.createdAt.id,
            fieldMetadataUniversalIdentifier: _metadata.STANDARD_OBJECTS.opportunity.fields.createdAt.universalIdentifier
        }
    ]);
    return (0, _createstandardpagelayoutwidgetflatmetadatautil.createStandardPageLayoutWidgetFlatMetadata)({
        ...args,
        objectMetadataUniversalIdentifier: _metadata.STANDARD_OBJECTS.opportunity.universalIdentifier,
        context: {
            layoutName: 'myFirstDashboard',
            tabTitle: 'tab1',
            widgetName: 'dealsCreatedThisMonth',
            title: 'Deals created this month',
            type: _widgettypeenum.WidgetType.GRAPH,
            gridPosition: {
                row: 18,
                column: 0,
                rowSpan: 2,
                columnSpan: 3
            },
            position: {
                layoutMode: _types.PageLayoutTabLayoutMode.GRID,
                row: 18,
                column: 0,
                rowSpan: 2,
                columnSpan: 3
            },
            configuration: {
                configurationType: _widgetconfigurationtypetype.WidgetConfigurationType.AGGREGATE_CHART,
                aggregateFieldMetadataId: opportunityFields.id.id,
                aggregateOperation: _types.AggregateOperations.COUNT,
                displayDataLabel: false,
                filter: filterConfigs.configuration,
                prefix: '',
                timezone: 'UTC',
                firstDayOfTheWeek: _constants.CalendarStartDay.SUNDAY
            },
            universalConfiguration: {
                configurationType: _widgetconfigurationtypetype.WidgetConfigurationType.AGGREGATE_CHART,
                aggregateFieldMetadataUniversalIdentifier: _metadata.STANDARD_OBJECTS.opportunity.fields.id.universalIdentifier,
                aggregateOperation: _types.AggregateOperations.COUNT,
                displayDataLabel: false,
                filter: filterConfigs.universal,
                prefix: '',
                timezone: 'UTC',
                firstDayOfTheWeek: _constants.CalendarStartDay.SUNDAY
            },
            objectMetadataId: opportunityObjectId,
            conditionalDisplay: null,
            conditionalAvailabilityExpression: null
        }
    });
};
const createDealValueCreatedThisMonth = ({ args })=>{
    const opportunityFields = args.standardObjectMetadataRelatedEntityIds.opportunity.fields;
    const opportunityObjectId = args.standardObjectMetadataRelatedEntityIds.opportunity.id;
    const filterConfigs = createFilterConfigs([
        {
            type: 'DATE_TIME',
            label: 'Creation date',
            value: 'THIS_1_MONTH;;UTC;;SUNDAY;;',
            displayValue: 'THIS_1_MONTH;;UTC;;SUNDAY;;',
            operand: 'IS_RELATIVE',
            fieldMetadataId: opportunityFields.createdAt.id,
            fieldMetadataUniversalIdentifier: _metadata.STANDARD_OBJECTS.opportunity.fields.createdAt.universalIdentifier
        }
    ]);
    return (0, _createstandardpagelayoutwidgetflatmetadatautil.createStandardPageLayoutWidgetFlatMetadata)({
        ...args,
        objectMetadataUniversalIdentifier: _metadata.STANDARD_OBJECTS.opportunity.universalIdentifier,
        context: {
            layoutName: 'myFirstDashboard',
            tabTitle: 'tab1',
            widgetName: 'dealValueCreatedThisMonth',
            title: 'Deal value created this month',
            type: _widgettypeenum.WidgetType.GRAPH,
            gridPosition: {
                row: 18,
                column: 3,
                rowSpan: 2,
                columnSpan: 3
            },
            position: {
                layoutMode: _types.PageLayoutTabLayoutMode.GRID,
                row: 18,
                column: 3,
                rowSpan: 2,
                columnSpan: 3
            },
            configuration: {
                configurationType: _widgetconfigurationtypetype.WidgetConfigurationType.AGGREGATE_CHART,
                aggregateFieldMetadataId: opportunityFields.amount.id,
                aggregateOperation: _types.AggregateOperations.SUM,
                displayDataLabel: false,
                filter: filterConfigs.configuration,
                prefix: '$',
                timezone: 'UTC',
                firstDayOfTheWeek: _constants.CalendarStartDay.SUNDAY
            },
            universalConfiguration: {
                configurationType: _widgetconfigurationtypetype.WidgetConfigurationType.AGGREGATE_CHART,
                aggregateFieldMetadataUniversalIdentifier: _metadata.STANDARD_OBJECTS.opportunity.fields.amount.universalIdentifier,
                aggregateOperation: _types.AggregateOperations.SUM,
                displayDataLabel: false,
                filter: filterConfigs.universal,
                prefix: '$',
                timezone: 'UTC',
                firstDayOfTheWeek: _constants.CalendarStartDay.SUNDAY
            },
            objectMetadataId: opportunityObjectId,
            conditionalDisplay: null,
            conditionalAvailabilityExpression: null
        }
    });
};
const computeMyFirstDashboardWidgets = (args)=>{
    return [
        createWelcomeRichText({
            args
        }),
        createDealsByCompany({
            args
        }),
        createPipelineValueByStage({
            args
        }),
        createRevenueTimeline({
            args
        }),
        createOpportunitiesByOwner({
            args
        }),
        createStockMarketIframe({
            args
        }),
        createDealsCreatedThisMonth({
            args
        }),
        createDealValueCreatedThisMonth({
            args
        })
    ];
};

//# sourceMappingURL=compute-my-first-dashboard-widgets.util.js.map
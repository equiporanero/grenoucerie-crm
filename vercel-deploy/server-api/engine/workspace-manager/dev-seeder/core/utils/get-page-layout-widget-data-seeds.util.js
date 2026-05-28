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
    get getPageLayoutWidgetDataSeeds () {
        return getPageLayoutWidgetDataSeeds;
    },
    get getPageLayoutWidgetFlatEntitySeeds () {
        return getPageLayoutWidgetFlatEntitySeeds;
    }
});
const _constants = require("twenty-shared/constants");
const _metadata = require("twenty-shared/metadata");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _frompagelayoutwidgetconfigurationtouniversalconfigurationutil = require("../../../../metadata-modules/flat-page-layout-widget/utils/from-page-layout-widget-configuration-to-universal-configuration.util");
const _axisnamedisplayenum = require("../../../../metadata-modules/page-layout-widget/enums/axis-name-display.enum");
const _barchartlayoutenum = require("../../../../metadata-modules/page-layout-widget/enums/bar-chart-layout.enum");
const _dategranularityenum = require("../../../../metadata-modules/page-layout-widget/enums/date-granularity.enum");
const _graphorderbyenum = require("../../../../metadata-modules/page-layout-widget/enums/graph-order-by.enum");
const _widgetconfigurationtypetype = require("../../../../metadata-modules/page-layout-widget/enums/widget-configuration-type.type");
const _widgettypeenum = require("../../../../metadata-modules/page-layout-widget/enums/widget-type.enum");
const _pagelayouttabseedsconstant = require("../constants/page-layout-tab-seeds.constant");
const _pagelayoutwidgetseedsconstant = require("../constants/page-layout-widget-seeds.constant");
const _generateseedidutil = require("./generate-seed-id.util");
const _getpagelayoutwidgetdataseedsv2util = require("./get-page-layout-widget-data-seeds-v2.util");
const _prefillfrontcomponentdefinitionsutil = require("../../../standard-objects-prefill-data/utils/prefill-front-component-definitions.util");
const getPageLayoutWidgetFlatEntitySeeds = ({ workspaceId, flatApplication, objectMetadataItems })=>{
    const seeds = getPageLayoutWidgetDataSeeds(workspaceId, objectMetadataItems);
    const now = new Date().toISOString();
    const fieldMetadataUniversalIdentifierById = {};
    for (const objectMetadata of objectMetadataItems){
        if (!(0, _utils.isDefined)(objectMetadata.fields)) {
            continue;
        }
        for (const field of objectMetadata.fields){
            fieldMetadataUniversalIdentifierById[field.id] = field.universalIdentifier;
        }
    }
    const frontComponentUniversalIdentifierById = {};
    for (const definition of (0, _prefillfrontcomponentdefinitionsutil.getSeedFrontComponentDefinitions)(workspaceId)){
        frontComponentUniversalIdentifierById[definition.id] = definition.universalIdentifier;
    }
    return seeds.map((seed)=>{
        const objectMetadata = (0, _utils.isDefined)(seed.objectMetadataId) ? objectMetadataItems.find((objectMetadataItem)=>objectMetadataItem.id === seed.objectMetadataId) : undefined;
        const universalConfiguration = (0, _frompagelayoutwidgetconfigurationtouniversalconfigurationutil.fromPageLayoutWidgetConfigurationToUniversalConfiguration)({
            configuration: seed.configuration,
            fieldMetadataUniversalIdentifierById,
            frontComponentUniversalIdentifierById
        });
        return {
            ...seed,
            universalIdentifier: seed.id,
            applicationId: flatApplication.id,
            applicationUniversalIdentifier: flatApplication.universalIdentifier,
            workspaceId,
            pageLayoutTabUniversalIdentifier: seed.pageLayoutTabId,
            objectMetadataUniversalIdentifier: objectMetadata?.universalIdentifier ?? null,
            universalConfiguration,
            conditionalDisplay: null,
            conditionalAvailabilityExpression: null,
            isActive: true,
            createdAt: now,
            updatedAt: now,
            deletedAt: null,
            universalOverrides: null
        };
    });
};
const getFieldId = (object, fieldName)=>{
    return object?.fields?.find((field)=>field.name === fieldName)?.id;
};
const getPageLayoutWidgetDataSeeds = (workspaceId, objectMetadataItems)=>{
    const opportunityObject = objectMetadataItems.find((obj)=>obj.universalIdentifier === _metadata.STANDARD_OBJECTS.opportunity.universalIdentifier);
    const companyObject = objectMetadataItems.find((obj)=>obj.universalIdentifier === _metadata.STANDARD_OBJECTS.company.universalIdentifier);
    const personObject = objectMetadataItems.find((obj)=>obj.universalIdentifier === _metadata.STANDARD_OBJECTS.person.universalIdentifier);
    const taskObject = objectMetadataItems.find((obj)=>obj.universalIdentifier === _metadata.STANDARD_OBJECTS.task.universalIdentifier);
    const rocketObject = objectMetadataItems.find((obj)=>obj.nameSingular === 'rocket');
    const opportunityAmountFieldId = getFieldId(opportunityObject, 'amount');
    const opportunityCloseDateFieldId = getFieldId(opportunityObject, 'closeDate');
    const opportunityStageFieldId = getFieldId(opportunityObject, 'stage');
    const companyIdFieldId = getFieldId(companyObject, 'id');
    const companyEmployeesFieldId = getFieldId(companyObject, 'employees');
    const companyArrFieldId = getFieldId(companyObject, 'annualRecurringRevenue');
    const companyLinkedinLinkFieldId = getFieldId(companyObject, 'linkedinLink');
    const companyAddressFieldId = getFieldId(companyObject, 'address');
    const personIdFieldId = getFieldId(personObject, 'id');
    const personCityFieldId = getFieldId(personObject, 'city');
    const opportunityIdFieldId = getFieldId(opportunityObject, 'id');
    const taskIdFieldId = getFieldId(taskObject, 'id');
    const rocketIdFieldId = getFieldId(rocketObject, 'id');
    const rocketCreatedAtFieldId = getFieldId(rocketObject, 'createdAt');
    const v1Widgets = [
        // Sales Overview Tab Widgets
        (0, _utils.isDefined)(opportunityAmountFieldId) ? {
            id: (0, _generateseedidutil.generateSeedId)(workspaceId, _pagelayoutwidgetseedsconstant.PAGE_LAYOUT_WIDGET_SEEDS.SALES_PIPELINE_VALUE),
            pageLayoutTabId: (0, _generateseedidutil.generateSeedId)(workspaceId, _pagelayouttabseedsconstant.PAGE_LAYOUT_TAB_SEEDS.SALES_OVERVIEW),
            title: 'Total Pipeline Value',
            type: _widgettypeenum.WidgetType.GRAPH,
            gridPosition: {
                row: 0,
                column: 0,
                rowSpan: 2,
                columnSpan: 3
            },
            position: {
                layoutMode: _types.PageLayoutTabLayoutMode.GRID,
                row: 0,
                column: 0,
                rowSpan: 2,
                columnSpan: 3
            },
            configuration: {
                configurationType: _widgetconfigurationtypetype.WidgetConfigurationType.AGGREGATE_CHART,
                aggregateFieldMetadataId: opportunityAmountFieldId,
                aggregateOperation: _types.AggregateOperations.SUM,
                displayDataLabel: true,
                timezone: 'UTC',
                firstDayOfTheWeek: _constants.CalendarStartDay.MONDAY
            },
            objectMetadataId: opportunityObject?.id ?? null,
            overrides: null
        } : null,
        (0, _utils.isDefined)(rocketIdFieldId) ? {
            id: (0, _generateseedidutil.generateSeedId)(workspaceId, _pagelayoutwidgetseedsconstant.PAGE_LAYOUT_WIDGET_SEEDS.SALES_AVERAGE_DEAL_SIZE),
            pageLayoutTabId: (0, _generateseedidutil.generateSeedId)(workspaceId, _pagelayouttabseedsconstant.PAGE_LAYOUT_TAB_SEEDS.SALES_OVERVIEW),
            title: 'Rocket Count (Object Permission Test)',
            type: _widgettypeenum.WidgetType.GRAPH,
            gridPosition: {
                row: 0,
                column: 3,
                rowSpan: 4,
                columnSpan: 4
            },
            position: {
                layoutMode: _types.PageLayoutTabLayoutMode.GRID,
                row: 0,
                column: 3,
                rowSpan: 4,
                columnSpan: 4
            },
            configuration: {
                configurationType: _widgetconfigurationtypetype.WidgetConfigurationType.AGGREGATE_CHART,
                aggregateFieldMetadataId: rocketIdFieldId,
                aggregateOperation: _types.AggregateOperations.COUNT,
                displayDataLabel: true,
                timezone: 'UTC',
                firstDayOfTheWeek: _constants.CalendarStartDay.MONDAY
            },
            objectMetadataId: rocketObject?.id ?? null,
            overrides: null
        } : null,
        (0, _utils.isDefined)(opportunityAmountFieldId) && (0, _utils.isDefined)(opportunityCloseDateFieldId) && (0, _utils.isDefined)(opportunityStageFieldId) ? {
            id: (0, _generateseedidutil.generateSeedId)(workspaceId, _pagelayoutwidgetseedsconstant.PAGE_LAYOUT_WIDGET_SEEDS.SALES_DEALS_BY_STAGE),
            pageLayoutTabId: (0, _generateseedidutil.generateSeedId)(workspaceId, _pagelayouttabseedsconstant.PAGE_LAYOUT_TAB_SEEDS.SALES_OVERVIEW),
            title: 'Pipeline Value by Close Date (Stacked by Stage)',
            type: _widgettypeenum.WidgetType.GRAPH,
            gridPosition: {
                row: 4,
                column: 0,
                rowSpan: 8,
                columnSpan: 6
            },
            position: {
                layoutMode: _types.PageLayoutTabLayoutMode.GRID,
                row: 4,
                column: 0,
                rowSpan: 8,
                columnSpan: 6
            },
            configuration: {
                configurationType: _widgetconfigurationtypetype.WidgetConfigurationType.BAR_CHART,
                aggregateFieldMetadataId: opportunityAmountFieldId,
                aggregateOperation: _types.AggregateOperations.SUM,
                primaryAxisGroupByFieldMetadataId: opportunityCloseDateFieldId,
                secondaryAxisGroupByFieldMetadataId: opportunityStageFieldId,
                primaryAxisOrderBy: _graphorderbyenum.GraphOrderBy.FIELD_ASC,
                axisNameDisplay: _axisnamedisplayenum.AxisNameDisplay.NONE,
                displayDataLabel: false,
                color: 'auto',
                layout: _barchartlayoutenum.BarChartLayout.VERTICAL,
                timezone: 'UTC',
                firstDayOfTheWeek: _constants.CalendarStartDay.MONDAY
            },
            objectMetadataId: opportunityObject?.id ?? null,
            overrides: null
        } : null,
        // Sales Details Tab Widgets
        (0, _utils.isDefined)(rocketIdFieldId) && (0, _utils.isDefined)(rocketCreatedAtFieldId) ? {
            id: (0, _generateseedidutil.generateSeedId)(workspaceId, _pagelayoutwidgetseedsconstant.PAGE_LAYOUT_WIDGET_SEEDS.SALES_DEAL_DISTRIBUTION),
            pageLayoutTabId: (0, _generateseedidutil.generateSeedId)(workspaceId, _pagelayouttabseedsconstant.PAGE_LAYOUT_TAB_SEEDS.SALES_DETAILS),
            title: 'Rockets by Created Date (Object Permission Test)',
            type: _widgettypeenum.WidgetType.GRAPH,
            gridPosition: {
                row: 0,
                column: 0,
                rowSpan: 5,
                columnSpan: 5
            },
            position: {
                layoutMode: _types.PageLayoutTabLayoutMode.GRID,
                row: 0,
                column: 0,
                rowSpan: 5,
                columnSpan: 5
            },
            configuration: {
                configurationType: _widgetconfigurationtypetype.WidgetConfigurationType.BAR_CHART,
                aggregateFieldMetadataId: rocketIdFieldId,
                aggregateOperation: _types.AggregateOperations.COUNT,
                primaryAxisGroupByFieldMetadataId: rocketCreatedAtFieldId,
                primaryAxisOrderBy: _graphorderbyenum.GraphOrderBy.FIELD_ASC,
                axisNameDisplay: _axisnamedisplayenum.AxisNameDisplay.NONE,
                displayDataLabel: false,
                color: 'auto',
                layout: _barchartlayoutenum.BarChartLayout.VERTICAL,
                timezone: 'UTC',
                firstDayOfTheWeek: _constants.CalendarStartDay.MONDAY
            },
            objectMetadataId: rocketObject?.id ?? null,
            overrides: null
        } : null,
        (0, _utils.isDefined)(opportunityIdFieldId) ? {
            id: (0, _generateseedidutil.generateSeedId)(workspaceId, _pagelayoutwidgetseedsconstant.PAGE_LAYOUT_WIDGET_SEEDS.SALES_OPPORTUNITY_COUNT),
            pageLayoutTabId: (0, _generateseedidutil.generateSeedId)(workspaceId, _pagelayouttabseedsconstant.PAGE_LAYOUT_TAB_SEEDS.SALES_DETAILS),
            title: 'Opportunity Count',
            type: _widgettypeenum.WidgetType.GRAPH,
            gridPosition: {
                row: 0,
                column: 5,
                rowSpan: 5,
                columnSpan: 7
            },
            position: {
                layoutMode: _types.PageLayoutTabLayoutMode.GRID,
                row: 0,
                column: 5,
                rowSpan: 5,
                columnSpan: 7
            },
            configuration: {
                configurationType: _widgetconfigurationtypetype.WidgetConfigurationType.AGGREGATE_CHART,
                aggregateFieldMetadataId: opportunityIdFieldId,
                aggregateOperation: _types.AggregateOperations.COUNT,
                displayDataLabel: true,
                timezone: 'UTC',
                firstDayOfTheWeek: _constants.CalendarStartDay.MONDAY
            },
            objectMetadataId: opportunityObject?.id ?? null,
            overrides: null
        } : null,
        // Customer Overview Tab Widgets
        (0, _utils.isDefined)(companyIdFieldId) ? {
            id: (0, _generateseedidutil.generateSeedId)(workspaceId, _pagelayoutwidgetseedsconstant.PAGE_LAYOUT_WIDGET_SEEDS.CUSTOMER_TOTAL_COUNT),
            pageLayoutTabId: (0, _generateseedidutil.generateSeedId)(workspaceId, _pagelayouttabseedsconstant.PAGE_LAYOUT_TAB_SEEDS.CUSTOMER_OVERVIEW),
            title: 'Total Customers',
            type: _widgettypeenum.WidgetType.GRAPH,
            gridPosition: {
                row: 0,
                column: 0,
                rowSpan: 2,
                columnSpan: 3
            },
            position: {
                layoutMode: _types.PageLayoutTabLayoutMode.GRID,
                row: 0,
                column: 0,
                rowSpan: 2,
                columnSpan: 3
            },
            configuration: {
                configurationType: _widgetconfigurationtypetype.WidgetConfigurationType.AGGREGATE_CHART,
                aggregateFieldMetadataId: companyIdFieldId,
                aggregateOperation: _types.AggregateOperations.COUNT,
                displayDataLabel: true,
                timezone: 'UTC',
                firstDayOfTheWeek: _constants.CalendarStartDay.MONDAY
            },
            objectMetadataId: companyObject?.id ?? null,
            overrides: null
        } : null,
        (0, _utils.isDefined)(companyIdFieldId) && (0, _utils.isDefined)(companyEmployeesFieldId) && (0, _utils.isDefined)(companyAddressFieldId) ? {
            id: (0, _generateseedidutil.generateSeedId)(workspaceId, _pagelayoutwidgetseedsconstant.PAGE_LAYOUT_WIDGET_SEEDS.CUSTOMER_COMPANIES_BY_SIZE),
            pageLayoutTabId: (0, _generateseedidutil.generateSeedId)(workspaceId, _pagelayouttabseedsconstant.PAGE_LAYOUT_TAB_SEEDS.CUSTOMER_OVERVIEW),
            title: 'Companies by Size (Stacked by City)',
            type: _widgettypeenum.WidgetType.GRAPH,
            gridPosition: {
                row: 0,
                column: 6,
                rowSpan: 10,
                columnSpan: 6
            },
            position: {
                layoutMode: _types.PageLayoutTabLayoutMode.GRID,
                row: 0,
                column: 6,
                rowSpan: 10,
                columnSpan: 6
            },
            configuration: {
                configurationType: _widgetconfigurationtypetype.WidgetConfigurationType.BAR_CHART,
                aggregateFieldMetadataId: companyIdFieldId,
                aggregateOperation: _types.AggregateOperations.COUNT,
                primaryAxisGroupByFieldMetadataId: companyEmployeesFieldId,
                secondaryAxisGroupByFieldMetadataId: companyAddressFieldId,
                secondaryAxisGroupBySubFieldName: 'addressCity',
                secondaryAxisGroupByDateGranularity: _dategranularityenum.ObjectRecordGroupByDateGranularity.DAY,
                primaryAxisOrderBy: _graphorderbyenum.GraphOrderBy.FIELD_ASC,
                axisNameDisplay: _axisnamedisplayenum.AxisNameDisplay.NONE,
                displayDataLabel: false,
                color: 'auto',
                layout: _barchartlayoutenum.BarChartLayout.VERTICAL,
                timezone: 'UTC',
                firstDayOfTheWeek: _constants.CalendarStartDay.MONDAY
            },
            objectMetadataId: companyObject?.id ?? null,
            overrides: null
        } : null,
        // Customer Analytics Tab Widgets
        (0, _utils.isDefined)(companyArrFieldId) ? {
            id: (0, _generateseedidutil.generateSeedId)(workspaceId, _pagelayoutwidgetseedsconstant.PAGE_LAYOUT_WIDGET_SEEDS.CUSTOMER_ANNUAL_RECURRING_REVENUE),
            pageLayoutTabId: (0, _generateseedidutil.generateSeedId)(workspaceId, _pagelayouttabseedsconstant.PAGE_LAYOUT_TAB_SEEDS.CUSTOMER_ANALYTICS),
            title: 'Annual Recurring Revenue',
            type: _widgettypeenum.WidgetType.GRAPH,
            gridPosition: {
                row: 0,
                column: 0,
                rowSpan: 4,
                columnSpan: 4
            },
            position: {
                layoutMode: _types.PageLayoutTabLayoutMode.GRID,
                row: 0,
                column: 0,
                rowSpan: 4,
                columnSpan: 4
            },
            configuration: {
                configurationType: _widgetconfigurationtypetype.WidgetConfigurationType.AGGREGATE_CHART,
                aggregateFieldMetadataId: companyArrFieldId,
                aggregateOperation: _types.AggregateOperations.SUM,
                displayDataLabel: true,
                timezone: 'UTC',
                firstDayOfTheWeek: _constants.CalendarStartDay.MONDAY
            },
            objectMetadataId: companyObject?.id ?? null,
            overrides: null
        } : null,
        (0, _utils.isDefined)(companyLinkedinLinkFieldId) ? {
            id: (0, _generateseedidutil.generateSeedId)(workspaceId, _pagelayoutwidgetseedsconstant.PAGE_LAYOUT_WIDGET_SEEDS.CUSTOMER_LINKEDIN_COUNT),
            pageLayoutTabId: (0, _generateseedidutil.generateSeedId)(workspaceId, _pagelayouttabseedsconstant.PAGE_LAYOUT_TAB_SEEDS.CUSTOMER_OVERVIEW),
            title: 'LinkedIn Profiles Count (Field Permission Test)',
            type: _widgettypeenum.WidgetType.GRAPH,
            gridPosition: {
                row: 2,
                column: 0,
                rowSpan: 4,
                columnSpan: 3
            },
            position: {
                layoutMode: _types.PageLayoutTabLayoutMode.GRID,
                row: 2,
                column: 0,
                rowSpan: 4,
                columnSpan: 3
            },
            configuration: {
                configurationType: _widgetconfigurationtypetype.WidgetConfigurationType.AGGREGATE_CHART,
                aggregateFieldMetadataId: companyLinkedinLinkFieldId,
                aggregateOperation: _types.AggregateOperations.COUNT,
                displayDataLabel: true,
                timezone: 'UTC',
                firstDayOfTheWeek: _constants.CalendarStartDay.MONDAY
            },
            objectMetadataId: companyObject?.id ?? null,
            overrides: null
        } : null,
        // Team Overview Tab Widgets
        (0, _utils.isDefined)(personIdFieldId) ? {
            id: (0, _generateseedidutil.generateSeedId)(workspaceId, _pagelayoutwidgetseedsconstant.PAGE_LAYOUT_WIDGET_SEEDS.TEAM_SIZE),
            pageLayoutTabId: (0, _generateseedidutil.generateSeedId)(workspaceId, _pagelayouttabseedsconstant.PAGE_LAYOUT_TAB_SEEDS.TEAM_OVERVIEW),
            title: 'Team Size',
            type: _widgettypeenum.WidgetType.GRAPH,
            gridPosition: {
                row: 0,
                column: 0,
                rowSpan: 5,
                columnSpan: 6
            },
            position: {
                layoutMode: _types.PageLayoutTabLayoutMode.GRID,
                row: 0,
                column: 0,
                rowSpan: 5,
                columnSpan: 6
            },
            configuration: {
                configurationType: _widgetconfigurationtypetype.WidgetConfigurationType.AGGREGATE_CHART,
                aggregateFieldMetadataId: personIdFieldId,
                aggregateOperation: _types.AggregateOperations.COUNT,
                displayDataLabel: true,
                timezone: 'UTC',
                firstDayOfTheWeek: _constants.CalendarStartDay.MONDAY
            },
            objectMetadataId: personObject?.id ?? null,
            overrides: null
        } : null,
        (0, _utils.isDefined)(personIdFieldId) && (0, _utils.isDefined)(personCityFieldId) ? {
            id: (0, _generateseedidutil.generateSeedId)(workspaceId, _pagelayoutwidgetseedsconstant.PAGE_LAYOUT_WIDGET_SEEDS.TEAM_GEOGRAPHIC_DISTRIBUTION),
            pageLayoutTabId: (0, _generateseedidutil.generateSeedId)(workspaceId, _pagelayouttabseedsconstant.PAGE_LAYOUT_TAB_SEEDS.TEAM_OVERVIEW),
            title: 'Geographic Distribution',
            type: _widgettypeenum.WidgetType.GRAPH,
            gridPosition: {
                row: 0,
                column: 6,
                rowSpan: 5,
                columnSpan: 6
            },
            position: {
                layoutMode: _types.PageLayoutTabLayoutMode.GRID,
                row: 0,
                column: 6,
                rowSpan: 5,
                columnSpan: 6
            },
            configuration: {
                configurationType: _widgetconfigurationtypetype.WidgetConfigurationType.BAR_CHART,
                aggregateFieldMetadataId: personIdFieldId,
                aggregateOperation: _types.AggregateOperations.COUNT,
                primaryAxisGroupByFieldMetadataId: personCityFieldId,
                primaryAxisOrderBy: _graphorderbyenum.GraphOrderBy.VALUE_DESC,
                axisNameDisplay: _axisnamedisplayenum.AxisNameDisplay.NONE,
                displayDataLabel: false,
                color: 'auto',
                layout: _barchartlayoutenum.BarChartLayout.VERTICAL,
                timezone: 'UTC',
                firstDayOfTheWeek: _constants.CalendarStartDay.MONDAY
            },
            objectMetadataId: personObject?.id ?? null,
            overrides: null
        } : null,
        // Team Metrics Tab Widgets
        (0, _utils.isDefined)(taskIdFieldId) ? {
            id: (0, _generateseedidutil.generateSeedId)(workspaceId, _pagelayoutwidgetseedsconstant.PAGE_LAYOUT_WIDGET_SEEDS.TEAM_OPEN_TASKS),
            pageLayoutTabId: (0, _generateseedidutil.generateSeedId)(workspaceId, _pagelayouttabseedsconstant.PAGE_LAYOUT_TAB_SEEDS.TEAM_METRICS),
            title: 'Open Tasks',
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
                configurationType: _widgetconfigurationtypetype.WidgetConfigurationType.AGGREGATE_CHART,
                aggregateFieldMetadataId: taskIdFieldId,
                aggregateOperation: _types.AggregateOperations.COUNT,
                displayDataLabel: true,
                timezone: 'UTC',
                firstDayOfTheWeek: _constants.CalendarStartDay.MONDAY
            },
            objectMetadataId: taskObject?.id ?? null,
            overrides: null
        } : null,
        // Sales Overview Tab Widgets - Front Component
        {
            id: (0, _generateseedidutil.generateSeedId)(workspaceId, _pagelayoutwidgetseedsconstant.PAGE_LAYOUT_WIDGET_SEEDS.FRONT_COMPONENT),
            pageLayoutTabId: (0, _generateseedidutil.generateSeedId)(workspaceId, _pagelayouttabseedsconstant.PAGE_LAYOUT_TAB_SEEDS.SALES_OVERVIEW),
            title: 'Front Component',
            type: _widgettypeenum.WidgetType.FRONT_COMPONENT,
            gridPosition: {
                row: 2,
                column: 7,
                rowSpan: 2,
                columnSpan: 5
            },
            position: {
                layoutMode: _types.PageLayoutTabLayoutMode.GRID,
                row: 2,
                column: 7,
                rowSpan: 2,
                columnSpan: 5
            },
            configuration: {
                configurationType: _widgetconfigurationtypetype.WidgetConfigurationType.FRONT_COMPONENT,
                frontComponentId: (0, _prefillfrontcomponentdefinitionsutil.getSeedFrontComponentIds)(workspaceId).helloWorldId
            },
            objectMetadataId: null,
            overrides: null
        },
        {
            id: (0, _generateseedidutil.generateSeedId)(workspaceId, _pagelayoutwidgetseedsconstant.PAGE_LAYOUT_WIDGET_SEEDS.DOCUMENTATION_IFRAME),
            pageLayoutTabId: (0, _generateseedidutil.generateSeedId)(workspaceId, _pagelayouttabseedsconstant.PAGE_LAYOUT_TAB_SEEDS.DOCUMENTATION),
            title: 'Twenty Star History',
            type: _widgettypeenum.WidgetType.IFRAME,
            gridPosition: {
                row: 0,
                column: 0,
                rowSpan: 12,
                columnSpan: 12
            },
            position: {
                layoutMode: _types.PageLayoutTabLayoutMode.GRID,
                row: 0,
                column: 0,
                rowSpan: 12,
                columnSpan: 12
            },
            configuration: {
                configurationType: _widgetconfigurationtypetype.WidgetConfigurationType.IFRAME,
                url: 'https://www.star-history.com/?repos=twentyhq%2Ftwenty&type=date&legend=top-left'
            },
            objectMetadataId: null,
            overrides: null
        }
    ].filter(_utils.isDefined);
    const v2Widgets = (0, _getpagelayoutwidgetdataseedsv2util.getPageLayoutWidgetDataSeedsV2)(workspaceId, objectMetadataItems);
    return [
        ...v1Widgets,
        ...v2Widgets
    ];
};

//# sourceMappingURL=get-page-layout-widget-data-seeds.util.js.map
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getPageLayoutWidgetDataSeedsV2", {
    enumerable: true,
    get: function() {
        return getPageLayoutWidgetDataSeedsV2;
    }
});
const _constants = require("twenty-shared/constants");
const _metadata = require("twenty-shared/metadata");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _axisnamedisplayenum = require("../../../../metadata-modules/page-layout-widget/enums/axis-name-display.enum");
const _graphorderbyenum = require("../../../../metadata-modules/page-layout-widget/enums/graph-order-by.enum");
const _widgetconfigurationtypetype = require("../../../../metadata-modules/page-layout-widget/enums/widget-configuration-type.type");
const _widgettypeenum = require("../../../../metadata-modules/page-layout-widget/enums/widget-type.enum");
const _pagelayouttabseedsconstant = require("../constants/page-layout-tab-seeds.constant");
const _pagelayoutwidgetseedsconstant = require("../constants/page-layout-widget-seeds.constant");
const _generateseedidutil = require("./generate-seed-id.util");
const getFieldId = (object, fieldName)=>{
    return object?.fields?.find((field)=>field.name === fieldName)?.id;
};
const getPageLayoutWidgetDataSeedsV2 = (workspaceId, objectMetadataItems)=>{
    const opportunityObject = objectMetadataItems.find((obj)=>obj.universalIdentifier === _metadata.STANDARD_OBJECTS.opportunity.universalIdentifier);
    const companyObject = objectMetadataItems.find((obj)=>obj.universalIdentifier === _metadata.STANDARD_OBJECTS.company.universalIdentifier);
    const personObject = objectMetadataItems.find((obj)=>obj.universalIdentifier === _metadata.STANDARD_OBJECTS.person.universalIdentifier);
    const opportunityAmountFieldId = getFieldId(opportunityObject, 'amount');
    const opportunityCloseDateFieldId = getFieldId(opportunityObject, 'closeDate');
    const companyIdFieldId = getFieldId(companyObject, 'id');
    const companyCreatedAtFieldId = getFieldId(companyObject, 'createdAt');
    const companyArrFieldId = getFieldId(companyObject, 'annualRecurringRevenue');
    const companyNameFieldId = getFieldId(companyObject, 'name');
    const companyLinkedinLinkFieldId = getFieldId(companyObject, 'linkedinLink');
    const personIdFieldId = getFieldId(personObject, 'id');
    const personJobTitleFieldId = getFieldId(personObject, 'jobTitle');
    return [
        // LINE chart: Revenue Forecast (Sales Overview)
        (0, _utils.isDefined)(opportunityAmountFieldId) && (0, _utils.isDefined)(opportunityCloseDateFieldId) ? {
            id: (0, _generateseedidutil.generateSeedId)(workspaceId, _pagelayoutwidgetseedsconstant.PAGE_LAYOUT_WIDGET_SEEDS.SALES_REVENUE_FORECAST),
            pageLayoutTabId: (0, _generateseedidutil.generateSeedId)(workspaceId, _pagelayouttabseedsconstant.PAGE_LAYOUT_TAB_SEEDS.SALES_OVERVIEW),
            title: 'Revenue Forecast',
            type: _widgettypeenum.WidgetType.GRAPH,
            gridPosition: {
                row: 0,
                column: 7,
                rowSpan: 8,
                columnSpan: 5
            },
            position: {
                layoutMode: _types.PageLayoutTabLayoutMode.GRID,
                row: 0,
                column: 7,
                rowSpan: 8,
                columnSpan: 5
            },
            configuration: {
                configurationType: _widgetconfigurationtypetype.WidgetConfigurationType.LINE_CHART,
                aggregateFieldMetadataId: opportunityAmountFieldId,
                aggregateOperation: _types.AggregateOperations.SUM,
                primaryAxisGroupByFieldMetadataId: opportunityCloseDateFieldId,
                primaryAxisOrderBy: _graphorderbyenum.GraphOrderBy.FIELD_ASC,
                axisNameDisplay: _axisnamedisplayenum.AxisNameDisplay.NONE,
                displayDataLabel: false,
                timezone: 'UTC',
                firstDayOfTheWeek: _constants.CalendarStartDay.MONDAY
            },
            objectMetadataId: opportunityObject?.id ?? null,
            overrides: null
        } : null,
        // LINE chart: New Customers Over Time (Customer Overview)
        (0, _utils.isDefined)(companyIdFieldId) && (0, _utils.isDefined)(companyCreatedAtFieldId) ? {
            id: (0, _generateseedidutil.generateSeedId)(workspaceId, _pagelayoutwidgetseedsconstant.PAGE_LAYOUT_WIDGET_SEEDS.CUSTOMER_NEW_OVER_TIME),
            pageLayoutTabId: (0, _generateseedidutil.generateSeedId)(workspaceId, _pagelayouttabseedsconstant.PAGE_LAYOUT_TAB_SEEDS.CUSTOMER_OVERVIEW),
            title: 'New Customers Over Time',
            type: _widgettypeenum.WidgetType.GRAPH,
            gridPosition: {
                row: 0,
                column: 3,
                rowSpan: 6,
                columnSpan: 5
            },
            position: {
                layoutMode: _types.PageLayoutTabLayoutMode.GRID,
                row: 0,
                column: 3,
                rowSpan: 6,
                columnSpan: 5
            },
            configuration: {
                configurationType: _widgetconfigurationtypetype.WidgetConfigurationType.LINE_CHART,
                aggregateFieldMetadataId: companyIdFieldId,
                aggregateOperation: _types.AggregateOperations.COUNT,
                primaryAxisGroupByFieldMetadataId: companyCreatedAtFieldId,
                primaryAxisOrderBy: _graphorderbyenum.GraphOrderBy.FIELD_ASC,
                axisNameDisplay: _axisnamedisplayenum.AxisNameDisplay.NONE,
                displayDataLabel: false,
                timezone: 'UTC',
                firstDayOfTheWeek: _constants.CalendarStartDay.MONDAY
            },
            objectMetadataId: companyObject?.id ?? null,
            overrides: null
        } : null,
        // PIE chart: Revenue Distribution (Customer Analytics)
        (0, _utils.isDefined)(companyArrFieldId) && (0, _utils.isDefined)(companyNameFieldId) ? {
            id: (0, _generateseedidutil.generateSeedId)(workspaceId, _pagelayoutwidgetseedsconstant.PAGE_LAYOUT_WIDGET_SEEDS.CUSTOMER_REVENUE_DISTRIBUTION),
            pageLayoutTabId: (0, _generateseedidutil.generateSeedId)(workspaceId, _pagelayouttabseedsconstant.PAGE_LAYOUT_TAB_SEEDS.CUSTOMER_ANALYTICS),
            title: 'Revenue Distribution',
            type: _widgettypeenum.WidgetType.GRAPH,
            gridPosition: {
                row: 0,
                column: 4,
                rowSpan: 2,
                columnSpan: 3
            },
            position: {
                layoutMode: _types.PageLayoutTabLayoutMode.GRID,
                row: 0,
                column: 4,
                rowSpan: 2,
                columnSpan: 3
            },
            configuration: {
                configurationType: _widgetconfigurationtypetype.WidgetConfigurationType.PIE_CHART,
                aggregateFieldMetadataId: companyArrFieldId,
                aggregateOperation: _types.AggregateOperations.SUM,
                groupByFieldMetadataId: companyNameFieldId,
                orderBy: _graphorderbyenum.GraphOrderBy.VALUE_DESC,
                displayDataLabel: true,
                timezone: 'UTC',
                firstDayOfTheWeek: _constants.CalendarStartDay.MONDAY
            },
            objectMetadataId: companyObject?.id ?? null,
            overrides: null
        } : null,
        // PIE chart: Companies by LinkedIn (Customer Overview)
        (0, _utils.isDefined)(companyIdFieldId) && (0, _utils.isDefined)(companyLinkedinLinkFieldId) ? {
            id: (0, _generateseedidutil.generateSeedId)(workspaceId, _pagelayoutwidgetseedsconstant.PAGE_LAYOUT_WIDGET_SEEDS.CUSTOMER_LINKEDIN_DISTRIBUTION),
            pageLayoutTabId: (0, _generateseedidutil.generateSeedId)(workspaceId, _pagelayouttabseedsconstant.PAGE_LAYOUT_TAB_SEEDS.CUSTOMER_OVERVIEW),
            title: 'Companies by LinkedIn (Field Permission Test)',
            type: _widgettypeenum.WidgetType.GRAPH,
            gridPosition: {
                row: 6,
                column: 0,
                rowSpan: 4,
                columnSpan: 6
            },
            position: {
                layoutMode: _types.PageLayoutTabLayoutMode.GRID,
                row: 6,
                column: 0,
                rowSpan: 4,
                columnSpan: 6
            },
            configuration: {
                configurationType: _widgetconfigurationtypetype.WidgetConfigurationType.PIE_CHART,
                aggregateFieldMetadataId: companyIdFieldId,
                aggregateOperation: _types.AggregateOperations.COUNT,
                groupByFieldMetadataId: companyLinkedinLinkFieldId,
                groupBySubFieldName: 'primaryLinkUrl',
                orderBy: _graphorderbyenum.GraphOrderBy.VALUE_DESC,
                displayDataLabel: true,
                timezone: 'UTC',
                firstDayOfTheWeek: _constants.CalendarStartDay.MONDAY
            },
            objectMetadataId: companyObject?.id ?? null,
            overrides: null
        } : null,
        // PIE chart: Contact Roles (Team Metrics)
        (0, _utils.isDefined)(personIdFieldId) && (0, _utils.isDefined)(personJobTitleFieldId) ? {
            id: (0, _generateseedidutil.generateSeedId)(workspaceId, _pagelayoutwidgetseedsconstant.PAGE_LAYOUT_WIDGET_SEEDS.TEAM_CONTACT_ROLES),
            pageLayoutTabId: (0, _generateseedidutil.generateSeedId)(workspaceId, _pagelayouttabseedsconstant.PAGE_LAYOUT_TAB_SEEDS.TEAM_METRICS),
            title: 'Contact Roles',
            type: _widgettypeenum.WidgetType.GRAPH,
            gridPosition: {
                row: 0,
                column: 0,
                rowSpan: 4,
                columnSpan: 6
            },
            position: {
                layoutMode: _types.PageLayoutTabLayoutMode.GRID,
                row: 0,
                column: 0,
                rowSpan: 4,
                columnSpan: 6
            },
            configuration: {
                configurationType: _widgetconfigurationtypetype.WidgetConfigurationType.PIE_CHART,
                aggregateFieldMetadataId: personIdFieldId,
                aggregateOperation: _types.AggregateOperations.COUNT,
                groupByFieldMetadataId: personJobTitleFieldId,
                orderBy: _graphorderbyenum.GraphOrderBy.VALUE_DESC,
                displayDataLabel: true,
                timezone: 'UTC',
                firstDayOfTheWeek: _constants.CalendarStartDay.MONDAY
            },
            objectMetadataId: personObject?.id ?? null,
            overrides: null
        } : null
    ].filter(_utils.isDefined);
};

//# sourceMappingURL=get-page-layout-widget-data-seeds-v2.util.js.map
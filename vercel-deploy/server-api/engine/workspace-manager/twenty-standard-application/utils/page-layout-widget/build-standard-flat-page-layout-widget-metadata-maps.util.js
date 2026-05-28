"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildStandardFlatPageLayoutWidgetMetadataMaps", {
    enumerable: true,
    get: function() {
        return buildStandardFlatPageLayoutWidgetMetadataMaps;
    }
});
const _metadata = require("twenty-shared/metadata");
const _utils = require("twenty-shared/utils");
const _createemptyflatentitymapsconstant = require("../../../../metadata-modules/flat-entity/constant/create-empty-flat-entity-maps.constant");
const _addflatentitytoflatentitymapsorthrowutil = require("../../../../metadata-modules/flat-entity/utils/add-flat-entity-to-flat-entity-maps-or-throw.util");
const _fielddisplaymodeenum = require("../../../../metadata-modules/page-layout-widget/enums/field-display-mode.enum");
const _widgetconfigurationtypetype = require("../../../../metadata-modules/page-layout-widget/enums/widget-configuration-type.type");
const _widgettypeenum = require("../../../../metadata-modules/page-layout-widget/enums/widget-type.enum");
const _standardpagelayoutconstant = require("../../constants/standard-page-layout.constant");
const _computemyfirstdashboardwidgetsutil = require("./compute-my-first-dashboard-widgets.util");
const _createstandardpagelayoutwidgetflatmetadatautil = require("./create-standard-page-layout-widget-flat-metadata.util");
const _createstandardpagelayoutflatmetadatautil = require("../page-layout/create-standard-page-layout-flat-metadata.util");
const RECORD_PAGE_LAYOUT_WIDGET_TYPES = [
    _widgettypeenum.WidgetType.FIELDS,
    _widgettypeenum.WidgetType.FIELD,
    _widgettypeenum.WidgetType.STANDALONE_RICH_TEXT,
    _widgettypeenum.WidgetType.TIMELINE,
    _widgettypeenum.WidgetType.TASKS,
    _widgettypeenum.WidgetType.NOTES,
    _widgettypeenum.WidgetType.FILES,
    _widgettypeenum.WidgetType.EMAILS,
    _widgettypeenum.WidgetType.CALENDAR,
    _widgettypeenum.WidgetType.FIELD_RICH_TEXT,
    _widgettypeenum.WidgetType.WORKFLOW,
    _widgettypeenum.WidgetType.WORKFLOW_VERSION,
    _widgettypeenum.WidgetType.WORKFLOW_RUN
];
const WIDGET_TYPE_TO_CONFIGURATION_TYPE = {
    [_widgettypeenum.WidgetType.FIELDS]: _widgetconfigurationtypetype.WidgetConfigurationType.FIELDS,
    [_widgettypeenum.WidgetType.FIELD]: _widgetconfigurationtypetype.WidgetConfigurationType.FIELD,
    [_widgettypeenum.WidgetType.STANDALONE_RICH_TEXT]: _widgetconfigurationtypetype.WidgetConfigurationType.STANDALONE_RICH_TEXT,
    [_widgettypeenum.WidgetType.TIMELINE]: _widgetconfigurationtypetype.WidgetConfigurationType.TIMELINE,
    [_widgettypeenum.WidgetType.TASKS]: _widgetconfigurationtypetype.WidgetConfigurationType.TASKS,
    [_widgettypeenum.WidgetType.NOTES]: _widgetconfigurationtypetype.WidgetConfigurationType.NOTES,
    [_widgettypeenum.WidgetType.FILES]: _widgetconfigurationtypetype.WidgetConfigurationType.FILES,
    [_widgettypeenum.WidgetType.EMAILS]: _widgetconfigurationtypetype.WidgetConfigurationType.EMAILS,
    [_widgettypeenum.WidgetType.CALENDAR]: _widgetconfigurationtypetype.WidgetConfigurationType.CALENDAR,
    [_widgettypeenum.WidgetType.FIELD_RICH_TEXT]: _widgetconfigurationtypetype.WidgetConfigurationType.FIELD_RICH_TEXT,
    [_widgettypeenum.WidgetType.WORKFLOW]: _widgetconfigurationtypetype.WidgetConfigurationType.WORKFLOW,
    [_widgettypeenum.WidgetType.WORKFLOW_VERSION]: _widgetconfigurationtypetype.WidgetConfigurationType.WORKFLOW_VERSION,
    [_widgettypeenum.WidgetType.WORKFLOW_RUN]: _widgetconfigurationtypetype.WidgetConfigurationType.WORKFLOW_RUN,
    [_widgettypeenum.WidgetType.RECORD_TABLE]: _widgetconfigurationtypetype.WidgetConfigurationType.RECORD_TABLE,
    [_widgettypeenum.WidgetType.EMAIL_THREAD]: _widgetconfigurationtypetype.WidgetConfigurationType.EMAIL_THREAD
};
const RECORD_PAGE_FIELDS_VIEW_NAME_BY_OBJECT = {
    blocklist: 'blocklistRecordPageFields',
    calendarChannelEventAssociation: 'calendarChannelEventAssociationRecordPageFields',
    calendarEventParticipant: 'calendarEventParticipantRecordPageFields',
    company: 'companyRecordPageFields',
    messageChannelMessageAssociation: 'messageChannelMessageAssociationRecordPageFields',
    messageChannelMessageAssociationMessageFolder: 'messageChannelMessageAssociationMessageFolderRecordPageFields',
    messageParticipant: 'messageParticipantRecordPageFields',
    note: 'noteRecordPageFields',
    opportunity: 'opportunityRecordPageFields',
    person: 'personRecordPageFields',
    task: 'taskRecordPageFields',
    workflowAutomatedTrigger: 'workflowAutomatedTriggerRecordPageFields',
    workflowRun: 'workflowRunRecordPageFields',
    workflowVersion: 'workflowVersionRecordPageFields'
};
const buildRecordPageWidgetConfigurations = ({ widgetType, layoutObjectName, standardObjectMetadataRelatedEntityIds, fieldUniversalIdentifier })=>{
    if (widgetType === _widgettypeenum.WidgetType.FIELDS && (0, _utils.isDefined)(layoutObjectName)) {
        return buildFieldsWidgetConfiguration({
            objectName: layoutObjectName,
            standardObjectMetadataRelatedEntityIds
        });
    }
    if (widgetType === _widgettypeenum.WidgetType.FIELD && (0, _utils.isDefined)(layoutObjectName) && (0, _utils.isDefined)(fieldUniversalIdentifier)) {
        return buildFieldWidgetConfiguration({
            objectName: layoutObjectName,
            standardObjectMetadataRelatedEntityIds,
            fieldUniversalIdentifier
        });
    }
    const configurationType = WIDGET_TYPE_TO_CONFIGURATION_TYPE[widgetType];
    if (!configurationType) {
        throw new Error(`No configuration type mapping for widget type ${widgetType}`);
    }
    const baseConfig = {
        configurationType
    };
    return {
        configuration: baseConfig,
        universalConfiguration: baseConfig
    };
};
const buildFieldsWidgetConfiguration = ({ objectName, standardObjectMetadataRelatedEntityIds })=>{
    const recordPageFieldsViewName = RECORD_PAGE_FIELDS_VIEW_NAME_BY_OBJECT[objectName];
    if (!recordPageFieldsViewName) {
        return {
            configuration: {
                configurationType: _widgetconfigurationtypetype.WidgetConfigurationType.FIELDS,
                viewId: null,
                newFieldDefaultVisibility: true
            },
            universalConfiguration: {
                configurationType: _widgetconfigurationtypetype.WidgetConfigurationType.FIELDS,
                viewUniversalIdentifier: null,
                newFieldDefaultVisibility: true
            }
        };
    }
    const views = standardObjectMetadataRelatedEntityIds[objectName].views;
    const viewId = views[recordPageFieldsViewName]?.id ?? null;
    // @ts-expect-error ignore
    const viewDefinition = _metadata.STANDARD_OBJECTS[objectName].views?.[recordPageFieldsViewName];
    const viewUniversalIdentifier = viewDefinition?.universalIdentifier ?? null;
    return {
        configuration: {
            configurationType: _widgetconfigurationtypetype.WidgetConfigurationType.FIELDS,
            viewId,
            newFieldDefaultVisibility: true
        },
        universalConfiguration: {
            configurationType: _widgetconfigurationtypetype.WidgetConfigurationType.FIELDS,
            viewUniversalIdentifier,
            newFieldDefaultVisibility: true
        }
    };
};
const buildFieldWidgetConfiguration = ({ objectName, standardObjectMetadataRelatedEntityIds, fieldUniversalIdentifier })=>{
    const fields = standardObjectMetadataRelatedEntityIds[objectName].fields;
    const fieldName = Object.keys(_metadata.STANDARD_OBJECTS[objectName].fields).find((name)=>_metadata.STANDARD_OBJECTS[objectName].fields[name]?.universalIdentifier === fieldUniversalIdentifier);
    const fieldMetadataId = fieldName ? fields[fieldName]?.id ?? null : null;
    return {
        configuration: {
            configurationType: _widgetconfigurationtypetype.WidgetConfigurationType.FIELD,
            fieldMetadataId: fieldMetadataId ?? fieldUniversalIdentifier,
            fieldDisplayMode: _fielddisplaymodeenum.FieldDisplayMode.CARD
        },
        universalConfiguration: {
            configurationType: _widgetconfigurationtypetype.WidgetConfigurationType.FIELD,
            fieldMetadataId: fieldUniversalIdentifier,
            fieldDisplayMode: _fielddisplaymodeenum.FieldDisplayMode.CARD
        }
    };
};
const computeRecordPageWidgets = ({ now, workspaceId, twentyStandardApplicationId, standardObjectMetadataRelatedEntityIds, standardPageLayoutMetadataRelatedEntityIds })=>{
    const allWidgets = [];
    for (const layoutName of Object.keys(_standardpagelayoutconstant.STANDARD_RECORD_PAGE_LAYOUTS)){
        const layout = _standardpagelayoutconstant.STANDARD_RECORD_PAGE_LAYOUTS[layoutName];
        let layoutObjectMetadataId = null;
        let layoutObjectName = null;
        if (layout.objectUniversalIdentifier) {
            const objectName = (0, _createstandardpagelayoutflatmetadatautil.findObjectNameByUniversalIdentifier)(layout.objectUniversalIdentifier);
            layoutObjectName = objectName;
            layoutObjectMetadataId = standardObjectMetadataRelatedEntityIds[objectName]?.id ?? null;
        }
        for (const tabTitle of Object.keys(layout.tabs)){
            const tab = layout.tabs[tabTitle];
            for (const widgetName of Object.keys(tab.widgets)){
                const widget = tab.widgets[widgetName];
                const isRecordPageWidget = RECORD_PAGE_LAYOUT_WIDGET_TYPES.includes(widget.type);
                const objectMetadataId = isRecordPageWidget ? layoutObjectMetadataId : null;
                const objectMetadataUniversalIdentifier = isRecordPageWidget ? layout.objectUniversalIdentifier ?? null : null;
                const { configuration, universalConfiguration } = buildRecordPageWidgetConfigurations({
                    widgetType: widget.type,
                    layoutObjectName,
                    standardObjectMetadataRelatedEntityIds,
                    fieldUniversalIdentifier: widget.fieldUniversalIdentifier
                });
                allWidgets.push((0, _createstandardpagelayoutwidgetflatmetadatautil.createStandardPageLayoutWidgetFlatMetadata)({
                    now,
                    workspaceId,
                    twentyStandardApplicationId,
                    standardObjectMetadataRelatedEntityIds,
                    standardPageLayoutMetadataRelatedEntityIds,
                    objectMetadataUniversalIdentifier,
                    context: {
                        layoutName,
                        tabTitle,
                        widgetName,
                        title: widget.title,
                        type: widget.type,
                        gridPosition: widget.gridPosition,
                        position: widget.position ?? null,
                        configuration,
                        universalConfiguration,
                        objectMetadataId,
                        conditionalDisplay: widget.conditionalDisplay ?? null,
                        conditionalAvailabilityExpression: widget.conditionalAvailabilityExpression ?? null
                    }
                }));
            }
        }
    }
    return allWidgets;
};
const buildStandardFlatPageLayoutWidgetMetadataMaps = (args)=>{
    const allWidgetMetadatas = [
        ...(0, _computemyfirstdashboardwidgetsutil.computeMyFirstDashboardWidgets)(args),
        ...computeRecordPageWidgets(args)
    ];
    let flatPageLayoutWidgetMaps = (0, _createemptyflatentitymapsconstant.createEmptyFlatEntityMaps)();
    for (const widgetMetadata of allWidgetMetadatas){
        flatPageLayoutWidgetMaps = (0, _addflatentitytoflatentitymapsorthrowutil.addFlatEntityToFlatEntityMapsOrThrow)({
            flatEntity: widgetMetadata,
            flatEntityMaps: flatPageLayoutWidgetMaps
        });
    }
    return flatPageLayoutWidgetMaps;
};

//# sourceMappingURL=build-standard-flat-page-layout-widget-metadata-maps.util.js.map
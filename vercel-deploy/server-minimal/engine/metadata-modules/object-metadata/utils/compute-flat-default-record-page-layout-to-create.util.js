"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeFlatDefaultRecordPageLayoutToCreate", {
    enumerable: true,
    get: function() {
        return computeFlatDefaultRecordPageLayoutToCreate;
    }
});
const _uuid = require("uuid");
const _widgetconfigurationtypetype = require("../../page-layout-widget/enums/widget-configuration-type.type");
const _pagelayouttypeenum = require("../../page-layout/enums/page-layout-type.enum");
const _standardpagelayouttabstemplate = require("../../../workspace-manager/twenty-standard-application/constants/standard-page-layout-tabs.template");
const computeFlatDefaultRecordPageLayoutToCreate = ({ objectMetadata, flatApplication, recordPageFieldsView, workspaceId })=>{
    const now = new Date().toISOString();
    const pageLayoutId = (0, _uuid.v4)();
    const pageLayoutUniversalIdentifier = (0, _uuid.v4)();
    const tabDefinitions = [
        {
            key: 'home',
            widgetKey: 'fields'
        },
        {
            key: 'timeline',
            widgetKey: 'timeline'
        },
        {
            key: 'tasks',
            widgetKey: 'tasks'
        },
        {
            key: 'notes',
            widgetKey: 'notes'
        },
        {
            key: 'files',
            widgetKey: 'files'
        }
    ];
    const pageLayoutTabs = [];
    const pageLayoutWidgets = [];
    for (const { key, widgetKey } of tabDefinitions){
        const tabProps = _standardpagelayouttabstemplate.TAB_PROPS[key];
        const widgetProps = _standardpagelayouttabstemplate.WIDGET_PROPS[widgetKey];
        const tabId = (0, _uuid.v4)();
        const tabUniversalIdentifier = (0, _uuid.v4)();
        const widgetId = (0, _uuid.v4)();
        const widgetUniversalIdentifier = (0, _uuid.v4)();
        pageLayoutTabs.push({
            id: tabId,
            universalIdentifier: tabUniversalIdentifier,
            applicationId: flatApplication.id,
            applicationUniversalIdentifier: flatApplication.universalIdentifier,
            workspaceId,
            title: tabProps.title,
            position: tabProps.position,
            pageLayoutId,
            pageLayoutUniversalIdentifier,
            widgetIds: [
                widgetId
            ],
            widgetUniversalIdentifiers: [
                widgetUniversalIdentifier
            ],
            isActive: true,
            createdAt: now,
            updatedAt: now,
            deletedAt: null,
            icon: tabProps.icon,
            layoutMode: tabProps.layoutMode,
            overrides: null
        });
        const isFieldsWidget = widgetKey === 'fields';
        const configuration = isFieldsWidget ? {
            configurationType: _widgetconfigurationtypetype.WidgetConfigurationType.FIELDS,
            viewId: recordPageFieldsView.id
        } : {
            configurationType: _widgetconfigurationtypetype.WidgetConfigurationType[widgetKey.toUpperCase()]
        };
        const universalConfiguration = isFieldsWidget ? {
            configurationType: _widgetconfigurationtypetype.WidgetConfigurationType.FIELDS,
            viewUniversalIdentifier: recordPageFieldsView.universalIdentifier
        } : {
            configurationType: _widgetconfigurationtypetype.WidgetConfigurationType[widgetKey.toUpperCase()]
        };
        pageLayoutWidgets.push({
            id: widgetId,
            universalIdentifier: widgetUniversalIdentifier,
            applicationId: flatApplication.id,
            applicationUniversalIdentifier: flatApplication.universalIdentifier,
            workspaceId,
            pageLayoutTabId: tabId,
            pageLayoutTabUniversalIdentifier: tabUniversalIdentifier,
            title: widgetProps.title,
            type: widgetProps.type,
            gridPosition: widgetProps.gridPosition,
            position: widgetProps.position,
            // @ts-expect-error - configurationType is validated but TS can't match to discriminated union
            configuration,
            // @ts-expect-error - configurationType is validated but TS can't match to discriminated union
            universalConfiguration,
            objectMetadataId: objectMetadata.id,
            objectMetadataUniversalIdentifier: objectMetadata.universalIdentifier,
            isActive: true,
            createdAt: now,
            updatedAt: now,
            deletedAt: null,
            conditionalDisplay: null,
            overrides: null
        });
    }
    const pageLayout = {
        id: pageLayoutId,
        universalIdentifier: pageLayoutUniversalIdentifier,
        applicationId: flatApplication.id,
        applicationUniversalIdentifier: flatApplication.universalIdentifier,
        workspaceId,
        name: `Default ${objectMetadata.labelSingular} Layout`,
        type: _pagelayouttypeenum.PageLayoutType.RECORD_PAGE,
        objectMetadataId: objectMetadata.id,
        objectMetadataUniversalIdentifier: objectMetadata.universalIdentifier,
        tabIds: pageLayoutTabs.map((tab)=>tab.id),
        tabUniversalIdentifiers: pageLayoutTabs.map((tab)=>tab.universalIdentifier),
        createdAt: now,
        updatedAt: now,
        deletedAt: null,
        defaultTabToFocusOnMobileAndSidePanelId: null,
        defaultTabToFocusOnMobileAndSidePanelUniversalIdentifier: null
    };
    return {
        pageLayouts: [
            pageLayout
        ],
        pageLayoutTabs,
        pageLayoutWidgets
    };
};

//# sourceMappingURL=compute-flat-default-record-page-layout-to-create.util.js.map
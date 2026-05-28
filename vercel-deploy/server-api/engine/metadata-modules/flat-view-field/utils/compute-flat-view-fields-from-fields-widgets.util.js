"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeFlatViewFieldsFromFieldsWidgets", {
    enumerable: true,
    get: function() {
        return computeFlatViewFieldsFromFieldsWidgets;
    }
});
const _utils = require("twenty-shared/utils");
const _uuid = require("uuid");
const _defaultviewfieldsizeconstant = require("../constants/default-view-field-size.constant");
const _widgetconfigurationtypetype = require("../../page-layout-widget/enums/widget-configuration-type.type");
const _widgettypeenum = require("../../page-layout-widget/enums/widget-type.enum");
const isFieldsWidgetConfiguration = (configuration)=>{
    return (0, _utils.isDefined)(configuration) && configuration.configurationType === _widgetconfigurationtypetype.WidgetConfigurationType.FIELDS;
};
const getMatchingFieldsWidgets = ({ objectMetadataUniversalIdentifier, flatPageLayoutWidgetMaps })=>Object.values(flatPageLayoutWidgetMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((widget)=>widget.isActive && widget.type === _widgettypeenum.WidgetType.FIELDS && widget.objectMetadataUniversalIdentifier === objectMetadataUniversalIdentifier && isFieldsWidgetConfiguration(widget.configuration) && (0, _utils.isDefined)(widget.configuration.viewId) && (0, _utils.isDefined)(widget.configuration.newFieldDefaultVisibility));
const findLastViewFieldGroupId = ({ viewId, flatViewFieldGroupMaps })=>{
    const groupsForView = Object.values(flatViewFieldGroupMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((group)=>group.isActive && group.viewId === viewId);
    if (groupsForView.length === 0) {
        return null;
    }
    const lastGroup = groupsForView.reduce((maxGroup, group)=>group.position > maxGroup.position ? group : maxGroup);
    return lastGroup.id;
};
const computeNextPosition = ({ viewId, viewFieldGroupId, flatViewFieldMaps })=>{
    const existingViewFields = Object.values(flatViewFieldMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((viewField)=>viewField.isActive && viewField.viewId === viewId).filter((viewField)=>viewField.viewFieldGroupId === viewFieldGroupId);
    if (existingViewFields.length === 0) {
        return 0;
    }
    const maxPosition = Math.max(...existingViewFields.map((viewField)=>viewField.position));
    return maxPosition + 1;
};
const computeFlatViewFieldsFromFieldsWidgets = ({ fieldsToCreate, flatPageLayoutWidgetMaps, flatViewFieldMaps, flatViewMaps, flatViewFieldGroupMaps, applicationUniversalIdentifier })=>{
    const flatViewFieldsToCreate = [];
    const now = new Date().toISOString();
    const objectMetadataUniversalIdentifiers = [
        ...new Set(fieldsToCreate.map((field)=>field.objectMetadataUniversalIdentifier))
    ];
    const nextPositionByKey = new Map();
    for (const objectMetadataUniversalIdentifier of objectMetadataUniversalIdentifiers){
        const matchingWidgets = getMatchingFieldsWidgets({
            objectMetadataUniversalIdentifier,
            flatPageLayoutWidgetMaps
        });
        const fieldsForObject = fieldsToCreate.filter((field)=>field.objectMetadataUniversalIdentifier === objectMetadataUniversalIdentifier);
        for (const widget of matchingWidgets){
            if (!isFieldsWidgetConfiguration(widget.configuration)) {
                continue;
            }
            const configuration = widget.configuration;
            const viewId = configuration.viewId;
            const isVisible = configuration.newFieldDefaultVisibility;
            const viewUniversalIdentifier = flatViewMaps.universalIdentifierById[viewId] ?? null;
            if (!(0, _utils.isDefined)(viewUniversalIdentifier)) {
                continue;
            }
            const viewFieldGroupId = findLastViewFieldGroupId({
                viewId,
                flatViewFieldGroupMaps
            });
            const viewFieldGroupUniversalIdentifier = (0, _utils.isDefined)(viewFieldGroupId) ? flatViewFieldGroupMaps.universalIdentifierById[viewFieldGroupId] ?? null : null;
            const positionKey = `${viewId}:${viewFieldGroupId ?? 'null'}`;
            if (!nextPositionByKey.has(positionKey)) {
                nextPositionByKey.set(positionKey, computeNextPosition({
                    viewId,
                    viewFieldGroupId,
                    flatViewFieldMaps
                }));
            }
            for (const field of fieldsForObject){
                const position = nextPositionByKey.get(positionKey);
                nextPositionByKey.set(positionKey, position + 1);
                flatViewFieldsToCreate.push({
                    universalIdentifier: (0, _uuid.v4)(),
                    applicationUniversalIdentifier,
                    fieldMetadataUniversalIdentifier: field.fieldMetadataUniversalIdentifier,
                    viewUniversalIdentifier,
                    viewFieldGroupUniversalIdentifier,
                    isVisible,
                    size: _defaultviewfieldsizeconstant.DEFAULT_VIEW_FIELD_SIZE,
                    position,
                    aggregateOperation: null,
                    isActive: true,
                    universalOverrides: null,
                    createdAt: now,
                    updatedAt: now,
                    deletedAt: null
                });
            }
        }
    }
    return flatViewFieldsToCreate;
};

//# sourceMappingURL=compute-flat-view-fields-from-fields-widgets.util.js.map
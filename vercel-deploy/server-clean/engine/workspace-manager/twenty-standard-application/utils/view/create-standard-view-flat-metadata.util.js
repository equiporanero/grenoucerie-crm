"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createStandardViewFlatMetadata", {
    enumerable: true,
    get: function() {
        return createStandardViewFlatMetadata;
    }
});
const _classvalidator = require("class-validator");
const _metadata = require("twenty-shared/metadata");
const _types = require("twenty-shared/types");
const _twentystandardapplications = require("../../constants/twenty-standard-applications");
const createStandardViewFlatMetadata = ({ workspaceId, objectName, context: { viewName, name, type, key, position, icon, isCompact = false, isCustom = false, openRecordIn = _types.ViewOpenRecordIn.SIDE_PANEL, kanbanAggregateOperation = null, kanbanAggregateOperationFieldName, mainGroupByFieldName, calendarFieldName }, standardObjectMetadataRelatedEntityIds, twentyStandardApplicationId, now })=>{
    // @ts-expect-error ignore
    const viewDefinition = _metadata.STANDARD_OBJECTS[objectName].views[viewName];
    if (!(0, _classvalidator.isDefined)(viewDefinition)) {
        throw new Error(`Invalid configuration ${objectName} ${viewName.toString}`);
    }
    const objectMetadataId = standardObjectMetadataRelatedEntityIds[objectName].id;
    const objectMetadataUniversalIdentifier = _metadata.STANDARD_OBJECTS[objectName].universalIdentifier;
    const kanbanAggregateOperationFieldMetadataId = kanbanAggregateOperationFieldName ? standardObjectMetadataRelatedEntityIds[objectName].fields[kanbanAggregateOperationFieldName].id : null;
    const mainGroupByFieldMetadataId = mainGroupByFieldName ? standardObjectMetadataRelatedEntityIds[objectName].fields[mainGroupByFieldName].id : null;
    const calendarFieldMetadataId = calendarFieldName ? standardObjectMetadataRelatedEntityIds[objectName].fields[calendarFieldName].id : null;
    const kanbanAggregateOperationFieldMetadataUniversalIdentifier = kanbanAggregateOperationFieldName ? _metadata.STANDARD_OBJECTS[objectName].fields[kanbanAggregateOperationFieldName].universalIdentifier : null;
    const mainGroupByFieldMetadataUniversalIdentifier = mainGroupByFieldName ? _metadata.STANDARD_OBJECTS[objectName].fields[mainGroupByFieldName].universalIdentifier : null;
    const calendarFieldMetadataUniversalIdentifier = calendarFieldName ? _metadata.STANDARD_OBJECTS[objectName].fields[calendarFieldName].universalIdentifier : null;
    return {
        calendarFieldMetadataUniversalIdentifier,
        kanbanAggregateOperationFieldMetadataUniversalIdentifier,
        mainGroupByFieldMetadataUniversalIdentifier,
        objectMetadataUniversalIdentifier,
        id: standardObjectMetadataRelatedEntityIds[objectName].views[viewName].id,
        universalIdentifier: viewDefinition.universalIdentifier,
        applicationId: twentyStandardApplicationId,
        applicationUniversalIdentifier: _twentystandardapplications.TWENTY_STANDARD_APPLICATION.universalIdentifier,
        workspaceId,
        objectMetadataId,
        name,
        type,
        key,
        icon,
        position,
        isCompact,
        isCustom,
        openRecordIn,
        kanbanAggregateOperation,
        kanbanAggregateOperationFieldMetadataId,
        mainGroupByFieldMetadataId,
        shouldHideEmptyGroups: false,
        calendarLayout: null,
        calendarFieldMetadataId,
        anyFieldFilterValue: null,
        visibility: _types.ViewVisibility.WORKSPACE,
        createdByUserWorkspaceId: null,
        viewFieldIds: [],
        viewFieldUniversalIdentifiers: [],
        viewFieldGroupIds: [],
        viewFieldGroupUniversalIdentifiers: [],
        viewFilterIds: [],
        viewFilterUniversalIdentifiers: [],
        viewGroupIds: [],
        viewGroupUniversalIdentifiers: [],
        viewFilterGroupIds: [],
        viewFilterGroupUniversalIdentifiers: [],
        viewSortIds: [],
        viewSortUniversalIdentifiers: [],
        createdAt: now,
        updatedAt: now,
        deletedAt: null
    };
};

//# sourceMappingURL=create-standard-view-flat-metadata.util.js.map
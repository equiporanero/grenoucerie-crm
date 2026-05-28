"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createStandardFieldFlatMetadata", {
    enumerable: true,
    get: function() {
        return createStandardFieldFlatMetadata;
    }
});
const _metadata = require("twenty-shared/metadata");
const createStandardFieldFlatMetadata = ({ objectName, workspaceId, context: { fieldName, type, label, description, icon, isSystem = false, isNullable = true, isUnique = false, isUIReadOnly = false, defaultValue, settings, options: fieldOptions = null }, standardObjectMetadataRelatedEntityIds, twentyStandardApplicationId, now })=>{
    const objectFields = _metadata.STANDARD_OBJECTS[objectName].fields;
    const fieldDefinition = objectFields[fieldName];
    const fieldIds = standardObjectMetadataRelatedEntityIds[objectName].fields;
    const name = fieldName.toString();
    return {
        id: fieldIds[fieldName].id,
        universalIdentifier: fieldDefinition.universalIdentifier,
        applicationId: twentyStandardApplicationId,
        workspaceId,
        objectMetadataId: standardObjectMetadataRelatedEntityIds[objectName].id,
        type,
        name,
        label,
        description,
        icon,
        isCustom: false,
        isActive: true,
        isSystem,
        isNullable,
        isUnique,
        isUIReadOnly,
        isLabelSyncedWithName: false,
        standardOverrides: null,
        defaultValue: defaultValue ?? null,
        settings: settings ?? null,
        options: fieldOptions ?? null,
        relationTargetFieldMetadataId: null,
        relationTargetObjectMetadataId: null,
        morphId: null,
        viewFieldIds: [],
        viewFilterIds: [],
        fieldPermissionIds: [],
        kanbanAggregateOperationViewIds: [],
        calendarViewIds: [],
        mainGroupByFieldMetadataViewIds: [],
        createdAt: now,
        updatedAt: now,
        applicationUniversalIdentifier: twentyStandardApplicationId,
        objectMetadataUniversalIdentifier: _metadata.STANDARD_OBJECTS[objectName].universalIdentifier,
        relationTargetObjectMetadataUniversalIdentifier: null,
        relationTargetFieldMetadataUniversalIdentifier: null,
        viewFilterUniversalIdentifiers: [],
        viewFieldUniversalIdentifiers: [],
        fieldPermissionUniversalIdentifiers: [],
        kanbanAggregateOperationViewUniversalIdentifiers: [],
        calendarViewUniversalIdentifiers: [],
        mainGroupByFieldMetadataViewUniversalIdentifiers: [],
        viewSortIds: [],
        viewSortUniversalIdentifiers: [],
        universalSettings: settings ?? null
    };
};

//# sourceMappingURL=create-standard-field-flat-metadata.util.js.map
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createStandardRelationFieldFlatMetadata", {
    enumerable: true,
    get: function() {
        return createStandardRelationFieldFlatMetadata;
    }
});
const _metadata = require("twenty-shared/metadata");
const createStandardRelationFieldFlatMetadata = ({ objectName, workspaceId, context: { fieldName, label, description, icon, targetObjectName, targetFieldName, isNullable = true, isUIReadOnly = false, defaultValue = null, settings, options: fieldOptions = null, morphId, type }, standardObjectMetadataRelatedEntityIds, twentyStandardApplicationId, now })=>{
    const objectFields = _metadata.STANDARD_OBJECTS[objectName].fields;
    const fieldDefinition = objectFields[fieldName];
    const fieldIds = standardObjectMetadataRelatedEntityIds[objectName].fields;
    const targetFieldIds = standardObjectMetadataRelatedEntityIds[targetObjectName].fields;
    const targetObjectFields = _metadata.STANDARD_OBJECTS[targetObjectName].fields;
    const targetFieldDefinition = targetObjectFields[targetFieldName];
    return {
        id: fieldIds[fieldName].id,
        universalIdentifier: fieldDefinition.universalIdentifier,
        applicationId: twentyStandardApplicationId,
        workspaceId,
        objectMetadataId: standardObjectMetadataRelatedEntityIds[objectName].id,
        type,
        name: fieldName.toString(),
        label,
        description,
        icon,
        isCustom: false,
        isActive: true,
        isSystem: false,
        isNullable,
        isUnique: false,
        isUIReadOnly,
        isLabelSyncedWithName: false,
        standardOverrides: null,
        defaultValue,
        settings,
        options: fieldOptions,
        relationTargetFieldMetadataId: targetFieldIds[targetFieldName].id,
        relationTargetObjectMetadataId: standardObjectMetadataRelatedEntityIds[targetObjectName].id,
        morphId,
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
        relationTargetObjectMetadataUniversalIdentifier: _metadata.STANDARD_OBJECTS[targetObjectName].universalIdentifier,
        relationTargetFieldMetadataUniversalIdentifier: targetFieldDefinition.universalIdentifier,
        viewFilterUniversalIdentifiers: [],
        viewFieldUniversalIdentifiers: [],
        fieldPermissionUniversalIdentifiers: [],
        kanbanAggregateOperationViewUniversalIdentifiers: [],
        calendarViewUniversalIdentifiers: [],
        mainGroupByFieldMetadataViewUniversalIdentifiers: [],
        viewSortIds: [],
        viewSortUniversalIdentifiers: [],
        universalSettings: settings
    };
};

//# sourceMappingURL=create-standard-relation-field-flat-metadata.util.js.map
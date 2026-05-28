"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromFlatFieldMetadataToFieldMetadataDto", {
    enumerable: true,
    get: function() {
        return fromFlatFieldMetadataToFieldMetadataDto;
    }
});
const fromFlatFieldMetadataToFieldMetadataDto = (flatFieldMetadata)=>{
    const { createdAt, updatedAt, description, icon, standardOverrides, isNullable, isUnique, settings, id, universalIdentifier, label, name, objectMetadataId, type, workspaceId, defaultValue, isActive, isCustom, isLabelSyncedWithName, isSystem, isUIReadOnly, options, morphId, applicationId } = flatFieldMetadata;
    return {
        id,
        universalIdentifier,
        label,
        name,
        objectMetadataId,
        type,
        workspaceId,
        defaultValue,
        isActive,
        isCustom,
        isLabelSyncedWithName,
        isSystem,
        isUIReadOnly,
        options,
        createdAt: new Date(createdAt),
        updatedAt: new Date(updatedAt),
        description: description ?? undefined,
        icon: icon ?? undefined,
        standardOverrides: standardOverrides ?? undefined,
        isNullable: isNullable ?? false,
        isUnique: isUnique ?? false,
        settings: settings ?? undefined,
        morphId: morphId ?? undefined,
        applicationId: applicationId ?? undefined
    };
};

//# sourceMappingURL=from-flat-field-metadata-to-field-metadata-dto.util.js.map
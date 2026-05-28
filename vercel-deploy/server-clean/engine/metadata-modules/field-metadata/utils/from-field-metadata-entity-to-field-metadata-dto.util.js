"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromFieldMetadataEntityToFieldMetadataDto", {
    enumerable: true,
    get: function() {
        return fromFieldMetadataEntityToFieldMetadataDto;
    }
});
const fromFieldMetadataEntityToFieldMetadataDto = (entity, uniqueFieldMetadataIds)=>({
        id: entity.id,
        universalIdentifier: entity.universalIdentifier,
        applicationId: entity.applicationId,
        type: entity.type,
        name: entity.name,
        label: entity.label,
        description: entity.description ?? undefined,
        icon: entity.icon ?? undefined,
        standardOverrides: entity.standardOverrides ?? undefined,
        isCustom: entity.isCustom,
        isActive: entity.isActive,
        isSystem: entity.isSystem,
        isUIReadOnly: entity.isUIReadOnly,
        isNullable: entity.isNullable ?? false,
        isUnique: uniqueFieldMetadataIds?.has(entity.id) ?? false,
        defaultValue: entity.defaultValue ?? undefined,
        options: entity.options ?? undefined,
        settings: entity.settings ?? undefined,
        workspaceId: entity.workspaceId,
        objectMetadataId: entity.objectMetadataId,
        isLabelSyncedWithName: entity.isLabelSyncedWithName,
        morphId: entity.morphId ?? undefined,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt
    });

//# sourceMappingURL=from-field-metadata-entity-to-field-metadata-dto.util.js.map
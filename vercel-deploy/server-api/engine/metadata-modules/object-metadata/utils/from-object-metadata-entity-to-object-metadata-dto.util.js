"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromObjectMetadataEntityToObjectMetadataDto", {
    enumerable: true,
    get: function() {
        return fromObjectMetadataEntityToObjectMetadataDto;
    }
});
const fromObjectMetadataEntityToObjectMetadataDto = (entity)=>({
        id: entity.id,
        universalIdentifier: entity.universalIdentifier,
        applicationId: entity.applicationId,
        nameSingular: entity.nameSingular,
        namePlural: entity.namePlural,
        labelSingular: entity.labelSingular,
        labelPlural: entity.labelPlural,
        description: entity.description ?? undefined,
        icon: entity.icon ?? undefined,
        color: entity.color ?? undefined,
        shortcut: entity.shortcut ?? undefined,
        standardOverrides: entity.standardOverrides ?? undefined,
        isCustom: entity.isCustom,
        isRemote: entity.isRemote,
        isActive: entity.isActive,
        isSystem: entity.isSystem,
        isUIReadOnly: entity.isUIReadOnly,
        isSearchable: entity.isSearchable,
        isLabelSyncedWithName: entity.isLabelSyncedWithName,
        workspaceId: entity.workspaceId,
        labelIdentifierFieldMetadataId: entity.labelIdentifierFieldMetadataId ?? undefined,
        imageIdentifierFieldMetadataId: entity.imageIdentifierFieldMetadataId ?? undefined,
        duplicateCriteria: entity.duplicateCriteria ?? undefined,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt
    });

//# sourceMappingURL=from-object-metadata-entity-to-object-metadata-dto.util.js.map
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromFlatObjectMetadataToObjectMetadataDto", {
    enumerable: true,
    get: function() {
        return fromFlatObjectMetadataToObjectMetadataDto;
    }
});
const fromFlatObjectMetadataToObjectMetadataDto = (flatObjectMetadata)=>{
    const { createdAt, updatedAt, color, description, icon, standardOverrides, shortcut, duplicateCriteria, id, universalIdentifier, isActive, isCustom, isLabelSyncedWithName, isRemote, isSearchable, isSystem, isUIReadOnly, labelPlural, labelSingular, namePlural, nameSingular, workspaceId, imageIdentifierFieldMetadataId, labelIdentifierFieldMetadataId, applicationId } = flatObjectMetadata;
    return {
        id,
        universalIdentifier,
        isActive,
        isCustom,
        isLabelSyncedWithName,
        isRemote,
        isSearchable,
        isSystem,
        isUIReadOnly,
        labelPlural,
        labelSingular,
        namePlural,
        nameSingular,
        workspaceId,
        imageIdentifierFieldMetadataId,
        labelIdentifierFieldMetadataId,
        createdAt: new Date(createdAt),
        updatedAt: new Date(updatedAt),
        color: color ?? undefined,
        description: description ?? undefined,
        icon: icon ?? undefined,
        standardOverrides: standardOverrides ?? undefined,
        shortcut: shortcut ?? undefined,
        duplicateCriteria: duplicateCriteria ?? undefined,
        applicationId
    };
};

//# sourceMappingURL=from-flat-object-metadata-to-object-metadata-dto.util.js.map
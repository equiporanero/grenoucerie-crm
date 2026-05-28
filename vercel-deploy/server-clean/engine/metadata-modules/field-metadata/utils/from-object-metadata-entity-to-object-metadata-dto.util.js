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
const fromObjectMetadataEntityToObjectMetadataDto = (objectMetadataEntity)=>{
    const { createdAt, updatedAt, description, icon, color, standardOverrides, shortcut, duplicateCriteria, applicationId, ...rest } = objectMetadataEntity;
    return {
        ...rest,
        createdAt: new Date(createdAt),
        updatedAt: new Date(updatedAt),
        description: description ?? undefined,
        icon: icon ?? undefined,
        color: color ?? undefined,
        standardOverrides: standardOverrides ?? undefined,
        shortcut: shortcut ?? undefined,
        duplicateCriteria: duplicateCriteria ?? undefined,
        applicationId: applicationId ?? undefined
    };
};

//# sourceMappingURL=from-object-metadata-entity-to-object-metadata-dto.util.js.map
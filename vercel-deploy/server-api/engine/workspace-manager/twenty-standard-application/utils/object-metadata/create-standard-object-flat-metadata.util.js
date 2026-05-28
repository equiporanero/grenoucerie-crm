"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createStandardObjectFlatMetadata", {
    enumerable: true,
    get: function() {
        return createStandardObjectFlatMetadata;
    }
});
const _metadata = require("twenty-shared/metadata");
const createStandardObjectFlatMetadata = ({ context: { universalIdentifier, nameSingular, namePlural, labelSingular, labelPlural, description, icon, isSystem = false, isSearchable = false, isAuditLogged = true, isUIReadOnly = false, shortcut = null, duplicateCriteria = null, labelIdentifierFieldMetadataName, imageIdentifierFieldMetadataName }, workspaceId, standardObjectMetadataRelatedEntityIds, twentyStandardApplicationId, now })=>{
    const labelIdentifierFieldMetadataUniversalIdentifier = // @ts-expect-error ignore
    _metadata.STANDARD_OBJECTS[nameSingular].fields[labelIdentifierFieldMetadataName].universalIdentifier;
    const imageIdentifierFieldMetadataUniversalIdentifier = imageIdentifierFieldMetadataName ? _metadata.STANDARD_OBJECTS[nameSingular].fields[imageIdentifierFieldMetadataName].universalIdentifier : null;
    return {
        universalIdentifier,
        applicationId: twentyStandardApplicationId,
        workspaceId,
        nameSingular,
        namePlural,
        labelSingular,
        labelPlural,
        color: null,
        description,
        icon,
        isCustom: false,
        isRemote: false,
        isActive: true,
        isSystem,
        isSearchable,
        isAuditLogged,
        isUIReadOnly,
        isLabelSyncedWithName: false,
        standardOverrides: null,
        duplicateCriteria,
        shortcut,
        labelIdentifierFieldMetadataId: standardObjectMetadataRelatedEntityIds[nameSingular].fields[labelIdentifierFieldMetadataName].id,
        imageIdentifierFieldMetadataId: imageIdentifierFieldMetadataName ? standardObjectMetadataRelatedEntityIds[nameSingular].fields[imageIdentifierFieldMetadataName].id : null,
        targetTableName: 'DEPRECATED',
        fieldIds: [],
        indexMetadataIds: [],
        objectPermissionIds: [],
        fieldPermissionIds: [],
        viewIds: [],
        createdAt: now,
        updatedAt: now,
        id: standardObjectMetadataRelatedEntityIds[nameSingular].id,
        applicationUniversalIdentifier: twentyStandardApplicationId,
        fieldUniversalIdentifiers: [],
        objectPermissionUniversalIdentifiers: [],
        fieldPermissionUniversalIdentifiers: [],
        viewUniversalIdentifiers: [],
        indexMetadataUniversalIdentifiers: [],
        labelIdentifierFieldMetadataUniversalIdentifier,
        imageIdentifierFieldMetadataUniversalIdentifier
    };
};

//# sourceMappingURL=create-standard-object-flat-metadata.util.js.map
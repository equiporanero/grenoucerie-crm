"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromObjectManifestToUniversalFlatObjectMetadata", {
    enumerable: true,
    get: function() {
        return fromObjectManifestToUniversalFlatObjectMetadata;
    }
});
const fromObjectManifestToUniversalFlatObjectMetadata = ({ objectManifest, applicationUniversalIdentifier, now })=>{
    return {
        universalIdentifier: objectManifest.universalIdentifier,
        applicationUniversalIdentifier,
        nameSingular: objectManifest.nameSingular,
        namePlural: objectManifest.namePlural,
        labelSingular: objectManifest.labelSingular,
        labelPlural: objectManifest.labelPlural,
        color: null,
        description: objectManifest.description ?? null,
        icon: objectManifest.icon ?? null,
        standardOverrides: null,
        targetTableName: 'DEPRECATED',
        isCustom: true,
        isRemote: false,
        isActive: true,
        isSystem: false,
        isUIReadOnly: false,
        isAuditLogged: true,
        isSearchable: objectManifest.isSearchable ?? true,
        duplicateCriteria: null,
        shortcut: null,
        isLabelSyncedWithName: false,
        fieldUniversalIdentifiers: [],
        indexMetadataUniversalIdentifiers: [],
        objectPermissionUniversalIdentifiers: [],
        fieldPermissionUniversalIdentifiers: [],
        viewUniversalIdentifiers: [],
        labelIdentifierFieldMetadataUniversalIdentifier: objectManifest.labelIdentifierFieldMetadataUniversalIdentifier,
        imageIdentifierFieldMetadataUniversalIdentifier: null,
        createdAt: now,
        updatedAt: now
    };
};

//# sourceMappingURL=from-object-manifest-to-universal-flat-object-metadata.util.js.map
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromCreateObjectInputToFlatObjectMetadataAndFlatFieldMetadatasToCreate", {
    enumerable: true,
    get: function() {
        return fromCreateObjectInputToFlatObjectMetadataAndFlatFieldMetadatasToCreate;
    }
});
const _utils = require("twenty-shared/utils");
const _uuid = require("uuid");
const _builddefaultflatfieldmetadatasforcustomobjectutil = require("../../object-metadata/utils/build-default-flat-field-metadatas-for-custom-object.util");
const _builddefaultindexforcustomobjectutil = require("../../object-metadata/utils/build-default-index-for-custom-object.util");
const _builddefaultrelationflatfieldmetadatasforcustomobjectutil = require("../../object-metadata/utils/build-default-relation-flat-field-metadatas-for-custom-object.util");
const fromCreateObjectInputToFlatObjectMetadataAndFlatFieldMetadatasToCreate = ({ createObjectInput: rawCreateObjectInput, flatApplication, flatObjectMetadataMaps: existingFlatObjectMetadataMaps })=>{
    const createObjectInput = (0, _utils.trimAndRemoveDuplicatedWhitespacesFromObjectStringProperties)(rawCreateObjectInput, [
        'description',
        'icon',
        'labelPlural',
        'labelSingular',
        'namePlural',
        'nameSingular',
        'shortcut'
    ]);
    const objectMetadataId = (0, _uuid.v4)();
    const universalIdentifier = createObjectInput.universalIdentifier ?? (0, _uuid.v4)();
    const defaultFlatFieldForCustomObjectMaps = (0, _builddefaultflatfieldmetadatasforcustomobjectutil.buildDefaultFlatFieldMetadatasForCustomObject)({
        flatObjectMetadata: {
            applicationUniversalIdentifier: flatApplication.universalIdentifier,
            universalIdentifier
        },
        skipNameField: createObjectInput.skipNameField
    });
    const createdAt = new Date().toISOString();
    // Use nameField.id if it exists, otherwise use idField.id (for junction tables without name)
    const nameField = defaultFlatFieldForCustomObjectMaps.fields.nameField;
    const labelIdentifierFieldMetadataUniversalIdentifier = nameField?.universalIdentifier ?? defaultFlatFieldForCustomObjectMaps.fields.id.universalIdentifier;
    const universalFlatObjectMetadataToCreate = {
        id: objectMetadataId,
        universalIdentifier,
        createdAt,
        updatedAt: createdAt,
        duplicateCriteria: null,
        color: createObjectInput.color ?? null,
        description: createObjectInput.description ?? null,
        icon: createObjectInput.icon ?? null,
        isActive: true,
        isAuditLogged: true,
        isCustom: true,
        isLabelSyncedWithName: createObjectInput.isLabelSyncedWithName ?? false,
        isRemote: createObjectInput.isRemote ?? false,
        isSearchable: true,
        isUIReadOnly: false,
        isSystem: false,
        labelPlural: (0, _utils.capitalize)(createObjectInput.labelPlural),
        labelSingular: (0, _utils.capitalize)(createObjectInput.labelSingular),
        namePlural: createObjectInput.namePlural,
        nameSingular: createObjectInput.nameSingular,
        shortcut: createObjectInput.shortcut ?? null,
        standardOverrides: null,
        targetTableName: 'DEPRECATED',
        applicationUniversalIdentifier: flatApplication.universalIdentifier,
        fieldUniversalIdentifiers: [],
        objectPermissionUniversalIdentifiers: [],
        fieldPermissionUniversalIdentifiers: [],
        viewUniversalIdentifiers: [],
        indexMetadataUniversalIdentifiers: [],
        labelIdentifierFieldMetadataUniversalIdentifier,
        imageIdentifierFieldMetadataUniversalIdentifier: null
    };
    const { standardSourceFlatFieldMetadatas, standardTargetFlatFieldMetadatas, standardTargetFlatIndexMetadatas } = (0, _builddefaultrelationflatfieldmetadatasforcustomobjectutil.buildDefaultRelationFlatFieldMetadatasForCustomObject)({
        existingFlatObjectMetadataMaps,
        sourceFlatObjectMetadata: universalFlatObjectMetadataToCreate,
        flatApplication
    });
    const objectFlatFieldMetadatas = [
        ...Object.values(defaultFlatFieldForCustomObjectMaps.fields),
        ...standardSourceFlatFieldMetadatas
    ];
    const defaultIndexesForCustomObject = (0, _builddefaultindexforcustomobjectutil.buildDefaultIndexesForCustomObject)({
        objectFlatFieldMetadatas,
        defaultFlatFieldForCustomObjectMaps,
        flatObjectMetadata: universalFlatObjectMetadataToCreate
    });
    return {
        flatObjectMetadataToCreate: universalFlatObjectMetadataToCreate,
        flatIndexMetadataToCreate: [
            ...Object.values(defaultIndexesForCustomObject.indexes),
            ...standardTargetFlatIndexMetadatas
        ],
        relationTargetFlatFieldMetadataToCreate: standardTargetFlatFieldMetadatas,
        flatFieldMetadataToCreateOnObject: objectFlatFieldMetadatas
    };
};

//# sourceMappingURL=from-create-object-input-to-flat-object-metadata-and-flat-field-metadatas-to-create.util.js.map
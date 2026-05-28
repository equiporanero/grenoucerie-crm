"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get getFlatObjectMetadataMock () {
        return getFlatObjectMetadataMock;
    },
    get getStandardFlatObjectMetadataMock () {
        return getStandardFlatObjectMetadataMock;
    }
});
const _faker = require("@faker-js/faker");
const getFlatObjectMetadataMock = (overrides)=>{
    const createdAt = '2024-01-01T00:00:00.000Z';
    const applicationId = overrides.applicationId ?? _faker.faker.string.uuid();
    const labelIdentifierFieldMetadataId = overrides.labelIdentifierFieldMetadataId ?? _faker.faker.string.uuid();
    const imageIdentifierFieldMetadataId = overrides.imageIdentifierFieldMetadataId ?? _faker.faker.string.uuid();
    return {
        viewIds: [],
        indexMetadataIds: [],
        objectPermissionIds: [],
        fieldPermissionIds: [],
        fieldIds: [],
        description: 'default flat object metadata description',
        icon: 'icon',
        color: null,
        id: _faker.faker.string.uuid(),
        imageIdentifierFieldMetadataId,
        isActive: true,
        isAuditLogged: true,
        isCustom: true,
        isLabelSyncedWithName: false,
        isRemote: false,
        isSearchable: true,
        isSystem: false,
        isUIReadOnly: false,
        labelIdentifierFieldMetadataId,
        labelPlural: 'default flat object metadata label plural',
        labelSingular: 'default flat object metadata label singular',
        namePlural: 'defaultflatObjectMetadataNamePlural',
        nameSingular: 'defaultflatObjectMetadataNameSingular',
        shortcut: 'shortcut',
        applicationId,
        standardOverrides: null,
        targetTableName: '',
        workspaceId: _faker.faker.string.uuid(),
        createdAt,
        updatedAt: createdAt,
        duplicateCriteria: null,
        applicationUniversalIdentifier: applicationId,
        fieldUniversalIdentifiers: [],
        objectPermissionUniversalIdentifiers: [],
        fieldPermissionUniversalIdentifiers: [],
        viewUniversalIdentifiers: [],
        indexMetadataUniversalIdentifiers: [],
        labelIdentifierFieldMetadataUniversalIdentifier: labelIdentifierFieldMetadataId,
        imageIdentifierFieldMetadataUniversalIdentifier: imageIdentifierFieldMetadataId,
        ...overrides
    };
};
const getStandardFlatObjectMetadataMock = (overrides)=>{
    return getFlatObjectMetadataMock({
        standardOverrides: {},
        isCustom: false,
        isSystem: true,
        ...overrides
    });
};

//# sourceMappingURL=get-flat-object-metadata.mock.js.map
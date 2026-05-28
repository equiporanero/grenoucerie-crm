"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getMockObjectMetadataEntity", {
    enumerable: true,
    get: function() {
        return getMockObjectMetadataEntity;
    }
});
const _faker = require("@faker-js/faker");
const getMockObjectMetadataEntity = (overrides)=>{
    return {
        workspace: {},
        createdAt: new Date(),
        updatedAt: new Date(),
        dataSourceId: _faker.faker.string.uuid(),
        description: 'default object metadata description',
        duplicateCriteria: [],
        fieldPermissions: [],
        fields: [],
        icon: null,
        color: null,
        imageIdentifierFieldMetadataId: null,
        labelIdentifierFieldMetadataId: null,
        indexMetadatas: [],
        isActive: true,
        isAuditLogged: true,
        isCustom: true,
        isLabelSyncedWithName: false,
        isRemote: false,
        isSearchable: true,
        isSystem: false,
        isUIReadOnly: false,
        labelPlural: 'Default mock plural label',
        labelSingular: 'Default mock plural singular',
        objectPermissions: [],
        shortcut: null,
        universalIdentifier: _faker.faker.string.uuid(),
        applicationId: _faker.faker.string.uuid(),
        application: {},
        standardOverrides: null,
        targetTableName: _faker.faker.string.uuid(),
        views: [],
        ...overrides
    };
};

//# sourceMappingURL=get-object-metadata-entity.mock.js.map
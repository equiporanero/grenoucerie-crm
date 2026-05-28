"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getMockFieldMetadataEntity", {
    enumerable: true,
    get: function() {
        return getMockFieldMetadataEntity;
    }
});
const _faker = require("@faker-js/faker");
const getMockFieldMetadataEntity = (overrides)=>{
    return {
        workspace: {},
        calendarViews: [],
        mainGroupByFieldMetadataViews: [],
        viewFilters: [],
        viewFields: [],
        kanbanAggregateOperationViews: [],
        viewSorts: [],
        morphId: null,
        fieldPermissions: [],
        icon: null,
        indexFieldMetadatas: [],
        isCustom: true,
        isLabelSyncedWithName: false,
        isNullable: null,
        isUIReadOnly: false,
        isSystem: false,
        isUnique: null,
        object: {},
        relationTargetFieldMetadata: null,
        relationTargetFieldMetadataId: null,
        relationTargetObjectMetadata: null,
        relationTargetObjectMetadataId: null,
        standardOverrides: null,
        id: _faker.faker.string.uuid(),
        name: 'defaultFieldMetadataName',
        label: 'Default field metadata entity label',
        description: 'Default field metadata entity description',
        defaultValue: null,
        options: null,
        settings: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
        application: {},
        applicationId: _faker.faker.string.uuid(),
        universalIdentifier: _faker.faker.string.uuid(),
        ...overrides
    };
};

//# sourceMappingURL=get-field-metadata-entity.mock.js.map
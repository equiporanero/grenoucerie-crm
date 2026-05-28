"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getRelationTargetFlatFieldMetadataMock", {
    enumerable: true,
    get: function() {
        return getRelationTargetFlatFieldMetadataMock;
    }
});
const _faker = require("@faker-js/faker");
const getRelationTargetFlatFieldMetadataMock = ({ objectMetadataId, settings, type, universalIdentifier, relationTargetFieldMetadataId, relationTargetObjectMetadataId, ...overrides })=>{
    const createdAt = '2024-01-01T00:00:00.000Z';
    return {
        calendarViewIds: [],
        mainGroupByFieldMetadataViewIds: [],
        viewFilterIds: [],
        viewFieldIds: [],
        kanbanAggregateOperationViewIds: [],
        fieldPermissionIds: [],
        fieldPermissionUniversalIdentifiers: [],
        createdAt,
        updatedAt: createdAt,
        description: 'default flat field metadata description',
        icon: 'icon',
        id: _faker.faker.string.uuid(),
        isActive: true,
        isCustom: true,
        name: 'flatFieldMetadataName',
        label: 'flat field metadata label',
        isNullable: true,
        isUnique: false,
        isUIReadOnly: false,
        isLabelSyncedWithName: false,
        isSystem: false,
        standardOverrides: null,
        workspaceId: _faker.faker.string.uuid(),
        objectMetadataId,
        type,
        universalIdentifier,
        settings,
        relationTargetFieldMetadataId,
        relationTargetObjectMetadataId,
        morphId: null,
        ...overrides,
        defaultValue: null,
        options: null,
        applicationId: _faker.faker.string.uuid(),
        applicationUniversalIdentifier: _faker.faker.string.uuid(),
        objectMetadataUniversalIdentifier: _faker.faker.string.uuid(),
        relationTargetObjectMetadataUniversalIdentifier: _faker.faker.string.uuid(),
        relationTargetFieldMetadataUniversalIdentifier: _faker.faker.string.uuid(),
        viewFilterUniversalIdentifiers: [],
        viewFieldUniversalIdentifiers: [],
        kanbanAggregateOperationViewUniversalIdentifiers: [],
        calendarViewUniversalIdentifiers: [],
        mainGroupByFieldMetadataViewUniversalIdentifiers: [],
        viewSortIds: [],
        viewSortUniversalIdentifiers: [],
        universalSettings: settings
    };
};

//# sourceMappingURL=get-morph-or-relation-target-flat-field-metadata-mock.js.map
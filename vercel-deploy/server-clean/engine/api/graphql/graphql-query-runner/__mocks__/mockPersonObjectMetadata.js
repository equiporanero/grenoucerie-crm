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
    get mockPersonFlatFieldMetadataMaps () {
        return mockPersonFlatFieldMetadataMaps;
    },
    get mockPersonFlatObjectMetadata () {
        return mockPersonFlatObjectMetadata;
    },
    get mockPersonFlatObjectMetadataMaps () {
        return mockPersonFlatObjectMetadataMaps;
    }
});
const _types = require("twenty-shared/types");
const workspaceId = '20202020-1c25-4d02-bf25-6aeccf7ea419';
const objectMetadataId = 'person-object-id';
const mockFieldMetadatas = [
    {
        id: 'name-id',
        type: _types.FieldMetadataType.FULL_NAME,
        name: 'name',
        label: 'Name',
        defaultValue: {
            lastName: "''",
            firstName: "''"
        },
        objectMetadataId,
        isNullable: true,
        isLabelSyncedWithName: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        universalIdentifier: 'name-id',
        viewFieldIds: [],
        viewFilterIds: [],
        kanbanAggregateOperationViewIds: [],
        calendarViewIds: [],
        applicationId: null
    },
    {
        id: 'emails-id',
        type: _types.FieldMetadataType.EMAILS,
        name: 'emails',
        label: 'Emails',
        defaultValue: {
            primaryEmail: "''",
            additionalEmails: null
        },
        objectMetadataId,
        isNullable: true,
        isLabelSyncedWithName: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        universalIdentifier: 'emails-id',
        viewFieldIds: [],
        viewFilterIds: [],
        kanbanAggregateOperationViewIds: [],
        calendarViewIds: [],
        applicationId: null
    },
    {
        id: 'linkedinLink-id',
        type: _types.FieldMetadataType.LINKS,
        name: 'linkedinLink',
        label: 'Linkedin',
        defaultValue: {
            primaryLinkUrl: "''",
            secondaryLinks: [],
            primaryLinkLabel: "''"
        },
        objectMetadataId,
        isNullable: true,
        isLabelSyncedWithName: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        universalIdentifier: 'linkedinLink-id',
        viewFieldIds: [],
        viewFilterIds: [],
        kanbanAggregateOperationViewIds: [],
        calendarViewIds: [],
        applicationId: null
    },
    {
        id: 'jobTitle-id',
        type: _types.FieldMetadataType.TEXT,
        name: 'jobTitle',
        label: 'Job Title',
        defaultValue: "''",
        objectMetadataId,
        isNullable: false,
        isLabelSyncedWithName: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        universalIdentifier: 'jobTitle-id',
        viewFieldIds: [],
        viewFilterIds: [],
        kanbanAggregateOperationViewIds: [],
        calendarViewIds: [],
        applicationId: null
    }
];
const mockPersonFlatFieldMetadataMaps = ()=>({
        byUniversalIdentifier: mockFieldMetadatas.reduce((acc, field)=>{
            acc[field.universalIdentifier] = field;
            return acc;
        }, {}),
        universalIdentifierById: mockFieldMetadatas.reduce((acc, field)=>{
            acc[field.id] = field.universalIdentifier;
            return acc;
        }, {}),
        universalIdentifiersByApplicationId: {}
    });
const mockPersonFlatObjectMetadataMaps = (duplicateCriteria)=>{
    const flatObjectMetadata = mockPersonFlatObjectMetadata(duplicateCriteria);
    return {
        byUniversalIdentifier: {
            [flatObjectMetadata.universalIdentifier]: flatObjectMetadata
        },
        universalIdentifierById: {
            [flatObjectMetadata.id]: flatObjectMetadata.universalIdentifier
        },
        universalIdentifiersByApplicationId: {}
    };
};
const mockPersonFlatObjectMetadata = (duplicateCriteria)=>({
        id: objectMetadataId,
        icon: 'Icon123',
        color: null,
        nameSingular: 'person',
        namePlural: 'people',
        labelSingular: 'Person',
        labelPlural: 'People',
        targetTableName: 'person',
        isCustom: false,
        isRemote: false,
        isActive: true,
        isSystem: false,
        isAuditLogged: true,
        isSearchable: true,
        duplicateCriteria: duplicateCriteria,
        labelIdentifierFieldMetadataId: '',
        imageIdentifierFieldMetadataId: '',
        workspaceId,
        universalIdentifier: objectMetadataId,
        indexMetadataIds: [],
        objectPermissionIds: [],
        fieldPermissionIds: [],
        fieldIds: mockFieldMetadatas.map((field)=>field.id),
        viewIds: [],
        applicationId: 'test-application-id',
        isLabelSyncedWithName: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        shortcut: null,
        description: null,
        standardOverrides: null,
        isUIReadOnly: false,
        applicationUniversalIdentifier: 'test-application-id',
        fieldUniversalIdentifiers: mockFieldMetadatas.map((field)=>field.universalIdentifier),
        viewUniversalIdentifiers: [],
        objectPermissionUniversalIdentifiers: [],
        fieldPermissionUniversalIdentifiers: [],
        indexMetadataUniversalIdentifiers: [],
        labelIdentifierFieldMetadataUniversalIdentifier: null,
        imageIdentifierFieldMetadataUniversalIdentifier: null
    });

//# sourceMappingURL=mockPersonObjectMetadata.js.map
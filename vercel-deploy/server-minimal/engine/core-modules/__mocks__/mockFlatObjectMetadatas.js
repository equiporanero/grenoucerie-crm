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
    get mockFlatFieldMetadataMaps () {
        return mockFlatFieldMetadataMaps;
    },
    get mockFlatObjectMetadatas () {
        return mockFlatObjectMetadatas;
    }
});
const _types = require("twenty-shared/types");
const _getflatfieldmetadatamock = require("../../metadata-modules/flat-field-metadata/__mocks__/get-flat-field-metadata.mock");
const _getflatobjectmetadatamock = require("../../metadata-modules/flat-object-metadata/__mocks__/get-flat-object-metadata.mock");
const workspaceId = '20202020-0000-0000-0000-000000000000';
const personNameFieldId = 'person-name-field-id';
const companyNameFieldId = 'company-name-field-id';
const companyDomainNameFieldId = 'company-domain-name-field-id';
const customObjectNameFieldId = 'custom-object-name-field-id';
const customObjectImageFieldId = 'custom-object-image-field-id';
const mockFlatObjectMetadatas = [
    (0, _getflatobjectmetadatamock.getFlatObjectMetadataMock)({
        id: '20202020-8dec-43d5-b2ff-6eef05095bec',
        nameSingular: 'person',
        namePlural: 'people',
        labelSingular: 'Person',
        labelPlural: 'People',
        description: 'A person',
        icon: 'test-person-icon',
        isCustom: false,
        isSearchable: true,
        labelIdentifierFieldMetadataId: personNameFieldId,
        imageIdentifierFieldMetadataId: null,
        workspaceId,
        fieldIds: [
            personNameFieldId
        ],
        universalIdentifier: 'person-universal-id',
        applicationId: workspaceId
    }),
    (0, _getflatobjectmetadatamock.getFlatObjectMetadataMock)({
        id: '20202020-c03c-45d6-a4b0-04afe1357c5c',
        nameSingular: 'company',
        namePlural: 'companies',
        labelSingular: 'Company',
        labelPlural: 'Companies',
        description: 'A company',
        icon: 'test-company-icon',
        isCustom: false,
        isSearchable: true,
        labelIdentifierFieldMetadataId: companyNameFieldId,
        imageIdentifierFieldMetadataId: null,
        workspaceId,
        fieldIds: [
            companyNameFieldId,
            companyDomainNameFieldId
        ],
        universalIdentifier: 'company-universal-id',
        applicationId: workspaceId
    }),
    (0, _getflatobjectmetadatamock.getFlatObjectMetadataMock)({
        id: '20202020-3d75-4aab-bacd-ee176c5f63ca',
        nameSingular: 'regular-custom-object',
        namePlural: 'regular-custom-objects',
        labelSingular: 'Regular Custom Object',
        labelPlural: 'Regular Custom Objects',
        description: 'A regular custom object',
        icon: 'test-regular-custom-object-icon',
        isCustom: true,
        isSearchable: true,
        labelIdentifierFieldMetadataId: customObjectNameFieldId,
        imageIdentifierFieldMetadataId: customObjectImageFieldId,
        workspaceId,
        fieldIds: [
            customObjectNameFieldId,
            customObjectImageFieldId
        ],
        universalIdentifier: 'custom-object-universal-id',
        applicationId: workspaceId
    }),
    (0, _getflatobjectmetadatamock.getFlatObjectMetadataMock)({
        id: '20202020-540c-4397-b872-2a90ea2fb809',
        nameSingular: 'non-searchable-object',
        namePlural: 'non-searchable-objects',
        labelSingular: '',
        labelPlural: '',
        description: '',
        icon: 'test-non-searchable-object-icon',
        isCustom: false,
        isSystem: true,
        isSearchable: false,
        labelIdentifierFieldMetadataId: null,
        imageIdentifierFieldMetadataId: null,
        workspaceId,
        fieldIds: [],
        universalIdentifier: 'non-searchable-object-universal-id',
        applicationId: workspaceId
    }),
    (0, _getflatobjectmetadatamock.getFlatObjectMetadataMock)({
        id: '20202020-6a7c-4e3f-9b2d-1d8f7a3e5c4b',
        nameSingular: 'message',
        namePlural: 'messages',
        labelSingular: 'Message',
        labelPlural: 'Messages',
        description: 'Message',
        icon: 'IconMessage',
        isCustom: false,
        isSystem: true,
        isSearchable: false,
        labelIdentifierFieldMetadataId: null,
        imageIdentifierFieldMetadataId: null,
        workspaceId,
        fieldIds: [],
        universalIdentifier: 'message-universal-id',
        applicationId: workspaceId
    })
];
const mockFlatFieldMetadataMaps = {
    byUniversalIdentifier: {
        'person-name-field-universal-id': (0, _getflatfieldmetadatamock.getFlatFieldMetadataMock)({
            id: personNameFieldId,
            type: _types.FieldMetadataType.FULL_NAME,
            icon: 'test-field-icon',
            name: 'name',
            label: 'Name',
            description: "Contact's name",
            isCustom: false,
            defaultValue: {
                lastName: "''",
                firstName: "''"
            },
            objectMetadataId: '20202020-8dec-43d5-b2ff-6eef05095bec',
            workspaceId,
            universalIdentifier: 'person-name-field-universal-id',
            applicationId: workspaceId
        }),
        'company-name-field-universal-id': (0, _getflatfieldmetadatamock.getFlatFieldMetadataMock)({
            id: companyNameFieldId,
            type: _types.FieldMetadataType.TEXT,
            icon: 'test-field-icon',
            name: 'name',
            label: 'Name',
            description: null,
            isCustom: false,
            defaultValue: '',
            objectMetadataId: '20202020-c03c-45d6-a4b0-04afe1357c5c',
            workspaceId,
            universalIdentifier: 'company-name-field-universal-id',
            applicationId: workspaceId
        }),
        'company-domain-name-field-universal-id': (0, _getflatfieldmetadatamock.getFlatFieldMetadataMock)({
            id: companyDomainNameFieldId,
            type: _types.FieldMetadataType.LINKS,
            icon: 'test-field-icon',
            name: 'domainName',
            label: 'Domain Name',
            description: null,
            isCustom: false,
            defaultValue: {
                primaryLinkLabel: '',
                primaryLinkUrl: '',
                secondaryLinks: []
            },
            objectMetadataId: '20202020-c03c-45d6-a4b0-04afe1357c5c',
            workspaceId,
            universalIdentifier: 'company-domain-name-field-universal-id',
            applicationId: workspaceId
        }),
        'custom-object-name-field-universal-id': (0, _getflatfieldmetadatamock.getFlatFieldMetadataMock)({
            id: customObjectNameFieldId,
            type: _types.FieldMetadataType.TEXT,
            icon: 'test-field-icon',
            name: 'name',
            label: 'Name',
            description: null,
            isCustom: false,
            defaultValue: '',
            objectMetadataId: '20202020-3d75-4aab-bacd-ee176c5f63ca',
            workspaceId,
            universalIdentifier: 'custom-object-name-field-universal-id',
            applicationId: workspaceId
        }),
        'custom-object-image-field-universal-id': (0, _getflatfieldmetadatamock.getFlatFieldMetadataMock)({
            id: customObjectImageFieldId,
            type: _types.FieldMetadataType.TEXT,
            icon: 'test-field-icon',
            name: 'imageIdentifierFieldName',
            label: 'Image Identifier Field Name',
            description: null,
            isCustom: false,
            defaultValue: '',
            objectMetadataId: '20202020-3d75-4aab-bacd-ee176c5f63ca',
            workspaceId,
            universalIdentifier: 'custom-object-image-field-universal-id',
            applicationId: workspaceId
        })
    },
    universalIdentifierById: {
        [personNameFieldId]: 'person-name-field-universal-id',
        [companyNameFieldId]: 'company-name-field-universal-id',
        [companyDomainNameFieldId]: 'company-domain-name-field-universal-id',
        [customObjectNameFieldId]: 'custom-object-name-field-universal-id',
        [customObjectImageFieldId]: 'custom-object-image-field-universal-id'
    },
    universalIdentifiersByApplicationId: {}
};

//# sourceMappingURL=mockFlatObjectMetadatas.js.map
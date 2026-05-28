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
    get getMockObjectMetadataInfo () {
        return getMockObjectMetadataInfo;
    },
    get mockCompanyObjectMetadataInfo () {
        return mockCompanyObjectMetadataInfo;
    },
    get mockCustomObjectMetadataInfo () {
        return mockCustomObjectMetadataInfo;
    },
    get mockFlatFieldMetadataMaps () {
        return mockFlatFieldMetadataMaps;
    },
    get mockFlatObjectMetadataMaps () {
        return mockFlatObjectMetadataMaps;
    },
    get mockNonSearchableObjectMetadataInfo () {
        return mockNonSearchableObjectMetadataInfo;
    },
    get mockObjectIdByNameSingular () {
        return mockObjectIdByNameSingular;
    },
    get mockPersonObjectMetadataInfo () {
        return mockPersonObjectMetadataInfo;
    }
});
const _types = require("twenty-shared/types");
const _createemptyflatentitymapsconstant = require("../../metadata-modules/flat-entity/constant/create-empty-flat-entity-maps.constant");
const _findflatentitybyidinflatentitymapsutil = require("../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _getflatfieldmetadatamock = require("../../metadata-modules/flat-field-metadata/__mocks__/get-flat-field-metadata.mock");
const _getflatobjectmetadatamock = require("../../metadata-modules/flat-object-metadata/__mocks__/get-flat-object-metadata.mock");
const workspaceId = '20202020-0000-0000-0000-000000000000';
const personNameFieldId = 'nameFieldMetadataId-person';
const companyNameFieldId = 'nameFieldMetadataId-company';
const companyDomainNameFieldId = 'domainNameFieldMetadataId';
const customObjectNameFieldId = 'nameFieldMetadataId-custom';
const customObjectImageFieldId = 'imageIdentifierFieldMetadataId';
const personFlatObject = (0, _getflatobjectmetadatamock.getFlatObjectMetadataMock)({
    id: '20202020-8dec-43d5-b2ff-6eef05095bec',
    nameSingular: 'person',
    namePlural: 'people',
    labelSingular: 'Person',
    labelPlural: 'People',
    description: 'A person',
    icon: 'test-person-icon',
    targetTableName: 'DEPRECATED',
    isCustom: false,
    isRemote: false,
    isActive: true,
    isSystem: false,
    isAuditLogged: true,
    isSearchable: true,
    labelIdentifierFieldMetadataId: personNameFieldId,
    imageIdentifierFieldMetadataId: null,
    workspaceId,
    universalIdentifier: '20202020-8dec-43d5-b2ff-6eef05095bec',
    fieldIds: [
        personNameFieldId
    ],
    indexMetadataIds: [],
    viewIds: []
});
const companyFlatObject = (0, _getflatobjectmetadatamock.getFlatObjectMetadataMock)({
    id: '20202020-c03c-45d6-a4b0-04afe1357c5c',
    nameSingular: 'company',
    namePlural: 'companies',
    labelSingular: 'Company',
    labelPlural: 'Companies',
    description: 'A company',
    icon: 'test-company-icon',
    targetTableName: 'DEPRECATED',
    isCustom: false,
    isRemote: false,
    isActive: true,
    isSystem: false,
    isAuditLogged: true,
    isSearchable: true,
    labelIdentifierFieldMetadataId: companyNameFieldId,
    imageIdentifierFieldMetadataId: null,
    workspaceId,
    universalIdentifier: '20202020-c03c-45d6-a4b0-04afe1357c5c',
    fieldIds: [
        companyNameFieldId,
        companyDomainNameFieldId
    ],
    indexMetadataIds: [],
    viewIds: []
});
const customObjectFlatObject = (0, _getflatobjectmetadatamock.getFlatObjectMetadataMock)({
    id: '20202020-3d75-4aab-bacd-ee176c5f63ca',
    nameSingular: 'regular-custom-object',
    namePlural: 'regular-custom-objects',
    labelSingular: 'Regular Custom Object',
    labelPlural: 'Regular Custom Objects',
    description: 'A regular custom object',
    icon: 'test-regular-custom-object-icon',
    targetTableName: 'DEPRECATED',
    isCustom: true,
    isRemote: false,
    isActive: true,
    isSystem: false,
    isAuditLogged: true,
    isSearchable: true,
    labelIdentifierFieldMetadataId: customObjectNameFieldId,
    imageIdentifierFieldMetadataId: customObjectImageFieldId,
    workspaceId,
    universalIdentifier: '20202020-3d75-4aab-bacd-ee176c5f63ca',
    fieldIds: [
        customObjectNameFieldId,
        customObjectImageFieldId
    ],
    indexMetadataIds: [],
    viewIds: []
});
const nonSearchableFlatObject = (0, _getflatobjectmetadatamock.getFlatObjectMetadataMock)({
    id: '20202020-540c-4397-b872-2a90ea2fb809',
    nameSingular: 'non-searchable-object',
    namePlural: 'non-searchable-objects',
    labelSingular: '',
    labelPlural: '',
    description: '',
    icon: 'test-non-searchable-object-icon',
    targetTableName: 'DEPRECATED',
    isCustom: false,
    isRemote: false,
    isActive: true,
    isSystem: true,
    isAuditLogged: true,
    isSearchable: false,
    labelIdentifierFieldMetadataId: null,
    imageIdentifierFieldMetadataId: null,
    workspaceId,
    universalIdentifier: '20202020-540c-4397-b872-2a90ea2fb809',
    fieldIds: [],
    indexMetadataIds: [],
    viewIds: []
});
const personNameField = (0, _getflatfieldmetadatamock.getFlatFieldMetadataMock)({
    id: personNameFieldId,
    objectMetadataId: personFlatObject.id,
    type: _types.FieldMetadataType.FULL_NAME,
    icon: 'test-field-icon',
    name: 'name',
    label: 'Name',
    defaultValue: {
        lastName: "''",
        firstName: "''"
    },
    description: "Contact's name",
    isCustom: false,
    isNullable: true,
    isUnique: false,
    isLabelSyncedWithName: true,
    universalIdentifier: personNameFieldId,
    workspaceId
});
const companyNameField = (0, _getflatfieldmetadatamock.getFlatFieldMetadataMock)({
    id: companyNameFieldId,
    objectMetadataId: companyFlatObject.id,
    type: _types.FieldMetadataType.TEXT,
    icon: 'test-field-icon',
    name: 'name',
    label: 'Name',
    defaultValue: '',
    isCustom: false,
    isNullable: true,
    isUnique: false,
    isLabelSyncedWithName: true,
    universalIdentifier: companyNameFieldId,
    workspaceId
});
const companyDomainNameField = (0, _getflatfieldmetadatamock.getFlatFieldMetadataMock)({
    id: companyDomainNameFieldId,
    objectMetadataId: companyFlatObject.id,
    type: _types.FieldMetadataType.LINKS,
    icon: 'test-field-icon',
    name: 'domainName',
    label: 'Domain Name',
    defaultValue: {
        primaryLinkLabel: '',
        primaryLinkUrl: '',
        secondaryLinks: []
    },
    isCustom: false,
    isNullable: true,
    isUnique: false,
    isLabelSyncedWithName: true,
    universalIdentifier: companyDomainNameFieldId,
    workspaceId
});
const customObjectNameField = (0, _getflatfieldmetadatamock.getFlatFieldMetadataMock)({
    id: customObjectNameFieldId,
    objectMetadataId: customObjectFlatObject.id,
    type: _types.FieldMetadataType.TEXT,
    icon: 'test-field-icon',
    name: 'name',
    label: 'Name',
    defaultValue: '',
    isCustom: false,
    isNullable: true,
    isUnique: false,
    isLabelSyncedWithName: true,
    universalIdentifier: customObjectNameFieldId,
    workspaceId
});
const customObjectImageField = (0, _getflatfieldmetadatamock.getFlatFieldMetadataMock)({
    id: customObjectImageFieldId,
    objectMetadataId: customObjectFlatObject.id,
    type: _types.FieldMetadataType.TEXT,
    icon: 'test-field-icon',
    name: 'imageIdentifierFieldName',
    label: 'Image Identifier Field Name',
    defaultValue: '',
    isCustom: false,
    isNullable: true,
    isUnique: false,
    isLabelSyncedWithName: true,
    universalIdentifier: customObjectImageFieldId,
    workspaceId
});
const ALL_FLAT_OBJECTS = [
    personFlatObject,
    companyFlatObject,
    customObjectFlatObject,
    nonSearchableFlatObject
];
const ALL_FLAT_FIELDS = [
    personNameField,
    companyNameField,
    companyDomainNameField,
    customObjectNameField,
    customObjectImageField
];
const mockFlatObjectMetadataMaps = ALL_FLAT_OBJECTS.reduce((acc, object)=>({
        ...acc,
        byUniversalIdentifier: {
            ...acc.byUniversalIdentifier,
            [object.universalIdentifier]: object
        },
        universalIdentifierById: {
            ...acc.universalIdentifierById,
            [object.id]: object.universalIdentifier
        }
    }), (0, _createemptyflatentitymapsconstant.createEmptyFlatEntityMaps)());
const mockFlatFieldMetadataMaps = ALL_FLAT_FIELDS.reduce((acc, field)=>({
        ...acc,
        byUniversalIdentifier: {
            ...acc.byUniversalIdentifier,
            [field.universalIdentifier]: field
        },
        universalIdentifierById: {
            ...acc.universalIdentifierById,
            [field.id]: field.universalIdentifier
        }
    }), (0, _createemptyflatentitymapsconstant.createEmptyFlatEntityMaps)());
const mockObjectIdByNameSingular = ALL_FLAT_OBJECTS.reduce((acc, object)=>({
        ...acc,
        [object.nameSingular]: object.id
    }), {});
const getMockObjectMetadataInfo = (nameSingular)=>{
    const objectId = mockObjectIdByNameSingular[nameSingular];
    const flatObjectMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: objectId,
        flatEntityMaps: mockFlatObjectMetadataMaps
    });
    if (!flatObjectMetadata) {
        throw new Error(`Object metadata not found for nameSingular: ${nameSingular}`);
    }
    return {
        flatObjectMetadata,
        flatObjectMetadataMaps: mockFlatObjectMetadataMaps,
        flatFieldMetadataMaps: mockFlatFieldMetadataMaps
    };
};
const mockPersonObjectMetadataInfo = getMockObjectMetadataInfo('person');
const mockCompanyObjectMetadataInfo = getMockObjectMetadataInfo('company');
const mockCustomObjectMetadataInfo = getMockObjectMetadataInfo('regular-custom-object');
const mockNonSearchableObjectMetadataInfo = getMockObjectMetadataInfo('non-searchable-object');

//# sourceMappingURL=mockObjectMetadataItemsWithFieldMaps.js.map
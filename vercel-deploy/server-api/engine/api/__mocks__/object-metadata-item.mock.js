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
    get FIELD_ACTOR_MOCK_NAME () {
        return FIELD_ACTOR_MOCK_NAME;
    },
    get FIELD_ADDRESS_MOCK_NAME () {
        return FIELD_ADDRESS_MOCK_NAME;
    },
    get FIELD_CURRENCY_MOCK_NAME () {
        return FIELD_CURRENCY_MOCK_NAME;
    },
    get FIELD_FULL_NAME_MOCK_NAME () {
        return FIELD_FULL_NAME_MOCK_NAME;
    },
    get FIELD_LINKS_MOCK_NAME () {
        return FIELD_LINKS_MOCK_NAME;
    },
    get FIELD_PHONES_MOCK_NAME () {
        return FIELD_PHONES_MOCK_NAME;
    },
    get fieldActorMock () {
        return fieldActorMock;
    },
    get fieldAddressMock () {
        return fieldAddressMock;
    },
    get fieldArrayMock () {
        return fieldArrayMock;
    },
    get fieldBooleanMock () {
        return fieldBooleanMock;
    },
    get fieldCurrencyMock () {
        return fieldCurrencyMock;
    },
    get fieldDateMock () {
        return fieldDateMock;
    },
    get fieldDateTimeMock () {
        return fieldDateTimeMock;
    },
    get fieldEmailsMock () {
        return fieldEmailsMock;
    },
    get fieldFullNameMock () {
        return fieldFullNameMock;
    },
    get fieldLinksMock () {
        return fieldLinksMock;
    },
    get fieldMultiSelectMock () {
        return fieldMultiSelectMock;
    },
    get fieldNumberMock () {
        return fieldNumberMock;
    },
    get fieldNumericMock () {
        return fieldNumericMock;
    },
    get fieldPhonesMock () {
        return fieldPhonesMock;
    },
    get fieldPositionMock () {
        return fieldPositionMock;
    },
    get fieldRatingMock () {
        return fieldRatingMock;
    },
    get fieldRawJsonMock () {
        return fieldRawJsonMock;
    },
    get fieldRelationMock () {
        return fieldRelationMock;
    },
    get fieldSelectMock () {
        return fieldSelectMock;
    },
    get fieldTextMock () {
        return fieldTextMock;
    },
    get fieldUuidMock () {
        return fieldUuidMock;
    },
    get objectMetadataItemMock () {
        return objectMetadataItemMock;
    }
});
const _types = require("twenty-shared/types");
const _relationtypeinterface = require("../../metadata-modules/field-metadata/interfaces/relation-type.interface");
const _getfieldmetadataentitymock = require("../../../utils/__test__/get-field-metadata-entity.mock");
const FIELD_LINKS_MOCK_NAME = 'fieldLinks';
const FIELD_CURRENCY_MOCK_NAME = 'fieldCurrency';
const FIELD_ADDRESS_MOCK_NAME = 'fieldAddress';
const FIELD_ACTOR_MOCK_NAME = 'fieldActor';
const FIELD_FULL_NAME_MOCK_NAME = 'fieldFullName';
const FIELD_PHONES_MOCK_NAME = 'fieldPhones';
const workspaceId = '20202020-0000-0000-0000-000000000000';
const objectMetadataId = '20202020-0000-0000-0000-000000000001';
const fieldNumberMock = (0, _getfieldmetadataentitymock.getMockFieldMetadataEntity)({
    workspaceId,
    objectMetadataId,
    id: 'fieldNumberId',
    name: 'fieldNumber',
    type: _types.FieldMetadataType.NUMBER,
    label: 'Field Number',
    isNullable: false,
    defaultValue: null,
    isLabelSyncedWithName: true,
    createdAt: new Date(),
    updatedAt: new Date()
});
const fieldTextMock = (0, _getfieldmetadataentitymock.getMockFieldMetadataEntity)({
    workspaceId,
    objectMetadataId,
    id: 'fieldTextId',
    name: 'fieldText',
    type: _types.FieldMetadataType.TEXT,
    label: 'Field Text',
    isNullable: true,
    defaultValue: null,
    isLabelSyncedWithName: true,
    createdAt: new Date(),
    updatedAt: new Date()
});
const fieldCurrencyMock = (0, _getfieldmetadataentitymock.getMockFieldMetadataEntity)({
    workspaceId,
    objectMetadataId,
    id: 'fieldCurrencyId',
    name: FIELD_CURRENCY_MOCK_NAME,
    type: _types.FieldMetadataType.CURRENCY,
    label: 'Field Currency',
    isNullable: true,
    defaultValue: {
        amountMicros: null,
        currencyCode: "''"
    },
    isLabelSyncedWithName: true,
    createdAt: new Date(),
    updatedAt: new Date()
});
const fieldSelectMock = (0, _getfieldmetadataentitymock.getMockFieldMetadataEntity)({
    workspaceId,
    objectMetadataId,
    id: 'fieldSelectId',
    name: 'fieldSelect',
    type: _types.FieldMetadataType.SELECT,
    label: 'Field Select',
    isNullable: true,
    defaultValue: 'OPTION_1',
    options: [
        {
            id: '9a519a86-422b-4598-88ae-78751353f683',
            label: 'Opt 1',
            value: 'OPTION_1',
            position: 0,
            color: 'red'
        },
        {
            id: '33f28d51-bc82-4e1d-ae4b-d9e4c0ed0ab4',
            label: 'Opt 2',
            value: 'OPTION_2',
            position: 1,
            color: 'purple'
        }
    ],
    isLabelSyncedWithName: true,
    createdAt: new Date(),
    updatedAt: new Date()
});
const fieldMultiSelectMock = (0, _getfieldmetadataentitymock.getMockFieldMetadataEntity)({
    workspaceId,
    objectMetadataId,
    id: 'fieldMultiSelectId',
    name: 'fieldMultiSelect',
    type: _types.FieldMetadataType.MULTI_SELECT,
    label: 'Field Multi Select',
    isNullable: true,
    defaultValue: [
        'OPTION_1'
    ],
    options: [
        {
            id: '9a519a86-422b-4598-88ae-78751353f683',
            label: 'Opt 1',
            value: 'OPTION_1',
            position: 0,
            color: 'red'
        },
        {
            id: '33f28d51-bc82-4e1d-ae4b-d9e4c0ed0ab4',
            label: 'Opt 2',
            value: 'OPTION_2',
            position: 1,
            color: 'purple'
        }
    ],
    isLabelSyncedWithName: true,
    createdAt: new Date(),
    updatedAt: new Date()
});
const fieldRelationMock = (0, _getfieldmetadataentitymock.getMockFieldMetadataEntity)({
    workspaceId,
    objectMetadataId,
    id: 'fieldRelationId',
    name: 'fieldRelation',
    type: _types.FieldMetadataType.RELATION,
    label: 'Field Relation',
    isNullable: true,
    settings: {
        relationType: _relationtypeinterface.RelationType.MANY_TO_ONE,
        joinColumnName: 'fieldRelationId',
        onDelete: _types.RelationOnDeleteAction.CASCADE
    },
    relationTargetObjectMetadata: {
        id: 'relationTargetObjectId',
        nameSingular: 'relationTargetObject',
        namePlural: 'relationTargetObjects'
    },
    relationTargetObjectMetadataId: 'relationTargetObjectId',
    relationTargetFieldMetadata: {
        id: 'relationTargetFieldId',
        name: 'relationTargetField'
    },
    relationTargetFieldMetadataId: 'relationTargetFieldId',
    isLabelSyncedWithName: true,
    createdAt: new Date(),
    updatedAt: new Date()
});
const fieldLinksMock = (0, _getfieldmetadataentitymock.getMockFieldMetadataEntity)({
    workspaceId,
    objectMetadataId,
    id: 'fieldLinksId',
    name: FIELD_LINKS_MOCK_NAME,
    type: _types.FieldMetadataType.LINKS,
    label: 'Field Links',
    isNullable: false,
    defaultValue: {
        primaryLinkLabel: '',
        primaryLinkUrl: '',
        secondaryLinks: []
    },
    isLabelSyncedWithName: true,
    createdAt: new Date(),
    updatedAt: new Date()
});
const fieldUuidMock = (0, _getfieldmetadataentitymock.getMockFieldMetadataEntity)({
    workspaceId,
    objectMetadataId,
    id: 'fieldUuidId',
    name: 'fieldUuid',
    type: _types.FieldMetadataType.UUID,
    label: 'Field UUID',
    isNullable: true,
    defaultValue: null,
    isLabelSyncedWithName: true,
    createdAt: new Date(),
    updatedAt: new Date()
});
const fieldDateTimeMock = (0, _getfieldmetadataentitymock.getMockFieldMetadataEntity)({
    workspaceId,
    objectMetadataId,
    id: 'fieldDateTimeId',
    name: 'fieldDateTime',
    type: _types.FieldMetadataType.DATE_TIME,
    label: 'Field Date Time',
    isNullable: true,
    defaultValue: null,
    isLabelSyncedWithName: true,
    createdAt: new Date(),
    updatedAt: new Date()
});
const fieldDateMock = (0, _getfieldmetadataentitymock.getMockFieldMetadataEntity)({
    workspaceId,
    objectMetadataId,
    id: 'fieldDateId',
    name: 'fieldDate',
    type: _types.FieldMetadataType.DATE,
    label: 'Field Date',
    isNullable: true,
    defaultValue: null,
    isLabelSyncedWithName: true,
    createdAt: new Date(),
    updatedAt: new Date()
});
const fieldBooleanMock = (0, _getfieldmetadataentitymock.getMockFieldMetadataEntity)({
    workspaceId,
    objectMetadataId,
    id: 'fieldBooleanId',
    name: 'fieldBoolean',
    type: _types.FieldMetadataType.BOOLEAN,
    label: 'Field Boolean',
    isNullable: true,
    defaultValue: null,
    isLabelSyncedWithName: true,
    createdAt: new Date(),
    updatedAt: new Date()
});
const fieldNumericMock = (0, _getfieldmetadataentitymock.getMockFieldMetadataEntity)({
    workspaceId,
    objectMetadataId,
    id: 'fieldNumericId',
    name: 'fieldNumeric',
    type: _types.FieldMetadataType.NUMERIC,
    label: 'Field Numeric',
    isNullable: true,
    defaultValue: null,
    isLabelSyncedWithName: true,
    createdAt: new Date(),
    updatedAt: new Date()
});
const fieldFullNameMock = (0, _getfieldmetadataentitymock.getMockFieldMetadataEntity)({
    workspaceId,
    objectMetadataId,
    id: 'fieldFullNameId',
    name: FIELD_FULL_NAME_MOCK_NAME,
    type: _types.FieldMetadataType.FULL_NAME,
    label: 'Field Full Name',
    isNullable: true,
    defaultValue: {
        firstName: '',
        lastName: ''
    },
    isLabelSyncedWithName: true,
    createdAt: new Date(),
    updatedAt: new Date()
});
const fieldRatingMock = (0, _getfieldmetadataentitymock.getMockFieldMetadataEntity)({
    workspaceId,
    objectMetadataId,
    id: 'fieldRatingId',
    name: 'fieldRating',
    type: _types.FieldMetadataType.RATING,
    label: 'Field Rating',
    isNullable: true,
    defaultValue: 'RATING_1',
    options: [
        {
            id: '9a519a86-422b-4598-88ae-78751353f683',
            label: 'Opt 1',
            value: 'RATING_1',
            position: 0,
            color: 'red'
        },
        {
            id: '33f28d51-bc82-4e1d-ae4b-d9e4c0ed0ab4',
            label: 'Opt 2',
            value: 'RATING_2',
            position: 1,
            color: 'purple'
        }
    ],
    isLabelSyncedWithName: true,
    createdAt: new Date(),
    updatedAt: new Date()
});
const fieldPositionMock = (0, _getfieldmetadataentitymock.getMockFieldMetadataEntity)({
    workspaceId,
    objectMetadataId,
    id: 'fieldPositionId',
    name: 'fieldPosition',
    type: _types.FieldMetadataType.POSITION,
    label: 'Field Position',
    isNullable: true,
    defaultValue: null,
    isLabelSyncedWithName: true,
    createdAt: new Date(),
    updatedAt: new Date()
});
const fieldAddressMock = (0, _getfieldmetadataentitymock.getMockFieldMetadataEntity)({
    workspaceId,
    objectMetadataId,
    id: 'fieldAddressId',
    name: FIELD_ADDRESS_MOCK_NAME,
    type: _types.FieldMetadataType.ADDRESS,
    label: 'Field Address',
    isNullable: true,
    defaultValue: {
        addressStreet1: '',
        addressStreet2: null,
        addressCity: null,
        addressState: null,
        addressCountry: null,
        addressPostcode: null,
        addressLat: null,
        addressLng: null
    },
    isLabelSyncedWithName: true,
    createdAt: new Date(),
    updatedAt: new Date()
});
const fieldRawJsonMock = (0, _getfieldmetadataentitymock.getMockFieldMetadataEntity)({
    workspaceId,
    objectMetadataId,
    id: 'fieldRawJsonId',
    name: 'fieldRawJson',
    type: _types.FieldMetadataType.RAW_JSON,
    label: 'Field Raw JSON',
    isNullable: true,
    defaultValue: null,
    isLabelSyncedWithName: true,
    createdAt: new Date(),
    updatedAt: new Date()
});
const fieldActorMock = (0, _getfieldmetadataentitymock.getMockFieldMetadataEntity)({
    workspaceId,
    objectMetadataId,
    id: 'fieldActorId',
    name: FIELD_ACTOR_MOCK_NAME,
    type: _types.FieldMetadataType.ACTOR,
    label: 'Field Actor',
    isNullable: true,
    defaultValue: {
        source: _types.FieldActorSource.MANUAL,
        name: ''
    },
    isLabelSyncedWithName: true,
    createdAt: new Date(),
    updatedAt: new Date()
});
const fieldEmailsMock = (0, _getfieldmetadataentitymock.getMockFieldMetadataEntity)({
    workspaceId,
    objectMetadataId,
    id: 'fieldEmailsId',
    name: 'fieldEmails',
    type: _types.FieldMetadataType.EMAILS,
    label: 'Field Emails',
    isNullable: false,
    defaultValue: {
        primaryEmail: '',
        additionalEmails: {}
    },
    isLabelSyncedWithName: true,
    createdAt: new Date(),
    updatedAt: new Date()
});
const fieldArrayMock = (0, _getfieldmetadataentitymock.getMockFieldMetadataEntity)({
    workspaceId,
    objectMetadataId,
    id: 'fieldArrayId',
    name: 'fieldArray',
    type: _types.FieldMetadataType.ARRAY,
    label: 'Field Array',
    isNullable: true,
    defaultValue: null,
    isLabelSyncedWithName: true,
    createdAt: new Date(),
    updatedAt: new Date()
});
const fieldPhonesMock = (0, _getfieldmetadataentitymock.getMockFieldMetadataEntity)({
    workspaceId,
    objectMetadataId,
    id: 'fieldPhonesId',
    name: FIELD_PHONES_MOCK_NAME,
    type: _types.FieldMetadataType.PHONES,
    label: 'Field Phones',
    isNullable: false,
    defaultValue: {
        primaryPhoneNumber: '',
        primaryPhoneCountryCode: '',
        primaryPhoneCallingCode: '',
        additionalPhones: {}
    },
    isLabelSyncedWithName: true,
    createdAt: new Date(),
    updatedAt: new Date()
});
const FIELDS_MOCK = [
    fieldUuidMock,
    fieldTextMock,
    fieldPhonesMock,
    fieldEmailsMock,
    fieldDateTimeMock,
    fieldDateMock,
    fieldBooleanMock,
    fieldNumberMock,
    fieldNumericMock,
    fieldLinksMock,
    fieldCurrencyMock,
    fieldFullNameMock,
    fieldRatingMock,
    fieldSelectMock,
    fieldMultiSelectMock,
    fieldRelationMock,
    fieldPositionMock,
    fieldAddressMock,
    fieldRawJsonMock,
    fieldActorMock,
    fieldArrayMock
];
const objectMetadataItemMock = {
    id: objectMetadataId,
    workspaceId,
    nameSingular: 'objectName',
    namePlural: 'objectNames',
    labelSingular: 'Object Name',
    labelPlural: 'Object Names',
    description: 'Object description',
    icon: 'Icon123',
    targetTableName: 'DEPRECATED',
    isCustom: false,
    isRemote: false,
    isActive: true,
    isSystem: false,
    isAuditLogged: true,
    isSearchable: true,
    fields: FIELDS_MOCK,
    createdAt: new Date(),
    updatedAt: new Date()
};

//# sourceMappingURL=object-metadata-item.mock.js.map
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _getflatfieldmetadatamock = require("../../../../../metadata-modules/flat-field-metadata/__mocks__/get-flat-field-metadata.mock");
const _getflatobjectmetadatamock = require("../../../../../metadata-modules/flat-object-metadata/__mocks__/get-flat-object-metadata.mock");
const _getworkspaceschemanameutil = require("../../../../../workspace-datasource/utils/get-workspace-schema-name.util");
const _generatecolumndefinitionsutil = require("../generate-column-definitions.util");
describe('Generate Column Definitions', ()=>{
    const workspaceId = '20202020-1c25-4d02-bf25-6aeccf7ea419';
    const mockObjectId = '20202020-object-id';
    const mockObjectMetadata = (0, _getflatobjectmetadatamock.getFlatObjectMetadataMock)({
        universalIdentifier: 'person',
        id: mockObjectId,
        nameSingular: 'person',
        namePlural: 'persons'
    });
    const mockSchemaName = (0, _getworkspaceschemanameutil.getWorkspaceSchemaName)(workspaceId);
    describe('Enum Field Schema Generation', ()=>{
        it('should generate deterministic enum names to prevent schema conflicts', ()=>{
            const enumField = (0, _getflatfieldmetadatamock.getFlatFieldMetadataMock)({
                universalIdentifier: 'status',
                objectMetadataId: mockObjectId,
                type: _types.FieldMetadataType.SELECT,
                name: 'status',
                options: [
                    {
                        id: '1',
                        value: 'ACTIVE',
                        label: 'Active',
                        color: 'green',
                        position: 0
                    },
                    {
                        id: '2',
                        value: 'INACTIVE',
                        label: 'Inactive',
                        color: 'red',
                        position: 1
                    }
                ]
            });
            const columns = (0, _generatecolumndefinitionsutil.generateColumnDefinitions)({
                flatFieldMetadata: enumField,
                flatObjectMetadata: mockObjectMetadata,
                workspaceId
            });
            expect(columns).toHaveLength(1);
            const column = columns[0];
            expect(column).toEqual({
                name: 'status',
                type: `"${mockSchemaName}"."_person_status_enum"`,
                isArray: false,
                isNullable: true,
                isPrimary: false,
                default: 'NULL'
            });
        });
        it('should handle multi-select fields with proper enum generation', ()=>{
            const multiSelectField = (0, _getflatfieldmetadatamock.getFlatFieldMetadataMock)({
                universalIdentifier: 'tags',
                objectMetadataId: mockObjectId,
                type: _types.FieldMetadataType.MULTI_SELECT,
                name: 'tags',
                options: [
                    {
                        id: '1',
                        value: 'URGENT',
                        label: 'Urgent',
                        color: 'red',
                        position: 0
                    },
                    {
                        id: '2',
                        value: 'LOW_PRIORITY',
                        label: 'Low Priority',
                        color: 'blue',
                        position: 1
                    }
                ]
            });
            const columns = (0, _generatecolumndefinitionsutil.generateColumnDefinitions)({
                flatFieldMetadata: multiSelectField,
                flatObjectMetadata: mockObjectMetadata,
                workspaceId
            });
            expect(columns).toHaveLength(1);
            const column = columns[0];
            expect(column).toEqual({
                name: 'tags',
                type: `"${mockSchemaName}"."_person_tags_enum"`,
                isArray: true,
                isNullable: true,
                isPrimary: false,
                default: 'NULL'
            });
        });
    });
    describe('Relation Field Schema Generation', ()=>{
        it('should handle null relation settings without crashing', ()=>{
            const relationField = (0, _getflatfieldmetadatamock.getFlatFieldMetadataMock)({
                universalIdentifier: 'company',
                objectMetadataId: mockObjectId,
                type: _types.FieldMetadataType.RELATION,
                name: 'company',
                universalSettings: null
            });
            const columns = (0, _generatecolumndefinitionsutil.generateColumnDefinitions)({
                flatFieldMetadata: relationField,
                flatObjectMetadata: mockObjectMetadata,
                workspaceId
            });
            // Relations without join columns must return empty array
            expect(columns).toStrictEqual([]);
        });
        it('should generate proper UUID foreign key columns for valid relations', ()=>{
            const relationField = (0, _getflatfieldmetadatamock.getFlatFieldMetadataMock)({
                universalIdentifier: 'company',
                objectMetadataId: mockObjectId,
                type: _types.FieldMetadataType.RELATION,
                name: 'company',
                settings: {
                    relationType: _types.RelationType.MANY_TO_ONE,
                    joinColumnName: 'companyId'
                }
            });
            const columns = (0, _generatecolumndefinitionsutil.generateColumnDefinitions)({
                flatFieldMetadata: relationField,
                flatObjectMetadata: mockObjectMetadata,
                workspaceId
            });
            expect(columns).toHaveLength(1);
            const column = columns[0];
            expect(column).toEqual({
                name: 'companyId',
                type: 'uuid',
                isNullable: true,
                isPrimary: false,
                default: null,
                isArray: false
            });
        });
    });
    describe('Composite Field Schema Generation', ()=>{
        it('should generate all required columns for ADDRESS composite type', ()=>{
            const addressField = (0, _getflatfieldmetadatamock.getFlatFieldMetadataMock)({
                universalIdentifier: 'address',
                objectMetadataId: mockObjectId,
                type: _types.FieldMetadataType.ADDRESS,
                name: 'homeAddress',
                isNullable: true
            });
            const columns = (0, _generatecolumndefinitionsutil.generateColumnDefinitions)({
                flatFieldMetadata: addressField,
                flatObjectMetadata: mockObjectMetadata,
                workspaceId
            });
            expect(columns).toHaveLength(8);
            const columnNames = columns.map((col)=>col.name);
            expect(columnNames).toEqual([
                'homeAddressAddressStreet1',
                'homeAddressAddressStreet2',
                'homeAddressAddressCity',
                'homeAddressAddressPostcode',
                'homeAddressAddressState',
                'homeAddressAddressCountry',
                'homeAddressAddressLat',
                'homeAddressAddressLng'
            ]);
            // All composite columns must inherit parent nullable constraint
            columns.forEach((column)=>{
                expect(column.isNullable).toBe(true);
                expect(column.isPrimary).toBe(false);
                expect(column.default).toBe('NULL');
            });
        });
        it('should handle CURRENCY composite type properly', ()=>{
            const currencyField = (0, _getflatfieldmetadatamock.getFlatFieldMetadataMock)({
                universalIdentifier: 'price',
                objectMetadataId: mockObjectId,
                type: _types.FieldMetadataType.CURRENCY,
                name: 'price',
                defaultValue: {
                    amountMicros: "'100000000'",
                    currencyCode: "'USD'"
                }
            });
            const columns = (0, _generatecolumndefinitionsutil.generateColumnDefinitions)({
                flatFieldMetadata: currencyField,
                flatObjectMetadata: mockObjectMetadata,
                workspaceId
            });
            expect(columns).toHaveLength(2);
            const columnNames = columns.map((col)=>col.name);
            expect(columnNames).toEqual([
                'priceAmountMicros',
                'priceCurrencyCode'
            ]);
            expect(columns[0]).toMatchObject({
                name: 'priceAmountMicros',
                type: 'numeric',
                isNullable: true,
                isPrimary: false,
                default: "'100000000'::numeric"
            });
            expect(columns[1]).toMatchObject({
                name: 'priceCurrencyCode',
                type: 'text',
                isNullable: true,
                isPrimary: false,
                default: "'USD'::text"
            });
        });
        it('should serialize null-equivalent unique composite defaults as NULL', ()=>{
            const phonesField = (0, _getflatfieldmetadatamock.getFlatFieldMetadataMock)({
                universalIdentifier: 'phone',
                objectMetadataId: mockObjectId,
                type: _types.FieldMetadataType.PHONES,
                name: 'phone',
                isUnique: true,
                defaultValue: {
                    primaryPhoneNumber: "''",
                    primaryPhoneCountryCode: "'US'",
                    primaryPhoneCallingCode: "'+1'",
                    additionalPhones: null
                }
            });
            const columns = (0, _generatecolumndefinitionsutil.generateColumnDefinitions)({
                flatFieldMetadata: phonesField,
                flatObjectMetadata: mockObjectMetadata,
                workspaceId
            });
            expect(columns).toHaveLength(4);
            expect(columns).toEqual([
                expect.objectContaining({
                    name: 'phonePrimaryPhoneNumber',
                    default: 'NULL'
                }),
                expect.objectContaining({
                    name: 'phonePrimaryPhoneCountryCode',
                    default: "'US'::text"
                }),
                expect.objectContaining({
                    name: 'phonePrimaryPhoneCallingCode',
                    default: "'+1'::text"
                }),
                expect.objectContaining({
                    name: 'phoneAdditionalPhones',
                    default: 'NULL'
                })
            ]);
        });
        it('should serialize normalized unique phone defaults from metadata input', ()=>{
            const phonesField = (0, _getflatfieldmetadatamock.getFlatFieldMetadataMock)({
                universalIdentifier: 'phone',
                objectMetadataId: mockObjectId,
                type: _types.FieldMetadataType.PHONES,
                name: 'phone',
                isUnique: true,
                defaultValue: {
                    primaryPhoneNumber: '',
                    primaryPhoneCountryCode: '',
                    primaryPhoneCallingCode: '',
                    additionalPhones: null
                }
            });
            const columns = (0, _generatecolumndefinitionsutil.generateColumnDefinitions)({
                flatFieldMetadata: phonesField,
                flatObjectMetadata: mockObjectMetadata,
                workspaceId
            });
            expect(columns).toHaveLength(4);
            expect(columns).toEqual([
                expect.objectContaining({
                    name: 'phonePrimaryPhoneNumber',
                    default: 'NULL'
                }),
                expect.objectContaining({
                    name: 'phonePrimaryPhoneCountryCode',
                    default: 'NULL'
                }),
                expect.objectContaining({
                    name: 'phonePrimaryPhoneCallingCode',
                    default: 'NULL'
                }),
                expect.objectContaining({
                    name: 'phoneAdditionalPhones',
                    default: 'NULL'
                })
            ]);
        });
    });
    describe('Default Value Schema Generation', ()=>{
        it('should handle null and undefined default values safely', ()=>{
            const textField = (0, _getflatfieldmetadatamock.getFlatFieldMetadataMock)({
                universalIdentifier: 'description',
                objectMetadataId: mockObjectId,
                type: _types.FieldMetadataType.TEXT,
                name: 'description',
                defaultValue: null
            });
            const columns = (0, _generatecolumndefinitionsutil.generateColumnDefinitions)({
                flatFieldMetadata: textField,
                flatObjectMetadata: mockObjectMetadata,
                workspaceId
            });
            expect(columns).toStrictEqual([
                {
                    name: 'description',
                    type: 'text',
                    isNullable: true,
                    isPrimary: false,
                    default: 'NULL',
                    isArray: false
                }
            ]);
        });
        it('should handle boolean fields with default values', ()=>{
            const booleanField = (0, _getflatfieldmetadatamock.getFlatFieldMetadataMock)({
                universalIdentifier: 'isActive',
                objectMetadataId: mockObjectId,
                type: _types.FieldMetadataType.BOOLEAN,
                name: 'isActive',
                defaultValue: true
            });
            const columns = (0, _generatecolumndefinitionsutil.generateColumnDefinitions)({
                flatFieldMetadata: booleanField,
                flatObjectMetadata: mockObjectMetadata,
                workspaceId
            });
            expect(columns).toStrictEqual([
                {
                    name: 'isActive',
                    type: 'boolean',
                    isNullable: true,
                    isPrimary: false,
                    default: "'true'::boolean",
                    isArray: false
                }
            ]);
        });
    });
    describe('Field Definition Generation', ()=>{
        it('should handle text fields without crashing', ()=>{
            const textField = (0, _getflatfieldmetadatamock.getFlatFieldMetadataMock)({
                universalIdentifier: 'content',
                objectMetadataId: mockObjectId,
                type: _types.FieldMetadataType.TEXT,
                name: 'content'
            });
            const columns = (0, _generatecolumndefinitionsutil.generateColumnDefinitions)({
                flatFieldMetadata: textField,
                flatObjectMetadata: mockObjectMetadata,
                workspaceId
            });
            expect(columns).toStrictEqual([
                {
                    name: 'content',
                    type: 'text',
                    isNullable: true,
                    isPrimary: false,
                    default: 'NULL',
                    isArray: false
                }
            ]);
        });
        it('should handle UUID fields properly', ()=>{
            const uuidField = (0, _getflatfieldmetadatamock.getFlatFieldMetadataMock)({
                universalIdentifier: 'uuid',
                objectMetadataId: mockObjectId,
                type: _types.FieldMetadataType.UUID,
                name: 'uuid'
            });
            const columns = (0, _generatecolumndefinitionsutil.generateColumnDefinitions)({
                flatFieldMetadata: uuidField,
                flatObjectMetadata: mockObjectMetadata,
                workspaceId
            });
            expect(columns).toStrictEqual([
                {
                    name: 'uuid',
                    type: 'uuid',
                    isNullable: true,
                    isPrimary: false,
                    default: 'NULL',
                    isArray: false
                }
            ]);
        });
    });
});

//# sourceMappingURL=generate-column-definitions.util.spec.js.map
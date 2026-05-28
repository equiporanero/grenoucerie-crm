"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _getconflictingfieldsutil = require("../get-conflicting-fields.util");
describe('getConflictingFields', ()=>{
    const workspaceId = 'workspaceId';
    const objectMetadataId = 'objectMetadataId';
    const createMockField = (overrides)=>({
            workspaceId,
            objectMetadataId,
            isNullable: false,
            isLabelSyncedWithName: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            universalIdentifier: overrides.id,
            viewFieldIds: [],
            viewFilterIds: [],
            kanbanAggregateOperationViewIds: [],
            calendarViewIds: [],
            applicationId: null,
            label: overrides.name,
            ...overrides
        });
    const idField = createMockField({
        id: 'id-field-id',
        name: 'id',
        type: _types.FieldMetadataType.UUID,
        isUnique: true
    });
    const uniqueTextField = createMockField({
        id: 'unique-text-id',
        name: 'uniqueText',
        type: _types.FieldMetadataType.TEXT,
        isUnique: true
    });
    const emailsUniqueField = createMockField({
        id: 'emails-unique-id',
        name: 'emailsField',
        type: _types.FieldMetadataType.EMAILS,
        isUnique: true
    });
    const phonesUniqueField = createMockField({
        id: 'phones-unique-id',
        name: 'phonesField',
        type: _types.FieldMetadataType.PHONES,
        isUnique: true
    });
    const phonesNotUniqueField = createMockField({
        id: 'phones-not-unique-id',
        name: 'phonesField',
        type: _types.FieldMetadataType.PHONES,
        isUnique: false
    });
    const addressUniqueFieldNoIncludedProp = createMockField({
        id: 'address-unique-id',
        name: 'addressField',
        type: _types.FieldMetadataType.ADDRESS,
        isUnique: true
    });
    const buildFlatObjectMetadata = (fields)=>({
            id: objectMetadataId,
            workspaceId,
            nameSingular: 'testObject',
            namePlural: 'testObjects',
            labelSingular: 'Test Object',
            labelPlural: 'Test Objects',
            isCustom: false,
            isRemote: false,
            isActive: true,
            isSystem: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            universalIdentifier: objectMetadataId,
            fieldIds: fields.map((f)=>f.id),
            indexMetadataIds: [],
            viewIds: [],
            applicationId: null
        });
    const buildFlatFieldMetadataMaps = (fields)=>({
            byUniversalIdentifier: fields.reduce((acc, field)=>{
                acc[field.universalIdentifier] = field;
                return acc;
            }, {}),
            universalIdentifierById: fields.reduce((acc, field)=>{
                acc[field.id] = field.universalIdentifier;
                return acc;
            }, {}),
            universalIdentifiersByApplicationId: {}
        });
    it('returns id and unique non-composite fields as conflicts', ()=>{
        const fields = [
            idField,
            uniqueTextField
        ];
        const flatObjectMetadata = buildFlatObjectMetadata(fields);
        const flatFieldMetadataMaps = buildFlatFieldMetadataMaps(fields);
        const result = (0, _getconflictingfieldsutil.getConflictingFields)(flatObjectMetadata, flatFieldMetadataMaps);
        expect(result).toEqual(expect.arrayContaining([
            {
                baseField: 'id',
                conflictingProperties: [
                    {
                        fullPath: 'id',
                        column: 'id'
                    }
                ]
            },
            {
                baseField: 'uniqueText',
                conflictingProperties: [
                    {
                        fullPath: 'uniqueText',
                        column: 'uniqueText'
                    }
                ]
            }
        ]));
    });
    it('returns composite field with included unique property using full path and computed column', ()=>{
        const fields = [
            idField,
            emailsUniqueField
        ];
        const flatObjectMetadata = buildFlatObjectMetadata(fields);
        const flatFieldMetadataMaps = buildFlatFieldMetadataMaps(fields);
        const result = (0, _getconflictingfieldsutil.getConflictingFields)(flatObjectMetadata, flatFieldMetadataMaps);
        expect(result).toEqual(expect.arrayContaining([
            {
                baseField: 'id',
                conflictingProperties: [
                    {
                        fullPath: 'id',
                        column: 'id'
                    }
                ]
            },
            {
                baseField: 'emailsField',
                conflictingProperties: [
                    {
                        fullPath: 'emailsField.primaryEmail',
                        column: 'emailsFieldPrimaryEmail'
                    }
                ]
            }
        ]));
    });
    it('returns every included unique property for phone composite fields', ()=>{
        const fields = [
            idField,
            phonesUniqueField
        ];
        const flatObjectMetadata = buildFlatObjectMetadata(fields);
        const flatFieldMetadataMaps = buildFlatFieldMetadataMaps(fields);
        const result = (0, _getconflictingfieldsutil.getConflictingFields)(flatObjectMetadata, flatFieldMetadataMaps);
        expect(result).toEqual([
            {
                baseField: 'id',
                conflictingProperties: [
                    {
                        fullPath: 'id',
                        column: 'id'
                    }
                ]
            },
            {
                baseField: 'phonesField',
                conflictingProperties: [
                    {
                        fullPath: 'phonesField.primaryPhoneNumber',
                        column: 'phonesFieldPrimaryPhoneNumber'
                    },
                    {
                        fullPath: 'phonesField.primaryPhoneCountryCode',
                        column: 'phonesFieldPrimaryPhoneCountryCode'
                    },
                    {
                        fullPath: 'phonesField.primaryPhoneCallingCode',
                        column: 'phonesFieldPrimaryPhoneCallingCode'
                    }
                ]
            }
        ]);
    });
    it('does not include composite fields without included unique property', ()=>{
        const fields = [
            idField,
            addressUniqueFieldNoIncludedProp
        ];
        const flatObjectMetadata = buildFlatObjectMetadata(fields);
        const flatFieldMetadataMaps = buildFlatFieldMetadataMaps(fields);
        const result = (0, _getconflictingfieldsutil.getConflictingFields)(flatObjectMetadata, flatFieldMetadataMaps);
        expect(result).toEqual([
            {
                baseField: 'id',
                conflictingProperties: [
                    {
                        fullPath: 'id',
                        column: 'id'
                    }
                ]
            }
        ]);
    });
    it('ignores non-unique fields', ()=>{
        const fields = [
            idField,
            phonesNotUniqueField
        ];
        const flatObjectMetadata = buildFlatObjectMetadata(fields);
        const flatFieldMetadataMaps = buildFlatFieldMetadataMaps(fields);
        const result = (0, _getconflictingfieldsutil.getConflictingFields)(flatObjectMetadata, flatFieldMetadataMaps);
        expect(result).toEqual([
            {
                baseField: 'id',
                conflictingProperties: [
                    {
                        fullPath: 'id',
                        column: 'id'
                    }
                ]
            }
        ]);
    });
});

//# sourceMappingURL=get-conflicting-fields.util.spec.js.map
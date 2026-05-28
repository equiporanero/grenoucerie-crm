"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _isrelationnestedfielddatekindutil = require("../is-relation-nested-field-date-kind.util");
const createMockFieldMetadata = (overrides)=>({
        id: 'test-field-id',
        name: 'testField',
        type: _types.FieldMetadataType.TEXT,
        universalIdentifier: 'test-universal-id',
        ...overrides
    });
const createMockObjectMetadata = (overrides)=>({
        id: 'test-object-id',
        nameSingular: 'testObject',
        namePlural: 'testObjects',
        fieldIds: [],
        universalIdentifier: 'test-object-universal-id',
        ...overrides
    });
describe('isRelationNestedFieldDateKind', ()=>{
    const companyObjectId = 'company-object-id';
    const createdAtFieldId = 'created-at-field-id';
    const nameFieldId = 'name-field-id';
    const createdAtField = createMockFieldMetadata({
        id: createdAtFieldId,
        name: 'createdAt',
        type: _types.FieldMetadataType.DATE_TIME,
        universalIdentifier: 'created-at-universal-id'
    });
    const nameField = createMockFieldMetadata({
        id: nameFieldId,
        name: 'name',
        type: _types.FieldMetadataType.TEXT,
        universalIdentifier: 'name-universal-id'
    });
    const companyObject = createMockObjectMetadata({
        id: companyObjectId,
        nameSingular: 'company',
        namePlural: 'companies',
        fieldIds: [
            createdAtFieldId,
            nameFieldId
        ]
    });
    const relationField = createMockFieldMetadata({
        id: 'relation-field-id',
        name: 'company',
        type: _types.FieldMetadataType.RELATION,
        relationTargetObjectMetadataId: companyObjectId,
        universalIdentifier: 'relation-universal-id'
    });
    const flatObjectMetadataMaps = {
        byUniversalIdentifier: {
            [companyObject.universalIdentifier]: companyObject
        },
        universalIdentifierById: {
            [companyObjectId]: companyObject.universalIdentifier
        },
        universalIdentifiersByApplicationId: {}
    };
    const flatFieldMetadataMaps = {
        byUniversalIdentifier: {
            [createdAtField.universalIdentifier]: createdAtField,
            [nameField.universalIdentifier]: nameField
        },
        universalIdentifierById: {
            [createdAtFieldId]: createdAtField.universalIdentifier,
            [nameFieldId]: nameField.universalIdentifier
        },
        universalIdentifiersByApplicationId: {}
    };
    it('should return true for a relation subfield that is a date type', ()=>{
        const result = (0, _isrelationnestedfielddatekindutil.isRelationNestedFieldDateKind)({
            relationFieldMetadata: relationField,
            relationNestedFieldName: 'createdAt',
            flatObjectMetadataMaps,
            flatFieldMetadataMaps
        });
        expect(result).toBe(true);
    });
    it('should return false when the nested subfield is not a date type', ()=>{
        const result = (0, _isrelationnestedfielddatekindutil.isRelationNestedFieldDateKind)({
            relationFieldMetadata: relationField,
            relationNestedFieldName: 'name',
            flatObjectMetadataMaps,
            flatFieldMetadataMaps
        });
        expect(result).toBe(false);
    });
    it('should return false when relationNestedFieldName is undefined', ()=>{
        const result = (0, _isrelationnestedfielddatekindutil.isRelationNestedFieldDateKind)({
            relationFieldMetadata: relationField,
            relationNestedFieldName: undefined,
            flatObjectMetadataMaps,
            flatFieldMetadataMaps
        });
        expect(result).toBe(false);
    });
    it('should return false for non-relation fields', ()=>{
        const nonRelationField = createMockFieldMetadata({
            name: 'status',
            type: _types.FieldMetadataType.TEXT
        });
        const result = (0, _isrelationnestedfielddatekindutil.isRelationNestedFieldDateKind)({
            relationFieldMetadata: nonRelationField,
            relationNestedFieldName: 'createdAt',
            flatObjectMetadataMaps,
            flatFieldMetadataMaps
        });
        expect(result).toBe(false);
    });
    it('should return false when target object is not found', ()=>{
        const relationFieldWithMissingTarget = createMockFieldMetadata({
            name: 'company',
            type: _types.FieldMetadataType.RELATION,
            relationTargetObjectMetadataId: 'non-existent-object-id'
        });
        const result = (0, _isrelationnestedfielddatekindutil.isRelationNestedFieldDateKind)({
            relationFieldMetadata: relationFieldWithMissingTarget,
            relationNestedFieldName: 'createdAt',
            flatObjectMetadataMaps,
            flatFieldMetadataMaps
        });
        expect(result).toBe(false);
    });
    it('should return false when nested field is not found', ()=>{
        const result = (0, _isrelationnestedfielddatekindutil.isRelationNestedFieldDateKind)({
            relationFieldMetadata: relationField,
            relationNestedFieldName: 'nonExistentField',
            flatObjectMetadataMaps,
            flatFieldMetadataMaps
        });
        expect(result).toBe(false);
    });
    it('should handle composite nested field names', ()=>{
        const result = (0, _isrelationnestedfielddatekindutil.isRelationNestedFieldDateKind)({
            relationFieldMetadata: relationField,
            relationNestedFieldName: 'createdAt.subField',
            flatObjectMetadataMaps,
            flatFieldMetadataMaps
        });
        expect(result).toBe(true);
    });
    it('should return true for DATE type field', ()=>{
        const dateFieldId = 'date-field-id';
        const dateField = createMockFieldMetadata({
            id: dateFieldId,
            name: 'birthDate',
            type: _types.FieldMetadataType.DATE,
            universalIdentifier: 'date-universal-id'
        });
        const objectWithDateField = createMockObjectMetadata({
            id: 'object-with-date-id',
            nameSingular: 'person',
            namePlural: 'people',
            fieldIds: [
                dateFieldId
            ]
        });
        const personRelationField = createMockFieldMetadata({
            name: 'person',
            type: _types.FieldMetadataType.RELATION,
            relationTargetObjectMetadataId: 'object-with-date-id'
        });
        const result = (0, _isrelationnestedfielddatekindutil.isRelationNestedFieldDateKind)({
            relationFieldMetadata: personRelationField,
            relationNestedFieldName: 'birthDate',
            flatObjectMetadataMaps: {
                byUniversalIdentifier: {
                    [objectWithDateField.universalIdentifier]: objectWithDateField
                },
                universalIdentifierById: {
                    'object-with-date-id': objectWithDateField.universalIdentifier
                },
                universalIdentifiersByApplicationId: {}
            },
            flatFieldMetadataMaps: {
                byUniversalIdentifier: {
                    [dateField.universalIdentifier]: dateField
                },
                universalIdentifierById: {
                    [dateFieldId]: dateField.universalIdentifier
                },
                universalIdentifiersByApplicationId: {}
            }
        });
        expect(result).toBe(true);
    });
    it('should return false when relationTargetObjectMetadataId is undefined', ()=>{
        const relationFieldWithoutTarget = createMockFieldMetadata({
            name: 'company',
            type: _types.FieldMetadataType.RELATION,
            relationTargetObjectMetadataId: undefined
        });
        const result = (0, _isrelationnestedfielddatekindutil.isRelationNestedFieldDateKind)({
            relationFieldMetadata: relationFieldWithoutTarget,
            relationNestedFieldName: 'createdAt',
            flatObjectMetadataMaps,
            flatFieldMetadataMaps
        });
        expect(result).toBe(false);
    });
});

//# sourceMappingURL=is-relation-nested-field-date-kind.util.spec.js.map
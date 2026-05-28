"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _getcolumnnametofieldmetadataidutil = require("../get-column-name-to-field-metadata-id.util");
describe('getColumnNameToFieldMetadataIdMap', ()=>{
    const createMockFlatObjectMetadata = (fieldIds)=>({
            id: 'test-object-id',
            nameSingular: 'test',
            namePlural: 'tests',
            labelSingular: 'Test',
            labelPlural: 'Tests',
            icon: 'IconTest',
            color: null,
            targetTableName: 'test',
            isCustom: false,
            isRemote: false,
            isActive: true,
            isSystem: false,
            isAuditLogged: false,
            isSearchable: false,
            workspaceId: 'test-workspace-id',
            universalIdentifier: 'test-object-id',
            indexMetadataIds: [],
            objectPermissionIds: [],
            fieldPermissionIds: [],
            fieldIds,
            viewIds: [],
            applicationId: 'test-application-id',
            isLabelSyncedWithName: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            shortcut: null,
            description: null,
            standardOverrides: null,
            isUIReadOnly: false,
            labelIdentifierFieldMetadataId: null,
            imageIdentifierFieldMetadataId: null,
            duplicateCriteria: null,
            applicationUniversalIdentifier: 'test-application-id',
            fieldUniversalIdentifiers: fieldIds,
            objectPermissionUniversalIdentifiers: [],
            fieldPermissionUniversalIdentifiers: [],
            viewUniversalIdentifiers: [],
            indexMetadataUniversalIdentifiers: [],
            labelIdentifierFieldMetadataUniversalIdentifier: null,
            imageIdentifierFieldMetadataUniversalIdentifier: null
        });
    const createMockFlatFieldMetadata = (id, name, type, settings)=>({
            id,
            name,
            type,
            label: name,
            objectMetadataId: 'test-object-id',
            isLabelSyncedWithName: true,
            isNullable: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            universalIdentifier: id,
            viewFieldIds: [],
            viewFilterIds: [],
            viewGroupIds: [],
            kanbanAggregateOperationViewIds: [],
            calendarViewIds: [],
            applicationId: null,
            ...settings ? {
                settings
            } : {}
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
    describe('with simple field types', ()=>{
        it('should return a map with column name to field metadata id for simple field types', ()=>{
            const fields = [
                createMockFlatFieldMetadata('field-1', 'name', _types.FieldMetadataType.TEXT),
                createMockFlatFieldMetadata('field-2', 'age', _types.FieldMetadataType.NUMBER)
            ];
            const flatObjectMetadata = createMockFlatObjectMetadata(fields.map((f)=>f.id));
            const flatFieldMetadataMaps = buildFlatFieldMetadataMaps(fields);
            const result = (0, _getcolumnnametofieldmetadataidutil.getColumnNameToFieldMetadataIdMap)(flatObjectMetadata, flatFieldMetadataMaps);
            expect(result['name']).toBe('field-1');
            expect(result['age']).toBe('field-2');
            expect(Object.keys(result)).toHaveLength(2);
        });
    });
    describe('with composite field types', ()=>{
        it('should return column names to field metadata id for FULL_NAME composite type', ()=>{
            const fields = [
                createMockFlatFieldMetadata('field-1', 'fullName', _types.FieldMetadataType.FULL_NAME)
            ];
            const flatObjectMetadata = createMockFlatObjectMetadata(fields.map((f)=>f.id));
            const flatFieldMetadataMaps = buildFlatFieldMetadataMaps(fields);
            const result = (0, _getcolumnnametofieldmetadataidutil.getColumnNameToFieldMetadataIdMap)(flatObjectMetadata, flatFieldMetadataMaps);
            expect(result['fullNameFirstName']).toBe('field-1');
            expect(result['fullNameLastName']).toBe('field-1');
            expect(Object.keys(result)).toHaveLength(2);
        });
        it('should return column names to field metadata id for CURRENCY composite type', ()=>{
            const fields = [
                createMockFlatFieldMetadata('field-1', 'price', _types.FieldMetadataType.CURRENCY)
            ];
            const flatObjectMetadata = createMockFlatObjectMetadata(fields.map((f)=>f.id));
            const flatFieldMetadataMaps = buildFlatFieldMetadataMaps(fields);
            const result = (0, _getcolumnnametofieldmetadataidutil.getColumnNameToFieldMetadataIdMap)(flatObjectMetadata, flatFieldMetadataMaps);
            expect(result['priceAmountMicros']).toBe('field-1');
            expect(result['priceCurrencyCode']).toBe('field-1');
            expect(Object.keys(result)).toHaveLength(2);
        });
        it('should handle multiple composite fields', ()=>{
            const fields = [
                createMockFlatFieldMetadata('field-1', 'fullName', _types.FieldMetadataType.FULL_NAME),
                createMockFlatFieldMetadata('field-2', 'price', _types.FieldMetadataType.CURRENCY),
                createMockFlatFieldMetadata('field-3', 'name', _types.FieldMetadataType.TEXT)
            ];
            const flatObjectMetadata = createMockFlatObjectMetadata(fields.map((f)=>f.id));
            const flatFieldMetadataMaps = buildFlatFieldMetadataMaps(fields);
            const result = (0, _getcolumnnametofieldmetadataidutil.getColumnNameToFieldMetadataIdMap)(flatObjectMetadata, flatFieldMetadataMaps);
            expect(result['fullNameFirstName']).toBe('field-1');
            expect(result['fullNameLastName']).toBe('field-1');
            expect(result['priceAmountMicros']).toBe('field-2');
            expect(result['priceCurrencyCode']).toBe('field-2');
            expect(result['name']).toBe('field-3');
            expect(Object.keys(result)).toHaveLength(5);
        });
    });
    describe('with mixed field types', ()=>{
        it('should handle both simple and composite field types', ()=>{
            const fields = [
                createMockFlatFieldMetadata('field-1', 'name', _types.FieldMetadataType.TEXT),
                createMockFlatFieldMetadata('field-2', 'fullName', _types.FieldMetadataType.FULL_NAME),
                createMockFlatFieldMetadata('field-3', 'age', _types.FieldMetadataType.NUMBER),
                createMockFlatFieldMetadata('field-4', 'price', _types.FieldMetadataType.CURRENCY)
            ];
            const flatObjectMetadata = createMockFlatObjectMetadata(fields.map((f)=>f.id));
            const flatFieldMetadataMaps = buildFlatFieldMetadataMaps(fields);
            const result = (0, _getcolumnnametofieldmetadataidutil.getColumnNameToFieldMetadataIdMap)(flatObjectMetadata, flatFieldMetadataMaps);
            expect(result['name']).toBe('field-1');
            expect(result['fullNameFirstName']).toBe('field-2');
            expect(result['fullNameLastName']).toBe('field-2');
            expect(result['age']).toBe('field-3');
            expect(result['priceAmountMicros']).toBe('field-4');
            expect(result['priceCurrencyCode']).toBe('field-4');
            expect(Object.keys(result)).toHaveLength(6);
        });
    });
    describe('with relation field types', ()=>{
        it('should handle relation field types with join column name', ()=>{
            const fields = [
                createMockFlatFieldMetadata('field-1', 'company', _types.FieldMetadataType.RELATION, {
                    relationType: 'ONE_TO_ONE',
                    joinColumnName: 'companyId'
                }),
                createMockFlatFieldMetadata('field-2', 'name', _types.FieldMetadataType.TEXT)
            ];
            const flatObjectMetadata = createMockFlatObjectMetadata(fields.map((f)=>f.id));
            const flatFieldMetadataMaps = buildFlatFieldMetadataMaps(fields);
            const result = (0, _getcolumnnametofieldmetadataidutil.getColumnNameToFieldMetadataIdMap)(flatObjectMetadata, flatFieldMetadataMaps);
            expect(result['companyId']).toBe('field-1');
            expect(result['company']).toBe('field-1');
            expect(result['name']).toBe('field-2');
            expect(Object.keys(result)).toHaveLength(3);
        });
        it('should skip ONE_TO_MANY relation field types', ()=>{
            const fields = [
                createMockFlatFieldMetadata('field-1', 'employees', _types.FieldMetadataType.RELATION, {
                    relationType: 'ONE_TO_MANY',
                    joinColumnName: 'companyId'
                }),
                createMockFlatFieldMetadata('field-2', 'name', _types.FieldMetadataType.TEXT)
            ];
            const flatObjectMetadata = createMockFlatObjectMetadata(fields.map((f)=>f.id));
            const flatFieldMetadataMaps = buildFlatFieldMetadataMaps(fields);
            const result = (0, _getcolumnnametofieldmetadataidutil.getColumnNameToFieldMetadataIdMap)(flatObjectMetadata, flatFieldMetadataMaps);
            expect(result['name']).toBe('field-2');
            expect(result['companyId']).toBeUndefined();
            expect(Object.keys(result)).toHaveLength(1);
        });
    });
});

//# sourceMappingURL=get-column-name-to-field-metadata-id.util.spec.js.map
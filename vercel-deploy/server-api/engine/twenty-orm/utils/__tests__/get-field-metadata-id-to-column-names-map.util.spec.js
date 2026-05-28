"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _getfieldmetadataidtocolumnnamesmaputil = require("../get-field-metadata-id-to-column-names-map.util");
describe('getFieldMetadataIdToColumnNamesMap', ()=>{
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
    const createMockFlatFieldMetadata = (id, name, type)=>({
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
            kanbanAggregateOperationViewIds: [],
            calendarViewIds: [],
            mainGroupByFieldMetadataViewIds: [],
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
    describe('with simple field types', ()=>{
        it('should return a map with single column name for simple field types', ()=>{
            const fields = [
                createMockFlatFieldMetadata('field-1', 'name', _types.FieldMetadataType.TEXT),
                createMockFlatFieldMetadata('field-2', 'age', _types.FieldMetadataType.NUMBER)
            ];
            const flatObjectMetadata = createMockFlatObjectMetadata(fields.map((f)=>f.id));
            const flatFieldMetadataMaps = buildFlatFieldMetadataMaps(fields);
            const result = (0, _getfieldmetadataidtocolumnnamesmaputil.getFieldMetadataIdToColumnNamesMap)(flatObjectMetadata, flatFieldMetadataMaps);
            expect(result.get('field-1')).toEqual([
                'name'
            ]);
            expect(result.get('field-2')).toEqual([
                'age'
            ]);
            expect(result.size).toBe(2);
        });
    });
    describe('with composite field types', ()=>{
        it('should return multiple column names for FULL_NAME composite type', ()=>{
            const fields = [
                createMockFlatFieldMetadata('field-1', 'fullName', _types.FieldMetadataType.FULL_NAME)
            ];
            const flatObjectMetadata = createMockFlatObjectMetadata(fields.map((f)=>f.id));
            const flatFieldMetadataMaps = buildFlatFieldMetadataMaps(fields);
            const result = (0, _getfieldmetadataidtocolumnnamesmaputil.getFieldMetadataIdToColumnNamesMap)(flatObjectMetadata, flatFieldMetadataMaps);
            expect(result.get('field-1')).toEqual([
                'fullNameFirstName',
                'fullNameLastName'
            ]);
            expect(result.size).toBe(1);
        });
        it('should return multiple column names for CURRENCY composite type', ()=>{
            const fields = [
                createMockFlatFieldMetadata('field-1', 'price', _types.FieldMetadataType.CURRENCY)
            ];
            const flatObjectMetadata = createMockFlatObjectMetadata(fields.map((f)=>f.id));
            const flatFieldMetadataMaps = buildFlatFieldMetadataMaps(fields);
            const result = (0, _getfieldmetadataidtocolumnnamesmaputil.getFieldMetadataIdToColumnNamesMap)(flatObjectMetadata, flatFieldMetadataMaps);
            expect(result.get('field-1')).toEqual([
                'priceAmountMicros',
                'priceCurrencyCode'
            ]);
            expect(result.size).toBe(1);
        });
        it('should handle multiple composite fields', ()=>{
            const fields = [
                createMockFlatFieldMetadata('field-1', 'fullName', _types.FieldMetadataType.FULL_NAME),
                createMockFlatFieldMetadata('field-2', 'price', _types.FieldMetadataType.CURRENCY),
                createMockFlatFieldMetadata('field-3', 'name', _types.FieldMetadataType.TEXT)
            ];
            const flatObjectMetadata = createMockFlatObjectMetadata(fields.map((f)=>f.id));
            const flatFieldMetadataMaps = buildFlatFieldMetadataMaps(fields);
            const result = (0, _getfieldmetadataidtocolumnnamesmaputil.getFieldMetadataIdToColumnNamesMap)(flatObjectMetadata, flatFieldMetadataMaps);
            expect(result.get('field-1')).toEqual([
                'fullNameFirstName',
                'fullNameLastName'
            ]);
            expect(result.get('field-2')).toEqual([
                'priceAmountMicros',
                'priceCurrencyCode'
            ]);
            expect(result.get('field-3')).toEqual([
                'name'
            ]);
            expect(result.size).toBe(3);
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
            const result = (0, _getfieldmetadataidtocolumnnamesmaputil.getFieldMetadataIdToColumnNamesMap)(flatObjectMetadata, flatFieldMetadataMaps);
            expect(result.get('field-1')).toEqual([
                'name'
            ]);
            expect(result.get('field-2')).toEqual([
                'fullNameFirstName',
                'fullNameLastName'
            ]);
            expect(result.get('field-3')).toEqual([
                'age'
            ]);
            expect(result.get('field-4')).toEqual([
                'priceAmountMicros',
                'priceCurrencyCode'
            ]);
            expect(result.size).toBe(4);
        });
    });
});

//# sourceMappingURL=get-field-metadata-id-to-column-names-map.util.spec.js.map
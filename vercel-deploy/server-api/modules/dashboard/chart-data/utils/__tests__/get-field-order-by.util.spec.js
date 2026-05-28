"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _getfieldorderbyutil = require("../get-field-order-by.util");
const createMockFieldMetadata = (overrides)=>({
        id: 'test-id',
        name: 'testField',
        type: _types.FieldMetadataType.TEXT,
        universalIdentifier: 'test-universal-id',
        ...overrides
    });
describe('getFieldOrderBy', ()=>{
    describe('composite fields', ()=>{
        it('should return nested object for FULL_NAME field', ()=>{
            const fieldMetadata = createMockFieldMetadata({
                name: 'name',
                type: _types.FieldMetadataType.FULL_NAME
            });
            const result = (0, _getfieldorderbyutil.getFieldOrderBy)(fieldMetadata, 'firstName', undefined, _types.OrderByDirection.AscNullsLast);
            expect(result).toEqual({
                name: {
                    firstName: _types.OrderByDirection.AscNullsLast
                }
            });
        });
        it('should return nested object for ADDRESS field', ()=>{
            const fieldMetadata = createMockFieldMetadata({
                name: 'address',
                type: _types.FieldMetadataType.ADDRESS
            });
            const result = (0, _getfieldorderbyutil.getFieldOrderBy)(fieldMetadata, 'addressCity', undefined, _types.OrderByDirection.DescNullsLast);
            expect(result).toEqual({
                address: {
                    addressCity: _types.OrderByDirection.DescNullsLast
                }
            });
        });
        it('should throw error for composite field without subFieldName', ()=>{
            const fieldMetadata = createMockFieldMetadata({
                name: 'name',
                type: _types.FieldMetadataType.FULL_NAME
            });
            expect(()=>(0, _getfieldorderbyutil.getFieldOrderBy)(fieldMetadata, null, undefined, _types.OrderByDirection.AscNullsLast)).toThrow('Group by subFieldName is required for composite fields (field: name)');
        });
    });
    describe('date fields', ()=>{
        it('should return date order by with default granularity', ()=>{
            const fieldMetadata = createMockFieldMetadata({
                name: 'createdAt',
                type: _types.FieldMetadataType.DATE
            });
            const result = (0, _getfieldorderbyutil.getFieldOrderBy)(fieldMetadata, null, undefined, _types.OrderByDirection.AscNullsLast);
            expect(result).toEqual({
                createdAt: {
                    orderBy: _types.OrderByDirection.AscNullsLast,
                    granularity: _types.ObjectRecordGroupByDateGranularity.DAY
                }
            });
        });
        it('should return date order by with custom granularity', ()=>{
            const fieldMetadata = createMockFieldMetadata({
                name: 'createdAt',
                type: _types.FieldMetadataType.DATE
            });
            const result = (0, _getfieldorderbyutil.getFieldOrderBy)(fieldMetadata, null, _types.ObjectRecordGroupByDateGranularity.MONTH, _types.OrderByDirection.AscNullsLast);
            expect(result).toEqual({
                createdAt: {
                    orderBy: _types.OrderByDirection.AscNullsLast,
                    granularity: _types.ObjectRecordGroupByDateGranularity.MONTH
                }
            });
        });
        it('should handle DATE_TIME field', ()=>{
            const fieldMetadata = createMockFieldMetadata({
                name: 'updatedAt',
                type: _types.FieldMetadataType.DATE_TIME
            });
            const result = (0, _getfieldorderbyutil.getFieldOrderBy)(fieldMetadata, null, _types.ObjectRecordGroupByDateGranularity.YEAR, _types.OrderByDirection.DescNullsLast);
            expect(result).toEqual({
                updatedAt: {
                    orderBy: _types.OrderByDirection.DescNullsLast,
                    granularity: _types.ObjectRecordGroupByDateGranularity.YEAR
                }
            });
        });
    });
    describe('relation fields', ()=>{
        it('should return Id suffix for relation field without subFieldName', ()=>{
            const fieldMetadata = createMockFieldMetadata({
                name: 'company',
                type: _types.FieldMetadataType.RELATION,
                relationTargetObjectMetadataId: 'target-id'
            });
            const result = (0, _getfieldorderbyutil.getFieldOrderBy)(fieldMetadata, null, undefined, _types.OrderByDirection.AscNullsLast);
            expect(result).toEqual({
                companyId: _types.OrderByDirection.AscNullsLast
            });
        });
        it('should return nested object for relation field with subFieldName', ()=>{
            const fieldMetadata = createMockFieldMetadata({
                name: 'company',
                type: _types.FieldMetadataType.RELATION,
                relationTargetObjectMetadataId: 'target-id'
            });
            const result = (0, _getfieldorderbyutil.getFieldOrderBy)(fieldMetadata, 'name', undefined, _types.OrderByDirection.AscNullsLast);
            expect(result).toEqual({
                company: {
                    name: _types.OrderByDirection.AscNullsLast
                }
            });
        });
    });
    describe('scalar fields', ()=>{
        it('should return simple order by for TEXT field', ()=>{
            const fieldMetadata = createMockFieldMetadata({
                name: 'status',
                type: _types.FieldMetadataType.TEXT
            });
            const result = (0, _getfieldorderbyutil.getFieldOrderBy)(fieldMetadata, null, undefined, _types.OrderByDirection.AscNullsLast);
            expect(result).toEqual({
                status: _types.OrderByDirection.AscNullsLast
            });
        });
        it('should return simple order by for SELECT field', ()=>{
            const fieldMetadata = createMockFieldMetadata({
                name: 'priority',
                type: _types.FieldMetadataType.SELECT
            });
            const result = (0, _getfieldorderbyutil.getFieldOrderBy)(fieldMetadata, null, undefined, _types.OrderByDirection.DescNullsLast);
            expect(result).toEqual({
                priority: _types.OrderByDirection.DescNullsLast
            });
        });
        it('should return simple order by for NUMBER field', ()=>{
            const fieldMetadata = createMockFieldMetadata({
                name: 'quantity',
                type: _types.FieldMetadataType.NUMBER
            });
            const result = (0, _getfieldorderbyutil.getFieldOrderBy)(fieldMetadata, null, undefined, _types.OrderByDirection.AscNullsLast);
            expect(result).toEqual({
                quantity: _types.OrderByDirection.AscNullsLast
            });
        });
        it('should return simple order by for BOOLEAN field', ()=>{
            const fieldMetadata = createMockFieldMetadata({
                name: 'isActive',
                type: _types.FieldMetadataType.BOOLEAN
            });
            const result = (0, _getfieldorderbyutil.getFieldOrderBy)(fieldMetadata, null, undefined, _types.OrderByDirection.AscNullsLast);
            expect(result).toEqual({
                isActive: _types.OrderByDirection.AscNullsLast
            });
        });
    });
});

//# sourceMappingURL=get-field-order-by.util.spec.js.map
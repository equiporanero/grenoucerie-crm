"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _getrelationfieldorderbyutil = require("../get-relation-field-order-by.util");
const createMockFieldMetadata = (overrides)=>({
        id: 'test-id',
        name: 'testField',
        type: _types.FieldMetadataType.RELATION,
        universalIdentifier: 'test-universal-id',
        ...overrides
    });
describe('getRelationFieldOrderBy', ()=>{
    const relationFieldMetadata = createMockFieldMetadata({
        name: 'company',
        type: _types.FieldMetadataType.RELATION,
        relationTargetObjectMetadataId: 'target-id'
    });
    describe('without subFieldName', ()=>{
        it('should return Id suffix for relation field', ()=>{
            const result = (0, _getrelationfieldorderbyutil.getRelationFieldOrderBy)(relationFieldMetadata, null, _types.OrderByDirection.AscNullsLast);
            expect(result).toEqual({
                companyId: _types.OrderByDirection.AscNullsLast
            });
        });
        it('should return Id suffix for undefined subFieldName', ()=>{
            const result = (0, _getrelationfieldorderbyutil.getRelationFieldOrderBy)(relationFieldMetadata, undefined, _types.OrderByDirection.DescNullsLast);
            expect(result).toEqual({
                companyId: _types.OrderByDirection.DescNullsLast
            });
        });
    });
    describe('with simple subFieldName', ()=>{
        it('should return nested object for simple subfield', ()=>{
            const result = (0, _getrelationfieldorderbyutil.getRelationFieldOrderBy)(relationFieldMetadata, 'name', _types.OrderByDirection.AscNullsLast);
            expect(result).toEqual({
                company: {
                    name: _types.OrderByDirection.AscNullsLast
                }
            });
        });
        it('should handle descending direction', ()=>{
            const result = (0, _getrelationfieldorderbyutil.getRelationFieldOrderBy)(relationFieldMetadata, 'name', _types.OrderByDirection.DescNullsLast);
            expect(result).toEqual({
                company: {
                    name: _types.OrderByDirection.DescNullsLast
                }
            });
        });
    });
    describe('with composite subFieldName', ()=>{
        it('should return deeply nested object for composite subfield', ()=>{
            const result = (0, _getrelationfieldorderbyutil.getRelationFieldOrderBy)(relationFieldMetadata, 'address.addressCity', _types.OrderByDirection.AscNullsLast);
            expect(result).toEqual({
                company: {
                    address: {
                        addressCity: _types.OrderByDirection.AscNullsLast
                    }
                }
            });
        });
    });
    describe('with date granularity', ()=>{
        it('should return date order by with granularity', ()=>{
            const result = (0, _getrelationfieldorderbyutil.getRelationFieldOrderBy)(relationFieldMetadata, 'createdAt', _types.OrderByDirection.AscNullsLast, _types.ObjectRecordGroupByDateGranularity.MONTH, true);
            expect(result).toEqual({
                company: {
                    createdAt: {
                        orderBy: _types.OrderByDirection.AscNullsLast,
                        granularity: _types.ObjectRecordGroupByDateGranularity.MONTH
                    }
                }
            });
        });
        it('should use default granularity when isNestedDateField is true but granularity not provided', ()=>{
            const result = (0, _getrelationfieldorderbyutil.getRelationFieldOrderBy)(relationFieldMetadata, 'createdAt', _types.OrderByDirection.AscNullsLast, undefined, true);
            expect(result).toEqual({
                company: {
                    createdAt: {
                        orderBy: _types.OrderByDirection.AscNullsLast,
                        granularity: _types.ObjectRecordGroupByDateGranularity.DAY
                    }
                }
            });
        });
        it('should return date order by when dateGranularity is provided', ()=>{
            const result = (0, _getrelationfieldorderbyutil.getRelationFieldOrderBy)(relationFieldMetadata, 'createdAt', _types.OrderByDirection.DescNullsLast, _types.ObjectRecordGroupByDateGranularity.YEAR);
            expect(result).toEqual({
                company: {
                    createdAt: {
                        orderBy: _types.OrderByDirection.DescNullsLast,
                        granularity: _types.ObjectRecordGroupByDateGranularity.YEAR
                    }
                }
            });
        });
    });
});

//# sourceMappingURL=get-relation-field-order-by.util.spec.js.map
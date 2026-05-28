"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _buildorderbycolumnexpressionutil = require("../utils/build-order-by-column-expression.util");
describe('buildOrderByColumnExpression', ()=>{
    describe('returns unquoted column expressions for TypeORM', ()=>{
        it('should return unquoted alias.column format', ()=>{
            const result = (0, _buildorderbycolumnexpressionutil.buildOrderByColumnExpression)('company', 'name');
            expect(result).toBe('company.name');
        });
        it('should work with different prefixes', ()=>{
            const result = (0, _buildorderbycolumnexpressionutil.buildOrderByColumnExpression)('assignee', 'email');
            expect(result).toBe('assignee.email');
        });
        it('should handle composite column names (e.g., nameFirstName)', ()=>{
            const result = (0, _buildorderbycolumnexpressionutil.buildOrderByColumnExpression)('person', 'nameFirstName');
            expect(result).toBe('person.nameFirstName');
        });
    });
});
describe('shouldUseCaseInsensitiveOrder', ()=>{
    it('should return true for TEXT fields', ()=>{
        expect((0, _buildorderbycolumnexpressionutil.shouldUseCaseInsensitiveOrder)(_types.FieldMetadataType.TEXT)).toBe(true);
    });
    it('should return true for SELECT fields', ()=>{
        expect((0, _buildorderbycolumnexpressionutil.shouldUseCaseInsensitiveOrder)(_types.FieldMetadataType.SELECT)).toBe(true);
    });
    it('should return true for MULTI_SELECT fields', ()=>{
        expect((0, _buildorderbycolumnexpressionutil.shouldUseCaseInsensitiveOrder)(_types.FieldMetadataType.MULTI_SELECT)).toBe(true);
    });
    it('should return false for NUMBER fields', ()=>{
        expect((0, _buildorderbycolumnexpressionutil.shouldUseCaseInsensitiveOrder)(_types.FieldMetadataType.NUMBER)).toBe(false);
    });
    it('should return false for DATE_TIME fields', ()=>{
        expect((0, _buildorderbycolumnexpressionutil.shouldUseCaseInsensitiveOrder)(_types.FieldMetadataType.DATE_TIME)).toBe(false);
    });
    it('should return false for UUID fields', ()=>{
        expect((0, _buildorderbycolumnexpressionutil.shouldUseCaseInsensitiveOrder)(_types.FieldMetadataType.UUID)).toBe(false);
    });
    it('should return false for BOOLEAN fields', ()=>{
        expect((0, _buildorderbycolumnexpressionutil.shouldUseCaseInsensitiveOrder)(_types.FieldMetadataType.BOOLEAN)).toBe(false);
    });
});
describe('shouldCastToText', ()=>{
    it('should return true for SELECT fields', ()=>{
        expect((0, _buildorderbycolumnexpressionutil.shouldCastToText)(_types.FieldMetadataType.SELECT)).toBe(true);
    });
    it('should return true for MULTI_SELECT fields', ()=>{
        expect((0, _buildorderbycolumnexpressionutil.shouldCastToText)(_types.FieldMetadataType.MULTI_SELECT)).toBe(true);
    });
    it('should return false for TEXT fields', ()=>{
        expect((0, _buildorderbycolumnexpressionutil.shouldCastToText)(_types.FieldMetadataType.TEXT)).toBe(false);
    });
    it('should return false for NUMBER fields', ()=>{
        expect((0, _buildorderbycolumnexpressionutil.shouldCastToText)(_types.FieldMetadataType.NUMBER)).toBe(false);
    });
    it('should return false for DATE_TIME fields', ()=>{
        expect((0, _buildorderbycolumnexpressionutil.shouldCastToText)(_types.FieldMetadataType.DATE_TIME)).toBe(false);
    });
});

//# sourceMappingURL=build-order-by-key.spec.js.map
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _getoperatorsforfieldtypeutil = require("../get-operators-for-field-type.util");
describe('getOperatorsForFieldType', ()=>{
    it('should return STRING_FILTER_OPERATORS for TEXT', ()=>{
        const result = (0, _getoperatorsforfieldtypeutil.getOperatorsForFieldType)(_types.FieldMetadataType.TEXT);
        expect(result).toContain('eq');
        expect(result).toContain('like');
        expect(result).toContain('startsWith');
    });
    it('should return NUMBER_FILTER_OPERATORS for NUMBER', ()=>{
        const result = (0, _getoperatorsforfieldtypeutil.getOperatorsForFieldType)(_types.FieldMetadataType.NUMBER);
        expect(result).toContain('eq');
        expect(result).toContain('gt');
        expect(result).toContain('in');
    });
    it('should return BOOLEAN_FILTER_OPERATORS for BOOLEAN', ()=>{
        const result = (0, _getoperatorsforfieldtypeutil.getOperatorsForFieldType)(_types.FieldMetadataType.BOOLEAN);
        expect(result).toEqual([
            'eq',
            'is'
        ]);
    });
    it('should return ARRAY_FILTER_OPERATORS for ARRAY', ()=>{
        const result = (0, _getoperatorsforfieldtypeutil.getOperatorsForFieldType)(_types.FieldMetadataType.ARRAY);
        expect(result).toContain('containsIlike');
        expect(result).toContain('isEmptyArray');
    });
});

//# sourceMappingURL=get-operators-for-field-type.util.spec.js.map
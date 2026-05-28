"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _getdefaultviewfilteroperandutil = require("../get-default-view-filter-operand.util");
describe('getDefaultViewFilterOperand', ()=>{
    it('should default select filters to IS', ()=>{
        expect((0, _getdefaultviewfilteroperandutil.getDefaultViewFilterOperand)({
            fieldType: _types.FieldMetadataType.SELECT
        })).toBe(_types.ViewFilterOperand.IS);
    });
    it('should default relation filters without a target field to IS', ()=>{
        expect((0, _getdefaultviewfilteroperandutil.getDefaultViewFilterOperand)({
            fieldType: _types.FieldMetadataType.RELATION
        })).toBe(_types.ViewFilterOperand.IS);
    });
    it('should default relation traversal filters from the target field type', ()=>{
        expect((0, _getdefaultviewfilteroperandutil.getDefaultViewFilterOperand)({
            fieldType: _types.FieldMetadataType.RELATION,
            relationTargetFieldType: _types.FieldMetadataType.TEXT
        })).toBe(_types.ViewFilterOperand.CONTAINS);
    });
});

//# sourceMappingURL=get-default-view-filter-operand.spec.js.map
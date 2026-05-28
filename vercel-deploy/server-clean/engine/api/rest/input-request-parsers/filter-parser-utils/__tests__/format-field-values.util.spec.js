"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _formatfieldvaluesutil = require("../format-field-values.util");
describe('formatFieldValue', ()=>{
    it('should format fieldNumber value', ()=>{
        expect((0, _formatfieldvaluesutil.formatFieldValue)('1', _types.FieldMetadataType.NUMBER)).toEqual(1);
        expect((0, _formatfieldvaluesutil.formatFieldValue)('a', _types.FieldMetadataType.NUMBER)).toEqual(NaN);
        expect((0, _formatfieldvaluesutil.formatFieldValue)('true', _types.FieldMetadataType.BOOLEAN)).toEqual(true);
        expect((0, _formatfieldvaluesutil.formatFieldValue)('True', _types.FieldMetadataType.BOOLEAN)).toEqual(true);
        expect((0, _formatfieldvaluesutil.formatFieldValue)('false', _types.FieldMetadataType.BOOLEAN)).toEqual(false);
        expect((0, _formatfieldvaluesutil.formatFieldValue)('value', _types.FieldMetadataType.TEXT)).toEqual('value');
        expect((0, _formatfieldvaluesutil.formatFieldValue)('"value"', _types.FieldMetadataType.TEXT)).toEqual('value');
        expect((0, _formatfieldvaluesutil.formatFieldValue)("'value'", _types.FieldMetadataType.TEXT)).toEqual('value');
        expect((0, _formatfieldvaluesutil.formatFieldValue)('value', _types.FieldMetadataType.DATE_TIME)).toEqual('value');
        expect((0, _formatfieldvaluesutil.formatFieldValue)('"value"', _types.FieldMetadataType.DATE_TIME)).toEqual('value');
        expect((0, _formatfieldvaluesutil.formatFieldValue)("'value'", _types.FieldMetadataType.DATE_TIME)).toEqual('value');
        expect((0, _formatfieldvaluesutil.formatFieldValue)('["2023-12-01T14:23:23.914Z","2024-12-01T14:23:23.914Z"]', undefined, 'in')).toEqual([
            '2023-12-01T14:23:23.914Z',
            '2024-12-01T14:23:23.914Z'
        ]);
        expect((0, _formatfieldvaluesutil.formatFieldValue)('[1,2]', _types.FieldMetadataType.NUMBER, 'in')).toEqual([
            1,
            2
        ]);
        expect(()=>(0, _formatfieldvaluesutil.formatFieldValue)('2024-12-01T14:23:23.914Z', undefined, 'in')).toThrow("'filter' invalid for 'in' operator. Received '2024-12-01T14:23:23.914Z' but array value expected eg: 'field[in]:[value_1,value_2]'");
        expect((0, _formatfieldvaluesutil.formatFieldValue)('["2023-12-01T14:23:23.914Z","2024-12-01T14:23:23.914Z"]', undefined, 'containsAny')).toEqual([
            '2023-12-01T14:23:23.914Z',
            '2024-12-01T14:23:23.914Z'
        ]);
        expect((0, _formatfieldvaluesutil.formatFieldValue)('[1,2]', _types.FieldMetadataType.NUMBER, 'containsAny')).toEqual([
            1,
            2
        ]);
        expect(()=>(0, _formatfieldvaluesutil.formatFieldValue)('2024-12-01T14:23:23.914Z', undefined, 'containsAny')).toThrow("'filter' invalid for 'containsAny' operator. Received '2024-12-01T14:23:23.914Z' but array value expected eg: 'field[containsAny]:[value_1,value_2]'");
    });
});

//# sourceMappingURL=format-field-values.util.spec.js.map
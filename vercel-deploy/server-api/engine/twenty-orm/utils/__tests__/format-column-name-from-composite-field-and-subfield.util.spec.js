"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _formatcolumnnamesfromcompositefieldandsubfieldutil = require("../format-column-names-from-composite-field-and-subfield.util");
describe('formatColumnNamesFromCompositeFieldAndSubfields', ()=>{
    it('should return fieldName when subFieldName is not defined', ()=>{
        const result = (0, _formatcolumnnamesfromcompositefieldandsubfieldutil.formatColumnNamesFromCompositeFieldAndSubfields)('firstName');
        expect(result).toEqual([
            'firstName'
        ]);
    });
    it('should return concatenated fieldName and capitalized subFieldName when subFieldName is defined', ()=>{
        const result = (0, _formatcolumnnamesfromcompositefieldandsubfieldutil.formatColumnNamesFromCompositeFieldAndSubfields)('user', [
            'firstName',
            'lastName'
        ]);
        expect(result).toEqual([
            'userFirstName',
            'userLastName'
        ]);
    });
});

//# sourceMappingURL=format-column-name-from-composite-field-and-subfield.util.spec.js.map
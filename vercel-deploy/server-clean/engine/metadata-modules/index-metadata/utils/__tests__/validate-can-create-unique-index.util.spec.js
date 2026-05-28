"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _fieldmetadataexception = require("../../../field-metadata/field-metadata.exception");
const _validatecancreateuniqueindexutil = require("../validate-can-create-unique-index.util");
describe('validateCanCreateUniqueIndex', ()=>{
    it('should throw an error if field to create is a MORPH type', ()=>{
        const field = {
            name: 'testField',
            type: _types.FieldMetadataType.MORPH_RELATION
        };
        expect(()=>(0, _validatecancreateuniqueindexutil.validateCanCreateUniqueIndex)(field)).toThrow(_fieldmetadataexception.FieldMetadataException);
        expect(()=>(0, _validatecancreateuniqueindexutil.validateCanCreateUniqueIndex)(field)).toThrow('Unique index cannot be created for field testField of type MORPH_RELATION');
    });
    it('should throw an error if field to create is a RELATION type - ONE_TO_MANY', ()=>{
        const field = {
            name: 'testField',
            type: _types.FieldMetadataType.RELATION
        };
        expect(()=>(0, _validatecancreateuniqueindexutil.validateCanCreateUniqueIndex)(field)).toThrow(_fieldmetadataexception.FieldMetadataException);
        expect(()=>(0, _validatecancreateuniqueindexutil.validateCanCreateUniqueIndex)(field)).toThrow('Unique index cannot be created for field testField of type RELATION');
    });
    it('should throw an error if field to create is a FULL_NAME type', ()=>{
        const field = {
            name: 'testField',
            type: _types.FieldMetadataType.FULL_NAME
        };
        expect(()=>(0, _validatecancreateuniqueindexutil.validateCanCreateUniqueIndex)(field)).toThrow(_fieldmetadataexception.FieldMetadataException);
        expect(()=>(0, _validatecancreateuniqueindexutil.validateCanCreateUniqueIndex)(field)).toThrow('Unique index cannot be created for field testField of type FULL_NAME');
    });
    it('should throw an error if field to create is an ADDRESS type', ()=>{
        const field = {
            name: 'testField',
            type: _types.FieldMetadataType.ADDRESS
        };
        expect(()=>(0, _validatecancreateuniqueindexutil.validateCanCreateUniqueIndex)(field)).toThrow(_fieldmetadataexception.FieldMetadataException);
        expect(()=>(0, _validatecancreateuniqueindexutil.validateCanCreateUniqueIndex)(field)).toThrow('Unique index cannot be created for field testField of type ADDRESS');
    });
});

//# sourceMappingURL=validate-can-create-unique-index.util.spec.js.map
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _validateoperatorforfieldtypeorthrowutil = require("../validate-operator-for-field-type-or-throw.util");
const _commonqueryrunnerexception = require("../../../../common-query-runners/errors/common-query-runner.exception");
const createFieldMetadata = (type)=>({
        type,
        name: 'testField'
    });
describe('validateOperatorForFieldTypeOrThrow', ()=>{
    it('should not throw when operator is valid for TEXT field', ()=>{
        const fieldMetadata = createFieldMetadata(_types.FieldMetadataType.TEXT);
        expect(()=>(0, _validateoperatorforfieldtypeorthrowutil.validateOperatorForFieldTypeOrThrow)('eq', fieldMetadata, 'testField')).not.toThrow();
    });
    it('should throw when operator is invalid for TEXT field', ()=>{
        const fieldMetadata = createFieldMetadata(_types.FieldMetadataType.TEXT);
        expect(()=>(0, _validateoperatorforfieldtypeorthrowutil.validateOperatorForFieldTypeOrThrow)('invalidOperator', fieldMetadata, 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
    });
    it('should not throw when eq is valid for BOOLEAN field', ()=>{
        const fieldMetadata = createFieldMetadata(_types.FieldMetadataType.BOOLEAN);
        expect(()=>(0, _validateoperatorforfieldtypeorthrowutil.validateOperatorForFieldTypeOrThrow)('eq', fieldMetadata, 'testField')).not.toThrow();
    });
    it('should throw when like is invalid for BOOLEAN field', ()=>{
        const fieldMetadata = createFieldMetadata(_types.FieldMetadataType.BOOLEAN);
        expect(()=>(0, _validateoperatorforfieldtypeorthrowutil.validateOperatorForFieldTypeOrThrow)('like', fieldMetadata, 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
    });
});

//# sourceMappingURL=validate-operator-for-field-type-or-throw.util.spec.js.map
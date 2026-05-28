"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _validateandtransformoperatorandvalueutil = require("../validate-and-transform-operator-and-value.util");
const _commonqueryrunnerexception = require("../../../../common-query-runners/errors/common-query-runner.exception");
const createFieldMetadata = (type)=>({
        type,
        name: 'testField'
    });
describe('validateAndTransformOperatorAndValue', ()=>{
    it('should validate and transform single operator filter', ()=>{
        const fieldMetadata = createFieldMetadata(_types.FieldMetadataType.TEXT);
        const result = (0, _validateandtransformoperatorandvalueutil.validateAndTransformOperatorAndValue)('testField', {
            eq: 'hello'
        }, fieldMetadata);
        expect(result).toEqual({
            eq: 'hello'
        });
    });
    it('should throw when filter value is null', ()=>{
        const fieldMetadata = createFieldMetadata(_types.FieldMetadataType.TEXT);
        expect(()=>(0, _validateandtransformoperatorandvalueutil.validateAndTransformOperatorAndValue)('testField', null, fieldMetadata)).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
    });
    it('should throw when filter has no operators', ()=>{
        const fieldMetadata = createFieldMetadata(_types.FieldMetadataType.TEXT);
        expect(()=>(0, _validateandtransformoperatorandvalueutil.validateAndTransformOperatorAndValue)('testField', {}, fieldMetadata)).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
    });
});

//# sourceMappingURL=validate-and-transform-operator-and-value.util.spec.js.map
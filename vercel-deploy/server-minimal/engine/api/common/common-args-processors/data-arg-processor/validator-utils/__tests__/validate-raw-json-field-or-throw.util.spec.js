"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _validaterawjsonfieldorthrowutil = require("../validate-raw-json-field-or-throw.util");
const _commonqueryrunnerexception = require("../../../../common-query-runners/errors/common-query-runner.exception");
describe('validateRawJsonFieldOrThrow', ()=>{
    describe('valid inputs', ()=>{
        it('should return null when value is null', ()=>{
            const result = (0, _validaterawjsonfieldorthrowutil.validateRawJsonFieldOrThrow)(null, 'testField');
            expect(result).toBeNull();
        });
        it('should return empty object when value is an empty object', ()=>{
            const result = (0, _validaterawjsonfieldorthrowutil.validateRawJsonFieldOrThrow)({}, 'testField');
            expect(result).toEqual({});
        });
        it('should return the value when it is a valid JSON object', ()=>{
            const jsonObject = {
                key: 'value',
                nested: {
                    prop: 123
                }
            };
            const result = (0, _validaterawjsonfieldorthrowutil.validateRawJsonFieldOrThrow)(jsonObject, 'testField');
            expect(result).toEqual(jsonObject);
        });
        it('should return the value when it is a valid JSON array', ()=>{
            const jsonArray = [
                1,
                2,
                3,
                'test',
                {
                    key: 'value'
                }
            ];
            const result = (0, _validaterawjsonfieldorthrowutil.validateRawJsonFieldOrThrow)(jsonArray, 'testField');
            expect(result).toEqual(jsonArray);
        });
        it('should accept a valid JSON string', ()=>{
            const jsonString = '{"key":"value","nested":{"prop":123}}';
            const result = (0, _validaterawjsonfieldorthrowutil.validateRawJsonFieldOrThrow)(jsonString, 'testField');
            expect(result).toBe(jsonString);
        });
        it('should accept a valid JSON array string', ()=>{
            const jsonArrayString = '[1, 2, 3, "test"]';
            const result = (0, _validaterawjsonfieldorthrowutil.validateRawJsonFieldOrThrow)(jsonArrayString, 'testField');
            expect(result).toBe(jsonArrayString);
        });
    });
    describe('invalid inputs', ()=>{
        it('should throw when value is undefined', ()=>{
            expect(()=>(0, _validaterawjsonfieldorthrowutil.validateRawJsonFieldOrThrow)(undefined, 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when value is a function', ()=>{
            const functionValue = ()=>'test';
            expect(()=>(0, _validaterawjsonfieldorthrowutil.validateRawJsonFieldOrThrow)(functionValue, 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when value is a number', ()=>{
            expect(()=>(0, _validaterawjsonfieldorthrowutil.validateRawJsonFieldOrThrow)(42, 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when value is an invalid JSON string', ()=>{
            expect(()=>(0, _validaterawjsonfieldorthrowutil.validateRawJsonFieldOrThrow)('not valid json', 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when value is a boolean', ()=>{
            expect(()=>(0, _validaterawjsonfieldorthrowutil.validateRawJsonFieldOrThrow)(true, 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
    });
});

//# sourceMappingURL=validate-raw-json-field-or-throw.util.spec.js.map
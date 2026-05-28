"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _validatearrayfieldorthrowutil = require("../validate-array-field-or-throw.util");
const _commonqueryrunnerexception = require("../../../../common-query-runners/errors/common-query-runner.exception");
describe('validateArrayFieldOrThrow', ()=>{
    describe('valid inputs', ()=>{
        it('should return null when value is null', ()=>{
            const result = (0, _validatearrayfieldorthrowutil.validateArrayFieldOrThrow)(null, 'testField');
            expect(result).toBeNull();
        });
        it('should return the string when value is a string', ()=>{
            const result = (0, _validatearrayfieldorthrowutil.validateArrayFieldOrThrow)('singleString', 'testField');
            expect(result).toBe('singleString');
        });
        it('should return the array when value is an empty array', ()=>{
            const result = (0, _validatearrayfieldorthrowutil.validateArrayFieldOrThrow)([], 'testField');
            expect(result).toEqual([]);
        });
        it('should return the array when value is an array of strings', ()=>{
            const stringArray = [
                'string1',
                'string2',
                'string3'
            ];
            const result = (0, _validatearrayfieldorthrowutil.validateArrayFieldOrThrow)(stringArray, 'testField');
            expect(result).toEqual(stringArray);
        });
    });
    describe('invalid inputs', ()=>{
        it('should throw when value is a number', ()=>{
            expect(()=>(0, _validatearrayfieldorthrowutil.validateArrayFieldOrThrow)(123, 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when value is an object', ()=>{
            const objectValue = {
                key: 'value'
            };
            expect(()=>(0, _validatearrayfieldorthrowutil.validateArrayFieldOrThrow)(objectValue, 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when value is an array containing objects', ()=>{
            const arrayWithObjects = [
                'string1',
                {
                    key: 'value'
                },
                'string2'
            ];
            expect(()=>(0, _validatearrayfieldorthrowutil.validateArrayFieldOrThrow)(arrayWithObjects, 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
    });
});

//# sourceMappingURL=validate-array-field-or-throw.util.spec.js.map
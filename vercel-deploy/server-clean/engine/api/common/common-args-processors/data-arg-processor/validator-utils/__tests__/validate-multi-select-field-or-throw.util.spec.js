"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _validatemultiselectfieldorthrowutil = require("../validate-multi-select-field-or-throw.util");
const _commonqueryrunnerexception = require("../../../../common-query-runners/errors/common-query-runner.exception");
describe('validateMultiSelectFieldOrThrow', ()=>{
    const validOptions = [
        'option1',
        'option2',
        'option3'
    ];
    describe('valid inputs', ()=>{
        it('should return null when value is null', ()=>{
            const result = (0, _validatemultiselectfieldorthrowutil.validateMultiSelectFieldOrThrow)(null, 'testField', validOptions);
            expect(result).toBeNull();
        });
        it('should return array when all values are in options', ()=>{
            const value = [
                'option1',
                'option2'
            ];
            const result = (0, _validatemultiselectfieldorthrowutil.validateMultiSelectFieldOrThrow)(value, 'testField', validOptions);
            expect(result).toEqual(value);
        });
        it('should return string when value is a single string in options', ()=>{
            const value = 'option1';
            const result = (0, _validatemultiselectfieldorthrowutil.validateMultiSelectFieldOrThrow)(value, 'testField', validOptions);
            expect(result).toEqual(value);
        });
        it('should return empty array when value is empty array', ()=>{
            const value = [];
            const result = (0, _validatemultiselectfieldorthrowutil.validateMultiSelectFieldOrThrow)(value, 'testField', validOptions);
            expect(result).toEqual(value);
        });
    });
    describe('invalid inputs', ()=>{
        it('should throw when options are undefined', ()=>{
            expect(()=>(0, _validatemultiselectfieldorthrowutil.validateMultiSelectFieldOrThrow)([
                    'option1'
                ], 'testField', undefined)).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when options are not defined', ()=>{
            expect(()=>(0, _validatemultiselectfieldorthrowutil.validateMultiSelectFieldOrThrow)([
                    'option1'
                ], 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when value contains option not in the options list', ()=>{
            const value = [
                'option1',
                'invalidOption'
            ];
            expect(()=>(0, _validatemultiselectfieldorthrowutil.validateMultiSelectFieldOrThrow)(value, 'testField', validOptions)).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
    });
});

//# sourceMappingURL=validate-multi-select-field-or-throw.util.spec.js.map
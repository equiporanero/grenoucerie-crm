"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _validateuuidfieldorthrowutil = require("../validate-uuid-field-or-throw.util");
const _commonqueryrunnerexception = require("../../../../common-query-runners/errors/common-query-runner.exception");
describe('validateUUIDFieldOrThrow', ()=>{
    describe('valid inputs', ()=>{
        it('should return null when value is null', ()=>{
            const result = (0, _validateuuidfieldorthrowutil.validateUUIDFieldOrThrow)(null, 'testField');
            expect(result).toBeNull();
        });
        it('should return the value when it is a valid UUID v4', ()=>{
            const validUuid = '550e8400-e29b-41d4-a716-446655440000';
            const result = (0, _validateuuidfieldorthrowutil.validateUUIDFieldOrThrow)(validUuid, 'testField');
            expect(result).toBe(validUuid);
        });
    });
    describe('invalid inputs', ()=>{
        it('should throw when value is undefined', ()=>{
            expect(()=>(0, _validateuuidfieldorthrowutil.validateUUIDFieldOrThrow)(undefined, 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when value is an empty string', ()=>{
            expect(()=>(0, _validateuuidfieldorthrowutil.validateUUIDFieldOrThrow)('', 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when value is an invalid UUID format', ()=>{
            expect(()=>(0, _validateuuidfieldorthrowutil.validateUUIDFieldOrThrow)('invalid-uuid', 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
    });
});

//# sourceMappingURL=validate-uuid-field-or-throw.util.spec.js.map
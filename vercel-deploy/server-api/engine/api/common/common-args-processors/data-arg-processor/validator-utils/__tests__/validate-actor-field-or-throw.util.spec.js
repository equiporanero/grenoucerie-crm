"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _validateactorfieldorthrowutil = require("../validate-actor-field-or-throw.util");
const _commonqueryrunnerexception = require("../../../../common-query-runners/errors/common-query-runner.exception");
describe('validateActorFieldOrThrow', ()=>{
    describe('valid inputs', ()=>{
        it('should return null when value is null', ()=>{
            const result = (0, _validateactorfieldorthrowutil.validateActorFieldOrThrow)(null, 'testField');
            expect(result).toBeNull();
        });
        it('should return valid actor object with source and context', ()=>{
            const validActor = {
                source: _types.FieldActorSource.EMAIL,
                context: {
                    userId: '123',
                    email: 'test@example.com'
                }
            };
            const result = (0, _validateactorfieldorthrowutil.validateActorFieldOrThrow)(validActor, 'testField');
            expect(result).toEqual(validActor);
        });
        it('should accept empty context object', ()=>{
            const validActor = {
                source: _types.FieldActorSource.EMAIL,
                context: {}
            };
            const result = (0, _validateactorfieldorthrowutil.validateActorFieldOrThrow)(validActor, 'testField');
            expect(result).toEqual(validActor);
        });
    });
    describe('invalid inputs', ()=>{
        it('should throw when value is undefined', ()=>{
            expect(()=>(0, _validateactorfieldorthrowutil.validateActorFieldOrThrow)(undefined, 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when value is a string', ()=>{
            expect(()=>(0, _validateactorfieldorthrowutil.validateActorFieldOrThrow)('invalid', 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when source is invalid', ()=>{
            const invalidActor = {
                source: 'INVALID_SOURCE',
                context: {}
            };
            expect(()=>(0, _validateactorfieldorthrowutil.validateActorFieldOrThrow)(invalidActor, 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when context is a string', ()=>{
            const invalidActor = {
                source: _types.FieldActorSource.EMAIL,
                context: 'invalid'
            };
            expect(()=>(0, _validateactorfieldorthrowutil.validateActorFieldOrThrow)(invalidActor, 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when actor has invalid subfield', ()=>{
            const invalidActor = {
                source: _types.FieldActorSource.EMAIL,
                context: {},
                invalidField: 'invalid'
            };
            expect(()=>(0, _validateactorfieldorthrowutil.validateActorFieldOrThrow)(invalidActor, 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
    });
});

//# sourceMappingURL=validate-actor-field-or-throw.util.spec.js.map
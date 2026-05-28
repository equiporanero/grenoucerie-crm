"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _transformactorfieldutil = require("../transform-actor-field.util");
describe('transformActorField', ()=>{
    it('should return null when value is null', ()=>{
        const result = (0, _transformactorfieldutil.transformActorField)(null);
        expect(result).toBeNull();
    });
    it('should transform actor with source only', ()=>{
        const result = (0, _transformactorfieldutil.transformActorField)({
            source: _types.FieldActorSource.EMAIL
        });
        expect(result).toEqual({
            source: _types.FieldActorSource.EMAIL
        });
    });
    it('should transform actor with source and context', ()=>{
        const result = (0, _transformactorfieldutil.transformActorField)({
            source: _types.FieldActorSource.WORKFLOW,
            context: {
                workflowId: '123',
                stepId: 'step-1'
            }
        });
        expect(result).toEqual({
            source: _types.FieldActorSource.WORKFLOW,
            context: {
                workflowId: '123',
                stepId: 'step-1'
            }
        });
    });
    it('should transform actor with null source', ()=>{
        const result = (0, _transformactorfieldutil.transformActorField)({
            source: null,
            context: {
                userId: '456'
            }
        });
        expect(result).toEqual({
            source: null,
            context: {
                userId: '456'
            }
        });
    });
    it('should transform actor with null context', ()=>{
        const result = (0, _transformactorfieldutil.transformActorField)({
            source: _types.FieldActorSource.API,
            context: null
        });
        expect(result).toEqual({
            source: _types.FieldActorSource.API,
            context: null
        });
    });
    it('should transform empty context object to null', ()=>{
        const result = (0, _transformactorfieldutil.transformActorField)({
            source: _types.FieldActorSource.EMAIL,
            context: {}
        });
        expect(result).toEqual({
            source: _types.FieldActorSource.EMAIL,
            context: null
        });
    });
});

//# sourceMappingURL=transform-actor-field.util.spec.js.map
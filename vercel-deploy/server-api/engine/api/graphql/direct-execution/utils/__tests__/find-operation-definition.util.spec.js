"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _graphql = require("graphql");
const _findoperationdefinitionutil = require("../find-operation-definition.util");
describe('findOperationDefinition', ()=>{
    it('should return the single operation when no operationName is given', ()=>{
        const document = (0, _graphql.parse)('query { findManyCompanies { id } }');
        const result = (0, _findoperationdefinitionutil.findOperationDefinition)(document, undefined);
        expect(result).toBeDefined();
        expect(result?.name).toBeUndefined();
        expect(result?.operation).toBe('query');
    });
    it('should throw when multiple operations exist and no operationName is given', ()=>{
        const document = (0, _graphql.parse)(`
      query First { findManyCompanies { id } }
      query Second { findManyPeople { id } }
    `);
        expect(()=>(0, _findoperationdefinitionutil.findOperationDefinition)(document, undefined)).toThrow('Must provide operation name when document contains multiple operations.');
    });
    it('should return the named operation when operationName matches', ()=>{
        const document = (0, _graphql.parse)(`
      query First { findManyCompanies { id } }
      query Second { findManyPeople { id } }
    `);
        const result = (0, _findoperationdefinitionutil.findOperationDefinition)(document, 'Second');
        expect(result?.name?.value).toBe('Second');
    });
    it('should return undefined when operationName does not match any operation', ()=>{
        const document = (0, _graphql.parse)('query MyQuery { findManyCompanies { id } }');
        const result = (0, _findoperationdefinitionutil.findOperationDefinition)(document, 'NonExistent');
        expect(result).toBeUndefined();
    });
    it('should return a mutation operation', ()=>{
        const document = (0, _graphql.parse)('mutation CreateOne { createOnePerson(data: {}) { id } }');
        const result = (0, _findoperationdefinitionutil.findOperationDefinition)(document, 'CreateOne');
        expect(result?.operation).toBe('mutation');
        expect(result?.name?.value).toBe('CreateOne');
    });
    it('should return undefined for an empty document', ()=>{
        const document = (0, _graphql.parse)('type Query { dummy: String }');
        const result = (0, _findoperationdefinitionutil.findOperationDefinition)(document, undefined);
        expect(result).toBeUndefined();
    });
});

//# sourceMappingURL=find-operation-definition.util.spec.js.map
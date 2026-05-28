"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _graphql = require("graphql");
const _graphqlextracttoplevelfieldsutil = require("../graphql-extract-top-level-fields.util");
describe('graphQLExtractTopLevelFields', ()=>{
    it('should return top-level fields from a query', ()=>{
        const query = `
      query {
        findManyCompanies { id name }
        findManyPeople { id email }
      }
    `;
        const fields = (0, _graphqlextracttoplevelfieldsutil.graphQLExtractTopLevelFields)((0, _graphql.parse)(query), undefined);
        expect(fields).toHaveLength(2);
        expect(fields[0].name.value).toBe('findManyCompanies');
        expect(fields[1].name.value).toBe('findManyPeople');
    });
    it('should return top-level fields from a mutation', ()=>{
        const query = `
      mutation {
        createOnePerson(data: { name: "Test" }) { id }
      }
    `;
        const fields = (0, _graphqlextracttoplevelfieldsutil.graphQLExtractTopLevelFields)((0, _graphql.parse)(query), undefined);
        expect(fields).toHaveLength(1);
        expect(fields[0].name.value).toBe('createOnePerson');
    });
    it('should select the operation matching operationName', ()=>{
        const query = `
      query GetCompanies {
        findManyCompanies { id }
      }
      query GetPeople {
        findManyPeople { id }
      }
    `;
        const fields = (0, _graphqlextracttoplevelfieldsutil.graphQLExtractTopLevelFields)((0, _graphql.parse)(query), 'GetPeople');
        expect(fields).toHaveLength(1);
        expect(fields[0].name.value).toBe('findManyPeople');
    });
    it('should throw when multiple operations exist and operationName is undefined', ()=>{
        const query = `
      query First {
        findManyCompanies { id }
      }
      query Second {
        findManyPeople { id }
      }
    `;
        expect(()=>(0, _graphqlextracttoplevelfieldsutil.graphQLExtractTopLevelFields)((0, _graphql.parse)(query), undefined)).toThrow('Must provide operation name when document contains multiple operations.');
    });
    it('should return an empty array when no operation matches', ()=>{
        const query = `
      query GetCompanies {
        findManyCompanies { id }
      }
    `;
        const fields = (0, _graphqlextracttoplevelfieldsutil.graphQLExtractTopLevelFields)((0, _graphql.parse)(query), 'NonExistent');
        expect(fields).toEqual([]);
    });
    it('should expand fragment spreads at the top level', ()=>{
        const query = `
      query {
        __schema { types { name } }
        ...DataFragment
      }
      fragment DataFragment on Query {
        companies { id }
      }
    `;
        const fields = (0, _graphqlextracttoplevelfieldsutil.graphQLExtractTopLevelFields)((0, _graphql.parse)(query), undefined);
        expect(fields).toHaveLength(2);
        expect(fields[0].name.value).toBe('__schema');
        expect(fields[1].name.value).toBe('companies');
    });
    it('should expand inline fragments at the top level', ()=>{
        const query = `
      query {
        __schema { types { name } }
        ... on Query {
          companies { id }
        }
      }
    `;
        const fields = (0, _graphqlextracttoplevelfieldsutil.graphQLExtractTopLevelFields)((0, _graphql.parse)(query), undefined);
        expect(fields).toHaveLength(2);
        expect(fields[0].name.value).toBe('__schema');
        expect(fields[1].name.value).toBe('companies');
    });
});

//# sourceMappingURL=graphql-extract-top-level-fields.util.spec.js.map
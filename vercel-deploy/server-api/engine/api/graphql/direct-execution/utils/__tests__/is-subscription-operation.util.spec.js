"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _graphql = require("graphql");
const _issubscriptionoperationutil = require("../is-subscription-operation.util");
describe('isSubscriptionOperation', ()=>{
    it('should return true for a subscription operation', ()=>{
        const query = 'subscription { onCreateCompany { id } }';
        expect((0, _issubscriptionoperationutil.isSubscriptionOperation)((0, _graphql.parse)(query), undefined)).toBe(true);
    });
    it('should return true for a named subscription matching operationName', ()=>{
        const query = `
      subscription OnCreate { onCreateCompany { id } }
      query GetAll { findManyCompanies { id } }
    `;
        expect((0, _issubscriptionoperationutil.isSubscriptionOperation)((0, _graphql.parse)(query), 'OnCreate')).toBe(true);
    });
    it('should return false for a query operation', ()=>{
        const query = 'query { findManyCompanies { id } }';
        expect((0, _issubscriptionoperationutil.isSubscriptionOperation)((0, _graphql.parse)(query), undefined)).toBe(false);
    });
    it('should return false for a mutation operation', ()=>{
        const query = 'mutation { createOnePerson(data: {}) { id } }';
        expect((0, _issubscriptionoperationutil.isSubscriptionOperation)((0, _graphql.parse)(query), undefined)).toBe(false);
    });
});

//# sourceMappingURL=is-subscription-operation.util.spec.js.map
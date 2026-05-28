"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _parsecorepathutils = require("../parse-core-path.utils");
const testUUID = '20202020-ef5a-4822-9e08-cf6e4a4dcd6b';
describe('parseCorePath', ()=>{
    it('should parse find one object from request path', ()=>{
        const request = {
            path: `/rest/companies/${testUUID}`
        };
        expect((0, _parsecorepathutils.parseCorePath)(request)).toEqual({
            object: 'companies',
            id: testUUID
        });
    });
    it('should parse find many object from request path', ()=>{
        const request = {
            path: '/rest/companies'
        };
        expect((0, _parsecorepathutils.parseCorePath)(request)).toEqual({
            object: 'companies',
            id: undefined
        });
    });
    it('should throw for wrong request path', ()=>{
        const request = {
            path: `/rest/companies/${testUUID}/toto`
        };
        expect(()=>(0, _parsecorepathutils.parseCorePath)(request)).toThrow(`Query path '/rest/companies/${testUUID}/toto' invalid. Valid examples: /rest/companies/id or /rest/companies or /rest/batch/companies`);
    });
    it('should throw for malformed uuid in findOne request', ()=>{
        const malformedUUID = 'malformed-uuid';
        const request = {
            path: `/rest/companies/${malformedUUID}`
        };
        expect(()=>(0, _parsecorepathutils.parseCorePath)(request)).toThrow(`'${malformedUUID}' is not a valid UUID`);
    });
    it('should throw for wrong request', ()=>{
        const request = {
            path: '/rest'
        };
        expect(()=>(0, _parsecorepathutils.parseCorePath)(request)).toThrow("Query path '/rest' invalid. Valid examples: /rest/companies/id or /rest/companies or /rest/batch/companies");
    });
    it('should parse object from batch request', ()=>{
        const request = {
            path: '/rest/batch/companies'
        };
        expect((0, _parsecorepathutils.parseCorePath)(request)).toEqual({
            object: 'companies',
            id: undefined
        });
    });
    it('should throw for wrong batch request', ()=>{
        const request = {
            path: `/rest/batch/companies/${testUUID}`
        };
        expect(()=>(0, _parsecorepathutils.parseCorePath)(request)).toThrow(`Query path '/rest/batch/companies/${testUUID}' invalid. Valid examples: /rest/companies/id or /rest/companies or /rest/batch/companies`);
    });
    it('should parse object from duplicates request', ()=>{
        const request = {
            path: '/rest/companies/duplicates'
        };
        expect((0, _parsecorepathutils.parseCorePath)(request)).toEqual({
            object: 'companies',
            id: undefined
        });
    });
});

//# sourceMappingURL=parse-core-path.utils.spec.js.map
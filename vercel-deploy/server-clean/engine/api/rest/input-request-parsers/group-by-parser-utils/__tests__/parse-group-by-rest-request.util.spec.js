"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _parsegroupbyrestrequestutil = require("../parse-group-by-rest-request.util");
const _restinputrequestparserexception = require("../../rest-input-request-parser.exception");
describe('parseGroupByRestRequest', ()=>{
    it('should parse mixed field types', ()=>{
        const request = {
            query: {
                group_by: '[{"firstField": true}, {"fieldCurrency": {"amountMicros": true}}, {"createdAt": {"granularity": "WEEK"}}]'
            }
        };
        expect((0, _parsegroupbyrestrequestutil.parseGroupByRestRequest)(request)).toEqual([
            {
                firstField: true
            },
            {
                fieldCurrency: {
                    amountMicros: true
                }
            },
            {
                createdAt: {
                    granularity: 'WEEK'
                }
            }
        ]);
    });
    it('should parse empty array', ()=>{
        const request = {
            query: {
                group_by: '[]'
            }
        };
        expect((0, _parsegroupbyrestrequestutil.parseGroupByRestRequest)(request)).toEqual([]);
    });
    it('should throw if group_by parameter is not a string', ()=>{
        const request = {
            query: {
                group_by: [
                    {
                        firstField: true
                    }
                ]
            }
        };
        expect(()=>(0, _parsegroupbyrestrequestutil.parseGroupByRestRequest)(request)).toThrow(_restinputrequestparserexception.RestInputRequestParserException);
        expect(()=>(0, _parsegroupbyrestrequestutil.parseGroupByRestRequest)(request)).toThrow(`Invalid group_by query parameter - should be a valid array of objects - ex: [{"firstField": true}, {"secondField": {"subField": true}}, {"dateField": {"granularity": 'DAY'}}]`);
    });
    it('should throw if group_by parameter is not valid JSON', ()=>{
        const request = {
            query: {
                group_by: 'not-valid-json'
            }
        };
        expect(()=>(0, _parsegroupbyrestrequestutil.parseGroupByRestRequest)(request)).toThrow(_restinputrequestparserexception.RestInputRequestParserException);
        expect(()=>(0, _parsegroupbyrestrequestutil.parseGroupByRestRequest)(request)).toThrow(`Invalid group_by query parameter - should be a valid array of objects - ex: [{"firstField": true}, {"secondField": {"subField": true}}, {"dateField": {"granularity": 'DAY'}}]`);
    });
    it('should throw if group_by parameter is undefined', ()=>{
        const request = {
            query: {}
        };
        expect(()=>(0, _parsegroupbyrestrequestutil.parseGroupByRestRequest)(request)).toThrow(_restinputrequestparserexception.RestInputRequestParserException);
        expect(()=>(0, _parsegroupbyrestrequestutil.parseGroupByRestRequest)(request)).toThrow(`Invalid group_by query parameter - should be a valid array of objects - ex: [{"firstField": true}, {"secondField": {"subField": true}}, {"dateField": {"granularity": 'DAY'}}]`);
    });
});

//# sourceMappingURL=parse-group-by-rest-request.util.spec.js.map
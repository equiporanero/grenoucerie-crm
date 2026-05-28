"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _parseaggregatefieldsrestrequestutil = require("../parse-aggregate-fields-rest-request.util");
const _restinputrequestparserexception = require("../../rest-input-request-parser.exception");
describe('parseAggregateFieldsRestRequest', ()=>{
    it('should parse single aggregate field', ()=>{
        const request = {
            query: {
                aggregate: '["countNotEmptyId"]'
            }
        };
        expect((0, _parseaggregatefieldsrestrequestutil.parseAggregateFieldsRestRequest)(request)).toEqual({
            countNotEmptyId: true
        });
    });
    it('should parse multiple aggregate fields', ()=>{
        const request = {
            query: {
                aggregate: '["countNotEmptyId", "countEmptyId"]'
            }
        };
        expect((0, _parseaggregatefieldsrestrequestutil.parseAggregateFieldsRestRequest)(request)).toEqual({
            countNotEmptyId: true,
            countEmptyId: true
        });
    });
    it('should parse empty array', ()=>{
        const request = {
            query: {
                aggregate: '[]'
            }
        };
        expect((0, _parseaggregatefieldsrestrequestutil.parseAggregateFieldsRestRequest)(request)).toEqual({});
    });
    it('should throw if aggregate parameter is not a string', ()=>{
        const request = {
            query: {
                aggregate: [
                    'countNotEmptyId'
                ]
            }
        };
        expect(()=>(0, _parseaggregatefieldsrestrequestutil.parseAggregateFieldsRestRequest)(request)).toThrow(new _restinputrequestparserexception.RestInputRequestParserException('Invalid aggregate query parameter - should be a valid array of string - ex: ["countNotEmptyId", "countEmptyField"]', _restinputrequestparserexception.RestInputRequestParserExceptionCode.INVALID_AGGREGATE_FIELDS_QUERY_PARAM));
    });
    it('should throw if aggregate parameter is not valid JSON', ()=>{
        const request = {
            query: {
                aggregate: 'not-valid-json'
            }
        };
        expect(()=>(0, _parseaggregatefieldsrestrequestutil.parseAggregateFieldsRestRequest)(request)).toThrow(new _restinputrequestparserexception.RestInputRequestParserException('Invalid aggregate query parameter - should be a valid array of string - ex: ["countNotEmptyId", "countEmptyField"]', _restinputrequestparserexception.RestInputRequestParserExceptionCode.INVALID_AGGREGATE_FIELDS_QUERY_PARAM));
    });
    it('should early return if aggregate parameter is undefined', ()=>{
        const request = {
            query: {}
        };
        expect((0, _parseaggregatefieldsrestrequestutil.parseAggregateFieldsRestRequest)(request)).toEqual({});
    });
});

//# sourceMappingURL=parse-aggregate-fields-rest-request.util.spec.js.map
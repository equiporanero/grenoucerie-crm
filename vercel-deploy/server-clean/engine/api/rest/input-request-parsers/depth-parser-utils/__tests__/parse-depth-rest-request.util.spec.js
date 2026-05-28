"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _parsedepthrestrequestutil = require("../parse-depth-rest-request.util");
const _restinputrequestparserexception = require("../../rest-input-request-parser.exception");
describe('parseDepthRestRequest', ()=>{
    it('should return 0 when depth parameter is not provided', ()=>{
        const request = {
            query: {}
        };
        expect((0, _parsedepthrestrequestutil.parseDepthRestRequest)(request)).toBe(0);
    });
    it('should parse depth=0', ()=>{
        const request = {
            query: {
                depth: '0'
            }
        };
        expect((0, _parsedepthrestrequestutil.parseDepthRestRequest)(request)).toBe(0);
    });
    it('should throw if depth is not a number', ()=>{
        const request = {
            query: {
                depth: 'invalid'
            }
        };
        expect(()=>(0, _parsedepthrestrequestutil.parseDepthRestRequest)(request)).toThrow(_restinputrequestparserexception.RestInputRequestParserException);
        expect(()=>(0, _parsedepthrestrequestutil.parseDepthRestRequest)(request)).toThrow("'depth=invalid' parameter invalid. Allowed values are 0, 1");
    });
    it('should throw if depth is not in allowed values (2)', ()=>{
        const request = {
            query: {
                depth: '2'
            }
        };
        expect(()=>(0, _parsedepthrestrequestutil.parseDepthRestRequest)(request)).toThrow(_restinputrequestparserexception.RestInputRequestParserException);
        expect(()=>(0, _parsedepthrestrequestutil.parseDepthRestRequest)(request)).toThrow("'depth=2' parameter invalid. Allowed values are 0, 1");
    });
});

//# sourceMappingURL=parse-depth-rest-request.util.spec.js.map
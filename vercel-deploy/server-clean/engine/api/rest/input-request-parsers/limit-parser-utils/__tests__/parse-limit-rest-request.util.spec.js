"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _parselimitrestrequestutil = require("../parse-limit-rest-request.util");
describe('parseLimitRestRequest', ()=>{
    it('should return default if limit missing', ()=>{
        const request = {
            query: {}
        };
        expect((0, _parselimitrestrequestutil.parseLimitRestRequest)(request)).toEqual(60);
    });
    it('should return limit', ()=>{
        const request = {
            query: {
                limit: '10'
            }
        };
        expect((0, _parselimitrestrequestutil.parseLimitRestRequest)(request)).toEqual(10);
    });
    it('should throw if not integer', ()=>{
        const request = {
            query: {
                limit: 'aaa'
            }
        };
        expect(()=>(0, _parselimitrestrequestutil.parseLimitRestRequest)(request)).toThrow("limit 'aaa' is invalid. Should be an integer");
    });
    it('should throw if limit negative', ()=>{
        const request = {
            query: {
                limit: -1
            }
        };
        expect(()=>(0, _parselimitrestrequestutil.parseLimitRestRequest)(request)).toThrow("limit '-1' is invalid. Should be an integer");
    });
});

//# sourceMappingURL=parse-limit-rest-request.util.spec.js.map